var ParentId = 0;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    BindBranchDropdown();
    BindYearDropdown();
    BindMonthDropdown();
    BindList();
    $("#txtAllowanceDate").on("change", function () {
        // Set data attribute with formatted date
        var formattedDate = moment(this.value, "MM/DD/YYYY").format(this.getAttribute("data-date-format"));
        this.setAttribute("data-date", formattedDate);

        // Call the function to handle month and year extraction
        getmonthyear();
        if ($("#ddlBranch").val() != '' && $("#ddlBranch").val() != null) {
            BindDetailList();
        }
        
    }).trigger("change"); // Trigger change event on page load

    $('input[type=radio][name=optradioAllowanceType]').change(function () {
        if (this.value == "1") {
            $('.Individual').show();

        }
        else if (this.value == "2") {
            $('.Individual').hide();
        }
    });
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
});
function getmonthyear() {
    if ($("#txtAllowanceDate").val() !== '') {
        $("#txtYear").val('');
        $("#txtMonth").val('');

        var dateString = $("#txtAllowanceDate").val();
        var date = new Date(dateString);

        // Check if the date is valid
        if (!isNaN(date.getTime())) {
            var monthIndex = date.getMonth(); // 0-based index
            var year = date.getFullYear();

            // Array of month names
            var monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            var monthName = monthNames[monthIndex]; // Get month name from array

            $("#txtYear").val(year);
            $("#txtMonth").val(monthName);
        } else {
            // Handle invalid date
            $("#txtYear").val('Invalid date');
            $("#txtMonth").val('Invalid date');
        }
    }
    else {
        $("#txtYear").val('');
        $("#txtMonth").val('');
    }
}
function BindBranchDropdown() {
    $('#ddlEmployee').select2('destroy').empty().select2();
    $('#txtEmpName').val('');
    $('#txtTotalAmount').val('');
    //var adate = $('#txtAllowanceDate').val();
    //if (!isEmpty(adate)) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/BranchMasterList',
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
            branch += "<option value='all'>All</option>";
            $('#ddlBranch').append(branch);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
    //}
    //else {
    //    alertify.error("please select attendance date.");
    //    var branch = "<option value=''>-Select Branch-</option>";
    //    $('#ddlBranch').append(branch);

    //}
}
function BindEmployeeDropdown() {
    var adate = $('#txtAllowanceDate').val();
    if (!isEmpty(adate)) {
        if ($('#ddlBranch').val() != '') {
            $('#ddlEmployee').select2('destroy').empty().select2();
            $('#txtEmpName').val('');
            $('#txtTotalAmount').val('');
            if ($("#ddlBranch").val() != '') {
                BindDetailList();
            }
            $.ajax({
                type: "POST",
                url: 'wfHrEmpOtherAllowance.aspx/EmployeeMasterList',
                data: JSON.stringify({
                    "branchid": $('#ddlBranch').val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {

                    var data = JSON.parse(response.d);
                    var emp = "<option value=''>-Select Employee-</option>";
                    for (var i = 0; i < JSON.parse(response.d).length; i++) {
                        emp = emp + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
                    }
                    $('#ddlEmployee').append(emp);
                    $('#ddlEmployee').select2();
                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
        else {
            $('#ddlEmployee').select2('destroy').empty().select2();
            // Add a placeholder option
            $('#ddlEmployee').append('<option value="">-Select Employee-</option>');
            // Reinitialize Select2
            $('#ddlEmployee').select2();
            $('#txtEmpName').val('');
            $('#txtTotalAmount').val('');
        }
    }
    else {
        alertify.error("please enter allowance date");
        $('#ddlBranch').val('');//.trigger('change');
        //BindBranchDropdown();
    }
}
function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/FetchEmployeeDetails',
        data: JSON.stringify({
            "EmpId": empid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#txtEmpName').val(data[0].EmpName);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function ShowEmployeeName() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());
        if ($("#ddlBranch").val() != '') {
            BindDetailList();
        }
    }
    else {
        ClearAll();
    }
}
function BindYearDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/YearList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Year + "'>" + JSON.parse(response.d)[i].Year + "</option>";
            }
            $('#ddlYear').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindMonthDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/MonthList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].MonthName + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
            }
            $('#ddlMonth').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function CreateEntry() {
    $('#divList').hide();
    $('#divDetailDataList').hide();
    $('#divEntry').show();
    $('#btnSave').show();
    $('#exportExcel').hide();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#ddlBranch').attr("disabled", false);
    $('#ddlEmployee').attr("disabled", false);
    $('#txtEmpName').attr("readonly", "readonly");
    $('#txtAmount').removeAttr("readonly");
    $('#txtReason').removeAttr("readonly");
    $('#txtAllowanceDate').removeAttr("readonly");
    $("input:radio[name='optradioAllowanceType']").prop('disabled', false);
    ClearAll();
}
function ViewList() {
    $('#divList').show();
    $('#divEntry').hide();
    $('#btnSave').hide();
    $('#exportExcel').show();
    BindList();
}
function ClearAll() {
    $('#ddlEmployee').select2('destroy');
    $('#ddlEmployee').html('<option value="">-Select Employee-</option>');
    $('#ddlEmployee').select2();
    $('#txtEmpName').val('');
    $('#txtAllowanceDate').val('');
    $('input:radio[name="optradioAllowanceType"][value="1"]').prop('checked', true);
    $('input[name=optradioAllowanceType]').removeAttr('checked');
    $('#ddlBranch').val('');
    $('#txtReason').val('');
    $('.Individual').show();
    $('#txtYear').val('');
    $('#txtMonth').val('');
    $('#txtAmount').val('');
    $('#txtTotalAmount').val('');
}
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}
function BindList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/FetchList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblList').DataTable().clear();
            $('#tblList').DataTable().destroy();
            $('#tbody_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchDetails(\'' + data[i].MasterId + '\')"><td style="display:none;">' + data[i].MasterId + '</td>'
                //html = html + '<tr><td>' + data[i].Id + '</td>'
                //html = html + '<tr><td style="display:none;">' + data[i].MasterId + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].TotalOtherAllowance + '</td>'
                    + '</tr> ';
            }
            $('#tbody_List').html(html);
            $('#tblList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
// Function to export DataTable to Excel
// Function to export DataTable to Excel
function exportToExcel() {
    // Get the DataTable element
    var table = document.getElementById('tblList');

    // Convert the table to a workbook object
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Get the worksheet
    var ws = wb.Sheets["Sheet1"];

    // Create a new worksheet without the first column
    var newWs = {};
    var range = XLSX.utils.decode_range(ws['!ref']); // Get the range of the existing worksheet

    // Copy existing cells to the new worksheet, excluding the first column
    for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c + 1; C <= range.e.c; ++C) { // Start from column index 1 to exclude the first column
            var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell) newWs[XLSX.utils.encode_cell({ r: R, c: C - 1 })] = cell; // Shift column index back by 1
        }
    }

    // Update the range for the new worksheet
    newWs['!ref'] = XLSX.utils.encode_range({
        s: { r: range.s.r, c: range.s.c },
        e: { r: range.e.r, c: range.e.c - 1 }
    });

    // Create a new workbook with the updated worksheet
    var newWb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWb, newWs, "Sheet1");

    // Generate the Excel file and prompt the user to download it
    XLSX.writeFile(newWb, 'data.xlsx');
}
function DeleteDetailData(MasterId, DetailId) {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/DeleteDetailData',
        data: JSON.stringify({
            "MasterId": MasterId,
            "DetailId": DetailId
        }),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {

        },
        success: function (response) {
            var r = JSON.parse(response.d);

            if (r.status == "success") {
                alertify.success('Allowance detail deleted successfully');
                BindDetailList();
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
//function BindDetailList() {

//    $.ajax({
//        type: "POST",
//        url: 'wfHrEmpOtherAllowance.aspx/FetchDetailsEntry',
//        data: JSON.stringify({
//            "BranchCode": $('#ddlBranch').val(),
//            "EmpId": $('#ddlEmployee').val(),
//            "Year": $('#txtYear').val(),
//            "Month": $('#txtMonth').val()
//        }),
//        contentType: "application/json; charset=utf-8",
//        beforeSend: function () {

//        },
//        success: function (response) {

//            var data = JSON.parse(response.d);
//            $('#divDetailDataList').show();
//            $('#tblEmpOTDetailList').DataTable().clear();
//            $('#tblEmpOTDetailList').DataTable().destroy();
//            $('#tbody_EmpOTDetail_List').html('');


//            var html = ''; var sumamt = 0;
//            for (var i = 0; i < JSON.parse(response.d).length; i++) {
//                html = html + '<tr>'
//                    //+ '<td> ' + data[i].Id + '</td > '
//                    //+ '<td>' + data[i].OtMasterEntryId + '</td>'
//                    + '<td>' + data[i].Year + '</td>'
//                    + '<td>' + data[i].Month + '</td>'
//                    + '<td>' + data[i].Day + '</td>'
//                    + '<td>' + data[i].Amount + '</td>'
//                    + '<td><a onclick="DeleteDetailData(\'' + data[i].MasterId + '\',\'' + data[i].DetailId + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
//                    + '</tr>';
//                sumamt = sumamt + data[i].Amount;
//                ParentId = data[i].MasterId;
//            }
//            $('#tbody_EmpOTDetail_List').html(html);
//            $('#tblEmpOTDetailList').DataTable();
//            $('#txtTotalAmount').val(sumamt);
//        },
//        complete: function () {

//        },
//        failure: function (jqXHR, textStatus, errorThrown) {

//        }
//    });
//}
function BindDetailList() {
    var isValid = 0;
    if ($("#btnSave").html() != 'Save') {
        isValid = 1;
    }
   
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/FetchDetailsEntry',
        data: JSON.stringify({
            "BranchCode": $('#ddlBranch').val(),
            "EmpId": $('#ddlEmployee').val(),
            "Year": $('#txtYear').val(),
            "Month": $('#txtMonth').val()
        }),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // You can show a loading indicator here if needed
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#divDetailDataList').show();

            // Clear any existing DataTable
            if ($.fn.DataTable.isDataTable('#tblEmpOTDetailList')) {
                $('#tblEmpOTDetailList').DataTable().clear().destroy();
            }

            // Clear existing table body
            $('#tbody_EmpOTDetail_List').html('');

            var html = '';
            var sumamt = 0;
            for (var i = 0; i < data.length; i++) {
                html += '<tr>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].Day + '</td>'
                    + '<td>' + data[i].Amount + '</td>';

                // Add condition for the last column
                if (isValid == 0) {
                    html += '<td><a onclick="DeleteDetailData(\'' + data[i].MasterId + '\',\'' + data[i].DetailId + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                } else {
                    html += '<td></td>';
                }

                html += '</tr>';
                sumamt += data[i].Amount;
            }
            $('#tbody_EmpOTDetail_List').html(html);

            // Initialize DataTable with options to disable pagination
            $('#tblEmpOTDetailList').DataTable({
                "paging": false,       // Disable pagination
                "info": false,         // Disable information summary
                "searching": false,    // Disable the search box
                "ordering": false,     // Disable sorting
                "lengthChange": false  // Hide the length change dropdown
            });

            $('#txtTotalAmount').val(sumamt);
        },
        complete: function () {
            // You can hide the loading indicator here if needed
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            // Handle any errors here
        }
    });
}


