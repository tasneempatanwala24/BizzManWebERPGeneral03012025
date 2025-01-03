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
    public partial class wfSdSalesOrderInvoice_display : System.Web.UI.Page
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
        [SecuritySafeCritical]
        public static string GetQuotationData(string SalesInvoiceId)
        {
            // Fetch company details
            DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1+' '+Address2 as Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");

            // Fetch client details
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, 
tblCrmCustomerContacts.Street1+' '+tblCrmCustomerContacts.Street2+' '+tblCrmCustomerContacts.City+' '+tblCrmCustomerContacts.State+' '+tblCrmCustomerContacts.Zip as Address,
Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId =
(SELECT CustomerId FROM tblSalesInvoiceMaster WHERE SalesInvoiceId = '" + SalesInvoiceId + "')");

            // Fetch quotation details
            DataTable dtQuotationDetails = objMain.dtFetchData(@"select  SM.SalesOrderID,  SM.SalesInvoiceId,FORMAT(SM.SalesInvoiceDate, 'dd/MM/yyyy') as SalesInvoiceDate,(isnull(SM.TotalAmount,0)) as NetTotal,
(Select cast (Sum(isnull(SP.Qty*MM.MRP*(SP.Tax/100),0))as decimal(16,2)) from tblSalesInvoiceDetail SP 
inner join tblSalesInvoiceMaster   on tblSalesInvoiceMaster.SalesInvoiceId=SP.SalesInvoiceId
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

            // Fetch sales quotation detail
            DataTable dtSalesQuotationDetail = objMain.dtFetchData(@" select SD.*, SM.SalesOrderId,SD.MaterialId as ItemId,material.materialName,SD.Qty,SD.UnitPrice as Rate,SD.DiscountPercent Discount,
SD.Tax GST,SD.SubTotal Amount,SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent,material.MRP as ActualRate
from   tblSalesInvoiceMaster SM  inner join tblSalesInvoiceDetail SD on SM.SalesInvoiceId=SD.SalesInvoiceId 
inner join tblMmMaterialMaster material on material.Id=SD.MaterialId where SM.SalesInvoiceId='" + SalesInvoiceId + "'");

            DataTable dtAmountDetails = objMain.dtFetchData(@"                 
                    SELECT so.OutstandingAmount,
                    ISNULL((SELECT SUM(ISNULL(PaymentAmount,0)) FROM tblSdSalesOrderPaymentDetail WHERE SalesOrderId=so.SalesOrderId GROUP BY SalesOrderId),0.000) AS TotalPaid    
                    FROM   tblSdSalesOrder so                  
                    LEFT JOIN tblSdSalesOrderPaymentDetail  sop on so.SalesOrderId=sop.SalesOrderId      
                    WHERE so.SalesOrderId='" + dtQuotationDetails.Rows[0]["SalesOrderId"].ToString() + "'");

            //delivery charges to be removed from evey where

            // Serialize DataTable to JSON
            var quotationData = new
            {
                CompanyDetails = dtCompanyDetails,
                ClientDetails = dtClientDetails,
                QuotationDetails = dtQuotationDetails,
                SalesQuotationDetail = dtSalesQuotationDetail,
                NetAmountInWord = objMain.strAmountToWord(dtQuotationDetails?.Rows[0]["NetAmount"].ToString()),
                AmountDetails = dtAmountDetails,
            };

            return JsonConvert.SerializeObject(quotationData);
        }
    }
}