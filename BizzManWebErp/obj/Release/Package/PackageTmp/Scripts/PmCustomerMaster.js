$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindStateDetails();
    BindHRBranchMasterDetails();
});

function BindHRBranchMasterDetails() {
    
    $.ajax({
        type: "POST",
        url: 'wfPmCustomerMaster.aspx/FetchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPmCustomerMasterList').DataTable().clear();
            $('#tblPmCustomerMasterList').DataTable().destroy();
            $('#tbody_PmCustomerMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchPmCustomerMasterDetails(\'' + data[i].UserId + '\' ,\'' + data[i].FullName + '\')">'
                    + '<td> ' + data[i].UserId + '</td > '
                    + '<td> ' + data[i].FullName + '</td > '
                    //+ '<td> ' + data[i].Password + '</td > '
                    + '<td> ' + data[i].PhoneNo + '</td > '
                    + '<td> ' + data[i].Address + '</td > '
                    + '<td> ' + data[i].StateName + '</td > '
                    + '<td> ' + data[i].City + '</td > '
                    + '<td>' +  data[i].Pincode + '</td>'
            }
            $('#tbody_PmCustomerMaster_List').html(html);
            $('#tblPmCustomerMasterList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindStateDetails() {
    $.ajax({
        type: "POST",
        url: 'wfPmCustomerMaster.aspx/StateList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].StateId + "'>" + JSON.parse(response.d)[i].StateName + "</option>";
            }
            $('#ddlState').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchPmCustomerMasterDetails(userId, fullName) {
    debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmCustomerMaster.aspx/FetchPmCustomerMasterDetails',
        data: JSON.stringify({
            "userId": userId,
            'fullName': fullName
        }),
        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

            
        },
        success: function (response) {
            
            var data = JSON.parse(response.d);
            ClearAll();
            $('#divPmCustomerMasterList').hide();
            $('#divPmCustomerMasterEntry').show();
            $("#btnSave").html('Update');
            $('#txtUserId,#txtFullName').attr("readonly", "readonly");
            $("#btnSave").show();


            $('#txtUserId').val(data[0].UserId);
            $('#txtFullName').val(data[0].FullName);
            $('#txtAddress').val(data[0].Address);
            $('#txtPhoneNo').val(data[0].PhoneNo);
            $('#txtPincode').val(data[0].Pincode);
            $('#ddlState').val(data[0].StateId);
            $('#txtPassword').val(data[0].Password);
            $('#txtCity').val(data[0].City);

           // $('#chkActive').prop('checked', data[0].Active === "Y");

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function ViewPMCustomerMasterList() {
    $('#divPmCustomerMasterList').show();
    $('#divPmCustomerMasterEntry').hide();
    $('#btnSave').hide();
    BindPMBranchMasterDetails();
}


function ClearAll() {
    $('#txtUserId,#txtFullName,#txtPhoneNo,#txtPassword,#txtAddress,#ddlState,#txtCity,#txtPincode').val('');
   // $('#chkActive').prop('checked', false);

}

function CreatePMCustomerMasterList() {
    $('#divPmCustomerMasterList').hide();
    $('#divPmCustomerMasterEntry').show();
    $('#txtUserId,#txtFullName').removeAttr("readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function AddPMCustomerMasterDetails() {
    debugger;
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtUserId').val() == '') {
        alertify.error("Please Enter User Id");
        isValid = false;
    }
    else if ($('#txtFullName').val() == '') {
        alertify.error("Please Enter Full Name");
        isValid = false;
    }
    else if ($('#txtPassword').val() == '') {
        alertify.error("Please Enter Password");
        isValid = false;
    }
    else if ($('#txtPhoneNo').val() == '') {
        alertify.error("Please Enter Phone Number");
        isValid = false;
    }
    if (isValid) {
        
        $.ajax({
            type: "POST",
           url: 'wfPmCustomerMaster.aspx/CheckUserAvailability',
            //url: 'wfHrBranchMasterNew.aspx/CheckBranchAvailability',

            data: JSON.stringify({ "userId": $('#txtUserId').val(),'fullName':$('#txtFullName').val(), "isUpdate": isUpdate }),
            //data: JSON.stringify({ "branchCode": $('#txtBranchCode').val(), 'branchName': $('#txtBranchName').val(), "isUpdate": isUpdate }),

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);

                if (data == 'False') {
                   
                        $.ajax({
                            type: "POST",
                            url: 'wfPmCustomerMaster.aspx/AddPMCustomerMasterDetails',
                            data: JSON.stringify({
                                "userId": $('#txtUserId').val().trim(),
                                "fullName": $('#txtFullName').val().trim(),
                                "phoneNo": $('#txtPhoneNo').val().trim(),
                                "password": $('#txtPassword').val().trim(),
                                "address": $('#txtAddress').val().trim(),
                                "stateId": $('#ddlState').val().trim(),
                                "city": $('#txtCity').val().trim(),
                                "pincode": $('#txtPincode').val().trim(),

                                //"active": $('#chkActive').prop('checked') === true ? "Y" : "N",
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
                alertify.success("Customer Master updated successfully");
            }
            else {
                alertify.success("Customer Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}