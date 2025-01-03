<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpMasterTransection.aspx.cs" Inherits="BizzManWebErp.wfHrEmpMasterTransection" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/EmployeeTransaction.js"></script>
    
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
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Transaction Date</th>
                    <th>From Branch</th>
                    <th>To Branch</th>
                    <th>Action</th>
                    <th>Transaction Note</th>
                </tr>
            </thead>
            <tbody id="tbody_Employee_TransactionList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeTransactionEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Employee Transaction
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
                                    <label class="control-label">Emp Id</label>
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
                                    <label class="control-label">From Branch</label>
                                </td>
                                <td>
                                    <select id="ddlFromBranch" name="ddlFromBranch" class="form-control" disabled="disabled">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">To Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlToBranch" name="ddlToBranch" class="form-control">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Action *</label>
                                </td>
                                <td>
                                    <select id="ddlAction" name="ddlAction" class="form-control">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Action Date</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtActionDate" name="txtActionDate" />
                                </td>
                            </tr>
                            <tr>
                                <td>Note *</td>
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
                Employee Transaction Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblTransectionListEmployeeWise" class="display">
                            <thead>
                                <tr>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
                                    <th>Transaction Date</th>
                                    <th>From Branch</th>
                                    <th>To Branch</th>
                                    <th>Action</th>
                                    <th>Transaction Note</th>
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
