var IsGstInclude = "";
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlCustomer').select2();
    $('#ddlMaterialName').select2();    
   
    BindCurrencyDropdown();
    BindCustomerTypeDropdown();
    BindStateDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown()
    BindSalesOrderMasterList();
    // Initialize Bootstrap Datepicker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
      
    });
  
    // Detect Ctrl+S key press
    $(document).on("keydown", function (event) {
        // Check if Ctrl key is pressed along with 'S' key
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default save dialog
            AddSalesOrder(); // Call the save function
        }
    });
   
    attachKeydownListeners();

    GetPaymentMode();

    $("#ddlPaymentMode").val("-1").change();
});



function GetPaymentMode() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/GetPaymentMode',
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
function BindPaymentMode(data) {
    $('#ddlPaymentMode').empty().append('<option selected    value="-1">-Select Payment Mode-</option>');

    $.each(data, function (i, item) {

        $("#ddlPaymentMode").append(
            $('<option></option>').val(item.Name).html(item.Name)
        );
    });

}
function attachKeydownListeners() {
    $("#ddlCustomer").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            setTimeout(function () {
                $("#txtorderDate").focus(); // Trigger click to open the calendar popup
            }, 300);
        }
    });

    $("#ddlCustomer").on("change", function (event) {
        if ($('#hdnSalesOrderId').val() == '') {
            setTimeout(function () {
                $("#txtorderDate").focus(); // Trigger click to open the calendar popup
            }, 300);
        }
           
       
    });
 
    $("#txtorderDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlGSTTreatment").focus();
        }
    });
    $("#ddlGSTTreatment").focus(function () {
        $(this).dropdown("toggle"); // This opens the dropdown
    });
    $("#ddlGSTTreatment").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtDeliveryDate").focus();
        }
    });
    
    $("#txtDeliveryDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlCurrency").focus();
        }
    });

    $("#ddlCurrency").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlDept").focus();
        }
    });

  

    $("#ddlDept").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtExpirationDate").focus();
        }
    });

    $("#txtExpirationDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtTermsConditions").focus();
        }
    });

    $("#txtTermsConditions").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlPaymentTerms").focus();
        }
    });

    $("#ddlPaymentTerms").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlBranch").focus();
        }
    });

  

    $("#ddlBranch").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtManualOrderId").focus();
        }
    });

    $("#txtManualOrderId").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtDeliveryCharges").focus();
        }
    });

    $("#txtDeliveryCharges").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtAdvance").focus();
        }
    });

    $("#txtAdvance").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlMaterialName").focus();
        }
    });

    $("#ddlMaterialName").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtMaterialQty").focus();
        }
    });

    $("#txtMaterialQty").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#ddlPackage").focus();
        }
    });

    $("#ddlPackage").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtMaterialRate").focus();
        }
    });
    $("#txtMaterialRate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#txtMaterialDiscount").focus();
        }
    });

    $("#txtMaterialDiscount").on("keydown", function (event) {
        console.log("Key pressed:", event.key);  // Debug log
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Enter key pressed, running functions...");
            UpdateTotalAmount();
            SaveSalesOrderDetails();
        }
    });
}


// Function to handle numeric input
function checkInputGiven(event) {
    var value = event.target.value;
    if (/^\d\.$/.test(value)) { // Checks if input is a single digit followed by a dot
        event.target.value = value.charAt(0); // Sets the value to the single digit
    }
    // Allow focus to change
    $(event.target).trigger('focusout');
}
function handleNumericInput(event) {
    // Get the input element
    var inputElement = event.target;

    // Remove non-numeric characters (except decimal point)
    var numericValue = inputElement.value.replace(/[^\d.]/g, '');

    // Handle multiple decimal points
    numericValue = numericValue.replace(/(\..*)\./g, '$1');

    // Limit to two decimal places
    numericValue = numericValue.replace(/(\.\d{2})\d+$/g, '$1');

    // If the input starts with a decimal point, add a leading zero
    if (numericValue.charAt(0) === '.') {
        numericValue = '0' + numericValue;
    }

    // Set the default value to 0 if the input is empty
    if (numericValue === '') {
        numericValue = '0';
    }

    // Handle leading zeros
    if (numericValue.length > 1 && numericValue.charAt(0) === '0' && numericValue.charAt(1) !== '.') {
        numericValue = numericValue.slice(1); // Remove leading zero
    }

    // Update the input value
    inputElement.value = numericValue;
}

