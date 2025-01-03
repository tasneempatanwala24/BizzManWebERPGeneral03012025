<%@ Page Title="Employee OT" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpOtEntry.aspx.cs" Inherits="BizzManWebErp.wfHrEmpOtEntry" %>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-datepicker3.css" rel="stylesheet" />
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="Scripts/HrEmpOtEntry.js"></script>
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

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateData();">Create</button>
    <button onclick="ViewDataList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">
            <div id="dataTable_wrapper"></div>  
        <table id="tblEmpOTList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Branch Name</th>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total OT Hours</th>
                    <th>Total OT</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpOT_List">
            </tbody>
        </table>
    </div>
   <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>OT Entry </b>
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
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
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
                                <td style="width: 15%;">Total OT *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtTotalOT" name="txtTotalOT" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">OT Date *</td>
                                <td>
                                   <div class="input-group date">
                                        <input type="text" class="form-control rounded border-dark" id="txtOTDate" name="txtOTDate">
                                        <div class="input-group-addon">
                                            <span class="fa fa-calendar datepicker"></span>
                                        </div>
                                    </div>
                                </td>   
                                  <td style="width: 15%;">Total OT Hours</td>
                                     <td>
                                        <div class="input-group date">
                                             <input type="text" class="form-control rounded border-dark" id="txtTotalHours" name="txtTotalHours" readonly>
                                        </div>
                                     </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">OT Hours</td>
                                   <td>
                                      <div class="input-group date">
                                           <input type="text" class="form-control rounded border-dark" id="txtHours" name="txtHours">
                                      </div>
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
                                <th>Hours</th>
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
