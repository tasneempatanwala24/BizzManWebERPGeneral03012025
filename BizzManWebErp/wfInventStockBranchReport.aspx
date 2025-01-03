<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/InventMainMenu.Master" CodeBehind="wfInventStockBranchReport.aspx.cs" Inherits="BizzManWebErp.wfInventStockBranchReport" %>
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
    <script src="Scripts/InventStockBranchReport.js"></script>
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" /> 
    <button id="btnExport">Export To Excel</button>      
 <div class="container" id="divMaterialList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>                    
                    <th>Branch Name</th>
                    <th>Item Name</th>
                    <th>Balance Qty</th>
                    <th>Unit Measure</th>
                    <th>Rate</th>
                    <th>Amount</th>                    
               </tr>
            </thead>
            <tbody id="tbody_Material_List">
            </tbody>
        </table>
    </div>
</asp:Content>

