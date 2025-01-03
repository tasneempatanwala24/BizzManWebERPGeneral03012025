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
        BindEmpOTDetailList();
        $("#ddlMonth").val('');
    }).trigger("change");
    $("#ddlEmployee").on("change", function () {
        ShowEmployeeName();
        BindEmpOTDetailList();
        $("#ddlMonth").val('');
    }).trigger("change");

    $("#ddlMonth").on("change", function () {
        $("#txtOTDate").val('');

        if ($("#ddlMonth").val() != '') {
            var year = $('#ddlYear').val(); //get year
            var month = $('#ddlMonth').val(); //get month
            $('#txtOTDate').datepicker('destroy').datepicker({
                format: "dd-M-yyyy",
                viewMode: "days",
                minViewMode: "days",
                autoclose: true,
                //todayHighlight: true,
                enableOnReadonly: false,
                changeMonth: true,
                changeYear: true,
                //defaultDate: new Date(year, new Date(month + " 1," + year).getMonth(), '01'),
                startDate: new Date(year, new Date(month + " 1," + year).getMonth(), '01'), //set it here
                endDate: new Date(year, new Date(month + " 1," + year).getMonth(), new Date(year, new Date(month + " 1," + year).getMonth() + 1, 0).getDate())
            });
        }

        if ($("#ddlBranch").val() == '') {
            alertify.error("Please select Branch");
            $("#ddlMonth").val('');
            return false;
        }

        else if ($("#ddlEmployee").val() == '') {
            alertify.error("Please select Employee");
            $("#ddlMonth").val('');
            return false;
        }
        else if ($("#ddlYear").val() == '' && $("#ddlMonth").val() != '') {

            alertify.error("Please select Year");
            $("#ddlMonth").val('');
            return false;
        }
        else {
            BindEmpOTDetailList();
        }

    }).trigger("change");
    //$('#txtHours').keypress(function (event) {
    //    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
    //        event.preventDefault();
    //    }
    //});
    $('#txtHours').keypress(function (event) {
        // Allowing only digits (0-9), decimal point (.), and backspace (8)
        if ((event.which != 8 && event.which != 46 && (event.which < 48 || event.which > 57)) ||
            // Allowing only one decimal point
            ($(this).val().indexOf('.') != -1 && event.which == 46) ||
            // Limiting to three decimal places
            ($(this).val().indexOf('.') != -1 && $(this).val().split('.')[1].length >= 3)) {
            event.preventDefault();
        }
    });
    $('#txtTotalHours').keypress(function (event) {
        // Allowing only digits (0-9), decimal point (.), and backspace (8)
        if ((event.which != 8 && event.which != 46 && (event.which < 48 || event.which > 57)) ||
            // Allowing only one decimal point
            ($(this).val().indexOf('.') != -1 && event.which == 46) ||
            // Limiting to three decimal places
            ($(this).val().indexOf('.') != -1 && $(this).val().split('.')[1].length >= 3)) {
            event.preventDefault();
        }
    });
});
function BindBranchDropdown() {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtEntry.aspx/BranchMasterList',
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
            url: 'wfHrEmpOtEntry.aspx/EmployeeMasterList',
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
        $("#ddlYear").val('');
    }
    else {
        FetchEmployeeDetails($('#ddlEmployee').val());
        $("#ddlYear").val((new Date).getFullYear());
    }
}
function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtEntry.aspx/FetchEmployeeDetails',
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
        url: 'wfHrEmpOtEntry.aspx/YearList',
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
        url: 'wfHrEmpOtEntry.aspx/MonthList',
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
    $('#txtTotalOT').val('');
    $('#txtOTDate').val('');
    $('#txtHours').val('');
    $('#txtTotalHours').val('');
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
    $('#txtTotalOT').attr("readonly", "readonly");
    $('#txtTotalHours').attr("readonly", "readonly");
    $('#txtOTDate').removeAttr("readonly");
    ClearAll();

}
function ViewDataList() {
    $('#divDataList').show();
    $('#btnSave').hide();
    $('#divDataEntry').hide();
    BindEmpOTList();
}

