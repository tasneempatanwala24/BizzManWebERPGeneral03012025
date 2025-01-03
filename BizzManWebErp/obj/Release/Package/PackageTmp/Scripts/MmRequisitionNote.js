var ddlBranch = "";
var ddlDept = "";
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindRequisitionNoteList();
    if (ddlBranch == "") {
        BindBranchDetails();
    }
    if (ddlDept == "") {
        BindDeptDetails();
    }
});

function BindRequisitionNoteList() {
    $.ajax({
        type: "POST",
        url: 'wfMmRequisitionNote.aspx/FetchRequisitionNoteList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblRequisitionNoteList').DataTable().clear();
            $('#tblRequisitionNoteList').DataTable().destroy();
            $('#tbody_RequisitionNote_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchRequisitionNoteDetails(\'' + data[i].RequisitionId + '\')"><td>' + data[i].RequisitionId + '</td>'
                    + '<td>' + (data[i].RequisitionDate != undefined ? data[i].RequisitionDate : '') + '</td>'
                    + '<td>' + data[i].RequisitionNote + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td>' + data[i].DeptName + '</td>'
                    + '<td>' + data[i].Active + '</td>'
                    + '<td>' + data[i].CreateUser + '</td></tr > '
            }
            $('#tbody_RequisitionNote_List').html(html);
            $('#tblRequisitionNoteList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchRequisitionNoteDetails(requisitionId) {
    $.ajax({
        type: "POST",
        url: 'wfMmRequisitionNote.aspx/FetchRequisitionNoteDetails',
        data: JSON.stringify({
            "requisitionId": requisitionId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divRequisitionNoteList').hide();
            $('#divRequisitionNoteEntry').show();
            $("#btnSave").html('Update');
            $('.trTxtId').show();
            $('#trCreatedBy').show();
            $('#txtId').attr("readonly", "readonly");
            
            $('#chkActive').prop("disabled", true);
            $("#btnSave").show();

            var data = JSON.parse(response.d);
            $('#txtId').val(data[0].RequisitionId);

            var dtReqDate = new Date(data[0].RequisitionDate);
            dtReqDate = new Date(dtReqDate.getTime() + Math.abs(dtReqDate.getTimezoneOffset() * 60000))
            document.getElementById("txtReqDate").valueAsDate = dtReqDate;
            $('#txtReqDate').attr("readonly", "readonly");

            $('#txtNote').val(data[0].RequisitionNote);
            $('#chkActive').prop('checked', data[0].Active === "Y");
            $("#ddlBranch").val(data[0].BranchCode);
            $("#ddlDept").val(data[0].DepartmentId);
            $("#txtCreatedBy").val(data[0].CreateUser);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function ViewRequisitionNoteList() {
    $('#divRequisitionNoteList').show();
    $('#divRequisitionNoteEntry').hide();
    $('#btnSave').hide();
    BindRequisitionNoteList();
}


function ClearAll() {
    $('#txtId,#txtReqDate,#txtNote,#ddlBranch,#ddlDept').val('');
    $('#chkActive').prop('checked', true);
} 

function CreateRequisitionNote() {
    $('#divRequisitionNoteList').hide();
    $('#divRequisitionNoteEntry').show();

    $('#txtId').attr("readonly", "readonly");
    $('#txtReqDate').removeAttr("readonly");
    $('#chkActive').prop("disabled", false);
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#trCreatedBy').hide();
    ClearAll();
}

function AddRequisitionNote() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtReqDate').val() == '') {
        alertify.error("Please Enter Requisition Date");
        isValid = false;
    }
    else if ($('#txtNote').val() == '') {
        alertify.error("Please Enter Requisition Note");
        isValid = false;
    }
    else if ($('#txtNote').val().trim().length > 500) {
        alertify.error("Max length for Requisition Note is 500");
        isValid = false;
    }
    else if ($('#ddlBranch').val() == '') {
        alertify.error("Please Enter Branch Details");
        isValid = false;
    }

    else if ($('#ddlDept').val() == '') {
        alertify.error("Please Enter Department Details");
        isValid = false;
    }
    if (isValid) {
        $.ajax({
                type: "POST",
                url: 'wfMmRequisitionNote.aspx/CheckRequisitionNoteAvailability',
                data: JSON.stringify({ "id": $('#txtId').val(), "isUpdate": isUpdate }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = JSON.parse(response.d);
                    if (data == 'False') {
                        if ($('#txtNote').val() != '') {
                            $.ajax({
                                type: "POST",
                                url: 'wfMmRequisitionNote.aspx/AddRequisitionNote',
                                data: JSON.stringify({
                                    "requisitionId": $('#txtId').val().trim(),
                                    "requisitionDate": $('#txtReqDate').val().trim(),
                                    "requisitionNote": $('#txtNote').val().trim(),
                                    "active": $('#chkActive').prop('checked') === true ? "Y" : "N",
                                    "branch": $('#ddlBranch').val().trim(),
                                    "dept": $('#ddlDept').val().trim(),
                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val()

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
                    }
                    else {
                        alertify.error("Current Id already available");
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
                alertify.success("Requisition Note  updated successfully");
            }
            else {
                alertify.success("Requisition Note added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}

function BindBranchDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmRequisitionNote.aspx/GetBranchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ddlBranch = ddlBranch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }

            $("#ddlBranch").append(ddlBranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindDeptDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmRequisitionNote.aspx/GetDeptDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ddlDept = ddlDept + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }

            $("#ddlDept").append(ddlDept);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}