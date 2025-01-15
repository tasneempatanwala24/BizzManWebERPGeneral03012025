$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlProductName').select2();
    BindProductDropdown();
    $('#ddlUnitMesure').select2();
    BindUnitMesureDropdown();
    $('#ddlBOMType').select2();
    $('#ddlWorkCenter').select2();
    BindWorkCenterDropdown();
    $('#ddlOperation').select2(); 
    $('#ddlProductNameDetails').select2();
    $('#ddlUOMDetails').select2();
});

function BindProductDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/MaterialMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var req = ""; 
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlProductName').append(req);
            $('#ddlProductNameDetails').append(req);
            
            //$('#ddlProductName').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function CreateBOMDetails() {

    $('#hdnIsEdit').val('0');
    $('#divEntry').show();
    $('#divList').hide();
    $('#divDetails').show();
    $('#btnSave').show();
    $("#btnSave").html('Save');
    $('#btnExport').hide();


    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
    GenerateOrderID();
    $('#ddlMachineType').select2('focus');
}

function GenerateOrderID() {

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/GenerateOrderID',

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#txtId').val(data[0].ID);
            

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function checkInputGiven(event) {
    var value = event.target.value;
    if (/^\d\.$/.test(value)) { // Checks if input is a single digit followed by a dot
        event.target.value = value.charAt(0); // Sets the value to the single digit
    }
    // Allow focus to change
    $(event.target).trigger('focusout');
}
function handleNumericInput(event) {
    // Get the input element
    var inputElement = event.target;

    // Remove non-numeric characters (except decimal point)
    var numericValue = inputElement.value.replace(/[^\d.]/g, '');

    // Handle multiple decimal points
    numericValue = numericValue.replace(/(\..*)\./g, '$1');

    // Limit to two decimal places
    numericValue = numericValue.replace(/(\.\d{2})\d+$/g, '$1');

    // If the input starts with a decimal point, add a leading zero
    if (numericValue.charAt(0) === '.') {
        numericValue = '0' + numericValue;
    }

    // Set the default value to 0 if the input is empty
    if (numericValue === '') {
        numericValue = '0';
    }

    // Handle leading zeros
    if (numericValue.length > 1 && numericValue.charAt(0) === '0' && numericValue.charAt(1) !== '.') {
        numericValue = numericValue.slice(1); // Remove leading zero
    }

    // Update the input value
    inputElement.value = numericValue;
}

function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/UnitMesureList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].UnitMesureName + "</option>";
            }
            $('#ddlUnitMesure').append(branch);
            $('#ddlUOMDetails').append(branch);  
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindWorkCenterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/WorkCenterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var temp = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                temp = temp + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + "</option>";
            }
            $('#ddlWorkCenter').append(temp);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function ClearAll() {
/*    $(".card-header").text('\Add Work Center Details\n ');*/
    $('#txtDuration').val('');
    $('#txtQuantity').val('0');
    $('#ddlProductName').select2('destroy');
    $('#ddlProductName').val('');
    $('#ddlProductName').select2();
    $('#ddlUnitMesure').select2('destroy');
    $('#ddlUnitMesure').val('');
    $('#ddlUnitMesure').select2();
    $('#ddlBOMType').select2('destroy');
    $('#ddlBOMType').val('');
    $('#ddlBOMType').select2();
    $('#ddlWorkCenter').select2('destroy');
    $('#ddlWorkCenter').val('');
    $('#ddlWorkCenter').select2();
    $('#ddlOperation').select2('destroy');
    $('#ddlOperation').val('');
    $('#ddlOperation').select2();
}

