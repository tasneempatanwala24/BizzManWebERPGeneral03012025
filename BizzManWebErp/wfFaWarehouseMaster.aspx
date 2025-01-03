<%@ Page Title="Warehouse Master" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfFaWarehouseMaster.aspx.cs" Inherits="BizzManWebErp.wfFaWarehouseMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <%--<link href="css/bootstrap.min.css" rel="stylesheet" />--%>
    <%--<link rel="stylesheet/less" type="text/css" href="css/bootstrap.less" />--%>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/FaWarehouseMaster.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateWarehouse();">Create</button>
    <button onclick="ViewWarehouseList();">View</button>
    <button onclick="AddWarehouse();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divWarehouseList" style="margin-top: 10px; overflow: auto;">
        <table id="tblWarehouseList" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody id="tbody_Warehouse_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divWarehouseEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Warehouse
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Category *</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlCategory" name="ddlCategory" class="form-control rounded border-dark">
                                        <option value="">-Select Category-</option>
                                        <option value="All">All</option>
                                        <option value="Material">Material</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Address *</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Address" class="form-control rounded border-dark" id="txtAddress" name="txtAddress" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Name *</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Name" class="form-control rounded border-dark" id="txtName" name="txtName" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Description</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Description" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" maxlength="200" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
