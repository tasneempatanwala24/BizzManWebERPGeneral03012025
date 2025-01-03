using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfAdminCompanyMasterNew : System.Web.UI.Page
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
        public static string AddCompany(string CompanyName, string Address1, string Address2, string Phone, string Email, string Website,
            string PhotoImage, string User, string Id, string PAN, string Gst)
        {
            string filename = string.Empty;
            if (!string.IsNullOrEmpty(PhotoImage) || PhotoImage == "Images/logo.png")
            {
                filename = "logo.png";
            }

            SqlParameter[] objParam = new SqlParameter[11];

            objParam[0] = new SqlParameter("@CompanyName", SqlDbType.VarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = CompanyName;

            objParam[1] = new SqlParameter("@Address1", SqlDbType.VarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Address1;

            objParam[2] = new SqlParameter("@Address2", SqlDbType.VarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Address2;

            objParam[3] = new SqlParameter("@Phone", SqlDbType.VarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Phone;

            objParam[4] = new SqlParameter("@Email", SqlDbType.VarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Email;

            objParam[5] = new SqlParameter("@PAN", SqlDbType.VarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = PAN;

            objParam[6] = new SqlParameter("@Website", SqlDbType.VarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Website;

            objParam[7] = new SqlParameter("@PhotoImage", SqlDbType.VarBinary);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = Encoding.UTF8.GetBytes(PhotoImage); ;

            objParam[8] = new SqlParameter("@User", SqlDbType.VarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = User;

            objParam[9] = new SqlParameter("@Id", SqlDbType.Int);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = Convert.ToInt32(Id);

            objParam[10] = new SqlParameter("@Gst", SqlDbType.VarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = Gst;

            var result = objMain.ExecuteProcedure("procAdminCompanyMaster", objParam);
            if (result.status == "success")
            {
                if (PhotoImage != "Images/logo.png")
                {
                    if (!string.IsNullOrEmpty(PhotoImage))
                    {
                        int startIndex = PhotoImage.IndexOf(',') + 1;
                        PhotoImage = PhotoImage.Substring(startIndex);
                        byte[] imageBytes = Convert.FromBase64String(PhotoImage);
                        string folderPath = HttpContext.Current.Server.MapPath("~/Images/");
                        string imagePath = System.IO.Path.Combine(folderPath, filename);
                        File.WriteAllBytes(imagePath, imageBytes);
                    }
                }
            }
            return "";
        }

        [WebMethod]
        public static string GetCompanyList()
        {
           DataTable dtlist = new DataTable();

            try
            {

                dtlist = objMain.dtFetchData(@"SELECT Id,CompanyName,PhoneNo,EmailAddress,'Images/logo.png' as Logo,GstNo,PanNo,WebSiteAddress FROM tblAdminCompanyMaster");
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
        public static string GetCompanyById(string Id)
        {

            DataTable dtList = new DataTable();

            try
            {
                string sqlQuery = $"SELECT CompanyName,Address1,Address2,'Images/logo.png' as Logo,PhoneNo as Phone,EmailAddress as Email,PanNo as PAN,WebSiteAddress, GstNo,Active from tblAdminCompanyMaster WHERE Id ={Id} ";

                dtList = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtList, Formatting.None);

        }

        [WebMethod]
        public static string GetCompanyImageById(string Id)
        {

            // clsMain objMain = new clsMain();
            DataTable dtImages = new DataTable();

            try
            {
                string sqlQuery = $"SELECT 'Images/logo.png' as Logo, " +
                                  $"FROM tblAdminCompanyMaster WHERE CompanyName ={Id} ";

                dtImages = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtImages, Formatting.None);

        }

        [WebMethod]
        public static string CheckJobAvailability(string CompanyName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblAdminCompanyMaster where CompanyName='{0}'", CompanyName));
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