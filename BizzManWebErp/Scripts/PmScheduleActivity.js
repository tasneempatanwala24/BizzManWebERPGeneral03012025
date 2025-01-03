$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindEmployeeNames();
    BindClientDetails();
    BindCustomerList();
    $('#createDiv').hide();


});

function ClearAll() {
    $('#ddlFollowUp').val('');
    $('#txtDueDate').val('');
    $('#txtsummary').val('');
    $('#ddlAssign').val('');
    $('#txtNote').val('');

}

function ViewCustomerList() {
    
    $('#DivCustomerList').show();
    $('#createDiv').hide();
    $("#btnsave").hide();
    BindCustomerList();

}
function BindClientDetails() {
       $.ajax({
        type: "POST",
        url: 'wfPmAssignActivity.aspx/ClientList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].FullName + "'>" + JSON.parse(response.d)[i].FullName + "</option>";
            }
            $('#ddlAssignClient').append(department);
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
        url: 'wfPmAssignActivity.aspx/EmployeeList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
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

function BindCustomerList() {
   
    $.ajax({
        type: "POST",
        url: 'wfPmAssignActivity.aspx/FetchActivityList',
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
                html = html + '<tr onclick="FetchActivityDetails(\'' + data[i].FollowUpType + '\')"><td>' + data[i].FollowUpType + '</td>'
                    + '<td>' + (data[i].Summary != undefined ? data[i].Summary : '') + '</td>'
                    + '<td>' + (data[i].DueDate != undefined ? data[i].DueDate : '') + '</td>'
                    + '<td>' + (data[i].AssignClient != undefined ? data[i].AssignClient : '') + '</td>'
                    + '<td>' + (data[i].AssignPerson != undefined ? data[i].AssignPerson : '') + '</td></tr>';
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

function FetchActivityDetails(ActivityId) {
    
    $.ajax({
        type: "POST",
        url: 'wfPmAssignActivity.aspx/FetchActivityDetails',
        data: JSON.stringify({
            "ActivityId": ActivityId
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

            $('#txtActivityId').attr("readonly", "readonly");
            //$('#lblEmployee').text('Update');
            var data = JSON.parse(response.d);
            $('#txtActivityId').val(data[0].ActivityId);
            $('#ddlFollowUp').val(data[0].FollowUpType);
            $('#txtsummary').val(data[0].Summary);
            $('#txtDueDate').val(data[0].DueDate);
            $('#ddlAssign').val(data[0].AssignPerson);
            $('#ddlAssignClient').val(data[0].AssignClient);
         

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
   // $('#txtActivityId').removeAttr("readonly");

}

function AddActivity() {
    

    var IsUpdate = 0;
    if ($('#btnsave').html() == 'Update') {
        IsUpdate = 1;
    }
    //if ($('#txtCustomerName').val().trim() != '') {

    //    $.ajax({
    //        type: "POST",
    //        url: 'wfPmAssignActivity.aspx/CheckCustomerNameAvailability',
    //        data: JSON.stringify({ "CustomerName": $('#txtCustomerName').val(), "IsUpdate": IsUpdate }),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        beforeSend: function () {

    //        },
    //  success: function (response1) {
    //    var data1 = JSON.parse(response1.d);
    //  if (data1 == 'False') {

    //   if ($('#txtphone').val().trim() != '') {
    //     if ($('#txtsummary').val().trim() != '') {
    //       if ($('#txtpostcode').val().trim() != '') {
    //         if ($('#txtemail').val().trim() != '') {

    $.ajax({

        type: "POST",
        url: 'wfPmAssignActivity.aspx/AddActivity',
        data: JSON.stringify({
            //"ActivityId": $('txtSummary.text').val().trim(),
            "FollowUpType": $('#ddlFollowUp').val().trim(),
            "Summary": $('#txtSummary').val().trim(),
            "Note": $('#txtNote').val().trim(),
            "AssignPerson": $('#ddlAssign').val().trim(),
            "AssignClient": $('#ddlAssignClient').val().trim(),
            "DueDate": $('#txtDueDate').val().trim(),
            "CreateUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            if ($('#btnsave').html() == 'Update') {
                alertify.success("Activity details updated successfully");
            }
            else {
                alertify.success("Activity Scheduled successfully");
                ClearAll();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }

    });

    
    //}
    //                    else {
    //                        alertify.error("Please enter Email.");
    //                    }
    //                }
    //                else {
    //                    alertify.error("Please Enter Post Code");
    //                }
    //            }
    //            else {
    //                alertify.error("Please Enter summary");
    //            }
    //        }
    //        else {
    //            alertify.error("Please Enter Phone Number");
    //        }
    //    }
    //    else {
    //        alertify.error("Customer Name already available");
    //    }
    //},
    // complete: function () {

    //},
    //failure: function (jqXHR, textStatus, errorThrown) {

}
        //});

    //}
//    else {
  //      alertify.error("Please Enter Customer Name.");
    //}
//}
/*
function CheckCustomerNameAvailability() {
    $.ajax({
        type: "POST",
        url: 'wfPmAssignActivity.aspx/CheckCustomerNameAvailability',
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
*/


  


function ValidateNumber(event) {
    var regex = new RegExp("^[0-9]*$");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}


