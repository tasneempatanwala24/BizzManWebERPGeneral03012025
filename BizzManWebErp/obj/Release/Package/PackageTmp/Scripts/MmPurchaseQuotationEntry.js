var ddlMaterialMaster = "";
var materialMasterQty = {};
var materialMaster = {}; var totalVal = 0;
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    //$("#ddlMaterialMaster").select2({
    //    placeholder: "-Select Material Master-",
    //    allowClear: true,
    //    width: "100%"
    //});
    BindPriceQuotationDetails();
    BindRequistionNoteDetails();
    BindVendorDetails(); 
    $("#txtCreatedBy").val($("#ContentPlaceHolder1_loginuser").val())
    $("#txtCreatedBy").attr("readonly", "readonly");
    $('#tblDetails').on('click', '.btnDeleteRow', function () {
        if ($('#tblDetails tr').length == 2) {
            //alertify.error("Atleast 1 row should present");
            return
        }
        $(this).closest('tr').remove()
    })
    $("#tblDetails").on('input keypress', 'input.txtfld', function (e) {
        if (e.type == 'keypress' && e.which == 13) {
            e.preventDefault();
            return false;
        }
        
        var totalVal = 0;
        totalVal = parseFloat($(this).closest('tr').find("td:eq(1) input[type='number']").val()) * parseFloat($(this).closest('tr').find("td:eq(2) input[type='number']").val());
        $(this).closest('tr').find("td:eq(3) input[type='number']").val(totalVal.toFixed(2));
    });

    $("#tblDetails").on('input keypress', 'input.txtTotalAmt', function (e) {
        if (e.type == 'keypress' && e.which == 13) {
            e.preventDefault();
            return false;
        }
    }); 

    $('#tblDetails').on('keypress', 'input.txtDescription', function (e) {
        
        var key = e.which;
        if (key == 13)  // the enter key code
        {
           e.preventDefault();
            AddNewRow();
            RefreshMaterialQuotationBalanceData();
        }
    });

    var ddlBranch = "";
    var ddlDept = "";
    if (ddlBranch == "") {
        BindBranchDetails();
    }
    if (ddlDept == "") {
        BindDeptDetails();
    }
    $('#txtQuantity').keypress(function (event) {
        var value = $(this).val();
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
        if (value.indexOf('.') != -1) {
            var decimalPosition = value.indexOf('.');
            if (value.substring(decimalPosition + 1).length >= 1) {
                $(this).val(value.substring(0, decimalPosition + 2));
            }
            
            
        }
    });
    $('#txtItemPrice').keypress(function (event) {
        var value = $(this).val();
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
        if (value.indexOf('.') != -1) {
            var decimalPosition = value.indexOf('.');
            if (value.substring(decimalPosition + 1).length >= 1) {
                $(this).val(value.substring(0, decimalPosition + 2));
            }
            
        }
    });
    $(function () {
        $('input:text:first').focus();

        $(document).on('keydown', '.cls', function (e) {
            var key = e.which;
            if (key == 13) {
                e.preventDefault();
                var $inp = $('.cls'); // Move inside the event handler to get dynamically added elements
                var nxtIdx = $inp.index(this) + 1;
                $(".cls:eq(" + nxtIdx + ")").focus();
                if (nxtIdx == $inp.length - 1) {
                    AddNewRow();
                    //$('#ddlMaterialMaster').focus();
                    RefreshMaterialQuotationBalanceData();
                }
            }
        });
    });

    
});
var loanAppId = "";
function ViewFile() {
    if (loanAppId) {
        window.open("wfMmPurchaseQuotationEntry_display.aspx?id=" + loanAppId);
    }
}
function ViewPriceQuotationList() {
    $('#divQuotationDetails').show();
    $('#divQuotationEntry').hide();
    $('#btnSave').hide();
    $('#btnViewFile').hide();
    BindPriceQuotationDetails();
}

function BindPriceQuotationDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/FetchQuotationMasterDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblQuotationDetails').DataTable().clear();
            $('#tblQuotationDetails').DataTable().destroy();
            $('#tbody_PriceQuotation_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchQuotationDetailsForId(\'' + data[i].QuotationId+'\')">'
                    + '<td> ' + data[i].QuotationId + '</td > '
                    + '<td> ' + data[i].QuotationEntryDate + '</td > '
                    + '<td> ' + data[i].QuotationDate + '</td > '
                    + '<td> ' + data[i].QuotationValidDate + '</td > '
                    + '<td> ' + data[i].RequisitionNote + '</td > '
                    + '<td> ' + data[i].VendorName + '</td > '
                    + '<td> ' + data[i].BranchName + '</td > '
                    + '<td> ' + data[i].DeptName + '</td > '
            }
            $('#tbody_PriceQuotation_List').html(html);
            $('#tblQuotationDetails').DataTable();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function CreateQuotationEntry() {
    $('#divQuotationDetails').hide();
    $('#divQuotationEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#trRequisitionNote').hide();
    $('#btnViewFile').hide();
    $('#trTxtId').hide(); 
    $('#txtQuotationEntryDate').removeAttr("readonly");
    $('#ddlRequistionNotes, #ddlBranch, #ddlDept').prop('disabled', false);
    $(".ddlMaterialMaster option:not(:first)").remove();
    ClearAll();
}

function BindRequistionNoteDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/GetRequsitionNotes',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].RequisitionId + "' Note='" + JSON.parse(response.d)[i].RequisitionNote + " 'BranchCode='" + JSON.parse(response.d)[i].BranchCode + "'VendorId='" + JSON.parse(response.d)[i].VendorId + "'DeptId='" + JSON.parse(response.d)[i].DeptId + "'>" + JSON.parse(response.d)[i].RequisitionId + "</option>";
            }
            $('#ddlRequistionNotes').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindVendorDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/GetVendorDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].Id +"'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlVendor').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindMaterialMasterDetails(isUpdate)
{
    ddlMaterialMaster = "";
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/GetMaterialMasterDetails',
        data: JSON.stringify({ "RequistionId": $('#ddlRequistionNotes').val(), "IsUpdate": isUpdate }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                //materialMasterQty[data[i].Id] = data[i].QuotationBalanceQty
                //materialMaster[data[i].Id] = data[i].Name
                ddlMaterialMaster = ddlMaterialMaster + "<option value='" + data[i].Id + "'>" + data[i].Name + "</option>";
            }

            $(".ddlMaterialMaster").append(ddlMaterialMaster);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function RefreshMaterialQuotationBalanceData() {
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/GetMaterialMasterDetails',
        data: JSON.stringify({ "RequistionId": $('#ddlRequistionNotes').val(), "IsUpdate": false }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                materialMasterQty[data[i].Id] = data[i].QuotationBalanceQty
                materialMaster[data[i].Id] = data[i].Name
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

 
function FetchRequsitionNotes() {
    var selectedReqNote = $('#ddlRequistionNotes').find('option:selected');
    var optDeptId = selectedReqNote.attr('DeptId');
    var optBranchCode = selectedReqNote.attr('BranchCode');
    var txtRequsitionNotes = selectedReqNote.attr('Note');
    if (typeof txtRequsitionNotes != undefined && txtRequsitionNotes != null) {
        $('#txtRequisitionNote').show();
        $('#txtRequisitionNote').val(txtRequsitionNotes);
        $('#trRequisitionNote').show();
        $('#txtRequisitionNote').attr("readonly", "readonly");
    }
    if (typeof optBranchCode != undefined && optBranchCode != null) {
        $('#ddlBranch').val(optBranchCode);
        $('#ddlBranch').prop("disabled", true);
    }
    if (typeof optDeptId != undefined && optDeptId != null) {
        $('#ddlDept').val(optDeptId);
        $('#ddlDept').prop("disabled", true);
    }
    $('.btnDeleteRow').trigger('click');
    //$(".ddlMaterialMaster option:not(:first)").remove();
    
    BindMaterialMasterDetails(false);

    //=========by mk ===on 27/04/2024=========

   // BindRequistionNoteDetails();



    //=======================


}

function AddNewRow() {
    //BindMaterialMasterDetails(false);
    var $lastRow = $("[id=tblDetails] tr:last"); //grab row before the last row
    var $newRow = $lastRow.clone(); //clone it
    $newRow.find(".quotation").val(""); //clear out textbox values    
    $lastRow.after($newRow); //add in the new row at the end
    //BindMaterialMasterDetails(false);
}


function FetchQuotationDetailsForId(quotationId) {
    
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/FetchQuotationDetailsForId',
        data: JSON.stringify({"quoationId": quotationId}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var quotationMaster = JSON.parse(response.d[0]);
            ClearAll();
            $('#divQuotationDetails').hide();
            $('#divQuotationEntry').show();
            $("#btnSave").html('Update');
            $('#trTxtId').show();
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();
            $('#trRequisitionNote').show();
            $('#btnViewFile').show();
            $('#txtId').val(quotationMaster[0].QuotationId);
            loanAppId = quotationMaster[0].QuotationId;
            var dtQuotationEntryDate = new Date(quotationMaster[0].QuotationEntryDate);
            dtQuotationEntryDate = new Date(dtQuotationEntryDate.getTime() + Math.abs(dtQuotationEntryDate.getTimezoneOffset() * 60000))
            document.getElementById("txtQuotationEntryDate").valueAsDate = dtQuotationEntryDate;
            $('#txtQuotationEntryDate').attr("readonly", "readonly");

            var dtQuotationDate = new Date(quotationMaster[0].QuotationDate);
            dtQuotationDate = new Date(dtQuotationDate.getTime() + Math.abs(dtQuotationDate.getTimezoneOffset() * 60000))
            document.getElementById("txtQuotationDate").valueAsDate = dtQuotationDate;
            //$('#txtQuotationDate').attr("readonly", "readonly");

            var dtQuotationValidDate = new Date(quotationMaster[0].QuotationValidDate);
            dtQuotationValidDate = new Date(dtQuotationValidDate.getTime() + Math.abs(dtQuotationValidDate.getTimezoneOffset() * 60000))
            document.getElementById("txtQuotationValidDate").valueAsDate = dtQuotationValidDate;
            //$('#txtQuotationValidDate').attr("readonly", "readonly");

            $('#txtRequisitionNote').show();
            $('#ddlRequistionNotes').val(quotationMaster[0].RequisitionId);
            $('#ddlRequistionNotes').prop('disabled', true);
            $('#txtRequisitionNote').val(quotationMaster[0].RequisitionNote);
            $('#txtRequisitionNote').attr("readonly", "readonly");
            $('#ddlVendor').val(quotationMaster[0].VendoreId);
            $('#ddlBranch').val(quotationMaster[0].BranchCode);
            $('#ddlDept').val(quotationMaster[0].DepartmentId);
            $('#ddlDept, #ddlBranch').prop("disabled", true);
            $(".ddlMaterialMaster option:not(:first)").remove();
         
            var quotationDetails = JSON.parse(response.d[1]);

            if (quotationDetails && quotationDetails.length > 0) {
                BindMaterialMasterDetails(true);
                for (var i = 1; i < quotationDetails.length; i++) {
                    AddNewRow();
                }
                RefreshMaterialQuotationBalanceData();
                $('#tblDetails').find('.trInputs').each(function (index) {

                    $(this).find("td:eq(0)").find("select").val(quotationDetails[index].MaterialMasterId);
                    $(this).find("td:eq(1) input[type='number']").val(quotationDetails[index].Qty);
                    $(this).find("td:eq(2) input[type='number']").val(quotationDetails[index].UnitPrice);
                    $(this).find("td:eq(3) input[type='number']").val(quotationDetails[index].TotalAmt);
                    $(this).find("td:eq(4) input[type='text']").val(quotationDetails[index].Description); 
                });
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ClearAll() {
    $("#tblDetails").find("tr:gt(1)").remove();
    $('#txtId,#txtQuotationEntryDate,#ddlRequistionNotes,#ddlVendor,.ddlMaterialMaster,.quotation,#ddlDept,#ddlBranch,#txtQuotationValidDate,#txtQuotationDate').val('');
    $('#txtRequisitionNote').hide();
    $('#trRequisitionNote').hide();
    $('#btnViewFile').hide();
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtQuotationEntryDate').val() == '') {
        alertify.error("Please enter Quotation Entry Date");
        isValid = false;
    }
    else if ($('#txtQuotationDate').val() == '') {
        alertify.error("Please enter Quotation Date");
        isValid = false;
    }
    else if ($('#txtQuotationValidDate').val() == '') {
        alertify.error("Please enter Quotation Valid Date");
        isValid = false;
    }
    else if ($('#ddlRequistionNotes').val() == '') {
        alertify.error("Please select Requisition Id");
        isValid = false;
    }
    else if ($('#ddlVendor').val() == '') {
        alertify.error("Please select Vendor");
        isValid = false;
    }
    else if ($('#ddlBranch').val() == '') {
        alertify.error("Please select Branch");
        isValid = false;
    }
    else if ($('#ddlDept').val() == '') {
        alertify.error("Please select Department");
        isValid = false;
    }
    
    if (isValid) {
        $('#tblDetails').find('.trInputs').each(function (index) {
            var rowCount = parseInt(index) + 1;
            if ($(this).find("td:eq(0)").find("select").val() == "") {
                alertify.error("Please Enter Material Master for row " + rowCount);
                isValid = false;
            }
            else if ($(this).find("td:eq(1) input[type='number']").val() == "" || $(this).find("td:eq(1) input[type='number']").val() == "0") {
                alertify.error("Please Enter Quantity for row " + rowCount);
                isValid = false;
            }
            else if ($(this).find("td:eq(2) input[type='number']").val() == "" || $(this).find("td:eq(2) input[type='number']").val() == "0") {
                alertify.error("Please Enter Item Price for row " + rowCount);
                isValid = false;
            }
            else if ($(this).find("td:eq(4) input[type='text']").val().trim() !== "" && $(this).find("td:eq(4) input[type='text']").val().length > 50) {
                alertify.error("Please Enter 50 or less characters description for row " + rowCount);
                isValid = false;
            }
        });
    }
    if (isValid) {
        var materialJson = [];
        if (isUpdate == 0) {
            RefreshMaterialQuotationBalanceData();
            var materialIp = {}
            $('#tblDetails').find('.trInputs').each(function () {
                var quantity = parseFloat($(this).find("td:eq(1) input[type='number']").val());
                var id = parseInt($(this).find("td:eq(0)").find("select").val());
                if (id in materialIp)
                    materialIp[id] = parseInt(materialIp[id] + quantity)
                else
                    materialIp[id] = quantity
            });
            var keys = Object.keys(materialIp); //get keys from object as an array

            keys.forEach(function (key) { //loop through keys array
                if (materialIp[key] > materialMasterQty[key]) {
                    isValid = false;
                    alertify.error("Quotation Balance Quantity for " + materialMaster[key] + " is " + materialMasterQty[key])
                    return;
                }
            });
            var keys = Object.keys(materialIp); //get keys from object as an array
            keys.forEach(function (key) { //loop through keys array
                var obj = {
                    'MaterialMasterId': key,
                    'Quantity': materialIp[key]
                }
                materialJson.push(obj)
            });
        }
        
        if (isValid) {
            var json = [];
            $('#tblDetails').find('.trInputs').each(function () {
                var obj = {
                    'MaterialMasterId': parseInt($(this).find("td:eq(0)").find("select").val()),
                    'Quantity': parseFloat($(this).find("td:eq(1) input[type='number']").val()),
                    'Price': parseFloat($(this).find("td:eq(2) input[type='number']").val()),
                    'TotalAmount': parseFloat($(this).find("td:eq(3) input[type='number']").val()),
                    'Description': $(this).find("td:eq(4) input[type='text']").val(),
                }
                json.push(obj);
            });
            var finalJson = {
                'MaterialMasterDetail': json
            };
            $.ajax({
                type: "POST",
                url: 'wfMmPurchaseQuotationEntry.aspx/AddDetails',
                data: JSON.stringify({
                    "quotationEntryDate": $('#txtQuotationEntryDate').val().trim(),
                    "quotationDate": $('#txtQuotationDate').val().trim(),
                    "quotationValidDate": $('#txtQuotationValidDate').val().trim(),
                    "requistionNote": $('#ddlRequistionNotes').val().trim(),
                    "vendor": $('#ddlVendor').val().trim(),
                    "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                    "quotationId": $('#txtId').val().trim(),
                    "quotation": JSON.stringify(finalJson),
                    "branch": $('#ddlBranch').val().trim(),
                    "dept": $('#ddlDept').val().trim(),
                    "materialMaster": JSON.stringify(materialJson),
                    "isUpdate": isUpdate
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response) {
                    showSuccessMessage();
                    if (isUpdate == 0)
                        ClearAll();
                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function showSuccessMessage() {
    if ($('#btnSave').html() == 'Update') {
        alertify.success("Quotation details updated successfully");
    }
    else {
        alertify.success("Quotation and its details added successfully");
        ClearAll();
    }
}

function BindBranchDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/GetBranchDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
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

function BindDeptDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmPurchaseQuotationEntry.aspx/GetDeptDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
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