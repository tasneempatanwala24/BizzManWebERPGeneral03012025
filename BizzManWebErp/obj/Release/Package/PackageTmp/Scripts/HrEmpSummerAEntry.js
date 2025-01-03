var ParentId = 0;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    ViewDataList();
    BindYearDropdown();
    BindMonthDropdown();
    BindBranchDropdown();

    $("#ddlBranch").on("change", function () {
        BindEmployeeDropdown();
    }).trigger("change");
    $("#ddlEmployee").on("change", function () {
        ShowEmployeeName();
    }).trigger("change");
    $('#txtSummerA').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});
function BindBranchDropdown() {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpSummerAEntry.aspx/BranchMasterList',
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

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindEmployeeDropdown() {
    $('#txtEmpName').val('');
    if ($('#ddlBranch').val() == '') {
        $('#ddlEmployee').html("<option value>-Select Employee-</option>");
        $('#ddlEmployee').select2();
        $('#txtEmpName').val('');
        $("#ddlYear").val('');
    }

    else {

        $.ajax({
            type: "POST",
            url: 'wfHrEmpSummerAEntry.aspx/EmployeeMasterList',
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
function ShowEmployeeName() {
    if ($('#ddlEmployee').val() == null || $('#ddlEmployee').val() == '') {
        $('#txtEmpName').val('');
        
    }
    else {
        FetchEmployeeDetails($('#ddlEmployee').val());
        
    }
}
function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSummerAEntry.aspx/FetchEmployeeDetails',
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
function BindYearDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSummerAEntry.aspx/YearList',
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
        url: 'wfHrEmpSummerAEntry.aspx/MonthList',
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

function ClearAll() {
    $('#ddlBranch').val('');
    $('#ddlEmployee').val('');
    $('#txtEmpName').val('');
    $('#txtId').val('');
    $('#ddlYear').val('');
    $('#ddlMonth').val('');
    $('#txtSummerA').val('');
    $("#btnSave").html('Save');
    $("#btnSave").show();
    $('#ddlBranch').attr("disabled", false);
    $('#ddlEmployee').attr("disabled", false);
    $('#ddlYear').attr("disabled", false);
    $('#ddlMonth').attr("disabled", false);
    $('#txtEmpName').attr("readonly", "readonly");
    $('#txtId').attr("readonly", "readonly");
    $('#txtSummerA').prop('readonly', false);
}
function CreateData() {
    $('#divDataList').hide();
    $('#divDetailDataList').hide();
    $('#divDataEntry').show();

    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#ddlBranch').attr("disabled", false);
    $('#ddlEmployee').attr("disabled", false);
    $('#txtEmpName').attr("readonly", "readonly");
    $('#txtId').attr("readonly", "readonly");
    $('#ddlYear').attr("disabled", false);
    $('#ddlMonth').attr("disabled", false);
    $('#txtSummerA').attr("disabled", false);
    ClearAll();
}
function ViewDataList() {
    $('#divDataList').show();
    $('#btnSave').hide();
    $('#divDataEntry').hide();
    BindEmpSummerAList();
}

function BindEmpSummerAList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSummerAEntry.aspx/FetchEmpSummerAList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpSummerAList').DataTable().clear();
            $('#tblEmpSummerAList').DataTable().destroy();
            $('#tbody_EmpSummerA_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmpSummerADetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    //html = html + '<tr><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].SummerA + '</td></tr > ';
            }
            $('#tbody_EmpSummerA_List').html(html);
            $('#tblEmpSummerAList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function AddData() {
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#ddlBranch').val() == '') {
        alertify.error("Please select Branch");
        isValid = false;
    }
    else if ($('#ddlEmployee').val() == '') {
        alertify.error("Please select Employee");
        isValid = false;
    }
    else if ($('#ddlYear').val() == '') {
        alertify.error("Please select Year");
        isValid = false;
    }
    else if ($('#ddlMonth').val() == '') {
        alertify.error("Please select Month");
        isValid = false;
    }
    else if ($('#txtSummerA').val() == '') {
        alertify.error("Please select Summer A");
        isValid = false;
    }
    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpSummerAEntry.aspx/CheckDataAvailability',
            data: JSON.stringify({"EmpId": $('#ddlEmployee').val(), "Year": $('#ddlYear').val(), "Month": $('#ddlMonth').val()}),
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
                    alertify.error("Already Generated Salary, could not entry OT");
                }
                else if (isRecordExists) {
                    alertify.error("Record already available");
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpSummerAEntry.aspx/AddData',
                        data: JSON.stringify({
                            "BranchCode": $('#ddlBranch').val(),
                            "EmpId": $('#ddlEmployee').val(),
                            "Year": $('#ddlYear').val(),
                            "Month": $('#ddlMonth').val(),
                            "SummerA": $('#txtSummerA').val().trim(),
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                if (isUpdate == 1) {
                                    alertify.success('Employee Summer A updated successfully');
                                }
                                else { alertify.success('Employee Summer A added successfully'); }
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
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function FetchEmpSummerADetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSummerAEntry.aspx/FetchEmpSummerADetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },

        success: function (response) {
            $('#divDataList').hide();
            $('#divDataEntry').show();
            var data = JSON.parse(response.d);

            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#ddlBranch').attr("disabled", true);
            $('#ddlEmployee').attr("disabled", true);
            $('#ddlYear').attr("disabled", true);
            $('#ddlMonth').attr("disabled", true);
            $('#txtEmpName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $('#txtSummerA').prop('readonly', false);
            $('#ddlBranch').val(data[0].BranchCode);
            $('#ddlEmployee').html("<option value = ''> -Select Employee -</option><option value='" + data[0].EmpId + "' selected>" + data[0].EmpName + "</option>");
            $('#ddlEmployee').val(data[0].EmpId).attr("selected", true);
            $('#txtEmpName').val(data[0].EmpName);
            $('#ddlYear').val(data[0].Year);
            $('#ddlMonth').val(data[0].Month);
            $('#txtId').val(data[0].Id);
            $('#txtSummerA').val(data[0].SummerA);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}