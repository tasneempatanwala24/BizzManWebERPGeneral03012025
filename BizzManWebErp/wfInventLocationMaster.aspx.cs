using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfInventLocationMaster : System.Web.UI.Page
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
        public static string BindCompany()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCompany = new DataTable();

            try
            {

                dtCompany = objMain.dtFetchData("SELECT BranchCode,BranchName FROM tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCompany);
        }

        [WebMethod]
        public static string AddInventLocation(string LocationName = "", string ParentLocation = "", string LocationType = "", string BranchCode = "", bool IsScrap = false, bool IsReturn = false, string Description = "",string loginUser = "")
        {

           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];


            objParam[0] = new SqlParameter("@Location", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = LocationName;

            Debug.WriteLine("======================");
            Debug.WriteLine(LocationName);
            Debug.WriteLine("======================");


            objParam[1] = new SqlParameter("@ParentLocation", SqlDbType.BigInt);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = (string.IsNullOrEmpty(ParentLocation)?0:Convert.ToInt64(ParentLocation));

            objParam[2] = new SqlParameter("@LocationType", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = LocationType;

            objParam[3] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = BranchCode;

            objParam[4] = new SqlParameter("@IsScrap", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = (IsScrap?'Y':'N');

            objParam[5] = new SqlParameter("@IsReturn", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = (IsReturn ? 'Y' : 'N');

            objParam[6] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Description;

            Debug.WriteLine("======================");
            Debug.WriteLine(Description);
            Debug.WriteLine("======================");



            objParam[7] = new SqlParameter("@user", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;


            
            var result = objMain.ExecuteProcedure("procInventLocationMaster", objParam);


            return "";
        }


        [WebMethod]
        public static string FetchInventLocation()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtInventLocationList = new DataTable();

            try
            {

                string sqlQuery = @"WITH  main

        AS(
             SELECT  id, LocationName, ParentLocationId,
                    CAST((LocationName)AS nvarchar(400)) AS 'Path', LocationType, BranchCode
            FROM    tblInventLocationMaster
            WHERE   ParentLocationId IS NULL
            UNION ALL
             SELECT  t.id, t.LocationName, t.ParentLocationId,
                    CAST((a.path + '/' + t.LocationName) AS nvarchar(400)) AS 'Path', t.LocationType, t.BranchCode
            FROM    tblInventLocationMaster AS t  join tblHrBranchMaster as BM on t.BranchCode = BM.BranchCode
                    JOIN main AS a
                      ON t.ParentLocationId = a.id
           )
SELECT id, LocationName, Path, LocationType, BranchName FROM main left join tblHrBranchMaster as BM on main.BranchCode = BM.BranchCode order by Path";


                dtInventLocationList = objMain.dtFetchData(sqlQuery);
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
            return JsonConvert.SerializeObject(dtInventLocationList, settings);
        }

        [WebMethod]
        public static string FetchInventDetails(string Location = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtInventDetails = new DataTable();

            try
            {

                dtInventDetails = objMain.dtFetchData(@"select Id,LocationName,ParentLocationId,LocationType,BranchCode,IsScrapLocation,IsReturnLocation,Description from tblInventLocationMaster where  LocationName='" + Location + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }            

            string json = JsonConvert.SerializeObject(dtInventDetails, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string BindParentInventList(string locationId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtParentInvent = new DataTable();

            try
            {
                dtParentInvent = objMain.dtFetchData("select Id,LocationName FROM tblInventLocationMaster where Id not in(" + locationId + ")");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtParentInvent);
        }

        [WebMethod]
        public static string CheckLocationAvailability(string Location, string isUpdate)
        {
           // clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblInventLocationMaster where LocationName='{0}'", Location));
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

    }
}