$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

   
    BindVoucherTypeDropDown();

   // BindSalesOrderIdDropdown();   // mmk
    ViewFaVoucherEntryList();
   
    $('#ddlVoucherType').change(LoadLedgerAccountDropDown);
    $('#ddlLedgerAccount').change(LedgerAccountDropDownOnChange);

    //   by mk of 14/08/2023
    $('#ddlSalesOrderId').change(SalesOrderIdDropDownOnChange);
});

//   mmk
/*
function BindSalesLedgerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/SalesLedgerMasterList',
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
          //  $('#ddlMaterialName').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

*/

//   mmk
/*
function BindSalesOrderIdDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/SalesOrderIdMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlMaterialName').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Sales order id-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].id + "'>" + JSON.parse(response.d)[i].SalesOrderId + "</option>";
            }
            $('#ddlMaterialName').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/

/*
//  by mk
function SalesOrderIdDropDownOnChange()
{
    var salesOrderId = $('#ddlSalesOrderId').val();

    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/FetchSalesOrderDetails',
        data: JSON.stringify({
            "id": salesOrderId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtTotalAmt').val(data[0].TotalAmount);
            $('#txtoutstandingAmt').val(data[0].TotalAmount);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
*/


//  by mmk
function SalesOrderIdDropDownOnChange1() {
    var salesOrderId = $('#ddlSalesOrderId');
  //  var salesOrderId = $('#ddlSalesOrderId').val();
   // var salesOrderId = $('#txtSalesOrderId');

    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/FetchSalesOrderDetails',
        data: JSON.stringify({
            "id": salesOrderId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtTotalAmt').val(data[0].TotalAmount);
            $('#txtoutstandingAmt').val(data[0].TotalAmount);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function LedgerAccountDropDownOnChange()
{
    var ledgerAccountId = $('#ddlLedgerAccount').val();

    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/FetchFaLedgerMasterDetails',
        data: JSON.stringify({
            "id": ledgerAccountId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtOpeningBalance').val(data[0].OpBalance);
            $('#txtClosingBalance').val(data[0].ClBalance);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ClearLedgerAccountDropdown() {

    $("#ddlLedgerAccount").empty().append(
        '<option value = "">--Select--</option>');
}

function LoadLedgerAccountDropDown() {
    var voucherType = $("#ddlVoucherType").find("option:selected").text();
    //alert('Voucher Type : ' + voucherType);

    BindLedgerAccountDropDownByVoucherType(voucherType.trim());
}

function GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, ledgerId)
{
    var ledgerMaster = "";

    $.ajax(
        {
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/GetLedgerMasterListByLedgerGroup',
        async: false,
        data: JSON.stringify({
            "isLedgerGroupBankAccountOrCash": isLedgerGroupBankAccountOrCash
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
           
            for (var i = 0; i < JSON.parse(response.d).length; i++)
            {
                if (JSON.parse(response.d)[i].Id == ledgerId)
                {
                    ledgerMaster = ledgerMaster + "<option value='" + JSON.parse(response.d)[i].Id + "' selected>" + JSON.parse(response.d)[i].LedgerName + "</option>";
                }
                else
                {
                    ledgerMaster = ledgerMaster + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
                }
               
            }

            //alert(ledgerMaster);
           
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
   
   return ledgerMaster;
}
 
 
function BindLedgerAccountDropDownByVoucherType(voucherType)
{
   // debugger;
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/GetLedgerMasterListByVoucherType',
        
        data: JSON.stringify({
            "voucherType": voucherType
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var ledgerMaster = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ledgerMaster = ledgerMaster + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
            }

            $('#txtOpeningBalance').show();
            $('#txtClosingBalance').show();
            $('#txtOpeningBalance').val('0');
            $('#txtClosingBalance').val('0');
            $('#trOpeningBalance').show();
            $('#trClosingBalance').show();
           
            if (voucherType == 'Contra') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#tbody_Panel3').html('');
                $('#divPanel2').hide();


                $('#divPanel4').hide();

                $('#ddlLedgerAccount').append(ledgerMaster);

                AddNewGridLedgerEntryInPanel3();
                $('#divPanel3').show();
                $('#imgBtnPnl3NewRow').show();
           }
            else if (voucherType == 'Journal')
            {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').hide();
                 $('#trOpeningBalance').hide();
                $('#trClosingBalance').hide();

                $('#tbody_Panel2').html('');
                AddNewGridLedgerEntryInPanel2();
                $('#divPanel2').show();
                $('#divPanel3').hide();

                $('#divPanel4').hide();

             }
            else if (voucherType == 'Payment') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#ddlLedgerAccount').append(ledgerMaster);

                $('#tbody_Panel2').html('');
                AddNewGridLedgerEntryInPanel2();

                $('#divPanel2').show();;
                $('#divPanel3').hide();

                $('#divPanel4').hide();

            }
            else if (voucherType == 'Receipt') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#tbody_Panel2').html('');
                AddNewGridLedgerEntryInPanel2();
                $('#divPanel2').show();
                $('#ddlLedgerAccount').append(ledgerMaster);
              
                $('#divPanel3').hide();

                $('#divPanel4').hide();

            }
            else if (voucherType == 'Credit Note') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#ddlLedgerAccount').append(ledgerMaster);
               
                $('#divPanel2').hide();
                $('#divPanel3').hide();

                $('#divPanel4').hide();

            }
            else if (voucherType == 'Debit Note') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#trOpeningBalance').show();
                $('#trClosingBalance').show();
                $('#ddlLedgerAccount').append(ledgerMaster);
              
                $('#divPanel2').hide();
                $('#divPanel3').hide();

                $('#divPanel4').hide();

            }
            else if (voucherType == 'Memorandum') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#ddlLedgerAccount').append(ledgerMaster);
              
                $('#divPanel2').hide();
                $('#divPanel3').hide();

                $('#divPanel4').hide();

            }
            else if (voucherType == 'Purchase') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#ddlLedgerAccount').append(ledgerMaster);
              
                $('#divPanel2').hide();
                $('#divPanel3').hide();

                $('#divPanel4').hide();

            }
            else if (voucherType == 'Sales') {
                ClearLedgerAccountDropdown();
                $('#trLedgerAccount').show();
                $('#ddlLedgerAccount').append(ledgerMaster);
             
                $('#divPanel2').hide();
                $('#divPanel3').hide();







                //  by mk on 12/08/2023, nothng was there
                $('#divPanel4').show();
                BindSalesLedgerDropdown();
                BindSalesOrderIdDropdown();
              //  AddNewGridSalesEntryInPanel4();
            }
            else
            {
               // HidePanel2Controls();
            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

// new function by MK on 13/08/2023
function BindSalesLedgerDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/SalesLedgerDropDownList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
          //  var salaryGrade = "<option value=''>-Select Sales Ledger-</option>";
            var itemlist = "<option value=''>-Select Sales Ledger-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                itemlist = itemlist + "<option value='" + JSON.parse(response.d)[i].ID + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
            }
            $('#ddlLedgerAccountSales').append(itemlist);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

// new function by MK on 13/08/2023
function BindSalesOrderIdDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/SalesOrderIdDropDownList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            //  var salaryGrade = "<option value=''>-Select Sales Ledger-</option>";
            var itemlist = "<option value=''>-Select Sales Ledger-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                itemlist = itemlist + "<option value='" + JSON.parse(response.d)[i].ID + "'>" + JSON.parse(response.d)[i].SalesOrderId + "</option>";
            }
            $('#ddlSalesOrderId').append(itemlist);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



// new function by MK on 13/08/2023
function AddNewGridSalesEntryInPanel4() {
   // $('#imgBtnPnl2NewRow').show();
    var voucherType = $("#ddlVoucherType").find("option:selected").text();

    if (voucherType == '') {
        alertify.error("Please select Voucher Type");
        isValid = false;
    }
    else {
        var newRowContent = "";
        var rowCounter = $('#hdnPnl2RowCounter').val();
        rowCounter = parseInt(rowCounter) + 1;
        var ddlDrCrOptions = "";
        var ddlPnl2LedgerAccountOptions = '<option value="">-Select-</option>';

        if (voucherType.trim() == 'Payment') { // Dr
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr" selected>Dr</option><option value="Cr">Cr</option>';

            var isLedgerGroupBankAccountOrCash = false;
            ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else if (voucherType.trim() == 'Receipt') { // Cr
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr" selected>Cr</option>';

            var isLedgerGroupBankAccountOrCash = false;
            ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else if (voucherType.trim() == 'Journal') {
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr">Cr</option>';

            var isLedgerGroupBankAccountOrCash = false;
            ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else //if (voucherType.trim() == '')
        {
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr">Cr</option>';
        }

        newRowContent = newRowContent + '<tr  id = "panel2Row' + rowCounter + '" ><td><select style="width: 100%;" id="ddlPnl2LedgerAccount' + rowCounter + '" name = "ddlPnl2LedgerAccount'
            + rowCounter + '" class="">' + ddlPnl2LedgerAccountOptions + '</select></td>'

            + '<td><input type="text" style="width: 100%;" class="" id="txtPnl2Amount' + rowCounter + '" name = "txtPnl2Amount'
            + rowCounter + '" value="0" maxlength="18"/></td>'

            + '<td><select style="width: 70%;" id="ddlPnl2DrCr' + rowCounter + '" name = "ddlPnl2DrCr'
            + rowCounter + '" class="">' + ddlDrCrOptions + '</select> <input style="float:right; width:40px;height:26px;" type="image" id="pnl2ImgBtnRemoveRow' + rowCounter
            + '" name="pnl2ImgBtnRemoveRow' + rowCounter
            + '" onclick="RemoveRowInPanel2(this);return false;"  title="faVoucherRemoveRow" src="Images/FaVoucherEntryRemove.jpg" alt="Remove"/>  </td></tr>';

        $("#tblPanel2 tbody").append(newRowContent);
        $('#hdnPnl2RowCounter').val(rowCounter);
    }
}




function BindVoucherTypeDropDown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/GetVoucherTypeList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var voucherType = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                voucherType = voucherType + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].VoucherType.trim() + "</option>";
            }
            $('#ddlVoucherType').append(voucherType);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindLedgerAccountDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/GetLedgerMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var ledgerMaster = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ledgerMaster = ledgerMaster + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
            }
            $('#ddlLedgerAccount').append(ledgerMaster);
       },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindLedgerAccountDropDown() {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/GetLedgerMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var ledgerMaster = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                ledgerMaster = ledgerMaster + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
            }
            $('#ddlLedgerAccount').append(ledgerMaster);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ViewFaVoucherEntryList() {
    $('#example-select-all').prop('checked', false);
    $('#divFaVoucherEntryList').show();
    $('#divFaVoucherEntry').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindFaVoucherEntryList();
}

function AddNewGridLedgerEntryInPanel2()
{
   $('#imgBtnPnl2NewRow').show();
   var voucherType = $("#ddlVoucherType").find("option:selected").text();

    if (voucherType == '') {
        alertify.error("Please select Voucher Type");
        isValid = false;
    } 
    else
    {
        var newRowContent = "";
        var rowCounter = $('#hdnPnl2RowCounter').val();
        rowCounter = parseInt(rowCounter) + 1;
        var ddlDrCrOptions = "";
        var ddlPnl2LedgerAccountOptions = '<option value="">-Select-</option>';
              
        if (voucherType.trim() == 'Payment') { // Dr
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr" selected>Dr</option><option value="Cr">Cr</option>';

            var isLedgerGroupBankAccountOrCash = false;
            ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else if (voucherType.trim() == 'Receipt') { // Cr
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr" selected>Cr</option>';

            var isLedgerGroupBankAccountOrCash = false;
            ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else if (voucherType.trim() == 'Journal')
        {
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr">Cr</option>';

            var isLedgerGroupBankAccountOrCash = false;
            ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else //if (voucherType.trim() == '')
        {
            ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr">Cr</option>';
        }

        newRowContent = newRowContent + '<tr  id = "panel2Row' + rowCounter + '" ><td><select style="width: 100%;" id="ddlPnl2LedgerAccount' + rowCounter + '" name = "ddlPnl2LedgerAccount'
            + rowCounter + '" class="">' + ddlPnl2LedgerAccountOptions + '</select></td>'

            + '<td><input type="text" style="width: 100%;" class="" id="txtPnl2Amount' + rowCounter + '" name = "txtPnl2Amount'
            + rowCounter + '" value="0" maxlength="18"/></td>'

            + '<td><select style="width: 70%;" id="ddlPnl2DrCr' + rowCounter + '" name = "ddlPnl2DrCr'
            + rowCounter + '" class="">' + ddlDrCrOptions + '</select> <input style="float:right; width:40px;height:26px;" type="image" id="pnl2ImgBtnRemoveRow' + rowCounter
            + '" name="pnl2ImgBtnRemoveRow' + rowCounter
            + '" onclick="RemoveRowInPanel2(this);return false;"  title="faVoucherRemoveRow" src="Images/FaVoucherEntryRemove.jpg" alt="Remove"/>  </td></tr>';
      
        $("#tblPanel2 tbody").append(newRowContent);
        $('#hdnPnl2RowCounter').val(rowCounter);
    }
}

function AddNewGridLedgerEntryInPanel3()
{
    $('#imgBtnPnl3NewRow').show();
    var voucherType = $("#ddlVoucherType").find("option:selected").text();

    if (voucherType == '') {
        alertify.error("Please select Voucher Type");
        isValid = false;
    }
    else {
        var newRowContent = "";
        var rowCounter = $('#hdnPnl3RowCounter').val();
        rowCounter = parseInt(rowCounter) + 1;
        var ddlDrCrOptions = "";
        var ddlTransTypeOptions = "";
        var ddlPnl3LedgerAccountOptions = '<option value="">-Select-</option>';
        
        ddlDrCrOptions = '<option value="">-Select-</option><option value="Dr">Dr</option><option value="Cr">Cr</option>';
        ddlTransTypeOptions = '<option value="">-Select-</option><option value="Cheque">Cheque</option>'
            + '<option value="e-Fund Transfer">e-Fund Transfer</option>'
            + '<option value="Others">Others</option>';

        if (voucherType.trim() == 'Contra') { 

            var isLedgerGroupBankAccountOrCash = true;
            ddlPnl3LedgerAccountOptions = ddlPnl3LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, 0);
        }
        else //if (voucherType.trim() == '')
        {
           
        }

        newRowContent = newRowContent + '<tr  id = "panel3Row' + rowCounter + '" ><td><select style="width: 100%;" id="ddlPnl3LedgerAccount' + rowCounter + '" name = "ddlPnl3LedgerAccount'
            + rowCounter + '" class="">' + ddlPnl3LedgerAccountOptions + '</select>  </td>'

            + '<td><input type="text" style="width: 100%;" class="" id="txtPnl3Amount' + rowCounter + '" name = "txtPnl3Amount'
            + rowCounter + '" value="0" maxlength="18"/>  </td>'

            + '<td><select style="width: 100%;" id="ddlPnl3DrCr' + rowCounter + '" name = "ddlPnl3DrCr'
            + rowCounter + '" class="">' + ddlDrCrOptions + '</select>  </td>'

            + '<td><select style="width: 100%;" id="ddlPnl3TransactionType' + rowCounter + '" name = "ddlPnl3DrCr'
            + rowCounter + '" class="">' + ddlTransTypeOptions + '</select>  </td>'

            + '<td><input type="text" style="width: 100%;" class="" id="txtPnl3ChequeNum' + rowCounter + '" name = "txtPnl3ChequeNum'
            + rowCounter + '"  maxlength="20"/> </td>'

            + '<td><input type="date" style="width: 70%;" class="" id="txtPnl3Date' + rowCounter + '" name = "txtPnl3Date'
            + rowCounter + '"/>  <input style="float:right;width:40px;height:26px;" type="image" id="pnl3ImgBtnRemoveRow' + rowCounter
            + '" name="pnl3ImgBtnRemoveRow' + rowCounter + '" onclick="RemoveRowInPanel3(this);return false;"  title="faVoucherRemoveRow" width="50" height="44" src="Images/FaVoucherEntryRemove.jpg" alt="Remove"/> </td>'
            + '</tr>';

        $("#tblPanel3 tbody").append(newRowContent);
        $('#hdnPnl3RowCounter').val(rowCounter);
    }
}

function RemoveRowInPanel3(Object)
{
    var str = Object.id; 
    var rowCounter = str.charAt(str.length - 1);

    $("#panel3Row" + rowCounter).remove();
}

function RemoveRowInPanel2(Object)
{
    var str = Object.id;
    var rowCounter = str.charAt(str.length - 1);

    $("#panel2Row" + rowCounter).remove();
}

function BindFaVoucherEntryList()
{
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/FetchVoucherEntryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblFaVoucherEntryList').DataTable().clear();
            $('#tblFaVoucherEntryList').DataTable().destroy();
            $('#tbody_FaVoucherEntry_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active" value="' + data[i].VoucherId + '"></td>'
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].VoucherId + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].VoucherEntryDate + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].VoucherType + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].Narration + '</td>'
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].TransactionType + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].TransactionId + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].FinancialYearId + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].Approve + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].Active + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].CreateUser + '</td > '
                    + '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\' ,\'' + data[i].VoucherType + '\')">' + data[i].CreateDate + '</td>'
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].CrLedgerName + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].DrLedgerName + '</td > '
                     /*+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].Amount + '</td > '*/
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].IfcsCode + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].BankName + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].BankBrnachName + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].BankAcNo + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].ChequeNo + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].ChequeDate + '</td > '
                    //+ '<td onclick="FetchFaVoucherEntryDetails(\'' + data[i].VoucherId + '\')">' + data[i].GstNo + '</td>'
            }
            $('#tbody_FaVoucherEntry_List').html(html);
  
            var d = new Date();
            var table = $('#tblFaVoucherEntryList').DataTable({
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

            $('#tblFaVoucherEntryList tbody').on('change', 'input[type="checkbox"]', function () {
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

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchFaVoucherEntryDetails(id, voucherType) {
    $.ajax({
        type: "POST",
        url: 'wfFaVoucherEntry.aspx/FetchFaVoucherEntryDetails', 
        data: JSON.stringify({
            "id": id,
            "voucherType": voucherType
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            
            $('#lblAddVoucherEntry').hide();
            var data = JSON.parse(response.d);
            var tblVoucherEntry = data.Table1;
            var tblVoucherEntryDetail = data.Table2;
            ClearAll();
            $('#divFaVoucherEntryList').hide();
            $('#divFaVoucherEntry').show();
            $("#btnSave").html('Update');
            $('#divFaVoucherEntry').children().attr('readonly', true); 
                    
            $("#btnSave").show();
            $("#btnExport").hide();

            $('#txtVoucherId').val(tblVoucherEntry[0].VoucherId);
            //Assign date value to date textbox
         
            $('#txtVoucherEntryDate').val(tblVoucherEntry[0].VoucherEntryDate.toString().substr(0, 10));
                       
            $('#txtNarration').val(tblVoucherEntry[0].Narration);
            $('#txtNarration').attr("readonly", "readonly");
       
           // $('#txtChequeNumber').val(data[0].ChequeNo);
           //
           // if (data[0].ChequeDate != "1900-01-01T00:00:00")
           // {
           //     //Assign date value to date textbox
           //     $('#txtChequeDate').val((new Date(data[0].ChequeDate)).toISOString().substr(0, 10));
           // }
           //

             //$('#txtVoucherId,#txtVoucherEntryDate,#txtNarration,#txtIfcsCode,#txtBankName,#txtBankBranchName,#txtBankAcNum,#txtChequeNumber, #txtChequeDate,#txtGSTNumber').attr("readonly", "readonly");
             //$('#txtVoucherId,#txtVoucherEntryDate,#txtNarration').attr("readonly", "readonly");


            $('#txtVoucherType').val(tblVoucherEntry[0].VoucherType);
            var voucherType = tblVoucherEntry[0].VoucherType;

            if (voucherType.trim() != 'Journal')
            {
              //  $('#ddlLedgerAccount').val(data[0].LedgerId);
              //  $('#ddlLedgerAccount').attr("disabled", true); 
               $('#ddlLedgerAccount').hide();
               $('#txtLedgerName').val(tblVoucherEntry[0].LedgerName);
               $('#txtLedgerName').show();
               $('#txtLedgerName').attr("disabled", true);
                
                $('#txtOpeningBalance').val(tblVoucherEntry[0].OpBalance);
                $('#txtClosingBalance').val(tblVoucherEntry[0].ClBalance);
                $('#txtOpeningBalance').show();
                $('#txtClosingBalance').show();
            }
            else
            {
                $('#trLedgerAccount').hide();
               // $('#txtOpeningBalance').hide();
               // $('#txtClosingBalance').hide();
                $('#trOpeningBalance').hide();
                $('#trClosingBalance').hide();
            }

            $('#ddlVoucherType').hide();
            $('#txtVoucherType').show();
            //$('#ddlVoucherType option').map(function () {
            //    if ($(this).text() == data[0].VoucherType.trim()) return this;
            //}).attr('selected', 'selected');

            //$('#ddlVoucherType').attr("disabled", true);
           
                     
            $('#chkApprove').prop('checked', tblVoucherEntry[0].Approve === "y");

            if (tblVoucherEntry[0].Approve == 'y')
            {
                $('#btnSave').attr("disabled", true);
                $('#chkApprove').attr("disabled", true);
            }

            if (voucherType.trim() == 'Payment' || voucherType.trim() == 'Receipt' || voucherType.trim() == 'Journal') {
                ShowPanel2Controls(tblVoucherEntryDetail, voucherType);
                $('#divPanel2').show();
                $('#divPanel3').hide();
            }
            else if (voucherType.trim() == 'Contra')
            {
                ShowPanel3Controls(tblVoucherEntryDetail, voucherType);
                $('#divPanel2').hide();
                $('#divPanel3').show();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ShowPanel3Controls(tblVoucherEntryDetail, voucherType)
{
    var newRowContent = "";
    $("#tblPanel3 tbody").html('');
    $('#hdnPnl3RowCounter').val('0');

    for (let i = 0; i < tblVoucherEntryDetail.length; i++)
    {
        let obj = tblVoucherEntryDetail[i];

        //obj.LedgerId
        //obj.Amount
        //obj.EntryType
        //obj.TransactionType
        //obj.ChequeNo
        //obj.ChequeDate
        var rowCounter = $('#hdnPnl3RowCounter').val();
        rowCounter = parseInt(rowCounter) + 1;
        var ddlDrCrOptions = '<option value="">-Select-</option>';
        var ddlTransTypeOptions = '<option value="">-Select-</option>';
        var ddlPnl3LedgerAccountOptions = '<option value="">-Select-</option>';

        if (obj.EntryType == "Dr") {
            ddlDrCrOptions = ddlDrCrOptions + '<option value="Dr" selected>Dr</option><option value="Cr">Cr</option>';
        }
        else if (obj.EntryType == "Cr") {
            ddlDrCrOptions = ddlDrCrOptions + '<option value="Dr">Dr</option><option value="Cr" selected>Cr</option>';
        }

        if (obj.TransactionType == "Cheque")
        {
            ddlTransTypeOptions = ddlTransTypeOptions + '<option value="Cheque" selected>Cheque</option>'
                                + '<option value="e-Fund Transfer">e-Fund Transfer</option>'
                                + '<option value="Others">Others</option>';
        }
        else if (obj.TransactionType == "e-Fund Transfer")
        {
            ddlTransTypeOptions = ddlTransTypeOptions + '<option value="Cheque">Cheque</option>'
                + '<option value="e-Fund Transfer" selected>e-Fund Transfer</option>'
                + '<option value="Others">Others</option>';
        }
        else if (obj.TransactionType == "Others")
        {
            ddlTransTypeOptions = ddlTransTypeOptions + '<option value="Cheque">Cheque</option>'
                + '<option value="e-Fund Transfer">e-Fund Transfer</option>'
                + '<option value="Others" selected>Others</option>';
        }

        if (voucherType.trim() == 'Contra') {

            var isLedgerGroupBankAccountOrCash = true;
            ddlPnl3LedgerAccountOptions = ddlPnl3LedgerAccountOptions
                + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, obj.LedgerId);

            $('#trOpeningBalance').show();
            $('#trClosingBalance').show();
        }
        else //if (voucherType.trim() == '')
        {

        }

        var chequeNo;

        if (obj.ChequeNo === null) {
            chequeNo = "";
        }
        else
        {
            chequeNo = obj.ChequeNo;  //(obj.ChequeNo === null) ? "" : obj.ChequeNo
        }

        var chequeDate;

        if (obj.ChequeDate === null) {
            chequeDate = "";
        }
        else {
            chequeDate = obj.ChequeDate.toString().substr(0, 10); 
        }

        newRowContent = newRowContent + '<tr  id = "panel3Row' + rowCounter + '" ><td><select style="width: 100%;" id="ddlPnl3LedgerAccount' + rowCounter + '" name = "ddlPnl3LedgerAccount'
            + rowCounter + '" class="">' + ddlPnl3LedgerAccountOptions + '</select>  </td>'

            + '<td><input type="text" style="width: 100%;" class="" id="txtPnl3Amount' + rowCounter + '" name = "txtPnl3Amount'
            + rowCounter + '" value="' + obj.Amount + '" maxlength="18" readonly/></td>'

            + '<td><select style="width: 100%;" id="ddlPnl3DrCr' + rowCounter + '" name = "ddlPnl3DrCr'
            + rowCounter + '" class="">' + ddlDrCrOptions + '</select>  </td>'

            + '<td><select style="width: 100%;" id="ddlPnl3TransactionType' + rowCounter + '" name = "ddlPnl3DrCr'
            + rowCounter + '" class="">' + ddlTransTypeOptions + '</select>  </td>'

            + '<td><input type="text" style="width: 100%;" class="" id="txtPnl3ChequeNum' + rowCounter + '" name = "txtPnl3ChequeNum'
            + rowCounter + '" value="' + chequeNo + '" maxlength="20" readonly/></td>'

            + '<td><input type="date" style="width: 70%;" class="" id="txtPnl3Date' + rowCounter + '" name = "txtPnl3Date'
            + rowCounter + '" value="' + chequeDate + '" readonly/></td>'   
            + '</tr>';

        $('#hdnPnl3RowCounter').val(rowCounter);
    }

    $("#tblPanel3 tbody").append(newRowContent);
    $('#imgBtnPnl3NewRow').hide();
}

function ShowPanel2Controls(tblVoucherEntryDetail, voucherType)
{   
    var newRowContent = "";
    $("#tblPanel2 tbody").html('');
    $('#hdnPnl2RowCounter').val('0');

    for (let i = 0; i < tblVoucherEntryDetail.length; i++)
    {
        if (i > 0 || voucherType == 'Journal')
        {
            let obj = tblVoucherEntryDetail[i];

            //obj.LedgerId
            //obj.Amount
            //obj.EntryType

            var rowCounter = $('#hdnPnl2RowCounter').val();
            rowCounter = parseInt(rowCounter) + 1;
            var ddlDrCrOptions = '<option value="">-Select-</option>';
            var ddlPnl2LedgerAccountOptions = '<option value="">-Select-</option>';

            if (obj.EntryType == "Dr") {
                ddlDrCrOptions = ddlDrCrOptions + '<option value="Dr" selected>Dr</option><option value="Cr">Cr</option>';
            }
            else if (obj.EntryType == "Cr") {
                ddlDrCrOptions = ddlDrCrOptions + '<option value="Dr">Dr</option><option value="Cr" selected>Cr</option>';
            }

            if (voucherType.trim() == 'Payment') { // Dr

                var isLedgerGroupBankAccountOrCash = false;
                ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                    + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, obj.LedgerId);

                $('#trOpeningBalance').show();
                $('#trClosingBalance').show();
            }
            else if (voucherType.trim() == 'Receipt') { // Cr

                var isLedgerGroupBankAccountOrCash = false;
                ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                    + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, obj.LedgerId);

                $('#trOpeningBalance').show();
                $('#trClosingBalance').show();
            }
            else if (voucherType.trim() == 'Journal') {

                var isLedgerGroupBankAccountOrCash = false;
                ddlPnl2LedgerAccountOptions = ddlPnl2LedgerAccountOptions
                    + GetLedgerAccountDropDownListItems(isLedgerGroupBankAccountOrCash, obj.LedgerId);

                $('#trOpeningBalance').hide();
                $('#trClosingBalance').hide();
            }

            newRowContent = newRowContent + '<tr  id = "panel2Row' + rowCounter + '" ><td><select style="width: 100%;" id="ddlPnl2LedgerAccount' + rowCounter + '" name = "ddlPnl2LedgerAccount'
                + rowCounter + '" class="">' + ddlPnl2LedgerAccountOptions + '</select></td>'

                + '<td><input type="text" style="width: 100%;" class="" id="txtPnl2Amount' + rowCounter + '" name = "txtPnl2Amount'
                + rowCounter + '" value="' + obj.Amount + '" maxlength="18" readonly/></td>'

                + '<td><select style="width: 70%;" id="ddlPnl2DrCr' + rowCounter + '" name = "ddlPnl2DrCr'
                + rowCounter + '" class="">' + ddlDrCrOptions + '</select> </td></tr>';

            $('#hdnPnl2RowCounter').val(rowCounter);
        }
    }

    $("#tblPanel2 tbody").append(newRowContent);
    $('#imgBtnPnl2NewRow').hide();
}

function ClearAll() {

    //$('#txtVoucherId, #txtVoucherEntryDate, #txtVoucherType ,#ddlVoucherType, #ddlLedgerAccount, #txtAmount, #txtNarration, #txtIfcsCode, #txtBankName, #txtBankBranchName, #txtBankAcNum, #txtChequeNumber, #txtChequeDate, #txtGSTNumber').val('');
    $('#txtVoucherId, #txtVoucherEntryDate, #txtVoucherType ,#ddlVoucherType, #ddlLedgerAccount, #txtOpeningBalance, #txtClosingBalance, #txtNarration').val('');
    $('#btnSave').attr("disabled", false);
    $('#chkApprove').attr("disabled", false);
  }

function CreateFaVoucherEntry()
{
    $('#divPanel2').hide();
    $('#divPanel3').hide();
    $('#divFaVoucherEntryList').hide();
    $('#divFaVoucherEntry').show();
    $('#lblAddVoucherEntry').show();
    $('#ddlLedgerAccount').show();
    $('#txtLedgerName').val('');
    $('#txtLedgerName').hide();

    $('#txtVoucherEntryDate, #txtNarration').removeAttr("readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnExport').hide();
    ClearAll();
    $('#ddlVoucherType').attr("disabled", false);
    $('#ddlLedgerAccount').attr("disabled", false);
    $('#txtVoucherType').hide();
    $('#ddlVoucherType').show();
    $('#chkApprove').prop("checked", false);
    $('#imgBtnPnl2NewRow').show();
    $('#imgBtnPnl3NewRow').show();
}

function AddDetails()
{
    var isUpdate = 0;
    var isValid = true;
    var voucherType = "";

    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
        voucherType = $('#txtVoucherType').val();
    }
    else
    {
        voucherType = $("#ddlVoucherType").find("option:selected").text();
    }

    if (isUpdate == 0)
    {
        if ($('#txtVoucherEntryDate').val() == '') {
            alertify.error("Please Enter Voucher Entry Date");
            isValid = false;
        }
        else if ($('#ddlVoucherType').val() == '') {
            alertify.error("Please select Voucher Type");
            isValid = false;
        }
        else if (voucherType.trim() != 'Journal') {

            if ($('#ddlLedgerAccount').val() == '') {
                alertify.error("Please select Ledger Account");
                isValid = false;
            }
        }
        else if (voucherType.trim() == 'Journal')
        {
            var sumOfCreditAmount = 0.0;
            var sumOfDebitAmount = 0.0;

            //Here traverse and  read input/select values present in each td of each tr, ;
            $("table#tblPanel2 > tbody > tr").each(function (row, tr)
            {
                var entryType = $('td:eq(2) select', this).val();

                if (entryType == 'Dr') {
                    sumOfDebitAmount = sumOfDebitAmount + parseFloat($('td:eq(1) input', this).val());
                }
                else if (entryType == 'Cr') {
                    sumOfCreditAmount = sumOfCreditAmount + parseFloat($('td:eq(1) input', this).val());
                }
            });

            if (sumOfDebitAmount != sumOfCreditAmount)
            {
                alertify.error("For Journal ledger account, sum Of Debit Amount must be equal to sum Of Credit Amount !");
                isValid = false;
            }
        }

        if ($('#divPanel2').is(":visible"))
        {
            var rc = 1;

            $("table#tblPanel2 > tbody > tr").each(function (row, tr)
            {
                if ($('td:eq(0) select', this).val() == '') {
                    alertify.error("Please select Ledger Account (Bottom Panel -> Row: " + rc + " , Column Name : Particular");
                    isValid = false;
                }
                var amount = parseInt($('td:eq(1) input', this).val());

                //alertify.error("Amount befor parsing : " + $('td:eq(1) input', this).val());

                //alertify.error("Amount : " + amount);

                //if ( !defined('ABSPATH') )
                if (!(typeof amount == 'number' && !isNaN(amount))) {
                    alertify.error("Amount must be a non zero numeric or decimal value (Bottom Panel -> Row: " + rc);
                    isValid = false;
                }

                if ((typeof amount == 'number' && amount <= 0)) {
                    alertify.error("Amount must be a non zero numeric or decimal value (Bottom Panel -> Row: " + rc);
                    isValid = false;
                }
                if ($('td:eq(2) select', this).val() == '') {
                    alertify.error("Please select Entry Type (Bottom Panel -> Row: " + rc + ", Column Name : Dr/Cr");
                    isValid = false;
                }

                rc++;
            });

        }
        else if ($('#divPanel3').is(":visible"))
        {
            var rc = 1;

            $("table#tblPanel3 > tbody > tr").each(function (row, tr)
            { 
               if ($('td:eq(0) select', this).val() == '') {
                    alertify.error("Please select Ledger Account (Bottom Panel -> Row: " + rc + " , Column Name : Particular");
                    isValid = false;
                }

                var amount = parseInt($('td:eq(1) input', this).val());

                //alertify.error("Amount befor parsing : " + $('td:eq(1) input', this).val());
                
                //alertify.error("Amount : " + amount);
                              
                //if ( !defined('ABSPATH') )
                if (!(typeof amount == 'number' && !isNaN(amount)))
                {
                    alertify.error("Amount must be a non zero numeric or decimal value (Bottom Panel -> Row: " + rc);
                    isValid = false;
                }

                if ((typeof amount == 'number' && amount <= 0)) {
                    alertify.error("Amount must be a non zero numeric or decimal value (Bottom Panel -> Row: " + rc);
                    isValid = false;
                }

                if ($('td:eq(2) select', this).val() == '') {
                    alertify.error("Please select Entry Type (Bottom Panel -> Row: " + rc + ", Column Name : Dr/Cr");
                    isValid = false;
                }
                if ($('td:eq(3) select', this).val() == '') {
                    alertify.error("Please select Transaction Type (Bottom Panel -> Row: " + rc);
                    isValid = false;
                }

                rc++;
            });
        }
    }

    if (isValid)
    {
        var sumOfAmount = 0.0;
        var strXML = "<VoucherEntryDetailList>";
       
        if (voucherType.trim() == 'Payment' || voucherType.trim() == 'Receipt')
        {
            //panel 2
            //Here traverse and  read input/select values present in each td of each tr, ;
            $("table#tblPanel2 > tbody > tr").each(function (row, tr) {

                strXML = strXML + "  <VoucherEntryDetail>";

                strXML = strXML + "    	<LedgerId>" + $('td:eq(0) select', this).val() + "</LedgerId>";
                strXML = strXML + "    	<Amount>" + $('td:eq(1) input', this).val() + "</Amount>";
                strXML = strXML + "    	<EntryType>" + $('td:eq(2) select', this).val().trim() + "</EntryType>";
                strXML = strXML + "    	<TransactionType> " + "" + "</TransactionType>";
                strXML = strXML + "    	<IfcsCode>" + "" + "</IfcsCode>";
                strXML = strXML + "    	<BankName>" + "" + "</BankName>";
                strXML = strXML + "    	<BankBrnachName>" + "" + "</BankBrnachName>";
                strXML = strXML + "    	<BankAcNo>" + "" + "</BankAcNo>";
                strXML = strXML + "    	<ChequeNo>" + "" + "</ChequeNo>";
                strXML = strXML + "    	<ChequeDate>" + "" + "</ChequeDate>";
                strXML = strXML + "    	<GstNo>" + "" + "  </GstNo>";

                strXML = strXML + "  </VoucherEntryDetail>";

                sumOfAmount = sumOfAmount + parseFloat($('td:eq(1) input', this).val());
            });

        }
        else if (voucherType.trim() == 'Journal')
        {
            //panel 2
            //Here traverse and  read input/select values present in each td of each tr, ;
            $("table#tblPanel2 > tbody > tr").each(function (row, tr) {
                strXML = strXML + "  <VoucherEntryDetail>";
                strXML = strXML + "    	<LedgerId>" + $('td:eq(0) select', this).val() + "</LedgerId>";
                strXML = strXML + "    	<Amount>" + $('td:eq(1) input', this).val() + "</Amount>";
                strXML = strXML + "    	<EntryType>" + $('td:eq(2) select', this).val() + "</EntryType>";
                strXML = strXML + "    	<TransactionType> " + "" + "</TransactionType>";
                strXML = strXML + "    	<IfcsCode>" + "" + "</IfcsCode>";
                strXML = strXML + "    	<BankName>" + "" + "</BankName>";
                strXML = strXML + "    	<BankBrnachName>" + "" + "</BankBrnachName>";
                strXML = strXML + "    	<BankAcNo>" + "" + "</BankAcNo>";
                strXML = strXML + "    	<ChequeNo>" + "" + "</ChequeNo>";
                strXML = strXML + "    	<ChequeDate>" + "" + "</ChequeDate>";
                strXML = strXML + "    	<GstNo>" + "" + "  </GstNo>";

                strXML = strXML + "  </VoucherEntryDetail>";
            });
        }
        else if (voucherType.trim() == 'Contra')
        {
            var sumOfCreditAmount = 0.0;
            var sumOfDebitAmount = 0.0;
            //panel 3
            //Here traverse and  read input/select values present in each td of each tr, ;
            $("table#tblPanel3 > tbody > tr").each(function (row, tr)
            {
                var entryType = $('td:eq(2) select', this).val();
                strXML = strXML + "  <VoucherEntryDetail>";
                strXML = strXML + "    	<LedgerId>" + $('td:eq(0) select', this).val() + "</LedgerId>";
                strXML = strXML + "    	<Amount>" + $('td:eq(1) input', this).val() + "</Amount>";
                strXML = strXML + "    	<EntryType>" + entryType + "</EntryType>";
                strXML = strXML + "    	<TransactionType>" + $('td:eq(3) select', this).val() + "</TransactionType>";
                strXML = strXML + "    	<IfcsCode>" + "" + "</IfcsCode>";
                strXML = strXML + "    	<BankName>" + "" + "</BankName>";
                strXML = strXML + "    	<BankBrnachName>" + "" + "</BankBrnachName>";
                strXML = strXML + "    	<BankAcNo>" + "" + "</BankAcNo>";
                strXML = strXML + "    	<ChequeNo>" + $('td:eq(4) input', this).val() + "</ChequeNo>"; 
                strXML = strXML + "    	<ChequeDate>" + $('td:eq(5) input', this).val() + "</ChequeDate>";
                strXML = strXML + "    	<GstNo>" + "" + "</GstNo>";

                strXML = strXML + "  </VoucherEntryDetail>";

                if (entryType == 'Dr')
                {
                    sumOfDebitAmount = sumOfDebitAmount + parseFloat($('td:eq(1) input', this).val());
                }
                else if (entryType == 'Cr')
                {
                    sumOfCreditAmount = sumOfCreditAmount + parseFloat($('td:eq(1) input', this).val());
                }
            });

            sumOfAmount = sumOfCreditAmount - sumOfDebitAmount;
        }

        strXML = strXML + "</VoucherEntryDetailList>";
            
            $.ajax({
                type: "POST",
                url: 'wfFaVoucherEntry.aspx/AddDetails',
                data: JSON.stringify({
                    "voucherId": $('#txtVoucherId').val().trim(),
                    "voucherEntryDate": $('#txtVoucherEntryDate').val().trim(),
                    "voucherType": voucherType.trim(),
                    "ledgerId": $('#ddlLedgerAccount').val().trim(),
                    "narration": $('#txtNarration').val().trim(), 
                    "amount": sumOfAmount,
                    "approve": $('#chkApprove').prop('checked') === true ? "y" : "n",
                    "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                    "strXML": strXML
                }),
                
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {

                    if (isUpdate == 0) {
                        alertify.success("Voucher Entry added successfully");
                        CreateFaVoucherEntry();
                    }
                    else
                    {
                        alertify.success("Voucher Entry updated successfully");
                    }
                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });
    }
}

function ExportToExcel() {
    $('#tblExportToExcelVoucherEntry').DataTable().clear();
    $('#tblExportToExcelVoucherEntry').DataTable().destroy();
    $('#tbody_ExportToExcelVoucherEntry').html('');
    var html = '';
    //Loop through all checked CheckBoxes in table.

    var rows = $('[id*=tblFaVoucherEntryList] tr:not(:has(th))');
    for (j = 0; j < rows.length; j++) {
        if ($(rows[j]).find('input').is(':checked'))
        {
            var $tds = $(rows[j]).find('td'),

            VoucherId = $tds.eq(1).text(),
            VoucherEntryDate = $tds.eq(2).text(),
            VoucherType = $tds.eq(3).text(),
            Narration = $tds.eq(4).text(),
            TransactionType = $tds.eq(5).text(),
            TransactionId = $tds.eq(6).text(),
            FinancialYearId = $tds.eq(7).text(),
            Approve = $tds.eq(8).text(),
            Active = $tds.eq(9).text(),
            CreateUser = $tds.eq(10).text(),
            CreateDate = $tds.eq(11).text();

            html = html + '<tr>'
                
                + '<td >' + VoucherId + '</td > '
                + '<td >' + VoucherEntryDate + '</td > '
                + '<td >' + VoucherType + '</td > '
                //+ '<td >' + CrLedgerName + '</td > '
                //+ '<td >' + DrLedgerName + '</td > '
                //+ '<td >' + Amount + '</td > '
                + '<td >' + Narration + '</td>'
                //+ '<td >' + IfcsCode + '</td > '
                //+ '<td >' + BankName + '</td > '
                //+ '<td >' + BankBrnachName + '</td > '
                //+ '<td >' + BankAcNo + '</td > '
                //+ '<td >' + ChequeNo + '</td > '
                //+ '<td >' + ChequeDate + '</td > '
                //+ '<td >' + GstNo + '</td>'
                + '<td >' + TransactionType + '</td > '
                + '<td >' + TransactionId + '</td > '
                + '<td >' + FinancialYearId + '</td > '
                + '<td >' + Approve + '</td > '
                + '<td >' + Active + '</td > '
                + '<td >' + CreateUser + '</td > '
                + '<td >' + CreateDate + '</td>'
                + '</tr > ';

        }
    }

    //alert(html);

    $('#tbody_ExportToExcelVoucherEntry').html(html);
    var d = new Date();
    $('#tblExportToExcelVoucherEntry').DataTable();

    $("#tblExportToExcelVoucherEntry").tableHTMLExport({
        type: 'csv',
        filename: "Voucher List_" + d.toDateString(),
    });
}
