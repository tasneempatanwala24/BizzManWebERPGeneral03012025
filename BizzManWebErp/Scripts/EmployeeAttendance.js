var formattedTime;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    $('#ddl_Employee').select2();
    var currentYear = new Date().getFullYear();
    $("#txtYear").val(currentYear);
   // BindEmployeeDropdown('0', 'ddl_Employee');
    BindBranchDropdown();
    BindEmployeeAttendanceList('', 'tbody_Employee_AttendanceList', 'tblEmployeeAttendanceList', '', '', '', '','');
    BindYearDropdown();
    BindMonthDropdown();
    $("#txtAttendanceDate").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "MM/DD/YYYY")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");

    var currentTime = new Date();

    // Get hours and minutes
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    // Format the time as HH:MM
    formattedTime = hours + ':' + minutes;
    $('#txtAttendanceTime').val(formattedTime);

    $('input[type=radio][name=optradioAttendanceType]').change(function () {
        if (this.value == "1") {
            $('.Individual').show();
            $('#tr_upload').hide();
            $('.individual_entry').show();
            $('#divAttendanceListDateWise').show();
        }
        else if (this.value == "2") {
            $('.Individual').hide();
            $('#tr_upload').hide();
            $('.individual_entry').show();
            $('#divAttendanceListDateWise').show();
        }
        else if (this.value == "3") {
            $('#tr_upload').show();
            $('.individual_entry').hide();
            $('#divAttendanceListDateWise').hide();
        }
    });
    $("#downloadTemplateBtn").click(function () {
        // Replace 'template.xlsx' with the actual URL of your template file
        var templateUrl = '/Templates/Attendance.xlsx';

        // Create a hidden link element
        var link = document.createElement('a');
        link.href = templateUrl;
        link.download = 'Attendance.xlsx'; // Set the filename for download
        
        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger a click event on the link
        link.click();
        
        // Remove the link from the document body
        document.body.removeChild(link);
    });
});
 

