using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfPosCustomer : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
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

        [WebMethod]
        public static string FetchCustomerList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {
                dtCustomerList = objMain.dtFetchData(@"select CustomerId,CustomerName,Street,Email,Phone from tblPosCustomerMaster");
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
        public static string FetchCustomerDetails(string CustomerId = "")
        {
         //   clsMain objMain = new clsMain();
            DataTable dtCustList = new DataTable();

            try
            {
                dtCustList = objMain.dtFetchData(@"select CustomerId,CustomerName,Street,City,Postcode,State,Country,Language,Email,Phone,Barcode,Tax_ID from tblPosCustomerMaster where CustomerId='" + CustomerId + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtCustList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string CheckCustomerNameAvailability(string CustomerName, string IsUpdate)
        {
         //   clsMain objMain = new clsMain();
            bool CheckName = new bool();

            try
            {

                if (IsUpdate == "0")
                {
                    CheckName = objMain.blSearchDataHO("select CustomerName FROM [tblPosCustomerMaster] where CustomerName='" + CustomerName + "'");
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
        public static string SaveUpdateCustomerDetails(string CustomerId = "", string CustomerName = "", string Street = "", string City = "",
                            string Postcode = "", string State = "", string Country = "", string Language = "", string Email = "",
                            string Phone = "", string Barcode = "", string Tax_ID = "", string CreateUser = "")

        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[14];

            objParam[0] = new SqlParameter("@CustomerId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = CustomerId;

            objParam[1] = new SqlParameter("@CustomerName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = CustomerName;

            objParam[2] = new SqlParameter("@Street", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Street;

            objParam[3] = new SqlParameter("@City", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = City;

            objParam[4] = new SqlParameter("@Postcode", SqlDbType.Int);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Convert.ToInt32(Postcode);

            objParam[5] = new SqlParameter("@State", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = State;

            objParam[6] = new SqlParameter("@Country", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Country;

            objParam[7] = new SqlParameter("@Language", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = Language;

            objParam[8] = new SqlParameter("@Email", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Email;

            objParam[9] = new SqlParameter("@Phone", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = Phone;

            objParam[10] = new SqlParameter("@Barcode", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = Barcode;

            objParam[11] = new SqlParameter("@Tax_ID", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = Tax_ID;

            objParam[12] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = CreateUser;

            objParam[13] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = CreateUser;

            var result = objMain.ExecuteProcedure("procPosCustomerMaster", objParam);

            return "";
        }
    }
}