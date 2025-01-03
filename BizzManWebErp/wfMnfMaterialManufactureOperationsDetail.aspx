<%@ Page Title="" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMnfMaterialManufactureOperationsDetail.aspx.cs" Inherits="BizzManWebErp.wfMnfMaterialManufactureOperationsDetail" %>

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
    <script src="Scripts/MnfMaterialManufactureOperationsDetail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hdnPreviousFormula"  />
    <input type="hidden" id="hdnMaterialId" runat="server" />
    <input type="hidden" id="hdnBOMId" runat="server" />
    <input type="hidden" id="hdnIsEdit" />
    <button onclick="CreateMaterialBOM();" id="btnCreate">Create</button>
    <button onclick="ViewMaterialBOMList();" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialBOM();" style="display: none;" id="btnSave">Save</button>
     
    <div class="container" id="divMaterialBOMList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialBOMList" class="display">
            <thead>
                <tr>
                    <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="white-space: nowrap;display:none;">Id</th>
                    <th style="white-space: nowrap;">Material Name</th>
                    <th style="white-space: nowrap;">Qty</th>
                    <th style="white-space: nowrap;">Unit Measure</th>
                    <th style="white-space: nowrap;">Total Operation Cost</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialBOM_List">
            </tbody>
        </table>
    </div>



    <div class="container" id="divMaterialBOMEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Material Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>

                                <td>Material *</td>
                                <td>
                                    <select id="ddlMaterial" name="ddlMaterial" class="form-control" onchange="FetchBOMDetailsMaterials();" style="width: 300px;">
                                        <option value="">-Select Material-</option>
                                    </select>
                                    <input type="text" class="form-control" readonly="readonly" id="txtMaterialName" name="txtMaterialName" style="display:none;" />
                                </td>
                                <td>Qty *</td>
                                <td>
                                    <input type="number" class="form-control" id="txtQty" name="txtQty" />
                                </td>

                            </tr>
                            <tr>
                                <td>Unit Measure *</td>
                                <td>
                                    <select id="ddlUnitMeasure" name="ddlUnitMeasure" class="form-control" style="width: 300px;">
                                        <option value="">-Select Unit Measure-</option>
                                    </select>
                                </td>
                                <td colspan="2">
                                    <fieldset>
                                        <legend>Manufacturing Type *</legend>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioManufacturingType" value="Process" />Process
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioManufacturingType" value="Discreate" />Discreate
                                        </label>
                                    </fieldset>

                                </td>
                            </tr>
                            <tr id="tr_Formula" style="display:none;">
                                <td>Formula *</td>
                                <td colspan="3"><input type="text" class="form-control" id="txtFormula" name="txtFormula" onchange="ShowHideMaterialRows();" />
                                    <select id="ddlFormula" name="ddlFormula" class="form-control" onchange="FetchBOMDetailsList(2,'');" style="width: 300px;display:none;">
                                        <option value="">-Select Formula-</option>
                                    </select>
                                    <a id="a_formulaAdd" style="display:none;
    text-decoration: underline;
    color: blue;
    cursor: pointer;
" onclick="UpdateFormula(0);">Add</a>&nbsp;&nbsp;<a id="a_formulaEdit" style="display:none;
    text-decoration: underline;
    color: blue;
    cursor: pointer;
" href="#" onclick="UpdateFormula(1);">Edit</a>
                                </td>
                            </tr>
                            <tr>
                                
                                <td colspan="2">
                                    <fieldset>
                                        <legend>Bom Type *</legend>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioBomType" value="Subcontracting" />Subcontracting
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="optradioBomType" value="Own Manufacture" />Own Manufacture
                                        </label>
                                    </fieldset>

                                </td>
                                <td>Shop Floor *</td>
                                <td>
                                    <select id="ddlShopFlower" name="ddlShopFlower" class="form-control" style="width: 300px;">
                                        <option value="">-Select Shop Floor-</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divMaterialBOMDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Material Operation Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblMaterialBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Master Id</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measeure</th>
                                    <th>Rate</th>
                                    <th>Total Amount</th>
                                    <th>Formula</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialBOMDetails">
                                <tr id="tr_BOMDetailEntry">
                                    <td style="display: none;"></td>
                                    <td>
                                        <select id="ddlMaterialName" name="ddlMaterialName" class="form-control" onchange="FetchUnitMeasure();">
                                            <option value="">-Select Material Name-</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" class="form-control" id="txtMaterialQty" name="txtMaterialQty" onchange="UpdateTotalAmount();" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialUnitMeasure" name="txtMaterialUnitMeasure" readonly="readonly" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialRate" name="txtMaterialRate" onchange="UpdateTotalAmount();" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialTotalAmount" name="txtMaterialTotalAmount" readonly="readonly" />
                                    </td>
                                    <td></td>
                                    <td>
                                        <button type="button" class="btn btn-primary" onclick="SaveMaterialBOMDetails();">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    

    <!-- Modal -->
    <div class="modal fade" id="FormulaEditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Formula Name</h5>

                </div>
                <div class="modal-body">
                    <table class="tbl">
                        <tr>
                            <td>Formula Name *</td>
                            <td><input type="text" class="form-control" id="txtFormulaName" name="txtFormulaName" /></td>

                        </tr>
                        
                    </table>
                    <br />
                    <table id="tblMaterialBOMDetailsModal" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Material Master Id</th>
                                    <th>Material Name</th>
                                    <th>Qty</th>
                                    <th>Unit Measeure</th>
                                    <th>Rate</th>
                                    <th>Total Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tbody_MaterialBOMDetailsModal">
                                <tr id="tr_BOMDetailEntryModal">
                                    <td style="display: none;"></td>
                                    <td>
                                        <select id="ddlMaterialNameModal" name="ddlMaterialNameModal" class="form-control" onchange="FetchUnitMeasureModal();">
                                            <option value="">-Select Material Name-</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" class="form-control" id="txtMaterialQtyModal" name="txtMaterialQtyModal" onchange="UpdateTotalAmountModal();" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialUnitMeasureModal" name="txtMaterialUnitMeasureModal" readonly="readonly" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialRateModal" name="txtMaterialRateModal" onchange="UpdateTotalAmountModal();" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" id="txtMaterialTotalAmountModal" name="txtMaterialTotalAmountModal" readonly="readonly" />
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary" onclick="SaveMaterialBOMDetailsModal();">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="CloseFormulaModal();">Close</button>
                    <button type="button" class="btn btn-primary" onclick="DeleteBOMFormula();" id="btnFormulaDelete" style="display:none;">Delete Formula</button>
                    <button type="button" class="btn btn-primary" onclick="UpdateBOMFormula();">Update Formula</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

