using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;


namespace BizzManWebErp
{
    public partial class wfMmVendorMaster : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

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
        }

        [WebMethod]
        public static string FetchVendorDetails(string VendorName = "")
        {
         //   clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(@"select Category,VendorName,VendorAddress,GST_No,EmailAddress,PhoneNo,
                                                       Description from tblMmVendorMaster where VendorName='" + VendorName + "'");
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
        public static string FetchVendorList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtVenodrList = new DataTable();

            try
            {
                dtVenodrList = objMain.dtFetchData(@"select Id,Category,VendorName,VendorAddress,GST_No,EmailAddress,PhoneNo,Description from tblMmVendorMaster");
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
            return JsonConvert.SerializeObject(dtVenodrList, settings);
        }


        [WebMethod]
        public static string CheckNameAvailability(string VendorName, string IsUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool CheckName = new bool();

            try
            {

                if (IsUpdate == "0")
                {
                    CheckName = objMain.blSearchDataHO("select VendorName FROM [tblMmVendorMaster] where VendorName='" + VendorName + "'");

                }
                else
                {
                    CheckName = false;
                }
            }
            catch (Exception ex)
            {
                return "False";
            }

            return JsonConvert.SerializeObject(CheckName.ToString());
        }


        [WebMethod]
        public static string AddVendor(string Category = "", string VendorName = "", string VendorAddress = "", string GST_No = "", string EmailAddress = "", string PhoneNo = "", string Description = "", string LoginUser = "")
        {

           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];


            objParam[0] = new SqlParameter("@Category", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Category;



            objParam[1] = new SqlParameter("@VendorName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = VendorName;



            objParam[2] = new SqlParameter("@VendorAddress", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = VendorAddress;

            objParam[3] = new SqlParameter("@GST_No", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = GST_No;

            objParam[4] = new SqlParameter("@EmailAddress", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = EmailAddress;

            objParam[5] = new SqlParameter("@PhoneNo", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = PhoneNo;

            objParam[6] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Description;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = LoginUser;

            var result = objMain.ExecuteProcedure("procMmVendorMaster", objParam);


            return "";
        }

    }
}