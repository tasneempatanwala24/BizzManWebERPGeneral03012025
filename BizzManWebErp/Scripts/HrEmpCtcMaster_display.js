$(document).ready(function () {
    function getQueryStringValue(name) {
        var queryString = window.location.search.substring(1);
        var queryParams = queryString.split('&');
        for (var i = 0; i < queryParams.length; i++) {
            var pair = queryParams[i].split('=');
            if (decodeURIComponent(pair[0]) === name) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
    var Id = getQueryStringValue('id');
    $.ajax({

        type: "POST",
        url: "wfHrEmpCtcMaster_display.aspx/FetchEmpployeeCTC",
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonData = JSON.parse(response.d);
            console.log(jsonData);
            populateTable(jsonData);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

    function populateTable(data) {
        var netpay = 0; var basic = 0; var daamt = 0; var hraamt = 0; var tA_perday = 0; var medical = 0; var uniform = 0;
        var other = 0; var splal = 0; var edual = 0; var lta = 0; var stip = 0; var mobile = 0; var bonus = 0; var totearn = 0;
        var gratuity = 0; var pf_emplyr = 0; var esi_emplyr = 0; var ctc = 0; var pf_emp = 0; var tds = 0; var pt = 0;
        var totdeduct = 0; var esi_emp = 0;

        netpay = data.Table1[0].NetPay; basic = data.Table1[0].BasicRate; daamt = data.Table1[0].DaAmt; hraamt = data.Table1[0].HraAmt;
        tA_perday = data.Table1[0].TA_Perday; medical = data.Table1[0].MedicalAllowPerDay; uniform = data.Table1[0].UniformAllowPerMonth;
        other = data.Table1[0].OtherAllownce; splal = data.Table1[0].SPLAL_Amt; edual = data.Table1[0].EDUAL_Amt; lta = data.Table1[0].LTA_Amt;
        stip = data.Table1[0].STIP_Amt; mobile = data.Table1[0].MobileAllowanceAmt; bonus = data.Table1[0].BonusAmt; totearn = data.Table1[0].TotalEarning;
        gratuity = data.Table1[0].GratuityAmt; pf_emplyr = data.Table1[0].PF_EmployerValue; esi_emplyr = data.Table1[0].ESI_EmployerValue;
        ctc = data.Table1[0].CTC; pf_emp = data.Table1[0].PF_EmployeesValue; tds = data.Table1[0].TdsDeduct;
        pt = data.Table1[0].PT; totdeduct = data.Table1[0].TotalDeduction; esi_emp = data.Table1[0].ESI_EmployeesValue;

        var netpayyearly = 0; basicyearly = 0; var daamtyearly = 0; var hraamtyearly = 0; var tA_perdayyarly = 0;
        var medicalyearly = 0; var uniformyearly = 0; var otheryearly = 0; var splalyearly = 0; var edualyearly = 0;
        var ltayearly = 0; var stipyearly = 0; var mobileyearly = 0; var bonusyearly = 0; var totearnyearly = 0;
        var gratuityyearly = 0; var pf_emplyryearly = 0; var esi_emplyryearly = 0; var ctcyearly = 0; var pf_empyearly = 0; var tdsyearly = 0;
        var ptyearly = 0; var totdeductyearly = 0; var esi_empyearly = 0;


        netpayyearly = netpay * 12; basicyearly = basic * 12; daamtyearly = daamt * 12; hraamtyearly = hraamt * 12;
        tA_perdayyarly = tA_perday * 12; medicalyearly = medical * 12; uniformyearly = uniform * 12; otheryearly = other * 12;
        splalyearly = splal * 12; edualyearly = edual * 12; ltayearly = lta * 12; stipyearly = stip * 12;
        mobileyearly = mobile * 12; bonusyearly = bonus * 12; totearnyearly = totearn * 12; gratuityyearly = gratuity * 12; 
        pf_emplyryearly = pf_emplyr * 12; esi_emplyryearly = esi_emplyr * 12; ctcyearly = ctc * 12; pf_empyearly = pf_emp * 12;
        tdsyearly = tds * 12; ptyearly = pt * 12; totdeductyearly = totdeduct * 12; esi_empyearly = esi_emp * 12;

        var container = $('#tableContainer');
        var tableHTML = '<table class="center" id="search_form" style="width:90%;border:solid 1px black;padding:5px;">'
            + '<tr><td colspan="2" style="text-align:center;"><b>Employee CTC</b></td></tr>'
            //+ '<tr><td colspan="4" style="text-align:center;"><img src="data:image/png;base64,' + data.Table2[0].Logo + '" style="width:150px;height:150px;"/></td></tr>'
            + '<tr><td colspan="2"><div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<div style="text-align: left; flex: 1;"><div>' + data.Table2[0].CompanyName + '</div><div>' + data.Table2[0].Address1 + '</div>' +
            '</div><div style="text-align: right;"><img src="Images/logo.png" style="width:150px;height:150px;"/></div></div></td>'
            + '</tr>'
            + '<tr><td colspan="2"><table style="width:100%;">'
            + '<tr><td><label class="control-label">Employee Name : </label></td><td style="text-align:right;">' + data.Table1[0].EmpName
            + '</td><td><label class="control-label">Address </label></td><td style="text-align:right;">' + data.Table1[0].EMPAddress + '</td></tr>'
            + '<tr><td><label class="control-label">Salary Grade </label></td><td style="text-align:right;">' + data.Table1[0].SalaryGradeName
            + '</td><td><label class="control-label">Salary Type</label></td><td style="text-align:right;">' + data.Table1[0].SalaryType + '</td></tr>'
            + '</table></td></tr>'  
            + '<tr>'
            + '<td colspan="2"><fieldset><legend>Earning</legend><table class="tbl"><tr><td style="width:33%;"></td>'
            + '<td></td><td></td><td style="text-align:center;">Monthly</td><td></td><td style="text-align:center;">Yearly</td>'
            + '</tr>'
            + '<tr><td><label class="control-label">Basic </label></td><td>'
            + '</td><td><label class="control-label">Value </label></td><td>'
            + basic.toFixed(2)
            + '</td><td> *12</td><td>'
            + basicyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">DA % </label></td><td>'
            + data.Table1[0].DaPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + daamt.toFixed(2)
            + '</td><td> *12</td><td>'
            + daamtyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">HRA %</label></td><td>'
            + data.Table1[0].HraPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + hraamt.toFixed(2)
            + '</td><td> *12</td><td>'
            + hraamtyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Transport Allowance Daily</label></td><td>'
            + tA_perday.toFixed(2)
            + '</td><td><label class="control-label">Value </label></td><td>'
            + tA_perday.toFixed(2)
            + '</td><td> *12</td><td>'
            + tA_perdayyarly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Medical Allowance Daily</label></td><td>'
            + medical.toFixed(2)
            + '</td><td><label class="control-label">Value </label></td><td>'
            + medical.toFixed(2)
            + '</td><td> *12</td><td>'
            + medicalyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Uniform Allowance</label></td><td>'
            //+ data.Table1[0].UniformAllowPerMonth
            + '</td><td><label class="control-label">Value </label></td><td>'
            + uniform.toFixed(2)
            + '</td><td> *12</td><td>'
            + uniformyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Other Allowance</label></td><td>'
            //+ data.Table1[0].OtherAllownce
            + '</td><td><label class="control-label">Value </label></td><td>'
            + other.toFixed(2)
            + '</td><td> *12</td><td>'
            + other.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">SPLAL %</label></td><td>'
            + data.Table1[0].SPLAL_Percentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + splal.toFixed(2)
            + '</td><td> *12</td><td>'
            + splalyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">EDUAL %</label></td><td>'
            + data.Table1[0].EDUAL_Percentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + edual.toFixed(2)
            + '</td><td> *12</td><td>'
            + edualyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">LTA %</label></td><td>'
            + data.Table1[0].LTA_Percentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + lta.toFixed(2)
            + '</td><td> *12</td><td>'
            + ltayearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">STIP %</label></td><td>'
            + data.Table1[0].STIP_Percentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + stip.toFixed(2)
            + '</td><td> *12</td><td>'
            + stipyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Mobile Allowance %</label></td><td>'
            + data.Table1[0].MobileAllowancePercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + medical.toFixed(2)
            + '</td><td> *12</td><td>'
            + medicalyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Bonus %</label></td><td>'
            + data.Table1[0].BonusPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + bonus.toFixed(2)
            + '</td><td> *12</td><td>'
            + bonusyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td></td><td></td>'
            + '<td>Gross</td><td>'
            + totearn.toFixed(2)
            + '</td><td> *12</td><td>'
            + totearnyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Gratuity %</label></td><td>'
            + data.Table1[0].GratuityPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + gratuity.toFixed(2)
            + '</td><td> *12</td><td>'
            + gratuityyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">PF Employer %</label></td><td>'
            + data.Table1[0].PF_EmployerPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + pf_emplyr.toFixed(2)
            + '</td><td> *12</td><td>'
            + pf_emplyryearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">ESI Employer %</label></td><td>'
            + data.Table1[0].ESI_EmployerPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + esi_emplyr.toFixed(2)
            + '</td><td> *12</td><td>'
            + esi_emplyryearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td></td><td></td>'
            + '</td><td><label class="control-label">CTC </label></td><td>'
            + ctc.toFixed(2)
            + '</td><td> *12</td><td>'
            + ctcyearly.toFixed(2)
            + '</td></tr>'
            + '</table></fieldset></td></tr><tr>'
            + '<td colspan="2"><fieldset><legend>Deduction</legend><table class="tbl">'                                           
            + '<tr><td style = "width:30%;"></td><td></td><td></td><td style="text-align:center;">Monthly</td>'
            + '<td></td><td style="text-align:center;">Yearly</td></tr> '
            + '<tr><td><label class="control-label">PF Employees %</label></td><td>'
            + data.Table1[0].PF_EmployeesPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + pf_emp.toFixed(2)
            + '</td><td> *12</td><td>'
            + pf_empyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">PF Employer %</label></td><td>'
            + data.Table1[0].PF_EmployerPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + pf_emplyr.toFixed(2)
            + '</td><td> *12</td><td>'
            + pf_emplyryearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">ESI Employees %</label></td><td>'
            + data.Table1[0].ESI_EmployeesPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + esi_emp.toFixed(2)
            + '</td><td> *12</td><td>'
            + esi_empyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">ESI Employer %</label></td><td>'
            + data.Table1[0].ESI_EmployerPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + esi_emplyr.toFixed(2)
            + '</td><td> *12</td><td>'
            + esi_emplyryearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">Gratuity %</label></td><td>'
            + data.Table1[0].GratuityPercentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + gratuity.toFixed(2)
            + '</td><td> *12</td><td>'
            + gratuityyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td><label class="control-label">TDS %</label></td><td>'
            + data.Table1[0].TDS_Percentage
            + '</td><td><label class="control-label">Value </label></td><td>'
            + tds.toFixed(2)
            + '</td><td> *12</td><td>'
            + tdsyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td></td><td></td>'
            + '</td><td><label class="control-label">PT </label></td><td>'
            + pt.toFixed(2)
            + '</td><td> *12</td><td>'
            + ptyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td colspan="3" style="text-align:right;"><label class="control-label">Total Deduction</label></td><td>'
            + totdeduct.toFixed(2)
            + '</td><td> *12</td><td>'
            + totdeductyearly.toFixed(2)
            + '</td></tr>'
            + '</table></fieldset>'          
            + '<table class="tbl">'
            + '<tr><td colspan="3" style="text-align:right;width:54%;">Net Pay</td><td>'           
            + netpay.toFixed(2)
            + '</td><td> *12</td><td>'
            + netpayyearly.toFixed(2)
            + '</td></tr>'
            + '<tr><td colspan="3" style="text-align:right;width:54%;"><b>Net Pay(In words)</b></td><td colspan="3">'
            + data.Table1[0].NetPayInWords
            + '</td></tr>'
            +'</table>'
            + '</td></tr>'
               
            //+ '<tr><td colspan="3" style="text-align:right;"><label class="control-label"><b>Gross</b></label></td><td style="text-align:right;">' + data.Table1[0].TotalEarning + '</td></tr>'
            //+ '<tr><td colspan="4" style="text-align:left;"><label class="control-label"><b>Gross(In words) </b></label>' + data.Table1[0].GrossInWords + '</td></tr>'
            tableHTML += '</tbody></table></table>';

        // Append the table to the container
        container.append(tableHTML);
        $("#tableContainer").append(container);
    }

});







