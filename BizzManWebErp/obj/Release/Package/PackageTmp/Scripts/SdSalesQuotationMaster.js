var optionsOfMaterialDropdownGrid = '';
var SalesQuotTable = '';
$(document).ready(function () {
    $("#addRowBtn,#saveDataBtn,.preventDefault").click(function (event) {
        event.preventDefault();
    }); 

    $('#ddlClientName').select2();
    
    $('#dispddlQuotStatus').select2();




    $(".delete-row").click(function (event) {
        event.preventDefault();
    });
    // Initialize Bootstrap Datepicker
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        startDate: '0d' // Restrict to the current date and future dates
    });

   
    fetchDataList();
    // Add Row button click event
    $("#addRowBtn").on("click", function () {
        addRow();
    });

    // Delete button click event
    $("#dataTable").on("click", ".delete-row", function () {
        $(this).closest("tr").remove();
        toggleTfootVisibility();
        calculateTotalRowAmount(this);
    });

    // Attach keydown listeners to existing rows on page load
    // Attach keydown listeners to the initial row if any
   

    // Detect Ctrl+S key press
    $(document).on("keydown", function (event) {
        // Check if Ctrl key is pressed along with 'S' key
        if (event.ctrlKey && event.key.toLowerCase() === "s") {
            event.preventDefault(); // Prevent the default save dialog
            saveData(); // Call the save function
        }
    });
    attachKeydownListenersToRow($("#dataTable tbody tr"));
    // Event listeners for removing the is-invalid class on input change
    $(document).on('input change', '.txtQuantity, .txtRate, .ddlMaterialName', function () {
        $(this).removeClass('is-invalid');
    });
});


function BindCustomerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wSdSalesQuotationMaster.aspx/GetCustomerList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
           // var abranch = "<option value=''>-Select Customer-</option>";
            var abranch = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].CustomerID + "'>" + JSON.parse(response.d)[i].CustomerName + " " + JSON.parse(response.d)[i].Mobile +"</option>";
            }
            $('#ddlClientName').append(abranch);
        },
        complete: function () {
            $("#ddlClientName").focus();
        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function GetCustomerDetails() {
    if ($('#ddlClientName').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wSdSalesQuotationMaster.aspx/GetCustomerDetailsById',
            data: JSON.stringify({
                "CustomerId": $('#ddlClientName').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtClientAddress').val(data[0].Address);
                $('#txtContactNumber').val(data[0].Mobile);
                $('#txtEmail').val(data[0].Email);
                $('#quotationDate').focus();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        ClearAll();
    }
}

function addRow() {
    var newRow = $("<tr>");
    var cols = "";

    // Add ItemName column
    cols += '<td><select  class="ddlMaterialName form-control" onchange="FetchUnitMeasure(this);" > < option value = "" > -Select Material Name -</option > </select ></td>';

    // Add Qty with input
    cols += '<td style="width:10%"><input class="txtQuantity form-control" onchange="calculateTotalRowAmount(this)" type="text"  oninput="handleNumericInput(event)"  onblur="checkInputGiven(event)" ></td>';

   
    // Add Amount
    cols += '<td style="width:10%"><input class="txtUnitMeasure form-control" type="text" disabled></td>';

    // Add Rate with input
    cols += '<td style="width:10%"><input class="txtRate form-control" onchange="calculateTotalRowAmount(this)" type="text"   oninput="handleNumericInput(event)" onblur="checkInputGiven(event)"><input type="hidden" value="" class="hdnActualRate"></td>';

    // Add Discount with input
    cols += '<td style="width:10%"><input class="txtDiscount form-control" onchange="calculateTotalRowAmount(this)" type="text"  oninput="handleNumericInput(event)" ></td>';

    // Add GST
    cols += '<td style="width:10%"><input class="txtGST form-control" type="text"  disabled><input type="hidden" value="0" class="hdnCentralTaxPercent"><input type="hidden" value="" class="hdnStateTaxPercent"><input type="hidden" value="" class="hdnCessPercent"></td>';

    // Add Amount
    cols += '<td style="width:20%"><input class="txtAmount form-control" value="0" type="text" disabled></td>';


   

    // Add Action column with delete button
    cols += '<td style="width:5%">' +
        '<button class="btn btn-danger delete-row  form-control"><i class="fas fa-trash"></i></button>' +
        '</td>';

    newRow.append(cols);
    $("#dataTable tbody").append(newRow);

    if (optionsOfMaterialDropdownGrid == '') {
        FetchBOMDetailsMaterials();
    }
    else {
        var dropdown = $('#dataTable tbody tr:last-child .ddlMaterialName');

        dropdown.append(optionsOfMaterialDropdownGrid);
        dropdown.select2();
    }

    toggleTfootVisibility();
    // Attach keydown event listeners to the newly added row
    attachKeydownListenersToRow(newRow);

    // Focus on the Material dropdown of the newly added row
    newRow.find('.ddlMaterialName').focus();
}
// Function to attach keydown event listeners
// Function to attach keydown event listeners to a specific row
function attachKeydownListenersToRow(row) {
    $("#quotationDate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#dataTable tbody tr").eq(0).find('.ddlMaterialName').focus();
        }
    });
    // Focus Qty when Enter is pressed in dropdown
    row.find(".ddlMaterialName").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $(this).closest("tr").find(".txtQuantity").focus();
        }
    });

    row.find(".ddlMaterialName").on("change", function () {
        $(this).closest("tr").find(".txtQuantity").focus();
    });

    // Focus Rate when Enter is pressed in Qty
    row.find(".txtQuantity").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $(this).closest("tr").find(".txtRate").focus();
        }
    });

    // Focus Discount when Enter is pressed in Rate
    row.find(".txtRate").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $(this).closest("tr").find(".txtDiscount").focus();
        }
    });

    // Do something when Enter is pressed in Discount
    row.find(".txtDiscount").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addRow();
        }
    });


    $("#ShippingCharges").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#notes").focus();
        }
    });

    $("#notes").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#terms").focus();
        }
    });
}

