$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindCustomerList();
    $('#createDiv').hide();


});

function ViewCustomerList() {
    
    $('#DivCustomerList').show();
    $('#createDiv').hide();
    $("#btnsave").hide();
    BindCustomerList();

}

function BindCustomerList() {
    
    $.ajax({
        type: "POST",
        url: 'wfPosCustomer.aspx/FetchCustomerList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#tblCustomerList').DataTable().clear();
            $('#tblCustomerList').DataTable().destroy();
            $('#tbodycustomerList').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchCustomerDetails(\'' + data[i].CustomerId + '\')"><td>' + data[i].CustomerId + '</td>'
                    + '<td>' + (data[i].CustomerName != undefined ? data[i].CustomerName : '') + '</td>'
                    + '<td>' + (data[i].Street != undefined ? data[i].Street : '') + '</td>'
                    + '<td>' + (data[i].Phone != undefined ? data[i].Phone : '') + '</td>'
                    + '<td>' + (data[i].Email != undefined ? data[i].Email : '') + '</td></tr>';
            }
            $('#tbodycustomerList').html(html);
            $('#tblCustomerList').DataTable();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });

}

function FetchCustomerDetails(CustomerId) {

    $.ajax({
        type: "POST",
        url: 'wfPosCustomer.aspx/FetchCustomerDetails',
        data: JSON.stringify({
            "CustomerId": CustomerId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#DivCustomerList').hide();
            $('#createDiv').show();
            $("#btnsave").show();
            $("#btnsave").html('Update');

            $('#txtCustomerId').attr("readonly", "readonly");
            //$('#lblEmployee').text('Update');
            var data = JSON.parse(response.d);
            $('#txtCustomerId').val(data[0].CustomerId);
            $('#txtCustomerName').val(data[0].CustomerName);
            $('#txtStreet').val(data[0].Street);
            $('#txtcity').val(data[0].City);
            $('#txtpostcode').val(data[0].Postcode);
            $('#ddlstate').val(data[0].State);
            $('#ddlcountry').val(data[0].Country);
            $('#ddllanguage').val(data[0].Language);
            $('#txtemail').val(data[0].Email);
            $('#txtphone').val(data[0].Phone);
            $('#txtbarcode').val(data[0].Barcode);
            $('#txttaxId').val(data[0].Tax_ID);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function CreateCustomer() {
    ClearAll();
    $('#createDiv').show();
    $('#DivCustomerList').hide();
    $("#btnsave").html('Save');
    $("#btnsave").show();
    $('#txtCustomerId').removeAttr("readonly");

}

function AddCustomer() {
    
    var IsUpdate = 0;
    if ($('#btnsave').html() == 'Update') {
        IsUpdate = 1;
    }
    if ($('#txtCustomerName').val().trim() != '') {
        
        $.ajax({
            type: "POST",
            url: 'wfPosCustomer.aspx/CheckCustomerNameAvailability',
            data: JSON.stringify({ "CustomerName": $('#txtCustomerName').val(), "IsUpdate": IsUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response1) {
                var data1 = JSON.parse(response1.d);
                if (data1 == 'False') {

                    if ($('#txtphone').val().trim() != '') {
                        if ($('#txtStreet').val().trim() != '') {
                            if ($('#txtpostcode').val().trim() != '') {
                                if ($('#txtemail').val().trim() != '') {
                                    
                                    $.ajax({

                                        type: "POST",
                                        url: 'wfPosCustomer.aspx/SaveUpdateCustomerDetails',
                                        data: JSON.stringify({

                                            "CustomerId": $('#txtCustomerId').val().trim(),
                                            "CustomerName": $('#txtCustomerName').val().trim(),
                                            "Street": $('#txtStreet').val().trim(),
                                            "City": $('#txtcity').val().trim(),
                                            "Postcode": $('#txtpostcode').val().trim(),
                                            "State": $('#ddlstate').val().trim(),
                                            "Country": $('#ddlcountry').val().trim(),
                                            "Language": $('#ddllanguage').val().trim(),
                                            "Email": $('#txtemail').val().trim(),
                                            "Phone": $('#txtphone').val().trim(),
                                            "Barcode": $('#txtbarcode').val().trim(),
                                            "Tax_ID": $('#txttaxId').val().trim(),
                                            "CreateUser": $('#ContentPlaceHolder1_loginuser').val()

                                        }),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        beforeSend: function () {

                                        },
                                        success: function (response) {
                                            if ($('#btnsave').html() == 'Update') {
                                                alertify.success("Customer details updated successfully");
                                            }
                                            else {
                                                alertify.success("Customer added successfully");
                                                ClearAll();
                                            }
                                        },
                                        complete: function () {

                                        },
                                        failure: function (jqXHR, textStatus, errorThrown) {
                                        }
                                    });
                                }
                                else {
                                    alertify.error("Please enter Email.");
                                }
                            }
                            else {
                                alertify.error("Please Enter Post Code");
                            }
                        }
                        else {
                            alertify.error("Please Enter Street");
                        }
                    }
                    else {
                        alertify.error("Please Enter Phone Number");
                    }
                }
                else {
                    alertify.error("Customer Name already available");
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });

    }
    else {
        alertify.error("Please Enter Customer Name.");
    }
}

function CheckCustomerNameAvailability() {
    $.ajax({
        type: "POST",
        url: 'wfPosCustomer.aspx/CheckCustomerNameAvailability',
        data: JSON.stringify({ "CustomerName": $('#txtCustomerName').val().trim() }),
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

function ClearAll() {
    $('#txtCustomerId').val('');
    $('#txtCustomerName').val('');
    $('#txtStreet').val('');
    $('#txtcity').val('');
    $('#txtpostcode').val('');
    $('#ddlstate').val('');
    $('#ddlcountry').val('');
    $('#ddllanguage').val('');
    $('#txtemail').val('');
    $('#txtphone').val('');
    $('#txttaxId').val('');
    $('#txtbarcode').val('');
}

function ValidateNumber(event) {
    var regex = new RegExp("^[0-9]*$");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}


function Discard() {
    window.location = "wfPosProductCalculation.aspx";
}