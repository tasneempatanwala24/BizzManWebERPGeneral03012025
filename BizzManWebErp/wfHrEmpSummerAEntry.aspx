<%@ Page Title="Employee Summary A" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpSummerAEntry.aspx.cs" Inherits="BizzManWebErp.wfHrEmpSummerAEntry" %>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-datepicker3.css" rel="stylesheet" />
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="Scripts/HrEmpSummerAEntry.js"></script>
    
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateData();">Create</button>
    <button onclick="ViewDataList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">
            <div id="dataTable_wrapper"></div>  
        <table id="tblEmpSummerAList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Branch Name</th>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Summer A</th>
                    
                </tr>
            </thead>
            <tbody id="tbody_EmpSummerA_List">
            </tbody>
        </table>
    </div>
   <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Summary A Entry </b>
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
                                <td style="width: 15%;">Summer A *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtSummerA" name="txtSummerA" />
                                </td>
                            </tr>
                          </table>
                    </div>
               </div>
            </div>
        </div>
    </div>
</asp:Content>
