
using ClosedXML.Excel;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Linq.Expressions;


namespace BizzManWebErp
{
    /// <summary>
    /// Summary description for FileSurveyUploadHandler
    /// </summary>
    public class FileSurveyUploadHandler : IHttpHandler
    {
        static clsMain objMain;
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpPostedFile file = context.Request.Files["file"];
                    if (file != null && (Path.GetExtension(file.FileName).ToLower() == ".xlsx" || Path.GetExtension(file.FileName).ToLower() == ".xls"))
                    {
                        // Process the file in-memory using ClosedXML
                        using (XLWorkbook workbook = new XLWorkbook(file.InputStream))
                        {
                            IXLWorksheet worksheet = workbook.Worksheet(1); // Get the first worksheet
                            DataTable dataTable = new DataTable();

                            bool firstRow = true;
                            foreach (IXLRow row in worksheet.RowsUsed())
                            {
                                if (firstRow)
                                {
                                    // Create columns for the DataTable based on the header row
                                    foreach (IXLCell cell in row.Cells())
                                    {
                                        dataTable.Columns.Add(cell.Value.ToString());
                                    }
                                    firstRow = false;
                                }
                                else
                                {
                                    // Add data rows to the DataTable
                                    DataRow dataRow = dataTable.NewRow();
                                    int columnIndex = 0;
                                    foreach (IXLCell cell in row.Cells())
                                    {
                                        dataRow[columnIndex++] = cell.Value.ToString();
                                    }
                                    dataTable.Rows.Add(dataRow);
                                }
                            }

                            // Now insert the data into the SQL database
                            InsertDataTableIntoSql(dataTable);
                        }
                    }
                    else
                    {
                        context.Response.Write("Invalid file format. Please upload an Excel file.");
                    }
                }
                else
                {
                    context.Response.Write("No file uploaded.");
                }
            }
            catch (Exception ex)
            {
                context.Response.Write("Error: " + ex.Message);
            }
        }

        private void InsertDataTableIntoSql(DataTable dataTable)
        {
            
            clsMain mainClass = new clsMain();
            try
            { 
                if (!mainClass.gblConHoStatus)
                {
                    // Assuming you are already calling clsMain before this step to initialize the connection
                    throw new InvalidOperationException("Database connection is not open.");
                }
                //SqlParameter[] objParam = new SqlParameter[8];
                //if(objMain.gblConHoStatus)
                foreach (DataRow row in dataTable.Rows)
                {
                    // Build your insert command dynamically
                    string insertCommand = "INSERT INTO tblPmSurveyTable (";
                    string valuesPart = "VALUES (";
                    //SqlCommand sqlCommand = new SqlCommand();
                    for (int i = 0; i < dataTable.Columns.Count; i++)
                    {
                        insertCommand += $"[{dataTable.Columns[i].ColumnName}],";
                        valuesPart += $"@Value{i},";

                    }
                    insertCommand = insertCommand.TrimEnd(',') + ") ";
                    valuesPart = valuesPart.TrimEnd(',') + ")";
                    string strSQL = insertCommand + valuesPart;
                    using (SqlCommand command = new SqlCommand(strSQL, mainClass.conHo))
                    {
                        for (int i = 0; i < dataTable.Columns.Count; i++)
                        {
                            command.Parameters.AddWithValue($"@Value{i}", row[i]);
                        }

                        command.ExecuteNonQuery(); // Execute the insert query
                    }                    
                }
            }
            catch (Exception ex)
            {
                // Handle exception
                // You can log the exception or handle it in a way that suits your application
                Console.WriteLine($"Error: {ex.Message}");
            }
        
            //}
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