<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdSalesOrderPaymentMaster.aspx.cs" MasterPageFile="~/SdMainMenu.Master" Inherits="BizzManWebErp.wfSdSalesOrderPaymentMaster" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!DOCTYPE html>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/SdSalesOrderPaymentMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/SdSalesOrderPaymentMaster.js"></script>

    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/alertify.min.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/default.min.css" />



</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <button type="button" onclick="HideShowView();" id="btnTitle" class="LabelTitle">Payments</button><br />
    <button type="button" id="btnCreate" onclick="CreatePaymentEntry(this);">Create</button>
    <button type="button" onclick="ViewPaymentList();" id="btnView">View</button>
    <button type="button" onclick="AddPayment();" style="display: none" id="btnSave">Save</button>


    <div class="container" id="divPaymentList">
        <div id="dvListView">
            <div class="card">
                <div class="card-header">
                    <b style="vertical-align: sub">Payment List</b>
                    <button type="button" onclick="DownloadExcel();" style="float: right" class="fa fa-file-excel-o"><span style="padding-left: 10px;">Export</span></button>
                </div>
                <div class="card-body">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <table id="tblPayDetails" class="display">
                                <thead>
                                    <tr>
                                        <th scope="col" style="display: none">Id </th>
                                        <th scope="col">Sales OrderId</th>
                                        <th scope="col">Payment Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Mobile No.</th>
                                        <th scope="col">Payment Mode</th>
                                        <th scope="col">Payment Type</th>
                                        <th scope="col">Payment Amount</th>
                                        <th scope="col">Payment Date</th>
                                        <th scope="col">Created By</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_tblPaymentList">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="exTab2" class="container" style="display: none">
        <ul class="nav nav-tabs row">
            <li class="active col-6">
                <a href="#1" data-toggle="tab">Payment Details</a>
            </li>
            <li class="col-6"><a href="#2" data-toggle="tab" onclick="GetUrl(this);">Sales Order Details</a>
            </li>
        </ul>

        <div class="tab-content row">
            <div class="tab-pane active" id="1">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-floating">
                                <select class="form-select" id="ddlSalesOrders" aria-label="ddlSalesOder">
                                    <option value="-1" selected>Select sales order</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div id="dvListViews">
                                <div class="card">
                                    <div class="card-header">
                                        <b>Add Payment Details</b>
                                    </div>
                                    <div class="card-body">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <input type="text" readonly class="form-control rounded border-dark" id="txtTotalPayment" value="00.00" />
                                                            <label for="txtPaymentAmnt" style="color: blue">Total Amount</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">

                                                        <div class="form-floating">
                                                            <input type="text" readonly class="form-control rounded border-dark" id="txtTotalPaid" value="00.00" />
                                                            <label for="txtPaymentAmnt" style="color: green">Total Paid</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">

                                                        <div class="form-floating">
                                                            <input type="text" readonly class="form-control rounded border-dark" id="txtOutstanding" value="00.00" />
                                                            <label for="txtPaymentAmnt" style="color: red;">Outstanding Net Amount</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <select class="form-select" id="ddlPaymentMode" required aria-label="ddlPaymentMode">
                                                            </select>
                                                            <label for="ddlPaymentMode">Payment Mode</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <input type="text" class="form-control" maxlength="20" id="txtAccountNumber" required placeholder="" value="" />
                                                            <label for="txtPaymentAmnt">Bank Account Number</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <input type="number" class="form-control" maxlength="10" id="txtPaymentAmnt" required placeholder="" value="" />
                                                            <label for="txtPaymentAmnt">Payment amount</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <input type="date" class="form-control" id="txtPaymentDate" onchange="GeneratePaymentID()" required placeholder="mm/dd/yyyy" value="" />
                                                            <label for="txtPaymentDate">Payment date</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <textarea placeholder="Description..." maxlength="300" class="form-control" id="txtDesc"></textarea>
                                                            <label for="txtDesc">Description</label>
                                                        </div>

                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-floating">
                                                            <input type="text" readonly class="form-control rounded border-dark" id="txtPaymentId" />
                                                            <label for="txtPaymentId">Payment Id</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="row">
                        <div class="col">
                            <div id="dvListViewHist">
                                <div class="card">
                                    <div class="card-header">
                                        <b style="vertical-align: sub;">Payment History</b>
                                        <button type="button" onclick="DownloadExcel(this);" id="exportSOPL" style="float: right" class="fa fa-file-excel-o hdBtn"><span style="padding-left: 10px;">Export</span></button>
                                    </div>
                                    <div class="card-body">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="table caption-top  table-striped table-bordered" id="tblPayDetailsInner">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" style="display: none">Id</th>
                                                            <th scope="col">Sales OrderId</th>
                                                            <th scope="col">Payment Id</th>
                                                            <th scope="col">Payment Mode</th>
                                                            <th scope="col">Payment Type</th>
                                                            <th scope="col">Payment Amount</th>
                                                            <th scope="col">Payment Date</th>
                                                            <th scope="col">Created By</th>
                                                            <th scope="col">Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div class="tab-pane" id="2">
                <iframe src='#' id="iframeSalerOrder" frameborder="0"></iframe>
            </div>
        </div>
    </div>

    <div class="container" id="divPaymentEntryDetail" style="display: none; width: 100% !important">
        <div class="card">
            <div class="card-header">
                <b style="vertical-align: sub">Payment Entry</b>
                <button type="button" class="preventDefault fa fa-file-pdf-o" id="previewBtn" style="float: right" onclick="PrintPreview()"><span style="margin-left: 10px">Preview Receipt</span> </button>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tblPaymentEntry" id="tblPaymentEntryID" cellspacing="6" cellpadding="6">
                            <tr>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtPaymentIdRead" required aria-label="txtPaymentIdRead" />
                                        <label for="txtPaymentIdRead">Payment Id</label>
                                    </div>
                                </td>
                                <td class="col-4" colspan="2">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtCustomerContactRead" required aria-label="txtCustomerContactRead" />
                                        <label for="txtCustomerContactRead">Customer Details</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtSalesOrderRead" required aria-label="txtSalesOrderRead" />
                                        <label for="txtSalesOrderRead">Sales Order Id</label>
                                    </div>
                                </td>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtPaymentModeRead" required aria-label="txtPaymentMode" />
                                        <label for="txtPaymentMode">Payment Mode</label>
                                    </div>
                                </td>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly maxlength="20" id="txtAccountNumberRead" required placeholder="" value="" />
                                        <label for="txtAccountNumberRead">Bank Account Number</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly maxlength="10" id="txtPaymentAmntRead" required placeholder="" value="" />
                                        <label for="txtPaymentAmntRead">Payment amount</label>
                                    </div>
                                </td>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtPaymentDateRead" required placeholder="" value="" />
                                        <label for="txtPaymentDateRead">Payment date</label>
                                    </div>
                                </td>
                                <td class="col-4" rowspan="2">
                                    <div class="form-floating">
                                        <textarea placeholder="Description..." readonly maxlength="300" style="height: 128px" class="form-control" id="txtDescRead"></textarea>
                                        <label for="txtDescRead"></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly maxlength="10" id="txtCreatedUserRead" required placeholder="" value="" />
                                        <label for="txtCreatedUserRead">Created by</label>
                                    </div>
                                </td>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtCreatedOnRead" required placeholder="" value="" />
                                        <label for="txtCreatedOnRead">Created date</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly maxlength="10" id="txtTotalPaymentRead" required placeholder="" value="" />
                                        <label for="txtTotalPaymentRead" style="color:blue">Total Amount</label>
                                    </div>
                                </td>
                                <td class="col-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtTotalPaidRead" required placeholder="" value="" />
                                        <label for="txtTotalPaidRead" style="color:green">Total Paid</label>
                                    </div>
                                </td>
                                <td class="col-4" rowspan="2">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly id="txtOutstandingRead" required placeholder="" value="" />
                                        <label for="txtOutstandingRead" style="color:red">Outstanding Net Amount</label>
                                    </div>

                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <br />

        <div class="row">
            <div class="col">
                <div id="dvListViewHistInner">
                    <div class="card">
                        <div class="card-header">
                            <b style="vertical-align: sub;">Payment History</b>
                        </div>
                        <div class="card-body">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <table class="table caption-top  table-striped table-bordered" id="tblPayDetailsInnerList">
                                        <thead>
                                            <tr>
                                                <th scope="col" style="display: none">Id</th>
                                                <th scope="col">Sales OrderId</th>
                                                <th scope="col">Payment Id</th>
                                                <th scope="col">Payment Mode</th>
                                                <th scope="col">Payment Type</th>
                                                <th scope="col">Payment Amount</th>
                                                <th scope="col">Payment Date</th>
                                                <th scope="col">Created By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div id="tblPaymentEntryPdfS" class="container" style="margin-left: 550px !important; display: none">
        <label style="font-size: xx-large">Payment Receipt</label>
        <table id="tblPaymentEntryPdf" cellspacing="6" cellpadding="6">
            <tr>
                <td>
                    <label>Sales Order Id</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtSalesOrderPrint" />
                </td>

            </tr>
            <tr>
                <td>
                    <label>Paid Amount</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtPaidAmountPrint" />
                </td>

            </tr>
            <tr>
                <td>
                    <label>Payment Date</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtPaymentDatePrint" />
                </td>

            </tr>
            <tr>
                <td>
                    <label>Payment Mode</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtPaymentModePrint" />
                </td>

            </tr>
            <tr>
                <td>
                    <label>Account No.</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtAcccountNumberPrint" />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Creaed By.</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtCreatedByPrint" />
                </td>

            </tr>
            <tr>
                <td>
                    <label>Creaed On</label>
                </td>
                <td>
                    <input type="text" class="form-control" id="txtCreatedOnPrint" />
                </td>

            </tr>

        </table>
    </div>
</asp:Content>
