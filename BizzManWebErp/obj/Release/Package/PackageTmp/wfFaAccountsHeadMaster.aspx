<%@ Page Title="" Language="C#" MasterPageFile="~/FaMainMenu.Master" AutoEventWireup="true" CodeBehind="wfFaAccountsHeadMaster.aspx.cs" Inherits="BizzManWebErp.wfFaAccountsHeadMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/FaAccountsHeadMaster.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateHeadList();">Create</button>
    <button onclick="ViewHeadList();">View</button>
    <button style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divHeadList" style="margin-top: 10px; overflow: auto;">
        <table id="tblHeadList" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Account Head</th>
                </tr>
            </thead>
            <tbody id="tbody_Head_List">
            </tbody>
        </table>
    </div>

     <div class="container" id="divHeadEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Account Heads
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 11%;">Id</td>
                                <td colspan="3">
                                    <input type="text" style="width: 35%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Account Heads</td>
                                <td colspan="3">
                                    <input type="text" style="width: 35%;"  class="form-control rounded border-dark" id="txtAccountHeads" name="txtAccountHeads" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
