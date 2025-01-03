
$(document).ready(function () {
    $("#saveDataBtn,.preventDefault").click(function (event) {
        event.preventDefault();
    });

    $('#ddlQuotationId').select2();

   


    // Initialize Bootstrap Datepicker
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        startDate: '0d' // Restrict to the current date and future dates
    });

    BindQuotationDropdown();
   // fetchDataList();
     BindCurrencyDropdown();
     BindBranchDropdown();
    BindDepartmentDropdown()
    BindSalesOrderMasterList();
    GetPaymentMode();

   
   

});
function getCurrentDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (today.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero if needed
    var year = today.getFullYear();
    return year + "-" + month + "-" + day;
}
function BindSalesOrderMasterList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfSdSalesQuotationOrder.aspx/FetchSalesOrderMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

          

                $('#tblSalesOrderList').DataTable().clear();
                $('#tblSalesOrderList').DataTable().destroy();
                $('#tbody_SalesOrder_List').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr><td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + data[i].SalesOrderId + '</td>'
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

                        + '<td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + (data[i].TotalAmount != undefined ? data[i].TotalAmount : '0') + '</td></tr>';
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
                hideLoader();


           





            

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesQuotationOrder.aspx/GetBranchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlBranch').html('');
            var ddlBranch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ddlBranch = ddlBranch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }

            $("#ddlBranch").append(ddlBranch);
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
        url: 'wfSdSalesQuotationOrder.aspx/GetDeptDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlDept').html('');
           /* var ddlDept = "<option value=''>-Select Department-</option>";*/
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ddlDept = ddlDept + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }

            $("#ddlDept").append(ddlDept);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindCurrencyDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesQuotationOrder.aspx/BindCurrencyList',
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
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Currency + "</option>";
            }
            $('#ddlCurrency').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindQuotationDropdown() {
    $('#ddlQuotationId').empty();
    $.ajax({
        type: "POST",
        url: 'wfSdSalesQuotationOrder.aspx/GetQuotationList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            // var abranch = "<option value=''>-Select Customer-</option>";
            var abranch = ' <option value="">-Select Quotation Id-</option>';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].QuotationId + "'>" + JSON.parse(response.d)[i].QuotationId  + "</option>";
            }
            $('#ddlQuotationId').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function GetQuotationIdDetails() {
    if ($('#ddlQuotationId').val() != '' && $('#ddlQuotationId').val() != null) {
        showLoader();
        $.ajax({
            type: "POST",
            url: 'wfSdSalesQuotationOrder.aspx/GetQuotationIdDetailsById',
            data: JSON.stringify({
                "QuotationId": $('#ddlQuotationId').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);

                setTimeout(function () {

                    $('#txtQuotationDate').val(data.SalesQuotationMastertInfo.formattedQuotationDate);
                    $('#txtCustomer').val(data.SalesQuotationMastertInfo.CustomerName + " " + data.SalesQuotationMastertInfo.Mobile)
                    $('#hdnCustomerId').val(data.SalesQuotationMastertInfo.CustomerId);
                    $('#txtDeliveryCharges').val(data.SalesQuotationMastertInfo.DeliveryCharges);

                    var html = '';
                    for (var i = 0; i < data.SalesItems[0].Table.length; i++) {
                        html = html + '<tr><td><input type="checkbox" class="rowCheckbox"><input type="hidden" value="' + data.SalesItems[0].Table[i].CentralTaxPercent + '" class="hdnCentralTaxPercent"><input type="hidden" value="' + data.SalesItems[0].Table[i].StateTaxPercent + '" class="hdnStateTaxPercent"><input type="hidden" value="' + data.SalesItems[0].Table[i].CessPercent +'" class="hdnCessPercent"></td>'
                            + '<td class="materialID" style="display:none">' + data.SalesItems[0].Table[i].MaterialId + '</td>'
                            + '<td class="SalesQuotationDetailId" style="display:none">' + data.SalesItems[0].Table[i].SalesQuotationDetailId + '</td>'
                            + '<td class="materialName">' + data.SalesItems[0].Table[i].materialName + '</td>'
                            + '<td class="Qty">' + data.SalesItems[0].Table[i].Qty + '</td>'
                            + '<td class="UnitMeasure">' + data.SalesItems[0].Table[i].UnitMeasure + '</td>'
                            + '<td class="Rate">' + parseFloat(data.SalesItems[0].Table[i].Rate).toFixed(2) + '</td>'
                            + '<td class="Discount">' + parseFloat(data.SalesItems[0].Table[i].Discount).toFixed(2) + '</td>'
                            + '<td class="GST">' + parseFloat(data.SalesItems[0].Table[i].GST).toFixed(2) + '</td>'
                            + '<td class="amount">' + parseFloat(data.SalesItems[0].Table[i].Amount).toFixed(2) + '</td></tr>';


                    }





                    $('#tbody_SalesOrderDetails').html(html);




                    $('#selectAll').change(function () {
                        // Set the checked property of all row checkboxes to match the header checkbox
                        $('.rowCheckbox').prop('checked', $(this).prop('checked'));
                        GetTotalAmount();
                    });

                    $('.rowCheckbox').change(function () {
                        GetTotalAmount();

                    });
                    hideLoader();
                },1000);
              //  $('#txtCustomer').val(data[0].CustomerName + " " + data[0].Mobile);
              
               
                
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        
    }
}


function AddSalesOrder() {
    if ($('#ddlCustomer').val() == '') {
        alertify.error('Please select any Customer');
        return;
    }
    else if ($('#txtExpirationDate').val() == '') {
        alertify.error('Please select any Expiration Date');
        return;
    }
    else if ($('#ddlDept').val() == '') {
        alertify.error('Please select any Department');
        return;
    }
    else if ($('#txtQuotationDate').val() == '') {
        alertify.error('Please select any Quotation');
        return;
    }
    else if ($('#ddlBranch').val() == '') {
        alertify.error('Please select any Branch');
        return;
    }
    else if ($('#ddlPaymentMode').val() === '-1') {
        alertify.error('Please select payment mode');
        return;
    }
  

    var found = false;
    $("#tbody_SalesOrderDetails tr").each(function () {
        if ($(this).find('.rowCheckbox').is(':checked')) {
            found = true;
        }
    });
    if (found == false) {
        alertify.error('Please Select any Sales Order Lines');
        return;
    }

    showLoader();
    var data = [];
    $("#tbody_SalesOrderDetails tr").each(function () {
        if ($(this).find('.rowCheckbox').is(':checked')) {

            var materialID = $(this).find('.materialID').text();
            var SalesQuotationDetailId = $(this).find('.SalesQuotationDetailId').text();
            var Qty = $(this).find('.Qty').text();
            var UnitMeasure = $(this).find('.UnitMeasure').text();
            var Rate = $(this).find('.Rate').text();
            var GST = $(this).find('.GST').text();
            var Discount = $(this).find('.Discount').text();
            var amount = $(this).find('.amount').text();


            data.push({ ItemID: materialID, Quantity: Qty, Rate: Rate, GST: GST, UnitMeasure: UnitMeasure, Amount: amount, SalesQuotationDetailId: SalesQuotationDetailId, Discount: Discount });
        }

        
    });

    // Send data to server using AJAX
    $.ajax({
        type: "POST",
        url: "wfSdSalesQuotationOrder.aspx/AddSalesOrder", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            data: data,
            "QuotationId": $('#ddlQuotationId').val(),
            "SalesOrderId": $('#txtSalesOrderId').val(),
            "CustomerId": $('#hdnCustomerId').val(),
            "ExpirationDate": $('#txtExpirationDate').val(),
            "GSTTreatment": $('#ddlGSTTreatment').val(),
             "QuotationDate": $('#txtQuotationDate').val(),
            "Currency": $('#ddlCurrency').val(),
            "PaymentTerms": $('#ddlPaymentTerms').val(),
            "TermsConditions": $('#txtTermsConditions').val(),
            "TotalAmount": $('#txtTotalAmount').val(),
            "OrderSource": "Quotation",
            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "BranchCode": $('#ddlBranch').val(),
            "DepartmentID": $('#ddlDept').val(),
            "OrderDate": $('#txtorderDate').val(),
            "DeliveryCharges": $('#txtDeliveryCharges').val(),
            "OutstandingAmount": $('#txtOutstandingAmount').val(),
            "Advance": $('#txtAdvance').val(),
            "PaymentMode": $("#ddlPaymentMode").val(),
            "AcNo": $("#txtAcNo").val()
        }),
        dataType: "json",
        success: function (response) {
           

            setTimeout(function () {
                hideLoader();
                alertify.success('Sales Quotation details added successfully');
                ClearAll();

            }, 1000); // Hide loader after 3 seconds
        },
        error: function (error) {
            console.log(error);
            alertify.error("Error saving data. Please try again.");
        }
    });
}


function GetTotalAmount() {
    var grandTotal = 0;
    var grandTotalGST = 0;
    var shippingCharges = parseFloat($('#txtDeliveryCharges').val());
    var centralTaxValue = 0;
    var stateTaxValue = 0;
    var cessTaxValue = 0;

    var centralTaxPercent = 0;
    var stateTaxPercent = 0;
    var cessTaxPercent = 0;
    $('#tbody_SalesOrderDetails tr').each(function () {
        if ($(this).find('.rowCheckbox').is(':checked')) {
            centralTaxPercent = parseFloat($(this).find('.hdnCentralTaxPercent ').val());
            stateTaxPercent = parseFloat($(this).find('.hdnStateTaxPercent ').val());
            cessTaxPercent = parseFloat($(this).find('.hdnCessPercent ').val());

            if (isNaN(centralTaxPercent)) centralTaxPercent = 0;
            if (isNaN(stateTaxPercent)) stateTaxPercent = 0;
            if (isNaN(cessTaxPercent)) cessTaxPercent = 0;

            var amount = parseFloat($(this).find('.amount').text());
            centralTaxValue += (amount * (centralTaxPercent / 100));
            stateTaxValue += (amount * (stateTaxPercent / 100));
            cessTaxValue += (amount * (cessTaxPercent / 100));

            grandTotal += parseFloat($(this).find('.amount').text());
        }
    });
    grandTotalGST = centralTaxValue + stateTaxValue + cessTaxValue;
    grandTotal += shippingCharges
    $('#txtNetGST').val(grandTotalGST.toFixed(2));
    $('#txtCentralTax').val(centralTaxValue.toFixed(2));
    $('#txtStateTax').val(stateTaxValue.toFixed(2));
    $('#txtTotalAmount').val(grandTotal.toFixed(2));
    var outstanding = 0;
    var advance = 0;
    advance = parseFloat($('#txtAdvance').val());
    outstanding = grandTotal - advance;
    $('#txtOutstandingAmount').val(outstanding.toFixed(2));
}

function GenerateOrderID() {
    if ($('#txtorderDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesQuotationOrder.aspx/GenerateOrderID',
            data: JSON.stringify({
                "OrderDate": $('#txtorderDate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtSalesOrderId').val(data[0].SalesOrderId);


            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtSalesOrderId').val('');
    }
}

function ViewSalesOrderList() {
    $('#divDataList').show();
    $('#divDataEntry').hide();
    $('#divDataEntryDetails').hide();
   // $('#divSalesOrderDetails').hide();
    $('#previewBtn').hide();
    $('#saveDataBtn').hide();
      BindSalesOrderMasterList();
}
function ClearAll() {
    $('#tbody_SalesOrderDetails tr').remove();
    $('#txtSalesOrderId').val('');
    $('#hdnCustomerId').val('');
    $('#txtExpirationDate').val('');
    $('#txtQuotationDate').val('');
    $('#txtTermsConditions').val('');
    $('#txtTotalAmount').val('0');
    // Set the value of the date input to today's date
    $("#txtorderDate").val(getCurrentDate());
    GenerateOrderID();
    $('#txtCustomer').val('');
    $('#txtOutstandingAmount').val('0');
    $('#txtDeliveryCharges').val('0');
    $('#txtAdvance').val('0');
    $('#txtNetGST').prop('disabled', false).val('0').prop('disabled', true);
    $('#txtCentralTax').prop('disabled', false).val('0').prop('disabled', true);
    $('#txtStateTax').prop('disabled', false).val('0').prop('disabled', true);
    $('#ddlGSTTreatment').val('Registered Business - Regular').trigger('change');
    $('#ddlCurrency').val('1').trigger('change');;
    $('#ddlPaymentTerms').val('Immediate Payment').trigger('change');;
    $('#ddlBranch').val('').trigger('change');;
    $('#ddlDept').val('').trigger('change');;
    BindQuotationDropdown();
    $('#ddlQuotationId').val('').trigger('change');;
    $("#txtAcNo").val('');
}

function CreateData() {
    //  $('#divEmpJobList').hide();
    $('#divDataList').hide();
    $('#divDataEntryDetails').hide();
   $('#previewBtn').hide();
     $('#divDataEntry').show();
    $('#saveDataBtn').show();
    
    ClearAll();
    GetPaymentMode();

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();


    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    $("#txtExpirationDate").val(year + "-" + month + "-" + day);

    $("#ddlDept").val("1").change();
}
function FetchSalesOrderMasterDetails(id, OrderStatus) {
   
    showLoader();

        $.ajax({
            type: "POST",
            url: 'wfSdSalesQuotationOrder.aspx/FetchSalesOrderMasterDetails',
            data: JSON.stringify({
                "SalesOrderId": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#dispQuotationDate').val(data.SalesQuotationOrderMastertInfo.formattedQuotationDate);
                $('#dispCustomer').val(data.SalesQuotationOrderMastertInfo.CustomerName + " " + data.SalesQuotationOrderMastertInfo.Mobile)
                $('#dispQuotationId').val(data.SalesQuotationOrderMastertInfo.QuotationId);
                $('#disporderDate').val(data.SalesQuotationOrderMastertInfo.formattedOrderDate);
                $('#dispSalesOrderId').val(data.SalesQuotationOrderMastertInfo.SalesOrderId);
                $('#dispGSTTreatment').val(data.SalesQuotationOrderMastertInfo.GSTTreatment);
                $('#dispPaymentTerms').val(data.SalesQuotationOrderMastertInfo.PaymentTerms);
                $('#dispCurrency').val(data.SalesQuotationOrderMastertInfo.Currency);
                $('#dispBranch').val(data.SalesQuotationOrderMastertInfo.BranchName);
                $('#dispDept').val(data.SalesQuotationOrderMastertInfo.DeptName);
                $('#dispTotalAmount').val(parseFloat(data.SalesQuotationOrderMastertInfo.TotalAmount).toFixed(2));
                $('#dispTermsConditions').val(data.SalesQuotationOrderMastertInfo.TermCondition);
                $('#dispDeliveryCharges').val(parseFloat(data.SalesQuotationOrderMastertInfo.DeliveryCharges).toFixed(2));
                $('#dispOutstandingAmount').val(parseFloat(data.SalesQuotationOrderMastertInfo.OutstandingAmount).toFixed(2));
                $('#dispAdvance').val(parseFloat(data.SalesQuotationOrderMastertInfo.Advance).toFixed(2));

                $('#dispExpirationDate').val(data.SalesQuotationOrderMastertInfo.formattedExpirationDate);

                var centralTaxValue = 0;
                var stateTaxValue = 0;
                var cessTaxValue = 0;

                var centralTaxPercent = 0;
                var stateTaxPercent = 0;
                var cessTaxPercent = 0;
                var NetGST = 0;
                var html = '';
                for (var i = 0; i < data.SalesItems[0].Table.length; i++) {
                    html = html + '<tr>'
                        + '<td class="materialID" style="display:none">' + data.SalesItems[0].Table[i].MaterialId + '</td>'
                      
                        + '<td class="materialName">' + data.SalesItems[0].Table[i].MaterialName + '</td>'
                        + '<td class="Qty">' + data.SalesItems[0].Table[i].Qty + '</td>'
                        + '<td class="UnitMeasure">' + data.SalesItems[0].Table[i].UnitMesure + '</td>'
                        + '<td class="Rate">' + data.SalesItems[0].Table[i].UnitPrice + '</td>'
                        + '<td class="GST">' + data.SalesItems[0].Table[i].Tax + '</td>'
                        + '<td class="amount">' + data.SalesItems[0].Table[i].SubTotal + '</td></tr>';
                    centralTaxPercent = parseFloat(data.SalesItems[0].Table[i].CentralTaxPercent);
                    stateTaxPercent = parseFloat(data.SalesItems[0].Table[i].StateTaxPercent);
                    cessTaxPercent = parseFloat(data.SalesItems[0].Table[i].CessPercent);

                    var amount = parseFloat(data.SalesItems[0].Table[i].SubTotal);

                    centralTaxValue += (amount * (centralTaxPercent / 100));
                    stateTaxValue += (amount * (stateTaxPercent / 100));
                    cessTaxValue += (amount * (cessTaxPercent / 100));
                }
                NetGST = centralTaxValue + stateTaxValue + cessTaxValue;
                $('#dispNetGST').val(parseFloat(NetGST).toFixed(2));
                $('#dispCentralTax').val(parseFloat(centralTaxValue).toFixed(2));
                $('#dispStateTax').val(parseFloat(stateTaxValue).toFixed(2));



                $('#disptbody_SalesOrderDetails').html(html);
                $('#divDataList').hide();
                $('#divDataEntry').hide();
                $('#saveDataBtn').hide();
                $('#divDataEntryDetails').show();
                $('#previewBtn').show();
                hideLoader();
              
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
}


function PrintPreview() {
    // showLoader();
    window.open('wfSdSalesQuotationOrder_display.aspx?id=' + $('#dispSalesOrderId').val(), "_blank");
    // Call the server-side method to get the PDF content
    //$.ajax({
    //    type: 'POST',
    //    url: 'wfSdSalesQuotationOrder.aspx/GetPdfContent',
    //    contentType: 'application/json; charset=utf-8',
    //    data: JSON.stringify({
    //        "SalesOrderId": $('#dispSalesOrderId').val()
    //    }),
    //    dataType: 'json',
    //    success: function (response) {
    //        setTimeout(function () {
    //            hideLoader();


    //            // Display the PDF content in the modal
    //            $('#pdfPreview').attr('src', 'data:application/pdf;base64,' + response.d);
    //            $('#pdfModal').modal('show');
    //        }, 1000); // Hide loader after 3 seconds

    //    },
    //    error: function (xhr, status, error) {
    //        console.log('Error fetching PDF:', error);
    //    }
    //});

}

function ClosePDFModal() {
    $('#pdfModal').modal('hide');
}

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

function BindPaymentMode(data) {
    $('#ddlPaymentMode').empty().append('<option selected    value="-1">-Select Payment Mode-</option>');

    $.each(data, function (i, item) {

        $("#ddlPaymentMode").append(
            $('<option></option>').val(item.Name).html(item.Name)
        );
    });

}
function GetPaymentMode() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesQuotationOrder.aspx/GetPaymentMode',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            BindPaymentMode(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function DownloadExcel(salesOrederId = '') {
    if ($(salesOrederId).attr("id") === 'exportSOPL') {

        if ($("#ddlSalesOrders").val() === '-1') {
            alertify.error("Please Select SalesOrder");
            return;
        }
        salesOrederId = $("#ddlSalesOrders").val();
    }

    $.ajax({
        type: "POST",
        url: 'wfSdSalesQuotationOrder.aspx/DownloadFile',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ salesOrederId: salesOrederId }),
        beforeSend: function () { },
        success: function (r) {
            //Convert Base64 string to Byte Array.
            var bytes = Base64ToBytes(r.d.FileString);

            //Convert Byte Array to BLOB.
            var blob = new Blob([bytes], { type: "application/octetstream" });
            var fileName = r.d.FileName;
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
                //$("body").remove(a);
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};