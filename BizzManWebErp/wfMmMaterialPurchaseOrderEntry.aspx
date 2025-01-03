<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseOrderEntry.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseOrderEntry" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmMaterialPurchaseOrder.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateMaterialPurchaseOrder();">Create</button>
    <button onclick="ViewMaterialPurchaseOrderList();">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialPurchaseOrder();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnViewFile" class="button" onclick="ViewFile()">View File</button>
    <div class="container" id="divMaterialPurchaseOrderList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialPurchaseOrderList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>Vendor Name</th>
                    <th>Order Entry Date</th>
                    <th>Order Deadline Date</th>
                    <th>Receipt Date</th>
                    <th>Branch</th>
                    <th>Department</th>
                    <th>Payment Term</th>
                    <th>Purchase Agreement</th>
                    <th>Quotation No.</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialPurchaseOrder_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialPurchaseOrderEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Material Purchase Order
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Order Entry Date *</td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtEntryDate" name="txtEntryDate" onchange="GenerateOrderID()" />
                                </td>
                                <td>
                                    <label class="control-label">ID</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtID" name="txtID" readonly="readonly" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>Vendor *</td>
                                <td>
                                    <select id="ddlVendor" name="ddlVendor" class="form-control" onchange="FetchPurchaseQuotationMasterList('');" style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Order Deadline Date *</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtDeadlineDate" name="txtDeadlineDate" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Receipt Date *</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtReceiptDate" name="txtReceiptDate" />
                                </td>
                                <td>
                                    <label class="control-label">Payment Term</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPaymentTerm" name="txtPaymentTerm" maxlength="50" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Purchase Agreement</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPurchaseAgreement" name="txtPurchaseAgreement" maxlength="50" />
                                </td>
                                <td>
                                    <label class="control-label">Quotation No.</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtQuotationNo" name="txtQuotationNo" maxlength="50" />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Department *</label>
                                </td>
                                <td>
                                    <select id="ddlDepartment" name="ddlDepartment" class="form-control">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="3">
                                    <input type="checkbox" id="chkAskConfirm" name="chkAskConfirm" /> Ask Confirmation
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialPurchaseOrderMasterList" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Material Purchase Quotation Master Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseOrderMasterList" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Quotation Entry Date</th>
                                    <th>Quotation Date</th>
                                    <th>Quotation Valid Date</th>
                                    <th>Requisition Note</th>
                                    <th>Vendor Name</th>
                                    <th>Branch</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseOrderMasterList">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container" id="divMaterialPurchaseOrderMasterDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Material Purchase Quotation Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseOrderMasterDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style="display:none;">Id</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseOrderMasterDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>