using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfHrEmpKpiSubGroup : System.Web.UI.Page
    {

        //added  on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Id"] != null)
            {
                loginuser.Value = Convert.ToString(Session["Id"]);

                //added  on 12 Dec 2023
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
        public static string KpiGroupList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select Id, KpiGroupName FROM tblHrEmpKpiGroupMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            // return JsonConvert.SerializeObject(dtBranchList);

            string json = JsonConvert.SerializeObject(dtBranchList, Formatting.None);        
            dtBranchList.Clear();
            return json;

        }

       
        [WebMethod]
        public static string FetchMasterDetails(string Id = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtMaterialList = new DataTable();

            try
            {
                dtMaterialList = objMain.dtFetchData(@"select a.Id, a.KpiGroupId, b.KpiGroupName, a.KpiSubGroupName 
                                   from tblHrEmpKpiSubGroupMaster a, tblHrEmpKpiGroupMaster b 
                                   where a.KpiGroupId=b.Id and a.Id = " + Id + "");
            }
            catch (Exception ex)
            {
                // return "";
            }
            string json = JsonConvert.SerializeObject(dtMaterialList, Formatting.None);
            dtMaterialList.Clear();
            return json;
        }

        [WebMethod]
        public static string FetchMasterList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();
             
            try
            {
                dtEmpList = objMain.dtFetchData(@"select a.Id, a.KpiGroupId, b.KpiGroupName, a.KpiSubGroupName 
                                                 from tblHrEmpKpiSubGroupMaster a, tblHrEmpKpiGroupMaster b
                                                where a.KpiGroupId=b.Id");
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

            string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            dtEmpList.Clear();
           // return JsonConvert.SerializeObject(dtEmpList, settings);
            return json;
        }

        //  new style by mk
        [WebMethod]
        public static string CheckDataAvailability(string strSearchName, string isUpdate)
        {
           // clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            { 

                if (isUpdate == "0")
                {
                   // checkId = objMain.blSearchDataHO(string.Format("select 1 from tblHrEmpJobMaster where EmpJobName='{0}'", strSearchbName));
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblHrEmpKpiSubGroupMaster where KpiSubGroupName='{0}'", strSearchName));
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


        /*  old style
        [WebMethod]
        public static string CheckJobAvailability(string EmpJobName, string isUpdate)
        {
            clsMain objMain = new clsMain(); 
            bool checkId = new bool();

            try
            {
                 
                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblHrEmpJobMaster where EmpJobName='{0}'", EmpJobName));
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
        */

        //  new style by mk======================
        [WebMethod]
        public static string AddData(int KpiGroupId, string KpiSubGroupName, string loginUser)
        {
             
           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[3];

            objParam[0] = new SqlParameter("@KpiGroupId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(KpiGroupId);

            objParam[1] = new SqlParameter("@KpiSubGroupName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = KpiSubGroupName;

            objParam[2] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = loginUser;

           // objParam[3] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
          //  objParam[3].Direction = ParameterDirection.Input;
          //  objParam[3].Value = loginUser;

            var result = objMain.ExecuteProcedure("procHrEmpKpiSubGroupMaster", objParam);
            return "";
        }

        /*
        //  old style
        [WebMethod]
        public static string AddEmpJob(string JobCategoryId, string EmpJobName, string UnitMesure, string CtcItemName, string loginUser, string JobRate)
        {

            clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[7];

            objParam[0] = new SqlParameter("@JobCategoryId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(JobCategoryId);

            objParam[1] = new SqlParameter("@EmpJobName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = EmpJobName;

            objParam[2] = new SqlParameter("@UnitMesure", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = UnitMesure;


            objParam[3] = new SqlParameter("@CtcItemName", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = CtcItemName;

            objParam[4] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = loginUser;

            objParam[5] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = loginUser;



            objParam[6] = new SqlParameter("@JobRate", SqlDbType.Decimal);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Convert.ToDecimal(JobRate);



            var result = objMain.ExecuteProcedure("procHrEmpJobMaster", objParam);

            return "";
        }
        */
    }
}