function GenerateOrderID() {
    if ($('#txtorderDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrder.aspx/GenerateOrderID',
            data: JSON.stringify({
                "OrderDate": $('#txtorderDate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtSaleOrderId').val(data[0].SalesOrderId);


            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtSaleOrderId').val('');
    }
}



function CheckManualOrderId() {
    if ($('#txtManualOrderId').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrder.aspx/CheckManualOrderId',
            data: JSON.stringify({
                "ManualOrderId": $('#txtManualOrderId').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                if (data == "false") {
                   
                    alertify.error('Manual Order Id already exits.');
                    $('#txtManualOrderId').val('')
                } else {

                }


            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtSaleOrderId').val('');
    }
}

function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/GetBranchDetails',
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
        url: 'wfSdSalesOrder.aspx/GetDeptDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlDept').html('');
            //var ddlDept = "<option value=''>-Select Department-</option>";
            var ddlDept = "";
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


function BindMaterialPackagingDropdown(materialid) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/MaterialPackagingList',
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
                req = req + "<option value='" + JSON.parse(response.d)[i].id + "'>" + JSON.parse(response.d)[i].Packaging + "</option>";
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
        url: 'wfSdSalesOrder.aspx/MaterialMasterList',
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
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + '-' + JSON.parse(response.d)[i].MaterialName + "</option>";
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
        url: 'wfSdSalesOrder.aspx/FetchStateList',
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
        url: 'wfSdSalesOrder.aspx/FetchCityList',
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
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/BindCurrencyList',
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



function BindCustomerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/CustomerMasterList',
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
                
                branch = branch + "<option value='" + JSON.parse(response.d)[i].CustomerId + "'>" + JSON.parse(response.d)[i].CustomerName + '--' + JSON.parse(response.d)[i].Phone + "</option>";
            }
            $('#ddlCustomer').append(branch);
            $('#ddlCustomer').focus();
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
        url: 'wfSdSalesOrder.aspx/CustomerTypeMasterList',
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
   
   
    $("ddlCustomer").focus();
    $("#ddlDept").val("1").change();
    $("#chkIsActive").prop("disabled", true);
    $("#chkIsActive").prop("checked", true);

    $("#chkIsSquareUp").prop("disabled", true);
    $("#chkIsSquareUp").prop("checked", false);
    $("#ddlPaymentMode").val("-1").change();
    $("#txtAcNo").val("");
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
     $('#txtMaterialQty').val('');
    $('#txtMaterialDiscount').val('');
    $('#txtMaterialStock').val('');
    $('#txtMaterialUnitMeasure').val('');
    $('#ddlPackage').html("<option value=''>-Select Package-</option>");
    $('#txtMaterialRate').val('');
    $('#txtMaterialTax').val('');
    $('#txtMaterialTotalAmount').val('');
    $("#txtExpirationDate").val(getCurrentDate());
    $('#txtShippingCharges').val(0);
    $('#ddlGSTTreatment').val('Registered Business - Regular');
    $('#ddlCurrency').val('1');
    $('#ddlPaymentTerms').val('Immediate Payment');
    $('#txtTermsConditions').val('');
    $('#txtTotalAmount').val('');
    $('#hdnSalesOrderId').val('');
    $('#txtNetAmount').val(0);
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
    $('#txtDeliveryDate').val(getCurrentDate());
    $('#txtManualOrderId').val('');
    $('#txtDeliveryCharges').val('0');
    $('#txtOutstandingAmount').val('0');
    $('#txtAdvance').val('0');
    $('#txtQuotationId').val('');

    $('#btnConfirm').hide();
    $('#btnCancel').hide();
    $('#previewBtn').hide();
    $('#ddlCustomer').select2('destroy');
    $('#ddlCustomer').html('<option value="">-Select Customer-</option>');
    $('#ddlCustomer').select2();
    BindCustomerDropdown();

    $('#ddlMaterialName').select2('destroy');
    $('#ddlMaterialName').html('<option value="">-Select Customer-</option>');
    $('#ddlMaterialName').select2();
    BindMaterialMasterDropdown();
    $("#ddlPaymentMode").val("-1").change();
    $("#txtAcNo").val("");
    $("#txtNetGST").val("0.00");
    $("#txtStateTax").val("0.00");
    $("#txtCentralTax").val("0.00");
    $("#chkIsActive").prop("disabled", true);
    $("#chkIsActive").prop("checked", true);
    $("#chkIsSquareUp").prop("disabled", true); 
    $("#chkIsSquareUp").prop("checked", false);
}

function BindSalesOrderMasterList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrder.aspx/FetchSalesOrderMasterList',
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
                    html = html + '<tr><td><input type="checkbox" id="chekSOList" data-soID=' + data[i].SalesOrderId +' class="editor-active"></td><td style="white-space: nowrap;" onclick="FetchSalesOrderMasterDetails(\'' + data[i].SalesOrderId + '\',\'' + data[i].OrderStatusId + '\');">' + data[i].SalesOrderId + '</td>'
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
                            },
                            'orderable': false,
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
                hideLoader();
            }, 1000);



           

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

