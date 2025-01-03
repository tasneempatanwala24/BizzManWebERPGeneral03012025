$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindMasterList();
});

function BindMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMmUnitMesureMaster.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblUnitMesureList').DataTable().clear();
            $('#tblUnitMesureList').DataTable().destroy();
            $('#tbody_UnitMesure_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchMasterDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].UnitMesureName + '</td></tr>';
            }
            $('#tbody_UnitMesure_List').html(html);
            $('#tblUnitMesureList').DataTable();

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
        url: 'wfMmUnitMesureMaster.aspx/FetchMasterDetails',
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
            //$('#txtUnitMesureName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();

            var data = JSON.parse(response.d);

            $('#txtUnitMesureName').val(data[0].UnitMesureName);
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

    $('#txtUnitMesureName').removeAttr("readonly");
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
    $('#txtUnitMesureName').val('');
    $('#txtId').val('');
}

// new style of code by mk
function AddData() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#txtUnitMesureName').val() == '') {
        alertify.error("Please Enter UnitMesure Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfMmUnitMesureMaster.aspx/CheckDataAvailability',
            data: JSON.stringify({ "strSearchName": $('#txtUnitMesureName').val(), "isUpdate": isUpdate, "id": $('#txtId').val().trim() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfMmUnitMesureMaster.aspx/AddData',
                        data: JSON.stringify({
                            "UnitMesureName": $('#txtUnitMesureName').val().trim(),
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
                alertify.success("UnitMesure Name updated successfully");
            }
            else {
                alertify.success("UnitMesure Name added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}