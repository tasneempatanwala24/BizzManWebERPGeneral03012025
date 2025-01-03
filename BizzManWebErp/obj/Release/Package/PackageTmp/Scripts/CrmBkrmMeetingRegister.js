$(document).ready(function () {
    debugger;
    $("button").click(function (event) {
        event.preventDefault();
    });
    $("#btntitle").html('MeetingRegister');
    $('#btnSave').hide();
     
    BindMeetingRegisterMaster();
    GenerateMeetingID();
    FetchCrmLeadEnquiryDetails($('#ContentPlaceHolder1_loginuser').val());


});
function GenerateMeetingID() {

    // Generate a random 4-digit number
    var randomFourDigits = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

    // Create the LeadId
    var meetingId = 'MEETID' + '-' + randomFourDigits;

    // Display the LeadId
    $('#txtMeetingId').val(meetingId);
}
function Title() {
    window.location = "wfCrmBkrmMeetingRegister.aspx";
}

function CreateCrmBkrmMeetingList() {

    $('#divLeadsEntry').show();
    $('#divLeadsEntryList').show();
    $('#divMeetingRegisterList').hide();
    $('#divMeetingregister').hide();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    ClearAll();
}


function AddCrmBkrmMeetingDetails() {
    
    if ($('#ddlSample').val() == '0') {
        alertify.error('Enter Sample details Yes/No');
        return;
    }
    else if ($('#txtFeedback').val() == '') {
        alertify.error('please enter the Feedback');
        return;

    }
    if ($('#ddlCatalogue').val() == '0') {
        alertify.error('Select Catalogue Yes/No');
        return;
    }
    else if ($('#txtMeetingDate').val() == '') {
        alertify.error('please enter the Meeting Date');
        return;

    }
    else if ($('#txtDate').val() == '') {
        alertify.error('please enter date');
        return;
    }
   
    else if ($('#txtSalesPersonName').val() == '') {
        alertify.error('please enter the Sales Person Name');
        return;
    }
    if ($('#ddlVisitingID').val() == '0') {
        alertify.error('Is VisitingCard Available Yes/No');
        return;
    }
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmMeetingRegister.aspx/AddMeetingDetails',
        data: JSON.stringify({
            "meetingId": $('#txtMeetingId').val().trim(),
            "enquiryId": $('#txtEnquiryId').val().trim(),
            "clientName": $('#txtClientName').val().trim(),
            "contactNo": $('#txtContactNo').val().trim(),
            "requirements": $('#txtRequirements').val().trim(),
            "sampleDetails": $('#ddlSample').val().trim(),
            "feedback": $('#txtFeedback').val(),
            "catalogue": $('#ddlCatalogue').val(),
            "designation": $('#txtDesignation').val().trim(),
            "meetingDate": $('#txtMeetingDate').val().trim(),
            "date": $('#txtDate').val().trim(),
            "salesPersonName": $('#txtSalesPersonName').val().trim(),
            "visitingId": $('#ddlVisitingID').val().trim(),
            "note": $('#txtNote').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Meeting Register Details added successfully' : 'Meeting Register Details updated successfully';
            alertify.success(message);
            ClearAll();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ClearAll() {
    $('#txtEnquiryId').val('');
    $('#txtClientName').val('');
    $('#txtRequirements').val('');
    $('#ddlSample').val('0');
    $('#txtContactNo').val('');
    $('#ddlCatalogue').val('0');
    $('#txtNote').val('');
    $('#txtDate').val('');
    $('#ddlVisitingID').val('0');
    $('#txtDesignation').val('');
    $('#txtMeetingDate').val('');
    $('#txtFeedback').val('');
    $('#txtCompanyName').val('');
    $('#ddlAssign').val('0');
    $('#txtSalesPersonName').val('');
    GenerateMeetingID();

}

function ViewMeetingDetails()
{ 
    $('#divMeetingRegisterList').show();
    $('#divMeetingregister').hide();
    $('#divLeadsEntry').hide();
    $('#divLeadsEntryList').hide();
    Discard();
    BindMeetingRegisterMaster();
  
}

function Discard() {

    $("#btntitle").html('MeetingRegister');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    
}

function FetchCrmLeadEnquiryDetails(userId) {
     
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmMeetingRegister.aspx/FetchCrmLeadEnquiryDetails',
        data: JSON.stringify({
            "userId": userId
        }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {


        },
        success: function (response) {

            var data = JSON.parse(response.d);
            //ClearAll();
            $('#divLeadsEntryList').hide();
            $("#btnSave").html('Save');
            //$('#txtClientName,#txtRequirements', 'txtContactNo', 'txtDesignation', 'txtNote').attr("readonly", "readonly", "readonly", "readonly", "readonly");
            
            $('#txtEmpID').val(data[0].EmpId);
            $('#txtName').val(data[0].EmpName);
            
            BindRegisterGridMaster($('#txtName').val());

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchPmAssignLeadActivityDetails(EnquiryId) {
   
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmMeetingRegister.aspx/FetchPmAssignLeadActivityDetails',
        data: JSON.stringify({
            "EnquiryId": EnquiryId
        }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {


        },
        success: function (response) {

            var data = JSON.parse(response.d);
            ClearAll();
            //$('#divList').hide();
            //$('#divPmCustomerMasterEntry').show();
            //$("#btnSave").html('Update');
            //$('#txtUserId,#txtFullName').attr("readonly", "readonly");
            $('#divLeadsEntry').hide();
            $('#divLeadsEntryList').hide();
            $('#divMeetingregister').show();

            $("#btnSave").show();


            $('#txtEnquiryId').val(data[0].EnquiryId);
            $('#txtClientName').val(data[0].CustomerName);
            $('#txtRequirements').val(data[0].Requirements);
            $('#txtContactNo').val(data[0].ContactNo);
            $('#txtDesignation').val(data[0].Designation);
            $('#txtNote').val(data[0].Note);

           

            // $('#chkActive').prop('checked', data[0].Active === "Y");

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindRegisterGridMaster(empName) {
    
    var empName = $("#txtName").val();

    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmMeetingRegister.aspx/BindRegisterGridMaster',
        data: JSON.stringify({
            empName: empName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblLeadEntrylist').DataTable().clear();
            $('#tblLeadEntrylist').DataTable().destroy();
            $('#tbody_leadsentry_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html
                    + '<tr><td style="white-space: nowrap;">' + (data[i].CustomerName == undefined ? '' : data[i].CustomerName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].EnquiryId == undefined ? '' : data[i].EnquiryId) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Date == undefined ? '' : data[i].Date) + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchPmAssignLeadActivityDetails(\'' + data[i].EnquiryId + '\')">' + "See Details" + '</td></tr>'
                //   + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td></tr>';


            }
            $('#tbody_leadsentry_list').html(html);
            $('#tblLeadEntrylist').DataTable();


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindMeetingRegisterMaster() {
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmMeetingRegister.aspx/BindMeetingRegisterMaster',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMeetingRegisterlist').DataTable().clear();
            $('#tblMeetingRegisterlist').DataTable().destroy();
            $('#tbody_Meetingregister_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].MeetingId + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].EnquiryId == undefined ? '' : data[i].EnquiryId) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ClientName == undefined ? '' : data[i].ClientName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ContactNo == undefined ? '' : data[i].ContactNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Requirements == undefined ? '' : data[i].Requirements) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].SampleDetails == undefined ? '' : data[i].SampleDetails) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Date == undefined ? '' : data[i].Date) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Feedback == undefined ? '' : data[i].Feedback) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Catalogue == undefined ? '' : data[i].Catalogue) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Designation == undefined ? '' : data[i].Designation) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].MeetingDate == undefined ? '' : data[i].MeetingDate) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].SalesPersonName == undefined ? '' : data[i].SalesPersonName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].VisitingId == undefined ? '' : data[i].VisitingId) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Note == undefined ? '' : data[i].Note) + '</td></tr>'
            }
            $('#tbody_Meetingregister_list').html(html);
            $('#tblMeetingRegisterlist').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
