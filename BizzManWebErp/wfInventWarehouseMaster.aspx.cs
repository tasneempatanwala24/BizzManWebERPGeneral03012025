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
    public partial class wfInventWarehouseMaster : System.Web.UI.Page
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
        public static string BindBranch()
        {
           // clsMain objMain = new clsMain();
            DataTable dtBranch = new DataTable();

            try
            {

                dtBranch = objMain.dtFetchData("SELECT BranchCode,BranchName FROM tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranch);
        }

        [WebMethod]
        public static string BindJournal()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtJournal = new DataTable();

            try
            {

                dtJournal = objMain.dtFetchData("SELECT Id,LedgerName FROM tblFaLedgerMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtJournal);
        }

        [WebMethod]
        public static string BindLocation()
        {
           // clsMain objMain = new clsMain();
            DataTable dtLocation = new DataTable();

            try
            {

                dtLocation = objMain.dtFetchData("select Id,LocationName FROM tblInventLocationMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtLocation);
        }

        [WebMethod]
        public static string CheckWarehouseAvailability(string warehouse, string isUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblFaWarehouseMaster where Name='{0}'", warehouse));
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
        public static string AddWarehouse(string warehHouseName = "", string shortName = "", string address = "", string branch = "", string location="",  string saleJournal = "", string purchaseJournal = "", string loginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@warehouse", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = warehHouseName;

            objParam[1] = new SqlParameter("@shortname", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = shortName;

            objParam[2] = new SqlParameter("@Address", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = address;

            objParam[3] = new SqlParameter("@BranchCode", SqlDbType.NVarChar );
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = branch;

            objParam[4] = new SqlParameter("@locationid", SqlDbType.Int);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = string.IsNullOrEmpty(location)?0: Convert.ToInt32(location);


            objParam[5] = new SqlParameter("@saleJournal", SqlDbType.Int);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = string.IsNullOrEmpty(saleJournal) ? 0 : Convert.ToInt32(saleJournal); ;

            objParam[6] = new SqlParameter("@purchaseJournal", SqlDbType.Int);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = string.IsNullOrEmpty(purchaseJournal) ? 0 : Convert.ToInt32(purchaseJournal); ;

           
            objParam[7] = new SqlParameter("@user", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;



            var result = objMain.ExecuteProcedure("procInventWarehouseMaster", objParam);


            return "";
        }


        [WebMethod]
        public static string BindWarehouseMaster()
        {
           // clsMain objMain = new clsMain();
            DataTable dtwarehouseMaster = new DataTable();

            try
            {

                string sqlQuery = @"select W.Id, W.Name,L.LocationName, W.Address, B.BranchName from tblFaWarehouseMaster as w left 
join tblHrBranchMaster as B on W.BranchCode=B.BranchCode 
left join tblInventLocationMaster as L on w.LocationId=L.Id";

                dtwarehouseMaster = objMain.dtFetchData(sqlQuery);
                //dtInventLocationList = objMain.dtFetchData(@"select IL.LocationName,IL.LocationType,BM.BranchName from tblInventLocationMaster as IL
                // join tblHrBranchMaster as BM on IL.BranchCode= BM.BranchCode");
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
            return JsonConvert.SerializeObject(dtwarehouseMaster, settings);
        }


        [WebMethod]
        public static string FetchWarehouseEntry(string id="")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtentry = new DataTable();

            try
            {

                dtentry = objMain.dtFetchData(@"select Id,Name,ShortName,BranchCode, LocationId,Address,SaleJournalId,PurchaseJournalId from tblFaWarehouseMaster where  Id='" + id + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtentry, Formatting.None);
            return json;
        }
    }



}