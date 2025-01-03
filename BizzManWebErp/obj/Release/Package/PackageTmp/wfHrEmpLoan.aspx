<%@ Page Title="Employees Loan Master" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpLoan.aspx.cs" Inherits="BizzManWebErp.wfHrEmpLoan" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    
    <script src="Scripts/HrEmpJobAssign.js"></script>

    <style>
        .dcmlNo{
            font-size:18px;
        }

    </style>

    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>  
</asp:Content>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmpJob();">Create</button>
    <button onclick="ViewEmpJobList();">View</button>
    <button onclick="AddEmpJob();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divEmpJobList" style="margin-top: 10px; overflow: auto;">
            <div id="dataTable_wrapper"></div>  
        <table id="tblEmpJobList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>EmpId</th>
                    <th>Emp Job Master Id</th>
                    <th>Job Assig nDate</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List">
            </tbody>
        </table>
    </div>


     <div class="container" id="divEmpJobEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Employees Loan</b>
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
                                    <select id="ddlEmployee" name="ddlEmployee" class="form-control" style="width: 100%!important;" onchange="ShowEmployeeName();">
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
                                <td style="width: 10%;">ID</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                </td>
                                <td>
                                    <label class="control-label">Year</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlYear" name="ddlYear" class="form-control rounded border-dark">
                                        <option value="">-Select Year-</option>
                                    </select>
                                </td>                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Month</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMonth" name="ddlMonth" class="form-control rounded border-dark">
                                        <option value="">-Select Month-</option>
                                    </select>
                                </td>
                                 <td>
                                    <label class="control-label">Loan Application Amount *</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtLoanAppAmt" name="txtLoanAppAmt" />
                                </td>                                
                            </tr>
                            <tr>
                                <td style="width: 15%;">Application Date </td>
                                <td>
                                   <input type="date" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtLoanAppDate" name="txtLoanAppDate" />
                                </td>
                                 <td>
                                    <label class="control-label">Loan Approve Amount</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtLoanApproveAmt" name="txtLoanApproveAmt" />
                                </td>
                            </tr>
                           <tr>
                                <td style="width: 15%;">Loan Approve Date</td>
                                <td>
                                   <input type="date" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtLoanApproveDate" name="txtLoanApproveDate" />
                                </td>
                                <td>
                                    <label class="control-label">EMI Amount</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtEmiAmt" name="txtEmiAmt" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">EMI Integrated With Salary</td>
                                <td>
                                <select style="width: 100%;" id="ddlEmiIntegratedWithSalary" name="ddlEmiIntegratedWithSalary" class="form-control rounded border-dark">
                                        <option value="">-Select EMI Integrated Y/N -</option>
                                        <option value="y">y</option>
                                        <option value="n">n</option>
                                </select>                             
                                </td>
                                <td>
                                    <label class="control-label">Loan Balance Amount</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtLoanBalanceAmt" name="txtLoanBalanceAmt" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Loan Approved</td>
                                <td>                              
                                <select style="width: 100%;" id="ddlLoanApprove" name="ddlLoanApprove" class="form-control rounded border-dark">
                                        <option value="">-Select Loan Approve Y/N -</option>
                                        <option value="y">y</option>
                                        <option value="n">n</option>
                                </select>                                               
                                </td>
                                 <td style="width: 15%;">Loan Approve By </td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobAssignEmpName" name="txtJobAssignEmpName" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Description </label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobDescription" name="txtLoanDescription" />
                                </td>        
                                <td>
                                    <label class="control-label">Loan Disburse </label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtLoanDisburse" name="txtLoanDisburse" />
                                </td>                               
                            </tr>

                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
