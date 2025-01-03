<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpAttendance.aspx.cs" Inherits="BizzManWebErp.wfHrEmpAttendance" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/EmployeeAttendance.js"></script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmployeeAttendance();">Create</button>
    <button onclick="ViewEmployeeAttendanceList();">View</button>
    <button onclick="AddEmployeeAttendance();" style="display: none;" id="btnSave">Save</button>
    <button onclick="SearchEmployeeAttendance();" id="btnSearch">Search</button>

    <div class="container" id="divEmployeeAttendanceList" style="margin-top: 10px; overflow: auto;">
        <table class="tbl">
<tr>
    <td>
                                    <label class="control-label">Day</label>
                                </td>
    <td>
        <select id="ddlDay" name="ddlDay" class="form-control" >
            <option value="">-Select Day-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
                                    </select>
    </td>
    <td>
                                    <label class="control-label">Month</label>
                                </td>
    <td>
        <select id="ddlMonth" name="ddlMonth" class="form-control" >
            <option value="">-Select Month-</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
                                    </select>
    </td>
    <td>
                                    <label class="control-label">Year</label>
                                </td>
    <td>
        <input type="number" class="form-control" id="txtYear" name="txtYear" runat="server" />
    </td>
    <td>
                                    <label class="control-label">Employee</label>
                                </td>
    <td>
        <select id="ddl_Employee" name="ddl_Employee" class="form-control" >
            <option value="">-Select Employee-</option>
        </select>
    </td>
</tr>
        </table>
        <table id="tblEmployeeAttendanceList" class="display">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Entry Date</th>
                    <th>Attendance</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody id="tbody_Employee_AttendanceList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeAttendanceEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Employee Attendance
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl" id="tbl_entry">
                            <tr>
                                <td>
                                    <label class="control-label">Attendance Type</label>
                                </td>
                                <td colspan="3">
                                    <fieldset>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendanceType" value="1" checked="checked" />Individual
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendanceType" value="2" />All
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendanceType" value="3" />Import Excel File
                                        </label>
                                    </fieldset>
                                </td>

                            </tr>
                            <tr class="individual_entry">
                                <td>
                                    <label class="control-label">Attendance Date *</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" onchange="ShowEmployeeAttendance();" id="txtAttendanceDate" name="txtAttendanceDate" />
                                </td>
                                <td>
                                    <label class="control-label">Attendance Time *</label>
                                </td>
                                <td>
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="txtAttendanceTime" name="txtAttendanceTime" type="text" class="form-control input-small" readonly="readonly">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                    
                                </td>
                            </tr>

                            <tr class="individual_entry">
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" onchange="BindEmployeeDropdown('1','ddlEmployee');">
                                    </select>
                                </td>
                                <td class="Individual">
                                    <label class="control-label">Emp Id *</label>
                                </td>
                                <td class="Individual">
                                    <select id="ddlEmployee" name="ddlEmployee" class="form-control" style="width: 100%!important;" onchange="ShowEmployeeName();">
                                    <option value="">-Select Employee-</option>
                                    </select>
                                </td>
                            </tr>

                            <tr class="Individual individual_entry">
                                <td>Emp Name</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtEmpName" name="txtEmpName" readonly="readonly" />
                                </td>
                            </tr>
                            <tr class="individual_entry">
                                <td>
                                    <label class="control-label">Attendance *</label>
                                </td>
                                <td colspan="3">
                                    <fieldset>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="Present" />Present
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="CL" />CL
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="EL" />EL
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="LOP" />LOP
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="Absconding" />Absconding
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="EL" />Left
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="Holiday" />Holiday
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="2nd Saturday" />2nd Saturday
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="4th Saturday" />4th Saturday
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="Sunday" />Sunday
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAttendance" value="Delete" />Delete
                                        </label>
                                    </fieldset>
                                </td>

                            </tr>
                            <tr class="individual_entry">
                                <td>
                                    <label class="control-label">Reason</label>
                                </td>
                                <td>
                                    <select id="ddlReason" name="ddlReason" class="form-control">
                                        <option value="NA">-Select Reason-</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </td>
                                </tr>
                            <tr id="tr_upload" style="display:none;">
                        <td><label class="control-label">Upload File</label></td>
                        <td colspan="3"><input type="file" id="AttendanceUpload" class="form-control" accept=".xlsx" /></td>
                    </tr>
                        </table>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divAttendanceListDateWise" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Employee Attendance Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblAttendanceListDateWise" class="display">
                            <thead>
                                <tr>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Entry Date</th>
                                    <th>Attendance</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_AttendanceListDateWise">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
