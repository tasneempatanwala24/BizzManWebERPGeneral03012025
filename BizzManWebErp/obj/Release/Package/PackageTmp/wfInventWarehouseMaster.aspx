<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfInventWarehouseMaster.aspx.cs" Inherits="BizzManWebErp.wfInventWarehouseMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventWarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/InventWarehouseMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Warehouses</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateWarehouse();" id="btnCreate">Create</button>
     <button onclick="ViewWarehouse();">View</button>
    <button onclick="AddWareHouseEntry();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divwarehouseList" style="margin-top: 10px; overflow: auto;">
        <table id="tblwarehouselist" class="display">
            <thead>
                <tr>
                    <th style="white-space: nowrap;">
                        <input type="checkbox" id="selectAll" name="selectAll"></th>
                    <th style="white-space: nowrap;">Warehouse</th>
                    <th style="white-space: nowrap;">Location Stock</th>
                    <th style="white-space: nowrap;">Address</th>
                    <th style="white-space: nowrap;">Company</th>
                </tr>
            </thead>
            <tbody id="tbody_warehouse_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divwarehouseEntry" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">

            <div class="my-2 " style="text-align: right; margin-top: 1%">
                <button>Routes</button>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <strong>Warehouse *</strong>
                        <h1>
                            <input type="text" class="rounded border-dark" placeholder="Warehouse Name" style="width:100%" id="txtWarehouseName" name="txtWarehouseName" maxlength="200" />

                        </h1>
                       
                        <br />
                    </div>
                    <div class="div_group" >
                    <table class="tbl half_table">
                        <tbody>
                            <tr>
                                <td class="td_label">Short Name</td>
                                <td style="width: 100%">
                                    <input type="text" class="form-control rounded border-dark" id="txtShortName" name="txtShortName" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td class="td_label">Address</td>
                                <td style="width: 100%">
                                     <input type="text" class="form-control rounded border-dark" id="txtAddress" name="txtAddress" maxlength="200" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="tbl half_table">
                        <tbody>
                            <tr>
                                <td class="td_label">Branch</td>
                                <td style="width: 100%">
                                    <select class="form-control rounded border-dark" id="ddBranch" name="ddBranch">
                                                                               
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="td_label">Location</td>
                                <td style="width: 100%">
                                    <select class="form-control rounded border-dark" id="ddLocation" name="ddLocation">
                                        
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="td_label">Sale Journal</td>
                                <td style="width: 100%">
                                    <select class="form-control rounded border-dark" id="ddSaleJournal" name="ddSaleJournal">                                      
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="td_label">Purchase Journal</td>
                                <td style="width: 100%">
                                    <select class="form-control rounded border-dark" id="ddPurchaseJournal" name="ddPurchaseJournal">                                      
                                    </select>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</asp:Content>
