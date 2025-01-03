$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindUnitMesureDropdown()
    BindCtcItemNameDropdown()
    BindJobCategoryDropdown();
    BindEmpJobList();

    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});

function BindJobCategoryDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/JobCategoryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].JobCategoryName + "</option>";
            }
            $('#ddlJobCategory').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindCtcItemNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/JobCtcItemList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].CtcItemName + "'>" + JSON.parse(response.d)[i].CtcItemName + "</option>";
            }
            $('#ddlCtcItemName').append(abranch);
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
        url: 'wfHrEmpJobMaster.aspx/UnitMesureList',
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
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindEmpJobList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/FetchEmpJoblList',
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
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmpJobDetails(\'' + data[i].EmpJobName + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].JobCategoryName + '</td>'
                    + '<td>' + data[i].EmpJobName + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td>' + data[i].JobRate + '</td>'
                    + '<td>' + data[i].CtcItemName + '</td></tr>';
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

function FetchEmpJobDetails(name) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/FetchEmpJobDetails',
        data: JSON.stringify({
            "EmpJobName": name
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
            $('#txtJobName').attr("readonly", "readonly");
            $('#ddlCtcItemName').attr("disabled", true);
            $('#ddlJobCategory').attr("disabled", true);
            $('#txtId').attr("readonly", "readonly");
            $('#ddlUnitMesure').attr("disabled", true);
            $("#btnSave").show();




            var data = JSON.parse(response.d);

            $('#txtJobName').val(data[0].EmpJobName);
            $('#ddlCtcItemName').val(data[0].CtcItemName);
            $('#txtId').val(data[0].Id);
            $('#txtJobRate').val(data[0].JobRate);
            $('#ddlJobCategory').val(data[0].JobCategoryId);            
            $('#ddlUnitMesure').val(data[0].UnitMesure);

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
            url: 'wfHrEmpJobMaster.aspx/CheckJobAvailability',
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
                        url: 'wfHrEmpJobMaster.aspx/AddEmpJob',
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