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
        url: "wfMmPurchaseQuotationEntry_display.aspx/FectchPurchaseDetails",
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
            + '<tr><td colspan="4" style="text-align:center;"><b>Purchase Quotation on : </b>' + data.Table1[0].QuotationEntryDate + '<br/><b>Vendor Name : </b>' + data.Table1[0].VendorName + '</td></tr>'
            + '<tr><td><b>Id</b></td><td colspan="3">' + data.Table1[0].Id   +'</td></tr>'
            + '<tr><td><label class="control-label"> Quotation Entry Date </label></td><td>' + data.Table1[0].QuotationEntryDate
            + '</td><td><label class="control-label">Requisition Id </label></td><td>' + data.Table1[0].RequisitionId + '</td></tr>'
            + '<tr><td><label class="control-label"> Quotation Date </label></td><td>' + data.Table1[0].QuotationDate
            + '</td><td><label class="control-label">Branch </label></td><td>' + data.Table1[0].BranchName + '</td></tr>'
            + '<tr><td><label class="control-label">Quotation Valid Date </label></td><td>' + data.Table1[0].QuotationValidDate
            + '</td><td><label class="control-label">Department </label></td><td>' + data.Table1[0].DeptName + '</td></tr>'
            + '<tr><td><label class="control-label">Created By </label></td><td>' + data.Table1[0].CreateUser
            + '</td><td><label class="control-label">Vendor Id </label></td><td>' + data.Table1[0].VendorName + '</td></tr>'
            + '<tr><td><label class="control-label">Requisition Note</label></td><td colspan="3">' + data.Table1[0].RequisitionNote + '</td></tr>'

            + '<tr><td colspan="4"><div class="container" id="divMaterialIndentDetails" style="margin-top: 10px; overflow: auto;">'
            + '<div class="card"><div class="card-header" style="padding:10px;"><span><b>Details</b> </span></div> <div class="card-body"><div class="panel panel-default"><div class="panel-body">'
            + '<table id = "tblMaterialIndentDetails" style = "width: 100%;border-collapse: collapse;" >'
            + '<thead><tr><th style="display: none;">Material Master Id</th><th>Material Name</th><th>Quantity</th><th>Unit Price</th>'
            + '<th>Total Amount</th><th>Description</th></tr></thead><tbody id="tbody_MaterialIndentDetails">';
        for (var i = 0; i < data.Table2.length; i++) {
            //var stockValue = data.Table2[i].Stock === 0 ? '' : data.Table2[i].Stock;
            tableHTML += '<tr><td style="display: none;">' + data.Table2[i].MaterialMasterId + '</td><td>' + data.Table2[i].MaterialName + '</td><td>'
                + data.Table2[i].Qty + '</td><td>' + data.Table2[i].UnitPrice + '</td><td>' + data.Table2[i].TotalAmt + '</td><td>' + data.Table2[i].Description + '</td></tr>'
        }
        tableHTML += '</tbody></table></div></div></div></div></div></td></tr></table>';

        // Append the table to the container
        container.append(tableHTML);

        $("#tableContainer").append(container);
    }

});







