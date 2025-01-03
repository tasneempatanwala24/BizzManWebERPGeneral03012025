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
        url: "wfSdProductMaster_Display.aspx/FetchDetails",
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
            + '<tr><td colspan="2" style="text-align:center;"><h2>Product Master</h2></td></tr>'
            + '<tr><td style="width:70%;">' + data.Table3[0].CompanyName + '<br/>' + data.Table3[0].Address1 + '<br/><b>Email : </b>'
            + data.Table3[0].EmailAddress + '<br/><b>Contact : </b>' + data.Table3[0].PhoneNo
            + '</td><td style="width:30%;"><img src="Images/logo.png" style="width:150px;height:150px;"/></td></tr>'
            + '<tr><td colspan="2"><table style="width:100%;"><tr>' 
            + '<td><b>Project Name :</b> ' + data.Table1[0].ProjectName + '</td>'
            + '<td><b>Material Type :</b> ' + data.Table1[0].MaterialType + '</td>'
            + '<td><b>Category :</b> ' + data.Table1[0].CategoryName + '</td>'
            + '<td><b>Material Group :</b> ' + data.Table1[0].MeterialGroup + '</td>'
            + '</tr><tr>'
            + '<td><b>Material Name :</b> ' + data.Table1[0].MaterialName + '</td>'
            + '<td><b>Alias :</b> ' + data.Table1[0].Alias + '</td>'
            + '<td><b>Barcode :</b> ' + data.Table1[0].BarCode + '</td>'
            + '<td><b>Unit Measure :</b> ' + data.Table1[0].UnitMesure + '</td>'
            + '</tr><tr>'
            + '<td><b>Nature of Item :</b> ' + data.Table1[0].NatureOfItem + '</td>'
            + '<td><b>MRP :</b> ' + data.Table1[0].MRP + '</td>'
            + '<td><b>Discount % :</b> ' + data.Table1[0].Discount + '</td>'
            + '<td><b>Minimum Stock Level :</b> ' + data.Table1[0].MinimumStockLevel + '</td>'
            + '</tr><tr>'
            + '<td><b>Maximum Stock Level :</b> ' + data.Table1[0].MaximumStockLevel + '</td>'
            + '<td><b>Maintain In Batch :</b> ' + data.Table1[0].MaintainInBatch + '</td>'
            + '<td><b>BOM :</b> ' + data.Table1[0].BOM + '</td>'
            + '<td><b>GST :</b> ' + data.Table1[0].GstApplicable + '</td>'
            + '</tr><tr>'
            + '<td><b>HSN No :</b> ' + data.Table1[0].HsnNo + '</td>'
            + '<td><b>State Tax % :</b> ' + data.Table1[0].StateTaxPercent + '</td>'
            + '<td><b>Central Tax % :</b> ' + data.Table1[0].CentralTaxPercent + '</td>'
            + '<td><b>Cess % :</b> ' + data.Table1[0].CessPercent + '</td>'
            + '</tr><tr>'
            + '<td><b>Integrated Tax % :</b> ' + data.Table1[0].IntegratedTaxPercent + '</td>'
            + '<td><b>Active :</b> ' + data.Table1[0].Active + '</td>'
            + '<td colspan="2"><b>Description :</b> ' + data.Table1[0].Description + '</td>'
            + '</tr>'
            + '<tr><td colspan="4"><table style="width:100%;" id="search_form1">'
            + '<thead><tr><th style="display: none;">Id</th><th>Packaging</th><th>Contained Qty</th><th>Unit Measure</th>'
            + '</tr></thead><tbody>';
        for (var i = 0; i < data.Table2.length; i++) {
            tableHTML += '<tr><td style="display: none;">' + data.Table2[i].Id + '</td><td>'
                + data.Table2[i].PackagingName + '</td><td>'
                + data.Table2[i].Qty.toFixed(2) + '</td><td>'
                + data.Table2[i].UnitMesure + '</td></tr>'
        }
        tableHTML += '</tbody></table></td></tr></table>';
        tableHTML += '</table>';
        container.append(tableHTML);
        $("#tableContainer").append(container);
    }

});







