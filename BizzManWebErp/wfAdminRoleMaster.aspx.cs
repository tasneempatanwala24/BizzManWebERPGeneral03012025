using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfAdminRoleMaster : System.Web.UI.Page
    {
        //added by Tasneem Patanwala on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);
                    //added by Tasneem Patanwala on 12 Dec 2023
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
        public static string DashboardList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select DashboardName from tblAdminDashboardMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtStateList);
        }
        [WebMethod]
        public static string FetchDetails()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select RoleId,RoleName,DashboardName,Description,Active    
                                                 from tblAdminRoleMaster");
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
        public static string CheckAvailability(string RoleName, string isUpdate)
        {
           // clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblAdminRoleMaster where RoleName='{0}'", RoleName));
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
        public static string FetchRoleMasterDetails(string RoleName = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(@"select RoleName,DashboardName,Active,Description
                                                       from tblAdminRoleMaster where RoleName='" + RoleName + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            //var settings = new JsonSerializerSettings
            //{
            //    Formatting = Formatting.Indented,
            //    NullValueHandling = NullValueHandling.Ignore,
            //    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            //    PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            //};

            //JavaScriptSerializer serializer = new JavaScriptSerializer();

            //serializer.MaxJsonLength = Int32.MaxValue;
            //return serializer.Serialize(dtEmpList); //JsonConvert.SerializeObject(dtEmpList, settings);

            string json = JsonConvert.SerializeObject(dtCategoryList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string AddDetails(string RoleName, string DashboardName, string Active, string loginUser, string Description)
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[6];

            objParam[0] = new SqlParameter("@RoleName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = RoleName;

            objParam[1] = new SqlParameter("@DashboardName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = DashboardName;

            objParam[2] = new SqlParameter("@Active", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Active;

            objParam[3] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = loginUser;

            objParam[4] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = loginUser;

            objParam[5] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Description;


            var result = objMain.ExecuteProcedure("procAdminRoleMaster", objParam);

            return "";
        }
    }
}