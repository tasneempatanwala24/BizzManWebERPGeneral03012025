<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmCategoryMasterNew.aspx.cs" Inherits="BizzManWebErp.wfMmCategoryMasterNew" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmCategoryMasterNew.js"></script>
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
                    <th style="white-space: nowrap;">ID</th>
                    <th style="white-space: nowrap;">Category Name</th>
                    <th style="white-space: nowrap;">Parent Category</th>
                    <th style="white-space: nowrap;">Description</th>
                    <th style="white-space: nowrap;">Inventory Valuation</th>
                    <th style="white-space: nowrap;">Income Account</th>
                    <th style="white-space: nowrap;">Expense Account</th>
                    <th style="white-space: nowrap;">Category Type</th>
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
                                <td style="width: 17%;">Category Name *</td>
                                <td>
                                    <input type="text" style="width: 300px;" placeholder="Enter Category Name" class="form-control rounded border-dark" id="txtCategoryName" name="txtCategoryName" maxlength="200" />
                                </td>
                                <td style="width: 11%;">Description</td>
                                <td>
                                    <input type="text" style="width: 300px;" placeholder="Enter Description" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 17%;">Inventory Valuation *</td>
                                <td>
                                    <select  style="width: 300px;" class="form-control rounded border-dark" id="ddlInventoryValuation" name="ddlInventoryValuation">
                                        <option value="">-Select Inventory Valuation-</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automated">Automated</option>
                                    </select>
                                </td>
                                <td style="width: 17%;">Income Account *</td>
                                <td>
                                    <select  style="width: 300px;" class="form-control rounded border-dark" id="ddlIncomeAccount" name="ddlIncomeAccount">
                                        <option value="">-Select Income Account-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 17%;">Expense Account *</td>
                                <td>
                                    <select  style="width: 300px;" class="form-control rounded border-dark" id="ddlExpenseAccount" name="ddlExpenseAccount">
                                        <option value="">-Select Expense Account-</option>
                                    </select>
                                </td>
                                <td style="width: 17%;">Parent Category</td>
                                <td>
                                    <select  style="width: 300px;" class="form-control rounded border-dark" id="ddlParentCaategory" name="ddlParentCaategory">
                                        <option value="">-Select Parent Category-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                              
                                <td style="width: 17%;">Category Type</td>
                                <td>
                                    <select  style="width: 300px;" class="form-control rounded border-dark" id="ddlCategoryType" name="ddlCategoryType">
                                        <option value="">-Select Category Type-</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
