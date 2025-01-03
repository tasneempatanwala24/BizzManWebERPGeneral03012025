$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindEmpCategoryMasterList();
});

function CreateEmpCategory() {
    $('#DivEmpCategoryList').hide();
    $('#DivEmpCategoryEntry').show();
    $('#txtId').attr("disabled", true);
    $("#btnsave").html('Save');
    $('#btnsave').show();
    ClearAll();
}

function ClearAll() {
    $('#txtId').val('');
    $('#txtcategoryname').val('');
}

function ViewEmpCategoryList() {
    $('#DivEmpCategoryList').show();
    $('#DivEmpCategoryEntry').hide();
    $('#btnsave').hide();
    BindEmpCategoryMasterList();
}

function AddEmpCategoryMaster() {
    var IsUpdate = 0;
    if ($('#btnsave').html() == 'Update') {
        IsUpdate = 1;
    }
    if ($('#txtcategoryname').val() != '') {

        $.ajax({
            type: "POST",
            url: 'wfHrEmpJobCategoryMaster.aspx/CheckCategoryNameAvailability',
            data: JSON.stringify({ "Name": $('#txtcategoryname').val(), "IsUpdate": IsUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {

                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpJobCategoryMaster.aspx/AddEmpCategoryMaster',
                        data: JSON.stringify({
                            "Id": $('#txtId').val(),
                            "JobCategoryName": $('#txtcategoryname').val(),
                            "CreateUser": $('#ContentPlaceHolder1_loginuser').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {
                        },
                        success: function (response) {
                            //UploadFiles();
                            // alertify.success('Category added successfully');
                            if ($('#btnsave').html() == 'Update') {
                                alertify.success("Employee Category updated successfully");
                            }
                            else {
                                alertify.success("Employee Category added successfully");
                                ClearAll();
                            }
                            ClearAll();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error("Current Category Name already available");
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {
            }
        });

    }
    else {
        alertify.error('Please Enter Category Name');
    }
}

function CheckCategoryNameAvailability() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobCategoryMaster.aspx/CheckCategoryNameAvailability',
        data: JSON.stringify({ "Name": $('#txtcategoryname').val().trim() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            return data;
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            return 'False';
        }
    });
}

function BindEmpCategoryMasterList() {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobCategoryMaster.aspx/FetchEmpCategoryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpCategoryList').DataTable().clear();
            $('#tblEmpCategoryList').DataTable().destroy();
            $('#tbodyEmpCategoryList').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].JobCategoryName + '</td>'
            }
            $('#tbodyEmpCategoryList').html(html);
            $('#tblEmpCategoryList').DataTable();

        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function FetchEmpCategoryDetails(name) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobCategoryMaster.aspx/FetchEmpCategoryDetails',
        data: JSON.stringify({
            "Name": name
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            ClearAll();
            $('#DivEmpCategoryList').hide();
            $('#DivEmpCategoryEntry').show();
            $("#btnsave").html('Update');
            $('#txtId').attr("readonly", "readonly");
            $("#btnsave").show();
            var data = JSON.parse(response.d);
            $('#txtId').val(data[0].Id);
            $('#txtcategoryname').val(data[0].JobCategoryName);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}