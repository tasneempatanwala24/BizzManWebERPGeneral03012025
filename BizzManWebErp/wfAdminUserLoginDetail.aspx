<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMain.Master" AutoEventWireup="true" 
    CodeBehind="wfAdminUserLoginDetail.aspx.cs" 
    Inherits="BizzManWebErp.wfAdminUserLoginDetail" %>
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
    <script src="Scripts/AdminUserLoginDetail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
     <input type="hidden" id="hdnIsEdit" />
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
     
    <div class="container" id="divAdminUserLoginDetailList" style="margin-top: 10px; overflow: auto;">
    <table id="tblAdminUserLoginDetailList" class="display">
        <thead>
            <tr>
                <th>
                    <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                <th style="white-space: nowrap;display:none;">Id</th>
                <th style="white-space: nowrap;">User Id</th>
                <th style="white-space: nowrap;">Login Date</th>
                <th style="white-space: nowrap;">Login Time</th>
                <th style="white-space: nowrap;">Ip Detail</th>
                
                
            </tr>
        </thead>
        <tbody id="tbody_AdminUserLoginDetailList">
        </tbody>
    </table>
</div>
    
</asp:Content>

