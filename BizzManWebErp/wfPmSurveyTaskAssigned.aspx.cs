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
    public partial class wfPmSurveyTaskAssigned : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            //Session["assignedEmployee"] = 

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

        [WebMethod]
        public static string FetchTaskAssignedList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {
                dtCustomerList = objMain.dtFetchData(@"SELECT VisitId, CAST(DateofVisit AS DATE) AS DateOfVisit, 
                                                    FORMAT(DateofVisit, 'hh\:mm tt', 'en-US') As Time,CAST(CreateDate as date) as AssignedDate,
                                                    ClientId FROM tblPmSiteVisitMaster");
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
            return JsonConvert.SerializeObject(dtCustomerList, settings);
        }


    }
}