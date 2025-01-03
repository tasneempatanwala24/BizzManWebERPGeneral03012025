<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialIndentMaster.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialIndentMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmMaterialIndentMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateMaterialIndentMaster();">Create</button>
    <button onclick="ViewMaterialIndentMasterList();">View</button>
    <button onclick="AddMaterialIndentMaster();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnViewFile" class="button" onclick="ViewFile()">View File</button>
    <div class="container" id="divMaterialIndentMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialIndentMasterList" class="display">
            <thead>
                <tr>
                    <th>Requisition ID</th>
                    <th>Department</th>
                    <th>Branch</th>
                    <th>Requisition Note</th>
                    <th>Description</th>
                    <th>Entry Date</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialIndentMaster_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialIndentMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Purchase Requisition Indent
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Requisition Id *</td>
                                <td>
                                    <select id="ddlRequisitionId" name="ddlRequisitionId" class="form-control" onchange="FetchRequisitionNote();">
                                        <option value="">-Select Requisition Id-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Entry Date *</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtEntryDate" name="txtEntryDate" />
                                </td>
                                
                            </tr>
                            <tr>
                                
                                <td>
                                    <label class="control-label">Description</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDescription" name="txtDescription" maxlength="100" />
                                </td>
                                <td>
                                    <label class="control-label">Created By</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtCreatedBy" name="txtCreatedBy" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>
                                
                                <td>
                                    <label class="control-label">Department</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDepartment" name="txtDepartment" readonly="readonly" />
                                </td>
                                <td>
                                    <label class="control-label">Branch</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtBranch" name="txtBranch" readonly="readonly" />
                                    <input type="hidden" id="hdnBranchCode" value="" />
                                </td>

                            </tr>
                            <tr>
                                <td>Requisition Note</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtRequisitionNote" name="txtRequisitionNote" readonly="readonly" style="height:60px;" />
                                </td>
                            </tr>
                            <%--<tr>
                                <td colspan="4">
                                    <a onclick="OpenAddMaterialIndentDetailsModal();" style="cursor: pointer; text-decoration: underline;">Add Material Indent Details</a>
                                </td>
                            </tr>--%>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialIndentDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Material Indent Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialIndentDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Master Id</th>
                                    <th>Material Name</th>
                                  <th>Stock</th>
                                    <th>Qty</th>
                                    <th>Unit Measeure</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialIndentDetails">
                                <tr>
                                    <td style="display: none;"></td>
                                    <td>
                                        <select id="ddlMaterialName" name="ddlMaterialName" class="form-control cls" onchange="FetchMaterialDetails();">
                                            <option value="">-Select Material Name-</option>
                                        </select>
                                    </td>
                                     <td>
                                        <input type="text" class="form-control cls" id="txtMaterialStock" name="txtMaterialStock" readonly="readonly" />
                                    </td>
                                    <td>
                                        <input type="number" class="form-control cls" id="txtQty" name="txtQty" />
                                    </td>
                                       <td>
                                        <input type="text" class="form-control cls" id="txtMaterialUnitMeasure" name="txtMaterialUnitMeasure" readonly="readonly" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control cls" id="txtMaterialDescription" name="txtMaterialDescription" maxlength="100" />
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary cls" id="btnadd" onclick="SaveMaterialIndentDetails();">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <!-- Modal -->
    <div class="modal fade" id="MaterialIndentDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Material Indent Details</h5>

                </div>
                <div class="modal-body">
                    <table class="tbl">
                        <tr>
                            <td>Material Name *</td>
                            <td></td>

                        </tr>
                        <tr>
                            <td>Qty *</td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label class="control-label">Description</label>
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="CloseModal();">Close</button>
                    
                </div>
            </div>
        </div>
    </div>
</asp:Content>
