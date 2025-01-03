$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlEmployee').select2();
    BindEmployeeCTCList();
    BindEmployeeDropdown();
    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $('.dcmlNegNo').keypress(function (event) {
        var currentVal = $(this).val();
        var hasDecimal = currentVal.indexOf('.') !== -1;
        var hasNegativeSign = currentVal.indexOf('-') !== -1;

        if (
            (event.which !== 45 && event.which !== 46 && (event.which < 48 || event.which > 57)) || // Allow numbers, decimal point (46), and minus sign (45)
            (event.which === 45 && hasNegativeSign) || // Prevent more than one minus sign
            (event.which === 46 && hasDecimal) // Prevent more than one decimal point
        ) {
            event.preventDefault();
        }
    });

    $('.prcnt').bind("change", function (element) {
        if ($('#txtBasicMonthly').val() != '') {
            if ($('#' + element.currentTarget.id).val() != '') {
                var prcnt = 0;
                var mnthly = 0;
                var basicAmnt = 0;
                basicAmnt = parseFloat($('#txtBasicMonthly').val());
                prcnt = parseFloat($('#' + element.currentTarget.id).val());
                mnthly = (basicAmnt * prcnt) / 100;
                $('#' + element.currentTarget.id.replace('Percent', 'Monthly')).val(mnthly.toFixed(2));
                $('#' + element.currentTarget.id.replace('Percent', 'Yearly')).val((mnthly * 12).toFixed(2));

            }
            else {
                $('#' + element.currentTarget.id).val('0');
                $('#' + element.currentTarget.id.replace('Percent', 'Monthly')).val('0.00');
                $('#' + element.currentTarget.id.replace('Percent', 'Yearly')).val('0.00');
            }
        }
        else {
            $('#' + element.currentTarget.id).val('0');
            $('#' + element.currentTarget.id.replace('Percent', 'Monthly')).val('0.00');
            $('#' + element.currentTarget.id.replace('Percent', 'Yearly')).val('0.00');
        }
        CalculateAmnt();
    });
        
});
//var loanAppId = "";
function ViewFile(Id) {
    if (Id) {
        window.open("wfHrEmpSalaryIncrement_display.aspx?id=" + Id);
    }
} 
function calEsi() {
    if ($('#txtESIEmployerPercentEarn').val() != '') {
        var mon = 0; var tot = 0; var esi = 0; var esiempdeduct = 0; var esiemprdeduct = 0;
        var monesiempdeduct = 0; var monesiemprdeduct = 0;
        esi = parseFloat($('#txtESIEmployerPercentEarn').val());
        esiempdeduct = parseFloat($('#txtESIEmployeesPercentDeduct').val());
        esiemprdeduct = parseFloat($('#txtESIEmployerPercentDeduct').val());
        tot = parseFloat($('#txtTotalMonthly').val());
        mon = (tot * esi) / 100;
        monesiempdeduct = (tot * esiempdeduct) / 100;
        monesiemprdeduct = (tot * esiemprdeduct) / 100;
        $('#txtESIEmployerMonthlyEarn').val(mon.toFixed(2));
        $('#txtESIEmployerYearlyEarn').val((mon * 12).toFixed(2));
        $('#txtESIEmployeesMonthlyDeduct').val(monesiempdeduct.toFixed(2));
        $('#txtESIEmployeesYearlyDeduct').val((monesiempdeduct * 12).toFixed(2));
        $('#txtESIEmployerMonthlyDeduct').val(monesiemprdeduct.toFixed(2));
        $('#txtESIEmployerYearlyDeduct').val((monesiemprdeduct * 12).toFixed(2));
    }
}
function IncrementAmt() {
    var basic = $('#txtBasicMonthly').val() === '' ? 0 : $('#txtBasicMonthly').val();
    var incrvalue = $('#txtIncreamentMonthly').val() === '' ? 0 : $('#txtIncreamentMonthly').val();
    var percentage = (parseFloat(incrvalue) / parseFloat(basic)) * 100;
    $('#txtIncreamentPercent').val(percentage.toFixed(2));
    $('#txtBasicMonthly').val(parseFloat(basic) + parseFloat(incrvalue));
    CalculateAmnt();
}
function Incrementprct() {
    var basic = $('#txtBasicMonthly').val() === '' ? 0 : $('#txtBasicMonthly').val();
    var incrvalue = $('#txtIncreamentPercent').val() === '' ? 0 : $('#txtIncreamentPercent').val();
    var incrval = (parseFloat(basic) * parseFloat(incrvalue)) / 100;
    $('#txtIncreamentMonthly').val(incrval.toFixed(2));
    $('#txtBasicMonthly').val(parseFloat(basic) + parseFloat($('#txtIncreamentMonthly').val()));
    CalculateAmnt();
}
function CalculateAmnt() {
    var basicAmnt = 0;
    var totalAmnt = 0;
    var CTCAmnt = 0;
    var totalDeduct = 0;
    var netPay = 0;
    var TDSAmnt = 0;
    if ($('#txtBasicMonthly').val() != '') {
        basicAmnt = parseFloat($('#txtBasicMonthly').val());

    }
    else {
        $('#txtBasicMonthly').val('0.00');
    }
    $('#txtBasicYearly').val((basicAmnt * 12).toFixed(2));

    if ($('#txtTransportAllowanceDaily').val() != '') {
        $('#txtTransportAllowanceMonthly').val((parseFloat($('#txtTransportAllowanceDaily').val()) * 30).toFixed(2));
        $('#txtTransportAllowanceYearly').val((parseFloat($('#txtTransportAllowanceDaily').val()) * 30 * 12).toFixed(2));
    }
    else {
        $('#txtTransportAllowanceDaily').val('0.00');
        $('#txtTransportAllowanceMonthly').val('0.00');
        $('#txtTransportAllowanceYearly').val('0.00');
    }


    if ($('#txtMedicalAllowanceDaily').val() != '') {
        $('#txtMedicalAllowanceMonthly').val((parseFloat($('#txtMedicalAllowanceDaily').val()) * 30).toFixed(2));
        $('#txtMedicalAllowanceYearly').val((parseFloat($('#txtMedicalAllowanceDaily').val()) * 30 * 12).toFixed(2));
    }
    else {
        $('#txtMedicalAllowanceDaily').val('0.00');
        $('#txtMedicalAllowanceMonthly').val('0.00');
        $('#txtMedicalAllowanceYearly').val('0.00');
    }

    if ($('#txtUniformAllowanceMonthly').val() != '') {
        $('#txtUniformAllowanceYearly').val((parseFloat($('#txtUniformAllowanceMonthly').val()) * 12).toFixed(2));
    }
    else {
        $('#txtUniformAllowanceMonthly').val('0.00');
        $('#txtUniformAllowanceYearly').val('0.00');
    }

    if ($('#txtOtherAllowanceMonthly').val() != '') {
        $('#txtOtherAllowanceYearly').val((parseFloat($('#txtOtherAllowanceMonthly').val()) * 12).toFixed(2));
    }
    else {
        $('#txtOtherAllowanceMonthly').val('0.00');
        $('#txtOtherAllowanceYearly').val('0.00');
    }

    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryIncrement.aspx/FetchPTaxDetails',
        data: JSON.stringify({
            "amnt": basicAmnt
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#txtPTMonthly').val(data[0].AmtValue);

            if ($('#txtPTMonthly').val() != '') {
                $('#txtPTYearly').val((parseFloat($('#txtPTMonthly').val()) * 12).toFixed(2));
            }
            else {
                $('#txtPTMonthly').val('0.00');
                $('#txtPTYearly').val('0.00');
            }
            $(".prcnt").each(function (index, element) {
                if ($('#' + element.id).val() != '') {
                    var prcnt = 0;
                    var mnthly = 0;
                    prcnt = parseFloat($('#' + element.id).val());
                    mnthly = (basicAmnt * prcnt) / 100;
                    $('#' + element.id.replace('Percent', 'Monthly')).val(mnthly.toFixed(2));
                    $('#' + element.id.replace('Percent', 'Yearly')).val((mnthly * 12).toFixed(2));

                    if (element.id == 'txtGratuityPercentEarn') {
                        $('#txtGratuityPercentDeduct').val($('#txtGratuityPercentEarn').val());
                        $('#txtGratuityMonthlyDeduct').val($('#txtGratuityMonthlyEarn').val());
                        $('#txtGratuityYearlyDeduct').val($('#txtGratuityYearlyEarn').val());
                    }
                }
                else {
                    $('#' + element.id).val('0');
                    $('#' + element.id.replace('Percent', 'Monthly')).val('0.00');
                    $('#' + element.id.replace('Percent', 'Yearly')).val('0.00');

                    if (element.id == 'txtGratuityPercentEarn') {
                        $('#txtGratuityPercentDeduct').val('0');
                        $('#txtGratuityMonthlyDeduct').val('0.00');
                        $('#txtGratuityYearlyDeduct').val('0.00');
                    }
                }
            });
            
            totalAmnt = basicAmnt + parseFloat($('#txtDAMonthly').val()) + parseFloat($('#txtHRAMonthly').val()) + parseFloat($('#txtSPLALMonthly').val()) + parseFloat($('#txtEDUALMonthly').val()) + parseFloat($('#txtLTAMonthly').val()) + parseFloat($('#txtSTIPMonthly').val()) + parseFloat($('#txtMobileAllowanceMonthly').val()) + parseFloat($('#txtBonusMonthly').val()) + parseFloat($('#txtTransportAllowanceMonthly').val()) + parseFloat($('#txtMedicalAllowanceMonthly').val()) + parseFloat($('#txtUniformAllowanceMonthly').val()) + parseFloat($('#txtOtherAllowanceMonthly').val());
            //totalAmnt = totalAmnt + parseFloat($('#txtIncreamentMonthly').val());
            $('#txtTotalMonthly').val(totalAmnt.toFixed(2));
            $('#txtTotalYearly').val((totalAmnt * 12).toFixed(2));
            calEsi();
            CTCAmnt = totalAmnt + parseFloat($('#txtGratuityMonthlyEarn').val()) + parseFloat($('#txtPFEmployerMonthlyEarn').val()) + parseFloat($('#txtESIEmployerMonthlyEarn').val());
            $('#txtCTCMonthly').val(CTCAmnt.toFixed(2));
            $('#txtCTCYearly').val((CTCAmnt * 12).toFixed(2));

            TDSAmnt = ((totalAmnt * parseFloat($('#txtTDSPercent').val())) / 100);
            $('#txtTDSMonthly').val(TDSAmnt.toFixed(2));
            $('#txtTDSYearly').val((TDSAmnt * 12).toFixed(2));

            totalDeduct = parseFloat($('#txtPFEmployeesMonthlyDeduct').val()) + parseFloat($('#txtPFEmployerMonthlyDeduct').val()) + parseFloat($('#txtESIEmployeesMonthlyDeduct').val()) + parseFloat($('#txtESIEmployerMonthlyDeduct').val()) + parseFloat($('#txtGratuityMonthlyDeduct').val()) + parseFloat($('#txtTDSMonthly').val()) + parseFloat($('#txtPTMonthly').val());
            $('#txtTotalDeductMonthly').val(totalDeduct.toFixed(2));
            $('#txtTotalDeductYearly').val((totalDeduct * 12).toFixed(2));

            netPay = CTCAmnt - totalDeduct;
            $('#txtNetPayMonthly').val(netPay.toFixed(2));
            $('#txtNetPayYearly').val((netPay * 12).toFixed(2));

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}
function CreateEmployeeCTC() {
    ClearAll();
    $('#divEmployeeCTCList').hide();
    $('#divEmployeeCTCEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    BindEmployeeDropdown();
}
function ViewEmployeeCTCList() {
    //$('#btnViewFile').hide();
    $('#divEmployeeCTCList').show();
    $('#divEmployeeCTCEntry').hide();
    $('#btnSave').hide();
    BindEmployeeCTCList();
}

function ClearAll() {
    //$('#btnViewFile').hide();
    $('.dcmlNo').val('0.00');
    $('.dcmlNegNo').val('0.00');
    $('#txtEmpName').val('');
    $('#ddlEmployee').select2('destroy');
    $('#ddlEmployee').html('<option value="">-Select Employee-</option>');
    $('#ddlEmployee').select2();
    $('#txtPFEmployeesPercentDeduct').attr('readonly', 'readonly');
    $('#txtTDSPercent').attr('readonly', 'readonly');
}

function BindEmployeeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryIncrement.aspx/EmployeeMasterList',
        data: JSON.stringify({
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
            $('#ddlEmployee').html(emp);
            $('#ddlEmployee').select2();
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            var a = '';
        }
    });

}
function FetchEmpCTCDetails() {
    $('.dcmlNo').val('0.00');
    $('#txtPFEmployeesPercentDeduct').attr('readonly', 'readonly');
    $('#txtEmpName').val('');
    $('#txtTDSPercent').attr('readonly', 'readonly');

        $.ajax({
            type: "POST",
            url: 'wfHrEmpSalaryIncrement.aspx/FetchEmpCTCDetails',
            data: JSON.stringify({
                "EmpId": $('#ddlEmployee').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtBasicMonthly').val(data[0].basic_amnt);
                $('#txtCTCId').val(data[0].CTCId);
                $('#txtDAPercent').val(data[0].DA);
                $('#txtHRAPercent').val(data[0].HRA);
                $('#txtPFEmployerPercentEarn').val(data[0].PF_Employer);
                $('#txtPFEmployerPercentDeduct').val(data[0].PF_Employer);
                $('#txtPFEmployeesPercentDeduct').val(data[0].PF_Employee);
                $('#txtESIEmployerPercentEarn').val(data[0].ESI_Employer);
                $('#txtESIEmployerPercentDeduct').val(data[0].ESI_Employer);
                $('#txtESIEmployeesPercentDeduct').val(data[0].ESI_Employee);
                $('#txtTDSPercent').val(data[0].TDS);
                $('#txtPTMonthly').val(data[0].PTax);
                $('#txtEmpName').val(data[0].EmpName);
                if (data[0].AllowPF == '1') {
                    $('#txtPFEmployeesPercentDeduct').removeAttr('readonly');
                }

                if (data[0].AllowTDS == '1') {
                    $('#txtTDSPercent').removeAttr('readonly');
                }

                CalculateAmnt();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
}

function AddEmployeeCTC() {
    if ($('#ddlEmployee').val() != '') {
         if ($('#txtBasicMonthly').val() != '') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpSalaryIncrement.aspx/AddEmployeeSalaryIncreament',
                        data: JSON.stringify({
                            "EmpId": $('#ddlEmployee').val(),
                            "BasicIncrementPercent": $('#txtIncreamentPercent').val(),
                            "BasicIncrementValue": $('#txtIncreamentMonthly').val(),
                            "BasicRate": $('#txtBasicMonthly').val(),
                            "DAPercent": $('#txtDAPercent').val(),
                            "DAAmnt": $('#txtDAMonthly').val(),
                            "HRAPercent": $('#txtHRAPercent').val(),
                            "HRAAmnt": $('#txtHRAMonthly').val(),
                            "SPLALPercent": $('#txtSPLALPercent').val(),
                            "SPLALAmnt": $('#txtSPLALMonthly').val(),
                            "EDUALPercent": $('#txtEDUALPercent').val(),
                            "EDUALAmnt": $('#txtEDUALMonthly').val(),
                            "MobileAllowancePercent": $('#txtMobileAllowancePercent').val(),
                            "MobileAllowanceAmnt": $('#txtMobileAllowanceMonthly').val(),
                            "LTAPercent": $('#txtLTAPercent').val(),
                            "LTAAmnt": $('#txtLTAMonthly').val(),
                            "STIPPercent": $('#txtSTIPPercent').val(),
                            "STIPAmnt": $('#txtSTIPMonthly').val(),
                            "BonusPercent": $('#txtBonusPercent').val(),
                            "BonusAmnt": $('#txtBonusMonthly').val(),
                            "GratuityPercent": $('#txtGratuityPercentEarn').val(),
                            "GratuityAmnt": $('#txtGratuityMonthlyEarn').val(),
                            "TotalEarn": $('#txtTotalMonthly').val(),
                            "PFEmployerPercent": $('#txtPFEmployerPercentEarn').val(),
                            "PFEmployerAmnt": $('#txtPFEmployerMonthlyEarn').val(),
                            "PFEmployeePercent": $('#txtPFEmployeesPercentDeduct').val(),
                            "PFEmployeeAmnt": $('#txtPFEmployeesMonthlyDeduct').val(),
                            "ESIEmployerPercent": $('#txtESIEmployerPercentEarn').val(),
                            "ESIEmployerAmnt": $('#txtESIEmployerMonthlyEarn').val(),
                            "ESIEmployeePercent": $('#txtESIEmployeesPercentDeduct').val(),
                            "ESIEmployeeAmnt": $('#txtESIEmployeesMonthlyDeduct').val(),
                            "CTCAmnt": $('#txtCTCMonthly').val(),
                            "PTAmnt": $('#txtPTMonthly').val(),
                            "TDSPercent": $('#txtTDSPercent').val(),
                            "TDSAmnt": $('#txtTDSMonthly').val(),
                            "TotalDeduct": $('#txtTotalDeductMonthly').val(),
                            "NetPayAmnt": $('#txtNetPayMonthly').val(),
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "TA_Perday": $('#txtTransportAllowanceDaily').val(),
                            "MedicalAllowPerDay": $('#txtMedicalAllowanceDaily').val(),
                            "UniformAllowPerMonth": $('#txtUniformAllowanceMonthly').val(),
                            "OtherAllownce": $('#txtOtherAllowanceMonthly').val(),
                            "CTCId": $('#txtCTCId').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            console.log(response);
                            alertify.success('Salary Increament added successfully');
                            ClearAll();
                            BindEmployeeDropdown();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
         }
         else {
                    alertify.error('Please enter basic amount');
         }
            
    }
    else {
        alertify.error('Please select any employee');
    }

}

function BindEmployeeCTCList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryIncrement.aspx/FetchEmployeCTCList',
        data: JSON.stringify({

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmployeeCTCList').DataTable().clear();
            $('#tblEmployeeCTCList').DataTable().destroy();
            $('#tbody_Employee_CTCList').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                //html = html + '<tr onclick="FetchEmpSalaryIncreamentDetails(\'' + data[i].Id + '\')"><td>' + data[i].EmpId + '</td>'
                html = html + '<tr>'
                    +'<td><a href="#" onclick="ViewFile(' + data[i].Id + ')"><i class="fa fa-file"></i></a></td>'
                    + '<td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + (data[i].BasicRate) + '</td>'
                    + '<td>' + ((parseFloat(data[i].BasicRate) * 12).toFixed(2)) + '</td>'
                    + '<td>' + (data[i].BasicIncrementPercent) + '</td>'
                    + '<td>' + (data[i].BasicIncrementValue) + '</td>'
                    + '<td>' + ((parseFloat(data[i].BasicIncrementValue) * 12).toFixed(2)) + '</td>'
                    + '<td>' + (data[i].HraPercentage) + '</td>'
                    + '<td>' + (data[i].HraAmt) + '</td>'
                    + '<td>' + ((parseFloat(data[i].HraAmt) * 12).toFixed(2)) + '</td>'
                    + '<td>' + (data[i].TotalEarning) + '</td>'
                    + '<td>' + ((parseFloat(data[i].TotalEarning) * 12).toFixed(2)) + '</td></tr>' ;
            }
            $('#tbody_Employee_CTCList').html(html);
            $('#tblEmployeeCTCList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchEmpSalaryIncreamentDetails(id) {
    //loanAppId = id;
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryIncrement.aspx/FetchEmployeeCTCDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divEmployeeCTCList').hide();
            $('#divEmployeeCTCEntry').show();
            $('#btnSave').show();
            $('#btnViewFile').show();
            var data = JSON.parse(response.d);
            $('#ddlEmployee').select2('destroy');
            $('#ddlEmployee').html('<option value="' + data[0].EmpId + '">' + data[0].EmpName + ' (' + data[0].EmpId + ')</option>');
            $('#ddlEmployee').select2();
            $('#txtEmpName').val(data[0].EmpName);
            $('#txtBasicMonthly').val(data[0].BasicRate);
            $('#txtIncreamentPercent').val(data[0].BasicIncrementPercent);
            $('#txtIncreamentMonthly').val(data[0].BasicIncrementValue);
            $('#txtHRAPercent').val(data[0].HraPercentage);
            $('#txtDAPercent').val(data[0].DaPercentage);
            $('#txtSPLALPercent').val(data[0].SPLAL_Percentage);
            $('#txtEDUALPercent').val(data[0].EDUAL_Percentage);
            $('#txtCTCId').val(data[0].CTCId);
            $('#txtLTAPercent').val(data[0].LTA_Percentage);
            $('#txtSTIPPercent').val(data[0].STIP_Percentage);
            $('#txtMobileAllowancePercent').val(data[0].MobileAllowancePercentage);
            $('#txtBonusPercent').val(data[0].BonusPercentage);
            $('#txtGratuityPercentEarn').val(data[0].GratuityPercentage);
            $('#txtGratuityPercentDeduct').val(data[0].GratuityPercentage);

            $('#txtPFEmployerPercentEarn').val(data[0].PF_EmployerPercentage);
            $('#txtESIEmployerPercentEarn').val(data[0].ESI_EmployerPercentage);
            $('#txtPFEmployeesPercentDeduct').val(data[0].PF_EmployeesPercentage);
            $('#txtPFEmployerPercentDeduct').val(data[0].PF_EmployerPercentage);
            $('#txtESIEmployeesPercentDeduct').val(data[0].ESI_EmployeesPercentage);
            $('#txtESIEmployerPercentDeduct').val(data[0].ESI_EmployerPercentage);

            $('#txtTDSPercent').val(data[0].TDS_Percentage);
            $('#txtPTMonthly').val(data[0].PT);


            $('#txtTransportAllowanceDaily').val(data[0].TA_Perday);
            $('#txtMedicalAllowanceDaily').val(data[0].MedicalAllowPerDay);
            $('#txtUniformAllowanceMonthly').val(data[0].UniformAllowPerMonth);
            $('#txtOtherAllowanceMonthly').val(data[0].OtherAllownce);


            CalculateAmnt();

            if (data[0].AllowPF == 'Y') {
                $('#txtPFEmployeesPercentDeduct').removeAttr('readonly');
            }

            if (data[0].AllowTDS == 'Y') {
                $('#txtTDSPercent').removeAttr('readonly');
            }


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
