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
    public partial class wfPmSiteVisit : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

                    //added on 16-07-2024
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
        public static string ClientList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtClientList = new DataTable();

            try
            {

                dtClientList = objMain.dtFetchData("select [CustomerName] from [tblCrmCustomers]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtClientList);
        }
        /*
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
        public static string CheckUserAvailability(string userId, string fullName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblPmSiteVisit where UserId='{0}' or FullName='{1}'", userId, fullName));
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
        public static string FetchPmSiteVisitDetails(string userId, string fullName)
        {
            // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select UserId,FullName,Address,PhoneNo,Password,City,StateId,Pincode from tblPmSiteVisit where UserId='{0}' or FullName='{1}'", userId, fullName));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
*/
        [WebMethod]
        public static string FetchDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtUserList = new DataTable();

            try
            {

                dtUserList = objMain.dtFetchData(@"select [VisitId],[ClientId],[DateOfVisit],[Project],[SiteVisit],[ConductedBy]
                                                    ,[SiteAddress],[SiteCondition] from [tblSiteVisitMaster]");

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
            return JsonConvert.SerializeObject(dtUserList, settings);
        }

        

        [WebMethod]
        public static string AddPMSiteVisitDetails(string visitId, string assignedClient, string siteAddress, string project, string conducted, string condition, string siteVisit, string dateOfVisit, string createdDate, string loginUser)
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[11];

            objParam[0] = new SqlParameter("@VisitId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = visitId;

            objParam[1] = new SqlParameter("@SiteAddress", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = siteAddress;

            objParam[2] = new SqlParameter("@Project", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = project;

            objParam[3] = new SqlParameter("@ConductedBy", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = conducted;

            objParam[4] = new SqlParameter("@SiteCondition", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = condition;

            objParam[5] = new SqlParameter("@SiteVisit", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = siteVisit;

            objParam[6] = new SqlParameter("@DateOfVisit", SqlDbType.DateTime2);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = dateOfVisit;

            objParam[7] = new SqlParameter("@CreatedDate", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = createdDate;

            objParam[8] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = loginUser;

            objParam[9] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = loginUser;

            objParam[10] = new SqlParameter("@ClientId", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = assignedClient;
            var result = objMain.ExecuteProcedure("procPmSiteVisit", objParam);

            return "";
        }
    }

}