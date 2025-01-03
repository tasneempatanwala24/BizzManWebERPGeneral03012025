<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseGateInword.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseGateInword" %>
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
    <script src="Scripts/MaterialPurchaseGateInword.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateMaterialPurchaseGateInword();">Create</button>
    <button onclick="ViewMaterialPurchaseGateInwordList();">View</button>
    <%--<button onclick="DownloadFile();" id="btnExport">Export To Excel</button>--%>
    <button onclick="AddMaterialPurchaseGateInword();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnViewFile" class="button" onclick="ViewFile()">View File</button>

    <div class="container" id="divMaterialPurchaseGateInwordList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialPurchaseGateInwordList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
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
            <tbody id="tbody_MaterialPurchaseGateInword_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialPurchaseGateInwordDetailsList" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
                Purchase Gate Inward Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGateInwordDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Receive Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                    <th>Warehouse</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGateInwordDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialPurchaseGateInwordEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Purchase Gate Inward
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Inward Entry Date *</td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtEntryDate" name="txtEntryDate" />
                                </td>
                                <td>Deadline Date *</td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtDeadlineDate" name="txtDeadlineDate" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>Vendor *</td>
                                <td>
                                    <select id="ddlVendor" name="ddlVendor" class="form-control" onchange="BindPurchaseOrderDropdown();" style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Order ID *</label>
                                </td>
                                <td>
                                    <select id="ddlOrder" name="ddlOrder" class="form-control" onchange="FetchPurchaseOrderDetails();" style="width:300px;">
                                        <option value="">-Select Order-</option>
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
                            <tr>
                                <td>Branch</td>
                                <td>
                                    <input type="text" class="form-control" id="txtBranch" name="txtBranch" readonly="readonly" />
                                </td>
                                <td>
                                    <%--<label class="control-label">Vendor</label>--%>
                                </td>
                                <td>
                                   <%-- <input type="text" class="form-control" id="txtVendor" name="txtVendor" readonly="readonly" />--%>
                                </td>
                                
                            </tr>
                             <tr>
                                <td>P.O No.</td>
                                <td>
                                    <input type="text" class="form-control" id="txtPONo" name="txtPONo" maxlength="20" />
                                </td>
                                <td>
                                    <label class="control-label">Transporter</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtTransporter" name="txtTransporter" maxlength="50" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>Challan No.</td>
                                <td>
                                    <input type="text" class="form-control" id="txtChallanNo" name="txtChallanNo" maxlength="50" />
                                </td>
                                <td>
                                    <label class="control-label">Vehicle No.</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtVehicleNo" name="txtVehicleNo" maxlength="50" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>Gate in time *</td>
                                <td>
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="txtGateInTime" name="txtGateInTime" type="text" class="form-control input-small" readonly="readonly">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </td>
                                <td>
                                    <label class="control-label">Gate out time *</label>
                                </td>
                                <td>
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="txtGateOutTime" name="txtGateOutTime" type="text" class="form-control input-small" readonly="readonly">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>Delivery Terms</td>
                                <td>
                                    <input type="text" class="form-control" id="txtDeliveryTerm" name="txtDeliveryTerm" maxlength="50" />
                                </td>
                                <td>
                                    <label class="control-label">Payment Terms</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPaymentTerm" name="txtPaymentTerm" maxlength="20" />
                                </td>
                                
                            </tr>
                            
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    


    <div class="container" id="divMaterialPurchaseOrderMasterDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Purchase Order Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseOrderMasterDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display:none;">Order Detail Id</th>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Total Receive Qty</th>
                                    <th>Balance Qty</th>
                                    <th>Unit Price</th>
                                    <th>Receive Qty</th>
                                    <th>Warehouse</th>
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