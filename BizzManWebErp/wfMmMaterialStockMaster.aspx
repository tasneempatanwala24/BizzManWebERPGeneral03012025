<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialStockMaster.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialStockMaster" %>

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script src="Scripts/MaterialStockMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--<button onclick="DownloadFile();" id="btnExport">Export To Excel</button>--%>
    <button id="btnExport">Export To Excel</button>
    <div class="container" id="divMaterialStockMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialStockMasterList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="display:none;">Id</th>
                    <th style="white-space: nowrap;">Transaction Id</th>
                    <th style="white-space: nowrap;">Transaction Type</th>
                    <th style="white-space: nowrap;">Entry Date</th>
                    <th style="white-space: nowrap;">Warehouse</th>
                    <th style="white-space: nowrap;">Material Name</th>
                    <th style="white-space: nowrap;">Qty In</th>
                    <th style="white-space: nowrap;">Rate</th>
                    <th style="white-space: nowrap;">Unit Measure</th>
                    <th style="white-space: nowrap;">Qty Out</th>
                    <th style="white-space: nowrap;">Qty Balance</th>
                    <th style="white-space: nowrap;">Invoice Qty</th>
                    <th style="white-space: nowrap;">Invoice Balance</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialStockMaster_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialStockMasterDetailsList" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
                Material Stock Master Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialStockMasterDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Transaction Id</th>
                                    <th>Transaction Type</th>
                                    <th>Material Name</th>
                                    <th>Qty Out</th>
                                    <th>Rate</th>
                                    <th>Unit Measure</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialStockMasterDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
