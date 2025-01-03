<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmMaterialMaster.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>

    <script src="Scripts/MmMaterialMaster.js"></script>

    <style>
        .dcmlNo {
            font-size: 18px;
        }
    </style>

    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateMaterial();">Create</button>
    <button onclick="ViewMaterialList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divMaterialList" style="margin-top: 10px; overflow: auto;">
        <div id="dataTable_wrapper"></div>
        <table id="tblMaterialList" class="display">
            <thead>
                <tr>
                    <th style="white-space: nowrap;">Id</th>
                    <th style="white-space: nowrap;">Material Category Name</th>
                    <th style="white-space: nowrap;">Material Group</th>
                    <th style="white-space: nowrap;">Material Name</th>
                    <th style="white-space: nowrap;">Material Type</th>
                    <th style="white-space: nowrap;">Purchase Unit Mesure</th>
                    <th style="white-space: nowrap;">Sales Unit Mesure</th>
                    <th style="white-space: nowrap;">Alt Unit Mesure</th>
                    <th style="white-space: nowrap;">Relation Purchase Unit Mesure</th>
                    <th style="white-space: nowrap;">Relation Sales Unit Mesure</th>
                    <th style="white-space: nowrap;">Rate of Duty</th>
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
                </tr>
            </thead>
            <tbody id="tbody_Material_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMaterialEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add Material</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td colspan="2">
                                    <fieldset>
                                        <legend>Purchase / Sale Permission *</legend>
                                        <label class="radio-inline">
                                            <input type="checkbox" name="chkCanSold" id="chkCanSold" onchange="ShowHideSales();" />&nbsp;&nbsp;Can be Sold
                                        </label>
                                        <label class="radio-inline">
                                            <input type="checkbox" name="chkCanPurchased" id="chkCanPurchased" onchange="ShowHidePurchase();" />&nbsp;&nbsp;Can be Purchased
                                        </label>
                                    </fieldset>
                                </td>
                                <td style="width: 10%;">Material Type *</td>
                                <td>
                                    <select style="width: 100%;" id="ddlMaterialType" name="ddlMaterialType" class="form-control rounded border-dark">
                                        <option value="">-Select Material Type-</option>
                                        <option value="Consumable">Consumable</option>
                                        <option value="Service">Service</option>
                                        <option value="Storable Product">Storable Product</option>
                                    </select>
                                    <input type="text" style="width: 100%; display: none;" class="form-control rounded border-dark" id="txtId" name="txtId" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Material Category Name *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMaterialCategoryName" name="ddlMaterialCategoryName" class="form-control rounded border-dark">
                                        <option value="">-Select Material Category Name-</option>
                                    </select>
                                </td>
                                <td style="width: 10%;">Id</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Material Group</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMaterialGroup" name="ddlMaterialGroup" class="form-control rounded border-dark">
                                        <option value="">-Select Material Group-</option>
                                    </select>
                                </td>
                                <td style="width: 15%;">Material Name *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtMaterialName" name="txtMaterialName" />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Purchase Unit Mesure *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlUnitMesure" name="ddlUnitMesure" class="form-control rounded border-dark" onchange="UpdateUnitMeasure();">
                                        <option value="">-Select Purchase Unit Mesure-</option>
                                    </select>
                                </td>

                                <td>
                                    <label class="control-label">Sales Unit Mesure</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlSalesUnitMesure" name="ddlSalesUnitMesure" class="form-control rounded border-dark">
                                        <option value="">-Select Sales Unit Mesure-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Alt Unit Mesure </label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlAltUnitMesure" name="ddlAltUnitMesure" class="form-control rounded border-dark">
                                        <option value="">-Select Alt Unit Mesure-</option>
                                    </select>
                                </td>

                                <td style="width: 15%;">Relation Purchase Unit Mesure *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtRelationPurchaseUnitMesure" name="txtRelationPurchaseUnitMesure" />
                                </td>

                            </tr>
                            <tr>
                                <td style="width: 15%;">Rate of Duty *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtRateOfDuty" name="txtRateOfDuty" />
                                </td>

                                <td style="width: 15%;">Relation Sales Unit Mesure *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtRelationSalesUnitMesure" name="txtRelationSalesUnitMesure" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Costing Method</td>
                                <td>
                                    <select style="width: 100%;" id="ddlCostingMethod" name="ddlCostingMethod" class="form-control rounded border-dark">
                                        <option value="">-Select Costing Method-</option>
                                        <option value="LIFO">LIFO</option>
                                        <option value="FIFO">FIFO</option>
                                        <option value="Standard Cost">Standard Cost</option>
                                        <option value="Wt. Average">Wt. Average</option>
                                    </select>
                                    <%--<input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtCostingMethod" name="txtCostingMethod" />--%>
                                </td>
                                <td style="width: 15%;">MRP *</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtMrp" name="txtMrp" />
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <label class="control-label">Nature of Item</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlNatureOfItem" name="ddlNatureOfItem" class="form-control rounded border-dark">
                                        <option value="">-Select Nature of Item-</option>
                                        <option value="Good">Good</option>
                                        <option value="Service">Service</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">BOM</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlBom" name="ddlBom" class="form-control rounded border-dark">
                                        <option value="">-Select BOM-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                    <a href="#" onclick="ShowBOMDetails();" id="a_viewBOM" style="display: none; cursor: pointer;">View BOM</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Maintain In Batch</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlMaintainInBatch" name="ddlMaintainInBatch" class="form-control rounded border-dark">
                                        <option value="">-Select Maintain In Batch-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </td>
                                <td style="width: 15%;">Barcode</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtBarcode" name="txtBarcode" />
                                </td>


                            </tr>
                            <tr>
                                <td style="width: 15%;">Minimum Stock Level *</td>
                                <td>
                                    <input type="number" style="width: 100%;" class="form-control rounded border-dark" id="txtMinimumStockLevel" name="txtMinimumStockLevel" />
                                </td>

                                <td style="width: 15%;">Maximum Stock Level *</td>
                                <td>
                                    <input type="number" style="width: 100%;" class="form-control rounded border-dark" id="txtMaximumStockLevel" name="txtMaximumStockLevel" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Is GST Applicable(Y/N)</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlGstApplicable" name="ddlGstApplicable" class="form-control rounded border-dark" onchange="ShowHideGSTDetails();">
                                        <option value="">-Select GST Applicable-</option>
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </td>
                                <td style="width: 7%;">Description</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" maxlength="100" />
                                </td>


                            </tr>
                            <tr class="GST" style="display: none;">
                                <td style="width: 15%;">HSN No</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtHsnNo" name="txtHsnNo" />
                                </td>
                                <td style="width: 15%;">Central Tax %</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo GST_Calculate" id="txtCentralTax" name="txtCentralTax" />
                                </td>
                            </tr>
                            <tr class="GST" style="display: none;">
                                <td style="width: 15%;">State Tax %</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo GST_Calculate" id="txtStateTax" name="txtStateTax" />
                                </td>
                                <td style="width: 15%;">Cess %</td>
                                <td>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo GST_Calculate" id="txtCess" name="txtCess" />
                                </td>
                            </tr>
                            <tr class="GST" style="display: none;">
                                <td style="width: 15%;">Integrated Tax %</td>
                                <td>
                                    <input type="text" style="width: 100%;" readonly="readonly" class="form-control rounded border-dark dcmlNo" id="txtIntegratedTax" name="txtIntegratedTax" />
                                </td>
                                <td style="width: 15%;"></td>
                                <td></td>
                            </tr>
                            <tr id="tr_purchase" style="display: none;">
                                <td colspan="4">
                                    <fieldset>
                                        <legend>Purchase *</legend>
                                        <table id="tblVendorDetails" class="display no-footer dataTable" style="width: 100%;">
                                            <thead>
                                                <tr>
                                                    <th style="display:none;">Vendor Id</th>
                                                    <th>Vendor</th>
                                                    <th style="display: none;">Currency Id</th>
                                                    <th>Currency</th>
                                                    <th>Unit of Measeure</th>
                                                    <th>Price</th>
                                                    <th>Delivery Lead Time</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody_VendorDetails">
                                                <tr id="tr_VendorEntry">
                                                    <td style="display: none;"></td>
                                                    <td>
                                                        <select id="ddlVendor" name="ddlVendor" class="form-control">
                                                            <option value="">-Select Vendor-</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select id="ddlCurrency" name="ddlCurrency" class="form-control">
                                                            <option value="">-Select Currency-</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtUnitMeasure" name="txtUnitMeasure" readonly="readonly" />
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control dcmlNo" id="txtPrice" name="txtPrice" />
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtDeliveryLeadTime" name="txtDeliveryLeadTime" />
                                                    </td>
                                                    <td>
                                                        <button type="button" class="btn btn-primary" onclick="AddProductVendorDetails();">Add</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="tbl">
                                            <tr>
                                                <td colspan="2">
                                                    <fieldset>
                                                        <legend>Control Policy *</legend>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioControlPolicy" value="On ordered quantities" />On ordered quantities
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioControlPolicy" value="On received quantities" />On received quantities
                                                        </label>
                                                    </fieldset>
                                                </td>
                                                <td>Purchase Description</td>
                                                <td>
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtPurchaseDescription" name="txtPurchaseDescription" /></td>
                                            </tr>
                                        </table>
                                    </fieldset>
                                </td>
                            </tr>
                            <tr id="tr_sale" style="display: none;">
                                <td colspan="4">
                                    <fieldset>
                                        <legend>Sales *</legend>
                                        <table class="tbl">
                                            <tr>
                                                <td colspan="2">
                                                    <fieldset>
                                                        <legend>Invoicing Policy *</legend>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioInvoicingPolicy" value="Ordered quantities" />Ordered quantities
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioInvoicingPolicy" value="Delivered quantities" />Delivered quantities
                                                        </label>
                                                    </fieldset>
                                                </td>
                                                <td>Sales Description</td>
                                                <td>
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtSaleDescription" name="txtSaleDescription" /></td>
                                            </tr>
                                        </table>
                                    </fieldset>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <fieldset>
                                        <legend>Inventory *</legend>
                                        <table class="tbl">
                                            <tr>
                                                <td colspan="4">
                                                    <fieldset>
                                                        <legend>Routes *</legend>
                                                        <label class="radio-inline">
                                                            <input type="checkbox" name="chkDoorShipment" id="chkDoorShipment" />&nbsp;&nbsp;Door Shipment
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="checkbox" name="chkReplenish" id="chkReplenish" />&nbsp;&nbsp;Replenish
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="checkbox" name="chkResupplySubcontractoronOrder" id="chkResupplySubcontractoronOrder" />&nbsp;&nbsp;Resupply Subcontractor on Order
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="checkbox" name="chkBuy" id="chkBuy" />&nbsp;&nbsp;Buy
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="checkbox" name="chkManufacture" id="chkManufacture" />&nbsp;&nbsp;Manufacture
                                                        </label>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4">
                                                    <fieldset>
                                                        <legend>Logistics *</legend>
                                                        <table class="tbl">
                                                            <tr>
                                                                <td>Weight(kg) *</td>
                                                                <td>
                                                                    <input type="text" class="form-control dcmlNo" id="txtWeight" name="txtWeight" /></td>
                                                                <td>Volume(&#13217;) *</td>
                                                                <td>
                                                                    <input type="text" class="form-control dcmlNo" id="txtVolume" name="txtVolume" /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Manufacturing Lead Time(days) *</td>
                                                                <td>
                                                                    <input type="number" class="form-control" id="txtManufactureLeadTime" name="txtManufactureLeadTime" /></td>
                                                                <td>Customer Lead Time(days) *</td>
                                                                <td>
                                                                    <input type="number" class="form-control" id="txtCustomerLeadTime" name="txtCustomerLeadTime" /></td>
                                                            </tr>
                                                        </table>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4">
                                                    <fieldset>
                                                        <legend>Tracking *</legend>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioTracking" value="By Unique Serial Number" />By Unique Serial Number
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioTracking" value="By Lots" />By Lots
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="optradioTracking" value="No Tracking" />No Tracking
                                                        </label>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                             <tr id="tr_expirationdate" style="display: none;">
                                <td colspan="4"><label class="radio-inline">
                                            <input type="checkbox" name="ChkExpirationDate" id="ChkExpirationDate" onchange="ShowExpirationTime();" />&nbsp;&nbsp;Expiration Date
                                        </label></td>
                                
                            </tr>
                            <tr id="tr_time" style="display: none;">
                                <td colspan="4">
                                <fieldset>
                                    <legend>Dates *</legend>
                                    <table class="tbl">
                                        <tr>
                                            <td>Expiration Time(days)</td>
                                            <td>
                                                <input type="number" class="form-control" id="txtExpirationTime" name="txtExpirationTime" /></td>
                                            <td>Best Before Time(days)</td>
                                            <td>
                                                <input type="number" class="form-control" id="txtBestBeforeTime" name="txtBestBeforeTime" /></td>
                                        </tr>
                                        <tr>
                                            <td>Removal Time(days)</td>
                                            <td>
                                                <input type="number" class="form-control" id="txtRemovalTime" name="txtRemovalTime" /></td>
                                            <td>Alert Time(days)</td>
                                            <td>
                                                <input type="number" class="form-control" id="txtAlertTime" name="txtAlertTime" /></td>
                                        </tr>
                                    </table>
                                </fieldset>
                                    </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <fieldset>
                                        <legend>Packaging *</legend>
                                        <table id="tblPackaging" class="display no-footer dataTable" style="width: 100%;">
                                            <thead>
                                                <tr>
                                                    <th>Packaging</th>
                                                    <th>Contained Quantity</th>
                                                    <th>Unit of Measeure</th>
                                                    <th style="display:none;">Branch Code</th>
                                                    <th>Branch</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody_Packaging">
                                                <tr id="tr_Packaging">
                                                    <td style="display: none;"></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPackaging" name="txtPackaging" />
                                                    </td>
                                                    <td>
                                                        <input type="number" class="form-control" id="txtPackageQty" name="txtPackageQty" />
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPackageUnitMeasure" name="txtPackageUnitMeasure" readonly="readonly" />
                                                    </td>
                                                    <td>
                                                        <select style="width: 100%;" id="ddlBranch" name="ddlBranch" class="form-control rounded border-dark">
                                                            <option value="">-Select Branch-</option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <button type="button" class="btn btn-primary" onclick="AddProductPackagingDetails();">Add</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="tbl">
                                            <tr>

                                                <td colspan="2">Description for Delivery Orders</td>
                                                <td colspan="2">
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtDeliveryOrderDescription" name="txtDeliveryOrderDescription" /></td>
                                            </tr>
                                            <tr>

                                                <td colspan="2">Description for Receipts</td>
                                                <td colspan="2">
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtReceiptsDescription" name="txtReceiptsDescription" /></td>
                                            </tr>
                                            <tr>

                                                <td colspan="2">Description for Internal Transfers</td>
                                                <td colspan="2">
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtInternalTransferDescription" name="txtInternalTransferDescription" /></td>
                                            </tr>
                                        </table>
                                    </fieldset>
                                </td>
                            </tr>
                                        </table>
                                    </fieldset>
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
