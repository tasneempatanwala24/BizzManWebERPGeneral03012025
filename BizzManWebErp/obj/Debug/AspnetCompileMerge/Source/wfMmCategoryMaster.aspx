<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmCategoryMaster.aspx.cs" Inherits="BizzManWebErp.wfMmCategoryMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmCategoryMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateCategory();">Create</button>
    <button onclick="ViewCategoryList();">View</button>
    <button onclick="AddCategory();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divCategoryList" style="margin-top: 10px; overflow: auto;">
        <table id="tblCategoryList" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody id="tbody_Category_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divCategoryEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Category
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Category Name *</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtCategoryName" name="txtCategoryName" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtDescription" name="txtDescription" maxlength="200" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
