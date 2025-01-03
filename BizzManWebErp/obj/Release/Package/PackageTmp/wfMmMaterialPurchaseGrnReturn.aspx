<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseGrnReturn.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseGrnReturn"  MasterPageFile="~/MmMainMenu.Master" %>

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
    <script src="Scripts/MmMaterialPurchaseGrnReturn.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="txtGateInwordId" />
    <button onclick="CreateMaterialPurchaseGrn();">Create</button>
    <button onclick="ViewMaterialPurchaseGrnList();">View</button>
    <button id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialPurchaseOrderDirectGrnEntry();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divMaterialPurchaseGrnList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialPurchaseGrnList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>Grn Return Date</th>
                    <th>GRN ID</th>
                    <th>Vendor Name</th>
                    <th>Branch</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialPurchaseGrn_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialPurchaseGrnDetailsList" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
                Material Purchase Grn Return Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGrnDetails" class="display no-footer dataTable dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Return Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                    <th>Warehouse</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseGrnDetails">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialPurchaseGrnEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Material Purchase Grn Return 
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Grn Return Date *</td>
                                <td>
                                    <input type="date" class="form-control dat" id="txtReturnDate" name="txtReturnDate" onchange="GenerateOrderID()" />
                                </td>
                                 <td>
                                    <label class="control-label">ID</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtID" name="txtID" readonly="readonly" />
                                </td>
                                
                            </tr>
                            <tr>
                            <td>Vendor *</td>
                                <td>
                                    <select id="ddlVendor" name="ddlVendor" class="form-control" onchange="BindPurchaseOrderDropdown();" style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                 <td>
                                    <label class="control-label">Purchase Order GRN ID *</label>
                                </td>
                                <td>
                                    <select id="ddlGRN" name="ddlGRN" class="form-control" onchange="FetchPurchaseOrderDetails();" style="width:300px;">
                                        <option value="">-Select GRN-</option>
                                    </select>
                                </td>
                            </tr>
                                  
                            
                  
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control"  >
                                    </select>
                                </td>

                                 

                                
                                
                            </tr>
                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
     <div class="container" id="divMaterialPurchaseOrderMasterDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Material Purchase Order GRN Return Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                         <div class="table-responsive">
                        <table id="tblMaterialPurchaseOrderMasterDetails" class="display no-footer dataTable table" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display:none;">Order Detail Id</th>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Total Receive Qty</th>
                                    <th>Total Return Qty</th>
                                    <th>GRN Balance Stock</th>
                                    <th>Unit Price</th>
                                    <th>Return Qty</th>
                                    <th>Warehouse</th>
                                    <th>Description</th>
                                   
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialPurchaseOrderMasterDetails">
                                
                            </tbody>
                        </table>
                             </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
