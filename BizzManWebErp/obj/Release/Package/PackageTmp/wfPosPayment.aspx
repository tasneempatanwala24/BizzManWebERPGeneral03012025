<%@ Page Title="" Language="C#" MasterPageFile="~/POS.Master" AutoEventWireup="true" CodeBehind="wfPosPayment.aspx.cs" Inherits="BizzManWebErp.wfPosPayment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript"
        src="https://code.jquery.com/jquery-3.5.1.js">
    </script>
    <!-- DataTables CSS -->
    <link rel="stylesheet"
        href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js">
    </script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <link href="css/POS.css" rel="stylesheet" />
    <script src="Scripts/PosPayment.js"></script>
    <script src="Scripts/moment.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card">
        <div class="POS-Conten">
            <div class="window">
                <div class="screen">
                    <div class="screen-content">
                        <div class="top-content">
                            <button onclick="Back();" class="buttonCreatCustomer" id="btnback"><i class="fa fa-angle-double-left fa-fw"></i>Back</button>
                            <div class="top-content-center">
                                <h2>Payment</h2>
                            </div>
                            <button onclick="Validate();" class="buttonCreatCustomer" id="btnvalidate" style="background-color: rgb(110,200,155);">Validate<i class="fa fa-angle-double-right fa-fw"></i></button>
                        </div>
                        <div class="main-content">
                            <div class="left-content">
                                <div class="paymentmethods-container">
                                    <div class="paymentlines"></div>
                                    <div class="paymentmethods">
                                        <div class="cashbutton paymentmethod">
                                            <div class="payment-name">Cash</div>
                                        </div>
                                        <div class="cashbutton paymentmethod">
                                            <div class="payment-name">Bank</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right-content">
                                <section class="paymentlines-container">
                                    <div class="total">₹ 0.00</div>
                                    <div class="message">Please select a payment method. </div>
                                </section>
                                <div class="payment-buttons-container">
                                    <section class="payment-numpad">
                                        <div class="numpadpay">
                                            <div class="row">
                                                <button class="numpadPayment">1</button>
                                                <button class="numpadPayment onepay">2</button>
                                                <button class="numpadPayment onepay">3</button>
                                                <button class="numpadPayment Tenpay">+10</button>
                                            </div>
                                            <br />
                                            <div class="row">
                                                <button class="numpadPayment Fourpay">4</button>
                                                <button class="numpadPayment Fivepay">5</button>
                                                <button class="numpadPayment Fivepay">6</button>
                                                <button class="numpadPayment twentypay">+20</button>
                                            </div>
                                            <br />
                                            <div class="row">
                                                <button class="numpadPayment Fourpay">7</button>
                                                <button class="numpadPayment Fivepay">8</button>
                                                <button class="numpadPayment Fivepay">9</button>
                                                <button class="numpadPayment twentypay">+50</button>
                                            </div>
                                            <br />
                                            <div class="row">
                                                <button class="numpadPayment Fourpay">+/-</button>
                                                <button class="numpadPayment Fivepay">0</button>
                                                <button class="numpadPayment Fivepay">.</button>
                                                <button class="numpadPayment twentypay">
                                                    <img src="Images/backspace1.png" width="24" height="21" alt="Backspace"></button>
                                            </div>
                                        </div>
                                    </section>
                                    <div class="payment-buttons">
                                        <div class="customer-button">
                                            <button class="button customerpaybtn"><i role="img" aria-label="Customer" title="Customer" class="fa fa-user"></i>Customer</button>
                                        </div>
                                        <button class="button customerpaybtn"><i class="fa fa-file-text-o"></i>Invoice</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
