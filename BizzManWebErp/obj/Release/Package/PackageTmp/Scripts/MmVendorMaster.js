$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindVendorList();

});


function CreateVendor() {
    $('#divVendorList').hide();
    $('#divVendorEntry').show();
    $('#txtName').removeAttr("readonly");
    $('#btnSave').show();
    $("#btnSave").html('Save');
    ClearAll();
}

function ViewVendorList() {
    $('#example-select-all').prop('checked', false);
    $('#divVendorList').show();
    $('#divVendorEntry').hide();
    $('#btnSave').hide();
    BindVendorList();
}


function ClearAll() {
    $('#txtPhone').val('');
    $('#txtEmail').val('');
    $('#txtDescription').val('');
    $('#ddlCategory').val('');
    $('#txtName').val('');
    $('#txtAddress').val('');
    $('#txtGst').val('');
}


function BindVendorList() {
    $.ajax({
        type: "POST",
        url: 'wfMmVendorMaster.aspx/FetchVendorList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblVendorList').DataTable().clear();
            $('#tblVendorList').DataTable().destroy();
            $('#tbody_Vendor_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr onclick="FetchVendorDetails(\'' + data[i].VendorName + '\')"><td><input type="checkbox" class="editor-active" value="' + data[i].Id + '"></td>'
                    + '<td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].Category + '</td>'
                    + '<td>' + data[i].VendorName + '</td>'
                    + '<td>' + data[i].VendorAddress + '</td>'
                    + '<td>' + data[i].GST_No + '</td>'
                    + '<td>' + data[i].EmailAddress + '</td>'
                    + '<td>' + data[i].PhoneNo + '</td>'
                    + '<td>' + data[i].Description + '</td></tr>';
            }
            $('#tbody_Vendor_List').html(html);
            var d = new Date();
            var table = $('#tblVendorList').DataTable({
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                fixedHeader: {
                    header: true
                },
                dom: 'lfrtBip',
                buttons: [
                    {
                        "extend": "excel", "text": "Export To Excel",
                        title: "Vendor Details_" + d.toDateString()
                    }

                ]
            });

            $('#example-select-all').on('click', function () {
                // Check/uncheck all checkboxes in the table
                var rows = table.rows({ 'search': 'applied' }).nodes();
                $('input[type="checkbox"]', rows).prop('checked', this.checked);
            });

            $('#tblVendorList tbody').on('change', 'input[type="checkbox"]', function () {
                // If checkbox is not checked
                if (!this.checked) {
                    var el = $('#example-select-all').get(0);
                    // If "Select all" control is checked and has 'indeterminate' property
                    if (el && el.checked && ('indeterminate' in el)) {
                        // Set visual state of "Select all" control 
                        // as 'indeterminate'
                        el.indeterminate = true;
                    }
                }
            });

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function AddVendor() {

    var IsUpdate = 0;
    if ($('#btnSave').html() == 'Update') {
        IsUpdate = 1;
    }

    if ($('#txtName').val() != '') {
        if ($('#ddlCategory').val() != '') {
            $.ajax({
                type: "POST",
                url: 'wfMmVendorMaster.aspx/CheckNameAvailability',
                data: JSON.stringify({ "VendorName": $('#txtName').val(), "IsUpdate": IsUpdate }),
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
                                url: 'wfMmVendorMaster.aspx/AddVendor',
                                data: JSON.stringify({
                                    "Category": $('#ddlCategory').val(),
                                    "VendorName": $('#txtName').val(),
                                    "VendorAddress": $('#txtAddress').val(),
                                    "GST_No": $('#txtGst').val(),
                                    "EmailAddress": $('#txtEmail').val(),
                                    "PhoneNo": $('#txtPhone').val(),
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
        url: 'wfMmVendorMaster.aspx/CheckNameAvailability',
        data: JSON.stringify({ "VendorName": $('#txtName').val().trim() }),
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
                alertify.success("Vendor updated successfully");
            }
            else {
                alertify.success("Vendor added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}

function FetchVendorDetails(VendorName) {
    $.ajax({
        type: "POST",
        url: 'wfMmVendorMaster.aspx/FetchVendorDetails',
        data: JSON.stringify({
            "VendorName": VendorName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divVendorList').hide();
            $('#divVendorEntry').show();
            $("#btnSave").html('Update');
            $('#txtName').attr("readonly", "readonly");
            $("#btnSave").show();




            var data = JSON.parse(response.d);
            $('#ddlCategory').val(data[0].Category);
            $('#txtName').val(data[0].VendorName);
            $('#txtAddress').val(data[0].VendorAddress);
            $('#txtGst').val(data[0].GST_No);
            $('#txtEmail').val(data[0].EmailAddress);
            $('#txtPhone').val(data[0].PhoneNo);
            $('#txtDescription').val(data[0].Description);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}