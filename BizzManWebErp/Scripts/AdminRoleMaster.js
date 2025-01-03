$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindDashboardDetails();
    $("#btntitle").html('Role Master');
    BindRoleMasterDetails();


});

function BindRoleMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfAdminRoleMaster.aspx/FetchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblUserList').DataTable().clear();
            $('#tblUserList').DataTable().destroy();
            $('#tbody_User_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchRoleMasterDetails(\'' + data[i].RoleName + '\')"style="cursor:pointer"><td>' + data[i].RoleId + '</td>'
                    + '<td> ' + (data[i].RoleName != undefined ? data[i].RoleName : '') + '</td > '                   
                    + '<td> ' + (data[i].DashboardName != undefined ? data[i].DashboardName : '') + '</td > '
                    + '<td> ' + (data[i].Active != undefined ? data[i].Active : '') + '</td > '
                    + '<td> ' + (data[i].Description != undefined ? data[i].Description : '') + '</td > '
            }
            $('#tbody_User_List').html(html);
            $('#tblUserList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindDashboardDetails() {
    $.ajax({
        type: "POST",
        url: 'wfAdminRoleMaster.aspx/DashboardList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].DashboardName + "'>" + JSON.parse(response.d)[i].DashboardName + "</option>";
            }
            $('#ddlDashboardName').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchRoleMasterDetails(RoleName) {
    $.ajax({
        type: "POST",
        url: 'wfAdminRoleMaster.aspx/FetchRoleMasterDetails',
        data: JSON.stringify({
            "RoleName": RoleName 

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            ClearAll();
            $('#divUserList').hide();
            $('#divUserMasterEntry').show();
            $("#btnSave").html('Update');

            $('#txtRoleName,#txtDescription').attr("readonly", "readonly");
           
            $("#btnSave").show();


            $('#txtRoleName').val(data[0].RoleName);
            $('#ddlDashboardName').val(data[0].DashboardName);
            $('#txtDescription').val(data[0].Description);
            $('#chkActive').prop('checked', data[0].Active  === "Y");

            //dynamic breadcrumbs
            $("#btntitle").html("Role Master / " + data[0].RoleName);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ViewUserList() {
    $('#divUserList').show();
    $('#divUserMasterEntry').hide();
    $('#btnSave').hide();
    //dynamic breadcrumbs
    $("#btntitle").html('Role Master');
    BindRoleMasterDetails();

}


function ClearAll() {
    $('#txtRoleName,#ddlDashboardName,#txtDescription').val('');
    $('#chkActive').prop('checked', false);

}

function CreateUser() {
    $('#divUserList').hide();
    $('#divUserMasterEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    //dynamic breadcrumbs
    $("#btntitle").html('Role Master / New');
    $('#txtRoleName,#txtDescription').removeAttr("readonly");
    ClearAll();
}

//dynamic breadcrumbs
function Title() {
    window.location = "wfAdminRoleMaster.aspx";
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtRoleName').val() == '') {
        alertify.error("Please Enter Role Name");
        isValid = false;
    }
    else if ($('#ddlDashboardName').val() == '') {
        alertify.error("Please Enter Dashboard Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfAdminRoleMaster.aspx/CheckAvailability',
            data: JSON.stringify({ "RoleName": $('#txtRoleName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfAdminRoleMaster.aspx/AddDetails',
                        data: JSON.stringify({
                            "RoleName": $('#txtRoleName').val().trim(),
                            "DashboardName": $('#ddlDashboardName').val().trim(),
                            "Active": $('#chkActive').prop('checked') === true ? "Y" : "N",
                            'Description': $('#txtDescription').val().trim(),
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
                    alertify.error("Current Role Name Already Available");
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
                alertify.success("Role Master updated successfully");
            }
            else {
                alertify.success("Role Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}