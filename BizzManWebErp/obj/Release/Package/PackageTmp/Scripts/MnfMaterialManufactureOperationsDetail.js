
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlMaterial').select2();
    BindMaterialMasterDropdown();
    BindUnitMeasureDropdown();
    BindShopFlowerDropdown();






    $("input[id*='txtMaterialRate']").keydown(function (event) {


        if (event.shiftKey == true) {
            event.preventDefault();
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
            event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

        } else {
            event.preventDefault();
        }

        if ($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
            event.preventDefault();
        //if a decimal has been added, disable the "."-button

    });

    $('input[type=radio][name=optradioManufacturingType]').change(function () {
        if ($("#ddlMaterial").is(":visible")) {
            $('#txtFormula').val('');
            $('#ddlFormula').val('');
            if (this.value == 'Process') {
                $('#tr_Formula').show();
                $('#txtFormula').show();
                $('#ddlFormula').hide();
                $('#a_formulaAdd').hide();
                $('#a_formulaEdit').hide();
            }
            else {
                $('#tr_Formula').hide();
            }
        }
    });

    if ($('#ContentPlaceHolder1_hdnMaterialId').val() != '') {
        $('#btnView').hide();
        $('#btnCreate').hide();
        $('.navbar-expand-lg').hide();
        if ($('#ContentPlaceHolder1_hdnBOMId').val() != '') {

            FetchMaterialBOMMasterDetails($('#ContentPlaceHolder1_hdnBOMId').val());
        }
        else {
            $('#divMaterialBOMList').hide();
            $('#divMaterialBOMEntry').show();
            $('#divMaterialBOMDetails').show();
            $('#btnSave').show();
            $('#btnExport').hide();
            $('#tr_Formula').hide();
            $('#ddlFormula').hide();
            $('#a_formulaAdd').hide();
            $('#a_formulaEdit').hide();
            $('#txtMaterialName').hide();
            $('#tr_BOMDetailEntry').show();
            $('#ddlMaterial').show();

            $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());

            $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
            $('#ddlMaterialName').val('');
            $('#txtMaterialQty').val('');
            $('#txtMaterialUnitMeasure').val('');
            $('#ddlMaterial').val('');
            $('#txtQty').val('');
            $('#ddlUnitMeasure').val('');
            $('#ddlFormula').val('');
            $('#ddlShopFlower').val('');
            $('#txtFormula').val('');
            $('#ddlFormula').val('');
            $('#txtMaterialRate').val('');
            $('#txtMaterialTotalAmount').val('');
            $('#hdnPreviousFormula').val('');
            $('#tr_Formula').hide();
            $('#txtFormula').hide();
            $('#ddlFormula').hide();
            $('#a_formulaAdd').hide();
            $('#a_formulaEdit').hide();
            $('input[name=optradioManufacturingType]').removeAttr('checked');
            $('input[name=optradioBomType]').removeAttr('checked');
            $('#ddlMaterialName').html('<option value="">-Select Material Name-</option>');


            setTimeout(function () {
                var materialid = $('#ContentPlaceHolder1_hdnMaterialId').val();
                $('#ddlMaterial').val(materialid).trigger('change');
            }, 2000);
        }
    }
    else {
      //  BindMaterialBOMMasterList();
        BindMaterialOperationMasterList();   //new mk

    }

});


function BindShopFlowerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/ShopFlowerList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlShopFlower').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Shop Floor-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].ShopFlowerName + "</option>";
            }
            $('#ddlShopFlower').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}



function BindUnitMeasureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/UnitMeasureList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlUnitMeasure').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Unit Measure-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].UnitMesureName + "</option>";
            }
            $('#ddlUnitMeasure').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}



