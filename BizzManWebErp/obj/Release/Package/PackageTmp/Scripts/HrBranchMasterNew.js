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
        url: 'wfHrBranchMasterNew.aspx/FetchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblHrBranchMasterList').DataTable().clear();
            $('#tblHrBranchMasterList').DataTable().destroy();
            $('#tbody_HrBranchMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchHrMasterDetails(\'' + data[i].BranchCode + '\' ,\'' + data[i].BranchName+'\')">'
                    + '<td> ' + data[i].BranchCode + '</td > '
                    + '<td> ' + data[i].BranchName + '</td > '
                    + '<td> ' + data[i].BranchAddress + '</td > '
                    + '<td> ' + data[i].ContactNo + '</td > '
                    + '<td> ' + data[i].Email + '</td > '
                    + '<td> ' + data[i].StateName + '</td > '
                    + '<td>'  + data[i].Active + '</td>'
            }
            $('#tbody_HrBranchMaster_List').html(html);
            $('#tblHrBranchMasterList').DataTable();

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
        url: 'wfHrBranchMasterNew.aspx/StateList',
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

function FetchHrMasterDetails(branchCode,branchName) {
    $.ajax({
        type: "POST",
        url: 'wfHrBranchMasterNew.aspx/FetchHrMasterDetails',
        data: JSON.stringify({
            "branchCode": branchCode,
            'branchName': branchName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            ClearAll();
            $('#divHrBranchMasterList').hide();
            $('#divHrBranchMasterEntry').show();
            $("#btnSave").html('Update');
            $('#txtBranchCode,#txtBranchName').attr("readonly", "readonly");
            $("#btnSave").show();


            $('#txtBranchCode').val(data[0].BranchCode);
            $('#txtBranchName').val(data[0].BranchName);
            $('#txtBranchAddress').val(data[0].BranchAddress);
            $('#txtContactNo').val(data[0].ContactNo);
            $('#txtEmail').val(data[0].Email);
            $('#ddlState').val(data[0].StateId);
            $('#chkActive').prop('checked', data[0].Active === "Y");

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function ViewHRBranchMasterList() {
    $('#divHrBranchMasterList').show();
    $('#divHrBranchMasterEntry').hide();
    $('#btnSave').hide();
    BindHRBranchMasterDetails();
}


function ClearAll() {
    $('#txtBranchCode,#txtBranchName,#txtBranchAddress,#txtContactNo,#txtEmail,#ddlState').val('');
    $('#chkActive').prop('checked', false);

}

function CreateHRBranchMasterList() {
    $('#divHrBranchMasterList').hide();
    $('#divHrBranchMasterEntry').show();
    $('#txtBranchCode,#txtBranchName').removeAttr("readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtBranchCode').val() == '') {
        alertify.error("Please Enter Branch Code");
        isValid = false;
    }
    else if ($('#txtBranchName').val() == '') {
        alertify.error("Please Enter Branch Name");
        isValid = false;
    }
    else if ($('#txtBranchAddress').val() == '') {
        alertify.error("Please Enter Branch Address");
        isValid = false;
    }
    else if ($('#ddlState').val() == '') {
        alertify.error("Please Enter State Name");
        isValid = false;
    }
    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrBranchMasterNew.aspx/CheckBranchAvailability',
            data: JSON.stringify({ "branchCode": $('#txtBranchCode').val(),'branchName':$('#txtBranchName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                        $.ajax({
                            type: "POST",
                            url: 'wfHrBranchMasterNew.aspx/AddDetails',
                            data: JSON.stringify({
                                "branchCode": $('#txtBranchCode').val().trim(),
                                "branchName": $('#txtBranchName').val().trim(),
                                "branchAddress": $('#txtBranchAddress').val().trim(),
                                "contactNo": $('#txtContactNo').val().trim(),
                                "email": $('#txtEmail').val().trim(),
                                'stateId': $('#ddlState').val().trim(),
                                "active": $('#chkActive').prop('checked') === true ? "Y" : "N",
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
                    alertify.error("Current Branch Details already available");
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
                alertify.success("Branch Master updated successfully");
            }
            else {
                alertify.success("Branch Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}