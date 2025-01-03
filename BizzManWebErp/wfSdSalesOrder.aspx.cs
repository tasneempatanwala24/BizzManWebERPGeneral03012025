using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using BizzManWebErp.Model;
using ClosedXML.Excel;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Newtonsoft.Json;
using System.Security;

namespace BizzManWebErp
{
    public partial class wfSdSalesOrder : System.Web.UI.Page
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
        public static string MaterialPackagingList(string materialid)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialPackagingList = new DataTable();

            try
            {

                dtMaterialPackagingList = objMain.dtFetchData("select id,Packaging from tblMmMaterialPackagingDetails where MaterialMasterId=" + materialid);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialPackagingList);
        }

        [WebMethod]
        [SecuritySafeCritical]
        public static string FetchSalesOrderListDownload(string SalesOrderId = "")
        {
            //   clsMain objMain = new clsMain();
            DataTable dtSalesOrderList = new DataTable();

            try
            {

                dtSalesOrderList = objMain.dtFetchData(@"select so.SalesOrderId,so.SalesOrderSource,c.CustomerName,so.GST_Treatment,CONVERT(nvarchar,so.ExpirationDate,104) as ExpirationDate,
                                                             CONVERT(nvarchar,so.ExpirationDate,104) as ExpirationDate,cm.Currency,
		                                                     so.PaymentTerms,sm.OrderStatus as OrderStatus,
		                                                      so.TotalAmount as TotalAmount,b.BranchName,d.DeptName
                                                      from tblSdSalesOrder so 
                                                      left join tblCrmCustomers c on c.CustomerId=so.CustomerId
                                                      left join tblMmCurrencyMaster cm on cm.Id=so.CurrencyId
                                                      left join tblSdSalesOrderStatusMaster sm on sm.id=so.OrderStatusId
                                                      left join tblHrBranchMaster b on b.BranchCode=so.BranchCode
                                                      left join tblHrDeptMaster d on d.Id=so.DepartmentID
                                                      where 1=1" + (SalesOrderId != "" ? " and so.SalesOrderId in(SELECT Item FROM [dbo].[SplitString] ('" + SalesOrderId + "',','))" : "") + " order by so.id desc");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtSalesOrderList.TableName = "SalesOrderList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtSalesOrderList);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    //Return xlsx Excel File  
                    byte[] bytes = stream.ToArray();

                    //Convert File to Base64 string and send to Client.
                    return Convert.ToBase64String(bytes, 0, bytes.Length);
                }
            }

        }


        [WebMethod]
        public static string FetchSalesOrderMasterList()
        {
            //   clsMain objMain = new clsMain();
            DataTable dtMaterialBOMMasterList = new DataTable();

            try
            {

                dtMaterialBOMMasterList = objMain.dtFetchData(@"select so.SalesOrderId,so.SalesOrderSource,c.CustomerName,so.GST_Treatment,CONVERT(nvarchar,so.ExpirationDate,104) as ExpirationDate,
                                                             CONVERT(nvarchar,so.QuotationDate,104) as QuotationDate,cm.Currency,
		                                                     so.PaymentTerms,sm.OrderStatus as OrderStatus,so.OrderStatusId,
		                                                      so.TotalAmount as TotalAmount,b.BranchName,d.DeptName,
so.DeliveyCharges,so.OutstandingAmount,so.Advance,so.ManualOrderId
                                                      from tblSdSalesOrder so 
                                                      left join tblCrmCustomers c on c.CustomerId=so.CustomerId
                                                      left join tblMmCurrencyMaster cm on cm.Id=so.CurrencyId
                                                      left join tblSdSalesOrderStatusMaster sm on sm.id=so.OrderStatusId
                                                      left join tblHrBranchMaster b on b.BranchCode=so.BranchCode
                                                      left join tblHrDeptMaster d on d.Id=so.DepartmentID
                                                          where so.Active='y'    order by so.id desc");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialBOMMasterList);
        }


        [WebMethod]
        public static string FetchSalesOrderMasterDetails(string SalesOrderId)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderasterDetails = new DataTable();

            try
            {

                dtSalesOrderasterDetails = objMain.dtFetchData("select * from tblSdSalesOrder where SalesOrderId='" + SalesOrderId + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderasterDetails);
        }




        [WebMethod]
        public static string FetchSalesOrderDetailsList(string salesorderid = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderDetailsList = new DataTable();

            try
            {

                dtSalesOrderDetailsList = objMain.dtFetchData(@"select o.*, m.MaterialName,m.UnitMesure,p.Packaging,SO.Deliveycharges,SO.CustomerId,SO.OrderDate,
(select isnull(Sum(QtyBalance),0) from tblMmMaterialStockMaster
inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId
inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode
where tblFaWarehouseMaster.BranchCode=SO.BranchCode and MaterialMasterId=o.MaterialId) as Stock
                                                          from tblSdSalesOrderProductDetails o
														  inner join tblSdSalesOrder SO on SO.SalesOrderId=o.SalesOrderId
                                                          left join tblMmMaterialMaster m on m.Id=o.MaterialId
                                                          left join tblMmMaterialPackagingDetails p on p.id=o.PackageId
                                                          where o.SalesOrderId='" + salesorderid + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderDetailsList);
        }


        //       [WebMethod]
        //       public static string AddSalesOrder(string SalesOrderId = "", string CustomerId = "", string ExpirationDate = "", string GSTTreatment = "",
        //                                          string SalesOrder_details = "", string QuotationDate = "", string Currency = "", 
        //                                          string PaymentTerms="",string TermsConditions="",string TotalAmount="",string OrderSource="", string LoginUser = "",
        //                                          string BranchCode = "", string DepartmentID = "")
        //       {

        //          // clsMain objMain = new clsMain();
        ////   have some error for class declaration
        // //==========================================          
        ////========================================
        //////============data not save===========================

        //           SqlParameter[] objParam = new SqlParameter[14];


        //           objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
        //           objParam[0].Direction = ParameterDirection.Input;
        //           objParam[0].Value = SalesOrderId;


        //           objParam[1] = new SqlParameter("@CustomerId", SqlDbType.Int);
        //           objParam[1].Direction = ParameterDirection.Input;
        //           objParam[1].Value = Convert.ToInt32(CustomerId);


        //           objParam[2] = new SqlParameter("@ExpirationDate", SqlDbType.DateTime);
        //           objParam[2].Direction = ParameterDirection.Input;
        //           objParam[2].Value = Convert.ToDateTime(ExpirationDate);


        //           objParam[3] = new SqlParameter("@GSTTreatment", SqlDbType.NVarChar);
        //           objParam[3].Direction = ParameterDirection.Input;
        //           objParam[3].Value = GSTTreatment;

        //           objParam[4] = new SqlParameter("@SalesOrder_details", SqlDbType.NVarChar);
        //           objParam[4].Direction = ParameterDirection.Input;
        //           objParam[4].Value = SalesOrder_details;

        //           objParam[5] = new SqlParameter("@QuotationDate", SqlDbType.DateTime);
        //           objParam[5].Direction = ParameterDirection.Input;
        //           objParam[5].Value = Convert.ToDateTime(QuotationDate);

        //           objParam[6] = new SqlParameter("@Currency", SqlDbType.Int);
        //           objParam[6].Direction = ParameterDirection.Input;
        //           objParam[6].Value = Convert.ToInt32(Currency);

        //           objParam[7] = new SqlParameter("@PaymentTerms", SqlDbType.NVarChar);
        //           objParam[7].Direction = ParameterDirection.Input;
        //           objParam[7].Value = PaymentTerms;

        //           objParam[8] = new SqlParameter("@TermsConditions", SqlDbType.NVarChar);
        //           objParam[8].Direction = ParameterDirection.Input;
        //           objParam[8].Value = TermsConditions;

        //           objParam[9] = new SqlParameter("@TotalAmount", SqlDbType.Decimal);
        //           objParam[9].Direction = ParameterDirection.Input;
        //           objParam[9].Value = Convert.ToDecimal(TotalAmount);

        //           objParam[10] = new SqlParameter("@OrderSource", SqlDbType.NVarChar);
        //           objParam[10].Direction = ParameterDirection.Input;
        //           objParam[10].Value = OrderSource;

        //           objParam[11] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
        //           objParam[11].Direction = ParameterDirection.Input;
        //           objParam[11].Value = LoginUser;

        //           objParam[12] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
        //           objParam[12].Direction = ParameterDirection.Input;
        //           objParam[12].Value = BranchCode;

        //           objParam[13] = new SqlParameter("@DepartmentID", SqlDbType.Int);
        //           objParam[13].Direction = ParameterDirection.Input;
        //           objParam[13].Value = Convert.ToInt32(DepartmentID);

        //           var result = objMain.ExecuteStoreProcedure("procSdSalesOrderInsert", objParam);

        //           string json = "";
        //           if (result != null)
        //           {
        //               if (result.Rows.Count > 0)
        //               {
        //                   json = result.Rows[0][0].ToString();
        //               }
        //           }


        //           return json;
        //       }



        [WebMethod]
        public static string AddSalesOrder(List<SalesQuotationDetail> data, string SalesOrderId = "", string CustomerId = "", string ExpirationDate = "", string GSTTreatment = "", string DeliveryDateTime = "", string Currency = "",
                                         string PaymentTerms = "", string TermsConditions = "", string TotalAmount = "", string OrderSource = "", string LoginUser = "",
                                         string BranchCode = "", string DepartmentID = "", string OrderDate = "", string ManualOrderId = "", string DeliveryCharges = "", string OutstandingAmount = "", string Advance = ""
                                        , string Active = "", string SquareUp = "",string PaymentMode = "", string AcNo = "")
        {
            StringBuilder strBuild = new StringBuilder();
            strBuild.Append("<XMLData>");
            strBuild.Append("<SalesOrderId>" + SalesOrderId + "</SalesOrderId>");
            strBuild.Append("<ManualOrderId>" + ManualOrderId + "</ManualOrderId>");
            strBuild.Append("<CustomerId>" + CustomerId + "</CustomerId>");
            strBuild.Append("<ExpirationDate>" + DateTime.ParseExact(ExpirationDate, "MM/dd/yyyy", CultureInfo.InvariantCulture) + "</ExpirationDate>");
            strBuild.Append("<OrderDate>" + DateTime.ParseExact(OrderDate, "MM/dd/yyyy", CultureInfo.InvariantCulture) + "</OrderDate>");
            strBuild.Append("<GSTTreatment>" + GSTTreatment + "</GSTTreatment>");
            strBuild.Append("<DeliveryDateTime>" + DeliveryDateTime.Replace("T", " ") + "</DeliveryDateTime>");
            strBuild.Append("<Currency>" + Currency + "</Currency>");
            strBuild.Append("<TermsConditions>" + TermsConditions + "</TermsConditions>");
            strBuild.Append("<PaymentTerms>" + PaymentTerms + "</PaymentTerms>");
            strBuild.Append("<TotalAmount>" + TotalAmount + "</TotalAmount>");
            strBuild.Append("<OutstandingAmount>" + OutstandingAmount + "</OutstandingAmount>");
            strBuild.Append("<Advance>" + Advance + "</Advance>");
            strBuild.Append("<DeliveryCharges>" + DeliveryCharges + "</DeliveryCharges>");
            strBuild.Append("<OrderSource>" + OrderSource + "</OrderSource>");
            strBuild.Append("<CreateUser>" + LoginUser + "</CreateUser>");
            strBuild.Append("<BranchCode>" + BranchCode + "</BranchCode>");
            strBuild.Append("<DepartmentID>" + DepartmentID + "</DepartmentID>");
            strBuild.Append("<Active>" + Active + "</Active>");
            strBuild.Append("<SquareUp>" + SquareUp + "</SquareUp>");
            strBuild.Append("<PaymentMode>" + PaymentMode + "</PaymentMode>");
            strBuild.Append("<AcNo>" + AcNo + "</AcNo>");


            strBuild.Append("<SalesQuotationDetails>");
            if (data.Count > 0)
            {
                foreach (var item in data)
                {
                    strBuild.Append("<SalesQuotationDetail>");
                    strBuild.Append("<ItemId>" + Convert.ToInt32(item.ItemID) + "</ItemId>");
                    strBuild.Append("<Qty>" + item.Quantity + "</Qty>");
                    strBuild.Append("<Rate>" + item.Rate + "</Rate>");
                    if (item.PackageId != "")
                    {
                        strBuild.Append("<PackageId>" + item.PackageId + "</PackageId>");
                    }

                    strBuild.Append("<GST>" + item.GST + "</GST>");
                    strBuild.Append("<Discount>" + item.Discount + "</Discount>");
                    //strBuild.Append("<CentralTaxPercent>" + item.CentralTaxPercent + "</CentralTaxPercent>");
                    //strBuild.Append("<StateTaxPercent>" + item.StateTaxPercent + "</StateTaxPercent>");
                    //strBuild.Append("<CessPercent>" + item.CessPercent + "</CessPercent>");

                    strBuild.Append("<Amount>" + item.Amount + "</Amount>");
                    strBuild.Append("</SalesQuotationDetail>");
                }
            }
            strBuild.Append("</SalesQuotationDetails>");

            strBuild.Append("</XMLData>");



            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[1];


            objParam[0] = new SqlParameter("@XMLData", SqlDbType.Xml);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = strBuild.ToString();

            var result = objMain.ExecuteProcedure("procSdSalesOrderInsertNew", objParam);


            return "";
        }


        [WebMethod]
        public static string UpdateSalesOrderStatus(string SalesOrderId = "", string OrderStatus = "", string LoginUser = "")
        {

            //   clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[3];


            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = SalesOrderId;


            objParam[1] = new SqlParameter("@OrderStatus", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = OrderStatus;

            objParam[2] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = LoginUser;


            var result = objMain.ExecuteProcedure("procSdSalesOrderStatusUpdate", objParam);


            return "";
        }

        //================================
        //=================================
        [WebMethod]
        public static string BindCurrencyList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCurrencyList = new DataTable();

            try
            {

                dtCurrencyList = objMain.dtFetchData("select Id,Currency FROM tblMmCurrencyMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCurrencyList);
        }
        //============================
        //===========================






        //================================
        //===============================
        //==========================
        [WebMethod]
        public static string FetchMaterialDetails(string MaterialId, string BranchCode)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialDetails = new DataTable();

            try
            {

                dtMaterialDetails = objMain.dtFetchData(@"select Id,MaterialName,UnitMesure,MRP,isnull(IntegratedTaxPercent,0) as IntegratedTaxPercent,isnull(CentralTaxPercent,0) as CentralTaxPercent
,isnull(StateTaxPercent,0) as StateTaxPercent,isnull(CessPercent,0) as CessPercent,
(select isnull(Sum(QtyBalance),0) from tblMmMaterialStockMaster inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode where tblFaWarehouseMaster.BranchCode='" + BranchCode + "' and MaterialMasterId=MM.Id) as Stock from tblMmMaterialMaster MM where Id=" + MaterialId + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialDetails);
        }
        //===========================
        //==============================
        //==============================



        //=========================
        //=========================
        //======================
        [WebMethod]
        public static string GetBranchDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select BranchName, BranchCode from tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }
        //===========================
        //============================


        //===================================
        //===============================
        [WebMethod]
        public static string CustomerMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {

                dtCustomerList = objMain.dtFetchData(@"SELECT tblCrmCustomers.CustomerId,CustomerName, Street1, Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCustomerList);
        }
        //==============================
        //================================

        //===============================
        //==================================
        [WebMethod]
        public static string CustomerTypeMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {

                dtCustomerList = objMain.dtFetchData("select id,CustomerType FROM tblCrmCustomerType");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCustomerList);
        }

        //===============================
        //=================================

        //=============================
        //===============================
        //===============================
        [WebMethod]
        public static string GetDeptDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select DeptName, Id from tblHrDeptMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }
        //=============================
        //===============================
        //==============================






        [WebMethod]
        public static string AddCustomer(string CustomerName = "", string CustomerType = "", string CompanyName = "", string City = "",
                                           string State = "", string Email = "", string Mobile = "", string LoginUser = "")
        {

            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];


            objParam[0] = new SqlParameter("@CustomerName", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = CustomerName;


            objParam[1] = new SqlParameter("@CustomerType", SqlDbType.Int);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToInt32(CustomerType);


            objParam[2] = new SqlParameter("@CompanyName", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = CompanyName;


            objParam[3] = new SqlParameter("@City", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = City;

            objParam[4] = new SqlParameter("@State", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = State;

            objParam[5] = new SqlParameter("@Email", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Email;

            objParam[6] = new SqlParameter("@Mobile", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Mobile;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = LoginUser;


            var result = objMain.ExecuteStoreProcedure("procCrmCustomerInsert", objParam);

            string json = "";
            if (result != null)
            {
                if (result.Rows.Count > 0)
                {
                    json = result.Rows[0][0].ToString();
                }
            }


            return json;
        }
        //==============================
        //===========================
        [WebMethod]
        public static string FetchStateList()
        {
            //  clsMain objMain = new clsMain();
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
        //=============================
        //==============================
        [WebMethod]
        public static string FetchCityList(string stateid)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCityList = new DataTable();

            try
            {

                dtCityList = objMain.dtFetchData("select Id,CityName from tblHrCityMaster where StateId=" + stateid);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCityList);
        }



        [WebMethod]
        public static string AddCustomerType(string CustomerType = "")
        {

            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[1];


            objParam[0] = new SqlParameter("@CustomerType", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = CustomerType;



            var result = objMain.ExecuteStoreProcedure("procCrmCustomerTypeInsert", objParam);

            string json = "";
            if (result != null)
            {
                if (result.Rows.Count > 0)
                {
                    json = result.Rows[0][0].ToString();
                }
            }


            return json;
        }


        [WebMethod]
        public static string MaterialMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where isnull(CanSale,0)=1");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }


        [WebMethod]
        public static string GenerateOrderID(string OrderDate)
        {
            DataTable dtNewQuotationID = new DataTable();

            try
            {
                string formattedOrderDate = DateTime.ParseExact(OrderDate, "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd");
                //  dtNewQuotationID = objMain.dtFetchData(@"select 'SORD' + CONVERT(NVARCHAR(10), '" + formattedOrderDate + "', 120)   +'/'+                       RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(SalesOrderId, LEN(SalesOrderId) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4) as SalesOrderId    FROM tblSdSalesOrder    WHERE OrderDate ='" + formattedOrderDate + "'");

                dtNewQuotationID = objMain.dtFetchData("select 'SORD' + CONVERT(NVARCHAR(10), '" + formattedOrderDate + "', 120) + '/' +\r\n                             RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(SalesOrderId, LEN(SalesOrderId) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4)\r\n as SalesOrderId    FROM tblSdSalesOrder\r\n    WHERE OrderDate ='" + formattedOrderDate + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtNewQuotationID);
        }


        [WebMethod]
        public static string CheckManualOrderId(string ManualOrderId)
        {
            DataTable dtNewQuotationID = new DataTable();

            try
            {

                dtNewQuotationID = objMain.dtFetchData(@"select *    FROM tblSdSalesOrder    WHERE ManualOrderId ='" + ManualOrderId + "'");
                return JsonConvert.SerializeObject(dtNewQuotationID.Rows.Count > 0 ? "false" : "true");
            }
            catch (Exception ex)
            {
                return "false";
            }


        }


        [WebMethod]
        public static string GetPdfContent(string SalesOrderId)
        {

            // Generate PDF content (replace this with your actual PDF generation logic)
            byte[] pdfBytes = GeneratePdfBytes(SalesOrderId);

            // Convert PDF content to base64 string
            string base64String = Convert.ToBase64String(pdfBytes);

            return base64String;
        }

        private static byte[] GeneratePdfBytes(string SalesOrderId)
        {
            // Example: Generate a simple PDF using iTextSharp library
            using (MemoryStream ms = new MemoryStream())
            {
                iTextSharp.text.Document document = new iTextSharp.text.Document();
                iTextSharp.text.pdf.PdfWriter.GetInstance(document, ms);
                document.Open();
                //document.Add(new iTextSharp.text.Paragraph("Hello, World!"));
                AddInvoiceContent(document, SalesOrderId);
                document.Close();
                return ms.ToArray();
            }
        }

        private static void AddInvoiceContent(Document document, string SalesOrderId)
        {// Open the document before adding content
         // Your company information
         //string filePath = Server.MapPath("Images\\logo.jpg");
         //filePath=Path.Combine(filePath, "Images\\logo.jpg");

            //PdfPTable QuotationHeadingTable = new PdfPTable(1);
            //QuotationHeadingTable.WidthPercentage = 100;
            //QuotationHeadingTable.SetWidths(new float[] { 4f }); // Adjust the widths as needed
            //PdfPCell QuotationHeadingCell = new PdfPCell();
            //QuotationHeadingCell.AddElement(new Paragraph("QUOTATION", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 14)));
            //QuotationHeadingCell.BorderWidth = 0;
            //QuotationHeadingCell.Colspan = 1;
            //QuotationHeadingCell.HorizontalAlignment = Element.ALIGN_CENTER; // Align to the center
            //QuotationHeadingTable.AddCell(QuotationHeadingCell);
            //document.Add(QuotationHeadingTable);

            PdfPTable QuotationHeadingTable = new PdfPTable(1);
            QuotationHeadingTable.WidthPercentage = 100;

            PdfPCell QuotationHeadingCell = new PdfPCell(new Phrase("Sales Order", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 14)));
            QuotationHeadingCell.BorderWidth = 0;
            QuotationHeadingCell.HorizontalAlignment = Element.ALIGN_CENTER; // Align to the center
            QuotationHeadingCell.VerticalAlignment = Element.ALIGN_MIDDLE; // Align to the middle vertically
            QuotationHeadingCell.FixedHeight = 50f; // Adjust the height as needed

            QuotationHeadingTable.AddCell(QuotationHeadingCell);
            document.Add(QuotationHeadingTable);



            PdfPTable companyInfoTable = new PdfPTable(2);
            companyInfoTable.WidthPercentage = 100;
            companyInfoTable.SetWidths(new float[] { 3f, 1f }); // Adjust the widths as needed
            PdfPCell companyInfoCell = new PdfPCell();
            DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");


            if (dtCompanyDetails != null && dtCompanyDetails.Rows.Count > 0)
            {
                string companyName = Convert.ToString(dtCompanyDetails.Rows[0]["CompanyName"]);
                companyInfoCell.AddElement(new Paragraph("" + companyName, FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)));





                string companyAddress = Convert.ToString(dtCompanyDetails.Rows[0]["Address1"]);
                companyInfoCell.AddElement(new Paragraph("" + companyAddress, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                string companyEmail = Convert.ToString(dtCompanyDetails.Rows[0]["EmailAddress"]);
                companyInfoCell.AddElement(new Paragraph("Email: " + companyEmail, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                string companyPhone = Convert.ToString(dtCompanyDetails.Rows[0]["PhoneNo"]);
                companyInfoCell.AddElement(new Paragraph("Contact: " + companyPhone, FontFactory.GetFont(FontFactory.HELVETICA, 10)));

                companyInfoCell.BorderWidth = 0;

                companyInfoTable.AddCell(companyInfoCell);
                // Company logo on the right
                //adding company logo
                PdfPCell companyLogoCell = new PdfPCell();
                if (dtCompanyDetails.Rows[0]["Logo"] != System.DBNull.Value)
                {
                    byte[] imageData = (byte[])dtCompanyDetails.Rows[0]["Logo"];


                    // Replace "path/to/your/logo.png" with the actual path to your logo image
                    //iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(filePath);

                    // Attempt to create an iTextSharp Image instance from the byte array
                    //iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(imageData);


                    // logo.ScaleToFit(100, 100); // Adjust the width and height as needed
                    // companyLogoCell.AddElement(logo);




                }
                companyLogoCell.BorderWidth = 0;
                companyLogoCell.HorizontalAlignment = Element.ALIGN_RIGHT; // Align to the right
                companyInfoTable.AddCell(companyLogoCell);
                document.Add(companyInfoTable);

            }



            // Bill To section
            PdfPTable billToTable = new PdfPTable(2);
            billToTable.WidthPercentage = 100;
            billToTable.SetWidths(new float[] { 3f, 1f });

            // Client information on the left
            PdfPCell clientInfoCell = new PdfPCell();
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, Street1, Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId =
(SELECT CustomerId FROM tblSdSalesOrder WHERE SalesOrderId = '" + SalesOrderId + "')");
            if (dtClientDetails.Rows.Count > 0)
            {
                string clientName = Convert.ToString(dtClientDetails.Rows[0]["ContactName"]);
                string clientAddress = Convert.ToString(dtClientDetails.Rows[0]["Street1"]);
                string clientEmail = Convert.ToString(dtClientDetails.Rows[0]["Email"]);
                string phone = Convert.ToString(dtClientDetails.Rows[0]["Phone"]);
                clientInfoCell.AddElement(new Paragraph("Name : " + clientName, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                clientInfoCell.AddElement(new Paragraph("Address : " + clientAddress, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                clientInfoCell.AddElement(new Paragraph("Phone : " + phone, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                clientInfoCell.AddElement(new Paragraph("Email: " + clientEmail, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                // Set border width and padding to zero
                clientInfoCell.BorderWidth = 0;
                clientInfoCell.Padding = 0;
                //clientInfoCell.HorizontalAlignment = Element.ALIGN_LEFT;
                billToTable.AddCell(clientInfoCell);
                DataTable dtQuotationDetails = objMain.dtFetchData(@"select SM.SalesOrderId,FORMAT(OrderDate, 'dd/MM/yyyy') as OrderDate,(isnull(TotalAmount,0)-isnull(Deliveycharges,0)) as NetTotal,
(Select cast (Sum(isnull(Qty*MM.MRP*(SP.Tax/100),0))as decimal(16,2)) from tblSdSalesOrderProductDetails SP 
inner join tblSdSalesOrder on tblSdSalesOrder.SalesOrderId=SP.SalesOrderId
inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialId
where SP.SalesOrderId=SM.SalesOrderId
)NetGST
,TotalAmount as NetAmount,
isnull(Deliveycharges,0) as ShippingCharges,TermCondition as TermsAndConditions ,isnull(Description,'') as Notes,cust.CustomerId,
isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile,isnull(Email,'')as Email ,isnull(Street1,'')+' '+isnull(City,'')+' '+isnull(State,'')+' '+
isnull(Zip,'')+' '+isnull(Country,'') as Address from tblSdSalesOrder SM  inner join tblCrmCustomers cust on SM.CustomerId=cust.CustomerId  
inner join tblCrmCustomerContacts CustCon on CustCon.ContactId=cust.ContactId where SM.SalesOrderId='" + SalesOrderId + "'");
                // Quotation details on the right
                PdfPCell quotationDetailsCell = new PdfPCell();
                quotationDetailsCell.AddElement(new Paragraph("SalesOrder ID: " + SalesOrderId, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                quotationDetailsCell.AddElement(new Paragraph("Order Date: " + Convert.ToString(dtQuotationDetails.Rows[0]["OrderDate"]), FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                quotationDetailsCell.BorderWidth = 0;
                quotationDetailsCell.Padding = 0;
                quotationDetailsCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                billToTable.AddCell(quotationDetailsCell);

                document.Add(new Paragraph("Bill To", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)));
                document.Add(billToTable);

                // Add a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break


                // Add your invoice content here

                // Example: Adding a table
                PdfPTable itemTable = new PdfPTable(6);
                itemTable.WidthPercentage = 100;
                itemTable.SetWidths(new float[] { 2f, 1f, 1f, 1f, 1f, 1f });

                // Add table header
                itemTable.AddCell(new PdfPCell(new Phrase("Item", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Qty", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Rate", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Discount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("GST %", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Amount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                DataTable dtSalesQuotationDetail = objMain.dtFetchData(@" select SM.SalesOrderId,SD.MaterialId as ItemId,material.materialName,SD.Qty,SD.UnitPrice as Rate,SD.DiscountPercent Discount,SD.Tax GST,SD.SubTotal Amount,
 SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent,material.MRP as ActualRate
from   tblSdSalesOrder SM  inner join tblSdSalesOrderProductDetails SD on SM.SalesOrderId=SD.SalesOrderId 
inner join tblMmMaterialMaster material on material.Id=SD.MaterialId where SM.SalesOrderId='" + SalesOrderId + "'");
                // Add table rows with item details
                // Replace the following with your actual data

                decimal centralTaxValue = 0;
                decimal stateTaxValue = 0;
                decimal cessTaxValue = 0;

                decimal centralTaxPercent = 0;
                decimal stateTaxPercent = 0;
                decimal cessTaxPercent = 0;
                decimal qty = 0;
                decimal actualRate = 0;


                if (dtSalesQuotationDetail != null && dtSalesQuotationDetail.Rows.Count > 0)
                {
                    foreach (DataRow row in dtSalesQuotationDetail.Rows)
                    {
                        itemTable.AddCell(row["materialName"].ToString());
                        itemTable.AddCell(row["Qty"].ToString());
                        itemTable.AddCell(row["Rate"].ToString());
                        itemTable.AddCell(row["Discount"].ToString());
                        itemTable.AddCell(row["GST"].ToString());
                        itemTable.AddCell(row["Amount"].ToString());

                        centralTaxPercent = Convert.ToDecimal(row["CentralTaxPercent"].ToString());
                        stateTaxPercent = Convert.ToDecimal(row["StateTaxPercent"].ToString());
                        cessTaxPercent = Convert.ToDecimal(row["CessPercent"].ToString());
                        qty = Convert.ToDecimal(row["Qty"].ToString());
                        actualRate = Convert.ToDecimal(row["ActualRate"].ToString());

                        centralTaxValue += (qty * actualRate) * (centralTaxPercent / 100);
                        stateTaxValue += (qty * actualRate) * (stateTaxPercent / 100);
                        cessTaxValue += (qty * actualRate) * (cessTaxPercent / 100);
                    }


                }
                // Add more rows as needed

                // Add table footer
                PdfPCell totalAmountCell = new PdfPCell(new Phrase("Total Amount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                totalAmountCell.Colspan = 5;
                totalAmountCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(totalAmountCell);
                string amt = Convert.ToString(dtQuotationDetails.Rows[0]["NetTotal"]);
                itemTable.AddCell(amt);


                PdfPCell CentralTaxValueCell = new PdfPCell(new Phrase("Central Tax Value", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                CentralTaxValueCell.Colspan = 5;
                CentralTaxValueCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(CentralTaxValueCell);
                itemTable.AddCell(centralTaxValue.ToString("0.00"));

                PdfPCell StateTaxValueCell = new PdfPCell(new Phrase("State Tax Value", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                StateTaxValueCell.Colspan = 5;
                StateTaxValueCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(StateTaxValueCell);
                itemTable.AddCell(stateTaxValue.ToString("0.00"));

                PdfPCell CessTaxValueCell = new PdfPCell(new Phrase("Cess Value", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                CessTaxValueCell.Colspan = 5;
                CessTaxValueCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(CessTaxValueCell);
                itemTable.AddCell(cessTaxValue.ToString("0.00"));


                string gst = Convert.ToString(dtQuotationDetails.Rows[0]["NetGST"]);
                PdfPCell netGSTCell = new PdfPCell(new Phrase("Net GST", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                netGSTCell.Colspan = 5;
                netGSTCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(netGSTCell);
                itemTable.AddCell(gst);
                string ship = Convert.ToString(dtQuotationDetails.Rows[0]["ShippingCharges"]);
                PdfPCell shippingChargesCell = new PdfPCell(new Phrase("Shipping Charges", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                shippingChargesCell.Colspan = 5;
                shippingChargesCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(shippingChargesCell);
                itemTable.AddCell(ship)
        ;
                string net = Convert.ToString(dtQuotationDetails.Rows[0]["NetAmount"]);
                PdfPCell netAmountCell = new PdfPCell(new Phrase("Net Amount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                netAmountCell.Colspan = 5;
                netAmountCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(netAmountCell);
                itemTable.AddCell(net);

                document.Add(itemTable);
                // Add a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                                                               // Example: Adding notes
                string notes = Convert.ToString(dtQuotationDetails.Rows[0]["Notes"]);
                document.Add(new Paragraph("Notes: " + notes, FontFactory.GetFont(FontFactory.HELVETICA, 10)));

                // Example: Adding terms and conditions
                string terms = Convert.ToString(dtQuotationDetails.Rows[0]["TermsAndConditions"]);
                document.Add(new Paragraph("Terms and Conditions: " + terms, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            }
        }


        #region Naresh Singhal :: 10 Oct 2024 
        [WebMethod]
        public static string CheckDeliveredQty(string SalesOrderId = "", Int32 MaterialId = 0)
        {
            SqlParameter[] objParam = new SqlParameter[2];

            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = SalesOrderId;

            objParam[1] = new SqlParameter("@MaterialId", SqlDbType.BigInt);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = MaterialId;


            DataTable dtResult = objMain.ExecuteStoreProcedure("procSdCheckDeliveredQty", objParam);

            return dtResult.Rows[0][0].ToString();
        }

        [WebMethod]
        public static string GetPaymentMode()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdGetPaymentMode", null);
            return JsonConvert.SerializeObject(result);
        } 
        #endregion
    }

}