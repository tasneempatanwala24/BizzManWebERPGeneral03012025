using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfInventStockReportPutwayRule : System.Web.UI.Page
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
        public static string FetchInventStockMasterList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtInventStockMasterList = new DataTable();

            try
            {

                dtInventStockMasterList = objMain.dtFetchData(@"select sm.Id,sm.TransectionId,sm.TransectionType,
CONVERT(nvarchar,sm.EntryDate,106) as EntryDate,
w.Name as WareHouse,m.MaterialName,sm.QtyIn,sm.Rate,m.UnitMesure,sm.QtyOut,sm.QtyBalance,
sm.InvoiceQty,sm.InvoiceValue
from tblMmMaterialStockMaster sm
left join tblInventPutawayRule t2 on  t2.ProductId=sm.MaterialMasterId
left join tblFaWarehouseMaster w on w.Id=(CASE WHEN t2.ProductId IS NOT NULL THEN t2.ToWarehouseId ELSE sm.WarehouseId
END)
join tblMmMaterialMaster m on m.Id=sm.MaterialMasterId

");
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
            return JsonConvert.SerializeObject(dtInventStockMasterList, settings);
        }

        [WebMethod]
        public static string FetchInventStockMasterDetailList(string StockId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtInventStockMasterDetailList = new DataTable();

            try
            {

                dtInventStockMasterDetailList = objMain.dtFetchData(@"select msd.TransectionId,msd.TransectionType,m.MaterialName,msd.QtyOut,
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
            return JsonConvert.SerializeObject(dtInventStockMasterDetailList, settings);
        }

        [WebMethod]
        public static string FetchInventStockMasterListDownload(string id = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtInventPurchaseGrnList = new DataTable();

            try
            {

                dtInventPurchaseGrnList = objMain.dtFetchData(@"select sm.TransectionId,sm.TransectionType,CONVERT(nvarchar,sm.EntryDate,106) as EntryDate,
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
            dtInventPurchaseGrnList.TableName = "MaterialPurchaseGrnList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtInventPurchaseGrnList);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    //Return xlsx Excel File  
                    byte[] bytes = stream.ToArray();

                    //Convert File to Base64 string and send to Client.
                    return Convert.ToBase64String(bytes, 0, bytes.Length);
                }
            }

           
        }
    }
}