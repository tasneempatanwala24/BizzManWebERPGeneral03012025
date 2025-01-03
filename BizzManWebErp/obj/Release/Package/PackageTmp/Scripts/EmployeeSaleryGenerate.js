
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    $('#ddl_Employee').select2();
    BindBranchDropdown();

    $('input[type=radio][name=optradioSalaryGenerateType]').change(function () {
        if (this.value == "0") {
            $('.Individual').show();

        }
        else if (this.value == "1") {
            $('.Individual').hide();

        }

    });

    BindEmployeeSaleryGenerateList('tbody_Employee_SalaryGenerateList', 'tblEmployeeSalaryGenerateList', $('#ddl_Branch').val(), $('#ddlMonth').val(), $('#txtYear').val(), $('#ddl_Employee').val());
    var currentYear = new Date().getFullYear();
    $("#txtYear").val(currentYear);
});

 //BranchMasterList

function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryGrnerate.aspx/BranchMasterList',
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
            $('#ddlBranch').append(branch);
            $('#ddl_Branch').append(branch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function BindEmployeeDropdown(brnch) {
    var chk = 1;
    var branch = '';
    var elmnt = '';
    if (brnch == '0') {
        if ($('#ddl_Branch').val() == '') {
            elmnt = 'ddl_Employee';
            chk = 0;
        }
        else {
            branch = $('#ddl_Branch').val();
        }
    }
    else {
        elmnt = 'ddlEmployee';
        if ($('#ddlBranch').val() == '') {
            chk = 0;
        }
        else {
            branch = $('#ddlBranch').val();
        }
    }

    if (chk == 1) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpSalaryGrnerate.aspx/EmployeeMasterList',
            data: JSON.stringify({
                "branchid": branch
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                $('#' + elmnt).select2('destroy');
                $('#' + elmnt).html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select Employee-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
                }
                $('#' + elmnt).append(emp);
                $('#' + elmnt).select2();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#' + elmnt).select2('destroy');
        $('#' + elmnt).html('<option value="">-Select Employee-</option>');
        $('#' + elmnt).select2();
    }
}




function CreateEmployeeSaleryGenerate() {
    $('#divEmployeeSaleryGenerateList').hide();
    $('#divEmployeeSaleryGenerateEntry').show();
    $('#btnSave').show();
    $('#btnSearch').hide();
    $('#btnDelete').hide();
    ClearAll();
}

function ViewEmployeeSaleryGenerateList() {
    $('#example-select-all').prop('checked', false);
    $('#divEmployeeSaleryGenerateList').show();
    $('#divEmployeeSaleryGenerateEntry').hide();
    $('#btnSave').hide();
    $('#btnSearch').show();
    $('#btnDelete').show();
    $('#ddl_Branch').val('');
    $('#ddlMonth').val('');
    $('#ddl_Employee').select2('destroy');
    $('#ddl_Employee').html('<option value="">-Select Employee-</option>');
    $('#ddl_Employee').select2();
    const d = new Date();
    let year = d.getFullYear();
    $('#txtYear').val(year);
    BindEmployeeSaleryGenerateList('tbody_Employee_SalaryGenerateList', 'tblEmployeeSalaryGenerateList', '', '', $('#txtYear').val(), '');
}



function ClearAll() {
    $('#ddlEmployee').select2('destroy');
    $('#ddlEmployee').html('<option value="">-Select Employee-</option>');
    $('#ddlEmployee').select2();
    $('#txtEmpName').val('');
    $('input:radio[name="optradioAttendanceType"][value="0"]').prop('checked', true);
    $('#ddlBranch').val('');
    $('#ddlSalaryType').val('');
    $('#ddl_Month').val('');
    $('#txt_Year').val('');
    $('.Individual').show();
}


function ShowEmployeeName() {
    if ($('#ddlEmployee').val() != '') {
        FetchEmployeeDetails($('#ddlEmployee').val());
    }
    else {
        $('#txtEmpName').val('');
    }
}

//FetchEmployeeDetails
function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryGrnerate.aspx/FetchEmployeeDetails',
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

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}