function AddData() {
    //var OTD = new Date($('#txtOTDate').val());
    //var OTmonth = OTD.toLocaleString('default', { month: 'short' });
    var isUpdate = 0;
    var isValid = true;
    var chkval = $("input:radio[name='optradioAllowanceType']:checked").val();

    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if (chkval == undefined) {
        alertify.error('please select allowance type');
        return false;
    }
    else if (isEmpty($('#txtAllowanceDate').val())) {
        alertify.error("Please select allowance date");
        isValid = false;
    }
    else if (isEmpty($('#txtYear').val())) {
        alertify.error("Year cannot be blank");
        isValid = false;
    }
    else if (isEmpty($('#txtMonth').val())) {
        alertify.error("Month cannot be blank");
        isValid = false;
    }
    else if (isEmpty($('#ddlBranch').val())) {
        alertify.error("Please select branch");
        isValid = false;
    }    
    else if (chkval == '1' && isEmpty($('#ddlEmployee').val())) {
        alertify.error('please select employee');
        return false;
    }
    else if (isEmpty($('#txtAmount').val())) {
        alertify.error("Please enter amount");
        isValid = false;
    }
    else if ($('#txtAmount').val() <= '0') {
        alertify.error("Please enter amount");
        isValid = false;
    }
    
    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpOtherAllowance.aspx/CheckDataAvailability',
            data: JSON.stringify({
                "AllowanceDate": $('#txtAllowanceDate').val(),
                "EmpId": $('#ddlEmployee').val(),
                "BranchCode": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                console.log(data)
                var isPayrollProcceed = data.isPayrollProcceed
                var isRecordExists = data.isRecordExists

                if (isPayrollProcceed) {
                    alertify.error("Already Generated Salary, could not entry Allowance");
                }
                else if (isRecordExists) {
                    alertify.error("Record already available");
                }
                else {
                    AddTotalAmount();
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpOtherAllowance.aspx/AddData',
                        data: JSON.stringify({
                            "MasterId": ParentId,
                            "AllowanceDate": $('#txtAllowanceDate').val(),
                            "EmpId": $('#ddlEmployee').val(),
                            "BranchCode": $('#ddlBranch').val(),
                            "Amount": isEmpty($('#txtAmount').val()) ? "0" : $('#txtAmount').val(),
                            "TotalAmount": isEmpty($('#txtTotalAmount').val()) ? "0" : $('#txtTotalAmount').val(),
                            //"Description": $('#txtDescription').val(),
                            "Reason": $('#txtReason').val(),
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                alertify.success('Other Allowance detail added successfully');
                                $('#txtAllowanceDate').val('');
                                $('#txtAmount').val('');
                                
                                //$('#txtTotalHours').val('');
                                BindDetailList();
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
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function FetchDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtherAllowance.aspx/FetchDetailsById',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },

        success: function (response) {
            $('#divList').hide();
            $('#divEntry').show();
            var data = JSON.parse(response.d);

            $("#btnSave").html('Update');
            $("#btnSave").hide();
            $("#exportExcel").hide();
            $('#ddlBranch').attr("disabled", true);
            $('#ddlEmployee').attr("disabled", true);
            $('#txtYear').attr("disabled", false);
            $('#txtMonth').attr("disabled", false);
            $('#txtAmount').attr("readonly", "readonly");
            $('#txtReason').attr("readonly", "readonly");
            $('#txtEmpName').attr("readonly", "readonly");
            $('#TotalOtherAllowance').attr("readonly", "readonly");
            $('#ddlBranch').val(data[0].BranchCode);
            $('#ddlEmployee').html("<option value = ''> -Select Employee -</option><option value='" + data[0].EmpId + "' selected>" + data[0].EmpName + "</option>");
            $('#ddlEmployee').val(data[0].EmpId).attr("selected", true);
            $('#txtEmpName').val(data[0].EmpName);
            //$('#txtAllowanceDate').val(data[0].EmpName);
            $('#txtAmount').val('0');
            $('#txtYear').val(data[0].Year);
            $('#txtMonth').val(data[0].Month);
            $('#txtTotalOtherAllowance').val(data[0].TotalOtherAllowance);
            $('#txtReason').val(data[0].Reason);
            ParentId = data[0].MasterId;
            $('input:radio[name="optradioAllowanceType"][value="1"]').prop('checked', true);
            $("input:radio[name='optradioAllowanceType']").prop('disabled', true);
            BindDetailList();   
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function AddTotalAmount() {
    var chkval = $("input:radio[name='optradioAllowanceType']:checked").val();
    if (chkval == '1') {

        var amt = $("#txtAmount").val();
        var totamt = isEmpty($('#txtTotalAmount').val()) ? "0" : $('#txtTotalAmount').val();
        $("#txtTotalAmount").val(parseFloat(totamt) + parseFloat(amt));
    }
}