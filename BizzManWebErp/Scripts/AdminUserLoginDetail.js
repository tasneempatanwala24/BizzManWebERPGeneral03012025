$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#divAdminUserLoginDetailList').show();
    BindwfAdminUserLoginDetailList();
   
   
});


function BindwfAdminUserLoginDetailList() {

    $.ajax({
        type: "POST",
        url: 'wfAdminUserLoginDetail.aspx/FetchAdminLoginList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblAdminUserLoginDetailList').DataTable().clear();
            $('#tblAdminUserLoginDetailList').DataTable().destroy();
            $('#tbody_AdminUserLoginDetailList').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_BOM_list"></td><td style="display:none;">' + data[i].Id + '</td>'
                    + '<td>' + (data[i].UserId != undefined ? data[i].UserId : '') + '</td>'
                    + '<td>' + (data[i].FormattedLoginDate != undefined ? data[i].FormattedLoginDate : '') + '</td>'
                    + '<td>' + (data[i].LoginTime != undefined ? data[i].LoginTime : '') + '</td>'
                    + '<td>' + (data[i].IpDetail != undefined ? data[i].IpDetail : 0) + '</td></tr>';
            }


            $('#tbody_AdminUserLoginDetailList').html(html);
            //$('#tblWorkCenterDetailsList').DataTable();

            var d = new Date();
            var table = $('#tblAdminUserLoginDetailList').DataTable({
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

            $('#tbody_AdminUserLoginDetailList tbody').on('change', 'input[type="checkbox"]', function () {
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
    var BOMid = '';
    $('#tbody_AdminUserLoginDetailList tr').each(function (index1, tr) {
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
            url: "wfAdminUserLoginDetail.aspx/FetchAdminLoginDetailListDownload",
            data: JSON.stringify({
                "id": BOMid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'AdminLoginDetail_' + d.toDateString() + '.xlsx';
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