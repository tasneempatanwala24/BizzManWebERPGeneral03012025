using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ClosedXML.Excel;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfMmMaterialPurchaseGrnInvoiceEntry : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 12 Dec 2023
                    //############START###############
                    if (Session["objMain_Session"] != null)
                    {
                        objMain = (clsMain)Session["objMain_Session"];
                    }
                    else
                    {
                        Response.Redirect("wfAdminLogin.aspx");
                    }
                    //############END###############

                }
                else
                {
                    Response.Redirect("wfAdminLogin.aspx");
                }
            }
        }



        [WebMethod]
        public static string FetchMaterialPurchaseGrnInvoiceList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseGrnInvoiceList = new DataTable();

            try
            {

                dtMaterialPurchaseGrnInvoiceList = objMain.dtFetchData(@"select IM.Id,CONVERT(nvarchar,IM.GrnInvoiceEntryDate,106) as GrnEntryDate,PG.GateInwardMasterId,IM.PurchaseGrnMasterId,
                                                                          GI.OrderId,v.VendorName,b.BranchName 
																		  from tblMmGrnQtyInvoiceMaster IM
																		  join tblMmMaterialPurchaseGrnMaster PG on IM.PurchaseGrnMasterId=PG.Id
                                                                          join tblMmMaterialPurchaseGateInwardMaster GI on GI.Id=PG.GateInwardMasterId
                                                                          join tblMmVendorMaster v on v.Id=PG.VendorId
                                                                          join tblHrBranchMaster b on b.BranchCode=PG.BranchCode");
            }
            catch (Exception ex)
            {
                // return "";
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays

            };
            return JsonConvert.SerializeObject(dtMaterialPurchaseGrnInvoiceList, settings);
        }

        [WebMethod]
        public static string FetchMaterialPurchaseGrnInvoiceDetails(string id)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseGrnInvoiceDetails = new DataTable();

            try
            {

                dtMaterialPurchaseGrnInvoiceDetails = objMain.dtFetchData(@"select PG.Id,M.MaterialName,M.UnitMesure,PG.InvoiceQty,PG.UnitPrice,PG.TotalAmt
                                                                  from tblMmGrnQtyInvoiceDetail PG
                                                                  join tblMmMaterialMaster M on M.Id=PG.MaterialMasterId
                                                                  where PG.GrnQtyInvoiceMasterId='" + id + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays

            };
            return JsonConvert.SerializeObject(dtMaterialPurchaseGrnInvoiceDetails, settings);
        }

        [WebMethod]
        public static string FetchMaterialPurchaseGrnInvoiceListDownload(string GrnInvoiceid = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseGrnInvoiceList = new DataTable();

            try
            {

                dtMaterialPurchaseGrnInvoiceList = objMain.dtFetchData(@"select IM.Id,CONVERT(nvarchar,IM.GrnInvoiceEntryDate,106) as GrnEntryDate,PG.GateInwardMasterId,IM.PurchaseGrnMasterId,
                                                                          GI.OrderId,v.VendorName,b.BranchName 
																		  from tblMmGrnQtyInvoiceMaster IM
																		  join tblMmMaterialPurchaseGrnMaster PG on IM.PurchaseGrnMasterId=PG.Id
                                                                          join tblMmMaterialPurchaseGateInwardMaster GI on GI.Id=PG.GateInwardMasterId
                                                                          join tblMmVendorMaster v on v.Id=PG.VendorId
                                                                          join tblHrBranchMaster b on b.BranchCode=PG.BranchCode
                                                                          where 1=1" + (GrnInvoiceid != "" ? " and IM.Id in(SELECT Item FROM [dbo].[SplitString] ('" + GrnInvoiceid + "',','))" : ""));
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialPurchaseGrnInvoiceList.TableName = "MaterialPurchaseGrnInvoiceList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtMaterialPurchaseGrnInvoiceList);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    //Return xlsx Excel File  
                    byte[] bytes = stream.ToArray();

                    //Convert File to Base64 string and send to Client.
                    return Convert.ToBase64String(bytes, 0, bytes.Length);
                }
            }

            ////var settings = new JsonSerializerSettings
            ////{
            ////    Formatting = Formatting.Indented,
            ////    NullValueHandling = NullValueHandling.Ignore,
            ////    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ////    PreserveReferencesHandling = PreserveReferencesHandling.Arrays

            ////};
            ////return JsonConvert.SerializeObject(dtMaterialPurchaseOrderList, settings);
        }



        [WebMethod]
        public static string FetchMaterialPurchaseGRNList(string vendorid)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseGateInwordList = new DataTable();

            try
            {

                dtMaterialPurchaseGateInwordList = objMain.dtFetchData(@"select GI.Id,v.VendorName,CONVERT(nvarchar,GI.GrnEntryDate,106) as GrnEntryDate,GI.GateInwardMasterId,b.BranchName
                                              from tblMmMaterialPurchaseGrnMaster GI
                                              join tblMmVendorMaster v on GI.VendorId=v.Id
                                              join tblHrBranchMaster b on b.BranchCode=GI.BranchCode 
                                              where GI.Active='Y' and GI.VendorId='" + vendorid + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays

            };
            return JsonConvert.SerializeObject(dtMaterialPurchaseGateInwordList, settings);
        }

        [WebMethod]
        public static string FetchPurchaseGRNMasterDetailList(string GRNMasterId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseGRNMasterDetailList = new DataTable();

            try
            {

                dtMaterialPurchaseGRNMasterDetailList = objMain.dtFetchData(@"select GI.Id,M.MaterialName,M.UnitMesure,GI.QtyOrder,GI.QtyStockEntry,GI.UnitPrice,
                                                                            w.Name as WareHouse,GI.QtyStockEntryInvoice,(GI.QtyStockEntry-GI.QtyStockEntryInvoice) as BalanceQty
                                                                            from tblMmMaterialPurchaseGrnDetail GI
                                                                            join tblMmMaterialMaster M on M.Id=GI.MaterialMasterId
																			join tblFaWarehouseMaster w on w.Id=GI.WarehouseId
                                                                            where GI.Active='Y' and GI.InvoiceEntry='N' and GI.GrnMasterId='" + GRNMasterId + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays

            };
            return JsonConvert.SerializeObject(dtMaterialPurchaseGRNMasterDetailList, settings);
        }



        [WebMethod]
        public static string AddMaterialPurchaseGrnInvoiceEntry(string VendorId = "0", string EntryDate = "", string order_details = "", string LoginUser = "", string GRNId = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[5];


            objParam[0] = new SqlParameter("@VendorId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(VendorId);


            objParam[1] = new SqlParameter("@EntryDate", SqlDbType.DateTime);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToDateTime(EntryDate);

            objParam[2] = new SqlParameter("@order_details", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = order_details;

            objParam[3] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = LoginUser;

            objParam[4] = new SqlParameter("@GRNId", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = GRNId;

            var result = objMain.ExecuteStoreProcedure("procMaterialPurchaseGrnInvoiceEntryInsert", objParam);

            string json = "";
            if (result != null)
            {
                if (result.Rows.Count > 0)
                {
                    json = result.Rows[0][0].ToString();
                }
            }


            return json;
        }


        //  error  18/04/2024


        [WebMethod]
        public static string VendorList()
        {
            //   clsMain objMain = new clsMain();
            DataTable dtVendorList = new DataTable();

            try
            {

                dtVendorList = objMain.dtFetchData("select Id,VendorName FROM tblMmVendorMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtVendorList);
        }

        //=====================================


    }
}