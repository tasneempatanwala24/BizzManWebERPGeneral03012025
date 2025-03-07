$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
    });
    $('#txtDeadlineDate').datepicker('setStartDate', truncateDate(new Date()));
    $('#LblAssignPerson').text($('#ContentPlaceHolder1_loginuser').val());
    $('#ddlBOMID').select2();
    FetchBOMDetails();
    $('#ddlUnitMesure').select2();
    BindUnitMesureDropdown();
    $('#ddlManufacturingType').select2();
    $('#ddlAssignperson').select2();
    BindAssignpersonDropdown();

    BindManufactureOrderMasterList();
    attachKeydownListeners();

    $(document).on("keydown", function (event) {
        // Check if Ctrl key is pressed along with 'S' key
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default save dialog
            AddOrderDetails(); // Call the save function
        }
    });
});


function truncateDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function attachKeydownListeners() {
    $("#ddlBOMID").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            setTimeout(function () {
                $("#txtMODate").focus(); // Trigger click to open the calendar popup
            }, 300);
        }
    });

    $("#ddlBOMID").on("change", function (event) {
        setTimeout(function () {
            $("#txtMODate").focus(); // Trigger click to open the calendar popup
        }, 300);
    });

    $("#txtMODate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtQuantity").focus();
        }
    });
    $("#txtQuantity").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlUnitMesure").focus();
        }
    });

    $("#ddlUnitMesure").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlAssignperson").focus();
        }
    });
    $("#ddlUnitMesure").on("change", function (event) {
        setTimeout(function () {
            $("#ddlAssignperson").focus(); // Trigger click to open the calendar popup
        }, 300);
    });

    $("#ddlAssignperson").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtDeadlineDate").focus();
        }
    });
    $("#ddlAssignperson").on("change", function (event) {
        setTimeout(function () {
            $("#txtDeadlineDate").focus(); // Trigger click to open the calendar popup
        }, 300);
    });

    $("#txtDeadlineDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlManufacturingType").focus();
        }
    });

    //$("#ddlAssignperson").on("keydown", function (event) {
    //        if (event.key === "Enter") {
    //            event.preventDefault();
    //            $("#ddlOperation").focus();
    //        }
    //    });
    //$("#ddlAssignperson").on("change", function (event) {
    //        setTimeout(function () {
    //            $("#ddlOperation").focus(); // Trigger click to open the calendar popup
    //        }, 300);
    //    });

    //$("#ddlProductNameDetails").on("keydown", function (event) {
    //    if (event.key === "Enter") {
    //        event.preventDefault();
    //        $("#txtMaterialQty").focus();
    //    }
    //});
    //$("#ddlProductNameDetails").on("change", function (event) {
    //    setTimeout(function () {
    //        $("#txtMaterialQty").focus(); // Trigger click to open the calendar popup
    //    }, 300);
    //});
}

