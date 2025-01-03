
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    BindBranchDropdown();

    BindEmployeeTransactionList('', 'tbody_Employee_TransactionList', 'tblEmployeeTransectionList');


    $("#txtActionDate").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
});


function BindEmployeeTransactionList(EmployeeId, tbodyid,tbl_id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMasterTransection.aspx/FetchEmployeTransactionList',
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
                html = html + '<tr><td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + (data[i].TranDate != undefined ? data[i].TranDate : '') + '</td>'
                    + '<td>' + (data[i].FromBranch != undefined ? data[i].FromBranch : '') + '</td>'
                    + '<td>' + (data[i].ToBranch != undefined ? data[i].ToBranch : '') + '</td>'
                    + '<td>' + (data[i].Action != undefined ? data[i].Action : '') + '</td>'
                    + '<td>' + (data[i].TranNote != undefined ? data[i].TranNote : '') + '</td></tr>';
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


function BindEmployeeDropdown() {
    if ($('#ddlBranch').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpMasterTransection.aspx/EmployeeMasterList',
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



function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMasterTransection.aspx/BranchMasterList',
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

function ShowEmployeeTransaction() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());
        BindEmployeeTransactionList($('#ddlEmployee').val(), 'tbody_TransectionListEmployeeWise', 'tblTransectionListEmployeeWise');
    }
    else {
        ClearAll();
    }
}

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
    $('#ddlFromBranch').val('');
    $('#ddlToBranch').val('');
    $('#ddlAction').html('');
    $('#txtActionDate').val('');
    $('#txtNote').val('');
    $('#ddlBranch').val('');
}


function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMasterTransection.aspx/FetchEmployeeDetails',
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
            if ($('#ddlToBranch').val() != '') {
                if ($('#ddlAction').val() != '') {
                    if ($('#txtActionDate').val() != '') {
                        if ($('#txtNote').val() != '') {
                            $.ajax({
                                type: "POST",
                                url: 'wfHrEmpMasterTransection.aspx/AddEmployeeTransection',
                                data: JSON.stringify({
                                    "EmpId": $('#ddlEmployee').val(),
                                    "FromBranch": $('#ddlFromBranch').val(),
                                    "ToBranch": $('#ddlToBranch').val(),
                                    "Action": $('#ddlAction').val(),
                                    "ActionDate": $('#txtActionDate').val(),
                                    "Note": $('#txtNote').val(),
                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function () {

                                },
                                success: function (response) {
                                    alertify.success('Employee transaction added successfully');
                                    ClearAll();

                                },
                                complete: function () {

                                },
                                failure: function (jqXHR, textStatus, errorThrown) {

                                }
                            });
                        }
                        else {
                            alertify.error('Please enter note');
                        }
                    }
                    else {
                        alertify.error('Please enter action date');
                    }
                }
                else {
                    alertify.error('Please select any action');
                }
            }
            else {
                alertify.error('Please select any to branch');
            }
        }
        else {
            alertify.error('Please select any employee');
        }
    }
    else {
        alertify.error('Please select any branch');
    }
}