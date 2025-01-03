using BizzManWebErp;
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
    public partial class wfHrEmpJobCategoryMaster : System.Web.UI.Page
    {
        //added on 12 Dec 2023
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
        public static string FetchEmpCategoryDetails(string Name = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();
            try
            {
                dtCategoryList = objMain.dtFetchData(@"select Id,JobCategoryName from tblHrEmpJobCategoryMaster where JobCategoryName='" + Name + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtCategoryList, Formatting.None);
            return json;
        }
        [WebMethod]
        public static string FetchEmpCategoryList()
        {
           // clsMain objcategory = new clsMain();
            DataTable dtcategory = new DataTable();
            try
            {
              //  dtcategory = objcategory.dtFetchData(@"select Id,JobCategoryName from tblHrEmpJobCategoryMaster");
                dtcategory = objMain.dtFetchData(@"select Id,JobCategoryName from tblHrEmpJobCategoryMaster");
            }
            catch (Exception)
            {
                throw;
            }
            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            return JsonConvert.SerializeObject(dtcategory, settings);
        }
        [WebMethod]
        public static string CheckCategoryNameAvailability(string Name, string IsUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool CheckName = new bool();

            try
            {
                if (IsUpdate == "0")
                {
                    CheckName = objMain.blSearchDataHO("select JobCategoryName FROM [tblHrEmpJobCategoryMaster] where JobCategoryName='" + Name + "'");

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
        [WebMethod]
        public static string AddEmpCategoryMaster(string Id = "", string JobCategoryName = "", string CreateUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[3];
            objParam[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Id;

            objParam[1] = new SqlParameter("@JobCategoryName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = JobCategoryName;

            objParam[2] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = CreateUser;

            var result = objMain.ExecuteProcedure("procHrEmpJobCategoeryMaster", objParam);

            return "";
        }
    }
}