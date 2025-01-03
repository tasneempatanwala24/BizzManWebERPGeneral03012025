<%@ Page Title="Employee Loan Master" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpLoanApplicationMaster.aspx.cs" Inherits="BizzManWebErp.wfHrEmpLoanApplicationMaster" %>

<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-datepicker3.css" rel="stylesheet" />
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="Scripts/HrEmpLoanApplicationMaster.js"></script>
    <style>
        .button {
            background-color: #7952b3;
            border: none;
            border-radius: 3px;
            color: #fff;
            padding: 7px;
            margin-left: 10px;
            text-decoration: none;
            cursor: pointer;
        }

            .button:hover {
                color: #fff;
            }
    </style>
</asp:Content>



<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateData();">Create</button>
    <button onclick="ViewDataList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>
    <input id="fuImg" type="file" onchange="readURL(this)" src="Images/fileupload.png" style="display: none;" accept="image/x-png,image/jpeg,image/jpg" />
    <button onclick="document.getElementById('fuImg').click()" style="display: none;" id="btnUploadFile">Upload File</button>
    <a style="display: none;" id="btnViewFile" class="button" onclick="ViewFile()">View File</a>
    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">
        <div id="dataTable_wrapper"></div>
        <table id="tblEmpLoanList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <%--<th>View</th>--%>
                    <th>Id</th>
                    <th>Branch Name</th>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Loan Application Amount</th>
                    <th>Loan Approve Amount</th>
                    <th>Emi Amount</th>
                    <th>Loan Status</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpLoan_List">
            </tbody>
        </table>
    </div>


    <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Employees Loan </b>
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
                                    <select style="width: 100%;" id="ddlBranch" name="ddlBranch" class="form-control rounded border-dark">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Emp Id *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlEmployee" name="ddlEmployee" class="form-control rounded border-dark">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Emp Name</td>
                                <td colspan="3">
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtEmpName" name="txtEmpName" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 10%;">ID</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="LoanApplicationId" name="LoanApplicationId" />
                                </td>
                                <td>
                                    <label class="control-label">Year *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlYear" name="ddlYear" class="form-control rounded border-dark">
                                        <option value="">-Select Year-</option>
                                    </select>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Month *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMonth" name="ddlMonth" class="form-control rounded border-dark">
                                        <option value="">-Select Month-</option>
                                    </select>
                                </td>
                                <td style="width: 15%;">Loan Application Amount *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtLoanApplicationAmount" name="txtLoanApplicationAmount" placeholder="0.00" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Application Date *</td>
                                <td>
                                    <div class="input-group date">
                                        <input type="text" class="form-control rounded border-dark" id="txtLoanApplicationDate" name="txtLoanApplicationDate">
                                        <div class="input-group-addon">
                                            <span class="fa fa-calendar datepicker"></span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <label class="control-label">Loan Status </label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlLoanStatus" name="ddlLoanStatus" class="form-control rounded border-dark">
                                        <option value="">-Select Loan Status-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Loan Approve Date</td>
                                <td>
                                    <div class="input-group date">
                                        <input type="text" class="form-control rounded border-dark" id="txtApproveDate" name="txtApproveDate">
                                        <div class="input-group-addon">
                                            <span class="fa fa-calendar datepicker"></span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <label class="control-label">Loan Approve Amount</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtApproveAmount" name="txtApproveAmount" placeholder="0.00" />

                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">EMI Integrated With Salary</td>
                                <td>
                                    <select style="width: 100%;" id="ddlEmiIntegratedsalary" name="ddlEmiIntegratedsalary" class="form-control rounded border-dark">
                                        <option value="">-Select EMI Integrated With Salary-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">EMI Amount</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtEMIAmount" name="txtEMIAmount" placeholder="0.00" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Loan Balance Amount</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtLoanBalanceAmount" name="txtLoanBalanceAmount" />
                                </td>
                                <td>
                                    <label class="control-label">Loan Approve By</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtLoanApproveBy" name="txtLoanApproveBy" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Description</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" />
                                </td>
                                <td>
                                    <label class="control-label">Loan Disburse</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlDisburse" name="ddlDisburse" class="form-control rounded border-dark">
                                        <option value="">-Select Loan Disburse-</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
