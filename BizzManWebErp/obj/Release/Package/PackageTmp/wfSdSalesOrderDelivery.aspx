<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfSdSalesOrderDelivery.aspx.cs" Inherits="BizzManWebErp.wfSdSalesOrderDelivery" %>

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
    <script src="Scripts/SalesOrderDelivery.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="ViewDeliveryOrderList();" id="btnView">View</button>
    <%--<button onclick="DownloadFile();" id="btnExport">Export To Excel</button>--%>
    <button onclick="UpdateDeliveryAndStockStatus();" style="display: none;" id="btnDone">Save</button>
    <button onclick="CreateSalesOrderDelivery();" id="btnCreate">Create</button>
    <%--<button onclick="CancelDelivery();" style="display: none;" id="btnCancel">Cancel Delivery</button>--%>

    <div class="container" id="divDeliveryOrderList" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
                Sales Order Details
            </div>
            <div class="card-body">
                <table id="tblDeliveryOrderList" class="display">
                    <thead>
                        <tr>
                            <%--  <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>--%>
                            <th style="white-space: nowrap;">Sales Order Id</th>
                            <th style="white-space: nowrap;">Customer Name</th>
                            <th style="white-space: nowrap;">Quotation Date</th>
                            <th style="white-space: nowrap;">Expiration Date</th>
                            <th style="white-space: nowrap;">Payment Terms</th>
                            <th style="white-space: nowrap;">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_DeliveryOrder_List">
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                Sales Order Delivery List
            </div>
            <div class="card-body">
                <table id="tblSalesOrderDeliveryOrderList" class="display">
                    <thead>
                        <tr>
                           
                            <th style="white-space: nowrap;">Sales Order Delivery Id</th>
                            <th style="white-space: nowrap;">Delivery Date</th>
                            <th style="white-space: nowrap;">Delivery Time</th>
                            <th style="white-space: nowrap;">Transport No.</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_SalesOrderDeliveryOrder_List">
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                Sales Order Delivery Details
            </div>
            <div class="card-body">
                <table id="tblSalesOrderDeliveryOrderDetails" class="display">
                    <thead>
                        <tr>
                           
                            <th style="white-space: nowrap;">Material Name</th>
                            <th style="white-space: nowrap;">Qty</th>
                            <th style="white-space: nowrap;">Unit Measure</th>
                            <th style="white-space: nowrap;">Price</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_SalesOrderDeliveryOrder_Details">
                    </tbody>
                </table>
            </div>
        </div>
    </div>



    <div class="container" id="divDeliveryOrderEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Delivery Order Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Sales Order *</td>
                                <td>
                                    <select id="ddlSalesOrderId" name="ddlSalesOrderId" class="form-control" onchange="FetchDeliveryOrderMasterDetails();" style="width: 300px;">
                                        <option value="">-Select Sales Order-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Transport No *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtTransportNo" name="txtTransportNo" />
                                </td>
                            </tr>
                            <tr>
                                <td>Delivey Date *</td>
                                <td>
                                    <input type="date" class="form-control" id="txtDeliveryDate" name="txtDeliveryDate" />
                                </td>
                                <td>
                                    <label class="control-label">Delivery time *</label>
                                </td>
                                <td>
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="txtDeliveryTime" name="txtDeliveryTime" type="text" class="form-control input-small" readonly="readonly">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </td>

                            </tr>
                            <tr>

                                <td>Customer Name</td>
                                <td>
                                    <input type="text" class="form-control" id="txtCustomerName" name="txtCustomerName" readonly="readonly" />
                                </td>

                                <td>Expiration Date</td>
                                <td>
                                    <input type="text" class="form-control" id="txtExpirationDate" name="txtExpirationDate" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>

                                <td>Payment Terms</td>
                                <td>
                                    <input type="text" class="form-control" id="txtPaymentTerms" name="txtPaymentTerms" readonly="readonly" />
                                </td>
                                <td>Total Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtTotalAmount" name="txtTotalAmount" readonly="readonly" />
                                </td>

                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divDeliveryOrderDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Delivery Order Lines
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblDeliveryOrderDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Id</th>
                                    <th>Manufacture Order ID</th>
                                    <th>Branch Name</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measeure</th>
                                    <th>Available Qty</th>
                                    <th>Total Delivered</th>
                                    <th>Delivery Qty</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_DeliveryOrderDetails">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>



</asp:Content>
