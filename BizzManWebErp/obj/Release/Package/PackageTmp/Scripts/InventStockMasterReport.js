$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindList();
    
    var selectedRowsData = [];

    // Handle individual checkbox change event
    $('#tblMaterialList tbody').on('change', 'input[type="checkbox"]', function () {
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
        var table = $('#tblMaterialList').DataTable();

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
        var totalCheckboxes = $('#tblMaterialList tbody input[type="checkbox"]').length;
        var checkedCheckboxes = $('#tblMaterialList tbody input[type="checkbox"]:checked').length;

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
        $('#tblMaterialList thead th').each(function (index) {
            if (index !== 0 && index !== $('#tblMaterialList thead th').length) {
                headers.push($(this).text().trim());
            }
        });

        // Prepare data to be exported, excluding first and last columns from selected rows
        var ws_data = [headers];

        selectedRowsData.forEach(function (rowData) {
            var row = rowData.slice(1, rowData.length); // Exclude first (checkbox) and last (action) columns
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
        XLSX.utils.book_append_sheet(wb, ws, 'StockReport');

        // Write workbook to file
        XLSX.writeFile(wb, 'StockReport.xlsx');
    });
});

function BindList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfInventStockMasterReport.aspx/FetchList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            setTimeout(function () {
                hideLoader();
                $('#tblMaterialList').DataTable().clear();
                $('#tblMaterialList').DataTable().destroy();
                $('#tbody_Material_List').html('');
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td>'
                        + '<td>' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                        + '<td>' + (data[i].WarehouseName != undefined ? data[i].WarehouseName : '') + '</td>'
                        + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                        + '<td>' + (data[i].QtyBalance != undefined ? data[i].QtyBalance : '') + '</td>'
                        + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                        + '<td>' + (data[i].Rate != undefined ? data[i].Rate : '') + '</td>'
                        + '<td>' + (data[i].Amount != undefined ? data[i].Amount : '') + '</td>'
                        + '</tr>';                   
                }
                $('#tbody_Material_List').html(html);
                var d = new Date();
                var table = $('#tblMaterialList').DataTable({
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
                $('#tblMaterialList tbody').on('change', 'input[type="checkbox"]', function () {
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
            }, 1000);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
