$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    setCurrentDateTime();
    GenerateDemandIssueNo();
    BindReferenceDropdown();
    BindCounterDropdown();
    BindItemDropdown();
    BindUnitMesureDropdown();
    ShowDemandSlipDetails();
    $('#ddlReference').select2();
    $('#ddlCounterNo').select2();
    $('#ddlItemDetails').select2();
    //ddlItemDetails

    $('#btnAdd').click(function () {
        AddDemandSlip();
    });
});

function setCurrentDateTime() {
    let now = new Date();
    let formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    let formattedDate = now.toISOString().slice(0, 10);

    $('#txtDateTime').val(formattedDateTime);
    $('#txtReceiptDate').val(formattedDate);
}

function GenerateDemandIssueNo() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/GenerateDemandIssueNo',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#txtDemandIssueNo').val(response.d);
        }
    });
}

function BindReferenceDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/LoadReferences',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            let data = JSON.parse(response.d);
            var req = "<option value=''>-Select Reference-</option>";
            for (let i = 0; i < data.length; i++) {
                req += `<option value='${data[i].ID}'>${data[i].ID}</option>`;
            }
            $('#ddlReference').append(req);
        }
    });
}

function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/UnitMesureList',
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
             $('#ddlUOMDetails').append(branch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindCounterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/LoadCounters',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCounterNo').html('');
            var ddlBranch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ddlBranch = ddlBranch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }

            $("#ddlCounterNo").append(ddlBranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function BindItemDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/LoadItems',
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
             $('#ddlItemDetails').append(req);

            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function AddDemandSlip() {
    var isUpdate = 0;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#ddlReference').val() == '' || $('#ddlReference').val() == '0') {
        alertify.error('Please select a Reference ID');
        return;
    } else if ($('#ddlCounterNo').val() == '' || $('#ddlCounterNo').val() == '0') {
        alertify.error('Please select a Counter Number');
        return;
    } else if ($('#txtReceiptDate').val() == '') {
        alertify.error('Please select a Receipt Date');
        return;
    }

    var hasRows = $('#tbody_DemandListDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add Demand Slip Details');
        return;
    }
    showLoader();
    var data = [];

    $("#tbody_DemandListDetails tr").each(function (i) {
        if (i > 0) {
            var MaterialID = $(this)[0].cells[2].innerText;
            var MaterialName = $(this)[0].cells[1].innerText;
            var Quantity = $(this)[0].cells[3].innerText;
            var Stock = $(this)[0].cells[5].innerText;
            data.push({ MaterialID: MaterialID, MaterialName: MaterialName, Quantity: Quantity, Stock: Stock });
        }
    });
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/AddDemandSlip',
        data: JSON.stringify({
            data: data,
            "DemandIssueNo": $('#txtDemandIssueNo').val(),
            "DateTime": $('#txtDateTime').val().trim(),
            "ReferenceID": $('#ddlReference').val(),
            "CounterNo": $('#ddlCounterNo').val(),
            "ReceiptDate": $('#txtReceiptDate').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "IsUpdate": isUpdate
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var message = ("#btnSave").html() == 'Save' ? 'Demand Slip added successfully' : 'Demand Slip updated successfully';
            alertify.success(message);
            ClearAll();
            hideLoader();
            ShowDemandSlipDetails();
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function ShowDemandSlipDetails() {
    $('#divEntry').hide();
    $('#divDetails').hide();
    $('#divList').show();
    $('#btnSave').hide();
    BindDemandSlipList();
}

function ClearAll() {
    /*    $(".card-header").text('\Add Work Center Details\n ');*/
    $('#tbody_DemandListDetails').children('tr:not(:first)').remove();

    $('#ddlReference').select2('destroy');
    $('#ddlReference').val('');
    $('#ddlReference').select2();
    $('#ddlCounterNo').select2('destroy');
    $('#ddlCounterNo').val('');
    $('#ddlCounterNo').select2();

    $('#ddlItemDetails').select2('destroy');
    $('#ddlItemDetails').val('');
    $('#ddlItemDetails').select2();
    $('#ddlUOMDetails').val('');

    $('#txtMaterialStock').val('');
    setCurrentDateTime();
   
}
function FetchMaterialDetails() {
    if ($('#ddlCounterNo').val() == '') {
        alertify.error('Please Select Counter No.');
        $('#ddlItemDetails').val('');
        $('#ddlCounterNo').focus();
        return;
    }

    if ($('#ddlItemDetails').val() != '' && $('#ddlCounterNo').val() != '') {
        var found = false;
        $('#tbody_DemandListDetails tr').each(function (i) {
            if (i > 0) {
                var materialid = parseFloat($(this)[0].cells[0].innerText)
                if (materialid == $('#ddlItemDetails').val()) {
                    found = true;

                }
            }

        });
        if (found) {
            alertify.error('Material already added');
            $('#ddlItemDetails').val('');
            return;
        }
        showLoader();
        $.ajax({
            type: "POST",
            url: 'wfMnfManufactureDemandslip.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $('#ddlItemDetails').val(),
                "BranchCode": $('#ddlCounterNo').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);



                setTimeout(function () {

                      $('#txtMaterialStock').val(data[0].Stock);
                     hideLoader();
                    $("#txtItemQty").focus();
                }, 1000); // Hide loader after 3 seconds
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function BindDemandSlipList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/FetchDemandSlipList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            setTimeout(function () {
                var data = JSON.parse(response.d);
                $('#tblDemandSlipList').DataTable().clear();
                $('#tblDemandSlipList').DataTable().destroy();
                $('#tbody_DemandSlipList').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td><input type="checkbox" class="editor-active chk_DemandSlip_list"></td>'
                        + '<td>' + data[i].DemandIssueNo + '</td>'
                        + '<td onclick="FetchDemandSlipDetails(\'' + data[i].DemandIssueNo.trim() + '\');">' + (data[i].DateTime != undefined ? data[i].DateTime : '') + '</td>'
                        + '<td onclick="FetchDemandSlipDetails(\'' + data[i].DemandIssueNo.trim() + '\');">' + (data[i].ReferenceID != undefined ? data[i].ReferenceID : '') + '</td>'
                        + '<td onclick="FetchDemandSlipDetails(\'' + data[i].DemandIssueNo.trim() + '\');">' + (data[i].CounterNo != undefined ? data[i].CounterNo : '') + '</td>'
                        + '<td onclick="FetchDemandSlipDetails(\'' + data[i].DemandIssueNo.trim() + '\');">' + (data[i].ReceiptDate != undefined ? data[i].ReceiptDate : '') + '</td>'
                        + '</tr>';
                }

                $('#tbody_DemandSlipList').html(html);

                var table = $('#tblDemandSlipList').DataTable({
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
                    var rows = table.rows({ 'search': 'applied' }).nodes();
                    $('input[type="checkbox"]', rows).prop('checked', this.checked);
                });

                $('#tblDemandSlipList tbody').on('change', 'input[type="checkbox"]', function () {
                    if (!this.checked) {
                        var el = $('#example-select-all').get(0);
                        if (el && el.checked && ('indeterminate' in el)) {
                            el.indeterminate = true;
                        }
                    }
                });
                hideLoader();
            }, 200);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}


function FetchDemandSlipDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/FetchDemandSlipDetails',
        data: JSON.stringify({ "Id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#divList').hide();
            $('#divEntry').show();
            $('#divDetails').show();
            $('#btnSave').show();
            $('#txtDemandIssueNo').val(data[0].DemandIssueNo);
            $('#txtDateTime').val(data[0].DateTime); // Ensure correct format
            $('#ddlReference').val(data[0].ReferenceID);
            $('#ddlCounterNo').val(data[0].CounterNo);
            $('#txtReceiptDate').val(data[0].ReceiptDate); // Ensure correct format
            BindDemandSlipItems(id);
        }
    });
}


function BindDemandSlipItems(id) {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureDemandslip.aspx/FetchDemandSlipItems',
        data: JSON.stringify({ "Id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tbody_DemandSlipItems').html('');
            for (var i = 0; i < data.length; i++) {
                $('#tbody_DemandSlipItems').append('<tr>'
                    + '<td>' + data[i].ItemName + '</td>'
                    + '<td>' + data[i].UOM + '</td>'
                    + '<td>' + data[i].Quantity + '</td>'
                    + '<td>' + data[i].AvailableStock + '</td>'
                    + '</tr>');
            }
        }
    });
}



