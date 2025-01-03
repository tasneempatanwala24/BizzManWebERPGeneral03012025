$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });


   // BindKpiGroupDropdown()
    BindMasterList();

    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});

//made by mk
/*
function BindKpiGroupDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfAdminModuleMaster.aspx/KpiGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].KpiGroupName + "</option>";
            }
            $('#ddlKpiGroup').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/

//  made by mk
function BindMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfAdminModuleMaster.aspx/FetchMasterList',
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
                html = html + '<tr onclick="FetchMasterDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].ModuleName + '</td>'
                    + '<td>' + data[i].SubModuleName + '</td>'
                    + '<td>' + data[i].Description + '</td></tr>';
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

function FetchMasterDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfAdminModuleMaster.aspx/FetchMasterDetails',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            //    $('#divEmpJobList').hide();
            $('#divDataList').hide();

            //   $('#divEmpJobEntry').show();
            $('#divDataEntry').show();

            $("#btnSave").html('Update');
            $('#txtSubGroupName').attr("readonly", "readonly");
            $('#ddlKpiGroup').attr("disabled", true);
            //   $('#ddlJobCategory').attr("disabled", true);
            $('#txtId').attr("readonly", "readonly");
            //   $('#ddlUnitMesure').attr("disabled", true);
            $("#btnSave").show();

            var data = JSON.parse(response.d);

            $('#txtSubGroupName').val(data[0].ModuleName);
            $('#ddlKpiGroup').val(data[0].SubModuleName);
            $('#txtId').val(data[0].Id);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

//new by mk  
function CreateData() {
    //  $('#divEmpJobList').hide();
    $('#divDataList').hide();

    //  $('#divEmpJobEntry').show();
    $('#divDataEntry').show();

    $('#txtSubGroupName').removeAttr("readonly");
    $('#txtId').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#ddlKpiGroup').attr("disabled", false);

    ClearAll();
}

// new style by mk
function ViewDataList() {
    // $('#divEmpJobList').show();
    $('#divDataList').show();

    //  $('#divEmpJobEntry').hide();
    $('#divDataEntry').hide();


    $('#btnSave').hide();

    BindMasterList();
}


function ClearAll() {
    $('.dcmlNo').val('0.00');
    $('#txtSubGroupName').val('');
    $('#ddlKpiGroup').val('');
    $('#txtId').val('');

}

// new style of code by mk
function AddData() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#ddlKpiGroup').val() == '') {
        alertify.error("Please Select KPI Group");
        isValid = false;
    }
    else if ($('#txtSubGroupName').val() == '') {
        alertify.error("Please Enter Sub Group Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfAdminModuleMaster.aspx/CheckDataAvailability',
            data: JSON.stringify({ "strSearchName": $('#txtSubGroupName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfAdminModuleMaster.aspx/AddData',
                        data: JSON.stringify({
                            "KpiGroupId": $('#ddlKpiGroup').val().trim(),
                            "KpiSubGroupName": $('#txtSubGroupName').val().trim(),
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
                    alertify.error("Current Name already available");
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
                alertify.success("KPI Sub Group Master updated successfully");
            }
            else {
                alertify.success("KPI Sub Group Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}