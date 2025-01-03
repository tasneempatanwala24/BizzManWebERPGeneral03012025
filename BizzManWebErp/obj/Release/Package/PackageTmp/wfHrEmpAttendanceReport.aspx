<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpAttendanceReport.aspx.cs" Inherits="BizzManWebErp.wfHrEmpAttendanceReport" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/table2excel.js"></script>
    <script src="Scripts/HrEmpAttendanceReport.js"></script>
  <style>
    /* Optional: Add custom styles */
    /* Add border to all cells */
    .table-bordered{
        border-collapse:collapse;
    }
    .table-bordered th,
    .table-bordered td {
      border: 1px solid #dee2e6;
      
    }
    /* Add border to table header cells */
    .table-bordered thead th {
      border: 1px solid #dee2e6;
    }
    /* Add border to table body cells */
    .table-bordered tbody td {
      border: 1px solid #dee2e6;
    }
    /* Add border to table footer cells */
    .table-bordered tfoot th,
    .table-bordered tfoot td {
      border: 1px solid #dee2e6;
    }
    
  </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    
    <button onclick="SearchEmpAttendanceList();" id="btnSearch">Search</button>
    <button id="btnExportExcel" style="display:none;">Export Excel</button>
    
    
    <div class="container" id="divEmpAttendanceList" style="margin-top: 10px; overflow: auto;">
    <table class="tbl">
    <tr>
         <td>
             <label class="control-label">Year</label>
         </td>
         <td>
             <select id="txtYear" name="txtYear" class="form-control">
                 <option value="">-Select Year-</option>
             </select>
         </td>
        <td>

            <label class="control-label">Month</label>
        </td>
        <td>
                <select id="ddlMonth" name="ddlMonth" class="form-control">
                    <option value="">-Select Month-</option>
                </select>
        </td>
        <td>
            <label class="control-label">Branch</label>
        </td>
        <td>
            <select id="ddlBranch" name="ddlBranch" class="form-control">
                <option value="">-Select Branch-</option>
            </select>
        </td>
         <td>
             <label class="control-label">Employee</label>
         </td>
         <td>
             <select id="ddlEmployee" name="ddlEmployee" class="form-control">
                 <option value="">-Select Employee-</option>
             </select>
         </td>
      <%-- <td>
            <label class="control-label">Emp Id</label>
        </td>
        <td>
            <input class="form-control" id="txtEmpId" name="txtEmpId" style="width: 100px;" />
        </td>--%>
        
        
       
        
    </tr>
</table>
    <div class="card">
        <div class="card-header">
            Employee Attendance Report
        </div>
        <div class="card-body">
            <div class="panel panel-default">
                <div class="panel-body">
                    <table id="tblEmployeeList" class="display">
                        <thead>
                            <tr><th>Branch Name</th><th>Emp Id</th><th>Emp Name</th><th>Year</th><th>Month</th>
                                <th>Present</th><th>CL</th><th>EL</th><th>LOP</th>
                                <th>Absconding</th><th>Left</th><th>Holiday</th><th>2nd Saturday</th><th>4th Saturday</th><th>Sunday</th>
                            </tr>
                        </thead>
                        <tbody id="tbody_Employee">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


</asp:Content>
