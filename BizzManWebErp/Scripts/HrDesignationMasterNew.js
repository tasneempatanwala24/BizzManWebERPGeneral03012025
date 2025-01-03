$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindMasterList();
});

function BindMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfHrDesignationMasterNew.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblDesignationList').DataTable().clear();
            $('#tblDesignationList').DataTable().destroy();
            $('#tbody_Designation_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchMasterDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].DesignationName + '</td></tr>';
            }
            $('#tbody_Designation_List').html(html);
            $('#tblDesignationList').DataTable();

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
        url: 'wfHrDesignationMasterNew.aspx/FetchMasterDetails',
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
            //$('#txtDesignationName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();

            var data = JSON.parse(response.d);

            $('#txtDesignationName').val(data[0].DesignationName);
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

    $('#txtDesignationName').removeAttr("readonly");
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
    $('#txtDesignationName').val('');
    $('#txtId').val('');
}

// new style of code by mk
function AddData() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#txtDesignationName').val() == '') {
        alertify.error("Please Enter Designation Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrDesignationMasterNew.aspx/CheckDataAvailability',
            data: JSON.stringify({ "strSearchName": $('#txtDesignationName').val(), "isUpdate": isUpdate, "id": $('#txtId').val().trim() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrDesignationMasterNew.aspx/AddData',
                        data: JSON.stringify({
                            "DesignationName": $('#txtDesignationName').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "Id": $('#txtId').val().trim()

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
                alertify.success("Designation Name updated successfully");
            }
            else {
                alertify.success("Designation Name added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}