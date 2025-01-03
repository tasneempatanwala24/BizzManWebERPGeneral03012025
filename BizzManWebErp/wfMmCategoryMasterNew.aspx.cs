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
    public partial class wfMmCategoryMasterNew : System.Web.UI.Page
    {
        //added on 01 Mar 2024
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
             DataTable dtCatList = new DataTable();

            try
            {

                dtCatList = objMain.dtFetchData(@"select cm.Id,cm.Name,cm.Description,cm.InventoryValuation,cm1.Name as ParentCategory,
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
            return JsonConvert.SerializeObject(dtCatList, settings);
        }

        [WebMethod]
        public static string AddCategory(string Name = "", string Description = "", string InventoryValuation = "", string IncomeAccount = "", string ExpenseAccount = "", string ParentCategory = "", string CategoryType = "")
        {

            SqlParameter[] objParam = new SqlParameter[7];

            objParam[0] = new SqlParameter("@Name", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Name;

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

            var result = objMain.ExecuteProcedure("procMmCategoryMasterNew", objParam);
            return "";
        }

        [WebMethod]
        public static string CheckCategoryNameAvailability(string Name, string IsUpdate)
        {
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
        public static string FetchCategoryDetails(string Name = "")
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(@"select Id,Name,Description,InventoryValuation,IncomeAccountId,ExpenseAccountId,ParentCategoryId,CategoryType from tblMmCategoryMaster where Name='" + Name + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtCategoryList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string BindAccountDropdown()
        {
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
        public static string BindParentCategoryList(string categoryid = "")
        {
            DataTable dtParentCategoryList = new DataTable();

            try
            {

                dtParentCategoryList = objMain.dtFetchData("select Id,Name FROM tblMmCategoryMaster where Id not in(" + categoryid + ")");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtParentCategoryList);
        }

    }
}