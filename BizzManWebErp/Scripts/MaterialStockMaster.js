
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#tblMaterialStockMasterDetails').DataTable();
   
    BindMaterialStockMasterList();
    var selectedRowsData = [];

    // Handle individual checkbox change event
    $('#tblMaterialStockMasterList tbody').on('change', 'input[type="checkbox"]', function () {
        var rowData = [];
        var row = $(this).closest('tr');
        var rowId = row.find('td').eq(1).text().trim(); // Assuming 'Id' is in the second column

        // Check if checkbox is checked or unchecked
        if (this.checked) {
            // Add the row's data to selectedRowsData
            row.find('td').each(function () {
                rowData.push($(this).text().trim());
            });
            selectedRowsData.push(rowData);
        } else {
            // Remove the data from selectedRowsData based on the row Id
            var rowIndex = selectedRowsData.findIndex(function (row) {
                return row[1] === rowId; // Check by Id (assuming Id is unique)
            });
            if (rowIndex !== -1) {
                selectedRowsData.splice(rowIndex, 1);
            }
        }

        // Update the 'Select All' checkbox state
        updateSelectAllCheckbox();
        console.log(selectedRowsData);
    });

    // Handle 'Select All' checkbox change event (including across all pages)
    $('#example-select-all').on('change', function () {
        var isChecked = this.checked;
        selectedRowsData = [];

        // If 'Select All' is checked, we loop over all rows using DataTables API and add them to selectedRowsData
        var table = $('#tblMaterialStockMasterList').DataTable();

        if (isChecked) {
            // If select all is checked, select all rows across all pages
            table.rows().every(function () {
                var row = this.node(); // Get the row node
                var rowData = [];
                $(row).find('td').each(function () {
                    rowData.push($(this).text().trim());
                });
                selectedRowsData.push(rowData);
                // Check the checkbox for this row
                $(row).find('input[type="checkbox"]').prop('checked', true);
            });
        } else {
            // If unchecked, clear the selected rows data and uncheck the checkboxes
            table.rows().every(function () {
                var row = this.node();
                $(row).find('input[type="checkbox"]').prop('checked', false);
            });
            selectedRowsData = [];
        }

        console.log(selectedRowsData);
    });

    // Update the 'Select All' checkbox state based on the individual checkboxes
    function updateSelectAllCheckbox() {
        var totalCheckboxes = $('#tblMaterialStockMasterList tbody input[type="checkbox"]').length;
        var checkedCheckboxes = $('#tblMaterialStockMasterList tbody input[type="checkbox"]:checked').length;

        // If all checkboxes are checked, set 'Select All' checkbox as checked
        if (totalCheckboxes === checkedCheckboxes) {
            $('#example-select-all').prop('checked', true);
        } else {
            $('#example-select-all').prop('checked', false);
        }
    }

    // Export functionality (same as before)
    $('#btnExport').on('click', function () {
        if (selectedRowsData.length === 0) {
            alertify.error("Please select at least one row to export.");
            return;
        }

        // Create a new workbook
        var wb = XLSX.utils.book_new();

        // Get table headers, excluding the first and last columns
        var headers = [];
        $('#tblMaterialStockMasterList thead th').each(function (index) {
            if (index !== 0 && index !== 1 && index !== $('#tblMaterialStockMasterList thead th').length) {
                headers.push($(this).text().trim());
            }
        });

        // Prepare data to be exported, excluding first and last columns from selected rows
        var ws_data = [headers];

        selectedRowsData.forEach(function (rowData) {
            var row = rowData.slice(2, rowData.length); // Exclude first (checkbox) and last (action) columns
            ws_data.push(row);
        });

        // Create worksheet from selected data
        var ws = XLSX.utils.aoa_to_sheet(ws_data);

        // Apply bold style to the header row (first row)
        const headerStyle = {
            font: { bold: true }
        };

        // Set style for each header cell
        for (let col = 0; col < headers.length; col++) {
            const cellAddress = { c: col, r: 0 }; // Row 0, Column 'col'
            ws[XLSX.utils.encode_cell(cellAddress)] = {
                v: ws_data[0][col], // Value
                s: headerStyle // Apply bold style
            };
        }

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Stock');

        // Write workbook to file
        XLSX.writeFile(wb, 'StockMaster.xlsx');
    });
});


function BindMaterialStockMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialStockMaster.aspx/FetchMaterialStockMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialStockMasterList').DataTable().clear();
            $('#tblMaterialStockMasterList').DataTable().destroy();
            $('#tbody_MaterialStockMaster_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td  style="display:none;">' + data[i].Id + '</td><td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + data[i].TransectionId + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].TransectionType != undefined ? data[i].TransectionType : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].EntryDate != undefined ? data[i].EntryDate : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].WareHouse != undefined ? data[i].WareHouse : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].QtyIn != undefined ? data[i].QtyIn : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].Rate != undefined ? data[i].Rate : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].QtyOut != undefined ? data[i].QtyOut : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].QtyBalance != undefined ? data[i].QtyBalance : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].InvoiceQty != undefined ? data[i].InvoiceQty : '') + '</td>'
                    + '<td onclick="FetchMaterialStockMasterDetails(\'' + data[i].Id + '\');" style="white-space: nowrap;">' + (data[i].InvoiceValue != undefined ? data[i].InvoiceValue : '') + '</td></tr>';
            }
            $('#tbody_MaterialStockMaster_List').html(html);
            // $('#tblMaterialPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblMaterialStockMasterList').DataTable({
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

            $('#tbody_MaterialStockMaster_List tbody').on('change', 'input[type="checkbox"]', function () {
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

function FetchMaterialStockMasterDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialStockMaster.aspx/FetchMaterialStockMasterDetailList',
        data: JSON.stringify({
            "StockId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
           
            $('#tblMaterialStockMasterDetails').DataTable().clear();
            $('#tblMaterialStockMasterDetails').DataTable().destroy();
            $('#tbody_MaterialStockMasterDetails').html('');
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
            $('#tbody_MaterialStockMasterDetails').html(html);
            $('#tblMaterialStockMasterDetails').DataTable();



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
    $('#tbody_MaterialStockMaster_List tr').each(function (index1, tr) {
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
            url: "wfMmMaterialStockMaster.aspx/FetchMaterialStockMasterListDownload",
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