// Function to format the date as mm/dd/yyyy
function formatDate(date) {
    var day = ("0" + date.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero if needed
    var year = date.getFullYear();

   

    return month + '/' + day + '/' + year;
}

function FetchSalesOrderMasterDetails(id, OrderStatus) {
    if (OrderStatus == '1' || OrderStatus == '2') {
        showLoader();

        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrder.aspx/FetchSalesOrderMasterDetails',
            data: JSON.stringify({
                "SalesOrderId": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                setTimeout(function () {
                    var data = JSON.parse(response.d);
                    ClearAll();
                    $('#divSalesOrderList').hide();
                    $('#divSalesOrderEntry').show();
                    $('#divSalesOrderDetails').show();
                    $('#btnSave').show();
                    $('#btnExport').hide();
                    $('#btnView').show();
                    $('#txtSaleOrderId').val(id);
                    //  (data[i].SalesOrderSource != undefined ? data[0].SalesOrderSource : '')
                    $('#ddlGSTTreatment').val((data[0].GST_Treatment != undefined ? data[0].GST_Treatment : ''));
                    $('#ddlCurrency').val((data[0].CurrencyId != undefined ? data[0].CurrencyId : ''));
                    $('#ddlPaymentTerms').val((data[0].PaymentTerms != undefined ? data[0].PaymentTerms : ''));
                    $('#txtTermsConditions').val((data[0].TermCondition != undefined ? data[0].TermCondition : ''));
                    $('#txtTotalAmount').val((data[0].TotalAmount != undefined ? data[0].TotalAmount : ''));
                    $('#txtShippingCharges').val((data[0].ShippingCharges != undefined ? data[0].ShippingCharges : ''));
                    $('#txtNetAmount').val((data[0].NetAmount != undefined ? data[0].NetAmount : ''));
                    $('#txtOutstandingAmount').val((data[0].OutstandingAmount != undefined ? data[0].OutstandingAmount : ''));
                    $('#txtAdvance').val((data[0].Advance != undefined ? data[0].Advance : ''));
                    $('#ddlBranch').val((data[0].BranchCode != undefined ? data[0].BranchCode : ''));
                    $('#ddlDept').val((data[0].DepartmentID != undefined ? data[0].DepartmentID : ''));
                    IsGstInclude = data[0].GST_Treatment != undefined ? data[0].GST_Treatment : 'y'
                    if (data[0].ExpirationDate != undefined) {
                        var dtExpirationDate = new Date(data[0].ExpirationDate);
                        $('#txtExpirationDate').val(formatDate(dtExpirationDate));
                    }
                    else {
                        $('#txtExpirationDate').val(getCurrentDate());
                    }
                    //  var dtQuotationDate = new Date(data[0].QuotationDate);
                    //   document.getElementById("txtQuotationDate").valueAsDate = dtQuotationDate;
                    $('#hdnSalesOrderId').val((data[0].SalesOrderId != undefined ? data[0].SalesOrderId : ''));
                    $('#txtSaleOrderId').val((data[0].SalesOrderId != undefined ? data[0].SalesOrderId : ''));
                    $('#txtManualOrderId').val((data[0].ManualOrderId != undefined ? data[0].ManualOrderId : ''));
                    if (data[0].DeliveryDateTime != undefined) {
                        var dtDeliveryDate = new Date(data[0].DeliveryDateTime.split('T')[0]);
                        $('#txtDeliveryDate').val(formatDate(dtDeliveryDate));
                    }
                    else {
                        $('#txtDeliveryDate').val(getCurrentDate());
                    }
                    $('#txtQuotationId').val((data[0].SalesQuotationMasterId != undefined ? data[0].SalesQuotationMasterId : ''));
                    if (data[0].OrderDate != undefined) {
                        var dtOrderDate = new Date(data[0].OrderDate.split('T')[0]);
                        $('#txtorderDate').val(formatDate(dtOrderDate));
                        //$('#txtOrderDate').datepicker('setDate', dtOrderDate); // Set datepicker value
                    }

                    $("#chkIsActive").prop("checked", data[0].Active == 'y' ? true : false);
                    $("#chkIsActive").prop("disabled",false);

                    $("#chkIsSquareUp").prop("checked", data[0].SquareUp == 'y' ? true : false);
                    $("#chkIsSquareUp").prop("disabled", false);



                    $('#txtDeliveryCharges').val((data[0].Deliveycharges != undefined ? data[0].Deliveycharges : ''));

                    $('#ddlPaymentMode').val(data[0].PaymentMode);
                    $('#txtAcNo').val(data[0].AcNo);





                    FetchSalesOrderDetailsList(data[0].SalesOrderId);
                    if (OrderStatus == '1') {
                        $('#btnConfirm').show();
                        $('#btnCancel').show();
                    }
                    $('#previewBtn').show();
                    //$('#ddlCustomer').select2("val", data[0].CustomerId)
                    setTimeout(function () {
                        $('#ddlCustomer').val(data[0].CustomerId).trigger('change');

                    }, 30);
                    setTimeout(function () {

                        $('#ddlCustomer').focus();
                    }, 30);
                    hideLoader();
                }, 200);
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
        url: 'wfSdSalesOrder.aspx/FetchSalesOrderDetailsList',
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
            var centralTaxValue = 0;
            var stateTaxValue = 0;
            var cessTaxValue = 0;

            var centralTaxPercent = 0;
            var stateTaxPercent = 0;
            var cessTaxPercent = 0;
            var NetGST = 0;
            for (var i = 0; i < data.length; i++) {
                //centralTaxPercent = parseFloat(data[i].CentralTaxPercent);
                //stateTaxPercent = parseFloat(data[i].StateTaxPercent);
                //cessTaxPercent = parseFloat(data[i].CessPercent);
                var amount = parseFloat(data[i].SubTotal);

                centralTaxValue += parseFloat(data[i].CentralTaxValue);
                stateTaxValue += parseFloat(data[i].StateTaxValue);
                cessTaxValue += parseFloat(data[i].CessValue);
                IsGstInclude = data[i].GstIncludeRate;
                $('#tbody_SalesOrderDetails').append('<tr><td style="display: none;">' + data[i].MaterialId + '<input type="hidden" value="' + data[i].CentralTaxPercent + '" class="hdnCentralTaxPercent"><input type="hidden" value="' + data[i].StateTaxPercent + '" class="hdnStateTaxPercent"><input type="hidden" value="' + data[i].CessPercent +'" class="hdnCessPercent"></td>'
                    + '<td style="width: 250px;">' + (data[i].MaterialName != undefined ? data[i].MaterialName : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].Stock != undefined ? data[i].Stock : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].Qty != undefined ? data[i].Qty : "") + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].Packaging != undefined ? data[i].Packaging : "") + '</td>'
                    + '<td style="display: none;">' + (data[i].PackageId != undefined ? data[i].PackageId : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].DiscountPercent != undefined ? data[i].DiscountPercent : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].Tax != undefined ? data[i].Tax : "") + '</td>'
                    + '<td style="width: 100px;">' + (data[i].SubTotal != undefined ? data[i].SubTotal : "") + '</td>'
                    + '<td><a onclick="DeleteSalesOrderDetailEntry(this,' + data[i].MaterialId + ');"  data-soid="' + salesorderid +'" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
            }
            NetGST = centralTaxValue + stateTaxValue + cessTaxValue;
            debugger;
            $('#txtNetGST').val(NetGST.toFixed(2));
            $('#txtCentralTax').val(centralTaxValue.toFixed(2));
            $('#txtStateTax').val(stateTaxValue.toFixed(2));

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

    //var table = new DataTable('#tblSalesOrderList');

    //table
    //    .column(0)
    //    .data()
    //    .each(function (value, index,node) {
    //        console.log('Data in index: ' + index + ' is: ' + value);
    //        debugger;
    //        //alert($(value).prop("checked"));
    //        if ($(value).prop("checked")==='true') {
    //            console.log($(value).attr("data-soID") )
    //        }
    //    });

    //$('#tbody_SalesOrder_List tr td:first-child').each(function (index1, td) {

    //    console.log($(td).find("#chekSOList").prop("checked"));
    //});
    //$('#tbody_SalesOrder_List tr').each(function (index1, tr) {
    //    chk = 0;

        //$(tr).find('td').each(function (index, td) {

            //if ($(tr).find("td").find("#chekSOList").prop("checked")===true) {

            //console.log($(tr).find("td:first-child").find("#chekSOList").prop("checked"));
           // }

        //});
        //$(tr).find('td').each(function (index, td) {
        //    if (index == 0) {
        //        if ($(td.children[0]).is(':checked')) {
        //            chk = 1;
        //        }
        //        else {
        //            chk = 0;
        //        }
        //    }

        //    if (index == 1) {
        //        if (chk == 1) {
        //            if (SalesOrderId == '') {
        //                SalesOrderId = td.outerText;
        //            }
        //            else {
        //                SalesOrderId = SalesOrderId + ',' + td.outerText;
        //            }
        //        }
        //    }
        //});
    //});


    //Naresh Singhal 
    var data = new DataTable('#tblSalesOrderList').column(0)
        .rows(function (idx, data, node) {
            // Get all the checkboxes in the row
            var cells = $(node).find('input[type="checkbox"]');
            if ($(cells).prop("checked")) {

                SalesOrderId = SalesOrderId + ',' + $(cells).attr("data-soID");
            }
        })
        .data()
        .toArray();

    if (SalesOrderId != '') {
        showLoader();
        $.ajax({
            type: "POST",
            url: "wfSdSalesOrder.aspx/FetchSalesOrderListDownload",
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
                    ///$("body").remove(a);
                }
                hideLoader();
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
        $('#ddlBranch').focus();
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
        showLoader();
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrder.aspx/FetchMaterialDetails',
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
                    $('#txtMaterialStock').val(data[0].Stock);
                    $('#hdnCentralTaxPercent').val(data[0].CentralTaxPercent);
                    IsGstInclude = data[0].GstIncludeRate;
                    $('#hdnStateTaxPercent').val(data[0].StateTaxPercent);

                    $('#hdnCessPercent').val(data[0].CessPercent);

                    BindMaterialPackagingDropdown($('#ddlMaterialName').val());
                    hideLoader();
                    $("#txtMaterialQty").focus();
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
    var grandNetTotal = 0;
    var grandTotalGST = 0;
    var deliveryCharges = parseFloat($('#txtDeliveryCharges').val());
    var shippingCharges = parseFloat($('#txtShippingCharges').val());
    shippingCharges = isNaN(shippingCharges) ? 0 : shippingCharges;
    deliveryCharges = isNaN(deliveryCharges) ? 0 : deliveryCharges;
    var centralTaxValue = 0;
    var stateTaxValue = 0;
    var cessTaxValue = 0;

    var centralTaxPercent = 0;
    var stateTaxPercent = 0;
    var cessTaxPercent = 0;
    // Iterate through each row in the table body
    $('#tbody_SalesOrderDetails tr').each(function (i) {
        if (i > 0) {
            centralTaxPercent = parseFloat($(this).find('.hdnCentralTaxPercent ').val());
            stateTaxPercent = parseFloat($(this).find('.hdnStateTaxPercent ').val());
            cessTaxPercent = parseFloat($(this).find('.hdnCessPercent ').val());

            if (isNaN(centralTaxPercent)) centralTaxPercent = 0;
            if (isNaN(stateTaxPercent)) stateTaxPercent = 0;
            if (isNaN(cessTaxPercent)) cessTaxPercent = 0;
            var totalAmount = parseFloat($(this)[0].cells[10].innerText);
            totalAmount = isNaN(totalAmount) ? 0 : totalAmount;
            centralTaxValue += (totalAmount * (centralTaxPercent / 100));
            stateTaxValue += (totalAmount * (stateTaxPercent / 100));
            cessTaxValue += (totalAmount * (cessTaxPercent / 100));
            grandTotal += totalAmount;
            
        }
    });
    grandTotalGST = centralTaxValue + stateTaxValue + cessTaxValue;
    grandNetTotal = grandTotal + shippingCharges + deliveryCharges;
    debugger;
     $('#txtNetGST').val(grandTotalGST.toFixed(2));
    $('#txtCentralTax').val(centralTaxValue.toFixed(2));
    $('#txtStateTax').val(stateTaxValue.toFixed(2));
    $('#txtTotalAmount').val(grandTotal.toFixed(2));
    $('#txtNetAmount').val(grandNetTotal.toFixed(2));
    var outstanding = 0;
    var advance = parseFloat($('#txtAdvance').val());
    advance = isNaN(advance) ? 0 : advance;
    outstanding = grandNetTotal - advance;
    //outstanding = grandTotal - advance;
    $('#txtOutstandingAmount').val(outstanding.toFixed(2));
}


function validateRows() {
    var isValid = true;
    var errorMessage = "";

 
        var itemName = $("#ddlMaterialName").val();
    var qty = $("#txtMaterialQty").val();
    var rate = $("#txtMaterialRate").val();
    var discount = $("#txtMaterialDiscount").val();
        if (!itemName) {
            isValid = false;
            errorMessage += "Item Name is required.\n";
            $("#ddlMaterialName").addClass("is-invalid");
        } else {
            $("#ddlMaterialName").removeClass("is-invalid");
        }

        if (!qty || isNaN(qty) || parseFloat(qty) <= 0 || !/^\d+(\.\d{1,2})?$/.test(qty)) {
            isValid = false;
            errorMessage += "Quantity must be a number greater than 0 with up to 2 decimal places.\n";
            $("#txtMaterialQty").addClass("is-invalid");
        } else {
            $("#txtMaterialQty").removeClass("is-invalid");
        }

        if (!rate || isNaN(rate) || parseFloat(rate) <= 0 || !/^\d+(\.\d{1,2})?$/.test(rate)) {
            isValid = false;
            errorMessage += "Rate must be a number greater than 0 with up to 2 decimal places.\n";
            $("#txtMaterialRate").addClass("is-invalid");
        } else {
            $("#txtMaterialRate").removeClass("is-invalid");
    }
    discount = (discount=='') ? '0' : discount;
    if (!discount || isNaN(discount) || parseFloat(discount) < 0 || !/^\d+(\.\d{1,2})?$/.test(discount)) {
        isValid = false;
        errorMessage += "Discount must be a number .\n";
        $("#txtMaterialDiscount").addClass("is-invalid");
    } else {
        $("#txtMaterialDiscount").removeClass("is-invalid");
    }

    if (!isValid) {
        alertify.error(errorMessage);
    }

    return isValid;
}
function SaveSalesOrderDetails() {
    if (!validateRows()) {
        return;
    }
    if ($('#ddlMaterialName').val() != '') {



        if ($('#txtMaterialQty').val() != '') {
            //if ($('#ddlPackage').val() != '') {
            var centralTaxPercent = $('#hdnCentralTaxPercent').val();
            var stateTaxPercent = $('#hdnStateTaxPercent').val();
            var cessTaxPercent = $('#hdnCessPercent').val();
            $('#tbody_SalesOrderDetails').append('<tr><td style="display: none;">' + $('#ddlMaterialName').val() + '<input type="hidden" value="' + centralTaxPercent + '" class="hdnCentralTaxPercent"><input type="hidden" value="' + stateTaxPercent + '" class="hdnStateTaxPercent"><input type="hidden" value="' + cessTaxPercent +'" class="hdnCessPercent"></td>'
                    + '<td style="width: 250px;">' + $("#ddlMaterialName option:selected").text() + '</td>'
                    + '<td style="width: 100px;">' + $("#txtMaterialStock").val() + '</td>'
                    + '<td style="width: 100px;">' + $("#txtMaterialQty").val() + '</td>'
                    + '<td>' + $("#txtMaterialUnitMeasure").val() + '</td>'
                    + '<td  style="width: 100px;">' + ($("#ddlPackage").val()!=""? $("#ddlPackage option:selected").text():"") + '</td>'
                    + '<td style="display: none;">' + ($("#ddlPackage").val() != "" ? $("#ddlPackage").val():"0") + '</td>'
                    + '<td style="width: 100px;">' + $("#txtMaterialRate").val() + '</td>'
                    + '<td style="width: 100px;">' + $("#txtMaterialDiscount").val() + '</td>'
                    + '<td style="width: 100px;">' + $("#txtMaterialTax").val() + '</td>'
                    + '<td style="width: 100px;">' + $("#txtMaterialTotalAmount").val() + '</td>'
                    + '<td><a onclick="DeleteSalesOrderDetailEntry(this,0);" data-soid="0" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
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
               
                $('#txtMaterialQty').val('');
                $('#txtMaterialUnitMeasure').val('');
                $('#txtMaterialRate').val('');
                $('#txtMaterialTotalAmount').val('');
                $('#ddlPackage').html("<option value=''>-Select Package-</option>");
                $('#txtMaterialTax').val('');
            $('#txtMaterialDiscount').val('');
            $('#txtMaterialStock').val('');
            $('#ddlMaterialName').val('').trigger('change');
            $('#ddlMaterialName').focus();
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


function CheckDeliveredQty(salesOrderId, materialId) {
   
}

function DeleteSalesOrderDetailEntry(ele, materialId) {

    $.ajax({
        type: "POST",
        url: "wfSdSalesOrder.aspx/CheckDeliveredQty",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            SalesOrderId: $(ele).attr("data-soid"),
            MaterialId: materialId
        }),
        dataType: "json",
        success: function (response) {
            if (response.d === "0") {

                $(ele.parentElement.parentElement).remove();
                calculateGrandTotal();
            }
            else if (response.d === "1") {
                alertify.error('Could not delete,Item already delivered');
            }
            else if (response.d === "2") {
                alertify.error('Could not delete,Outstanding amount is less than 0 ');
            }

        },
        error: function (error) {
            console.log(error);
        }
    });

    //var totalAmnt = parseFloat($('#txtTotalAmount').val()) - parseFloat($(ele.parentElement.parentElement.children[8]).text());
    //$('#txtTotalAmount').val(totalAmnt.toFixed(2)); commented by tasneem
}


function UpdateTotalAmount() {
    if ($('#txtMaterialQty').val() != '') {
        if ($('#ddlMaterialName').val() != '') {
            var qty = parseFloat($('#txtMaterialQty').val());
            var rate = parseFloat($('#txtMaterialRate').val());
            var discount = parseFloat($('#txtMaterialDiscount').val());
            var tax = parseFloat($('#txtMaterialTax').val());
            var delivery = parseFloat($('#txtDeliveryCharges').val()) || 0;
            var shipping = parseFloat($('#txtShippingCharges').val()) || 0; 
            
            // Convert NaN values to 0
            qty = isNaN(qty) ? 0 : qty;
            rate = isNaN(rate) ? 0 : rate;
            discount = isNaN(discount) ? 0 : discount;
            tax = isNaN(tax) ? 0 : tax;
            if (IsGstInclude == 'y') {
                // var totalAmnt = (qty * rate) * (1 - discount / 100) * (1 + tax / 100);
                var totalAmnt = (qty * rate) * (1 - discount / 100);
                $('#txtMaterialTotalAmount').val(totalAmnt.toFixed(2));
            }
            else {               
                var totalAmnt = (qty * rate) * (1 - discount / 100) * (1 + tax / 100);
                $('#txtMaterialTotalAmount').val(totalAmnt.toFixed(2));
            }
            var netamt = totalAmnt + delivery + shipping;
            if (!isNaN(netamt)) {
                $('#txtNetAmount').val(netamt.toFixed(2));
            } else {
                $('#txtNetAmount').val('0.00');
            }
        } else {
            $('#txtMaterialQty').val('');
            alertify.error('Please select any material first');
        }
    } else {
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
//                                url: 'wfSdSalesOrder.aspx/AddSalesOrder',
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


function getCurrentDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2); // Add leading zero if needed
    var month = ("0" + (today.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero if needed
    var year = today.getFullYear();
    return month + "/" + day + "/" + year;
}

function AddSalesOrder() {
    if ($('#ddlCustomer').val() == '') {
        alertify.error('Please select any Customer');
        return;
    }
    else if ($('#ddlDept').val() == '') {
        alertify.error('Please select any Department');
        $('#ddlDept').focus();
        return;
    }
    else if ($('#ddlBranch').val() == '') {
        alertify.error('Please select any Branch');
        $('#ddlBranch').focus();
        return;
    }

    else if ($('#ddlPaymentMode').val() === '-1') {
        alertify.error('Please select any payment mode');
        $('#ddlPaymentMode').focus();
        return;
    }
    
    var hasRows = $('#tbody_SalesOrderDetails tr').length > 1;
    if (!hasRows) {
        alertify.error('Please add Sales Order Lines');
        return;
    }
    showLoader();
    var data = [];
    $("#tbody_SalesOrderDetails tr").each(function (i) {
        if (i > 0) {
            var materialID = $(this)[0].cells[0].innerText;
            var Qty = $(this)[0].cells[3].innerText;
            var UnitMeasure = $(this)[0].cells[4].innerText;
            var Rate = $(this)[0].cells[7].innerText;
            var GST = $(this)[0].cells[9].innerText;
            var discount = $(this)[0].cells[8].innerText;
            var amount = $(this)[0].cells[10].innerText;
            var packageId = $(this)[0].cells[6].innerText;
            discount = (discount == '') ? 0 : discount;
            data.push({ ItemID: materialID, Quantity: Qty, Rate: Rate, GST: GST, UnitMeasure: UnitMeasure, Amount: amount, PackageId: packageId, Discount: discount });

        }

          


    });

    // Send data to server using AJAX
    $.ajax({
        type: "POST",
        url: "wfSdSalesOrder.aspx/AddSalesOrder", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            data: data,
            "ManualOrderId": $('#txtManualOrderId').val(),
            "SalesOrderId": $('#txtSaleOrderId').val(),
            "CustomerId": $('#ddlCustomer').val(),
            "ExpirationDate": $('#txtExpirationDate').val(),
            "GSTTreatment": $('#ddlGSTTreatment').val(),
            "DeliveryDateTime": $('#txtDeliveryDate').val(),
            "Currency": $('#ddlCurrency').val(),
            "PaymentTerms": $('#ddlPaymentTerms').val(),
            "TermsConditions": $('#txtTermsConditions').val(),
            "TotalAmount": $('#txtTotalAmount').val(),
            "DeliveryCharges": $('#txtDeliveryCharges').val(),
            "OrderSource": "Direct",
            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
            "BranchCode": $('#ddlBranch').val(),
            "DepartmentID": $('#ddlDept').val(),
            "OrderDate": $('#txtorderDate').val(),
            "OutstandingAmount": $('#txtOutstandingAmount').val(),
            "Advance": $('#txtAdvance').val(),
            "Active": $("#chkIsActive").prop("checked") == true? 'y':'n',
            "SquareUp": $("#chkIsSquareUp").prop("checked") == true? 'y':'n',
            "PaymentMode": $("#ddlPaymentMode").val(),
            "AcNo": $("#txtAcNo").val(),
            "ShippingCharges": $('#txtShippingCharges').val()
            //"NetAmount": $('#txtNetAmount').val(),
        }),
        dataType: "json",
        success: function (response) {
           

            setTimeout(function () {

               
                hideLoader();
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


function UpdateSalesOrderStatus(status) {
    alertify.confirm('Confirm Order Status Update', 'Are you sure, you want to update sales order status?', function () {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrder.aspx/UpdateSalesOrderStatus',
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


function CloseModal() {
    $('#CustomerAddModal').modal('hide');
}


function CloseCustomerTypeModal() {
    $('#CustomerTypeAddModal').modal('hide');
}


function AddCustomerDetails() {
    if ($('#txtCustomerName').val() != '') {
        if ($('#ddlCustomerType').val() != '') {
            if ($('#txtCompanyName').val() != '') {
                if ($("#ddlCity").val() != '') {

                    if ($('#ddlState').val() != '') {

                        if ($('#txtEmail').val() != '') {
                            if ($('#txtMobile').val() != '') {
                                $.ajax({
                                    type: "POST",
                                    url: 'wfSdSalesOrder.aspx/AddCustomer',
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
            url: 'wfSdSalesOrder.aspx/AddCustomerType',
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


function PrintPreview() {
    window.open('wfSdSalesOrder_display.aspx?id=' + $('#hdnSalesOrderId').val(), "_blank");
    //showLoader();
  
    //// Call the server-side method to get the PDF content
    //$.ajax({
    //    type: 'POST',
    //    url: 'wfSdSalesOrder.aspx/GetPdfContent',
    //    contentType: 'application/json; charset=utf-8',
    //    data: JSON.stringify({
    //        "SalesOrderId": $('#hdnSalesOrderId').val()
    //    }),
    //    dataType: 'json',
    //    success: function (response) {
    //        setTimeout(function () {
    //            hideLoader();


    //            // Display the PDF content in the modal
    //            $('#pdfPreview').attr('src', 'data:application/pdf;base64,' + response.d);
    //            $('#pdfModal').modal('show');
    //            $('.modal-backdrop').remove();
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