function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendance.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlBranch').html('');
            $('#ddl_Branch').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
            $('#ddl_Branch').append(branch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function CreateEmployeeAttendance() {
    $('#txtAttendanceTime').val(formattedTime);
    $('#divEmployeeAttendanceList').hide();
    $('#divEmployeeAttendanceEntry').show();
    $('#divAttendanceListDateWise').show();
    $('#btnSave').show();
    $('#btnSearch').hide();
    ClearAll();
}
function ViewEmployeeAttendanceList() {
    $('#divEmployeeAttendanceList').show();
    $('#divEmployeeAttendanceEntry').hide();
    $('#divAttendanceListDateWise').hide();
    $('#btnSave').hide();
    $('#btnSearch').show();
    $('#ddlDay').val('');
    $('#ddlMonth').val('');
    $('#ddl_Employee').select2('destroy');
    $('#ddl_Employee').html('<option value="">-Select Employee-</option>');
    $('#ddl_Employee').select2();
    const d = new Date();
    let year = d.getFullYear();
    $('#txtYear').val(year);
    BindEmployeeAttendanceList('', 'tbody_Employee_AttendanceList', 'tblEmployeeAttendanceList', '', '', $('#txtYear').val(),'','');
}
function ShowEmployeeAttendance() {
    if ($('#txtAttendanceDate').val() != '') {
        if (moment($('#txtAttendanceDate').val(), 'YYYY-MM-DD', true).isValid() == true) {
            FetchEmployeeDetails($('#ddlEmployee').val());
            BindEmployeeAttendanceList($('#txtAttendanceDate').val(), 'tbody_AttendanceListDateWise', 'tblAttendanceListDateWise', '', '', '', '','');
        }

    }
    else {
        $('#tblAttendanceListDateWise').DataTable().clear();
        $('#tblAttendanceListDateWise').DataTable().destroy();
        $('#tbody_AttendanceListDateWise').html('');
        $('#tblAttendanceListDateWise').DataTable();
    }
}
function ShowEmployeeName() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());
    }
    else {
        $('#txtEmpName').val('');
    }
}
function ClearAll() {
    $('#tblAttendanceListDateWise').DataTable().clear();
    $('#tblAttendanceListDateWise').DataTable().destroy();
    $('#tbody_AttendanceListDateWise').html('');
    $('#tblAttendanceListDateWise').DataTable();
    $('#ddlEmployee').select2('destroy');
    $('#ddlEmployee').html('<option value="">-Select Employee-</option>');
    $('#ddlEmployee').select2();
    $('#txtEmpName').val('');
    $('#txtAttendanceDate').val('');
    $('#txtAttendanceTime').timepicker('remove');
    $('#txtAttendanceTime').timepicker();
    $('#txtAttendanceTime').val(formattedTime);
    $('input:radio[name="optradioAttendanceType"][value="1"]').prop('checked', true);
    $('input[name=optradioAttendance]').removeAttr('checked');
    $('#ddlBranch').val('');
    $('#ddl_Branch').val('');
    $('#ddlReason').val('NA');
    $('.Individual').show();
    $('#tr_upload').hide();
    $('.individual_entry').show();
    $('#AttendanceUpload').val('');
    $('#divAttendanceListDateWise').show();
    $('#ddlYearFile').val('');
    $('#ddlMonthFile').val('');
    $('#specificSection').text('');
    $('#specificSection').hide();
}
function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendance.aspx/FetchEmployeeDetails',
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
function BindEmployeeAttendanceList(AttendanceDate, tbodyid, tbl_id,day,month,year,empid,branchid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendance.aspx/FetchEmployeAttendanceList',
        data: JSON.stringify({
            "AttendanceDate": AttendanceDate,
            "day": day,
            "month": month,
            "year": year,
            "EmployeeId": empid,
            "branchid": branchid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#' + tbl_id).DataTable().clear();
            $('#' + tbl_id).DataTable().destroy();
            $('#' + tbodyid).html('');
            if (tbl_id == 'tblTransectionListEmployeeWise') {
                BindActionDropdown(data.length);
            }
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td style="white-space: nowrap;">' + data[i].EmpId + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].EmpName + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].BranchName + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AttYear != undefined ? data[i].AttYear : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AttMonth != undefined ? data[i].AttMonth : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AttDay != undefined ? data[i].AttDay : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AttTime != undefined ? data[i].AttTime : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AttEntryDate != undefined ? data[i].AttEntryDate : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Attendance != undefined ? data[i].Attendance : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Reason != undefined ? data[i].Reason : '') + '</td></tr>';
            }
            $('#' + tbodyid).html(html);
            $('#' + tbl_id).DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindEmployeeDropdown(brnch, elmnt,branchid) {
    var chk = 1;
    var branch = '';
    if (brnch == '1') {
        $('#txtEmpName').val('');
        if ($('#' + branchid).val() == '') {
            chk = 0;
        }
        else {
            branch = $('#' + branchid).val();
        }
    }
    
    if (chk == 1) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpAttendance.aspx/EmployeeMasterList',
            data: JSON.stringify({
                "branchid": branch
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#' + elmnt).select2('destroy');
                $('#' + elmnt).html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select Employee-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
                }
                $('#' + elmnt).append(emp);
                $('#' + elmnt).select2();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#' + elmnt).select2('destroy');
        $('#' + elmnt).html('<option value="">-Select Employee-</option>');
        $('#' + elmnt).select2();
    }
}
function SearchEmployeeAttendance() {
    var chkDay = 1;
    var chkMonth = 1;
    var chkYear = 1;

    if ($('#ddlDay').val() != '') {
        if ($('#ddlMonth').val() == '') {
            chkMonth = 0;
        }

        if ($('#txtYear').val() == '') {
            chkYear = 0;
        }
    }

    if ($('#ddlMonth').val() != '') {
        

        if ($('#txtYear').val() == '') {
            chkYear = 0;
        }
    }

    if ($('#ddlDay').val() != '' || $('#ddlMonth').val() != '' || $('#txtYear').val() != '' || $('#ddl_Employee').val() != '' || $('#ddl_Branch').val() != '') {
        if (chkDay == 1) {
            if (chkMonth == 1) {
                if (chkYear == 1) {
                    BindEmployeeAttendanceList('', 'tbody_Employee_AttendanceList', 'tblEmployeeAttendanceList', $('#ddlDay').val(), $('#ddlMonth').val(), $('#txtYear').val(), $('#ddl_Employee').val(), $('#ddl_Branch').val());
                }
                else {
                    alertify.error('Please enter any year');
                }
            }
            else {
                alertify.error('Please select any month');
            }
        }
        else {
            alertify.error('Please select any day');
        }
    }
    else {
        alertify.error('Please enter any searching criteria');
    }
}
function CheckExcelEmpId(filename) {
    //alert(filename.val());
    var Id = filename;//"E:\\Projects\\Bizz\\BizzManWebErp\\Templates\\Attendance.xlsx";
    
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendance.aspx/CompareExcelToDatabase',
        data: JSON.stringify({
            "excelFilePath": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var htmlTable = "<table style='width:100%;border:1px solid black;'><tr style='border:1px solid black;color:red;'><td colspan='2'><b>Error at : Please enter valid Emp ID</b></td></tr><tr style='border:1px solid black;'><th>Excel Row No</th><th>EmpId</th></tr>";
            $.each(data, function (i, item) {
                htmlTable += "<tr style='border:1px solid black;'><td>" + JSON.parse(response.d)[i].rowNumber + "</td><td>" + JSON.parse(response.d)[i].excelValue1 + "</td></tr>";
            });

            htmlTable += "</table>";

            // Attach the HTML table to the specific section
            $('#specificSection').append(htmlTable);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindYearDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpAttendance.aspx/YearList',
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
            $('#ddlYearFile').append(abranch);
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
        url: 'wfHrEmpAttendance.aspx/MonthList',
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
            $('#ddlMonthFile').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function AddEmployeeAttendance() {
    if ($("input:radio[name='optradioAttendanceType']:checked").val() == "3") {
        if ($('#ddlYearFile').val() == '') {
            alertify.error("Please select Year");
            isValid = false;
        }
        else if ($('#ddlMonthFile').val() == '') {
            alertify.error("Please select Month");
            isValid = false;
        }
        else if ($('#AttendanceUpload').val() != '') {
            showLoader();
            var fileUpload = $("#AttendanceUpload").get(0);
            var files = fileUpload.files;
            data = new FormData();
            var userid = $('#ContentPlaceHolder1_loginuser').val();
            var year = $('#ddlYearFile').val();
            var month = $('#ddlMonthFile').val();
            for (var i = 0; i < files.length; i++) {
                //data.append($('#ContentPlaceHolder1_loginuser').val(), files[i]);
                //data.append($('#ddlYearFile').val()),
                //data.append($('#ddlMonthFile').val());
                var form_data = userid + "," + year + "," + month;
                data.append(form_data, files[i]);
            }
            $.ajax({
                url: "FileUploadHandler.ashx",
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {
                    var str = "success";
                    if (result.indexOf(str) != -1) {
                       alertify.success(result);
                        ClearAll();
                    }
                    else {
                        
                        $('#AttendanceUpload').val('');
                        //var htmlTable = "";
                        //htmlTable = "<table style='width:50%;border:1px solid black;color:red;' id='tblerror'><tr><td>" + result + "</td></tr></table>";
                        // Attach the HTML table to the specific section
                        $('#specificSection').show();
                        $('#specificSection').text(result);
                        
                    }
                    hideLoader();
                },
                error: function (err) {
                    hideLoader();
                    // alert(err.statusText)
                    alertify.error(err.statusText);
                    ClearAll();
                }
            });
        }
        else {
            alertify.error('Please upload any excel file');
        }
    }
    else {
        var chkEmp = 1;
        var empid = '';
        if ($("input:radio[name='optradioAttendanceType']:checked").val() == "1") {
            if ($('#ddlEmployee').val() == '') {
                chkEmp = 0;
            }
            else {
                empid = $('#ddlEmployee').val();
            }
        }

        if ($('#txtAttendanceDate').val() != '') {
            if ($('#txtAttendanceTime').val() != '') {
                if ($('#ddlBranch').val() != '') {
                    if (chkEmp == 1) {
                        if ($("input:radio[name='optradioAttendance']:checked").val() != undefined) {
                            $.ajax({
                                type: "POST",
                                url: 'wfHrEmpAttendance.aspx/AddEmployeeAttendance',
                                data: JSON.stringify({
                                    "AttendanceType": $("input:radio[name='optradioAttendanceType']:checked").val(),
                                    "EmpId": empid,
                                    "BranchId": $('#ddlBranch').val(),
                                    "AttendanceDate": $('#txtAttendanceDate').val(),
                                    "AttendanceTime": $('#txtAttendanceTime').val(),
                                    "Attendance": $("input:radio[name='optradioAttendance']:checked").val(),
                                    "Reason": $('#ddlReason').val(),
                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function () {

                                },
                                success: function (response) {
                                    var str = "success";
                                    if (response.d.indexOf(str) != -1) {
                                        alertify.success(response.d);
                                        ClearAll();
                                    }
                                    else {
                                        alertify.error(response.d);
                                    }

                                },
                                complete: function () {

                                },
                                failure: function (jqXHR, textStatus, errorThrown) {

                                }
                            });
                        }
                        else {
                            alertify.error('Please select any attendance');
                        }
                    }
                    else {
                        alertify.error('Please select any employee');
                    }
                }
                else {
                    alertify.error('Please select any branch');
                }
            }
            else {
                alertify.error('Please enter attendance time');
            }
        }
        else {
            alertify.error('Please enter attendance date');
        }
    }
}