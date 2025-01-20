<%@ Page Title="" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" 
    AutoEventWireup="true" CodeBehind="wfMnfManufactureBomDetail.aspx.cs" Inherits="BizzManWebErp.wfMnfManufactureBomDetail" %>

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
    <script src="Scripts/MnfManufactureBomDetail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
     <input type="hidden" id="hdnIsEdit" />
    <button onclick="CreateBOMDetails();" id="btnCreate">Create</button>
    <button onclick="ShowBOMDetails()" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddBOMDetails()" style="display: none;" id="btnSave" title=" Press Ctrl + S to save record">Save</button>
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
                    <th style="white-space: nowrap;">Product</th>
                    <th style="white-space: nowrap;">Quantity</th>
                    <th style="white-space: nowrap;">BOM Type </th>
                    <th style="white-space: nowrap;">Work Center</th>
                    <th style="white-space: nowrap;">Operation</th>
                    <th style="white-space: nowrap;">Duration(in min)</th>
                    
                </tr>
            </thead>
            <tbody id="tbody_BOM_List">
            </tbody>
        </table>
    </div>



    <div class="container" id="divEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add BOM
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>BOM Id</td>
                                <td >
                                <input type="text" class="form-control" id="txtId" placeholder="BOM Id" name="txtId" readonly="readonly" />
                                </td>
                                <td>Product *</td>
                                <td>
                                    <select id="ddlProductName" name="ddlProductName" class="rounded border-dark" style="width: 300px;">
                                        <option value="">-Select Product Name-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                 <td style="width: 10%;">Quantity *</td>
                                    <td>
                                <input type="text" class="form-control" id="txtQuantity" name="txtQuantity" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" />
                                </td>
                                  <td>UOM *</td>
                                  <td>
                                      <select id="ddlUnitMesure" name="ddlUnitMesure" class="form-control"  style="width: 250px;">
                                          <option value="">-Select UOM-</option>
                                      </select>
                                  </td>
                            </tr>
                            <tr>
                             <td>BOM Type *</td>
                            <td>
                                <select id="ddlBOMType" name="ddlBOMType" class="form-control" 
                                     style="width: 250px;">
                                     <option value="">-Select BOM Type-</option>
                                     <option value="Manufacture">Manufacture</option>
                                     <option value="SubContracting">SubContracting</option>
                                </select>

                            </td>
                            <td>Work Center *</td>
                            <td>
                                <select id="ddlWorkCenter" name="ddlWorkCenter" class="form-control" 
                                     style="width: 250px;">
                                     <option value="">-Select Work Center-</option>
                                </select>
                            </td>
                            </tr>
                            <tr>
                                 <td>Operation *</td>
                                <td>
                                <select id="ddlOperation" name="ddlOperation" class="form-control" 
                                     style="width: 250px;">
                                     <option value="">-Select Operation-</option>
                                    <option value="OP1">OP1</option>
                                    <option value="OP2">OP2</option>
                                </select>
                            </td>
                                 <td style="width: 5%;">Duration *</td>
                                <td>
                                <input type="text" class="form-control" id="txtDuration" name="txtDuration" oninput="handleNumericInput(event)" />
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
                Add BOM Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Id</th>
                                    <th>Product</th>
                                     <th style="display: none;">ProductId</th>
                                    <th>Qty</th>
                                     <th>UOM</th>
                                     <th style="display: none;">UOMId</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody id="tbody_BOMListDetails">
                                <tr id="tr_BOMListEntry">
                                    <td style="display: none;">
                                        </td>
                                    <td style="width: 250px;">
                                        <select id="ddlProductNameDetails" name="ddlProductNameDetails" class="form-control" style="width:100% !important" onchange="FetchMaterialDetails();">
                                            <option value="">-Select Product Name-</option>
                                        </select>
                                    </td>
                                       <%-- <td style="display: none;"></td>--%>
                                    <td style="width: 100px;">
                                        <input type="text" class="form-control" id="txtMaterialQty" name="txtMaterialQty" placeholder="Qty" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="0" />
                                    </td>
                                    <td style="width: 250px;">
                                        <select id="ddlUOMDetails" name="ddlUOMDetails" class="form-control">
                                            <option value="">-Select UOM-</option>
                                        </select>
                                    </td>
                                        <td style="display: none;"></td>
                                    <td>
                                        <button type="button" class="btn btn-primary" onclick="SaveBOMListDetails();">Add</button>
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

</asp:Content>


