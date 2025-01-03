using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfHrEmpSalaryReport : System.Web.UI.Page
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
                    //txtYear.Value = DateTime.Now.Year.ToString();

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


  
        //BranchMasterList         
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

  
        [WebMethod]
        public static string EmployeeMasterList(string branchid = "")
        {
            // clsMain objMain = new clsMain();
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData(@"select EmpId,EmpName+' ('+EmpId+')' as EmpName from tblHrEmpMaster where PresentStatus='Working' and Active='Y'
                    " + (branchid != "" ? " and Branchcode='" + branchid + "'" : ""));
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDepartmentList);
        }
        //============================

        //=================================
        [WebMethod]
        public static string FetchEmployeeDetails(string EmpId = "")
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select EmpId,EmpName,Branchcode,DOB,DOJ,PresentDesignation,PresentDepartId,Area,
                                              FatherName,MotherName,SpouseName,Division,Grade,PresentResNo,PresentResName,
                                              PresentRoadStreet,PresentPinNo,PresentPost,PresentState,PresentDistrict,
                                              PermanentResNo,PermanentResName,PermanentRoadStreet,PermanentPinNo,PermanentPost,
                                              PermanentState,PermanentDistrict,AdharNo,VoterNo,PanNo,Passport,DrivingNo,
                                              IfscCode,BankBranchName,BankName,AcNumber,PfNo,EsiNo,Sex,MaritalStatus,
                                              MobileNo,EmailAddress,Religion,Caste from tblHrEmpMaster where EmpId='" + EmpId + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }

            string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            return json;
        }
        //====================================

        [WebMethod]
        public static string FetchEmployeSalaryApproveList(string branchid = "", string month = "", string year = "", string EmployeeId = "", string SalaryType = "", string SalaryApprove = "")
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmpSalaryGenerateList = new DataTable();

            try
            {
                if (year == "")
                {
                    year = DateTime.Now.Year.ToString();
                }

                // this is Salary Approve query, just copy, it will display data without salary approve
                dtEmpSalaryGenerateList = objMain.dtFetchData(@" select sg.*,e.EmpName  from tblHrPayrollMonthlySalaryGenerate sg, tblHrEmpMaster e
                                                        where e.EmpId=sg.EmpId 
                                                       and  e.PresentStatus='Working' and e.Active='Y'
                                                        and sg.SalaryPayment='N'"
                                                       + (branchid != "" ? " and e.Branchcode = '" + branchid + "'" : "") + "" +
                                                        (year != "" ? " and sg.Year = " + year + "" : "") + "" +
                                                       (month != "" ? " and sg.Month = '" + month + "'" : "") + "" +
                                                       (EmployeeId != "" ? " and sg.EmpId='" + EmployeeId + "'" : "") + "" +
                                                       (SalaryType != "" ? " and c.SalaryType='" + SalaryType + "'" : "") + "" +
                                                       " order by sg.id desc");





/*
                // this is Salary Approve query, just copy, display data with salary approve
                dtEmpSalaryGenerateList = objMain.dtFetchData(@" select sg.*,e.EmpName  from tblHrPayrollMonthlySalaryGenerate sg, tblHrEmpMaster e
                                                        where e.EmpId=sg.EmpId 
                                                       and  e.PresentStatus='Working' and e.Active='Y'
                                                        and sg.SalaryApprove='" + SalaryApprove + "' and sg.SalaryPayment='N'"
                                                       + (branchid != "" ? " and e.Branchcode = '" + branchid + "'" : "") + "" +
                                                        (year != "" ? " and sg.Year = " + year + "" : "") + "" +
                                                       (month != "" ? " and sg.Month = '" + month + "'" : "") + "" +
                                                       (EmployeeId != "" ? " and sg.EmpId='" + EmployeeId + "'" : "") + "" +
                                                       (SalaryType != "" ? " and c.SalaryType='" + SalaryType + "'" : "") + "" +
                                                       " order by sg.id desc");

*/




                /*
                  display duplicate data row, old code
                 dtEmpSalaryGenerateList = objMain.dtFetchData(@" select sg.*,e.EmpName
                                                         from tblHrPayrollMonthlySalaryGenerate sg 
                                                         join tblHrEmpMaster e on e.EmpId=sg.EmpId
                                                         join tblHrPayrollEmpCtcTransection c on c.EmpId=sg.EmpId
                                                         where e.PresentStatus='Working' and e.Active='Y'
                                                         and sg.SalaryApprove='" + SalaryApprove + "' and sg.SalaryPayment='N'"
                                                         + (branchid != "" ? " and e.Branchcode = '" + branchid + "'" : "") + "" +
                                                          (year != "" ? " and sg.Year = " + year + "" : "") + "" +
                                                         (month != "" ? " and sg.Month = '" + month + "'" : "") + "" +
                                                         (EmployeeId != "" ? " and sg.EmpId='" + EmployeeId + "'" : "") + "" +
                                                         (SalaryType != "" ? " and c.SalaryType='" + SalaryType + "'" : "") + "" +
                                                         " order by sg.id desc");

                 */






                /*
                dtEmpSalaryGenerateList = objMain.dtFetchData(@" select sg.*,e.EmpName  
                                                   from tblHrPayrollMonthlySalaryGenerate sg, tblHrEmpMaster e, tblHrPayrollEmpCtcTransection c
                                                         where e.EmpId=sg.EmpId and sg.EmpId= c.EmpId
                                                       and  e.PresentStatus='Working' and e.Active='Y'
                                                        and sg.SalaryApprove='" + SalaryApprove + "' and sg.SalaryPayment='N'"
                                                       + (branchid != "" ? " and e.Branchcode = '" + branchid + "'" : "") + "" +
                                                        (year != "" ? " and sg.Year = " + year + "" : "") + "" +
                                                       (month != "" ? " and sg.Month = '" + month + "'" : "") + "" +
                                                       (EmployeeId != "" ? " and sg.EmpId='" + EmployeeId + "'" : "") + "" +
                                                       (SalaryType != "" ? " and c.SalaryType='" + SalaryType + "'" : "") + "" +
                                                       " order by sg.id desc");
                */
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
            return JsonConvert.SerializeObject(dtEmpSalaryGenerateList, settings);
        }


        [WebMethod]
        public static string RejectSalaryApprove(string id = "", string loginuser = "")
        {
            //  clsMain objMain = new clsMain();

            try
            {

                objMain.dtFetchData(@"update tblHrPayrollMonthlySalaryGenerate set SalaryApprove='N',UpdateUser='" + loginuser + "',UpdateDate=getdate() where Id in (" + id + ")");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject("");
        }


        [WebMethod]
        public static string UpdateSalaryApprove(string id = "", string loginuser = "")
        {
            // clsMain objMain = new clsMain();

            try
            {

                objMain.dtFetchData(@"update tblHrPayrollMonthlySalaryGenerate set SalaryApprove='Y',UpdateUser='" + loginuser + "',UpdateDate=getdate() where Id in (" + id + ")");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject("");
        }

        [WebMethod]
        public static string SalaryExportToPDF(string id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtEmpSalaryGenerateList = new DataTable();

            try
            {

                dtEmpSalaryGenerateList = objMain.dtFetchData(@" select e.EmpName,isnull(dpt.DeptName,'') as DeptName,isnull(dsg.DesignationName,'') as DesignationName,
                                                                isnull(e.CardNo,'') as CardNo,cast(sg.TotalDay as int) as TotalDay,cast(sg.EarnDay as int) as EarnDay,0 as LWP,
                                                                sg.BasicRate,sg.PF_EmployeesValue,sg.ESI_EmployeesValue,sg.PT,0 as Advance,
                                                                (sg.PF_EmployeesValue+sg.ESI_EmployeesValue+sg.PT) as TotalDeduct,sg.HraAmt,sg.SPLAL_Amt,
                                                                isnull(OtherAllownce,0) as OtherAllownce,(sg.HraAmt+sg.SPLAL_Amt+isnull(OtherAllownce,0)) as TotalAllow,
                                                                (sg.BasicRate+sg.HraAmt+sg.SPLAL_Amt+isnull(OtherAllownce,0)) as GrossSalary,
                                                                0 as Leave,sg.BonusAmt,(0+sg.BonusAmt) as AnualBenefit,
                                                                ((sg.BasicRate+sg.HraAmt+sg.SPLAL_Amt+isnull(OtherAllownce,0)+0+sg.BonusAmt)-(sg.PF_EmployeesValue+sg.ESI_EmployeesValue+sg.PT)) as NetAmnt,
                                                                sg.GROSS_TOTAL,(sg.GROSS_TOTAL * 12) as GROSS_TOTAL_PA,(sg.Month+' - '+cast(sg.year as varchar)) as MonthYear,sg.EmpId
                                                                from tblHrPayrollMonthlySalaryGenerate sg
                                                                join tblHrEmpMaster e on e.EmpId=sg.EmpId
                                                                left join tblHrDeptMaster dpt on dpt.Id=e.PresentDepartId
                                                                left join tblHrDesignationMaster dsg on dsg.Id=Cast(isnull(e.PresentDesignation,0) as int)
                                                                where sg.Id=" + id + "");
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
            return JsonConvert.SerializeObject(dtEmpSalaryGenerateList, settings);
        }
        [WebMethod]
        public static string GetPdfContent(string Id)
        {

            // Generate PDF content (replace this with your actual PDF generation logic)
            byte[] pdfBytes = GeneratePdfBytes(Id);

            // Convert PDF content to base64 string
            string base64String = Convert.ToBase64String(pdfBytes);

            return base64String;
        }

        private static byte[] GeneratePdfBytes(string Id)
        {
            // Example: Generate a simple PDF using iTextSharp library
            using (MemoryStream ms = new MemoryStream())
            {
                iTextSharp.text.Document document = new iTextSharp.text.Document();
                iTextSharp.text.pdf.PdfWriter.GetInstance(document, ms);
                document.Open();
                //document.Add(new iTextSharp.text.Paragraph("Hello, World!"));
                AddPaySlipContent(document, Id);
                document.Close();
                return ms.ToArray();
            }
        }
        private static void AddPaySlipContent(Document document, string Id)
        {
            PdfPTable EmpHeadingTable = new PdfPTable(1);
            EmpHeadingTable.WidthPercentage = 100;

            PdfPCell EmpHeadingCell = new PdfPCell(new Phrase("Pay Slip", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 14)));
            EmpHeadingCell.BorderWidth = 0;
            EmpHeadingCell.HorizontalAlignment = Element.ALIGN_CENTER; // Align to the center
            EmpHeadingCell.VerticalAlignment = Element.ALIGN_MIDDLE; // Align to the middle vertically
            EmpHeadingCell.FixedHeight = 50f; // Adjust the height as needed

            EmpHeadingTable.AddCell(EmpHeadingCell);
            document.Add(EmpHeadingTable);

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
                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance(imageData);


                    logo.ScaleToFit(100, 100); // Adjust the width and height as needed
                    companyLogoCell.AddElement(logo);




                }
                companyLogoCell.BorderWidth = 0;
                companyLogoCell.HorizontalAlignment = Element.ALIGN_RIGHT; // Align to the right
                companyInfoTable.AddCell(companyLogoCell);
                document.Add(companyInfoTable);

            }

            DataTable dtempDetail = objMain.dtFetchData(@"Select e.EmpName, sg.EmpId, e.PanNo,e.PfNo AS UANNo, e.Grade, 
            d.DesignationName, dept.DeptName,EsiNo, Convert(varchar(20),e.DOJ,105) AS DOJ, e.AcNumber, sg.EarnDay + sg.CL + sg.EL + sg.Sunday + sg.Holiday + sg.Total_2ndSaturday + sg.Total_4thSaturday
			as dayPresent, e.IfscCode,sg.Year,sg.Month
            from tblHrEmpMaster e inner join tblHrDesignationMaster d on e.PresentDesignation = d.ID
            inner join tblHrDeptMaster dept on e.PresentDepartId = dept.Id inner
            join tblHrPayrollMonthlySalaryGenerate sg on e.EmpId = sg.EmpId    where sg.Id = " + "'" + Id + "'");

            document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
            document.Add(new Paragraph(new Phrase(" ")));

            PdfPTable EmpSubHeadingTable = new PdfPTable(1);
            EmpSubHeadingTable.WidthPercentage = 100;

            PdfPCell EmpSubHeadingCell = new PdfPCell(new Phrase("Pay Slip- " + Convert.ToString(dtempDetail.Rows[0]["Month"]) + " " + Convert.ToString(dtempDetail.Rows[0]["Year"]), FontFactory.GetFont(FontFactory.HELVETICA_BOLD)));
            EmpSubHeadingCell.BorderWidth = 0;
            EmpSubHeadingCell.HorizontalAlignment = Element.ALIGN_CENTER; // Align to the center
            EmpSubHeadingCell.VerticalAlignment = Element.ALIGN_MIDDLE; // Align to the middle vertically
            EmpSubHeadingCell.FixedHeight = 50f; // Adjust the height as needed

            EmpSubHeadingTable.AddCell(EmpSubHeadingCell);
            document.Add(EmpSubHeadingTable);

            PdfPTable itemEmpTable = new PdfPTable(4);
            itemEmpTable.WidthPercentage = 100;
            itemEmpTable.SetWidths(new float[] { 1f, 2f, 1f, 2f });

            // Add table header
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Name", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["EmpName"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Emp Code", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["EmpId"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Designation", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["DesignationName"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("PAN", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["PanNo"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Grade", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["Grade"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("UAN No", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["UANNo"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Department", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["DeptName"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("ESIC No", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["EsiNo"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Joining Date", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["DOJ"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Account No", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["AcNumber"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("Days Present", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["dayPresent"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase("IFSC", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10))));
            itemEmpTable.AddCell(new PdfPCell(new Phrase(Convert.ToString(dtempDetail.Rows[0]["IfscCode"]), FontFactory.GetFont(FontFactory.HELVETICA, 10))));
            document.Add(itemEmpTable);
            document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break

            DataTable dtsalaryDetail = objMain.dtFetchData(@"Select sg.BasicPay,sg.PF_EmployeesValue,sg.HraAmt,sg.PT,sg.LTA_Amt,sg.LoanEmiAmount,
														sg.TDS_Deduct,sg.OtherAllownce,sg.GROSS_TOTAL, PF_EmployeesValue + PT + LoanEmiAmount + TDS_Deduct as TotalDeductions,sg.SalaryPaymentMode,sg.NetPay
														,sg.CL_Earn,sg.CL_ClosingBalance,sg.EL_Earn,sg.EL_ClosingBalance,sg.ESI_EmployeesValue,DaAmt
														from  tblHrPayrollMonthlySalaryGenerate sg 
														where sg.Id= " + "'" + Id + "'");

            PdfPTable itemSalaryTable = new PdfPTable(6);
            itemSalaryTable.WidthPercentage = 100;
            itemSalaryTable.SetWidths(new float[] { 2f, 1f, 1f, 2f, 1f, 1f });

            PdfPCell Paymentcell = new PdfPCell(new Phrase("PAYMENT", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Paymentcell.HorizontalAlignment = Element.ALIGN_CENTER;
            itemSalaryTable.AddCell(Paymentcell);

            PdfPCell Stdcell = new PdfPCell(new Phrase("STANDARD", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Stdcell.HorizontalAlignment = Element.ALIGN_CENTER;
            itemSalaryTable.AddCell(Stdcell);
            // Add table header
            PdfPCell Actualcell = new PdfPCell(new Phrase("ACTUAL", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Actualcell.HorizontalAlignment = Element.ALIGN_CENTER;
            itemSalaryTable.AddCell(Actualcell);

            PdfPCell Deductcell = new PdfPCell(new Phrase("DEDUCTIONS", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Deductcell.HorizontalAlignment = Element.ALIGN_CENTER;
            itemSalaryTable.AddCell(Deductcell);

            PdfPCell Std1cell = new PdfPCell(new Phrase("STANDARD", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Std1cell.HorizontalAlignment = Element.ALIGN_CENTER;
            itemSalaryTable.AddCell(Std1cell);

            PdfPCell Actcell = new PdfPCell(new Phrase("ACTUAL", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Actcell.HorizontalAlignment = Element.ALIGN_CENTER;
            itemSalaryTable.AddCell(Actcell);

            PdfPCell Basiccell = new PdfPCell(new Phrase("Basic Salary", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            Basiccell.HorizontalAlignment = Element.ALIGN_LEFT;
            Basiccell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Basiccell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell Basicvalcell = new PdfPCell(new Phrase(Convert.ToString(dtsalaryDetail.Rows[0]["BasicPay"]), FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            Basicvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            Basicvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Basicvalcell);

            PdfPCell PFcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["PF_EmployeesValue"]) > 0 ? "Provident Fund" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            PFcell.HorizontalAlignment = Element.ALIGN_LEFT;
            PFcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(PFcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell PFvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["PF_EmployeesValue"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["PF_EmployeesValue"]) : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            PFvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            PFvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(PFvalcell);

            PdfPCell HRAcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["HraAmt"]) > 0 ? "HRA" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            HRAcell.HorizontalAlignment = Element.ALIGN_LEFT;
            HRAcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(HRAcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell HRAvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["HraAmt"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["HraAmt"]) : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            HRAvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            HRAvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(HRAvalcell);

            PdfPCell ESIcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["ESI_EmployeesValue"]) > 0 ? "ESI" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            ESIcell.HorizontalAlignment = Element.ALIGN_LEFT;
            ESIcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(ESIcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell ESIvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["ESI_EmployeesValue"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["ESI_EmployeesValue"]) : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            ESIvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            ESIvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(ESIvalcell);

            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;

            PdfPCell LTAcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["LTA_Amt"]) > 0 ? "LTA" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            LTAcell.HorizontalAlignment = Element.ALIGN_LEFT;
            LTAcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(LTAcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell LTAvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["LTA_Amt"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["LTA_Amt"]) : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            LTAvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            LTAvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(LTAvalcell);

            PdfPCell PTcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["PT"]) > 0 ? "Profession Tax" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            PTcell.HorizontalAlignment = Element.ALIGN_LEFT;
            PTcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(PTcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell PTvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["PT"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["PT"]) : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            PTvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            PTvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(PTvalcell);

            PdfPCell DAcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["DaAmt"]) > 0 ? "Daily Allowance" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            DAcell.HorizontalAlignment = Element.ALIGN_LEFT;
            DAcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(DAcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell DAvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["DaAmt"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["DaAmt"]) : "", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            DAvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            DAvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(DAvalcell);

            PdfPCell Loancell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["LoanEmiAmount"]) > 0 ? "Loan EMI" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            Loancell.HorizontalAlignment = Element.ALIGN_LEFT;
            Loancell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Loancell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell Loanvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["LoanEmiAmount"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["LoanEmiAmount"]) : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            Loanvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            Loanvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Loanvalcell);

            PdfPCell OAcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["OtherAllownce"]) > 0 ? "Other Allowance" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            OAcell.HorizontalAlignment = Element.ALIGN_LEFT;
            OAcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(OAcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell OAvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["OtherAllownce"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["OtherAllownce"]) : "", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            OAvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            OAvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(OAvalcell);

            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;

            PdfPCell TDScell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["TDS_Deduct"]) > 0 ? "TDS" : " ", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            TDScell.HorizontalAlignment = Element.ALIGN_LEFT;
            TDScell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(TDScell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell TDSvalcell = new PdfPCell(new Phrase(Convert.ToInt32(dtsalaryDetail.Rows[0]["TDS_Deduct"]) > 0 ? Convert.ToString(dtsalaryDetail.Rows[0]["TDS_Deduct"]) : "", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
            TDSvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            TDSvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(TDSvalcell);




            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            //itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;

            PdfPCell Totalcell = new PdfPCell(new Phrase("TOTAL GROSS", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Totalcell.HorizontalAlignment = Element.ALIGN_LEFT;
            Totalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Totalcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell Totalvalcell = new PdfPCell(new Phrase(Convert.ToString(dtsalaryDetail.Rows[0]["GROSS_TOTAL"]), FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Totalvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            Totalvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Totalvalcell);

            PdfPCell Totaldetcell = new PdfPCell(new Phrase("TOTAL DEDUCTIONS", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Totaldetcell.HorizontalAlignment = Element.ALIGN_LEFT;
            Totaldetcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Totaldetcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell Totaldetvalcell = new PdfPCell(new Phrase(Convert.ToString(dtsalaryDetail.Rows[0]["TotalDeductions"]), FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            Totaldetvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            Totaldetvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(Totaldetvalcell);

            PdfPCell PMcell = new PdfPCell(new Phrase("PAYMENT MODE", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            PMcell.HorizontalAlignment = Element.ALIGN_LEFT;
            PMcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(PMcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell PMvalcell = new PdfPCell(new Phrase(Convert.ToString(dtsalaryDetail.Rows[0]["SalaryPaymentMode"]), FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            PMvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            PMvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(PMvalcell);

            PdfPCell NPcell = new PdfPCell(new Phrase("NET PAY", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            NPcell.HorizontalAlignment = Element.ALIGN_LEFT;
            NPcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(NPcell);

            itemSalaryTable.AddCell(new PdfPCell(new Phrase(""))).BorderWidthTop = 0;
            PdfPCell NPvalcell = new PdfPCell(new Phrase(Convert.ToString(dtsalaryDetail.Rows[0]["NetPay"]), FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10)));
            NPvalcell.HorizontalAlignment = Element.ALIGN_RIGHT;
            NPvalcell.BorderWidthTop = 0; // Adjust the value as needed
            itemSalaryTable.AddCell(NPvalcell);
            // Add table footer
            PdfPCell clCell = new PdfPCell();
            clCell.Colspan = 6;
            clCell.HorizontalAlignment = Element.ALIGN_LEFT;

            // Add content to the cell
            Paragraph paragraph = new Paragraph("CL Earn : " + Convert.ToString(dtsalaryDetail.Rows[0]["CL_Earn"]) + "                          " + "CL Consume : " + Convert.ToString(dtsalaryDetail.Rows[0]["CL_ClosingBalance"]), FontFactory.GetFont(FontFactory.HELVETICA, 10));
            clCell.AddElement(paragraph);

            // Add content to the cell
            Paragraph paragraph1 = new Paragraph("EL Earn : " + Convert.ToString(dtsalaryDetail.Rows[0]["EL_Earn"]) + "                          " + "EL Consume : " + Convert.ToString(dtsalaryDetail.Rows[0]["EL_ClosingBalance"]), FontFactory.GetFont(FontFactory.HELVETICA, 10));
            paragraph1.Add(Chunk.NEWLINE);
            // Add the paragraph to the cell
            clCell.AddElement(paragraph1);
            paragraph1.Add(new Paragraph(new Phrase(" ")));
            // Add the cell to the table
            itemSalaryTable.AddCell(clCell);

            document.Add(itemSalaryTable);
            document.Add(new Paragraph(new Phrase(" ")));  // Add an empty phrase to force a line break
            document.Add(new Paragraph("NB: This is a computer generated statement and doesnot need signature", FontFactory.GetFont(FontFactory.HELVETICA, 10)));
        }
    }
}