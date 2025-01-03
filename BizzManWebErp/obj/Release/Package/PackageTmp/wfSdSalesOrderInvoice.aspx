<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdSalesOrderInvoice.aspx.cs" Inherits="BizzManWebErp.wfSdSalesOrderInvoice" MasterPageFile="~/SdMainMenu.Master" %>

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

    <script src="Scripts/SdSalesOrderInvoice.js"></script>
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
                    <th style="white-space: nowrap;">Sales Invoice Id</th>
                    <th style="white-space: nowrap;">Sales Order Id</th>
                    <th style="white-space: nowrap;">Manual Order Id</th>
                    <th style="white-space: nowrap;">Customer</th>
                    <th style="white-space: nowrap;">Invoice Date</th>
                    <th style="white-space: nowrap;">Delivery Charges</th>
                    <th style="white-space: nowrap;">Total Amount</th>
                    <th style="white-space: nowrap;">Outstanding Amount</th>
                    <th style="white-space: nowrap;">Advance</th>
                    <th style="white-space: nowrap;">Payment Complete</th>


                </tr>
            </thead>
            <tbody id="tbody_SalesOrder_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divDataEntry" style="margin-top: 10px; display: none; overflow: auto;">



        <div class="card">
            <div class="card-header">
                Sales Invoice
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Sales Order ID</label>
                                </td>
                                <td>


                                    <div class="input-group mb-3">

                                        <select style="width: 100%;" id="ddlSalesOrderd" name="ddlSalesOrderd" onchange="GetSalesOrderIdDetails()" class="rounded border-dark">
                                        </select>

                                    </div>

                                </td>
                                <td style="width: 10%;">Sales Invoice Date*</td>
                                <td>
                                    <input type="text" class="form-control datepicker" id="txtSalesInvoiceDate" name="txtSalesInvoiceDate" onchange="GenerateOrderID()" />
                                </td>
                            </tr>
                            <tr>

                                <td>Customer </td>
                                <td>
                                    <input type="hidden" id="hdnCustomerId" value="" />
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtCustomer" name="txtCustomer" disabled />
                                </td>
                                <td>Sales Invoice Id</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtSalesInvoiceId" name="txtSalesInvoiceId" disabled />
                                </td>


                            </tr>

                            <tr>


                                <td>Total Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtTotalAmount" name="txtTotalAmount" readonly="readonly" value="0.00" />
                                </td>
                                <td>Outstanding Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtOutstandingAmount" name="txtOutstandingAmount" value="0.00" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>

                                <td>Total Paid Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="txtTotalPaid" value="0  " name="txtTotalPaid" readonly="readonly" />
                                    <%--<input type="text" class="form-control" id="txtDeliveryCharges" style="display: none !important" name="txtDeliveryCharges" onchange="GetTotalAmount()" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" />--%>
                                </td>
                                <td>Advance</td>
                                <td>
                                    <input type="number" class="form-control" id="txtAdvance" value="0" name="txtAdvance" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Payment Complete</td>
                                <td>
                                    <input type="text" class="form-control" id="txtPaymentComplete" name="txtPaymentComplete" value="n" readonly />
                                </td>
                                <td>Net GST</td>
                                <td>
                                    <input type="text" class="form-control" id="txtNetGST" name="txtNetGST" value="0.00" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Central Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="txtCentralTax" name="txtCentralTax" readonly="readonly" value="0.00" />
                                </td>
                                <td>State Tax Value</td>
                                <td>
                                    <input type="text" class="form-control" id="txtStateTax" name="txtStateTax" readonly="readonly" value="0.00" />
                                </td>
                            </tr>

                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea type="text" class="form-control" id="txtDesc" maxlength="500" style="resize: none !important" name="txtDesc" placeholder="Description"> </textarea>
                                </td>

                                <td >Delivery Charges</td>
                                <td >
                                    <input type="text" class="form-control" id="txtDeliveryCharges" readonly="readonly" name="txtDeliveryCharges" onchange="GetTotalAmount()" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" />
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
                                    <th style="display: none;">SalesOrderDetailId</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measure</th>
                                    <th>Package</th>
                                    <th style="display: none;">Package Id</th>
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
                Sales Order Invoice
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Sales Order ID</label>
                                </td>
                                <td>


                                    <div class="input-group mb-3">


                                        <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispSalesOrderId" name="dispSalesOrderId" disabled />


                                    </div>

                                </td>
                                <td style="width: 10%;">Sales Invoice Date*</td>
                                <td>
                                    <input type="text" class="form-control" id="dispSalesInvoiceDate" name="dispSalesInvoiceDate" disabled />
                                </td>
                            </tr>
                            <tr>

                                <td>Customer </td>
                                <td>

                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispCustomer" name="dispCustomer" disabled />
                                </td>
                                <td>Sales Invoice Id</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="dispSalesInvoiceId" name="dispSalesInvoiceId" disabled />
                                </td>


                            </tr>

                            <tr>


                                <td>Total Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="dispTotalAmount" name="dispTotalAmount" readonly="readonly" />
                                </td>
                                <td>Outstanding Amount</td>
                                <td>
                                    <input type="text" class="form-control" id="dispOutstandingAmount" name="dispOutstandingAmount" readonly="readonly" />
                                </td>

                            </tr>
                            <tr>

                                <td>Total Paid Amount</td>
                                <td>

                                    <input type="text" class="form-control" id="txtTotalPaidDisp" value="0  " name="txtTotalPaidDisp" readonly="readonly" />
                                    <%--<input type="number" class="form-control" id="dispDeliveryCharges" style="display: none !important" name="dispDeliveryCharges" readonly />--%>
                                </td>
                                <td>Advance</td>
                                <td>
                                    <input type="number" class="form-control" id="dispAdvance" name="dispAdvance" readonly />
                                </td>
                            </tr>
                            <tr>
                                <td>Payment Complete</td>
                                <td>
                                    <input type="text" class="form-control" id="dispPaymentComplete" name="dispPaymentComplete" value="n" readonly />
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
                                <td>Description</td>
                                <td>
                                    <textarea type="text" class="form-control" id="txtDescDisp" readonly="readonly" maxlength="500" style="resize: none !important" name="txtDesc" placeholder="Description"> </textarea>
                                </td>
                                <td >Delivery Charges</td>
                                <td> 

                                    <input type="number" class="form-control" id="dispDeliveryCharges" name="dispDeliveryCharges" readonly="readonly" />
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
                                    <th>Package</th>
                                    <th style="display: none;">Package Id</th>
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




</asp:Content>
