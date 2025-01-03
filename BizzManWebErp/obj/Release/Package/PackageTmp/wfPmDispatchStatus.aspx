<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PM.Master" CodeBehind="wfPmDispatchStatus.aspx.cs" Inherits="BizzManWebErp.wfPmDispatchStatus" %>


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
    <script src="Scripts/PmDispatchStatus.js?0002"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="POS-Content">
        <div class="window">
            <div class="screen">
                <div class="screen-content">
                    <div class="top-content">
                        <input type="hidden" id="hdnCustomerName" runat="server" />
                       
                        <input type="hidden" id="loginuser" runat="server" />
                        <%--<button class="buttonCreatCustomer" id="btnView" onclick="ViewCustomerList()">View Orders</button>
                       --%> <button onclick="ClearAll();" class="buttonCreatCustomer">Cancel</button>
                        <button onclick="AddDispatchStatusDetails();" id="btnsave" class="buttonCreatCustomer">Submit</button>
                        <input class="form-control py-2 rounded-pill mr-1 pr-5 SearchCustomer" type="search" value="Search Customer" id="example-search-input" hidden="hidden">
                    </div>
                   <%-- <div class="subwindow-container-fix scrollable-y" id="DivCustomerList">
                        <table class="display" id="tblCustomerList">
                            <thead>
                                <tr>
                                    <th style="width: 20%;">Sales Order No</th>
                                    <th style="width: 20%;">Date Of Assignment</th>
                                    <th style="width: 25%;">Date Of Delivery</th>
                                    <th style="width: 20%;">Client Name</th>
                                    <th style="width: 25%;">Assigned Team</th>
                                </tr>
                            </thead>
                            <tbody class="client-list-contents" id="tbodycustomerList"></tbody>
                        </table>
                    </div>--%>
                    <div class="client-details edit" id="createDiv">
                        <div class="card-header">
                            <b>Delivery Dispatch Status Form</b>
                        </div>
                        <br>
                        <div class="client-details-box clearfix">
                            <div class="client-details-left">
                                <div class="client-detail">
                                    <span class="label">Challan No</span>
                                    <%--<asp:DropDownList ID="ddlSalesOrderID" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlSalesOrderID_SelectedIndexChanged">  
                                    </asp:DropDownList>--%>
                                    
                                     <input name="txtChallanNo" type="text" value="" placeholder="Challan no" class="leftside" id="txtChallanNo">
                             
                                </div>
                                <div class="client-detail">
                                    <span class="label">Client Name</span>
                                    <input name="txtCustomerName" type="text" value="" placeholder="Client Name" class="leftside" id="txtCustomerName">
                                </div>
                                <div class="client-detail">
                                    <span class="label">Due Date</span>
                                    <input name="txtDueDate" type="date" value="" class="rightside" id="txtDueDate">
                                </div>
                            </div>
                           <div class="client-details-right" >
                                <div class="client-detail" style="width:118%;">
                                    
                                    <div class="client-detail">
                                    </div>
                                    <span class="label">Delivery Status</span>
                                    <select name="ddlDeliveryStatus" class="rightside" id="ddlDeliveryStatus">
                                        <option value="">-Select Status-</option>
                                        <option value="">Yes</option>
                                        <option value="">No</option>
                                        

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                       
                
                        <%--<asp:GridView style="width:100%;" ID="grdSalesOrderDetails" runat="server"></asp:GridView>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
