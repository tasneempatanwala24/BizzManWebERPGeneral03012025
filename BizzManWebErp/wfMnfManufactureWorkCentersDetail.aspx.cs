using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfMnfManufactureWorkCentersDetail : System.Web.UI.Page
        {
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
        public static string LocationDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtLocationList = new DataTable();

            try
            {

                dtLocationList = objMain.dtFetchData("select Id,LocationName from tblInventLocationMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtLocationList);
        }
    }
}