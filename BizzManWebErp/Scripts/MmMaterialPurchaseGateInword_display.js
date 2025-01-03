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
        url: "wfMmMaterialPurchaseGateInword_display.aspx/FetchPurchaseGateDetails",
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
            + '<tr><td colspan="4" style="text-align:center;"><b>Add Purchase Gate Inward </b></td></tr>'
            + '<tr><td><label class="control-label"> Inward Entry Date   </label></td><td>' + data.Table1[0].InwardEntryDate
            + '</td><td><label class="control-label">Deadline Date </label></td><td>' + data.Table1[0].DeadlineDate + '</td></tr>'
            + '<tr><td><label class="control-label"> Order Id  </label></td><td>' + data.Table1[0].OrderId
            + '</td><td><label class="control-label">Inward Id </label></td><td>' + data.Table1[0].Id + '</td></tr>'
            + '<tr><td><label class="control-label"> Vendor  </label></td><td>' + data.Table1[0].VendorName
            + '</td><td><label class="control-label">Branch </label></td><td>' + data.Table1[0].BranchName + '</td></tr>'
            + '<tr><td><label class="control-label">P.O No. </label></td><td>' + data.Table1[0].PONo
            + '</td><td><label class="control-label">Transporter </label></td><td>' + data.Table1[0].Transporter + '</td></tr>'
            + '<tr><td><label class="control-label">Challan No. </label></td><td>' + data.Table1[0].ChallanNo
            + '</td><td><label class="control-label">Vehicle No. </label></td><td>' + data.Table1[0].VehicleNo + '</td></tr>'
            + '<tr><td><label class="control-label">Gate in time </label></td><td>' + data.Table1[0].GateInTime
            + '</td><td><label class="control-label">Gate out time </label></td><td>' + data.Table1[0].GaeOutTime + '</td></tr>'
            + '<tr><td><label class="control-label">Delivery Terms </label></td><td>' + data.Table1[0].DeliveryTerms
            + '</td><td><label class="control-label">Payment Terms </label></td><td>' + data.Table1[0].PaymentTerms + '</td></tr>'


            + '<tr><td colspan="4"><div class="container" id="divMaterialIndentDetails" style="margin-top: 10px; overflow: auto;">'
            + '<div class="card"><div class="card-header" style="padding:10px;"><span><b>Purchase Order Details</b> </span></div> <div class="card-body"><div class="panel panel-default"><div class="panel-body">'
            + '<table id = "tblMaterialIndentDetails" style = "width: 100%;border-collapse: collapse;" >'
            + '<thead><tr><th style="display: none;">Material Master Id</th><th>Material Name</th>'
            + '<th>Order Qty</th><th>Unit Measure</th><th>Receive Qty</th><th>Unit Price</th><th>Total Amount</th><th>Warehouse</th></tr></thead><tbody id="tbody_MaterialIndentDetails">';
        for (var i = 0; i < data.Table2.length; i++) {
            //var stockValue = data.Table2[i].Stock === 0 ? '' : data.Table2[i].Stock;
            tableHTML += '<tr><td style="display: none;">' + data.Table2[i].MaterialMasterId + '</td><td>' + data.Table2[i].MaterialName + '</td><td>'
                + data.Table2[i].QtyOrder + '</td><td>' + data.Table2[i].UnitMesure + '</td><td>' + data.Table2[i].QtyReceive + '</td>'
                + '<td>' + data.Table2[i].UnitPrice + '</td><td>' + data.Table2[i].TotalAmt + '</td><td>' + data.Table2[i].WarehouseName + '</td>'
                + '</tr>'
        }
        tableHTML += '</tbody></table></div></div></div></div></div></td></tr></table>';

        // Append the table to the container
        container.append(tableHTML);

        $("#tableContainer").append(container);
    }

});







