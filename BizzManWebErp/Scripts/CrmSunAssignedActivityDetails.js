$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $("#btntitle").html('CRM AssignActivity Details');
    // $('#divLeadsEntryList').show();
    $('#divLeadsEntry').show();
    $('#divLeadsEntry2').hide();

    FetchCrmAssignActivityDetails($('#ContentPlaceHolder1_loginuser').val());

});

function Title() {
    window.location = "wfCrmAssignedActivity.aspx";
}

function FetchCrmAssignActivityDetails(userId) {
   // debugger;
    $.ajax({
        type: "POST",
        url: 'wfCrmSunAssignedActivityDetails.aspx/FetchCrmAssignActivityDetails',
        data: JSON.stringify({
            "userId": userId
            // 'fullName': fullName
        }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {


        },
        success: function (response) {

            var data = JSON.parse(response.d);
            //ClearAll();
            $("#btnSave").html('Update Status');
            $('#txtEmpID,#txtName','txtDesignation','txtDepartment','txtBranch').attr("readonly", "readonly","readonly","readonly","readonly");
            $("#btnSave").show();


            $('#txtEmpID').val(data[0].EmpId);
            $('#txtName').val(data[0].EmpName);
            $('#txtDepartment').val(data[0].Department);
            $('#txtDesignation').val(data[0].Designation);
            $('#txtBranch').val(data[0].Branch);

            BindAssignGridMaster($('#txtName').val());
           

        },
        complete: function () {
           // BindAssignGridMaster();
        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function ClearAll() {
    $('#txtName').val('');
    $('#txtProject').val('');
    $('#ddlAssign').val('0');
    $('#txtDateline').val('');
    $('#txtJobType').val('');
    $('#txtSalesOrderNo').val('');
}


function BindAssignGridMaster(empName) {
    //debugger;
    var empName = $("#txtName").val();

    $.ajax({
        type: "POST",
        url: 'wfCrmSunAssignedActivityDetails.aspx/BindAssignGridMaster',
        data: JSON.stringify({
           empName : empName
            // 'fullName': fullName
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
                    + '<td style="white-space: nowrap;">' + (data[i].DueDate == undefined ? '' : data[i].DueDate) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AssignedDate == undefined ? '' : data[i].AssignedDate) + '</td>'
                    + '<td style="white-space: nowrap;" onclick="FetchPmAssignLeadActivityDetails(\'' + data[i].LeadID + '\',\'' + data[i].CustomerName + '\')">' + "See Details" + '</td></tr>'
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

function UpdateFollowStatus() {
    debugger;
    var leadId = $('#txtLeadID').val();
    var followUpStatus = $('#ddlStatus').val();

    $.ajax({
        url: 'wfCrmSunAssignedActivityDetails.aspx/UpdateFollowStatus',

        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ leadId: leadId, followUpStatus: followUpStatus }),
        dataType: "json",

        beforeSend: function () {

        },
        success: function (response) {
            alert("Status updated successfully!");
        },

        error: function (xhr, status, error) {
            alert("Error updating value: " + error);
        }
    });

}
function FetchPmAssignLeadActivityDetails(LeadID, CustomerName) {
    
    $.ajax({
        type: "POST",
        url: 'wfCrmSunAssignedActivityDetails.aspx/FetchPmAssignLeadActivityDetails',
        data: JSON.stringify({
            "LeadID": LeadID,
            'CustomerName': CustomerName
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
            $('#divLeadsEntry2').show();
            $("#btnSave").show();


            $('#txtLeadID').val(data[0].LeadID);
            $('#txtCustName').val(data[0].CustomerName);
            $('#txtCategory').val(data[0].Category);
            $('#txtContactNo').val(data[0].ContactNo);
            $('#txtLocation').val(data[0].Location);
            $('#txtFollowUpType').val(data[0].FollowUpType);
            $('#txtDueDate').val(data[0].DueDate);
            $('#txtEmail').val(data[0].Email);
            $('#txtSource').val(data[0].LeadSource);
            $('#txtNote').val(data[0].Note);

            // $('#chkActive').prop('checked', data[0].Active === "Y");

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}