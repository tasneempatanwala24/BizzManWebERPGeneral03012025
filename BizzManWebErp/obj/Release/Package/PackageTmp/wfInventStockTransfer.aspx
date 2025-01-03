<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/InventMainMenu.Master" CodeBehind="wfInventStockTransfer.aspx.cs" Inherits="BizzManWebErp.wfInventStockTransfer" %>
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
    <script src="Scripts/InventStockTransfer.js"></script>
     <style>
    #tblMaterialDetails {
        table-layout: fixed;
        width: 100%;
    }

    #tblMaterialDetails th,
    #tblMaterialDetails td {
        word-wrap: break-word;
        padding: 8px;
    }

    #tblMaterialDetails th:nth-child(2),
    #tblMaterialDetails td:nth-child(2) {
        width: 20% !important;
    }

    #tblMaterialDetails th:nth-child(4),
    #tblMaterialDetails td:nth-child(4) {
        width: 15% !important;
    }

    #tblMaterialDetails th:nth-child(5),
    #tblMaterialDetails td:nth-child(5) {
        width: 7% !important;
    }

    #tblMaterialDetails th:nth-child(6),
    #tblMaterialDetails td:nth-child(6) {
        width: 7% !important;
    }

    #tblMaterialDetails th:nth-child(7),
    #tblMaterialDetails td:nth-child(7) {
        width: 7% !important;
    }

    #tblMaterialDetails th:nth-child(9),
    #tblMaterialDetails td:nth-child(9) {
        width: 15% !important;
    }

    #tblMaterialDetails th:nth-child(11),
    #tblMaterialDetails td:nth-child(11) {
        width: 15% !important;
    }
    #tblMaterialDetails th:nth-child(12),
    #tblMaterialDetails td:nth-child(12) {
        width: 15% !important;
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
 <button onclick="CreateMaterial();">Create</button>
    <button onclick="ViewMaterial();">View</button>
    <button id="btnExport">Export To Excel</button>
    <button onclick="AddMaterial();" style="display: none;" id="btnSave">Save</button>
    <button id="previewBtn" style="display:none" onclick="ViewFile()">View PDF </button>   
 <div class="container" id="divMaterialList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>Stock Transfer Date</th>
                    <th>Branch</th>
                    <th>Description</th>
               </tr>
            </thead>
            <tbody id="tbody_Material_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Stock Transfer
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Stock Transfer Date *</td>
                                <td>
                                    <input type="date" class="form-control dat cls" style="width:50%;" id="txtTransferDate" name="txtTransferDate"  onchange="GenerateID()" />
                                </td>
                                <td>
                                    <label class="control-label">ID</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtID" name="txtID" readonly="readonly" />
                                </td>                                
                            </tr>                           
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control cls" onchange="BindFromWarehouseDropdown();">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Description </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control cls" id="txtDescription" name="txtDescription" placeholder="Enter Description"/>
                                </td>
                            </tr>                                                        
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container" id="divMaterialDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Stock Transfer Lines
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="table-responsive">
                        <table id="tblMaterialDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Master Id</th>
                                    <th>Item Name</th>                                    
                                    <td style="display: none;">From Warehours Id</td>
                                    <th>Source Warehouse</th>
                                    <th>Rate</th>
                                    <th>Qty Balance</th>
                                    <th>Stock Transfer Qty</th>
                                    <td style="display: none;">Branch Code Id</td>
                                    <th>Branch</th>
                                    <td style="display: none;">To Warehouse Id</td>
                                    <th>Destination Warehouse</th>
                                    <th>Description</th>
                                    <td style="display: none;">Bal Qty</td>
                                    <th style="width: 5%;"></th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialDetails">
                                <tr id="tr_MaterialDetailEntry">
                                    <td style="display: none;"></td>
                                    <td> 
                                        <select id="ddlMaterialName" name="ddlMaterialName" class="form-control cls" onchange="FetchQtyBalance();">
                                            <option value="">-Select Material Name-</option>
                                        </select>
                                    </td>
                                    <td style="display: none;"></td>
                                    <td> 
                                        <select id="ddlFromWarehouse" name="ddlFromWarehouse" class="form-control cls" onchange="FetchQtyBalance();">
                                            <option value="">-Select From Warehouse-</option>
                                        </select>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo" id="txtRate" name="txtRate" value="0" readonly="readonly"/>
                                    </td>
                                    
                                    <td> 
                                        <input type="text" class="form-control dcmlNo" id="txtQtyBalance" name="txtQtyBalance" value="0" readonly="readonly" />
                                    </td>
                                    
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtStockTransferQty" value="0" name="txtStockTransferQty" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="0" />
                                    </td>
                                    <td style="display: none;"></td>
                                    <td> 
                                        <select id="ddlBranchCode" name="ddlBranchCode" class="form-control cls" onchange="BindToWarehouseDropdown();">
                                        </select>
                                    </td>
                                    <td style="display: none;"></td>
                                    <td> 
                                        <select id="ddlToWarehouse" name="ddlToWarehouse" class="form-control cls">
                                            <option value="">-Select To Warehouse-</option>
                                        </select>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control cls" id="txtDescriptionDetail" name="txtDescriptionDetail" onblur="checkInputGiven(event)" placeholder="Enter Description" />
                                    </td>
                                    <td style="display: none;"> 
                                        <input type="text" id="txtBalQty" name="txtBalQty" value="0"/>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary cls" onclick="SaveDetails();">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container" id="divMaterialDetailsList" style="margin-top: 10px; overflow: auto; display: none;">
    <div class="card">
        <div class="card-header">
            Stock Transfer Lines
        </div>
        <div class="card-body">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="table-responsive">
                    <table id="tblMaterialDetailsList" class="display no-footer dataTable table table-striped table-bordered" style="width: 100%;">
                        <thead>
                            <tr>
                               <%-- <th>Transfer Master Id</th>--%>
                                <th>Item Name</th>
                                <th>Rate</th>
                                <th>Stock Transfer Qty</th>
                                <th>Source Branch</th>
                                <th>Source Warehouse</th>
                                <th>Destination Branch</th>                                
                                <th>Destination Warehouse</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody id="tbody_MaterialDetailsList">
                            
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>

