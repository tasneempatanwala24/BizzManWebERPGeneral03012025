$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindMainCategoryNameDropdown();
    BindCategoryNameDropdown();
    BindSubCategoryNameDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown();
    BindPackageDropdown();
    BindUnitMesureDropdown()
    BindMaterialGroupDropdown()
    
    BindCurrencyDropdown();
    BindVendorDropdown();
    BindMaterialList();
    $("#ddlPackage").on("change", function () {
        BindUOM();
    }).trigger("change");
    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    //$('input[type=radio][name=optradioTracking]').change(function () {

    //    if (this.value != 'No Tracking') {
    //        $('#tr_expirationdate').show();

    //    }
    //    else {
    //        //$('#tr_expirationdate').hide();
    //        $('#tr_expirationdate').show();
    //        $('#tr_time').hide();
    //        $('#ChkExpirationDate').prop('checked', false);
    //        $('#txtExpirationTime').val('');
    //        $('#txtBestBeforeTime').val('');
    //        $('#txtRemovalTime').val('');
    //        $('#txtAlertTime').val('');
    //    }

    //});

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
        //$('#txtPackageUnitMeasure').val($('#ddlUnitMesure').val());
    }
    else {
        $('#tr_purchase').hide();
        $('#txtUnitMeasure').val('');
        $('#txtPackageUnitMeasure').val('');
    }
}

function UpdateUnitMeasure() {
    $('#txtUnitMeasure').val($('#ddlUnitMesure').val());
    
}

