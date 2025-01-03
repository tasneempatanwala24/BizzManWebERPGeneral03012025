$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    $('#ddl_Employee').select2();
    BindBranchDropdown();
    var currentYear = new Date().getFullYear();
    $("#txtYear").val(currentYear);

    SearchEmployeeSaleryApprove();

});

// =================

function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryReport_1.aspx/BranchMasterList',
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
            url: 'wfHrEmpSalaryReport_1.aspx/EmployeeMasterList',
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




function CreateEmployeeSaleryApprove() {
    $('#divEmployeeSaleryApproveList').hide();
    $('#divEmployeeSaleryApproveEntry').show();
    $('#divSalaryApproveListEmployeeWise').show();
    $('#btnSave').show();
    //$('#btnSearch').hide();
    $('#btnDelete').hide();
    $('#btnExportPDF').hide();
    $('#tblSalaryApproveEmployeeWise').DataTable();
    ClearAll();
}

function ViewEmployeeSaleryApproveList() {
    $('#example-select-all').prop('checked', false);
    $('#divEmployeeSaleryApproveList').show();
    $('#divSalaryApproveListEmployeeWise').hide();
    $('#divEmployeeSaleryApproveEntry').hide();
    $('#btnSave').hide();
    $('#btnExportPDF').show();
    // $('#btnSearch').show();
    $('#btnDelete').show();
    $('#ddl_Branch').val('');
    $('#ddlMonth').val('');
    $('#ddl_SalaryType').val('');
    $('#ddl_Employee').select2('destroy');
    $('#ddl_Employee').html('<option value="">-Select Employee-</option>');
    $('#ddl_Employee').select2();
    const d = new Date();
    let year = d.getFullYear();
    $('#txtYear').val(year);


    SearchEmployeeSaleryApprove();
}



