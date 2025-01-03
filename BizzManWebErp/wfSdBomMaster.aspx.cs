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
using System.Text;

namespace BizzManWebErp
{
    public partial class wfSdBomMaster : System.Web.UI.Page
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
        public static string BranchMasterList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select BranchCode, BranchName FROM tblHrBranchMaster");
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
        public static string MaterialMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                dtMaterialMasterList = objMain.dtFetchData("select Id,(Convert(VARCHAR(20),Id) + ': ' + MaterialName) AS MaterialName from tblMmMaterialMaster WHERE CanSale=1");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }

        [WebMethod]
        public static string UnitMeasureList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtUnitMeasureList = new DataTable();

            try
            {

                dtUnitMeasureList = objMain.dtFetchData("select Id,UnitMesureName from tblFaUnitMesureMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtUnitMeasureList);
        }


        [WebMethod]
        public static string FetchSDBOMMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtobj = new DataTable();

            try
            {

                dtobj = objMain.dtFetchData(@"select MasterId as Id,ItemName,ISNULL(sbm.BranchCode,'') AS BranchCode,BranchName,Qty,ISNULL(UM.UnitMesureName,'') AS UnitMesureName 
                ,TotalAmount,TotalCentralTax,TotalCess as TotalCessTax,TotalIntegratedTax,TotalStateTax,DeliveryCharges,SubTotalAmout
                from tblSdBomMaster sbm left join tblFaUnitMesureMaster UM on UM.Id = sbm.UnitMeasure LEFT JOIN tblHrBranchMaster b on sbm.BranchCode=b.BranchCode");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtobj);
        }
        [WebMethod]
        public static string FetchSDBOMListById(string MasterId="")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtobj = new DataTable();

            try
            {

                dtobj = objMain.dtFetchData(@"select MasterId as Id,ItemName,BranchCode,Qty,UnitMeasure,TotalAmount,TotalCentralTax,TotalStateTax,TotalIntegratedTax,TotalCess,DeliveryCharges,Active,TotalCentralTax + TotalStateTax + TotalCess  AS TotalTax,ISNULL(Alias,'') AS Alias from tblSdBomMaster Where MasterId=" + MasterId);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtobj);
        }
        [WebMethod]
        public static string FetchTaxDetailsByMaterialId(string Id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtobj = new DataTable();

            try
            {
                if(!string.IsNullOrEmpty(Id))
                dtobj = objMain.dtFetchData(@"select CentralTaxPercent,StateTaxPercent,CessPercent,IntegratedTaxPercent,MRP,
                MRP+(MRP*(IntegratedTaxPercent/100)) AS RateInclTax,UnitMesure 
                from tblMmMaterialMaster Where Id=" + Id);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtobj);
        }

        [WebMethod]
        public static string FetchSDBOMDetails(string MasterId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtobj = new DataTable();

            try
            {

                dtobj = objMain.dtFetchData(@"select DetailId,MasterId,ItemMasterId,(Convert(VARCHAR(20),ItemMasterId) + ': ' + MaterialName) AS MaterialName,
                Qty,ISNULL(RateInclTax,0) AS RateInclTax,ISNULL(s.CentralTaxPercent,0) AS CentralTaxPercent,ISNULL(s.StateTaxPercent,0) AS StateTaxPercent,
                ISNULL(s.CessPercent,0) AS CessPercent,ISNULL(s.IntegratedTaxPercent,0) AS IntegratedTaxPercent,MRP,
                ISNULL(s.DiscountPercent,0) AS DiscountPercent,ISNULL(s.SubTotal,0) As SubTotal,m.UnitMesure,Upper(FixItem) AS FixItem
                from tblSdBomDetail s 
                inner join tblMmMaterialMaster m on ItemMasterId = m.Id WHERE MasterId=" + MasterId);
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtobj, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string CheckItemAvailability(string ItemName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    if (objMain == null)
                        objMain = new clsMain();

                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblSdBomMaster where ItemName='{0}'", ItemName));
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
        public static string AddDetails(string ItemName, string Qty,string loginUser, string sd_bom_details, string BranchCode="",  string UnitMeasure = "", string TotalAmount = "0",
                                        string TotalCentralTax = "0", string TotalStateTax = "0", string TotalCess = "0", string DeliveryCharges = "0"
                                        , string Active = "y",string Master_Id="0",string TotalIntegrated="0",string Alias="")
        {

            SqlParameter[] objParam = new SqlParameter[16];

            objParam[0] = new SqlParameter("@ItemName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = ItemName;

            objParam[1] = new SqlParameter("@Qty", SqlDbType.Decimal);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToDecimal(!string.IsNullOrEmpty(Qty) ? Qty : "0");

            objParam[2] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = BranchCode;

            objParam[3] = new SqlParameter("@TotalAmount", SqlDbType.Decimal);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Convert.ToDecimal(!string.IsNullOrEmpty(TotalAmount) ? TotalAmount : "0");

            objParam[4] = new SqlParameter("@TotalCentralTax", SqlDbType.Decimal);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Convert.ToDecimal(!string.IsNullOrEmpty(TotalCentralTax) ? TotalCentralTax : "0");

            objParam[5] = new SqlParameter("@TotalStateTax", SqlDbType.Decimal);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Convert.ToDecimal(!string.IsNullOrEmpty(TotalStateTax) ? TotalStateTax : "0");

            objParam[6] = new SqlParameter("@UnitMeasure", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = UnitMeasure;

            objParam[7] = new SqlParameter("@TotalCess", SqlDbType.Decimal);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = Convert.ToDecimal(!string.IsNullOrEmpty(TotalCess) ? TotalCess : "0");

            objParam[8] = new SqlParameter("@DeliveryCharges", SqlDbType.Decimal);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Convert.ToDecimal(!string.IsNullOrEmpty(DeliveryCharges) ? DeliveryCharges : "0");

            objParam[9] = new SqlParameter("@Active", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = Active;

            objParam[10] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = loginUser;

            objParam[11] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = loginUser;

            objParam[12] = new SqlParameter("@sd_bom_details", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = sd_bom_details;

            objParam[13] = new SqlParameter("@Master_Id", SqlDbType.Int);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = Convert.ToInt32(!string.IsNullOrEmpty(Master_Id) ? Master_Id : "0");

            objParam[14] = new SqlParameter("@TotalIntegratedTax", SqlDbType.Decimal);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = Convert.ToDecimal(!string.IsNullOrEmpty(TotalIntegrated) ? TotalIntegrated : "0");

            objParam[15] = new SqlParameter("@Alias", SqlDbType.NVarChar);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = Alias;

            //objParam[16] = new SqlParameter("@CessPercent", SqlDbType.Decimal);
            //objParam[16].Direction = ParameterDirection.Input;
            //objParam[16].Value = Convert.ToDecimal(!string.IsNullOrEmpty(CessPercent) ? CessPercent : "0");

            //objParam[17] = new SqlParameter("@IntegratedTaxPercent", SqlDbType.Decimal);
            //objParam[17].Direction = ParameterDirection.Input;
            //objParam[17].Value = Convert.ToDecimal(!string.IsNullOrEmpty(IntegratedTaxPercent) ? IntegratedTaxPercent : "0");

            var result = objMain.ExecuteProcedure("procSdBomMaster", objParam);
            string json = JsonConvert.SerializeObject(result, Formatting.None);
            return json;
        }
    }
}