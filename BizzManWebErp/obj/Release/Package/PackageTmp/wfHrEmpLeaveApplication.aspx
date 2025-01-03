<%@ Page Title="Employee Leave" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpLeaveApplication.aspx.cs" Inherits="BizzManWebErp.wfHrEmpLeaveApplication" %>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-datepicker3.css" rel="stylesheet" />
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="Scripts/HrEmpLeaveApplication.js"></script>
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
    <input type="hidden" id="hfBase64" runat="server" />
    <input type="hidden" id="hfId" value="0" runat="server" />
    <button onclick="CreateData();">Create</button>
    <button onclick="ViewDataList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>
    <input id="fuImg" type="file" onchange="readURL(this)" src="Images/fileupload.png" style="display: none;" accept="image/x-png,image/jpeg,image/jpg" />
    <button onclick="document.getElementById('fuImg').click()" style="display: none;" id="btnUploadFile">Upload File</button>
    <button style="display: none;" id="btnDisplayData">Display File</button>

    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">
        <div id="dvListView">
            <table id="tblEmpLeaveList" class="display table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Branch Name</th>
                        <th>Employee Name</th>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Total Day</th>
                    </tr>
                </thead>
                <tbody id="tbody_EmpLeave_List">
                </tbody>
            </table>
        </div>
        
    </div>


   <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Employee Leave Application </b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                          
                            <tr>
                                <td style="width:15%">
                                 <label class="control-label">Branch *</label>
                                </td>
                                <td style="width:35%">
                                 <select style="width: 100%;" id="ddlBranch" name="ddlBranch" class="form-control rounded border-dark"></select>
                                    
                                </td>
                               <td style="width:15%">
                                 <label class="control-label">Emp Id *</label>
                                </td>
                                <td style="width:35%">
                                 <select style="width: 100%;" id="ddlEmployee" name="ddlEmployee" class="form-control rounded border-dark"></select>
                                
                                </td>
                            </tr>
                            <tr>
                                <td style="width:15%">Emp Name</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtEmpName" name="txtEmpName" />
                                </td> 
                                <td style="width:15%">ID</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtLeaveApplicationId" name="txtLeaveApplicationId" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width:15%">
                                 <label class="control-label">Year *</label>
                                </td>
                                <td style="width:35%">
                                 <select id="ddlYear" name="ddlYear" class="form-control rounded border-dark">
                                     <option value="">-Select Year-</option>
                                 </select>
                                </td>
                               <td style="width:15%">
                                 <label class="control-label">Month *</label>
                                </td>
                                <td style="width:35%">
                                 <select id="ddlMonth" name="ddlMonth" class="form-control rounded border-dark">
                                     <option value="">-Select Month-</option>
                                 </select>
                                </td>
                            </tr>
                            <tr>
                            <td style="width:15%">Leave Application Date *</td>
                            <td style="width:35%">
                               <div class="input-group date">
                                    <input type="text" class="form-control rounded border-dark" id="txtLeaveApplicationDate" name="txtLeaveApplicationDate">
                                    <div class="input-group-addon">
                                        <span class="fa fa-calendar datepicker"></span>
                                    </div>
                                </div>
                            </td>   
                              <td style="width:15%">
                                  <label class="control-label">Leave Status</label>
                                 </td>
                                 <td style="width:35%">
                                  <select id="ddlLeaveStatus" name="ddlLeaveStatus" class="form-control rounded border-dark">
                                      <option value="">-Select Leave Status-</option>
                                  </select>
                                 </td>
                        </tr>
                            <tr>
                                 
                                <td style="width:15%">Total Days *</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtTotalDay" name="txtTotalDay" />
                                </td>
                                 <td style="width:15%">Reason *</td>
                                  <td style="width:35%">
                                     <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" />
                                  </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <fieldset>
                                        <legend>Leave Detail *</legend>
                                        <table id="tblLeaveDetail" class="display no-footer dataTable" style="width: 100%;">
                                            <thead>
                                                <tr>
                                                    <th>Leave Day</th>
                                                    <th>Reason</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody_LeaveDetail">
                                                <tr id="tr_LeaveDetail">
                                                    <td style="display: none;"></td>
                                                    <td>
                                                       <div class="input-group date">
                                                             <input type="text" class="form-control rounded border-dark" id="txtLeaveDay" name="txtLeaveDay">
                                                             <div class="input-group-addon">
                                                                 <span class="fa fa-calendar datepicker"></span>
                                                             </div>
                                                         </div>
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtDetailDescription" name="txtDetailDescription" />
                                                    </td>
                                                    
                                                    <td>
                                                        <button type="button" class="btn btn-primary" onclick="AddEmpLeaveDetail();">Add</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                    </fieldset>
                                </td>
                            </tr>
                        </table>

                       
                        </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>

