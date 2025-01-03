var currentYear;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    $('#ddlBranch').select2();
    BindBranchDropdown();
    BindYearDropdown();
    currentYear = new Date().getFullYear();
    $("#txtYear").val(currentYear);
    BindMonthDropdown();
    $("#ddlBranch").on("change", function () {
        BindEmployeeDropdown();

    }).trigger("change");
    $('#btnExportExcel').click(function () {
        $('#tblEmployeeList').DataTable().destroy();
        $('#tblEmployeeList').DataTable({
            "paging": false
        });

        // Export to Excel
        $("#tblEmployeeList").table2excel({
            filename: "employee_attendance.xls"
        });

        // Re-enable pagination
        $('#tblEmployeeList').DataTable().destroy();
        $('#tblEmployeeList').DataTable({
            "paging": true
        });
    });
});
function BindBranchDropdown() {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendanceReport.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlBranch').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindEmployeeDropdown() {
    
    if ($('#ddlBranch').val() == '') {
        $('#ddlEmployee').html("<option value>-Select Employee-</option>");
        $('#ddlEmployee').select2();
        
    }

    else {

        $.ajax({
            type: "POST",
            url: 'wfHrEmpAttendanceReport.aspx/EmployeeMasterList',
            data: JSON.stringify({
                "branchid": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#ddlEmployee').html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select Employee-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";

                }
                $('#ddlEmployee').append(emp);

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function BindEmployeeAttendanceList() {
    var isValid = true;
    //if ($('#ddlMonth').val() == '') {
    //    alertify.error("Please select Month");
    //    isValid = false;
    //}
   if ($('#txtYear').val() == '') {
        alertify.error("Please select Year");
        isValid = false;
    }
    //else if ($('#ddlBranch').val() == '') {
    //    alertify.error("Please select Branch");
    //    isValid = false;
    //}
    //else if ($('#ddlEmployee').val() == '') {
    //    alertify.error("Please select Employee");
    //    isValid = false;
    //}
        
    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpAttendanceReport.aspx/EmployeeAttendanceList',
            data: JSON.stringify({
                "BranchCode": $('#ddlBranch').val(),
                "EmpId": $('#ddlEmployee').val(),
                "Year": $('#txtYear').val(),
                "Month": $('#ddlMonth').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                try {
                    var data = JSON.parse(response.d);
                    //console.log("Parsed data:", data);
                    if (data && data.length > 0) {
                        // Remove "No data available" message if data exists
                        $('#tblEmployeeList').DataTable().clear().destroy();
                        $('#tblEmployeeList tbody').empty();
                        $('#tblEmployeeList').DataTable({
                            data: data,
                            columns: [
                                { data: 'BranchName' },
                                { data: 'EmpId' },
                                { data: 'EmpName' },
                                { data: 'AttYear' },
                                { data: 'AttMonth' },
                                { data: 'Present' },
                                { data: 'CL' },
                                { data: 'EL' },
                                { data: 'LOP' },
                                { data: 'Absconding' },
                                { data: 'Left' },
                                { data: 'Holiday' },
                                { data: '2nd Saturday' },
                                { data: '4th Saturday' },
                                { data: 'Sunday' }
                            ]
                        });
                    } else {
                        // No data available, let DataTables handle it
                        $('#tblEmployeeList').DataTable().clear().destroy();
                    }
                    // Show export buttons
                    $('#btnExportPDF').show();
                    $('#btnExportExcel').show();
                } catch (error) {
                    console.error("Data parsing error:", error);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error:", errorThrown);
            }
        });


    }
}
function SearchEmpAttendanceList() {
    BindEmployeeAttendanceList();
    
}
function BindYearDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendanceReport.aspx/YearList',
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
            $('#txtYear').append(abranch);
            $('#txtYear').val(currentYear);
            BindEmployeeAttendanceList();
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
        url: 'wfHrEmpAttendanceReport.aspx/MonthList',
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