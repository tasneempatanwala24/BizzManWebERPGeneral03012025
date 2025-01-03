$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindUnitMesureDropdown()
    BindMaterialGroupDropdown()
    BindMaterialCategoryNameDropdown();
    BindBranchDropdown();
    BindCurrencyDropdown();
    BindVendorDropdown();
    BindMaterialList();

    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $('input[type=radio][name=optradioTracking]').change(function () {
        
        if (this.value != 'No Tracking') {
            $('#tr_expirationdate').show();

        }
        else {
            $('#tr_expirationdate').hide();
            $('#tr_time').hide();
            $('#ChkExpirationDate').prop('checked', false);
            $('#txtExpirationTime').val('');
            $('#txtBestBeforeTime').val('');
            $('#txtRemovalTime').val('');
            $('#txtAlertTime').val('');
        }
       
    });

    $('.GST_Calculate').bind("change", function (element) {
        var CentralTax = 0;
        var StateTax = 0;
        var Cess = 0;

        if ($('#txtCentralTax').val() != '') {
            CentralTax = parseFloat($('#txtCentralTax').val());
        }

        if ($('#txtStateTax').val() != '') {
            StateTax = parseFloat($('#txtStateTax').val());
        }

        if ($('#txtCess').val() != '') {
            Cess = parseFloat($('#txtCess').val());
        }

        $('#txtIntegratedTax').val((CentralTax + StateTax + Cess).toFixed(2));
    });
});

function ShowExpirationTime() {
    if ($("#ChkExpirationDate").is(':checked')) {
        $('#tr_time').show();
    }
    else {
        $('#tr_time').hide();
    }
}

function ShowHideSales() {
    if ($("#chkCanSold").is(':checked')) {
        $('#tr_sale').show();
    }
    else {
        $('#tr_sale').hide();
    }
}

function ShowHidePurchase() {
    if ($("#chkCanPurchased").is(':checked')) {
        $('#tr_purchase').show();
        $('#txtUnitMeasure').val($('#ddlUnitMesure').val());
        $('#txtPackageUnitMeasure').val($('#ddlUnitMesure').val());
    }
    else {
        $('#tr_purchase').hide();
        $('#txtUnitMeasure').val('');
        $('#txtPackageUnitMeasure').val('');
    }
}

function UpdateUnitMeasure() {
    $('#txtUnitMeasure').val($('#ddlUnitMesure').val());
    $('#txtPackageUnitMeasure').val($('#ddlUnitMesure').val());
}


function BindCurrencyDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/BindCurrencyList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCurrency').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Currency-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Currency + "</option>";
            }
            $('#ddlCurrency').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/BindVendorList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlVendor').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Vendor-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].VendorName + "</option>";
            }
            $('#ddlVendor').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

 /*
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendance.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlBranch').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlBranch').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}




function BindMaterialCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/MaterialMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlMaterialCategoryName').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindMaterialGroupDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/MaterialGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].GroupName + "'>" + JSON.parse(response.d)[i].GroupName + "</option>";
            }
            $('#ddlMaterialGroup').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/UnitMesureList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].UnitMesureName + "'>" + JSON.parse(response.d)[i].UnitMesureName + "</option>";
            }
            $('#ddlUnitMesure,#ddlSalesUnitMesure,#ddlAltUnitMesure').append(branch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindMaterialList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/FetchMaterialList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialList').DataTable().clear();
            $('#tblMaterialList').DataTable().destroy();
            $('#tbody_Material_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchMaterialDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + (data[i].Name != undefined ? data[i].Name : '') + '</td>'
                    + '<td>' + (data[i].MeterialGroup != undefined ? data[i].MeterialGroup : '') + '</td>'
                    + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td>' + (data[i].MaterialType != undefined ? data[i].MaterialType : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].SalesUnitMesure != undefined ? data[i].SalesUnitMesure : '') + '</td>'
                    + '<td>' + (data[i].AltUnitMesure != undefined ? data[i].AltUnitMesure : '') + '</td>'
                    + '<td>' + (data[i].RelationUnitMesure != undefined ? data[i].RelationUnitMesure : '') + '</td>'
                    + '<td>' + (data[i].RelationSalesUnitMesure != undefined ? data[i].RelationSalesUnitMesure : '') + '</td>'
                    + '<td>' + (data[i].RateOfDuty != undefined ? data[i].RateOfDuty : '') + '</td>'
                    + '<td>' + (data[i].NatureOfItem != undefined ? data[i].NatureOfItem : '') + '</td>'
                    + '<td>' + (data[i].BarCode != undefined ? data[i].BarCode : '') + '</td>'
                    + '<td>' + (data[i].CostingMethod != undefined ? data[i].CostingMethod : '') + '</td>'
                    + '<td>' + (data[i].BOM != undefined ? data[i].BOM : '') + '</td>'
                    + '<td>' + (data[i].MaintainInBatch != undefined ? data[i].MaintainInBatch : '') + '</td>'
                    + '<td>' + (data[i].MRP != undefined ? data[i].MRP : '') + '</td>'
                    + '<td>' + (data[i].MinimumStockLevel != undefined ? data[i].MinimumStockLevel : '') + '</td>'
                    + '<td>' + (data[i].MaximumStockLevel != undefined ? data[i].MaximumStockLevel : '') + '</td>'
                    + '<td>' + (data[i].Description != undefined ? data[i].Description : '') + '</td>'
                    + '<td>' + (data[i].GstApplicable != undefined ? data[i].GstApplicable : '') + '</td>'
                    + '<td>' + (data[i].HsnNo != undefined ? data[i].HsnNo : '') + '</td>'
                    + '<td>' + (data[i].CentralTaxPercent != undefined ? data[i].CentralTaxPercent : '') + '</td>'
                    + '<td>' + (data[i].StateTaxPercent != undefined ? data[i].StateTaxPercent : '') + '</td>'
                    + '<td>' + (data[i].CessPercent != undefined ? data[i].CessPercent : '') + '</td>'
                    + '<td>' + (data[i].IntegratedTaxPercent != undefined ? data[i].IntegratedTaxPercent : '') + '</td></tr>';
            }
            $('#tbody_Material_List').html(html);
            $('#tblMaterialList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function FetchMaterialDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/FetchMaterialDetails',
        data: JSON.stringify({
            "MaterialId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divMaterialList').hide();
            $('#divMaterialEntry').show();
            $("#btnSave").html('Update');
            $('#txtMaterialName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();




            var data = JSON.parse(response.d);

            $('#txtMaterialName').val(data[0].MaterialName);
            $('#txtDescription').val(data[0].Description);
            $('#txtId').val(data[0].Id);
            $('#txtRelationPurchaseUnitMesure').val(data[0].RelationUnitMesure);
            $('#txtRateOfDuty').val(data[0].RateOfDuty);
            $('#txtHsnNo').val(data[0].HsnNo);
            $('#ddlCostingMethod').val(data[0].CostingMethod);
            $('#txtMrp').val(data[0].MRP);
            $('#ddlNatureOfItem').val(data[0].NatureOfItem);
            $('#ddlBom').val(data[0].BOM);
            $('#ddlMaintainInBatch').val(data[0].MaintainInBatch);
            $('#txtBarcode').val(data[0].BarCode);
            $('#txtRelationSalesUnitMesure').val(data[0].RelationSalesUnitMesure);

            $('#ddlMaterialCategoryName').val(data[0].MaterialCategoryId);
            $('#ddlUnitMesure').val(data[0].UnitMesure);
            $('#txtUnitMeasure').val(data[0].UnitMesure);
            $('#txtPackageUnitMeasure').val(data[0].UnitMesure);
            $('#ddlMaterialGroup').val(data[0].MeterialGroup);
            $('#ddlAltUnitMesure').val(data[0].AltUnitMesure);
            $('#ddlSalesUnitMesure').val(data[0].SalesUnitMesure);

            $('#ddlGstApplicable').val(data[0].GstApplicable);
            $('#txtCentralTax').val(data[0].CentralTaxPercent);
            $('#txtStateTax').val(data[0].StateTaxPercent);
            $('#txtCess').val(data[0].CessPercent);
            $('#txtIntegratedTax').val(data[0].IntegratedTaxPercent);
            $('#txtMinimumStockLevel').val(data[0].MinimumStockLevel);
            $('#txtMaximumStockLevel').val(data[0].MaximumStockLevel);

            ShowHideGSTDetails();
            if ($('#ddlBom').val() == 'y') {
                $('#a_viewBOM').show();
            }

            $('#ddlMaterialType').val(data[0].MaterialType);
            if (data[0].CanPurchase == '1') {
                $('#chkCanPurchased').prop('checked', true);
                $('#tr_purchase').show();
                $("input[name=optradioControlPolicy][value='" + data[0].ControlPolicy + "']").prop('checked', true);
                $('#txtPurchaseDescription').val(data[0].PurchaseDescription);
                FetchPurchaseVendorDetailList(id);
            }

            if (data[0].CanSale == '1') {
                $('#chkCanSold').prop('checked', true);
                $('#tr_sale').show();
                $("input[name=optradioInvoicingPolicy][value='" + data[0].InvoicingPolicy + "']").prop('checked', true);
                $('#txtSaleDescription').val(data[0].SaleDescription);
            }

            if (data[0].DoorShipment == '1') {
                $('#chkDoorShipment').prop('checked', true);
            }
            if (data[0].Replenish == '1') {
                $('#chkReplenish').prop('checked', true);
            }
            if (data[0].ResupplySubcontractoronOrder == '1') {
                $('#chkResupplySubcontractoronOrder').prop('checked', true);
            }
            if (data[0].Buy == '1') {
                $('#chkBuy').prop('checked', true);
            }
            if (data[0].Manufacture == '1') {
                $('#chkManufacture').prop('checked', true);
            }

            $('#txtWeight').val(data[0].Weight);
            $('#txtVolume').val(data[0].Volume);
            $('#txtManufactureLeadTime').val(data[0].ManufactureLeadTime);
            $('#txtCustomerLeadTime').val(data[0].CustomerLeadTime);
            $("input[name=optradioTracking][value='" + data[0].Tracking + "']").prop('checked', true);
            if (this.value != 'No Tracking') {
                $('#ChkExpirationDate').prop('checked', true);
                $('#tr_expirationdate').show();
                $('#tr_time').show();
                $('#txtExpirationTime').val(data[0].ExpirationTime);
                $('#txtBestBeforeTime').val(data[0].BestBeforeTime);
                $('#txtRemovalTime').val(data[0].RemovalTime);
                $('#txtAlertTime').val(data[0].AlertTime);
            }

            $('#txtDeliveryOrderDescription').val(data[0].DeliveryOrderDescription);
            $('#txtReceiptsDescription').val(data[0].ReceiptsDescription);
            $('#txtInternalTransferDescription').val(data[0].InternalTransferDescription);
            FetchPackagingDetailList(id);
            /*
            setTimeout(function () {
                $('#ddlMaterialCategoryName').val(data[0].MaterialCategoryId);
                $('#ddlUnitMesure').val(data[0].UnitMesure);
                $('#ddlMaterialGroup').val(data[0].MeterialGroup);
                $('#ddlAltUnitMesure').val(data[0].AltUnitMesure);
                $('#ddlSalesUnitMesure').val(data[0].SalesUnitMesure);
            }, 1000);
            */
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchPurchaseVendorDetailList(MaterialId) {
   
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/FetchPurchaseVendorDetailList',
        data: JSON.stringify({
            "MaterialId": MaterialId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_VendorDetails').append('<tr><td style="display: none;">' + data[i].VendorId + '</td>'
                    + '<td>' + data[i].VendorName + '</td>'
                    + '<td style="display: none;">' + data[i].CurrencyId + '</td>'
                    + '<td>' + data[i].Currency + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td>' + data[i].price + '</td>'
                    + '<td>' + data[i].DeliveryLeadTime + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
            }




        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function FetchPackagingDetailList(MaterialId) {

    $.ajax({
        type: "POST",
        url: 'wfMmMaterialMaster.aspx/FetchPackagingDetailList',
        data: JSON.stringify({
            "MaterialId": MaterialId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_Packaging').append('<tr>'
                    + '<td>' + data[i].Packaging + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td style="display: none;">' + data[i].BranchCode + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
            }




        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function CreateMaterial() {
    $('#divMaterialList').hide();
    $('#divMaterialEntry').show();
    $('#txtMaterialName').removeAttr("readonly");
    $('#txtId').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function ViewMaterialList() {
    $('#divMaterialList').show();
    $('#divMaterialEntry').hide();
    $('#btnSave').hide();
    BindMaterialList();
}

function ClearAll() {
    $('#ddlMaterialCategoryName,#txtMaterialName,#ddlUnitMesure,#txtDescription,#ddlMaterialGroup,#txtId,#ddlSalesUnitMesure,#ddlAltUnitMesure,#txtRelationPurchaseUnitMesure,#txtRateOfDuty,#txtHsnNo,#txtMrp,#ddlNatureOfItem,#ddlBom,#ddlMaintainInBatch,#txtBarcode').val('');

    $('#txtRelationSalesUnitMesure').val('');
    $('#ddlCostingMethod').val('');
    $('#ddlGstApplicable').val('');
    $('#txtCentralTax').val('');
    $('#txtStateTax').val('');
    $('#txtCess').val('');
    $('#txtIntegratedTax').val('');
    $('#txtMinimumStockLevel').val('');
    $('#txtMaximumStockLevel').val('');
    $('.GST').hide();
    $('#a_viewBOM').hide();
    $('#tbody_VendorDetails').children('tr:not(:first)').remove();
    $('#tbody_Packaging').children('tr:not(:first)').remove();

    $('#txtDeliveryOrderDescription').val('');
    $('#txtReceiptsDescription').val('');
    $('#txtInternalTransferDescription').val('');
    $('#ddlBranch').val('');
    $('#txtPackageUnitMeasure').val('');
    $('#txtPackageQty').val('');
    $('#txtPackaging').val('');
    $('#txtExpirationTime').val('');
    $('#txtBestBeforeTime').val('');
    $('#txtRemovalTime').val('');
    $('#txtAlertTime').val('');
    $('#txtWeight').val('');
    $('#txtVolume').val('');
    $('#txtManufactureLeadTime').val('');
    $('#txtCustomerLeadTime').val('');
    $('#txtPurchaseDescription').val('');
    $('#txtSaleDescription').val('');
    $('#ddlMaterialType').val('');

    $('#chkCanSold').prop('checked', false);
    $('#chkCanPurchased').prop('checked', false);
    $('#chkDoorShipment').prop('checked', false);
    $('#chkReplenish').prop('checked', false);
    $('#chkResupplySubcontractoronOrder').prop('checked', false);
    $('#chkBuy').prop('checked', false);
    $('#chkManufacture').prop('checked', false);
    $('#ChkExpirationDate').prop('checked', false);

    $('input[name=optradioTracking]').removeAttr('checked');
    $('input[name=optradioInvoicingPolicy]').removeAttr('checked');
    $('input[name=optradioControlPolicy]').removeAttr('checked');
    $('#tr_purchase').hide();
    $('#tr_sale').hide();
    $('#tr_expirationdate').hide();
    $('#tr_time').hide();
}


function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    var purchase_vendor_details = '';
    $('#tbody_VendorDetails tr').each(function (index1, tr) {
        if (index1 > 0) {
            $(tr).find('td').each(function (index, td) {
                if (index1 == 1) {
                    if (purchase_vendor_details == '') {
                        if (index == 0) {
                            purchase_vendor_details = td.outerText;
                        }

                    }
                    else {
                        if (index == 2) {
                            purchase_vendor_details = purchase_vendor_details + '|' + td.outerText;
                        }
                        else if (index == 5) {
                            purchase_vendor_details = purchase_vendor_details + '$' + td.outerText;
                        }
                        else if (index == 6) {
                            purchase_vendor_details = purchase_vendor_details + '!' + td.outerText;
                        }
                    }
                }
                else {
                    if (index == 0) {
                        purchase_vendor_details = purchase_vendor_details + '@' + td.outerText;
                    }
                    else if (index == 2) {
                        purchase_vendor_details = purchase_vendor_details + '|' + td.outerText;
                    }
                    else if (index == 5) {
                        purchase_vendor_details = purchase_vendor_details + '$' + td.outerText;
                    }
                    else if (index == 6) {
                        purchase_vendor_details = purchase_vendor_details + '!' + td.outerText;
                    }
                }
            });
        }
    });

    var inventory_packaging_details = '';
    $('#tbody_Packaging tr').each(function (index1, tr) {
        if (index1 > 0) {
            $(tr).find('td').each(function (index, td) {
                if (index1 == 1) {
                    if (inventory_packaging_details == '') {
                        if (index == 0) {
                            inventory_packaging_details = td.outerText;
                        }

                    }
                    else {
                        if (index == 1) {
                            inventory_packaging_details = inventory_packaging_details + '|' + td.outerText;
                        }
                        else if (index == 3) {
                            inventory_packaging_details = inventory_packaging_details + '$' + td.outerText;
                        }
                    }
                }
                else {
                    if (index == 0) {
                        inventory_packaging_details = inventory_packaging_details + '@' + td.outerText;
                    }
                    else if (index == 1) {
                        inventory_packaging_details = inventory_packaging_details + '|' + td.outerText;
                    }
                    else if (index == 3) {
                        inventory_packaging_details = inventory_packaging_details + '$' + td.outerText;
                    }
                }
            });
        }
    });

    if ($("#chkCanSold").is(':checked') == false && $("#chkCanPurchased").is(':checked') == false) {
        alertify.error("Please Select Purchase / Sale Permission");
        isValid = false;
    }
    else if ($('#ddlMaterialType').val() == '') {
        alertify.error("Please Select Material Type");
        isValid = false;
    }
    else if ($('#ddlMaterialCategoryName').val() == '') {
        alertify.error("Please Select Material Category");
        isValid = false;
    }
    else if ($('#txtMaterialName').val() == '') {
        alertify.error("Please Enter Material Name");
        isValid = false;
    }
    else if ($('#ddlUnitMesure').val() == '') {
        alertify.error("Please Select Purchase Unit Measure");
        isValid = false;
    }
    else if ($('#txtRelationSalesUnitMesure').val() == '') {
        alertify.error("Please Enter Relation Sales Unit Mesure");
        isValid = false;
    }
    else if ($('#txtRelationPurchaseUnitMesure').val() == '') {
        alertify.error("Please Enter Relation Purchase Unit Mesure");
        isValid = false;
    }
    else if ($('#txtMrp').val() == '') {
        alertify.error("Please Enter MRP Correctly");
        isValid = false;
    }
    else if ($('#txtRateOfDuty').val() == '') {
        alertify.error("Please Enter Rate of Duty Correctly");
        isValid = false;
    }
    else if ($('#txtMinimumStockLevel').val() == '') {
        alertify.error("Please Enter Minimum Stock Level");
        isValid = false;
    }
    else if ($('#txtMaximumStockLevel').val() == '') {
        alertify.error("Please Enter Maximum Stock Level");
        isValid = false;
    }
    else if ($('#ddlGstApplicable').val() == '') {
        alertify.error("Please Enter Gst Applicable");
        isValid = false;
    }
    else if ($("#chkCanSold").is(':checked')) {
        if ($("input:radio[name='optradioInvoicingPolicy']:checked").val() == undefined) {
            alertify.error("Please select invoicing policy");
            isValid = false;
        }
    }
    else if ($("#chkCanPurchased").is(':checked')) {
        if (purchase_vendor_details == '') {
            alertify.error("Please enter vedor details");
            isValid = false;
        }
        else if ($("input:radio[name='optradioControlPolicy']:checked").val() == undefined) {
            alertify.error("Please select control policy");
            isValid = false;
        }
    }
    else if ($("#chkDoorShipment").is(':checked') == false && $("#chkReplenish").is(':checked') == false && $("#chkResupplySubcontractoronOrder").is(':checked') == false && $("#chkBuy").is(':checked') == false && $("#chkManufacture").is(':checked') == false) {
        alertify.error("Please Select Routes");
        isValid = false;
    }
    else if ($('#txtWeight').val() == '') {
        alertify.error("Please Enter Weight");
        isValid = false;
    }
    else if ($('#txtVolume').val() == '') {
        alertify.error("Please Enter Volume");
        isValid = false;
    }
    else if ($('#txtManufactureLeadTime').val() == '') {
        alertify.error("Please Enter Manufacture Lead Time");
        isValid = false;
    }
    else if ($('#txtCustomerLeadTime').val() == '') {
        alertify.error("Please Enter Customer Lead Time");
        isValid = false;
    }
    else if ($("input:radio[name='optradioTracking']:checked").val() == undefined) {
        alertify.error("Please select Tracking");
        isValid = false;
    }
    else if ($("input:radio[name='optradioTracking']:checked").val() != "No Tracking") {
        if ($("#ChkExpirationDate").is(':checked') == false) {
            alertify.error("Please Select Expiration date");
            isValid = false;
        }
        else if ($('#txtExpirationTime').val() == '') {
            alertify.error("Please Enter Expiration Time");
            isValid = false;
        }
        else if ($('#txtBestBeforeTime').val() == '') {
            alertify.error("Please Enter Best Before Time");
            isValid = false;
        }
        else if ($('#txtRemovalTime').val() == '') {
            alertify.error("Please Enter Removal Time");
            isValid = false;
        }
        else if ($('#txtAlertTime').val() == '') {
            alertify.error("Please Enter Alert Time");
            isValid = false;
        }
    }
    else if (inventory_packaging_details == '') {
        alertify.error("Please enter packaging details");
        isValid = false;
    }
    else if ($('#ddlGstApplicable').val() == 'y') {
        if ($('#txtHsnNo').val() == '') {
            alertify.error("Please Enter HSN No.");
            isValid = false;
        }
        else if ($('#txtCentralTax').val() == '' && $('#txtStateTax').val() == '' && $('#txtCess').val() == '') {
            alertify.error("Please Enter Central Tax % or State Tax % or Cess %");
            isValid = false;
        }

    }

 
    if (isValid) {
        var chkCanSold = "0";
        var chkCanPurchased = "0";
        var InvoicingPolicy = "";
        var ControlPolicy = "";
        var DoorShipment = "0";
        var Replenish = "0";
        var ResupplySubcontractoronOrder = "0";
        var Buy = "0";
        var Manufacture = "0";
        var Tracking = "";
        if ($("#chkCanSold").is(':checked') == true) {
            chkCanSold = "1";
        }
        if ($("#chkCanPurchased").is(':checked') == true) {
            chkCanPurchased = "1";
        }

        if ($("input:radio[name='optradioTracking']:checked").val() != undefined) {
            Tracking = $("input:radio[name='optradioTracking']:checked").val();
        }

        if ($("input:radio[name='optradioInvoicingPolicy']:checked").val() != undefined) {
            InvoicingPolicy = $("input:radio[name='optradioInvoicingPolicy']:checked").val();
        }

        if ($("input:radio[name='optradioControlPolicy']:checked").val() != undefined) {
            ControlPolicy = $("input:radio[name='optradioControlPolicy']:checked").val();
        }

        if ($("#chkDoorShipment").is(':checked') == true) {
            DoorShipment = "1";
        }
        if ($("#chkReplenish").is(':checked') == true) {
            Replenish = "1";
        }
        if ($("#chkResupplySubcontractoronOrder").is(':checked') == true) {
            ResupplySubcontractoronOrder = "1";
        }
        if ($("#chkBuy").is(':checked') == true) {
            Buy = "1";
        }
        if ($("#chkManufacture").is(':checked') == true) {
            Manufacture = "1";
        }

        $.ajax({
            type: "POST",
            url: 'wfMmMaterialMaster.aspx/CheckMaterialAvailability',
            data: JSON.stringify({ "MaterialName": $('#txtMaterialName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfMmMaterialMaster.aspx/AddDetails',
                        data: JSON.stringify({
                            "MaterialCategoryId": $('#ddlMaterialCategoryName').val().trim(),
                            "MaterialName": $('#txtMaterialName').val().trim(),
                            "UnitMesure": $('#ddlUnitMesure').val().trim(),
                            "Description": $('#txtDescription').val().trim(),
                            "RateOfDuty": $('#txtRateOfDuty').val().trim(),
                            "NatureOfItem": $('#ddlNatureOfItem').val().trim(),
                            "HsnNo": $('#txtHsnNo').val().trim(),
                            "BarCode": $('#txtBarcode').val().trim(),
                            "CostingMethod": $('#ddlCostingMethod').val().trim(),
                            "BOM": $('#ddlBom').val().trim(),
                            "MaintainInBatch": $('#ddlMaintainInBatch').val().trim(),
                            "MRP": $('#txtMrp').val().trim(),
                            "RelationUnitMesure": $('#txtRelationPurchaseUnitMesure').val().trim(),
                            "RelationSalesUnitMesure": $('#txtRelationSalesUnitMesure').val().trim(),
                            "SalesUnitMesure": $('#ddlSalesUnitMesure').val().trim(),
                            "AltUnitMesure": $('#ddlAltUnitMesure').val().trim(),
                            "MeterialGroup": $('#ddlMaterialGroup').val().trim(),
                            "GstApplicable": $('#ddlGstApplicable').val().trim(),
                            "CentralTax": $('#txtCentralTax').val().trim(),
                            "StateTax": $('#txtStateTax').val().trim(),
                            "Cess": $('#txtCess').val().trim(),
                            "IntegratedTax": $('#txtIntegratedTax').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "MinimumStockLevel": $('#txtMinimumStockLevel').val().trim(),
                            "MaximumStockLevel": $('#txtMaximumStockLevel').val().trim(),
                            "MaterialType": $('#ddlMaterialType').val().trim(),
                            "chkCanPurchased": chkCanPurchased,
                            "chkCanSold": chkCanSold,
                            "InvoicingPolicy": InvoicingPolicy,
                            "SaleDescription": $('#txtSaleDescription').val().trim(),
                            "purchase_vendor_details": purchase_vendor_details,
                            "ControlPolicy": ControlPolicy,
                            "PurchaseDescription": $('#txtPurchaseDescription').val().trim(),
                            "DoorShipment": DoorShipment,
                            "Replenish": Replenish,
                            "ResupplySubcontractoronOrder": ResupplySubcontractoronOrder,
                            "Buy": Buy,
                            "Manufacture": Manufacture,
                            "Weight": $('#txtWeight').val().trim(),
                            "Volume": $('#txtVolume').val().trim(),
                            "ManufactureLeadTime": $('#txtManufactureLeadTime').val().trim(),
                            "CustomerLeadTime": $('#txtCustomerLeadTime').val().trim(),
                            "Tracking": Tracking,
                            "ExpirationTime": $('#txtExpirationTime').val().trim(),
                            "BestBeforeTime": $('#txtBestBeforeTime').val().trim(),
                            "RemovalTime": $('#txtRemovalTime').val().trim(),
                            "AlertTime": $('#txtAlertTime').val().trim(),
                            "inventory_packaging_details": inventory_packaging_details,
                            "DeliveryOrderDescription": $('#txtDeliveryOrderDescription').val().trim(),
                            "ReceiptsDescription": $('#txtReceiptsDescription').val().trim(),
                            "InternalTransferDescription": $('#txtInternalTransferDescription').val().trim(),
                            "MaterialMasterId": $('#txtId').val().trim()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            UploadFiles();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error("Current Material Name already available");
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}



function UploadFiles() {
    var data = new FormData();

    $.ajax({
        url: "FileUploadHandler.ashx",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            if ($('#btnSave').html() == 'Update') {
                alertify.success("Material Master updated successfully");
            }
            else {
                alertify.success("Material Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}

function ShowHideGSTDetails() {
    if ($('#ddlGstApplicable').val() == 'y') {
        $('.GST').show();
    }
    else {
        $('.GST').hide();
    }
}

function CloseModal() {
    $('#BOMDetailsModal').modal('hide');
}

function ShowBOMDetails() {
   // let random_no = Math.floor((Math.random() * 100) + 1);
    var d = new Date();
    $('#BOM_frame').prop('src', 'wfMmBomEntry.aspx?ver=' + d.getTime() + '&MaterialId=' + $('#txtId').val());
    var frameElement = document.getElementById("BOM_frame");
    frameElement.contentWindow.location.href = frameElement.src;
    $('#BOMDetailsModal').modal('show');
    $('.modal-backdrop').remove();
}


function DeleteRow(ele) {
    $(ele.parentElement.parentElement).remove();
}

function AddProductVendorDetails() {

    if ($('#ddlVendor').val() != '') {
        if ($('#ddlCurrency').val() != '') {
            if ($('#txtUnitMeasure').val() != '') {
                if ($('#txtPrice').val() != '') {
                    if ($('#txtDeliveryLeadTime').val() != '') {
                        $('#tbody_VendorDetails').append('<tr><td style="display: none;">' + $('#ddlVendor').val() + '</td>'
                            + '<td>' + $("#ddlVendor option:selected").text() + '</td>'
                            + '<td style="display: none;">' + $("#ddlCurrency").val() + '</td>'
                            + '<td>' + $("#ddlCurrency option:selected").text() + '</td>'
                            + '<td>' + $("#txtUnitMeasure").val() + '</td>'
                            + '<td>' + $("#txtPrice").val() + '</td>'
                            + '<td>' + $("#txtDeliveryLeadTime").val() + '</td>'
                            + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                            + '</tr>');
                        $('#ddlVendor').val('');
                        $('#ddlCurrency').val('');
                        $('#txtPrice').val('');
                        $('#txtDeliveryLeadTime').val('');
                    }
                    else {
                        alertify.error('Please enter delivery lead time');
                    }
                }
                else {
                    alertify.error('Please enter price');
                }
            }
            else {
                alertify.error('Please select any purchase unit measure');
            }
        }
        else {
            alertify.error('Please select any currency');
        }
    }
    else {
        alertify.error('Please select any vendor');
    }


}



function AddProductPackagingDetails() {

    if ($('#txtPackaging').val() != '') {
        if ($('#txtPackageQty').val() != '') {
            if ($('#txtPackageUnitMeasure').val() != '') {
                if ($('#ddlBranch').val() != '') {
                        $('#tbody_Packaging').append('<tr>'
                            + '<td>' + $('#txtPackaging').val() + '</td>'
                            + '<td>' + $("#txtPackageQty").val() + '</td>'
                            + '<td>' + $("#txtPackageUnitMeasure").val() + '</td>'
                            + '<td style="display: none;">' + $("#ddlBranch").val() + '</td>'
                            + '<td>' + $("#ddlBranch option:selected").text() + '</td>'
                            + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                            + '</tr>');
                    $('#txtPackaging').val('');
                    $('#txtPackageQty').val('');
                    $('#ddlBranch').val('');
                    
                }
                else {
                    alertify.error('Please select any branch');
                }
            }
            else {
                alertify.error('Please select any purchase unit measure');
            }
        }
        else {
            alertify.error('Please package quantity');
        }
    }
    else {
        alertify.error('Please enter packaging');
    }


}
