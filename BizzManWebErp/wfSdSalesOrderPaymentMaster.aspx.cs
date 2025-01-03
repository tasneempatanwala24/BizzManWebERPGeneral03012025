
using BizzManWebErp.Model;
using DocumentFormat.OpenXml.Bibliography;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security;
using System.Globalization;
using ClosedXML.Excel;
using System.Configuration;

namespace BizzManWebErp
{
    public partial class wfSdSalesOrderPaymentMaster : System.Web.UI.Page
    {
        static clsMain objMain;
        static string userName = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                if (!IsPostBack)
                {
                    if (Session["Id"] != null)
                    {
                        if (Session["objMain_Session"] != null)
                        {
                            objMain = (clsMain)Session["objMain_Session"];
                            userName = Session["Id"].ToString();
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
            }
            catch (Exception)
            {
                Response.Redirect("wfAdminLogin.aspx");
            }
        }

        [WebMethod]
        public static string GetSalesOrder()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdCustomerSalesOrderDetails", null);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string GetPaymentMode()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdGetPaymentMode", null);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string GetSalesOrderPaymentDetailsById(string Id)
        {
            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Id;

            DataTable result = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMasterById", objParam);
            return JsonConvert.SerializeObject(result);
        }
        [WebMethod]
        public static string GetSalesOrderPaymentDetailsAll()
        {
            DataTable result = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMasterAll", null);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string GetSalesOrderDetails(string salesOrderNo)
        {
            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = salesOrderNo;

            DataTable result = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentMaster", objParam);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string UpdateSalerOrderPayment(Payment payment)
        {

            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@SalersOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = payment.SalersOrderId;

            objParam[1] = new SqlParameter("@PaymentMode", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = payment.PaymentMode;


            objParam[2] = new SqlParameter("@PaymentDate", SqlDbType.DateTime);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = payment.PaymentDate;

            objParam[3] = new SqlParameter("@PaymountAmount", SqlDbType.Decimal);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = payment.PaymentAmount;

            objParam[4] = new SqlParameter("@CreatedBy", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = userName;


            objParam[5] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = payment.Description;

            objParam[6] = new SqlParameter("@AcNo", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = payment.AcNo;

            objParam[7] = new SqlParameter("@Id", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = payment.Id;




            DataTable result = objMain.ExecuteStoreProcedure("procSdUpdateSalesOrderPayment", objParam);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        public static string GeneratePaymentID(string paymentDate)
        {
            paymentDate = paymentDate.Replace("-", "/");
            DataTable dt = new DataTable();

            try
            {
                string formattedPaymentDate = DateTime.ParseExact(paymentDate, "yyyy/MM/dd", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd");

                dt = objMain.dtFetchData("select 'SOPAY' + CONVERT(NVARCHAR(10), '" + formattedPaymentDate + "', 120) + '/' +\r\n RIGHT('00000' + CAST(ISNULL(MAX(SUBSTRING(Id, LEN(Id) - 4, 5)), 0) + 1 AS NVARCHAR(4)), 5)\r\n as Id    FROM tblSdSalesOrderPaymentDetail\r\n    WHERE CAST(PaymentDate AS DATE) ='" + formattedPaymentDate + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public static string DeletePaymentEntry(string paymentId)
        {
            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = paymentId;

            DataTable result = objMain.ExecuteStoreProcedure("procSdDeleteSalesOrderPaymentEntry", objParam);
            return JsonConvert.SerializeObject(result);
        }

        [WebMethod]
        [SecuritySafeCritical]
        public static Payment DownloadFile(string salesOrederId="")
        {
            SqlParameter[] objParam = new SqlParameter[1];

            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = salesOrederId;

            DataTable dt = objMain.ExecuteStoreProcedure("procSdSalesOrderPaymentEntryListReport", objParam);
            string fileName = "PaymentList";
            if(!string.IsNullOrEmpty(salesOrederId))
                fileName = salesOrederId+ "_PaymentList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dt, "PaymentList");
                using (MemoryStream stream = new MemoryStream())
                {
                    fileName = fileName + "_" + DateTime.Today.ToString("yyyy/MM/dd")+ ".xlsx";
                    string tempPath = HttpContext.Current.Server.MapPath("/") + fileName;
                    
                    wb.SaveAs(tempPath);
                    
                    byte[] bytes = File.ReadAllBytes(tempPath);
                    
                    if (File.Exists(tempPath))
                        File.Delete(tempPath);
                    Payment payment = new Payment();
                    payment.FileString= Convert.ToBase64String(bytes, 0, bytes.Length);
                    payment.FileName = fileName; 

                    return payment;
                }
            }
        }
    }
}



