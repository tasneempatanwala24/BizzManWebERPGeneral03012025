$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlLocation').select2();
    $('#ddlProductName').select2();
    $('#ddlMachineType').select2();
    BindLocationDropdown();
    BindProductDropdown();
    $('#divWorkCenterDetails').hide();
    $('#divWorkCenterDetailsList').show();
    BindWorkCenterDetailsList();
    attachKeydownListeners();
    // Detect Ctrl+S key press
    $(document).on("keydown", function (event) {
        // Check if Ctrl key is pressed along with 'S' key
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default save dialog
            AddWorkCenterDetails(); // Call the save function
        }
    });
});



function attachKeydownListeners() {
    $("#ddlMachineType").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            setTimeout(function () {
                $("#txtCapacity").focus(); // Trigger click to open the calendar popup
            }, 300);
        }
    });

    $("#ddlMachineType").on("change", function (event) {
            setTimeout(function () {
                $("#txtCapacity").focus(); // Trigger click to open the calendar popup
            }, 300);
    });

    $("#txtCapacity").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlProductName").focus();
        }
    });
    
    $("#ddlProductName").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtCost").focus();
        }
    });
    $("#ddlProductName").on("change", function (event) {
        setTimeout(function () {
            $("#txtCost").focus(); // Trigger click to open the calendar popup
        }, 300);
    });
    $("#txtCost").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtSetupTime").focus();
        }
    });
    $("#txtSetupTime").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlLocation").focus();
        }
    });


    $("#ddlLocation").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtRemark").focus();
        }
    });
    $("#ddlLocation").on("change", function (event) {
        setTimeout(function () {
            $("#txtRemark").focus(); // Trigger click to open the calendar popup
        }, 300);
    });

    
}
  
function ClearAll() {
    $(".card-header").text('\Add Work Center Details\n ');
    //Added By Tasneem -->START
    $('#txtCapacity').val('');
    $('#ddlMachineType').select2('destroy');
    $('#ddlMachineType').val('');
    $('#ddlMachineType').select2();
    $('#txtSetupTime').val('');
    $('#txtRemark').val('');
    $('#txtCost').val('');
    $('#ddlProductName').select2('destroy');
    $('#ddlProductName').val('');
    $('#ddlProductName').select2();
    $('#ddlLocation').select2('destroy');
    $('#ddlLocation').val('');
    $('#ddlLocation').select2();
    //Added By Tasneem -->END
}
//Added By Tasneem 7Jan2025 --START
function BindWorkCenterDetailsList() {
   
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureWorkCentersDetail.aspx/FetchWorkCenterDetailList',
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
function FetchWorkCenterDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureWorkCentersDetail.aspx/FetchWorkCenterDetails',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            ClearAll();
            $('#hdnIsEdit').val('1');
            $('#txtId').val(data[0].Id);
            $("#btnSave").html('Update');
            $(".card-header").text('\nUpdate Work Center Details\n ')
            $("#btnSave").show();
            $('#divWorkCenterDetailsList').hide();
            $('#divWorkCenterDetails').show();
            $('#btnExport').hide();
            $('#ddlMachineType').val(data[0].MachineType);
            $('#txtCapacity').val(data[0].Capacity);
            $('#ddlProductName').val(data[0].MaterialId);
            $('#ddlLocation').val(data[0].LocationID);
            $('#txtCost').val(data[0].Cost);
            $('#txtSetupTime').val(data[0].SetupTime);
            $('#txtRemark').val(data[0].Remark);
            $('#ddlMachineType').select2();
            $('#ddlProductName').select2();
            $('#ddlLocation').select2();
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindLocationDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureWorkCentersDetail.aspx/LocationDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var location = "<option value='0'>- Select Location -</option>";
            $('#ddlLocation').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                location = location + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LocationName + "</option>";
            }
            $('#ddlLocation').append(location);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

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


function imposeMinMax(el) {

    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}

function BindProductDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureWorkCentersDetail.aspx/MaterialMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlProductName').html('');
            var data = JSON.parse(response.d);
            var req = "<option value='0'>-Select ProductName-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlProductName').append(req);
            $('#ddlProductName').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function CreateWorkCenterDetails() {
  
    $('#hdnIsEdit').val('0');
    $('#divWorkCenterDetails').show();
    $('#divWorkCenterDetailsList').hide();
    $('#btnSave').show();
    $("#btnSave").html('Save');
    $('#btnExport').hide();
    
   
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
    GenerateOrderID();
    $('#ddlMachineType').select2('focus');
}
function ShowWorkCenterDetails() {

    $('#hdnIsEdit').val('0');
    $('#divWorkCenterDetails').hide();
    $('#divWorkCenterDetailsList').show();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindWorkCenterDetailsList();

}

function AddWorkCenterDetails() {
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;

    }


    if ($('#txtId').val() == '') {
        alertify.error('Enter Id');
        return;
    }
    if ($('#txtCapacity').val() == '') {
        alertify.error('Enter Capacity');
        return;
    }
    else if ($('#ddlMachineType').val() == '0') {
        alertify.error('Please select Machine type');
        return;
    }
    else if ($('#ddlProductName').val() == '0') {
        alertify.error('Please select Product Name');
        return;
    }
    else if ($('#txtCost').val() == '') {
        alertify.error('please enter cost');
        return;
    }
    else if ($('#txtSetupTime').val() == '') {
        alertify.error('please enter Setup time');
        return;
    }
    else if ($('#ddlLocation').val() == '0') {
        alertify.error('Please select Location');
        return;
    }
    else if ($('#txtRemark').val() == '') {
        alertify.error('Enter Remarks');
        return;
    }
    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureWorkCentersDetail.aspx/AddWorkCenterDetails',
        data: JSON.stringify({
            "Id": $('#txtId').val(),
            "MachineType": $('#ddlMachineType').val(),
            "Capacity": $('#txtCapacity').val().trim(),
            "MaterialId": $('#ddlProductName').val(),
            "Cost": $('#txtCost').val().trim(),
            "SetupTime": $('#txtSetupTime').val().trim(),
            "Location": $('#ddlLocation').val().trim(),
            "Remark": $('#txtRemark').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "IsUpdate": isUpdate
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Work Center Details added successfully' : 'Work Center Details updated successfully';
            alertify.success(message);
            ClearAll();
            ShowWorkCenterDetails();
            // Discard();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function GenerateOrderID() {
    
        $.ajax({
            type: "POST",
            url: 'wfMnfManufactureWorkCentersDetail.aspx/GenerateOrderID',
           
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

function DownloadFile() {
    var chk = 0;
    var BOMid = '';
    $('#tbody_WorkCenterDetailsList tr').each(function (index1, tr) {
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
            url: "wfMnfManufactureWorkCentersDetail.aspx/FetchWorkCenterDetailListDownload",
            data: JSON.stringify({
                "id": BOMid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'WorkCenterDetail_' + d.toDateString() + '.xlsx';
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
//Added By Tasneem 7Jan2025 --END
