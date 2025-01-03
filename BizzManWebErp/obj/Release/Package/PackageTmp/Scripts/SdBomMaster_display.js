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
        url: "wfSdBomMaster_display.aspx/FetchSDBOMDetails",
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
            + '<tr><td colspan="4" style="text-align:center;"><b>' + data.Table3[0].CompanyName + '<br/>' + data.Table3[0].Address1 + ' ' + data.Table3[0].Address2 +'</b></td></tr>'
            + '<tr><td colspan="4" style="text-align:center;"><b>Sales BOM Master</b></td></tr>'
            + '<tr><td><label class="control-label"> Item Name   </label></td><td>' + data.Table1[0].ItemName
            + '</td><td><label class="control-label">Branch </label></td><td>' + data.Table1[0].BranchName + '</td></tr>'
            + '<tr><td><label class="control-label"> Alias  </label></td><td>' + data.Table1[0].Alias
            + '</td><td><label class="control-label"> Qty  </label></td><td>' + data.Table1[0].Qty + '</td></tr>'
            + '<tr><td><label class="control-label">Active </label></td><td>' + data.Table1[0].Active + '</td>'
            + '<td><label class="control-label">Unit Measure </label></td><td>' + data.Table1[0].UnitMesureName + '</td></tr>'
            + '<tr><td><label class="control-label"> Total Central Tax  </label></td><td>' + data.Table1[0].TotalCentralTax
            + '</td><td><label class="control-label">Total State Tax </label></td><td>' + data.Table1[0].TotalStateTax + '</td></tr>'
            + '<tr><td><label class="control-label">Total Tax </label></td><td>' + data.Table1[0].TotalTax
            + '</td><td><label class="control-label">Delivery Charges </label></td><td>' + data.Table1[0].DeliveryCharges + '</td></tr>'
            + '<tr><td><label class="control-label">Sub Total Amount </label></td><td>' + data.Table1[0].SubTotalAmout
            + '</td><td><label class="control-label">Total Amount </label></td><td>' + data.Table1[0].TotalAmount + '</td></tr>'
            
            
            + '<tr><td colspan="4"><div class="container" id="divMaterialIndentDetails" style="margin-top: 10px; overflow: auto;">'
            + '<div class="card"><div class="card-header" style="padding:10px;"><span><b>Sales BOM Master Details</b> </span></div> <div class="card-body"><div class="panel panel-default"><div class="panel-body">'
            + '<table id = "tblMaterialIndentDetails" style = "width: 100%;border-collapse: collapse;" >'
            + '<thead><tr><th style="display: none;">Material Master Id</th><th>Material Name</th>'
            + '<th>Qty</th><th>Unit Measure</th><th>Rate Incl Tax</th><th>Discount Percent</th><th>Sub Total</th></tr></thead><tbody id="tbody_MaterialIndentDetails">';
        for (var i = 0; i < data.Table2.length; i++) {
            //var stockValue = data.Table2[i].Stock === 0 ? '' : data.Table2[i].Stock;
            tableHTML += '<tr><td style="display: none;">' + data.Table2[i].MasterId + '</td><td>' + data.Table2[i].MaterialName + '</td><td style="text-align:right;">'
                + data.Table2[i].Qty + '</td><td style="text-align:right;">' + data.Table2[i].UnitMesure + '</td><td style="text-align:right;">' + data.Table2[i].RateInclTax + '</td><td style="text-align:right;">' + data.Table2[i].DiscountPercent + '</td><td style="text-align:right;">'
                + data.Table2[i].SubTotal + '</td></tr>'
        }
        tableHTML += '</tbody></table></div></div></div></div></div></td></tr></table>';

        // Append the table to the container
        container.append(tableHTML);

        $("#tableContainer").append(container);
    }

});







