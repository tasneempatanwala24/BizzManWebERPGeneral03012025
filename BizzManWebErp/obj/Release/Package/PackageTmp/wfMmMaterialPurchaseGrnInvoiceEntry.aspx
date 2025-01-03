<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseGrnInvoiceEntry.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseGrnInvoiceEntry" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/MaterialPurchaseGrnInvoiceEntry.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="txtGRNId" />
    <button onclick="CreateMaterialPurchaseGrnInvoiceEntry();">Create</button>
    <button onclick="ViewMaterialPurchaseGrnInvoiceEntryList();">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialPurchaseGrnInvoiceEntry();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divMaterialPurchaseGrnInvoiceEntryList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialPurchaseGrnInvoiceEntryList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>Invoice Entry Date</th>
                    <th>Order ID</th>
                    <th>Gate Inward ID</th>
                    <th>GRN ID</th>
                    <th>Vendor Name</th>
                    <th>Branch</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialPurchaseGrnInvoiceEntry_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialPurchaseGrnInvoiceEntryDetailsList" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
                Purchase GRN Invoice Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGrnInvoiceEntryDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Invoice Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGrnInvoiceEntryDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialPurchaseGrnInvoiceEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Purchase GRN Invoice
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Invoice Entry Date *</td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtEntryDate" name="txtEntryDate" />
                                </td>
                                <td>Vendor *</td>
                                <td>
                                    <select id="ddlVendor" name="ddlVendor" class="form-control" onchange="FetchPurchaseGRNDetails();" style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                
                                
                            </tr>
                                                     
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <div class="container" id="divMaterialPurchaseGRNMasterList" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Material Purchase GRN Master Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGRNMasterList" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>GRN Entry Date</th>
                                    <th>Gate Inward ID</th>
                                    <th>Vendor Name</th>
                                    <th>Branch</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGRNMasterList">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container" id="divMaterialPurchaseGRNMasterDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Purchase GRN Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGRNMasterDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display:none;">GRN Detail Id</th>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th></th>
                                    <th>GRN Receive Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total Stock Invoice Qty</th>
                                    <th>Balance Qty</th>
                                    <th>Warehouse</th>
                                    <th>Stock Invoice Qty</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGRNMasterDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

