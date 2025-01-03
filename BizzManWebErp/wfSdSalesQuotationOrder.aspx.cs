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
namespace BizzManWebErp
{
    public partial class wfSdSalesQuotationOrder : System.Web.UI.Page
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
        public static string GetQuotationList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtQuotationlist = new DataTable();

            try
            {

                dtQuotationlist = objMain.dtFetchData(@"select Quot.* ,isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile
from tblSdSalesQuotationMaster as Quot
INNER JOIN   tblCrmCustomers on tblCrmCustomers.CustomerId=Quot.CustomerId
inner join tblCrmCustomerContacts on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId
where QuotationStatus='Approve' and Quot.SalesOrderComplete != 'y'
");
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
            return JsonConvert.SerializeObject(dtQuotationlist, settings);

        }

        [WebMethod]
        public static string GetQuotationIdDetailsById(string QuotationId)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtQuotationDetails = new DataTable();
            DataTable dtSalesQuotationDetail = new DataTable();

            try
            {

                dtQuotationDetails = objMain.dtFetchData(@"select Quot.* ,isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile,convert(varchar(10), cast(QuotationDate as date), 101) as formattedQuotationDate
from tblSdSalesQuotationMaster as Quot
INNER JOIN   tblCrmCustomers on tblCrmCustomers.CustomerId=Quot.CustomerId
inner join tblCrmCustomerContacts on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId
where QuotationId='" + QuotationId + "'");

                dtSalesQuotationDetail = objMain.dtFetchData(@" select QuotationId,SD.Id as SalesQuotationDetailId,SD.ItemId,material.materialName,material.Id as MaterialId,material.UnitMesure as UnitMeasure,
 SD.Qty,SD.Rate,SD.Discount,SD.GST,SD.Amount,SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent,
material.MRP as ActualRate from tblSdSalesQuotationMaster SM 
inner join tblSdSalesQuotationDetail SD on SM.QuotationId=SD.QuotationMasterId inner join 
tblMmMaterialMaster material on material.Id=SD.ItemId where SM.QuotationId='" + QuotationId + "' and SD.SalesOrderGenerate='n'");

                if (dtQuotationDetails != null && dtQuotationDetails.Rows.Count > 0)
                {
                    DataRow dr = dtQuotationDetails.Rows[0];
                    // Create an anonymous object containing SalesQuotationMasterinfo and sales items
                    var invoiceData = new
                    {
                        SalesQuotationMastertInfo = new
                        {
                            QuotationId = dr["QuotationId"].ToString(),
                            formattedQuotationDate = dr["formattedQuotationDate"].ToString(),
                            //QuotationStatus = dr["QuotationStatus"].ToString(),
                            NetTotal = dr["NetTotal"].ToString(),
                            //NetGST = dr["NetGST"].ToString(),
                            NetAmount = dr["NetAmount"].ToString(),
                            DeliveryCharges = dr["ShippingCharges"].ToString() == "" ? "0" : dr["ShippingCharges"].ToString(),
                            //Notes = dr["Notes"].ToString(),
                            //TermsAndConditions = dr["TermsAndConditions"].ToString(),
                            CustomerId = dr["CustomerId"].ToString(),
                            CustomerName = dr["CustomerName"].ToString(),
                            Mobile = dr["Mobile"].ToString()
                            //Email = dr["Email"].ToString(),
                            //Address = dr["Address"].ToString()

                        },
                        SalesItems = dtSalesQuotationDetail.AsEnumerable().ToList()

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
        public static string GenerateOrderID(string OrderDate)
        {
            DataTable dtNewQuotationID = new DataTable();

            try
            {
                string formattedOrderDate = DateTime.ParseExact(OrderDate, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd");
                dtNewQuotationID = objMain.dtFetchData(@"select 'SORD' + CONVERT(NVARCHAR(10), '" + formattedOrderDate + "', 120)   +'/'+                       RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(SalesOrderId, LEN(SalesOrderId) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4) as SalesOrderId    FROM tblSdSalesOrder    WHERE OrderDate ='" + formattedOrderDate + "'");
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


        [WebMethod]
        public static string AddSalesOrder(List<SalesQuotationDetail> data, string SalesOrderId = "", string CustomerId = "", string ExpirationDate = "", string GSTTreatment = "", string QuotationDate = "", string Currency = "",
                                           string PaymentTerms = "", string TermsConditions = "", string TotalAmount = "", string OrderSource = "", string LoginUser = "",
                                           string BranchCode = "", string DepartmentID = "", string OrderDate = "", string QuotationId = "", string DeliveryCharges = "", string OutstandingAmount = "", string Advance = ""
                                          , string PaymentMode = "", string AcNo = "")
        {
            StringBuilder strBuild = new StringBuilder();
            strBuild.Append("<XMLData>");
            strBuild.Append("<SalesOrderId>" + SalesOrderId + "</SalesOrderId>");
            strBuild.Append("<QuotationId>" + QuotationId + "</QuotationId>");
            strBuild.Append("<CustomerId>" + CustomerId + "</CustomerId>");
            strBuild.Append("<ExpirationDate>" + DateTime.ParseExact(ExpirationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture) + "</ExpirationDate>");
            strBuild.Append("<OrderDate>" + DateTime.ParseExact(OrderDate, "yyyy-MM-dd", CultureInfo.InvariantCulture) + "</OrderDate>");
            strBuild.Append("<GSTTreatment>" + GSTTreatment + "</GSTTreatment>");
            strBuild.Append("<QuotationDate>" + QuotationDate + "</QuotationDate>");
            strBuild.Append("<Currency>" + Currency + "</Currency>");
            strBuild.Append("<TermsConditions>" + TermsConditions + "</TermsConditions>");
            strBuild.Append("<PaymentTerms>" + PaymentTerms + "</PaymentTerms>");
            strBuild.Append("<TotalAmount>" + TotalAmount + "</TotalAmount>");
            strBuild.Append("<OrderSource>" + OrderSource + "</OrderSource>");
            strBuild.Append("<CreateUser>" + LoginUser + "</CreateUser>");
            strBuild.Append("<BranchCode>" + BranchCode + "</BranchCode>");
            strBuild.Append("<DepartmentID>" + DepartmentID + "</DepartmentID>");
            strBuild.Append("<OutstandingAmount>" + OutstandingAmount + "</OutstandingAmount>");
            strBuild.Append("<Advance>" + Advance + "</Advance>");
            strBuild.Append("<DeliveryCharges>" + DeliveryCharges + "</DeliveryCharges>");
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
                    strBuild.Append("<SalesQuotationDetailId>" + item.SalesQuotationDetailId + "</SalesQuotationDetailId>");
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

            var result = objMain.ExecuteProcedure("procSdSalesQuotationOrder", objParam);


            return "";
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
                                                              order by so.id desc");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialBOMMasterList);
        }

        [WebMethod]
        [SecuritySafeCritical]
        public static Payment DownloadFile(string salesOrederId = "")
        {
            DataTable dt = new DataTable();

            dt = objMain.dtFetchData(@"select so.SalesOrderId as [Sales Order Id],so.ManualOrderId as [Manual Order Id],so.SalesOrderSource as [Order Source],c.CustomerName as [Customer]
                                 ,b.BranchName as [Branch] ,d.DeptName as [Department],so.GST_Treatment as [GST Treatment]
                                 ,CONVERT(nvarchar,so.ExpirationDate,104) as [Expiration Date],CONVERT(nvarchar,so.QuotationDate,104) as [Quotation Date],cm.Currency,
		                                                     so.PaymentTerms as [Payment Terms] ,sm.OrderStatus as [Order Status],		                                                   
                                                              so.DeliveyCharges as [Delivery Charges],so.OutstandingAmount as [Outstanding Amount],so.Advance,   so.TotalAmount as [Total Amount]
                                                      from tblSdSalesOrder so 
                                                      left join tblCrmCustomers c on c.CustomerId=so.CustomerId
                                                      left join tblMmCurrencyMaster cm on cm.Id=so.CurrencyId
                                                      left join tblSdSalesOrderStatusMaster sm on sm.id=so.OrderStatusId
                                                      left join tblHrBranchMaster b on b.BranchCode=so.BranchCode
                                                      left join tblHrDeptMaster d on d.Id=so.DepartmentID
                                                              order by so.id desc");


            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dt, "Quatation_SalesOrders");
                using (MemoryStream stream = new MemoryStream())
                {
                    string fileName = "QuatationsSalesOrder_List" + "_" + DateTime.Today.ToString("yyyy/MM/dd") + ".xlsx";
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

        [WebMethod]
        public static string FetchSalesOrderMasterDetails(string SalesOrderId)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderasterDetails = new DataTable();
            DataTable dtSalesOrderDetailsList = new DataTable();
            try
            {

                dtSalesOrderasterDetails = objMain.dtFetchData(@"select SO.*,CustomerName,Mobile,BranchName,DeptName,Currency,
convert(varchar(10), cast(SO.QuotationDate as date), 101) as formattedQuotationDate,
convert(varchar(10), cast(ExpirationDate as date), 101) as formattedExpirationDate,
convert(varchar(10), cast(OrderDate as date), 101) as formattedOrderDate
from tblSdSalesOrder SO
                    inner join tblCrmCustomers Cust on Cust.CustomerId=SO.CustomerId
                    inner join tblCrmCustomerContacts on Cust.ContactId=tblCrmCustomerContacts.ContactId
                    inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=SO.BranchCode
                    inner join tblHrDeptMaster on tblHrDeptMaster.Id=SO.DepartmentID
                    inner join tblMmCurrencyMaster on tblMmCurrencyMaster.Id=SO.CurrencyId
                    left join tblSdSalesQuotationMaster as Quot on Quot.QuotationId=SO.SalesQuotationMasterId
                    where SalesOrderId='" + SalesOrderId + "'");

                dtSalesOrderDetailsList = objMain.dtFetchData(@"select o.MaterialId,m.MaterialName,o.Qty,m.UnitMesure,p.Packaging,
                                                                  o.PackageId,o.UnitPrice,o.Tax,o.SubTotal,
o.CentralTaxPercent,o.StateTaxPercent,o.CessPercent
                                                                  from tblSdSalesOrderProductDetails o
                                                                  left join tblMmMaterialMaster m on m.Id=o.MaterialId
                                                                  left join tblMmMaterialPackagingDetails p on p.id=o.PackageId
                                                                  where o.SalesOrderId='" + SalesOrderId + "'");

                if (dtSalesOrderasterDetails != null && dtSalesOrderasterDetails.Rows.Count > 0)
                {
                    DataRow dr = dtSalesOrderasterDetails.Rows[0];
                    // Create an anonymous object containing SalesQuotationMasterinfo and sales items
                    var invoiceData = new
                    {
                        SalesQuotationOrderMastertInfo = new
                        {
                            QuotationId = dr["SalesQuotationMasterId"].ToString(),
                            SalesOrderId = dr["SalesOrderId"].ToString(),
                            GSTTreatment = dr["GST_Treatment"].ToString(),
                            PaymentTerms = dr["PaymentTerms"].ToString(),
                            TermCondition = dr["TermCondition"].ToString(),
                            formattedQuotationDate = dr["formattedQuotationDate"].ToString(),
                            formattedExpirationDate = dr["formattedExpirationDate"].ToString(),
                            formattedOrderDate = dr["formattedOrderDate"].ToString(),
                            BranchName = dr["BranchName"].ToString(),
                            DeptName = dr["DeptName"].ToString(),
                            Currency = dr["Currency"].ToString(),
                            TotalAmount = dr["TotalAmount"].ToString() == "" ? "0" : dr["TotalAmount"].ToString(),
                            CustomerId = dr["CustomerId"].ToString(),
                            CustomerName = dr["CustomerName"].ToString(),
                            Mobile = dr["Mobile"].ToString(),
                            DeliveryCharges = dr["Deliveycharges"].ToString() == "" ? "0" : dr["Deliveycharges"].ToString(),
                            OutstandingAmount = dr["OutstandingAmount"].ToString() == "" ? "0" : dr["OutstandingAmount"].ToString(),
                            Advance = dr["Advance"].ToString() == "" ? "0" : dr["Advance"].ToString()


                        },
                        SalesItems = dtSalesOrderDetailsList.AsEnumerable().ToList()

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
                    // iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(imageData);


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
                DataTable dtQuotationDetails = objMain.dtFetchData(@"select SM.SalesOrderId,FORMAT(SM.OrderDate, 'dd/MM/yyyy') as OrderDate,(isnull(SM.TotalAmount,0)-isnull(SM.Deliveycharges,0)) as NetTotal,
(Select cast (Sum(isnull(SP.Qty*MM.MRP*(SP.Tax/100),0))as decimal(16,2)) from tblSdSalesOrderProductDetails SP 
inner join tblSdSalesOrder on tblSdSalesOrder.SalesOrderId=SP.SalesOrderId
inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialId
where SP.SalesOrderId=SM.SalesOrderId
)NetGST
,SM.TotalAmount as NetAmount,
isnull(SM.Deliveycharges,0) as ShippingCharges,SM.TermCondition as TermsAndConditions ,isnull(SM.Description,'') as Notes,cust.CustomerId,
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

        [WebMethod]
        public static string GetPaymentMode()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdGetPaymentMode", null);
            return JsonConvert.SerializeObject(result);
        }
    }

}