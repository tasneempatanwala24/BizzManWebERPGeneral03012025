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
        url: "wfHrEmpSalaryIncrement_display.aspx/FetchSalaryIncreament",
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
        console.log(data);
        
        var container = $('#tableContainer');
        var tableHTML = '<table class="center" id="search_form" style="width:90%;border:solid 1px black;padding:5px;">'
            + '<tr><td colspan="4" style="text-align:center;"><b>Salary Increament</b></td></tr>'
            //+ '<tr><td colspan="4" style="text-align:center;"><img src="data:image/png;base64,' + data.Table2[0].Logo + '" style="width:150px;height:150px;"/></td></tr>'
            //+ '<tr><td colspan="4"><div style="display: flex; justify-content: space-between;"><div style="text-align: left;">' + data.Table2[0].CompanyName
            //+ '<br/>' + data.Table2[0].Address1 + '</div>'
            //+ '<div style="text-align:right;"><img src="Images/logo.png" style="width:150px;height:150px;text-align:right;"/></div></div></td></tr>'
            //+ '<td colspan="2" style="text-align:right;"><img src="data:image/png;base64,' + data.Table2[0].Logo + '" style="width:150px;height:150px;"/></td></tr>'
            + '<tr>' +
            '<td colspan="4">' +
            '<div style="display: flex; justify-content: space-between; align-items: center;">' + // Use flexbox for alignment
            '<div style="text-align: left; flex: 1;">' + // Make left content flex to occupy remaining space
            '<div>' + data.Table2[0].CompanyName + '</div>' + // Company name
            '<div>' + data.Table2[0].Address1 + '</div>' + // Address
            '</div>' +
            '<div style="text-align: right;">' +
            '<img src="Images/logo.png" style="width:150px;height:150px;"/>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>'
            + '<tr><td><label class="control-label">Employee Name </label></td><td style="text-align:right;">' + data.Table1[0].EmpName
            + '</td><td><label class="control-label">Address </label></td><td style="text-align:right;">' + data.Table1[0].EMPAddress + '</td></tr>'
            + '<tr><td><label class="control-label">Present Basic </label></td><td style="text-align:right;">' + data.Table1[0].BasicRate
            + '</td><td><label class="control-label">Hra Percent </label></td><td style="text-align:right;">' + data.Table1[0].HraPercent + '</td></tr>'
            + '<tr><td><label class="control-label">Basic Increment Percent </label></td><td style="text-align:right;">' + data.Table1[0].BasicIncrementPercent
            + '</td><td><label class="control-label">Basic Increment Value </label></td><td style="text-align:right;">' + data.Table1[0].BasicIncrementValue + '</td></tr>'
            + '<tr><td colspan="3" style="text-align:right;"><label class="control-label"><b>Gross</b></label></td><td style="text-align:right;">' + data.Table1[0].TotalEarning + '</td></tr>'
            + '<tr><td colspan="4" style="text-align:left;"><label class="control-label"><b>Gross(In words) </b></label>' + data.Table1[0].GrossInWords + '</td></tr>'
            tableHTML += '</tbody></table></table>';

        // Append the table to the container
        container.append(tableHTML);
        $("#tableContainer").append(container);
    }
    
});







