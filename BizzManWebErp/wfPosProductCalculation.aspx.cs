using BizzManWebErp;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;

namespace BizzManWebErp
{
    public partial class wfPosProductCalculation : System.Web.UI.Page
    {
        // added on 12 Dec 2023
        static clsMain objMain;

        string Id;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetImageShow();
                if (Request.QueryString["Id"] != null)
                {
                    Id = Request.QueryString["Id"].ToString();

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
            }
        }

        [WebMethod]
        public void GetImageShow()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtimg = new DataTable();

            try
            {
                dtimg = objMain.dtFetchData("select MaterialImage,MaterialName,MRP from [tblMmMaterialMaster]");
                d1.DataSource = dtimg;
                d1.DataBind();
            }
            catch (Exception ex)
            {
                //return "";
            }
        }

        [WebMethod]
        public static string List()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPriceList = new DataTable();

            try
            {
                dtMaterialPriceList = objMain.dtFetchData(@"select Id,MaterialName,MRP,MaterialImage from tblMmMaterialMaster");
            }
            catch (Exception ex)
            {
                ///return "";
            }

            string json = JsonConvert.SerializeObject(dtMaterialPriceList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchMaterialDetails(string Id)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialPriceList = new DataTable();

            try
            {
                dtMaterialPriceList = objMain.dtFetchData(@"select Id,MaterialName,MRP,MaterialImage from tblMmMaterialMaster where Id='" + Id + "'");
            }
            catch (Exception ex)
            {
                ///return "";
            }

            string json = JsonConvert.SerializeObject(dtMaterialPriceList, Formatting.None);
            return json;
        }

    }
}
