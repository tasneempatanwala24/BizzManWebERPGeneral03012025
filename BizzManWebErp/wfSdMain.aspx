<%@ Page Title="" Language="C#" MasterPageFile="~/SdMainMenu.Master" AutoEventWireup="true" CodeBehind="wfSdMain.aspx.cs" Inherits="BizzManWebErp.wfSdMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
             <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
             <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Sales</button><br />
    <%--dynamic breadcrumbs--%>
</asp:Content>
