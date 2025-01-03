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
using DocumentFormat.OpenXml.ExtendedProperties;
using Newtonsoft.Json;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Vml;
using System.Security;
using DocumentFormat.OpenXml.Office.CoverPageProps;
using DocumentFormat.OpenXml.Drawing.Charts;

namespace BizzManWebErp
{
    public partial class wfSdSalesOrderInvoice : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
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
        }

        [WebMethod]
        public static string GetSalesOrderList()
        {
            //  clsMain objMain = new clsMain();
            System.Data.DataTable dtQuotationlist = new System.Data.DataTable();

            try
            {

                dtQuotationlist = objMain.dtFetchData(@"select SO.* ,isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile
from tblSdSalesOrder as SO
INNER JOIN   tblCrmCustomers on tblCrmCustomers.CustomerId=SO.CustomerId
inner join tblCrmCustomerContacts on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId
where SO.SalesInvoiceComplete != 'y'
");
            }
            catch (Exception ex)
            {

            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Newtonsoft.Json.Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            return JsonConvert.SerializeObject(dtQuotationlist, settings);

        }

        [WebMethod]
        public static string GetSalesOrderIdDetailsById(string SalesOrderId)    
        {
            //  clsMain objMain = new clsMain();
            System.Data.DataTable dtQuotationDetails = new System.Data.DataTable();
            System.Data.DataTable dtSalesQuotationDetail = new System.Data.DataTable();

            try
            {

                dtQuotationDetails = objMain.dtFetchData(@"select SO.* ,isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile
from tblSdSalesOrder as SO
INNER JOIN   tblCrmCustomers on tblCrmCustomers.CustomerId=SO.CustomerId
inner join tblCrmCustomerContacts on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId
where SalesOrderId='" + SalesOrderId + "'");

                dtSalesQuotationDetail = objMain.dtFetchData(@"select SM.SalesOrderId,SD.Id as SalesOrderProductDetailId,materialName,material.Id as MaterialId,material.UnitMesure as UnitMeasure,SD.Qty,UnitPrice as Rate
,DiscountPercent as Discount,Tax as GST,SubTotal Amount,SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent
,SD.TaxValue
,SD.CentralTaxValue
,SD.StateTaxValue
,SD.CessValue
,isnull(SD.PackageId,0) as PackageId,isnull(P.Packaging,'') as Package,
material.MRP as ActualRate from tblSdSalesOrder SM 
inner join tblSdSalesOrderProductDetails SD on SM.SalesOrderId=SD.SalesOrderId inner join 
tblMmMaterialMaster material on material.Id=SD.MaterialId 
  left join tblMmMaterialPackagingDetails p on p.id=SD.PackageId
where SM.SalesOrderId='" + SalesOrderId + "' and SD.SalesInvoiceGenerate='n'");

                System.Data.DataTable salesOrderPaymentDetails = new System.Data.DataTable();

                SqlParameter[] objParam = new SqlParameter[1];
                objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = SalesOrderId.ToString();

                salesOrderPaymentDetails = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMaster", objParam);

                if (dtQuotationDetails != null && dtQuotationDetails.Rows.Count > 0)
                {
                    DataRow dr = dtQuotationDetails.Rows[0];
                    // Create an anonymous object containing SalesQuotationMasterinfo and sales items
                    var invoiceData = new
                    {
                        SalesOrderInvoiceMasterInfo = new
                        {
                            SalesOrderId = dr["SalesOrderId"].ToString(),
                            Deliveycharges = dr["Deliveycharges"].ToString() == "" ? "0" : dr["Deliveycharges"].ToString(),
                            NetTotal = dr["TotalAmount"].ToString(),
                            CustomerId = dr["CustomerId"].ToString(),
                            CustomerName = dr["CustomerName"].ToString(),
                            Mobile = dr["Mobile"].ToString(),
                            OutStandingamount = dr["OutStandingamount"].ToString() == "" ? "0" : dr["OutStandingamount"].ToString(),
                            Advance = dr["Advance"].ToString() == "" ? "0" : dr["Advance"].ToString()

                        },
                        SalesOrderInvoiceItems = dtSalesQuotationDetail.AsEnumerable().ToList(),
                        SalesOrderPaymentDetails = salesOrderPaymentDetails.AsEnumerable().ToList()

                    };
                    return JsonConvert.SerializeObject(invoiceData);
                }
            }
            catch (Exception ex)
            {
                return "";
            }
            return "";

        }

        [WebMethod]
        public static string GenerateOrderID(string SalesInvoiceDate)
        {
            System.Data.DataTable dtNewQuotationID = new System.Data.DataTable();

            try
            {
                string formattedInvoiceDate = DateTime.ParseExact(SalesInvoiceDate, "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd");
               
                dtNewQuotationID = objMain.dtFetchData(@"select 'INVO' + CONVERT(NVARCHAR(10), '" + formattedInvoiceDate + "', 120)   +'/'+                       RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(SalesInvoiceId, LEN(SalesInvoiceId) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4) as SalesInvoiceId    FROM tblSalesInvoiceMaster    WHERE SalesInvoiceDate ='" + formattedInvoiceDate + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtNewQuotationID);
        }


        [WebMethod]
        public static string GetBranchDetails()
        {
            // clsMain objMain = new clsMain();
            System.Data.DataTable dtList = new System.Data.DataTable();

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

        [WebMethod]
        public static string GetDeptDetails()
        {
            //  clsMain objMain = new clsMain();
            System.Data.DataTable dtList = new System.Data. DataTable();

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

        [WebMethod]
        public static string BindCurrencyList()
        {
            //  clsMain objMain = new clsMain();
            System.Data.DataTable dtCurrencyList = new System.Data.DataTable();

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


        [WebMethod]
        public static string AddSalesOrderInvoice(List<SalesQuotationDetail> data, string SalesOrderId = "", string CustomerId = "", string SalesInvoiceId = "", string OutstandingAmount = "",
                                           string DeliveryCharges = "",  string TotalAmount = "", string LoginUser = ""
                                          , string SalesinvoiceDate = "",string Advance="",string Description="")
        {
            StringBuilder strBuild = new StringBuilder();
            strBuild.Append("<XMLData>");
            strBuild.Append("<SalesOrderId>" + SalesOrderId + "</SalesOrderId>");
            strBuild.Append("<CustomerId>" + CustomerId + "</CustomerId>");
            strBuild.Append("<SalesInvoiceId>" + SalesInvoiceId + "</SalesInvoiceId>");
          
            strBuild.Append("<SalesinvoiceDate>" + DateTime.ParseExact(SalesinvoiceDate, "MM/dd/yyyy", CultureInfo.InvariantCulture) + "</SalesinvoiceDate>");
            strBuild.Append("<OutstandingAmount>" + OutstandingAmount + "</OutstandingAmount>");
            strBuild.Append("<Advance>" + Advance + "</Advance>");
            strBuild.Append("<DeliveryCharges>" + DeliveryCharges + "</DeliveryCharges>");
            strBuild.Append("<TotalAmount>" + TotalAmount + "</TotalAmount>");
            strBuild.Append("<CreateUser>" + LoginUser + "</CreateUser>");
            strBuild.Append("<Description>" + Description + "</Description>");
            

            strBuild.Append("<SalesQuotationDetails>");
            if (data.Count > 0)
            {
                foreach (var item in data)
                {
                    strBuild.Append("<SalesQuotationDetail>");
                    strBuild.Append("<ItemId>" + Convert.ToInt32(item.ItemID) + "</ItemId>");
                    strBuild.Append("<Qty>" + item.Quantity + "</Qty>");
                    strBuild.Append("<Rate>" + item.Rate + "</Rate>");
                    strBuild.Append("<SalesOrderProductDetailId>" + item.SalesOrderProductDetailId + "</SalesOrderProductDetailId>");
                    strBuild.Append("<GST>" + item.GST + "</GST>");
                    strBuild.Append("<Discount>" + item.Discount + "</Discount>");
                    if(item.PackageId!="" && item.PackageId!="0")
                    {
                        strBuild.Append("<PackageId>" + item.PackageId + "</PackageId>");
                    }
                    
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

            var result = objMain.ExecuteProcedure("procSdSalesInvoiceOrder", objParam);


            return "";
        }


        [WebMethod]
        public static string FetchSalesOrderInvoiceMasterList()
        {
            //   clsMain objMain = new clsMain();
            System.Data.DataTable dtMaterialBOMMasterList = new System.Data.DataTable();

            try
            {
                    
                dtMaterialBOMMasterList = objMain.dtFetchData(@"select so.*,c.CustomerName,convert(varchar(10), cast(SalesInvoiceDate as date), 101) as formattedsalesInvoiceDate ,ManualOrderId
from tblSalesInvoiceMaster so  left join tblCrmCustomers c on c.CustomerId=so.CustomerId   
inner join tblSdSalesOrder on tblSdSalesOrder.SalesOrderId=so.SalesOrderId
order by so.id desc");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialBOMMasterList);
        }


        [WebMethod]
        public static string FetchSalesOrderInvoiceMasterDetails(string SalesInvoiceId)
        {
            //  clsMain objMain = new clsMain();
            System.Data.DataTable dtSalesOrderasterDetails = new System.Data.DataTable();
            System.Data.DataTable dtSalesOrderDetailsList = new System.Data.DataTable();
            try
                {

                dtSalesOrderasterDetails = objMain.dtFetchData(@"select SO.*,CustomerName,Mobile,
convert(varchar(10), cast(SalesInvoiceDate as date), 101) as formattedsalesInvoiceDate
from tblSalesInvoiceMaster SO
                    inner join tblCrmCustomers Cust on Cust.CustomerId=SO.CustomerId
                    inner join tblCrmCustomerContacts on Cust.ContactId=tblCrmCustomerContacts.ContactId
                       where SalesInvoiceId='" + SalesInvoiceId + "'");

                dtSalesOrderDetailsList = objMain.dtFetchData(@"select o.*,m.MaterialName,m.UnitMesure,ISNULL(p.Packaging,'') AS Packaging
                                                                  from tblSalesInvoiceDetail o 
                                                                  left join tblMmMaterialMaster m on m.Id=o.MaterialId
                                                                  left join tblMmMaterialPackagingDetails p on p.id=o.PackageId
                                                                  where o.SalesInvoiceId='" + SalesInvoiceId + "'");

                if (dtSalesOrderasterDetails != null && dtSalesOrderasterDetails.Rows.Count > 0)
                {
                    DataRow dr = dtSalesOrderasterDetails.Rows[0];


                    System.Data.DataTable salesOrderPaymentDetails = new System.Data.DataTable();

                    SqlParameter[] objParam = new SqlParameter[1];
                    objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
                    objParam[0].Direction = ParameterDirection.Input;
                    objParam[0].Value = dr["SalesOrderId"].ToString();

                    salesOrderPaymentDetails = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMaster", objParam);

                    // Create an anonymous object containing SalesQuotationMasterinfo and sales items
                    var invoiceData = new
                    {
                        SalesQuotationOrderMastertInfo = new
                        {
                            SalesInvoiceId = dr["SalesInvoiceId"].ToString(),
                            SalesOrderId = dr["SalesOrderId"].ToString(),
                            PaymentComplete = dr["PaymentComplete"].ToString(),
                             formattedsalesInvoiceDate = dr["formattedsalesInvoiceDate"].ToString(),
                            OutstandingAmount = dr["OutstandingAmount"].ToString(),
                            DeliveryCharges = dr["DeliveyCharges"].ToString(),
                            TotalAmount = dr["TotalAmount"].ToString(),
                            CustomerId = dr["CustomerId"].ToString(),
                            CustomerName = dr["CustomerName"].ToString(),
                            Mobile = dr["Mobile"].ToString(),
                            Advance = dr["Advance"].ToString(),
                            Description = dr["Description"].ToString(),

                        },
                        SalesOrderInvoiceItems = dtSalesOrderDetailsList.AsEnumerable().ToList(),
                        SalesOrderPaymentDetails = salesOrderPaymentDetails.AsEnumerable().ToList()

                    };
                    return JsonConvert.SerializeObject(invoiceData);
                }
            }
            catch (Exception ex)
            {
                return "";
            }

            return "";
        }


        [WebMethod]
        public static string GetPdfContent(string SalesInvoiceId)
        {

            // Generate PDF content (replace this with your actual PDF generation logic)
            byte[] pdfBytes = GeneratePdfBytes(SalesInvoiceId);

            // Convert PDF content to base64 string
            string base64String = Convert.ToBase64String(pdfBytes);

            return base64String;
        }

        private static byte[] GeneratePdfBytes(string SalesInvoiceId)
        {
            // Example: Generate a simple PDF using iTextSharp library
            using (MemoryStream ms = new MemoryStream())
            {
                iTextSharp.text.Document document = new iTextSharp.text.Document();
                iTextSharp.text.pdf.PdfWriter.GetInstance(document, ms);
                document.Open();
                //document.Add(new iTextSharp.text.Paragraph("Hello, World!"));
                AddInvoiceContent(document, SalesInvoiceId);
                document.Close();
                return ms.ToArray();
            }
        }

        private static void AddInvoiceContent(Document document, string SalesInvoiceId)
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

            PdfPCell QuotationHeadingCell = new PdfPCell(new Phrase("Sales Order Invoice", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 14)));
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
            System.Data.    DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");


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


                    //logo.ScaleToFit(100, 100); // Adjust the width and height as needed
                    //companyLogoCell.AddElement(logo);




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
            System.Data.DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, Street1, Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId =
(SELECT CustomerId FROM tblSalesInvoiceMaster WHERE SalesInvoiceId = '" + SalesInvoiceId + "')");
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
                System.Data.DataTable dtQuotationDetails = objMain.dtFetchData(@"select SM.SalesInvoiceId,FORMAT(SM.SalesInvoiceDate, 'dd/MM/yyyy') as SalesInvoiceDate,(isnull(SM.TotalAmount,0)-isnull(SM.Deliveycharges,0)) as NetTotal,
(Select cast (Sum(isnull(SP.Qty*MM.MRP*(SP.Tax/100),0))as decimal(16,2)) from tblSalesInvoiceDetail SP 
inner join tblSalesInvoiceMaster on tblSalesInvoiceMaster.SalesInvoiceId=SP.SalesInvoiceId
inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialId
where SP.SalesInvoiceId=SM.SalesInvoiceId
)NetGST
,SM.TotalAmount as NetAmount,
isnull(SM.Deliveycharges,0) as ShippingCharges,tblSdSalesOrder.TermCondition as TermsAndConditions ,isnull(tblSdSalesOrder.Description,'') as Notes,cust.CustomerId,
isnull(cust.CustomerName,'')as CustomerName,isnull(CustCon.Mobile,'')as Mobile,isnull(CustCon.Email,'')as Email ,isnull(CustCon.Street1,'')+' '+isnull(CustCon.City,'')+' '+isnull(CustCon.State,'')+' '+
isnull(CustCon.Zip,'')+' '+isnull(CustCon.Country,'') as Address from tblSalesInvoiceMaster SM  
inner join tblCrmCustomers cust on SM.CustomerId=cust.CustomerId  
inner join tblCrmCustomerContacts CustCon on CustCon.ContactId=cust.ContactId 
inner join tblSdSalesOrder on tblSdSalesOrder.SalesOrderId=SM.SalesOrderId
where SM.SalesInvoiceId='" + SalesInvoiceId + "'");
                // Quotation details on the right
                PdfPCell quotationDetailsCell = new PdfPCell();
                quotationDetailsCell.AddElement(new Paragraph("SalesInvoice ID: " + SalesInvoiceId, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                quotationDetailsCell.AddElement(new Paragraph("SalesInvoice Date: " + Convert.ToString(dtQuotationDetails.Rows[0]["SalesInvoiceDate"]), FontFactory.GetFont(FontFactory.HELVETICA, 10)));
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
                System.Data.DataTable dtSalesQuotationDetail = objMain.dtFetchData(@" select SM.SalesOrderId,SD.MaterialId as ItemId,material.materialName,SD.Qty,SD.UnitPrice as Rate,SD.DiscountPercent Discount,
SD.Tax GST,SD.SubTotal Amount,SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent,material.MRP as ActualRate
from   tblSalesInvoiceMaster SM  inner join tblSalesInvoiceDetail SD on SM.SalesInvoiceId=SD.SalesInvoiceId 
inner join tblMmMaterialMaster material on material.Id=SD.MaterialId where SM.SalesInvoiceId='" + SalesInvoiceId + "'");
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

        [WebMethod]
        [SecuritySafeCritical]
        public static Payment DownloadFile(string salesOrederId = "")
        {
          
            System.Data.DataTable dt = new System.Data.DataTable();

            dt = objMain.dtFetchData(@"
                select so.SalesInvoiceId as [Sales Invoice Id],
                so.SalesOrderId as [Sales Order Id],c.CustomerName as [Customer],convert(varchar(10), cast(SalesInvoiceDate as date), 101) as [Invoice Date] ,ManualOrderId as [Manual Order Id],so.Deliveycharges,so.TotalAmount as [Total Amount],
                so.OutstandingAmount as [Out Standing Amount], so.Advance, so.PaymentComplete
                from tblSalesInvoiceMaster so  left join tblCrmCustomers c on c.CustomerId=so.CustomerId   
                inner join tblSdSalesOrder on tblSdSalesOrder.SalesOrderId=so.SalesOrderId
                order by so.id desc");


            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dt, "SalesOrderInvoice");
                using (MemoryStream stream = new MemoryStream())
                {
                    string fileName = "SalesOrderInvoice_List" + "_" + DateTime.Today.ToString("yyyy/MM/dd") + ".xlsx";
                    string tempPath = HttpContext.Current.Server.MapPath("/") + fileName;

                    wb.SaveAs(tempPath);

                    byte[] bytes = File.ReadAllBytes(tempPath);

                    if (File.Exists(tempPath))
                        File.Delete(tempPath);
                    Payment payment = new Payment();
                    payment.FileString = Convert.ToBase64String(bytes, 0, bytes.Length);
                    payment.FileName = fileName;

                    return payment;
                }
            }
        }
    }
}