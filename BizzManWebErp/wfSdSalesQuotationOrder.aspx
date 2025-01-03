<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdSalesQuotationOrder.aspx.cs" MasterPageFile="~/SdMainMenu.Master" Inherits="BizzManWebErp.wfSdSalesQuotationOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/bootstrap-datepicker.min.css" rel="stylesheet" />
    <!-- Include Font Awesome CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap4.min.css">



    <script src="Scripts/jquery-ui.min.js"></script>

    <%--  <script src="Scripts/jquery-3.5.1.slim.min.js"></script>--%>
    <script src="Scripts/bootstrap.min.js"></script>
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <script src="Scripts/SdSalesQuotationOrder.js"></script>
    <style>
        .no-rows-footer {
            display: none;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <button onclick="CreateData();" class="preventDefault">Create</button>
    <button onclick="ViewSalesOrderList();" class="preventDefault">View</button>
    <button id="saveDataBtn" onclick="AddSalesOrder()" class="preventDefault" style="display: none">Save</button>
    <%--<button id="PrintDataBtn" runat="server" OnClientClick="generatePDF()" OnClick="btnPrint_Click"  style="display:none">Print</button>--%>
    <button type="button" class="preventDefault" id="previewBtn" style="display: none" onclick="PrintPreview()">
        Preview PDF
    </button>
    <input type="hidden" id="loginuser" runat="server" />





    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">

        <div>
    <div style="padding-bottom: 40px">
        <button type="button" onclick="DownloadExcel();" style="float: right" class="fa fa-file-excel-o"><span style="padding-left: 10px;">Export</span></button>
    </div>
</div>
        <table id="tblSalesOrderList" class="display">
            <thead>
                <tr>

                    <%-- <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>--%>
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

    <div class="container" id="divDataEntry" style="margin-top: 10px; display: none; overflow: auto;">



        <div class="card">
            <div class="card-header">
                Quotation Sales Orders
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Quotation ID</label>
                                </td>
                                <td>


                                    <div class="input-group mb-3">

                                        <select style="width: 100%;" id="ddlQuotationId" name="ddlQuotationId" onchange="GetQuotationIdDetails()" class="rounded border-dark">
                                        </select>

                                    </div>

                                </td>
                                <td style="width: 10%;">Order Date</td>
                                <td>
                                    <input type="date" class="form-control" id="txtorderDate" name="txtorderDate" onchange="GenerateOrderID()" />
                                </td>
                            </tr>
                            <tr>

                                <td>Customer </td>
                                <td>
                                    <input type="hidden" id="hdnCustomerId" value="" />
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtCustomer" name="txtCustomer" disabled />
                                </td>
                                <td>Sales Order Id</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtSalesOrderId" name="txtSalesOrderId" disabled />
                                </td>


                            </tr>
                            <tr>
                                <td style="width: 15%;">Quotation Date</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtQuotationDate" name="txtQuotationDate" disabled />
                                </td>
                                <td>Expiration Date *</td>
                                <td>
                                    <input type="date" class="form-control"  id="txtExpirationDate"  name="txtExpirationDate" />
                                </td>
                            </tr>
                            <tr>

                                <td>GST Treatment</td>
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
                                <td>Currency</td>
                                <td>
                                    <select id="ddlCurrency" name="ddlCurrency" class="form-control" style="width: 300px;">
                                        <option value="">-Select Currency-</option>
                                    </select>
                                </td>
                                <td>Branch *</td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" style="width: 300px;">
                                        <option value="">-Select Branch-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>

                                <td>Department *</td>
                                <td>
                                    <select id="ddlDept" name="ddlDept" class="form-control">
                                        <%--<option class="txt-center" value="">-Select Department-</option>--%>
                                    </select>
                                </td>
                                <td>Total Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtTotalAmount" name="txtTotalAmount" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>

                                <td>Outstanding Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtOutstandingAmount" name="txtOutstandingAmount" readonly="readonly" />
                                </td>
                                <td>Advance</td>
                                <td>
                                    <input type="text" class="form-control" id="txtAdvance" name="txtAdvance" onchange="GetTotalAmount()" oninput="handleNumericInput(event)" />
                                </td>

                            </tr>


                            <tr>

                                <td>Payment Mode *</td>
                                <td>
                                    <select type="text" class="form-control" id="ddlPaymentMode" name="ddlPaymentMode">
                                        <option>Select Payment Mode</option>

                                    </select>
                                </td>

                                <td>Bank A/c No.</td>
                                <td>
                                    <input type="text" class="form-control" id="txtAcNo" name="txtAcNo" placeholder="Bank A/c No" />
                                </td>
                            </tr>

                            <tr>
                                <td>Delivery Charges</td>
                                <td>
                                    <input type="text" class="form-control" id="txtDeliveryCharges" name="txtDeliveryCharges" onchange="GetTotalAmount()" oninput="handleNumericInput(event)" />
                                </td>
                                <td>Net GST</td>
                                <td>
                                    <input type="text" class="form-control" id="txtNetGST" name="txtNetGST" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Central Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="txtCentralTax" name="txtCentralTax" readonly="readonly" />
                                </td>
                                <td>State Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="txtStateTax" name="txtStateTax" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Terms & Conditions</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="txtTermsConditions" name="txtTermsConditions" />
                                </td>

                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        </div>
        <br />
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
                                    <th>
                                        <input type="checkbox" id="selectAll"></th>
                                    <th style="display: none;">Material Master Id</th>
                                    <th style="display: none;">SalesQuotationDetailId</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measure</th>
                                    <%--<th>Package</th>
                                    <th style="display: none;">Package Id</th>--%>
                                    <th>Unit Price</th>
                                    <th>Discount (%)</th>
                                    <th>Tax (%)</th>
                                    <th>Total Amount</th>

                                </tr>
                            </thead>



                            <tbody id="tbody_SalesOrderDetails">
                            </tbody>



                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <div class="container" id="divDataEntryDetails" style="margin-top: 10px; display: none; overflow: auto;">



        <div class="card">
            <div class="card-header">
                Add Sales Order
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Quotation ID</label>
                                </td>
                                <td>


                                    <div class="input-group mb-3">
                                        <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispQuotationId" name="dispQuotationId" disabled />



                                    </div>

                                </td>
                                <td style="width: 10%;">Order Date</td>
                                <td>
                                    <input type="text" class="form-control" id="disporderDate" name="disporderDate" disabled />
                                </td>
                            </tr>
                            <tr>

                                <td>Customer </td>
                                <td>

                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispCustomer" name="dispCustomer" disabled />
                                </td>
                                <td>Sales Order Id</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispSalesOrderId" name="dispSalesOrderId" disabled />
                                </td>


                            </tr>
                            <tr>
                                <td style="width: 15%;">Quotation Date</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispQuotationDate" name="txtQuotationDate" disabled />
                                </td>
                                <td>Expiration Date </td>
                                <td>
                                    <input type="text" class="form-control" id="dispExpirationDate" name="dispExpirationDate" disabled />
                                </td>
                            </tr>
                            <tr>

                                <td>GST Treatment </td>
                                <td>
                                    <input type="text" class="form-control" id="dispGSTTreatment" name="dispGSTTreatment" disabled />


                                </td>
                                <td>Payment Terms</td>
                                <td>

                                    <input type="text" class="form-control" id="dispPaymentTerms" name="dispPaymentTerms" disabled />

                                </td>

                            </tr>
                            <tr>
                                <td>Currency</td>
                                <td>
                                    <input type="text" class="form-control" id="dispCurrency" name="dispCurrency" disabled />

                                </td>
                                <td>Branch</td>
                                <td>
                                    <input type="text" class="form-control" id="dispBranch" name="dispBranch" disabled />

                                </td>
                            </tr>
                            <tr>

                                <td>Department</td>
                                <td>
                                    <input type="text" class="form-control" id="dispDept" name="dispDept" disabled />

                                </td>
                                <td>Total Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="dispTotalAmount" name="dispTotalAmount" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>

                                <td>Outstanding Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="dispOutstandingAmount" name="dispOutstandingAmount" readonly="readonly" />
                                </td>
                                <td>Advance</td>
                                <td>
                                    <input type="text" class="form-control" id="dispAdvance" name="dispAdvance" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>

                                <td>Delivery Charges</td>
                                <td>
                                    <input type="text" class="form-control" id="dispDeliveryCharges" name="dispDeliveryCharges" readonly="readonly" />
                                </td>
                                <td>Net GST</td>
                                <td>
                                    <input type="text" class="form-control" id="dispNetGST" name="dispNetGST" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>
                                <td>Central Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="dispCentralTax" name="dispCentralTax" readonly="readonly" />
                                </td>
                                <td>State Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="dispStateTax" name="dispStateTax" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Terms & Conditions</td>
                                <td colspan="3">
                                    <input type="text" class="form-control" id="dispTermsConditions" name="dispTermsConditions" disabled />
                                </td>

                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div class="card">
            <div class="card-header">
                Sales Order Lines
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="disptblSalesOrderBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>

                                    <th style="display: none;">Material Master Id</th>

                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measure</th>
                                    <%--<th>Package</th>
                                    <th style="display: none;">Package Id</th>--%>
                                    <th>Unit Price</th>
                                    <th>Tax (%)</th>
                                    <th>Total Amount</th>

                                </tr>
                            </thead>



                            <tbody id="disptbody_SalesOrderDetails">
                            </tbody>



                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>



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




</asp:Content>
