$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $("#btntitle").html('LeadsCollect');
    BindLeadsEntryMaster();
    GenerateLeadsEntryID();
    // Get the current date and time
   
  

});

function Title() {
    window.location = "wfCrmBkrmLeadCollect.aspx";
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
    
    else if ($('#txtContactNo').val() == '') {
        alertify.error('please enter Contact Number');
        return;
    }
    else if ($('#txtDesignation').val() == '') {
        alertify.error('please enter the Designation');
        return;
    }
    else if ($('#txtRequirements').val() == '') {
        alertify.error('please enter the Requirements');
        return;
    }
    else if ($('#txtCompanyName').val() == '') {
        alertify.error('please enter the Company Name');
        return;
    }

    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmLeadCollect.aspx/AddLeadsEntryDetails',
        data: JSON.stringify({
            "leadId": $('#txtLeadID').val().trim(),
            "customerName": $('#txtName').val().trim(),
            "date": $('#txtDate').val().trim(),
            "designation": $('#txtDesignation').val(),
            "requirements": $('#txtRequirements').val().trim(),
            "companyName": $('#txtCompanyName').val().trim(),
            "contactNo": $('#txtContactNo').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Leads Collect Details added successfully' : 'Leads Collect Details updated successfully';
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
    $('#txtName').val('');
    $('#txtRequirements').val('');
    $('#txtDesignation').val('');
    $('#txtContactNo').val('');
    $('#txtCompanyName').val('');
    GenerateLeadsEntryID();
}

function ViewLeadsEntry() {
    $('#divLeadsEntryList').show();
    $('#divLeadsEntry').hide();
    Discard();
    BindLeadsEntryMaster();
}

function Discard() {
   
    $("#btntitle").html('LeadCollect');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    //BindMilestoneMaster();
}


function BindLeadsEntryMaster() {
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmLeadCollect.aspx/BindLeadsEntryMaster',
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
                    + '<td style="white-space: nowrap;">' + (data[i].Designation == undefined ? '' : data[i].Designation) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ContactNo == undefined ? '' : data[i].ContactNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Requirements == undefined ? '' : data[i].Requirements) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].CompanyName == undefined ? '' : data[i].CompanyName) + '</td></tr>'


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
