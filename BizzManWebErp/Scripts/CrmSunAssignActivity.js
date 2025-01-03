$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    
    $("#btntitle").html('AssignActivity');
    BindAssignActivityMaster();
    //BindProjectDropdown();
    GenerateActivityID();
    BindCustomerDropdown();
    BindEmployeeNames();
});

function Title() {
    window.location = "wfCrmSunScheduleActivity.aspx";
}

function CreatePmAssignActivityList() {

    $('#divAssignActivityList').hide();
    $('#divAssignActivityEntry').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#txtActivityID').removeAttr("readonly");
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    
}

function AddAssignActivityEntry() {

    var isUpdate = 0;
    if ($('#txtAssignActivityName').val() != '') {

        if ($("#btnSave").html() != 'Update') {
            $.ajax({
                type: "POST",
                url: 'wfCrmSunScheduleActivity.aspx/CheckAssignActivityAvailability',
                data: JSON.stringify({ "name": $('#txtAssignActivityName').val(), "isUpdate": isUpdate }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = JSON.parse(response.d);
                    if (data == 'False') {

                        AddAssignActivity()
                    }
                    else {
                        alertify.error("Current AssignActivity Details already exists");
                    }
                }
            })
        }
        else {
            AddAssignActivity();
        }
    }
    else {
        alertify.error('Please Enter AssignActivity Name');
    }
}

function GenerateActivityID() {

    // Generate a random 4-digit number
    var randomFourDigits = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

    // Create the LeadId
    var leadId = 'ACTID' + '-' + randomFourDigits;

    // Display the LeadId
    $('#txtActivityID').val(leadId);
}

function BindCustomerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfCrmSunScheduleActivity.aspx/CustomerNames',
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
        url: 'wfCrmSunScheduleActivity.aspx/EmployeeList',
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

function AddCrmAssignActivityDetails() {
    
    if ($('#ddlCustomer').val() == '0') {
        alertify.error('Select Customer Name');
        return;
    }
    else if ($('#ddlFollowType').val() == '0') {
        alertify.error('please enter the Follow Type');
        return;
    }
    else if ($('#ddlAssign').val() == '0') {
        alertify.error('Please select any Employee');
        return;
    }
    else if ($('#txtDueDate').val() == '') {
        alertify.error('please enter Due date');
        return;
    
    }
    else if ($('#ddlPriority').val() == '0') {
        alertify.error('Please select Priority');
        return;
    }
    $.ajax({
        type: "POST",
        url: 'wfCrmSunScheduleActivity.aspx/AddAssignActivityDetails',
        data: JSON.stringify({
            "leadId": $('#ddlCustomer').val().trim(),
            "activityId": $('#txtActivityID').val().trim(),
            "duedate": $('#txtDueDate').val().trim(),
            "followUpType": $('#ddlFollowType').val(),
            "priority": $('#ddlPriority').val().trim(),
            "assignedPerson": $('#ddlAssign').val().trim(),
            "note": $('#txtNote').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()
         

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Leads Assign Activity Details added successfully' : 'Leads Assign Activity Details updated successfully';
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
    $('#ddlCustomer').val('0');
    $('#txtNote').val('');
    $('#ddlFollowType').val('0');
    $('#txtDueDate').val('');
    $('#ddlPriority').val('0');
    $('#ddlAssign').val('0');
    GenerateActivityID();
}


function ViewAssignActivity() {
    $('#divAssignActivityList').show();
    $('#divAssignActivityEntry').hide();
    Discard();
    BindAssignActivityMaster();
}

function Discard() {
    $('#divAssignActivityList').show();
    $('#divAssignActivityEntry').hide();
    $("#btntitle").html('AssignActivitys');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    //BindAssignActivityMaster();
}

function BindAssignActivityMaster() {
    //debugger;
    $.ajax({
        type: "POST",
        url: 'wfCrmSunScheduleActivity.aspx/BindAssignActivityDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblAssignActivitylist').DataTable().clear();
            $('#tblAssignActivitylist').DataTable().destroy();
            $('#tbody_AssignActivity_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].ActivityID + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].CustomerName == undefined ? '' : data[i].CustomerName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].FollowUpType == undefined ? '' : data[i].FollowUpType) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].DueDate == undefined ? '' : data[i].DueDate) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Priority == undefined ? '' : data[i].Priority) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AssignedPerson == undefined ? '' : data[i].AssignedPerson) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Note == undefined ? '' : data[i].Note) + '</td></tr>'

            }
            $('#tbody_AssignActivity_list').html(html);
            $('#tblAssignActivitylist').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
