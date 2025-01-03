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
    public partial class wfPmProjectPlanning : System.Web.UI.Page
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
        public static string BindSalesOrderList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtSalesOrderNo = new DataTable();

            try
            {

                dtSalesOrderNo = objMain.dtFetchData("select [SalesOrderId],[CustomerName] from [tblPmAddSalesOrderDetails]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderNo);
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
        public static string BindProjectPlanningMasterDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtPlanningList = new DataTable();

            try
            {

                dtPlanningList = objMain.dtFetchData(@"select ProjectId,SiteName,SiteDetails,Employee,SalesOrderNo,DurationFrom,DurationTo,Note from tblPmProjectPlanningDetails");
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
            return JsonConvert.SerializeObject(dtPlanningList, settings);
        }
        [WebMethod]
        public static string AddProjectPlanningDetails(string projectId = "",string siteName = "", string siteDetails = "", string assignEmployees = "", string salesOrderNo ="",string durationFrom = "",
           string durationTo = "", string note = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[9];

            objParam[0] = new SqlParameter("@ProjectId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = projectId;

            objParam[1] = new SqlParameter("@SiteName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = siteName;

            objParam[2] = new SqlParameter("@SiteDetails", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = siteDetails;

            objParam[3] = new SqlParameter("@AssignEmployee", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = assignEmployees;

            objParam[4] = new SqlParameter("@SalesOrderNo", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = salesOrderNo;

            objParam[5] = new SqlParameter("@DurationFrom", SqlDbType.SmallDateTime);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = durationFrom;

            objParam[6] = new SqlParameter("@DurationTo", SqlDbType.SmallDateTime);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = durationTo;

            objParam[7] = new SqlParameter("@Note", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = note;

            objParam[8] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = loginUser;

            var result = objMain.ExecuteProcedure("procPmProjectPlanningMaster", objParam);


            return "";
        }
    }
}