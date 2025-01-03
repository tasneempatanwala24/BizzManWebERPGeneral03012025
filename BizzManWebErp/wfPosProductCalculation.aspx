<%@ Page Title="" Language="C#" MasterPageFile="~/POS.Master" AutoEventWireup="true" CodeBehind="wfPosProductCalculation.aspx.cs" Inherits="BizzManWebErp.wfPosProductCalculation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/ProductCalculation.js"></script>
    <script type="text/javascript"
        src="https://code.jquery.com/jquery-3.5.1.js">
    </script>
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js">
    </script>
    <link href="css/POS.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/PosProductCalculation.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js' type='text/javascript'></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card1">
        <div class="leftpart">
            <div class="order-container">
                <div class="order">
                    <div class="order-empty" id="Divorderempty">
                        <label id="lblprice"></label>
                        <i role="img" aria-label="Shopping cart" title="Shopping cart" class="fa fa-shopping-cart" id="imagecard"></i>
                        <h6 id="headerempty">This order is empty</h6>
                        <asp:HiddenField ID="hidden" runat="server" />
                    </div>
                </div>
            </div>
            <div class="pads">
                <div class="control-buttons"></div>
                <div class="subpads">
                    <div class="actionpad">
                        <button class="button" onclick="Customer();"><i role="img" style="padding: 10px;" aria-label="Customer" title="Customer" class="fa fa-user"></i>Customer</button>
                        <button class="button pay">
                            <div class="pay-circle" onclick="Payment();"><i role="img" aria-label="Pay" title="Pay" class="fa fa-chevron-right"></i></div>
                            Payment</button>
                    </div>
                    <div class="numpad">
                        <input type="button" class="numpadbutton" value="1" />
                        <input type="button" class="numpadbutton2" value="2" />
                        <input type="button" class="numpadbutton2" value="3" />
                        <input type="button" class="mode-button selected-mode numpadbuttonqty" value="Qty " />
                        <br />
                        <input type="button" class="numpadbutton1" value="4" />
                        <input type="button" class="numpadbutton2" value="5" />
                        <input type="button" class="numpadbutton2" value="6" />
                        <input type="button" class="mode-button numpadbuttonqty" value="Disc " />
                        <br />
                        <input type="button" class="numpadbutton7" value="7" />
                        <input type="button" class="numpadbutton8" value="8" />
                        <input type="button" class="numpadbutton9" value="9" />
                        <input type="button" class="mode-button numpadbuttonqty" value="Price" />
                        <br />
                        <input type="button" class="numpadbuttonplus" value="+/-" />
                        <input type="button" class="numpadbutton8" value="0" />
                        <input type="button" class="numpadbuttondot" value="." />
                        <input type="button" class="mode-button numpadbuttonqty" value="Clear" />
                    </div>
                </div>
            </div>
        </div>
        <div class="rightpart scrollspy-example" data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" tabindex="0" style="background-color: aqua;">
            <div class="products-widget">
                <div class="cardimage">
                    <asp:DataList ID="d1" runat="server" RepeatDirection="Horizontal" RepeatLayout="Table" RepeatColumns="3">
                        <ItemTemplate>
                            <div class="cardProduct">
                                <div class="cardimg">
                                    <asp:Image ID="Image1" runat="server" ImageUrl='<%#Eval("MaterialImage") %>' Height="66px" Width="66px" />
                                </div>
                                <a href="wfPosProductCalculation.aspx?Id=<%# Request.QueryString["Id"]%>"></a>
                                <div class="cardMrp">
                                    <asp:Label ID="lblmaterialname" runat="server" Text='<%# Eval("MaterialName") %>' /><br />
                                    <span>Price:</span>
                                    ₹
                            <asp:Label ID="lblMRP" runat="server" Text='<%# Eval("MRP") %>' />
                                </div>
                            </div>
                        </ItemTemplate>
                    </asp:DataList>
                </div>
            </div>
        </div>

    </div>
</asp:Content>