function CreateDemandSlip() {
    $('#hdnIsEdit').val('0');
    $('#divEntry').show();
    $('#divList').hide();
    $('#divDetails').show();
    $('#btnSave').show();
    $("#btnSave").html('Save');
    $('#btnExport').hide();

    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
    GenerateDemandIssueNo();
    $('#ddlReference').focus();
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

function SaveDemandListDetails() {
    if (!validateRows()) {
        return;
    }
    if ($('#ddlItemDetails').val() != '') {
        if ($('#txtItemQty').val() != '') {
            $('#tbody_DemandListDetails').append('<tr><td style="display: none;"></td>'
                + '<td style="width: 250px;">' + ($("#ddlItemDetails").val() != "" ? $("#ddlItemDetails option:selected").text() : "0") + '</td>'
                + '<td style="display: none;">' + ($("#ddlItemDetails").val() != "" ? $("#ddlItemDetails").val() : "0") + '</td>'
                + '<td style="width: 100px;">' + $("#txtItemQty").val() + '</td>'
                + '<td style="width: 250px;">' + ($("#ddlUOMDetails").val() != "" ? $("#ddlUOMDetails option:selected").text() : "0") + '</td>'
                + '<td style="display: none;">' + ($("#ddlUOMDetails").val() != "" ? $("#ddlUOMDetails").val() : "0") + '</td>'
                + '<td style="width: 250px;">' + ($("#txtMaterialStock").val() != "" ? $("#txtMaterialStock").val() : "0") + '</td>'
                + '<td><a onclick="DeleteDemandSlipDetailEntry(this,0);" data-soid="0" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                + '</tr>');
            $('#txtItemQty').val('');
            $('#ddlItemDetails').val('').trigger('change');
            $('#ddlItemDetails').focus();
            $('#ddlUOMDetails').val('').trigger('change');
            // $('#ddlUOMDetails').focus();
        }
        else {
            alertify.error('Please enter quantity');
        }
    }
    else {
        alertify.error('Please select any Product Name');
    }


}

function DeleteDemandSlipDetailEntry(ele, materialId) {
    $(ele.parentElement.parentElement).remove();
}

function validateRows() {
    var isValid = true;
    var errorMessage = "";


    var ProductName = $("#ddlItemDetails").val();
    var qty = $("#txtItemQty").val();
    var UOMDetails = $("#ddlUOMDetails").val();

    if (!ProductName) {
        isValid = false;
        errorMessage += "Product Name is required.\n";
        $("#ddlItemDetails").addClass("is-invalid");
    } else {
        $("#ddlItemDetails").removeClass("is-invalid");
    }

    if (!qty || isNaN(qty) || parseFloat(qty) <= 0 || !/^\d+(\.\d{1,2})?$/.test(qty)) {
        isValid = false;
        errorMessage += "Quantity must be a number greater than 0 with up to 2 decimal places.\n";
        $("#txtItemQty").addClass("is-invalid");
    } else {
        $("#txtItemQty").removeClass("is-invalid");
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