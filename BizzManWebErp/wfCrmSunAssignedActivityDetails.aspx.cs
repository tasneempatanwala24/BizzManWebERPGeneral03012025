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
using DocumentFormat.OpenXml.Bibliography;
// using static System.Windows.Forms.VisualStyles.VisualStyleElement.TreeView;

namespace BizzManWebErp
{
    public partial class wfCrmSunAssignedActivityDetails : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 29 Nov 2024
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
        public static string FetchCrmAssignActivityDetails(string userId)
        {

            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select um.EmpId, um.UserName, hm.EmpName, bm.BranchName as Branch, dm.DeptName as Department, dsgm.DesignationName as Designation from[tblUserMaster] um inner Join tblHrEmpMaster hm on um.EmpId = hm.EmpId inner join[tblHrDeptMaster] dm on dm.Id = hm.PresentDepartId inner join[tblHrDesignationMaster] dsgm on dsgm.ID = hm.PresentDesignation inner join[tblHrBranchMaster] bm on bm.BranchCode = hm.Branchcode where um.UserName = '{0}'", userId));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

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


        [WebMethod]
        public static string BindAssignGridMaster(string empName)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtAssignGrid = new DataTable();

            try
            {

               
                dtAssignGrid = objMain.dtFetchData(string.Format(@"select la.LeadID, le.AssignedPerson,la.CustomerName,la.Date as AssignedDate,le.DueDate from [tblCrmSunLeadsEntry] la inner join [tblCrmSunLeadsAssignActivity] le on le.LeadID=la.LeadID where le.AssignedPerson = '{0}'", empName));

                
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
            return JsonConvert.SerializeObject(dtAssignGrid, settings);
        }
        [WebMethod]
        public static string FetchPmAssignLeadActivityDetails(string LeadID, string CustomerName)
        {
            // clsMain objMain = new clsMain();
            DataTable dtAssignWorkList = new DataTable();

            try
            {

                dtAssignWorkList = objMain.dtFetchData(string.Format("select le.LeadID,le.CustomerName,la.FollowUpType as FollowUpType,la.DueDate as DueDate,le.ContactNo,le.Category,le.Location,le.Email,le.LeadSource,le.Note from [tblCrmSunLeadsEntry] le inner join [tblCrmSunLeadsAssignActivity] la on la.LeadID=le.LeadID where le.LeadID='{0}' or le.CustomerName='{1}'", LeadID, CustomerName));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtAssignWorkList, Formatting.None);

        }

        [WebMethod]
        public static string UpdateFollowStatus(string leadId, string followUpStatus)
        {
            clsMain mainClass = new clsMain();
            try
            {
                if (!mainClass.gblConHoStatus)
                {
                    // Assuming you are already calling clsMain before this step to initialize the connection
                    throw new InvalidOperationException("Database connection is not open.");
                }

                string query = "UPDATE tblCrmSunLeadsAssignActivity SET FollowUpStatus = @followUpStatus WHERE LeadID = @leadId";
                using (SqlCommand cmd = new SqlCommand(query, mainClass.conHo))
                {
                    cmd.Parameters.AddWithValue("@LeadID", leadId);
                    cmd.Parameters.AddWithValue("@FollowUpStatus", followUpStatus);
                    cmd.ExecuteNonQuery();
                }
                //}
                return "Success";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
    }

}
