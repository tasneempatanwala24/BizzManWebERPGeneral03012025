$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindWarehouseList();
});


function ViewWarehouseList() {
    $('#divWarehouseList').show();
    $('#divWarehouseEntry').hide();
    $('#btnSave').hide();
    BindWarehouseList();
}


function ClearAll() {
    $('#ddlCategory').val('');
    $('#txtName').val('');
    $('#txtDescription').val('');
    $('#txtAddress').val('');
}

function CreateWarehouse() {
    $('#divWarehouseList').hide();
    $('#divWarehouseEntry').show();
    $('#txtName').removeAttr("readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function BindWarehouseList() {
    $.ajax({
        type: "POST",
        url: 'wfFaWarehouseMaster.aspx/FetchWarehouseList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblWarehouseList').DataTable().clear();
            $('#tblWarehouseList').DataTable().destroy();
            $('#tbody_Warehouse_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchWarehouseDetails(\'' + data[i].Name + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].Category + '</td>'
                    + '<td>' + data[i].Name + '</td>'
                    + '<td>' + data[i].Address + '</td>'  
                    + '<td>' + data[i].Description + '</td>'
            }
            $('#tbody_Warehouse_List').html(html);
            $('#tblWarehouseList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchWarehouseDetails(name) {
    $.ajax({
        type: "POST",
        url: 'wfFaWarehouseMaster.aspx/FetchWarehouseDetails',
        data: JSON.stringify({
            "Name": name
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divWarehouseList').hide();
            $('#divWarehouseEntry').show();
            $("#btnSave").html('Update');
            $('#txtName').attr("readonly", "readonly");
            $("#btnSave").show();




            var data = JSON.parse(response.d);
            $('#ddlCategory').val(data[0].Category);
            $('#txtName').val(data[0].Name);
            $('#txtAddress').val(data[0].Address);
            $('#txtDescription').val(data[0].Description);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function AddWarehouse() {

    var IsUpdate = 0;
    if ($('#btnSave').html() == 'Update') {
        IsUpdate = 1;
    }

    if ($('#txtName').val() != '') {
        if ($('#ddlCategory').val() != '') {
            $.ajax({
                type: "POST",
                url: 'wfFaWarehouseMaster.aspx/CheckNameAvailability',
                data: JSON.stringify({ "Name": $('#txtName').val(), "IsUpdate": IsUpdate }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = JSON.parse(response.d);
                    if (data == 'False') {
                        if ($('#txtAddress').val() != '') {
                            $.ajax({
                                type: "POST",
                                url: 'wfFaWarehouseMaster.aspx/AddWarehouse',
                                data: JSON.stringify({
                                    "Category": $('#ddlCategory').val(),
                                    "Name": $('#txtName').val(),
                                    "Address": $('#txtAddress').val(),
                                    "Description": $('#txtDescription').val(),
                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val()

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
                            alertify.error("Please Enter Address");
                        }
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
        else {
             alertify.error("Please Select Category");
        }
                
    }
    else {
            alertify.error('Please Enter Name');
    }
}

function CheckNameAvailability() {
    $.ajax({
        type: "POST",
        url: 'wfFaWarehouseMaster.aspx/CheckNameAvailability',
        data: JSON.stringify({ "Name": $('#txtName').val().trim() }),
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
                alertify.success("Warehouse updated successfully");
            }
            else {
                alertify.success("Warehouse added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}
