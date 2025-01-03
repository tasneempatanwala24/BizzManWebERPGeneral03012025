var PhotoImg = ""; var SubCategory = ""; var Branch = ""; var Department = ""; var LinkItemUM = ""; var LItemQty = 0;
var MaterialCategoryName = ""; var CostingMethod = "FIFO"; var LinkItem = "n"; var LinkItemName = ""; var Id = 0;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindMainCategoryNameDropdown();
    BindProjectDropdown();
    BindCategoryNameDropdown();
    BindSubCategoryNameDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown();
    BindPackageDropdown();
    BindUnitMesureDropdown();
    BindMaterialGroupDropdown();
    //BindLinkItemDropdown();
    BindCurrencyDropdown();
    BindVendorDropdown();
    BindMaterialList();
    $("#ddlPackage").on("change", function () {
        if ($("#ddlPackage").val() != '') { BindUOM(); }
        else { $('#txtPackageUnitMeasure').val(''); }
    }).trigger("change");
    //$("#ddlLinkItemName").on("change", function () {
    //    if ($("#ddlLinkItemName").val() != '') { BindLinkItemUOM(); }
    //    else { $('#txtLinkItemUM').val(''); }
    //}).trigger("change");
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
    $('.dcmlNo4').keypress(function (event) {
        var value = $(this).val();
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
        if (value.indexOf('.') != -1) {
            var decimalPosition = value.indexOf('.');
            if (value.substring(decimalPosition + 1).length >= 1) {
                $(this).val(value.substring(0, decimalPosition + 4));
            }
        }
    });
    $('.GST_Calculate').bind("change", function (element) {
        var CentralTax = 0;
        var StateTax = 0;
        var Cess = 0;
        if ($('#txtCentralTax').val() != '') {
            CentralTax = parseFloat($('#txtCentralTax').val());
        }
        if ($('#txtStateTax').val() != '') {
            StateTax = parseFloat($('#txtStateTax').val());
        }
        if ($('#txtCess').val() != '') {
            Cess = parseFloat($('#txtCess').val());
        }
        $('#txtIntegratedTax').val((CentralTax + StateTax + Cess).toFixed(2));
    });
    keepDatalistOptions('.keepDatalist');
    $('#btnDisplayData').on('click', function () {
        // Image data URL
        var imageDataUrl = PhotoImg;
        // Create HTML content with the image
        var htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Image Viewer</title></head><body><img src="' + imageDataUrl + '"></body></html>';

        // Open the HTML content in a new tab
        var newTab = window.open();
        newTab.document.open();
        newTab.document.write(htmlContent);
        newTab.document.close();
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
            AddDetails();

            // Optionally, display a message or perform any other actions
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

    $('#btnExport').on('click', function () {
        if (selectedRowsData.length === 0) {
            alertify.error("Please select at least one row to export.");
            return;
        }

        // Create a new workbook
        var wb = XLSX.utils.book_new();

        // Get table headers, including the first and last columns
        var headers = [];
        $('#tblMaterialList thead th').each(function (index) {
            if (index !== 0 && index !== $('#tblMaterialList thead th').length) {
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
        XLSX.utils.book_append_sheet(wb, ws, 'ProductMaster');

        // Write workbook to file
        XLSX.writeFile(wb, 'ProductMaster.xlsx');
    });
});
function ViewFile() {
    if (Id) {
        window.open("wfSdProductMaster_Display.aspx?id=" + Id);
    }
}
function BindProjectDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/ProjectList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#ddlProject').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value='0'>-Select Project-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].ProjectName + "</option>";
            }
            $('#ddlProject').append(branch);
            if (data.length > 0) {
                $('#ddlProject').val(data[0].Id); // Automatically select the first project
            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindUOM() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/FetchUOM',
        data: JSON.stringify({
            "PackageName": $('#ddlPackage').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtPackageUnitMeasure').val(data[0].UnitMesure);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindCurrencyDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/BindCurrencyList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#ddlCurrency').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Currency-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Currency + "</option>";
            }
            $('#ddlCurrency').append(branch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindLinkItemDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/LinkItemList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#ddlLinkItemName').html('');
            var data = JSON.parse(response.d);
            var dtList = "<option value=''>-Select Link Item Name-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dtList = dtList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlLinkItemName').append(dtList);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindPackageDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/BindPackageList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#ddlPackage').html('');
            var data = JSON.parse(response.d);
            var package = "<option value=''>-Select Packaging-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                package = package + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].PackagingName + "</option>";
            }
            $('#ddlPackage').append(package);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindLinkItemUOM() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/FetchLinkItemUOM',
        data: JSON.stringify({
            "LinkItemName": $('#ddlLinkItemName').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtLinkItemUM').val(data[0].UnitMesure);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/BindVendorList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#ddlVendor').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Vendor-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].VendorName + "</option>";
            }
            $('#ddlVendor').append(branch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            Branch = data[0].BranchCode;
           
        },
        //success: function (response) {
        //    $('#ddlBranch').html('');
        //    var data = JSON.parse(response.d);
        //    var branch = "<option value=''>-Select Branch-</option>";
        //    for (var i = 0; i < JSON.parse(response.d).length; i++) {
        //        branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
        //    }
        //    $('#ddlBranch').append(branch);
        //},
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            Department = data[0].Id;
           
        },
        //success: function (response) {
        //    $('#ddlDepartment').html('');
        //    var data = JSON.parse(response.d);
        //    var dept = "<option value=''>-Select Department-</option>";
        //    for (var i = 0; i < JSON.parse(response.d).length; i++) {
        //        dept = dept + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
        //    }
        //    $('#ddlDepartment').append(dept);
        //},
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindMainCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/MainCategoryMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            MaterialCategoryName = data[0].Id;
            
        },
        //success: function (response) {
        //    var data = JSON.parse(response.d);
        //    var abranch = "";
        //    for (var i = 0; i < JSON.parse(response.d).length; i++) {
        //        abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
        //    }
        //    $('#ddlMaterialCategoryName').append(abranch);
        //},
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/CategoryMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlCategoryName').append(abranch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindSubCategoryNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/SubCategoryMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            SubCategory = data[0].Id;
            
        },
        //success: function (response) {
        //    var data = JSON.parse(response.d);
        //    var abranch = "";
        //    for (var i = 0; i < JSON.parse(response.d).length; i++) {
        //        abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
        //    }
        //    $('#ddlSubCategory').append(abranch);
        //},
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindMaterialGroupDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/MaterialGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].GroupName + "'>" + JSON.parse(response.d)[i].GroupName + "</option>";
            }
            $('#ddlMaterialGroup').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/UnitMesureList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].UnitMesureName + "'>" + JSON.parse(response.d)[i].UnitMesureName + "</option>";
            }
            $('#ddlUnitMesure').append(branch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindMaterialList() {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/FetchMaterialList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialList').DataTable().clear();
            $('#tblMaterialList').DataTable().destroy();
            $('#tbody_Material_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr>'
                    + '<td><input type="checkbox" class="editor-active chk_purchase_order_list"></td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + data[i].Id + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].Name != undefined ? data[i].Name : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MeterialGroup != undefined ? data[i].MeterialGroup : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MaterialType != undefined ? data[i].MaterialType : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].NatureOfItem != undefined ? data[i].NatureOfItem : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].BarCode != undefined ? data[i].BarCode : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].CostingMethod != undefined ? data[i].CostingMethod : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].BOM != undefined ? data[i].BOM : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MaintainInBatch != undefined ? data[i].MaintainInBatch : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MRP != undefined ? data[i].MRP : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MinimumStockLevel != undefined ? data[i].MinimumStockLevel : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].MaximumStockLevel != undefined ? data[i].MaximumStockLevel : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].Description != undefined ? data[i].Description : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].GstApplicable != undefined ? data[i].GstApplicable : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].HsnNo != undefined ? data[i].HsnNo : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].CentralTaxPercent != undefined ? data[i].CentralTaxPercent : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].StateTaxPercent != undefined ? data[i].StateTaxPercent : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].CessPercent != undefined ? data[i].CessPercent : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].IntegratedTaxPercent != undefined ? data[i].IntegratedTaxPercent : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].LinkItem != undefined ? data[i].LinkItem : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].LinkItemName != undefined ? data[i].LinkItemName : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].LinkItemQTY != undefined ? data[i].LinkItemQTY : '') + '</td>'
                    + '<td onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + (data[i].LinkItemUnitMeasure != undefined ? data[i].LinkItemUnitMeasure : '') + '</td>'
                    + '</tr>';
            }
            $('#tbody_Material_List').html(html);
            $('#tblMaterialList').DataTable();
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function FetchMaterialDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/FetchMaterialDetails',
        data: JSON.stringify({
            "MaterialId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            //ClearAll();
            $('#divMaterialList').hide();
            $('#divMaterialEntry').show();
            $('#btnUploadFile').show();
            $('#btnDisplayData').show();
            $('#btnExport').hide();
            $("#btnSave").html('Update');
            $('#txtMaterialName').attr("readonly", "readonly");
            $('#txtLinkItemUM').attr("readonly", "readonly");
            $('#ddlCostingMethod').removeAttr("readonly");
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();
            var data = JSON.parse(response.d);
            Id = data[0].Id;
            if (data[0].MaterialCategoryId === '' || !$('#ddlCategoryName').find('option[value="' + data[0].MaterialCategoryId + '"]').length) {
                $('#ddlCategoryName').val('');
            }
            else {
                $('#ddlCategoryName').val(data[0].MaterialCategoryId);
            }
            if (data[0].MaterialImage == '' || data[0].MaterialImage == null) {
                $("#imgFU").attr('src', "Images/fileupload.png");
                PhotoImg = "Images/fileupload.png";
            }
            else {
                $("#imgFU").attr('src', data[0].MaterialImage);
                PhotoImg = data[0].MaterialImage;
            }
            $('#ddlProject').val(data[0].ProjectMasterId);
            SubCategory = data[0].SubCategoryId;
            //$('#ddlSubCategory').val(data[0].SubCategoryId);
            Branch = data[0].BranchCode;
            //$('#ddlBranch').val(data[0].BranchCode);
            $('#ddlActive').val(data[0].Active);
            Department = data[0].DepartmentId;
            //$('#ddlDepartment').val(data[0].DepartmentId);
            $('#txtMaterialName').val(data[0].MaterialName);
            $('#txtDescription').val(data[0].Description);
            $('#txtId').val(data[0].Id);
            $('#txtalias').val(data[0].Alias);
            $('#txtRateOfDuty').val(data[0].RateOfDuty);
            $('#txtHsnNo').val(data[0].HsnNo);
            CostingMethod = data[0].CostingMethod;
            //$('#ddlCostingMethod').val(data[0].CostingMethod);
            $('#txtMrp').val(data[0].MRP);
            $('#ddlNatureOfItem').val(data[0].NatureOfItem);
            $('#ddlBom').val(data[0].BOM);
            $('#ddlMaintainInBatch').val(data[0].MaintainInBatch);
            $('#txtBarcode').val(data[0].BarCode);
            $('#ddlMaterialCategoryName').val(data[0].MainCategoryId);
            $('#txtDiscount').val(data[0].Discount);
            //$('#ddlUnitMesure').val(data[0].UnitMesure);
            $('#txtUnitMeasure').val(data[0].UnitMesure);
            //$('#txtPackageUnitMeasure').val(data[0].UnitMesure);
            $('#ddlMaterialGroup').val(data[0].MeterialGroup);
            $('#ddlAltUnitMesure').val(data[0].AltUnitMesure);
            $('#ddlUnitMesure').val(data[0].UnitMesure);
            $('#ddlGstApplicable').val(data[0].GstApplicable);
            $('#txtCentralTax').val(data[0].CentralTaxPercent);
            $('#txtStateTax').val(data[0].StateTaxPercent);
            $('#txtCess').val(data[0].CessPercent);
            $('#txtIntegratedTax').val(data[0].IntegratedTaxPercent);
            $('#txtMinimumStockLevel').val(data[0].MinimumStockLevel);
            $('#txtMaximumStockLevel').val(data[0].MaximumStockLevel);
            LinkItem = data[0].LinkItem;
            //$('#ddlLinkItem').val(data[0].LinkItem);
            //if (data[0].LinkItemId == '') {
            //    BindLinkItemDropdown();
            //}
            //else {
            //    $('#ddlLinkItemName').val(data[0].LinkItemId);
            //}

            //$('#ddlLinkItemName option:selected').text(data[0].LinkItemId);
            LinkItemName = data[0].LinkItemId;
            LItemQty = data[0].LinkItemQTY;
            LinkItemUM = data[0].LinkItemUnitMeasure;
            //$('#ddlLinkItemName').val(data[0].LinkItemId);
            //$('#txtLinkItemQty').val(data[0].LinkItemQTY);
            //$('#txtLinkItemUM').val(data[0].LinkItemUnitMeasure);
            ShowHideGSTDetails();
            if ($('#ddlBom').val() == 'y') {
                $('#a_viewBOM').show();
            }
            $('#ddlMaterialType').val(data[0].MaterialType);
            if (data[0].CanPurchase == '1') {
                $('#chkCanPurchased').prop('checked', true);
                $('#txtPurchaseDescription').val(data[0].PurchaseDescription);
            }
            if (data[0].CanSale == '1') {
                $('#chkCanSold').prop('checked', true);
                $('#txtSaleDescription').val(data[0].SaleDescription);
            }
            if (data[0].DoorShipment == '1') {
                $('#chkDoorShipment').prop('checked', true);
            }
            if (data[0].Replenish == '1') {
                $('#chkReplenish').prop('checked', true);
            }
            if (data[0].ResupplySubcontractoronOrder == '1') {
                $('#chkResupplySubcontractoronOrder').prop('checked', true);
            }
            if (data[0].Buy == '1') {
                $('#chkBuy').prop('checked', true);
            }
            if (data[0].CanManufacture == '1') {
                $('#chkCanManufacture').prop('checked', true);
            }
            $('#txtWeight').val(data[0].Weight);
            $('#txtVolume').val(data[0].Volume);
            $('#txtManufactureLeadTime').val(data[0].ManufactureLeadTime);
            $('#txtCustomerLeadTime').val(data[0].CustomerLeadTime);
            $("input[name=optradioTracking][value='" + data[0].Tracking + "']").prop('checked', true);
            FetchPackagingDetailList(id);
            $('#btnView').show();
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function FetchPackagingDetailList(MaterialId) {
    $.ajax({
        type: "POST",
        url: 'wfSdProductMaster.aspx/FetchPackagingDetailList',
        data: JSON.stringify({
            "MaterialId": MaterialId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_Packaging').append('<tr>'
                    + '<td>' + data[i].PackagingName + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function CreateMaterial() {
    $('#divMaterialList').hide();
    $('#divMaterialEntry').show();
    $('#txtMaterialName').removeAttr("readonly");
    $('#txtId').attr("readonly", "readonly");
    $('#txtLinkItemUM').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnView').hide();
    ClearAll();
}
function ViewMaterialList() {
    $('#btnView').hide();
    $('#divMaterialList').show();
    $('#divMaterialEntry').hide();
    $('#btnSave').hide();
    $('#btnDisplayData').hide();
    ClearAll();
    $('#btnExport').show();
    BindMaterialList();
}
function ClearAll() {
    $('#ddlCategoryName,#ddlMaterialGroup,#txtId,#txtRelationPurchaseUnitMesure,#txtMaterialName,#ddlUnitMesure,#txtMrp,#txtBarcode,#txtDescription,#txtHsnNo,#txtalias').val('');
    $('#txtMaterialName').removeAttr('readonly');
    $('#ddlMaterialType').val('');
    //$('#ddlBranch').val('');
    $('#ddlProject').val('');
    $('#ddlNatureOfItem').val('Goods');
    $('#ddlMaintainInBatch').val('n');
    $('#ddlBom').val('n');
    $('#ddlGstApplicable').val('n');
    //$('#ddlLinkItem').val('n');
    //$('#ddlCostingMethod').val('FIFO');
    //$('#ddlCostingMethod').attr("readonly", "readonly");
    $('#txtMinimumStockLevel').val('');
    $('#ddlGstApplicable').val('n');
    $('#txtMaximumStockLevel').val('');
    $('#txtCentralTax').val('0');
    $('#txtStateTax').val('0');
    $('#txtCess').val('0');
    $('#txtIntegratedTax').val('0');
    $('#txtDiscount').val('0');
    $('.GST').hide();
    $('input[name=optradioControlPolicy]').removeAttr('checked');
    $('input[name=optradioInvoicingPolicy]').removeAttr('checked');
    $('#txtExpirationTime').val('');
    $('#txtBestBeforeTime').val('');
    $('#txtRemovalTime').val('');
    $('#txtAlertTime').val('');
    $('#chkCanSold').prop('checked', false);
    $('#chkCanPurchased').prop('checked', false);
    $('#chkCanManufacture').prop('checked', false);
    $('#ddlActive').val('');

    $('#tbody_Packaging').children('tr:not(:first)').remove();
    $('#a_viewBOM').hide();
    $('#txtPackageUnitMeasure').val('');
    $('#txtPackageQty').val('');
    $('#ddlPackage').val('');
    $('#txtPurchaseDescription').val('');
    $('#txtSaleDescription').val('');
    $('#btnSave').html('Save');
    $('#ddlLinkItemName').val('');
    $('#txtLinkItemQty').val('');
    $('#txtLinkItemUM').val('');
    $('#imgFU,#ContentPlaceHolder1_hfBase64').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#btnDisplayData').hide();
    BindLinkItemDropdown();
    $('#btnExport').hide();
    $('#btnView').hide();
    BindProjectDropdown();
}
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}
function AddDetails() {
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    var inventory_packaging_details = '';
    $('#tbody_Packaging tr').each(function (index1, tr) {
        if (index1 > 0) {
            $(tr).find('td').each(function (index, td) {
                if (index1 == 1) {
                    if (inventory_packaging_details == '') {
                        if (index == 0) {
                            inventory_packaging_details = td.outerText;
                        }
                    }
                    else {
                        if (index == 1) {
                            inventory_packaging_details = inventory_packaging_details + '|' + td.outerText;
                        }
                        else if (index == 3) {
                            inventory_packaging_details = inventory_packaging_details + '$' + td.outerText;
                        }
                    }
                }
                else {
                    if (index == 0) {
                        inventory_packaging_details = inventory_packaging_details + '@' + td.outerText;
                    }
                    else if (index == 1) {
                        inventory_packaging_details = inventory_packaging_details + '|' + td.outerText;
                    }
                    else if (index == 3) {
                        inventory_packaging_details = inventory_packaging_details + '$' + td.outerText;
                    }
                }
            });
        }
    });
    if ($("#chkCanSold").is(':checked') == false && $("#chkCanPurchased").is(':checked') == false
        && $("#chkCanManufacture").is(':checked') == false) {
        alertify.error("Please Select Purchase / Sale Permission / Manufacture");
        isValid = false;
    }
    else if ($('#ddlMaterialType').val() == '') {
        alertify.error("Please Select Material Type");
        isValid = false;
    }
    //else if ($('#ddlMaterialCategoryName').val() == '') {
    //    alertify.error("Please Select Main Category");
    //    isValid = false;
    //}
    else if ($('#ddlCategoryName').val().trim() === '') {
        alertify.error("Please Select Category");
        isValid = false;
    }
    //else if ($('#ddlSubCategory').val() == '') {
    //    alertify.error("Please Select Sub Category");
    //    isValid = false;
    //}
    else if ($('#ddlMaterialGroup').val() == '') {
        alertify.error("Please Select Material Group");
        isValid = false;
    }
    else if ($('#txtMaterialName').val() == '') {
        alertify.error("Please Enter Material Name");
        isValid = false;
    }
    //else if (inventory_packaging_details == '') {
    //    alertify.error("Please add packaging details");
    //    isValid = false;
    //}
    else if ($('#ddlUnitMesure').val() == '') {
        alertify.error("Please Enter Unit Measure");
        isValid = false;
    }
    //else if ($('#txtMaximumStockLevel').val() == '') {
    //    alertify.error("Please Enter Maximum Stock Level");
    //    isValid = false;
    //}
    //else if ($('#ddlGstApplicable').val() == '') {
    //    alertify.error("Please Enter Gst Applicable");
    //    isValid = false;
    //}
    //else if (inventory_packaging_details == '') {
    //    alertify.error("Please enter packaging details");
    //    isValid = false;
    //}
    //else if ($('#ddlGstApplicable').val() == 'y') {
    //    if ($('#txtHsnNo').val() == '') {
    //        alertify.error("Please Enter HSN No.");
    //        isValid = false;
    //    }
    //    else if ($('#txtCentralTax').val() == '' && $('#txtStateTax').val() == '' && $('#txtCess').val() == '') {
    //        alertify.error("Please Enter Central Tax % or State Tax % or Cess %");
    //        isValid = false;
    //    }
    //}
    if (isValid) {
        var imgDataURL = '';
        if ($('#imgFU').attr("src") != "Images/fileupload.png") {
            imgDataURL = $('#imgFU').attr("src").toString();

        }
        var chkCanSold = "0";
        var chkCanPurchased = "0";
        var chkCanManufacture = "0";
        if ($("#chkCanSold").is(':checked') == true) {
            chkCanSold = "1";
        }
        if ($("#chkCanPurchased").is(':checked') == true) {
            chkCanPurchased = "1";
        }
        if ($("#chkCanManufacture").is(':checked') == true) {
            chkCanManufacture = "1";
        }
        $.ajax({
            type: "POST",
            url: 'wfSdProductMaster.aspx/CheckMaterialAvailability',
            data: JSON.stringify({ "MaterialName": $('#txtMaterialName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    
                    $.ajax({
                        type: "POST",
                        url: 'wfSdProductMaster.aspx/AddDetails',
                        data: JSON.stringify({
                            "chkCanPurchased": chkCanPurchased,
                            "chkCanSold": chkCanSold,
                            "MaterialType": $('#ddlMaterialType').val().trim(),
                            "MainCategoryId": MaterialCategoryName, //$('#ddlMaterialCategoryName').val().trim(),
                            "MaterialCategoryId": $('#ddlCategoryName').val().trim(),
                            "SubCategoryId": SubCategory, //$('#ddlSubCategory').val().trim(),
                            "BranchCode": Branch,//$('#ddlBranch').val().trim(),
                            "MaterialGroup": $('#ddlMaterialGroup').val().trim(),
                            "DepartmentId": Department, //$('#ddlDepartment').val().trim(),
                            "MaterialMasterId": $('#txtId').val().trim(),
                            "MaterialName": $('#txtMaterialName').val().trim(),
                            "CostingMethod": CostingMethod, //isEmpty($('#ddlCostingMethod').val()) ? "FIFO" : $('#ddlCostingMethod').val().trim(),
                            "UnitMesure": $('#ddlUnitMesure').val().trim(),
                            "NatureOfItem": isEmpty($('#ddlNatureOfItem').val()) ? "Goods" : $('#ddlNatureOfItem').val().trim(),
                            "MaintainInBatch": isEmpty($('#ddlMaintainInBatch').val()) ? "n" : $('#ddlMaintainInBatch').val().trim(),
                            "MRP": isEmpty($('#txtMrp').val()) ? "0" : $('#txtMrp').val().trim(),
                            "MinimumStockLevel": $('#txtMinimumStockLevel').val(),
                            "BOM": isEmpty($('#ddlBom').val()) ? "n" : $('#ddlBom').val().trim(),
                            "GstApplicable": isEmpty($('#ddlGstApplicable').val()) ? "n" : $('#ddlGstApplicable').val().trim(),
                            "BarCode": $('#txtBarcode').val().trim(),
                            "HsnNo": $('#txtHsnNo').val().trim(),
                            "CentralTax": isEmpty($('#txtCentralTax').val()) ? "0" : $('#txtCentralTax').val().trim(),
                            "StateTax": isEmpty($('#txtStateTax').val()) ? "0" : $('#txtStateTax').val().trim(),
                            "Cess": isEmpty($('#txtCentralTax').val()) ? "0" : $('#txtCentralTax').val().trim(),
                            "IntegratedTax": isEmpty($('#txtIntegratedTax').val()) ? "0" : $('#txtIntegratedTax').val().trim(),
                            "MaximumStockLevel": $('#txtMaximumStockLevel').val(),
                            "Description": $('#txtDescription').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "inventory_packaging_details": inventory_packaging_details,
                            "LinkItem": LinkItem,//isEmpty($('#ddlLinkItem').val()) ? "n" : $('#ddlLinkItem').val().trim(),
                            "LinkItemId": LinkItemName, //isEmpty($('#ddlLinkItemName').val()) ? "" : $('#ddlLinkItemName').val().trim(),
                            "LinkItemQty": LItemQty, //isEmpty($('#txtLinkItemQty').val()) ? "" : $('#txtLinkItemQty').val().trim(),
                            "LinkItemUM": LinkItemUM, //isEmpty($('#txtLinkItemUM').val()) ? "" : $('#txtLinkItemUM').val().trim(),
                            "Discount": isEmpty($('#txtDiscount').val()) ? "0" : $('#txtDiscount').val().trim(),
                            "MaterialImage": imgDataURL,
                            "manufacture": chkCanManufacture,
                            "Alias": $('#txtalias').val(),
                            "Active": isEmpty($('#ddlActive').val()) ? "y" : $('#ddlActive').val(),
                            "ProjectId": $('#ddlProject').val().trim()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {
                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                if ($('#btnSave').html() == 'Update') { alertify.success('Item Master updated successfully'); }
                                else { alertify.success('Item Master added successfully'); }
                                ClearAll();
                            }
                            else {
                                console.log("response:", r);
                                console.log("error log:", r.msg);
                                alertify.error('Something went wrong, please try again later');
                            }
                        },
                        failure: function (response) {
                            var r = JSON.parse(response.d);
                            console.log("error log:", r.msg);
                            alertify.error('failure. Something went wrong, please try again later');
                        },
                        error: function (response) {
                            var r = JSON.parse(response.d);
                            console.log("error log:", r.msg);
                            alertify.error('Error. Something went wrong, please try again later');
                        }
                        //success: function (response) {
                        //    UploadFiles();
                        //},
                        //complete: function () {
                        //},
                        //failure: function (jqXHR, textStatus, errorThrown) {
                        //}
                    });
                }
                else {
                    alertify.error("Current Material Name already available");
                }
            },
            complete: function () {
            },
            failure: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}
function UploadFiles() {
    var data = new FormData();
    $.ajax({
        url: "FileUploadHandler.ashx",
        type: "POST",
        data: data,
        //contentType: false,
        //processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var r = JSON.parse(response.d);
            if (r.status == "success") {
                if ($('#btnSave').html() == 'Update') { alertify.success('Item Master updated successfully'); }
                else { alertify.success('Item Master added successfully'); }
                ClearAll();
            }
            else {
                console.log("error log:", r.msg);
                alertify.error('Something went wrong, please try again later');
            }
        },
        failure: function (response) {
            var r = JSON.parse(response.d);
            console.log("error log:", r.msg);
            alertify.error('failure. Something went wrong, please try again later');
        },
        error: function (response) {
            var r = JSON.parse(response.d);
            console.log("error log:", r.msg);
            alertify.error('Error. Something went wrong, please try again later');
        }
    });
}
function ShowHideGSTDetails() {
    if ($('#ddlGstApplicable').val() == 'y') {
        $('.GST').show();
    }
    else {
        $('.GST').hide();
    }
}
function CloseModal() {
    $('#BOMDetailsModal').modal('hide');
}
function ShowBOMDetails() {
    // let random_no = Math.floor((Math.random() * 100) + 1);
    var d = new Date();
    $('#BOM_frame').prop('src', 'wfMmBomEntry.aspx?ver=' + d.getTime() + '&MaterialId=' + $('#txtId').val());
    var frameElement = document.getElementById("BOM_frame");
    frameElement.contentWindow.location.href = frameElement.src;
    $('#BOMDetailsModal').modal('show');
    $('.modal-backdrop').remove();
}
function DeleteRow(ele) {
    $(ele.parentElement.parentElement).remove();
}
function AddProductPackagingDetails() {
    if ($('#ddlPackage').val() != '') {
        if ($('#txtPackageQty').val() != '') {
            if ($('#txtPackageUnitMeasure').val() != '') {
                $('#tbody_Packaging').append('<tr>'
                    + '<td>' + $('#ddlPackage').val() + '</td>'
                    + '<td>' + $("#txtPackageQty").val() + '</td>'
                    + '<td>' + $("#txtPackageUnitMeasure").val() + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
                $('#ddlPackage').val('');
                $('#txtPackageQty').val('');
                $("#txtPackageUnitMeasure").val('');
            }
            else {
                alertify.error('Please select any purchase unit measure');
            }
        }
        else {
            alertify.error('Please package quantity');
        }
    }
    else {
        alertify.error('Please enter packaging');
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();

        // Check if the file is an image
        if (file.type.startsWith('image/')) {
            reader.onload = function (e) {
                $('#imgFU').attr('src', e.target.result);
                $("#ContentPlaceHolder1_hfBase64").val(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            alertify.error("Please select an image file.");
            // Optionally clear the input value
            input.value = '';
        }
    }
}

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;

}



function createKanbanViewTable(data) {
    var finalHTML = "";
    var tempHTML = "";
    var tdCount = 0;

    for (let i = 0; i < data.length; i++) {
        tempHTML += createKanbanViewItem(data[i]);
        tdCount++;
        if (tdCount == 5 || i + 1 == data.length) {
            tempHTML = "<tr>" + tempHTML + "</tr>";
            finalHTML += tempHTML;
            tempHTML = "";
            tdCount = 0;
        }

    }

    $('#tbody_kanbanViewList').html(finalHTML);
    //  $('#tblKanbanView').DataTable();
    showAllImages();
}
function createKanbanViewItem(item) {
    var innerItemHTML = '<td><table style="border: solid thin grey;margin: 2px;width:200px;height:100px;">' +
        '<tbody>' +
        '<tr>' +
        '<td style="vertical-align:top;">' +
        '<img class="kanban-img"  src="Images/logo.png" style="width: 80px;height:96px; text-align: top;"></td>' +
        '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.MaterialName +
        '</td > ' +
        '</tr>' +
        '</tbody>' +
        '</table ></td>'
        ;

    return innerItemHTML;
}

function showListView() {
    $("#dvKanbanView").hide();
    $("#dvListView").show();
}
function showKanbanView() {
    $("#dvKanbanView").show();
    $("#dvListView").hide();
}
function showAllImages() {

    $(".kanban-img").each(function (item) {

        $.ajax({
            type: "POST",
            url: 'wfSdProductMaster.aspx/GetMaterialImageById',
            data: JSON.stringify({
                "Id": $("#txtId").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d)[0];
                if (data != "" || data != null) {
                    $(this).attr('src', data.MaterialImage);
                }
            }
        });

    });
}

function keepDatalistOptions(selector = '') {
    // select all input fields by datalist attribute or by class/id
    selector = !selector ? "input[list]" : selector;
    let datalistInputs = document.querySelectorAll(selector);
    if (datalistInputs.length) {
        for (let i = 0; i < datalistInputs.length; i++) {
            let input = datalistInputs[i];
            input.addEventListener("input", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                //  e.target.blur();
            });
            input.addEventListener("focus", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                e.target.value = "";
            });
            input.addEventListener("blur", function (e) {
                e.target.value = e.target.getAttribute("placeholder");
            });
        }
    }
}