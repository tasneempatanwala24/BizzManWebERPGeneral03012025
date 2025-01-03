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
    public partial class wSdSalesQuotationMaster_display : System.Web.UI.Page
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
        public static string GetQuotationData(string QuotationId)
        {
            // Fetch company details
            DataTable dtCompanyDetails = objMain.dtFetchData("select CompanyName,Address1+' '+Address2 as Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");

            // Fetch client details
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, 
tblCrmCustomerContacts.Street1+' '+tblCrmCustomerContacts.Street2+' '+tblCrmCustomerContacts.City+' '+tblCrmCustomerContacts.State+' '+tblCrmCustomerContacts.Zip as Address,
Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId = (SELECT CustomerId FROM tblSdSalesQuotationMaster WHERE QuotationId = '" + QuotationId + "')");

            // Fetch quotation details
            DataTable dtQuotationDetails = objMain.dtFetchData(@"select QuotationId,FORMAT(QuotationDate, 'dd/MM/yyyy') as QuotationDate,QuotationStatus,NetTotal,NetGST,NetAmount,ShippingCharges,Notes,TermsAndConditions 
,cust.CustomerId,isnull(CustomerName,'')as CustomerName,isnull(Mobile,'')as Mobile,isnull(Email,'')as Email ,
isnull(Street1,'')+' '+isnull(City,'')+' '+isnull(State,'')+' '+isnull(Zip,'')+' '+isnull(Country,'') as Address from tblSdSalesQuotationMaster SM  
inner join tblCrmCustomers cust on SM.CustomerId=cust.CustomerId  inner join tblCrmCustomerContacts CustCon on CustCon.ContactId=cust.ContactId where SM.QuotationId='" + QuotationId + "'");

            // Fetch sales quotation detail
            DataTable dtSalesQuotationDetail = objMain.dtFetchData(@"select QuotationId,ItemId,materialName,Qty,Rate,SD.Discount,
GST,Amount,SD.CentralTaxPercent,SD.StateTaxPercent,SD.CessPercent,material.MRP as ActualRate from 
tblSdSalesQuotationMaster SM  inner join tblSdSalesQuotationDetail SD on SM.QuotationId=SD.QuotationMasterId 
inner join tblMmMaterialMaster material on material.Id=SD.ItemId where SM.QuotationId='" + QuotationId + "'");

            // Serialize DataTable to JSON
            var quotationData = new
            {
                CompanyDetails = dtCompanyDetails,
                ClientDetails = dtClientDetails,
                QuotationDetails = dtQuotationDetails,
                SalesQuotationDetail = dtSalesQuotationDetail,
                NetAmountInWord = objMain.strAmountToWord(dtQuotationDetails?.Rows[0]["NetAmount"].ToString()),
            };

            return JsonConvert.SerializeObject(quotationData);
        }

    }
}