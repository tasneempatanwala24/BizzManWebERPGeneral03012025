using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfCrmBkrmLeadCollect : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 21 Nov 2024
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
        public static string BindLeadsEntryMaster()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtLeadsEntryList = new DataTable();

            try
            {

                dtLeadsEntryList = objMain.dtFetchData(@"select [LeadID],[CustomerName],[Date],[Designation],[ContactNo],[Requirements],[CompanyName] from tblCrmBkrmLeadCollect");

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
            return JsonConvert.SerializeObject(dtLeadsEntryList, settings);
        }
        [WebMethod]
        public static string AddLeadsEntryDetails(string leadId = "", string customerName = "", string date = "", string designation = "",
             string companyName = "", string requirements = "", string contactNo = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@LeadID", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = leadId;

            objParam[1] = new SqlParameter("@CustomerName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = customerName;

            objParam[2] = new SqlParameter("@Date", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = date;

            objParam[3] = new SqlParameter("@Designation", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = designation;

            objParam[4] = new SqlParameter("@Requirements", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = requirements;

            objParam[5] = new SqlParameter("@ContactNo", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = contactNo;

            objParam[6] = new SqlParameter("@CompanyName", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = companyName;


            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;

            var result = objMain.ExecuteProcedure("procCrmBkrmLeadCollectDetails", objParam);


            return "";
        }
    }
}
