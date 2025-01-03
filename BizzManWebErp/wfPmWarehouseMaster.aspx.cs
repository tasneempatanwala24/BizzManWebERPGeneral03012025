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
    public partial class wfPmWarehouseMaster : System.Web.UI.Page
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
        public static string BranchList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select BranchCode,BranchName from tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }
        [WebMethod]
        public static string LocationDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtLocationList = new DataTable();

            try
            {

                dtLocationList = objMain.dtFetchData("select Id,LocationName from tblInventLocationMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtLocationList);
        }
        [WebMethod]
        public static string JournalDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtJournalList = new DataTable();

            try
            {

                dtJournalList = objMain.dtFetchData("select Id,LedgerName from tblFaLedgerMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtJournalList);
        }
        [WebMethod]
        public static string FetchWarehouseDetails(string Name = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(@"select Category,Name,Address,Description from tblPmWarehouseMaster where Name='" + Name + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }
            string json = JsonConvert.SerializeObject(dtCategoryList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string BindWarehouseMaster()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtWarehouseList = new DataTable();

            try
            {

                dtWarehouseList = objMain.dtFetchData(@"select Name,Address,lm.LocationName,bsm.BranchName
                                                            from tblPmWarehouseMaster phm 
                                                                inner join [tblInventLocationMaster] lm on lm.Id=phm.LocationId
                                                                inner join [tblHrBranchMaster] bsm on bsm.BranchCode=phm.BranchCode");
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
            return JsonConvert.SerializeObject(dtWarehouseList, settings);
        }

        [WebMethod]
        public static string CheckWarehouseAvailability(string name, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool CheckName = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    CheckName = objMain.blSearchDataHO("select Name FROM [tblPmWarehouseMaster] where Name='" + name + "'");

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
        public static string AddWarehouse(string warehHouseName = "", string shortName = "", string address = "", string branch = "" ,
            string location = "" ,string saleJournal = "" , string purchaseJournal = "", string loginUser = "")
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@Name", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = warehHouseName;

            objParam[1] = new SqlParameter("@ShortName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = shortName;

            objParam[2] = new SqlParameter("@Address", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = address;

            objParam[3] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = branch;

            objParam[4] = new SqlParameter("@LocationId", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = location;

            objParam[5] = new SqlParameter("@SaleJournalId", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = saleJournal;

            objParam[6] = new SqlParameter("@PurchaseJournalId", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = purchaseJournal;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;

            var result = objMain.ExecuteProcedure("procPmWarehouseMaster", objParam);


            return "";
        }
    }
}