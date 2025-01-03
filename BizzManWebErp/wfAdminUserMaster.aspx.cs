using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfAdminUserMaster : System.Web.UI.Page
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
        public static string EmpIdList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select EmpId from tblHrEmpMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtStateList);
        }
        [WebMethod]
        public static string RoleNameList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select RoleId,RoleName from tblAdminRoleMaster");
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

                dtEmpList = objMain.dtFetchData(@"select UserName,Password,hsm.RoleName,e.EmpId,AccessStatus,PersonName,Address,hbm.MobileNo,Email,hbm.Description    
                                                 from tblUserMaster hbm
                                                 left join tblAdminRoleMaster hsm on hsm.RoleId=hbm.RoleId
                                                 left join tblHrEmpMaster e on  e.EmpId=hbm.EmpId");
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
        public static string CheckAvailability(string UserName, string EmpId, string isUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool checkId = new bool();
            Debug.WriteLine("-------value==>",EmpId);
            try
            {
                if (EmpId == "" && isUpdate == "0")
                {
                    Debug.WriteLine("-------", EmpId);
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblUserMaster where UserName='{0}'", UserName));
                   

                }
                else if (isUpdate == "0")
                {
                    Debug.WriteLine("-------", EmpId);
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblUserMaster where UserName='{0}' or EmpId='{1}'", UserName, EmpId));
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
        public static string FetchUserMasterDetails(string UserName = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(@"select UserName,Password,RoleId,EmpId,AccessStatus,PersonName,Address,MobileNo,Email,Description
                                                       from tblUserMaster where UserName='" + UserName + "'");
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
        public static string AddDetails(string UserName, string Password, string EmpId, string RoleId, string AccessStatus, string loginUser, string PersonName, string Address, string MobileNo, string Email, string Description)
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[12];

            objParam[0] = new SqlParameter("@UserName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = UserName;

            objParam[1] = new SqlParameter("@Password", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Password;

            objParam[2] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = EmpId;

            objParam[3] = new SqlParameter("@RoleId", SqlDbType.BigInt);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = RoleId;

            objParam[4] = new SqlParameter("@AccessStatus", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = AccessStatus;

            objParam[5] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = loginUser;

            objParam[6] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = loginUser;

            objParam[7] = new SqlParameter("@PersonName", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = PersonName;

            objParam[8] = new SqlParameter("@Address", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Address;

            objParam[9] = new SqlParameter("@MobileNo", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = MobileNo;

            objParam[10] = new SqlParameter("@Email", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = Email;

            objParam[11] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = Description;


            var result = objMain.ExecuteProcedure("procAdminUserMaster", objParam);

            return "";
        }


    }
}