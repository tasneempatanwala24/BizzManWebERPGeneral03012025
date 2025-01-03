var today = moment().format("YYYY-MM-DD");
var materialWarehouseBalance = {};
var Id;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlBranch').select2();
    $('#ddlMaterialName').select2({ width: '100%' });
    BindBranchDropdown();
    BindMaterialList();
    BindMaterialMasterDropdown();
    $(".dat").val(today).trigger("change");
    $(".dat").on("change", function () {
        //$(".dat").val(today);
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
    $('.dcmlNo').keypress(function (event) {
        var value = $(this).val();
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
        if (value.indexOf('.') != -1) {
            var decimalPosition = value.indexOf('.');
            if (value.substring(decimalPosition + 1).length >= 1) {
                $(this).val(value.substring(0, decimalPosition + 2));
            }
        }
    });
    $(function () {
        $('input:text:first').focus();
        var $inp = $('.cls');
        $inp.bind('keydown', function (e) {
            //var key = (e.keyCode ? e.keyCode : e.charCode);
            var key = e.which;
            if (key == 13) {
                e.preventDefault();
                var nxtIdx = $inp.index(this) + 1;
                $(".cls:eq(" + nxtIdx + ")").focus();
                if (nxtIdx == $inp.length - 1) {
                    SaveDetails();
                    $('#ddlMaterialName').focus();
                }
            }
        });
    });
    $(document).keydown(function (e) {
        // Check if the 'Ctrl' key (keyCode 17) and 'S' key (keyCode 83) are pressed
        if (e.ctrlKey && e.keyCode == 83) {
            e.preventDefault();
            AddMaterial();
            console.log('Save action triggered');
        }
    });
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
        XLSX.utils.book_append_sheet(wb, ws, 'TransferEntry');

        // Write workbook to file
        XLSX.writeFile(wb, 'StockTransferEntry.xlsx');
    });
});
function ViewFile() {
    if (Id) {
        window.open("wfInventStockTransfer_display.aspx?id=" + Id);
    }
}
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventStockTransfer.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
            $('#ddlBranchCode').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindFromWarehouseDropdown() {
    var branchId = $('#ddlBranch').val();
    var ItemId = $('#ddlMaterialName').val();
    if (isEmpty(branchId) && isEmpty(ItemId)) {       
         $('#ddlFromWarehouse').val('');
        $('#txtRate').val(0);
        $('#txtQtyBalance').val(0);
    } else {
        $.ajax({
            type: "POST",
            url: 'wfInventStockTransfer.aspx/WarehouseList',
            data: JSON.stringify({
                "branchId": branchId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
            },
            success: function (response) {
                $('#ddlFromWarehouse').html('');
                $('#txtRate').val(0);
                $('#txtQtyBalance').val(0);
                var data = JSON.parse(response.d);
                var req = "<option value=''>-Select From Warehouse-</option>";
                for (var i = 0; i < data.length; i++) {
                    req = req + "<option value='" + data[i].Id + "'>" + data[i].Name + "</option>";
                }
                $('#ddlFromWarehouse').append(req);
            },
            complete: function () {
                // Any action after the request completes
            },
            failure: function (jqXHR, textStatus, errorThrown) {
                // Handle any failure in the request
            }
        });
    }
    
}
function BindToWarehouseDropdown() {
    var branchId = $('#ddlBranchCode').val();
    $.ajax({
        type: "POST",
        url: 'wfInventStockTransfer.aspx/WarehouseList',
        data: JSON.stringify({
            "branchId": branchId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            // $('#ddlWarehouse').select2('destroy');
            $('#ddlToWarehouse').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select To Warehouse-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlToWarehouse').append(req);
            // $('#ddlWarehouse').select2();
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
            url: 'wfInventStockTransfer.aspx/MaterialMasterList',
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#ddlMaterialName').select2('destroy');
                $('#ddlMaterialName').html('');
                var data = JSON.parse(response.d);
                var req = "<option value=''>-Select Material-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + '-' + JSON.parse(response.d)[i].MaterialName + "</option>";
                }
                $('#ddlMaterialName').append(req);
                $('#ddlMaterialName').select2();

                // Check if no material is selected, unselect warehouse and set qty and rate to 0
                if ($('#ddlMaterialName').val() === '') {
                    $('#ddlFromWarehouse').val('');
                    $('#txtRate').val(0);
                    $('#txtQtyBalance').val(0);
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });    
}
function DeleteDetailEntry(row) {
    // Get the row data (materialId, warehouseId, and stockTransferQty)
    var materialId = $(row).closest('tr').data('material-id');
    var warehouseId = $(row).closest('tr').data('warehouse-id');
    var stockTransferQty = $(row).closest('tr').data('stock-transfer-qty');

    // Update the balance locally by adding back the transferred quantity
    if (materialWarehouseBalance[materialId] && materialWarehouseBalance[materialId][warehouseId]) {
        materialWarehouseBalance[materialId][warehouseId].balance += stockTransferQty;  // Add back the transferred quantity
    }

    // Update the balance in the UI
    $('#txtBalQty').val(materialWarehouseBalance[materialId][warehouseId].balance);
    $('#txtQtyBalance').val($('#txtBalQty').val());

    // Also set the rate for the selected materialId and warehouseId
    $('#txtRate').val(materialWarehouseBalance[materialId][warehouseId].rate);

    // Remove the row from the table
    $(row).closest('tr').remove();

    // If no rows left for this materialId and warehouseId, clear rate and balance
    if ($('#tbody_MaterialDetails').find('tr[data-material-id="' + materialId + '"][data-warehouse-id="' + warehouseId + '"]').length === 0) {
        $('#txtBalQty').val('');
        $('#txtQtyBalance').val('');
        $('#txtRate').val('');
    }
}
function FetchQtyBalance() {
    var materialId = $('#ddlMaterialName').val();
    var warehouseId = $('#ddlFromWarehouse').val();
    if (materialId !== '' && warehouseId !== '') {
        // Check if balance and rate are already stored in memory
        if (materialWarehouseBalance[materialId] && materialWarehouseBalance[materialId][warehouseId]) {
            var storedBalance = materialWarehouseBalance[materialId][warehouseId];
            $('#txtBalQty').val(storedBalance.balance);  // Set the balance from memory
            $('#txtQtyBalance').val(storedBalance.balance);  // Update the QtyBalance field
            $('#txtRate').val(storedBalance.rate);  // Set the rate from memory
            console.log("Balance and rate fetched from memory");
        } else {
            // Fetch the balance and rate from the server if not stored in memory
            fetchBalanceFromServer(materialId, warehouseId);
        }
    }
    else {
        $('#ddlFromWarehouse').val('');
        $('#txtBalQty').val(0);
        $('#txtQtyBalance').val(0);
        $('#txtRate').val(0);
    }
}
function fetchBalanceFromServer(materialId, warehouseId) {
    $.ajax({
        type: "POST",
        url: 'wfInventStockTransfer.aspx/FetchQtyBalance',
        data: JSON.stringify({
            "MaterialMasterId": materialId,
            "WarehouseId": warehouseId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
            var balanceQty = data[0].QtyBalance;
            var rate = data[0].Rate;

            // Update the UI with the fetched data
            $('#txtRate').val(rate);
            $('#txtBalQty').val(balanceQty);
            $('#txtQtyBalance').val(balanceQty);

            // Store the balance and rate in memory
            if (!materialWarehouseBalance[materialId]) {
                materialWarehouseBalance[materialId] = {};  // Initialize if not already
            }

            materialWarehouseBalance[materialId][warehouseId] = {
                balance: balanceQty,
                rate: rate
            };

            console.log("Balance and rate fetched from server and stored in memory");
        },
        error: function () {
            alert("Error fetching data from server.");
        }
    });
}
function SaveDetails() {
    var materialId = $('#ddlMaterialName').val();
    var warehouseId = $('#ddlFromWarehouse').val();
    var stockTransferQty = parseFloat($('#txtStockTransferQty').val());
    // Validate stock transfer quantity
    if (isEmpty(materialId)) {
        alertify.error('Please select valid material name');
        return;
    }
    else if (isEmpty(warehouseId)) {
        alertify.error('Please select valid source warehouse');
        return;
    }
    else if (isEmpty($('#ddlBranchCode').val())) {
        alertify.error('Please select valid branch');
        return;
    }
    else if (isEmpty($('#ddlToWarehouse').val())) {
        alertify.error('Please select valid destination warehouse');
        return;
    }
    else if (isNaN(stockTransferQty) || stockTransferQty <= 0) {
        alertify.error('Please enter valid Stock Transfer Qty');
        return;
    }

    // Validate that stock transfer qty doesn't exceed the available balance
    var availableBalanceQty = parseFloat($('#txtBalQty').val());
    if (stockTransferQty > availableBalanceQty) {
        alertify.error('Stock Transfer Qty cannot be greater than available balance.');
        return;
    }

    // Add the row to the table
    $('#tbody_MaterialDetails').append('<tr data-material-id="' + materialId + '" data-warehouse-id="' + warehouseId + '" data-stock-transfer-qty="' + stockTransferQty + '">'
        + '<td style="display: none;">' + materialId + '</td>'
        + '<td>' + $("#ddlMaterialName option:selected").text() + '</td>'
        + '<td style="display: none;">' + warehouseId + '</td>'
        + '<td>' + $("#ddlFromWarehouse option:selected").text() + '</td>'
        + '<td>' + $('#txtRate').val() + '</td>'
        + '<td>' + $("#txtQtyBalance").val() + '</td>'
        + '<td>' + $("#txtStockTransferQty").val() + '</td>'
        + '<td style="display: none;">' + $('#ddlBranchCode').val() + '</td>'
        + '<td>' + $("#ddlBranchCode option:selected").text() + '</td>'
        + '<td style="display: none;">' + $('#ddlToWarehouse').val() + '</td>'
        + '<td>' + $("#ddlToWarehouse option:selected").text() + '</td>'
        + '<td>' + $("#txtDescriptionDetail").val() + '</td>'
        + '<td style="display: none;">' + $("#txtBalQty").val() + '</td>'
        + '<td><a onclick="DeleteDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
        + '</tr>');

    // Update the balance in memory after stock transfer
    materialWarehouseBalance[materialId][warehouseId].balance -= stockTransferQty;

    // Update the balance in the UI
    $('#txtBalQty').val(materialWarehouseBalance[materialId][warehouseId].balance);
    $('#txtQtyBalance').val($('#txtBalQty').val());

    // Clear the input fields after appending the row, except the rate
    $('#ddlMaterialName').val('').trigger('change');  // Reset Select2 dropdown
    $('#txtRate').val(0);  // Keep the rate intact
    $('#ddlFromWarehouse').val('');
    $('#txtQtyBalance').val(0);
    $('#txtStockTransferQty').val(0);
    $('#ddlBranchCode').val('');
    $('#ddlToWarehouse').val('');
    $('#txtDescriptionDetail').val('');
    $('#txtBalQty').val(0);
}
function CreateMaterial() {
    $('#divMaterialList').hide();
    $('#divMaterialEntry').show();
    $('#divMaterialDetails').show();
    $('#divMaterialDetailsList').hide();
    $('#btnSave').show();
    $('#btnExport').hide();
    $('#previewBtn').hide();
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
}
function ViewMaterial() {
    $('#divMaterialList').show();
    $('#divMaterialEntry').hide();
    $('#divMaterialDetails').hide();
    $('#divMaterialDetailsList').hide();
    $('#previewBtn').hide();
    $('#divMaterialMasterList').hide();
    $('#divMaterialMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindMaterialList();
}
function ClearAll() {
    $('#tbody_MaterialMasterList').html('');
    $('#tbody_MaterialMasterDetails').html('');
    $('#tbody_MaterialDetails').children('tr:not(:first)').remove();
    $('#ddlBranch').prop('disabled', false);
    $('#txtTransferDate').prop('readonly', false);
    $('#txtDescription').prop('readonly', false);
    $('#txtTransferDate').val('');
    $('#txtID').val('');
    $(".dat").val(today);
    $('#txtDescription').val('');
    $('#ddlBranch').select2('destroy');
    $('#ddlBranch').val('');
    $('#ddlBranch').select2();
    $('#ddlMaterialName').select2('destroy');
    $('#ddlMaterialName').val('');
    $('#ddlMaterialName').select2();
    //$('#ddlFromWarehouse').select2('destroy');
    $('#ddlFromWarehouse').val('');
    //$('#ddlFromWarehouse').select2();
    $('#txtQtyBalance').val(0);
    $('#txtStockTransferQty').val(0);
    //$('#ddlBranchCode').select2('destroy');
    $('#ddlBranchCode').val('');
    //$('#ddlBranchCode').select2();
    //$('#ddlToWarehouse').select2('destroy');
    $('#ddlToWarehouse').val('');
    //$('#ddlToWarehouse').select2();
    $('#txtDescriptionDetail').val('');
    materialWarehouseBalance = {};
    $('#previewBtn').hide();   
    GenerateID();
}
function BindMaterialList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfInventStockTransfer.aspx/FetchMaterialList',
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
                    //html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td>'
                    //    + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\');">' + data[i].Id + '</td>'
                    //    + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\');">' + (data[i].TransferDate != undefined ? data[i].TransferDate : '') + '</td>'
                    //    + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    //    + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\');">' + (data[i].Description != undefined ? data[i].Description : '') + '</td>'
                    //    //+ '<td><a onclick="DeleteMaterialPurchaseOrder(\'' + data[i].Id + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
                    //    + '</tr>';
                    html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td>'
                        + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\', \'' + (data[i].BranchCode != undefined ? data[i].BranchCode : '') + '\', \'' + (data[i].TransferDate != undefined ? data[i].TransferDate : '') + '\', \'' + (data[i].Description != undefined ? data[i].Description : '') + '\');">'
                        + data[i].Id + '</td>'
                        + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\', \'' + (data[i].BranchCode != undefined ? data[i].BranchCode : '') + '\', \'' + (data[i].TransferDate != undefined ? data[i].TransferDate : '') + '\', \'' + (data[i].Description != undefined ? data[i].Description : '') + '\');">'
                        + (data[i].TransferDate != undefined ? data[i].TransferDate : '') + '</td>'
                        + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\', \'' + (data[i].BranchCode != undefined ? data[i].BranchCode : '') + '\', \'' + (data[i].TransferDate != undefined ? data[i].TransferDate : '') + '\', \'' + (data[i].Description != undefined ? data[i].Description : '') + '\');">'
                        + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                        + '<td onclick="FetchStockTransferDetailsList(\'' + data[i].Id + '\', \'' + (data[i].BranchCode != undefined ? data[i].BranchCode : '') + '\', \'' + (data[i].TransferDate != undefined ? data[i].TransferDate : '') + '\', \'' + (data[i].Description != undefined ? data[i].Description : '') + '\');">'
                        + (data[i].Description != undefined ? data[i].Description : '') + '</td>'
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
function FetchStockTransferDetailsList(id, branchcode, transferDate,desc) {
    $('#previewBtn').show();
    $('#divMaterialDetailsList').show();
    $('#divMaterialEntry').show();
    $('#divMaterialList').hide();
    $('#btnExport').hide();
    $('#txtID').val(id);
    $('#ddlBranch').val(branchcode).trigger('change').prop('disabled', true);
    //$('#ddlBranch').val(branchcode).prop('disabled', true);
    $('#txtTransferDate').val(moment(transferDate, 'D MMM YYYY').format('YYYY-MM-DD')).prop('readonly', true);
    //$('#txtTransferDate').val(transferDate).prop('readonly', true);
    $('#txtDescription').val(desc).prop('readonly', true);
    if (id != null) {
        $('#divMaterialDetailsList').show();
        $.ajax({
            type: "POST",
            url: 'wfInventStockTransfer.aspx/FetchStockTransferDetailsList',
            data: JSON.stringify({
                "Id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                setTimeout(function () {
                    hideLoader();
                    $('#tblMaterialDetailsList').DataTable().clear();
                    $('#tblMaterialDetailsList').DataTable().destroy();
                    $('#tbody_MaterialDetailsList').html('');
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        Id = data[i].TransferMasterId;
                        //html = html + '<tr onclick="ViewFile(\'' + data[i].TransferMasterId + '\');">'
                        html = html + '<tr>'
                            //+ '<td>' + data[i].TransferMasterId + '</td>'
                            + '<td>' + data[i].materialName + '</td>'
                            + '<td>' + data[i].Rate + '</td>'
                            + '<td>' + data[i].Qty + '</td>'
                            + '<td>' + data[i].SourceBranchName + '</td>'
                            + '<td>' + data[i].SourceWarehouse + '</td>'
                            + '<td>' + data[i].DestinationBranchName + '</td>'
                            + '<td>' + data[i].DestinationWarehouse + '</td>'
                            + '<td>' + data[i].Description + '</td>'
                            //+ '<td><a onclick="DeleteMaterialPurchaseOrder(\'' + data[i].Id + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
                            + '</tr>';
                    }
                    $('#tbody_MaterialDetailsList').html(html);
                    
                }, 1000);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function AddMaterial() {
    // Validate transfer date
    if ($('#txtTransferDate').val() == '') {
        alertify.error('Please enter transfer date');
        return;
    }

    // Validate branch selection
    else if ($('#ddlBranch').val() == '') {
        alertify.error('Please select any branch');
        return;
    }
    // Check if there are rows in the table
    var hasRows = $('#tbody_MaterialDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add Stock Transfer Lines');
        return;
    }

    // Show loader while sending request
    showLoader();

    var data = [];

    // Loop through each row in the table and collect data
    $("#tbody_MaterialDetails tr:not(:first)").each(function () {
        var materialID = $(this).find('td').eq(0).text();
        var Rate = $(this).find('td').eq(4).text();
        var SourceWarehouseId = $(this).find('td').eq(2).text();
        var Qty = $(this).find('td').eq(6).text();
        var DestinationBranchCode = $(this).find('td').eq(7).text();
        var DestinationWarehouseId = $(this).find('td').eq(9).text();
        var DescriptionDetail = $(this).find('td').eq(11).text();      

        // Push collected data to the array
        data.push({
            ItemID: materialID,
            Quantity: Qty,
            Rate: Rate,
            SourceWarehouseId: SourceWarehouseId,
            DestinationBranchCode: DestinationBranchCode,
            DestinationWarehouseId: DestinationWarehouseId,
            Description: DescriptionDetail
        });
    });

    // Make the AJAX request
    $.ajax({
        type: "POST",
        url: "wfInventStockTransfer.aspx/AddMaterial",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            data: data,
            "OrderID": $('#txtID').val(),
            "TransferDate": $('#txtTransferDate').val(),
            "BranchCode": $('#ddlBranch').val(),
            "Description": $('#txtDescription').val(),
            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
        }),
        dataType: "json",
        success: function (result) {
            //var r = result.d;
            //console.log(r);
            var r = JSON.parse(result.d);
            if (r.status == "success") {
                setTimeout(function () {
                    hideLoader();
                    alertify.success('Stock transfer details added successfully');
                    ClearAll(); // Reset all fields
                }, 1000);
            } else {
                console.error("Error log:", r);
                alertify.error('Something went wrong, please try again later');
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", xhr);
            alertify.error('Error. Something went wrong, please try again later');
            hideLoader(); // Hide loader in case of error
        }
    });
}
//function SaveDetails() {
//    var materialId = $('#ddlMaterialName').val();
//    var warehouseId = $('#ddlFromWarehouse').val();
//    var stockTransferQty = parseFloat($('#txtStockTransferQty').val());
//    var availableBalanceQty = parseFloat($('#txtBalQty').val());

//    // Validate stock transfer quantity
//    if (isNaN(stockTransferQty) || stockTransferQty <= 0) {
//        alertify.error('Please enter valid Stock Transfer Qty');
//        return;
//    }
//    if (stockTransferQty > availableBalanceQty) {
//        alertify.error('Stock Transfer Qty cannot be greater than available balance.');
//        return;
//    }

//    // Get the rate value (it should already be set correctly from the FetchQtyBalance function)
//    //var rate = $('#txtRate').val();
//    if ($('#txtRate').val() === '' || $('#txtRate').val() === '0') {
//        alertify.error('Rate is not available for the selected material.');
//        return;
//    }

//    // Add the row to the table
//    $('#tbody_MaterialDetails').append('<tr data-material-id="' + materialId + '" data-warehouse-id="' + warehouseId + '" data-stock-transfer-qty="' + stockTransferQty + '">'
//        + '<td style="display: none;">' + materialId + '</td>'
//        + '<td>' + $("#ddlMaterialName option:selected").text() + '</td>'
//        + '<td style="display: none;">' + warehouseId + '</td>'
//        + '<td>' + $("#ddlFromWarehouse option:selected").text() + '</td>'
//        + '<td>' + $('#txtRate').val() + '</td>'  // Use the correct rate value
//        + '<td>' + $("#txtQtyBalance").val() + '</td>'
//        + '<td>' + $("#txtStockTransferQty").val() + '</td>'
//        + '<td style="display: none;">' + $('#ddlBranchCode').val() + '</td>'
//        + '<td>' + $("#ddlBranchCode option:selected").text() + '</td>'
//        + '<td style="display: none;">' + $('#ddlToWarehouse').val() + '</td>'
//        + '<td>' + $("#ddlToWarehouse option:selected").text() + '</td>'
//        + '<td>' + $("#txtDescriptionDetail").val() + '</td>'
//        + '<td style="display: none;">' + $("#txtBalQty").val() + '</td>'
//        + '<td><a onclick="DeleteDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
//        + '</tr>');

//    // Update the balance locally
//    materialWarehouseBalance[materialId][warehouseId] -= stockTransferQty;

//    // Update the balance in the UI
//    $('#txtBalQty').val(materialWarehouseBalance[materialId][warehouseId]);
//    $('#txtQtyBalance').val($('#txtBalQty').val());

//    // Clear the input fields after appending the row, except the rate
//    //$('#ddlMaterialName').val('');
//    $('#ddlMaterialName').val(null).trigger('change');
//    $('#txtRate').val(0);  // Keep the rate value intact
//    $('#ddlFromWarehouse').val('');
//    $('#txtQtyBalance').val(0);
//    $('#txtStockTransferQty').val(0);
//    $('#ddlBranchCode').val('');
//    $('#ddlToWarehouse').val('');
//    $('#txtDescriptionDetail').val('');
//    $('#txtBalQty').val(0);
//}

function DeleteMaterial(id) {
    alertify.confirm('Confirm Material Stock Delete', 'Are you sure, you want to delete material stock transfer ?', function () {
        $.ajax({
            type: "POST",
            url: 'wfInventStockTransfer.aspx/DeleteMaterialPurchaseOrder',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                alertify.success('Material stock traansfer details deleted successfully');
                BindMaterialList();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
        , function () { });
}
function FetchMaterialDetails() {
    if ($('#ddlBranch').val() == '') {
        alertify.error('Please Select Branch');
        $('#ddlMaterialName').select2('destroy');
        $('#ddlMaterialName').val('');
        $('#ddlMaterialName').select2();
        return;
    }
    if ($('#ddlMaterialName').val() == '') {
        $('#txtMaterialUnitMeasure').val('');
        $('#txtMaterialRate').val('0');
        $('#txtMaterialStock').val('');
        $('#txtCGST').val('0');
        $('#txtSGST').val('0');
        $('#txtIGST').val('0');
        $('#txtMaterialQty').val('0');
        $('#txtMaterialUnitMeasure').val('');
        $('#txtMaterialRate').val('0');
        $('#txtTaxableAmt').val('0');
        $('#txtFreightCharge').val('0');
        $('#txtLoadingUnLoading').val('0');
        $('#txtRoundOff').val('0');
        $('#txtMaterialTotalAmount').val('0');
        //$('#txtDesciption').val('');
        return;
    }
    if ($('#ddlMaterialName').val() != '' && $('#ddlBranch').val() != '') {
        var found = false;
        $('#tbody_MaterialDetails tr').each(function (i) {
            if (i > 0) {
                var materialid = parseFloat($(this)[0].cells[0].innerText)
                if (materialid == $('#ddlMaterialName').val()) {
                    found = true;

                }
            }

        });
        if (found) {
            alertify.error('Material already added');
            $('#ddlMaterialName').val('');
            return;
        }
        showLoader();
        $.ajax({
            type: "POST",
            url: 'wfInventStockTransfer.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $('#ddlMaterialName').val(),
                "BranchCode": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                setTimeout(function () {
                    $('#txtMaterialUnitMeasure').val(data[0].UnitMesure);
                    $('#txtMaterialQty').val(0);
                    $('#txtMaterialRate').val(data[0].MRP);
                    $('#txtMaterialStock').val(data[0].Stock);
                    $('#txtCGST').val(data[0].CentralTaxPercent);
                    $('#txtSGST').val(data[0].StateTaxPercent);
                    $('#txtIGST').val(data[0].IntegratedTaxPercent);
                    $('#txtFreightCharge').val(0);
                    $('#txtLoadingUnLoading').val(0);
                    hideLoader();
                }, 1000); // Hide loader after 3 seconds
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
//function DeleteDetailEntry(ele) {
//    $(ele.parentElement.parentElement).remove();
//    //calculateGrandTotal();
//}
function GenerateID() {
    if ($('#txtTransferDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfInventStockTransfer.aspx/GenerateID',
            data: JSON.stringify({
                "TransferDate": $('#txtTransferDate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                $('#txtID').val(data[0].Id);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtID').val('');
    }
}
function checkInputGiven(event) {
    var value = event.target.value;
    if (/^\d\.$/.test(value)) { // Checks if input is a single digit followed by a dot
        event.target.value = value.charAt(0); // Sets the value to the single digit
    }
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
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}
