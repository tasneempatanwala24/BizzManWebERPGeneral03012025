<%@ Page Title="" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" 
    AutoEventWireup="true" CodeBehind="wfMnfManufactureOrder.aspx.cs" Inherits="BizzManWebErp.wfMnfManufactureOrder" %>

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
    <script src="Scripts/wfMnfManufactureOrder.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
     <input type="hidden" id="hdnIsEdit" />
    <button onclick="CreateOrderDetails();" id="btnCreate">Create</button>
    <button onclick="ShowBOMDetails();" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddOrderDetails();" style="display: none;" id="btnSave" title=" Press Ctrl + S to save record">Save</button>
    <button onclick="" style="display: none;" id="btnConfirm">Confirm</button>
    <button onclick="" style="display: none;" id="btnCancel">Cancel</button>
    <button type="button" class="preventDefault" id="previewBtn" style="display: none" onclick="PrintPreview()">
        Preview PDF
    </button>


    <div class="container" id="divList" style="margin-top: 10px; overflow: auto;">
        <table id="tblManufactureBomList" class="display">
            <thead>
                <tr>
                    <th class="noSort">
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="white-space: nowrap;">Id</th>
                    <th style="white-space: nowrap;">BOMID</th>
                    <th style="white-space: nowrap;">Product</th>
                    <th style="white-space: nowrap;">MODate</th>
                    <th style="white-space: nowrap;">Quantity</th>
                    <th style="white-space: nowrap;">Assignee</th>
                    <th style="white-space: nowrap;">DeadlineDate</th>
                    <th style="white-space: nowrap;">ManufacturingType</th>
                    <th style="white-space: nowrap;">User</th>
                </tr>
            </thead>
            <tbody id="tbody_BOM_List">
            </tbody>
        </table>
    </div>



    <div class="container" id="divEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Manufacturing Order details : 
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Order Id</td>
                                <td>
                                <input type="text" class="form-control" id="txtId" placeholder="Order Id" name="txtId" readonly="readonly" />
                                </td>
                                <td>BOMID *</td>
                                <td>
                                    <select id="ddlBOMID" name="ddlBOMID" class="form-control" 
                                    style="width: 250px;" onchange="FetchSelectedBOMDetails()">
                                    <option value="">-Select BOMID-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>

                            <td>Associated Product *</td>
                             <td >
                              <input type="text" class="form-control" id="txtProductName" placeholder="Product Name" name="txtProductName" readonly="readonly" />
                             <input type="hidden" id="hdnProductID" runat="server" />
                                 </td>

                                <td style="width: 10%;">MODate *</td>
                                 <td >
                                    <input type="text" class="form-control datepicker" id="txtMODate" name="txtMODate" placeholder="mm/dd/yyyy" />
                                  </td>

                            </tr>
                            <tr>
                                 <td style="width: 10%;">Quantity *</td>
                                    <td>
                                <input type="text" class="form-control" id="txtQuantity" name="txtQuantity" onchange="ChangeQtyConsumed()" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" />
                                </td>
                                  <td style="width: 10%;">UOM *</td>
                                  <td>
                                      <select id="ddlUnitMesure" name="ddlUnitMesure" class="form-control"  style="width: 250px;">
                                          <option value="">-Select UOM-</option>
                                      </select>
                                  </td>
                               
                            </tr>
                               <tr>
                                    <td>Assign Person--></td>
                                 
                                   <td>
                                    <select id="ddlAssignperson" name="ddlAssignperson" class="form-control" 
                                         style="width: 250px;">
                                         <option value="">-Select Assignee-</option>
                                    </select>
                                </td>
                                   <td style="width: 10%;">Deadline Date *</td>
                                     <td>
                                        <input type="text" class="form-control datepicker" id="txtDeadlineDate" name="txtDeadlineDate" placeholder="mm/dd/yyyy" />
                                      </td>
                                   </tr>
                            <tr>
                             <td>Manufacturing Type *</td>
                            <td>
                                <select id="ddlManufacturingType" name="ddlManufacturingType" class="form-control" 
                                     style="width: 250px;">
                                     <option value="">-Select Manufacturing Type-</option>
                                     <option value="ReadyStock">Ready Stock</option>
                                     <option value="MakeToOrder">Make To Order</option>
                                </select>

                            </td>
                            <td>User *</td>
                             <td>
                                <label class="control-label" id="LblAssignPerson"></label>
                            </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                COMPONENTS
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Id</th>
                                    <th>Raw Material</th>
                                     <th style="display: none;">MaterialId</th>
                                    <th>Qty</th>
                                    <th>WorkCenterID</th>
                                    <th>Operation</th>
                                    <th>QtyConsumed</th>
                                </tr>
                            </thead>

                            <tbody id="tbody_BOMListDetails">
                                <tr id="tr_BOMListEntry">
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

</asp:Content>


