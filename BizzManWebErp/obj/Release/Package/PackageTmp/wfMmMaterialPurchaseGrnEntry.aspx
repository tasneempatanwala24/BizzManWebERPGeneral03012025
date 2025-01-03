<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseGrnEntry.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseGrnEntry" %>
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
    <script src="Scripts/MaterialPurchaseGrnEntry.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="txtGateInwordId" />
    <button onclick="CreateMaterialPurchaseGrn();">Create</button>
    <button onclick="ViewMaterialPurchaseGrnList();">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialPurchaseGrn();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divMaterialPurchaseGrnList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialPurchaseGrnList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>GRN Entry Date</th>
                    <th>Order ID</th>
                    <th>Gate Inward ID</th>
                    <th>Vendor Name</th>
                    <th>Branch</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialPurchaseGrn_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialPurchaseGrnDetailsList" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
                Material Purchase GRN Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGrnDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th>Unit Measure</th>
                                    <th>GateInward Receive Qty</th>
                                    <th>GRN Receive Qty</th>
                                    <th>Return Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                    <th>Warehouse</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGrnDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialPurchaseGrnEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Purchase GRN
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>GRN Entry Date *</td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtEntryDate" name="txtEntryDate" />
                                </td>
                                <td>Vendor *</td>
                                <td>
                                    <select id="ddlVendor" name="ddlVendor" class="form-control" onchange="FetchPurchaseGateInwordDetails();" style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                <td style="display:none;">
                                    <label class="control-label">Warehouse *</label>
                                </td>
                                <td style="display:none;" id="td_warehouse">
                                    <select id="ddlWarehouse" name="ddlWarehouse" class="form-control" style="width:300px;">
                                        <option value="">-Select Warehouse-</option>
                                    </select>
                                </td>
                                
                            </tr>
                                                     
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <div class="container" id="divMaterialPurchaseGateInwordMasterList" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Purchase Gate Inward Master Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGateInwordMasterList" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Inward Entry Date</th>
                                    <th>Order ID</th>
                                    <th>Vendor Name</th>
                                    <th>Branch</th>
                                    <th>Vehicle No.</th>
                                    <th>Deadline Date</th>
                                    <th>Challan No.</th>
                                    <th>Gate in time</th>
                                    <th>Gate out time</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGateInwordMasterList">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container" id="divMaterialPurchaseGateInwordMasterDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Purchase Gate Inward Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGateInwordMasterDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display:none;">Gate Inward Detail Id</th>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th></th>
                                    <th>Gate Inward Receive Qty</th>
                                    <th>Unit Price</th>
                                    <th>Receive Qty</th>
                                    <th>Return Qty</th>
                                    <th>Warehouse</th>
                                    <th>Description</th>
                                    <th>Q/C</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGateInwordMasterDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
