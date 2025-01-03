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
    public partial class wfCrmBkrmMeetingRegister : System.Web.UI.Page
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
        public static string FetchCrmLeadEnquiryDetails(string userId)
        {

            DataTable dtLeadEnquiryList = new DataTable();

            try
            {

                dtLeadEnquiryList = objMain.dtFetchData(string.Format("select um.EmpId, um.UserName, hm.EmpName,er.AssignPerson,lc.CustomerName,er.Requirements,er.Designation,er.ContactNo,er.Note from[tblUserMaster] um " +

                    "inner Join tblHrEmpMaster hm on um.EmpId = hm.EmpId inner Join tblCrmBkrmEnquiryRegister er on er.AssignPerson = hm.EmpName " +

                   "inner Join tblCrmBkrmLeadCollect lc on lc.LeadID = er.LeadID " +

                    "where um.UserName = '{0}'", userId));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtLeadEnquiryList, Formatting.None);

        }

        [WebMethod]
        public static string BindRegisterGridMaster(string empName)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtAssignGrid = new DataTable();

            try
            {


                dtAssignGrid = objMain.dtFetchData(string.Format(@"select la.LeadID,le.EnquiryId, le.AssignPerson,la.CustomerName,la.Date from tblCrmBkrmLeadCollect la inner join tblCrmBkrmEnquiryRegister le on le.LeadID=la.LeadID where le.AssignPerson ='{0}'", empName));


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
            return JsonConvert.SerializeObject(dtAssignGrid, settings);
        }
        [WebMethod]
        public static string FetchPmAssignLeadActivityDetails(string EnquiryId)
        {
            // clsMain objMain = new clsMain();
            DataTable dtAssignWorkList = new DataTable();

            try
            {

                dtAssignWorkList = objMain.dtFetchData(string.Format("select la.EnquiryId,le.CustomerName,la.Designation,la.ContactNo ,la.Note,la.Requirements from tblCrmBkrmLeadCollect le inner join tblCrmBkrmEnquiryRegister la on la.LeadID=le.LeadID where la.EnquiryId='{0}'", EnquiryId));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtAssignWorkList, Formatting.None);

        }

        [WebMethod]
        public static string BindMeetingRegisterMaster()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtEnquiryRegisterList = new DataTable();

            try
            {

                dtEnquiryRegisterList = objMain.dtFetchData(@"select [MeetingId],[EnquiryId],[ClientName],[ContactNo],[Requirements],[SampleDetails],[Feedback]," +
                                                        "[Catalogue],[Designation],[MeetingDate],[Date],[SalesPersonName],[VisitingId],[Note] from [tblCrmBkrmMeetingRegister]");

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
        public static string AddMeetingDetails(string meetingId="",string enquiryId = "", string clientName = "", string contactNo = "", string requirements = "", string sampleDetails = "", string feedback = "", string catalogue = "",
             string designation = "", string meetingDate = "", string date = "", string salesPersonName = "", string visitingId = "", string note = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[15];

            objParam[0] = new SqlParameter("@MeetingId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = meetingId;

            objParam[1] = new SqlParameter("@EnquiryId", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = enquiryId;

            objParam[2] = new SqlParameter("@ClientName", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = clientName;

            objParam[3] = new SqlParameter("@ContactNo", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = contactNo;

            objParam[4] = new SqlParameter("@Requirements", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = requirements;

            objParam[5] = new SqlParameter("@SampleDetails", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = sampleDetails;

            objParam[6] = new SqlParameter("@Feedback", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = feedback;

            objParam[7] = new SqlParameter("@Catalogue", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = catalogue;

            objParam[8] = new SqlParameter("@Designation", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = designation;

            objParam[9] = new SqlParameter("@MeetingDate", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = meetingDate;
            
            objParam[10] = new SqlParameter("@Date", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = date;

            objParam[11] = new SqlParameter("@SalesPersonName", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = salesPersonName;

            objParam[12] = new SqlParameter("@VisitingId", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = visitingId;

            objParam[13] = new SqlParameter("@Note", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = note;

            objParam[14] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = loginUser;

            var result = objMain.ExecuteProcedure("procCrmBkrmMeetingRegisterDetails", objParam);


            return "";
        }
    }
}
    