function ClearAll() {
    $('#SalaryApprove-select-all').prop('checked', false);
    $('#ddlEmployee').select2('destroy');
    $('#ddlEmployee').html('<option value="">-Select Employee-</option>');
    $('#ddlEmployee').select2();
    $('#txtEmpName').val('');
    $('input:radio[name="optradioAttendanceType"][value="0"]').prop('checked', true);
    $('#ddlBranch').val('');
    $('#ddlSalaryType').val('');
    $('#ddl_Month').val('');
    $('#txt_Year').val('');
    const d = new Date();
    let year = d.getFullYear();
    $('#txt_Year').val(year);
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

function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryReport_1.aspx/FetchEmployeeDetails',
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




function SearchEmployeeSaleryApprove() {
    var chkMonth = 1;
    var chkYear = 1;

    if ($("#btnSave").is(":visible")) {
        if ($('#ddlBranch').val() != '' || $('#ddl_Month').val() != '' || $('#txt_Year').val() != '') {
            if ($('#ddl_Month').val() != '') {
                if ($('#txt_Year').val() != '') {
                    BindEmployeeSaleryApproveList('tbody_SalaryApproveListEmployeeWise', 'tblSalaryApproveEmployeeWise', $('#ddlBranch').val(), $('#ddl_Month').val(), $('#txt_Year').val(), $('#ddlEmployee').val(), $('#ddlSalaryType').val(), 'N');
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
    else {
        if ($('#ddlMonth').val() != '') {


            if ($('#txtYear').val() == '') {
                chkYear = 0;
            }
        }

        if ($('#ddl_Branch').val() != '' || $('#ddlMonth').val() != '' || $('#txtYear').val() != '' || $('#ddl_Employee').val() != '') {
            if (chkMonth == 1) {
                if (chkYear == 1) {
                    BindEmployeeSaleryApproveList('tbody_Employee_SalaryApproveList', 'tblEmployeeSalaryApproveList', $('#ddl_Branch').val(), $('#ddlMonth').val(), $('#txtYear').val(), $('#ddl_Employee').val(), $('#ddl_SalaryType').val(), 'Y');
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

}




function BindEmployeeSaleryApproveList(tbodyid, tbl_id, branchid, month, year, empid, SalaryType, SalaryApprove) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryReport_1.aspx/FetchEmployeSalaryApproveList',
        data: JSON.stringify({
            "branchid": branchid,
            "month": month,
            "year": year,
            "EmployeeId": empid,
            "SalaryType": SalaryType,
            "SalaryApprove": SalaryApprove
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
            var i_temp = 0;
            for (var i = 0; i < data.length; i++) {
                i_temp = i_temp + 1;
                html = html + '<tr><td><input type="checkbox" class="editor-active" value="' + data[i].Id + '"></td>'
                    + '<td>' + i_temp + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                 //   + '<td>' + (data[i].Year != undefined ? data[i].DOJ : '') + '</td>'
                    + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ : '') + '</td>'
                //   + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ.format('dd/mm/yyyy') : '') + '</td>'

                    + '<td>' + (data[i].AdharNo != undefined ? data[i].AdharNo : '') + '</td>'
                    + '<td>' + (data[i].BasicRate != undefined ? data[i].BasicRate.toFixed(2) : '') + '</td>'
                   // + '<td>' + (data[i].BasicRate != undefined ? data[i].BasicRateRound : '') + '</td>'
                    + '<td>' + (data[i].OtherAllownce != undefined ? data[i].OtherAllownceTemp.toFixed(2) : '') + '</td>'
                    + '<td>' + (data[i].OT_TotalAmt != undefined ? data[i].OT_TotalAmt.toFixed(2) : '') + '</td>'
                    + '<td>' + (data[i].SUMMER_A != undefined ? data[i].SUMMER_A.toFixed(2) : '') + '</td>'
                    + '<td>' + (data[i].LoanEmiAmount != undefined ? data[i].LoanEmiAmount.toFixed(2) : '') + '</td>'
                    + '<td>' + (data[i].Absent != undefined ? data[i].Absent.toFixed(2) : '') + '</td>'
                    + '<td>' + (data[i].Sunday != undefined ? data[i].NetPayTemp.toFixed(2) : '') + '</td>'
                 //   + '<td>' + (data[i].Holiday != undefined ? data[i].Holiday : '') + '</td>'
                 //   + '<td>' + (data[i].Total_2ndSaturday != undefined ? data[i].Total_2ndSaturday : '') + '</td>'
               //     + '<td>' + (data[i].Total_4thSaturday != undefined ? data[i].Total_4thSaturday : '') + '</td>'
               //     + '<td>' + (data[i].GrossRate != undefined ? data[i].GrossRate : '') + '</td>'
               //     + '<td>' + (data[i].BasicRate != undefined ? data[i].BasicRate : '') + '</td>'
                //    + '<td>' + (data[i].BasicPay != undefined ? data[i].BasicPay : '') + '</td>'
               //     + '<td>' + (data[i].DaPercentage != undefined ? data[i].DaPercentage : '') + '</td>'
                //    + '<td>' + (data[i].DaAmt != undefined ? data[i].DaAmt : '') + '</td>'
               //     + '<td>' + (data[i].HraPercentage != undefined ? data[i].HraPercentage : '') + '</td>'
               //     + '<td>' + (data[i].HraAmt != undefined ? data[i].HraAmt : '') + '</td>'
               //     + '<td>' + (data[i].TA_Perday != undefined ? data[i].TA_Perday : '') + '</td>'
               //     + '<td>' + (data[i].TA_Total != undefined ? data[i].TA_Total : '') + '</td>'
               //     + '<td>' + (data[i].MedicalAllowPerDay != undefined ? data[i].MedicalAllowPerDay : '') + '</td>'
              //      + '<td>' + (data[i].MedicalAllowTotal != undefined ? data[i].MedicalAllowTotal : '') + '</td>'
              //      + '<td>' + (data[i].UniformAllowPerMonth != undefined ? data[i].UniformAllowPerMonth : '') + '</td>'
               //     + '<td>' + (data[i].OtherAllownce != undefined ? data[i].OtherAllownce : '') + '</td>'
              //      + '<td>' + (data[i].SPLAL_Percentage != undefined ? data[i].SPLAL_Percentage : '') + '</td>'
              //      + '<td>' + (data[i].SPLAL_Amt != undefined ? data[i].SPLAL_Amt : '') + '</td>'
             //       + '<td>' + (data[i].EDUAL_Percentage != undefined ? data[i].EDUAL_Percentage : '') + '</td>'
               //     + '<td>' + (data[i].EDUAL_Amt != undefined ? data[i].EDUAL_Amt : '') + '</td>'
               //     + '<td>' + (data[i].MobileAllowancePercentage != undefined ? data[i].MobileAllowancePercentage : '') + '</td>'
               //     + '<td>' + (data[i].MobileAllowanceAmt != undefined ? data[i].MobileAllowanceAmt : '') + '</td>'
               //     + '<td>' + (data[i].LTA_Percentage != undefined ? data[i].LTA_Percentage : '') + '</td>'
              //      + '<td>' + (data[i].LTA_Amt != undefined ? data[i].LTA_Amt : '') + '</td>'
              //      + '<td>' + (data[i].STIP_Percentage != undefined ? data[i].STIP_Percentage : '') + '</td>'
               //     + '<td>' + (data[i].STIP_Amt != undefined ? data[i].STIP_Amt : '') + '</td>'
               //     + '<td>' + (data[i].BonusPercentage != undefined ? data[i].BonusPercentage : '') + '</td>'
               //     + '<td>' + (data[i].BonusAmt != undefined ? data[i].BonusAmt : '') + '</td>'

               //     + '<td>' + (data[i].BonusAmt != undefined ? data[i].OT_TotalDay : '') + '</td>'
               //     + '<td>' + (data[i].BonusAmt != undefined ? data[i].OT_TotalAmt : '') + '</td>'

               //     + '<td>' + (data[i].GROSS_TOTAL != undefined ? data[i].GROSS_TOTAL : '') + '</td>'
                //    + '<td>' + (data[i].GratuityPercentage != undefined ? data[i].GratuityPercentage : '') + '</td>'
                //    + '<td>' + (data[i].GratuityAmt != undefined ? data[i].GratuityAmt : '') + '</td>'
                //    + '<td>' + (data[i].PF_EmployerPercentage != undefined ? data[i].PF_EmployerPercentage : '') + '</td>'
                //    + '<td>' + (data[i].PF_EmployerValue != undefined ? data[i].PF_EmployerValue : '') + '</td>'
                //    + '<td>' + (data[i].PF_EmployeesPercentage != undefined ? data[i].PF_EmployeesPercentage : '') + '</td>'
                //    + '<td>' + (data[i].PF_EmployeesValue != undefined ? data[i].PF_EmployeesValue : '') + '</td>'
                //    + '<td>' + (data[i].AdminChargesPercentage != undefined ? data[i].AdminChargesPercentage : '') + '</td>'
                //    + '<td>' + (data[i].AdminChargesAmount != undefined ? data[i].AdminChargesAmount : '') + '</td>'
                 //   + '<td>' + (data[i].ESI_EmployerPercentage != undefined ? data[i].ESI_EmployerPercentage : '') + '</td>'
                 //   + '<td>' + (data[i].ESI_EmployerValue != undefined ? data[i].ESI_EmployerValue : '') + '</td>'
                 //   + '<td>' + (data[i].ESI_EmployeesPercentage != undefined ? data[i].ESI_EmployeesPercentage : '') + '</td>'
                 //   + '<td>' + (data[i].ESI_EmployeesValue != undefined ? data[i].ESI_EmployeesValue : '') + '</td>'
                 //   + '<td>' + (data[i].PT != undefined ? data[i].PT : '') + '</td>'
                    //=======by MK====================================
                 //   + '<td>' + (data[i].LoanApplicationId != undefined ? data[i].LoanApplicationId : '') + '</td>'  // loan app id
                //    + '<td>' + (data[i].LoanEmiAmount != undefined ? data[i].LoanEmiAmount : '') + '</td>'  //  emi amt
                    //============================================
                //    + '<td>' + (data[i].NetPay != undefined ? data[i].NetPay : '') + '</td>'
                //    + '<td>' + (data[i].SalaryApprove != undefined ? data[i].SalaryApprove : '') + '</td>'
                //    + '<td>' + (data[i].SalaryPayment != undefined ? data[i].SalaryPayment : '') + '</td></tr>';
            }
//==================original ========================
            /*
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active" value="' + data[i].Id + '"></td>'
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

                    + '<td>' + (data[i].BonusAmt != undefined ? data[i].OT_TotalDay : '') + '</td>'
                    + '<td>' + (data[i].BonusAmt != undefined ? data[i].OT_TotalAmt : '') + '</td>'

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
                    //============================================
                    + '<td>' + (data[i].NetPay != undefined ? data[i].NetPay : '') + '</td>'
                    + '<td>' + (data[i].SalaryApprove != undefined ? data[i].SalaryApprove : '') + '</td>'
                    + '<td>' + (data[i].SalaryPayment != undefined ? data[i].SalaryPayment : '') + '</td></tr>';
            }
*/
//============================================
            $('#' + tbodyid).html(html);
            var d = new Date();
            if ($("#btnSave").is(":visible")) {
                var table = $('#' + tbl_id).DataTable({
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
                    }
                });

                $('#SalaryApprove-select-all').on('click', function () {
                    // Check/uncheck all checkboxes in the table
                    var rows = table.rows({ 'search': 'applied' }).nodes();
                    $('input[type="checkbox"]', rows).prop('checked', this.checked);
                });

                $('#tblSalaryApproveEmployeeWise tbody').on('change', 'input[type="checkbox"]', function () {
                    // If checkbox is not checked
                    if (!this.checked) {
                        var el = $('#SalaryApprove-select-all').get(0);
                        // If "Select all" control is checked and has 'indeterminate' property
                        if (el && el.checked && ('indeterminate' in el)) {
                            // Set visual state of "Select all" control 
                            // as 'indeterminate'
                            el.indeterminate = true;
                        }
                    }
                });



                $('#btnSave').click(function (event) {
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
                                alertify.confirm('Confirm Salary Approve', 'Are you sure, you want to approve the selected salary?', function () { UpdateSalaryApprove(id); }
                                    , function () { });
                            }
                            cnt1 = cnt1 + 1;
                        }
                    });


                });
            }
            else {

                var table = $('#' + tbl_id).DataTable({
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

                $('#tblEmployeeSalaryApproveList tbody').on('change', 'input[type="checkbox"]', function () {
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
                                alertify.confirm('Confirm Salary Reject', 'Are you sure, you want to reject the selected approved salary?', function () { RejectSalaryApprove(id); }
                                    , function () { });


                            }
                            cnt1 = cnt1 + 1;
                        }
                    });


                });



                $('#btnExportPDF').click(function (event) {
                    var id = '';
                    var file_name = '';
                    // Iterate over all checkboxes in the table
                    table.$('input[type="checkbox"]').each(function () {
                        var cnt = table.$('input:checkbox:checked').length;
                        var cnt1 = 1;
                        if (this.checked) {
                            id = this.value;
                            $.ajax({
                                type: "POST",
                                url: 'wfHrEmpSalaryApprove.aspx/SalaryExportToPDF',
                                data: JSON.stringify({
                                    "id": id
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function () {

                                },
                                success: function (response) {
                                    cnt1 = cnt1 + 1;
                                    var data = JSON.parse(response.d);
                                    $('#lblMonthYear').text(data[0].MonthYear);
                                    $('#lblName').text(data[0].EmpName);
                                    $('#lblDesignation').text(data[0].DesignationName);
                                    $('#lblDepartment').text(data[0].DeptName);
                                    $('#lblEmpNo').text(data[0].CardNo);
                                    $('#lblTotalDays').text(data[0].TotalDay);
                                    $('#lblTotalPaidDays').text(data[0].EarnDay);
                                    $('#lblLWP').text(data[0].LWP);
                                    $('#lblBasic').text(data[0].BasicRate);
                                    $('#lblPFEmployee').text(data[0].PF_EmployeesValue);
                                    $('#lblHRA').text(data[0].HraAmt);
                                    $('#lblESIEmployee').text(data[0].ESI_EmployeesValue);
                                    $('#lblSPLAllownce').text(data[0].SPLAL_Amt);
                                    $('#lblLWP1').text(data[0].LWP);
                                    $('#lblOther').text(data[0].OtherAllownce);
                                    $('#lblPT').text(data[0].PT);
                                    $('#lblTotalAlownc').text(data[0].TotalAllow);
                                    $('#lblAdvance').text(data[0].Advance);
                                    $('#lblGrossSalary').text(data[0].GrossSalary);
                                    $('#lblDeduction').text(data[0].TotalDeduct);
                                    $('#lblLeave').text(data[0].Leave);
                                    $('#lblBonus').text(data[0].BonusAmt);
                                    $('#lblAnualBenefit').text(data[0].AnualBenefit);
                                    $('#lblNetSalary').text(data[0].NetAmnt);
                                    $('#lblGrossSalaryPM').text(data[0].GROSS_TOTAL);
                                    $('#lblGrossSalaryPA').text(data[0].GROSS_TOTAL_PA);
                                    file_name = 'Pay Slip - ' + data[0].EmpId + ' - ' + data[0].MonthYear + '.pdf';
                                    $('#tblExportPDF').show();
                                    html2canvas($('#tblExportPDF')[0], {
                                        onrendered: function (canvas) {
                                            var data = canvas.toDataURL();
                                            var docDefinition = {
                                                content: [{
                                                    image: data,
                                                    width: 500
                                                }]
                                            };
                                            pdfMake.createPdf(docDefinition).download(file_name);
                                        }
                                    });
                                    if (cnt == cnt1) {
                                        setTimeout(function () {
                                            $('#tblExportPDF').hide();
                                        }, 15);

                                    }

                                },
                                complete: function () {

                                },
                                failure: function (jqXHR, textStatus, errorThrown) {

                                }
                            });



                        }
                    });


                });


            }


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function RejectSalaryApprove(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryReport_1.aspx/RejectSalaryApprove',
        data: JSON.stringify({
            "id": id,
            "loginuser": $('#ContentPlaceHolder1_loginuser').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            alertify.success("Salary approve rejected successfully");
            $('#example-select-all').prop('checked', false);
            SearchEmployeeSaleryApprove();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function UpdateSalaryApprove(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryReport_1.aspx/UpdateSalaryApprove',
        data: JSON.stringify({
            "id": id,
            "loginuser": $('#ContentPlaceHolder1_loginuser').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            alertify.success("Salary approved successfully");
            // ClearAll();
            $('#SalaryApprove-select-all').prop('checked', false);
            SearchEmployeeSaleryApprove();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function ExportToPDF() {
    $('#tblExportPDF').show();
    html2canvas($('#tblExportPDF')[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("Table.pdf");
        }
    });

    setTimeout(function () {
        $('#tblExportPDF').hide();
    }, 15);

}