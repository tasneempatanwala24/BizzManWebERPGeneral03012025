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
using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfMmMaterialPurchaseOrderDirectEntry : System.Web.UI.Page
    {
        //added on 12 Dec 2023
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
            else
            {
                Response.Redirect("wfAdminLogin.aspx");
            }
        }

        //===============================
        //=========================
        //===============================

        [WebMethod]
        public static string DepartmentMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData("select [Id],[DeptName] FROM [tblHrDeptMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDepartmentList);
        }

        //=================================
        //================================
        //===============================

        [WebMethod]
        public static string BranchMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select [BranchCode],[BranchName] FROM [tblHrBranchMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        //==============================
        //=============================

        [WebMethod]
        public static string VendorList()
        {
            //   clsMain objMain = new clsMain();
            DataTable dtVendorList = new DataTable();

            try
            {

                dtVendorList = objMain.dtFetchData("select Id,VendorName FROM tblMmVendorMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtVendorList);
        }

        [WebMethod]
        public static string FetchMaterialPurchaseOrderList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseOrderList = new DataTable();

            try
            {

                dtMaterialPurchaseOrderList = objMain.dtFetchData(@"select po.Id,v.VendorName,CONVERT(nvarchar,po.OrderEntryDate,106) as OrderEntryDate,
                                              CONVERT(nvarchar,po.OrderDeadlineDate,106) as OrderDeadlineDate,CONVERT(nvarchar,po.ReceiptDate,106) as ReceiptDate,
                                              b.BranchName,d.DeptName,po.PaymentTerm,po.PurchaseAgreement,po.QuotationNo
                                              from tblMmMaterialPurchaseOrderEntryMaster po
                                              left join tblMmVendorMaster v on po.VendoreId=v.Id
                                             left join tblHrBranchMaster b on b.BranchCode=po.BranchCode 
                                             left join tblHrDeptMaster d on d.Id=po.DepartmentId
                                             ");
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
            return JsonConvert.SerializeObject(dtMaterialPurchaseOrderList, settings);
        }


      



        [WebMethod]
        public static string DeleteMaterialPurchaseOrder(string id = "")
        {

            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[1];


            objParam[0] = new SqlParameter("@id", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = id;


            var result = objMain.ExecuteProcedure("procMaterialPurchaseOrderEntryDelete", objParam);


            return "";
        }




        [WebMethod]
        public static string FetchMaterialPurchaseOrderDetails(string id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseOrderList = new DataTable();

        

            try
            {

                dtMaterialPurchaseOrderList = objMain.dtFetchData(@"select * from tblMmMaterialPurchaseOrderEntryMaster where Id='" + id + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialPurchaseOrderList);
        }


        [WebMethod]
        public static string FetchMaterialPurchaseOrderDetailsList(string id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderDetailsList = new DataTable();

            try
            {

                dtSalesOrderDetailsList = objMain.dtFetchData(@"select o.*,m.MaterialName,m.UnitMesure,
(select isnull(Sum(QtyBalance),0) from tblMmMaterialStockMaster
inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId
inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode
where tblFaWarehouseMaster.BranchCode=SO.BranchCode and MaterialMasterId=o.MaterialMasterId) as Stock
                                                          from tblMmMaterialPurchaseOrderEntryDetail o
														  inner join tblMmMaterialPurchaseOrderEntryMaster SO on SO.Id=o.PurchaseOrderMasterId
                                                          left join tblMmMaterialMaster m on m.Id=o.MaterialMasterId
                                                          where o.PurchaseOrderMasterId='" + id + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderDetailsList);
        }


        [WebMethod]
        public static string FetchMaterialPurchaseOrderListDownload(string orderid = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialPurchaseOrderList = new DataTable();

            try
            {

                dtMaterialPurchaseOrderList = objMain.dtFetchData(@"select po.Id,v.VendorName,CONVERT(nvarchar,po.OrderEntryDate,106) as OrderEntryDate,
                                              CONVERT(nvarchar,po.OrderDeadlineDate,106) as OrderDeadlineDate,CONVERT(nvarchar,po.ReceiptDate,106) as ReceiptDate,
                                              b.BranchName,d.DeptName,po.PaymentTerm,po.PurchaseAgreement,po.QuotationNo
                                              from tblMmMaterialPurchaseOrderEntryMaster po
                                              join tblMmVendorMaster v on po.VendoreId=v.Id
                                              join tblHrBranchMaster b on b.BranchCode=po.BranchCode 
                                              join tblHrDeptMaster d on d.Id=po.DepartmentId
                                              where po.Active='Y'" + (orderid != "" ? " and po.Id in(SELECT Item FROM [dbo].[SplitString] ('" + orderid + "',','))" : ""));
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialPurchaseOrderList.TableName = "MaterialPurchaseOrderList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtMaterialPurchaseOrderList);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    //Return xlsx Excel File  
                    byte[] bytes = stream.ToArray();

                    //Convert File to Base64 string and send to Client.
                    return Convert.ToBase64String(bytes, 0, bytes.Length);
                }
            }

            ////var settings = new JsonSerializerSettings
            ////{
            ////    Formatting = Formatting.Indented,
            ////    NullValueHandling = NullValueHandling.Ignore,
            ////    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ////    PreserveReferencesHandling = PreserveReferencesHandling.Arrays

            ////};
            ////return JsonConvert.SerializeObject(dtMaterialPurchaseOrderList, settings);
        }



        [WebMethod]
        public static string FetchMaterialDetails(string MaterialId, string BranchCode)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialDetails = new DataTable();

            try
            {

                dtMaterialDetails = objMain.dtFetchData(@"select MM.Id,MaterialName,UnitMesure,isnull(PGD.UnitPrice,0)MRP,isnull(IntegratedTaxPercent,0) as IntegratedTaxPercent,(select isnull(Sum(QtyBalance),0) 
                from tblMmMaterialStockMaster inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId 
                inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode 
                where tblFaWarehouseMaster.BranchCode='"+BranchCode+ "' and MaterialMasterId=MM.Id) as Stock,isnull(CentralTaxPercent,0) as CentralTaxPercent, " +
                " isnull(StateTaxPercent,0) as StateTaxPercent from tblMmMaterialMaster MM  left join tblMmMaterialPurchaseGrnDetail PGD on PGD.MaterialMasterId=MM.Id " +
                "and PGD.ID in(select top 1 ID from tblMmMaterialPurchaseGrnDetail where MaterialMasterId=PGD.MaterialMasterId " +
                "order by CreateDate desc) where MM.Id=" + MaterialId + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialDetails);
        }


        [WebMethod]
        public static string GenerateOrderID(string OrderDate)
        {
            DataTable dtNewQuotationID = new DataTable();

            try
            {
                //string formattedOrderDate = DateTime.ParseExact(OrderDate, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd");

                //dtNewQuotationID = objMain.dtFetchData("select 'PORD' + CONVERT(NVARCHAR(10), '" + formattedOrderDate + "', 120) + '/' +\r\n                             RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(Id, LEN(Id) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4)\r\n as Id    FROM tblMmMaterialPurchaseOrderEntryMaster \r\n    WHERE OrderEntryDate ='" + formattedOrderDate + "'");
               
                dtNewQuotationID = objMain.dtFetchData("select 'PORD' + CONVERT(NVARCHAR(10), CAST ('" + OrderDate  +"' AS DATETIME), 111) + '/' " +
                    "+ RIGHT('0000' + CAST(ISNULL(MAX(SUBSTRING(Id, LEN(Id) - 3, 4)), 0) + 1 AS NVARCHAR(4)), 4) as Id" +
                    " FROM tblMmMaterialPurchaseOrderEntryMaster WHERE OrderEntryDate ='" + OrderDate + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtNewQuotationID);
        }


        [WebMethod]
        public static string MaterialMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where isnull(CanPurchase,0)=1");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }


        [WebMethod]
        public static string AddMaterialPurchaseOrder(List<PurchaseOrderDirectEntry> data,string OrderID = "", string EntryDate = "", string Vendor = "", string DeadlineDate = "",
                                                  string ReceiptDate = "",  string AskConfirm = "", string PaymentTerm = "",
                                                  string PurchaseAgreement = "", string QuotationNo = "", string BranchCode = "", 
                                                  string DepartmentId = "", string LoginUser = "")
        {
            StringBuilder strBuild = new StringBuilder();
            strBuild.Append("<XMLData>");
            strBuild.Append("<OrderID>" + OrderID + "</OrderID>");
            strBuild.Append("<Vendor>" + Vendor + "</Vendor>");
            strBuild.Append("<AskConfirm>" + AskConfirm + "</AskConfirm>");
            strBuild.Append("<EntryDate>" + DateTime.ParseExact(EntryDate, "yyyy-MM-dd", CultureInfo.InvariantCulture) + "</EntryDate>");
            strBuild.Append("<DeadlineDate>" + DateTime.ParseExact(DeadlineDate, "yyyy-MM-dd", CultureInfo.InvariantCulture) + "</DeadlineDate>");
            strBuild.Append("<ReceiptDate>" + DateTime.ParseExact(ReceiptDate, "yyyy-MM-dd", CultureInfo.InvariantCulture) + "</ReceiptDate>");
            strBuild.Append("<AskConfirm>" + AskConfirm + "</AskConfirm>");
           strBuild.Append("<PurchaseAgreement>" + PurchaseAgreement + "</PurchaseAgreement>");
            strBuild.Append("<QuotationNo>" + QuotationNo + "</QuotationNo>");
            strBuild.Append("<PaymentTerm>" + PaymentTerm + "</PaymentTerm>");
            strBuild.Append("<BranchCode>" + BranchCode + "</BranchCode>");
            strBuild.Append("<DepartmentId>" + DepartmentId + "</DepartmentId>");
           strBuild.Append("<CreateUser>" + LoginUser + "</CreateUser>");
           

            strBuild.Append("<SalesQuotationDetails>");
            if (data.Count > 0)
            {
                foreach (var item in data)
                {
                    strBuild.Append("<SalesQuotationDetail>");
                    strBuild.Append("<ItemId>" + Convert.ToInt32(item.ItemID) + "</ItemId>");
                    strBuild.Append("<Qty>" + item.Quantity + "</Qty>");
                    strBuild.Append("<Rate>" + item.Rate + "</Rate>");
                    strBuild.Append("<TaxableAmt>" + item.TaxableAmt + "</TaxableAmt>");
                    strBuild.Append("<CentralTaxPercent>" + item.CentralTaxPercent + "</CentralTaxPercent>");
                    strBuild.Append("<StateTaxPercent>" + item.StateTaxPercent + "</StateTaxPercent>");
                    strBuild.Append("<IntegratedTaxPercent>" + item.IntegratedTaxPercent + "</IntegratedTaxPercent>");
                    strBuild.Append("<Freight>" + item.Freight + "</Freight>");
                    strBuild.Append("<Loading>" + item.Loading + "</Loading>");
                    strBuild.Append("<Rnd>" + item.Rnd + "</Rnd>");
                    strBuild.Append("<Amount>" + item.Amount + "</Amount>");
                    //strBuild.Append("<Description>" + item.Description + "</Description>");
                    
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

            var result = objMain.ExecuteProcedure("procMmMaterialPurchaseOrderDirectEntry", objParam);
            string json = JsonConvert.SerializeObject(result, Formatting.None);
            return json;
            
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

        private static void AddInvoiceContent(Document document, string Id)
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

            PdfPCell QuotationHeadingCell = new PdfPCell(new Phrase("Direct Purchase Order", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 14)));
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
            DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,Convert(varchar(max),Logo) as Logo from tblAdminCompanyMaster");


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
                //if (dtCompanyDetails.Rows[0]["Logo"] != System.DBNull.Value)
                //{
                //    //byte[] imageData = (byte[])dtCompanyDetails.Rows[0]["Logo"];


                //    // Replace "path/to/your/logo.png" with the actual path to your logo image
                //    //iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(filePath);

                //    // Attempt to create an iTextSharp Image instance from the byte array
                //    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(imageData);


                //    logo.ScaleToFit(100, 100); // Adjust the width and height as needed
                //    companyLogoCell.AddElement(logo);




                //}
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
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT VendorName as ContactName, VendorAddress Street1, PhoneNo as Phone,EmailAddress Email from tblMmVendorMaster  WHERE Id =
(SELECT VendoreId FROM tblMmMaterialPurchaseOrderEntryMaster WHERE Id = '" + Id + "')");
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
                DataTable dtQuotationDetails = objMain.dtFetchData(@"select SM.Id,FORMAT(OrderEntryDate, 'dd/MM/yyyy') as OrderDate,PaymentTerm as TermsAndConditions ,isnull(PurchaseAgreement,'') as Notes
	   ,(Select cast (Sum(isnull(QtyOrder*SP.UnitPrice*(MM.IntegratedTaxPercent/100),0))as decimal(16,2)) from tblMmMaterialPurchaseOrderEntryDetail SP 
inner join tblMmMaterialPurchaseOrderEntryMaster on tblMmMaterialPurchaseOrderEntryMaster.Id=SP.PurchaseOrderMasterId
inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialMasterId
where SP.PurchaseOrderMasterId=SM.Id
)NetGST,(Select cast (Sum(isnull(QtyOrder*SP.UnitPrice,0))as decimal(16,2)) from tblMmMaterialPurchaseOrderEntryDetail SP 
inner join tblMmMaterialPurchaseOrderEntryMaster on tblMmMaterialPurchaseOrderEntryMaster.Id=SP.PurchaseOrderMasterId
inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialMasterId
where SP.PurchaseOrderMasterId=SM.Id
)NetTotal
from tblMmMaterialPurchaseOrderEntryMaster SM   
 where SM.Id='" + Id + "'");
                // Quotation details on the right
                PdfPCell quotationDetailsCell = new PdfPCell();
                quotationDetailsCell.AddElement(new Paragraph("PurchaseOrder ID: " + Id, FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                quotationDetailsCell.AddElement(new Paragraph("Order Entry Date: " + Convert.ToString(dtQuotationDetails.Rows[0]["OrderDate"]), FontFactory.GetFont(FontFactory.HELVETICA, 10)));
                quotationDetailsCell.BorderWidth = 0;
                quotationDetailsCell.Padding = 0;
                quotationDetailsCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                billToTable.AddCell(quotationDetailsCell);

                document.Add(new Paragraph("VENDOR", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)));
                document.Add(billToTable);

                // Add a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
                document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break


                // Add your invoice content here

                // Example: Adding a table
                PdfPTable itemTable = new PdfPTable(5);
                itemTable.WidthPercentage = 100;
                itemTable.SetWidths(new float[] { 2f, 1f, 1f, 1f, 1f });

                // Add table header
                itemTable.AddCell(new PdfPCell(new Phrase("Item", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Qty", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Rate", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                //itemTable.AddCell(new PdfPCell(new Phrase("Discount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("GST %", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                itemTable.AddCell(new PdfPCell(new Phrase("Amount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD))));
                DataTable dtSalesQuotationDetail = objMain.dtFetchData(@"select SM.Id,MaterialMasterId as ItemId,materialName,QtyOrder as Qty,UnitPrice as Rate, TotalAmt Amount,material.CentralTaxPercent,material.StateTaxPercent,material.CessPercent,material.MRP as ActualRate,material.IntegratedTaxPercent as GST
from   tblMmMaterialPurchaseOrderEntryMaster SM  inner join tblMmMaterialPurchaseOrderEntryDetail SD on SM.id=SD.PurchaseOrderMasterId 
inner join tblMmMaterialMaster material on material.Id=SD.MaterialMasterId where SM.id='" + Id + "'");
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
                        //itemTable.AddCell(row["Discount"].ToString());
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
                totalAmountCell.Colspan = 4;
                totalAmountCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(totalAmountCell);
                string amt = Convert.ToString(dtQuotationDetails.Rows[0]["NetTotal"]);
                itemTable.AddCell(amt);


                PdfPCell CentralTaxValueCell = new PdfPCell(new Phrase("Central Tax Value", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                CentralTaxValueCell.Colspan = 4;
                CentralTaxValueCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(CentralTaxValueCell);
                itemTable.AddCell(centralTaxValue.ToString("0.00"));

                PdfPCell StateTaxValueCell = new PdfPCell(new Phrase("State Tax Value", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                StateTaxValueCell.Colspan = 4;
                StateTaxValueCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(StateTaxValueCell);
                itemTable.AddCell(stateTaxValue.ToString("0.00"));

                PdfPCell CessTaxValueCell = new PdfPCell(new Phrase("Cess Value", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                CessTaxValueCell.Colspan = 4;
                CessTaxValueCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(CessTaxValueCell);
                itemTable.AddCell(cessTaxValue.ToString("0.00"));


                string gst = Convert.ToString(dtQuotationDetails.Rows[0]["NetGST"]);
                PdfPCell netGSTCell = new PdfPCell(new Phrase("Net GST", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                netGSTCell.Colspan = 4;
                netGSTCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                itemTable.AddCell(netGSTCell);
                itemTable.AddCell(gst);

                //string ship = Convert.ToString(dtQuotationDetails.Rows[0]["ShippingCharges"]);
                //PdfPCell shippingChargesCell = new PdfPCell(new Phrase("Shipping Charges", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                //shippingChargesCell.Colspan = 5;
                //shippingChargesCell.HorizontalAlignment = Element.ALIGN_RIGHT;
                //itemTable.AddCell(shippingChargesCell);
                //itemTable.AddCell(ship)
        ;
                //string net = Convert.ToString(dtQuotationDetails.Rows[0]["NetAmount"]);
                string net = Convert.ToString(dtQuotationDetails.Rows[0]["NetTotal"]);
                PdfPCell netAmountCell = new PdfPCell(new Phrase("Net Amount", FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
                netAmountCell.Colspan = 4;
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

    }
}