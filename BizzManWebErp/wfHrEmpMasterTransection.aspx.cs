using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfHrEmpMasterTransection : System.Web.UI.Page
    {
        //added on 12 Dec 2023
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
        public static string FetchEmployeTransactionList(string EmployeeId="")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtEmpTransList = new DataTable();

            try
            {

                dtEmpTransList = objMain.dtFetchData(@"select et.EmpId,e.EmpName,CONVERT(nvarchar,et.TranDate,106) as TranDate,
                                                  b.BranchName as FromBranch,b1.BranchName as ToBranch,et.Action,et.TranNote
                                                  from tblHrEmpTransaction et join tblHrEmpMaster e on e.EmpId=et.EmpId
                                                  join tblHrBranchMaster b on b.BranchCode=et.FromBranch
                                                  join tblHrBranchMaster b1 on b1.BranchCode=et.ToBranch 
                                                  "+(EmployeeId!="" ? " where et.EmpId='"+ EmployeeId + "'":"") +" order by et.id desc");
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
            return JsonConvert.SerializeObject(dtEmpTransList, settings);
        }


        [WebMethod]
        public static string EmployeeMasterList(string branchid)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData("select EmpId,EmpName+' ('+EmpId+')' as EmpName from tblHrEmpMaster where Branchcode='"+branchid+ "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDepartmentList);
        }



        [WebMethod]
        public static string BranchMasterList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select [BranchCode],[BranchName] FROM [tblHrBranchMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }
         

        [WebMethod]
        public static string FetchEmployeeDetails(string EmpId = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select EmpId,EmpName,Branchcode,DOB,DOJ,PresentDesignation,PresentDepartId,Area,
                                              FatherName,MotherName,SpouseName,Division,Grade,PresentResNo,PresentResName,
                                              PresentRoadStreet,PresentPinNo,PresentPost,PresentState,PresentDistrict,
                                              PermanentResNo,PermanentResName,PermanentRoadStreet,PermanentPinNo,PermanentPost,
                                              PermanentState,PermanentDistrict,AdharNo,VoterNo,PanNo,Passport,DrivingNo,
                                              IfscCode,BankBranchName,BankName,AcNumber,PfNo,EsiNo,Sex,MaritalStatus,
                                              MobileNo,EmailAddress,Religion,Caste from tblHrEmpMaster where EmpId='" + EmpId + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            return json;
        }



        [WebMethod]
        public static string AddEmployeeTransection(string EmpId = "", string FromBranch = "", string ToBranch = "", string Action = "",
                                    string ActionDate = "", string Note = "", string LoginUser="")
        {

         //   clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[7];


            objParam[0] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = EmpId;


            objParam[1] = new SqlParameter("@FromBranch", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = FromBranch;


            objParam[2] = new SqlParameter("@ToBranch", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = ToBranch;


            objParam[3] = new SqlParameter("@Action", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Action;

            
                objParam[4] = new SqlParameter("@ActionDate", SqlDbType.DateTime);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = Convert.ToDateTime(ActionDate);
            
            objParam[5] = new SqlParameter("@Note", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Note;

            objParam[6] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = LoginUser;


            var result = objMain.ExecuteProcedure("procHrEmpMasterTransectionInsertUpdate", objParam);


            return "";
        }

    }
}