function BindEmpOTList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtEntry.aspx/FetchEmpOTList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpOTList').DataTable().clear();
            $('#tblEmpOTList').DataTable().destroy();
            $('#tbody_EmpOT_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmpOTDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    //html = html + '<tr><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].TotalHours + '</td>'
                    + '<td>' + data[i].TotalOT + '</td></tr > ';
            }
            $('#tbody_EmpOT_List').html(html);
            $('#tblEmpOTList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function DeleteOTDetailData(Id, OtMasterEntryId) {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtEntry.aspx/DeleteOTDetailData',
        data: JSON.stringify({
            "Id": Id,
            "OtMasterEntryId": OtMasterEntryId
        }),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {

        },
        success: function (response) {
            var r = JSON.parse(response.d);

            if (r.status == "success") {
                alertify.success('Employee OT detail deleted successfully');
                BindEmpOTDetailList();
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
function BindEmpOTDetailList() {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtEntry.aspx/FetchEmpOTDetailsEntry',
        data: JSON.stringify({
            "BranchCode": $('#ddlBranch').val(),
            "EmpId": $('#ddlEmployee').val(),
            "Year": $('#ddlYear').val(),
            "Month": $('#ddlMonth').val()
        }),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#divDetailDataList').show();
            $('#tblEmpOTDetailList').DataTable().clear();
            $('#tblEmpOTDetailList').DataTable().destroy();
            $('#tbody_EmpOTDetail_List').html('');


            var html = ''; var countOT; var counthours = 0;
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr>'
                    //+ '<td> ' + data[i].Id + '</td > '
                    //+ '<td>' + data[i].OtMasterEntryId + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].Day + '</td>'
                    + '<td>' + data[i].Hours + '</td>'
                    + '<td><a onclick="DeleteOTDetailData(\'' + data[i].Id + '\',\'' + data[i].OtMasterEntryId + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>';
                countOT = i + 1;
                counthours = counthours + data[i].Hours;
                ParentId = data[i].OtMasterEntryId;
            }
            $('#tbody_EmpOTDetail_List').html(html);
            $('#tblEmpOTDetailList').DataTable();
            $('#txtTotalOT').val(countOT);
            $('#txtTotalHours').val(counthours);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function AddData() {
    var OTD = new Date($('#txtOTDate').val());
    var OTmonth = OTD.toLocaleString('default', { month: 'short' });
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
    else if ($('#Year').val() == '') {
        alertify.error("Please select Year");
        isValid = false;
    }
    else if ($('#ddlMonth').val() == '') {
        alertify.error("Please select Month");
        isValid = false;
    }
    else if ($('#txtOTDate').val() == '') {
        alertify.error("Please select OT Date");
        isValid = false;
    }
    else if (OTmonth != $('#ddlMonth').val()) {
        alertify.error("OT Date Month doesnot match with Month selected");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpOtEntry.aspx/CheckDataAvailability',
            data: JSON.stringify({ "OtMasterEntryId": ParentId, "OTDate": $('#txtOTDate').val(), "EmpId": $('#ddlEmployee').val(), "Year": $('#ddlYear').val(), "Month": $('#ddlMonth').val() }),
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
                        url: 'wfHrEmpOtEntry.aspx/AddData',
                        data: JSON.stringify({
                            "BranchCode": $('#ddlBranch').val(),
                            "EmpId": $('#ddlEmployee').val(),
                            "Year": $('#ddlYear').val(),
                            "Month": $('#ddlMonth').val(),
                            "OTDate": $('#txtOTDate').val().trim(),
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "Hours": $('#txtHours').val(),
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                alertify.success('Employee OT detail added successfully');
                                $('#txtOTDate').val('');
                                $('#txtHours').val('');
                                //$('#txtTotalHours').val('');
                                BindEmpOTDetailList();
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

function FetchEmpOTDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpOtEntry.aspx/FetchEmpOTDetails',
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
            $('#ddlBranch').attr("disabled", false);
            $('#ddlEmployee').attr("disabled", false);
            $('#ddlYear').attr("disabled", false);
            $('#ddlMonth').attr("disabled", false);
            $('#txtEmpName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $('#txtTotalOT').attr("readonly", "readonly");
            $('#txtOTDate').prop('readonly', false);
            $('#ddlBranch').val(data[0].BranchCode);
            $('#ddlEmployee').html("<option value = ''> -Select Employee -</option><option value='" + data[0].EmpId + "' selected>" + data[0].EmpName + "</option>");
            $('#ddlEmployee').val(data[0].EmpId).attr("selected", true);
            $('#txtEmpName').val(data[0].EmpName);
            $('#ddlYear').val(data[0].Year);
            $('#ddlMonth').val(data[0].Month);
            $('#txtId').val(data[0].Id);
            $('#txtTotalOT').val(data[0].TotalOT);
            //$('#txtTotalHours').val(data[0].TotalHours).toFixed(3);
            $('#txtTotalHours').val(data[0].TotalHours);
            $('#txtOTDate').val(data[0].OTDate);
            BindEmpOTDetailList();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}