using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

namespace BizzManWebErp
{
    public partial class wfCrmSunPipeline : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 21 Nov 2024
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
        public static string BindPipelineDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtPipelineList = new DataTable();

            try
            {

                dtPipelineList = objMain.dtFetchData(@"select la.LeadID,lem.LeadID,lem.CustomerName,la.FollowUpType,la.FollowUpStatus,la.DueDate,la.Priority,la.AssignedPerson,la.Note as AssignNote,
                                                    lem.Date,lem.ContactNo,lem.LeadSource,lem.Note as LeadNote
                                              from tblCrmSunLeadsAssignActivity la inner join [tblCrmSunLeadsEntry] lem on la.LeadID=lem.LeadID");
                //                                   
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
            return JsonConvert.SerializeObject(dtPipelineList, settings);
        }
    }
}