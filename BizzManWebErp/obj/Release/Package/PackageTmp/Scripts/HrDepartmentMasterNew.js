$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindMasterList();
});

function BindMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfHrDeptMasterNew.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblDeptList').DataTable().clear();
            $('#tblDeptList').DataTable().destroy();
            $('#tbody_Dept_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchMasterDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].DeptName + '</td></tr>';
            }
            $('#tbody_Dept_List').html(html);
            $('#tblDeptList').DataTable();

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
        url: 'wfHrDeptMasterNew.aspx/FetchMasterDetails',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divDataList').hide();
            $('#divDataEntry').show();

            $("#btnSave").html('Update');
            $('#txtDepartmentName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();

            var data = JSON.parse(response.d);

            $('#txtDepartmentName').val(data[0].DeptName);
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
    $('#divDataList').hide();
    $('#divDataEntry').show();

    $('#txtDepartmentName').removeAttr("readonly");
    $('#txtId').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

// new style by mk
function ViewDataList() {
    $('#divDataList').show();
    $('#divDataEntry').hide();
    $('#btnSave').hide();
    BindMasterList();
}


function ClearAll() {
    $('#txtDepartmentName').val('');
    $('#txtId').val('');

}

// new style of code by mk
function AddData() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#txtDepartmentName').val() == '') {
        alertify.error("Please Enter Department Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrDeptMasterNew.aspx/CheckDataAvailability',
            data: JSON.stringify({ "strSearchName": $('#txtDepartmentName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrDeptMasterNew.aspx/AddData',
                        data: JSON.stringify({
                            "DeptName": $('#txtDepartmentName').val().trim(),
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
                alertify.success("Department Name updated successfully");
            }
            else {
                alertify.success("Department Name added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}