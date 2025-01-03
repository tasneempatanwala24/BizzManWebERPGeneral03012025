$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindAccountGroupDropDown();
    ViewFaLedgerMasterList();
    //BindFaLedgerMasterDetails();

    $('#tblPanel4A').hide();
    $('#tblPanel4').hide();
    $('#tblPanel3').hide();
    $('#tblPanel5').hide(); 
    $('#tblPanel6').hide(); 
    $('#tblPanel7').hide(); 
    $('#tblPanel8').hide(); 
    $('#tblPanel9').hide(); 
    $('#tblProvideBankDetail').hide();
    $('#ddlAccountGroup').change(PrimaryAccountGroupChange);
    $('#ddlProvideBankDetail').change(ShowHideBankAccountDetailPanel);
    $('#ddlP4SetAlterGSTDetails').change(P4SetAlterGSTDetails); 
    $('#ddlP3IsTDSDeductable').change(P3TDSDeductableDropDownChange); 

    $('#ddlP3TreatAsTDSExpenses').change(CanTreatAsTDSExpenses);
    $('#ddlP3DeductTDSInSameVoucher').change(CanDeductTDSInSameVoucher);
       
    $('#ddlP3AssesableVCFor').change(AssesableVCInclusionFor);
    $('#ddlP3AppropriateTo').change(AppropriateToChange);

    
    $('#ddlP4RegistrationType').change(P4RegistrationTypeChange);

    BindCountryDropDown();
    $('#ddlP4Country').change(CountryDropDownOnChange);
    BindGSTDetailClassificationDropDown();
    BindNatureOfTransactionDropDown();

    $('#ddlP7IsGSTApplicable').change(P7IsGSTApplicable); 
    $('#ddlP7SetAlterGSTDetails').change(P7SetAlterGSTDetails); 
    $('#ddlP7IsTDSApplicable').change(CheckP7IsTDSApplicable);
    $('#ddlP9TypeOfDutyTax').change(TypeOfDutyOrTax);
    $('#ddlP9TaxType').change(CheckP9TaxType); 
    $('#ddlP9IsTDSApplicable').change(CheckP9IsTDSApplicable);
    $('#ddlP6TypeOfLedger').change(CheckP6TypeOfLedger);
    $('#ddlP8NatureOfTransaction').change(ChangeInP8NatureOfTransactionDropDown);   
    $('#ddlP10MaintainBalancesBillByBill').change(ChangeInMaintainBalancesBillByBillDropDown); 

    $('input[name=txtP4GSTINUIN]').change(function () { $('#txtP5GSTINUIN').val($('#txtP4GSTINUIN').val()); });

    BindTdsDeducteeTypeDropDown();
});

function P4RegistrationTypeChange()
{
    var selectedValue = $('#ddlP4RegistrationType').val();
    $('#ddlP5RegistrationType').val(selectedValue);
}

function ChangeInMaintainBalancesBillByBillDropDown()
{
    var selectedValue = $('#ddlP10MaintainBalancesBillByBill').val();

    if (selectedValue == 'Y')
    {
        $('#trP10DefaultCreditPeriod').show();
        $('#trP10CheckforCreditDays').show();
    }
    else {
        $('#trP10DefaultCreditPeriod').hide();
        $('#trP10CheckforCreditDays').hide();
    }
}

