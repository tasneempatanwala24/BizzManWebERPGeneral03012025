<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpKpi.aspx.cs" Inherits="BizzManWebErp.wfHrEmpKpi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/HrEmpKpi.js"></script>
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmployeeTransection();">Create</button>
    <button onclick="ViewEmployeeTransectionList();">View</button>
    <button onclick="AddEmployeeTransection();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divEmployeeTransectionList" style="margin-top: 10px; overflow: auto;">
        <table id="tblEmployeeTransectionList" class="display">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>BranchCode</th>
                    <th>BranchName</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>KpiGroupName</th>
                    <th>KpiSubGroupName</th>
                    <th>Goal-Objective</th>
                    <th>Target</th>
                    <th>SelfAssessment</th>
                    <th>ManagerialAssessment</th>
                    <th>Actual</th>
                    <th>KpiGrade</th>
                </tr>
            </thead>
            <tbody id="tbody_Employee_TransactionList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeTransactionEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Employee KPI
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" onchange="BindEmployeeDropdown();">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Emp Id *</label>
                                </td>
                                <td>
                                    <select id="ddlEmployee" name="ddlEmployee" class="form-control" style="width: 100%!important;" onchange="ShowEmployeeTransaction();">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Emp Name</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtEmpName" name="txtEmpName" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">KPI Group *</label>
                                </td>
                                <td>
                                    <select id="ddlKpiGroup" name="ddlKpiGroup" class="form-control" onchange="BindKpiSubGroupDropdown();">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">KPI Sub Group *</label>
                                </td>
                                <td>
                                    <select id="ddlKpiSubGroup" name="ddlKpiSubGroup" class="form-control" onchange="BindKpiGoalObjectiveDropdown();">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Goal Objective *</td>
                                <td colspan="3">
                                    <select id="ddlKpiGoalObjective" name="ddlKpiGoalObjective" class="form-control">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    <label class="control-label">Year *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlYear" name="ddlYear" class="form-control rounded border-dark">
                                        <option value="">-Select Year-</option>
                                    </select>
                                </td>                                
                                 <td>
                                    <label class="control-label">Month *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMonth" name="ddlMonth" class="form-control rounded border-dark">
                                        <option value="">-Select Month-</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label class="control-label">Self Assesment</label>
                                </td>
                                <td>
                                     <input type="text" class="form-control" id="txtSelfAssesment" name="txtSelfAssesment" maxlength="200" />
                                </td>
                                <td>
                                    <label class="control-label">Managerial Assesment *</label>
                                </td>
                                <td>
                                    <select id="ddlManaerialAssesment" name="ddlManaerialAssesment" class="form-control" >
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Note </td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtNote" name="txtNote" maxlength="200" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divTransectionListEmployeeWise" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Employee KPI Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblTransectionListEmployeeWise" class="display">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Group Name</th>
                                    <th>Sub Group Name</th>
                                    <th>Goal Objective</th>
                                    <th>Target</th>
                                    <th>SelfAssessment</th>
                                    <th>ManagerialAssessment</th>
                                    <th>Actual</th>
                                    <th>KpiGrade</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_TransectionListEmployeeWise">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
