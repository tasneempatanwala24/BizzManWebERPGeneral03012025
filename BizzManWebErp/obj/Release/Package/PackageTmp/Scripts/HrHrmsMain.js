$(document).ready(function () {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentMonth = months[new Date().getMonth()];
    var currentYear = new Date().getFullYear();
    // Display the current month in the span
    $('#strmonth').text("Current Month : " + currentMonth);
    $('#stryear').text("Current Year : " + currentYear);
    $.ajax({

        type: "POST",
        url: "wfHrHrmsMain.aspx/FetchData",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonData = JSON.parse(response.d);
            console.log(jsonData);
            populateTable(jsonData);
            populateTable1(jsonData);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });

    function populateTable(data) {
        console.log(data);
        var container = $('#tableContainer');
        var tableHTML = '<td class="text-center"><table class="table table-responsive table-bordered">'
            + '<thead><tr><th style="background-color: #ebe7a5; border-color: #ebe7a5;">MONTH</th>'
            + '<th style="background-color: #b2e179; border-color: #b2e179;">PRESENT</th>'
            + '<th style="background-color: #d74c53; border-color: #d74c53;">ABSENT</th></tr></thead>'
            + '<tbody>'
            for (var i = 0; i < data.Table1.length; i++) {
                tableHTML += '<tr><td>' + data.Table1[i].FullMonthName + '</td><td>' + data.Table1[i].Present + '</td><td>'
                + data.Table1[i].Absent + '</td></tr>'
            }
            tableHTML += '</tbody></table></td>'
            + '<td class="text-center"><table class="table table-responsive table-bordered"><thead>'
            + '<tr><th style="background-color: #ebe7a5; border-color: #ebe7a5;">MONTH</th>'
            + '<th style="background-color: #fff; border-color: #fff;">HOURS COUNT</th></tr>'
            + '</thead><tbody>'
            for (var i = 0; i < data.Table2.length; i++) {
                tableHTML += '<tr><td>' + data.Table2[i].FullMonthName + '</td><td>' + data.Table2[i].TotalOT + '</td>'
                + '</tr>'
            }
            tableHTML += '</tbody></table></td>'            
            + '<td class="text-center"><table class="table table-responsive table-bordered">'     
            + '<thead><tr><th style="background-color: #ebe7a5; border-color: #ebe7a5;">MONTH</th>'
            + '<th style="background-color: #b2e179; border-color: #b2e179;">ACCEPT</th>'
            + '<th style="background-color: #d74c53; border-color: #d74c53;">REJECT</th>'
            + '</tr></thead><tbody>'
                for (var i = 0; i < data.Table3.length; i++) {
                    tableHTML += '<tr><td>' + data.Table3[i].FullMonthName + '</td><td>' + data.Table3[i].Accept + '</td><td>'
                        + data.Table3[i].Reject + '</td></tr>'
                }
            tableHTML += '</tbody></table></td>' 
            container.append(tableHTML);
            $("#tableContainer").append(container);       
                    
                
    }
    function populateTable1(data) {
        console.log(data);
        var container = $('#tableContainer1');
        var tableHTML = '<td class="text-center">'  + data.Table4[0].Present + '</td>'
        + '<td class="text-center">' + data.Table4[0].Absent + '</td>'
        + '<td class="text-center">' + data.Table5[0].TotalDay + '</td>'
        
        container.append(tableHTML);
        $("#tableContainer1").append(container);


    }
});







