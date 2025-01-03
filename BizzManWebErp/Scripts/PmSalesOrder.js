$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlCustomer').select2();
    $('#ddlMaterialName').select2();

    BindMaterialMasterDropdown();
    BindCustomerDropdown();
    BindCurrencyDropdown();
    // BindCustomerTypeDropdown();
    BindStateDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown();
    BindSalesOrderMasterList();
});


// Function to handle numeric input
function handleNumericInput(event) {
    // Get the input element
    var inputElement = event.target;

    // Remove non-numeric characters (except 0)
    var numericValue = inputElement.value.replace(/[^0-9]/g, '');

    // Handle leading zeros
    if (numericValue.length > 1 && numericValue.charAt(0) === '0') {
        numericValue = numericValue.slice(1); // Remove leading zero
    }

    // Set the default value to 0 if the input is empty
    if (numericValue === '') {
        numericValue = '0';
    }

    // Update the input value
    inputElement.value = numericValue;
}


function GenerateOrderID() {

    if ($('#txtorderDate').val() != '') {
        var dateValue = $('#txtorderDate').val();
        var date = new Date(dateValue);
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
        var day = ('0' + date.getDate()).slice(-2);

        // Generate a random 4-digit number
        var randomFourDigits = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);

        // Create the orderId
        var orderId = 'OD' + year + month + day + '-' + randomFourDigits;

        // Display the orderId
        $('#txtSaleOrderId').val(orderId);
    }
    else {
        $('#txtSaleOrderId').val('');
    }
}
function GenerateQuotationID() {

    if ($('#txtorderDate').val() != '') {
        // var dateValue = $('#txtorderDate').val();
        //var date = new Date(dateValue);
        //var year = date.getFullYear();
        //var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
        //var day = ('0' + date.getDate()).slice(-2);

        // Generate a random 4-digit number
        var randomFourDigits = ('00000' + Math.floor(Math.random() * 10000)).slice(-5);

        // Create the orderId
        var quotationId = 'QUOT' + '-' + randomFourDigits;

        // Display the orderId
        $('#txtQuotationId').val(quotationId);
    }
    else {
        $('#txtQuotationId').val('');
    }
}
//if ($('#txtorderDate').val() != '') {
//    $.ajax({
//        type: "POST",
//        url: 'wfPmSalesOrder.aspx/GenerateOrderID',
//        data: JSON.stringify({
//            "OrderDate": OrderDate//$('#txtorderDate').val()
//        }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        beforeSend: function () {

//        },
//        success: function (response) {

//            var data = JSON.parse(response.d);
//            $('#txtSaleOrderId').val(data[0].SalesOrderId);


//        },
//        complete: function () {

//        },
//        failure: function (jqXHR, textStatus, errorThrown) {

//        }
//    });
//}

//}



//function CheckManualOrderId() {
//    if ($('#txtManualOrderId').val() != '') {
//        $.ajax({
//            type: "POST",
//            url: 'wfPmSalesOrder.aspx/CheckManualOrderId',
//            data: JSON.stringify({
//                "ManualOrderId": $('#txtManualOrderId').val()
//            }),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            beforeSend: function () {

//            },
//            success: function (response) {

//                var data = JSON.parse(response.d);
//                if (data == "false") {

//                    alertify.error('Manual Order Id already exits.');
//                    $('#txtManualOrderId').val('')
//                } else {

//                }


//            },
//            complete: function () {

//            },
//            failure: function (jqXHR, textStatus, errorThrown) {

//            }
//        });
//    }
//    else {
//        $('#txtSaleOrderId').val('');
//    }
//}

function BindBranchDropdown() {
    //debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/GetBranchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlBranch').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchName + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/GetDeptDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlDept').html('');
            var dept = "<option value=''>-Select Department-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dept = dept + "<option value='" + JSON.parse(response.d)[i].DeptName + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }

            $("#ddlDept").append(dept);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function BindMaterialPackagingDropdown(materialid) {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/MaterialPackagingList',
        data: JSON.stringify({
            "materialid": materialid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlPackage').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Package-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Packaging + "'>" + JSON.parse(response.d)[i].Packaging + "</option>";
            }
            $('#ddlPackage').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}



function BindMaterialMasterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/MaterialMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlMaterialName').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Material-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlMaterialName').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}




function BindStateDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/FetchStateList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlState').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select State-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].StateId + "'>" + JSON.parse(response.d)[i].StateName + "</option>";
            }
            $('#ddlState').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function BindCityDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/FetchCityList',
        data: JSON.stringify({
            "stateid": $('#ddlState').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCity').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select City-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CityName + "</option>";
            }
            $('#ddlCity').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}



function BindCurrencyDropdown() {
    //debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/BindCurrencyList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCurrency').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Currency-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Currency + "'>" + JSON.parse(response.d)[i].Currency + "</option>";
            }
            $('#ddlCurrency').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function BindCustomerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/CustomerMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCustomer').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Customer-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].CustomerName + "'>" + JSON.parse(response.d)[i].CustomerName + "</option>";
            }
            $('#ddlCustomer').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindCustomerTypeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/CustomerTypeMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlCustomerType').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Customer Type-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].id + "'>" + JSON.parse(response.d)[i].CustomerType + "</option>";
            }
            $('#ddlCustomerType').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}




