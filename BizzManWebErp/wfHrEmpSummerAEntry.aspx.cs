using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfHrEmpSummerAEntry : System.Web.UI.Page
    {

        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

                    //added  on 27 Feb 2024
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
        public static string BranchMasterList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select BranchCode, BranchName FROM tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            // return JsonConvert.SerializeObject(dtBranchList);

            string json = JsonConvert.SerializeObject(dtBranchList, Formatting.None);
            dtBranchList.Clear();
            return json;

        }

        [WebMethod]
        public static string YearList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtYearList = new DataTable();

            try
            {

                dtYearList = objMain.dtFetchData("select [Year] FROM tblHrYearMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            // return JsonConvert.SerializeObject(dtBranchList);

            string json = JsonConvert.SerializeObject(dtYearList, Formatting.None);
            dtYearList.Clear();
            return json;

        }

        [WebMethod]
        public static string MonthList()
        {
            DataTable dtMonthList = new DataTable();

            try
            {

                dtMonthList = objMain.dtFetchData("select MonthName FROM tblHrMonthMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            // return JsonConvert.SerializeObject(dtBranchList);

            string json = JsonConvert.SerializeObject(dtMonthList, Formatting.None);
            dtMonthList.Clear();
            return json;

        }

        [WebMethod]
        public static string EmployeeMasterList(string branchid = "")
        {
            // clsMain objMain = new clsMain();
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData("select EmpId,EmpName+' ('+EmpId+')' as EmpName from tblHrEmpMaster where Branchcode='" + branchid + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDepartmentList);
        }


        [WebMethod]
        public static string FetchEmployeeDetails(string EmpId = "")
        {
            DataTable dtEmployeeList = new DataTable();

            try
            {

                dtEmployeeList = objMain.dtFetchData("select EmpName from tblHrEmpMaster where EmpId='" + EmpId + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtEmployeeList);
        }

        [WebMethod]
        public static string FetchEmpSummerADetails(string id = "")
        {
            DataTable dtEmpSummerAList = new DataTable();

            try
            {
                dtEmpSummerAList = objMain.dtFetchData(@"select ES.Id as Id,ES.EmpId AS EmpId,EM.EmpName+' ('+EM.EmpId+')' as EmpName, ES.BranchCode as BranchCode,[Year],[Month],SummerA
                from tblHrEmpSummerA  ES INNER JOIN tblHrEmpMaster EM ON ES.EmpId = EM.EmpId where ES.Id='" + id + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtEmpSummerAList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchEmpSummerAList()
        {
            DataTable dtEmpSummerAList = new DataTable();

            try
            {
                dtEmpSummerAList = objMain.dtFetchData(@"select ES.Id,ES.EmpId AS EmpId,EM.EmpName+' ('+EM.EmpId+')' as EmpName, ES.BranchCode,BM.[BranchName],[Year],[Month],SummerA
                from tblHrEmpSummerA  ES INNER JOIN tblHrEmpMaster EM ON ES.EmpId = EM.EmpId
				INNER JOIN tblHrBranchMaster BM ON ES.BranchCode = BM.BranchCode");
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

            string json = JsonConvert.SerializeObject(dtEmpSummerAList, Formatting.None);
            dtEmpSummerAList.Clear();
            return json;
        }

        [WebMethod]
        public static string CheckDataAvailability(string EmpId, string Year, string Month)
        {
            bool isPayrollProcceed = false;
            bool isRecordExists = false;
            try
            {
                SqlParameter[] objParam = new SqlParameter[3];

                objParam[0] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = EmpId;

                objParam[1] = new SqlParameter("@Year", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = Year;

                objParam[2] = new SqlParameter("@Month", SqlDbType.NVarChar);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = Month;

                DataTable dt = objMain.ExecuteStoreProcedure("procHrEmpSummerACheckData", objParam);
                isPayrollProcceed = Convert.ToBoolean(dt.Rows[0]["IsPayrollProcceed"]);
                isRecordExists = Convert.ToBoolean(dt.Rows[0]["IsRecordExists"]);
            }
            catch (Exception ex)
            {
                return "False";
            }

            return JsonConvert.SerializeObject(new { isPayrollProcceed, isRecordExists });
        }

        [WebMethod]
        public static string AddData(string BranchCode,  string EmpId,  string Year, string Month, string SummerA, string LoginUser = "")
        {
            SqlParameter[] objParam = new SqlParameter[6];

            objParam[0] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = BranchCode;

            objParam[1] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = EmpId;

            objParam[2] = new SqlParameter("@Year", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Year;

            objParam[3] = new SqlParameter("@Month", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Month;

            objParam[4] = new SqlParameter("@SummerA", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = SummerA;

            objParam[5] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = LoginUser;

            var resultstatus = objMain.ExecuteProcedure("procHrEmpSummerAEntry", objParam);
            string json = JsonConvert.SerializeObject(resultstatus, Formatting.None);
            return json;
        }
    }
}