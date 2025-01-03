<%@ Page Title="Employees Job Master" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpJobAssign.aspx.cs" Inherits="BizzManWebErp.wfHrEmpJobAssign" %>
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
                <b>Employees Job Assign</b>
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
                                    <label class="control-label">Job *</label>
                                </td>
                                <td>
                                    <select id="ddlJob" name="ddlJob" class="form-control" style="width: 100%!important;" onchange="ShowJobRate();">
                                        <option value="">-Select Job-</option>
                                    </select>
                                </td>                                
                            </tr>
                            <tr>
                                <td style="width: 15%;">Job Rate</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobRate" name="txtJobRate" />
                                </td>
                                 <td>
                                    <label class="control-label">Job Assign Date</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobAssignDate" name="txtJobAssignDate" />
                                </td>
                            </tr>
                           <tr>
                                <td style="width: 15%;">Job Assign Time</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobAssignTime" name="txtJobAssignTime" />
                                </td>
                                <td>
                                    <label class="control-label">Job Status</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobStatus" name="txtJobStatus" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Salary Effect</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtEffectSalary" name="txtEffectSalary" />
                                </td>
                                <td>
                                    <label class="control-label">Job Assign By *</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobAssignEmpId" name="txtJobAssignEmpId" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Job Approved</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobApproved" name="txtJobApproved" />
                                </td>
                                 <td style="width: 15%;">Job Assign Name</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobAssignEmpName" name="txtJobAssignEmpName" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Job Description *</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobDescription" name="txtJobDescription" />
                                </td>                               
                            </tr>

                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
