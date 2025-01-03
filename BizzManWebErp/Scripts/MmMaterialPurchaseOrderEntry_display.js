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
        url: "wfMmMaterialPurchaseOrderEntry_display.aspx/FectchPurchaseDetails",
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
            + '<tr><td colspan="4" style="text-align:center;"><b>Purchase Order</b><br/><b>Vendor Name : </b>' + data.Table1[0].VendorName + '<br/><b>Purchase Order Date: </b>' + data.Table1[0].OrderEntryDate + '</td></tr>'
            + '<tr><td><label class="control-label"> Order Entry Date </label></td><td>' + data.Table1[0].OrderEntryDate
            + '</td><td><label class="control-label"> Id </label></td><td>' + data.Table1[0].Id + '</td></tr>'
            + '<tr><td><label class="control-label"> Vendor </label></td><td>' + data.Table1[0].VendorName
            + '</td><td><label class="control-label">Order Deadline Date </label></td><td>' + data.Table1[0].OrderDeadlineDate + '</td></tr>'
            + '<tr><td><label class="control-label">Receipt Date </label></td><td>' + data.Table1[0].ReceiptDate
            + '</td><td><label class="control-label">Payment Term </label></td><td>' + data.Table1[0].PaymentTerm + '</td></tr>'
            + '<tr><td><label class="control-label"> Purchase Agreement</label></td><td>' + data.Table1[0].PurchaseAgreement
            + '</td><td><label class="control-label">Quotation No. </label></td><td>' + data.Table1[0].QuotationNo + '</td></tr>'
            + '<tr><td><label class="control-label"> Branch</label></td><td>' + data.Table1[0].BranchName
            + '</td><td><label class="control-label">Department </label></td><td>' + data.Table1[0].DeptName + '</td></tr>'

            + '<tr><td colspan="4"><div class="container" style="margin-top: 10px; overflow: auto;">'
            + '<div class="card"><div class="card-header" style="padding:10px;"><span><b>Material Purchase Quotation Master Details</b> </span></div> <div class="card-body"><div class="panel panel-default"><div class="panel-body">'
            + '<table style = "width: 100%;border-collapse: collapse;" >'
            + '<thead><tr><th style="display: none;">Material Master Id</th><th>Material Name</th><th>Quotation Entry Date</th><th>Quotation Date</th>'
            + '<th>Quotation Valid Date</th><th>Requisition Note</th><th>Vendor Name</th><th>Branch</th><th>Department</th></tr></thead><tbody>';
            for (var i = 0; i < data.Table2.length; i++) {
                tableHTML += '<tr><td style="display: none;">' + data.Table2[i].MaterialMasterId + '</td><td>' + data.Table2[i].MaterialName + '</td><td>'
                    + data.Table2[i].QuotationEntryDate + '</td><td>' + data.Table2[i].QuotationDate + '</td><td>' + data.Table2[i].QuotationValidDate + '</td><td>' + data.Table2[i].RequisitionNote + '</td><td>' + data.Table2[i].VendorName + '</td>'
                    + '<td>' + data.Table2[i].BranchName + '</td><td>' + data.Table2[i].DeptName +'</td></tr>'
            }
            tableHTML += '</tbody></table></div></div></div></div></div></td></tr>'

            + '<tr><td colspan="4"><div class="container" style="margin-top: 10px; overflow: auto;">'
            + '<div class="card"><div class="card-header" style="padding:10px;"><span><b>Material Purchase Quotation Details</b> </span></div> <div class="card-body"><div class="panel panel-default"><div class="panel-body">'
            + '<table style = "width: 100%;border-collapse: collapse;" >'
            + '<thead><tr><th style="display: none;">Material Master Id</th><th>Material Name</th><th>Quantity</th><th>Unit Price</th>'
            + '<th>Total Amount</th></tr></thead><tbody>';
                for (var i = 0; i < data.Table3.length; i++) {
                    //var stockValue = data.Table2[i].Stock === 0 ? '' : data.Table2[i].Stock;
                    tableHTML += '<tr><td style="display: none;">' + data.Table3[i].MaterialMasterId + '</td><td>' + data.Table3[i].MaterialName + '</td><td>'
                        + data.Table3[i].QtyOrder + '</td><td>' + data.Table3[i].UnitPrice + '</td><td>' + data.Table3[i].TotalAmt + '</td></tr>'
                }
            tableHTML += '</tbody></table></div></div></div></div></div></td></tr></table>';

        // Append the table to the container
        container.append(tableHTML);

        $("#tableContainer").append(container);
    }

});







