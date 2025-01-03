
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#tblInventStockMasterDetails').DataTable();

    BindInventStockMasterList();

});


function BindInventStockMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfInventStockReportPutwayRule.aspx/FetchInventStockMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblInventStockMasterList').DataTable().clear();
            $('#tblInventStockMasterList').DataTable().destroy();
            $('#tbody_InventStockMaster_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td  style="display:none;">' + data[i].Id + '</td><td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + data[i].TransectionId + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].TransectionType != undefined ? data[i].TransectionType : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].EntryDate != undefined ? data[i].EntryDate : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].WareHouse != undefined ? data[i].WareHouse : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].QtyIn != undefined ? data[i].QtyIn : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].Rate != undefined ? data[i].Rate : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].QtyOut != undefined ? data[i].QtyOut : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].QtyBalance != undefined ? data[i].QtyBalance : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].InvoiceQty != undefined ? data[i].InvoiceQty : '') + '</td>'
                    + '<td onclick="FetchInventStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].InvoiceValue != undefined ? data[i].InvoiceValue : '') + '</td></tr>';
            }
            $('#tbody_InventStockMaster_List').html(html);
            // $('#tblInventPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblInventStockMasterList').DataTable({
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

            $('#tbody_InventStockMaster_List tbody').on('change', 'input[type="checkbox"]', function () {
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

function FetchInventStockMasterDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfInventStockReportPutwayRule.aspx/FetchInventStockMasterDetailList',
        data: JSON.stringify({
            "StockId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            $('#tblInventStockMasterDetails').DataTable().clear();
            $('#tblInventStockMasterDetails').DataTable().destroy();
            $('#tbody_InventStockMasterDetails').html('');
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td style="white-space: nowrap;">' + data[i].TransectionId + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].TransectionType != undefined ? data[i].TransectionType : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].QtyOut != undefined ? data[i].QtyOut : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Rate != undefined ? data[i].Rate : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td></tr>';
            }
            $('#tbody_InventStockMasterDetails').html(html);
            $('#tblInventStockMasterDetails').DataTable();



        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function DownloadFile() {
    var chk = 0;
    var id = '';
    $('#tbody_InventStockMaster_List tr').each(function (index1, tr) {
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
                    if (id == '') {
                        id = td.outerText;
                    }
                    else {
                        id = id + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (id != '') {
        $.ajax({
            type: "POST",
            url: "wfInventStockReportPutwayRule.aspx/FetchInventStockMasterListDownload",
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaStockMaster_' + d.toDateString() + '.xlsx';
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