function FetchBOMDetails() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/FetchBOMMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            setTimeout(function () {
                var data = JSON.parse(response.d);
                var req = '';
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + "</option>";
                }
                $('#ddlBOMID').append(req);
                hideLoader();
            }, 200);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function FetchSelectedBOMDetails() {
    if ($('#ddlBOMID').val() != '') {
        $('#tbody_ManufactureOrderListDetails').children('tr:not(:first)').remove();
        $('#txtProductName').val('');
        $('#txtMaterialQty').val('');
        $('#hdnProductID').val('');
        $.ajax({
            type: "POST",
            url: 'wfMnfManufactureBulkAutoProduction.aspx/FetchBOMMasterListById',
            data: JSON.stringify({
                "ID": $('#ddlBOMID').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                setTimeout(function () {
                    var data = JSON.parse(response.d);
                    $('#txtProductName').val(data[0].ProductName);
                    $('#hdnProductID').val(data[0].MaterialId);
                    var req = "";
                    for (var i = 0; i < JSON.parse(response.d).length; i++) {
                        $('#tbody_ManufactureOrderListDetails').append('<tr><td style="display: none;">' + data[i].ID + '</td>'
                            + '<td>' + (data[i].BomDetailMaterialName != undefined ? data[i].BomDetailMaterialName : "") + '</td>'
                            + '<td style="display: none;">' + (data[i].BomDetailMaterial != undefined ? data[i].BomDetailMaterial : "") + '</td>'
                            + '<td>' + (data[i].BomDetailQuantity != undefined ? data[i].BomDetailQuantity : "") + '</td>'
                            + '<td>' + (data[i].WorkCenterID != undefined ? data[i].WorkCenterID : "") + '</td>'
                            + '<td>' + (data[i].Operation != undefined ? data[i].Operation : "") + '</td>'
                            + '<td>' + (data[i].BomDetailQuantity * ($('#txtQuantity').val().trim() != undefined ? $('#txtQuantity').val().trim() : 0)) + '</td>'
                            + '</tr>');
                    }
                    hideLoader();
                }, 200);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}






function CreateOrderDetails() {

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
    $("#ddlBOMID").focus();
}

function GenerateOrderID() {

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/GenerateOrderID',

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);

            if (data[0] != undefined) {
                $('#txtId').val(data[0].ID);
            }
            if (data.length == 0) {
                $('#txtId').val("MO001");
            }

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


function ChangeQtyConsumed() {

    var QtyEntered = $('#txtQuantity').val().trim();
    $('#tbody_ManufactureOrderListDetails tr').each(function (i) {
        if (i > 0) {
            var QtyDefinedInBOM = $(this)[0].cells[3].innerText != undefined ? $(this)[0].cells[3].innerText : 0;
            $(this)[0].cells[6].innerText = QtyDefinedInBOM * QtyEntered;
        }
    });
}

function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/UnitMesureList',
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
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindAssignpersonDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/CustomerMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlAssignperson').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Assignee-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                branch = branch + "<option value='" + JSON.parse(response.d)[i].CustomerId + "'>" + JSON.parse(response.d)[i].CustomerName + '--' + JSON.parse(response.d)[i].Phone + "</option>";
            }
            $('#ddlAssignperson').append(branch);
            $('#ddlAssignperson').focus();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function ClearAll() {
    $('#txtMODate').val(getCurrentDate());
    $('#tbody_ManufactureOrderListDetails').children('tr:not(:first)').remove();

    $('#txtProductName').val('');
    $('#txtMaterialQty').val('');

    $('#txtQuantity').val('0');

    $('#ddlUnitMesure').select2('destroy');
    $('#ddlUnitMesure').val('');
    $('#ddlUnitMesure').select2();
    $('#ddlManufacturingType').select2('destroy');
    $('#ddlManufacturingType').val('');
    $('#ddlManufacturingType').select2();
    $('#ddlAssignperson').select2('destroy');
    $('#ddlAssignperson').val('');
    $('#ddlAssignperson').select2();
    $('#ddlBOMID').select2('destroy');
    $('#ddlBOMID').val('');
    $('#ddlBOMID').select2();
}

function getCurrentDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (today.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero if needed
    var year = today.getFullYear();
    return month + "/" + day + "/" + year;
}

function AddOrderDetails() {
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;

    }
    if ($('#ddlBOMID').val() == '' || $('#ddlBOMID').val() == '0') {
        alertify.error('Please select BOMID');
        return;
    }
    else if ($('#txtQuantity').val() == '0') {
        alertify.error('Enter Quantity');
        return;
    }
    else if ($('#ddlUnitMesure').val() == '' || $('#ddlUnitMesure').val() == '0') {
        alertify.error('Please select Unit of Measure');
        return;
    }
    else if ($('#ddlManufacturingType').val() == '' || $('#ddlManufacturingType').val() == '0') {
        alertify.error('Please select Manufacturing Type');
        return;
    }
    else if ($('#txtDeadlineDate').val() == '' || $('#txtDeadlineDate').val() == '0') {
        alertify.error('Please select Deadline Date');
        return;
    }
    else {
        if ($('#ddlAssignperson').val() == '' || $('#ddlAssignperson').val() == '0') {
            alertify.error('Please select Assignee');
            return;
        }
    }


    var hasRows = $('#tbody_ManufactureOrderListDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add BOM Details');
        return;
    }
    showLoader();
    var dataList = [];

    $("#tbody_ManufactureOrderListDetails tr").each(function (i) {
        if (i > 0) {
            var MaterialId = $(this)[0].cells[2].innerText;
            var Qty = $(this)[0].cells[3].innerText;
            var WCID = $(this)[0].cells[4].innerText;
            var Operation = $(this)[0].cells[5].innerText;
            var QtyConsumed = $(this)[0].cells[6].innerText;
            dataList.push({ MaterialId: MaterialId, Quantity: Qty, WCID: WCID, Operation: Operation, QtyConsumed: QtyConsumed });
        }
    });
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/AddOrderDetails',
        data: JSON.stringify({
            dtList: dataList,
            "Id": $('#txtId').val(),
            "BOMID": $('#ddlBOMID').val(),
            "ProductId": $('#hdnProductID').val(),
            "MOdate": $('#txtMODate').val().trim(),
            "Quantity": $('#txtQuantity').val().trim(),
            "UOM": $('#ddlUnitMesure').val(),
            "Assignperson": $('#ddlAssignperson').val(),
            "DeadlineDate": $('#txtDeadlineDate').val().trim(),
            "ManufacturingType": $('#ddlManufacturingType').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "IsUpdate": isUpdate
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Order Details added successfully' : 'Order Details updated successfully';
            alertify.success(message);
            ClearAll();
            hideLoader();
            ShowOrderDetails();
            // Discard();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ShowOrderDetails() {

    $('#hdnIsEdit').val('0');
    $('#divEntry').hide();
    $('#divDetails').hide();
    $('#divList').show();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindManufactureOrderMasterList();
}


function BindManufactureOrderMasterList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/FetchManufactureOrderMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            setTimeout(function () {
                var data = JSON.parse(response.d);
                $('#tblManufactureOrderList').DataTable().clear();
                $('#tblManufactureOrderList').DataTable().destroy();
                $('#tbody_ManufactureOrder_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td>' + data[i].Id + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].BOMID != undefined ? data[i].BOMID : '') + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].FormattedMODate != undefined ? data[i].FormattedMODate : '') + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].ProductName != undefined ? data[i].ProductName : '') + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Quantity != undefined ? data[i].Quantity : 0) + ' ' + (data[i].UnitMeasure != undefined ? data[i].UnitMeasure : '') + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].CustomerName != undefined ? data[i].CustomerName : 0) + '</td>'

                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].FormattedDeadlineDate != undefined ? data[i].FormattedDeadlineDate : '') + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].ManufacturingType != undefined ? data[i].ManufacturingType : '') + '</td>'
                        + '<td onclick="FetchManufactureorderMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].CreateUser != undefined ? data[i].CreateUser : '') + '</td>'
                        + '</tr>';
                }



                $('#tbody_ManufactureOrder_List').html(html);
                //$('#tblWorkCenterDetailsList').DataTable();

                var d = new Date();
                var table = $('#tblManufactureOrderList').DataTable({
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

                $('#tblManufactureOrderList tbody').on('change', 'input[type="checkbox"]', function () {
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
                hideLoader();
            }, 200);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function FetchManufactureorderMasterDetails(id) {

    showLoader();

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/FetchManufactureOrderMasterListById',
        data: JSON.stringify({
            "ID": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            setTimeout(function () {
                var data = JSON.parse(response.d);
                ClearAll();
                //$('#divList').hide();
               // $('#divEntry').show();
                $('#divDetails').show();
               // $('#btnSave').show();
                $('#btnExport').hide();
               // $('#btnView').show();
                $('#txtId').val(id);
                $('#hdnIsEdit').val('1');
                $("#btnSave").html('Update');
                $('#ddlBOMID').select2('destroy');
                $('#ddlBOMID').val((data[0].BOMID != undefined ? data[0].BOMID
                    : ''));
                $('#ddlBOMID').select2();
                txtProductName
                $('#txtProductName').val((data[0].ProductName != undefined ? data[0].ProductName : ''));

                $('#txtQuantity').val((data[0].Quantity != undefined ? data[0].Quantity : ''));
                $('#hdnProductID').val((data[0].materialID
                    != undefined ? data[0].materialID
                    : ''))
                if (data[0].DeadLineDate != undefined) {
                    var dtDeadLineDate = new Date(data[0].DeadLineDate);
                    $('#txtDeadlineDate').val(formatDate(dtDeadLineDate));
                }
                else {
                    $('#txtDeadlineDate').val(getCurrentDate());
                }

                if (data[0].MODate != undefined) {
                    var dtMODate = new Date(data[0].MODate);
                    $('#txtMODate').val(formatDate(dtMODate));
                }
                else {
                    $('#txtMODate').val(getCurrentDate());
                }

                $('#ddlUnitMesure').select2('destroy');
                $('#ddlUnitMesure').val((data[0].UOMID != undefined ? data[0].UOMID : ''));
                $('#ddlUnitMesure').select2();

                $('#ddlManufacturingType').select2('destroy');
                $('#ddlManufacturingType').val((data[0].ManufacturingType != undefined ? data[0].ManufacturingType : ''));
                $('#ddlManufacturingType').select2();

                $('#ddlAssignperson').select2('destroy');
                $('#ddlAssignperson').val((data[0].AssignPersonID != undefined ? data[0].AssignPersonID : ''));
                $('#ddlAssignperson').select2();
                FetchManufactureOrderDetails(id);
                hideLoader();
            }, 200);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchManufactureOrderDetails(id) {
    $('#tbody_ManufactureOrderListDetails').children('tr:not(:first)').remove();

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBulkAutoProduction.aspx/FetchManufactureOrderDetails',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ComponentsHeader').html('Components of ' + id);
            ComponentsHeader
            for (var i = 0; i < data.length; i++) {

                $('#tbody_ManufactureOrderListDetails').append('<tr><td style="display: none;">' + data[i].ID + '</td>'
                    + '<td>' + (data[i].ProductName != undefined ? data[i].ProductName : "") + '</td>'
                    + '<td style="display: none;">' + (data[i].MaterialId != undefined ? data[i].MaterialId : "") + '</td>'

                    + '<td>' + (data[i].Quantity != undefined ? data[i].Quantity : "") + '</td>'
                    + '<td>' + (data[i].WCID != undefined ? data[i].WCID : "") + '</td>'
                    + '<td>' + (data[i].Operation != undefined ? data[i].Operation : "") + '</td>'
                    + '<td>' + (data[i].QuantityConsumed != undefined ? data[i].QuantityConsumed : "") + '</td>'


                    + '</tr>');
            }


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
// Function to format the date as mm/dd/yyyy
function formatDate(date) {
    var day = ("0" + date.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero if needed
    var year = date.getFullYear();



    return month + '/' + day + '/' + year;
}
function validateRows() {
    var isValid = true;
    var errorMessage = "";
    //var ProductName = $("#ddlProductNameDetails").val();
    var qty = $("#txtMaterialQty").val();

    //if (!ProductName) {
    //    isValid = false;
    //    errorMessage += "Product Name is required.\n";
    //    $("#ddlProductNameDetails").addClass("is-invalid");
    //} else {
    //    $("#ddlProductNameDetails").removeClass("is-invalid");
    //}

    if (!qty || isNaN(qty) || parseFloat(qty) <= 0 || !/^\d+(\.\d{1,2})?$/.test(qty)) {
        isValid = false;
        errorMessage += "Quantity must be a number greater than 0 with up to 2 decimal places.\n";
        $("#txtMaterialQty").addClass("is-invalid");
    } else {
        $("#txtMaterialQty").removeClass("is-invalid");
    }
    if (!isValid) {
        alertify.error(errorMessage);
    }

    return isValid;
}

function ConfirmAutoProduce() {
    alertify.confirm('Confirm Auto Produce Selected MO', 'Are you sure, you want to Auto Produce selected Manufacture Order?', function () { AutoProduce(); }
        , function () { });
}

function AutoProduce() {
    var chk = 0;
    var BOMid = '';
    $('#tbody_ManufactureOrder_List tr').each(function (index1, tr) {
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
            url: "wfMnfManufactureBulkAutoProduction.aspx/AutoProduceMO",
            data: JSON.stringify({
                "id": BOMid,
                "loginUser": $('#ContentPlaceHolder1_loginuser').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                $('#divDetails').hide();
                BindManufactureOrderMasterList();
            }
        });
    }
    else {
        alertify.error('Please select any record');
    }
}

function DownloadFile() {
    var chk = 0;
    var BOMid = '';
    $('#tbody_ManufactureOrder_List tr').each(function (index1, tr) {
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
            url: "wfMnfManufactureBulkAutoProduction.aspx/FetchManufactureBomDetailListDownload",
            data: JSON.stringify({
                "id": BOMid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'ManufactureOrder' + d.toDateString() + '.xlsx';
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
