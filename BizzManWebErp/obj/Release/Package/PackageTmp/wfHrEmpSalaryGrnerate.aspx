<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpSalaryGrnerate.aspx.cs" Inherits="BizzManWebErp.wfHrEmpSalaryGrnerate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/EmployeeSaleryGenerate.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmployeeSaleryGenerate();">Create</button>
    <button onclick="ViewEmployeeSaleryGenerateList();">View</button>
    <button onclick="AddEmployeeSaleryGenerate();" style="display: none;" id="btnSave">Save</button>
    <button onclick="SearchEmployeeSaleryGenerate();" id="btnSearch">Search</button>
    <button  id="btnDelete">Delete</button>
   
    <div class="container" id="divEmployeeSaleryGenerateList" style="margin-top: 10px; overflow: auto;">
        <table class="tbl">
            <tr>
                <td>
                    <label class="control-label">Branch</label>
                </td>
                <td>
                    <select id="ddl_Branch" name="ddl_Branch" class="form-control" onchange="BindEmployeeDropdown(0);">
                        <option value="">-Select Branch-</option>
                    </select>
                </td>
                <td>
                    
                    <label class="control-label">Month</label>
                </td>
                <td>
                    <select id="ddlMonth" name="ddlMonth" class="form-control">
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
                    <input type="number" class="form-control" id="txtYear" name="txtYear"/>
                </td>
                <td>
                    <label class="control-label">Employee</label>
                </td>
                <td>
                    <select id="ddl_Employee" name="ddl_Employee" class="form-control">
                        <option value="">-Select Employee-</option>
                    </select>
                </td>
            </tr>
        </table>
        <table id="tblEmployeeSalaryGenerateList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total Day</th>
                    <th>Earn Day</th>
                    <th>Day Present</th>
                    <th>CL</th>
                    <th>EL</th>
                    <th>LOP</th>
                    <th>Sunday</th>
                    <th>Holiday</th>
                    <th>Total 2nd Saturday</th>
                    <th>Total 4th Saturday</th>
                    <th>Gross Rate</th>
                    <th>Basic Rate</th>
                    <th>Basic Pay</th>
                    <th>Da %</th>
                    <th>Da Amt</th>
                    <th>Hra %</th>
                    <th>Hra Amt</th>
                    <th>TA Perday</th>
                    <th>TA Total</th>
                    <th>MedicalAllow PerDay</th>
                    <th>MedicalAllow Total</th>
                    <th>UniformAllow PerMonth</th>
                    <th>Other Allownce</th>
                    <th>SPLAL %</th>
                    <th>SPLAL Amt</th>
                    <th>EDUAL %</th>
                    <th>EDUAL Amt</th>
                    <th>Mobile Allowance %</th>
                    <th>Mobile Allowance Amt</th>
                    <th>LTA %</th>
                    <th>LTA Amt</th>
                    <th>STIP %</th>
                    <th>STIP Amt</th>
                    <th>Bonus %</th>
                    <th>Bonus Amt</th>
                    <th>GROSS TOTAL</th>
                    <th>Gratuity %</th>
                    <th>Gratuity Amt</th>
                    <th>PF Employer %</th>
                    <th>PF Employer Value</th>
                    <th>PF Employees %</th>
                    <th>PF Employees Value</th>
                    <th>Admin Charges %</th>
                    <th>Admin Charges Amount</th>
                    <th>ESI Employer %</th>
                    <th>ESI Employer Value</th>
                    <th>ESI Employees %</th>
                    <th>ESI Employees Value</th>
                    <th>PT</th>
                      <th>Loan Application Id</th>
                      <th>Loan EMI Amount</th>
                    <th>Net Pay</th>
                    <th>Salary Approve</th>
                    <th>Salary Payment</th>
                      
                </tr>
            </thead>
            <tbody id="tbody_Employee_SalaryGenerateList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeSaleryGenerateEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Employee Salary Generate
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl" id="tbl_entry">
                            <tr>
                                <td>
                                    <label class="control-label">Salary Generate Type</label>
                                </td>
                                <td colspan="3">
                                    <fieldset>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioSalaryGenerateType" value="0" checked="checked" />Individual
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioSalaryGenerateType" value="1" />All
                                        </label>
                                    </fieldset>
                                </td>

                            </tr>


                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control"  onchange="BindEmployeeDropdown(1);">
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

                            <tr>
                                <td><label class="control-label">Emp Name</label></td>
                                <td>
                                    <input type="text" class="form-control" id="txtEmpName" name="txtEmpName" readonly="readonly" />
                                </td>
                                <td><label class="control-label">Salary Tpe</label></td>
                                <td>
                                    <select id="ddlSalaryType" name="ddlSalaryType" class="form-control">
                                        <option value="">-Select Salary Type-</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Wages">Wages</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Month *</label>
                                </td>
                                <td>
                                    <select id="ddl_Month" name="ddl_Month" class="form-control">
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
                                    <label class="control-label">Year *</label>
                                </td>
                                <td>
                                    <input type="number" class="form-control" id="txt_Year" name="txt_Year" />
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
