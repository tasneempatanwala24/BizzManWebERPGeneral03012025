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
using System.Security;
using BizzManWebErp.Model;
using System.Text;


namespace BizzManWebErp
{
    public partial class wfMnfManufactureDemandslip : System.Web.UI.Page
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

        [System.Web.Services.WebMethod]
        public static string GenerateDemandIssueNo()
        {
            DataTable dt = objMain.dtFetchData("SELECT CONCAT('DM', RIGHT('000' + CAST(ISNULL(MAX(CAST(SUBSTRING(DemandIssueNo, 3, LEN(DemandIssueNo) - 2) AS INT)), 0) + 1 AS VARCHAR), 3)) AS DemandIssueNo FROM tblMnfManufactureDemandslipMaster WHERE DemandIssueNo LIKE 'DM%'");
            return dt.Rows.Count > 0 ? dt.Rows[0]["DemandIssueNo"].ToString() : "DM001";
        }

        [System.Web.Services.WebMethod]
        public static string LoadReferences()
        {
            return JsonConvert.SerializeObject(objMain.dtFetchData("SELECT ID FROM tblMnfManufactureOrderMaster"));
        }

        [System.Web.Services.WebMethod]
        public static string LoadCounters()
        {
            return JsonConvert.SerializeObject(objMain.dtFetchData("select BranchCode,BranchName from [tblHrBranchMaster]"));
        }


        [WebMethod]
        public static string UnitMesureList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtUnitList = new DataTable();

            try
            {

                dtUnitList = objMain.dtFetchData("select Id,UnitMesureName FROM tblFaUnitMesureMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtUnitList);
        }

        [WebMethod]
        public static string FetchMaterialDetails(string MaterialId, string BranchCode)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialDetails = new DataTable();

            try
            {

                dtMaterialDetails = objMain.dtFetchData(@"select Id,MaterialName,
(select isnull(Sum(QtyBalance),0) from tblMmMaterialStockMaster inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId 
inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode 
where tblFaWarehouseMaster.BranchCode='" + BranchCode + "' and MaterialMasterId=MM.Id) as Stock from tblMmMaterialMaster MM where Id=" + MaterialId + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialDetails);
        }
        [WebMethod]
        public static string LoadItems()
        {
            clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

               
                dtMaterialMasterList = objMain.dtFetchData(@"select Id,MaterialName from tblMmMaterialMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }

        [System.Web.Services.WebMethod]
        public static string FetchDemandSlipList()
        {
            DataTable dt = objMain.dtFetchData(@"SELECT *, FORMAT(DateTime, 'dd-MM-yyyy HH:mm:ss') AS FormattedDateTime,FORMAT(ReceiptDate, 'dd-MM-yyyy HH:mm:ss') AS FormattedReceiptDate FROM tblMnfManufactureDemandslipMaster
");
            foreach (DataRow row in dt.Rows)
            {
                row["DateTime"] = row["FormattedDateTime"].ToString();
                row["ReceiptDate"] = row["FormattedReceiptDate"].ToString();
            }
            dt.Columns.Remove("FormattedDateTime");
            dt.Columns.Remove("FormattedReceiptDate");
            return JsonConvert.SerializeObject(dt);
        }

        [System.Web.Services.WebMethod]
        public static string FetchDemandSlipDetails(string Id)
        {
            DataTable dt = objMain.dtFetchData("SELECT *, FORMAT(DateTime, 'yyyy-MM-ddTHH:mm') AS FormattedDateTime, FORMAT(ReceiptDate, 'yyyy-MM-dd') AS FormattedReceiptDate FROM tblMnfManufactureDemandslipMaster WHERE DemandIssueNo = '" + Id + "'");

            foreach (DataRow row in dt.Rows)
            {
                row["DateTime"] = row["FormattedDateTime"].ToString();
                row["ReceiptDate"] = row["FormattedReceiptDate"].ToString();
            }
            dt.Columns.Remove("FormattedDateTime");
            dt.Columns.Remove("FormattedReceiptDate");

            return JsonConvert.SerializeObject(dt);

        }

        [System.Web.Services.WebMethod]
        public static string FetchDemandSlipItems(string Id)
        {
            return JsonConvert.SerializeObject(objMain.dtFetchData("SELECT * FROM tblMnfManufactureDemandslipDetail WHERE DemandIssueNo = '" + Id + "'"));
        }
        [System.Web.Services.WebMethod]
        public static string AddDemandSlip(List<MnfManufactureDemandslip> data, string DemandIssueNo, string DateTime, string ReferenceID, string CounterNo, string ReceiptDate, string loginUser, int IsUpdate = 0)
        {
            try
            {
                SqlParameter[] objParam = new SqlParameter[8];

                objParam[0] = new SqlParameter("@DemandIssueNo", DemandIssueNo);
                objParam[1] = new SqlParameter("@DateTime", DateTime);
                objParam[2] = new SqlParameter("@ReferenceID", ReferenceID);
                objParam[3] = new SqlParameter("@CounterNo", CounterNo);
                objParam[4] = new SqlParameter("@ReceiptDate", ReceiptDate);
                objParam[5] = new SqlParameter("@User", loginUser);
                objParam[6] = new SqlParameter("@IsUpdate", IsUpdate == 1);

                StringBuilder strBuild = new StringBuilder();
                strBuild.Append("<DemandSlipList>");

                if (data.Count > 0)
                {
                    foreach (var item in data)
                    {
                        strBuild.Append("<DemandSlipDetail>");
                        strBuild.Append("<MaterialID>" + item.MaterialID + "</MaterialID>");
                        strBuild.Append("<MaterialName>" + item.MaterialName + "</MaterialName>");
                        strBuild.Append("<Quantity>" + item.Quantity + "</Quantity>");
                        strBuild.Append("<Stock>" + item.Stock + "</Stock>");
                        strBuild.Append("</DemandSlipDetail>");
                    }
                }
                strBuild.Append("</DemandSlipList>");
                objParam[7] = new SqlParameter("@XMLData", SqlDbType.Xml);
                objParam[7].Direction = ParameterDirection.Input;
                objParam[7].Value = strBuild.ToString();

          
                
                var result = objMain.ExecuteProcedure("procMnfManufactureDemandslip", objParam);
                return JsonConvert.SerializeObject(new { status = "success" });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { status = "error", message = ex.Message });
            }
        }

    }
}