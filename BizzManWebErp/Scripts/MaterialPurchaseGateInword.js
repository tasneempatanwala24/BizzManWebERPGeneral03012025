
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
   // $('#ddlWarehouse').select2();
    $('#ddlVendor').select2();
    $('#ddlOrder').select2();
    $('#tblMaterialPurchaseGateInwordDetails').DataTable();
    BindWarehouseDropdown();
    BindVendorDropdown();
    
    BindMaterialPurchaseGateInwordList();


    $(".dat").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");

    $('#txtGateInTime').timepicker();
    $('#txtGateOutTime').timepicker();
});
var loanAppId = "";
function ViewFile() {
    if (loanAppId) {
        window.open("wfMmMaterialPurchaseGateInword_display.aspx?id=" + loanAppId);
    }
}


function CreateMaterialPurchaseGateInword() {
    $('#divMaterialPurchaseGateInwordList').hide();
    $('#divMaterialPurchaseGateInwordEntry').show();
    $('#divMaterialPurchaseOrderMasterDetails').show();
    $('#divMaterialPurchaseGateInwordDetailsList').hide();
    $('#btnSave').show();
    $('#btnExport').hide();
    $("#btnViewFile").hide();
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
}

function ViewMaterialPurchaseGateInwordList() {
    $('#divMaterialPurchaseGateInwordList').show();
    $('#divMaterialPurchaseGateInwordEntry').hide();
    $('#divMaterialPurchaseGateInwordDetailsList').show();
    $('#divMaterialPurchaseOrderMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    $('#tblMaterialPurchaseGateInwordDetails').DataTable().clear();
    $('#tblMaterialPurchaseGateInwordDetails').DataTable().destroy();
    $('#tbody_MaterialPurchaseGateInwordDetails').html('');
    $('#tblMaterialPurchaseGateInwordDetails').DataTable();
    $("#btnViewFile").hide();
    BindMaterialPurchaseGateInwordList();
}



function ClearAll() {
    $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
  //  $('#ddlWarehouse').select2('destroy');
    $('#ddlWarehouse').val('');
   // $('#ddlWarehouse').select2();
    $('#ddlOrder').select2('destroy');
    $('#ddlOrder').val('');
    $('#ddlOrder').select2();

    $('#txtEntryDate').val('');
    $('#txtBranch').val('');
    $('#ddlVendor').select2('destroy');
    $('#ddlVendor').val('');
    $('#ddlVendor').select2();

    $('#txtGateInTime').val('');
    $('#txtGateInTime').timepicker('remove');
    $('#txtGateInTime').timepicker();
    $('#txtGateInTime').val('');

    $('#txtGateOutTime').val('');
    $('#txtGateOutTime').timepicker('remove');
    $('#txtGateOutTime').timepicker();
    $('#txtGateOutTime').val('');

    $('#txtPONo').val('');
    $('#txtTransporter').val('');
    $('#txtChallanNo').val('');
    $('#txtVehicleNo').val('');
    $('#txtDeliveryTerm').val('');
    $('#txtPaymentTerm').val('');
    $('#txtDeadlineDate').val('');
}

  

function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGateInword.aspx/VendorList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlVendor').select2('destroy');
            $('#ddlVendor').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Vendor-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].VendorName + "</option>";
            }
            $('#ddlVendor').append(req);
            $('#ddlVendor').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function BindPurchaseOrderDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGateInword.aspx/PurchaseOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            "VendorId": $('#ddlVendor').val()
        }),
        success: function (response) {
            $('#ddlOrder').select2('destroy');
            $('#ddlOrder').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Order-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + "</option>";
            }
            $('#ddlOrder').append(req);
            $('#ddlOrder').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function BindWarehouseDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGateInword.aspx/WarehouseList',
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




