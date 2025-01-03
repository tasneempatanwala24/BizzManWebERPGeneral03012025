$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindSalesOrderDropdown();
    BindDeliveryOrderMasterList();
    $('#tblSalesOrderDeliveryOrderList').DataTable();
    $('#tblSalesOrderDeliveryOrderDetails').DataTable();
    $('#txtDeliveryTime').timepicker();
});



function BindSalesOrderDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderDelivery.aspx/SalesOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlSalesOrderId').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Sales Order-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].SalesOrderId + "'>" + JSON.parse(response.d)[i].SalesOrderId + "</option>";
            }
            $('#ddlSalesOrderId').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}



function ViewDeliveryOrderList() {
    $('#divDeliveryOrderList').show();
    $('#divDeliveryOrderEntry').hide();
    $('#divDeliveryOrderDetails').hide();
   // $('#btnExport').show();
    $('#btnDone').hide();
   // $('#btnCancel').hide();
    BindDeliveryOrderMasterList();
}

function CreateSalesOrderDelivery() {
    ClearAll();
    $('#btnDone').show();
    $('#btnView').show();
    $('#divDeliveryOrderList').hide();
    $('#divDeliveryOrderEntry').show();
    $('#divDeliveryOrderDetails').show();
}


function ClearAll() {

    $('#txtSalesOrderId').val('');
    $('#txtCustomerName').val('');
    $('#txtQuotationDate').text('');
    $('#txtExpirationDate').val('');
    $('#txtPaymentTerms').val('');
    $('#txtTotalAmount').val('');

    $('#tblSalesOrderDeliveryOrderList').DataTable().clear();
    $('#tblSalesOrderDeliveryOrderList').DataTable().destroy();
    $('#tbody_SalesOrderDeliveryOrder_List').html('');
    $('#tblSalesOrderDeliveryOrderList').DataTable();

    $('#tblSalesOrderDeliveryOrderDetails').DataTable().clear();
    $('#tblSalesOrderDeliveryOrderDetails').DataTable().destroy();
    $('#tbody_SalesOrderDeliveryOrder_Details').html('');
    $('#tblSalesOrderDeliveryOrderDetails').DataTable();

}




function BindDeliveryOrderMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderDelivery.aspx/FetchDeliveryOrderMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblDeliveryOrderList').DataTable().clear();
            $('#tblDeliveryOrderList').DataTable().destroy();
            $('#tbody_DeliveryOrder_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
               // html = html + '<tr><td><input type="checkbox" class="editor-active"></td><td style="white-space: nowrap;" onclick="FetchDeliveryOrderMasterDetails(\'' + data[i].SalesOrderId + '\');">' + data[i].SalesOrderId + '</td>'
                html = html + '<tr><td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetails(\'' + data[i].SalesOrderId + '\');">' + data[i].SalesOrderId + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetails(\'' + data[i].SalesOrderId + '\');">' + (data[i].CustomerName != undefined ? data[i].CustomerName : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetails(\'' + data[i].SalesOrderId + '\');">' + (data[i].QuotationDate != undefined ? data[i].QuotationDate : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetails(\'' + data[i].SalesOrderId + '\');">' + (data[i].ExpirationDate != undefined ? data[i].ExpirationDate : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetails(\'' + data[i].SalesOrderId + '\');">' + (data[i].PaymentTerms != undefined ? data[i].PaymentTerms : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetails(\'' + data[i].SalesOrderId + '\');">' + (data[i].TotalAmount != undefined ? data[i].TotalAmount : '') + '</td>'
            }
            $('#tbody_DeliveryOrder_List').html(html);
            $('#tblDeliveryOrderList').DataTable();
            //$('#tbody_DeliveryOrder_List').html(html);
            //var d = new Date();
            //var table = $('#tblDeliveryOrderList').DataTable({
            //    'columnDefs': [
            //        {
            //            'targets': 0,
            //            'checkboxes': {
            //                'selectRow': true
            //            }
            //        }
            //    ],
            //    'select': {
            //        'style': 'multi'
            //    },
            //    fixedHeader: {
            //        header: true
            //    }
            //});

            //$('#example-select-all').on('click', function () {
            //    // Check/uncheck all checkboxes in the table
            //    var rows = table.rows({ 'search': 'applied' }).nodes();
            //    $('input[type="checkbox"]', rows).prop('checked', this.checked);


            //});

            //$('#tbody_DeliveryOrder_List tbody').on('change', 'input[type="checkbox"]', function () {
            //    // If checkbox is not checked

            //    if (!this.checked) {
            //        var el = $('#example-select-all').get(0);
            //        // If "Select all" control is checked and has 'indeterminate' property
            //        if (el && el.checked && ('indeterminate' in el)) {
            //            // Set visual state of "Select all" control 
            //            // as 'indeterminate'
            //            el.indeterminate = true;
            //        }
            //    }



            //});

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchDeliveryOrderDetails(SalesOrderId) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderDelivery.aspx/FetchDeliveryOrderDetails',
        data: JSON.stringify({
            "SalesOrderId": SalesOrderId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblSalesOrderDeliveryOrderList').DataTable().clear();
            $('#tblSalesOrderDeliveryOrderList').DataTable().destroy();
            $('#tbody_SalesOrderDeliveryOrder_List').html('');

            $('#tblSalesOrderDeliveryOrderDetails').DataTable().clear();
            $('#tblSalesOrderDeliveryOrderDetails').DataTable().destroy();
            $('#tbody_SalesOrderDeliveryOrder_Details').html('');
            $('#tblSalesOrderDeliveryOrderDetails').DataTable();

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetailsList(\'' + data[i].SalesOrderDeliveryId + '\');">' + data[i].SalesOrderDeliveryId + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetailsList(\'' + data[i].SalesOrderDeliveryId + '\');">' + (data[i].DeliveryDate != undefined ? data[i].DeliveryDate : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetailsList(\'' + data[i].SalesOrderDeliveryId + '\');">' + (data[i].DeliveryTime != undefined ? data[i].DeliveryTime : '') + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchDeliveryOrderDetailsList(\'' + data[i].SalesOrderDeliveryId + '\');">' + (data[i].TransportNo != undefined ? data[i].TransportNo : '') + '</td>'
            }
            $('#tbody_SalesOrderDeliveryOrder_List').html(html);
            $('#tblSalesOrderDeliveryOrderList').DataTable();
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchDeliveryOrderDetailsList(SalesOrderDeliveryId) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderDelivery.aspx/FetchDeliveryOrderDetailsList',
        data: JSON.stringify({
            "SalesOrderDeliveryId": SalesOrderDeliveryId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblSalesOrderDeliveryOrderDetails').DataTable().clear();
            $('#tblSalesOrderDeliveryOrderDetails').DataTable().destroy();
            $('#tbody_SalesOrderDeliveryOrder_Details').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td style="white-space: nowrap;">' + data[i].MaterialName + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].MaterialQty != undefined ? data[i].MaterialQty : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].MRP != undefined ? data[i].MRP : '') + '</td>'
            }
            $('#tbody_SalesOrderDeliveryOrder_Details').html(html);
            $('#tblSalesOrderDeliveryOrderDetails').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function DownloadFile() {
    var chk = 0;
    var SalesOrderId = '';
    $('#tbody_DeliveryOrder_List tr').each(function (index1, tr) {
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
                    if (SalesOrderId == '') {
                        SalesOrderId = td.outerText;
                    }
                    else {
                        SalesOrderId = SalesOrderId + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (SalesOrderId != '') {
        $.ajax({
            type: "POST",
            url: "wfSdSalesOrderDelivery.aspx/FetchDeliveryOrderListDownload",
            data: JSON.stringify({
                "SalesOrderId": SalesOrderId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'DeliveryOrder_' + d.toDateString() + '.xlsx';
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

function FetchDeliveryOrderMasterDetails() {

    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderDelivery.aspx/FetchDeliveryOrderMasterDetails',
        data: JSON.stringify({
            "SalesOrderId": $('#ddlSalesOrderId').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            

            $('#txtCustomerName').val(data[0].CustomerName);
            $('#txtQuotationDate').val(data[0].QuotationDate);
            $('#txtPaymentTerms').val(data[0].PaymentTerms);
            $('#txtTotalAmount').val(data[0].TotalAmount);

            FetchDeliveryProductDetailsList($('#ddlSalesOrderId').val());
            

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function FetchDeliveryProductDetailsList(SalesOrderId) {

    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderDelivery.aspx/FetchDeliveryProductDetailsList',
        data: JSON.stringify({
            "SalesOrderId": SalesOrderId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tbody_DeliveryOrderDetails').html('');
            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_DeliveryOrderDetails').append('<tr>'
                    + '<td style="display:none;">' + data[i].MaterialId + '</td>'
                    + '<td>' + (data[i].ManufactureId != undefined ? data[i].ManufactureId : '') + '</td>'
                    + '<td>' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td>' + data[i].MaterialName + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td>' + data[i].AvailableQty + '</td>'
                    + '<td>' + data[i].DeliveredQty + '</td>'
                    + '<td><input type="number" class="form-control" /></td>'
                    + '</tr>');
            }




        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}


function UpdateDeliveryAndStockStatus() {
    alertify.confirm('Confirm Order Delivery', 'Are you sure, you want to confirm sales order delivery?', function () {

        var order_detail_id = '';
        var order_details = '';
        $('#tbody_DeliveryOrderDetails tr').each(function (index1, tr) {
            order_detail_id = '';
            chk = 0;
            orderQty = '';
            $(tr).find('td').each(function (index, td) {
                if (index == 0) {
                    order_detail_id = td.outerText;

                }


                if (index == 8) {
                    if ($(td.children[0]).val() != '') {
                        if (order_details == '') {
                            order_details = order_detail_id + '_' + $(td.children[0]).val();
                        }
                        else {
                            order_details = order_details + '@' + order_detail_id + '_' + $(td.children[0]).val();
                        }

                    }

                }
            });
        });
        if ($('#ddlSalesOrderId').val() != "") {
            if ($('#txtTransportNo').val() != "") {
                if ($('#txtDeliveryDate').val() != "") {
                    if ($('#txtDeliveryTime').val() != "") {
                        if (order_details != '') {
                            $.ajax({
                                type: "POST",
                                url: 'wfSdSalesOrderDelivery.aspx/UpdateDeliveryAndStockStatus',
                                data: JSON.stringify({
                                    "SalesOrderId": $('#ddlSalesOrderId').val(),
                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                                    "order_details": order_details,
                                    "TransportNo": $('#txtTransportNo').val(),
                                    "DeliveryDate": $('#txtDeliveryDate').val(),
                                    "DeliveryTime": $('#txtDeliveryTime').val()
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function () {

                                },
                                success: function (response) {
                                    var str = "success";
                                    if (response.d.indexOf(str) != -1) {
                                        alertify.success(response.d);
                                        ViewDeliveryOrderList();
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
                            alertify.error("Please enter delivery order line details");
                        }
                    }
                    else {
                        alertify.error("Please select delivery time");
                    }
                }
                else {
                    alertify.error("Please select delivery date");
                }
            }
            else {
                alertify.error("Please enter transport number");
            }
        }
        else {
            alertify.error("Please select any sales order");
        }
    }
        , function () {

        });

}


function CancelDelivery() {
    alertify.confirm('Cancel Order Delivery', 'Are you sure, you want to cancel sales order delivery?', function () {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrderDelivery.aspx/CancelDelivery',
            data: JSON.stringify({
                "SalesOrderId": $('#txtSalesOrderId').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var str = "success";
                if (response.d.indexOf(str) != -1) {
                    alertify.success(response.d);
                    ViewDeliveryOrderList();
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
        , function () {

        });

}