function AddEmployeeSaleryGenerate() {

    var chkEmp = 1;
    var empid = '';
    if ($("input:radio[name='optradioSalaryGenerateType']:checked").val() == "0") {
        if ($('#ddlEmployee').val() == '') {
            chkEmp = 0;
        }
        else {
            empid = $('#ddlEmployee').val();
        }
    }


    if ($('#ddlBranch').val() != '') {
        if (chkEmp == 1) {
            if ($("#ddl_Month").val() != '') {
                if ($("#txt_Year").val() != '') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpSalaryGrnerate.aspx/AddEmployeeSalary',
                        data: JSON.stringify({
                            "inputType": $("input:radio[name='optradioSalaryGenerateType']:checked").val(),
                            "EmpId": empid,
                            "BranchId": $('#ddlBranch').val(),
                            "month": $('#ddl_Month').val(),
                            "year": $('#txt_Year').val(),
                            "SalaryType": $('#ddlSalaryType').val(),
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var str = "success";
                            if (response.d.indexOf(str) != -1) {
                                alertify.success(response.d);
                                ClearAll();
                            }
                            else {
                                alertify.error(response.d);
                            }

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error('Please enter year');
                }
            }
            else {
                alertify.error('Please select any month');
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


function SearchEmployeeSaleryGenerate() {
    var chkMonth = 1;
    var chkYear = 1;

   
    if ($('#ddlMonth').val() != '') {


        if ($('#txtYear').val() == '') {
            chkYear = 0;
        }
    }

    if ($('#ddl_Branch').val() != '' || $('#ddlMonth').val() != '' || $('#txtYear').val() != '' || $('#ddl_Employee').val() != '') {
            if (chkMonth == 1) {
                if (chkYear == 1) {
                    BindEmployeeSaleryGenerateList('tbody_Employee_SalaryGenerateList', 'tblEmployeeSalaryGenerateList', $('#ddl_Branch').val(), $('#ddlMonth').val(), $('#txtYear').val(), $('#ddl_Employee').val());
                }
                else {
                    alertify.error('Please enter any year');
                }
            }
            else {
                alertify.error('Please select any month');
            }
        
    }
    else {
        alertify.error('Please enter any searching criteria');
    }
}
//FetchEmployeSalaryGenerateList

function BindEmployeeSaleryGenerateList(tbodyid, tbl_id, branchid, month, year, empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryGrnerate.aspx/FetchEmployeSalaryGenerateList',
        data: JSON.stringify({
            "branchid": branchid,
            "month": month,
            "year": year,
            "EmployeeId": empid
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
            
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active" value="' + data[i].Id+'"></td>'
                    + '<td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + (data[i].Year != undefined ? data[i].Year : '') + '</td>'
                    + '<td>' + (data[i].Month != undefined ? data[i].Month : '') + '</td>'
                    + '<td>' + (data[i].TotalDay != undefined ? data[i].TotalDay : '') + '</td>'
                    + '<td>' + (data[i].EarnDay != undefined ? data[i].EarnDay : '') + '</td>'
                    + '<td>' + (data[i].dayPresent != undefined ? data[i].dayPresent : '') + '</td>'
                    + '<td>' + (data[i].CL != undefined ? data[i].CL : '') + '</td>'
                    + '<td>' + (data[i].EL != undefined ? data[i].EL : '') + '</td>'
                    + '<td>' + (data[i].LOP != undefined ? data[i].LOP : '') + '</td>'
                    + '<td>' + (data[i].Sunday != undefined ? data[i].Sunday : '') + '</td>'
                    + '<td>' + (data[i].Holiday != undefined ? data[i].Holiday : '') + '</td>'
                    + '<td>' + (data[i].Total_2ndSaturday != undefined ? data[i].Total_2ndSaturday : '') + '</td>'
                    + '<td>' + (data[i].Total_4thSaturday != undefined ? data[i].Total_4thSaturday : '') + '</td>'
                    + '<td>' + (data[i].GrossRate != undefined ? data[i].GrossRate : '') + '</td>'
                    + '<td>' + (data[i].BasicRate != undefined ? data[i].BasicRate : '') + '</td>'
                    + '<td>' + (data[i].BasicPay != undefined ? data[i].BasicPay : '') + '</td>'
                    + '<td>' + (data[i].DaPercentage != undefined ? data[i].DaPercentage : '') + '</td>'
                    + '<td>' + (data[i].DaAmt != undefined ? data[i].DaAmt : '') + '</td>'
                    + '<td>' + (data[i].HraPercentage != undefined ? data[i].HraPercentage : '') + '</td>'
                    + '<td>' + (data[i].HraAmt != undefined ? data[i].HraAmt : '') + '</td>'
                    + '<td>' + (data[i].TA_Perday != undefined ? data[i].TA_Perday : '') + '</td>'
                    + '<td>' + (data[i].TA_Total != undefined ? data[i].TA_Total : '') + '</td>'
                    + '<td>' + (data[i].MedicalAllowPerDay != undefined ? data[i].MedicalAllowPerDay : '') + '</td>'
                    + '<td>' + (data[i].MedicalAllowTotal != undefined ? data[i].MedicalAllowTotal : '') + '</td>'
                    + '<td>' + (data[i].UniformAllowPerMonth != undefined ? data[i].UniformAllowPerMonth : '') + '</td>'
                    + '<td>' + (data[i].OtherAllownce != undefined ? data[i].OtherAllownce : '') + '</td>'
                    + '<td>' + (data[i].SPLAL_Percentage != undefined ? data[i].SPLAL_Percentage : '') + '</td>'
                    + '<td>' + (data[i].SPLAL_Amt != undefined ? data[i].SPLAL_Amt : '') + '</td>'
                    + '<td>' + (data[i].EDUAL_Percentage != undefined ? data[i].EDUAL_Percentage : '') + '</td>'
                    + '<td>' + (data[i].EDUAL_Amt != undefined ? data[i].EDUAL_Amt : '') + '</td>'
                    + '<td>' + (data[i].MobileAllowancePercentage != undefined ? data[i].MobileAllowancePercentage : '') + '</td>'
                    + '<td>' + (data[i].MobileAllowanceAmt != undefined ? data[i].MobileAllowanceAmt : '') + '</td>'
                    + '<td>' + (data[i].LTA_Percentage != undefined ? data[i].LTA_Percentage : '') + '</td>'
                    + '<td>' + (data[i].LTA_Amt != undefined ? data[i].LTA_Amt : '') + '</td>'
                    + '<td>' + (data[i].STIP_Percentage != undefined ? data[i].STIP_Percentage : '') + '</td>'
                    + '<td>' + (data[i].STIP_Amt != undefined ? data[i].STIP_Amt : '') + '</td>'
                    + '<td>' + (data[i].BonusPercentage != undefined ? data[i].BonusPercentage : '') + '</td>'
                    + '<td>' + (data[i].BonusAmt != undefined ? data[i].BonusAmt : '') + '</td>'
                    + '<td>' + (data[i].GROSS_TOTAL != undefined ? data[i].GROSS_TOTAL : '') + '</td>'
                    + '<td>' + (data[i].GratuityPercentage != undefined ? data[i].GratuityPercentage : '') + '</td>'
                    + '<td>' + (data[i].GratuityAmt != undefined ? data[i].GratuityAmt : '') + '</td>'
                    + '<td>' + (data[i].PF_EmployerPercentage != undefined ? data[i].PF_EmployerPercentage : '') + '</td>'
                    + '<td>' + (data[i].PF_EmployerValue != undefined ? data[i].PF_EmployerValue : '') + '</td>'
                    + '<td>' + (data[i].PF_EmployeesPercentage != undefined ? data[i].PF_EmployeesPercentage : '') + '</td>'
                    + '<td>' + (data[i].PF_EmployeesValue != undefined ? data[i].PF_EmployeesValue : '') + '</td>'
                    + '<td>' + (data[i].AdminChargesPercentage != undefined ? data[i].AdminChargesPercentage : '') + '</td>'
                    + '<td>' + (data[i].AdminChargesAmount != undefined ? data[i].AdminChargesAmount : '') + '</td>'
                    + '<td>' + (data[i].ESI_EmployerPercentage != undefined ? data[i].ESI_EmployerPercentage : '') + '</td>'
                    + '<td>' + (data[i].ESI_EmployerValue != undefined ? data[i].ESI_EmployerValue : '') + '</td>'
                    + '<td>' + (data[i].ESI_EmployeesPercentage != undefined ? data[i].ESI_EmployeesPercentage : '') + '</td>'
                    + '<td>' + (data[i].ESI_EmployeesValue != undefined ? data[i].ESI_EmployeesValue : '') + '</td>'
                    + '<td>' + (data[i].PT != undefined ? data[i].PT : '') + '</td>'
                    //=======by MK====================================
                    + '<td>' + (data[i].LoanApplicationId != undefined ? data[i].LoanApplicationId : '') + '</td>'  // loan app id
                    + '<td>' + (data[i].LoanEmiAmount != undefined ? data[i].LoanEmiAmount : '') + '</td>'  //  emi amt
                  //  + '<td>' + (data[i].PT != undefined ? data[i].PT : '') + '</td>'  //  tds amt
                    //============================================
                    + '<td>' + (data[i].NetPay != undefined ? data[i].NetPay : '') + '</td>'
                    + '<td>' + (data[i].SalaryApprove != undefined ? data[i].SalaryApprove : '') + '</td>'
                    + '<td>' + (data[i].SalaryPayment != undefined ? data[i].SalaryPayment : '') + '</td></tr>';
            }
            $('#' + tbodyid).html(html);
            var d = new Date();
            var table=$('#' + tbl_id).DataTable({
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                fixedHeader: {
                    header: true
                },
                dom: 'lfrtBip',
                buttons: [
                    {
                        "extend": "excel", "text": "Export To Excel",
                        title: "Employee Salary Details_" + d.toDateString()
                    }

                ]
            });

            $('#example-select-all').on('click', function () {
                // Check/uncheck all checkboxes in the table
                var rows = table.rows({ 'search': 'applied' }).nodes();
                $('input[type="checkbox"]', rows).prop('checked', this.checked);
            });

            $('#tblEmployeeSalaryGenerateList tbody').on('change', 'input[type="checkbox"]', function () {
                // If checkbox is not checked
                if (!this.checked) {
                    var el = $('#example-select-all').get(0);
                    // If "Select all" control is checked and has 'indeterminate' property
                    if (el && el.checked && ('indeterminate' in el)) {
                        // Set visual state of "Select all" control 
                        // as 'indeterminate'
                        el.indeterminate = true;
                    }
                }
            });

            $('#btnDelete').click(function (event) {
                var id = '';
                // Iterate over all checkboxes in the table
                table.$('input[type="checkbox"]').each(function () {
                    var cnt = table.$('input:checkbox:checked').length;
                    var cnt1 = 1;
                    if (this.checked) {
                        if (id == '') {
                            id = this.value;
                        }
                        else {
                            id = id + ',' + this.value;
                        }
                        if (cnt == cnt1) {
                            DeleteSalary(id);
                        }
                        cnt1 = cnt1 + 1;
                    }
                });

               
            });

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function DeleteSalary(id) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpSalaryGrnerate.aspx/DeleteEmployeeSalary',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                alertify.success("Salary deleted successfully");
                $('#example-select-all').prop('checked', false);
                BindEmployeeSaleryGenerateList('tbody_Employee_SalaryGenerateList', 'tblEmployeeSalaryGenerateList', $('#ddl_Branch').val(), $('#ddlMonth').val(), $('#txtYear').val(), $('#ddl_Employee').val());

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
}