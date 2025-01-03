using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfMmItemGroupMaster : System.Web.UI.Page
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
        public static string AddItemGroup(string GroupName,string User, string Id, string Description = "")
        {
            SqlParameter[] objParam = new SqlParameter[4];

            objParam[0] = new SqlParameter("@GroupName", SqlDbType.VarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = GroupName;

            objParam[1] = new SqlParameter("@User", SqlDbType.VarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = User;

            objParam[2] = new SqlParameter("@Id", SqlDbType.Int);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Convert.ToInt32(Id);

            objParam[3] = new SqlParameter("@Description", SqlDbType.VarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Description;

            var result = objMain.ExecuteProcedure("procMmItemGroupMaster", objParam);

            return "";
        }

        [WebMethod]
        public static string GetItemGroupList()
        {
            DataTable dtlist = new DataTable();

            try
            {

                dtlist = objMain.dtFetchData(@"SELECT Id,GroupName FROM tblMmGroupMaster");
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
            return JsonConvert.SerializeObject(dtlist, settings);

        }

        [WebMethod]
        public static string GetItemGroupById(string Id)
        {

            DataTable dtList = new DataTable();

            try
            {
                string sqlQuery = $"SELECT GroupName,[Description] from tblMmGroupMaster WHERE Id ={Id} ";

                dtList = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtList, Formatting.None);

        }

        [WebMethod]
        public static string CheckJobAvailability(string GroupName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblMmGroupMaster where GroupName='{0}'", GroupName));
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
    }

    //public class Customer
    //{
    //    public int Id { get; set; }
    //    public string CustomerType { get; set; }
    //}
}