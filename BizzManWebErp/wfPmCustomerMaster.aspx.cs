using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.Services;
using System.Data;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfPmCustomerMaster : System.Web.UI.Page
    {
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

                    //added on 28-04-2024
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
        public static string CheckUserAvailability(string userId, string fullName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblPmCustomerMaster where UserId='{0}' or FullName='{1}'", userId, fullName));
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
        public static string FetchPmCustomerMasterDetails(string userId, string fullName)
        {
            // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select UserId,FullName,Address,PhoneNo,Password,City,StateId,Pincode from tblPmCustomerMaster where UserId='{0}' or FullName='{1}'", userId,fullName));
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
            DataTable dtUserList = new DataTable();

            try
            {

                dtUserList = objMain.dtFetchData(@"select UserId,FullName,Address,PhoneNo,Password,City,Pincode,hsm.StateName
                                                 from tblPmCustomerMaster hbm
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
            return JsonConvert.SerializeObject(dtUserList, settings);
        }



        [WebMethod]
        public static string AddPMCustomerMasterDetails(string userId, string fullName, string phoneNo, string password, string address, string stateId, string city,string pincode, string loginUser)
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[10];

            objParam[0] = new SqlParameter("@UserId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = userId;

            objParam[1] = new SqlParameter("@FullName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = fullName;

            objParam[2] = new SqlParameter("@PhoneNo", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = phoneNo;

            objParam[3] = new SqlParameter("@Password", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = password;

            objParam[4] = new SqlParameter("@Address", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = address;

            objParam[5] = new SqlParameter("@StateId", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = (stateId);

            objParam[6] = new SqlParameter("@City", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = city;

            objParam[7] = new SqlParameter("@Pincode", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = pincode;

            objParam[8] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = loginUser;

            objParam[9] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = loginUser;

            var result = objMain.ExecuteProcedure("procPmCustomerMaster", objParam);

            return "";
        }
    }
}
    
 