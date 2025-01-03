$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindClientDetails();
    BindSiteVisitMasterDetails();
});

function BindClientDetails() {
    //debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmSiteVisit.aspx/ClientList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var client = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                client = client + "<option value='" + JSON.parse(response.d)[i].CustomerName + "'>" + JSON.parse(response.d)[i].CustomerName + "</option>";
            }
            $('#ddlClient').append(client);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindSiteVisitMasterDetails() {
    debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmSiteVisit.aspx/FetchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPmSiteVisitList').DataTable().clear();
            $('#tblPmSiteVisitList').DataTable().destroy();
            $('#tbody_PmSiteVisit_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchPmSiteVisitDetails(\'' + data[i].VisitId + '\' ,\'' + data[i].SiteAddress + '\')">'
                    + '<td> ' + data[i].VisitId + '</td > '
                    + '<td> ' + data[i].ClientId + '</td > '
                    //+ '<td> ' + data[i].Password + '</td > '
                    + '<td> ' + data[i].DateOfVisit + '</td > '
                    + '<td> ' + data[i].Project + '</td > '
                    + '<td> ' + data[i].SiteVisit + '</td > '
                    + '<td> ' + data[i].ConductedBy + '</td > '
                    + '<td>' + data[i].SiteCondition + '</td>'
            }
            $('#tbody_PmSiteVisit_List').html(html);
            $('#tblPmSiteVisitList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}




function FetchPmSiteVisitDetails(userId, fullName) {
    //debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmSiteVisit.aspx/FetchPmSiteVisitDetails',
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
            $('#divPmSiteVisitList').hide();
            $('#divPmSiteVisitEntry').show();
            $("#btnSave").html('Update');
            $('#txtSiteVisitId,#txtFullName').attr("readonly", "readonly");
            $("#btnSave").show();


            $('#txtSiteVisitId').val(data[0].UserId);
            $('#txtFullName').val(data[0].FullName);
            $('#txtSiteAddress').val(data[0].Address);
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


function ViewPMSiteVisitList() {
    $('#divPmSiteVisitList').show();
    $('#divPmSiteVisitEntry').hide();
    $('#btnSave').hide();
    BindSiteVisitMasterDetails();
}


function ClearAll() {
    $('#txtSiteVisitId,#txtDateOfVisit,#txtProject,#txtSiteVisit,#txtConducted,#ddlClient,#txtSiteAddress,#txtCondition,txtIncharge,txtSign').val('');
    // $('#chkActive').prop('checked', false);

}

function CreatePMSiteVisitList() {
    $('#divPmSiteVisitList').hide();
    $('#divPmSiteVisitEntry').show();
    $('#txtSiteVisitId,#txtFullName').removeAttr("readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function AddPMSiteVisitDetails() {
   // debugger;
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtSiteVisitId').val() == '') {
        alertify.error("Please Enter Visit Id");
        isValid = false;
    }
    else if ($('#txtSiteAddress').val() == '') {
        alertify.error("Please Enter Full Site Address");
        isValid = false;
    }
    
    if (isValid) {

        //$.ajax({
        //    type: "POST",
        //    url: 'wfPmSiteVisit.aspx/CheckUserAvailability',
        //    //url: 'wfHrBranchMasterNew.aspx/CheckBranchAvailability',

        //    data: JSON.stringify({ "userId": $('#txtVisitId').val(), 'fullName': $('#txtSiteVisitAddress').val(), "isUpdate": isUpdate }),
        //    //data: JSON.stringify({ "branchCode": $('#txtBranchCode').val(), 'branchName': $('#txtBranchName').val(), "isUpdate": isUpdate }),

        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    beforeSend: function () {

        //    },
        //    success: function (response) {
        //        var data = JSON.parse(response.d);

        //        if (data == 'False') {

        $.ajax({
            type: "POST",
            url: 'wfPmSiteVisit.aspx/AddPMSiteVisitDetails',
            data: JSON.stringify({
                "visitId": $('#txtSiteVisitId').val().trim(),
                "dateOfVisit": $('#txtDateOfVisit').val().trim(),
                "siteVisit": $('#txtSiteVisit').val().trim(),
                "conducted": $('#txtConducted').val().trim(),
                "siteAddress": $('#txtSiteAddress').val().trim(),
                "createdDate": $('#txtCreatedDate').val().trim(),
                "project": $('#txtProject').val().trim(),
                "condition": $('#txtCondition').val().trim(),
                "assignedClient": $('#ddlClient').val().trim(),

                //"active": $('#chkActive').prop('checked') === true ? "Y" : "N",
                "loginUser": $('#ContentPlaceHolder1_loginuser').val()

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                UploadFiles();
                ClearAll();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
                //else {
                //    alertify.error("Current Site Visit Details already available");
                //}
           // },
            //complete: function () {

            //},
            //failure: function (jqXHR, textStatus, errorThrown) {

            //}
        //});
    
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
                alertify.success("Site Visit Master updated successfully");
            }
            else {
                alertify.success("Site Visit Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}