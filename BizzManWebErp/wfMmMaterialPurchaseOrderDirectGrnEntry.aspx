<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseOrderDirectGrnEntry.aspx.cs" MasterPageFile="~/MmMainMenu.Master" Inherits="BizzManWebErp.wfMmMaterialPurchaseOrderDirectGrnEntry" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/MmMaterialPurchaseOrderDirectGrnEntry.js"></script>
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
                    <th>GRN Entry Date</th>
                    <th>Order ID</th>
                    <th>Gate Inward ID</th>
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
                Purchase GRN Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialPurchaseGrnDetails" class="display no-footer dataTable dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Order Qty</th>
                                    <th>Unit Measure</th>
                                    <th>GateInword Receive Qty</th>
                                    <th>GRN Receive Qty</th>
                                    <th>Return Qty</th>
                                    <th>Rate</th>
                                    <th>Total Amount</th>
                                     <th>Package</th>
                                     <th>Package Qty</th>
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
                Purchase Order GRN
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>GRN Entry Date *</td>
                                <td>
                                    <input type="date" class="form-control dat cls" id="txtEntryDate" name="txtEntryDate" onchange="GenerateOrderID()" />
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
                                    <select id="ddlVendor" name="ddlVendor" class="form-control cls" onchange="BindPurchaseOrderDropdown();" style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                 <td>
                                    <label class="control-label">Purchase Order ID *</label>
                                </td>
                                <td>
                                    <select id="ddlOrder" name="ddlOrder" class="form-control cls" onchange="FetchPurchaseOrderDetails();" style="width:300px;">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Receipt Date *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtReceiptDate" name="txtReceiptDate" readonly />
                                </td>

                                         <td>
                                    <label class="control-label">Order Deadline Date *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDeadlineDate" name="txtDeadlineDate" readonly/>
                                </td>


                               
                                
                            </tr>    
                            
                             <tr>
                                <td>
                                    <label class="control-label">Purchase Agreement</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPurchaseAgreement" name="txtPurchaseAgreement" maxlength="50" readonly/>
                                </td>

                                  <td>
                                    <label class="control-label">Payment Term</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPaymentTerm" name="txtPaymentTerm" maxlength="50" readonly />
                                </td>


                              

                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control cls" onchange="BindWarehouseDropdown();" >
                                    </select>
                                </td>

                                  <td>
                                    <label class="control-label">Quotation No.</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtQuotationNo" name="txtQuotationNo" maxlength="50" readonly />
                                </td>


                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Department *</label>
                                </td>
                                <td>
                                    <select id="ddlDepartment" name="ddlDepartment" class="form-control cls" >
                                    </select>
                                </td>

                                 <td>
                                    <label class="control-label">Active</label>
                                </td>
                                <td>
                                   
                                    <select id="ddlActive" name="ddlActive" class="form-control cls" >
                                        <option value="Y">Y</option>
                                         <option value="N">N</option>
                                    </select>
                                </td>
                                <%--<td style="display:none;">
                                    <label class="control-label">Warehouse *</label>
                                </td>
                                <td style="display:none;" id="td_warehouse">
                                    <select id="ddlWarehouse" name="ddlWarehouse" class="form-control" style="width:200px;">
                                        <option value="">-Select Warehouse-</option>
                                    </select>
                                </td>--%>
                                 <td style="display:none;" id="td_package">
                                        <select id="ddlPackage" name="ddlPackage" class="form-control cls" style="width:200px;" onchange="GetPackageQty(this);">
                                            <option value="">-Select Package-</option>
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
                Purchase Order Details
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
                                    <th>Balance Qty</th>
                                    <th>Rate</th>
                                    <th>Receive QTY</th>
                                    <th>Return QTY</th>
                                    <th>Package Name</th>
                                    <th>No. Of Package</th>
                                    <th>Taxable Amt</th>
                                    <th>CGST(%)</th>
                                    <th>SGST(%)</th>
                                    <th>IGST(%)</th>
                                    <th>Freight Charge</th>
                                    <th>Loading/ UnLoading</th>
                                    <th>Round Off</th>
                                    <th>Gross Amt</th>
                                    <th>Warehouse</th>
                                    <th style="display:none;">Qty</th>
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
