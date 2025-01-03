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
        url: "wfHrEmpSalaryPaySlip.aspx/AddPaySlipContent",
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonData = JSON.parse(response.d);
            populateTable(jsonData);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

    function populateTable(data) {
        
        var container = $('#tableContainer');

        var tableHTML = '<table class="center" id="tab2" style="width:90%;border:solid 1px black;padding:5px;"><tr><td colspan="2" style="text-align:center;"><h2>Pay Slip</h2></td></tr>'
            + '<tr><td>' + data.Table1[0].CompanyName + '<br/>' + data.Table1[0].Address1 + '<br /><b> Email:</b> ' + data.Table1[0].EmailAddress + '<br /><b>Contact:</b> ' + data.Table1[0].PhoneNo + '</td><td><img src="../Images/logo.png" style="width:150px;height:150px;float:right;" /></td></tr>'
            + '<tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr>'
            + '<tr><td colspan="2" style="text-align:center;"><h3>Pay Slip-' + data.Table2[0].Month + ' ' + data.Table2[0].Year  + '</h3></td></tr>'
            + '<tr><td colspan="2"></td></tr><tr><td colspan="2"><table id="search_form" style="width:100%;">'
            + '<tr><td><b>Name</b></td><td style="text-align:right;">' + data.Table2[0].EmpName + '</td><td><b>Emp Code</b></td><td style="text-align:right;">' + data.Table2[0].EmpId + '</td></tr>'
            + '<tr><td><b>Designation</b></td><td style="text-align:right;">' + data.Table2[0].DesignationName + '</td><td><b>PAN</b></td><td style="text-align:right;">' + data.Table2[0].PanNo + '</td></tr>'
            + '<tr><td><b>Grade</b></td><td style="text-align:right;">' + data.Table2[0].Grade + '</td><td><b>UAN No</b></td><td style="text-align:right;">' + data.Table2[0].UANNo + '</td></tr>'
            + '<tr><td><b>Department</b></td><td style="text-align:right;">' + data.Table2[0].DeptName + '</td><td><b>ESIC No</b></td><td style="text-align:right;">' + data.Table2[0].EsiNo + '</td></tr>'
            + '<tr><td><b>Joining Date</b></td><td style="text-align:right;">' + data.Table2[0].DOJ + '</td><td><b>Account No</b></td><td style="text-align:right;">' + data.Table2[0].AcNumber + '</td></tr>'
            + '<tr><td><b>Days Present</b></td><td style="text-align:right;">' + data.Table2[0].dayPresent + '</td><td><b>IFSC</b></td><td style="text-align:right;">' + data.Table2[0].IfscCode + '</td></tr>'
            + '<tr><td><b>Earn Days</b></td><td style="text-align:right;">' + data.Table2[0].EarnDay + '</td><td colspan="2"></td></tr>'
            + '</table></td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2">'
            + '<table id="search_form1" style="width:100%;"><thead><tr><td><h5>PAYMENT</h5></td><td><h5>STANDARD</h5></td><td><h5>ACTUAL</h5></td><td><h5>DEDUCTIONS</h5></td><td><h5>STANDARD</h5></td>'
            + '<td><h5>ACTUAL</h5></td></tr></thead><tbody>'
            + '<tr><td>Basic Salary</td><td></td><td style="text-align:right;">' + data.Table3[0].BasicPay + '</td><td>Provident Fund</td><td></td><td style="text-align:right;">' + data.Table3[0].PF_EmployeesValue +'</td></tr>'
            + '<tr><td>HRA</td><td></td><td style="text-align:right;">' + data.Table3[0].HraAmt + '</td><td>ESI</td><td></td><td style="text-align:right;">' + data.Table3[0].ESI_EmployeesValue +'</td></tr>'
            + '<tr><td>LTA</td><td></td><td style="text-align:right;">' + data.Table3[0].LTA_Amt + '</td><td>Profession Tax</td><td></td><td style="text-align:right;">' + data.Table3[0].PT +'</td></tr>'
            + '<tr><td>DA</td><td></td><td style="text-align:right;">' + data.Table3[0].DaAmt + '</td><td></td><td></td><td style="text-align:right;">' + '</td></tr>'
            + '<tr><td>Other Allowance</td><td></td><td style="text-align:right;">' + data.Table3[0].OtherAllownce + '</td><td>TDS</td><td></td><td style="text-align:right;">' + data.Table3[0].TDS_Deduct +'</td></tr>'
            + '<tr><td><b>TOTAL GROSS</b></td><td></td><td style="text-align:right;">' + data.Table3[0].GROSS_TOTAL + '</td><td><b>TOTAL DEDUCTIONS</b></td><td></td><td style="text-align:right;">' + data.Table3[0].TotalDeductions +'</td></tr>'
            + '<tr><td><b>PAYMENT MODE</b></td><td></td><td style="text-align:right;">' + data.Table3[0].SalaryPaymentMode + '</td><td><b>NET PAY</b></td><td></td><td style="text-align:right;">' + data.Table3[0].NetPay +'</td></tr>'
            + '<tr><td colspan="5"><b>Loan/Advance Installment(EMI) Amount: </b></td><td style="text-align:right;">' + data.Table3[0].LoanEmiAmount 
            + '</td></tr>'
            + '<tr><td colspan="5"><b>Total Amount Pay(In Words): </b>' + data.Table3[0].AmountInWords + '</td><td style="text-align:right;">' + data.Table3[0].TotalPayAfterLoanEmi 
            + '</td></tr>'
            + '<tr><td colspan="6"><b>CL Earn : </b> ' + data.Table3[0].CL_Earn + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>CL Consume : </b> '
            + data.Table3[0].CL + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>CL Balance : </b> ' + data.Table3[0].CL_ClosingBalance
            + '<br /><b>EL Earn : </b> ' + data.Table3[0].EL_Earn + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>EL Consume : </b> '
            + data.Table3[0].EL + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>EL Balance : </b> ' + data.Table3[0].EL_ClosingBalance
            + '</td></tr>'
            + '<tr><td colspan="6"><b>NB: This is a computer generated statement and doesnot need signature</b></td></tr>'
            + '</tbody></table></td></tr>'
            + '</table>';

        // Append the table to the container
        container.append(tableHTML);
        
        $("#tableContainer").append(container);
    }
});
