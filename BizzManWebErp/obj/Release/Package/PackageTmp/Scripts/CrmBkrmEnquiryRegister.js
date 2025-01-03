$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $("#btntitle").html('EnquiryRegister');
    BindEnquiryRegisterMaster();
    BindCustomerDropdown();
    BindEmployeeNames();
    GenerateEnquiryID();
    // Get the current date and time

});
function GenerateEnquiryID() {

    // Generate a random 4-digit number
    var randomFourDigits = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

    // Create the LeadId
    var enquiryId = 'ENQID' + '-' + randomFourDigits;

    // Display the LeadId
    $('#txtEnquiryID').val(enquiryId);
}
function Title() {
    window.location = "wfCrmBkrmEnquiryRegister.aspx";
}

function CreateCrmBkrmEnquiryList() {

    $('#divEnquiryRegisterList').hide();
    $('#divenquiryregister').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    ClearAll();
}


function AddCrmBkrmEnquiryDetails() {
    
     if ($('#txtRequirements').val() == '') {
        alertify.error('please enter the Requirements');
        return;
    }
    else if ($('#txtEmployeeCount').val() == '') {
        alertify.error('Enter Number of Employee Counts');
        return;
    }

    else if ($('#txtEventsName').val() == '') {
        alertify.error('please enter Events Name');
        return;
    }
    else if ($('#txtContactName').val() == '') {
        alertify.error('please enter the Contact Name');
        return;
    }
    else if ($('#ddlAssign').val() == '0') {
        alertify.error('please select the Employee to Assign the enquiry');
        return;
    }
   
    else if ($('#ddlCustomer').val() == '0') {
        alertify.error('please select the Customer');
        return;
    }
    else if ($('#ddlCatalogue').val() == '0') {
        alertify.error('please enter the Catalogue');
        return;
    }
    else if ($('#txtDesignation').val() == '') {
        alertify.error('please enter the Designation');
        return;
    }
    else if ($('#txtDate').val() == '') {
        alertify.error('please enter the Date');
        return;
    }
    else if ($('#txtContactNo').val() == '') {
        alertify.error('please enter the Contact Number');
        return;
    }
    else if ($('#txtCompanyName').val() == '') {
        alertify.error('please enter the Company Name');
        return;
    }
    else if ($('#txtSend').val() == '') {
        alertify.error('please enter the Send Details to company');
        return;
    }
    else if ($('#txtNote').val() == '') {
        alertify.error('please enter the Note');
        return;
    }

    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmEnquiryRegister.aspx/AddEnquiryDetails',
        data: JSON.stringify({
            "enquiryId": $('#txtEnquiryID').val().trim(),
            "requirements": $('#txtRequirements').val().trim(),
            "empCount": $('#txtEmployeeCount').val().trim(),
            "eventsName": $('#txtEventsName').val().trim(),
            "contactName": $('#txtContactName').val().trim(),
            "contactNo": $('#txtContactNo').val(),
            "designation": $('#txtDesignation').val(),
            "companyName": $('#txtCompanyName').val().trim(),
            "empName": $('#ddlAssign').val().trim(),
            "leadId": $('#ddlCustomer').val().trim(),
            "catalogue": $('#ddlCatalogue').val().trim(),
            "date": $('#txtDate').val().trim(),
            "send": $('#txtSend').val().trim(),
            "note": $('#txtNote').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Enquiry Register Details added successfully' : 'Enquiry Register Details updated successfully';
            alertify.success(message);
            ClearAll();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindCustomerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmEnquiryRegister.aspx/CustomerNames',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCustomer').html('');
            var data = JSON.parse(response.d);
            var customerList = "<option value='0'>-Select Customer-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                customerList = customerList + "<option value='" + JSON.parse(response.d)[i].LeadID + "'>" + JSON.parse(response.d)[i].CustomerName + "</option>";
            }
            $('#ddlCustomer').append(customerList);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindEmployeeNames() {
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmEnquiryRegister.aspx/EmployeeList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "<option value='0'>- Select Employee -</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].EmpName + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
            }
            $('#ddlAssign').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ClearAll() {
    $('#txtEventsName').val('');
    $('#txtRequirements').val('');
    $('#txtEmployeeCount').val('');
    $('#txtContactName').val('');
    $('#ddlCatalogue').val('0');
    $('#txtNote').val('');
    $('#txtSend').val('');
    $('#txtDesignation').val('');
    $('#txtDate').val('');
    $('#txtContactNo').val('');
    $('#txtCompanyName').val('');
    $('#ddlAssign').val('0');
    $('#ddlCustomer').val('0');
    GenerateEnquiryID();

}

function ViewEnquiryDetails() {
    $('#divEnquiryRegisterList').show();
    $('#divenquiryregister').hide();
    Discard();
    BindEnquiryRegisterMaster();
}

function Discard() {

    $("#btntitle").html('EnquiryRegister');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    //BindMilestoneMaster();
}


function BindEnquiryRegisterMaster() {
    $.ajax({
        type: "POST",
        url: 'wfCrmBkrmEnquiryRegister.aspx/BindEnquiryRegisterMaster',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEnquiryRegisterlist').DataTable().clear();
            $('#tblEnquiryRegisterlist').DataTable().destroy();
            $('#tbody_enquiryregister_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].EnquiryId + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].EventsName == undefined ? '' : data[i].EventsName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Requirements == undefined ? '' : data[i].Requirements) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].EmployeeCount == undefined ? '' : data[i].EmployeeCount) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ContactName == undefined ? '' : data[i].ContactName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ContactNo == undefined ? '' : data[i].ContactNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AssignPerson == undefined ? '' : data[i].AssignPerson) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].CustomerName == undefined ? '' : data[i].CustomerName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Catalogue == undefined ? '' : data[i].Catalogue) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Date == undefined ? '' : data[i].Date) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Designation == undefined ? '' : data[i].Designation) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].CompanyName == undefined ? '' : data[i].CompanyName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Note == undefined ? '' : data[i].Note) + '</td></tr>'
            }
            $('#tbody_enquiryregister_list').html(html);
            $('#tblEnquiryRegisterlist').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