function FetchBOMDetailsMaterials() {
    $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
    $('#ddlMaterialName').html('<option value="">-Select Material Name-</option>');
    if ($('#ddlMaterial').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMnfMaterialManufactureOperationsDetail.aspx/DetailMaterialMasterList',
            data: JSON.stringify({
                "MaterialId": $('#ddlMaterial').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#ddlMaterialName').html('');
                var data = JSON.parse(response.d);
                var req = "<option value=''>-Select Material-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
                }
                $('#ddlMaterialName').append(req);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function BindMaterialMasterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/MaterialMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlMaterial').select2('destroy');
            $('#ddlMaterial').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Material-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlMaterial').append(req);
            $('#ddlMaterial').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

//===========by MK ==instade of BindMaterialBOMMasterList======
//  this module first fetch master list and display, after click each record from list, it will display corresponding detail

function BindMaterialOperationMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialBOMList').DataTable().clear();
            $('#tblMaterialBOMList').DataTable().destroy();
            $('#tbody_MaterialBOM_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td style="display:none;">' + data[i].Id + '</td>'
                    + '<td onclick="FetchMaterialOperationDetails(\'' + data[i].Id + '\');">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td onclick="FetchMaterialOperationDetails(\'' + data[i].Id + '\');">' + (data[i].Qty != undefined ? data[i].Qty : '') + '</td>'
                    + '<td onclick="FetchMaterialOperationDetails(\'' + data[i].Id + '\');">' + (data[i].UnitMeasure != undefined ? data[i].UnitMeasure : '') + '</td>'
                    + '<td onclick="FetchMaterialOperationDetails(\'' + data[i].Id + '\');">' + data[i].TotalOperationCost + '</td>'
                    + '<td onclick="FetchMaterialOperationDetails(\'' + data[i].Id + '\');">' + (data[i].TotalOperationCost != undefined ? data[i].TotalOperationCost : '') + '</td></tr>';
            }

            
            $('#tbody_MaterialBOM_List').html(html);
            var d = new Date();
            var table = $('#tblMaterialBOMList').DataTable({
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                fixedHeader: {
                    header: true
                }
            });

            $('#example-select-all').on('click', function () {
                // Check/uncheck all checkboxes in the table
                var rows = table.rows({ 'search': 'applied' }).nodes();
                $('input[type="checkbox"]', rows).prop('checked', this.checked);


            });

            $('#tbody_MaterialBOM_List tbody').on('change', 'input[type="checkbox"]', function () {
                // If checkbox is not checked

                if (!this.checked) {
                    var el = $('#example-select-all').get(0);
                    // If "Select all" control is checked and has 'indeterminate' property
                    if (el && el.checked && ('indeterminate' in el)) {
                        // Set visual state of "Select all" control 
                        // as 'indeterminate'
                        el.indeterminate = true;
                    }
                }
            });
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


//================

/*
function BindMaterialBOMMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchMaterialBOMMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialBOMList').DataTable().clear();
            $('#tblMaterialBOMList').DataTable().destroy();
            $('#tbody_MaterialBOM_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td style="display:none;">' + data[i].Id + '</td>'
                    + '<td onclick="FetchMaterialBOMMasterDetails(\'' + data[i].Id + '\');">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td onclick="FetchMaterialBOMMasterDetails(\'' + data[i].Id + '\');">' + (data[i].Qty != undefined ? data[i].Qty : '') + '</td>'
                    + '<td onclick="FetchMaterialBOMMasterDetails(\'' + data[i].Id + '\');">' + (data[i].UnitMesureName != undefined ? data[i].UnitMesureName : '') + '</td>'
                    + '<td onclick="FetchMaterialBOMMasterDetails(\'' + data[i].Id + '\');">' + data[i].ManufacturingType + '</td>'
                    + '<td onclick="FetchMaterialBOMMasterDetails(\'' + data[i].Id + '\');">' + (data[i].BomType != undefined ? data[i].BomType : '') + '</td>'
                    + '<td onclick="FetchMaterialBOMMasterDetails(\'' + data[i].Id + '\');">' + (data[i].ShopFlowerName != undefined ? data[i].ShopFlowerName : '') + '</td></tr>';
            }
            $('#tbody_MaterialBOM_List').html(html);
            var d = new Date();
            var table = $('#tblMaterialBOMList').DataTable({
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                fixedHeader: {
                    header: true
                }
            });

            $('#example-select-all').on('click', function () {
                // Check/uncheck all checkboxes in the table
                var rows = table.rows({ 'search': 'applied' }).nodes();
                $('input[type="checkbox"]', rows).prop('checked', this.checked);


            });

            $('#tbody_MaterialBOM_List tbody').on('change', 'input[type="checkbox"]', function () {
                // If checkbox is not checked

                if (!this.checked) {
                    var el = $('#example-select-all').get(0);
                    // If "Select all" control is checked and has 'indeterminate' property
                    if (el && el.checked && ('indeterminate' in el)) {
                        // Set visual state of "Select all" control 
                        // as 'indeterminate'
                        el.indeterminate = true;
                    }
                }
            });

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

*/


//=======instade of ===FetchMaterialBOMMasterDetails=====by MK==============
// after click master list, it will display corresponding records
function FetchMaterialOperationDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchMaterialOperationDetails',
        data: JSON.stringify({
            "BOMId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            ClearAll();
            $('#divMaterialBOMList').hide();
            $('#divMaterialBOMEntry').show();
            $('#divMaterialBOMDetails').show();
            $('#btnSave').hide();
            $('#btnExport').hide();
            $('#tr_BOMDetailEntry').hide();

            $('#txtMaterialName').val(data[0].MaterialName);
            $('#ddlUnitMeasure').val(data[0].UnitMeasure);
            //   $('#ddlShopFlower').val(data[0].ShopFlower);
            $('#txtQty').val(data[0].QTY);
            //   $('input:radio[name="optradioManufacturingType"][value="' + data[0].ManufacturingType + '"]').prop('checked', true);
            //   $('input:radio[name="optradioBomType"][value="' + data[0].BomType + '"]').prop('checked', true);
            $('#ddlMaterial').select2('destroy');
            $('#ddlMaterial').hide();
            $('#txtMaterialName').show();

         //   FetchOperationDetailsList(1, id);
            /*
            if (data[0].ManufacturingType == 'Process') {
                $('#tr_Formula').show();
                $('#txtFormula').hide();
                $('#ddlFormula').show();
                $('#a_formulaAdd').show();
                $('#a_formulaEdit').show();
                BindFormulaDropdown(id);
                FetchBOMDetailsMaterialsModal(id);
            }
            else {
                // FetchBOMDetailsList(1, id);
                FetchOperationDetailsList(1, id);
            }
            */
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//========instade of FetchBOMDetailsList ==by MK============
//  in detail display, it will display corresponding list of operations below
function FetchOperationDetailsList(type, bomid) {
    $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
    var BOM_id = bomid;
    //  if (type == 2) {
    //      BOM_id = $('#ddlFormula').val();
    //  }
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchOperationDetailsList',
        data: JSON.stringify({
            "BOMId": BOM_id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_MaterialBOMDetails').append('<tr><td style="display: none;">' + data[i].ManufactureOperationsMasterId + '</td>'
                    + '<td>' + data[i].OperationsName + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td></td>'
                    + '</tr>');
            }

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//=========================
/*
function FetchBOMDetailsList(type, bomid) {
    $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
    var BOM_id = bomid;
    if (type == 2) {
        BOM_id = $('#ddlFormula').val();
    }
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchBOMDetailsList',
        data: JSON.stringify({
            "BOMId": BOM_id,
            "Formula": $("#ddlFormula option:selected").text(),
            "type": type.toString()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_MaterialBOMDetails').append('<tr><td style="display: none;">' + data[i].MaterialMasterId + '</td>'
                    + '<td>' + data[i].MaterialName + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td>' + data[i].Rate + '</td>'
                    + '<td>' + data[i].Amount + '</td>'
                    + '<td>' + data[i].FormulaName + '</td>'
                    + '<td></td>'
                    + '</tr>');
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/





//===========================
/*
function FetchMaterialBOMMasterDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchMaterialBOMMasterDetails',
        data: JSON.stringify({
            "BOMId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            ClearAll();
            $('#divMaterialBOMList').hide();
            $('#divMaterialBOMEntry').show();
            $('#divMaterialBOMDetails').show();
            $('#btnSave').hide();
            $('#btnExport').hide();
            $('#tr_BOMDetailEntry').hide();

            $('#txtMaterialName').val(data[0].MaterialName);
            $('#ddlUnitMeasure').val(data[0].UnitMeasure);
            $('#ddlShopFlower').val(data[0].ShopFlower);
            $('#txtQty').val(data[0].Qty);
            $('input:radio[name="optradioManufacturingType"][value="' + data[0].ManufacturingType + '"]').prop('checked', true);
            $('input:radio[name="optradioBomType"][value="' + data[0].BomType + '"]').prop('checked', true);
            $('#ddlMaterial').select2('destroy');
            $('#ddlMaterial').hide();
            $('#txtMaterialName').show();

            if (data[0].ManufacturingType == 'Process') {
                $('#tr_Formula').show();
                $('#txtFormula').hide();
                $('#ddlFormula').show();
                $('#a_formulaAdd').show();
                $('#a_formulaEdit').show();
                BindFormulaDropdown(id);
                FetchBOMDetailsMaterialsModal(id);
            }
            else {
                FetchBOMDetailsList(1, id);
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/







function CreateMaterialBOM() {
    $('#divMaterialBOMList').hide();
    $('#divMaterialBOMEntry').show();
    $('#divMaterialBOMDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();
    $('#tr_Formula').hide();
    $('#ddlFormula').hide();
    $('#a_formulaAdd').hide();
    $('#a_formulaEdit').hide();
    $('#txtMaterialName').hide();
    $('#tr_BOMDetailEntry').show();
    $('#ddlMaterial').show();
    $('#ddlMaterial').select2();
    BindMaterialMasterDropdown();
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
}

function ViewMaterialBOMList() {
    $('#divMaterialBOMList').show();
    $('#divMaterialBOMEntry').hide();
    $('#divMaterialBOMDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    $('#ddlMaterial').select2();
    BindMaterialBOMMasterList();
}



function ClearAll() {
    $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
    $('#tbody_MaterialBOMDetailsModal').children('tr:not(:first)').remove();
    $('#ddlMaterialName').val('');
    $('#txtMaterialQty').val('');
    $('#txtMaterialUnitMeasure').val('');
    $('#ddlMaterial').val('');
    $('#txtQty').val('');
    $('#ddlUnitMeasure').val('');
    $('#ddlFormula').val('');
    $('#ddlShopFlower').val('');
    $('#txtFormula').val('');
    $('#ddlFormula').val('');
    $('#txtMaterialRate').val('');
    $('#txtMaterialTotalAmount').val('');
    $('#hdnPreviousFormula').val('');
    $('#tr_Formula').hide();
    $('#txtFormula').hide();
    $('#ddlFormula').hide();
    $('#a_formulaAdd').hide();
    $('#a_formulaEdit').hide();
    $('input[name=optradioManufacturingType]').removeAttr('checked');
    $('input[name=optradioBomType]').removeAttr('checked');
    $('#ddlMaterialName').html('<option value="">-Select Material Name-</option>');
    $('#ContentPlaceHolder1_hdnMaterialId').val('');
    $('#ContentPlaceHolder1_hdnBOMId').val('');

    $('#ddlMaterialNameModal').val('');
    $('#txtMaterialQtyModal').val('');
    $('#txtMaterialUnitMeasureModal').val('');
    $('#txtMaterialRateModal').val('');
    $('#txtMaterialTotalAmountModal').val('');
}




function DownloadFile() {
    var chk = 0;
    var BOMid = '';
    $('#tbody_MaterialBOM_List tr').each(function (index1, tr) {
        chk = 0;
        $(tr).find('td').each(function (index, td) {
            if (index == 0) {
                if ($(td.children[0]).is(':checked')) {
                    chk = 1;
                }
                else {
                    chk = 0;
                }
            }

            if (index == 1) {
                if (chk == 1) {
                    if (BOMid == '') {
                        BOMid = td.outerText;
                    }
                    else {
                        BOMid = BOMid + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (BOMid != '') {
        $.ajax({
            type: "POST",
            url: "wfMnfMaterialManufactureOperationsDetail.aspx/FetchMaterialBOMMasterListDownload",
            data: JSON.stringify({
                "BOMid": BOMid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaBOM_' + d.toDateString() + '.xlsx';
                //Convert Base64 string to Byte Array.
                var bytes = Base64ToBytes(r.d);

                //Convert Byte Array to BLOB.
                var blob = new Blob([bytes], { type: "application/octetstream" });

                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = $("<a />");
                    a.attr("download", fileName);
                    a.attr("href", link);
                    $("body").append(a);
                    a[0].click();
                    $("body").remove(a);
                }
            }
        });
    }
    else {
        alertify.error('Please select any record');
    }
}

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
}


function FetchUnitMeasure() {
    $('#txtMaterialUnitMeasure').val()
    if ($('#ddlMaterialName').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $('#ddlMaterialName').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtMaterialUnitMeasure').val(data[0].UnitMesure);
                $('#txtMaterialRate').val(data[0].MRP);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}


function BindFormulaDropdown(BOMId) {
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FormulaList',
        data: JSON.stringify({
            "BOMId": BOMId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlFormula').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Formula-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].BomMasterId + "'>" + JSON.parse(response.d)[i].FormulaName + "</option>";
            }
            $('#ddlFormula').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function ShowHideMaterialRows() {
    if ($('#txtFormula').val().trim() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMnfMaterialManufactureOperationsDetail.aspx/CheckFormulaAlreadyExist',
            data: JSON.stringify({
                "Formula": $('#txtFormula').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                if (data[0].cnt == '0') {
                    if ($('#hdnPreviousFormula').val().trim() != $('#txtFormula').val().trim()) {
                        $('#tbody_MaterialBOMDetails').children('tr:not(:first)').hide();
                    }
                }
                else {
                    alertify.error('Current formula already exist, please enter another one');
                    $('#txtFormula').val('');
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });


    }
}

function SaveMaterialBOMDetails() {
    var chkDiscreate = 1;
    if ($("input:radio[name='optradioManufacturingType']:checked").val() == "Process") {
        if ($('#txtFormula').val().trim() == '') {
            chkDiscreate = 0;
        }

    }
    else {
        $('#txtFormula').val('');
    }

    $('#hdnPreviousFormula').val($('#txtFormula').val().trim());
    if (chkDiscreate == 1) {
        if ($('#ddlMaterialName').val() != '') {
            if ($('#txtMaterialQty').val() != '') {
                if ($('#txtMaterialRate').val() != '') {
                    $('#tbody_MaterialBOMDetails').append('<tr><td style="display: none;">' + $('#ddlMaterialName').val() + '</td>'
                        + '<td>' + $("#ddlMaterialName option:selected").text() + '</td>'
                        + '<td>' + $("#txtMaterialQty").val() + '</td>'
                        + '<td>' + $("#txtMaterialUnitMeasure").val() + '</td>'
                        + '<td>' + $("#txtMaterialRate").val() + '</td>'
                        + '<td>' + $("#txtMaterialTotalAmount").val() + '</td>'
                        + '<td>' + $("#txtFormula").val() + '</td>'
                        + '<td><a onclick="DeleteMaterialBOMDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                        + '</tr>');
                    $('#ddlMaterialName').val('');
                    $('#txtMaterialQty').val('');
                    $('#txtMaterialUnitMeasure').val('');
                    $('#txtMaterialRate').val('');
                    $('#txtMaterialTotalAmount').val('');
                }
                else {
                    alertify.error('Please enter material rate');
                }
            }
            else {
                alertify.error('Please enter material quantity');
            }
        }
        else {
            alertify.error('Please select any material name');
        }
    }
    else {
        alertify.error("Please enter formula");
    }

}


function DeleteMaterialBOMDetailEntry(ele) {
    $(ele.parentElement.parentElement).remove();
}


function AddMaterialBOM() {
    if ($('#ddlMaterial').val() != '') {
        if ($('#txtQty').val() != '') {
            if ($('#ddlUnitMeasure').val() != '') {
                if ($("input:radio[name='optradioManufacturingType']:checked").val() != undefined) {
                    if ($("input:radio[name='optradioBomType']:checked").val() != undefined) {
                        if ($('#ddlShopFlower').val() != '') {
                            var indent_details = '';
                            $('#tbody_MaterialBOMDetails tr').each(function (index1, tr) {
                                if (index1 > 0) {
                                    $(tr).find('td').each(function (index, td) {
                                        if (index1 == 1) {
                                            if (indent_details == '') {
                                                if (index == 0) {
                                                    indent_details = td.outerText;
                                                }

                                            }
                                            else {
                                                if (index == 2) {
                                                    indent_details = indent_details + '|' + td.outerText;
                                                }
                                                else if (index == 4) {
                                                    indent_details = indent_details + '$' + td.outerText;
                                                }
                                                else if (index == 6) {
                                                    indent_details = indent_details + '!' + td.outerText;
                                                }
                                            }
                                        }
                                        else {
                                            if (index == 0) {
                                                indent_details = indent_details + '@' + td.outerText;
                                            }
                                            else if (index == 2) {
                                                indent_details = indent_details + '|' + td.outerText;
                                            }
                                            else if (index == 4) {
                                                indent_details = indent_details + '$' + td.outerText;
                                            }
                                            else if (index == 6) {
                                                indent_details = indent_details + '!' + td.outerText;
                                            }
                                        }
                                    });
                                }
                            });

                            if (indent_details != '') {

                                $.ajax({
                                    type: "POST",
                                    url: 'wfMnfMaterialManufactureOperationsDetail.aspx/AddMaterialBOMMaster',
                                    data: JSON.stringify({
                                        "MaterialId": $('#ddlMaterial').val(),
                                        "Qty": $('#txtQty').val(),
                                        "UnitMeasure": $('#ddlUnitMeasure').val(),
                                        "BOM_details": indent_details,
                                        "ManufacturingType": $("input:radio[name='optradioManufacturingType']:checked").val(),
                                        "BomType": $("input:radio[name='optradioBomType']:checked").val(),
                                        "ShopFlower": $('#ddlShopFlower').val(),
                                        "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                    }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    beforeSend: function () {

                                    },
                                    success: function (response) {
                                        alertify.success('Material BOM master details added successfully');
                                        ClearAll();

                                    },
                                    complete: function () {

                                    },
                                    failure: function (jqXHR, textStatus, errorThrown) {

                                    }
                                });

                            }
                            else {
                                alertify.error('Please add BOM material details');
                            }
                        }
                        else {
                            alertify.error('Please select any shop Floor');
                        }
                    }
                    else {
                        alertify.error('Please select any BOM type');
                    }
                }
                else {
                    alertify.error('Please select any manufacturing type');
                }
            }
            else {
                alertify.error('Please select any unit measure');
            }
        }
        else {
            alertify.error('Please enter material quantity');
        }
    }
    else {
        alertify.error('Please select any material');
    }
}


function UpdateTotalAmount() {
    if ($('#txtMaterialQty').val() != '' && $('#txtMaterialRate').val() != '') {
        if ($('#ddlMaterialName').val() != '') {
            var totalAmnt = parseFloat($('#txtMaterialRate').val()) * parseInt($('#txtMaterialQty').val());
            $('#txtMaterialTotalAmount').val(totalAmnt.toFixed(2));
        }
        else {
            $('#txtMaterialQty').val('');
            $('#txtMaterialRate').val('');
            alertify.error('Please select any material first');
        }
    }
    else {
        $('#txtMaterialTotalAmount').val('');
    }
}

function CloseFormulaModal() {
    $('#FormulaEditModal').modal('hide');
}

function UpdateFormula(isEdit) {
    $('#ddlMaterialNameModal').val('');
    $('#txtMaterialQtyModal').val('');
    $('#txtMaterialUnitMeasureModal').val('');
    $('#txtMaterialRateModal').val('');
    $('#txtMaterialTotalAmountModal').val('');
    $('#hdnIsEdit').val(isEdit);
    $('#tbody_MaterialBOMDetailsModal').children('tr:not(:first)').remove();
    $('#txtFormulaName').val('');
    if (isEdit == 0) {

        $('#btnFormulaDelete').hide();
        $('#FormulaEditModal').modal('show');
        $('.modal-backdrop').remove();
    }
    else {
        if ($('#ddlFormula').val() != '') {

            $('#txtFormulaName').val($("#ddlFormula option:selected").text());

            if (isEdit == 1) {
                $('#btnFormulaDelete').show();
                $.ajax({
                    type: "POST",
                    url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchBOMDetailsList',
                    data: JSON.stringify({
                        "BOMId": $('#ddlFormula').val(),
                        "Formula": $("#ddlFormula option:selected").text(),
                        "type": "2"
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        var data = JSON.parse(response.d);

                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            $('#tbody_MaterialBOMDetailsModal').append('<tr><td style="display: none;">' + data[i].MaterialMasterId + '</td>'
                                + '<td>' + data[i].MaterialName + '</td>'
                                + '<td>' + data[i].Qty + '</td>'
                                + '<td>' + data[i].UnitMesure + '</td>'
                                + '<td>' + data[i].Rate + '</td>'
                                + '<td>' + data[i].Amount + '</td>'
                                + '<td><a onclick="DeleteMaterialBOMDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                                + '</tr>');
                        }




                    },
                    complete: function () {

                    },
                    failure: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
            $('#FormulaEditModal').modal('show');
            $('.modal-backdrop').remove();
        }
        else {
            alertify.error('Please select any formula');
        }
    }
}

function UpdateBOMFormula() {
    if ($('#txtFormulaName').val() != '') {
        var indent_details = '';
        $('#tbody_MaterialBOMDetailsModal tr').each(function (index1, tr) {
            if (index1 > 0) {
                $(tr).find('td').each(function (index, td) {
                    if (index1 == 1) {
                        if (indent_details == '') {
                            if (index == 0) {
                                indent_details = td.outerText;
                            }

                        }
                        else {
                            if (index == 2) {
                                indent_details = indent_details + '|' + td.outerText;
                            }
                            else if (index == 4) {
                                indent_details = indent_details + '$' + td.outerText + '!' + $('#txtFormulaName').val();
                            }

                        }
                    }
                    else {
                        if (index == 0) {
                            indent_details = indent_details + '@' + td.outerText;
                        }
                        else if (index == 2) {
                            indent_details = indent_details + '|' + td.outerText;
                        }
                        else if (index == 4) {
                            indent_details = indent_details + '$' + td.outerText + '!' + $('#txtFormulaName').val();
                        }

                    }
                });
            }
        });

        if (indent_details != '') {
            var previousFormula = '';
            if ($('#hdnIsEdit').val() == "1") {
                previousFormula = $("#ddlFormula option:selected").text();
            }

            $.ajax({
                type: "POST",
                url: 'wfMnfMaterialManufactureOperationsDetail.aspx/UpdateMaterialBOMFormulaDetails',
                data: JSON.stringify({
                    "BOMId": $('#ddlFormula').val(),
                    "Formula": $('#txtFormulaName').val(),
                    "PreviousFormula": previousFormula,
                    "BOM_details": indent_details,
                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    var str = "success";
                    if (response.d.indexOf(str) != -1) {
                        alertify.success(response.d);
                        $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
                        BindFormulaDropdown($('#ddlFormula').val());
                        $('#FormulaEditModal').modal('hide');
                    }
                    else {
                        alertify.error(response.d);
                    }

                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });

        }
        else {
            alertify.error('Please add BOM material details');
        }
    }
    else {
        alertify.error('Please enter any formula');
    }
}



function FetchBOMDetailsMaterialsModal(BOMId) {
    $('#ddlMaterialNameModal').html('<option value="">-Select Material Name-</option>');
    $.ajax({
        type: "POST",
        url: 'wfMnfMaterialManufactureOperationsDetail.aspx/DetailMaterialMasterListModal',
        data: JSON.stringify({
            "BOMId": BOMId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Material-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlMaterialNameModal').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function UpdateTotalAmountModal() {
    if ($('#txtMaterialQtyModal').val() != '' && $('#txtMaterialRateModal').val() != '') {
        if ($('#ddlMaterialNameModal').val() != '') {
            var totalAmnt = parseFloat($('#txtMaterialRateModal').val()) * parseInt($('#txtMaterialQtyModal').val());
            $('#txtMaterialTotalAmountModal').val(totalAmnt.toFixed(2));
        }
        else {
            $('#txtMaterialQtyModal').val('');
            $('#txtMaterialRateModal').val('');
            alertify.error('Please select any material first');
        }
    }
    else {
        $('#txtMaterialTotalAmountModal').val('');
    }
}



function SaveMaterialBOMDetailsModal() {
    var chkDiscreate = 1;
    if ($("input:radio[name='optradioManufacturingType']:checked").val() == "Process") {
        if ($('#txtFormulaName').val().trim() == '') {
            chkDiscreate = 0;
        }

    }
    else {
        $('#txtFormulaName').val('');
    }

    if (chkDiscreate == 1) {
        if ($('#ddlMaterialNameModal').val() != '') {
            if ($('#txtMaterialQtyModal').val() != '') {
                if ($('#txtMaterialRateModal').val() != '') {
                    $('#tbody_MaterialBOMDetailsModal').append('<tr><td style="display: none;">' + $('#ddlMaterialNameModal').val() + '</td>'
                        + '<td>' + $("#ddlMaterialNameModal option:selected").text() + '</td>'
                        + '<td>' + $("#txtMaterialQtyModal").val() + '</td>'
                        + '<td>' + $("#txtMaterialUnitMeasureModal").val() + '</td>'
                        + '<td>' + $("#txtMaterialRateModal").val() + '</td>'
                        + '<td>' + $("#txtMaterialTotalAmountModal").val() + '</td>'
                        + '<td><a onclick="DeleteMaterialBOMDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                        + '</tr>');
                    $('#ddlMaterialNameModal').val('');
                    $('#txtMaterialQtyModal').val('');
                    $('#txtMaterialUnitMeasureModal').val('');
                    $('#txtMaterialRateModal').val('');
                    $('#txtMaterialTotalAmountModal').val('');
                }
                else {
                    alertify.error('Please enter material rate');
                }
            }
            else {
                alertify.error('Please enter material quantity');
            }
        }
        else {
            alertify.error('Please select any material name');
        }
    }
    else {
        alertify.error("Please enter formula");
    }

}


function DeleteBOMFormula() {
    alertify.confirm('Confirm Formula Delete', 'Are you sure, you want to delete this formula?', function () {
        $.ajax({
            type: "POST",
            url: 'wfMnfMaterialManufactureOperationsDetail.aspx/BOMFormulaDelete',
            data: JSON.stringify({
                "BOMId": $('#ddlFormula').val(),
                "Formula": $("#ddlFormula option:selected").text()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                alertify.success('Formula deleted successfully');
                $('#tbody_MaterialBOMDetails').children('tr:not(:first)').remove();
                BindFormulaDropdown($('#ddlFormula').val());
                $('#FormulaEditModal').modal('hide');
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
        , function () {
        });
}


function FetchUnitMeasureModal() {
    $('#txtMaterialUnitMeasureModal').val()
    if ($('#ddlMaterialNameModal').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMnfMaterialManufactureOperationsDetail.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $('#ddlMaterialNameModal').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtMaterialUnitMeasureModal').val(data[0].UnitMesure);
                $('#txtMaterialRateModal').val(data[0].MRP);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
