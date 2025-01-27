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
   
    FetchBOMMasterList();
    attachKeydownListeners();

    $(document).on("keydown", function (event) {
        // Check if Ctrl key is pressed along with 'S' key
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default save dialog
            AddBOMDetails(); // Call the save function
        }
    });
});


function truncateDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function attachKeydownListeners() {
        $("#ddlProductName").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                setTimeout(function () {
                    $("#txtQuantity").focus(); // Trigger click to open the calendar popup
                }, 300);
            }
        });

        $("#ddlProductName").on("change", function (event) {
            setTimeout(function () {
                $("#txtQuantity").focus(); // Trigger click to open the calendar popup
            }, 300);
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
                $("#ddlManufacturingType").focus();
            }
        });
        $("#ddlUnitMesure").on("change", function (event) {
            setTimeout(function () {
                $("#ddlManufacturingType").focus(); // Trigger click to open the calendar popup
            }, 300);
        });

    $("#ddlManufacturingType").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#ddlAssignperson").focus();
            }
        });
    $("#ddlManufacturingType").on("change", function (event) {
            setTimeout(function () {
                $("#ddlAssignperson").focus(); // Trigger click to open the calendar popup
            }, 300);
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
        url: 'wfMnfManufactureOrder.aspx/FetchBOMMasterList',
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
        $.ajax({
            type: "POST",
            url: 'wfMnfManufactureOrder.aspx/FetchBOMMasterListById',
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
                        $('#tbody_BOMListDetails').append('<tr><td style="display: none;">' + data[i].ID + '</td>'
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


function FetchBOMMasterList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureOrder.aspx/FetchBOMMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            setTimeout(function () {
                var data = JSON.parse(response.d);
                $('#tblManufactureBomList').DataTable().clear();
                $('#tblManufactureBomList').DataTable().destroy();
                $('#tbody_BOM_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td>' + data[i].Id + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].ProductName != undefined ? data[i].ProductName : '') + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Quantity != undefined ? data[i].Quantity : '') + ' ' + (data[i].UnitMeasure != undefined ? data[i].UnitMeasure : '') + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].BOMType != undefined ? data[i].BOMType : '') + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].WorkCenterID != undefined ? data[i].WorkCenterID : 0) + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Operation != undefined ? data[i].Operation : 0) + '</td>'

                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Duration != undefined ? data[i].Duration : '') + '</td></tr>';
                }
                var req = '';
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + "</option>";
                }
                $('#ddlBOMID').append(req);

                $('#tbody_BOM_List').html(html);
                //$('#tblWorkCenterDetailsList').DataTable();

                var d = new Date();
                var table = $('#tblManufactureBomList').DataTable({
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

                $('#tblManufactureBomList tbody').on('change', 'input[type="checkbox"]', function () {
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


function BindBOMDetailsList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureOrder.aspx/FetchBOMMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            setTimeout(function () {
                var data = JSON.parse(response.d);
                $('#tblManufactureBomList').DataTable().clear();
                $('#tblManufactureBomList').DataTable().destroy();
                $('#tbody_BOM_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td>' + data[i].Id + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].ProductName != undefined ? data[i].ProductName : '') + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Quantity != undefined ? data[i].Quantity : '') + ' ' + (data[i].UnitMeasure != undefined ? data[i].UnitMeasure : '') + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].BOMType != undefined ? data[i].BOMType : '') + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].WorkCenterID != undefined ? data[i].WorkCenterID : 0) + '</td>'
                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Operation != undefined ? data[i].Operation : 0) + '</td>'

                        + '<td onclick="FetchBOMMasterDetails(\'' + data[i].Id.trim() + '\');">' + (data[i].Duration != undefined ? data[i].Duration : '') + '</td></tr>';
                }

                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + "</option>";
                }
                $('#ddlBOMID').append(req);

                $('#tbody_BOM_List').html(html);
                //$('#tblWorkCenterDetailsList').DataTable();

                var d = new Date();
                var table = $('#tblManufactureBomList').DataTable({
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

                $('#tblManufactureBomList tbody').on('change', 'input[type="checkbox"]', function () {
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
}

function GenerateOrderID() {

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureOrder.aspx/GenerateOrderID',

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
    $('#tbody_BOMListDetails tr').each(function (i) {
        if (i > 0) {
            var QtyDefinedInBOM = $(this)[0].cells[3].innerText != undefined ? $(this)[0].cells[3].innerText : 0;
            $(this)[0].cells[6].innerText = QtyDefinedInBOM * QtyEntered;
        }
    });
}

function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureOrder.aspx/UnitMesureList',
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
        url: 'wfMnfManufactureOrder.aspx/CustomerMasterList',
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
    $('#tbody_BOMListDetails').children('tr:not(:first)').remove();
    
    $('#txtProductNameDetails').val('');
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


    var hasRows = $('#tbody_BOMListDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add BOM Details');
        return;
    }
    showLoader();
    var dataList = [];

    $("#tbody_BOMListDetails tr").each(function (i) {
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
        url: 'wfMnfManufactureOrder.aspx/AddOrderDetails',
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
            //ShowOrderDetails();
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
    BindBOMDetailsList();
}



function FetchBOMMasterDetails(id) {
   
        showLoader();

        $.ajax({
            type: "POST",
            url: 'wfMnfManufactureOrder.aspx/FetchBOMMasterListById',
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
                    $('#divList').hide();
                    $('#divEntry').show();
                    $('#divDetails').show();
                    $('#btnSave').show();
                    $('#btnExport').hide();
                    $('#btnView').show();
                    $('#txtId').val(id);
                    $('#hdnIsEdit').val('1');
                    $("#btnSave").html('Update');
                    $('#ddlBOMID').select2('destroy');
                    $('#ddlBOMID').val((data[0].MaterialId != undefined ? data[0].MaterialId
                        : ''));
                    $('#ddlBOMID').select2();

                    $('#txtQuantity').val((data[0].Quantity != undefined ? data[0].Quantity : ''));

                    $('#ddlUnitMesure').select2('destroy');
                    $('#ddlUnitMesure').val((data[0].UOMID != undefined ? data[0].UOMID : ''));
                    $('#ddlUnitMesure').select2();

                    $('#ddlManufacturingType').select2('destroy');
                    $('#ddlManufacturingType').val((data[0].BOMType != undefined ? data[0].BOMType : ''));
                    $('#ddlManufacturingType').select2();

                    $('#ddlAssignperson').select2('destroy');
                    $('#ddlAssignperson').val((data[0].WorkCenterID != undefined ? data[0].WorkCenterID : ''));
                    $('#ddlAssignperson').select2();
                
                    hideLoader();
                }, 200);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
}

function FetchBOMDetailsList(id) {
    $('#tbody_BOMListDetails').children('tr:not(:first)').remove();

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureOrder.aspx/FetchBOMDetails',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

           
            for (var i = 0; i < data.length; i++) {
               
                $('#tbody_BOMListDetails').append('<tr><td style="display: none;">' + data[i].ID + '</td>'
                    + '<td>' + (data[i].ProductName != undefined ? data[i].ProductName : "") + '</td>'
                    + '<td style="display: none;">' + (data[i].MaterialId != undefined ? data[i].MaterialId : "") + '</td>'

                    + '<td>' + (data[i].Quantity != undefined ? data[i].Quantity : "") + '</td>'
                    + '<td>' + (data[i].UnitMeasure != undefined ? data[i].UnitMeasure : "") + '</td>'
                    + '<td style="display: none;">' + (data[i].UOMID != undefined ? data[i].UOMID : "") + '</td>'

                    + '<td><a onclick="DeleteBOMDetailEntry(this);"  style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'

                    + '</tr>');
            }
           

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
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

function DownloadFile() {
    var chk = 0;
    var BOMid = '';
    $('#tbody_BOM_List tr').each(function (index1, tr) {
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
            url: "wfMnfManufactureOrder.aspx/FetchManufactureBomDetailListDownload",
            data: JSON.stringify({
                "id": BOMid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'ManufactureBomDetail' + d.toDateString() + '.xlsx';
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
