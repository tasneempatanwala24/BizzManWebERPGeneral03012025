$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindCategoryList();
});



function BindCategoryList() {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/FetchCategoryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblCategoryList').DataTable().clear();
            $('#tblCategoryList').DataTable().destroy();
            $('#tbody_Category_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmployeeDetails(\'' + data[i].Name + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].Name + '</td>'
                    + '<td>' + data[i].Description + '</td>'
            }
            $('#tbody_Category_List').html(html);
            $('#tblCategoryList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ViewCategoryList() {
    $('#divCategoryList').show();
    $('#divCategoryEntry').hide();
    $('#btnSave').hide();
    BindCategoryList();
}


function ClearAll() {
    $('#txtCategoryName').val('');
    $('#txtDescription').val('');
}

function CreateCategory() {
    $('#divCategoryList').hide();
    $('#divCategoryEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function CheckCategoryNameAvailability() {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/CheckCategoryNameAvailability',
        data: JSON.stringify({ "Name": $('#txtCategoryName').val().trim() }),
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

function AddCategory() {


    if ($('#txtCategoryName').val() != '') {

        $.ajax({
            type: "POST",
            url: 'wfMmCategoryMaster.aspx/AddCategory',
            data: JSON.stringify({
                "Name": $('#txtCategoryName').val(),
                "Description": $('#txtDescription').val()
                
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                UploadFiles();
               // alertify.success('Category added successfully');
                //ClearAll();

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


function FetchEmployeeDetails(name) {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/FetchEmployeeDetails',
        data: JSON.stringify({
            "Name": name
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divCategoryList').hide();
            $('#divCategoryEntry').show();
            $("#btnSave").html('Update');
            $("#btnSave").show();
            



            var data = JSON.parse(response.d);
            $('#txtCategoryName').val(data[0].Name);
            $('#txtDescription').val(data[0].Description);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

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
                alertify.success("Category updated successfully");
            }
            else {
                alertify.success("Category added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}
