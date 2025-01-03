$(document).ready(function () {
    GetProjectList();
    $("#ddlProjectCategory").select2({ width: '100%' });
    $("#ddlBranch").select2({ width: '100%', height: '10px'});
    $("#ddlLocation").select2({ width: '100%', height: '10px'});
    $("#divProjectList").show();
    $("#addPaymentContainer").hide();
    $("#btnView").hide();
    $('#tblPayDetailsInner').DataTable({
        paging: true,
        layout: {
            topStart: {
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
            }
        }
    });

    $('#tblProjectList').DataTable({
        paging: true,
    });

    GetProjectCategories();
    GetProjectBranch();
    GetProjectLocation();
    MoveControlToNextOnEnter();
    $("#imgLogo").click(function () {
        $("#txtProjLogo").click();
    });

    $(".btnUploadDoc").click(function () {
        $("#txtProjDoc").click();
    });
    var selectedRowsData = [];

    // Handle individual checkbox change event
    $('#tblProjectList tbody').on('change', 'input[type="checkbox"]', function () {
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
        var table = $('#tblProjectList').DataTable();

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
        var totalCheckboxes = $('#tblProjectList tbody input[type="checkbox"]').length;
        var checkedCheckboxes = $('#tblProjectList tbody input[type="checkbox"]:checked').length;

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
        $('#tblProjectList thead th').each(function (index) {
            if (index !== 0 && index !== $('#tblProjectList thead th').length) {
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
        XLSX.utils.book_append_sheet(wb, ws, 'ProjectMaster');

        // Write workbook to file
        XLSX.writeFile(wb, 'ProjectMaster.xlsx');
    });

    
});
//$(document).on("click", "#tblProjectList tr td", function () {

//    var thisObj = $(this);
//    if ($(this).attr("class") === "clsDelete") {

//        if ($(thisObj).attr("data-vc") === 'y') {

//            alertify.error("Voucher already created, could not delete record.");
//        }
//        else {

//            alertify.confirm('Delete Payment Entry', 'Are you sure to delete ?',
//                function () {
//                    DeletePaymentEntry($(thisObj).parent().attr("data-id"));

//                }
//                , function () {

//                });
//        }
//    }
//    else {
//        GetProjectDetailsById($(thisObj).parent().attr("data-id"));
//    }

//});
$(document).on("keydown", function (event) {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        $("#btnCreate").click();
    }
});

var logoBase64 = '';
var docBase64 = '';
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var filesize = ((input.files[0]["size"] / 1024) / 1024).toFixed(4); // MB
            if (filesize > 0.5) {
                alertify.error('Please upload logo or image size not more than 500kb');
                $(input).val('');
                return;
            }

            if ($(input).prop("id") === 'txtProjLogo') {
                var fileType = input.files[0]["type"]

                var validImageTypes = ["image/jpeg", "image/png"];
                if ($.inArray(fileType, validImageTypes) < 0) {
                    alertify.error('Only .png or .jpeg type of logo can be uploaded.');
                    $(input).val('');
                    $("#imgLogo").prop("src", '');
                    return;
                }
                else {
                    logoBase64 = e.target.result;
                    $("#imgLogo").prop("src", logoBase64);
                }
            }

            if ($(input).prop("id") === 'txtProjDoc') {
                var fileType = input.files[0]["type"]
                var validImageTypes = ["image/jpeg", "image/png"];
                if ($.inArray(fileType, validImageTypes) < 0) {
                    alertify.error('Only .png or .jpeg type of logo can be uploaded.');
                    $(input).val('');
                    return;
                }
                else {
                    docBase64 = e.target.result;
                }
            }

        };
        reader.readAsDataURL(input.files[0]);
    }
}
function MoveControlToNextOnEnter() {
    $("#txtProjectName").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlProjectCategory").focus();
        }
    });
    $('#ddlProjectCategory').on('select2:close', function (e) {
        $("#ddlBranch").focus();
    });
    $('#ddlBranch').on('select2:close', function (e) {
        $("#ddlLocation").focus();
    });
    $('#ddlLocation').on('select2:close', function (e) {
        $("#txtExpStartDate").focus();
    });
    $("#txtExpStartDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtActStartDate").focus();
        }
    });
    $("#txtActStartDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtExpFinishDate").focus();
        }
    });
    $("#txtExpFinishDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtActFinishDate").focus();
        }
    });
    $("#txtActFinishDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtExpCost").focus();
        }
    });
    $("#txtExpCost").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtActCost").focus();
        }
    });
    $("#txtActCost").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtAddress1").focus();
        }
    });
    $("#txtAddress1").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtAddress2").focus();
        }
    });
    $("#txtAddress2").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtDescription").focus();
        }
    });
    $("#txtDescription").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#chkIsActive").focus();
        }
    });
    $("#chkIsActive").on("change", function (event) {
        $(".btnUploadLogo").focus();
    });
    $(".btnUploadLogo").on("change", function (event) {
        $("#btnCreate").focus();
    });
}
//function DownloadExcel() {
//    $.ajax({
//        type: "POST",
//        url: 'wfSdProjectMaster.aspx/DownloadFile',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        beforeSend: function () { },
//        success: function (r) {
//            //Convert Base64 string to Byte Array.
//            var bytes = Base64ToBytes(r.d.FileString);

