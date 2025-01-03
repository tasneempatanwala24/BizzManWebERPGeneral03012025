using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfPmAssignActivity : System.Web.UI.Page
    {
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

        [WebMethod]
        public static string ClientList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtClientList = new DataTable();

            try
            {

                dtClientList = objMain.dtFetchData("select FullName from tblPmCustomerMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtClientList);
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
        public static string FetchActivityList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {
                dtCustomerList = objMain.dtFetchData(@"select * from tblPmAssignActivity");
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

        [WebMethod]
        public static string FetchActivityDetails(string ActivityId = "")
        {
            //   clsMain objMain = new clsMain();
            DataTable dtCustList = new DataTable();

            try
            {
                dtCustList = objMain.dtFetchData(@"select ActivityId,FollowUpType,Summary,Note,DueDate,AssignPerson,AssignClient from tblPmAssignActivity where ActivityId='" + ActivityId + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtCustList, Formatting.None);
            return json;
        }

      

        [WebMethod]
        public static string AddActivity(string FollowUpType, string Summary, string Note,
            string DueDate, string AssignPerson, string AssignClient, string CreateUser)

        {

            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@FollowUpType", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = FollowUpType;

            objParam[1] = new SqlParameter("@Summary", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Summary;

            objParam[2] = new SqlParameter("@Note", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Note;

            objParam[3] = new SqlParameter("@DueDate", SqlDbType.DateTime);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = DueDate;

            objParam[4] = new SqlParameter("@AssignPerson", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = AssignPerson;

            objParam[5] = new SqlParameter("@AssignClient", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = AssignClient;

            objParam[6] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = CreateUser;

            objParam[7] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = CreateUser;

            var result = objMain.ExecuteProcedure("procPmScheduleActivity", objParam);

            return "";
        }
        protected void btnOpenCalendar_Click(object sender, EventArgs e)
        {
            Response.Redirect("wfPmBlockCalendar.aspx");
        }
    }
}
    /*[WebMethod]
    public static string CheckCustomerNameAvailability(string FullName, string IsUpdate)
    {
        //   clsMain objMain = new clsMain();
        bool CheckName = new bool();

        try
        {

            if (IsUpdate == "0")
            {
                CheckName = objMain.blSearchDataHO("select FullName FROM [tblPmCustomerMaster] where FullName='" + FullName + "'");
            }
            else
            {
                CheckName = false;
            }
        }
        catch (Exception ex)
        {
            return "False";
        }

        return JsonConvert.SerializeObject(CheckName.ToString());
    }
*/

