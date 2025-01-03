
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindMaterialMasterDropdown();
    BindBranchDropdown();
    BindCustomerDropdown();
    BindCustomerTypeDropdown();
    BindStateDropdown();
    BindManufactureOrderMasterList();
    BindWarehouseDropdown();
});



function BindWarehouseDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/WarehouseList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            // $('#ddlWarehouse').select2('destroy');
            $('#ddlWarehouse').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Warehouse-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlWarehouse').append(req);
            // $('#ddlWarehouse').select2();
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
        url: 'wfSdManufactureOrder.aspx/BranchMasterList',
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


function BindMaterialMasterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/MaterialMasterList',
        data: {},
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


function BindStateDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/FetchStateList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlState').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select State-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].StateId + "'>" + JSON.parse(response.d)[i].StateName + "</option>";
            }
            $('#ddlState').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function BindCityDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/FetchCityList',
        data: JSON.stringify({
            "stateid": $('#ddlState').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCity').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select City-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CityName + "</option>";
            }
            $('#ddlCity').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}




function BindCustomerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/CustomerMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCustomer').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Customer-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].CustomerId + "'>" + JSON.parse(response.d)[i].CustomerName + "</option>";
            }
            $('#ddlCustomer').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindFormulaDropdown(BOMId) {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/FormulaList',
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


function BindCustomerTypeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/CustomerTypeMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCustomerType').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Customer Type-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].id + "'>" + JSON.parse(response.d)[i].CustomerType + "</option>";
            }
            $('#ddlCustomerType').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function CreateManufactureOrder() {
    $('#divManufactureOrderList').hide();
    $('#divManufactureOrderEntry').show();
    $('#divManufactureOrderDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();
    $('#btnDone').hide();
    ClearAll();
}

function ViewManufactureOrderList() {
    $('#divManufactureOrderList').show();
    $('#divManufactureOrderEntry').hide();
    $('#divManufactureOrderDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    $('#btnDone').hide();
    BindManufactureOrderMasterList();
}



function ClearAll() {
    $('#tbody_ManufactureOrderDetails').html('');
    $('#ddlMaterialName').val('');
    $('#txtScheduleDate').val('');
    $('#txtQty').val('');
    $('#ddlFormula').html("<option value=''>-Select Formula-</option>");
    $('#ddlCustomer').val('');
    $('#ddlBranch').val('');
    $('#lblUnitMeasure').text('');
    $('#ddlMaterialName').removeAttr('readonly');
    $('#txtQty').removeAttr('readonly');
    $('#txtCustomerName').val('');
    $('#ddlCustomerType').val('');
    $('#txtCompanyName').val('');
    $('#ddlCity').val('');
    $('#ddlState').val('');
    $('#txtEmail').val('');
    $('#txtMobile').val('');
    $('#hdnManufactureOrderId').val('');
    $('#hdnSalesOrderId').val('');
    $('#hdnFormulaRequired').val('0');
    $('#txtManufactureId').val('');
    $('#txtSalesOrderId').val('');
    $('#ddlWarehouse').val('');
}



function BindManufactureOrderMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/FetchManufactureOrderMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblManufactureOrderList').DataTable().clear();
            $('#tblManufactureOrderList').DataTable().destroy();
            $('#tbody_ManufactureOrder_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active"></td><td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + data[i].ManufactureId + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].SalesOrderId != undefined ? data[i].SalesOrderId : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].Qty != undefined ? data[i].Qty : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].ScheduleDate != undefined ? data[i].ScheduleDate : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].FormulaName != undefined ? data[i].FormulaName : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchManufactureOrderMasterDetails(\'' + data[i].ManufactureId + '\');">' + (data[i].CustomerName != undefined ? data[i].CustomerName : '') + '</td></tr>';
            }
            $('#tbody_ManufactureOrder_List').html(html);
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

            $('#tbody_ManufactureOrder_List tbody').on('change', 'input[type="checkbox"]', function () {
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



function DownloadFile() {
    var chk = 0;
    var ManufactureOrderId = '';
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
                    if (ManufactureOrderId == '') {
                        ManufactureOrderId = td.outerText;
                    }
                    else {
                        ManufactureOrderId = ManufactureOrderId + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (ManufactureOrderId != '') {
        $.ajax({
            type: "POST",
            url: "wfSdManufactureOrder.aspx/FetchManufactureOrderListDownload",
            data: JSON.stringify({
                "ManufactureOrderId": ManufactureOrderId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'SalesOrder_' + d.toDateString() + '.xlsx';
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



function BindFormula() {
    $('#lblUnitMeasure').text('');

    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/FetchMaterialDetails',
        data: JSON.stringify({
            "MaterialId": $('#ddlMaterialName').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#lblUnitMeasure').text(data[0].UnitMesure);
            BindFormulaDropdown(data[0].BomId);
            $('#tbody_ManufactureOrderDetails').html('');
            if (data[0].BomId == null) {
                    FetchBOMDetailsList(1, $('#ddlMaterialName').val());
            }
            else {
                if (data[0].ManufacturingType != "Discreate") {
                    $('#hdnFormulaRequired').val('1');
                }
                else if (data[0].ManufacturingType == "Discreate") {
                    FetchBOMDetailsList(1, $('#ddlMaterialName').val());
                }
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function FetchBOMDetailsList(type, MaterialMasterId) {
    //if ($('#txtQty').val() != '') {
    var qty = '0';
    if ($('#txtQty').val() != '') {
        qty = $('#txtQty').val();
    }
        $('#tbody_ManufactureOrderDetails').html('');
        var BOM_id = $('#ddlFormula').val();
        var chk = 1;
        if (type == 2) {
            if ($('#ddlFormula').val() == "" || $('#ddlFormula').val() == null) {
                chk = 0;
            }
        }

        if (chk == 1) {
            $.ajax({
                type: "POST",
                url: 'wfSdManufactureOrder.aspx/FetchBOMDetailsList',
                data: JSON.stringify({
                    "BOMId": BOM_id,
                    "Formula": $("#ddlFormula option:selected").text(),
                    "type": type.toString(),
                    "MaterialMasterId": MaterialMasterId
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = JSON.parse(response.d);

                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        $('#tbody_ManufactureOrderDetails').append('<tr>'
                            + '<td style="display:none;">' + data[i].MaterialMasterId + '</td>'
                            + '<td>' + data[i].MaterialName + '</td>'
                            + '<td>' + (parseFloat(data[i].Qty) * parseFloat(qty)).toFixed(2) + '</td>'
                            + '<td>' + data[i].UnitMesure + '</td>'
                            + '<td>' + data[i].AvailableQty + '</td>'
                            + '</tr>');
                    }




                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });

        }
    //}
    //else {
    //    alertify.error('Please enter quantity');
    //    if (type == 2) {
    //        $('#ddlFormula').val('');
    //    }
    //    else {
    //        $('#ddlMaterialName').val('');
    //    }
    //}
}


function CloseModal() {
    $('#CustomerAddModal').modal('hide');
}


function AddCustomerDetails() {
    if ($('#txtCustomerName').val() != '') {
        if ($('#ddlCustomerType').val() != '') {
            if ($('#txtCompanyName').val() != '') {
                if ($("#ddlCity").val() != '') {

                    if ($('#ddlState').val() != '') {

                        if ($('#txtEmail').val() != '') {
                            if ($('#txtMobile').val() != '') {
                                
                                    $.ajax({
                                        type: "POST",
                                        url: 'wfSdSalesOrder.aspx/AddCustomer',
                                        data: JSON.stringify({
                                            "CustomerName": $('#txtCustomerName').val(),
                                            "CustomerType": $('#ddlCustomerType').val(),
                                            "CompanyName": $('#txtCompanyName').val(),
                                            "City": $('#ddlCity').val(),
                                            "State": $('#ddlState').val(),
                                            "Email": $('#txtEmail').val(),
                                            "Mobile": $('#txtMobile').val(),                                            
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
                                                $('#txtCustomerName').val('');
                                                $('#ddlCustomerType').val('');
                                                $('#txtCompanyName').val('');
                                                $('#ddlCity').val('');
                                                $('#ddlState').val('');
                                                $('#txtEmail').val('');
                                                $('#txtMobile').val('');
                                                $('#CustomerAddModal').modal('hide');
                                                BindCustomerDropdown();
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
                                alertify.error('Please enter contact number');
                            }
                        }
                        else {
                            alertify.error('Please enter email id');
                        }
                    }
                    else {
                        alertify.error('Please enter state');
                    }

                }
                else {
                    alertify.error('Please enter city');
                }
            }
            else {
                alertify.error('Please enter company name');
            }
        }
        else {
            alertify.error('Please select any customer type');
        }
    }
    else {
        alertify.error('Please enter customer name');
    }
}

function AddNewCustomer() {
    $('#txtCustomerName').val('');
    $('#ddlCustomerType').val('');
    $('#txtCompanyName').val('');
    $('#ddlCity').val('');
    $('#ddlState').val('');
    $('#txtEmail').val('');
    $('#txtMobile').val('');
    $('#CustomerAddModal').modal('show');
    $('.modal-backdrop').remove();
}



function FetchManufactureOrderMasterDetails(ManufactureId) {

    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/FetchManufactureOrderMasterDetails',
        data: JSON.stringify({
            "ManufactureId": ManufactureId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            ClearAll();
            $('#divManufactureOrderList').hide();
            $('#divManufactureOrderEntry').show();
            $('#divManufactureOrderDetails').show();
            $('#btnSave').show();
            $('#btnExport').hide();
            $('#btnView').show();

            $('#ddlMaterialName').val(data[0].MaterialMasterId);
            $('#txtQty').val(data[0].Qty);
            $('#hdnSalesOrderId').val(data[0].SalesOrderId);
            $('#lblUnitMeasure').text(data[0].UnitMesure);
            $('#ddlCustomer').val(data[0].CustomerId);
            $('#ddlBranch').val(data[0].BranchCode);
            $('#ddlWarehouse').val(data[0].WareHouseId);
            var dtScheduleDate = new Date(data[0].ScheduleDate);
            document.getElementById("txtScheduleDate").valueAsDate = dtScheduleDate;

            $('#hdnSalesOrderId').val(data[0].SalesOrderId);
            $('#hdnManufactureOrderId').val(data[0].ManufactureId);

            $('#txtSalesOrderId').val(data[0].SalesOrderId);
            $('#txtManufactureId').val(data[0].ManufactureId);

            if (data[0].IsDone == "1") {
                $('#btnSave').hide();
                $('#btnDone').hide();
            } else if (data[0].IsDone == "2") {
                $('#btnDone').show();
            }

            if ($('#hdnSalesOrderId').val() != '') {
                $('#ddlMaterialName').attr('readonly', 'readonly');
                $('#txtQty').attr('readonly', 'readonly');
            }


            BindFormulaDropdown(data[0].BOMId);
            
            setTimeout(function () {
                $('#ddlFormula').val(data[0].BOMFormulaId);
                if (data[0].BOMFormulaId != "0") {
                    FetchBOMDetailsList(2, '');
                    $('#hdnFormulaRequired').val('1');
                }
                else {
                    FetchBOMDetailsList(1, data[0].MaterialMasterId);
                }
            }, 1500);


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function AddManufactureOrder() {
    var chk = 1;
    if ($('#hdnFormulaRequired').val() == '1') {
        if ($("#ddlFormula").val() == '' || $("#ddlFormula").val() == null) {
            chk = 0;
        }
    }
    if ($('#ddlMaterialName').val() != '') {
        if ($('#txtScheduleDate').val() != '') {
            if ($('#txtQty').val() != '') {
                if (chk==1) {

                    if ($('#ddlCustomer').val() != '') {
                        if ($('#ddlBranch').val() != '') {
                            if ($('#ddlWarehouse').val() != '' && $('#ddlWarehouse').val() != null) {
                            var indent_details = '';
                            $('#tbody_ManufactureOrderDetails tr').each(function (index1, tr) {
                                
                                    $(tr).find('td').each(function (index, td) {
                                        if (index1 == 0) {
                                            if (indent_details == '') {
                                                if (index == 0) {
                                                    indent_details = td.outerText;
                                                }

                                            }
                                            else {
                                                if (index == 2) {
                                                    indent_details = indent_details + '|' + td.outerText;
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


                                        }
                                    });
                            });

                            if (indent_details != '') {

                                $.ajax({
                                    type: "POST",
                                    url: 'wfSdManufactureOrder.aspx/AddManufactureOrder',
                                    data: JSON.stringify({
                                        "ManufactureOrderId": $('#hdnManufactureOrderId').val(),
                                        "MaterialId": $('#ddlMaterialName').val(),
                                        "ScheduleDate": $('#txtScheduleDate').val(),
                                        "Qty": $('#txtQty').val(),
                                        "ManufactureOrder_details": indent_details,
                                        "BOMMasterId": $('#ddlFormula').val(),
                                        "CustomerId": $('#ddlCustomer').val(),
                                        "BranchCode": $('#ddlBranch').val(),
                                        "Warehouse": $('#ddlWarehouse').val(),
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
                                            if ($('#hdnSalesOrderId').val() == '') {
                                                ClearAll();
                                            }
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
                                alertify.error('Please add Manufacture Order Lines');
                                }
                            }
                            else {
                                alertify.error('Please select any warehouse');
                            }
                        }
                        else {
                            alertify.error('Please select any Branch');
                        }
                    }
                    else {
                        alertify.error('Please select any Customer');
                    }

                }
                else {
                    alertify.error('Please select any Formula');
                }
            }
            else {
                alertify.error('Please enter quantity');
            }
        }
        else {
            alertify.error('Please select any Schedule Date');
        }
    }
    else {
        alertify.error('Please select any Material');
    }
}


function UpdateManufactureAndStockStatus() {
    $.ajax({
        type: "POST",
        url: 'wfSdManufactureOrder.aspx/UpdateManufactureStatusAndStock',
        data: JSON.stringify({
            "ManufactureOrderId": $('#hdnManufactureOrderId').val(),
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
                $('#btnSave').hide();
                $('#btnDone').hide();
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



function AddCustomerType() {
    $('#txtCustomerType').val('');
    $('#CustomerTypeAddModal').modal('show');
    $('.modal-backdrop').remove();
}

function AddNewCustomerType() {

    if ($('#txtCustomerType').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrder.aspx/AddCustomerType',
            data: JSON.stringify({
                "CustomerType": $('#txtCustomerType').val().trim()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var str = "success";
                if (response.d.indexOf(str) != -1) {
                    alertify.success(response.d);

                    $('#txtCustomerType').val('');
                    $('#CustomerTypeAddModal').modal('hide');
                    BindCustomerTypeDropdown();
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
        alertify.error('Please enter customer type');
    }

}


function CloseCustomerTypeModal() {
    $('#CustomerTypeAddModal').modal('hide');
}
