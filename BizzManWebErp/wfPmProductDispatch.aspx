<%@ Page Title="" Language="C#" MasterPageFile="~/PM.Master" AutoEventWireup="true" CodeBehind="wfPmProductDispatch.aspx.cs" Inherits="BizzManWebErp.wfPmProductDispatch" %>

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
    <link href="css/POS.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/PmProductDispatch.js?0004"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="POS-Content">
        <div class="window">
            <div class="screen">
                <div class="screen-content">
                    <div class="top-content">
                        <input type="hidden" id="loginuser" runat="server" />
                        <button onclick="CreateCustomer();" class="buttonCreatCustomer" id="btncreate">Start Order Dispatch</button>
                        <button class="buttonCreatCustomer" id="btnView" onclick="ViewCustomerList()">View Orders</button>
                        <button onclick="ClearAll();" class="buttonCreatCustomer">Cancel</button>
                        <button onclick="AddProductDetails();" id="btnsave" style="display: none;" class="buttonCreatCustomer">Save</button>
                        <input class="form-control py-2 rounded-pill mr-1 pr-5 SearchCustomer" type="search" value="Search Customer" id="example-search-input" hidden="hidden">
                    </div>
                    <div class="container" id="DivCustomerList" style="margin-top: 10px; overflow: auto;">
                        <table class="display" id="tblCustomerList">
                            <thead>
                                <tr>
                                    <th style="width: 20%;">Sales Order No</th> 
                                    <th style="width: 20%;">Date Of Assignment</th>
                                    <th style="width: 25%;">Date Of Delivery</th>
                                    <th style="width: 20%;">Client Name</th>
                                    <th style="width: 25%;">Assigned Team</th>
                                    <th style="width: 25%;">CustomerName</th>
                                    <th style="width: 25%;">OrderDate</th>
                                    <th style="width: 25%;">GSTTreatment</th>
                                    <th style="width: 25%;">DeliveryDateTime</th>
                                    <th style="width: 25%;">Currency</th>
                                    <th style="width: 25%;">QuotationId</th>
                                    <th style="width: 25%;">Department</th>
                                    <th style="width: 25%;">BranchCode</th>
                                    <th style="width: 25%;">ExpirationDate</th>
                                    <th style="width: 25%;">TermsConditions</th>
                                    <th style="width: 25%;">MaterialName</th>
                                    <th style="width: 25%;">PaymentTerms</th>
                                    <th style="width: 25%;">DeliveryCharges</th>
                                    <th style="width: 25%;">Advance</th>
                                    <th style="width: 25%;">TotalAmount</th>
                                    <th style="width: 25%;">OutstandingAmount</th>
                                    <th style="width: 25%;">QTY</th>
                                    <th style="width: 25%;">UnitMeasure</th>
                                    <th style="width: 25%;">Stock</th>
                                    <th style="width: 25%;">MRP</th>
                                    <th style="width: 25%;">DiscountPercent</th>
                                    <th style="width: 25%;">IntegratedTaxPercent</th>
                                    <th style="width: 25%;">Amount</th>
                                    <th style="width: 25%;">ServiceCharge</th>
                                    <th style="width: 25%;">Package</th>

                                </tr>
                            </thead>
                            <tbody class="client-list-contents" id="tbodycustomerList"></tbody>
                        </table>
                    </div>
                    <div class="client-details edit" id="createDiv">
                        <div class="card-header">
                            <b>Product Dispatch Form</b>
                        </div>
                        <br>
                        <div class="client-details-box clearfix">
                            <div class="client-details-left">
                                <div class="client-detail">
                                    <span class="label">Sales Order</span>
                                    <%--<asp:DropDownList ID="ddlSalesOrderID" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlSalesOrderID_SelectedIndexChanged">  
                                    </asp:DropDownList>--%>
                                    <select name="lang" class="rightside" id="ddlSalesOrderID" onchange="GetSalesOrderDetailsById(this.value)">
                                        <option value="">-Select Sales Order No-</option>

                                    </select>
                                </div>
                                <div class="client-detail">
                                    <span class="label">Date Of Assignment</span>
                                    <input name="assignmentDate" type="date" value="" placeholder="Summary" class="leftside" id="txtAssignmentDate">
                                </div>
                                <div class="client-detail">
                                    <span class="label">Date Of Delivery</span>
                                    <input name="txtDeliveryDate" type="datetime-local" value="" class="rightside" id="txtDeliveryDate">
                                </div>
                            </div>
                            <div class="client-details-right" >
                                <div class="client-detail" style="width:68%;">
                                    <span class="label">Client Name</span>
                                    <input type="text" class="form-control" id="txtClientName" name="txtClientName" readonly="readonly" />
                                    <br />
                                    <div class="client-detail">
                                    </div>
                                    <span class="label">Assign Team</span>
                                    <select name="ddlAssign" class="rightside" id="ddlAssign">
                                        <option value="">-Select Person-</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="container" id="divPmCustomerMasterList" style="margin-top: 10px; overflow: auto;">
                            <table id="tblPmCustomerMasterList" class="display" style="width:320%;">
                                <thead>
                                    <tr>
                                        <th style="width: 4%;">SalesOrder ID</th>
                                        <th style="width: 3%;">GST Treatment</th>
                                        <th style="width: 5%;">DeliveryDateTime</th>
                                        <th style="width: 3%;">Currency</th>
                                        <th style="width: 3%;">Order Date</th>
                                        <th style="width: 2%;">Department</th>
                                        <th style="width: 5%;">Expiration Date</th>
                                        <th style="width: 5%;">Payment Terms</th>
                                        <th style="width: 5%;">Delivery Charges</th>
                                        <th style="width: 2%;">Advance</th>
                                        <th style="width: 2%;">Service Charges</th>
                                        
                                        <th style="width: 4%;">Total Amount</th>
                                        <th style="width: 6%;">Outstanding Amount</th>
                                       
                                        <th style="width: 5%;">Material Name</th>
                                        <th style="width: 2%;">Quantity</th>
                                        <th style="width: 5%;">Unit Measure</th>
                                      
                                        <th style="width: 2%;">Stock</th>
                                        <th style="width: 2%;">Price</th>
                                        <th style="width: 5%;">Discount(%)</th>
                                        <th style="width: 5%;">Tax Rate(%)</th>
                                        <th style="width: 2%;">ProductAmount</th>
                                        <th style="width: 2%;">Package</th>
                                        
                                    </tr>
                                </thead>
                                <tbody id="gridViewContainer">
                                </tbody>
                            </table>
                        </div>
                
                        <%--<asp:GridView style="width:100%;" ID="grdSalesOrderDetails" runat="server"></asp:GridView>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
