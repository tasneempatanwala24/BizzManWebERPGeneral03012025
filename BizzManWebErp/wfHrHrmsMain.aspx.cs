using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class WebForm2 : System.Web.UI.Page
    {
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    //loginuser.Value = Session["Id"].ToString();
                    string id = Request.QueryString["id"];

                    //added on 12 Dec 2023
                    //############START###############
                    if (Session["objMain_Session"] != null)
                    {
                        objMain = (clsMain)Session["objMain_Session"];
                        //AddPaySlipContent(id);
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
        public static string FetchData()
        {
            DataSet objDs = new DataSet();
            DataTable objdt = objMain.dtFetchData(@"SELECT CASE m.[MonthName] WHEN 'Jan' THEN 'January'  WHEN 'Feb' THEN 'February'
            WHEN 'Mar' THEN 'March' WHEN 'Apr' THEN 'April' WHEN 'May' THEN 'May' WHEN 'Jun' THEN 'June' WHEN 'Jul' THEN 'July'
            WHEN 'Aug' THEN 'August'  WHEN 'Sep' THEN 'September' WHEN 'Oct' THEN 'October' WHEN 'Nov' THEN 'November'
            WHEN 'Dec' THEN 'December' ELSE m.[MonthName] END AS FullMonthName,
            COUNT(CASE WHEN a.Attendance = 'Present' THEN 1 END) AS Present,
            COUNT(CASE WHEN a.Attendance IN ('CL', 'EL', 'LOP', 'Absonding', 'Left') THEN 1 END) AS Absent
            FROM tblHrMonthMaster m LEFT JOIN tblHrEmpAttendance a ON a.ATTMonth = m.[MonthName] AND a.AttYear = YEAR(GETDATE())
            GROUP BY m.[MonthName], m.Id ORDER BY m.Id");

            //======================================
            /*  original by developer
            DataTable objdt1 = objMain.dtFetchData(@"SELECT CASE m.[MonthName] WHEN 'Jan' THEN 'January'  WHEN 'Feb' THEN 'February'
            WHEN 'Mar' THEN 'March' WHEN 'Apr' THEN 'April' WHEN 'May' THEN 'May' WHEN 'Jun' THEN 'June' WHEN 'Jul' THEN 'July'
            WHEN 'Aug' THEN 'August'  WHEN 'Sep' THEN 'September' WHEN 'Oct' THEN 'October' WHEN 'Nov' THEN 'November'
            WHEN 'Dec' THEN 'December' ELSE m.[MonthName] END AS FullMonthName,
            SUM(ISNULL(a.TotalOT,0)) AS TotalOT   
            FROM tblHrMonthMaster m LEFT JOIN tblHrEmpOtMasterEntry a ON a.[Month] = m.[MonthName] AND a.[Year] = YEAR(GETDATE())
            GROUP BY m.[MonthName], m.Id ORDER BY m.Id");
            // TotalHours  instade of TotalOT
            */

            //  change on 20/11/2024 for OT Hours  ( TotalHours  instade of TotalOT)
            DataTable objdt1 = objMain.dtFetchData(@"SELECT CASE m.[MonthName] WHEN 'Jan' THEN 'January'  WHEN 'Feb' THEN 'February'
            WHEN 'Mar' THEN 'March' WHEN 'Apr' THEN 'April' WHEN 'May' THEN 'May' WHEN 'Jun' THEN 'June' WHEN 'Jul' THEN 'July'
            WHEN 'Aug' THEN 'August'  WHEN 'Sep' THEN 'September' WHEN 'Oct' THEN 'October' WHEN 'Nov' THEN 'November'
            WHEN 'Dec' THEN 'December' ELSE m.[MonthName] END AS FullMonthName,
            SUM(ISNULL(a.TotalHours,0)) AS TotalOT
            FROM tblHrMonthMaster m LEFT JOIN tblHrEmpOtMasterEntry a ON a.[Month] = m.[MonthName] AND a.[Year] = YEAR(GETDATE())
            GROUP BY m.[MonthName], m.Id ORDER BY m.Id");
            // TotalHours  instade of TotalOT
//=========================================

            DataTable objdt2 = objMain.dtFetchData(@"SELECT CASE m.[MonthName] WHEN 'Jan' THEN 'January'  WHEN 'Feb' THEN 'February'
            WHEN 'Mar' THEN 'March' WHEN 'Apr' THEN 'April' WHEN 'May' THEN 'May' WHEN 'Jun' THEN 'June' WHEN 'Jul' THEN 'July'
            WHEN 'Aug' THEN 'August'  WHEN 'Sep' THEN 'September' WHEN 'Oct' THEN 'October' WHEN 'Nov' THEN 'November'
            WHEN 'Dec' THEN 'December' ELSE m.[MonthName] END AS FullMonthName,
            COUNT(CASE WHEN a.LoanStatus = 'Approved' THEN 1 END) AS Accept,  
            COUNT(CASE WHEN a.LoanStatus ='Cancel' THEN 1 END) AS Reject
            FROM tblHrMonthMaster m LEFT JOIN tblHrEmpLoanMaster a ON a.[Month] = m.[MonthName] AND a.[Year] = YEAR(GETDATE())
            GROUP BY m.[MonthName], m.Id ORDER BY m.Id");

            DataTable objdt3 = objMain.dtFetchData(@"SELECT COUNT(CASE WHEN a.Attendance = 'Present' THEN 1 END) AS Present,
            COUNT(CASE WHEN a.Attendance IN ('CL', 'EL', 'LOP', 'Absonding', 'Left') THEN 1 END) AS [Absent]
            FROM tblHrEmpAttendance a WHERE a.AttYear = YEAR(GETDATE()) AND a.AttMonth = FORMAT(GETDATE(), 'MMM')");

            DataTable objdt4 = objMain.dtFetchData(@"SELECT ISNULL(SUM(a.TotalDay),0) AS TotalDay
            FROM tblHrEmpLeaveApplicationMaster a WHERE a.[Year] = YEAR(GETDATE()) AND a.[Month] = FORMAT(GETDATE(), 'MMM')");

            objDs.Tables.AddRange(new DataTable[] { objdt, objdt1, objdt2,objdt3,objdt4 });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }

    }
}