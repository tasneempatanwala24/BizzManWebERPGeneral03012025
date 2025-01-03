<%@ Page Title="" Language="C#" MasterPageFile="~/PM.Master" AutoEventWireup="true" CodeBehind="wfPmMain.aspx.cs" Inherits="BizzManWebErp.wfPmMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <p>
        <table style="width:100%;">
            <tr>
                <td>&nbsp;</td>
                <th style="text-align:center;font-size:22px;font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"><u>Project Management System <br /> Dashboard</u></th>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <%--<img alt="Company Logo" src="../Images/CompanyLogo.png" /></td>
         --%>      <%-- <td> <asp:Button ID="Btn_LogIn" runat="server"  OnClick="Btn_LogIn_Click" Text="Log In" class="buttonCreatCustomer"/>
                  </td>
               --%> <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td style="text-align:center;padding-top:75px;">
                    <asp:Button ID="Btn_CreateCustomer" runat="server"  OnClick="Btn_CreateCustomer_Click" Text="Create New Registration" class="button"/>
                    </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </p>
</asp:Content>
