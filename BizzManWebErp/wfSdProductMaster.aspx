<%@ Page Title="" Language="C#" MasterPageFile="~/SdMainMenu.Master" AutoEventWireup="true" CodeBehind="wfSdProductMaster.aspx.cs" Inherits="BizzManWebErp.wfSdProductMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script src="Scripts/SdProductMaster.js"></script>
    <style>
        .dcmlNo {
            font-size: 18px;
        }

        .ui-autocomplete {
            z-index: 99999999;
        }

        .LabelTitle {
            background-color: transparent;
            color: black;
            font-size: larger;
            color: #7952b3;
            padding-bottom: 20px;
        }

        #ContentPlaceHolder1_rblMaterial {
            width: 82%;
            font-size: small;
            font-weight: 600;
        }

        ul.breadcrumb {
            padding: 10px 16px;
            list-style: none;
        }

            ul.breadcrumb li {
                display: inline;
                font-size: 18px;
            }

                ul.breadcrumb li + li:before {
                    padding: 8px;
                    color: black;
                    content: "/\00a0";
                }

                ul.breadcrumb li a {
                    color: #0275d8;
                    text-decoration: none;
                }

                    ul.breadcrumb li a:hover {
                        color: #01447e;
                        text-decoration: underline;
                    }

        .image-upload > input {
            display: none;
        }

        .kanban-item {
            width: 25%;
            float: left;
            margin-left: 5px;
            margin-top: 10px;
            border: 1px thin black;
        }

        .kanban-img {
            width: 15%;
            float: right;
        }
    </style>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hfBase64" runat="server" />
    <input type="hidden" id="hfId" value="0" runat="server" />
    <button onclick="CreateMaterial();">Create</button>
    <button onclick="ViewMaterialList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnDisplayData">View File</button>
    <button id="btnExport">Export To Excel</button>
    <button style="display: none;" onclick="ViewFile();" id="btnView">View PDF</button>
    <div class="container" id="divMaterialList" style="margin-top: 10px; overflow: auto;">
        <div id="dvShow" style="margin-bottom: 5px; float: right">
            <img src="Images/list-view.png" title="List View" style="width: 10%; float: right; margin: 2px; cursor: pointer" onclick="showListView()" />
            <img src="Images/kanban-view.png" title="Kanban View" style="width: 10%; float: right; margin: 2px; cursor: pointer" />
        </div>
        <div id="dvListView">
            <table id="tblMaterialList" class="display">
                <thead>
                    <tr>
                        <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                        <th style="white-space: nowrap;">Id</th>
                        <th style="white-space: nowrap;">Material Category Name</th>
                        <th style="white-space: nowrap;">Material Group</th>
                        <th style="white-space: nowrap;">Material Name</th>
                        <th style="white-space: nowrap;">Material Type</th>
                        <th style="white-space: nowrap;">Unit Mesure</th>
                        <th style="white-space: nowrap;">Nature of Item</th>
                        <th style="white-space: nowrap;">Barcode</th>
                        <th style="white-space: nowrap;">Costing Method</th>
                        <th style="white-space: nowrap;">BOM</th>
                        <th style="white-space: nowrap;">Maintain in Batch</th>
                        <th style="white-space: nowrap;">MRP</th>
                        <th style="white-space: nowrap;">Minimum Stock Level</th>
                        <th style="white-space: nowrap;">Maximum Stock Level</th>
                        <th style="white-space: nowrap;">Description</th>
                        <th style="white-space: nowrap;">GST Applicable</th>
                        <th style="white-space: nowrap;">HSN No</th>
                        <th style="white-space: nowrap;">Central Tax %</th>
                        <th style="white-space: nowrap;">State Tax %</th>
                        <th style="white-space: nowrap;">Cess %</th>
                        <th style="white-space: nowrap;">Integrated Tax %</th>
                        <th style="white-space: nowrap;">Link Item</th>
                        <th style="white-space: nowrap;">Link Item Name</th>
                        <th style="white-space: nowrap;">Link Item Qty</th>
                        <th style="white-space: nowrap;">Link Item UM</th>
                    </tr>
                </thead>
                <tbody id="tbody_Material_List">
                </tbody>
            </table>
        </div>
        <div id="dvKanbanView" style="margin-top: 10px; display: none;">
            <table style="margin-top: 30px; width: 100%" id="tblKanbanView">
                <tbody id="tbody_kanbanViewList">
                    <tr>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>

                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="container" id="divMaterialEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Product Master</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 50%" colspan="2">
                                    <table style="width: 100%;">
                                        <tr>
                                            <td colspan="2">
                                                <fieldset>
                                                    <legend>Purchase / Sale Permission *</legend>
                                                    <label class="radio-inline">
                                                        <input type="checkbox" name="chkCanSold" id="chkCanSold" />&nbsp;&nbsp;Can be Sold
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="checkbox" name="chkCanPurchased" id="chkCanPurchased" />&nbsp;&nbsp;Can be Purchased
                                                    </label>
                                                    <label class="radio-inline">
                                                        <input type="checkbox" name="chkCanManufacture" id="chkCanManufacture" />&nbsp;&nbsp;Manufacture
                                                    </label>
                                                </fieldset>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 30%;">Project Name </td>
                                            <td>
                                                <select style="width: 100%;" id="ddlProject" name="ddlProject" class="form-control rounded border-dark cls">
                                                    <%--<option value="">-Select Project-</option>--%>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 30%;">Material Type *</td>
                                            <td>
                                                <select style="width: 100%;" id="ddlMaterialType" name="ddlMaterialType" class="form-control rounded border-dark cls">
                                                    <option value="">-Select Material Type-</option>
                                                    <option value="Consumable">Consumable</option>
                                                    <option value="Service">Service</option>
                                                    <option value="Storable Product">Storable Product</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label class="control-label">Category *</label>
                                            </td>
                                            <td>
                                                <select style="width: 100%;" id="ddlCategoryName" name="ddlCategoryName" class="form-control rounded border-dark cls">
                                                    <option value="">-Select Category-</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label class="control-label">Material Group *</label>
                                            </td>
                                            <td>
                                                <select style="width: 100%;" id="ddlMaterialGroup" name="ddlMaterialGroup" class="form-control rounded border-dark cls">
                                                    <option value="">-Select Material Group-</option>
                                                </select>
                                            </td>                                            
                                        </tr>                                      
                                        
                                    </table>
                                </td>
                                <td style="width: 50%" colspan="2">
                                    <div style="float: right; padding-right: 200px;">
                                        <div class="image-upload">
                                            <label for="fuImg">
                                                <img id="imgFU" src="Images/fileupload.png" style="float: right!important; cursor: pointer;" width="100px" height="100px" />
                                            </label>

                                            <input id="fuImg" type="file" onchange="readURL(this)" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Material Name *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark cls" id="txtMaterialName" 
                                        name="txtMaterialName" placeholder="please enter material name" />
                                </td>
                                <td>
                                    <label class="control-label">Id</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>Alias</td>
                                    <td>
                                        <input type="text" style="width: 100%;" class="form-control rounded border-dark cls" id="txtalias"
                                            name="txtalias" placeholder="please enter alias" />
                                    </td>
                                <td style="width: 15%;">Barcode</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark cls"
                                        id="txtBarcode" name="txtBarcode" placeholder="please enter barcode" />
                                </td>
                            </tr>
                                                       
                            <tr>
                                <td>
                                    <label class="control-label">Unit Measure *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlUnitMesure" name="ddlUnitMesure" class="form-control rounded border-dark cls">
                                        <option value="">-Select Unit Mesure-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Nature of Item</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlNatureOfItem" name="ddlNatureOfItem" class="form-control rounded border-dark cls">
                                        <option value="">-Select Nature of Item-</option>
                                        <option value="Goods">Goods</option>
                                        <option value="Service">Service</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">MRP</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo cls" id="txtMrp"
                                        name="txtMrp" placeholder="please enter mrp" />
                                </td>
                                <td style="width: 15%;">Discount %</td>
                                <td>
                                    <input type="number" style="width: 100%;" class="form-control rounded border-dark dcmlNo cls" id="txtDiscount" name="txtDiscount" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Minimum Stock Level </td>
                                <td>
                                    <input type="number" style="width: 100%;" class="form-control rounded border-dark cls" id="txtMinimumStockLevel"
                                        name="txtMinimumStockLevel" placeholder="please enter minimum stock level" />
                                </td>
                                <td style="width: 15%;">Maximum Stock Level </td>
                                <td>
                                    <input type="number" style="width: 100%;" class="form-control rounded border-dark cls" id="txtMaximumStockLevel"
                                        name="txtMaximumStockLevel" placeholder="please enter maximum stock level" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Maintain In Batch</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMaintainInBatch" name="ddlMaintainInBatch" class="form-control rounded border-dark cls">
                                        <option value="">-Select Maintain In Batch-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">BOM</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlBom" name="ddlBom" class="form-control rounded border-dark cls">
                                        <option value="">-Select BOM-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                    <a href="#" onclick="ShowBOMDetails();" id="a_viewBOM" style="display: none; cursor: pointer;">View BOM</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Is GST Applicable(Y/N)</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlGstApplicable" name="ddlGstApplicable" class="form-control rounded border-dark cls" onchange="ShowHideGSTDetails();">
                                        <option value="">-Select GST Applicable-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </td>
                                <td style="width: 15%;">HSN No</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark cls" id="txtHsnNo"
                                        name="txtHsnNo" placeholder="please enter hsn no" />
                                </td>
                            </tr>
                            <tr class="GST" style="display: none;">
                                <td style="width: 15%;">State Tax %</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo GST_Calculate cls" id="txtStateTax" name="txtStateTax" />
                                </td>
                                <td style="width: 15%;">Central Tax %</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo GST_Calculate cls" id="txtCentralTax" name="txtCentralTax" />
                                </td>
                            </tr>
                            <tr class="GST" style="display: none;">

                                <td style="width: 15%;">Cess %</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo GST_Calculate cls" id="txtCess" name="txtCess" />
                                </td>
                                <td style="width: 15%;">Integrated Tax %</td>
                                <td>
                                    <input type="text" style="width: 100%;" readonly="readonly" class="form-control rounded border-dark dcmlNo cls" id="txtIntegratedTax" name="txtIntegratedTax" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 7%;">Description</td>
                                    <td>
                                        <input type="text" style="width: 100%;" class="form-control rounded border-dark cls"
                                            id="txtDescription" name="txtDescription" maxlength="100" placeholder="please enter description" />
                                    </td>
                                <td>Active
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlActive" name="ddlActive" class="form-control rounded border-dark cls">
                                        <option value="">-Select Active-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <table class="tbl">
                                        <tr>
                                            <td colspan="4">
                                                <fieldset>
                                                    <legend>Packaging </legend>
                                                    <table id="tblPackaging" class="display no-footer dataTable" style="width: 100%;">
                                                        <thead>
                                                            <tr>
                                                                <th>Packaging</th>
                                                                <th>Contained Quantity</th>
                                                                <th>Unit of Measure</th>

                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="tbody_Packaging">
                                                            <tr id="tr_Packaging">
                                                                <td style="display: none;"></td>
                                                                <td>
                                                                    <%--<input type="text" class="form-control" id="txtPackaging" name="txtPackaging" />--%>
                                                                    <select id="ddlPackage" name="ddlPackage" class="form-control cls">
                                                                        <option value="">-Select Packaging-</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <input type="number" class="form-control cls" id="txtPackageQty" name="txtPackageQty" />
                                                                </td>
                                                                <td>
                                                                    <input type="text" class="form-control" id="txtPackageUnitMeasure" name="txtPackageUnitMeasure" readonly="readonly" />
                                                                </td>
                                                                <td>
                                                                    <button type="button" class="btn btn-primary" onclick="AddProductPackagingDetails();">Add</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </fieldset>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="BOMDetailsModal" tabindex="-1" role="dialog" style="padding-top: 10px;" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content" style="width: 100%; max-width: 1100px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">BOM Details</h5>

                </div>
                <div class="modal-body">
                    <iframe id="BOM_frame" style="width: 100%; height: 700px;"></iframe>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="CloseModal();">Close</button>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
