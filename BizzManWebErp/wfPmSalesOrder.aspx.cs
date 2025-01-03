using DocumentFormat.OpenXml.Office.Word;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
// using System.Windows.Forms;
using static BizzManWebErp.wfPmSalesOrder;
// using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace BizzManWebErp
{
    public partial class wfPmSalesOrder : System.Web.UI.Page
    {
        static clsMain objMain;

        public class GridData

        {
            public string materialName { get; set; }
            public string QTY { get; set; }
            public string itemId { get; set; }
            public string stock { get; set; }
            public string UnitMeasure { get; set; }
            public string Packaging { get; set; }
            public string MRP { get; set; }
            public string discountpercent { get; set; }
            public string amount { get; set; }
            public string integratedTaxPercent { get; set; }
            public string salesOrderId { get; set; }
        }

        /*public class GridDataModel

        {
            public string SalesOrderId { get; set; }
            public string CustomerName { get; set; }
            public string OrderDate { get; set; }
            public string ExpirationDate { get; set; }
            public string GSTTreatment { get; set; }
            public string DeliveryDateTime { get; set; }
            public string Currency { get; set; }
            public string PaymentTerms { get; set; }
            public string TermsConditions { get; set; }
            public string TotalAmount { get; set; }
            public string DeliveryCharges { get; set; }
            public string BranchCode { get; set; }
            public string DeptName { get; set; }
            public string QuotationId { get; set; }
            public string OutstandingAmount { get; set; }
            public string Advance { get; set; }
            public string LoginUser { get; set; }
            public string ServiceCharge { get; set; }

            public List<SubGridData> SubGridDetails { get; set; }

        }*/


        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Id"] != null)
            {
                loginuser.Value = Session["Id"].ToString();

                //added on 13 July 2024
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
        public static string FetchStateList()
        {

            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select StateId,StateName from tblHrStateMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtStateList);
        }

        [WebMethod]
        public static string FetchSalesOrderMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderDetailsList = new DataTable();

            try
            {
                dtSalesOrderDetailsList = objMain.dtFetchData(@"select [CustomerName],[OrderDate],[SalesOrderId],[GSTTreatment],[DeliveryDateTime],[Currency]
      ,[QuotationId],[Department],[BranchCode],[ExpirationDate],[TermsConditions],[PaymentTerms],[DeliveryCharges]
      ,[Advance],[TotalAmount],[OutstandingAmount],[MaterialName],[QTY],[MRP],[Amount],[ServiceCharge] from tblPmAddSalesOrderDetails");
            }
            catch (Exception ex)
            {
                ///return "";
            }

            string json = JsonConvert.SerializeObject(dtSalesOrderDetailsList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchMaterialDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialPriceList = new DataTable();

            try
            {
                dtMaterialPriceList = objMain.dtFetchData(@"select Id,UnitMesure,MaterialName,MRP,IntegratedTaxPercent,MinimumStockLevel from tblMmMaterialMaster");
            }
            catch (Exception ex)
            {
                ///return "";
            }

            string json = JsonConvert.SerializeObject(dtMaterialPriceList, Formatting.None);
            return json;
        }
        [WebMethod]
        public static string GetBranchDetails()
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select BranchCode,BranchName from [tblHrBranchMaster]"));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string MaterialPackagingList(int materialid)
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format(@"select id,Packaging from [tblMmMaterialPackagingDetails] where MaterialMasterId='" + materialid + "'"));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string MaterialMasterList()
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select Id,MaterialName from [tblMmMaterialMaster]"));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string FetchCityList()
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select StateId,CityName from [tblHrCityMaster]"));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string GetDeptDetails()
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select Id,DeptName from [tblHrDeptMaster]"));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string BindCurrencyList()
        {
            DataTable dtCategoryList = new DataTable();

            try
            {

                dtCategoryList = objMain.dtFetchData(string.Format("select Id,Currency from [tblMmCurrencyMaster]"));
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtCategoryList, Formatting.None);

        }
        [WebMethod]
        public static string FetchDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {
                dtEmpList = objMain.dtFetchData(@"select BranchCode,BranchName,BranchAddress,ContactNo,Email,hsm.StateName,Active
                                                 from tblHrBranchMaster hbm
                                                inner join tblHrStateMaster hsm on hsm.StateId=hbm.StateId");

                //dtUserList = objMain.dtFetchData(@"select UserId,FullName,Address,PhoneNo,Password,City,Pincode,hsm.StateName
                //                                 from tblPmCustomerMaster hbm
                //                                 inner join tblHrStateMaster hsm on hsm.StateId=hbm.StateId");
            }
            catch (Exception ex)
            {
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
        public static string CustomerMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerlist = new DataTable();

            try
            {

                dtCustomerlist = objMain.dtFetchData(@"SELECT CustomerName FROM tblCrmCustomers");
            }
            catch (Exception ex)
            {

            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            return JsonConvert.SerializeObject(dtCustomerlist, settings);

        }


        [WebMethod]
        public static string AddSalesOrder(string griddata, string SalesOrderId, string CustomerName, string OrderDate,
                                       string ExpirationDate, string GSTTreatment, string DeliveryDateTime, string Currency,
                                       string PaymentTerms, string TermsConditions, string TotalAmount, string DeliveryCharges,
                                       //string UnitMeasure, string MRP, string integratedTaxPercent, string discountPercent, string amount, string package, 
                                       string BranchCode, string DeptName, string QuotationId, string OutstandingAmount, string Advance, string LoginUser, string ServiceCharge)
        {
            List<GridData> grid = JsonConvert.DeserializeObject<List<GridData>>(griddata.ToString());

            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[29];

            foreach (var item in grid)
            {
                //for (int i=0; i < objParam.Length.
                objParam[18] = new SqlParameter("@MaterialName", SqlDbType.VarChar);
                objParam[18].Direction = ParameterDirection.Input;
                objParam[18].Value = item.materialName;

                objParam[21] = new SqlParameter("@QTY", SqlDbType.Int);
                objParam[21].Direction = ParameterDirection.Input;
                objParam[21].Value = Convert.ToInt32(item.QTY);

                objParam[17] = new SqlParameter("@ItemId", SqlDbType.BigInt);
                objParam[17].Direction = ParameterDirection.Input;
                objParam[17].Value = Convert.ToInt32(item.itemId);

                objParam[25] = new SqlParameter("@DiscountPercent", SqlDbType.Int);
                objParam[25].Direction = ParameterDirection.Input;
                objParam[25].Value = item.discountpercent;

                objParam[26] = new SqlParameter("@IntegratedTaxPercent", SqlDbType.Int);
                objParam[26].Direction = ParameterDirection.Input;
                objParam[26].Value = Convert.ToInt32(item.integratedTaxPercent);

                objParam[27] = new SqlParameter("@Amount", SqlDbType.Decimal);
                objParam[27].Direction = ParameterDirection.Input;
                objParam[27].Value = Convert.ToDecimal(item.amount);

                objParam[24] = new SqlParameter("@MRP", SqlDbType.Int);
                objParam[24].Direction = ParameterDirection.Input;
                objParam[24].Value = Convert.ToInt32(item.MRP);

                objParam[22] = new SqlParameter("@UnitMeasure", SqlDbType.VarChar);
                objParam[22].Direction = ParameterDirection.Input;
                objParam[22].Value = item.UnitMeasure;

                objParam[23] = new SqlParameter("@Package", SqlDbType.VarChar);
                objParam[23].Direction = ParameterDirection.Input;
                objParam[23].Value = item.Packaging;

                objParam[20] = new SqlParameter("@Stock", SqlDbType.Int);
                objParam[20].Direction = ParameterDirection.Input;
                objParam[20].Value = Convert.ToInt32(item.stock);

                //objParam[29] = new SqlParameter("@UpdateDate", SqlDbType.Int);
                //objParam[29].Direction = ParameterDirection.Input;
                //objParam[29].Value = Convert.ToInt32(item.salesOrderId);

            }

            objParam[0] = new SqlParameter("@OrderDate", SqlDbType.SmallDateTime);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToDateTime(OrderDate);

            objParam[1] = new SqlParameter("@CustomerName", SqlDbType.VarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = CustomerName;

            objParam[2] = new SqlParameter("@SalesOrderId", SqlDbType.VarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = SalesOrderId;

            objParam[3] = new SqlParameter("@GSTTreatment", SqlDbType.VarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = GSTTreatment;

            objParam[4] = new SqlParameter("@DeliveryDateTime", SqlDbType.SmallDateTime);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Convert.ToDateTime(DeliveryDateTime);

            objParam[5] = new SqlParameter("@Currency", SqlDbType.VarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Currency;

            objParam[6] = new SqlParameter("@PaymentTerms", SqlDbType.VarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = PaymentTerms;

            objParam[7] = new SqlParameter("@TotalAmount", SqlDbType.Decimal);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = Convert.ToDecimal(TotalAmount);

            objParam[8] = new SqlParameter("@DeliveryCharges", SqlDbType.Int);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Convert.ToInt32(DeliveryCharges);

            objParam[9] = new SqlParameter("@ExpirationDate", SqlDbType.SmallDateTime);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = Convert.ToDateTime(ExpirationDate);

            objParam[10] = new SqlParameter("@QuotationId", SqlDbType.VarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = QuotationId;

            objParam[11] = new SqlParameter("@TermsConditions", SqlDbType.VarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = TermsConditions;

            objParam[12] = new SqlParameter("@CreateUser", SqlDbType.VarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = LoginUser;

            objParam[13] = new SqlParameter("@BranchCode", SqlDbType.VarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = BranchCode;

            objParam[14] = new SqlParameter("@Department", SqlDbType.VarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = DeptName;

            objParam[15] = new SqlParameter("@OutstandingAmount", SqlDbType.Decimal);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = Convert.ToDecimal(OutstandingAmount);

            objParam[16] = new SqlParameter("@Advance", SqlDbType.Int);
            objParam[16].Direction = ParameterDirection.Input;
            objParam[16].Value = Convert.ToInt32(Advance);

            objParam[19] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[19].Direction = ParameterDirection.Input;
            objParam[19].Value = LoginUser;

            objParam[28] = new SqlParameter("@ServiceCharge", SqlDbType.NVarChar);
            objParam[28].Direction = ParameterDirection.Input;
            objParam[28].Value = ServiceCharge;

            var result = objMain.ExecuteProcedure("procPmAddSalesOrderDetails", objParam);

            return "";
        }
    }
}   

        //[WebMethod]
        //public static string AddSalesOrder(List<GridDataModel> gridData)
        //{
           
        //    //List<GridData> subgrid = JsonConvert.DeserializeObject<List<GridData>>(subgriddata.ToString());
        //    //GridDataObject grid = JsonConvert.DeserializeObject<string[]>(gridData);
        //   // List<GridDataModel> mainGridData = JsonConvert.DeserializeObject<List<GridDataModel>>(gridData);

        //    //List<string> grid = JsonConvert.DeserializeObject<List<string>>(gridData);
        //    //List<string> result = JsonConvert.DeserializeObject<List<string>>(gridData.ToString());
        //    //string[] grid = JsonConvert.DeserializeObject<string[]>(gridData.ToString());

        //    //var serializer = new JavaScriptSerializer();
        //    //var deserializedData = serializer.Deserialize<List<GridDataObject>>(gridData.ToString());


        //    //  clsMain objMain = new clsMain();
        //    SqlParameter[] objParam = new SqlParameter[29];
        //   // foreach (var mainGridRow in deserializedData)
        //    //{

        //        foreach (var row in gridData)
        //        {
        //            objParam[0] = new SqlParameter("@OrderDate", SqlDbType.SmallDateTime);
        //            objParam[0].Direction = ParameterDirection.Input;
        //            objParam[0].Value = Convert.ToDateTime(row.OrderDate);

        //            objParam[1] = new SqlParameter("@CustomerName", SqlDbType.VarChar);
        //            objParam[1].Direction = ParameterDirection.Input;
        //            objParam[1].Value = row.CustomerName;

        //            objParam[2] = new SqlParameter("@SalesOrderId", SqlDbType.VarChar);
        //            objParam[2].Direction = ParameterDirection.Input;
        //            objParam[2].Value = row.SalesOrderId;

        //            objParam[3] = new SqlParameter("@GSTTreatment", SqlDbType.VarChar);
        //            objParam[3].Direction = ParameterDirection.Input;
        //            objParam[3].Value = row.GSTTreatment;

        //            objParam[4] = new SqlParameter("@DeliveryDateTime", SqlDbType.SmallDateTime);
        //            objParam[4].Direction = ParameterDirection.Input;
        //            objParam[4].Value = Convert.ToDateTime(row.DeliveryDateTime);

        //            objParam[5] = new SqlParameter("@Currency", SqlDbType.VarChar);
        //            objParam[5].Direction = ParameterDirection.Input;
        //            objParam[5].Value = row.Currency;

        //            objParam[6] = new SqlParameter("@PaymentTerms", SqlDbType.VarChar);
        //            objParam[6].Direction = ParameterDirection.Input;
        //            objParam[6].Value = row.PaymentTerms;

        //            objParam[7] = new SqlParameter("@TotalAmount", SqlDbType.Decimal);
        //            objParam[7].Direction = ParameterDirection.Input;
        //            objParam[7].Value = Convert.ToDecimal(row.TotalAmount);

        //            objParam[8] = new SqlParameter("@DeliveryCharges", SqlDbType.Int);
        //            objParam[8].Direction = ParameterDirection.Input;
        //            objParam[8].Value = Convert.ToInt32(row.DeliveryCharges);

        //            objParam[9] = new SqlParameter("@ExpirationDate", SqlDbType.SmallDateTime);
        //            objParam[9].Direction = ParameterDirection.Input;
        //            objParam[9].Value = Convert.ToDateTime(row.ExpirationDate);

        //            objParam[10] = new SqlParameter("@QuotationId", SqlDbType.VarChar);
        //            objParam[10].Direction = ParameterDirection.Input;
        //            objParam[10].Value = row.QuotationId;

        //            objParam[11] = new SqlParameter("@TermsConditions", SqlDbType.VarChar);
        //            objParam[11].Direction = ParameterDirection.Input;
        //            objParam[11].Value = row.TermsConditions;

        //            objParam[12] = new SqlParameter("@CreateUser", SqlDbType.VarChar);
        //            objParam[12].Direction = ParameterDirection.Input;
        //            objParam[12].Value = row.LoginUser;

        //            objParam[13] = new SqlParameter("@BranchCode", SqlDbType.VarChar);
        //            objParam[13].Direction = ParameterDirection.Input;
        //            objParam[13].Value = row.BranchCode;

        //            objParam[14] = new SqlParameter("@Department", SqlDbType.VarChar);
        //            objParam[14].Direction = ParameterDirection.Input;
        //            objParam[14].Value = row.DeptName;

        //            objParam[15] = new SqlParameter("@OutstandingAmount", SqlDbType.Decimal);
        //            objParam[15].Direction = ParameterDirection.Input;
        //            objParam[15].Value = Convert.ToDecimal(row.OutstandingAmount);

        //            objParam[16] = new SqlParameter("@Advance", SqlDbType.Int);
        //            objParam[16].Direction = ParameterDirection.Input;
        //            objParam[16].Value = Convert.ToInt32(row.Advance);

        //            objParam[19] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
        //            objParam[19].Direction = ParameterDirection.Input;
        //            objParam[19].Value = row.LoginUser;

        //            objParam[28] = new SqlParameter("@ServiceCharge", SqlDbType.NVarChar);
        //            objParam[28].Direction = ParameterDirection.Input;
        //            objParam[28].Value = row.ServiceCharge;

        //            foreach (var rowDetails in SubGridDetails)
        //            {

        //                objParam[18] = new SqlParameter("@MaterialName", SqlDbType.VarChar);
        //                objParam[18].Direction = ParameterDirection.Input;
        //                objParam[18].Value = rowDetails.materialName;

        //                objParam[21] = new SqlParameter("@QTY", SqlDbType.Int);
        //                objParam[21].Direction = ParameterDirection.Input;
        //                objParam[21].Value = Convert.ToInt32(rowDetails.QTY);

        //                objParam[17] = new SqlParameter("@ItemId", SqlDbType.BigInt);
        //                objParam[17].Direction = ParameterDirection.Input;
        //                objParam[17].Value = Convert.ToInt32(rowDetails.itemId);

        //                objParam[25] = new SqlParameter("@DiscountPercent", SqlDbType.Int);
        //                objParam[25].Direction = ParameterDirection.Input;
        //                objParam[25].Value = rowDetails.discountpercent;

        //                objParam[26] = new SqlParameter("@IntegratedTaxPercent", SqlDbType.Int);
        //                objParam[26].Direction = ParameterDirection.Input;
        //                objParam[26].Value = Convert.ToInt32(rowDetails.integratedTaxPercent);

        //                objParam[27] = new SqlParameter("@Amount", SqlDbType.Decimal);
        //                objParam[27].Direction = ParameterDirection.Input;
        //                objParam[27].Value = Convert.ToDecimal(rowDetails.amount);

        //                objParam[24] = new SqlParameter("@MRP", SqlDbType.Int);
        //                objParam[24].Direction = ParameterDirection.Input;
        //                objParam[24].Value = Convert.ToInt32(rowDetails.MRP);

        //                objParam[22] = new SqlParameter("@UnitMeasure", SqlDbType.VarChar);
        //                objParam[22].Direction = ParameterDirection.Input;
        //                objParam[22].Value = rowDetails.UnitMeasure;

        //                objParam[23] = new SqlParameter("@Package", SqlDbType.VarChar);
        //                objParam[23].Direction = ParameterDirection.Input;
        //                objParam[23].Value = rowDetails.Packaging;

        //                objParam[20] = new SqlParameter("@Stock", SqlDbType.Int);
        //                objParam[20].Direction = ParameterDirection.Input;
        //                objParam[20].Value = Convert.ToInt32(rowDetails.stock);

        //            }
        //        var result = objMain.ExecuteProcedure("procPmAddSalesOrderDetails", objParam);
                


        //    }

        //    return JsonConvert.SerializeObject(new { success = true });

        //    // return "";
        //}
//    }
//}
