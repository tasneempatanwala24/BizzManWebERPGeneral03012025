using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Diagnostics;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfMmCategoryMaster : System.Web.UI.Page
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
        public static string FetchCategoryList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select cm.Id,cm.Name,cm.Description,cm.InventoryValuation,cm1.Name as ParentCategory,
                                                  lm.LedgerName as IncomeAccount,lm1.LedgerName as ExpenseAccount,cm.CategoryType as CategoryType
                                                    from tblMmCategoryMaster cm 
                                                  left join tblMmCategoryMaster cm1 on cm1.Id=cm.ParentCategoryId
                                                  left join tblFaLedgerMaster lm on lm.Id=cm.IncomeAccountId
                                                  left join tblFaLedgerMaster lm1 on lm1.Id=cm.ExpenseAccountId");
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
        public static string AddCategory(string Name = "", string Description = "", string InventoryValuation="", string IncomeAccount="", string ExpenseAccount="",string ParentCategory="", string CategoryType = "")
        {

           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[7];


            objParam[0] = new SqlParameter("@Name", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Name;

            Debug.WriteLine("======================");
             Debug.WriteLine(Name);
             Debug.WriteLine("======================");


            objParam[1] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Description;

            objParam[2] = new SqlParameter("@InventoryValuation", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = InventoryValuation;

            objParam[3] = new SqlParameter("@IncomeAccount", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = IncomeAccount;

            objParam[4] = new SqlParameter("@ExpenseAccount", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = ExpenseAccount;

            objParam[5] = new SqlParameter("@ParentCategoryId", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = ParentCategory;

            objParam[6] = new SqlParameter("@CategoryType", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = CategoryType;

            Debug.WriteLine("======================");
            Debug.WriteLine(Description);
            Debug.WriteLine("======================");


            var result = objMain.ExecuteProcedure("procMmCategoryMaster", objParam);


            return "";
        }

        [WebMethod]
        public static string CheckCategoryNameAvailability(string Name, string IsUpdate)
        {
           // clsMain objMain = new clsMain();
            bool CheckName = new bool();

            try
            {

                if (IsUpdate == "0")
                {
                    CheckName = objMain.blSearchDataHO("select Name FROM [tblMmCategoryMaster] where Name='" + Name + "'");
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
        public static string FetchEmployeeDetails(string Name = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(@"select Id,Name,Description,InventoryValuation,IncomeAccountId,ExpenseAccountId,ParentCategoryId,CategoryType from tblMmCategoryMaster where Name='" + Name + "'");
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
        public static string BindAccountDropdown()
        {
         //   clsMain objMain = new clsMain();
            DataTable dtAccountList = new DataTable();

            try
            {

                dtAccountList = objMain.dtFetchData("select Id,LedgerName FROM tblFaLedgerMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtAccountList);
        }
        [WebMethod]
        public static string BindCategoryTypeDropdown()
        {
            DataTable dtCatTypeList = new DataTable();

            try
            {

                dtCatTypeList = objMain.dtFetchData("select CategoryTypeName as Id,CategoryTypeName FROM tblMmCategoryTypeMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCatTypeList);
        }

        [WebMethod]
        public static string BindParentCategoryList(string categoryid="")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtParentCategoryList = new DataTable();

            try
            {

                dtParentCategoryList = objMain.dtFetchData("select Id,Name FROM tblMmCategoryMaster where Id not in("+categoryid+")");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtParentCategoryList);
        }

    }
}