using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;

namespace BizzManWebErp
{
    public partial class wfMnfManufactureWorkCentersDetail : System.Web.UI.Page
        {
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
        public static string AddWorkCenterDetails(string Id="",string MachineType = "", 
        string Capacity = "", string MaterialId = "", int Cost = 0,
        int SetupTime = 0, string Location = "", string Remark = "",
        string loginUser = "", bool IsUpdate=false)
        {
            try
            {
                SqlParameter[] objParam = new SqlParameter[10];

                objParam[0] = new SqlParameter("@MachineType", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = MachineType;

                objParam[1] = new SqlParameter("@Capacity", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = Capacity;

                objParam[2] = new SqlParameter("@MaterialId", SqlDbType.NVarChar);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = MaterialId;

                objParam[3] = new SqlParameter("@Cost", SqlDbType.Int);
                objParam[3].Direction = ParameterDirection.Input;
                objParam[3].Value = Cost;

                objParam[4] = new SqlParameter("@SetupTime", SqlDbType.Int);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = SetupTime;

                objParam[5] = new SqlParameter("@LocationId", SqlDbType.NVarChar);
                objParam[5].Direction = ParameterDirection.Input;
                objParam[5].Value = Location;

                objParam[6] = new SqlParameter("@Remark", SqlDbType.NVarChar);
                objParam[6].Direction = ParameterDirection.Input;
                objParam[6].Value = Remark;

                objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
                objParam[7].Direction = ParameterDirection.Input;
                objParam[7].Value = loginUser;

                objParam[8] = new SqlParameter("@Id", SqlDbType.NVarChar);
                objParam[8].Direction = ParameterDirection.Input;
                objParam[8].Value = Id;

                objParam[9] = new SqlParameter("@IsUpdate", SqlDbType.Bit);
                objParam[9].Direction = ParameterDirection.Input;
                objParam[9].Value = IsUpdate;

                var result = objMain.ExecuteProcedure("procMnfManufactureWorkCentersDetail", objParam);


                return "";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
            
        }

        [WebMethod]
        public static string MaterialMasterList()
        {
            clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                //  dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where Id not in(select MaterialMasterId from tblMmBomMaster) and BOM='Y'");
                dtMaterialMasterList = objMain.dtFetchData(@"select Id,MaterialName from tblMmMaterialMaster where CanManufacture=1 ");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }

        [WebMethod]
        public static string FetchWorkCenterDetailList()
        {
            DataTable dtWorkCenterDetailList = new DataTable();

            try
            {

                dtWorkCenterDetailList = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,L.LocationName as Location
                                                              from tblMnfWorkCentersDetail a inner join tblMmMaterialMaster m on a.materialId=m.Id
inner join tblInventLocationMaster L on L.Id=a.LocationId 
                                                              order by id ");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtWorkCenterDetailList);
        }

        [WebMethod]
        public static string FetchWorkCenterDetails(string Id)
        {
            DataTable dtBOMMasterDetails = new DataTable();

            try
            { 
                dtBOMMasterDetails = objMain.dtFetchData(@"select * 
                                                              from tblMnfWorkCentersDetail where Id='" + Id + "'");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMMasterDetails);
        }

        [WebMethod]
        public static string GenerateOrderID()
        {
            DataTable dtD = new DataTable();

            try
            {
                dtD = objMain.dtFetchData(@"SELECT CONCAT('WC', RIGHT('000' + CAST(ISNULL(MAX(CAST(SUBSTRING(ID, 3, LEN(ID) - 2) AS INT)), 0) + 1 AS VARCHAR), 3)) AS ID
FROM tblMnfWorkCentersDetail
WHERE ID LIKE 'WC%'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtD);
        }
    }
}