using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfHrEmpKpiGroup : System.Web.UI.Page
    {
        //added on 12 Dec 2023

        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Id"] != null) 
            {
                loginuser.Value = Convert.ToString(Session["Id"]);

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
        public static string JobCategoryList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select Id,JobCategoryName FROM tblHrEmpJobCategoryMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        [WebMethod]
        public static string JobCtcItemList()
        {
          // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select CtcItemName FROM tblHrPayrollCtcItemMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        [WebMethod]
        public static string UnitMesureList()
        {
          //  clsMain objMain = new clsMain();
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
        /*
        [WebMethod]
        public static string FetchEmpJobDetails(string EmpJobName = "")
        {
            clsMain objMain = new clsMain();
            DataTable dtMaterialList = new DataTable();

            try
            {

                dtMaterialList = objMain.dtFetchData(@"select Id,JobCategoryId,EmpJobName,UnitMesure,JobRate,CtcItemName from tblHrEmpJobMaster where EmpJobName='" + EmpJobName + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtMaterialList, Formatting.None);
            return json;
        }
        */
        /*
        //  BindEmpJobList  -> BindMasterList
        [WebMethod]
        public static string FetchEmpJoblList()
        {
            clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {


                dtEmpList = objMain.dtFetchData(@"select e.Id,e.EmpJobName,e.UnitMesure,e.JobRate,e.CtcItemName,br.JobCategoryName
                                                from tblHrEmpJobMaster e
                                                inner join tblHrEmpJobCategoryMaster br on e.JobCategoryId=br.Id");
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
            return JsonConvert.SerializeObject(dtEmpList, settings);
        }
        */

        //FetchMasterDetails
        [WebMethod]
        public static string FetchMasterDetails(string Id = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtMaterialList = new DataTable(); 

            try
            {

                dtMaterialList = objMain.dtFetchData(@"select Id,KpiGroupName from tblHrEmpKpiGroupMaster where Id='" + Id + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtMaterialList, Formatting.None);
            return json;
        }




        [WebMethod]
        public static string FetchMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();  

            try
            {

                /*
                dtEmpList = objMain.dtFetchData(@"select e.Id,e.EmpJobName,e.UnitMesure,e.JobRate,e.CtcItemName,br.JobCategoryName
                                                from tblHrEmpJobMaster e
                                                inner join tblHrEmpJobCategoryMaster br on e.JobCategoryId=br.Id");
                */
                dtEmpList = objMain.dtFetchData(@"select Id,KpiGroupName
                                                from tblHrEmpKpiGroupMaster" );
                                              
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
            return JsonConvert.SerializeObject(dtEmpList, settings);
        }





        [WebMethod]
        public static string CheckDataAvailability(string KpiGroupName, string isUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool checkId = new bool();
             
            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblHrEmpKpiGroupMaster where KpiGroupName='{0}'", KpiGroupName));
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

        [WebMethod]
        public static string AddData(string KpiGroupName, string loginUser)
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[2];

            objParam[0] = new SqlParameter("@KpiGroupName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = KpiGroupName;

            objParam[1] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = loginUser;

            var result = objMain.ExecuteProcedure("procHrEmpKpiGroupMaster", objParam);

            return "";
        }
    }
}