function ChangeInP8NatureOfTransactionDropDown()
{
    var id = $('#ddlP8NatureOfTransaction').val();

    if (id > 0) {
        $.ajax({
            type: "POST",
            url: 'wfFaLedgerMaster.aspx/GetTransactionDetail',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
             
                $('#txtP8Taxibility').val(data[0].Taxability);
                $('#txtP8IntegratedTax').val(data[0].IntegratedTax);
                $('#txtP8Cess').val(data[0].Cess);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else
    {
        $('#txtP8Taxibility').val("");
        $('#txtP8IntegratedTax').val("");
        $('#txtP8Cess').val("");
    }
}

function CheckP6TypeOfLedger()
{
    var selectedValue = $('#ddlP6TypeOfLedger').val();
    var arrNotApplicable = selectedValue.match("Not Applicable");
    var arrDiscount = selectedValue.match("Discount"); 
    var arrInvoiceRounding = selectedValue.match("Invoice Rounding");

    if (arrNotApplicable != null || arrDiscount != null) {
        $('#trP6RoundingMethod').hide();
        $('#trP6RoundingLimit').hide();
    }
    else if (arrInvoiceRounding != null) {
        $('#trP6RoundingMethod').show();
        $('#trP6RoundingLimit').show();
    }
    else
    {
        $('#trP6RoundingMethod').hide();
        $('#trP6RoundingLimit').hide()
    }
}


function CheckP9TaxType()
{
    var selectedValue = $('#ddlP9TaxType').val();
    var arr = selectedValue.match("Cess");

    if (arr != null)
    {
        $('#trP9ValuationType').show();
    }
    else
    {
        $('#trP9ValuationType').hide();
    }
}

function CheckP9IsTDSApplicable()
{
    var selectedValue = $('#ddlP9IsTDSApplicable').val();
  
    if (selectedValue == "Applicable") {
        $('#trP9NatureOfPayment').show();
    }
    else {
        $('#trP9NatureOfPayment').hide();
    }
}

function CheckP7IsTDSApplicable()
{
    var selectedValue = $('#ddlP7IsTDSApplicable').val();
   
    if (selectedValue == 'Y') {
        $('#trP7NatureOfPayment').show();
    }
    else {
        $('#trP7NatureOfPayment').hide();
    } 
}

function P7IsGSTApplicable()
{
    var selectedValue = $('#ddlP7IsGSTApplicable').val();
  
    if (selectedValue == 'Y') {
        $('#trP7SetAlterGSTDetails').show(); 
        $('#trP7TypeOfSupply').show();
    }
    else {
        $('#trP7SetAlterGSTDetails').hide();
        $('#trP7TypeOfSupply').hide();
    } 
}

function BindGSTDetailClassificationDropDown()
{
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/GetGstClassificationList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var classifications = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                classifications = classifications + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].GstDetailClassification + "</option>";
            }
            $('#ddlP8Classification').append(classifications);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindNatureOfTransactionDropDown()
{
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/GetNatureOfTransactionList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var transactions = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                transactions = transactions + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].NatureTransection + "</option>";
            }
            $('#ddlP8NatureOfTransaction').append(transactions);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function AppropriateToChange()
{
    var selectedValue = $('#ddlP3AppropriateTo').val();
    var arr = selectedValue.match("Goods");
    
    if (arr != null)
    {
        $('#trMethodOfCalculation').show();
        $('#ddlMethodOfCalculation').val("Based on Value");
        $('#ddlMethodOfCalculation').attr("disabled", true);
    }
    else
    {
        $('#ddlMethodOfCalculation').attr("disabled", false);
        $('#ddlMethodOfCalculation').val("");
        $('#trMethodOfCalculation').show();
    }
}

function AssesableVCInclusionFor()
{
    var selectedValue = $('#ddlP3AssesableVCFor').val();
    var arr = selectedValue.match("GST");
    
    if (arr != null)
    {
        $('#trAppropriateTo').show();
        $('#trMethodOfCalculation').show();
    }
    else {
        $('#trAppropriateTo').hide();
        $('#trMethodOfCalculation').hide();
    }
}

function TypeOfDutyOrTax()
{
    var selectedValue = $('#ddlP9TypeOfDutyTax').val();
    var arrGST = selectedValue.match("GST");
    var arrOthers = selectedValue.match("Others");
    var arrTDS = selectedValue.match("TDS");

    if (arrGST != null || arrOthers != null)
    {
        if (arrGST != null) {
            $('#trP9TaxType').show();
        }
        else
        {
            $('#trP9TaxType').hide();
        }

        $('#trP9ValuationType').hide();
        $('#trP9PercentageOfCalculation').show(); 
        $('#trP9RoundingMethod').show();
        $('#trP9IsTDSApplicable').show();
        $('#trP9NatureOfPayment').hide(); 
       
    }
    else if (arrTDS != null)
    {
        $('#trP9NatureOfPayment').show(); 

        $('#trP9TaxType').hide();
        $('#trP9ValuationType').hide();
        $('#trP9PercentageOfCalculation').hide();
        $('#trP9RoundingMethod').hide();
        $('#trP9IsTDSApplicable').hide();
    }
    else {
        $('#trP9NatureOfPayment').hide(); 
        $('#trP9TaxType').hide();
        $('#trP9ValuationType').hide();
        $('#trP9PercentageOfCalculation').hide();
        $('#trP9RoundingMethod').hide();
        $('#trP9IsTDSApplicable').hide();
       
    }
}

function CanTreatAsTDSExpenses()
{
    var selectedValue = $('#ddlP3TreatAsTDSExpenses').val();

    if (selectedValue == 'N')
    {
        // BindTdsDeducteeTypeDropDown();

        if ($('#hdP3SelectedDeducteeTypeId').val() != undefined || $('#hdP3SelectedDeducteeTypeId').val() != "") {
            $('#ddlP3DeducteeType').val($('#hdP3SelectedDeducteeTypeId').val());
        }
        else
        {
            $('#ddlP3DeducteeType').val('-1');
        }

        $('#trDeducteeType').show();
        $('#trDeductTDSInSameVoucher').show();
        $('#trNatureOfPayment').hide();
        
    }
    else if (selectedValue == 'Y')
    {
        $('#trNatureOfPayment').show();
        $('#trDeducteeType').hide();
        $('#trDeductTDSInSameVoucher').hide();
    }
    else
    {
        $('#trNatureOfPayment').hide();
        $('#trDeducteeType').hide();
        $('#trDeductTDSInSameVoucher').hide();
    }
}

function CanDeductTDSInSameVoucher()
{
    var selectedValue = $('#ddlP3DeductTDSInSameVoucher').val();

    if (selectedValue == 'Y') {
        $('#trNatureOfPayment').show();
        $('#ddlP3NatureOfPayment').val(''); 
    }
    else {
        $('#trNatureOfPayment').hide();
    }
}

function P3TDSDeductableDropDownChange()
{
    var selectedValue = $('#ddlP3IsTDSDeductable').val();

    if (selectedValue == 'Y') {
        $('#trTreatAsTDSExpenses').show();

        if ($('#btnSave').html() == 'Save')
        {
            $('#ddlP3TreatAsTDSExpenses, #ddlP3DeductTDSInSameVoucher, #ddlP3NatureOfPayment').val('');
            $('#ddlP3DeducteeType').val('-1');
        }
    }
    else {
        $('#trTreatAsTDSExpenses').hide();
        $('#trDeducteeType').hide();
        $('#trDeductTDSInSameVoucher').hide();
        $('#trNatureOfPayment').hide();
        $('#trAppropriateTo').hide();
        $('#trMethodOfCalculation').hide();
    }
}

function P4SetAlterGSTDetails()
{
    var selectedValue = $('#ddlP4SetAlterGSTDetails').val();

    if (selectedValue == 'Y')
    {        
        $('#txtP5GSTINUIN').val($('#txtP4GSTINUIN').val());
        $('#tblPanel5').show();
    }
    else {
        $('#tblPanel5').hide();
    }
}

function P7SetAlterGSTDetails()
{
    var selectedValue = $('#ddlP7SetAlterGSTDetails').val();

    if (selectedValue == 'Y') {

        $('#tblPanel8').show();
     }
    else {
        $('#tblPanel8').hide();
    }    
}

function ShowHideBankAccountDetailPanel()
{
    ClearPanel2();
    var selectedValue = $('#ddlProvideBankDetail').val();

    if (selectedValue == 'Y')
    {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }
}

function PrimaryAccountGroupChange()
{
    if ($('#btnSave').html() == 'Save')
    {
        ClearControlHistory();
        ShowHidePanelsByPrimaryAccountGroup();
    }
    else if ($('#btnSave').html() == 'Update')
    {
        ShowHidePanelsByPrimaryAccountGroup();
    }
}

function ShowHidePanelsByPrimaryAccountGroup()
{
    var accountGroupId = parseInt($('#ddlAccountGroup').val());
    //alert('Account Group Id : ' + accountGroupId);

    if (accountGroupId > 0)
    {
        FetchFaPrimeGroupDetails(accountGroupId);
    }
    else if (accountGroupId <= 0) 
    {
        Reset();
    }
}

function BindFaLedgerMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/FetchLedgerDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblFaLedgerMasterList').DataTable().clear();
            $('#tblFaLedgerMasterList').DataTable().destroy();
            $('#tbody_FaLedgerMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active" value="' + data[i].Id + '"></td>'
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].Id + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].LedgerName + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].GroupName + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].OpBalance + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].ClBalance + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].FinancialYear + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">' + data[i].CreateUser + '</td > '
                    + '<td onclick="FetchFaLedgerDetails(\'' + data[i].Id + '\' ,\'' + data[i].LedgerName + '\')">'  + data[i].Active + '</td>'
            }
            $('#tbody_FaLedgerMaster_List').html(html);
            //$('#tblFaLedgerMasterList').DataTable();
            var d = new Date();
            var table = $('#tblFaLedgerMasterList').DataTable({
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
                //,
                //  dom: 'lfrtBip',
                //buttons: [
                //    {
                //        "extend": "excel", "text": "Export To Excel",
                //        title: "Ledger Details_" + d.toDateString()
                //    }
                //
                //]
            });

            $('#example-select-all').on('click', function () {
                // Check/uncheck all checkboxes in the table
                var rows = table.rows({ 'search': 'applied' }).nodes();
                $('input[type="checkbox"]', rows).prop('checked', this.checked);
            });

            $('#tblFaLedgerMasterList tbody').on('change', 'input[type="checkbox"]', function () {
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


function BindCountryDropDown() {
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/GetCountryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var countries = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                countries = countries + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CountryName + "</option>";
            }
            $('#ddlP4Country').append(countries);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function CountryDropDownOnChange()
{
    $("#ddlP4State").empty().append(
        '<option value = "-1">-Select State-</option>');

    var id = $('#ddlP4Country').val();

    if (id > 0)
    {
        $.ajax({
            type: "POST",
            url: 'wfFaLedgerMaster.aspx/GetStateList',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                //var data = JSON.parse(response.d);
                var states = "";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    states = states + "<option value='" + JSON.parse(response.d)[i].StateId + "'>" + JSON.parse(response.d)[i].StateName + "</option>";
                }
                $('#ddlP4State').append(states);

                if ($('#hdP4SelectedStateId').val() != undefined || $('#hdP4SelectedStateId').val() != "")
                {
                    $('#ddlP4State').val($('#hdP4SelectedStateId').val());
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function BindAccountGroupDropDown() {
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/AccountGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].GroupName + "</option>";
            }
            $('#ddlAccountGroup').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindTdsDeducteeTypeDropDown()
{
   // $("#ddlP3DeducteeType").empty().append(
   //     '<option value = "-1">- Select -</option>');

    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/TdsDeducteeTypeList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //var data = JSON.parse(response.d);
            var deducteeType = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                deducteeType = deducteeType + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].TdsDeducteeType + "</option>";
            }
            $('#ddlP3DeducteeType').append(deducteeType);

            if ($('#hdP3SelectedDeducteeTypeId').val() != undefined || $('#hdP3SelectedDeducteeTypeId').val() != "") {
                $('#ddlP3DeducteeType').val($('#hdP3SelectedDeducteeTypeId').val());
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchFaLedgerDetails(id, ledgerName)
{
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/FetchFaLedgerMasterDetails',
        data: JSON.stringify({
            "id": id,
            'ledgerName': ledgerName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            ClearAll();
            $('#divFaLedgerMasterList').hide();
            $('#divFaLedgerMasterEntry').show();
            $("#btnSave").html('Update');
            $('#txtLedgerName,#txtOpeningBalance').attr("readonly", "readonly");
            //  $('#txtLedgerName,#txtOpeningBalance,#txtIfcsCode,#txtBankName,#txtBankBranchName,#txtBankAcNum').attr("readonly", "readonly");
            $("#btnSave").show();

            $('#txtLedgerId').val(data[0].Id);
            $('#txtLedgerName').val(data[0].LedgerName);
            $('#txtOpeningBalance').val(data[0].OpBalance);

            $('#txtIfcsCode').val(data[0].IfcsCode);
            $('#txtBankName').val(data[0].BankName);
            $('#txtBankBranchName').val(data[0].BankBranchName);
            $('#txtBankAcNum').val(data[0].BankAcNo);

            $('#ddlAccountGroup').val(data[0].GroupMasterId);
            $('#chkActive').prop('checked', data[0].Active === "Y");

            $('#txtSetODLimit').val(data[0].SetOdLimit);
            $('#ddlP3IsTDSDeductable').val(data[0].Panel3_IsTdsDeductable);
            $('#ddlP3TreatAsTDSExpenses').val(data[0].Panel3_Treat_TDS_Expenses);
            $('#ddlP3DeducteeType').val(data[0].Panel3_DeducteeType);

            var deducteeTypeId = data[0].Panel3_DeducteeType;
            $('#hdP3SelectedDeducteeTypeId').val(deducteeTypeId); 

            $('#ddlP3DeductTDSInSameVoucher').val(data[0].Panel3_DeductTdsSameVoucher);
            $('#ddlP3NatureOfPayment').val(data[0].Panel3_NaturePayment);
            $('#ddlP3AssesableVCFor').val(data[0].Panel3_IncludeAssessableValueCalculate);
            $('#ddlP3AppropriateTo').val(data[0].Panel3_AppropriateTo);
            $('#ddlP3MethodOfCalculation').val(data[0].Panel3_MethodCalculation);
            $('#ddlProvideBankDetail').val(data[0].ProvideBankDetail);
            $('#txtAccountHolderName').val(data[0].AcHolderName);
            $('#txtSwiftCode').val(data[0].SwiftCode);
            $('#txtBSRCode').val(data[0].BsrCode);
            $('#ddlSetAlterRangeChequeBook').val(data[0].SetAlterRangeChequeBook);
            $('#ddlSetAlterChequePrintingConfig').val(data[0].SetAlterChequePrintingConfiguration);
            $('#ddlTransactionType').val(data[0].TransactionType);
            $('#txtPANITNumber').val(data[0].Panel4A_PanItNo);
            $('#ddlP4RegistrationType').val(data[0].Panel4A_RegistrationType);
            $('#txtP4GSTINUIN').val(data[0].Panel4A_GSTIN_UIN);
            $('#ddlP4SetAlterGSTDetails').val(data[0].Panel4A_SetAlterGstDetail);
            $('#txtP4Name').val(data[0].Panel4_Name);
            $('#ddlP4Country').val(data[0].Panel4_Country);
            CountryDropDownOnChange();
            $('#txtP4Address').val(data[0].Panel4_Address);
           
            $('#txtP4PinCode').val(data[0].Panel4_Pincode);
            $('#ddlP5RegistrationType').val(data[0].Panel4A_RegistrationType);
            $('#ddl5IsAssesseeOfOtherTeritory').val(data[0].Panel5_AssesseeOtherTeritory);
            $('#ddl5IsEcommerceOperator').val(data[0].Panel5_Is_e_CommerceOperator);
            $('#txtP5GSTINUIN').val(data[0].Panel4A_GSTIN_UIN);
            $('#ddl5IsATransporter').val(data[0].Panel5_IsA_Transporter);
            $('#ddlP6TypeOfLedger').val(data[0].Panel6_TypeLedger);
            $('#ddlP6RoundingMethod').val(data[0].Panel6_RoundingMethod);
            $('#txtP6RoundingLimit').val(data[0].Panel6_RoundingLimit);
            $('#ddlP7IsGSTApplicable').val(data[0].Panel7_IsGstApplicable);
            $('#ddlP7SetAlterGSTDetails').val(data[0].Panel7_SetAlterGstDetail);
            $('#ddlP7TypeOfSupply').val(data[0].Panel7_TypeSupply);
            $('#ddlP7IsTDSApplicable').val(data[0].Panel7_IsTdsApplicable);
            $('#ddlP7NatureOfPayment').val(data[0].Panel7_BaturePayment);
            $('#ddlP7IncludeInAssessableVCFor').val(data[0].Panel7_IncludeAssessableValue);
            $('#ddlP8Classification').val(data[0].Panel8_Classification);
            $('#ddlP8NatureOfTransaction').val(data[0].Panel8_NatureTransaction);
            $('#txtP8Taxibility').val(data[0].Panel8_Taxability);
            $('#txtP8IntegratedTax').val(data[0].Panel8_IntegratedTax);
            $('#txtP8Cess').val(data[0].Panel8_Cess);
            $('#ddlP9TypeOfDutyTax').val(data[0].Panel9_TypeDutyTax);
           
            $('#ddlP9TaxType').val(data[0].Panel9_TaxType);
            $('#ddlP9ValuationType').val(data[0].Panel9_ValuationType);
            $('#txtP9PercentageOfCalculation').val(data[0].Panel9_PercentageCalculation);
            $('#ddlP9RoundingMethod').val(data[0].Panel9_RoundingMethod);
            $('#ddlP9IsTDSApplicable').val(data[0].Panel9_IsTdsApplicable);
            $('#ddlP9NatureOfPayment').val(data[0].Panel9_NaturePayment);
            $('#ddlP10MaintainBalancesBillByBill').val(data[0].Panel10_MaintainBalanceBillBill);
            $('#txtP10DefaultCreditPeriodDay').val(data[0].Panel10_DefaultCreditPeriod);
            $('#ddlP10CheckforCreditDayDuringVoucher').val(data[0].Panel10_CheckCreditDayDuringVoucher);

            $('#ddlAccountGroup').attr("disabled", true);
       
            PrimaryAccountGroupChange();
            var stateId = data[0].Panel4_State;
            $('#hdP4SelectedStateId').val(stateId);           
          
            $('#btnExport').hide();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchFaPrimeGroupDetails(id)
{
    $.ajax({
        type: "POST",
        url: 'wfFaLedgerMaster.aspx/FetchFaPrimeGroupDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var primeGroupName = data[0].PrimeGroupName;

            if (primeGroupName == 'Bank account') {
               // $('#tblAccountDetails').show();
                //$('#tblAccountDetails').removeAttr("hidden");
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel4').show();
                $('#tblPanel3').hide();
                $('#tblPanel5').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Bank OCC A/c')
            {
                BankOCCAccountConfiguration();
            }
            else if (primeGroupName == 'Bank OD Ac')
            {
                BankOCCAccountConfiguration(); //It will be  same as “Bank OCC A/c".
            }
            else if (primeGroupName == 'Suspense A/c')
            {
                SuspenseAccountConfiguration();
            }
            else if (primeGroupName == 'Branch /  Divisions' || primeGroupName == 'Branch / Divisions' || primeGroupName == 'Branch/Divisions')
            {
                SuspenseAccountConfiguration(); //It will be  same as “Suspense A/c".
            }
            else if (primeGroupName == 'Capital Account')
            {
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel4').show();
                $('#tblPanel5').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();

                $('#tblPanel3').show();

               //When TDS is deductible
                Panel3IfTDSDeductable();

                $('#trAssesableVCFor').hide();
                $('#trAppropriateTo').hide();
                $('#trMethodOfCalculation').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Current Assets' || primeGroupName == 'Current assets')
            {
                $('#tblProvideBankDetail').show();
                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel4').show();
                $('#tblPanel5').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                                              
                $('#tblPanel3').show();
                //When TDS is deductible
                Panel3IfTDSDeductable();

                $('#trAssesableVCFor').show();
              
                // when Assessable Value Calculation for GST
                IncludeInAssessableValueCalculatioForGST();

                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Current Liabilities')
            {
                $('#tblPanel4').show();
               
               // $('#tblAccountDetails').hide();
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel3').show();
                //When TDS is deductible
                Panel3IfTDSDeductable();

                $('#trAssesableVCFor').hide();
              
                $('#trAppropriateTo').hide();
                $('#trMethodOfCalculation').hide();

                $('#tblPanel5').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Cash-in-Hand')
            {
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }
               
                $('#tblPanel3').hide();
                $('#tblPanel4').hide();
                $('#tblPanel5').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Deposits(Asset)')
            {
                $('#tblPanel4').show();

                //$('#tblAccountDetails').hide();
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel3').show();
                //When TDS is deductible
                Panel3IfTDSDeductable();

                $('#trAssesableVCFor').hide();
                $('#trAppropriateTo').hide();
                $('#trMethodOfCalculation').hide();

                $('#tblPanel5').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Direct Expenses' || primeGroupName == 'Indirect Expenses' || primeGroupName == 'Direct Incomes' || primeGroupName == 'Indirect Income')
            {
                DirectExpensesConfiguration();
                
            }
            else if (primeGroupName == 'Duties & Taxes')
            {
                //$('#tblAccountDetails').show();
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel9').show();

                $('#tblPanel3').hide();
                $('#tblPanel4').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel5').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Fixed Assets')
            {
               // $('#tblAccountDetails').show();
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel4').show();
                $('#tblPanel4A').show();
                // When Set/ Alter GST Details is Yes in panel 4A
                LoadPanel4AConfiguration();
                $('#tblPanel7').show();
                $('#trP7IsGSTApplicable').show();
                $('#trP7IsTDSApplicable').show();
                $('#trP7IncludeInAssessableVCFor').show();

                $('#trP7NatureOfPayment').hide();
                $('#trP7SetAlterGSTDetails').hide();
                $('#trP7TypeOfSupply').hide();

                $('#tblPanel3').hide();
                $('#tblPanel6').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Investments')
            {
                InvestmentsConfiguration();
            }
            else if (primeGroupName == 'Loans & Advances(Asset)')
            {
                InvestmentsConfiguration(); // It will be same as “Investments”.
            }
            else if (primeGroupName == 'Loans (Liability)')
            {
               // $('#tblAccountDetails').show();
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel4').show();
                $('#tblPanel4A').show();
                // When Set/ Alter GST Details is Yes in panel 4A
                LoadPanel4AConfiguration();
                $('#tblPanel3').show();
                //When TDS is deductible
                Panel3IfTDSDeductable();

                $('#trAssesableVCFor').show();

                // when Assessable Value Calculation for GST
                IncludeInAssessableValueCalculatioForGST();

                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Misc. Expenses(Asset)') 
            {
                //$('#tblAccountDetails').show();
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel7').show(); 
                $('#trP7IsTDSApplicable').show();
                                
                $('#trP7IncludeInAssessableVCFor').hide();
                $('#trP7NatureOfPayment').hide();
                $('#trP7IsGSTApplicable').hide();
                $('#trP7SetAlterGSTDetails').hide();
                $('#trP7TypeOfSupply').hide();
                $('#tblPanel3').hide();
                $('#tblPanel4').hide();
                $('#tblPanel4A').hide();
                $('#trAssesableVCFor').hide();
                $('#trAppropriateTo').hide();
                $('#trMethodOfCalculation').hide();
                $('#tblPanel5').hide();
                $('#tblPanel6').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Provisions')
            {
                ProvisionsConfiguration();
            }
            else if (primeGroupName == 'Purchase Accounts')
            {
                DirectExpensesConfiguration(); //It will be  same as “Direct Expenses".
            }
            else if (primeGroupName == 'Reserves & Surplus')
            {
                ProvisionsConfiguration();  //It will be  same as “Provisions".
            }
            else if (primeGroupName == 'Retained Earnings')
            {
                ProvisionsConfiguration();   //It will be  same as “Provisions".
            }
            else if (primeGroupName == 'Sales Accounts')
            {
                DirectExpensesConfiguration(); //It will be  same as “Direct Expenses".
            }
            else if (primeGroupName == 'Secured Loans')
            {
                //$('#tblAccountDetails').show();
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel4').show();
                $('#tblPanel3').show();

                //When TDS is deductible
                Panel3IfTDSDeductable();

                $('#trAssesableVCFor').show();
                // when Assessable Value Calculation for GST
                IncludeInAssessableValueCalculatioForGST();

                $('#tblPanel5').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Stock-In-Hand')
            {
                //$('#tblAccountDetails').show();
                $('#ddlProvideBankDetail').val("Y");
                $('#tblProvideBankDetail').show();

                if ($('#ddlProvideBankDetail').val() == 'Y') {
                    $('#tblAccountDetails').show();
                }
                else {
                    $('#tblAccountDetails').hide();
                }

                $('#tblPanel3').hide();
                $('#tblPanel4A').hide();
                $('#tblPanel4').hide();
                $('#tblPanel5').hide();
                $('#tblPanel6').hide();
                $('#tblPanel7').hide();
                $('#tblPanel8').hide();
                $('#tblPanel9').hide();
                $('#tblPanel10').hide();
                $('#tblSetODLimit').hide();
            }
            else if (primeGroupName == 'Sundry Creditors')
            {
                SundryCreditorsConfiguration();
            }
            else if (primeGroupName == 'Sundry Debtors')
            {
                SundryCreditorsConfiguration(); //It will be  same as “Sundry Creditors".
            }
            else    
            {
                Reset();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function Panel3IfTDSDeductable()
{
    if ($('#ddlP3IsTDSDeductable').val() == 'Y') {
        $('#trTreatAsTDSExpenses').show();
    }
    else {
        $('#trTreatAsTDSExpenses').hide();
    }

    if ($('#ddlP3TreatAsTDSExpenses').val() == 'N') {
        $('#trDeducteeType').show();
        $('#trDeductTDSInSameVoucher').show();
        $('#trNatureOfPayment').hide();
    }
    else if ($('#ddlP3TreatAsTDSExpenses').val() == 'Y') {
        $('#trNatureOfPayment').show();
        $('#trDeductTDSInSameVoucher').hide();
        $('#trDeducteeType').hide();
    }
    else {
        $('#trDeducteeType').hide();
        $('#trDeductTDSInSameVoucher').hide();
        $('#trNatureOfPayment').hide();
    }
}

function InvestmentsConfiguration()
{
    //$('#tblAccountDetails').show();
    $('#ddlProvideBankDetail').val("Y");
    $('#tblProvideBankDetail').show();

    if ($('#ddlProvideBankDetail').val() == 'Y') {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }
    
    $('#tblPanel4').show();
    $('#tblPanel4A').show();
    // When Set/ Alter GST Details is Yes in panel 4A
    LoadPanel4AConfiguration();
    $('#tblPanel3').show();

    //When TDS is deductible
    Panel3IfTDSDeductable();

    $('#trAssesableVCFor').hide();
   
    $('#trAppropriateTo').hide();
    $('#trMethodOfCalculation').hide();
    
   
    $('#tblPanel6').hide();
    $('#tblPanel7').hide();
    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblPanel10').hide();
    $('#tblSetODLimit').hide();
}

function ProvisionsConfiguration()
{
    //$('#tblAccountDetails').show();
    $('#ddlProvideBankDetail').val("Y");
    $('#tblProvideBankDetail').show();

    if ($('#ddlProvideBankDetail').val() == 'Y') {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }

    $('#tblPanel3').show();

    //When TDS is deductible
    Panel3IfTDSDeductable();

    $('#trAssesableVCFor').show();

    // when Assessable Value Calculation for GST
    IncludeInAssessableValueCalculatioForGST();
        
    $('#tblPanel4').hide();
    $('#tblPanel4A').hide();
    $('#tblPanel5').hide();
    $('#tblPanel6').hide();
    $('#tblPanel7').hide();
    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblPanel10').hide();
    $('#tblSetODLimit').hide();
}

function IncludeInAssessableValueCalculatioForGST()
{ 
     // when Assessable Value Calculation for GST
    if ($('#ddlP3AssesableVCFor').val() == 'GST')
    {
        $('#trAppropriateTo').show();
        $('#trMethodOfCalculation').show();
    }
    else
    {
        $('#trAppropriateTo').hide();
        $('#trMethodOfCalculation').hide();
    }
}

function DirectExpensesConfiguration()
{
   // $('#tblAccountDetails').show();
    $('#ddlProvideBankDetail').val("Y");
    $('#tblProvideBankDetail').show();

    if ($('#ddlProvideBankDetail').val() == 'Y') {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }

    $('#tblPanel6').show();
    $('#tblPanel7').show();
    $('#trP7IsGSTApplicable').show();
    $('#trP7IsTDSApplicable').show();
    $('#trP7IncludeInAssessableVCFor').show();

    $('#trP7NatureOfPayment').hide();
    $('#trP7SetAlterGSTDetails').hide();
    $('#trP7TypeOfSupply').hide();

    $('#tblPanel3').hide();
    $('#tblPanel4A').hide();
    $('#tblPanel4').hide();

    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblPanel10').hide();
    $('#tblSetODLimit').hide();
}

function SundryCreditorsConfiguration()
{
   //$('#tblAccountDetails').show();
    $('#ddlProvideBankDetail').val("Y");
    $('#tblProvideBankDetail').show();

    if ($('#ddlProvideBankDetail').val() == 'Y') {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }


    $('#tblPanel3').show();

    //When TDS is deductible
    Panel3IfTDSDeductable();
    
    $('#trAssesableVCFor').hide();
    $('#trAppropriateTo').hide();
    $('#trMethodOfCalculation').hide();

    $('#tblPanel4A').show();

    // When Set/ Alter GST Details is Yes in panel 4A
    LoadPanel4AConfiguration();
    
    $('#tblPanel4').show();
    
    $('#tblPanel6').hide();
    $('#tblPanel7').hide();
    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblSetODLimit').hide();

    $('#tblPanel10').show();

    if ($('#ddlP10MaintainBalancesBillByBill').val() == 'Y')
    {
        $('#trP10DefaultCreditPeriod').show();
        $('#trP10CheckforCreditDays').show();
    }
    else
    {
        $('#trP10DefaultCreditPeriod').hide();
        $('#trP10CheckforCreditDays').hide();
    }
}

function LoadPanel4AConfiguration()
{
    if ($('#ddlP4SetAlterGSTDetails').val() == 'Y') {
        $('#tblPanel5').show();
    }
    else {
        $('#tblPanel5').hide();
    }
}

function BankOCCAccountConfiguration()
{
    $('#tblSetODLimit').show();
   // $('#tblAccountDetails').show();
    $('#ddlProvideBankDetail').val("Y");
    $('#tblProvideBankDetail').show();

    if ($('#ddlProvideBankDetail').val() == 'Y') {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }

    $('#tblPanel4A').show();
    // When Set/ Alter GST Details is Yes in panel 4A
    LoadPanel4AConfiguration();
    $('#tblPanel4').show();

    $('#tblPanel3').hide();
   
    $('#tblPanel6').hide();
    $('#tblPanel7').hide();
    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblPanel10').hide();
}

function SuspenseAccountConfiguration()
{
    //$('#tblAccountDetails').show();
    $('#ddlProvideBankDetail').val("Y");
    $('#tblProvideBankDetail').show();

    if ($('#ddlProvideBankDetail').val() == 'Y') {
        $('#tblAccountDetails').show();
    }
    else {
        $('#tblAccountDetails').hide();
    }

    $('#tblPanel4A').show();
    // When Set/ Alter GST Details is Yes in panel 4A
    LoadPanel4AConfiguration();
    $('#tblPanel4').show();

    $('#tblPanel3').show();
    //When TDS is deductible
    Panel3IfTDSDeductable();

    $('#trAssesableVCFor').hide();
    $('#trAppropriateTo').hide();
    $('#trMethodOfCalculation').hide();

    $('#tblPanel6').hide();
    $('#tblPanel7').hide();
    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblPanel10').hide();
    $('#tblSetODLimit').hide();
}

function Reset()
{
    $('#tblAccountDetails').hide();
    $('#tblProvideBankDetail').hide();
    $('#tblPanel3').hide();
    $('#tblPanel4').hide();
    $('#tblPanel4A').hide();
    $('#tblPanel5').hide();
    $('#tblPanel6').hide();
    $('#tblPanel7').hide();
    $('#tblPanel8').hide();
    $('#tblPanel9').hide();
    $('#tblPanel10').hide();
    $('#ddlAccountGroup').val('-1');
    $('#tblSetODLimit').hide();
}

function ClearPanel2()
{
    //Panel2
    $('#txtAccountHolderName, #txtBankAcNum, #txtIfcsCode, #txtSwiftCode, #txtBankName, #txtBankBranchName, #txtBSRCode').val('');
    $('#ddlSetAlterRangeChequeBook, #ddlSetAlterChequePrintingConfig, #ddlTransactionType').val('');

}
function ClearControlHistory()
{    
    $('#ddlProvideBankDetail').val("");
    $('#txtSetODLimit').val('');
    //Panel 3
    $('#ddlP3IsTDSDeductable,#ddlP3TreatAsTDSExpenses,#ddlP3DeductTDSInSameVoucher,#ddlP3NatureOfPayment,#ddlP3AssesableVCFor, #ddlP3AppropriateTo, #ddlP3MethodOfCalculation').val('');
    $('#ddlP3DeducteeType').val('-1');

    //Panel 4A

    $('#txtPANITNumber, #txtP4GSTINUIN, #ddlP4RegistrationType, #ddlP4SetAlterGSTDetails').val('');

    //Panel 4
        
    $('#ddlP4Country, #ddlP4State').val('- 1');
    $('#txtP4Name, #txtP4PinCode, #txtP4Address').val('');
     
    //Panel 5
    $('#ddlP5RegistrationType, #ddl5IsAssesseeOfOtherTeritory, #ddl5IsEcommerceOperator, #txtP5GSTINUIN, #ddl5IsATransporter').val('');

    //Panel 6
    $('#ddlP6TypeOfLedger, #ddlP6RoundingMethod, #txtP6RoundingLimit').val('');

    //Panel 7
    $('#ddlP7IsGSTApplicable, #ddlP7SetAlterGSTDetails, #ddlP7TypeOfSupply, #ddlP7IsTDSApplicable, #ddlP7NatureOfPayment, #ddlP7IncludeInAssessableVCFor').val('');

    //Panel 8
    $('#ddlP8Classification, #txtP8Taxibility, #txtP8IntegratedTax, #txtP8Cess').val('');

    $('#ddlP8NatureOfTransaction').val('-1'); 

     //Panel 9
    $('#ddlP9TypeOfDutyTax, #ddlP9TaxType, #ddlP9ValuationType, #txtP9PercentageOfCalculation, #ddlP9RoundingMethod, #ddlP9IsTDSApplicable, #ddlP9NatureOfPayment').val('');

     //Panel 10
    $('#ddlP10MaintainBalancesBillByBill, #txtP10DefaultCreditPeriodDay, #ddlP10CheckforCreditDayDuringVoucher').val('');

}



function ViewFaLedgerMasterList() {
    $('#example-select-all').prop('checked', false);
    $('#divFaLedgerMasterList').show();
    $('#divFaLedgerMasterEntry').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindFaLedgerMasterDetails();
}

function ResetPanel3()
{
    $('#ddlP3IsTDSDeductable,#ddlP3TreatAsTDSExpenses,#ddlP3DeductTDSInSameVoucher,#ddlP3NatureOfPayment,#ddlP3AssesableVCFor, #ddlP3AppropriateTo, #ddlP3MethodOfCalculation').val('');
    $('#ddlP3DeducteeType').val('-1');
    $('#trNatureOfPayment').hide();
    $('#trTreatAsTDSExpenses').hide();
    $('#trDeductTDSInSameVoucher').hide();
    $('#trDeducteeType').hide(); 

    $('#trAssesableVCFor').hide();
    $('#trAppropriateTo').hide();
    $('#trMethodOfCalculation').hide();
}


function ClearAll() {
  
    $('#txtLedgerName,#txtIfcsCode,#txtBankName,#txtBankBranchName,#txtBankAcNum').val('');
    $('#ddlAccountGroup').val('-1');
    $('#chkActive').prop('checked', true);
    $('#txtOpeningBalance').val('0');
}

function CreateFaLedgerMaster() {
    $('#divFaLedgerMasterList').hide();
    $('#divFaLedgerMasterEntry').show();
    
    //$('#txtLedgerName,#txtIfcsCode,#txtBankName,#txtBankBranchName,#txtBankAcNum,#txtOpeningBalance').removeAttr("readonly");
    $('#txtLedgerName,#txtOpeningBalance').removeAttr("readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnExport').hide();
    ClearAll();
    $('#ddlAccountGroup').attr("disabled", false);
  
    ClearControlHistory();
    Reset();
}

function AddDetails()
{
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtLedgerName').val() == '') {
        alertify.error("Please Enter Ledger Name");
        isValid = false;
    }
    else if ($('#ddlAccountGroup').val() == '-1') {
        alertify.error("Please Enter Group Name"); 
        isValid = false;
    }
    if ($('#txtOpeningBalance').val() == '') {
        alertify.error("Please Enter Opening Balance");
        isValid = false;
    }
    //else if ($('#tblAccountDetails').is(':visible'))
    //{
    //    if ($('#txtIfcsCode').val() == '') {
    //        alertify.error("Please Enter Ifcs Code");
    //        isValid = false;
    //    }
    //    else if ($('#txtBankName').val() == '') {
    //        alertify.error("Please Enter Bank Name");
    //        isValid = false;
    //    }
    //    else if ($('#txtBankBranchName').val() == '') {
    //        alertify.error("Please Enter Branch Name");
    //        isValid = false;
    //    }
    //    else if ($('#txtBankAcNum').val() == '') {
    //        alertify.error("Please Enter Bank Account Number");
    //        isValid = false;
    //    }
    //} 
        
    if (isValid)
    {
        if (isUpdate == 0) {
            $.ajax(
                {
                    type: "POST",
                    url: 'wfFaLedgerMaster.aspx/CheckLedgerAvailability',
                    data: JSON.stringify({
                        'ledgerName': $('#txtLedgerName').val(),
                        "isUpdate": isUpdate
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        var data = JSON.parse(response.d);

                        if (data == 'False') {
                            $.ajax({
                                type: "POST",
                                url: 'wfFaLedgerMaster.aspx/AddDetails',
                                data: JSON.stringify({
                                    "groupMasterId": $('#ddlAccountGroup').val(),
                                    "ledgerName": $('#txtLedgerName').val().trim(),
                                    "ifcsCode": $('#txtIfcsCode').val().trim(),
                                    "bankName": $('#txtBankName').val().trim(),
                                    "bankBranchName": $('#txtBankBranchName').val().trim(),
                                    "bankAcNo": $('#txtBankAcNum').val().trim(),
                                    "opBalance": $('#txtOpeningBalance').val().trim(),
                                    "clBalance": $('#txtOpeningBalance').val().trim(),
                                    "active": $('#chkActive').prop('checked') === true ? "Y" : "N",
                                    "ProvideBankDetail": $('#ddlProvideBankDetail').val(),
                                    "AcHolderName": $('#txtAccountHolderName').val().trim(),
                                    "SwiftCode": $('#txtSwiftCode').val().trim(),
                                    "BsrCode": $('#txtBSRCode').val().trim(),
                                    "SetAlterRangeChequeBook": $('#ddlSetAlterRangeChequeBook').val(),
                                    "EnableChequePrinting": "",
                                    "SetAlterChequePrintingConfiguration": $('#ddlSetAlterChequePrintingConfig').val(),
                                    "TransactionType": $('#ddlTransactionType').val(),
                                    "Panel4_Name": $('#txtP4Name').val().trim(),
                                    "Panel4_Address": $('#txtP4Address').val().trim(),
                                    "Panel4_Country": $('#ddlP4Country').val(),
                                    "Panel4_State": $('#ddlP4State').val(),
                                    "Panel4_Pincode": $('#txtP4PinCode').val().trim(),
                                    "Panel4A_PanItNo": $('#txtPANITNumber').val().trim(),
                                    "Panel4A_RegistrationType": $('#ddlP4RegistrationType').val(),
                                    "Panel4A_GSTIN_UIN": $('#txtP4GSTINUIN').val().trim(),
                                    "Panel4A_SetAlterGstDetail": $('#ddlP4SetAlterGSTDetails').val(),
                                    "Panel5_AssesseeOtherTeritory": $('#ddl5IsAssesseeOfOtherTeritory').val(),
                                    "Panel5_Is_e_CommerceOperator": $('#ddl5IsEcommerceOperator').val(),
                                    "Panel5_IsA_Transporter": $('#ddl5IsATransporter').val(),
                                    "Panel3_IsTdsDeductable": $('#ddlP3IsTDSDeductable').val(),
                                    "Panel3_Treat_TDS_Expenses": $('#ddlP3TreatAsTDSExpenses').val(),
                                    "Panel3_DeducteeType": $('#ddlP3DeducteeType').val(),
                                    "Panel3_DeductTdsSameVoucher": $('#ddlP3DeductTDSInSameVoucher').val(),
                                    "Panel3_NaturePayment": $('#ddlP3NatureOfPayment').val(),
                                    "Panel3_IncludeAssessableValueCalculate": $('#ddlP3AssesableVCFor').val(),
                                    "Panel3_AppropriateTo": $('#ddlP3AppropriateTo').val(),
                                    "Panel3_MethodCalculation": $('#ddlP3MethodOfCalculation').val(),
                                    "Panel6_TypeLedger": $('#ddlP6TypeOfLedger').val(),
                                    "Panel6_RoundingMethod": $('#ddlP6RoundingMethod').val(),
                                    "Panel6_RoundingLimit": $('#txtP6RoundingLimit').val().trim(),
                                    "Panel7_IsGstApplicable": $('#ddlP7IsGSTApplicable').val(),
                                    "Panel7_SetAlterGstDetail": $('#ddlP7SetAlterGSTDetails').val(),
                                    "Panel7_TypeSupply": $('#ddlP7TypeOfSupply').val(),
                                    "Panel7_IsTdsApplicable": $('#ddlP7IsTDSApplicable').val(),
                                    "Panel7_BaturePayment": $('#ddlP7NatureOfPayment').val(),
                                    "Panel7_IncludeAssessableValue": $('#ddlP7IncludeInAssessableVCFor').val(),
                                    "Panel8_Classification": $('#ddlP8Classification').val(),
                                    "Panel8_NatureTransaction": $('#ddlP8NatureOfTransaction').val(),
                                    "Panel8_Taxability": $('#txtP8Taxibility').val().trim(),
                                    "Panel8_IntegratedTax": $('#txtP8IntegratedTax').val().trim(),
                                    "Panel8_Cess": $('#txtP8Cess').val().trim(),
                                    "Panel9_TypeDutyTax": $('#ddlP9TypeOfDutyTax').val(),
                                    "Panel9_TaxType": $('#ddlP9TaxType').val(),
                                    "Panel9_ValuationType": $('#ddlP9ValuationType').val(),
                                    "Panel9_PercentageCalculation": $('#txtP9PercentageOfCalculation').val().trim(),
                                    "Panel9_RoundingMethod": $('#ddlP9RoundingMethod').val(),
                                    "Panel9_IsTdsApplicable": $('#ddlP9IsTDSApplicable').val(),
                                    "Panel9_NaturePayment": $('#ddlP9NatureOfPayment').val(),
                                    "Panel10_MaintainBalanceBillBill": $('#ddlP10MaintainBalancesBillByBill').val(),
                                    "Panel10_DefaultCreditPeriod": $('#txtP10DefaultCreditPeriodDay').val(),
                                    "Panel10_CheckCreditDayDuringVoucher": $('#ddlP10CheckforCreditDayDuringVoucher').val(),
                                    "SetOdLimit": $('#txtSetODLimit').val().trim(),
                                    "loginUser": $('#ContentPlaceHolder1_loginuser').val() 
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function () {

                                },
                                success: function (response) {
                                   
                                   alertify.success("Ledger added successfully");
                                    ClearAll();
                                    ClearControlHistory();
                                    $('#tblAccountDetails').hide();
                                   
                                    $('#tblPanel3').hide();
                                    $('#tblPanel4').hide();
                                    $('#tblPanel4A').hide();
                                    $('#tblPanel5').hide();
                                    $('#tblPanel6').hide();
                                    $('#tblPanel7').hide();
                                    $('#tblPanel8').hide();
                                    $('#tblPanel9').hide(); 
                                    $('#tblPanel10').hide(); 
                                    $('#tblProvideBankDetail').hide();
                                    $('#tblSetODLimit').hide();

                                },
                                complete: function () {

                                },
                                failure: function (jqXHR, textStatus, errorThrown) {

                                }
                            });
                        }
                        else {
                            alertify.error("Current Ledger Details already available");
                        }
                    },
                    complete: function () {

                    },
                    failure: function (jqXHR, textStatus, errorThrown) {

                    }
                });
        }
        else if (isUpdate == 1)
        {
            $.ajax({
                type: "POST",
                url: 'wfFaLedgerMaster.aspx/UpdateLedgerDetails',
                data: JSON.stringify({
                    "ledgerId": $('#txtLedgerId').val().trim(),
                    "groupMasterId": $('#ddlAccountGroup').val().trim(),
                    "ledgerName": $('#txtLedgerName').val().trim(),
                    "ifcsCode": $('#txtIfcsCode').val().trim(),
                    "bankName": $('#txtBankName').val().trim(),
                    "bankBranchName": $('#txtBankBranchName').val().trim(),
                    "bankAcNo": $('#txtBankAcNum').val().trim(),
                    "opBalance": $('#txtOpeningBalance').val().trim(),
                    "clBalance": $('#txtOpeningBalance').val().trim(),
                    "active": $('#chkActive').prop('checked') === true ? "Y" : "N",
                    "ProvideBankDetail": $('#ddlProvideBankDetail').val(),
                    "AcHolderName": $('#txtAccountHolderName').val().trim(),
                    "SwiftCode": $('#txtSwiftCode').val().trim(),
                    "BsrCode": $('#txtBSRCode').val().trim(),
                    "SetAlterRangeChequeBook": $('#ddlSetAlterRangeChequeBook').val(),
                    "EnableChequePrinting": "",
                    "SetAlterChequePrintingConfiguration": $('#ddlSetAlterChequePrintingConfig').val(),
                    "TransactionType": $('#ddlTransactionType').val(),
                    "Panel4_Name": $('#txtP4Name').val().trim(),
                    "Panel4_Address": $('#txtP4Address').val().trim(),
                    "Panel4_Country": $('#ddlP4Country').val(),
                    "Panel4_State": $('#ddlP4State').val(),
                    "Panel4_Pincode": $('#txtP4PinCode').val().trim(),
                    "Panel4A_PanItNo": $('#txtPANITNumber').val().trim(),
                    "Panel4A_RegistrationType": $('#ddlP4RegistrationType').val(),
                    "Panel4A_GSTIN_UIN": $('#txtP4GSTINUIN').val().trim(),
                    "Panel4A_SetAlterGstDetail": $('#ddlP4SetAlterGSTDetails').val(),
                    "Panel5_AssesseeOtherTeritory": $('#ddl5IsAssesseeOfOtherTeritory').val(),
                    "Panel5_Is_e_CommerceOperator": $('#ddl5IsEcommerceOperator').val(),
                    "Panel5_IsA_Transporter": $('#ddl5IsATransporter').val(),
                    "Panel3_IsTdsDeductable": $('#ddlP3IsTDSDeductable').val(),
                    "Panel3_Treat_TDS_Expenses": $('#ddlP3TreatAsTDSExpenses').val(),
                    "Panel3_DeducteeType": $('#ddlP3DeducteeType').val(),
                    "Panel3_DeductTdsSameVoucher": $('#ddlP3DeductTDSInSameVoucher').val(),
                    "Panel3_NaturePayment": $('#ddlP3NatureOfPayment').val(),
                    "Panel3_IncludeAssessableValueCalculate": $('#ddlP3AssesableVCFor').val(),
                    "Panel3_AppropriateTo": $('#ddlP3AppropriateTo').val(),
                    "Panel3_MethodCalculation": $('#ddlP3MethodOfCalculation').val(),
                    "Panel6_TypeLedger": $('#ddlP6TypeOfLedger').val(),
                    "Panel6_RoundingMethod": $('#ddlP6RoundingMethod').val(),
                    "Panel6_RoundingLimit": $('#txtP6RoundingLimit').val().trim(),
                    "Panel7_IsGstApplicable": $('#ddlP7IsGSTApplicable').val(),
                    "Panel7_SetAlterGstDetail": $('#ddlP7SetAlterGSTDetails').val(),
                    "Panel7_TypeSupply": $('#ddlP7TypeOfSupply').val(),
                    "Panel7_IsTdsApplicable": $('#ddlP7IsTDSApplicable').val(),
                    "Panel7_BaturePayment": $('#ddlP7NatureOfPayment').val(),
                    "Panel7_IncludeAssessableValue": $('#ddlP7IncludeInAssessableVCFor').val(),
                    "Panel8_Classification": $('#ddlP8Classification').val(),
                    "Panel8_NatureTransaction": $('#ddlP8NatureOfTransaction').val(),
                    "Panel8_Taxability": $('#txtP8Taxibility').val().trim(),
                    "Panel8_IntegratedTax": $('#txtP8IntegratedTax').val().trim(),
                    "Panel8_Cess": $('#txtP8Cess').val().trim(),
                    "Panel9_TypeDutyTax": $('#ddlP9TypeOfDutyTax').val(),
                    "Panel9_TaxType": $('#ddlP9TaxType').val(),
                    "Panel9_ValuationType": $('#ddlP9ValuationType').val(),
                    "Panel9_PercentageCalculation": $('#txtP9PercentageOfCalculation').val().trim(),
                    "Panel9_RoundingMethod": $('#ddlP9RoundingMethod').val(),
                    "Panel9_IsTdsApplicable": $('#ddlP9IsTDSApplicable').val(),
                    "Panel9_NaturePayment": $('#ddlP9NatureOfPayment').val(),
                    "Panel10_MaintainBalanceBillBill": $('#ddlP10MaintainBalancesBillByBill').val(),
                    "Panel10_DefaultCreditPeriod": $('#txtP10DefaultCreditPeriodDay').val(),
                    "Panel10_CheckCreditDayDuringVoucher": $('#ddlP10CheckforCreditDayDuringVoucher').val(),
                    "SetOdLimit": $('#txtSetODLimit').val().trim(),

                    "loginUser": $('#ContentPlaceHolder1_loginuser').val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    if ($('#btnSave').html() == 'Update') {
                       alertify.success("Ledger updated successfully");
                    }
                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function ExportToExcel()
{
    $('#tblExportToExcelLedgerMaster').DataTable().clear();
    $('#tblExportToExcelLedgerMaster').DataTable().destroy();
    $('#tbody_ExportToExcelLedgerMaster').html('');
    var html = '';
    //Loop through all checked CheckBoxes in table.

    var rows = $('[id*=tblFaLedgerMasterList] tr:not(:has(th))');
    for (j = 0; j < rows.length; j++) {
        if ($(rows[j]).find('input').is(':checked'))
        {
            var $tds = $(rows[j]).find('td'),
    
            ledgerId = $tds.eq(1).text(),
            ledgerName = $tds.eq(2).text(),
            groupName = $tds.eq(3).text(),
            opBalance = $tds.eq(4).text(),
            clBalance = $tds.eq(5).text(),
            financialYear = $tds.eq(6).text(),
            userId = $tds.eq(7).text(),
            isActive = $tds.eq(8).text();
           
            html = html + '<tr>'
                + '<td >' + ledgerId + '</td > '
                + '<td >' + ledgerName + '</td > '
                + '<td >' + groupName + '</td > '
                + '<td >' + opBalance + '</td > '
                + '<td >' + clBalance + '</td > '
                + '<td >' + financialYear + '</td > '
                + '<td >' + userId + '</td > '
                + '<td >' + isActive + '</td > '
                + '</tr > ';
                
        }
    }
        
     //alert(html);

    $('#tbody_ExportToExcelLedgerMaster').html(html);
    var d = new Date();
    $('#tblExportToExcelLedgerMaster').DataTable();

    $("#tblExportToExcelLedgerMaster").tableHTMLExport({
        type: 'csv',
        filename: "Ledger Details_" + d.toDateString(),
    });
}
