using DocumentFormat.OpenXml.Wordprocessing;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
//using System.Windows.Forms;

namespace BizzManWebErp
{
    public partial class wfPmSurveyForm : System.Web.UI.Page
    {
        static clsMain objMain;
        
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["Id"] != null)
            {
                loginuser.Value = Convert.ToString(Session["Id"]);

                Console.WriteLine(Session["Id"].ToString());
                //txtUserId.Text = Convert.ToString(Session["Id"]);
                //strSql1 = "SELECT EmpId FROM tblUserMaster WHERE UserName='" + txtUserId.Text + "' ";
                //strTemp = objMain.strFetchDate(strSql1);

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
        public static string FetchPmSurveyMasterDetails(string userId)
        {
            // clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            // =Convert.ToString(Session["Id"]);
            // userId = HttpContext.Current.Session.SessionID;

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select EmpId,UserName from [tblUserMaster] where UserName='{0}'", userId));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string FetchSurveyList(string userName)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {
                dtCustomerList = objMain.dtFetchData(string.Format("SELECT  tblPmEmpSurveyMaster.EmpName, tblPmEmpSurveyMaster.Designation, tblPmEmpSurveyMaster.Date, tblPmEmpSurveyMaster.Branch, tblPmSurveytable.Year,"
                                                   + "tblPmSurveytable.Month, tblPmSurveytable.[Site Name] as [SiteName],tblPmSurveytable.[Site Address] as [SiteAddress],tblPmSurveytable.[Site Incharge] as [SiteIncharge]"
                                                   + "FROM tblPmEmpSurveyMaster inner join tblPmSurveytable  on tblPmEmpSurveyMaster.EmpName ="
                                                   + " tblPmSurveytable.[Employee Name] where tblPmSurveytable.[Employee Name] ='{0}'",userName));
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
            return JsonConvert.SerializeObject(dtCustomerList, settings);
        }
        [WebMethod]
        public static string AddPMSurveyDetails(string userId, string userName, string designation, string date, string branch, string loginUser)
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[7];

            objParam[0] = new SqlParameter("@EmpName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = userId;

            objParam[1] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = userName;

            objParam[2] = new SqlParameter("@Designation", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = designation;

            objParam[3] = new SqlParameter("@Date", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = date;

            objParam[4] = new SqlParameter("@Branch", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = branch;

            objParam[5] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = loginUser;

            objParam[6] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = loginUser;

            var result = objMain.ExecuteProcedure("procPmEmpSurveyMaster", objParam);

            return "";
        }

    }
}