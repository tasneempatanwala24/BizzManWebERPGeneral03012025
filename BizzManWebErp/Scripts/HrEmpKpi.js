
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();

    BindYearDropdown()
    BindMonthDropdown()


    BindBranchDropdown();
    BindKpiGroupDropdown();
    BindManaerialAssesmentDropdown();

    BindEmployeeTransactionList('', 'tbody_Employee_TransactionList', 'tblEmployeeTransectionList');


    $("#txtActionDate").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
});



function BindManaerialAssesmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpi.aspx/ManaerialAssesmentList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                //  abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Year + "</option>";
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].KpiGrade + "</option>";
            }
            $('#ddlManaerialAssesment').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
//============================

function BindYearDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/YearList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                //  abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Year + "</option>";
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Year + "'>" + JSON.parse(response.d)[i].Year + "</option>";
            }
            $('#ddlYear').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindMonthDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobAssign.aspx/MonthList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                // abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].MonthName + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
            }
            $('#ddlMonth').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



//=========Employees wise, new function define by mk for few field fetch==========================
function BindEmployeeTransactionListPersonal(EmployeeId, tbodyid, tbl_id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpi.aspx/FetchEmployeTransactionList',
        data: JSON.stringify({
            "EmployeeId": EmployeeId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#' + tbl_id).DataTable().clear();
            $('#' + tbl_id).DataTable().destroy();
            $('#' + tbodyid).html('');
            if (tbl_id == 'tblTransectionListEmployeeWise') {
                BindActionDropdown(data.length);
            }
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr height="20px"><td>' + data[i].id + '</td>'
                    //  + '<td>' + data[i].BranchCode + '</td>'
                    //  + '<td>' + data[i].BranchName + '</td>'
                    + '<td td {padding: 15px 0;}>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    //   + '<td>' + data[i].EmpId + '</td>'
                    //   + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + data[i].KpiGroupName + '</td>'
                    + '<td>' + data[i].KpiSubGroupName + '</td>'
                    + '<td WIDTH=20>' + data[i].GoalObjective + '</td>'
                    //   + '<td width="30%">' + data[i].GoalObjective + '</td>'
                    + '<td>' + data[i].Target + '</td>'
                    + '<td>' + data[i].SelfAssessment + '</td>'
                    + '<td>' + data[i].ManagerialAssessment + '</td>'
                    + '<td>' + data[i].Actual + '</td>'
                    + '<td>' + data[i].KpiGrade + '</td>'
                //   + '<td>' + (data[i].TranDate != undefined ? data[i].TranDate : '') + '</td>'
                //   + '<td>' + (data[i].FromBranch != undefined ? data[i].FromBranch : '') + '</td>'
                //   + '<td>' + (data[i].ToBranch != undefined ? data[i].ToBranch : '') + '</td>'
                //   + '<td>' + (data[i].Action != undefined ? data[i].Action : '') + '</td>'
                //   + '<td>' + (data[i].TranNote != undefined ? data[i].TranNote : '') + '</td></tr>';
            }
            $('#' + tbodyid).html(html);
            $('#' + tbl_id).DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



//===============================

//===================================

function BindEmployeeTransactionList(EmployeeId, tbodyid, tbl_id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpi.aspx/FetchEmployeTransactionList',
        data: JSON.stringify({
            "EmployeeId": EmployeeId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#' + tbl_id).DataTable().clear();
            $('#' + tbl_id).DataTable().destroy();
            $('#' + tbodyid).html('');
            if (tbl_id == 'tblTransectionListEmployeeWise') {
                BindActionDropdown(data.length);
            }
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td>' + data[i].id + '</td>'
                    + '<td>' + data[i].BranchCode + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + data[i].KpiGroupName + '</td>'
                    + '<td>' + data[i].KpiSubGroupName + '</td>'
                    + '<td>' + data[i].GoalObjective + '</td>'
                 //   + '<td width="30%">' + data[i].GoalObjective + '</td>'
                    + '<td>' + data[i].Target + '</td>'
                    + '<td>' + data[i].SelfAssessment + '</td>'
                    + '<td>' + data[i].ManagerialAssessment + '</td>'
                    + '<td>' + data[i].Actual + '</td>'
                    + '<td>' + data[i].KpiGrade + '</td>'
                 //   + '<td>' + (data[i].TranDate != undefined ? data[i].TranDate : '') + '</td>'
                 //   + '<td>' + (data[i].FromBranch != undefined ? data[i].FromBranch : '') + '</td>'
                 //   + '<td>' + (data[i].ToBranch != undefined ? data[i].ToBranch : '') + '</td>'
                 //   + '<td>' + (data[i].Action != undefined ? data[i].Action : '') + '</td>'
                 //   + '<td>' + (data[i].TranNote != undefined ? data[i].TranNote : '') + '</td></tr>';
            }
            $('#' + tbodyid).html(html);
            $('#' + tbl_id).DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
//=======================================
//=====================================
function BindEmployeeDropdown() {
    if ($('#ddlBranch').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpKpi.aspx/EmployeeMasterList',
            data: JSON.stringify({
                "branchid": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#ddlEmployee').select2('destroy');
                $('#ddlEmployee').html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select Employee-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
                }
                $('#ddlEmployee').append(emp);
                $('#ddlEmployee').select2();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').html('');
        $('#ddlEmployee').select2();
    }
}

//   new by mk
function BindKpiGroupDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpi.aspx/KpiGroupMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select KPI Group -</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].KpiGroupName + "</option>";
            }
            $('#ddlKpiGroup').append(branch);
          //  $('#ddlToBranch').append(branch);
         //   $('#ddlBranch').append(branch);
           
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


//BindKpiSubGroupDropdown  by mk
function BindKpiSubGroupDropdown() {
    if ($('#ddlKpiGroup').val() != '') {
        $.ajax({
            type: "POST",
           // url: 'wfHrEmpKpi.aspx/EmployeeMasterList',
            url: 'wfHrEmpKpi.aspx/KpiSubGroupList',
            data: JSON.stringify({
                "kpigroupid": $('#ddlKpiGroup').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
              //  $('#ddlKpiSubGroup').select2('destroy');
                $('#ddlKpiSubGroup').html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select KPI Sub Group -</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].KpiSubGroupName + "</option>";
                }
                $('#ddlKpiSubGroup').append(emp);
             //   $('#ddlEmployee').select2();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#ddlKpiSubGroup').select2('destroy');
        $('#ddlKpiSubGroup').html('');
        $('#ddlKpiSubGroup').select2();
    }
}

//BindKpiGoalObjectiveDropdown   mk
function BindKpiGoalObjectiveDropdown() {
    if ($('#ddlKpiGroup').val() != '') {
        $.ajax({
            type: "POST",
          //  url: 'wfHrEmpKpi.aspx/KpiSubGroupList',
            url: 'wfHrEmpKpi.aspx/KpiGoalObjectiveList',
            data: JSON.stringify({
                "kpisubgroupid": $('#ddlKpiSubGroup').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                //  $('#ddlKpiSubGroup').select2('destroy');
                $('#ddlKpiGoalObjective').html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select KPI Goal ObjectiveList -</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].GoalObjective + "</option>";
                }
                $('#ddlKpiGoalObjective').append(emp);
                //   $('#ddlEmployee').select2();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#ddlKpiSubGroup').select2('destroy');
        $('#ddlKpiSubGroup').html('');
        $('#ddlKpiSubGroup').select2();
    }
}






function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpi.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlFromBranch').append(branch);
            $('#ddlToBranch').append(branch);
            $('#ddlBranch').append(branch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function CreateEmployeeTransection() {
    $('#divEmployeeTransectionList').hide();
    $('#divEmployeeTransactionEntry').show();
    $('#divTransectionListEmployeeWise').show();
    $('#btnSave').show();
    ClearAll();
}

function ViewEmployeeTransectionList() {
    $('#divEmployeeTransectionList').show();
    $('#divEmployeeTransactionEntry').hide();
    $('#divTransectionListEmployeeWise').hide();
    $('#btnSave').hide();
    BindEmployeeTransactionList('', 'tbody_Employee_TransactionList', 'tblEmployeeTransectionList');
}
/*   ORIGINAL CODE
function ShowEmployeeTransaction() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());
        BindEmployeeTransactionList($('#ddlEmployee').val(), 'tbody_TransectionListEmployeeWise', 'tblTransectionListEmployeeWise');
    }
    else {
        ClearAll();
    }
}
*/
//  MODIFY CODE
function ShowEmployeeTransaction() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());

        // it will fetch some of data, not all, change by mk

        //  this is original code
        // BindEmployeeTransactionList($('#ddlEmployee').val(), 'tbody_TransectionListEmployeeWise', 'tblTransectionListEmployeeWise');
        //  chnage by mk
        BindEmployeeTransactionListPersonal($('#ddlEmployee').val(), 'tbody_TransectionListEmployeeWise', 'tblTransectionListEmployeeWise');
    }
    else {
        ClearAll();
    }
}
//===================================




function BindActionDropdown(TransactionCount) {
    $('#ddlAction').html('');
    var html = "<option value=''>-Select Action-</option>";
    if (TransactionCount == 0) {
        html = html + "<option value='Join'>Join</option>";
    }
    else {
        html = html + "<option value='Transfer'>Transfer</option><option value='Resign'>Resign</option><option value='Terminate'>Terminate</option><option value='Suspend'>Suspend</option>";
    }
    $('#ddlAction').html(html);
}

function ClearAll() {
    $('#tblTransectionListEmployeeWise').DataTable().clear();
    $('#tblTransectionListEmployeeWise').DataTable().destroy();
    $('#tbody_TransectionListEmployeeWise').html('');
    $('#tblTransectionListEmployeeWise').DataTable();
    $('#ddlEmployee').select2('destroy');
    $('#ddlEmployee').html('');
    $('#ddlEmployee').select2();
    $('#txtEmpName').val('');
 //   $('#ddlFromBranch').val('');
    $('#ddlKpiGroup').val('');
 //   $('#ddlToBranch').val('');
    $('#ddlAction').html('');
    $('#txtActionDate').val('');
    $('#txtNote').val('');
    $('#ddlBranch').val('');
}


function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpi.aspx/FetchEmployeeDetails',
        data: JSON.stringify({
            "EmpId": empid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#txtEmpName').val(data[0].EmpName);
            $('#ddlFromBranch').val(data[0].Branchcode);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function AddEmployeeTransection() {
    if ($('#ddlBranch').val() != '') {
        if ($('#ddlEmployee').val() != '') {
            if ($('#ddlKpiGroup').val() != '') {
                if ($('#ddlKpiSubGroup').val() != '') {
                    if ($('#ddlKpiGoalObjective').val() != '') {
                        if ($('#ddlYear').val() != '') {
                            if ($('#ddlMonth').val() != '') {
                                if ($('#txtManaerialAssesment').val() != '') {
                                    $.ajax({
                                        type: "POST",
                                        url: 'wfHrEmpKpi.aspx/AddEmployeeKpi',
                                        data: JSON.stringify({
                                            "EmpId": $('#ddlEmployee').val(),
                                            "Branch": $('#ddlFromBranch').val(),
                                            "KpiGroup": $('#ddlKpiGroup').val(),
                                            "KpiSubGroup": $('#ddlKpiSubGroup').val(),
                                            "KpiGoalObjective": $('#ddlKpiGoalObjective').val(),
                                            "Year": $('#ddlYear').val(),
                                            "Month": $('#ddlMonth').val(),
                                            "SelfAssesment": $('#txtSelfAssesment').val(),
                                            "ManaerialAssesment": $('#txtManaerialAssesment').val(),
                                            "Note": $('#txtNote').val(), 
                                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                        }), 
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        beforeSend: function () {

                                        },
                                        success: function (response) {
                                            alertify.success('Employee KPI added successfully');
                                            ClearAll();

                                        },
                                        complete: function () {

                                        },
                                        failure: function (jqXHR, textStatus, errorThrown) {

                                        }
                                    });
                                }   // txtManaerialAssesment
                                else {
                                    alertify.error('Please input Manaerial Assesment ');
                                }   //txtManaerialAssesment
                            }   //  month
                            else {
                                alertify.error('Please select Month');
                            }   // end month
                        }
                        else {
                            alertify.error('Please select Year');
                        }   // end year
                    }
                    else {
                        alertify.error('Please select any KPI Goal/Objective');
                    }
                }     // end Goal/Objective
                else {
                         alertify.error('Please select any KPI Sub Group');
                }
            }
            else {
                alertify.error('Please select any KPI Group');
            }
        }
        else {
            alertify.error('Please select any employee');
        }
    }
    else {   //  branch
        alertify.error('Please select any branch');
    }
}