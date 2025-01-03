<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MmMainMenu.Master" CodeBehind="wfMmMaterialPurchaseOrderDirectEntry.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseOrderDirectEntry" %>

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
    <script src="Scripts/MmMaterialPurchaseOrderDirectEntry.js"></script>
     <style>
        #tblSalesOrderBOMDetails {
            table-layout: fixed; /* Forces fixed column widths */
            width: 100%; /* Full width */
        }

        #tblSalesOrderBOMDetails th,
        #tblSalesOrderBOMDetails td {
            word-wrap: break-word; /* Ensures content inside cells doesn't overflow */
            padding: 8px; /* Adjust padding */
        }

        #tblSalesOrderBOMDetails th:nth-child(2),
        #tblSalesOrderBOMDetails td:nth-child(2) {
            width: 25% !important; /* Item Name column */
        }

        #tblSalesOrderBOMDetails th:nth-child(3),
        #tblSalesOrderBOMDetails td:nth-child(3) {
            width: 7% !important; /* Stock column */
        }

        #tblSalesOrderBOMDetails th:nth-child(4),
        #tblSalesOrderBOMDetails td:nth-child(4) {
            width: 7% !important; /* Qty column */
        }

        #tblSalesOrderBOMDetails th:nth-child(5),
        #tblSalesOrderBOMDetails td:nth-child(5) {
            width: 7% !important; /* Unit Measure column */
        }

        #tblSalesOrderBOMDetails th:nth-child(6),
        #tblSalesOrderBOMDetails td:nth-child(6) {
            width: 7% !important; /* Rate column */
        }

        #tblSalesOrderBOMDetails th:nth-child(7),
        #tblSalesOrderBOMDetails td:nth-child(7) {
            width: 7% !important; /* Taxable Amt column */
        }

        #tblSalesOrderBOMDetails th:nth-child(8),
        #tblSalesOrderBOMDetails td:nth-child(8) {
            width: 7% !important; /* CGST column */
        }
        #tblSalesOrderBOMDetails th:nth-child(9),
        #tblSalesOrderBOMDetails td:nth-child(9) {
            width: 7% !important; /* CGST column */
        }
        #tblSalesOrderBOMDetails th:nth-child(10),
        #tblSalesOrderBOMDetails td:nth-child(10) {
            width: 7% !important; /* CGST column */
        }
        #tblSalesOrderBOMDetails th:nth-child(11),
        #tblSalesOrderBOMDetails td:nth-child(11) {
            width: 7% !important; /* CGST column */
        }
        #tblSalesOrderBOMDetails th:nth-child(12),
        #tblSalesOrderBOMDetails td:nth-child(12) {
            width: 7% !important; /* CGST column */
        }
        #tblSalesOrderBOMDetails th:nth-child(13),
        #tblSalesOrderBOMDetails td:nth-child(13) {
            width: 7% !important; /* CGST column */
        }
        #tblSalesOrderBOMDetails th:nth-child(14),
        #tblSalesOrderBOMDetails td:nth-child(14) {
            width: 7% !important; /* CGST column */
        }
        
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
 <button onclick="CreateMaterialPurchaseOrder();">Create</button>
    <button onclick="ViewMaterialPurchaseOrderList();">View</button>
    <button id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialPurchaseOrder();" style="display: none;" id="btnSave">Save</button>
      <button type="button" class="preventDefault" id="previewBtn" style="display:none" onclick="ViewFile()">
    Preview PDF
    </button>   
 <div class="container" id="divMaterialPurchaseOrderList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialPurchaseOrderList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>Vendor Name</th>
                    <th>Order Entry Date</th>
                    <th>Order Deadline Date</th>
                    <th>Receipt Date</th>
                    <th>Branch</th>
                    <th>Department</th>
                    <th>Payment Term</th>
                    <th>Purchase Agreement</th>
                    <th>Quotation No.</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialPurchaseOrder_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialPurchaseOrderEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Purchase Order
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Order Entry Date *</td>
                                <td>
                                    <input type="date" class="form-control dat cls" id="txtEntryDate" name="txtEntryDate"  onchange="GenerateOrderID()" />
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
                                    <select id="ddlVendor" name="ddlVendor" class="form-control cls"  style="width:300px;">
                                        <option value="">-Select Vendor-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Order Deadline Date</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control dat cls" id="txtDeadlineDate" name="txtDeadlineDate" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Receipt Date</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control dat cls" id="txtReceiptDate" name="txtReceiptDate" />
                                </td>
                                <td>
                                    <label class="control-label">Payment Term</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control cls" id="txtPaymentTerm" name="txtPaymentTerm" maxlength="50" placeholder="enter payment term"/>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Purchase Agreement</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control cls" id="txtPurchaseAgreement" name="txtPurchaseAgreement" maxlength="50" placeholder="enter purchase agreement"/>
                                </td>
                                <td>
                                    <label class="control-label">Quotation No.</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control cls" id="txtQuotationNo" name="txtQuotationNo" maxlength="50" placeholder="enter quotation no"/>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control cls">
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Department </label>
                                </td>
                                <td>
                                    <select id="ddlDepartment" name="ddlDepartment" class="form-control cls">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="3">
                                    <input type="checkbox" id="chkAskConfirm" name="chkAskConfirm" /> Ask Confirmation
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divSalesOrderDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Purchase Order Lines
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="table-responsive">
                        <table id="tblSalesOrderBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Master Id</th>
                                    <th>Item Name</th>  <!-- Increased width -->
                                    <th>Stock</th>      <!-- Increased width -->
                                    <th>Qty</th>        <!-- Increased width -->
                                    <th>Unit Measure</th>
                                    <th>Rate</th>
                                    <th>Taxable Amt</th>
                                    <th>CGST (%)</th>
                                    <th>SGST (%)</th>
                                    <th>IGST (%)</th>
                                    <th>Freight Charge</th>
                                    <th>Loading/Un Loading</th>
                                    <th>Round Off</th>
                                    <th>Gross Amt</th>
                                   <%-- <th>Description</th>--%>
                                    <th style="width: 5%;"></th>
                                </tr>
                            </thead>
                            <tbody id="tbody_SalesOrderDetails">
                                <tr id="tr_SalesOrderDetailEntry">
                                    <td style="display: none;"></td>
                                    <td> 
                                        <select id="ddlMaterialName" name="ddlMaterialName" class="form-control cls" onchange="FetchMaterialDetails();">
                                            <option value="">-Select Material Name-</option>
                                        </select>
                                    </td>
                                   <td> 
                                        <input type="text" class="form-control dcmlNo" id="txtMaterialStock" name="txtMaterialStock" readonly="readonly" />
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtMaterialQty" name="txtMaterialQty" onchange="UpdateTaxableAmount();" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="0" />
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo" id="txtMaterialUnitMeasure" name="txtMaterialUnitMeasure" readonly="readonly" />
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtMaterialRate" name="txtMaterialRate" onchange="UpdateTaxableAmount();" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" />
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo" id="txtTaxableAmt" name="txtTaxableAmt" value="0"  readonly="readonly" onchange="UpdateTotalAmount();"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtCGST" name="txtCGST" onchange="GSTValidation();"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtSGST" name="txtSGST" onchange="GSTValidation();"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtIGST" name="txtIGST" onchange="GSTValidation();"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtFreightCharge" name="txtFreightCharge" value="0" oninput="handleNumericInput(event)" onchange="UpdateTotalAmount();"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtLoadingUnLoading" name="txtLoadingUnLoading" value="0" oninput="handleNumericInput(event)" onchange="UpdateTotalAmount();"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo cls" id="txtRoundOff" name="txtRoundOff" readonly="readonly"/>
                                    </td>
                                    <td> 
                                        <input type="text" class="form-control dcmlNo" id="txtMaterialTotalAmount" name="txtMaterialTotalAmount" readonly="readonly" />
                                    </td>
                                    <%--<td> 
                                        <input type="text" class="form-control cls" id="txtDesciption" name="txtDesciption"  />
                                    </td>--%>
                                    <td>
                                        <button type="button" class="btn btn-primary" onclick="SaveSalesOrderDetails();">Add</button>
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

         <!-- Modal to display PDF -->
      <div class="modal fade" id="pdfModal" tabindex="-1" role="dialog" aria-labelledby="pdfModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pdfModalLabel">PDF Preview</h5>
                <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>--%>
            </div>
            <div class="modal-body">
                <iframe id="pdfPreview" style="width: 100%; height: 900px;" frameborder="0"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"  onclick="ClosePDFModal();">Close</button>
            </div>
        </div>
    </div>
</div>




</asp:Content>
