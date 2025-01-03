using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
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
    public partial class wfMmMaterialPurchaseOrderEntry : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
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

        //===============================
        //=========================
        //===============================

        [WebMethod]
        public static string DepartmentMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData("select [Id],[DeptName] FROM [tblHrDeptMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDepartmentList);
        }

        //=================================
        //================================
        //===============================

        [WebMethod]
        public static string BranchMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select [BranchCode],[BranchName] FROM [tblHrBranchMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        //==============================
        //=============================
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

        [WebMethod]
        public static string FetchMaterialPurchaseOrderList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseOrderList = new DataTable();

            try
            {

                dtMaterialPurchaseOrderList = objMain.dtFetchData(@"select po.Id,v.VendorName,CONVERT(nvarchar,po.OrderEntryDate,106) as OrderEntryDate,
                                              CONVERT(nvarchar,po.OrderDeadlineDate,106) as OrderDeadlineDate,CONVERT(nvarchar,po.ReceiptDate,106) as ReceiptDate,
                                              b.BranchName,d.DeptName,po.PaymentTerm,po.PurchaseAgreement,po.QuotationNo
                                              from tblMmMaterialPurchaseOrderEntryMaster po
                                              left join tblMmVendorMaster v on po.VendoreId=v.Id
                                              left join tblHrBranchMaster b on b.BranchCode=po.BranchCode 
                                              left join tblHrDeptMaster d on d.Id=po.DepartmentId
                                              where po.Active='Y' and isnull(po.Source,'Quotation')='Quotation'");
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
            return JsonConvert.SerializeObject(dtMaterialPurchaseOrderList, settings);
        }


        [WebMethod]
        public static string FetchPurchaseQuotationMasterList(string VendorId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseMasterList = new DataTable();

            try
            {

                dtMaterialPurchaseMasterList = objMain.dtFetchData(@"select QM.Id,v.VendorName,CONVERT(nvarchar,QM.QuotationEntryDate,106) as QuotationEntryDate,
                                              CONVERT(nvarchar,QM.QuotationDate,106) as QuotationDate,CONVERT(nvarchar,QM.QuotationValidDate,106) as QuotationValidDate,
                                              b.BranchName,d.DeptName,RN.RequisitionNote
                                              from tblMmMaterialPurchaseQuotationEntryMaster QM
                                              join tblMmVendorMaster v on QM.VendoreId=v.Id
                                              join tblHrBranchMaster b on b.BranchCode=QM.BranchCode 
                                              join tblHrDeptMaster d on d.Id=QM.DepartmentId
                                              join tblMmMaterialRequisitionNote RN on RN.RequisitionId=QM.RequisitionId
                                              where QM.Active='Y' and QM.VendoreId='"+ VendorId + "'");
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
            return JsonConvert.SerializeObject(dtMaterialPurchaseMasterList, settings);
        }


        [WebMethod]
        public static string FetchPurchaseQuotationMasterDetailList(string QuotationMasterId)
        {
         //   clsMain objMain = new clsMain();
            DataTable dtPurchaseQuotationMasterDetailList = new DataTable();

            try
            {

                dtPurchaseQuotationMasterDetailList = objMain.dtFetchData(@"select QD.Id,m.MaterialName,QD.Qty,QD.UnitPrice,QD.TotalAmt,QD.MaterialMasterId
                                                  from tblMmMaterialPurchaseQuotationEntryDetail QD
                                                  join tblMmMaterialMaster m on QD.MaterialMasterId=m.Id
                                                  where QD.QuotationEntryMasterId='" + QuotationMasterId + "'");
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
            return JsonConvert.SerializeObject(dtPurchaseQuotationMasterDetailList, settings);
        }



        [WebMethod]
        public static string AddMaterialPurchaseOrder(string OrderID = "", string EntryDate = "", string Vendor = "",string DeadlineDate="",
                                                   string ReceiptDate = "", string PurchaseOrderDetails = "", string AskConfirm = "", string PaymentTerm = "",
                                                   string PurchaseAgreement = "", string QuotationNo = "", string BranchCode = "", string DepartmentId = "", string LoginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[13];


            objParam[0] = new SqlParameter("@OrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = OrderID;


            objParam[1] = new SqlParameter("@EntryDate", SqlDbType.DateTime);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToDateTime(EntryDate);


            objParam[2] = new SqlParameter("@VendorId", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Vendor;


            objParam[3] = new SqlParameter("@DeadlineDate", SqlDbType.DateTime);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Convert.ToDateTime(DeadlineDate);

            objParam[4] = new SqlParameter("@ReceiptDate", SqlDbType.DateTime);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Convert.ToDateTime(ReceiptDate);

            objParam[5] = new SqlParameter("@PurchaseOrderDetails", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = PurchaseOrderDetails;


            objParam[6] = new SqlParameter("@AskConfirm", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = AskConfirm;

            objParam[7] = new SqlParameter("@PaymentTerm", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = PaymentTerm;

            objParam[8] = new SqlParameter("@PurchaseAgreement", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = PurchaseAgreement;


            objParam[9] = new SqlParameter("@QuotationNo", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = QuotationNo;

            objParam[10] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = BranchCode;

            objParam[11] = new SqlParameter("@DepartmentId", SqlDbType.Int);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = Convert.ToInt32(DepartmentId);

            objParam[12] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = LoginUser;


            var result = objMain.ExecuteProcedure("procMaterialPurchaseOrderEntryInsertUpdate", objParam);


            return "";
        }




        [WebMethod]
        public static string DeleteMaterialPurchaseOrder(string id = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[1];


            objParam[0] = new SqlParameter("@id", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = id;


            var result = objMain.ExecuteProcedure("procMaterialPurchaseOrderEntryDelete", objParam);


            return "";
        }




        [WebMethod]
        public static string FetchMaterialPurchaseOrderDetails(string id = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseOrderList = new DataTable();

            try
            {

                SqlParameter[] objParam = new SqlParameter[1];


                objParam[0] = new SqlParameter("@id", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = id;


                dtMaterialPurchaseOrderList = objMain.ExecuteStoreProcedure("procMaterialPurchaseOrderEntryDetails", objParam);

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
            return JsonConvert.SerializeObject(dtMaterialPurchaseOrderList, settings);
        }


        [WebMethod]
        public static string FetchMaterialPurchaseOrderListDownload(string orderid="")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseOrderList = new DataTable();

            try
            {

                dtMaterialPurchaseOrderList = objMain.dtFetchData(@"select po.Id,v.VendorName,CONVERT(nvarchar,po.OrderEntryDate,106) as OrderEntryDate,
                                              CONVERT(nvarchar,po.OrderDeadlineDate,106) as OrderDeadlineDate,CONVERT(nvarchar,po.ReceiptDate,106) as ReceiptDate,
                                              b.BranchName,d.DeptName,po.PaymentTerm,po.PurchaseAgreement,po.QuotationNo
                                              from tblMmMaterialPurchaseOrderEntryMaster po
                                              join tblMmVendorMaster v on po.VendoreId=v.Id
                                              join tblHrBranchMaster b on b.BranchCode=po.BranchCode 
                                              join tblHrDeptMaster d on d.Id=po.DepartmentId
                                              where po.Active='Y'" + (orderid !="" ? " and po.Id in(SELECT Item FROM [dbo].[SplitString] ('"+ orderid + "',','))":""));
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialPurchaseOrderList.TableName = "MaterialPurchaseOrderList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtMaterialPurchaseOrderList);
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
        public static string GenerateOrderID(string OrderDate)
        {
            DataTable dtNewQuotationID = new DataTable();

            try
            {
                string formattedOrderDate = DateTime.ParseExact(OrderDate, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd");

                dtNewQuotationID = objMain.dtFetchData("select 'PORD' + CONVERT(NVARCHAR(10), '" + formattedOrderDate + "', 120) + '/' +\r\n                             RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(Id, LEN(Id) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4)\r\n as Id    FROM tblMmMaterialPurchaseOrderEntryMaster \r\n    WHERE OrderEntryDate ='" + formattedOrderDate + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtNewQuotationID);
        }
    }
}