
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlVendor').select2();
    $('#tblMaterialPurchaseGrnInvoiceEntryDetails').DataTable();
    BindVendorDropdown();
    BindMaterialPurchaseGrnInvoiceList();


    $(".dat").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
});



function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnInvoiceEntry.aspx/VendorList',
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




function CreateMaterialPurchaseGrnInvoiceEntry() {
    $('#divMaterialPurchaseGrnInvoiceEntryList').hide();
    $('#divMaterialPurchaseGrnInvoiceEntryDetailsList').hide();
    $('#divMaterialPurchaseGrnInvoiceEntry').show();
    $('#divMaterialPurchaseGRNMasterList').show();
    $('#divMaterialPurchaseGRNMasterDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();

    ClearAll();
}

function ViewMaterialPurchaseGrnInvoiceEntryList() {
    $('#divMaterialPurchaseGrnInvoiceEntryList').show();
    $('#divMaterialPurchaseGrnInvoiceEntryDetailsList').show();
    $('#divMaterialPurchaseGrnInvoiceEntry').hide();
    $('#divMaterialPurchaseGRNMasterList').hide();
    $('#divMaterialPurchaseGRNMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindMaterialPurchaseGrnInvoiceList();
}



function ClearAll() {
    $('#tbody_MaterialPurchaseGRNMasterList').html('');
    $('#tbody_MaterialPurchaseGRNMasterDetails').html('');
    $('#ddlVendor').select2('destroy');
    $('#ddlVendor').val('');
    $('#ddlVendor').select2();
    $('#txtEntryDate').val('');
    $('#txtGRNId').val('');

}

function BindMaterialPurchaseGrnInvoiceList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnInvoiceEntry.aspx/FetchMaterialPurchaseGrnInvoiceList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGrnInvoiceEntryList').DataTable().clear();
            $('#tblMaterialPurchaseGrnInvoiceEntryList').DataTable().destroy();
            $('#tbody_MaterialPurchaseGrnInvoiceEntry_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + data[i].Id + '</td><td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + data[i].GrnEntryDate + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + (data[i].OrderId != undefined ? data[i].OrderId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + (data[i].GateInwardMasterId != undefined ? data[i].GateInwardMasterId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + (data[i].PurchaseGrnMasterId != undefined ? data[i].PurchaseGrnMasterId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnInvoiceDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseGrnInvoiceEntry_List').html(html);
            // $('#tblMaterialPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblMaterialPurchaseGrnInvoiceEntryList').DataTable({
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

            $('#tbody_MaterialPurchaseGrnInvoiceEntry_List tbody').on('change', 'input[type="checkbox"]', function () {
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


function FetchMaterialPurchaseGrnInvoiceDetails(id) {

    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnInvoiceEntry.aspx/FetchMaterialPurchaseGrnInvoiceDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGrnInvoiceEntryDetails').DataTable().clear();
            $('#tblMaterialPurchaseGrnInvoiceEntryDetails').DataTable().destroy();
            $('#tbody_MaterialPurchaseGrnInvoiceEntryDetails').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td>' + data[i].MaterialName + '</td>'
                    + '<td>' + (data[i].InvoiceQty != undefined ? data[i].InvoiceQty : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td>' + (data[i].TotalAmt != undefined ? data[i].TotalAmt : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseGrnInvoiceEntryDetails').html(html);
            $('#tblMaterialPurchaseGrnInvoiceEntryDetails').DataTable();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function DownloadFile() {
    var chk = 0;
    var Grnid = '';
    $('#tbody_MaterialPurchaseGrnInvoiceEntry_List tr').each(function (index1, tr) {
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
                    if (Grnid == '') {
                        Grnid = td.outerText;
                    }
                    else {
                        Grnid = Grnid + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (Grnid != '') {
        $.ajax({
            type: "POST",
            url: "wfMmMaterialPurchaseGrnInvoiceEntry.aspx/FetchMaterialPurchaseGrnInvoiceListDownload",
            data: JSON.stringify({
                "GrnInvoiceid": Grnid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaPurchaseGrnInvoice_' + d.toDateString() + '.xlsx';
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


function FetchPurchaseGRNDetails() {
    if ($('#ddlVendor').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseGrnInvoiceEntry.aspx/FetchMaterialPurchaseGRNList',
            data: JSON.stringify({
                "vendorid": $('#ddlVendor').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                $('#tbody_MaterialPurchaseGRNMasterList').html('');
                $('#tbody_MaterialPurchaseGRNMasterDetails').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr>'
                        + '<td onclick="FetchMaterialPurchaseGRNMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].Id != undefined ? data[i].Id : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGRNMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].GrnEntryDate != undefined ? data[i].GrnEntryDate : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGRNMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].GateInwardMasterId != undefined ? data[i].GateInwardMasterId : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGRNMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGRNMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td></tr>';
                }
                $('#tbody_MaterialPurchaseGRNMasterList').html(html);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        alertify.error('Please select any vendor')
    }
}



function FetchMaterialPurchaseGRNMasterDetails(id, ele) {
    $('#txtGRNId').val(id);
    FetchPurchaseGRNMasterDetailList(id);

}


function FetchPurchaseGRNMasterDetailList(id) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnInvoiceEntry.aspx/FetchPurchaseGRNMasterDetailList',
        data: JSON.stringify({
            "GRNMasterId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tbody_MaterialPurchaseGRNMasterDetails').html('');
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr class="tr_' + id + '">'
                    + '<td style="display:none;">' + (data[i].Id != undefined ? data[i].Id : '') + '</td>'
                    + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].QtyStockEntry != undefined ? data[i].QtyStockEntry : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td>' + (data[i].QtyStockEntryInvoice != undefined ? data[i].QtyStockEntryInvoice : '') + '</td>'
                    + '<td>' + (data[i].BalanceQty != undefined ? data[i].BalanceQty : '') + '</td>'
                    + '<td>' + (data[i].WareHouse != undefined ? data[i].WareHouse : '') + '</td>'
                    + '<td><input type="number" class="form-control RcvQty" /></td>'
                    + '<td><input type="text" class="form-control descptn" /></td></tr>';
            }
            $('#tbody_MaterialPurchaseGRNMasterDetails').html(html);


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function AddMaterialPurchaseGrnInvoiceEntry() {

    var order_detail_id = '';
    var order_details = '';
    var chk = 0;
    var orderQty = '';
   

    $('#tbody_MaterialPurchaseGRNMasterDetails tr').each(function (index1, tr) {
        order_detail_id = '';
        chk = 0;
        orderQty = '';
        $(tr).find('td').each(function (index, td) {
            if (index == 0) {
                order_detail_id = td.outerText;

            }

            if (index == 9) {
                if ($(td.children[0]).val() != '') {
                    chk = 1;
                    orderQty = order_detail_id + '_' + $(td.children[0]).val();


                }

            }
            if (index == 10) {
                if (chk == 1) {
                    if (order_details == '') {
                        order_details = orderQty + '|' + $(td.children[0]).val();
                    }
                    else {
                        order_details = order_details + ',' + orderQty + '|' + $(td.children[0]).val();
                    }

                    
                }
            }
            

        });
    });



    if ($('#txtEntryDate').val() != '') {
        if ($('#ddlVendor').val() != '') {
            //if ($('#ddlWarehouse').val() != '') {
                if (order_details != '') {

                    $.ajax({
                        type: "POST",
                        url: 'wfMmMaterialPurchaseGrnInvoiceEntry.aspx/AddMaterialPurchaseGrnInvoiceEntry',
                        data: JSON.stringify({
                            "VendorId": $('#ddlVendor').val(),
                            "EntryDate": $('#txtEntryDate').val(),
                            "order_details": order_details,
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "GRNId": $('#txtGRNId').val()
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
                    alertify.error('Please enter stock invoice quantity on purchase GRN details list');
                }
            
            //}
            //else {
            //    alertify.error('Please select any warehouse');
            //}
        }
        else {
            alertify.error('Please select any vendor');
        }
    }
    else {
        alertify.error('Please enter entry date');
    }
}