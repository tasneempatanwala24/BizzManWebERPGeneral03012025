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
    //$('#ddlUOMDetails').select2();
    ShowBOMDetails();
    attachKeydownListeners();

    $(document).on("keydown", function (event) {
        // Check if Ctrl key is pressed along with 'S' key
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default save dialog
            AddBOMDetails(); // Call the save function
        }
    });
});
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
                $("#ddlBOMType").focus();
            }
        });
        $("#ddlUnitMesure").on("change", function (event) {
            setTimeout(function () {
                $("#ddlBOMType").focus(); // Trigger click to open the calendar popup
            }, 300);
        });

        $("#ddlBOMType").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#ddlWorkCenter").focus();
            }
        });
        $("#ddlBOMType").on("change", function (event) {
            setTimeout(function () {
                $("#ddlWorkCenter").focus(); // Trigger click to open the calendar popup
            }, 300);
        });

        $("#ddlWorkCenter").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#ddlOperation").focus();
            }
        });
        $("#ddlWorkCenter").on("change", function (event) {
            setTimeout(function () {
                $("#ddlOperation").focus(); // Trigger click to open the calendar popup
            }, 300);
        });

        $("#ddlOperation").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#txtDuration").focus();
            }
        });
        $("#ddlOperation").on("change", function (event) {
            setTimeout(function () {
                $("#txtDuration").focus(); // Trigger click to open the calendar popup
            }, 300);
        });


        $("#txtDuration").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#ddlProductNameDetails").focus();
            }
        });

        $("#ddlProductNameDetails").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#txtMaterialQty").focus();
            }
        });
        $("#ddlProductNameDetails").on("change", function (event) {
            setTimeout(function () {
                $("#txtMaterialQty").focus(); // Trigger click to open the calendar popup
            }, 300);
        });
        $("#txtMaterialQty").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#ddlUOMDetails").focus();
            }
        });


        $("#ddlUOMDetails").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                SaveBOMListDetails();
                $('#ddlProductNameDetails').focus();
            }
        });
        //$("#ddlUOMDetails").on("change", function (event) {
        //    setTimeout(function () {
        //        SaveBOMListDetails(); // Trigger click to open the calendar popup
        //    }, 300);
        //});


    }
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
    $('#tbody_BOMListDetails').children('tr:not(:first)').remove();
    
    $('#ddlProductNameDetails').select2('destroy');
    $('#ddlProductNameDetails').val('');
    $('#ddlProductNameDetails').select2();
    $('#txtMaterialQty').val('');
    //$('#ddlUOMDetails').select2('destroy');
    $('#ddlUOMDetails').val('');
   // $('#ddlUOMDetails').select2();

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
            var ProductId = $(this)[0].cells[2].innerText;
            var Qty = $(this)[0].cells[3].innerText;
            var UOM = $(this)[0].cells[5].innerText;
            data.push({ ProductName: ProductId, Quantity: Qty, UOM: UOM });
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
    $('#divDetails').hide();
    $('#divList').show();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindBOMDetailsList();
}

function BindBOMDetailsList() {

    $.ajax({
        type: "POST",
        url: 'wfMnfManufactureBomDetail.aspx/FetchBOMMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
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

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchBOMMasterDetails(id) {
   
        showLoader();

        $.ajax({
            type: "POST",
            url: 'wfMnfManufactureBomDetail.aspx/FetchBOMMasterListById',
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
                    $('#ddlProductName').select2('destroy');
                    $('#ddlProductName').val((data[0].MaterialId != undefined ? data[0].MaterialId
                        : ''));
                    $('#ddlProductName').select2();

                    $('#txtQuantity').val((data[0].Quantity != undefined ? data[0].Quantity : ''));

                    $('#ddlUnitMesure').select2('destroy');
                    $('#ddlUnitMesure').val((data[0].UOMID != undefined ? data[0].UOMID : ''));
                    $('#ddlUnitMesure').select2();

                    $('#ddlBOMType').select2('destroy');
                    $('#ddlBOMType').val((data[0].BOMType != undefined ? data[0].BOMType : ''));
                    $('#ddlBOMType').select2();

                    $('#ddlWorkCenter').select2('destroy');
                    $('#ddlWorkCenter').val((data[0].WorkCenterID != undefined ? data[0].WorkCenterID : ''));
                    $('#ddlWorkCenter').select2();

                    $('#ddlOperation').select2('destroy');
                    $('#ddlOperation').val((data[0].Operation != undefined ? data[0].Operation : ''));
                    $('#ddlOperation').select2();

                    $('#txtDuration').val((data[0].Duration != undefined ? data[0].Duration : ''));
                   


                    FetchBOMDetailsList(id);
                    
                    //setTimeout(function () {
                    //    $('#ddlCustomer').val(data[0].CustomerId).trigger('change');

                    //}, 30);
                    //setTimeout(function () {

                    //    $('#ddlCustomer').focus();
                    //}, 30);
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
        url: 'wfMnfManufactureBomDetail.aspx/FetchBOMDetails',
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
function DeleteBOMDetailEntry(ele) {
$(ele.parentElement.parentElement).remove();
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

function DeleteBOMDetailEntry(ele, materialId) {
     $(ele.parentElement.parentElement).remove();
}
function FetchMaterialDetails() {

    if ($('#ddlProductNameDetails').val() != '') {
        var found = false;
        $('#tbody_BOMListDetails tr').each(function (i) {
            if (i > 0) {
                var materialid = $(this)[0].cells[2].innerText;
                if (materialid == $('#ddlProductNameDetails').val()) {
                    found = true;

                }
            }

        });
        if (found) {
            alertify.error('Product already added');
            $('#ddlProductNameDetails').select2('destroy');
            $('#ddlProductNameDetails').val('');
            $('#ddlProductNameDetails').select2();
            $('#ddlProductNameDetails').focus();
            return;
        }
       
       
    }
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
            url: "wfMnfManufactureBomDetail.aspx/FetchManufactureBomDetailListDownload",
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
