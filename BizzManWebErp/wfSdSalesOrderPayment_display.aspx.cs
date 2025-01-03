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
using DocumentFormat.OpenXml.Office2010.Excel;

namespace BizzManWebErp
{
    public partial class wfSdSalesOrderPayment_display : System.Web.UI.Page
    {
        static clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();
                    if (Session["objMain_Session"] != null)
                    {
                        objMain = (clsMain)Session["objMain_Session"];
                    }
                    else
                    {
                        Response.Redirect("wfAdminLogin.aspx");
                    }
                }
                else
                { 
                    Response.Redirect("wfAdminLogin.aspx");
                }
            }
            catch (Exception)
            {
                Response.Redirect("wfAdminLogin.aspx");
            }
        }


        [WebMethod]
        [SecuritySafeCritical]
        public static string GetPaymentDetailsData(string paymentId="")
        {
            string SalesOrderId = objMain.strFetchDate(@"SELECT TOP 1 SalesOrderId FROM tblSdSalesOrderPaymentDetail  WHERE Id='"+ paymentId.Split(' ')[0] + "'");
            // Fetch company details
            DataTable dtCompanyDetails = objMain.dtFetchData("select TOP 1 CompanyName,Address1+' '+Address2 as Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");

            // Fetch client details
            DataTable dtClientDetails = objMain.dtFetchData(@"SELECT CustomerName as ContactName, 
tblCrmCustomerContacts.Street1+' '+tblCrmCustomerContacts.Street2+' '+tblCrmCustomerContacts.City+' '+tblCrmCustomerContacts.State+' '+tblCrmCustomerContacts.Zip as Address,
ISNULL(tblCrmCustomerContacts.Mobile,'') AS Mobile, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId WHERE tblCrmCustomers.CustomerId =
(SELECT CustomerId FROM tblSdSalesOrder WHERE SalesOrderId = '" + SalesOrderId + "')");

            // Fetch Payment entry details
            SqlParameter[] objParams = new SqlParameter[1];

            objParams[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
            objParams[0].Direction = ParameterDirection.Input;
            objParams[0].Value = paymentId.Split(' ')[0];

            DataTable dtPaymentDetails = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMasterById", objParams);

            // Fetch SalesPayment details

            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = SalesOrderId;

            DataTable dtSalesOrderAllPayment = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMaster", objParam);


            // Serialize DataTable to JSON
            var quotationData = new
            {
                CompanyDetails = dtCompanyDetails,
                ClientDetails = dtClientDetails,
                PaymentDetails = dtPaymentDetails,
                SalesOrderAllPayDetails = dtSalesOrderAllPayment,
            };

            return JsonConvert.SerializeObject(quotationData);
        }
    }
}