<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpOtherAllowance.aspx.cs" Inherits="BizzManWebErp.wfHrEmpOtherAllowance" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script src="Scripts/HrEmpOtherAllowance.js"></script>
    <style>
        .table.dataTable {
        border-collapse: collapse;
    }

    #tblEmpOTDetailList_length { display: none; }
    #tblEmpOTDetailList_filter { display: none; }
    #tblEmpOTDetailList_info { display: none; }
    #tblEmpOTDetailList_paginate { display: none; }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEntry();">Create</button>
    <button onclick="ViewList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>
    <button id="exportExcel" onclick="exportToExcel();">Export Excel</button>
    <div class="container" id="divList" style="margin-top: 10px; overflow: auto;">
       
        <table id="tblList" class="display">
            <thead>
                <tr>
                    <th style="display:none;"></th>
                    <th style="white-space: nowrap;">Branch</th>
                    <th style="white-space: nowrap;">Employee Id</th>
                    <th style="white-space: nowrap;">Employee Name</th>
                    <th style="white-space: nowrap;">Year</th>
                    <th style="white-space: nowrap;">Month</th>
                    <th style="white-space: nowrap;">Total Other Allowance</th>
                </tr>
            </thead>
            <tbody id="tbody_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Other Allowance    
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl" id="tbl_entry">
                            <tr>
                                <td>
                                    <label class="control-label">Allowance Type *</label>
                                </td>
                                <td>
                                    <fieldset>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAllowanceType" value="1" checked="checked" />Individual
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioAllowanceType" value="2" />All
                                        </label>
                                    </fieldset>
                                </td>
                                 <td>
                                     <label class="control-label">Allowance Date *</label>
                                 </td>
                                 <td>
                                     <input type="date" class="form-control" id="txtAllowanceDate" name="txtAllowanceDate" />
                                 </td>
                            </tr>                            
                            <tr>
                                <td>
                                     <label class="control-label">Year </label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtYear" name="txtYear" readonly="readonly"/>
                                   <%--<select id="ddlYear" name="ddlYear" class="form-control">
                                       <option value="">-Select Year-</option>
                                    </select>--%>
                                 </td>
                                <td>
                                     <label class="control-label">Month </label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtMonth" name="txtMonth" readonly="readonly"/>
                                   <%--<select id="ddlMonth" name="ddlMonth" class="form-control">
                                       <option value="">-Select Month-</option>
                                    </select>--%>
                                 </td>
                                
                                                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" onchange="BindEmployeeDropdown();">
                                    </select>
                                </td>
                                <td class="Individual">
                                    <label class="control-label">Emp Id</label>
                                </td>
                                <td class="Individual">
                                    <select id="ddlEmployee" name="ddlEmployee" class="form-control" style="width: 100%!important;" onchange="ShowEmployeeName();">
                                        <option value="">-Select Employee-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr class="Individual">  
                                <td>Emp Name</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtEmpName" name="txtEmpName" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Amount *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control dcmlNo" id="txtAmount" name="txtAmount" 
                                     placeholder="please enter amount"/>
                                </td>
                                <td class="Individual">
                                    <label class="control-label">Total Amount</label>
                                </td>
                                <td class="Individual">
                                    <input type="text" class="form-control dcmlNo" id="txtTotalAmount" name="txtTotalAmount" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Reason</label>
                                </td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtReason" name="txtReason" placeholder="please enter reason"/>
                                </td>
                            </tr>
                        </table>
                            <div style="height:25px;"></div>
                                <div class="container" id="divDetailDataList">
                                <table id="tblEmpOTDetailList" class="table table-bordered table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Month</th>
                                            <th>Day</th>
                                            <th>Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody_EmpOTDetail_List">
                                    </tbody>
                                    </table>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</asp:Content>
