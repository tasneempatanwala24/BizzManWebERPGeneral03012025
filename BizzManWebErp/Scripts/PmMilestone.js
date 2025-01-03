$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindEmployeeDropdown();
    $("#btntitle").html('Milestones');
    BindMilestoneMaster();
    BindProjectDropdown();
});

function Title() {
    window.location = "wfPmMilestone.aspx";
}

function CreatePmMilestoneList() {

    $('#divmilestoneList').hide();
    $('#divmilestoneEntry').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#txtSalesOrderNo').removeAttr("readonly");
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    ClearAll();
}

function AddmilestoneEntry() {

    var isUpdate = 0;
    if ($('#txtmilestoneName').val() != '') {

        if ($("#btnSave").html() != 'Update') {
            $.ajax({
                type: "POST",
                url: 'wfPmMilestone.aspx/CheckMilestoneAvailability',
                data: JSON.stringify({ "name": $('#txtmilestoneName').val(), "isUpdate": isUpdate }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = JSON.parse(response.d);
                    if (data == 'False') {

                        Addmilestone()
                    }
                    else {
                        alertify.error("Current milestone Details already exists");
                    }
                }
            })
        }
        else {
            Addmilestone();
        }
    }
    else {
        alertify.error('Please Enter milestone Name');
    }
}

function GenerateOrderID() {

    if ($('#txtName').val() != '') {

        // Generate a random 4-digit number
        var randomFourDigits = ('0000000' + Math.floor(Math.random() * 10000000)).slice(-7);

        // Create the orderId
        var orderNo = 'ODN'  + '-' + randomFourDigits;

        // Display the orderId
        $('#txtSalesOrderNo').val(orderNo);
    }
    else {
        $('#txtSalesOrderNo').val('');
    }
}
function AddPmMilestoneDetails() {

    if ($('#txtName').val() == '') {
        alertify.error('Enter Name');
        return;
    }
    else if ($('#ddlAssign').val() == '0') {
        alertify.error('Please select any Employee');
        return;
    }
    
    else if ($('#ddlProject').val() == '0') {
        alertify.error('Please select Project Name');
        return;
    }
    else if ($('#txtDatelineFrom').val() == '') {
        alertify.error('please enter Dealine start date');
        return;
    }
    else if ($('#txtJobType').val() == '') {
        alertify.error('please enter the Job Type');
        return;
    }
    $.ajax({
        type: "POST",
        url: 'wfPmMilestone.aspx/AddMilestoneDetails',
        data: JSON.stringify({
            "name": $('#txtName').val().trim(),
            "project": $('#ddlProject').val().trim(),
            "assignEmployees": $('#ddlAssign').val(),
            "salesOrderNo": $('#txtSalesOrderNo').val().trim(),
            "deadlineFrom": $('#txtDatelineFrom').val().trim(),
            "deadlineTo": $('#txtDatelineTo').val().trim(),
            "jobType": $('#txtJobType').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Milestone Details added successfully' : 'Milestone Details updated successfully';
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
    $('#txtProject').val('');
    $('#ddlAssign').val('0');
    $('#txtDateline').val('');
    $('#txtJobType').val('');
    $('#txtSalesOrderNo').val('');
}

function ViewMilestone() {
    $('#divmilestoneList').show();
    $('#divmilestoneEntry').hide();
    Discard();
    BindMilestoneMaster();
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

function BindEmployeeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmMilestone.aspx/BindEmployeesList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var employee = "<option value='0'>- Select Employee -</option>";
            $('#ddlAssign').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                employee = employee + "<option value='" + JSON.parse(response.d)[i].EmpName + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
            }
            $('#ddlAssign').append(employee);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindProjectDropdown() {
        $.ajax({
        type: "POST",
        url: 'wfPmMilestone.aspx/BindProjectList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var project = "<option value='0'>- Select Project -</option>";
            $('#ddlProject').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                project = project + "<option value='" + JSON.parse(response.d)[i].ProjectId + "'>" + JSON.parse(response.d)[i].ProjectId + "</option>";
            }
            $('#ddlProject').append(project);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function FetchSalesOrder(projectId) {
    

    $.ajax({
        type: "POST",
        url: 'wfPmMilestone.aspx/FetchSalesOrderNo',
        data: JSON.stringify({
            projectId: projectId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //ClearAll();
            $('#txtSalesOrderNo').attr("readonly", "readonly");
            var data = JSON.parse(response.d);
            $("#btntitle").html("milestones / ");
            $('#txtSalesOrderNo').val(data[0].SalesOrderNo);
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindMilestoneMaster() {
    $.ajax({
        type: "POST",
        url: 'wfPmMilestone.aspx/BindMilestoneDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblmilestonelist').DataTable().clear();
            $('#tblmilestonelist').DataTable().destroy();
            $('#tbody_milestone_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].Name + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Project == undefined ? '' : data[i].Project) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AssignEmployees == undefined ? '' : data[i].AssignEmployees) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].SalesOrderNo == undefined ? '' : data[i].SalesOrderNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].DeadlineFrom == undefined ? '' : data[i].DeadlineFrom) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].DeadlineTo == undefined ? '' : data[i].DeadlineTo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].JobType == undefined ? '' : data[i].JobType) + '</td></tr>'

            }
            $('#tbody_milestone_list').html(html);
            $('#tblmilestonelist').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
