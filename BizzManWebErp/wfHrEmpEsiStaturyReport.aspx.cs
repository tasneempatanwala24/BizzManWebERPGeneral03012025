﻿using iTextSharp.text.pdf;
using iTextSharp.text;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace BizzManWebErp
{
    public partial class wfHrEmpEsiStaturyReport : System.Web.UI.Page
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
            string bid = string.IsNullOrEmpty(branchid) ? "" : " and e.Branchcode = '" + branchid + "'";
            string mth = string.IsNullOrEmpty(month) ? "" : " and sg.Month='" + month + "'";
            string empId = string.IsNullOrEmpty(EmployeeId) ? "" : " and sg.EmpId='" + EmployeeId + "'";
            year = string.IsNullOrEmpty(year) ? DateTime.Now.Year.ToString() : year;
            DataTable dt = new DataTable();
            try
            {
                if (year == "")
                {
                    year = DateTime.Now.Year.ToString();
                }
                dt = objMain.dtFetchData(@"SELECT sg.[Year] as [Year],sg.[Month] as [Month],sg.EmpId,e.EmpName,ISNULL(e.EsiNo,'') as EsiNo,sg.GROSS_TOTAL,sg.ESI_EmployerPercentage,sg.ESI_EmployerValue,sg.ESI_EmployeesPercentage
                ,ESI_EmployeesValue from tblHrPayrollMonthlySalaryGenerate sg inner join tblHrEmpMaster e on sg.EmpId = e.EmpId
                Where e.PresentStatus='Working' and e.Active='Y' and sg.SalaryPayment='N' 
                and sg.Year ='" + year + "'" + bid + mth + empId);
                //dtEmpSalaryGenerateList = objMain.dtFetchData(@"select sg.*,e.EmpName,ISNULL(EsiNo,'') AS EsiNo  from tblHrPayrollMonthlySalaryGenerate sg, tblHrEmpMaster e
                //                                        where e.EmpId=sg.EmpId 
                //                                       and  e.PresentStatus='Working' and e.Active='Y'
                //                                        and sg.SalaryPayment='N'"
                //                                       + (branchid != "" ? " and e.Branchcode = '" + branchid + "'" : "") + "" +
                //                                        (year != "" ? " and sg.Year = " + year + "" : "") + "" +
                //                                       (month != "" ? " and sg.Month = '" + month + "'" : "") + "" +
                //                                       (EmployeeId != "" ? " and sg.EmpId='" + EmployeeId + "'" : "") + "" +
                //                                       (SalaryType != "" ? " and c.SalaryType='" + SalaryType + "'" : "") + "" +
                //                                       " order by sg.id desc");




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
            return JsonConvert.SerializeObject(dt, settings);
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
        
    }
}