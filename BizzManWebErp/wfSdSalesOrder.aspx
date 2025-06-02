<%@ Page Title="" Language="C#" MasterPageFile="~/SdMainMenu.Master" AutoEventWireup="true" CodeBehind="wfSdSalesOrder.aspx.cs" Inherits="BizzManWebErp.wfSdSalesOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <link href="css/bootstrap-datepicker.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"> </script>
    <script src="Scripts/SalesOrder.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hdnSalesOrderId" />
    <button onclick="CreateSalesOrder();" id="btnCreate">Create</button>
    <button onclick="ViewSalesOrderList();" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddSalesOrder();" style="display: none;" id="btnSave" title=" Press Ctrl + S to save record">Save</button>
    <button onclick="UpdateSalesOrderStatus('2');" style="display: none;" id="btnConfirm">Confirm</button>
    <button onclick="UpdateSalesOrderStatus('4');" style="display: none;" id="btnCancel">Cancel</button>
    <button type="button" class="preventDefault" id="previewBtn" style="display: none" onclick="PrintPreview()">
        Preview PDF
    </button>


    <div class="container" id="divSalesOrderList" style="margin-top: 10px; overflow: auto;">
        <table id="tblSalesOrderList" class="display">
            <thead>
                <tr>
                    <th class="noSort">
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="white-space: nowrap;">Sales Order Id</th>
                    <th style="white-space: nowrap;">Manual Order Id</th>
                    <th style="white-space: nowrap;">Order Source</th>
                    <th style="white-space: nowrap;">Customer</th>
                    <th style="white-space: nowrap;">Branch</th>
                    <th style="white-space: nowrap;">Department</th>
                    <th style="white-space: nowrap;">GST Treatment</th>
                    <th style="white-space: nowrap;">Expiration Date</th>
                    <th style="white-space: nowrap;">Quotation Date</th>
                    <th style="white-space: nowrap;">Currency</th>
                    <th style="white-space: nowrap;">Payment Terms</th>
                    <th style="white-space: nowrap;">Order Status</th>
                    <th style="white-space: nowrap;">Delivery Charges</th>
                    <th style="white-space: nowrap;">Outstanding Amount</th>
                    <th style="white-space: nowrap;">Advance</th>
                    <th style="white-space: nowrap;">Total Amount</th>
                </tr>
            </thead>
            <tbody id="tbody_SalesOrder_List">
            </tbody>
        </table>
    </div>



    <div class="container" id="divSalesOrderEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Direct Sales Order
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Customer *</td>
                                <td>
                                    <select id="ddlCustomer" name="ddlCustomer" class="rounded border-dark" style="width: 300px;">
                                        <option value="">-Select Customer-</option>
                                    </select>

                                    <a href="#" onclick="AddNewCustomer();">Add</a>
                                </td>
                                <td style="width: 10%;">Order Date</td>
                                <td>
                                    <input type="text" placeholder="mm/dd/yyyy" class="form-control datepicker" id="txtorderDate" name="txtorderDate" onchange="GenerateOrderID()" />
                                </td>
                            </tr>
                            <tr>
                                <td>GST Treatment </td>
                                <td>
                                    <select id="ddlGSTTreatment" name="ddlGSTTreatment" class="form-control">
                                        <option value="">-Select GST Treatment-</option>
                                        <option value="Registered Business - Regular">Registered Business - Regular</option>
                                        <option value="Registered Business - Composition">Registered Business - Composition</option>
                                        <option value="Unregistered Business">Unregistered Business</option>
                                        <option value="Consumer">Consumer</option>
                                        <option value="Overseas">Overseas</option>
                                        <option value="Special Economic Zone">Special Economic Zone</option>
                                        <option value="Deemed Export">Deemed Export</option>
                                    </select>

                                </td>
                                <%-- <td>Quotation Date *</td>
                                <td>
                                    <input type="date" class="form-control" id="txtQuotationDate" name="txtQuotationDate" />
                                </td>--%>
                                <td style="width: 10%;">Delivery Date</td>
                                <td>
                                    <input type="text" class="form-control datepicker" id="txtDeliveryDate" name="txtDeliveryDate" placeholder="mm/dd/yyyy" />
                                </td>
                            </tr>
                            <tr>
                                <td>Currency </td>
                                <td>
                                    <select id="ddlCurrency" name="ddlCurrency" class="form-control" style="width: 300px;">
                                        <option value="">-Select Currency-</option>
                                    </select>
                                </td>

                                <td style="width: 10%;">Quotation Id</td>
                                <td>
                                    <input type="text" class="form-control" id="txtQuotationId" placeholder="Quotation Id" name="txtQuotationId" disabled />
                                </td>

                            </tr>
                            <tr>
                                <td>Department</td>
                                <td>
                                    <select id="ddlDept" name="ddlDept" class="form-control">
                                        <%--<option class="txt-center" value="">-Select Department-</option>--%>
                                    </select>
                                </td>
                                <td>Expiration Date </td>
                                <td>
                                    <input type="text" class="form-control datepicker" id="txtExpirationDate" name="txtExpirationDate" />
                                </td>
                           </tr>
                            <tr>
                                <td>Terms & Conditions</td>
                                <td>
                                    <input type="text" class="form-control" id="txtTermsConditions" placeholder="Terms & Conditions" name="txtTermsConditions" />
                                </td>
                                <td>Payment Terms</td>
                                <td>
                                    <select id="ddlPaymentTerms" name="ddlPaymentTerms" class="form-control" style="width: 300px;">
                                        <option value="">-Select Payment Terms-</option>
                                        <option value="Immediate Payment">Immediate Payment</option>
                                        <option value="15 Days">15 Days</option>
                                        <option value="21 Days">21 Days</option>
                                        <option value="30 Days">30 Days</option>
                                        <option value="45 Days">45 Days</option>
                                        <option value="2 Months">2 Months</option>
                                        <option value="End of Following Month">End of Following Month</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Sale Order Id</td>
                                <td>
                                    <input type="text" class="form-control" id="txtSaleOrderId" placeholder="Sale Order Id" name="txtSaleOrderId" readonly="readonly" />
                                </td>
                                <td>Branch *</td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" style="width: 300px;">
                                        <option value="">-Select Branch-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>                                
                                <td>Total Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtTotalAmount" name="txtTotalAmount" placeholder="Total Amount" readonly="readonly" />
                                </td>
                                <td>Delivery Charges</td>
                                <td>
                                    <input type="text" class="form-control" id="txtDeliveryCharges" name="txtDeliveryCharges" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" onchange="calculateGrandTotal()" value="0" />
                                </td>
                            </tr>
                             <tr>
                             <td>Shipping Charges</td>
                             <td>
                                 <input type="text" class="form-control" id="txtShippingCharges" name="txtShippingCharges" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" onchange="calculateGrandTotal()" />
                             </td>
                             <td>Net Amount</td>
                              <td>
                                  <input type="text" class="form-control" id="txtNetAmount" name="txtNetAmount" placeholder="Net Amount" readonly="readonly" />
                              </td>
                            </tr>
                            <tr>
                                 <td>Payment Mode *</td>
                                     <td>
                                         <select type="text" class="form-control" id="ddlPaymentMode" name="ddlPaymentMode">
                                             <option>Select Payment Mode</option>

                                         </select>
                                     </td>
                                <td>Advance</td>
                                <td>
                                    <input type="text" class="form-control" id="txtAdvance" name="txtAdvance" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" onchange="calculateGrandTotal()" />
                                </td>
                            </tr>

                            <tr>
                                 <td>Outstanding Amount
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtOutstandingAmount" name="txtOutstandingAmount" value="0" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" onchange="calculateGrandTotal()" disabled />
                                 </td>
                               

                                <td>Bank A/c No.</td>
                                <td>
                                    <input type="text" class="form-control" id="txtAcNo" name="txtAcNo" placeholder="Bank A/c No" />
                                </td>
                            </tr>

                            <tr>
                               <td>Central Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="txtCentralTax" name="txtCentralTax" readonly="readonly" />
                                </td>
                                <td>Net GST</td>
                                <td>
                                    <input type="text" class="form-control" id="txtNetGST" name="txtNetGST" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                    
                                <td>Manual Order Id</td>
                                <td>
                                    <input type="text" class="form-control" id="txtManualOrderId" placeholder="Manual Order Id" name="txtManualOrderId" onchange="CheckManualOrderId()" />
                                </td>
                                <td>State Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="txtStateTax" name="txtStateTax" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Active</td>
                                <td>
                                    <input type="checkbox" class="" id="chkIsActive" name="chkIsActive" checked="checked" disabled="disabled" />
                                </td>
                                <td>Square Up</td>
                                <td>
                                    <input type="checkbox" class="" id="chkIsSquareUp" name="chkIsSquareUp" disabled="disabled" />
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
                Sales Order Lines
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblSalesOrderBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Master Id</th>
                                    <th style="width: 250px;">Material Name</th>
                                    <th>Stock</th>
                                    <th style="width: 100px;">Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Package</th>
                                    <th style="display: none;">Package Id</th>
                                    <th style="width: 100px;">Unit Price(Tax incl.)</th>
                                    <th style="width: 100px;">Discount (%)</th>
                                    <th>Tax (%)</th>
                                    <th>Total Amount</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody id="tbody_SalesOrderDetails">
                                <tr id="tr_SalesOrderDetailEntry">
                                    <td style="display: none;">
                                        <input type="hidden" value="" id="hdnCentralTaxPercent"><input type="hidden" value="" id="hdnStateTaxPercent"><input type="hidden" value="" id="hdnCessPercent"></td>
                                    <td style="width: 250px;">
                                        <select id="ddlMaterialName" name="ddlMaterialName" class="form-control" style="width:100% !important" onchange="FetchMaterialDetails();">
                                            <option value="">-Select Material Name-</option>
                                        </select>
                                    </td>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialStock" placeholder="Stock" name="txtMaterialStock" readonly="readonly" />
                                    </td>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialQty" name="txtMaterialQty" placeholder="Qty" onchange="UpdateTotalAmount();" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="0" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialUnitMeasure" placeholder="Unit" name="txtMaterialUnitMeasure" readonly="readonly" />
                                    </td>
                                    <td style="width: 100px;">
                                        <select id="ddlPackage" name="ddlPackage" class="form-control">
                                            <option value="">-Select Package-</option>
                                        </select>
                                    </td>
                                    <td style="display: none;"></td>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialRate" placeholder="Unit Price" name="txtMaterialRate" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" onchange="UpdateTotalAmount();" />
                                    </td>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialDiscount" placeholder="Discount" name="txtMaterialDiscount" onchange="UpdateTotalAmount();" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" />
                                    </td>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialTax" name="txtMaterialTax" placeholder="Tax" readonly="readonly" />
                                    </td>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialTotalAmount" name="txtMaterialTotalAmount" placeholder="Amount" readonly="readonly" />
                                    </td>
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="ClosePDFModal();">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="CustomerAddModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Customer</h5>

                </div>
                <div class="modal-body">
                    <table class="tbl">
                        <tr>
                            <td>Customer Name *</td>
                            <td>
                                <input type="text" class="form-control" id="txtCustomerName" name="txtCustomerName" /></td>
                            <td>Customer Type *</td>
                            <td>
                                <select id="ddlCustomerType" name="ddlCustomerType" class="form-control">
                                    <option value="">-Select Customer Type-</option>
                                </select><a href="#" onclick="AddCustomerType();">Add</a></td>

                        </tr>
                        <tr>
                            <td>Company Name *</td>
                            <td>
                                <input type="text" class="form-control" id="txtCompanyName" name="txtCompanyName" /></td>
                            <td>State *</td>
                            <td>
                                <select id="ddlState" name="ddlState" class="form-control" onchange="BindCityDropdown();">
                                    <option value="">-Select State-</option>
                                </select></td>


                        </tr>
                        <tr>
                            <td>City *</td>
                            <td>
                                <select id="ddlCity" name="ddlCity" class="form-control">
                                    <option value="">-Select City-</option>
                                </select></td>
                            <td>Email *</td>
                            <td>
                                <input type="text" class="form-control" id="txtEmail" name="txtEmail" /></td>

                        </tr>
                        <tr>
                            <td>Mobile No. *</td>
                            <td>
                                <input type="text" class="form-control" id="txtMobile" name="txtMobile" /></td>
                            <td></td>
                            <td></td>

                        </tr>
                    </table>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="CloseModal();">Close</button>
                    <button type="button" class="btn btn-primary" onclick="AddCustomerDetails();">Add Customer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="CustomerTypeAddModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Add Customer Type</h5>

                </div>
                <div class="modal-body">
                    <table class="tbl">
                        <tr>
                            <td>Customer Type *</td>
                            <td>
                                <input type="text" class="form-control" id="txtCustomerType" name="txtCustomerType" /></td>

                        </tr>

                    </table>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="CloseCustomerTypeModal();">Close</button>
                    <button type="button" class="btn btn-primary" onclick="AddNewCustomerType();">Add Customer Type</button>
                </div>
            </div>
        </div>
    </div>



</asp:Content>


