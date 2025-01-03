var today = moment().format("YYYY-MM-DD");
$(document).ready(function () {
   
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlVendor').select2();
    $('#ddlOrder').select2();
    $('#ddlActive').val('Y') 
    BindVendorDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown();
    //BindWarehouseDropdown();
    BindMaterialPurchaseGrnList();
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
                    SaveSalesOrderDetails();
                    $('#ddlMaterialName').focus();
                }
            }
        });
    });
    $(document).keydown(function (e) {
        // Check if the 'Ctrl' key (keyCode 17) and 'S' key (keyCode 83) are pressed
        if (e.ctrlKey && e.keyCode == 83) {
            e.preventDefault(); // Prevent the default action (e.g., Save Page)

            // Call your save function
            AddMaterialPurchaseOrderDirectGrnEntry();

        }
    });
    var selectedRowsData = [];

    // Handle individual checkbox change event
    $('#tblMaterialPurchaseGrnList tbody').on('change', 'input[type="checkbox"]', function () {
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
        var table = $('#tblMaterialPurchaseGrnList').DataTable();

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
        var totalCheckboxes = $('#tblMaterialPurchaseGrnList tbody input[type="checkbox"]').length;
        var checkedCheckboxes = $('#tblMaterialPurchaseGrnList tbody input[type="checkbox"]:checked').length;

        // If all checkboxes are checked, set 'Select All' checkbox as checked
        if (totalCheckboxes === checkedCheckboxes) {
            $('#example-select-all').prop('checked', true);
        } else {
            $('#example-select-all').prop('checked', false);
        }
    }

    $('#btnExport').on('click', function () {
        if (selectedRowsData.length === 0) {
            alertify.error("Please select at least one row to export.");
            return;
        }

        // Create a new workbook
        var wb = XLSX.utils.book_new();

        // Get table headers, including the first and last columns
        var headers = [];
        $('#tblMaterialPurchaseGrnList thead th').each(function (index) {
            if (index !== 0 && index !== $('#tblMaterialPurchaseGrnList thead th').length) {
                headers.push($(this).text().trim());
            }
        });

        // Prepare data to be exported, excluding only the first column (checkbox column)
        var ws_data = [headers];

        selectedRowsData.forEach(function (rowData) {
            var row = rowData.slice(1); // Exclude the first (checkbox) column, include all others
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
        XLSX.utils.book_append_sheet(wb, ws, 'PODirectGRN');

        // Write workbook to file
        XLSX.writeFile(wb, 'PurchaseOrderGRN.xlsx');
    });

});
//=======================================
//=======================================
function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "<option value=''>-Select Department-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }
            $('#ddlDepartment').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
//===========================
//============================

//===========================
//=============================
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/BranchMasterList',
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
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

//================================
//==================================

function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/VendorList',
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

function GetPackageQty(row) {
    var row = $(row).closest('tr');
    var qty = 0; var pQty = 0; var rcvqty = 0; var pkgId = 0; var calcQty = 0;
    pkgId = row.find('#ddlPackage').val();
    rcvqty = parseFloat(row.find('.RcvQty').val()) || 0;
    pQty = parseFloat(row.find('.PckgQty').val()) || 1;
    if (pkgId != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/MaterialPackagingQty',
            data: JSON.stringify({
                "pkgid": pkgId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                qty = data[0].Qty;
                //row.find('.PckgQty').val(qty);
                calcQty = pQty * qty
                row.find('.pkgQty').val(qty);
                row.find('.RcvQty').val(calcQty);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        alertify.error('please select Package.');
        row.find('.RcvQty').val(0);
        row.find('.pkgQty').val(0);
        row.find('.PckgQty').val(0);
        return false;
    }
}
function GenerateOrderID() {
    if ($('#txtEntryDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/GenerateOrderID',
            data: JSON.stringify({
                "OrderDate": $('#txtEntryDate').val()
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
function BindPurchaseOrderDropdown() {
    showLoader();
  
 
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/PurchaseOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            "VendorId": $('#ddlVendor').val()
        }),
        success: function (response) {
            $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
            $('#ddlOrder').select2('destroy');
            $('#ddlOrder').html('');
            $('#txtDeadlineDate').val('');
            $('#txtReceiptDate').val('');
            $('#txtPaymentTerm').val('');
            $('#txtPurchaseAgreement').val('');
            $('#txtQuotationNo').val('');
            $('#ddlBranch').val('');
            $('#ddlDepartment').val('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Order-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + "</option>";
            }
            $('#ddlOrder').append(req);
            $('#ddlOrder').select2();
            hideLoader();
           
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

//function FetchPurchaseOrderDetails() {
//    showLoader();
//    if ($('#ddlOrder').val() != '') {
//        FetchPurchaseOrderMasterDetails();
//        $.ajax({
//            type: "POST",
//            url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/FetchPurchaseOrderDetails',
//            data: JSON.stringify({
//                "OrderId": $('#ddlOrder').val()
//            }),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            beforeSend: function () {

//            },
//            success: function (response) {

//                var data = JSON.parse(response.d);
//                $('#txtDeadlineDate').val(data.PurchaseOrderMasterInfo.OrderDeadlineDate)
//                $('#txtReceiptDate').val(data.PurchaseOrderMasterInfo.ReceiptDate)
//                $('#txtPaymentTerm').val(data.PurchaseOrderMasterInfo.PaymentTerm)
//                $('#txtPurchaseAgreement').val(data.PurchaseOrderMasterInfo.PurchaseAgreement)
//                $('#ddlBranch').val(data.PurchaseOrderMasterInfo.BranchCode)
//                $('#ddlDepartment').val(data.PurchaseOrderMasterInfo.DepartmentId)
//                $('#txtQuotationNo').val(data.PurchaseOrderMasterInfo.QuotationNo)

//                $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
//                var warehouseHtml = $('#td_warehouse').html();
//                var html = '';

//                //for (var i = 0; i < data.PurchaseItems[0].Table.length; i++) {
//                //    (function (index) {
//                //        BindMaterialPackagingDropdown(data.PurchaseItems[0].Table[index].MaterialMasterId, function () {
//                //            var packageeHtml = $('#td_package').html();
//                //            html = html + '<tr><td style="display:none;">' + data.PurchaseItems[0].Table[index].Id + '</td><td>' + data.PurchaseItems[0].Table[index].MaterialName + '</td>'
//                //                + '<td>' + (data.PurchaseItems[0].Table[index].QtyOrder != undefined ? data.PurchaseItems[0].Table[index].QtyOrder : '') + '</td>'
//                //                + '<td>' + (data.PurchaseItems[0].Table[index].UnitMesure != undefined ? data.PurchaseItems[0].Table[index].UnitMesure : '') + '</td>'
//                //                + '<td>' + (data.PurchaseItems[0].Table[index].QtyReceive != undefined ? data.PurchaseItems[0].Table[index].QtyReceive : '') + '</td>'
//                //                + '<td>' + (data.PurchaseItems[0].Table[index].BalanceQty != undefined ? data.PurchaseItems[0].Table[index].BalanceQty : '') + '</td>'
//                //                + '<td>' + (data.PurchaseItems[0].Table[index].UnitPrice != undefined ? data.PurchaseItems[0].Table[index].UnitPrice : '') + '</td>'

//                //                + '<td><input type="number" class="form-control RcvQty" onchange="CheckRecive(this)" oninput="handleNumericInput(event)"  value="' + (data.PurchaseItems[0].Table[index].BalanceQty != undefined ? data.PurchaseItems[0].Table[index].BalanceQty : '') + '" /></td>'
//                //                + '<td><input type="number" class="form-control RtrnQty"  value="0" onchange="CheckReturn(this)" oninput="handleNumericInput(event)" /></td>'
//                //                + '<td>' + packageeHtml + '</td > '
//                //                + '<td><input type="number" class="form-control PckgQty"  value="0"  oninput="handleNumericInput(event)" /></td>'

//                //                + '<td>' + warehouseHtml + '</td><td><input type="text" class="form-control descptn" /></td><td><input type="checkbox" class="editor-active"></td></tr>';

//                //            // Other HTML generation code
//                //        });
//                //    })(i);
//                //}

//                //html = '';

//                for (var i = 0; i < data.PurchaseItems[0].Table.length; i++) {
//                    BindMaterialPackagingDropdown(data.PurchaseItems[0].Table[i].MaterialMasterId, function (index) {
//                        var packageeHtml = $('#td_package').html();
//                        html = html + '<tr><td style="display:none;">' + data.PurchaseItems[0].Table[index].Id + '</td><td>' + data.PurchaseItems[0].Table[index].MaterialName + '</td>'
//                            + '<td>' + (data.PurchaseItems[0].Table[index].QtyOrder != undefined ? data.PurchaseItems[0].Table[index].QtyOrder : '') + '</td>'
//                            + '<td>' + (data.PurchaseItems[0].Table[index].UnitMesure != undefined ? data.PurchaseItems[0].Table[index].UnitMesure : '') + '</td>'
//                            + '<td>' + (data.PurchaseItems[0].Table[index].QtyReceive != undefined ? data.PurchaseItems[0].Table[index].QtyReceive : '') + '</td>'
//                            + '<td>' + (data.PurchaseItems[0].Table[index].BalanceQty != undefined ? data.PurchaseItems[0].Table[index].BalanceQty : '') + '</td>'
//                            // + '<td>' + (data.PurchaseItems[0].Table[index].UnitPrice != undefined ? data.PurchaseItems[0].Table[index].UnitPrice : '') + '</td>'
//                            + '<td><input type="text" class="form-control UnitPrice" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].UnitPrice != undefined ? data.PurchaseItems[0].Table[index].UnitPrice : '') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'

//                            + '<td><input type="text" class="form-control RcvQty" onchange="CheckRecive(this)" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="' + (data.PurchaseItems[0].Table[index].BalanceQty != undefined ? data.PurchaseItems[0].Table[index].BalanceQty : '') + '" /></td>'
//                            + '<td><input type="text" class="form-control RtrnQty"  value="0" onchange="CheckReturn(this)" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
//                            + '<td>' + packageeHtml + '</td > '
//                            + '<td><input type="text" class="form-control PckgQty"  value="0"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'

//                            + '<td>' + warehouseHtml + '</td><td><input type="text" class="form-control descptn" /></td><td><input type="checkbox" class="editor-active"></td></tr>';


//                    },i);




//                }
//                $('#tbody_MaterialPurchaseOrderMasterDetails').html(html);
//                hideLoader();

//            },
//            complete: function () {

//            },
//            failure: function (jqXHR, textStatus, errorThrown) {

//            }
//        });
//    }
//    else {
//        alertify.error("Please select any order");
//    }
//}
function UpdateTotalAmount(row) {
    var row = $(row).closest('tr');
    var fg = 0, taxableAmnt = 0, CGST = 0, SGST = 0, IGST = 0;
    var load = 0, totalAmnt = 0, rnd = 0;

    fg = parseFloat(row.find('.FreightCrg').val()) || 0;
    CGST = parseFloat(row.find('.CGST').val()) || 0;
    SGST = parseFloat(row.find('.SGST').val()) || 0;
    IGST = parseFloat(row.find('.IGST').val()) || 0;
    load = parseFloat(row.find('.Loading').val()) || 0;
    taxableAmnt = parseFloat(row.find('.TaxableAmt').val()) || 0;
    //fg = isEmpty($('#txtFreightCharge').val()) ? 0 : parseFloat($('#txtFreightCharge').val());
    //CGST = isEmpty($('#txtCGST').val()) ? 0 : parseFloat($('#txtCGST').val());
    //SGST = isEmpty($('#txtSGST').val()) ? 0 : parseFloat($('#txtSGST').val());
    //IGST = isEmpty($('#txtIGST').val()) ? 0 : parseFloat($('#txtIGST').val());
    //load = isEmpty($('#txtLoadingUnLoading').val()) ? 0 : parseFloat($('#txtLoadingUnLoading').val());
    //taxableAmnt = isEmpty($('#txtTaxableAmt').val()) ? 0 : parseFloat($('#txtTaxableAmt').val());
    // Calculate CGST, SGST, IGST
    var calcCGST = (taxableAmnt * CGST) / 100;
    var calcSGST = (taxableAmnt * SGST) / 100;
    var calcIGST = (taxableAmnt * IGST) / 100;
    
    // Calculate the total amount
    totalAmnt = taxableAmnt + calcCGST + calcSGST + calcIGST + fg + load;
    //totalAmnt = taxableAmnt + fg + load;
    // Round total amount to 2 decimal places
    totalAmnt = parseFloat(totalAmnt.toFixed(2));

    // Round off to the nearest integer
    var roundOff = Math.round(totalAmnt);

    // Calculate the difference between the total amount and the rounded amount
    rnd = (isNaN(totalAmnt) || totalAmnt === 0) ? 0 : (roundOff - totalAmnt);

    // Update the UI with the formatted results
    row.find('.GrossAmt').val(roundOff.toFixed(2));
    row.find('.RoundOff').val(rnd.toFixed(2));
    //$('#txtGrossAmount').val(roundOff.toFixed(2));  // Display total rounded to 2 decimal places
    //$('#txtRoundOff').val(rnd.toFixed(2));  // Display round off difference to 2 decimal places
}
function UpdateTaxableAmount(row) {
    var row = $(row).closest('tr');
    // Get the Unit Price from the current row
    var UnitPrice = parseFloat(row.find('.UnitPrice').val()) || 0;  // Ensure it's a valid number
    var RcvQty = parseFloat(row.find('.RcvQty').val()) || 0;  // Ensure it's a valid number

    // Calculate the taxable amount (rate * qty)
    var taxableAmnt = (RcvQty * UnitPrice);

    // If taxableAmnt is not a valid number or 0, set it to 0
    taxableAmnt = isNaN(taxableAmnt) || taxableAmnt === 0 ? 0 : taxableAmnt;

    // Set the Taxable Amount field in the current row with the calculated value
    row.find('.TaxableAmt').val(taxableAmnt.toFixed(2));

    // Optionally, update the Total Amount (if applicable)
    UpdateTotalAmount(row);
}
function GSTValidation(row) {
    var row = $(row).closest('tr');
    let CGST = 0, SGST = 0, IGST = 0;
    // Fetch the values and ensure they are numeric
    CGST = parseFloat(row.find('.CGST').val()) || 0;
    SGST = parseFloat(row.find('.SGST').val()) || 0;
    IGST = parseFloat(row.find('.IGST').val()) || 0;

    // Case 1: If CGST and SGST are both greater than 0, IGST must be 0
    if ((CGST + SGST) > 0) {
        row.find('.IGST').val(0);
       
    }
    // Case 2: If IGST is greater than 0, CGST and SGST must be 0
    else if (IGST > 0) {
        row.find('.CGST').val(0);
        row.find('.SGST').val(0);
    }
    // Case 3: If all values are 0, it's allowed (no GST applied)
    // We don't need to show an error here, it's valid if no GST is applied.
    else if ((CGST === 0 && SGST === 0) && IGST === 0) {
        // No action needed; return true as this is a valid case
        UpdateTotalAmount(row);
        return true;
    }
    UpdateTotalAmount(row);
    // If validation passes (valid GST combination), return true
    return true;
}
function FetchPurchaseOrderDetails() {
    showLoader();
    if ($('#ddlOrder').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/FetchPurchaseOrderDetails',
            data: JSON.stringify({
                "OrderId": $('#ddlOrder').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $('#txtDeadlineDate').val('');
                $('#txtReceiptDate').val('');
                $('#txtPaymentTerm').val('');
                $('#txtPurchaseAgreement').val('');
                $('#txtQuotationNo').val('');
                $('#ddlBranch').val('');
                $('#ddlDepartment').val('');
                var data = JSON.parse(response.d);
                $('#txtDeadlineDate').val(data.PurchaseOrderMasterInfo.OrderDeadlineDate)
                $('#txtReceiptDate').val(data.PurchaseOrderMasterInfo.ReceiptDate)
                $('#txtPaymentTerm').val(data.PurchaseOrderMasterInfo.PaymentTerm)
                $('#txtPurchaseAgreement').val(data.PurchaseOrderMasterInfo.PurchaseAgreement)
                $('#ddlBranch').val(data.PurchaseOrderMasterInfo.BranchCode)
                $('#ddlDepartment').val(data.PurchaseOrderMasterInfo.DepartmentId)
                $('#txtQuotationNo').val(data.PurchaseOrderMasterInfo.QuotationNo)

                $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
                var html = '';

                var promises = [];

                for (var i = 0; i < data.PurchaseItems[0].Table.length; i++) {
                    var promise = new Promise(function (resolve, reject) {
                        BindMaterialPackagingDropdown(data.PurchaseItems[0].Table[i].MaterialMasterId, function (index) {
                            var packageeHtml = $('#td_package').html();
                            html += '<tr><td style="display:none;">' + data.PurchaseItems[0].Table[index].Id + '</td><td>' + data.PurchaseItems[0].Table[index].MaterialName + '</td>'
                                + '<td>' + (data.PurchaseItems[0].Table[index].QtyOrder != undefined ? data.PurchaseItems[0].Table[index].QtyOrder : '') + '</td>'
                                + '<td>' + (data.PurchaseItems[0].Table[index].UnitMesure != undefined ? data.PurchaseItems[0].Table[index].UnitMesure : '') + '</td>'
                                + '<td>' + (data.PurchaseItems[0].Table[index].QtyReceive != undefined ? data.PurchaseItems[0].Table[index].QtyReceive : '') + '</td>'
                                + '<td>' + (data.PurchaseItems[0].Table[index].BalanceQty != undefined ? data.PurchaseItems[0].Table[index].BalanceQty : '') + '</td>'
                                + '<td><input type="text" id="UnitPrice" class="form-control cls UnitPrice" onchange="UpdateTaxableAmount(this);" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].UnitPrice != undefined ? data.PurchaseItems[0].Table[index].UnitPrice : '') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" id="RcvQty" class="form-control cls RcvQty" onchange="CheckRecive(this)" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="' + (data.PurchaseItems[0].Table[index].BalanceQty != undefined ? data.PurchaseItems[0].Table[index].BalanceQty : '') + '" /></td>'
                                + '<td><input type="text" class="form-control cls RtrnQty"  value="0" onchange="CheckReturn(this)" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td>' + packageeHtml + '</td > '
                                + '<td><input type="text" class="form-control cls PckgQty" onchange="GetPackageQty(this);"  value="0"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" id="TaxableAmt" class="form-control cls TaxableAmt" style="width:80px" readonly="readonly" value="' + (data.PurchaseItems[0].Table[index].TaxbleAmt != undefined ? data.PurchaseItems[0].Table[index].TaxbleAmt : '0') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" class="form-control cls CGST" onchange="GSTValidation(this);" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].CgstPercent != undefined ? data.PurchaseItems[0].Table[index].CgstPercent : '0') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" class="form-control cls SGST" onchange="GSTValidation(this);" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].SgstPercent != undefined ? data.PurchaseItems[0].Table[index].SgstPercent : '0') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" class="form-control cls IGST" onchange="GSTValidation(this);" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].IgstPercent != undefined ? data.PurchaseItems[0].Table[index].IgstPercent : '0') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" onchange="UpdateTotalAmount(row);" id="txtFreightCharge" class="form-control cls FreightCrg" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].FreightCharge != undefined ? data.PurchaseItems[0].Table[index].FreightCharge : '0') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" onchange="UpdateTotalAmount(row);" id="txtLoadingUnLoading" class="form-control cls Loading" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].LoadingUnLoading != undefined ? data.PurchaseItems[0].Table[index].LoadingUnLoading : '0') + '"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" /></td>'
                                + '<td><input type="text" id="txtRoundOff" class="form-control RoundOff" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].RoundOff != undefined ? data.PurchaseItems[0].Table[index].RoundOff : '0') + '"  readonly="readonly" /></td>'
                                + '<td><input type="text" id="txtGrossAmount" class="form-control GrossAmt" style="width:80px" value="' + (data.PurchaseItems[0].Table[index].TotalAmt != undefined ? data.PurchaseItems[0].Table[index].TotalAmt : '0') + '"  readonly="readonly"/></td>'
                                + '<td><select id="ddlWarehouse" name="ddlWarehouse" class="form-control ddlWarehouse cls"></select></td>'
                                + '<td><input type="text" id="pkgQty" class="form-control pkgQty" style="display:none;"/></td > '
                                + '</tr>';

                            // Bind the warehouse dropdown for the current row
                            BindWarehouseDropdown();
                            resolve();
                        }, i);
                    });

                    promises.push(promise);
                }

                // Wait for all promises to resolve
                Promise.all(promises).then(function () {
                    $('#tbody_MaterialPurchaseOrderMasterDetails').html(html);
                    hideLoader();
                });
            },
            failure: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Error fetching order details.");
            }
        });
    } else {
        alertify.error("Please select any order");
    }
}


function CheckRecive(ele)
{
    var row = $(ele).closest('tr');
    var GrnBalanceQty = parseFloat($(ele.parentElement.parentElement.children[5])[0].innerText);
    var RtrnQty = parseFloat($(ele.parentElement.parentElement.children[8].children[0]).val());
    var RcvQty = parseFloat($(ele).val());
    if ((RcvQty + RtrnQty) <= GrnBalanceQty && RcvQty >= 0 && RtrnQty >= 0) {
        UpdateTaxableAmount(row);
            }
            else {
       
        $(ele.parentElement.parentElement.children[8].children[0]).val('0')
        $(ele).val('0');
        //$('.ddlWarehouse').empty();
        //$('.ddlWarehouse').html("<option value=''>-Select Warehouse-</option>");
        row.find('.ddlpackage').val('');
        row.find('.pkgQty').val(0);
        alertify.error("Invalid Recieve Qty");
            }
}

function CheckReturn(ele) {
    var GrnBalanceQty = parseFloat($(ele.parentElement.parentElement.children[5])[0].innerText);
    var RcvQty = parseFloat($(ele.parentElement.parentElement.children[7].children[0]).val());
    var RtrnQty = parseFloat($(ele).val());
    if ((RcvQty + RtrnQty) <= GrnBalanceQty && RcvQty >= 0 && RtrnQty >= 0) {

    }
    else {

        $(ele.parentElement.parentElement.children[7].children[0]).val('0')
        $(ele).val('0');
        alertify.error("Invalid Return Qty");
    }
}

// Function to handle numeric input
//function handleNumericInput(obj) {
//    // Get the input element
//    //var inputElement = event.target;

//   // var numericValue = inputElement.value;
//    var numericValue = obj.value;
//    //var numericValue = inputElement.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for decimal point
//    //numericValue = numericValue.replace(/^(\d*\.\d{0,2})\d*$/, '$1'); // Limit decimal places to two digits In this code:

//    if (isNaN(numericValue)) {
//        numericValue = '0';
//    }
//    if (numericValue.indexOf(".") > -1 && (numericValue.split('.')[1].length > 2)) {
//        numericValue=numericValue.substring(0, numericValue.length - 1);
//    }

//    // Handle leading zeros
//    if (numericValue.length > 1 && numericValue.charAt(0) === '0') {
//        numericValue = numericValue.slice(1); // Remove leading zero
//    }

//    // Set the default value to 0 if the input is empty
//    if (numericValue === '') {
//        numericValue = '0';
//    }

//    // Update the input value
//    // inputElement.value = numericValue;
//    obj.value=numericValue;
//}
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
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

function UpdateReceiveQty(ele) {
    var GrnBalanceQty = parseInt($(ele.parentElement.parentElement.children[5])[0].innerText);
    if ($(ele).val() != '') {
        if (parseInt($(ele).val()) < 0) {
            $(ele.parentElement.parentElement.children[7].children[0]).val(GrnBalanceQty);
            $(ele.parentElement.parentElement.children[8].children[0]).val('0');
        }
        else {
         
            var RtrnQty = parseInt($(ele).val());
            if (RtrnQty <= GrnBalanceQty) {
                $(ele.parentElement.parentElement.children[7].children[0]).val(GrnBalanceQty - RtrnQty);
            }
            else {
                $(ele.parentElement.parentElement.children[7].children[0]).val(GrnBalanceQty);
                $(ele.parentElement.parentElement.children[8].children[0]).val('0');
            }
        }
    }
    else {
        $(ele.parentElement.parentElement.children[7].children[0]).val(GrnBalanceQty);
        $(ele.parentElement.parentElement.children[8].children[0]).val('0');
    }
}

function CreateMaterialPurchaseGrn() {
    $('#divMaterialPurchaseGrnList').hide();
    $('#divMaterialPurchaseGrnDetailsList').hide();
    $('#divMaterialPurchaseGrnEntry').show();
    $('#divMaterialPurchaseOrderMasterDetails').show();
   $('#btnSave').show();
    $('#btnExport').hide();

    ClearAll();
}

function ViewMaterialPurchaseGrnList() {
    $('#divMaterialPurchaseGrnList').show();
    $('#divMaterialPurchaseGrnDetailsList').show();
    $('#divMaterialPurchaseGrnEntry').hide();
    $('#divMaterialPurchaseOrderMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindMaterialPurchaseGrnList();
}

function ClearAll() {
    $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
    $('#ddlVendor').select2('destroy');
    $('#ddlVendor').val('');
    $('#ddlVendor').select2();
    //$('#ddlOrder').select2('destroy');
    $('#ddlOrder').empty();
    $('#ddlOrder').html("<option value=''>-Select Purchase Order ID-</option>");
    //$('#ddlOrder').select2();
    //$('#ddlOrder').empty();
    $('#txtEntryDate').val('');
    $('#txtID').val('');
    $(".dat").val(today);
    $('#txtLoadingUnLoading').val('0');
    $('#txtRoundOff').val('0');
    $('#txtCGST').val('0');
    $('#txtSGST').val('0');
    $('#txtIGST').val('0');
    $('#txtDeadlineDate').val('');
    $('#txtReceiptDate').val('');
    $('#txtPaymentTerm').val('');
    $('#txtPurchaseAgreement').val('');
    $('#txtQuotationNo').val('');
    $('#ddlBranch').val('');
    $('#ddlDepartment').val('');
    GenerateOrderID();
    

}

function BindMaterialPurchaseGrnList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/FetchMaterialPurchaseGrnList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            hideLoader();
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGrnList').DataTable().clear();
            $('#tblMaterialPurchaseGrnList').DataTable().destroy();
            $('#tbody_MaterialPurchaseGrn_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + data[i].Id + '</td><td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + data[i].GrnEntryDate + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].OrderId != undefined ? data[i].OrderId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].GateInwardMasterId != undefined ? data[i].GateInwardMasterId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseGrn_List').html(html);
            // $('#tblMaterialPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblMaterialPurchaseGrnList').DataTable({
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

            $('#tblMaterialPurchaseGrnList tbody').on('change', 'input[type="checkbox"]', function () {
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

function ViewFile(MasterId) {
    if (MasterId) {
        window.open("wfMmMaterialPurchaseOrderDirectGrnEntry_display.aspx?id=" + MasterId);
    }
}
function FetchMaterialPurchaseGrnDetails(id) {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/FetchMaterialPurchaseGrnDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGrnDetails').DataTable().clear();
            $('#tblMaterialPurchaseGrnDetails').DataTable().destroy();
            $('#tbody_MaterialPurchaseGrnDetails').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                var MasterId = data[i].GrnMasterId;
                html = html + '<tr onclick="ViewFile(\'' + MasterId +'\');">'
                    //+ '<td style="display:none;" onclick="ViewFile("' + MasterId +'");"></td>'
                    + '<td>' + data[i].MaterialName + '</td>'
                    + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].GateInwordQtyReceive != undefined ? data[i].GateInwordQtyReceive : '') + '</td>'
                    + '<td>' + (data[i].QtyStockEntry != undefined ? data[i].QtyStockEntry : '') + '</td>'
                    + '<td>' + (data[i].QtyReturn != undefined ? data[i].QtyReturn : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td>' + (data[i].TotalAmt != undefined ? data[i].TotalAmt : '') + '</td>'
                    + '<td>' + (data[i].Packaging != undefined ? data[i].Packaging : '') + '</td>'
                    + '<td>' + (data[i].PackageQty != undefined ? data[i].PackageQty : '') + '</td>'
                    + '<td>' + (data[i].WareHouse != undefined ? data[i].WareHouse : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseGrnDetails').html(html);
            $('#tblMaterialPurchaseGrnDetails').DataTable();
            hideLoader();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindWarehouseDropdown() {
    var branchId = $('#ddlBranch').val();
    if (!branchId) {
        alertify.error('Branch ID is not selected.');
        $('.ddlWarehouse').empty();
        $('.ddlWarehouse').html("<option value=''>-Select Warehouse-</option>");
        return;
    }

    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/WarehouseList',
        data: JSON.stringify({ "branchId": branchId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            console.log('Loading warehouses...');
        },
        success: function (response) {
            console.log('Warehouse Data:', response);

            // Clear existing options in the warehouse dropdown
            $('.ddlWarehouse').empty();
            
            // Assuming the response is in response.d
            var warehouseData = JSON.parse(response.d);

            if (warehouseData && warehouseData.length > 0) {
                var optionsHtml = "<option value=''>-Select Warehouse-</option>";
                for (var i = 0; i < warehouseData.length; i++) {
                    optionsHtml += "<option value='" + warehouseData[i].Id + "'>" + warehouseData[i].Name + "</option>";
                }

                $('.ddlWarehouse').append(optionsHtml);

                // Reinitialize select2 if you are using it
                //$('#ddlWarehouse').select2();
            } else {
                console.log('No warehouses found.');
                $('.ddlWarehouse').append("<option value=''>No Warehouses Available</option>");
            }
        },
        complete: function () {
            console.log('Warehouse data loading complete.');
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            console.log('Error fetching warehouse data:', errorThrown);
        }
    });
}

function BindMaterialPackagingDropdown(materialid,callback,index) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/MaterialPackagingList',
        data: JSON.stringify({
            "materialid": materialid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlPackage').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Package-</option>";
            for (var j = 0; j < JSON.parse(response.d).length; j++) {
                req = req + "<option value='" + JSON.parse(response.d)[j].id + "'>" + JSON.parse(response.d)[j].Packaging + "</option>";
            }
            $('#ddlPackage').append(req);
            callback(index);
           
        },
        complete: function () {
          
        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function AddMaterialPurchaseOrderDirectGrnEntry() {
    if ($('#txtEntryDate').val() == '') {
        alertify.error('Please enter entry date');
        return;
    }
    else if ($('#ddlVendor').val() == '') {
        alertify.error('Please select any vendor');
        return;
    }
   
    else if ($('#ddlBranch').val() == '') {
        alertify.error('Please select any branch');
        return;
    }
    else if ($('#ddlDepartment').val() == '') {
        alertify.error('Please select any department');
        return;
    }

    var hasRows = $('#tbody_MaterialPurchaseOrderMasterDetails tr').length > 0;
    if (!hasRows) {
        alertify.error('Please Select Purchase Order');
        return;
    }
    var found = false;
    // Iterate over each <tr> element
    $('#tbody_MaterialPurchaseOrderMasterDetails').find('tr').each(function () {
        // Find the select element with id 'ddlWarehouse' within this <tr>
        var warehouseSelect = $(this).find('#ddlWarehouse');

        // Check if the selected value of the warehouse dropdown is empty
        if (!warehouseSelect.val()) {
            // Set the flag to true if any warehouse is not selected
            found = true;
            // Break out of the loop since we've found at least one warehouse not selected
            return false;
        }

        var RcvQty = $(this).find('.RcvQty');

        // Check if the warehouse input value is empty
        if (RcvQty.val() === '') {
            // Set the flag to true if any warehouse is not selected
            found = true;
            // Break out of the loop since we've found at least one warehouse not selected
            return false;
        }

        var RtrnQty = $(this).find('.RtrnQty');

        // Check if the warehouse input value is empty
        if (RtrnQty.val() === '') {
            // Set the flag to true if any warehouse is not selected
            found = true;
            // Break out of the loop since we've found at least one warehouse not selected
            return false;
        }



        var UnitPrice = $(this).find('.UnitPrice');

        // Check if the warehouse input value is empty
        if (UnitPrice.val() === '' || UnitPrice.val() === '0') {
            // Set the flag to true if any warehouse is not selected
            found = true;
            // Break out of the loop since we've found at least one warehouse not selected
            return false;
        }
        var cgst = $(this).find('.CGST');
        if (cgst.val() === '') {
            found = true;
            alertify.error('Please enter valid CGST')
            return false;
        }
        var sgst = $(this).find('.SGST');
        if (sgst.val() === '') {
            found = true;
            alertify.error('Please enter valid SGST')
            return false;
        }
        var igst = $(this).find('.IGST');
        if (igst.val() === '') {
            found = true;
            alertify.error('Please enter valid IGST')
            return false;
        }
        var freightCrg = $(this).find('.FreightCrg');
        if (freightCrg.val() === '') {
            found = true;
            alertify.error('Please enter valid Freight Charge')
            return false;
        }
        var loading = $(this).find('.Loading');
        if (loading.val() === '') {
            found = true;
            alertify.error('Please enter valid LoadingUnLoading')
            return false;
        }
    });
    // Check the flag value
    if (found) {
        // If the flag is true, it means at least one warehouse is not selected
        alertify.error('Please enter receive quantity,return quantity,Unit price and warehouse on purchase details list');
        return;
    } 

    var data = [];
    $("#tbody_MaterialPurchaseOrderMasterDetails tr").each(function (i) {
      
            var materialID = $(this)[0].cells[0].innerText;
            var QtyOrder = $(this)[0].cells[2].innerText;
            var QtyRecieve = $(this).find('.RcvQty').val();//$(this)[0].cells[7].innerText;
            var QtyReturn = $(this).find('.RtrnQty').val();//$(this)[0].cells[8].innerText;
            var WareHouseId = $(this).find('#ddlWarehouse').val();
            //var Description = $(this).find('.descptn').val();
            var PackageId = $(this).find('#ddlPackage').val();
            var PackageQuantity = $(this).find('.PckgQty').val();
            var Rate = $(this).find('.UnitPrice').val();
            var CGST = $(this).find('.CGST').val();
            var SGST = $(this).find('.SGST').val();
            var IGST = $(this).find('.IGST').val();
            var FreightCrg = $(this).find('.FreightCrg').val();
            var Loading = $(this).find('.Loading').val();
            var RoundOff = $(this).find('.RoundOff').val();
            var GrossAmt = $(this).find('.GrossAmt').val();
            var TaxableAmt = $(this).find('.TaxableAmt').val();
        data.push({
            ItemID: materialID, Quantity: QtyOrder, QtyRecieve: QtyRecieve, QtyReturn: QtyReturn, WareHouseId: WareHouseId,
            PackageId: PackageId, PackageQuantity: PackageQuantity, Rate: Rate, CentralTaxPercent: CGST, StateTaxPercent: SGST,
            IntegratedTaxPercent: IGST, Freight: FreightCrg, Loading: Loading, Rnd: RoundOff, Amount: GrossAmt, TaxableAmt:TaxableAmt
        });


    });
  
    showLoader();
    // Send data to server using AJAX
    $.ajax({
        type: "POST",
        url: "wfMmMaterialPurchaseOrderDirectGrnEntry.aspx/AddMaterialPurchaseOrderDirectGrnEntry", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            data: data,
            "GRNID": $('#txtID').val(),
            "PurchaseOrderId": $('#ddlOrder').val(),
            "EntryDate": $('#txtEntryDate').val(),
            "Vendor": $('#ddlVendor').val(),
              "BranchCode": $('#ddlBranch').val(),
            "Active": $('#ddlActive').val(),
            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
        }),
        dataType: "json",
        success: function (result) {
            var r = JSON.parse(result.d);
            if (r.status == "success") {
                setTimeout(function () {
                    hideLoader();
                    alertify.success('Purchase Order Grn details added successfully');
                    ClearAll();
                }, 1000);

            }
            else {
                console.log("response:", r);
                console.log("error log:", r.msg);
                alertify.error('Something went wrong, please try again later');
            }
        },
        failure: function (result) {
            var r = JSON.parse(result.d);
            console.log("error log:", r.msg);
            alertify.error('failure. Something went wrong, please try again later');
        },
        error: function (result) {
            console.log(result);
            var r = JSON.parse(result.statusText);
            console.log("error log:", r);
            alertify.error('Error. Something went wrong, please try again later');
        }
    });
}