function toggleTfootVisibility() {
    var hasRows = $('#dataTable tbody tr').length > 0;
    $('#dataTable tfoot').toggleClass('no-rows-footer', !hasRows);
}

function FetchBOMDetailsMaterials() {
  
   
        $.ajax({
            type: "POST",
            url: 'wSdSalesQuotationMaster.aspx/MaterialMasterList',
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var dropdown = $('#dataTable tbody tr:last-child .ddlMaterialName');
                dropdown.html('');
                var data = JSON.parse(response.d);
                var req = "<option value=''>-Select Material-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                  /*  req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";*/
                    req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Id + '-' + JSON.parse(response.d)[i].MaterialName + "</option>";
                }
                optionsOfMaterialDropdownGrid = req;
                dropdown.append(req);

                dropdown.select2();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
}

function FetchUnitMeasure(dropdown) {
    var row = $(dropdown).closest('tr');
   
    if ($(dropdown).val() != '') {
        $.ajax({
            type: "POST",
            url: 'wSdSalesQuotationMaster.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $(dropdown).val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                //  $('#txtMaterialUnitMeasure').val(data[0].IntegratedTaxPercent);
                //$('#txtMaterialRate').val(data[0].MRP);
                var rate = parseFloat(data[0].MRP);
                const gst = parseFloat(data[0].IntegratedTaxPercent);
                var inclRate=rate+(rate*gst/100)
                row.find('.txtRate').val(inclRate);
                row.find('.txtUnitMeasure').val(data[0].UnitMesure);
                row.find('.txtGST').val(data[0].IntegratedTaxPercent);
                row.find('.hdnActualRate').val(data[0].MRP);
                row.find('.hdnCentralTaxPercent').val(data[0].CentralTaxPercent);
                row.find('.hdnStateTaxPercent').val(data[0].StateTaxPercent);
                row.find('.hdnCessPercent').val(data[0].CessPercent);
                calculateTotalRowAmount(dropdown);
                row.find('.txtQuantity').focus();
                $('.txtRate').removeClass('is-invalid');
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        row.find('.txtRate').val('0');
        row.find('.txtGST').val('0');
        row.find('.txtUnitMeasure').val('');
    }
}

function calculateTotalRowAmount(obj) {
    var row = $(obj).closest('tr');
   
    var materialID = $(row).find('.ddlMaterialName').val();
    if (materialID != '') {
        var qty = $(row).find('.txtQuantity').val();
        var rate = $(row).find('.txtRate').val();
        var discount = $(row).find('.txtDiscount').val();
      //  var gst = $(row).find('.txtGST').val();
        var gst = 0;
        var amount = (qty * rate) * (1 - discount / 100) * (1 + gst / 100);

      
        $(row).find('.txtAmount').val(amount.toFixed(2));
        calculateGrandTotal();
    }
    
}

// Function to calculate grand total, grand total GST, and net amount
function calculateGrandTotal() {
    var grandTotal = 0;
    var grandTotalGST = 0;
    var shippingCharges = parseFloat($('#ShippingCharges').val());

    // Check if shippingCharges is a valid number, if not set to 0
    if (isNaN(shippingCharges)) {
        shippingCharges = 0;
    }

    var centralTaxValue = 0;
    var stateTaxValue = 0;
    var cessTaxValue = 0;

    var centralTaxPercent = 0;
    var stateTaxPercent = 0;
    var cessTaxPercent = 0;
    // Iterate through each row in the table body
    $('#dataTable tbody tr').each(function () {
        var qty = parseFloat($(this).find('.txtQuantity').val());
        var rate = parseFloat($(this).find('.txtRate').val());
        var actualRate = parseFloat($(this).find('.hdnActualRate').val());
        var totalAmount = parseFloat($(this).find('.txtAmount').val());
        var gst = parseFloat($(this).find('.txtGST').val());
        var discount = parseFloat($(this).find('.txtDiscount ').val());
        centralTaxPercent = parseFloat($(this).find('.hdnCentralTaxPercent ').val());
        stateTaxPercent = parseFloat($(this).find('.hdnStateTaxPercent ').val());
        cessTaxPercent = parseFloat($(this).find('.hdnCessPercent ').val());

       

        // Check if the values are valid numbers, if not set to 0
        if (isNaN(qty)) qty = 0;
        if (isNaN(rate)) rate = 0;
        if (isNaN(actualRate)) actualRate = 0;
        if (isNaN(totalAmount)) totalAmount = 0;
        if (isNaN(gst)) gst = 0;
        if (isNaN(discount)) discount = 0;
        if (isNaN(centralTaxPercent)) centralTaxPercent = 0;
        if (isNaN(stateTaxPercent)) stateTaxPercent = 0;
        if (isNaN(cessTaxPercent)) cessTaxPercent = 0;


        centralTaxValue += (totalAmount * (centralTaxPercent / 100));
        stateTaxValue += (totalAmount * (stateTaxPercent / 100));
        cessTaxValue += (totalAmount * (cessTaxPercent / 100));

        grandTotal += totalAmount;
       
    });
    grandTotalGST = centralTaxValue + stateTaxValue + cessTaxValue;
    // Display the calculated values in the table footer
    $('#grandTotal').val(grandTotal.toFixed(2));
    $('#grandTotalGST').val(grandTotalGST.toFixed(2));

    grandTotal += shippingCharges;
    $('#netAmount').val(Math.round(grandTotal.toFixed(2)));
}



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


// Event listener for datepicker change
function QuotationDateChange() {
    // Generate Quotation ID based on the selected date
    const selectedDate = $('#quotationDate').val();
    if (selectedDate) {
        // Parse the date using moment.js with the correct format
        const momentDate = moment(selectedDate, 'DD/MM/YYYY');
        // Check if the parsed date is valid
        if (momentDate.isValid()) {
            // Format the date as 'YYYY/MM/DD'
            const formattedDate = momentDate.format('YYYY/MM/DD');
            const quotationId = 'QUOT' + formattedDate + '/' + generateRandomNumber();

            // Set the generated Quotation ID to the textbox
            $('#txtQuotation').val(quotationId);
        } else {
            // Handle invalid date input
            console.error('Invalid date format:', selectedDate);
        }
    }
}

// Function to generate a random number (nnnn)
function generateRandomNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
}

function GenerateQuotationID() {
    if ($('#quotationDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wSdSalesQuotationMaster.aspx/GenerateQuotationID',
            data: JSON.stringify({
                "QuotationDate": $('#quotationDate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtQuotation').val(data[0].QuotationID);
                $("#dataTable tbody tr").eq(0).find('.ddlMaterialName').focus();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtQuotation').val('');
    }
}

function validateRows() {
    var isValid = true;
    var errorMessage = "";

    $("#dataTable tbody tr").each(function () {
        var itemName = $(this).find(".ddlMaterialName").val();
        var qty = $(this).find(".txtQuantity").val();
        var rate = $(this).find(".txtRate").val();

        if (!itemName) {
            isValid = false;
            errorMessage += "Item Name is required.\n";
            $(this).find(".ddlMaterialName").addClass("is-invalid");
        } else {
            $(this).find(".ddlMaterialName").removeClass("is-invalid");
        }

        if (!qty || isNaN(qty) || parseFloat(qty) <= 0 || !/^\d+(\.\d{1,2})?$/.test(qty)) {
            isValid = false;
            errorMessage += "Quantity must be a number greater than 0 with up to 2 decimal places.\n";
            $(this).find(".txtQuantity").addClass("is-invalid");
        } else {
            $(this).find(".txtQuantity").removeClass("is-invalid");
        }

        if (!rate || isNaN(rate) || parseFloat(rate) <= 0 || !/^\d+(\.\d{1,2})?$/.test(rate)) {
            isValid = false;
            errorMessage += "Rate must be a number greater than 0 with up to 2 decimal places.\n";
            $(this).find(".txtRate").addClass("is-invalid");
        } else {
            $(this).find(".txtRate").removeClass("is-invalid");
        }
    });

    if (!isValid) {
        alertify.error(errorMessage);
    }

    return isValid;
}

function saveData() {
    if ($('#ddlClientName').val() == '') {
        alertify.error("Please Select Customer Name");
        return;
    } 
    else if ($('#quotationDate').val() == '') {
        alertify.error("Please enter Quotation Date");
        return;
    }

    var hasRows = $('#dataTable tbody tr').length > 0;
    if (!hasRows) {
        alertify.error("Please Enter some items.");
        return;
    }
    if (!validateRows()) {
        return;
    }
    //else if ($('#notes').val() == '') {
    //    alertify.error("Please Enter Notes");
    //    return;
    //}
    //else if ($('#terms').val() == '') {
    //    alertify.error("Please Enter Terms and Conditions");
    //    return;
    //}
    showLoader();
    var data = [];
    $("#dataTable tbody tr").each(function () {
        if ($(this).find('.ddlMaterialName').val() != '') {
            var materialID = $(this).find('.ddlMaterialName').val();
            var qty = $(this).find('.txtQuantity').val();
            var rate = $(this).find('.txtRate').val();
            var discount = $(this).find('.txtDiscount').val();
            var gst = $(this).find('.txtGST').val();
            var amount = $(this).find('.txtAmount').val();

            var centralTaxPercent = $(this).find('.hdnCentralTaxPercent').val();
            var stateTaxPercent = $(this).find('.hdnStateTaxPercent').val();
            var cessPercent = $(this).find('.hdnCessPercent').val();

            // Check if the values are valid numbers, if not set to 0
            if (isNaN(qty)) qty = 0;
            if (isNaN(rate)) rate = 0;
            if (isNaN(discount)) discount = 0;
            if (isNaN(amount)) amount = 0;
            if (isNaN(gst)) gst = 0;



            if (qty==='') qty = 0;
            if (rate === '') rate = 0;
            if (discount==='') discount = 0;
            if (amount==='') amount = 0;
            if (gst==='') gst = 0;
            data.push({ ItemID: materialID, Quantity: qty, Rate: rate, Discount: discount, GST: gst, CentralTaxPercent: centralTaxPercent, StateTaxPercent: stateTaxPercent, CessPercent: cessPercent, Amount: amount });

        }
           });
    var quotationId = $('#txtQuotation').val();
    var customerId = $('#ddlClientName').val();
    var quotationDate = $('#quotationDate').val();
    var loginuser = $('#ContentPlaceHolder1_loginuser').val();
    var NetTotal = $('#grandTotal').val(); 
    var NetGST = $('#grandTotalGST').val(); 
    var ShippingCharges = $('#ShippingCharges').val(); 
    var NetAmount = $('#netAmount').val(); 
    var Notes = $('#notes').val(); 
    var TermsAndConditions = $('#terms').val(); 
    // Send data to server using AJAX
    if (data.length == 0) {
        alertify.error("Please Enter some items.");
        return;
    }
    $.ajax({
        type: "POST",
        url: "wSdSalesQuotationMaster.aspx/AddtSalesQuotationMasterAndDetails", // Adjust the URL based on your setup
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ data: data, QuotationId: quotationId, CustomerId: customerId, QuotationDate: quotationDate, CreateBy: loginuser, NetTotal: NetTotal, NetGST: NetGST, ShippingCharges: ShippingCharges, NetAmount: NetAmount, Notes: Notes, TermsAndConditions: TermsAndConditions }),
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

function ClearAll() {
    $('#dataTable tbody tr').remove();
    $('#txtQuotation').val('');
    $('#quotationDate').val('');
    $('#txtClientAddress').val('');
    $('#txtContactNumber').val('');
    $('#txtEmail').val('');
    $('#notes').val('');
    $('#terms').val('');
    $('#ShippingCharges').val('0')
    $('#grandTotal').prop('disabled', false).val('0').prop('disabled', true);
    $('#grandTotalGST').prop('disabled', false).val('0').prop('disabled', true);
    $('#netAmount').prop('disabled', false).val('0').prop('disabled', true);
    toggleTfootVisibility();
    $('#ddlClientName').select2('destroy');
    $('#ddlClientName').html('<option value="">-Select Client Name-</option>');
    $('#ddlClientName').select2();
    BindCustomerDropdown();
    addRow();
}

function CreateData() {
    //  $('#divEmpJobList').hide();
    $('#divDataList').hide();
    $('#divDataItemsView').hide();
    $('#ContentPlaceHolder1_PrintDataBtn').hide();
    $('#previewBtn').hide();
    $('#EditDataBtn').hide();
    //  $('#divEmpJobEntry').show();
    $('#divDataEntry').show();
    $('#saveDataBtn').show();
    $('#EditDataBtn').text('Edit');
    $('#dispddlQuotStatus').prop('disabled', true);
    ClearAll();
   
 
   
   
}

function ViewDataList() {
    //  $('#divEmpJobList').hide();
   
    $('#divDataList').show();
    $('#divDataItemsView').hide();
    $('#ContentPlaceHolder1_PrintDataBtn').hide();
    $('#previewBtn').hide();
    $('#EditDataBtn').hide();
    //  $('#divEmpJobEntry').show();
    $('#divDataEntry').hide();
    $('#saveDataBtn').hide();

    $('#EditDataBtn').text('Edit');
    $('#dispddlQuotStatus').prop('disabled', true);


    fetchDataList();
   
}

function fetchDataList() {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wSdSalesQuotationMaster.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
           
            

            setTimeout(function () {
                $('#tblEmpJobList').DataTable().clear();
                $('#tblEmpJobList').DataTable().destroy();
                displayDataList(data);
                $('#tblEmpJobList').DataTable();
                hideLoader();


            }, 1000); // Hide loader after 3 seconds
        },
        complete: function () {
            //SalesQuotTable.draw();
        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
    console.log("End...");
}


function displayDataList(data) {
    var tableBody = $('#tbody_EmpJob_List');
    tableBody.empty(); // Clear existing rows
   
    for (var i = 0; i < data.length; i++) {
        var sqlDate = new Date(data[i].QuotationDate);
        var formattedDate = formatDate(sqlDate);
        var row = '<tr onclick="GetSdSalesQuotationMasterById(\'' + data[i].QuotationId + '\')">';
        row += '<td>' + data[i].QuotationId + '</td>';
        row += '<td>' + formattedDate + '</td>';
        row += '<td>' + data[i].ContactName + '</td>';

        row += '<td>' + data[i].QuotationStatus + '</td>';
      
        
        row += '<td>' + data[i].NetTotal + '</td>';
        row += '<td>' + data[i].NetGST + '</td>';
        row += '<td>' + data[i].ShippingCharges + '</td>';
        row += '<td>' + data[i].NetAmount + '</td>';
      
        row += '</tr>';

        tableBody.append(row);
    }

   
}
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Month is zero-based
    var year = date.getFullYear();

    // Add leading zero if day or month is a single digit
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return month + '/' + day + '/' + year;
}

function GetSdSalesQuotationMasterById(QuoatId) {
    showLoader();
    $('#divDataList').hide();
    $('#divDataEntry').hide();
    $('#saveDataBtn').hide();
    $.ajax({
        type: "POST",
        url: 'wSdSalesQuotationMaster.aspx/GetSdSalesQuotationMasterById',
        data: JSON.stringify({
            "QuotationId": QuoatId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#disptxtCustomerName').val(data.SalesQuotationMastertInfo.CustomerName)
            $('#dispQuotationDate').val(data.SalesQuotationMastertInfo.QuotationDate)
            $('#disptxtClientAddress').val(data.SalesQuotationMastertInfo.Address)
            $('#disptxtQuotation').val(data.SalesQuotationMastertInfo.QuotationId)
            $('#dispddlQuotStatus').prop('disabled', false);
            $('#dispddlQuotStatus').val(data.SalesQuotationMastertInfo.QuotationStatus).trigger('change');
            $('#dispddlQuotStatus').prop('disabled', true);
            $('#disptxtContactNumber').val(data.SalesQuotationMastertInfo.Mobile)
            $('#disptxtEmail').val(data.SalesQuotationMastertInfo.Email)
            $('#dispgrandTotal').val(data.SalesQuotationMastertInfo.NetTotal)


            $('#dispgrandTotalGST').val(data.SalesQuotationMastertInfo.NetGST)
            $('#dispShippingCharges').val(data.SalesQuotationMastertInfo.ShippingCharges)
            $('#dispnetAmount').val(Math.round(data.SalesQuotationMastertInfo.NetAmount))
            $('#dispnotes').val(data.SalesQuotationMastertInfo.Notes)
            $('#dispterms').val(data.SalesQuotationMastertInfo.TermsAndConditions)

            var centralTaxValue = 0;
            var stateTaxValue = 0;
            var cessTaxValue = 0;

            var centralTaxPercent = 0;
            var stateTaxPercent = 0;
            var cessTaxPercent = 0;
            var qty = 0;
            var Rate = 0;
            var Amount = 0;
            var NetGST = 0;
            var html = '';
            for (var i = 0; i < data.SalesItems[0].Table.length; i++) {
                html = html + '<tr"><td>' + data.SalesItems[0].Table[i].materialName + '</td>'
                    + '<td>' + data.SalesItems[0].Table[i].Qty + '</td>'
                    + '<td>' + data.SalesItems[0].Table[i].UnitMesure + '</td>'
                    + '<td>' + data.SalesItems[0].Table[i].Rate + '</td>'
                    + '<td>' + data.SalesItems[0].Table[i].Discount + '</td>'
                    + '<td>' + data.SalesItems[0].Table[i].GST + '</td>'
                    + '<td>' + data.SalesItems[0].Table[i].Amount + '</td></tr>';

                Amount = parseFloat(data.SalesItems[0].Table[i].Amount);
                centralTaxPercent = parseFloat(data.SalesItems[0].Table[i].CentralTaxPercent);
                stateTaxPercent = parseFloat(data.SalesItems[0].Table[i].StateTaxPercent);
                cessTaxPercent = parseFloat(data.SalesItems[0].Table[i].CessPercent);
                qty = parseFloat(data.SalesItems[0].Table[i].Qty);
                Rate = parseFloat(data.SalesItems[0].Table[i].Rate);

                //centralTaxValue += (qty * Rate) * (centralTaxPercent / 100);
                //stateTaxValue += (qty * Rate) * (stateTaxPercent / 100);
                //cessTaxValue += (qty * Rate) * (cessTaxPercent / 100);
               
                centralTaxValue += (Amount * centralTaxPercent) / 100;
                stateTaxValue += (Amount * stateTaxPercent) / 100;
                cessTaxValue += (Amount * cessTaxPercent) / 100;
            }


            $('#dispgrandCentralTaxValue').val(centralTaxValue.toFixed(2))
            $('#disgrandStateTaxValue').val(stateTaxValue.toFixed(2))
            $('#dispgrandCessValue').val(cessTaxValue.toFixed(2))


            $('#salesItemBody').html(html);
            $('#divDataItemsView').show();   
            $('#ContentPlaceHolder1_PrintDataBtn').show();
            $('#previewBtn').show();
            $('#EditDataBtn').show();
            hideLoader();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alertify.error('Something went wrong');
        }
    });
}

function onEditButtonClick() {
  
    var buttonText = $('#EditDataBtn').text();

    // Check the current text content of the button
    if (buttonText === 'Edit') {
        // Change the text to 'Update'
        $('#EditDataBtn').text('Update');
        $('#dispddlQuotStatus').prop('disabled', false);
    } else {
        // Handle the update logic here
        // ...
        showLoader();
        $.ajax({
            type: "POST",
            url: 'wSdSalesQuotationMaster.aspx/UpdateQuotationStatus',
            data: JSON.stringify({
                "QuotationId": $('#disptxtQuotation').val(),
                "QuotationStatus": $('#dispddlQuotStatus').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                // After handling the update, change the text back to 'Edit'
                GetSdSalesQuotationMasterById($('#disptxtQuotation').val());
                alertify.success('Quotation Status updated successfully');
                $('#EditDataBtn').text('Edit');
                $('#dispddlQuotStatus').prop('disabled', true);
                hideLoader();
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {
                alertify.error('Something went wrong');
            }
        });
        
       
    }
}

function generatePDF() {

    $('#divDataList').hide();
    $('#divDataEntry').hide();
    $('#saveDataBtn').hide();

    $('#EditDataBtn').text('Edit');
    $('#dispddlQuotStatus').prop('disabled', true);

    $('#ContentPlaceHolder1_printQuotationId').val($('#disptxtQuotation').val());
   
}

function PrintPreview() {
   // showLoader();
    generatePDF();
    // Call the server-side method to get the PDF content
   window.open('wSdSalesQuotationMaster_display.aspx?id=' + $('#disptxtQuotation').val(),"_blank");
    //$.ajax({
    //    type: 'POST',
    //    url: 'wSdSalesQuotationMaster.aspx/GetPdfContent',
    //    contentType: 'application/json; charset=utf-8',
    //    data: JSON.stringify({
    //        "QuotationId": $('#disptxtQuotation').val()
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

function CloseModal() {
    $('#pdfModal').modal('hide');
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
        url: 'wSdSalesQuotationMaster.aspx/DownloadFile',
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
