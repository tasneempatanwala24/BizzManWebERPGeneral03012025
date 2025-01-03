using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfHrEmpOtEntry : System.Web.UI.Page
    {

        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

                    //added  on 24 Feb 2024
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
        public static string FetchEmpOTDetails(string id = "")
        {
            DataTable dtEmpList = new DataTable();

            try
            {
                dtEmpList = objMain.dtFetchData(@"select ELM.Id,ELM.EmpId AS EmpId,EM.EmpName+' ('+EM.EmpId+')' as EmpName, ELM.BranchCode,[Year],[Month],TotalOT
                ,ISNULL(ELM.TotalHours,0) AS TotalHours from tblHrEmpOtMasterEntry  ELM INNER JOIN tblHrEmpMaster EM ON ELM.EmpId = EM.EmpId where ELM.Id='" + id + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchEmpOTDetailsEntry(string BranchCode, string EmpId, string Year, string Month)
        {
            DataTable dtEmpOTList = new DataTable();

            try
            {
                dtEmpOTList = objMain.dtFetchData(@"Select OTD.Id AS Id,OT.Id as OtMasterEntryId,OT.[Year] as Year,OT.[Month] as Month,ISNULL([Day],'') as Day,
				ISNULL(OTD.Hours,0) AS Hours,ISNULL(OT.TotalHours,0) AS TotalHours
				from [dbo].[tblHrEmpOtDetailEntry] OTD RIGHT JOIN [dbo].[tblHrEmpOtMasterEntry] OT ON
                OT.Id = OTD.OTMasterEntryId where BranchCode ='" + BranchCode + "' and EmpId='" + EmpId + "' and Year='" + Year + "' and Month= '" + Month + "' ORDER BY [Day]");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtEmpOTList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchEmpOTList()
        {
            DataTable dtEmpLoanList = new DataTable();

            try
            {
                dtEmpLoanList = objMain.dtFetchData(@"select ELM.Id,ELM.EmpId AS EmpId,EM.EmpName+' ('+EM.EmpId+')' as EmpName, ELM.BranchCode,BM.[BranchName],[Year],[Month],TotalOT
                ,ISNULL(ELM.TotalHours,0) AS TotalHours from tblHrEmpOtMasterEntry  ELM INNER JOIN tblHrEmpMaster EM ON ELM.EmpId = EM.EmpId
				INNER JOIN tblHrBranchMaster BM ON ELM.BranchCode = BM.BranchCode");
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

            string json = JsonConvert.SerializeObject(dtEmpLoanList, Formatting.None);
            dtEmpLoanList.Clear();
            // return JsonConvert.SerializeObject(dtEmpList, settings);
            return json;
        }

        [WebMethod]
        public static string CheckDataAvailability(string OTDate, string EmpId, string Year, string Month)
        {
            bool isPayrollProcceed = false;
            bool isRecordExists = false;
            try
            {
                SqlParameter[] objParam = new SqlParameter[4];

                objParam[0] = new SqlParameter("@OTDate", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = OTDate;

                objParam[1] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = EmpId;

                objParam[2] = new SqlParameter("@Year", SqlDbType.NVarChar);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = Year;

                objParam[3] = new SqlParameter("@Month", SqlDbType.NVarChar);
                objParam[3].Direction = ParameterDirection.Input;
                objParam[3].Value = Month;

                DataTable dt = objMain.ExecuteStoreProcedure("procHrEmpOTCheckData", objParam);
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
        public static string DeleteOTDetailData(string Id, string OtMasterEntryId)
        {
            SqlParameter[] objParam = new SqlParameter[2];

            objParam[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(Id);

            objParam[1] = new SqlParameter("@OtMasterEntryId", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToInt32(OtMasterEntryId);

            var resultstatus = objMain.ExecuteProcedure("procHrEmpOtEntrydelete", objParam);
            string json = JsonConvert.SerializeObject(resultstatus, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string AddData(string BranchCode, string OTDate, string EmpId, string Year, string Month, string LoginUser = "",string Hours="")
        {
            SqlParameter[] objParam = new SqlParameter[7];

            objParam[0] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = BranchCode;

            objParam[1] = new SqlParameter("@OTDate", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = OTDate;

            objParam[2] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = EmpId;

            objParam[3] = new SqlParameter("@Year", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Year;

            objParam[4] = new SqlParameter("@Month", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Month;

            objParam[5] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = LoginUser;

            objParam[6] = new SqlParameter("@Hours", SqlDbType.Decimal);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = !string.IsNullOrEmpty(Hours) ? Convert.ToDecimal(Hours) : 0;

            var resultstatus = objMain.ExecuteProcedure("procHrEmpOtEntry", objParam);
            string json = JsonConvert.SerializeObject(resultstatus, Formatting.None);
            return json;
        }
    }
}