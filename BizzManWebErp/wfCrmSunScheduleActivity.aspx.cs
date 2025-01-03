using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfCrmSunScheduleActivity : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 23 Nov 2024
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
        [WebMethod]
        public static string EmployeeList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmployeeList = new DataTable();

            try
            {

                dtEmployeeList = objMain.dtFetchData("select EmpName from [tblHrEmpMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtEmployeeList);
        }
        [WebMethod]
        public static string CustomerNames()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerlist = new DataTable();

            try
            {

                dtCustomerlist = objMain.dtFetchData(@"SELECT LeadID,CustomerName FROM [tblCrmSunLeadsEntry]");
            }
            catch (Exception ex)
            {

            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            return JsonConvert.SerializeObject(dtCustomerlist, settings);

        }

        [WebMethod]
        public static string BindAssignActivityDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtAssignList = new DataTable();

            try
            {

                dtAssignList = objMain.dtFetchData(@"select ActivityID,la.LeadID,lem.CustomerName,FollowUpType,DueDate,Priority,AssignedPerson,la.Note
                                              from tblCrmSunLeadsAssignActivity la inner join [tblCrmSunLeadsEntry] lem on la.LeadID=lem.LeadID");
               
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
            return JsonConvert.SerializeObject(dtAssignList, settings);
        }
        [WebMethod]
        public static string AddAssignActivityDetails(string leadId = "", string activityId = "", string duedate = "", string followUpType = "",
             string priority = "", string assignedPerson = "", string note = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@LeadID", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = leadId;

            objParam[1] = new SqlParameter("@ActivityID", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = activityId;

            objParam[2] = new SqlParameter("@DueDate", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = duedate;

            objParam[3] = new SqlParameter("@FollowUpType", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = followUpType;

            objParam[4] = new SqlParameter("@Priority", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = priority;

            objParam[5] = new SqlParameter("@AssignedPerson", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = assignedPerson;

            objParam[6] = new SqlParameter("@Note", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = note;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;

            var result = objMain.ExecuteProcedure("procCrmSunScheduleActivity", objParam);


            return "";
        }
    }
}