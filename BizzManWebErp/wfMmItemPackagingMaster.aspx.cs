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
    public partial class wfMmItemPackagingMaster : System.Web.UI.Page
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
        public static string AddPackage(string PackageName, string UOM, 
            string PhotoImage, string User, string Id, string Description = "")
        {
            SqlParameter[] objParam = new SqlParameter[6];

            objParam[0] = new SqlParameter("@PackageName", SqlDbType.VarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = PackageName;

            objParam[1] = new SqlParameter("@UOM", SqlDbType.VarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = UOM;

            objParam[2] = new SqlParameter("@PhotoImage", SqlDbType.VarBinary);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Encoding.UTF8.GetBytes(PhotoImage);

            objParam[3] = new SqlParameter("@User", SqlDbType.VarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = User;

            objParam[4] = new SqlParameter("@Id", SqlDbType.Int);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Convert.ToInt32(Id);

            objParam[5] = new SqlParameter("@Description", SqlDbType.VarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Description;

            var result = objMain.ExecuteProcedure("procMmItemPackagingMaster", objParam);

            return "";
        }

        [WebMethod]
        public static string GetPackageList()
        {
            DataTable dtlist = new DataTable();

            try
            {

                dtlist = objMain.dtFetchData(@"SELECT Id,PackagingName,UnitMesure FROM tblMmItemPackagingMaster");
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
        public static string GetPackageById(string Id)
        {

            DataTable dtList = new DataTable();

            try
            {
                string sqlQuery = $"SELECT PackagingName,UnitMesure,[Description], CAST(PackageLogo as varchar(max))[PhotoImage] from tblMmItemPackagingMaster WHERE Id ={Id} ";

                dtList = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtList, Formatting.None);

        }

        [WebMethod]
        public static string GetPackageImageById(string Id)
        {

            // clsMain objMain = new clsMain();
            DataTable dtImages = new DataTable();

            try
            {
                string sqlQuery = $"SELECT CAST(PackageLogo as varchar(max))[PhotoImage] " +
                                  $"FROM tblMmItemPackagingMaster WHERE PackagingName ={Id} ";

                dtImages = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtImages, Formatting.None);

        }
        [WebMethod]
        public static string UnitMesureList()
        {
            DataTable dtUnitList = new DataTable();

            try
            {

                dtUnitList = objMain.dtFetchData("select UnitMesureName FROM tblFaUnitMesureMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtUnitList);
        }

        [WebMethod]
        public static string CheckJobAvailability(string PackageName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblMmItemPackagingMaster where PackagingName='{0}'", PackageName));
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