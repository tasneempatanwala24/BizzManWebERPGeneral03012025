$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindLocationDropdown();
    $("#btntitle").html('LeadsEntry');
    BindLeadsEntryMaster();
    GenerateLeadsEntryID();
    // Get the current date and time
    var now = new Date();

    // Format the date and time as YYYY-MM-DD HH:mm:ss
    var formattedDateTime = now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, '0') + "-" +
        String(now.getDate()).padStart(2, '0') + " " +
        String(now.getHours()).padStart(2, '0') + ":" +
        String(now.getMinutes()).padStart(2, '0') + ":" +
        String(now.getSeconds()).padStart(2, '0');

    // Set the formatted date and time in the input field
    $("#txtDate").val(formattedDateTime);
   
});

function Title() {
    window.location = "wfCrmSunLeadsEntry.aspx";
}

function CreateCrmLeadsEntryList() {

    $('#divLeadsEntryList').hide();
    $('#divLeadsEntry').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#txtLeadID').removeAttr("readonly");
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    ClearAll();
}


function GenerateLeadsEntryID() {

        // Generate a random 4-digit number
        var randomFourDigits = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

        // Create the LeadId
    var leadId = 'LDID' + '-' + randomFourDigits;

        // Display the LeadId
        $('#txtLeadID').val(leadId);
    }

function AddCrmLeadsEntryDetails() {
    
    if ($('#txtName').val() == '') {
        alertify.error('Enter Customer Name');
        return;
    }
    else if ($('#ddlCategory').val() == '0') {
        alertify.error('Please select any Category');
        return;
    }

    else if ($('#ddlLocation').val() == '0') {
        alertify.error('Please select Location');
        return;
    }
    else if ($('#txtDate').val() == '') {
        alertify.error('please enter date');
        return;
    }
    else if ($('#txtContactNo').val() == '') {
        alertify.error('please enter the Contact No');
        return;
    }
    else if ($('#txtEmail').val() == '') {
        alertify.error('please enter the Email');
        return;
    }
    else if ($('#txtSource').val() == '') {
        alertify.error('please enter the Lead Source');
        return;
    }
    
    $.ajax({
        type: "POST",
        url: 'wfCrmSunLeadsEntry.aspx/AddLeadsEntryDetails',
        data: JSON.stringify({
            "leadId": $('#txtLeadID').val().trim(),
            "customerName": $('#txtName').val().trim(),
            "date": $('#txtDate').val().trim(),
            "category": $('#ddlCategory').val(),
            "leadSource": $('#txtSource').val().trim(),
            "location": $('#ddlLocation').val().trim(),
            "email": $('#txtEmail').val().trim(),
            "contactNo": $('#txtContactNo').val(),
            "note": $('#txtNote').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Leads Entry Details added successfully' : 'Leads Entry Details updated successfully';
            alertify.success(message);
            ClearAll();
            // Discard();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function ClearAll() {
    $('#txtName').val('');
    $('#txtNote').val('');
    $('#ddlCategory').val('0');
    $('#txtSource').val('');
    $('#txtContactNo').val('');
    $('#txtEmail').val('');
    $('#ddlLocation').val('0');
    GenerateLeadsEntryID();
}

function ViewLeadsEntry() {
    $('#divLeadsEntryList').show();
    $('#divLeadsEntry').hide();
    Discard();
    BindLeadsEntryMaster();
}

function Discard() {
    $('#divmilestoneList').show();
    $('#divmilestoneEntry').hide();
    $("#btntitle").html('Milestones');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    //BindMilestoneMaster();
}

function BindLocationDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfCrmSunLeadsEntry.aspx/LocationDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var location = "<option value='0'>- Select Location -</option>";
            $('#ddlLocation').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                location = location + "<option value='" + JSON.parse(response.d)[i].LocationName + "'>" + JSON.parse(response.d)[i].LocationName + "</option>";
            }
            $('#ddlLocation').append(location);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindLeadsEntryMaster() {
    $.ajax({
        type: "POST",
        url: 'wfCrmSunLeadsEntry.aspx/BindLeadsEntryMaster',
        data: {},
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

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].LeadID + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].CustomerName == undefined ? '' : data[i].CustomerName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Date == undefined ? '' : data[i].Date) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Category == undefined ? '' : data[i].Category) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ContactNo == undefined ? '' : data[i].ContactNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Location == undefined ? '' : data[i].Location) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Email == undefined ? '' : data[i].Email) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].LeadSource == undefined ? '' : data[i].LeadSource) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Note == undefined ? '' : data[i].Note) + '</td></tr>'


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
