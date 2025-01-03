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
    public partial class wfCrmCustomerMaster : System.Web.UI.Page
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

                    FillCustomers();
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
          //  clsMain objMain = new clsMain();
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
        public static string StateListByCountry(string country)
        {
           // clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select StateId,StateName from tblHrStateMaster where countryid="+country);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtStateList);
        }

        [WebMethod]
        public static string CountryList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCountryList = new DataTable();

            try
            {

                dtCountryList = objMain.dtFetchData("select Id,CountryName from tblHrCountryMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCountryList);
        }

        [WebMethod]
        public static string CityList(string stateId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCityList = new DataTable();

            try
            {

                dtCityList = objMain.dtFetchData("select Id,CityName from tblHrCityMaster where StateId=" + stateId.ToString());
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCityList);
        }


        [WebMethod]
        public static string TagList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtTags = new DataTable();

            try
            {

                dtTags = objMain.dtFetchData(@"SELECT distinct Tag as Item FROM tblCrmCustomers where Tag is not null");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtTags);
        }


        [WebMethod]
        public static string CityListByState(string stateId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCityList = new DataTable();

            try
            {

                dtCityList = objMain.dtFetchData("select distinct CityName as Item from tblHrCityMaster where StateId=" + stateId.ToString());
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCityList);
        }


        [WebMethod]
        public static string BranchList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtBranch = new DataTable();

            try
            {

                dtBranch = objMain.dtFetchData(@"SELECT BranchCode,BranchName FROM tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranch);
        }

        [WebMethod]
        public static string TitleList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtTitle = new DataTable();

            try
            {

                dtTitle = objMain.dtFetchData(@"SELECT distinct Title as Item FROM tblCrmCustomers where Title is not null");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtTitle);

        }

        [WebMethod]
        public static string GSTTreatmentList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtGSTTreatment = new DataTable();

            try
            {

                dtGSTTreatment = objMain.dtFetchData(@"SELECT distinct GSTTreatment as Item FROM tblCrmCustomers where GSTTreatment is not null");
            }
            catch (Exception ex)
            {
                return "";
            }

           
            return JsonConvert.SerializeObject(dtGSTTreatment);
        }

        private void FillCustomers()
        {
            try
            {

                List<Customer> customers = new List<Customer>();
                customers.Add(new Customer() { Id=1, CustomerType=  "Individual"});
                customers.Add(new Customer() { Id = 2, CustomerType = "Branch" });
                rblCustomer.DataSource = customers;
                rblCustomer.DataBind();
                rblCustomer.SelectedIndex = 0;

            }
            catch (Exception ex)
            {
                throw;
            }


        }

        [WebMethod]
        public static string AddCustomer(string CustomerType, string CustomerName, string CompanyName,
                                         string TaxId, string JobPosition, string Website, string Title,
                                         string PhotoImage, string Street1, string Street2, string City, 
                                         string State, string ZIP, string Email, string Phone, string Country, string User, string CustomerId,
                                         string Tag,string Gst,string PAN)
        {
          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[21];

            objParam[0] = new SqlParameter("@CustomerType", SqlDbType.VarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = CustomerType;

            objParam[1] = new SqlParameter("@CustomerName", SqlDbType.VarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = CustomerName;

            objParam[2] = new SqlParameter("@CompanyName", SqlDbType.VarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = CompanyName;

            objParam[3] = new SqlParameter("@TaxId", SqlDbType.VarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = TaxId;
            objParam[4] = new SqlParameter("@JobPosition", SqlDbType.VarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = JobPosition;
            objParam[5] = new SqlParameter("@Website", SqlDbType.VarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Website;
            objParam[6] = new SqlParameter("@Title", SqlDbType.VarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Title;
            objParam[7] = new SqlParameter("@PhotoImage", SqlDbType.VarBinary);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = Encoding.UTF8.GetBytes(PhotoImage);
            objParam[8] = new SqlParameter("@Street1", SqlDbType.VarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Street1;
            objParam[9] = new SqlParameter("@Street2", SqlDbType.VarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = Street2;
            objParam[10] = new SqlParameter("@City", SqlDbType.VarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = City;
            objParam[11] = new SqlParameter("@State", SqlDbType.VarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = State;
            objParam[12] = new SqlParameter("@ZIP", SqlDbType.VarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = ZIP;

            objParam[13] = new SqlParameter("@Email", SqlDbType.VarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = Email;

            objParam[14] = new SqlParameter("@Phone", SqlDbType.VarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = Phone;

            objParam[15] = new SqlParameter("@Country", SqlDbType.VarChar);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = Country;

            objParam[16] = new SqlParameter("@User", SqlDbType.VarChar);
            objParam[16].Direction = ParameterDirection.Input;
            objParam[16].Value = User;

            objParam[17] = new SqlParameter("@CustomerId", SqlDbType.Int);
            objParam[17].Direction = ParameterDirection.Input;
            objParam[17].Value = Convert.ToInt32(CustomerId);

            objParam[18] = new SqlParameter("@Tag", SqlDbType.VarChar);
            objParam[18].Direction = ParameterDirection.Input;
            objParam[18].Value = Tag;


            objParam[19] = new SqlParameter("@GSTTreatment", SqlDbType.VarChar);
            objParam[19].Direction = ParameterDirection.Input;
            objParam[19].Value = Gst;


            objParam[20] = new SqlParameter("@PAN", SqlDbType.VarChar);
            objParam[20].Direction = ParameterDirection.Input;
            objParam[20].Value = PAN;


            var result = objMain.ExecuteProcedure("procCrmCustomerInsert", objParam);

            return "";
        }

        [WebMethod]
        public static string GetCustomerList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCustomerlist = new DataTable();

            try
            {

                dtCustomerlist = objMain.dtFetchData(@"SELECT cst.CustomerId, cst.CustomerName, cst.CompanyName,ISNULL(br.BranchName,'') BranchName"+
                                                    ",con.Phone,con.Email,cst.JobPosition," +
                                                    "con.City,ISNULL(con.Country,'') Country,CAST(cst.PhotoImage as varchar(max))[PhotoImage]" +
                                                " FROM tblCrmCustomers cst JOIN tblCrmCustomerContacts con ON con.ContactId=cst.ContactId "+
                                                "left join tblHrBranchMaster br on br.BranchCode=cst.CompanyName");
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
            return JsonConvert.SerializeObject(dtCustomerlist, settings);

        }

        [WebMethod]
        public static string GetCustomerById(string Id)
        {
            
          //  clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {
                string sqlQuery = $"SELECT cst.CustomerType, cst.CustomerName, cst.CompanyName, con.Country," +
                            $"con.Street1,con.Street2,con.City,con.[State],con.Zip,cst.TaxId,cst.JobPosition," +
                             $"con.Phone,cst.Website,con.Email,	cst.Title,cst.TagId," +
                             $"CAST(cst.PhotoImage as varchar(max))[PhotoImage] " +
                             $", cst.Tag, cst.GSTTreatment, cst.PAN " +
                             $"FROM tblCrmCustomers cst " +
                             $"JOIN tblCrmCustomerContacts con ON con.ContactId = cst.ContactId WHERE cst.CustomerId ={Id} ";

                dtCategoryList = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }

        [WebMethod]
        public static string GetCustomerImageById(string Id)
        {

           // clsMain objMain = new clsMain();
            DataTable dtImages = new DataTable();

            try
            {
                string sqlQuery = $"SELECT CAST(PhotoImage as varchar(max))[PhotoImage] " +
                                  $"FROM tblCrmCustomers WHERE CustomerId ={Id} ";

                dtImages = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtImages, Formatting.None);

        }
    }

    public class Customer
    {
      public  int Id { get; set; }
       public string CustomerType { get; set; }
    }
}