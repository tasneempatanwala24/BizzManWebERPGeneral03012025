using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfHrDeptMasterNew : System.Web.UI.Page
    {
        static clsMain objMain;
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

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
        public static string FetchMasterDetails(string Id = "")
        {
            // clsMain objMain = new clsMain();
            DataTable dtMaterialList = new DataTable();

            try
            {
                dtMaterialList = objMain.dtFetchData(@"select Id, DeptName  from tblHrDeptMaster where Id = " + Id + "");
            }
            catch (Exception ex)
            {
                // return "";
            }
            string json = JsonConvert.SerializeObject(dtMaterialList, Formatting.None);
            dtMaterialList.Clear();
            return json;
        }

        [WebMethod]
        public static string FetchMasterList()
        {
            DataTable dtEmpList = new DataTable();

            try
            {
                dtEmpList = objMain.dtFetchData(@"select Id, DeptName from tblHrDeptMaster");
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

            string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            dtEmpList.Clear();
            // return JsonConvert.SerializeObject(dtEmpList, settings);
            return json;
        }

        [WebMethod]
        public static string CheckDataAvailability(string strSearchName, string isUpdate)
        {
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblHrDeptMaster where DeptName='{0}'", strSearchName));
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
        public static string AddData(string DeptName, string loginUser)
        {

            SqlParameter[] objParam = new SqlParameter[2];

            objParam[0] = new SqlParameter("@DeptName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = DeptName;

            objParam[1] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = loginUser;

            var result = objMain.ExecuteProcedure("procHrDeptMasterNew", objParam);
            return "";
        }
    }
}