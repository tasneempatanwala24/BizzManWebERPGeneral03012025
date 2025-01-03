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
    public partial class wfSdSalesOrder_display : System.Web.UI.Page
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
        public static string GetQuotationData(string SalesOrderId)
        {
            objMain= objMain = (clsMain)HttpContext.Current.Session["objMain_Session"];
            // Fetch company details
            DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1+' '+Address2 as Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");

            // Fetch client details
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, 
tblCrmCustomerContacts.Street1+' '+tblCrmCustomerContacts.Street2+' '+tblCrmCustomerContacts.City+' '+tblCrmCustomerContacts.State+' '+tblCrmCustomerContacts.Zip as Address,
Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId =
(SELECT CustomerId FROM tblSdSalesOrder WHERE SalesOrderId = '" + SalesOrderId + "')");

            // Fetch quotation details
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

            // Fetch sales quotation detail
            DataTable dtSalesQuotationDetail = objMain.dtFetchData(@" select SM.SalesOrderId,SD.MaterialId as ItemId,material.materialName,SD.Qty,SD.UnitPrice as Rate,SD.DiscountPercent Discount,SD.Tax GST,SD.SubTotal Amount,
 SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent,material.MRP as ActualRate,SD.TaxValue
,SD.CentralTaxValue
,SD.StateTaxValue
,SD.CessValue
from   tblSdSalesOrder SM  inner join tblSdSalesOrderProductDetails SD on SM.SalesOrderId=SD.SalesOrderId 
inner join tblMmMaterialMaster material on material.Id=SD.MaterialId where SM.SalesOrderId='" + SalesOrderId + "'");

            DataTable dtAmountDetails = objMain.dtFetchData(@"                 
                    SELECT so.OutstandingAmount,
                    ISNULL((SELECT SUM(ISNULL(PaymentAmount,0)) FROM tblSdSalesOrderPaymentDetail WHERE SalesOrderId=so.SalesOrderId GROUP BY SalesOrderId),0.000) AS TotalPaid    
                    FROM   tblSdSalesOrder so                  
                    LEFT JOIN tblSdSalesOrderPaymentDetail  sop on so.SalesOrderId=sop.SalesOrderId      
                    WHERE so.SalesOrderId='" + SalesOrderId + "'");
            // Serialize DataTable to JSON
            var quotationData = new
            {
                CompanyDetails = dtCompanyDetails,
                ClientDetails = dtClientDetails,
                QuotationDetails = dtQuotationDetails,
                SalesQuotationDetail = dtSalesQuotationDetail,
               // NetAmountInWord= NumberToWords.GetAmountInWords(dtQuotationDetails?.Rows[0]["NetAmount"].ToString())
                NetAmountInWord= objMain.strAmountToWord(dtQuotationDetails?.Rows[0]["NetAmount"].ToString()),
                AmountDetails = dtAmountDetails,
            };

            return JsonConvert.SerializeObject(quotationData);
        }
    }
}