function CreateSalesOrder() {
    $('#divSalesOrderList').hide();
    $('#divSalesOrderEntry').show();
    $('#divSalesOrderDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();

    $('#tr_SalesOrderEntry').show();

    ClearAll();
}

function ViewSalesOrderList() {
    $('#divSalesOrderList').show();
    $('#divSalesOrderEntry').hide();
    $('#divSalesOrderDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    $('#btnConfirm').hide();
    $('#btnCancel').hide();
    $('#previewBtn').hide();
    BindSalesOrderMasterList();
}



function ClearAll() {
    $('#tbody_SalesOrderDetails').children('tr:not(:first)').remove();
    $('#ddlMaterialName').val('');
    $('#txtMaterialQty').val('');
    $('#txtMaterialDiscount').val('0');
    $('#txtMaterialStock').val('');
    $('#txtMaterialUnitMeasure').val('');
    $('#ddlPackage').html("<option value=''>-Select Package-</option>");
    $('#txtMaterialRate').val('');
    $('#txtMaterialTax').val('');
    $('#txtMaterialTotalAmount').val('');

    $('#txtExpirationDate').val('');
    $('#ddlGSTTreatment').val('');
    $('#txtQuotationDate').val('');
    $('#ddlCurrency').val('');
    $('#ddlPaymentTerms').val('');
    $('#txtTermsConditions').val('');
    $('#txtTotalAmount').val('');
    $('#hdnSalesOrderId').val('');

    $('#txtCustomerName').val('');
    $('#ddlCustomerType').val('');
    $('#txtCompanyName').val('');
    $('#ddlCity').val('');
    $('#ddlState').val('');
    $('#txtEmail').val('');
    $('#txtMobile').val('');
    $('#txtSaleOrderId').val('');
    $('#ddlBranch').val('');
    $('#ddlDept').val('');

    $('#txtorderDate').val('');
    $('#txtDeliveryDate').val('');
    $('#txtManualOrderId').val('');
    $('#txtDeliveryCharges').val('0');
    $('#txtOutstandingAmount').val('0');
    $('#txtAdvance').val('0');
    $('#txtQuotationId').val('');

    $('#btnConfirm').hide();
    $('#btnCancel').hide();
    $('#previewBtn').hide();
    $('#ddlCustomer').val('').trigger('change');;
}



/*function BindSalesOrderMasterList() {
    //showLoader();
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/FetchSalesOrderMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            setTimeout(function () {

                $('#tblSalesOrderList').DataTable().clear();
                $('#tblSalesOrderList').DataTable().destroy();
                $('#tbody_SalesOrder_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td><input type="checkbox" class="editor-active"></td><td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + data[i].SalesOrderId + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].ManualOrderId != undefined ? data[i].ManualOrderId : '') + '</td>'

                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].SalesOrderSource != undefined ? data[i].SalesOrderSource : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].CustomerName != undefined ? data[i].CustomerName : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].DeptName != undefined ? data[i].DeptName : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].GST_Treatment != undefined ? data[i].GST_Treatment : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].ExpirationDate != undefined ? data[i].ExpirationDate : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].QuotationDate != undefined ? data[i].QuotationDate : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].Currency != undefined ? data[i].Currency : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].PaymentTerms != undefined ? data[i].PaymentTerms : '') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].OrderStatus != undefined ? data[i].OrderStatus : '') + '</td>'

                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].DeliveyCharges != undefined ? data[i].DeliveyCharges : '0') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].OutstandingAmount != undefined ? data[i].OutstandingAmount : '0') + '</td>'
                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].Advance != undefined ? data[i].Advance : '0') + '</td>'

                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].TotalAmount != undefined ? data[i].TotalAmount : '') + '</td></tr>';
                }
                $('#tbody_SalesOrder_List').html(html);
                var d = new Date();
                var table = $('#tblSalesOrderList').DataTable({
                    'columnDefs': [
                        {
                            'targets': 0,
                            'checkboxes': {
                                'selectRow': true
                            }
                        }
                    ],
                    'select': {
                        'style': 'multi'
                    },
                    fixedHeader: {
                        header: true
                    }
                });

                $('#example-select-all').on('click', function () {
                    // Check/uncheck all checkboxes in the table
                    var rows = table.rows({ 'search': 'applied' }).nodes();
                    $('input[type="checkbox"]', rows).prop('checked', this.checked);


                });

                $('#tbody_SalesOrder_List tbody').on('change', 'input[type="checkbox"]', function () {
                    // If checkbox is not checked

                    if (!this.checked) {
                        var el = $('#example-select-all').get(0);
                        // If "Select all" control is checked and has 'indeterminate' property
                        if (el && el.checked && ('indeterminate' in el)) {
                            // Set visual state of "Select all" control 
                            // as 'indeterminate'
                            el.indeterminate = true;
                        }
                    }



                });
               // hideLoader();
            }, 1000);



           

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}*/

function BindSalesOrderMasterList() {
    
    //showLoader();
    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/FetchSalesOrderMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            setTimeout(function () {

                $('#tblSalesOrderList').DataTable().clear();
                $('#tblSalesOrderList').DataTable().destroy();
                $('#tbody_SalesOrder_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].OrderDate != undefined ?data[i].SalesOrderId : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].OrderDate != undefined ? data[i].OrderDate : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].DeliveryDateTime != undefined ? data[i].DeliveryDateTime : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].CustomerName != undefined ? data[i].CustomerName : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].BranchCode != undefined ? data[i].BranchCode : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].Department != undefined ? data[i].Department : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].GSTTreatment != undefined ? data[i].GSTTreatment : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].ExpirationDate != undefined ? data[i].ExpirationDate : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].QuotationId != undefined ? data[i].QuotationId : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].Currency != undefined ? data[i].Currency : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].PaymentTerms != undefined ? data[i].PaymentTerms : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].ServiceCharge != undefined ? data[i].ServiceCharge : '') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].DeliveyCharges != undefined ? data[i].DeliveyCharges : '0') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].OutstandingAmount != undefined ? data[i].OutstandingAmount : '0') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].Advance != undefined ? data[i].Advance : '0') + '</td>'
                        + '<td style="width: 5%;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td></tr>';
                  
                }
                $('#tbody_SalesOrder_List').html(html);
                var d = new Date();
            //    var table = $('#tblSalesOrderList').DataTable({
            //        'columnDefs': [
            //            {
            //                'targets': 0,
            //                'checkboxes': {
            //                    'selectRow': true
            //                }
            //            }
            //        ],
            //        'select': {
            //            'style': 'multi'
            //        },
            //        fixedHeader: {
            //            header: true
            //        }
            //    });

            //    $('#example-select-all').on('click', function () {
            //        // Check/uncheck all checkboxes in the table
            //        var rows = table.rows({ 'search': 'applied' }).nodes();
            //        $('input[type="checkbox"]', rows).prop('checked', this.checked);


            //    });

            //    $('#tbody_SalesOrder_List tbody').on('change', 'input[type="checkbox"]', function () {
            //        // If checkbox is not checked

            //        if (!this.checked) {
            //            var el = $('#example-select-all').get(0);
            //            // If "Select all" control is checked and has 'indeterminate' property
            //            if (el && el.checked && ('indeterminate' in el)) {
            //                // Set visual state of "Select all" control 
            //                // as 'indeterminate'
            //                el.indeterminate = true;
            //            }
            //        }



            //    });
            //    // hideLoader();
            }, 1000);





        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function FetchSalesOrderMasterDetails(id, OrderStatus) {
    if (OrderStatus == '1' || OrderStatus == '2') {
        showLoader();

        $.ajax({
            type: "POST",
            url: 'wfPmSalesOrder.aspx/FetchSalesOrderMasterDetails',
            data: JSON.stringify({
                "SalesOrderId": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                ClearAll();
                $('#divSalesOrderList').hide();
                $('#divSalesOrderEntry').show();
                $('#divSalesOrderDetails').show();
                $('#btnSave').show();
                $('#btnExport').hide();
                $('#btnView').show();
                $('#txtSaleOrderId').val(id);

                $('#ddlGSTTreatment').val(data[0].GST_Treatment);
                $('#ddlCurrency').val(data[0].CurrencyId);
                $('#ddlPaymentTerms').val(data[0].PaymentTerms);
                $('#txtTermsConditions').val(data[0].TermCondition);
                $('#txtTotalAmount').val(data[0].TotalAmount);
                $('#txtOutstandingAmount').val(data[0].OutstandingAmount);
                $('#txtAdvance').val(data[0].Advance);
                $('#ddlBranch').val(data[0].BranchCode);
                $('#ddlDept').val(data[0].DepartmentID);
                var dtExpirationDate = new Date(data[0].ExpirationDate);
                document.getElementById("txtExpirationDate").valueAsDate = dtExpirationDate;
                //  var dtQuotationDate = new Date(data[0].QuotationDate);
                //   document.getElementById("txtQuotationDate").valueAsDate = dtQuotationDate;
                $('#hdnSalesOrderId').val(data[0].SalesOrderId);
                $('#txtSaleOrderId').val(data[0].SalesOrderId);
                $('#txtManualOrderId').val(data[0].ManualOrderId);
                $('#txtDeliveryDate').val(data[0].DeliveryDateTime);
                $('#txtQuotationId').val(data[0].SalesQuotationMasterId);
                var dtOrderDate = new Date(data[0].OrderDate);
                document.getElementById("txtorderDate").valueAsDate = dtOrderDate;

                if (data[0].Deliveycharges != null)
                    $('#txtDeliveryCharges').val(data[0].Deliveycharges);
                else
                    $('#txtDeliveryCharges').val('0');




                FetchSalesOrderDetailsList(data[0].SalesOrderId);
                if (OrderStatus == '1') {
                    $('#btnConfirm').show();
                    $('#btnCancel').show();
                }
                $('#previewBtn').show();
                $('#ddlCustomer').val(data[0].CustomerId).trigger('change');
                hideLoader();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}


function FetchSalesOrderDetailsList(salesorderid) {
    $('#tbody_SalesOrderDetails').children('tr:not(:first)').remove();

    $.ajax({
        type: "POST",
        url: 'wfPmSalesOrder.aspx/FetchSalesOrderDetailsList',
        data: JSON.stringify({
            "salesorderid": salesorderid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_SalesOrderDetails').append('<tr><td style="display: none;">' + data[i].MaterialId + '</td>'
                    + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : "") + '</td>'
                    + '<td>' + (data[i].Stock != undefined ? data[i].Stock : "") + '</td>'
                    + '<td>' + (data[i].Qty != undefined ? data[i].Qty : "") + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : "") + '</td>'
                    + '<td>' + (data[i].Packaging != undefined ? data[i].Packaging : "") + '</td>'
                    + '<td style="display: none;">' + (data[i].PackageId != undefined ? data[i].PackageId : "") + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : "") + '</td>'
                    + '<td>' + (data[i].DiscountPercent != undefined ? data[i].DiscountPercent : "") + '</td>'
                    + '<td>' + (data[i].Tax != undefined ? data[i].Tax : "") + '</td>'
                    + '<td>' + (data[i].SubTotal != undefined ? data[i].SubTotal : "") + '</td>'
                    + '<td><a onclick="DeleteSalesOrderDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
            }




        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}




function DownloadFile() {
    var chk = 0;
    var SalesOrderId = '';
    $('#tbody_SalesOrder_List tr').each(function (index1, tr) {
        chk = 0;
        $(tr).find('td').each(function (index, td) {
            if (index == 0) {
                if ($(td.children[0]).is(':checked')) {
                    chk = 1;
                }
                else {
                    chk = 0;
                }
            }

            if (index == 1) {
                if (chk == 1) {
                    if (SalesOrderId == '') {
                        SalesOrderId = td.outerText;
                    }
                    else {
                        SalesOrderId = SalesOrderId + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (SalesOrderId != '') {
        showLoader();
        $.ajax({
            type: "POST",
            url: "wfPmSalesOrder.aspx/FetchSalesOrderListDownload",
            data: JSON.stringify({
                "SalesOrderId": SalesOrderId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'SalesOrder_' + d.toDateString() + '.xlsx';
                //Convert Base64 string to Byte Array.
                var bytes = Base64ToBytes(r.d);

                //Convert Byte Array to BLOB.
                var blob = new Blob([bytes], { type: "application/octetstream" });

                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = $("<a />");
                    a.attr("download", fileName);
                    a.attr("href", link);
                    $("body").append(a);
                    a[0].click();
                    $("body").remove(a);
                }
                hideLoader
            }
        });
    }
    else {
        alertify.error('Please select any record');
    }
}

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
}


function FetchMaterialDetails() {
    if ($('#ddlBranch').val() == '') {
        alertify.error('Please Select Branch');
        $('#ddlMaterialName').val('');
        return;
    }

    if ($('#ddlMaterialName').val() != '' && $('#ddlBranch').val() != '') {
        var found = false;
        $('#tbody_SalesOrderDetails tr').each(function (i) {
            if (i > 0) {
                var materialid = parseFloat($(this)[0].cells[0].innerText)
                if (materialid == $('#ddlMaterialName').val()) {
                    found = true;

                }
            }

        });
        if (found) {
            alertify.error('Material already added');
            $('#ddlMaterialName').val('');
            return;
        }
        //showLoader();
        $.ajax({
            type: "POST",
            url: 'wfPmSalesOrder.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $('#ddlMaterialName').val(),
                "BranchCode": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);



                setTimeout(function () {

                    $('#txtMaterialUnitMeasure').val(data[0].UnitMesure);
                    $('#txtMaterialRate').val(data[0].MRP);
                    $('#txtMaterialTax').val(data[0].IntegratedTaxPercent);
                    $('#txtMaterialStock').val(data[0].MinimumStockLevel);
                    BindMaterialPackagingDropdown($('#ddlMaterialName').val());
                    //hideLoader();
                }, 1000); // Hide loader after 3 seconds
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}




function calculateGrandTotal() {
    var grandTotal = 0;

    var shippingCharges = parseFloat($('#txtDeliveryCharges').val());
    var serviceCharges = parseFloat($('#txtServiceCharges').val());

    // Iterate through each row in the table body
    $('#tbody_SalesOrderDetails tr').each(function (i) {
        if (i > 0) {
            var totalAmount = parseFloat($(this)[0].cells[10].innerText)
            grandTotal += totalAmount;
        }

    });

    grandTotal += shippingCharges + serviceCharges;
    $('#txtTotalAmount').val(grandTotal.toFixed(2));
    var outstanding = 0;
    var advance = 0;
    advance = parseFloat($('#txtAdvance').val());
    outstanding = grandTotal - advance;
    $('#txtOutstandingAmount').val(outstanding.toFixed(2));
}

function SaveSalesOrderDetails() {

    if ($('#ddlMaterialName').val() != '') {



        if ($('#txtMaterialQty').val() != '') {
            //if ($('#ddlPackage').val() != '') {
            $('#tbody_SalesOrderDetails').append('<tr><td style="display: none;">' + $('#ddlMaterialName').val() + '</td>'
                + '<td>' + $("#ddlMaterialName option:selected").text() + '</td>'
                + '<td>' + $("#txtMaterialStock").val() + '</td>'
                + '<td>' + $("#txtMaterialQty").val() + '</td>'
                + '<td>' + $("#txtMaterialUnitMeasure").val() + '</td>'
                + '<td>' + ($("#ddlPackage").val() != "" ? $("#ddlPackage option:selected").text() : "") + '</td>'
                + '<td style="display: none;">' + ($("#ddlPackage").val() != "" ? $("#ddlPackage").val() : "0") + '</td>'
                + '<td>' + $("#txtMaterialRate").val() + '</td>'
                + '<td>' + $("#txtMaterialDiscount").val() + '</td>'
                + '<td>' + $("#txtMaterialTax").val() + '</td>'
                + '<td>' + $("#txtMaterialTotalAmount").val() + '</td>'
                + '<td><a onclick="DeleteSalesOrderDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                + '</tr>');

            //if ($('#txtTotalAmount').val() == '') {
            //    var totalAmnt = parseFloat($('#txtMaterialTotalAmount').val()) + parseFloat($('#txtDeliveryCharges').val());
            //    $('#txtTotalAmount').val(totalAmnt.toFixed(2));
            //    }
            //    else {
            //    var totalAmnt = parseFloat($('#txtTotalAmount').val()) + parseFloat($('#txtMaterialTotalAmount').val()) + parseFloat($('#txtDeliveryCharges').val());
            //        $('#txtTotalAmount').val(totalAmnt.toFixed(2));
            //    } commented by tasneem9
            calculateGrandTotal();
            $('#ddlMaterialName').val('');
            $('#txtMaterialQty').val('');
            $('#txtMaterialUnitMeasure').val('');
            $('#txtMaterialRate').val('');
            $('#txtMaterialTotalAmount').val('');
            $('#ddlPackage').html("<option value=''>-Select Package-</option>");
            $('#txtMaterialTax').val('');
            $('#txtMaterialDiscount').val('0');
            $('#txtMaterialStock').val('');
            //}
            //else {
            //    alertify.error('Please select any package');
            //}
        }
        else {
            alertify.error('Please enter material quantity');
        }
    }
    else {
        alertify.error('Please select any material name');
    }


}



function DeleteSalesOrderDetailEntry(ele) {
    //var totalAmnt = parseFloat($('#txtTotalAmount').val()) - parseFloat($(ele.parentElement.parentElement.children[8]).text());
    //$('#txtTotalAmount').val(totalAmnt.toFixed(2)); commented by tasneem


    $(ele.parentElement.parentElement).remove();
    calculateGrandTotal();
}


function UpdateTotalAmount() {
    if ($('#txtMaterialQty').val() != '') {
        if ($('#ddlMaterialName').val() != '') {
            // var totalAmnt = parseFloat($('#txtMaterialRate').val()) * parseInt($('#txtMaterialQty').val());
            // totalAmnt = totalAmnt + ((totalAmnt * parseInt($('#txtMaterialTax').val())) / 100);
            /*  var amount = (qty * rate) * (1 - discount / 100) * (1 + gst / 100);*/

            var totalAmnt = (parseInt($('#txtMaterialQty').val()) * parseFloat($('#txtMaterialRate').val())) * (1 - parseInt($('#txtMaterialDiscount').val()) / 100) * (1 + parseInt($('#txtMaterialTax').val()) / 100);

            $('#txtMaterialTotalAmount').val(totalAmnt.toFixed(2));
        }
        else {
            $('#txtMaterialQty').val('');
            alertify.error('Please select any material first');
        }
    }
    else {
        $('#txtMaterialTotalAmount').val('');
    }
}


//function AddSalesOrder() {
//    if ($('#ddlCustomer').val() != '') {
//        if ($('#txtExpirationDate').val() != '') {
//            if ($('#ddlGSTTreatment').val() != '') {
//               // if ($("#txtQuotationDate").val() != undefined) {

//                    if ($('#ddlCurrency').val() != '') {
//                        var indent_details = '';
//                        $('#tbody_SalesOrderDetails tr').each(function (index1, tr) {
//                            if (index1 > 0) {
//                                $(tr).find('td').each(function (index, td) {
//                                    if (index1 == 1) {
//                                        if (indent_details == '') {
//                                            if (index == 0) {
//                                                indent_details = td.outerText;
//                                            }

//                                        }
//                                        else {
//                                            if (index == 2) {
//                                                indent_details = indent_details + '|' + td.outerText;
//                                            }
//                                            else if (index == 5) {
//                                                indent_details = indent_details + '$' + td.outerText;
//                                            }

//                                        }
//                                    }
//                                    else {
//                                        if (index == 0) {
//                                            indent_details = indent_details + '@' + td.outerText;
//                                        }
//                                        else if (index == 2) {
//                                            indent_details = indent_details + '|' + td.outerText;
//                                        }
//                                        else if (index == 5) {
//                                            indent_details = indent_details + '$' + td.outerText;
//                                        }

//                                    }
//                                });
//                            }
//                        });

//                        if (indent_details != '') {
//                            if ($('#ddlDept').val() != '') {
//                                if ($('#ddlBranch').val() != '') {
//                            $.ajax({
//                                type: "POST",
//                                url: 'wfPmSalesOrder.aspx/AddSalesOrder',
//                                data: JSON.stringify({
//                                    "SalesOrderId": $('#txtSaleOrderId').val(),
//                                    "CustomerId": $('#ddlCustomer').val(),
//                                    "ExpirationDate": $('#txtExpirationDate').val(),
//                                    "GSTTreatment": $('#ddlGSTTreatment').val(),
//                                    "SalesOrder_details": indent_details,
//                                    //"QuotationDate": $('#txtQuotationDate').val(),
//                                    "Currency": $('#ddlCurrency').val(),
//                                    "PaymentTerms": $('#ddlPaymentTerms').val(),
//                                    "TermsConditions": $('#txtTermsConditions').val(),
//                                    "TotalAmount": $('#txtTotalAmount').val(),
//                                    "OrderSource": "Direct",
//                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
//                                    "BranchCode": $('#ddlBranch').val(),
//                                    "DepartmentID": $('#ddlDept').val()
//                                }),
//                                contentType: "application/json; charset=utf-8",
//                                dataType: "json",
//                                beforeSend: function () {

//                                },
//                                success: function (response) {
//                                    alertify.success(response.d);
//                                    ClearAll();

//                                },
//                                complete: function () {

//                                },
//                                failure: function (jqXHR, textStatus, errorThrown) {

//                                }
//                            });

//                                }
//                                else {
//                                    alertify.error('Please select any Branch');
//                                }
//                            }
//                            else {
//                                alertify.error('Please select any Department');
//                            }
//                        }
//                        else {
//                            alertify.error('Please add Sales Order Lines');
//                        }
//                    }
//                    else {
//                        alertify.error('Please select any Currency');
//                    }

//                //}
//                //else {
//                //    alertify.error('Please select any Quotation Date');
//                //}
//            }
//            else {
//                alertify.error('Please select any GST Treatment');
//            }
//        }
//        else {
//            alertify.error('Please select any Expiration Date');
//        }
//    }
//    else {
//        alertify.error('Please select any Customer');
//    }
//}




function AddSalesOrder() {
    debugger;
    if ($('#ddlCustomer').val() == '') {
        alertify.error('Please select any Customer');
        return;
    }

    else if ($('#txtorderDate').val() == '') {
        alertify.error('Please select the Order Date');
        return;
    }
    else if ($('#ddlGSTTreatment').val() == '') {
        alertify.error('Please select any GST Treatment');
        return;
    }
    else if ($('#txtdeliverydate').val() == '') {
        alertify.error('please enter delivery date & time');
        return;
    }
    else if ($('#ddlcurrency').val() == '') {
        alertify.error('please select any currency');
        return;
    }
    else if ($('#txtquotationid').val() == '') {
        alertify.error('please select any currency to generate quotation id');
        return;
    }
    else if ($('#ddldept').val() == '') {
        alertify.error('please select any department');
        return;
    }
    else if ($('#txtexpirationdate').val() == '') {
        alertify.error('please select any expiration date');
        return;
    }
    else if ($('#ddlpaymentterms').val() == '') {
        alertify.error('please select any payment terms');
        return;
    }
    else if ($('#ddlbranch').val() == '') {
        alertify.error('please select any branch');
        return;
    }

    //var hasrows = $('#tbody_salesorderdetails tr').length > 1;
    //if (!hasrows) {
    //    alertify.error('please add sales order lines');
    //    return;
    //}

    var griddata = [];
    debugger;
    $("#tbody_SalesOrderDetails tr").each(function (i) {
        if (i > 0) {
            var materialName = $(this)[0].cells[1].innerText;
            var itemID = $(this)[0].cells[0].innerText;
            var stock = $(this)[0].cells[2].innerText;
            var QTY = $(this)[0].cells[3].innerText;
            var UnitMeasure = $(this)[0].cells[4].innerText;
            var Packaging = $(this)[0].cells[6].innerText;
            var MRP = $(this)[0].cells[7].innerText;
            var discountpercent = $(this)[0].cells[8].innerText;
            var integratedTaxPercent = $(this)[0].cells[9].innerText;
            var amount = $(this)[0].cells[10].innerText;
           // var salesOrderId = $('#txtSaleOrderId').val();

            griddata.push({ materialName: materialName, itemID: itemID, stock: stock, QTY: QTY, MRP: MRP, integratedTaxPercent: integratedTaxPercent, UnitMeasure: UnitMeasure, amount: amount, Packaging: Packaging, discountpercent: discountpercent });// salesOrderId: salesOrderId });
        }
    });
    //showLoader();
    debugger;
     //Send data to server using AJAX
    $.ajax({
        type: "POST",
        url: "wfPmSalesOrder.aspx/AddSalesOrder", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            griddata: JSON.stringify(griddata),
            "SalesOrderId": $('#txtSaleOrderId').val(),
            "CustomerName": $('#ddlCustomer').val(),
            "OrderDate": $('#txtorderDate').val(),
            "ExpirationDate": $('#txtExpirationDate').val(),
            "GSTTreatment": $('#ddlGSTTreatment').val(),
            "DeliveryDateTime": $('#txtDeliveryDate').val(),
            "Currency": $('#ddlCurrency').val(),
            "PaymentTerms": $('#ddlPaymentTerms').val(),
            "TermsConditions": $('#txtTermsConditions').val(),
            "TotalAmount": $('#txtTotalAmount').val(),
            "DeliveryCharges": $('#txtDeliveryCharges').val(),
            "BranchCode": $('#ddlBranch').val(),
            "DeptName": $('#ddlDept').val(),
            "QuotationId": $('#txtQuotationId').val(),
            "OutstandingAmount": $('#txtOutstandingAmount').val(),
            "Advance": $('#txtAdvance').val(),
            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "ServiceCharge": $('#txtServiceCharges').val(),



        }),
   

    //subgriddata.push(['a', 'b', 'c', 'y', 'e', 'q', 'j', 'k', 'u', 'i']);

/*    var SalesOrderId = $('#txtSaleOrderId').val();
    var CustomerName = $('#ddlCustomer').val();
    var OrderDate = $('#txtorderDate').val();
    var ExpirationDate = $('#txtExpirationDate').val();
    var GSTTreatment = $('#ddlGSTTreatment').val();
    var DeliveryDateTime = $('#txtDeliveryDate').val();
    var Currency = $('#ddlCurrency').val();
    var PaymentTerms = $('#ddlPaymentTerms').val();
    var TermsConditions = $('#txtTermsConditions').val();
    var TotalAmount = $('#txtTotalAmount').val();
    var DeliveryCharges = $('#txtDeliveryCharges').val();
    var BranchCode = $('#ddlBranch').val();
    var DeptName = $('#ddlDept').val().trim();
    var QuotationId = $('#txtQuotationId').val();
    var OutstandingAmount = $('#txtOutstandingAmount').val();
    var Advance = $('#txtAdvance').val();
    var LoginUser = $('#ContentPlaceHolder1_loginuser').val();
    var ServiceCharge = $('#txtServiceCharges').val();*/


    //$("#tbl tr").each(function () {
      
    //var row = {
    //    SalesOrderId: $('#txtSaleOrderId').val(),
    //    CustomerName: $('#ddlCustomer').val(),
    //    OrderDate: $('#txtorderDate').val(),
    //    ExpirationDate: $('#txtExpirationDate').val(),
    //    GSTTreatment: $('#ddlGSTTreatment').val(),
    //    DeliveryDateTime: $('#txtDeliveryDate').val(),
    //    Currency: $('#ddlCurrency').val(),
    //    PaymentTerms: $('#ddlPaymentTerms').val(),
    //    TermsConditions: $('#txtTermsConditions').val(),
    //    TotalAmount: $('#txtTotalAmount').val(),
    //    DeliveryCharges: $('#txtDeliveryCharges').val(),
    //    BranchCode: $('#ddlBranch').val(),
    //    DeptName: $('#ddlDept').val().trim(),
    //    QuotationId: $('#txtQuotationId').val(),
    //    OutstandingAmount: $('#txtOutstandingAmount').val(),
    //    Advance: $('#txtAdvance').val(),
    //    LoginUser: $('#ContentPlaceHolder1_loginuser').val(),
    //    ServiceCharge: $('#txtServiceCharges').val(),
    //    subgriddata: []
    //};
      //  };

       
    //    $("#tbody_SalesOrderDetails tr").each(function (i) {
    //        if (i > 0) {
    //            var materialName = $(this)[0].cells[1].innerText;
    //            var itemID = $(this)[0].cells[0].innerText;
    //            var stock = $(this)[0].cells[2].innerText;
    //            var QTY = $(this)[0].cells[3].innerText;
    //            var UnitMeasure = $(this)[0].cells[4].innerText;
    //            var Packaging = $(this)[0].cells[6].innerText;
    //            var MRP = $(this)[0].cells[7].innerText;
    //            var discountpercent = $(this)[0].cells[8].innerText;
    //            var integratedTaxPercent = $(this)[0].cells[9].innerText;
    //            var amount = $(this)[0].cells[10].innerText;

    //            row.subgriddata.push({ materialName: materialName, itemID: itemID, stock: stock, QTY: QTY, MRP: MRP, integratedTaxPercent: integratedTaxPercent, UnitMeasure: UnitMeasure, amount: amount, Packaging: Packaging, discountpercent: discountpercent });

    //        }
    //    });
    //griddatadtls.push(row);
    
    
    //griddata.push({
    //    SalesOrderId: SalesOrderId, CustomerName: CustomerName, OrderDate: OrderDate, ExpirationDate: ExpirationDate, GSTTreatment: GSTTreatment, DeliveryDateTime: DeliveryDateTime, Currency: Currency,
    //    PaymentTerms: PaymentTerms, TermsConditions: TermsConditions, TotalAmount: TotalAmount, DeliveryCharges: DeliveryCharges, BranchCode: BranchCode, DeptName: DeptName,
    //    QuotationId: QuotationId, OutstandingAmount: OutstandingAmount, Advance: Advance, LoginUser: LoginUser, ServiceCharge: ServiceCharge, subgriddata: []
    //});

    
   /* $.ajax({
        type: "POST",
        url: "wfPmSalesOrder.aspx/AddSalesOrder", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            griddata: JSON.stringify(griddatadtls)
        //data: JSON.stringify({
        //    gridData: griddatadtls
        }),
        */
        dataType: "json",
        success: function (response) {


            setTimeout(function () {


                //hideLoader();
                alertify.success('Sales Order details added successfully');
                ClearAll();
            }, 1000); // Hide loader after 3 seconds
        },
        error: function (error) {
            console.log(error);
            alertify.error("Error saving data. Please try again.");
        }
    });
}




/*function UpdateSalesOrderStatus(status) {
    alertify.confirm('Confirm Order Status Update', 'Are you sure, you want to update sales order status?', function () {
        $.ajax({
            type: "POST",
            url: 'wfPmSalesOrder.aspx/UpdateSalesOrderStatus',
            data: JSON.stringify({
                "SalesOrderId": $('#hdnSalesOrderId').val(),
                "OrderStatus": status,
                "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                alertify.success("Sales Order status updated successfully");
                ViewSalesOrderList();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
        , function () {

        });


}
*/

function CloseModal() {
    $('#CustomerAddModal').modal('hide');
}


function CloseCustomerTypeModal() {
    $('#CustomerTypeAddModal').modal('hide');
}


/*function AddCustomerDetails() {
    if ($('#txtCustomerName').val() != '') {
        if ($('#ddlCustomerType').val() != '') {
            if ($('#txtCompanyName').val() != '') {
                if ($("#ddlCity").val() != '') {

                    if ($('#ddlState').val() != '') {

                        if ($('#txtEmail').val() != '') {
                            if ($('#txtMobile').val() != '') {
                                $.ajax({
                                    type: "POST",
                                    url: 'wfPmSalesOrder.aspx/AddCustomer',
                                    data: JSON.stringify({
                                        "CustomerName": $('#txtCustomerName').val(),
                                        "CustomerType": $('#ddlCustomerType').val(),
                                        "CompanyName": $('#txtCompanyName').val(),
                                        "City": $('#ddlCity').val(),
                                        "State": $('#ddlState').val(),
                                        "Email": $('#txtEmail').val(),
                                        "Mobile": $('#txtMobile').val(),
                                        "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                    }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    beforeSend: function () {

                                    },
                                    success: function (response) {
                                        var str = "success";
                                        if (response.d.indexOf(str) != -1) {
                                            alertify.success(response.d);
                                            $('#txtCustomerName').val('');
                                            $('#ddlCustomerType').val('');
                                            $('#txtCompanyName').val('');
                                            $('#ddlCity').val('');
                                            $('#ddlState').val('');
                                            $('#txtEmail').val('');
                                            $('#txtMobile').val('');
                                            $('#CustomerAddModal').modal('hide');
                                            BindCustomerDropdown();
                                        }
                                        else {
                                            alertify.error(response.d);
                                        }

                                    },
                                    complete: function () {

                                    },
                                    failure: function (jqXHR, textStatus, errorThrown) {

                                    }
                                });
                            }
                            else {
                                alertify.error('Please enter contact number');
                            }
                        }
                        else {
                            alertify.error('Please enter email id');
                        }
                    }
                    else {
                        alertify.error('Please enter state');
                    }

                }
                else {
                    alertify.error('Please enter city');
                }
            }
            else {
                alertify.error('Please enter company name');
            }
        }
        else {
            alertify.error('Please select any customer type');
        }
    }
    else {
        alertify.error('Please enter customer name');
    }
}
*/

/*
function AddNewCustomer() {
    $('#txtCustomerName').val('');
    $('#ddlCustomerType').val('');
    $('#txtCompanyName').val('');
    $('#ddlCity').val('');
    $('#ddlState').val('');
    $('#txtEmail').val('');
    $('#txtMobile').val('');
    $('#CustomerAddModal').modal('show');
    $('.modal-backdrop').remove();
}

function AddCustomerType() {
    $('#txtCustomerType').val('');
    $('#CustomerTypeAddModal').modal('show');
    $('.modal-backdrop').remove();
}

function AddNewCustomerType() {

    if ($('#txtCustomerType').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfPmSalesOrder.aspx/AddCustomerType',
            data: JSON.stringify({
                "CustomerType": $('#txtCustomerType').val().trim()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var str = "success";
                if (response.d.indexOf(str) != -1) {
                    alertify.success(response.d);

                    $('#txtCustomerType').val('');
                    $('#CustomerTypeAddModal').modal('hide');
                    BindCustomerTypeDropdown();
                }
                else {
                    alertify.error(response.d);
                }

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        alertify.error('Please enter customer type');
    }

}
*/

function PrintPreview() {
    showLoader();

    // Call the server-side method to get the PDF content
    $.ajax({
        type: 'POST',
        url: 'wfPmSalesOrder.aspx/GetPdfContent',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            "SalesOrderId": $('#hdnSalesOrderId').val()
        }),
        dataType: 'json',
        success: function (response) {
            setTimeout(function () {
                hideLoader();


                // Display the PDF content in the modal
                $('#pdfPreview').attr('src', 'data:application/pdf;base64,' + response.d);
                $('#pdfModal').modal('show');
                $('.modal-backdrop').remove();
            }, 1000); // Hide loader after 3 seconds

        },
        error: function (xhr, status, error) {
            console.log('Error fetching PDF:', error);
        }
    });

}

function ClosePDFModal() {
    $('#pdfModal').modal('hide');
}