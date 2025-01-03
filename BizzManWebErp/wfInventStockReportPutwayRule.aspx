<%@ Page Title="" Language="C#" MasterPageFile="~/InventMainMenu.Master" AutoEventWireup="true" CodeBehind="wfInventStockReportPutwayRule.aspx.cs" Inherits="BizzManWebErp.wfInventStockReportPutwayRule" %>
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
    <script src="Scripts/InventStockReportPutwayRule.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="container" id="divInventStockMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblInventStockMasterList" class="display">
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
            <tbody id="tbody_InventStockMaster_List">
            </tbody>
        </table>
    </div>
</asp:Content>
