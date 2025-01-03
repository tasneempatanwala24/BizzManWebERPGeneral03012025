using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
//using System.Text.Json;

namespace BizzManWebErp
{
    public partial class wfMnfJlrJobCardMaster : System.Web.UI.Page
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


        [WebMethod]
        public static string MaterialMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select Id,(Convert(VARCHAR(20),Id) + ': ' + MaterialName) AS MaterialName from tblMmMaterialMaster WHERE CanSale=1");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }
        [WebMethod]
        public static string DiamondCertificateList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select Id,DiamondCertificateName from tblMnfJlrJobCardDiamondCertificate");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }
       
        [WebMethod]
        public static string CustomerMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("SELECT c.CustomerId AS Id, CONCAT(CONVERT(VARCHAR(20), c.CustomerId), ': ', c.CustomerName, ': ', cc.Mobile) AS CustomerName FROM tblCrmCustomers c LEFT JOIN tblCrmCustomerContacts cc ON cc.ContactId = c.ContactId;");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }

        [WebMethod]
        public static string FetchJobCardById(string MasterId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();
            try
            {
                dtList = objMain.dtFetchData(@"SELECT MasterId,m.CustomerId,CustomerName, 
                CONVERT(nvarchar,OrderDate,23) as OrderDate,OrderNo,ReferenceOrderNo,
                CONVERT(nvarchar,OrderReceivedDate,23) as OrderReceivedDate,CONVERT(nvarchar,CadIssueDate,23) as CadIssueDate
                ,CONVERT(nvarchar,CadApproveDate,23) as CadApproveDate,CONVERT(nvarchar,CadApproveDate,23) as CadApproveDate,CONVERT(nvarchar,DiamondReceivedDate,23) as DiamondReceivedDate,
                CONVERT(nvarchar,DeliveryDate,23) as DeliveryDate,DiamondQuality,PartyDiamond,PartyDiamondReferenceNo,
                [Type],[Description],DiamondWeight1,DiamondPics1,DiamondQuality1,DiamondCertificate1,CertificateNo1,URL1,FinalUrl1
                ,DiamondWeight2,DiamondPics2,DiamondQuality2,DiamondCertificate2,CertificateNo2,URL2,FinalUrl2
                ,DiamondWeight3,DiamondPics3,DiamondQuality3,DiamondCertificate3,CertificateNo3,URL3,FinalUrl3
                ,DiamondWeight4,DiamondPics4,DiamondQuality4,DiamondCertificate4,CertificateNo4,URL4,FinalUrl4
                FROM tblMnfJlrJobCardMaster m INNER JOIN tblCrmCustomers c on m.CustomerId=c.CustomerId
                WHERE MasterId=" + MasterId);
            }
            catch (Exception ex)
            {
                // return "";
            }
            string json = JsonConvert.SerializeObject(dtList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchJobCardDetailsById(string MasterId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData(@"SELECT DetailId,MasterId,SlNo,DesignNo,CONVERT(VARBINARY(MAX),CustomerImage) as CustomerImage,CONVERT(VARBINARY(MAX),CadImage) as CadImage
                ,CONVERT(VARBINARY(MAX),FinishedFinalImage) as FinishedFinalImage,CONVERT(VARBINARY(MAX),AdditionalImage) as AdditionalImage,jd.ProductId,m.MaterialName,
                ApproxWeight,Polish,Pcs,Size,[Length],DiamondWeight,DiamondPices,Remark
                FROM tblMnfJlrJobCardDetail jd INNER JOIN tblMmMaterialMaster m on jd.ProductId=m.Id Where jd.MasterId=" + MasterId);
            }
            catch (Exception ex)
            {
                // return "";
            }
            string json = JsonConvert.SerializeObject(dtList, Formatting.None);
            return json;
        }
        [WebMethod]
        public static string FetchCertificateUrlById(string id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData(@"SELECT CertificateUrlLink  FROM tblMnfJlrJobCardDiamondCertificate Where Id=" + id);
            }
            catch (Exception ex)
            {
                // return "";
            }
            string json = JsonConvert.SerializeObject(dtList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData(@"SELECT MasterId,m.CustomerId,CustomerName, 
                CONVERT(nvarchar,OrderDate,101) as OrderDate,OrderNo,ReferenceOrderNo,
                CONVERT(nvarchar,OrderReceivedDate,101) as OrderReceivedDate,CONVERT(nvarchar,CadIssueDate,101) as CadIssueDate
                ,CONVERT(nvarchar,CadApproveDate,101) as CadApproveDate,CONVERT(nvarchar,CadApproveDate,101) as CadApproveDate,CONVERT(nvarchar,DiamondReceivedDate,101) as DiamondReceivedDate,
                CONVERT(nvarchar,DeliveryDate,101) as DeliveryDate,DiamondQuality,PartyDiamond,PartyDiamondReferenceNo,
                [Type],[Description]
                FROM tblMnfJlrJobCardMaster m INNER JOIN tblCrmCustomers c on m.CustomerId=c.CustomerId order by MasterId desc");
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
            return JsonConvert.SerializeObject(dtList, settings);
        }
                        
        [WebMethod]
        public static string AddJobMaster(string CustomerId, string OrderDate, string RefOrderNo, List<JobDetail> Job_details, string OrderNo = "",
                                  string LoginUser = "", string OrderRecvDate = "", string CadIssueDate = "", string CadApproveDate = "",
                                  string DiamondReceivedDate = "", string DeliveryDate = "", string DiamondQuality = "",
                                  string PartyDiamond = "", string PartyDiamondReferenceNo = "", string Type = "", string Description = "",
                                  string DiamondWeight1 = "", string DiamondPics1 = "", string DiamondQuality1 = "", string DiamondCertificate1 = "",
                                  string CertificateNo1 = "", string URL1 = "", string DiamondWeight2 = "", string DiamondPics2 = "", 
                                  string DiamondQuality2 = "", string DiamondCertificate2 = "",string CertificateNo2 = "", string URL2 = "", 
                                  string DiamondWeight3 = "", string DiamondPics3 = "", string DiamondQuality3 = "", string DiamondCertificate3 = "",
                                  string CertificateNo3 = "", string URL3 = "", string DiamondWeight4 = "", string DiamondPics4 = "", string DiamondQuality4 = "",
                                  string DiamondCertificate4 = "",string CertificateNo4 = "", string URL4 = "")
             {
                SqlParameter[] objParam = new SqlParameter[40];

                objParam[0] = new SqlParameter("@CustomerId", SqlDbType.NVarChar) { Value = CustomerId };

                objParam[1] = new SqlParameter("@OrderDate", SqlDbType.DateTime)
                {
                    Value = string.IsNullOrWhiteSpace(OrderDate)
                        ? (object)DBNull.Value : Convert.ToDateTime(OrderDate)
                };
                objParam[2] = new SqlParameter("@RefOrderNo", SqlDbType.NVarChar) { Value = RefOrderNo };
                objParam[3] = new SqlParameter("@OrderNo", SqlDbType.NVarChar) { Value = OrderNo };

                objParam[4] = new SqlParameter("@OrderRecvDate", SqlDbType.DateTime)
                    {
                        Value = string.IsNullOrWhiteSpace(OrderRecvDate)
                        ? (object)DBNull.Value : Convert.ToDateTime(OrderRecvDate)
                    };

                objParam[5] = new SqlParameter("@CadIssueDate", SqlDbType.DateTime)
                {
                    Value = string.IsNullOrWhiteSpace(CadIssueDate)
                        ? (object)DBNull.Value : Convert.ToDateTime(CadIssueDate)
                };

                objParam[6] = new SqlParameter("@CadApproveDate", SqlDbType.DateTime)
                {
                    Value = string.IsNullOrWhiteSpace(CadApproveDate)
                            ? (object)DBNull.Value : Convert.ToDateTime(CadApproveDate)
                };

                objParam[7] = new SqlParameter("@DiamondReceivedDate", SqlDbType.DateTime)
                {
                    Value = string.IsNullOrWhiteSpace(DiamondReceivedDate)
                            ? (object)DBNull.Value : Convert.ToDateTime(DiamondReceivedDate)
                };

                objParam[8] = new SqlParameter("@DeliveryDate", SqlDbType.DateTime)
                {
                    Value = string.IsNullOrWhiteSpace(DeliveryDate)
                            ? (object)DBNull.Value : Convert.ToDateTime(DeliveryDate)
                };
                objParam[9] = new SqlParameter("@DiamondQuality", SqlDbType.NVarChar) { Value = DiamondQuality };
                objParam[10] = new SqlParameter("@PartyDiamond", SqlDbType.NVarChar) { Value = PartyDiamond };
                objParam[11] = new SqlParameter("@PartyDiamondReferenceNo", SqlDbType.NVarChar) { Value = PartyDiamondReferenceNo };
                objParam[12] = new SqlParameter("@Type", SqlDbType.NVarChar) { Value = Type };
                objParam[13] = new SqlParameter("@Description", SqlDbType.NVarChar) { Value = Description };

            // Create a DataTable to hold Job Details
            DataTable jobDetailsTable = new DataTable();
            jobDetailsTable.Columns.Add("SlNo", typeof(string));
            jobDetailsTable.Columns.Add("DesignNo", typeof(string));
            jobDetailsTable.Columns.Add("CustomerImage", typeof(byte[]));
            jobDetailsTable.Columns.Add("CadImage", typeof(byte[]));
            jobDetailsTable.Columns.Add("FinishedFinalImage", typeof(byte[]));
            jobDetailsTable.Columns.Add("AdditionalImage", typeof(byte[]));
            jobDetailsTable.Columns.Add("ProductId", typeof(string));
            jobDetailsTable.Columns.Add("ApproxWeight", typeof(decimal));
            jobDetailsTable.Columns.Add("Polish", typeof(string));
            jobDetailsTable.Columns.Add("Pcs", typeof(decimal));
            jobDetailsTable.Columns.Add("Size", typeof(decimal));
            jobDetailsTable.Columns.Add("Length", typeof(decimal));
            jobDetailsTable.Columns.Add("DiamondWeight", typeof(decimal));
            jobDetailsTable.Columns.Add("DiamondPices", typeof(decimal));
            jobDetailsTable.Columns.Add("Remark", typeof(string));

            // Fill the DataTable with your job details
            foreach (var jobDetail in Job_details)
            {
                var customerImageBytes = ConvertBase64ToByteArray(jobDetail.CustomerImage);
                var cadImageBytes = ConvertBase64ToByteArray(jobDetail.CadImage);
                var finishedFinalImageBytes = ConvertBase64ToByteArray(jobDetail.FinishedFinalImage);
                var additionalImageBytes = ConvertBase64ToByteArray(jobDetail.AdditionalImage);
                decimal pcsValue = (string.IsNullOrEmpty(jobDetail.Pcs) || jobDetail.Pcs.Trim() == string.Empty) ? 0 : Convert.ToDecimal(jobDetail.Pcs);
                decimal approxweight = (string.IsNullOrEmpty(jobDetail.ApproxWeight) || jobDetail.ApproxWeight.Trim() == string.Empty) ? 0 : Convert.ToDecimal(jobDetail.ApproxWeight);
                decimal size = (string.IsNullOrEmpty(jobDetail.Size) || jobDetail.Size.Trim() == string.Empty) ? 0 : Convert.ToDecimal(jobDetail.Size);
                decimal length = (string.IsNullOrEmpty(jobDetail.Length) || jobDetail.Length.Trim() == string.Empty) ? 0 : Convert.ToDecimal(jobDetail.Length);
                decimal diamondweight = (string.IsNullOrEmpty(jobDetail.DiamondWeight) || jobDetail.DiamondWeight.Trim() == string.Empty) ? 0 : Convert.ToDecimal(jobDetail.DiamondWeight);
                decimal diamodpices = (string.IsNullOrEmpty(jobDetail.DiamondPices) || jobDetail.DiamondPices.Trim() == string.Empty) ? 0 : Convert.ToDecimal(jobDetail.DiamondPices);
                jobDetailsTable.Rows.Add(
                    jobDetail.SINo,
                    jobDetail.DesignNo,
                    customerImageBytes.Length == 0 ? (object)DBNull.Value : customerImageBytes,
                    cadImageBytes.Length == 0 ? (object)DBNull.Value : cadImageBytes,
                    finishedFinalImageBytes.Length == 0 ? (object)DBNull.Value : finishedFinalImageBytes,
                    additionalImageBytes.Length == 0 ? (object)DBNull.Value : additionalImageBytes,
                    jobDetail.MaterialName,
                    approxweight,
                    jobDetail.Polish,
                    pcsValue,
                    size,
                    length,
                    diamondweight,
                    diamodpices,
                    jobDetail.Remark
                );
            }

            // Add the DataTable as a parameter
            objParam[14] = new SqlParameter("@Job_details", SqlDbType.Structured)
            {
                TypeName = "dbo.JobDetailTableType",
                Value = jobDetailsTable
            };

            // Other parameters
            objParam[15] = new SqlParameter("@CreateUser", SqlDbType.NVarChar) { Value = LoginUser };
            objParam[16] = new SqlParameter("@DiamondWeight1", SqlDbType.NVarChar) { Value = DiamondWeight1 };
            objParam[17] = new SqlParameter("@DiamondPics1", SqlDbType.NVarChar) { Value = DiamondPics1 };
            objParam[18] = new SqlParameter("@DiamondQuality1", SqlDbType.NVarChar) { Value = DiamondQuality1 };
            objParam[19] = new SqlParameter("@DiamondCertificate1", SqlDbType.NVarChar) { Value = DiamondCertificate1 };
            objParam[20] = new SqlParameter("@CertificateNo1", SqlDbType.NVarChar) { Value = CertificateNo1 };
            objParam[21] = new SqlParameter("@URL1", SqlDbType.NVarChar) { Value = URL1 };
            objParam[22] = new SqlParameter("@DiamondWeight2", SqlDbType.NVarChar) { Value = DiamondWeight2 };
            objParam[23] = new SqlParameter("@DiamondPics2", SqlDbType.NVarChar) { Value = DiamondPics2 };
            objParam[24] = new SqlParameter("@DiamondQuality2", SqlDbType.NVarChar) { Value = DiamondQuality2 };
            objParam[25] = new SqlParameter("@DiamondCertificate2", SqlDbType.NVarChar) { Value = DiamondCertificate2 };
            objParam[26] = new SqlParameter("@CertificateNo2", SqlDbType.NVarChar) { Value = CertificateNo2 };
            objParam[27] = new SqlParameter("@URL2", SqlDbType.NVarChar) { Value = URL2 };
            objParam[28] = new SqlParameter("@DiamondWeight3", SqlDbType.NVarChar) { Value = DiamondWeight3};
            objParam[29] = new SqlParameter("@DiamondPics3", SqlDbType.NVarChar) { Value = DiamondPics3 };
            objParam[30] = new SqlParameter("@DiamondQuality3", SqlDbType.NVarChar) { Value = DiamondQuality3 };
            objParam[31] = new SqlParameter("@DiamondCertificate3", SqlDbType.NVarChar) { Value = DiamondCertificate3 };
            objParam[32] = new SqlParameter("@CertificateNo3", SqlDbType.NVarChar) { Value = CertificateNo3 };
            objParam[33] = new SqlParameter("@URL3", SqlDbType.NVarChar) { Value = URL3 };
            objParam[34] = new SqlParameter("@DiamondWeight4", SqlDbType.NVarChar) { Value = DiamondWeight4 };
            objParam[35] = new SqlParameter("@DiamondPics4", SqlDbType.NVarChar) { Value = DiamondPics4 };
            objParam[36] = new SqlParameter("@DiamondQuality4", SqlDbType.NVarChar) { Value = DiamondQuality4 };
            objParam[37] = new SqlParameter("@DiamondCertificate4", SqlDbType.NVarChar) { Value = DiamondCertificate4 };
            objParam[38] = new SqlParameter("@CertificateNo4", SqlDbType.NVarChar) { Value = CertificateNo4 };
            objParam[39] = new SqlParameter("@URL4", SqlDbType.NVarChar) { Value = URL4 };
            var result = objMain.ExecuteProcedure("procMnfJlrJobCardMaster", objParam);
            if (result != null)
            {
                // Serialize the result to a JSON string
                return JsonConvert.SerializeObject(new { msg = result.msg, status = result.status });
            }

            return JsonConvert.SerializeObject(new { msg = "Error executing procedure", status = "failure" });
        }

        public static byte[] ConvertBase64ToByteArray(string base64String)
        {
            // Check if the input is null or empty
            if (string.IsNullOrEmpty(base64String))
            {
                return Array.Empty<byte>(); // Return an empty byte array if the input is null or empty
            }

            // Remove the data:image/jpeg;base64, part if present
            string base64Data = base64String;
            if (base64String.Contains(","))
            {
                base64Data = base64String.Substring(base64String.IndexOf(",") + 1);
            }

            // Check if the base64Data is a valid Base64 string
            if (!IsBase64String(base64Data))
            {
                return Array.Empty<byte>(); // Return an empty byte array if the string is not valid Base64
            }

            try
            {
                // Convert the Base64 string to a byte array
                return Convert.FromBase64String(base64Data);
            }
            catch (FormatException)
            {
                // In case of a format exception, return an empty byte array
                return Array.Empty<byte>();
            }
        }

        // Helper method to check if a string is a valid Base64 string
        private static bool IsBase64String(string base64String)
        {
            // Check if the string is empty
            if (string.IsNullOrEmpty(base64String))
            {
                return false;
            }

            // Check if the string length is a multiple of 4
            if (base64String.Length % 4 != 0)
            {
                return false;
            }

            // Check for invalid characters
            foreach (char c in base64String)
            {
                if (!char.IsLetterOrDigit(c) && c != '+' && c != '/' && c != '=')
                {
                    return false;
                }
            }

            return true;
        }

    }
    public class JobDetail
    {
        public string SINo { get; set; }
        public string MaterialName { get; set; }
        public string DesignNo { get; set; }
        public string CustomerImage { get; set; }
        public string CadImage { get; set; }
        public string FinishedFinalImage { get; set; }
        public string AdditionalImage { get; set; }
        public string ApproxWeight { get; set; }
        public string Polish { get; set; }
        public string Pcs { get; set; }
        public string Size { get; set; }
        public string Length { get; set; }
        public string DiamondWeight { get; set; }
        public string DiamondPices { get; set; }
        public string Remark { get; set; }
    }
}