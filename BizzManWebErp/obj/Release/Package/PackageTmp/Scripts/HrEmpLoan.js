$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    BindBranchDropdown();

    BindYearDropdown()
    BindMonthDropdown()
    BindJobMasterDropDown();
    //   BindEmpDropdown()

    BindEmpJobList();

    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});

 
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/BranchMasterList',
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
            //  $('#ddlFromBranch').append(branch);
            //    $('#ddlToBranch').append(branch);
            $('#ddlBranch').append(branch);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindEmployeeDropdown() {
    if ($('#ddlBranch').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpJobAssign.aspx/EmployeeMasterList',
            data: JSON.stringify({
                "branchid": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#ddlEmployee').select2('destroy');
                $('#ddlEmployee').html('');
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
        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').html('');
        $('#ddlEmployee').select2();
    }
}

//   fetch eployees name by this module
function ShowEmployeeName() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());
    }
    else {
        ClearAll();
    }
}

function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/FetchEmployeeDetails',
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

//   fetch Job Rate
function ShowJobRate() {
    if ($('#ddlJob').val() != '') {
        FetchJobRateDetails($('#ddlJob').val());
    }
    else {
        ClearAll();
    }
}

function FetchJobRateDetails(empjobname) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/FetchJobRateDetail',
        data: JSON.stringify({
            "EmpJobName": empjobname
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#txtJobRate').val(data[0].JobRate);
            // $('#txtJobRate').val(data[0].EmpJobName);
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
        url: 'wfHrEmpJobAssign.aspx/YearList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                //  abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Year + "</option>";
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Year + "'>" + JSON.parse(response.d)[i].Year + "</option>";
            }
            $('#ddlYear').append(abranch);
            // $('#ddlBankBranch').append(branch);
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
        url: 'wfHrEmpJobAssign.aspx/MonthList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                // abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].MonthName + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
            }
            $('#ddlMonth').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//   job

function BindJobMasterDropDown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/JobMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                // abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].EmpJobName + "</option>";
            }
            $('#ddlJob').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}






/*
function BindEmpDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/EmpList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpId + "</option>";
            }
            $('#ddlEmpId').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/


function BindEmpJobList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/FetchEmpJoblList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpJobList').DataTable().clear();
            $('#tblEmpJobList').DataTable().destroy();
            $('#tbody_EmpJob_List').html('');
            var html = '';
            //Id, Year, Month, EmpId, EmpJobMasterId, JobAssignDate, JobAssignTime
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmpJobDetails(\'' + data[i].Id + '\')">< td > ' + data[i].Year + '</td > '
                    + '<td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpJobMasterId + '</td>'
                    + '<td>' + data[i].JobAssignDate + '</td></tr>';
            }
            $('#tbody_EmpJob_List').html(html);
            $('#tblEmpJobList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchEmpJobDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/FetchEmpJobDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divEmpJobList').hide();
            $('#divEmpJobEntry').show();
            $("#btnSave").html('Update');
            $('#ddlYear').attr("readonly", "readonly");
            $('#ddlMonth').attr("readonly", "readonly");
            //   $('#ddlJob').attr("disabled", true);
            $('#txtId').attr("readonly", "readonly");
            //  $('#ddlUnitMesure').attr("disabled", true);
            $("#btnSave").show();


            //Id, Year, Month, EmpId, EmpJobMasterId, JobAssignDate, JobAssignTime

            var data = JSON.parse(response.d);

            $('#ddlYear').val(data[0].Year);
            $('#ddlMonth').val(data[0].Month);
            $('#txtId').val(data[0].Id);
            $('#ddlEmpId').val(data[0].EmpId);

            $('#ddlJob').val(data[0].EmpJobMasterId);





            //   $('#ddlJobCategory').val(data[0].JobAssignDate);
            //  $('#ddlUnitMesure').val(data[0].JobAssignTime);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function CreateEmpJob() {
    $('#divEmpJobList').hide();
    $('#divEmpJobEntry').show();
    $('#txtJobName').removeAttr("readonly");
    $('#txtId').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#ddlCtcItemName').attr("disabled", false);
    $('#ddlJobCategory').attr("disabled", false);
    $('#ddlUnitMesure').attr("disabled", false);
    ClearAll();
}

function ViewEmpJobList() {
    $('#divEmpJobList').show();
    $('#divEmpJobEntry').hide();
    $('#btnSave').hide();
    BindEmpJobList();
}

function ClearAll() {
    $('.dcmlNo').val('0.00');
    $('#txtJobName').val('');
    $('#ddlCtcItemName').val('');
    $('#txtId').val('');
    $('#ddlJobCategory').val('');
    $('#ddlUnitMesure').val('');
}

function AddEmpJob() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#ddlUnitMesure').val() == '') {
        alertify.error("Please Select Unit Mesure");
        isValid = false;
    }
    else if ($('#txtJobName').val() == '') {
        alertify.error("Please Enter Job Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpJobAssign.aspx/CheckJobAvailability',
            data: JSON.stringify({ "EmpJobName": $('#txtJobName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpJobAssign.aspx/AddEmpJob',
                        data: JSON.stringify({
                            "JobCategoryId": $('#ddlJobCategory').val().trim(),
                            "EmpJobName": $('#txtJobName').val().trim(),
                            "UnitMesure": $('#ddlUnitMesure').val().trim(),
                            "JobRate": $('#txtJobRate').val().trim(),
                            "CtcItemName": $('#ddlCtcItemName').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            UploadFiles();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error("Current Job Name already available");
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
        contentType: false,
        processData: false,
        success: function (result) {
            if ($('#btnSave').html() == 'Update') {
                alertify.success("Employees Job Master updated successfully");
            }
            else {
                alertify.success("Employees Job Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}