//            //Convert Byte Array to BLOB.
//            var blob = new Blob([bytes], { type: "application/octetstream" });
//            var fileName = r.d.FileName;
//            //Check the Browser type and download the File.
//            var isIE = false || !!document.documentMode;
//            if (isIE) {
//                window.navigator.msSaveBlob(blob, fileName);
//            } else {
//                var url = window.URL || window.webkitURL;
//                link = url.createObjectURL(blob);
//                var a = $("<a />");
//                a.attr("download", fileName);
//                a.attr("href", link);
//                $("body").append(a);
//                a[0].click();
//                //$("body").remove(a);
//            }
//        },
//        complete: function () {

//        },
//        failure: function (jqXHR, textStatus, errorThrown) {

//        }
//    });
//}
function DownloadDocument() {
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/DownloadDocument',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Id: $("#txtProjectName").attr('data-id') }),
        dataType: "json",
        beforeSend: function () { },
        success: function (r) {
            
            var bytes = Base64ToBytes(r.d.FileString);

            //Convert Byte Array to BLOB.
            var blob = new Blob([bytes], { type: "application/octetstream" });
            var fileName = 'Naresh.doc';
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
            //console.log(r);
            //let binaryString = window.atob(r.d.FileString);
            //let binaryLen = binaryString.length;
            //let bytes = new Uint8Array(binaryLen);

            //for (let i = 0; i < binaryLen; i++) {
            //    let ascii = binaryString.charCodeAt(i);
            //    bytes[i] = ascii;
            //}
            //var blob = new Blob([r.d.FileString], { type: "application/pdf" });
            //var link = document.createElement('a');
            //link.href = window.URL.createObjectURL(blob);
            //link.download = "Sample.pdf";
            //link.click();
            //var bytes = Base64ToBytes(r.d.FileString);

            ////Convert Byte Array to BLOB.
            //var blob = new Blob([bytes], { type: "application/pdf" });
            //var fileName = r.d.FileName;
            ////Check the Browser type and download the File.
            //var isIE = false || !!document.documentMode;
            //if (isIE) {
            //    window.navigator.msSaveBlob(blob, fileName);
            //} else {
            //    var url = window.URL || window.webkitURL;
            //    link = url.createObjectURL(blob);
            //    var a = $("<a />");
            //    a.attr("download", fileName);
            //    a.attr("href", link);
            //    $("body").append(a);
            //    a[0].click();
            //    //$("body").remove(a);
            //}
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};
function GetProjectCategories() {
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/GetProjectCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            BindGetProjectCategoriesDll(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetProjectBranch() {
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/GetProjectBranch',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            BindGetProjectBrnachDll(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetProjectLocation() {
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/GetProjectLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            BindGetProjectLocationDll(data);
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetProjectList() {
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/GetProjectList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#tblProjectList').DataTable().clear();
            $('#tblProjectList').DataTable().destroy();
            $("#tblProjectList  > tbody > tr").remove();
            if (data !== null && data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    $('#tblProjectList > tbody').append('<tr data-id="' + data[i].Id + '" style="cursor:pointer !important">'
                        + '<td><input type="checkbox" class="editor-active chk_purchase_order_list"></td>'
                        + '<td style="display:none" >' + data[i]?.Id + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.ProjectName + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.BranchName + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.ProjectCategoryName + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.LocationName + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[i]?.ExpectedStartDateM.split('T')[0]))+ '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[i]?.ActualStartDateM.split('T')[0])) + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[i]?.ExpectedFinishDateM.split('T')[0])) + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[i]?.ActualFinishDateM.split('T')[0])) + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.ExpectedCost + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.ActualCost + '</td>'
                        + '<td onclick="GetProjectDetailsById(\'' + data[i].Id + '\');">' + data[i]?.CreateUser + '</td>'

                        + '</tr>');

                }
                $('#tblProjectList').DataTable({
                    order: [[0, 'desc']]
                });
            }

            else {
                $('#tblProjectList').DataTable().clear();
                $('#tblProjectList').DataTable().destroy();
                $("#tblProjectList  > tbody > tr").remove();
                $('#tblProjectList').DataTable({
                    layout: {
                        topStart: {
                            buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
                        }
                    }
                });
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetProjectDetailsById(projectId) {
    $(".hdBtn").hide();
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/GetProjectDetailsById',
        data: JSON.stringify({
            Id: projectId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {

            var data = JSON.parse(response.d);
            if (data !== null && data.length > 0) {
                $("#btnCreate").click(),
                    $("#txtProjectName").attr("data-id", data[0].Id),
                    $("#txtProjectName").attr('readonly', true),
                    $("#txtProjectName").val(data[0].ProjectName),
                    $("#ddlProjectCategory").val(data[0].ProjectCategoryId).change(),
                    $("#ddlBranch").val(data[0].BranchCode).change(),
                    $("#ddlLocation").val(data[0].LocationMasterId).change(),
                    $("#txtExpCost").val(data[0].ExpectedCost),
                    $("#txtActCost").val(data[0].ActualCost),
                    data[0].Active == 'y' ? $("#chkIsActive").prop("checked", true) : $("#chkIsActive").prop("checked", false),
                    $("#txtDescription").val(data[0].Description),
                    $("#txtAddress1").val(data[0].Address1),
                    $("#txtAddress2").val(data[0].Address2),
                    $("#txtExpStartDate").val(data[0].ExpectedStartDate.split('T')[0]),
                    $("#txtActStartDate").val(data[0].ActualStartDate.split('T')[0]),
                    $("#txtExpFinishDate").val(data[0].ExpectedFinishDate.split('T')[0]),
                    $("#txtActFinishDate").val(data[0].ActualFinishDate.split('T')[0])
                $("#imgLogo").attr('src', (data[0].ProjectLogoS && data[0].ProjectLogoS.trim()) ? data[0].ProjectLogoS : 'Images/fileupload.png');
                //$("#imgLogo").attr('src', data[0].ProjectLogoS)
                //logoBase64 = data[0].ProjectLogoS;
                logoBase64 = (data[0].ProjectLogoS && data[0].ProjectLogoS.trim()) ? data[0].ProjectLogoS : 'Images/fileupload.png';
                docBase64 = data[0].ProjectDocumentS
                $("#previewBtn").show();
                $("#btnShowDoc").show();
            }
            else {
                HideShowView();
                $("#previewBtn").hide();
                $("#btnShowDoc").hide();

            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function AddUpdateProject(objProject) {
    $.ajax({
        type: "POST",
        url: 'wfSdProjectMaster.aspx/AddUpdateProject',
        data: JSON.stringify({ projectMaster: objProject }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            if (response != null) {
                if (JSON.parse(response.d) === '0')
                    alertify.error('Project name already exists.');
                if (JSON.parse(response.d) === '1')
                    alertify.success('Project has been saved.');
                if (JSON.parse(response.d) === '2')
                    alertify.success('Project has been updated.');

            }
            GetProjectList();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindGetProjectCategoriesDll(data) {
    // Empty the select element
    $('#ddlProjectCategory').empty();

    // Add a default "Select" option if none exists
    $('#ddlProjectCategory').append(
        $('<option></option>').val('').html('Select Project Category')
    );

    // Append new options
    $.each(data, function (i, item) {
        $("#ddlProjectCategory").append(
            $('<option></option>').val(item.Id).html(item.ProjectCategoryName)
        );
    });

    //// Reinitialize select2 after adding options
    //$("#ddlProjectCategory").select2({
    //    placeholder: "Select Project Category",
    //    allowClear: true,
    //    width : "100%"
    //});

    // Set the initial selected index to the first item
    $("#ddlProjectCategory").prop("selectedIndex", 0).trigger('change');
}

function BindGetProjectBrnachDll(data) {
    $('#ddlBranch').empty();
    //$('#ddlBranch').append(
    //    $('<option></option>').val('').html('Select Branch')
    //);
    $.each(data, function (i, item) {
        $("#ddlBranch").append(
            $('<option></option>').val(item.BranchCode).html(item.BranchName)
        );
    });
    //$("#ddlBranch").select2({
    //    placeholder: "Select Branch",
    //    allowClear: true,
    //    width: "100%"
    //});
    //if (data.length > 0) {
    //    $("#ddlBranch").val(data[0].Id).trigger('change');
    //}
}
function BindGetProjectLocationDll(data) {
    $('#ddlLocation').empty();
    //$('#ddlLocation').append(
    //    $('<option></option>').val('').html('Select Project Location')
    //);
    $.each(data, function (i, item) {
        $("#ddlLocation").append(
            $('<option></option>').val(item.Id).html(item.LocationName)
        );
    });
    //$("#ddlLocation").select2({
    //    placeholder: "Select Project Location",
    //    allowClear: true,
    //    width: "100%"
    //});
    //setTimeout(function () {
    //    if (data.length > 0) {
    //        // Set the value of the select to the first item's Id
    //        $("#ddlLocation").val(data[0].Id).trigger('change');  // Trigger the change to reflect in select2 UI
    //    }
    //}, 100);
}
function ClearForm() {
    $('#ddlProjectCategory').val($('#ddlProjectCategory option:eq(0)').val()).trigger('change');
    $('#ddlBranch').val($('#ddlBranch option:eq(0)').val()).trigger('change');
    $('#ddlLocation').val($('#ddlLocation option:eq(0)').val()).trigger('change');
    $("#txtProjectName").val('');
    $("#txtExpCost").val('');
    $("#txtActCost").val('');
    $("#imgLogo").attr('src', 'Images/fileupload.png');
    $("#txtProjLogo").val('');
    $("#txtProjDoc").val('');
    $("#txtDesc").val('');
    $("#txtAddress1").val('');
    $("#txtAddress2").val('');
    $("#txtDescription").val('');
    $("#chkIsActive").prop("checked", true);
    document.getElementById("txtExpStartDate").valueAsDate = new Date();
    document.getElementById("txtActStartDate").valueAsDate = new Date();
    document.getElementById("txtExpFinishDate").valueAsDate = new Date();
    document.getElementById("txtActFinishDate").valueAsDate = new Date();
}
function getCurrentDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (today.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero if needed
    var year = today.getFullYear();
    return month + "/" + day + "/" + year;
}
function ViewProjectList() {
    HideShowView();
    $("#exTab2").hide();
    $("#previewBtn").hide();
    $("#btnShowDoc").hide();
    $(".btnUploadDoc").hide();
    $("#btnExport").show();
    //$("#ddlSalesOrders").val("-1").change();
    GetProjectList();
}
function HideShowView() {

    $("#divProjectList").show();
    $("#btnView").hide();
    $("#exTab2").hide();
    $("#btnCreate").text("Create");

}
function SaveProject(thisObj) {
    if ($(thisObj).text() === "Create") {
        ClearForm();
        $("#divProjectList").hide();
        $("#btnView").show();
        $("#exTab2").show();
        $("#btnExport").hide();
        $(".hdBtn").show();
        $("#txtProjectName").attr("data-id", 0);
        $("#txtProjectName").attr('readonly', false);
        $("#imgLogo").attr('src', 'Images/fileupload.png');
        //$("#imgLogo").attr('src', '');
        $("#previewBtn").hide();
        $("#btnShowDoc").hide();
        $(".btnUploadDoc").show();
        logoBase64 = '';
        docBase64 = '';
    }
    else if ($(thisObj).text() === "Save") {
        var errorMessage = "";
        if ($('#txtProjectName').val().trim() === '') {
            errorMessage += "Please Enter Project Name<br/>";
        }
        if ($('#ddlProjectCategory').val().trim() === '') {
            errorMessage += "Please Select Project Category<br/>";
        }
        if ($.trim(errorMessage) !== "") {
            alertify.error(errorMessage)
            return false;
        }
        var objProject = {
            Id :$("#txtProjectName").attr("data-id"),
            Name: $.trim($("#txtProjectName").val()),
            Category: $.trim($("#ddlProjectCategory").val()) == '' ? 0 : $.trim($("#ddlProjectCategory").val()),
            Branch: $.trim($("#ddlBranch").val()),
            Location: $.trim($("#ddlLocation").val()),
            ExpCost: $.trim($("#txtExpCost").val()) == '' ? 0 : $.trim($("#txtExpCost").val()),
            ActCost: $.trim($("#txtActCost").val()) == '' ? 0 : $.trim($("#txtActCost").val()),
            IsActive: $("#chkIsActive").prop("checked") == true ? 'y' : 'n',
            Description: $.trim($("#txtDescription").val()),
            Address1: $.trim($("#txtAddress1").val()),
            Address2: $.trim($("#txtAddress2").val()),
            ExpStartDate: isNaN(Date.parse($("#txtExpStartDate").val())) == true ? new Date() : $.trim($("#txtExpStartDate").val()),
            ActStartDate: isNaN(Date.parse($("#txtActStartDate").val())) == true ? new Date() : $.trim($("#txtActStartDate").val()),
            ExpFinishDate: isNaN(Date.parse($("#txtExpFinishDate").val())) == true ? new Date() : $.trim($("#txtExpFinishDate").val()),
            ActFinishDate: isNaN(Date.parse($("#txtActFinishDate").val())) == true ? new Date() : $.trim($("#txtActFinishDate").val()),
            Logo: logoBase64,
            Doc: docBase64
        }
        AddUpdateProject(objProject);
        $("#divProjectList").show();
        $("#addPaymentContainer").hide();
        $("#btnView").show();
        $("#exTab2").hide();
        $(".btnUploadDoc").hide();
    }

    if ($(thisObj).text() === "Create") {
        $(thisObj).text("Save");
    }
    else {
        $(thisObj).text("Create");
    }
}
function GetUrl() {
    if ($("#ddlSalesOrders").val() === '-1') {
        alertify.error('Please Select Sales Order To View');
        $("#iframeSalerOrder").attr("src", '#');
        $("#iframeSalerOrder").hide();
        return false;
    }

    else {
        var sss = window.location.protocol + '//' + $(window.location).attr('host') + '/wfSdSalesOrder_display.aspx?id=' + $("#ddlSalesOrders").val();
        $("#iframeSalerOrder").attr("src", sss);
        $("#iframeSalerOrder").show();
    }
}
function PrintPreview() {
    window.open('wfSdProjectMaster_Display.aspx?id=' + $("#txtProjectName").attr('data-id'), "_blank");

}
function PreventUnwantedCharsInNumberInput() {
    var inputBox = document.getElementsByClassName("numberInput")[0];
    var invalidChars = [
        "-",
        "+",
        "e",
    ];

    inputBox.addEventListener("input", function () {
        this.value = this.value.replace(/[e\+\-]/gi, "");
    });

    inputBox.addEventListener("keydown", function (e) {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    });
}
function ViewDocument() {
        window.open('wfSdProjectMaster_Document.aspx?id=' + $("#txtProjectName").attr('data-id'), "_blank");
}

$(window).load(function () {
    $("#imgLogo").load(function () {
        $(this).show();
    }).error(function () {
        $(this).hide();
    });
});
