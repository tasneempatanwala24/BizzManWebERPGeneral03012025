
using BizzManWebErp.Model;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using System.Web.Services;
using System.Security;
using ClosedXML.Excel;
using System.Text;

namespace BizzManWebErp
{
    public partial class wfSdProjectMaster : System.Web.UI.Page
    {
        static clsMain objMain;
        static string userName = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                if (!IsPostBack)
                {
                    if (Session["Id"] != null)
                    {
                        if (Session["objMain_Session"] != null)
                        {
                            objMain = (clsMain)Session["objMain_Session"];
                            userName = Session["Id"].ToString();
                        }
                        else
                        {
                            Response.Redirect("wfAdminLogin.aspx");
                        }

                    }
                    else
                    {
                        Response.Redirect("wfAdminLogin.aspx");
                    }
                }
            }
            catch (Exception)
            {
                Response.Redirect("wfAdminLogin.aspx");
            }
        }

        [WebMethod]
        public static string GetPaymentMode()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdGetPaymentMode", null);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string GetProjectDetailsById(string Id)
        {
            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@Id", SqlDbType.BigInt);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt64(Id);

            DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjectById", objParam);
            return JsonConvert.SerializeObject(result);
        }
        [WebMethod]
        public static string GetProjectCategory()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjCategory", null);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string GetProjectBranch()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjBranch", null);
            return JsonConvert.SerializeObject(result);
        }
        [WebMethod]
        public static string GetProjectLocation()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjInventLocation", null);
            return JsonConvert.SerializeObject(result);
        }
        [WebMethod]
        public static string GetProjectList()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjectList", null);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string AddUpdateProject(ProjectMaster projectMaster)
        {
            try
            {
                SqlParameter[] objParam = new SqlParameter[18];

                objParam[0] = new SqlParameter("@Id", SqlDbType.BigInt);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = Convert.ToInt64(projectMaster.Id);

                objParam[1] = new SqlParameter("@Name", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = projectMaster.Name;

                objParam[2] = new SqlParameter("@CategoryId", SqlDbType.BigInt);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = Convert.ToInt16(projectMaster.Category);

                objParam[3] = new SqlParameter("@BranchId", SqlDbType.NVarChar);
                objParam[3].Direction = ParameterDirection.Input;
                objParam[3].Value = projectMaster.Branch;

                objParam[4] = new SqlParameter("@LocationId", SqlDbType.BigInt);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = Convert.ToInt16(projectMaster.Location);

                objParam[5] = new SqlParameter("@ExpStartDate", SqlDbType.SmallDateTime);
                objParam[5].Direction = ParameterDirection.Input;
                objParam[5].Value = projectMaster.ExpStartDate;

                objParam[6] = new SqlParameter("@ActStartDate", SqlDbType.SmallDateTime);
                objParam[6].Direction = ParameterDirection.Input;
                objParam[6].Value = projectMaster.ActStartDate;

                objParam[7] = new SqlParameter("@ExpFinishDate", SqlDbType.SmallDateTime);
                objParam[7].Direction = ParameterDirection.Input;
                objParam[7].Value = projectMaster.ExpFinishDate;

                objParam[8] = new SqlParameter("@ActFinishDate", SqlDbType.SmallDateTime);
                objParam[8].Direction = ParameterDirection.Input;
                objParam[8].Value = projectMaster.ActFinishDate;

                objParam[9] = new SqlParameter("@ActCost", SqlDbType.Decimal);
                objParam[9].Direction = ParameterDirection.Input;
                objParam[9].Value = projectMaster.ActCost;

                objParam[10] = new SqlParameter("@ExpCost", SqlDbType.Decimal);
                objParam[10].Direction = ParameterDirection.Input;
                objParam[10].Value = projectMaster.ExpCost;

                objParam[11] = new SqlParameter("@IsActive", SqlDbType.NVarChar);
                objParam[11].Direction = ParameterDirection.Input;
                objParam[11].Value = projectMaster.IsActive;

                objParam[12] = new SqlParameter("@Logo", SqlDbType.VarBinary);
                objParam[12].Direction = ParameterDirection.Input;
                objParam[12].Value = Encoding.UTF8.GetBytes(projectMaster.Logo);

                objParam[13] = new SqlParameter("@Doc", SqlDbType.VarBinary);
                objParam[13].Direction = ParameterDirection.Input;
                objParam[13].Value = Encoding.UTF8.GetBytes(projectMaster.Doc);

                objParam[14] = new SqlParameter("@Description", SqlDbType.NVarChar);
                objParam[14].Direction = ParameterDirection.Input;
                objParam[14].Value = projectMaster.Description;

                objParam[15] = new SqlParameter("@Address1", SqlDbType.NVarChar);
                objParam[15].Direction = ParameterDirection.Input;
                objParam[15].Value = projectMaster.Address1;

                objParam[16] = new SqlParameter("@Address2", SqlDbType.NVarChar);
                objParam[16].Direction = ParameterDirection.Input;
                objParam[16].Value = projectMaster.Address2;

                objParam[17] = new SqlParameter("@User", SqlDbType.NVarChar);
                objParam[17].Direction = ParameterDirection.Input;
                objParam[17].Value = userName;

                DataTable result = objMain.ExecuteStoreProcedure("procSdProjectMasterAddUpldate", objParam);
                if (result == null)
                    return JsonConvert.SerializeObject(result);
                else
                    return JsonConvert.SerializeObject(result.Rows[0][0].ToString());
            }
            catch (Exception ex)
            {
                return default;
            }
        }

        [WebMethod]
        [SecuritySafeCritical]
        public static ProjectMaster DownloadFile()
        {
            DataTable dt = objMain.ExecuteStoreProcedure("procSdProjectMasterDownload", null);
            string fileName = "ProjectList";

            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dt, "ProjectList");
                using (MemoryStream stream = new MemoryStream())
                {
                    fileName = fileName + "_" + DateTime.Today.ToString("yyyy/MM/dd") + ".xlsx";
                    string tempPath = HttpContext.Current.Server.MapPath("/") + fileName;

                    wb.SaveAs(tempPath);

                    byte[] bytes = File.ReadAllBytes(tempPath);

                    if (File.Exists(tempPath))
                        File.Delete(tempPath);
                    ProjectMaster project = new ProjectMaster();
                    project.FileString = Convert.ToBase64String(bytes, 0, bytes.Length);
                    project.FileName = fileName;

                    return project;
                }
            }

        }
        [WebMethod]
        [SecuritySafeCritical]
        public static ProjectMaster DownloadDocument(string Id)
        {

            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@Id", SqlDbType.BigInt);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt64(Id);

            DataTable dt = objMain.ExecuteStoreProcedure("procSdProjectMasterGetProjectById", objParam);

            string fileName = "ProjectList";

            string path = HttpContext.Current.Server.MapPath("~/Images/");


            byte[] bytes = (byte[])dt.Rows[0]["ProjectDocument"];

            //Convert File to Base64 string and send to Client.
            ProjectMaster project = new ProjectMaster();
            project.FileString = Convert.ToBase64String(bytes, 0, bytes.Length);
            project.FileName = fileName;

            return project;

        }
    }
}



