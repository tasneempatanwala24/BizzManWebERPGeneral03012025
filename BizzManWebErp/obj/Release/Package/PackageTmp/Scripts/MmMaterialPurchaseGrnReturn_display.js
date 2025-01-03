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
        url: "wfMmMaterialPurchaseGrnReturn_display.aspx/FetchPODirectDetails",
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
        //console.log(data);
        var container = $('#tableContainer');
        var tableHTML = '<table class="center" id="search_form" style="width:90%;border:solid 1px black;padding:5px;">'
            + '<tr><td colspan="2" style="text-align:center;"><h2>Purchase Order GRN</h2></td></tr>'
            + '<tr><td style="width:70%;">' + data.Table1[0].CompanyName + '<br/>' + data.Table1[0].Address1 + '<br/><b>Email : </b>' + data.Table1[0].EmailAddress + '<br/><b>Contact : </b>' + data.Table1[0].PhoneNo
            + '</td><td style="width:30%;"><img src="' + data.Table1[0].Logo + '" style="width:150px;height:150px;"/></td></tr>'
            + '<tr><td><h3>VENDOR</h3><br/><b>Name :</b> ' + data.Table2[0].ContactName + '<br/><b>Address :</b> ' + data.Table2[0].Street1 + '<br/><b>Phone : </b>' + data.Table2[0].Phone + '<br/><b>Email : </b>' + data.Table2[0].Email
            + '</td><td><b>GRN Return ID :</b> ' + data.Table3[0].Id + '<br/><b>Grn Return Date :</b> ' + data.Table3[0].GrnReturnDate + '</td></tr>'

            + '<tr><td colspan="2"><table style="width:100%;" id="search_form1">'
            + '<thead><tr><th style="display: none;">Id</th><th>Item</th><th>Unit Measure</th><th>Return Qty</th><th>Rate</th>'
            + '<th>Total Amt</th>'
            + '</tr></thead><tbody>';
        var total_gross = 0;
        var total_taxable = 0;
        for (var i = 0; i < data.Table4.length; i++) {
            //total_gross += parseFloat(data.Table4[i].TotalAmt.toFixed(2));
            //total_taxable += parseFloat(data.Table4[i].TaxbleAmt.toFixed(2));

            tableHTML += '<tr><td style="display: none;">' + data.Table4[i].ItemId + '</td>'
                + '<td>' + data.Table4[i].materialName + '</td>'
                + '<td>' + data.Table4[i].UnitMesure + '</td>'
                + '<td>' + data.Table4[i].QtyReturn.toFixed(2) + '</td>'                
                + '<td>' + data.Table4[i].Rate.toFixed(2) + '</td>'
                + '<td>' + data.Table4[i].TotalAmt.toFixed(2) + '</td>'
                //+ data.Table4[i].CgstPercent.toFixed(2) + '</td><td>'
                //+ data.Table4[i].SgstPercent.toFixed(2) + '</td><td>'
               // + data.Table4[i].IgstPercent.toFixed(2) + '</td><td>'
               // + data.Table4[i].FreightCharge.toFixed(2) + '</td><td>'
                //+ data.Table4[i].LoadingUnLoading.toFixed(2) + '</td><td>'
               // + data.Table4[i].RoundOff.toFixed(2) + '</td><td>'
               // + data.Table4[i].GrossAmt.toFixed(2) + '</td>
               + '</tr>'

        }

        tableHTML += '<tr><td colspan="4" style="text-align:right;"><b>Total Amount </b></td><td>' + data.Table5[0].Gross_Amt + '</td></tr>'
        //tableHTML += '<tr><td colspan="11" style="text-align:right;"><b>Total Taxable Amount </b></td><td>' + total_taxable + '</td></tr>'
        tableHTML += '<tr><td colspan="5" style="text-align:right;"><b>Total Amount(In words) </b>' + data.Table5[0].AmountInWords + '</td></tr>'
        tableHTML += '</tbody></table></td></tr></td></tr>';
        //tableHTML += '<tr><td colspan="2">Notes: ' + data.Table3[0].Notes + '<br/>Terms and Conditions:' + data.Table3[0].TermsAndConditions + '</td></tr>';
        tableHTML += '</table>';
        // Append the table to the container
        container.append(tableHTML);

        $("#tableContainer").append(container);
    }

});







