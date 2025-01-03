using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using System.Security;

namespace BizzManWebErp
{
    public partial class wfSdProjectMaster_Display : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Id"] != null)
            {
                loginuser.Value = Session["Id"].ToString();
                if (Session["objMain_Session"] != null)
                    objMain = (clsMain)Session["objMain_Session"];
                else
                
                    Response.Redirect("wfAdminLogin.aspx");
            }
        }


        [WebMethod]
        [SecuritySafeCritical]
        public static string GetProjectById(string Id)
        {
            objMain= objMain = (clsMain)HttpContext.Current.Session["objMain_Session"];
            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@Id", SqlDbType.BigInt);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt64(Id);

            DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjectById", objParam);
            return JsonConvert.SerializeObject(result);
        }
    }
}