function AddBOMDetails() {
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;

    }
    if ($('#ddlProductName').val() == '' || $('#ddlProductName').val() == '0') {
        alertify.error('Please select Product Name');
        return;
    }
    else if ($('#txtQuantity').val() == '0') {
        alertify.error('Enter Quantity');
        return;
    }
    else if ($('#ddlUnitMesure').val() == '' ||$('#ddlUnitMesure').val() == '0') {
        alertify.error('Please select Unit of Measure');
        return;
    }
    else if ($('#ddlBOMType').val() == '' || $('#ddlBOMType').val() == '0') {
        alertify.error('Please select BOM Type');
        return;
    }
    else if ($('#ddlWorkCenter').val() == '' || $('#ddlWorkCenter').val() == '0') {
        alertify.error('Please select Work Center');
        return;
    }
    else if ($('#ddlOperation').val() == '' || $('#ddlOperation').val() == '0') {
        alertify.error('Please select Operation');
        return;
    }
    else {
        if ($('#txtDuration').val() == '') {
            alertify.error('Enter Duration');
            return;
        }
    }

    var hasRows = $('#tbody_BOMListDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add BOM Details');
        return;
    }
    showLoader();
    var data = [];

    $("#tbody_BOMListDetails tr").each(function (i) {
        if (i > 0) {
            var ProductName = $(this)[0].cells[2].innerText;
            var Qty = $(this)[0].cells[3].innerText;
            var UOM = $(this)[0].cells[5].innerText;
            data.push({ ProductName: ProductName, Quantity: Qty, UOM: UOM });
        }
    });
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/AddBOMDetails',
        data: JSON.stringify({
            data: data,
            "Id": $('#txtId').val(),
            "ProductName": $('#ddlProductName').val(),
            "Quantity": $('#txtQuantity').val().trim(),
            "UOM": $('#ddlUnitMesure').val(),
            "BOMType": $('#ddlBOMType').val().trim(),
            "WorkCenter": $('#ddlWorkCenter').val().trim(),
            "Operation": $('#ddlOperation').val().trim(),
            "Duration": $('#txtDuration').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "IsUpdate": isUpdate
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'BOM Details added successfully' : 'BOM Details updated successfully';
            alertify.success(message);
            ClearAll();
            ShowBOMDetails();
            // Discard();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ShowBOMDetails() {

    $('#hdnIsEdit').val('0');
    $('#divEntry').hide();
    $('#divList').show();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindBOMDetailsList();
}

function BindWorkCenterDetailsList() {

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/FetchBOMDetailList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblWorkCenterDetailsList').DataTable().clear();
            $('#tblWorkCenterDetailsList').DataTable().destroy();
            $('#tbody_WorkCenterDetailsList').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td style="display:none;">' + data[i].Id + '</td>'
                    + '<td onclick="FetchWorkCenterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].MachineType != undefined ? data[i].MachineType : '') + '</td>'
                    + '<td onclick="FetchWorkCenterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Capacity != undefined ? data[i].Capacity : '') + '</td>'
                    + '<td onclick="FetchWorkCenterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].ProductName != undefined ? data[i].ProductName : '') + '</td>'
                    + '<td onclick="FetchWorkCenterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Cost != undefined ? data[i].Cost : 0) + '</td>'
                    + '<td onclick="FetchWorkCenterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].SetupTime != undefined ? data[i].SetupTime : 0) + '</td>'
                    + '<td onclick="FetchWorkCenterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].LocationID != undefined ? data[i].LocationID : '') + '</td></tr>';
            }


            $('#tbody_WorkCenterDetailsList').html(html);
            //$('#tblWorkCenterDetailsList').DataTable();

            var d = new Date();
            var table = $('#tblWorkCenterDetailsList').DataTable({
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

            $('#tbody_WorkCenterDetailsList tbody').on('change', 'input[type="checkbox"]', function () {
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


function SaveBOMListDetails() {
    if (!validateRows()) {
        return;
    }
    if ($('#ddlProductNameDetails').val() != '') {
        if ($('#txtMaterialQty').val() != '') {
            $('#tbody_BOMListDetails').append('<tr><td style="display: none;"></td>'
                + '<td style="width: 250px;">' + ($("#ddlProductNameDetails").val() != "" ? $("#ddlProductNameDetails option:selected").text() : "0") + '</td>'
                + '<td style="display: none;">' + ($("#ddlProductNameDetails").val() != "" ? $("#ddlProductNameDetails").val() : "0") + '</td>'
                + '<td style="width: 100px;">' + $("#txtMaterialQty").val() + '</td>'
                + '<td style="width: 250px;">' + ($("#ddlUOMDetails").val() != "" ? $("#ddlUOMDetails option:selected").text() : "0") + '</td>'
                + '<td style="display: none;">' + ($("#ddlUOMDetails").val() != "" ? $("#ddlUOMDetails").val() : "0") + '</td>'
                + '<td><a onclick="DeleteBOMDetailEntry(this,0);" data-soid="0" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                + '</tr>');
            $('#txtMaterialQty').val('');
            $('#ddlProductNameDetails').val('').trigger('change');
            $('#ddlProductNameDetails').focus();
            $('#ddlUOMDetails').val('').trigger('change');
            $('#ddlUOMDetails').focus();
        }
        else {
            alertify.error('Please enter quantity');
        }
    }
    else {
        alertify.error('Please select any Product Name');
    }


}

function DeleteBOMDetailEntry(ele, materialId) {
     $(ele.parentElement.parentElement).remove();
}

function validateRows() {
    var isValid = true;
    var errorMessage = "";


    var ProductName = $("#ddlProductNameDetails").val();
    var qty = $("#txtMaterialQty").val();
    var UOMDetails = $("#ddlUOMDetails").val();

    if (!ProductName) {
        isValid = false;
        errorMessage += "Product Name is required.\n";
        $("#ddlProductNameDetails").addClass("is-invalid");
    } else {
        $("#ddlProductNameDetails").removeClass("is-invalid");
    }

    if (!qty || isNaN(qty) || parseFloat(qty) <= 0 || !/^\d+(\.\d{1,2})?$/.test(qty)) {
        isValid = false;
        errorMessage += "Quantity must be a number greater than 0 with up to 2 decimal places.\n";
        $("#txtMaterialQty").addClass("is-invalid");
    } else {
        $("#txtMaterialQty").removeClass("is-invalid");
    }
    if (!UOMDetails) {
        isValid = false;
        errorMessage += "UOM is required.\n";
        $("#ddlUOMDetails").addClass("is-invalid");
    } else {
        $("#ddlUOMDetails").removeClass("is-invalid");
    }
   

    if (!isValid) {
        alertify.error(errorMessage);
    }

    return isValid;
}