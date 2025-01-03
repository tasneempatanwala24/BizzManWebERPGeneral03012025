<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfSdManufactureOrder.aspx.cs" Inherits="BizzManWebErp.wfSdManufactureOrder" %>

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
    <script src="Scripts/ManufactureOrder.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hdnManufactureOrderId" />
    <input type="hidden" id="hdnSalesOrderId" />
    <input type="hidden" id="hdnFormulaRequired" />
    <button onclick="CreateManufactureOrder();" id="btnCreate">Create</button>
    <button onclick="ViewManufactureOrderList();" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddManufactureOrder();" style="display: none;" id="btnSave">Save</button>
    <button onclick="UpdateManufactureAndStockStatus();" style="display: none;" id="btnDone">Mark As Done</button>

    <div class="container" id="divManufactureOrderList" style="margin-top: 10px; overflow: auto;">
        <table id="tblManufactureOrderList" class="display">
            <thead>
                <tr>
                    <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="white-space: nowrap;">Manufacture Order Id</th>
                    <th style="white-space: nowrap;">Sales Order Id</th>
                    <th style="white-space: nowrap;">Material Name</th>
                    <th style="white-space: nowrap;">Qty</th>
                    <th style="white-space: nowrap;">Unit Measure</th>
                    <th style="white-space: nowrap;">Schedule Date</th>
                    <th style="white-space: nowrap;">BOM Formula</th>
                    <th style="white-space: nowrap;">Branch</th>
                    <th style="white-space: nowrap;">Customer Name</th>
                </tr>
            </thead>
            <tbody id="tbody_ManufactureOrder_List">
            </tbody>
        </table>
    </div>



    <div class="container" id="divManufactureOrderEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Manufacture Order
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Manufacture Id</td>
                                <td>
                                    <input type="text" class="form-control" id="txtManufactureId" name="txtManufactureId" readonly="readonly" />
                                </td>

                                <td>Sales Order Id</td>
                                <td>
                                   <input type="text" class="form-control" id="txtSalesOrderId" name="txtSalesOrderId" readonly="readonly" />
                                </td>
                                
                            </tr>
                            <tr>

                                <td>Material Name *</td>
                                <td>
                                    <select id="ddlMaterialName" name="ddlMaterialName" class="form-control" style="width: 300px;" onchange="BindFormula();">
                                        <option value="">-Select Material-</option>
                                    </select>
                                </td>
                                <td>Scheduled Date *</td>
                                <td>
                                    <input type="date" class="form-control" id="txtScheduleDate" name="txtScheduleDate" />
                                </td>

                            </tr>
                            <tr>
                                <td>Quantity *</td>
                                <td>
                                    <input type="number" class="form-control" id="txtQty" name="txtQty" style="width:60%;float:left;margin-right:10px;"  onchange="BindFormula();" /><label id="lblUnitMeasure" style="float:left;"></label>
                                </td>

                                <td>BOM Formula</td>
                                <td>
                                    <select id="ddlFormula" name="ddlFormula" class="form-control" style="width: 300px;" onchange="FetchBOMDetailsList(2,'');" >
                                        <option value="">-Select Formula-</option>
                                    </select>
                                </td>
                                
                            </tr>
                            <tr>

                                <td>Customer *</td>
                                <td>
                                    <select id="ddlCustomer" name="ddlCustomer" class="form-control" style="width: 300px;">
                                        <option value="">-Select Customer-</option>
                                    </select>
                                    <a href="#" onclick="AddNewCustomer();">Add</a>
                                </td>
                                <td>Branch *</td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" style="width: 300px;">
                                        <option value="">-Select Branch-</option>
                                    </select>
                                </td>

                            </tr>
                            <tr>

                                <td>Warehouse *</td>
                                <td>
                                    <select id="ddlWarehouse" name="ddlWarehouse" class="form-control" style="width: 300px;">
                                        <option value="">-Select Warehouse-</option>
                                    </select>
                                </td>
                                <td></td>
                                <td>
                                    
                                </td>

                            </tr>
                           
                           </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divManufactureOrderDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Manufacture Order Lines
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblManufactureOrderDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display:none;">Material Id</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measeure</th>
                                    <th>Available Qty</th>
                                    
                                </tr>
                            </thead>
                            <tbody id="tbody_ManufactureOrderDetails">
                                
                            </tbody>
                        </table>
                    </div>
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
                            <td><input type="text" class="form-control" id="txtCustomerName" name="txtCustomerName" /></td>
                            <td>Customer Type *</td>
                            <td><select id="ddlCustomerType" name="ddlCustomerType" class="form-control">
                                        <option value="">-Select Customer Type-</option>
                                    </select><a href="#" onclick="AddCustomerType();">Add</a></td>

                        </tr>
                        <tr>
                            <td>Company Name *</td>
                            <td><input type="text" class="form-control" id="txtCompanyName" name="txtCompanyName" /></td>
                            <td>State *</td>
                            <td><select id="ddlState" name="ddlState" class="form-control" onchange="BindCityDropdown();">
                                        <option value="">-Select State-</option>
                                    </select></td>
                            

                        </tr>
                        <tr>
                            <td>City *</td>
                            <td><select id="ddlCity" name="ddlCity" class="form-control">
                                        <option value="">-Select City-</option>
                                    </select></td>
                            <td>Email *</td>
                            <td><input type="text" class="form-control" id="txtEmail" name="txtEmail" /></td>

                        </tr>
                        <tr>
                            <td>Mobile No. *</td>
                            <td><input type="text" class="form-control" id="txtMobile" name="txtMobile" /></td>
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
                            <td><input type="text" class="form-control" id="txtCustomerType" name="txtCustomerType" /></td>

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



