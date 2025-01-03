using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfInventStockMasterReport : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Id"] != null)
            {
                loginuser.Value = Session["Id"].ToString();
                if (Session["objMain_Session"] != null)
                {
                    objMain = (clsMain)Session["objMain_Session"];
                }
                else
                {
                    Response.Redirect("wfAdminLogin.aspx");
                }
            }
            else
            {
                Response.Redirect("wfAdminLogin.aspx");
            }
        }
        [WebMethod]
        public static string FetchList()
        {
            DataTable dtList = new DataTable();
            try
            {
                dtList = objMain.dtFetchData(@"select BranchName,WarehouseName,MaterialName,QtyBalance,
                    Rate,Amount,UnitMesure
                from vwInventMaterialStockMaster");
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
            return JsonConvert.SerializeObject(dtList, settings);
        }
    }
}