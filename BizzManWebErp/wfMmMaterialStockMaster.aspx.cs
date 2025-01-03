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
    public partial class wfMmMaterialStockMaster : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    // loginuser.Value = Convert.ToString(Session["Id"]);

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
        public static string FetchMaterialStockMasterList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialStockMasterList = new DataTable();

            try
            {

                dtMaterialStockMasterList = objMain.dtFetchData(@"select sm.Id,sm.TransectionId,sm.TransectionType,CONVERT(nvarchar,sm.EntryDate,106) as EntryDate,
                                                                  w.Name as WareHouse,m.MaterialName,sm.QtyIn,sm.Rate,m.UnitMesure,sm.QtyOut,sm.QtyBalance,
                                                                  sm.InvoiceQty,sm.InvoiceValue
                                                                  from tblMmMaterialStockMaster sm
                                                                  left join tblFaWarehouseMaster w on w.Id=sm.WarehouseId
                                                                  join tblMmMaterialMaster m on m.Id=sm.MaterialMasterId");
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
            return JsonConvert.SerializeObject(dtMaterialStockMasterList, settings);
        }

        [WebMethod]
        public static string FetchMaterialStockMasterDetailList(string StockId="")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialStockMasterDetailList = new DataTable();

            try
            {

                dtMaterialStockMasterDetailList = objMain.dtFetchData(@"select msd.TransectionId,msd.TransectionType,m.MaterialName,msd.QtyOut,
                                                                  msd.Rate,m.UnitMesure
                                                                  from tblMmMaterialStockDetail msd
                                                                  join tblMmMaterialMaster m on m.Id=msd.MaterialMasterId
                                                                  where msd.MaterialStockMasterId=" + StockId);
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
            return JsonConvert.SerializeObject(dtMaterialStockMasterDetailList, settings);
        }

        [WebMethod]
        public static string FetchMaterialStockMasterListDownload(string id = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseGrnList = new DataTable();

            try
            {

                dtMaterialPurchaseGrnList = objMain.dtFetchData(@"select sm.TransectionId,sm.TransectionType,CONVERT(nvarchar,sm.EntryDate,106) as EntryDate,
                                                                  w.Name as WareHouse,m.MaterialName,sm.QtyIn,sm.Rate,m.UnitMesure,sm.QtyOut,sm.QtyBalance,
                                                                  sm.InvoiceQty,sm.InvoiceValue
                                                                  from tblMmMaterialStockMaster sm
                                                                  left join tblFaWarehouseMaster w on w.Id=sm.WarehouseId
                                                                  join tblMmMaterialMaster m on m.Id=sm.MaterialMasterId
                                                                  where 1=1" + (id != "" ? " and sm.Id in(SELECT Item FROM [dbo].[SplitString] ('" + id + "',','))" : ""));
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialPurchaseGrnList.TableName = "MaterialPurchaseGrnList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtMaterialPurchaseGrnList);
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



    }
}