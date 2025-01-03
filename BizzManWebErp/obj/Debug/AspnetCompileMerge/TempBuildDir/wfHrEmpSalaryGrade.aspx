<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpSalaryGrade.aspx.cs" Inherits="BizzManWebErp.wfHrEmpSalaryGrade" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/EmployeeSalaryGrade.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmployeeSalaryGrade();">Create</button>
    <button onclick="ViewEmployeeSalaryGradeList();">View</button>
    <button onclick="AddEmployeeSalaryGrade();" style="display: none;" id="btnSave">Save</button>


    <div class="container" id="divEmployeeSalaryGradeList" style="margin-top: 10px; overflow: auto;">

        <table id="tblEmployeeSalaryGradeList" class="display">
            <thead>
                <tr>
                    <th>Grade Name</th>
                    <th>Basic (Rs.)</th>
                    <th>DA (%)</th>
                    <th>HRA (%)</th>
                    <th>Conveyance (%)</th>
                    <th>Medical (%)</th>
                    <th>PF</th>
                    <th>ESI</th>
                    <th>PTax</th>
                    <th>TDS</th>
                    <th>CL</th>
                    <th>EL</th>
                    <th>ML</th>
                </tr>
            </thead>
            <tbody id="tbody_Employee_SalaryGradeList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeSalaryGradeEntry" style="margin-top: 10px; display: none;">
        <div class="card">
            <div class="card-header">
                Add Employee Salary Grade
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl" id="tbl_entry">

                            <tr>
                                <td>
                                    <label class="control-label">ID</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtID" name="txtID" readonly="readonly" />
                                </td>
                                <td>
                                    <label class="control-label">Grade Name *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtGrade" name="txtGrade" maxlength="100" />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label class="control-label">Basic (Rs.) *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control dcmlNo" id="txtBasic" name="txtBasic" />
                                </td>
                                <td>
                                    <label class="control-label">DA (%)</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control dcmlNo" id="txtDA" name="txtDA" />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label class="control-label">HRA (%)</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control dcmlNo" id="txtHRA" name="txtHRA" />
                                </td>
                                <td>
                                    <label class="control-label">Conveyance (%)</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control dcmlNo" id="txtConveyance" name="txtConveyance" />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label class="control-label">Medical (%)</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control dcmlNo" id="txtMedical" name="txtMedical" />
                                </td>

                            </tr>
                            <tr>
                                <td colspan="4">
                                    <table class="tbl">
                                        <tr>
                                            <td>
                                                <fieldset>
                                                    <legend>PF</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioPF" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioPF" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                            <td>
                                                <fieldset>
                                                    <legend>ESI</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioESI" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioESI" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                            <td>
                                                <fieldset>
                                                    <legend>PTax</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioPTax" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioPTax" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                            <td>
                                                <fieldset>
                                                    <legend>TDS</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioTDS" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioTDS" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="4">
                                    <table class="tbl">
                                        <tr>
                                            <td>
                                                <fieldset>
                                                    <legend>CL</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioCL" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioCL" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                            <td>
                                                <fieldset>
                                                    <legend>EL</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioEL" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioEL" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                            <td>
                                                <fieldset>
                                                    <legend>ML</legend>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioML" value="Y" checked="checked" />Yes
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="radio" name="optradioML" value="N" />No
                                                    </label>
                                                </fieldset>
                                            </td>
                                            <td style="width: 25%;"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label class="control-label">Description</label>
                                </td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtDescription" name="txtDescription" maxlength="500" />
                                </td>

                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
