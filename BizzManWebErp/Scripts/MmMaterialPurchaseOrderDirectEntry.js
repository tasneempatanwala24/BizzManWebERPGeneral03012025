var today = moment().format("YYYY-MM-DD");
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlVendor').select2({
        width: '100%'
    });
    $('#ddlMaterialName').select2();
    BindVendorDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown();
    BindMaterialPurchaseOrderList();
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
            AddMaterialPurchaseOrder();

            // Optionally, display a message or perform any other actions
            console.log('Save action triggered');
        }
    });
    var selectedRowsData = [];

    // Handle individual checkbox change event
    $('#tblMaterialPurchaseOrderList tbody').on('change', 'input[type="checkbox"]', function () {
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
        var table = $('#tblMaterialPurchaseOrderList').DataTable();

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
        var totalCheckboxes = $('#tblMaterialPurchaseOrderList tbody input[type="checkbox"]').length;
        var checkedCheckboxes = $('#tblMaterialPurchaseOrderList tbody input[type="checkbox"]:checked').length;

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
        $('#tblMaterialPurchaseOrderList thead th').each(function (index) {
            if (index !== 0 && index !== $('#tblMaterialPurchaseOrderList thead th').length - 1) {
                headers.push($(this).text().trim());
            }
        });

        // Prepare data to be exported, excluding first and last columns from selected rows
        var ws_data = [headers];

        selectedRowsData.forEach(function (rowData) {
            var row = rowData.slice(1, rowData.length - 1); // Exclude first (checkbox) and last (action) columns
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
        XLSX.utils.book_append_sheet(wb, ws, 'PODirectEntry');

        // Write workbook to file
        XLSX.writeFile(wb, 'PurchaseOrder.xlsx');
    });



});
var loanAppId = "";
function ViewFile() {
    if (loanAppId) {
        window.open("wfMmMaterialPurchaseOrderDirectEntry_display.aspx?id=" + loanAppId);
    }
}
//=======================================
//=======================================
function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Optionally, you can show a loading spinner here if needed.
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "<option value=''>-Select Department-</option>";

            // Loop through the response and append the department options
            for (var i = 0; i < data.length; i++) {
                department += "<option value='" + data[i].Id + "'>" + data[i].DeptName + "</option>";
            }

            // Append all the department options to the dropdown
            $('#ddlDepartment').html(department);

            // Set the first option as selected if there are any records
            if (data.length > 0) {
                $('#ddlDepartment').val(data[0].Id);
            }
        },
        complete: function () {
            // Optionally, you can hide the loading spinner here if needed.
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            // Handle any errors here
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
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/BranchMasterList',
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
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/VendorList',
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

function CreateMaterialPurchaseOrder() {
    $('#divMaterialPurchaseOrderList').hide();
    $('#divMaterialPurchaseOrderEntry').show();
    $('#divSalesOrderDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();
    $('#previewBtn').hide();
    
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
    
    
}

function ViewMaterialPurchaseOrderList() {
    $('#divMaterialPurchaseOrderList').show();
    $('#divMaterialPurchaseOrderEntry').hide();
    $('#divSalesOrderDetails').hide();
    $('#previewBtn').hide();
    $('#divMaterialPurchaseOrderMasterList').hide();
    $('#divMaterialPurchaseOrderMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindMaterialPurchaseOrderList();
}
function ClearAll() {
    $('#tbody_MaterialPurchaseOrderMasterList').html('');
    $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
    $('#tbody_SalesOrderDetails').children('tr:not(:first)').remove();
    $('#ddlVendor').select2('destroy');
    $('#ddlVendor').val('');
    $('#ddlVendor').select2();
    $('#txtEntryDate').val('');
    $('#txtID').val('');
    $(".dat").val(today);
    $('#txtLoadingUnLoading').val('');
    $('#txtRoundOff').val('');
    $('#txtPaymentTerm').val('');
    $('#txtPurchaseAgreement').val('');
    $('#txtQuotationNo').val('');
    $('#ddlBranch').val('');
    $('#ddlDepartment').val('');
    $('#txtFreightCharge').val('');
    $('#ddlMaterialName').select2('destroy');
    $('#ddlMaterialName').val('');
    $('#ddlMaterialName').select2();
    $('#txtMaterialQty').val('');
    $('#txtMaterialUnitMeasure').val('');
    $('#txtMaterialRate').val('');
    $('#txtMaterialTotalAmount').val('');
    $('#txtCGST').val('');
    $('#txtSGST').val('');
    $('#txtIGST').val('');
   // $('#txtDesciption').val('');
    $('#txtTaxableAmt').val('');
    $('#txtMaterialStock').val('');
    $('#previewBtn').hide();
    // Set the default department value (if available)
    
        var firstDepartmentValue = $('#ddlDepartment option:eq(1)').val(); 
        if (firstDepartmentValue) {
            $('#ddlDepartment').val(firstDepartmentValue).trigger('change');
        }
    $('#chkAskConfirm').prop('checked', false);
    GenerateOrderID();
}

function BindMaterialPurchaseOrderList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/FetchMaterialPurchaseOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            setTimeout(function () {
                hideLoader();
                $('#tblMaterialPurchaseOrderList').DataTable().clear();
                $('#tblMaterialPurchaseOrderList').DataTable().destroy();
                $('#tbody_MaterialPurchaseOrder_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td  onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + data[i].Id + '</td><td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + data[i].VendorName + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].OrderEntryDate != undefined ? data[i].OrderEntryDate : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].OrderDeadlineDate != undefined ? data[i].OrderDeadlineDate : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + data[i].ReceiptDate + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].DeptName != undefined ? data[i].DeptName : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].PaymentTerm != undefined ? data[i].PaymentTerm : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].PurchaseAgreement != undefined ? data[i].PurchaseAgreement : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].QuotationNo != undefined ? data[i].QuotationNo : '') + '</td>'
                        + '<td><a onclick="DeleteMaterialPurchaseOrder(\'' + data[i].Id + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
                }
                $('#tbody_MaterialPurchaseOrder_List').html(html);
                // $('#tblMaterialPurchaseOrderList').DataTable();

                var d = new Date();
                var table = $('#tblMaterialPurchaseOrderList').DataTable({
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

                $('#tblMaterialPurchaseOrderList tbody').on('change', 'input[type="checkbox"]', function () {
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
            }, 1000); // Hide loader after 3 seconds


           



        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

//function AddMaterialPurchaseOrder() {
//    var purchaseOrderDetails = '';
//    var chk = 0;
//    var AskConfirm = 'N';
//    $('#tbody_MaterialPurchaseOrderMasterDetails tr').each(function (index1, tr) {
//        chk = 0;
//        $(tr).find('td').each(function (index, td) {
//            if (index == 0) {
//                if ($($(td).find('input:checkbox')[0]).is(":checked")) {
//                    chk = 1;
//                }
//            }

//            if (index == 1) {
//                if (chk == 1) {
//                    if (purchaseOrderDetails == '') {
//                        purchaseOrderDetails = td.outerText;
//                    }
//                    else {
//                        purchaseOrderDetails = purchaseOrderDetails + ',' + td.outerText;
//                    }
//                }
//            }

//        });
//    });

//    if ($('#chkAskConfirm').is(":checked")) {
//        AskConfirm = 'Y';
//    }

//    if ($('#txtEntryDate').val() != '') {
//        if ($('#ddlVendor').val() != '') {
//            if ($('#txtDeadlineDate').val() != '') {
//                if ($('#txtReceiptDate').val() != '') {
//                    if ($('#ddlBranch').val() != '') {
//                        if ($('#ddlDepartment').val() != '') {
//                            if (purchaseOrderDetails != '') {
//                                $.ajax({
//                                    type: "POST",
//                                    url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/AddMaterialPurchaseOrder',
//                                    data: JSON.stringify({
//                                        "OrderID": $('#txtID').val(),
//                                        "EntryDate": $('#txtEntryDate').val(),
//                                        "Vendor": $('#ddlVendor').val(),
//                                        "DeadlineDate": $('#txtDeadlineDate').val(),
//                                        "ReceiptDate": $('#txtReceiptDate').val(),
//                                        "PurchaseOrderDetails": purchaseOrderDetails,
//                                        "AskConfirm": AskConfirm,
//                                        "PaymentTerm": $('#txtPaymentTerm').val(),
//                                        "PurchaseAgreement": $('#txtPurchaseAgreement').val(),
//                                        "QuotationNo": $('#txtQuotationNo').val(),
//                                        "BranchCode": $('#ddlBranch').val(),
//                                        "DepartmentId": $('#ddlDepartment').val(),
//                                        "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
//                                    }),
//                                    contentType: "application/json; charset=utf-8",
//                                    dataType: "json",
//                                    beforeSend: function () {

//                                    },
//                                    success: function (response) {
//                                        if ($('#txtID').val() == '') {
//                                            alertify.success('Material purchase order details added successfully');
//                                            ClearAll();
//                                        }
//                                        else {
//                                            alertify.success('Material purchase order details updated successfully');
//                                        }
//                                    },
//                                    complete: function () {

//                                    },
//                                    failure: function (jqXHR, textStatus, errorThrown) {

//                                    }
//                                });
//                            }
//                            else {
//                                alertify.error('Please select purchase quotation master data and detail data');
//                            }
//                        }
//                        else {
//                            alertify.error('Please select any department');
//                        }
//                    }
//                    else {
//                        alertify.error('Please select any branch');
//                    }
//                }
//                else {
//                    alertify.error('Please enter receipt date');
//                }
//            }
//            else {
//                alertify.error('Please enter deadline date');
//            }
//        }
//        else {
//            alertify.error('Please select any vendor');
//        }
//    }
//    else {
//        alertify.error('Please enter entry date');
//    }
//}

function AddMaterialPurchaseOrder() {
    if ($('#txtEntryDate').val() == '') {
        alertify.error('Please enter entry date');
        return;
    }
    else if ($('#ddlVendor').val() == '') {
        alertify.error('Please select any vendor');
        return;
    }
    //else if ($('#txtDeadlineDate').val() == '') {
    //    alertify.error('Please enter deadline date');
    //    return;
    //}
    //else if ($('#txtReceiptDate').val() == '') {
    //    alertify.error('Please enter receipt date');
    //    return;
    //}
    else if ($('#ddlBranch').val() == '') {
        alertify.error('Please select any branch');
        return;
    }
    //else if ($('#ddlDepartment').val() == '') {
    //    alertify.error('Please select any department');
    //    return;
    //}
    var AskConfirm = 'N';
    if ($('#chkAskConfirm').is(":checked")) {
        AskConfirm = 'Y';
    }
    var hasRows = $('#tbody_SalesOrderDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add Purchase Order Lines');
        return;
    }
    showLoader();
    var data = [];
    $("#tbody_SalesOrderDetails tr").each(function (i) {
        if (i > 0) {
            var materialID = $(this)[0].cells[0].innerText;
            var Qty = $(this)[0].cells[3].innerText;
            var UnitMeasure = $(this)[0].cells[4].innerText;
            var Rate = $(this)[0].cells[5].innerText;
            var taxable = $(this)[0].cells[6].innerText;
            var cgst = $(this)[0].cells[7].innerText;
            var sgst = $(this)[0].cells[8].innerText;
            var igst = $(this)[0].cells[9].innerText;
            var freight = $(this)[0].cells[10].innerText;
            var loading = $(this)[0].cells[11].innerText;
            var rnd = $(this)[0].cells[12].innerText;
            var amount = $(this)[0].cells[13].innerText;
            //var description = $(this)[0].cells[14].innerText;
            data.push({
                ItemID: materialID, Quantity: Qty, Rate: Rate, UnitMeasure: UnitMeasure,
                TaxableAmt: taxable, CentralTaxPercent: cgst, StateTaxPercent: sgst, IntegratedTaxPercent: igst, Freight: freight,
                Loading: loading, Rnd: rnd,Amount: amount
            });

        }




    });

    // Send data to server using AJAX
    $.ajax({
        type: "POST",
        url: "wfMmMaterialPurchaseOrderDirectEntry.aspx/AddMaterialPurchaseOrder", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            data: data,
            "OrderID": $('#txtID').val(),
            "EntryDate": $('#txtEntryDate').val(),
            "Vendor": $('#ddlVendor').val(),
            "DeadlineDate": $('#txtDeadlineDate').val(),
            "ReceiptDate": $('#txtReceiptDate').val(),
            "AskConfirm": AskConfirm,
            "PaymentTerm": $('#txtPaymentTerm').val(),
            "PurchaseAgreement": $('#txtPurchaseAgreement').val(),
            "QuotationNo": $('#txtQuotationNo').val(),
            "BranchCode": $('#ddlBranch').val(),
            "DepartmentId": $('#ddlDepartment').val(),
            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
        }),
        dataType: "json",
        success: function (result) {
            var r = JSON.parse(result.d);
            if (r.status == "success") {
                setTimeout(function () {
                    hideLoader();
                    alertify.success('Purchase Order details added successfully');
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



function DeleteMaterialPurchaseOrder(id) {
    alertify.confirm('Confirm Material Purchase Order Delete', 'Are you sure, you want to delete material purchase order entry ?', function () {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/DeleteMaterialPurchaseOrder',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                alertify.success('Material purchase order details deleted successfully');
                BindMaterialPurchaseOrderList();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
        , function () { });
}




function FetchMaterialPurchaseOrderDetails(id) {
    ClearAll();
    $('#btnExport').hide();
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/FetchMaterialPurchaseOrderDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtID').val(JSON.parse(response.d)[0].Id);
            $('#ddlVendor').select2('destroy');
            $('#ddlVendor').val(JSON.parse(response.d)[0].VendoreId);
            $('#ddlVendor').select2();
            $('#txtPaymentTerm').val(JSON.parse(response.d)[0].PaymentTerm);
            $('#txtPurchaseAgreement').val(JSON.parse(response.d)[0].PurchaseAgreement);
            $('#txtQuotationNo').val(JSON.parse(response.d)[0].QuotationNo);
            $('#ddlBranch').val(JSON.parse(response.d)[0].BranchCode);
            $('#ddlDepartment').val(JSON.parse(response.d)[0].DepartmentId);
            loanAppId = JSON.parse(response.d)[0].Id;
            if (JSON.parse(response.d)[0].AskConfirmation == 'Y') {
                $('#chkAskConfirm').prop('checked', true);
            }
            //var dt = new Date(JSON.parse(response.d)[0].OrderEntryDate);
            //document.getElementById("txtEntryDate").valueAsDate = dt;

            var dt = new Date(JSON.parse(response.d)[0].OrderEntryDate);
            dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
            var formattedOrderDate = dt.toISOString().split('T')[0];
            document.getElementById("txtEntryDate").value = formattedOrderDate;
            
            var dt1 = new Date(JSON.parse(response.d)[0].OrderDeadlineDate);
            dt1.setMinutes(dt1.getMinutes() - dt1.getTimezoneOffset());
            var formattedDDDate = dt1.toISOString().split('T')[0];
            document.getElementById("txtDeadlineDate").value = formattedDDDate;

            var dt2 = new Date(JSON.parse(response.d)[0].ReceiptDate);
            dt2.setMinutes(dt2.getMinutes() - dt2.getTimezoneOffset());
            var formattedReceiptDate = dt2.toISOString().split('T')[0];
            document.getElementById("txtReceiptDate").value = formattedReceiptDate;

            FetchMaterialPurchaseOrderDetailsList(id);
            $('#divMaterialPurchaseOrderList').hide();
            $('#divSalesOrderDetails').show();
            $('#divMaterialPurchaseOrderEntry').show();
            $('#btnSave').show();
            $('#previewBtn').show();
            hideLoader();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}





function FetchMaterialPurchaseOrderDetailsList(id) {
    $('#tbody_SalesOrderDetails').children('tr:not(:first)').remove();

    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/FetchMaterialPurchaseOrderDetailsList',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_SalesOrderDetails').append('<tr><td style="display: none;">' + data[i].MaterialMasterId + '</td>'
                    + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : "") + '</td>'
                    + '<td>' + (data[i].Stock != undefined ? data[i].Stock : "") + '</td>'
                    + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : "") + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : "") + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : "") + '</td>'
                    + '<td>' + (data[i].TaxbleAmt != undefined ? data[i].TaxbleAmt : "") + '</td>'
                    + '<td>' + (data[i].CgstPercent != undefined ? data[i].CgstPercent : "") + '</td>'
                    + '<td>' + (data[i].SgstPercent != undefined ? data[i].SgstPercent : "") + '</td>'
                    + '<td>' + (data[i].IgstPercent != undefined ? data[i].IgstPercent : "") + '</td>'
                    + '<td>' + (data[i].FreightCharge != undefined ? data[i].FreightCharge : "") + '</td>'
                    + '<td>' + (data[i].LoadingUnLoading != undefined ? data[i].LoadingUnLoading : "") + '</td>'
                    + '<td>' + (data[i].RoundOff != undefined ? data[i].RoundOff : "") + '</td>'
                    + '<td>' + (data[i].TotalAmt != undefined ? data[i].TotalAmt : "") + '</td>'
                    //+ '<td>' + (data[i].Description != undefined ? data[i].Description : "") + '</td>'
                    + '<td><a onclick="DeleteSalesOrderDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
            }




        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function DownloadFile() {
    
    var chk = 0;
    var orderid = '';
    $('#tbody_MaterialPurchaseOrder_List tr').each(function (index1, tr) {
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
                    if (orderid == '') {
                        orderid = td.outerText;
                    }
                    else {
                        orderid = orderid + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (orderid != '') {
        showLoader();
        $.ajax({
            type: "POST",
            url: "wfMmMaterialPurchaseOrderDirectEntry.aspx/FetchMaterialPurchaseOrderListDownload",
            data: JSON.stringify({
                "orderid": orderid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaPurchaseOrder_' + d.toDateString() + '.xlsx';
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
                    hideLoader();
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
        $('#tbody_SalesOrderDetails tr').each(function (i) {
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
            url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/FetchMaterialDetails',
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

function SaveSalesOrderDetails() {

    if ($('#ddlMaterialName').val() != '') {
        if ($('#txtMaterialQty').val() == '' || $('#txtMaterialQty').val() == '0') {
            alertify.error('Please enter valid Quantity');
            return;
        }
        else if ($('#txtMaterialRate').val() == '' || $('#txtMaterialRate').val() == '0') {
            alertify.error('Please enter valid Rate');
            return;
        }
        
        else if ($('#txtCGST').val() == '' || $('#txtCGST').val() < '0') {
            alertify.error('Please enter valid CGST');
            return;
        }
        else if ($('#txtSGST').val() == '' || $('#txtSGST').val() < '0') {
            alertify.error('Please enter valid SGST');
            return;
        }
        else if ($('#txtIGST').val() == '' || $('#txtIGST').val() < '0') {
            alertify.error('Please enter valid IGST');
            return;
        }
        else if ($('#txtFreightCharge').val() == '' || $('#txtFreightCharge').val() < '0') {
            alertify.error('Please enter valid Freight Charge');
            return;
        }
        else if ($('#txtLoadingUnLoading').val() == '' || $('#txtLoadingUnLoading').val() < '0') {
            alertify.error('Please enter valid Loading UnLoading');
            return;
        }
        const gstValid = GSTValidation();
        if (!gstValid) {
            alertify.error('GST input not correct');
            return;
        }
        if ($('#txtMaterialQty').val() != '' && $('#txtMaterialQty').val() != '0') {
            
            //if ($('#ddlPackage').val() != '') {
            $('#tbody_SalesOrderDetails').append('<tr><td style="display: none;">' + $('#ddlMaterialName').val() + '</td>'
                + '<td>' + $("#ddlMaterialName option:selected").text() + '</td>'
                + '<td>' + $("#txtMaterialStock").val() + '</td>'
                + '<td>' + $("#txtMaterialQty").val() + '</td>'
                + '<td>' + $("#txtMaterialUnitMeasure").val() + '</td>'
                + '<td>' + $("#txtMaterialRate").val() + '</td>'
                + '<td>' + $("#txtTaxableAmt").val() + '</td>'
                + '<td>' + $("#txtCGST").val() + '</td>'
                + '<td>' + $("#txtSGST").val() + '</td>'
                + '<td>' + $("#txtIGST").val() + '</td>'
                + '<td>' + $("#txtFreightCharge").val() + '</td>'
                + '<td>' + $("#txtLoadingUnLoading").val() + '</td>'
                + '<td>' + $("#txtRoundOff").val() + '</td>'
                + '<td>' + $("#txtMaterialTotalAmount").val() + '</td>'
               // + '<td>' + $("#txtDesciption").val() + '</td>'
                + '<td><a onclick="DeleteSalesOrderDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                + '</tr>');

            $('#ddlMaterialName').val('');
            $('#txtMaterialUnitMeasure').val('');
            $('#txtMaterialRate').val('');
            $('#txtMaterialStock').val('');
            $('#txtCGST').val('');
            $('#txtSGST').val('');
            $('#txtIGST').val('');
            $('#txtMaterialStock').val('');
            $('#txtMaterialQty').val('');
            $('#txtMaterialUnitMeasure').val('');
            $('#txtMaterialRate').val('');
            $('#txtTaxableAmt').val('');
            $('#txtFreightCharge').val('');
            $('#txtLoadingUnLoading').val('');
            $('#txtRoundOff').val('');
            $('#txtMaterialTotalAmount').val('');
            //$('#txtDesciption').val('');
                      
            
        }
        else {
            alertify.error('Please enter material quantity');
        }
    }
    else {
        alertify.error('Please select any material name');
    }


}


function DeleteSalesOrderDetailEntry(ele) {
   

    $(ele.parentElement.parentElement).remove();
    //calculateGrandTotal();
}


function GenerateOrderID() {
    if ($('#txtEntryDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/GenerateOrderID',
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

function BindMaterialMasterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/MaterialMasterList',
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
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id+'-'+JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlMaterialName').append(req);
            $('#ddlMaterialName').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
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
function UpdateTaxableAmount() {
    if ($('#txtMaterialQty').val() != '') {
        if ($('#ddlMaterialName').val() != '') {   
            var qty = isEmpty($('#txtMaterialQty').val()) ? "0" : parseFloat($('#txtMaterialQty').val());
            var rate = isEmpty($('#txtMaterialRate').val()) ? "0" : parseFloat($('#txtMaterialRate').val());
            var taxableAmnt = (qty * rate);
            //taxableAmnt = parseFloat(taxableAmnt); 
            taxableAmnt = (isNaN(taxableAmnt) || taxableAmnt === 0) ? 0 : (parseFloat(taxableAmnt.toFixed(2)));
            $('#txtTaxableAmt').val(taxableAmnt.toFixed(2));
            UpdateTotalAmount();
        }
        else {
            $('#txtMaterialQty').val('');
            alertify.error('Please select any material first');
        }
    }
    else {
        //$('#txtMaterialTotalAmount').val('');
        $('#txtMaterialTotalAmount').val('0');
    }
}  
function GSTValidation() {
    let CGST = 0, SGST = 0, IGST = 0;

    // Fetch the values and ensure they are numeric
    CGST = isNaN(parseFloat($('#txtCGST').val())) ? 0 : parseFloat($('#txtCGST').val());
    SGST = isNaN(parseFloat($('#txtSGST').val())) ? 0 : parseFloat($('#txtSGST').val());
    IGST = isNaN(parseFloat($('#txtIGST').val())) ? 0 : parseFloat($('#txtIGST').val());

    // Case 1: If CGST and SGST are both greater than 0, IGST must be 0
    if ((CGST + SGST) > 0) {
        $('#txtIGST').val(0); // Set IGST to 0 if CGST and SGST are provided
    }
    // Case 2: If IGST is greater than 0, CGST and SGST must be 0
    else if (IGST > 0) {
        $('#txtCGST').val(0);
        $('#txtSGST').val(0);
    }
    // Case 3: If all values are 0, it's allowed (no GST applied)
    // We don't need to show an error here, it's valid if no GST is applied.
    else if ((CGST === 0 && SGST === 0) && IGST === 0) {
        // No action needed; return true as this is a valid case
        UpdateTotalAmount();
        return true;
    }
    UpdateTotalAmount();
    // If validation passes (valid GST combination), return true
    return true;
}


function UpdateTotalAmount() {
    var fg = 0, taxableAmnt = 0, CGST = 0, SGST = 0, IGST = 0;
    var load = 0, totalAmnt = 0, rnd = 0;
    // Ensure all input values are parsed as floats and default to 0 if empty
    fg = isEmpty($('#txtFreightCharge').val()) ? 0 : parseFloat($('#txtFreightCharge').val());
    CGST = isEmpty($('#txtCGST').val()) ? 0 : parseFloat($('#txtCGST').val());
    SGST = isEmpty($('#txtSGST').val()) ? 0 : parseFloat($('#txtSGST').val());
    IGST = isEmpty($('#txtIGST').val()) ? 0 : parseFloat($('#txtIGST').val());
    load = isEmpty($('#txtLoadingUnLoading').val()) ? 0 : parseFloat($('#txtLoadingUnLoading').val());
    taxableAmnt = isEmpty($('#txtTaxableAmt').val()) ? 0 : parseFloat($('#txtTaxableAmt').val());

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
    $('#txtMaterialTotalAmount').val(roundOff.toFixed(2));  // Display total rounded to 2 decimal places
    $('#txtRoundOff').val(rnd.toFixed(2));  // Display round off difference to 2 decimal places
}

function PrintPreview() {
    showLoader();

    // Call the server-side method to get the PDF content
    $.ajax({
        type: 'POST',
        url: 'wfMmMaterialPurchaseOrderDirectEntry.aspx/GetPdfContent',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            "SalesOrderId": $('#txtID').val()
        }),
        dataType: 'json',
        success: function (response) {
            setTimeout(function () {
                hideLoader();


                // Display the PDF content in the modal
                $('#pdfPreview').attr('src', 'data:application/pdf;base64,' + response.d);
                $('#pdfModal').modal('show');
                $('.modal-backdrop').remove();
            }, 1000); // Hide loader after 3 seconds

        },
        error: function (xhr, status, error) {
            console.log('Error fetching PDF:', error);
        }
    });

}

function ClosePDFModal() {
    $('#pdfModal').modal('hide');
}