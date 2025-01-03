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
    public partial class wfPmMilestone : System.Web.UI.Page
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
        public static string FetchSalesOrderNo(string projectId)
        {
            DataTable dtSalesOrderNo = new DataTable();

            try
            {

                dtSalesOrderNo = objMain.dtFetchData(@"select ProjectId,SalesOrderNo FROM tblPmProjectPlanningDetails where ProjectId='" + projectId + "'");
                        }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtSalesOrderNo, Formatting.None);

        }
        [WebMethod]
        public static string BindEmployeesList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmployeesList = new DataTable();

            try
            {

                dtEmployeesList = objMain.dtFetchData("select EmpId,EmpName from [tblHrEmpMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtEmployeesList);
        }
        [WebMethod]
        public static string BindProjectList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtProjectList = new DataTable();

            try
            {

                dtProjectList = objMain.dtFetchData("select ProjectId from [tblPmProjectPlanningDetails]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtProjectList);
        }
        [WebMethod]
        public static string BindMilestoneDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMilestoneList = new DataTable();

            try
            {

                dtMilestoneList = objMain.dtFetchData(@"select Name,Project,AssignEmployees,SalesOrderNo,DeadlineFrom,DeadlineTo,JobType from tblPmMilestoneMaster");
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
            return JsonConvert.SerializeObject(dtMilestoneList, settings);
        }
        [WebMethod]
        public static string AddMilestoneDetails(string name = "", string project = "", string assignEmployees = "", string salesOrderNo = "",
           string deadlineFrom = "", string deadlineTo = "", string jobType = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@Name", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = name;

            objParam[1] = new SqlParameter("@Project", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = project;

            objParam[2] = new SqlParameter("@AssignEmployees", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = assignEmployees;

            objParam[3] = new SqlParameter("@SalesOrderNo", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = salesOrderNo;

            objParam[4] = new SqlParameter("@DeadlineFrom", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = deadlineFrom;

            objParam[5] = new SqlParameter("@DeadlineTo", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = deadlineTo;

            objParam[6] = new SqlParameter("@JobType", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = jobType;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;

            var result = objMain.ExecuteProcedure("procPmMilestoneMaster", objParam);


            return "";
        }
    
    }
}