function BindMaterialPurchaseGateInwordList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGateInword.aspx/FetchMaterialPurchaseGateInwordList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGateInwordList').DataTable().clear();
            $('#tblMaterialPurchaseGateInwordList').DataTable().destroy();
            $('#tbody_MaterialPurchaseGateInword_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + data[i].Id + '</td><td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + data[i].InwardEntryDate + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].OrderId != undefined ? data[i].OrderId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].VehicleNo != undefined ? data[i].VehicleNo : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].DeadlineDate != undefined ? data[i].DeadlineDate : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].ChallanNo != undefined ? data[i].ChallanNo : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].GateInTime != undefined ? data[i].GateInTime : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGateInwordDetails(\'' + data[i].Id + '\');">' + (data[i].GaeOutTime != undefined ? data[i].GaeOutTime : '') + '</td></tr>';
                
            }
            $('#tbody_MaterialPurchaseGateInword_List').html(html);
            // $('#tblMaterialPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblMaterialPurchaseGateInwordList').DataTable({
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

            $('#tblMaterialPurchaseGateInwordList tbody').on('change', 'input[type="checkbox"]', function () {
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



function FetchMaterialPurchaseGateInwordDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGateInword.aspx/FetchPurchaseGateInwordDetails',
        data: JSON.stringify({
            "PurchaseGateInwordId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGateInwordDetails').DataTable().clear();
            $('#tblMaterialPurchaseGateInwordDetails').DataTable().destroy();
            $('#tbody_MaterialPurchaseGateInwordDetails').html('');
            $("#btnViewFile").show();
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].QtyReceive != undefined ? data[i].QtyReceive : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td>' + (data[i].TotalAmt != undefined ? data[i].TotalAmt : '') + '</td>'
                    + '<td>' + (data[i].WarehouseName != undefined ? data[i].WarehouseName : '') + '</td></tr>';
                loanAppId = id;
            }
            $('#tbody_MaterialPurchaseGateInwordDetails').html(html);
            $('#tblMaterialPurchaseGateInwordDetails').DataTable();
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function DownloadFile() {
    var chk = 0;
    var GateInwordid = '';
    $('#tbody_MaterialPurchaseGateInword_List tr').each(function (index1, tr) {
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
                    if (GateInwordid == '') {
                        GateInwordid = td.outerText;
                    }
                    else {
                        GateInwordid = GateInwordid + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (GateInwordid != '') {
        $.ajax({
            type: "POST",
            url: "wfMmMaterialPurchaseGateInword.aspx/FetchMaterialPurchaseGateInwordListDownload",
            data: JSON.stringify({
                "GateInwordid": GateInwordid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaPurchaseGateInword_' + d.toDateString() + '.xlsx';
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


function FetchPurchaseOrderDetails() {
    if ($('#ddlOrder').val() != '') {
        FetchPurchaseOrderMasterDetails();
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseGateInword.aspx/FetchPurchaseOrderDetails',
            data: JSON.stringify({
                "OrderId": $('#ddlOrder').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
                var warehouseHtml = $('#td_warehouse').html();
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td style="display:none;">' + data[i].Id + '</td><td>' + data[i].MaterialName + '</td>'
                        + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : '') + '</td>'
                        + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                        + '<td>' + (data[i].QtyReceive != undefined ? data[i].QtyReceive : '') + '</td>'
                        + '<td>' + (data[i].BalanceQty != undefined ? data[i].BalanceQty : '') + '</td>'
                        + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                        + '<td><input type="number" class="form-control" /></td>'
                        + '<td>' + warehouseHtml +'</td></tr>';
                }
                $('#tbody_MaterialPurchaseOrderMasterDetails').html(html);

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        alertify.error("Please select any order");
    }
}

function FetchPurchaseOrderMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGateInword.aspx/FetchPurchaseOrderMasterDetails',
        data: JSON.stringify({
            "OrderId": $('#ddlOrder').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtBranch').val(data[0].BranchName);
           // $('#txtVendor').val(data[0].VendorName);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function AddMaterialPurchaseGateInword() {

    var order_detail_id = '';
    var order_details = '';
    var chk = 0;
    var orderQty = '';
    $('#tbody_MaterialPurchaseOrderMasterDetails tr').each(function (index1, tr) {
        order_detail_id = '';
        chk = 0;
        orderQty = '';
        $(tr).find('td').each(function (index, td) {
            if (index == 0) {
                order_detail_id = td.outerText;

            }

            if (index == 7) {
                if ($(td.children[0]).val() != '') {
                    if ($(td.children[0]).val() != '0') {
                        chk = 1;
                        orderQty = order_detail_id + '_' + $(td.children[0]).val();

                    }
                    else {
                        chk = 0;
                    }
                }

            }
            if (index == 8) {
                if (chk == 1) {
                    if ($(td.children[0]).val() != '') {
                        if (order_details == '') {
                            order_details = orderQty + '|' + $(td.children[0]).val();
                        }
                        else {
                            order_details = order_details + ',' + orderQty + '|' + $(td.children[0]).val();
                        }

                    }
                    else {
                        chk = 0;
                    }
                }
            }
        });
    });

    
    if ($('#txtEntryDate').val() != '') {
        if ($('#ddlVendor').val() != '') {
            if ($('#ddlOrder').val() != '') {
                //if ($('#ddlWarehouse').val() != '') {
                if (order_details != '') {
                    if ($('#txtDeadlineDate').val() != '') {
                        if ($('#txtGateInTime').val() != '') {
                            if ($('#txtGateOutTime').val() != '') {
                                $.ajax({
                                    type: "POST",
                                    url: 'wfMmMaterialPurchaseGateInword.aspx/AddMaterialPurchaseGateInword',
                                    data: JSON.stringify({
                                        "OrderID": $('#ddlOrder').val(),
                                        "EntryDate": $('#txtEntryDate').val(),
                                        "Warehouse": '0',
                                        "order_details": order_details,
                                        "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                                        "DeadlineDate": $('#txtDeadlineDate').val(),
                                        "PONo": $('#txtPONo').val(),
                                        "Transporter": $('#txtTransporter').val(),
                                        "ChallanNo": $('#txtChallanNo').val(),
                                        "VehicleNo": $('#txtVehicleNo').val(),
                                        "GateInTime": $('#txtGateInTime').val(),
                                        "GateOutTime": $('#txtGateOutTime').val(),
                                        "DeliveryTerm": $('#txtDeliveryTerm').val(),
                                        "PaymentTerm": $('#txtPaymentTerm').val()
                                    }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    beforeSend: function () {

                                    },
                                    success: function (response) {
                                        var str = "success";
                                        if (response.d.indexOf(str) != -1) {
                                            alertify.success(response.d);
                                            ClearAll();
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
                                alertify.error('Please enter gate out time');
                            }
                        }
                        else {
                            alertify.error('Please enter gate in time');
                        }
                    }
                    else {
                        alertify.error('Please enter deadline date');
                    }
                }
                else {
                    alertify.error('Please enter receive quantity and warehouse on order details list');
                }
                //}
                //else {
                //    alertify.error('Please select any warehouse');
                //}
            }
            else {
                alertify.error('Please select any order');
            }
        }
        else {
            alertify.error('Please select any vendor');
        }
    }
    else {
        alertify.error('Please enter entry date');
    }
}