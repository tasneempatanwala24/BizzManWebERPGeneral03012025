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
    public partial class wfCrmBkrmEnquiryRegister : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 20 Dec 2024
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
        public static string EmployeeList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmployeeList = new DataTable();

            try
            {

                dtEmployeeList = objMain.dtFetchData("select EmpName from [tblHrEmpMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtEmployeeList);
        }
        [WebMethod]
        public static string CustomerNames()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerlist = new DataTable();

            try
            {

                dtCustomerlist = objMain.dtFetchData(@"SELECT LeadID,CustomerName FROM [tblCrmBkrmLeadCollect]");
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
        public static string BindEnquiryRegisterMaster()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtEnquiryRegisterList = new DataTable();

            try
            {

                dtEnquiryRegisterList = objMain.dtFetchData(@"select [EnquiryId],la.LeadID,[EventsName],[EmployeeCount],[ContactName],la.[Requirements],la.[ContactNo],[AssignPerson],lem.CustomerName,[Catalogue],[SendDetails],
                                                         la.[Designation],la.[CompanyName],la.[Date],[Note] from tblCrmBkrmEnquiryRegister la inner join [tblCrmBkrmLeadCollect]  lem on la.LeadID = lem.LeadID");
                
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
            return JsonConvert.SerializeObject(dtEnquiryRegisterList, settings);
        }
        [WebMethod]
        public static string AddEnquiryDetails(string enquiryId="",string requirements="",string empCount="",string eventsName = "", string contactName = "", string contactNo ="", string designation = "",
             string companyName = "",string empName="",string leadId="", string catalogue = "", string date="",string send="",string note = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[15];

            objParam[0] = new SqlParameter("@EventsName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = eventsName;

            objParam[1] = new SqlParameter("@EmployeeCount", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = empCount;

            objParam[2] = new SqlParameter("@Date", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = date;

            objParam[3] = new SqlParameter("@Designation", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = designation;

            objParam[4] = new SqlParameter("@Requirements", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = requirements;

            objParam[5] = new SqlParameter("@ContactNo", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = contactNo;

            objParam[6] = new SqlParameter("@CompanyName", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = companyName;

            objParam[7] = new SqlParameter("@ContactName", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = contactName;

            objParam[8] = new SqlParameter("@Note", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = note;

            objParam[9] = new SqlParameter("@Catalogue", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = catalogue;

            objParam[10] = new SqlParameter("@SendDetails", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = send;

            objParam[11] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = loginUser;

            objParam[12] = new SqlParameter("@LeadID", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = leadId;

            objParam[13] = new SqlParameter("@AssignPerson", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = empName;

            objParam[14] = new SqlParameter("@EnquiryId", SqlDbType.NVarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = enquiryId;

            var result = objMain.ExecuteProcedure("procCrmBkrmEnquiryRegisterDetails", objParam);


            return "";
        }
    }
}