function BindUOM() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/FetchUOM',
        data: JSON.stringify({
            "PackageName": $('#ddlPackage').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtPackageUnitMeasure').val(data[0].UnitMesure);
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindCurrencyDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/BindCurrencyList',
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
function BindPackageDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/BindPackageList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlPackage').html('');
            var data = JSON.parse(response.d);
            var package = "<option value=''>-Select Packaging-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                package = package + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].PackagingName + "</option>";
            }
            $('#ddlPackage').append(package);
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
        url: 'wfMmItemMaster.aspx/BindVendorList',
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

function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/BranchMasterList',
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

function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlDepartment').html('');
            var data = JSON.parse(response.d);
            var dept = "<option value=''>-Select Department-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dept = dept + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }
            $('#ddlDepartment').append(dept);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindMainCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/MainCategoryMasterList',
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
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/CategoryMasterList',
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
            $('#ddlCategoryName').append(abranch);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindSubCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemMaster.aspx/SubCategoryMasterList',
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
            $('#ddlSubCategory').append(abranch);

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
        url: 'wfMmItemMaster.aspx/MaterialGroupList',
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
        url: 'wfMmItemMaster.aspx/UnitMesureList',
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
        url: 'wfMmItemMaster.aspx/FetchMaterialList',
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
        url: 'wfMmItemMaster.aspx/FetchMaterialDetails',
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
            $('#ddlCategoryName').val(data[0].MaterialCategoryId);
            $('#ddlSubCategory').val(data[0].SubCategoryId);
            $('#ddlBranch').val(data[0].BranchCode);
            $('#ddlDepartment').val(data[0].DepartmentId);
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

            $('#ddlMaterialCategoryName').val(data[0].MainCategoryId);
            $('#ddlUnitMesure').val(data[0].UnitMesure);
            $('#txtUnitMeasure').val(data[0].UnitMesure);
            //$('#txtPackageUnitMeasure').val(data[0].UnitMesure);
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
        url: 'wfMmItemMaster.aspx/FetchPurchaseVendorDetailList',
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
        url: 'wfMmItemMaster.aspx/FetchPackagingDetailList',
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
                    + '<td>' + data[i].PackagingName + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
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
    
    $('#ddlMaterialCategoryName,#ddlCategoryName,#ddlSubCategory,#ddlMaterialGroup,#ddlDepartment,#ddlUnitMesure,#txtId,#txtRelationPurchaseUnitMesure,#txtMaterialName,#ddlSalesUnitMesure,#ddlNatureOfItem,#ddlMaintainInBatch,#txtMrp,#ddlBom,#txtBarcode,#txtDescription,#txtHsnNo').val('');
    $('#txtMaterialName').removeAttr('readonly');
    $('#ddlMaterialType').val('');
    $('#ddlBranch').val('');
    $('#ddlCostingMethod').val('');
    $('#txtRelationSalesUnitMesure').val('');
    $('#txtMinimumStockLevel').val('');
    $('#ddlGstApplicable').val('');
    $('#txtMaximumStockLevel').val('');
    $('#txtCentralTax').val('');
    $('#txtStateTax').val('');
    $('#txtCess').val('');
    $('#txtIntegratedTax').val('');
    $('.GST').hide();
    $('#tbody_VendorDetails').children('tr:not(:first)').remove();
    $('input[name=optradioControlPolicy]').removeAttr('checked');
    $('input[name=optradioInvoicingPolicy]').removeAttr('checked');
    $('#txtExpirationTime').val('');
    $('#txtBestBeforeTime').val('');
    $('#txtRemovalTime').val('');
    $('#txtAlertTime').val('');
    $('#chkCanSold').prop('checked', false);
    $('#chkCanPurchased').prop('checked', false);
    $('#ChkExpirationDate').prop('checked', false);
    $('#tbody_Packaging').children('tr:not(:first)').remove();
    $('#txtDeliveryOrderDescription').val('');
    $('#txtReceiptsDescription').val('');
    $('#txtInternalTransferDescription').val('');
    $('#a_viewBOM').hide();
    $('#txtPackageUnitMeasure').val('');
    $('#txtPackageQty').val('');
    $('#ddlPackage').val('');
    $('#txtPurchaseDescription').val('');
    $('#txtSaleDescription').val('');
    $('#tr_purchase').hide();
    $('#tr_sale').hide();
    $('#tr_expirationdate').show();
    $('#tr_time').hide();
    $('#btnSave').html('Save');
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
        alertify.error("Please Select Main Category");
        isValid = false;
    }
    else if ($('#ddlCategoryName').val() == '') {
        alertify.error("Please Select Category");
        isValid = false;
    }
    else if ($('#ddlSubCategory').val() == '') {
        alertify.error("Please Select Sub Category");
        isValid = false;
    }
    else if ($('#ddlMaterialGroup').val() == '') {
        alertify.error("Please Select Material Group");
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
        if ($("#chkCanSold").is(':checked') == true) {
            chkCanSold = "1";
        }
        if ($("#chkCanPurchased").is(':checked') == true) {
            chkCanPurchased = "1";
        }

        if ($("input:radio[name='optradioInvoicingPolicy']:checked").val() != undefined) {
            InvoicingPolicy = $("input:radio[name='optradioInvoicingPolicy']:checked").val();
        }

        if ($("input:radio[name='optradioControlPolicy']:checked").val() != undefined) {
            ControlPolicy = $("input:radio[name='optradioControlPolicy']:checked").val();
        }

        $.ajax({
            type: "POST",
            url: 'wfMmItemMaster.aspx/CheckMaterialAvailability',
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
                        url: 'wfMmItemMaster.aspx/AddDetails',
                        data: JSON.stringify({
                            "chkCanPurchased": chkCanPurchased,
                            "chkCanSold": chkCanSold,
                            "MaterialType": $('#ddlMaterialType').val().trim(),
                            "MainCategoryId": $('#ddlMaterialCategoryName').val().trim(),
                            "MaterialCategoryId": $('#ddlCategoryName').val().trim(),
                            "SubCategoryId": $('#ddlSubCategory').val().trim(),
                            "BranchCode": $('#ddlBranch').val().trim(),
                            "MaterialGroup": $('#ddlMaterialGroup').val().trim(),
                            "DepartmentId": $('#ddlDepartment').val().trim(),
                            "UnitMesure": $('#ddlUnitMesure').val().trim(),
                            "MaterialMasterId": $('#txtId').val().trim(),
                            "RelationUnitMesure": $('#txtRelationPurchaseUnitMesure').val().trim(),
                            "MaterialName": $('#txtMaterialName').val().trim(),
                            "CostingMethod": $('#ddlCostingMethod').val().trim(),
                            "SalesUnitMesure": $('#ddlSalesUnitMesure').val().trim(),
                            "NatureOfItem": $('#ddlNatureOfItem').val().trim(),
                            "RelationSalesUnitMesure": $('#txtRelationSalesUnitMesure').val().trim(),
                            "MaintainInBatch": $('#ddlMaintainInBatch').val().trim(),
                            "MRP": $('#txtMrp').val().trim(),
                            "MinimumStockLevel": $('#txtMinimumStockLevel').val().trim(),
                            "BOM": $('#ddlBom').val(),
                            "GstApplicable": $('#ddlGstApplicable').val().trim(),
                            "BarCode": $('#txtBarcode').val().trim(),
                            "HsnNo": $('#txtHsnNo').val().trim(),
                            "CentralTax": $('#txtCentralTax').val().trim(),
                            "StateTax": $('#txtStateTax').val().trim(),
                            "Cess": $('#txtCess').val().trim(),
                            "IntegratedTax": $('#txtIntegratedTax').val().trim(),
                            "MaximumStockLevel": $('#txtMaximumStockLevel').val().trim(),
                            "Description": $('#txtDescription').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "InvoicingPolicy": InvoicingPolicy,
                            "SaleDescription": $('#txtSaleDescription').val().trim(),
                            "ExpirationTime": $('#txtExpirationTime').val().trim(),
                            "BestBeforeTime": $('#txtBestBeforeTime').val().trim(),
                            "RemovalTime": $('#txtRemovalTime').val().trim(),
                            "AlertTime": $('#txtAlertTime').val().trim(),
                            "purchase_vendor_details": purchase_vendor_details,
                            "ControlPolicy": ControlPolicy,
                            "PurchaseDescription": $('#txtPurchaseDescription').val().trim(),
                            "inventory_packaging_details": inventory_packaging_details,
                            "DeliveryOrderDescription": $('#txtDeliveryOrderDescription').val().trim(),
                            "ReceiptsDescription": $('#txtReceiptsDescription').val().trim(),
                            "InternalTransferDescription": $('#txtInternalTransferDescription').val().trim()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                if ($('#btnSave').html() == 'Update')
                                { alertify.success('Item Master updated successfully'); }
                                else { alertify.success('Item Master added successfully'); }
                                ClearAll();
                            }
                            else {
                                console.log("error log:", r.msg);
                                alertify.error('Something went wrong, please try again later');
                            }
                        },
                        failure: function (response) {
                            var r = JSON.parse(response.d);
                            console.log("error log:", r.msg);
                            alertify.error('failure. Something went wrong, please try again later');

                        },
                        error: function (response) {
                            var r = JSON.parse(response.d);
                            console.log("error log:", r.msg);
                            alertify.error('Error. Something went wrong, please try again later');

                        }
                        //success: function (response) {
                        //    UploadFiles();

                        //},
                        //complete: function () {

                        //},
                        //failure: function (jqXHR, textStatus, errorThrown) {

                        //}
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
        //contentType: false,
        //processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var r = JSON.parse(response.d);
            if (r.status == "success") {
                if ($('#btnSave').html() == 'Update') { alertify.success('Item Master updated successfully'); }
                else { alertify.success('Item Master added successfully'); }                    
                ClearAll();
            }
            else {
                console.log("error log:", r.msg);
                alertify.error('Something went wrong, please try again later');
            }
        },
        failure: function (response) {
            var r = JSON.parse(response.d);
            console.log("error log:", r.msg);
            alertify.error('failure. Something went wrong, please try again later');

        },
        error: function (response) {
            var r = JSON.parse(response.d);
            console.log("error log:", r.msg);
            alertify.error('Error. Something went wrong, please try again later');

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

    if ($('#ddlPackage').val() != '') {
        if ($('#txtPackageQty').val() != '') {
            if ($('#txtPackageUnitMeasure').val() != '') {
                $('#tbody_Packaging').append('<tr>'
                    + '<td>' + $('#ddlPackage').val() + '</td>'
                    + '<td>' + $("#txtPackageQty").val() + '</td>'
                    + '<td>' + $("#txtPackageUnitMeasure").val() + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
                $('#ddlPackage').val('');
                $('#txtPackageQty').val('');
                $("#txtPackageUnitMeasure").val('');
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
