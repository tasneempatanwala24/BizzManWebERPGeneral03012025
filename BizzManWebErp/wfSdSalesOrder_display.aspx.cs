//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Globalization;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Web;
//using System.Web.Services;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using BizzManWebErp.Model;
//using ClosedXML.Excel;
//using DocumentFormat.OpenXml.ExtendedProperties;
//using Newtonsoft.Json;
//using iTextSharp;
//using iTextSharp.text;
//using iTextSharp.text.pdf;
//using System.Threading.Tasks;
//using DocumentFormat.OpenXml.Vml;
//using System.Security;
//using DocumentFormat.OpenXml.Office.CoverPageProps;

using BizzManWebErp.Model;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Web;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfSdSalesOrder_display : System.Web.UI.Page
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
        //[SecuritySafeCritical]
        public static string GetQuotationData(string SalesOrderId)
        {
            objMain = (clsMain)HttpContext.Current.Session["objMain_Session"];
            // Fetch company details
            DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1+' '+Address2 as Address1,PhoneNo,EmailAddress," +
                "WebSiteAddress,Cast(Logo as varchar(max)) as Logo from tblAdminCompanyMaster c inner join tblSdSalesOrder s " +
                " on c.Id=s.CompanyMasterId where s.SalesOrderId='" + SalesOrderId + "'");

            // Fetch client details
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, 
tblCrmCustomerContacts.Street1+' '+tblCrmCustomerContacts.Street2+' '+tblCrmCustomerContacts.City+' '+tblCrmCustomerContacts.State+' '+tblCrmCustomerContacts.Zip as Address,
Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId =
(SELECT CustomerId FROM tblSdSalesOrder WHERE SalesOrderId = '" + SalesOrderId + "')");

            // Fetch quotation details
            DataTable dtQuotationDetails = objMain.dtFetchData(@"select SM.SalesOrderId,FORMAT(SM.OrderDate, 'dd/MM/yyyy') as OrderDate,isnull(SM.NetAmount,0) as NetAmount,isnull(SM.TotalAmount,0) as TotalAmount,
            isnull(SM.Deliveycharges,0) as Deliveycharges,isnull(SM.ShippingCharges,0) as ShippingCharges,
            SM.TermCondition as TermsAndConditions ,isnull(SM.Description,'') as Notes,cust.CustomerId,
            isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile,isnull(Email,'')as Email ,isnull(Street1,'')+' '+isnull(City,'')+' '+isnull(State,'')+' '+
            isnull(Zip,'')+' '+isnull(Country,'') as Address,
            (Select cast (Sum(isnull(SP.Qty*MM.MRP*(SP.Tax/100),0))as decimal(16,2)) from tblSdSalesOrderProductDetails SP 
            inner join tblSdSalesOrder on tblSdSalesOrder.SalesOrderId=SP.SalesOrderId
            inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialId
            where SP.SalesOrderId=SM.SalesOrderId
            )NetGST
            from tblSdSalesOrder SM  inner join tblCrmCustomers cust on SM.CustomerId=cust.CustomerId  
            inner join tblCrmCustomerContacts CustCon on CustCon.ContactId=cust.ContactId where SM.SalesOrderId='" + SalesOrderId + "'");

            // Fetch sales quotation detail
            DataTable dtSalesQuotationDetail = objMain.dtFetchData(@"select SM.SalesOrderId,SD.MaterialId as ItemId,
            material.materialName,SD.Qty,SD.UnitPrice as Rate,SD.DiscountPercent Discount,SD.Tax GST,SD.SubTotal Amount,
            material.CentralTaxPercent,material.StateTaxPercent,material.CessPercent,material.MRP as ActualRate,SD.TaxValue
            ,SD.CentralTaxValue,SD.StateTaxValue,SD.CessValue,CASE WHEN material.GstIncludeRate='y' THEN 'Include' ELSE 'Extra' END AS GstIncludeRate,
            material.GstIncludeRate as IsIncRate
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
               NetAmountInWord= NumberToWords.GetAmountInWords(dtQuotationDetails?.Rows[0]["NetAmount"].ToString()),
                //NetAmountInWord= objMain.strAmountToWord(dtQuotationDetails?.Rows[0]["NetAmount"].ToString()),
                AmountDetails = dtAmountDetails,
            };

            return JsonConvert.SerializeObject(quotationData);
        }
    }
}