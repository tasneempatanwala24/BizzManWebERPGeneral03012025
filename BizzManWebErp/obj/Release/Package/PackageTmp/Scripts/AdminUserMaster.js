$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindEmpIdDetails();
    BindRoleNameDetails();
    $("#btntitle").html('User Master');
    BindUserMasterDetails();

    
});

function BindUserMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfAdminUserMaster.aspx/FetchDetails',
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
                html = html + '<tr onclick="FetchUserMasterDetails(\'' + data[i].UserName + '\')"style="cursor:pointer"><td>' + data[i].UserName + '</td>'
                    + '<td> ' + (data[i].Password != undefined ? data[i].Password : '') + '</td > '
                    + '<td> ' + (data[i].RoleName != undefined ? data[i].RoleName : '') + '</td > '
                    + '<td> ' + (data[i].EmpId != undefined ? data[i].EmpId : '') + '</td > '
                    + '<td> ' + (data[i].AccessStatus != undefined ? data[i].AccessStatus : '') + '</td > '
                    + '<td> ' + (data[i].PersonName != undefined ? data[i].PersonName : '') + '</td > '
                    + '<td> ' + (data[i].Address != undefined ? data[i].Address : '') + '</td > '
                    + '<td> ' + (data[i].MobileNo != undefined ? data[i].MobileNo : '') + '</td > '
                    + '<td> ' + (data[i].Email != undefined ? data[i].Email : '') + '</td > '
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

function BindRoleNameDetails() {
    $.ajax({
        type: "POST",
        url: 'wfAdminUserMaster.aspx/RoleNameList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].RoleId + "'>" + JSON.parse(response.d)[i].RoleName + "</option>";
            }
            $('#ddlRoleName').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindEmpIdDetails() {
    $.ajax({
        type: "POST",
        url: 'wfAdminUserMaster.aspx/EmpIdList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpId + "</option>";
            }
            $('#ddlEmpId').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchUserMasterDetails(UserName) {
    $.ajax({
        type: "POST",
        url: 'wfAdminUserMaster.aspx/FetchUserMasterDetails',
        data: JSON.stringify({
            "UserName": UserName
            
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

            $('#txtUserName,#txtPassword,#txtPersonName,#txtAddress,#txtMobileNo,#txtEmail').attr("readonly", "readonly");
            $("#ddlEmpId").attr("disabled", "disabled");
            $("#txtDescription").attr("disabled", "disabled");
            $("#btnSave").show();


            $('#txtUserName').val(data[0].UserName);
            $('#txtPassword').val(data[0].Password);
            $('#ddlEmpId').val(data[0].EmpId);
            $('#ddlRoleName').val(data[0].RoleId);
            $('#txtPersonName').val(data[0].PersonName);
            $('#txtAddress').val(data[0].Address);
            $('#txtMobileNo').val(data[0].MobileNo);
            $('#txtEmail').val(data[0].Email);
            $('#txtDescription').val(data[0].Description);
            $('#chkActive').prop('checked', data[0].AccessStatus === "Y");

            //dynamic breadcrumbs
            $("#btntitle").html("User Master / " + data[0].UserName);

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
    $("#btntitle").html('User Master');
    BindUserMasterDetails();

}


function ClearAll() {
    $('#txtUserName,#txtPassword,#ddlEmpId,#ddlRoleName,#txtPersonName,#txtAddress,#txtMobileNo,#txtEmail,#txtDescription').val('');
    $('#chkActive').prop('checked', false);

}

function CreateUser() {
    $('#divUserList').hide();
    $('#divUserMasterEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    //dynamic breadcrumbs
    $("#btntitle").html('User Master / New');
    $('#txtUserName,#txtPassword,#ddlEmpId,#txtPersonName,#txtAddress,#txtMobileNo,#txtEmail').removeAttr("readonly");
    $("#ddlEmpId").attr("disabled", false);
    $("#txtDescription").attr("disabled", false);
    ClearAll();
}

//dynamic breadcrumbs
function Title() {
    window.location = "wfAdminUserMaster.aspx";
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtUserName').val() == '') {
        alertify.error("Please Enter User Name");
        isValid = false;
    }
    else if ($('#txtPassword').val() == '') {
        alertify.error("Please Enter Password");
        isValid = false;
    }
    else if ($('#ddlRoleName').val() == '') {
        alertify.error("Please Enter Role Name");
        isValid = false;
    }
    else if ($('#txtDescription').val() == '') {
        alertify.error("Please Enter Description");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfAdminUserMaster.aspx/CheckAvailability',
            data: JSON.stringify({ "UserName": $('#txtUserName').val(), 'EmpId': $('#ddlEmpId').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfAdminUserMaster.aspx/AddDetails',
                        data: JSON.stringify({
                            "UserName": $('#txtUserName').val().trim(),
                            "Password": $('#txtPassword').val().trim(),
                            "EmpId": $('#ddlEmpId').val().trim(),
                            'RoleId': $('#ddlRoleName').val().trim(),
                            "AccessStatus": $('#chkActive').prop('checked') === true ? "Y" : "N",
                            "PersonName": $('#txtPersonName').val().trim(),
                            "Address": $('#txtAddress').val().trim(),
                            "MobileNo": $('#txtMobileNo').val().trim(),
                            'Email': $('#txtEmail').val().trim(),
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
                    alertify.error("Current User Details already available");
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
                alertify.success("User Master updated successfully");
            }
            else {
                alertify.success("User Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}