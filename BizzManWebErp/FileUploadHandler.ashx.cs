using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Web;
using System.Windows.Input;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Office2013.PowerPoint.Roaming;
using DocumentFormat.OpenXml.Spreadsheet;
using iTextSharp.text;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
//using Microsoft.Office.Interop.Excel;

namespace BizzManWebErp
{
    [SecuritySafeCritical]
    public class FileUploadHandler : IHttpHandler
    {
        [SecuritySafeCritical]
        public void ProcessRequest(HttpContext context)
        {
            DataTable result = null;
            var msg = string.Empty;
            clsMain objMain = new clsMain();
            if (context.Request.QueryString["emp_id"] != null)
            {

                string imgType = context.Request.QueryString["img_type"];
                
                DataTable dtEmpList = new DataTable();
                byte[] rawBytes = new byte[0];
                dtEmpList = objMain.dtFetchData(@"select " + imgType + " from tblHrEmpMaster where EmpId='" + context.Request.QueryString["emp_id"].ToString() + "'");
                if (dtEmpList != null)
                {
                    if (dtEmpList.Rows.Count > 0)
                    {
                        if (dtEmpList.Rows[0][0] != DBNull.Value)
                        {
                            context.Response.BinaryWrite((byte[])dtEmpList.Rows[0][0]);
                        }
                        else
                        {
                            context.Response.BinaryWrite(rawBytes);
                        }
                    }
                    else
                    {
                        context.Response.BinaryWrite(rawBytes);
                    }
                }
                else
                {
                    context.Response.BinaryWrite(rawBytes);
                }

            }
            else
            {
                byte[] profile_bytes = null;
                byte[] adhar_bytes = null;
                byte[] voter_bytes = null;
                byte[] pan_bytes = null;
                byte[] passport_bytes = null;
                byte[] driving_bytes = null;
                byte[] bank_bytes = null;
                string empid = "";
                int img_save = 0;
                bool isValid = false;
                string[] validColumnHeaders = { "EmpId", "Day1", "Day2","Day3", "Day4", "Day5", "Day6", "Day7", "Day8", "Day9", "Day10", "Day11",
                    "Day12", "Day13", "Day14", "Day15", "Day16", "Day17","Day18", "Day19", "Day20", "Day21", "Day18", "Day19", "Day20", "Day21", 
                    "Day22", "Day23", "Day24", "Day25", "Day26", "Day27","Day28","Day29","Day30","Day31" };
                if (context.Request.Files.Count > 0)
                {
                    HttpFileCollection files = context.Request.Files;
                    string paramvalues = files.Keys[0].ToString();
                    string[] values = paramvalues.Split(',');
                    var userid = values[0];
                    var Year = !string.IsNullOrEmpty(values[1]) ? values[1] : DateTime.Now.Year.ToString();
                    var Month = !string.IsNullOrEmpty(values[2]) ? values[2] : DateTime.Now.ToString("MMM");
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];
                        if (Path.GetExtension(file.FileName).ToLower() == ".xlsx" || Path.GetExtension(file.FileName).ToLower() == ".xls")
                        {
                            using (XLWorkbook workBook = new XLWorkbook(file.InputStream))
                            {
                                //Read the first Sheet from Excel file.
                                IXLWorksheet workSheet = workBook.Worksheet(1);
                                var headerRow = workSheet.Row(1);
                                // Check each cell in the header row against the list of valid column headers
                                foreach (var cell in headerRow.Cells())
                                {
                                    string columnHeader = cell.Value.ToString().Trim();
                                    if (Array.IndexOf(validColumnHeaders, columnHeader) == -1)
                                    {
                                        msg = "Invalid Column header, at Cell : " + cell.Address.ToString();
                                        context.Response.Write(msg);
                                        //break;
                                        return;
                                    }
                                    
                                }
                                //Create a new DataTable.
                                DataTable dt = new DataTable();
                                DataTable dt1 = new DataTable();
                                dt1.Columns.Add(new DataColumn("EmpId", typeof(string)));
                                dt1.Columns.Add(new DataColumn("AttDay", typeof(string)));
                                dt1.Columns.Add(new DataColumn("Reason", typeof(string)));
                                dt1.Columns.Add(new DataColumn("Year", typeof(string)));
                                dt1.Columns.Add(new DataColumn("Month", typeof(string)));
                                dt1.Columns.Add(new DataColumn("CreateUser", typeof(string)));
                                //Loop through the Worksheet rows.
                                bool firstRow = true;

                                foreach (IXLRow row in workSheet.RowsUsed())
                                {
                                    int cellCount = 0;
                                    //Use the first row to add columns to DataTable.
                                    if (firstRow)
                                    {
                                        foreach (IXLCell cell in row.Cells())
                                        {
                                            dt.Columns.Add(cell.Value.ToString().Trim().Remove(0,3));
                                            cellCount++;
                                        }
                                        
                                        firstRow = false;
                                    }
                                    else
                                    {
                                        // Access the first cell in the row to get the value of the first column
                                        IXLCell firstCell = row.FirstCell();
                                        string EmpId = firstCell.Value.ToString().Trim();
                                        if (!string.IsNullOrEmpty(EmpId))
                                        {
                                            result = objMain.dtFetchData(@"SELECT EmpId FROM tblHrEmpMaster where EmpId =" + "'" + EmpId + "'");

                                            if (result.Rows.Count == 0)
                                            {
                                                // int rowIndex = row.RowNumber();
                                                msg = "Invalid value at row: " + row.RowNumber() + ", EmpId : " + EmpId;
                                                isValid = true;
                                                context.Response.Write(msg);
                                                return;
                                            }
                                            else
                                            {
                                                isValid = objMain.blSearchDataHO(@"SELECT 1 FROM tblHrPayrollMonthlySalaryGenerate where EmpId =" + "'" + EmpId + "' and [Year]=" + "'" + Year + "' and [Month] =" + "'" + Month + "'");
                                                if (isValid) 
                                                {
                                                    msg = "Salary already generated for Year : " + Year + " Month : " + Month + " for current employee. Row No. : " + row.RowNumber() + ", EmpId : " + EmpId;
                                                    isValid = true;
                                                    context.Response.Write(msg);
                                                    return;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            msg = "Invalid value at row: " + row.RowNumber() + ", EmpId is blank.";
                                            isValid = true;
                                            context.Response.Write(msg);
                                            return;
                                        }
                                        List<string> searchKeywords = new List<string> { "CL", "EL", "Holiday", "LOP", "P", "Sunday", "" };
                                            int j = 0;
                                            dt.Rows.Add();
                                            foreach(IXLCell cell in row.Cells().Skip(1))
                                            {
                                            string searchvalue = cell.Value.ToString().ToUpper().Trim();
                                            if(searchvalue == "HOLIDAY" || searchvalue == "SUNDAY")
                                            {
                                                searchvalue = char.ToUpper(searchvalue[0]) + searchvalue.Substring(1).ToLower();
                                            }
                                                if (cell.Value != null && searchKeywords.Any(x=> x.Contains(searchvalue)))
                                                {
                                                    isValid = false;
                                                }
                                                else
                                                {
                                                    isValid = true;
                                                    msg = "Invalid value at row: " + row.RowNumber() + ", Cell : " + cell.Address.ToString() + ". Value : " + cell.Value;
                                                    context.Response.Write(msg);
                                                    break;
                                                }
                                            }
                                        if (!isValid)
                                            {
                                            if (workSheet.Rows() != null)
                                            {
                                                foreach (IXLCell cell in row.Cells(false))
                                                {
                                                    dt.Rows[dt.Rows.Count - 1][j] = cell.Value != null ? cell.Value.ToString().ToUpper().Trim() : string.Empty;
                                                    j++;

                                                }                                             
                                                
                                            } 
                                        }
                                            else
                                            {
                                                break;
                                            }
                                        
                                    }

                                }
                                if (!isValid)
                                {
                                    foreach (DataColumn column in dt.Columns)
                                    {
                                        if (column.Ordinal != 0)
                                        {
                                            foreach (DataRow dtrow in dt.Rows)
                                            {
                                                // Create a new row in the result DataTable
                                                DataRow newRow = dt1.NewRow();
                                                // Set the column name in the first column
                                                newRow["EmpId"] = dtrow["Id"];
                                                newRow["AttDay"] = column.ColumnName;
                                                // Set the corresponding value in the second column
                                                if(dtrow[column].ToString() == "HOLIDAY" || dtrow[column].ToString() == "SUNDAY")
                                                {
                                                    string value = dtrow[column].ToString();
                                                    newRow["Reason"] = char.ToUpper(value[0]) + value.Substring(1).ToLower();
                                                    
                                                }
                                                else if (dtrow[column].ToString() == "P")
                                                {
                                                    newRow["Reason"] = "Present";
                                                }
                                                else
                                                {
                                                    newRow["Reason"] = dtrow[column];
                                                }
                                                newRow["Year"] = Year;
                                                newRow["Month"] = Month;
                                                newRow["CreateUser"] = userid;
                                                // Add the row to the result DataTable
                                                if (!string.IsNullOrEmpty(dtrow[column].ToString()))
                                                {
                                                    dt1.Rows.Add(newRow);
                                                }
                                            }
                                        }
                                    }
                                    SqlParameter[] objParam = new SqlParameter[1];

                                    objParam[0] = new SqlParameter("@tblExcelData", SqlDbType.Structured);
                                    objParam[0].Direction = ParameterDirection.Input;
                                    objParam[0].Value = dt1;

                                    result = objMain.ExecuteStoreProcedure("procHrEmpAttendanceUploadNew", objParam);

                                    if (result != null)
                                    {
                                        if (result.Rows.Count > 0)
                                        {
                                            msg = result.Rows[0][0].ToString();
                                        }
                                    }
                                    context.Response.Write(msg);
                                }
                            }
                        }
                        else
                        {

                            img_save = 1;
                            BinaryReader br = new BinaryReader(file.InputStream);
                            if (files.Keys[i].Split('_')[0].ToString() == "profile")
                            {
                                profile_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                            else if (files.Keys[i].Split('_')[0].ToString() == "adhar")
                            {
                                adhar_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                            else if (files.Keys[i].Split('_')[0].ToString() == "voter")
                            {
                                voter_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                            else if (files.Keys[i].Split('_')[0].ToString() == "pan")
                            {
                                pan_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                            else if (files.Keys[i].Split('_')[0].ToString() == "passport")
                            {
                                passport_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                            else if (files.Keys[i].Split('_')[0].ToString() == "driving")
                            {
                                driving_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                            else if (files.Keys[i].Split('_')[0].ToString() == "bank")
                            {
                                bank_bytes = br.ReadBytes((Int32)file.InputStream.Length);
                                empid = files.Keys[i].Split('_')[1].ToString();
                            }
                        }

                    }
                }

                if (img_save == 1)
                {
                    //clsMain objMain = new clsMain();
                    SqlParameter[] objParam = new SqlParameter[8];


                    objParam[0] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
                    objParam[0].Direction = ParameterDirection.Input;
                    objParam[0].Value = empid;


                    objParam[1] = new SqlParameter("@EmpPhotoImage", SqlDbType.VarBinary);
                    objParam[1].Direction = ParameterDirection.Input;
                    objParam[1].Value = profile_bytes;


                    objParam[2] = new SqlParameter("@AdharNoImage", SqlDbType.VarBinary);
                    objParam[2].Direction = ParameterDirection.Input;
                    objParam[2].Value = adhar_bytes;

                    objParam[3] = new SqlParameter("@VoterImage", SqlDbType.VarBinary);
                    objParam[3].Direction = ParameterDirection.Input;
                    objParam[3].Value = voter_bytes;

                    objParam[4] = new SqlParameter("@PanNoImage", SqlDbType.VarBinary);
                    objParam[4].Direction = ParameterDirection.Input;
                    objParam[4].Value = pan_bytes;

                    objParam[5] = new SqlParameter("@PassportImage", SqlDbType.VarBinary);
                    objParam[5].Direction = ParameterDirection.Input;
                    objParam[5].Value = passport_bytes;

                    objParam[6] = new SqlParameter("@DrivingNoImage", SqlDbType.VarBinary);
                    objParam[6].Direction = ParameterDirection.Input;
                    objParam[6].Value = driving_bytes;

                    objParam[7] = new SqlParameter("@BankImage", SqlDbType.VarBinary);
                    objParam[7].Direction = ParameterDirection.Input;
                    objParam[7].Value = bank_bytes;

                    var result1 = objMain.ExecuteProcedure("procHrEmpUpdateEmplyeeImages", objParam);
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
    

    

}
