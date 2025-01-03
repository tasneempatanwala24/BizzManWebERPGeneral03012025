using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfHrBranchMasterNew : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

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
        public static string StateList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select StateId,StateName from tblHrStateMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtStateList);
        }
        [WebMethod]
        public static string FetchHrMasterDetails(string branchCode, string branchName)
        {
           // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select BranchCode,BranchName,BranchAddress,ContactNo,Email,StateId,Active from tblHrBranchMaster where BranchCode='{0}' or BranchName='{1}'", branchCode, branchName));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }

        [WebMethod]
        public static string FetchDetails()
        {
           // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select BranchCode,BranchName,BranchAddress,ContactNo,Email,hsm.StateName,Active
                                                 from tblHrBranchMaster hbm
                                                 inner join tblHrStateMaster hsm on hsm.StateId=hbm.StateId");
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
            return JsonConvert.SerializeObject(dtEmpList, settings);
        }

        [WebMethod]
        public static string CheckBranchAvailability(string branchCode, string branchName, string isUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblHrBranchMaster where BranchCode='{0}' or BranchName='{1}'",branchCode,branchName));
                }
                else
                {
                    checkId = false;
                }
            }
            catch (Exception ex)
            {
                return "False";
            }

            return JsonConvert.SerializeObject(checkId.ToString());
        }


        [WebMethod]
        public static string AddDetails(string branchCode, string branchName, string branchAddress,string contactNo,string email,string stateId, string active,string loginUser)
        {

           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[9];

            objParam[0] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = branchCode;

            objParam[1] = new SqlParameter("@BranchName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = branchName;

            objParam[2] = new SqlParameter("@BranchAddress", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = branchAddress;

            
            objParam[3] = new SqlParameter("@ContactNo", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = contactNo;

            objParam[4] = new SqlParameter("@Email", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = email;

            objParam[5] = new SqlParameter("@StateId", SqlDbType.Int);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Convert.ToInt32(stateId);

            objParam[6] = new SqlParameter("@Active", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = active;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;

            objParam[8] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = loginUser;

            var result = objMain.ExecuteProcedure("procHrBranchMasterNew", objParam);

            return "";
        }
    }
}