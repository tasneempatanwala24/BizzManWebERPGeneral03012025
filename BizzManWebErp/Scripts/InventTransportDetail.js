var ParentId = 0;
var TransportImage = "";
var TransportCategoryTransectionId = "";
var TransectionId = "";
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    ViewDataList();
    BindTransportCategoryDropdown();
    BindDepartmentDropdown();
    BindBranchDropdown();
    BindTransportDropdown();
    //BindFromLocationDropdown();
    //BindToLocationDropdown();
    BindSubmitGstDropdown();
    BindTransportDetailList();
    $("#ddlTransportCategory").on("change", function () {
        TransportCategoryTransectionId = null;
        TransectionId = null;
        if ($("#ddlTransportCategory").val() == 'Purchase') {
            BindMaterialPurchaseGrnMasterDropdown();
            BindMaterialPOEntryMasterDropdown();
        }
        else if ($("#ddlTransportCategory").val() == 'Sales') {
            BindSdSODeliveryMasterListDropdown();
            BindSDSalesOrderDropdown();
        }
        else if ($("#ddlTransportCategory").val() == 'Others') {
            var html = "";
            html = html + "<option value='Others'>Others</option>";
            $('#ddlTransportCategoryTransection').html(html);
            $('#ddlTransection').html(html);
        }
        else {
            
            $('#ddlTransportCategoryTransection').html("<option value=''>-Select Transport Category Transection-</option>");
            $('#ddlTransection').html("<option value=''>-Select Transection-</option>");
            $('#ddlTransportCategoryTransection').select2();
            $('#ddlTransection').select2();
        }
        
    }).trigger("change");
    
    $('#txtEntryDate').datepicker({
        format: "dd-M-yyyy",
        viewMode: "days",
        minViewMode: "days",
        autoclose: true,
        enableOnReadonly: false,
        changeMonth: true,
        changeYear: true
    });
    
    keepDatalistOptions('.keepDatalist');
    if ($("#ddlBranch").val() != '') {
        const fileInput = document.getElementById('fuImg');

        // Add event listener to handle file selection
        fileInput.addEventListener('change', handleFileSelect);

        // Function to handle file selection
        function handleFileSelect(event) {
            const selectedFile = event.target.files[0];

            // Display selected file information (e.g., name, type, size)
            console.log('Selected file:', selectedFile);
        }
    }
    //$('#btnDisplayData').on('click', function () {
    //    // Image data URL
    //    var imageDataUrl = TransportImage;
    //    // Create HTML content with the image
    //    var htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Image Viewer</title></head><body><img src="' + imageDataUrl + '"></body></html>';

    //    // Open the HTML content in a new tab
    //    var newTab = window.open();
    //    newTab.document.open();
    //    newTab.document.write(htmlContent);
    //    newTab.document.close();
    //});
    $('#btnDisplayData').on('click', function () {
        var targetPage = "wfInventTransportDetail_display.aspx"; // Replace with the URL of the target page
        var url = targetPage + "?id=" + encodeURIComponent(ParentId);
        window.open(url, '_blank');
        //window.location.href = url;
    });
    

   
    $('#fuImg').change(function () {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var mime = e.target.result.split(',')[0].split(':')[1].split(';')[0];

            if ($.inArray(mime, ['image/jpeg', 'image/jpg', 'image/png']) == -1) {
                alertify.error('Please select a Jpg/Png file.');
                $('#fuImg').val('');
                $('#fuImg').attr("src", "").toString();// Clear the file input
                return false;
            }
        };

        reader.readAsDataURL(file);
    });
    $('#txtTransportAmt').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $('#txtCentralTaxPercent').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $('#txtStateTaxPercent').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $('#txtCessPercent').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    function calculateTotal() {
        //var transamt = parseFloat($("#txtTransportAmt").val());
        var transamt = ($("#txtTransportAmt").val() !== '') ? parseFloat($("#txtTransportAmt").val()) : 0;
        //var centraltax = parseFloat($("#txtCentralTaxPercent").val());
        var centraltax = ($("#txtCentralTaxPercent").val() !== '') ? parseFloat($("#txtCentralTaxPercent").val()) : 0;
        //var statetax = parseFloat($("#txtStateTaxPercent").val());
        var statetax = ($("#txtStateTaxPercent").val() !== '') ? parseFloat($("#txtStateTaxPercent").val()) : 0;
        //var cess = parseFloat($("#txtCessPercent").val());
        var cess = ($("#txtCessPercent").val() !== '') ? parseFloat($("#txtCessPercent").val()) : 0;
        if (!isNaN(transamt) || !isNaN(centraltax) || !isNaN(statetax) || !isNaN(cess)) {
            var totalAmount = transamt + centraltax + statetax + cess;
            $("#txtNetAmt").val(totalAmount.toFixed(2)); // Display total amount with 2 decimal places
        } else {
            $("#txtNetAmt").val("0");
        }
    }

    $("#txtTransportAmt, #txtCentralTaxPercent,#txtStateTaxPercent,#txtCessPercent").on("input", calculateTotal);
    $('#ddlTransport').select2();
    $('#ddlTransportCategory').select2();
    //$('#ddlTransection').select2();
    //$('#ddlTransportCategoryTransection').select2();
    $('#ddlBranch').select2();
    $('#ddlDepartment').select2();
    //$('#ddlFromLocation').select2();
    //$('#ddlToLocation').select2();
});
function BindTransportCategoryDropdown() {
    $('#ddlTransportCategory').html('');
    var html = "<option value=''>-Select Transport Category-</option>";
    html = html + "<option value='Purchase'>Purchase</option><option value='Sales'>Sales</option><option value='Others'>Others</option>";
    $('#ddlTransportCategory').html(html);
    
}
function BindSubmitGstDropdown() {
    $('#ddlSubmitGst').html('');
    var html = "<option value=''>-Select Submit Gst-</option>";
    html = html + "<option value='y'>Yes</option><option value='n'>No</option>";
    $('#ddlSubmitGst').html(html);
    $('#ddlSubmitGst').val('n');
}
function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Department-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }
            $('#ddlDepartment').append(dbList);
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
        url: 'wfInventTransportDetail.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(dbList);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindTransportDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/TransportMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Transport Name-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].TransportName + "</option>";
            }
            $('#ddlTransport').append(dbList);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindMaterialPOEntryMasterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/MaterialPOEntryMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlTransportCategoryTransection').select2('destroy');
            $('#ddlTransportCategoryTransection').html('');
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Transport Category Transection-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].TransportCategoryTransectionId + "</option>";
            }
            $('#ddlTransportCategoryTransection').append(dbList);
            //$('#ddlTransportCategoryTransection').val(TransportCategoryTransectionId);
            $('#ddlTransportCategoryTransection').select2();
            $("#ddlTransportCategoryTransection").val(TransportCategoryTransectionId).trigger('change');
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindSDSalesOrderDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/SDSalesOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlTransportCategoryTransection').select2('destroy');
            $('#ddlTransportCategoryTransection').html('');
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Transport Category Transection-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].TransportCategoryTransectionId + "</option>";
            }
            $('#ddlTransportCategoryTransection').append(dbList);
            $('#ddlTransportCategoryTransection').select2();
            $("#ddlTransportCategoryTransection").val(TransportCategoryTransectionId).trigger('change');
            //$('#ddlTransportCategoryTransection').val(TransportCategoryTransectionId);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindMaterialPurchaseGrnMasterDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/MaterialPurchaseGrnMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlTransection').select2('destroy');
            $('#ddlTransection').html('');
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Transection-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].TransectionId + "</option>";
            }
            $('#ddlTransection').append(dbList);
            $('#ddlTransection').select2();
            $("#ddlTransection").val(TransectionId).trigger('change');
            //$('#ddlTransection').val(TransectionId);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindSdSODeliveryMasterListDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/SdSODeliveryMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlTransection').select2('destroy');
            $('#ddlTransection').html('');
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select Transection-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].TransectionId + "</option>";
            }
            $('#ddlTransection').append(dbList);
            $('#ddlTransection').select2();
            $("#ddlTransection").val(TransectionId).trigger('change');
            //$('#ddlTransection').val(TransectionId);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindFromLocationDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/LocationMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select From Location-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LocationName + "</option>";
            }
            $('#ddlFromLocation').append(dbList);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindToLocationDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/LocationMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var dbList = "<option value=''>-Select To Location-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                dbList = dbList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LocationName + "</option>";
            }
            $('#ddlToLocation').append(dbList);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function ClearAll() {
    //$('#ddlEmployee').select2('destroy');
    //$('#ddlEmployee').html('<option value="">-Select Employee-</option>');
    //$('#ddlEmployee').select2();
    $('#txtEntryDate').val('');
    $('#txtId').val('');
    $('#ddlTransport').select2('destroy');
    $('#ddlTransport').val('');
    $('#ddlTransport').select2();
    $('#ddlTransportCategory').select2('destroy');
    $('#ddlTransportCategory').val('');
    $('#ddlTransportCategory').select2();
    $('#ddlTransportCategoryTransection').select2('destroy');
    $('#ddlTransportCategoryTransection').html('<option value="">-Select Transport Category Transection-</option>');
    $('#ddlTransportCategoryTransection').select2();
    $('#ddlTransection').select2('destroy');
    $('#ddlTransection').html('<option value="">-Select Transection-</option>');
    $('#ddlTransection').select2();
    $('#ddlFromLocation').val('');
    $('#ddlToLocation').val('');
    $('#ddlBranch').select2('destroy');
    $('#ddlBranch').val('');
    $('#ddlBranch').select2();
    $('#ddlDepartment').select2('destroy');
    $('#ddlDepartment').val('');
    $('#ddlDepartment').select2();
    $('#txtTransportAmt').val('');
    $('#txtCentralTaxPercent').val('');
    $('#txtStateTaxPercent').val('');
    $('#txtCessPercent').val('');
    $('#txtNetAmt').val('');
    $('#ddlSubmitGst').val('');
    $('#txtVehicleNo').val('');
    $('#txtVehicleType').val('');
    $('#txtDescription').val('');
    $('#imgFU,#ContentPlaceHolder1_hfBase64').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
      
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#fuImg').attr("src", "Images/fileupload.png");
    $("#btnSave").html('Save');
    $("#btnSave").show();
    $('#btnUploadFile').show();
    $('#btnDisplayData').show();
    $('#txtId').attr("readonly", "readonly");
    $('#txtEntryDate').attr("disabled", false);    
    $('#txtNetAmt').attr("readonly", "readonly");    
    $('#btnDisplayData').hide();
}
function CreateData() {
    $('#divDataList').hide();
    $('#divDetailDataList').hide();
    $('#divDataEntry').show();

    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnUploadFile').show();
    //$('#btnDisplayData').show();

    $('#txtId').attr("readonly", "readonly");
    $('#txtNetAmt').attr("readonly", "readonly");
    $('#txtEntryDate').removeAttr("readonly");
    ClearAll();

}
function ViewDataList() {
    $('#divDataList').show();
    $('#btnSave').hide();
    $('#divDataEntry').hide();
    $('#btnUploadFile').hide();
    $('#btnDisplayData').hide();
    BindTransportDetailList();
}
function BindTransportDetailList() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/FetchTransportDetailList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblDataList').DataTable().clear();
            $('#tblDataList').DataTable().destroy();
            $('#tbody_Data_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchTransportDetails(\'' + data[i].ID + '\')"><td>' + data[i].ID + '</td>'
                    + '<td>' + data[i].EntryDate + '</td>'
                    + '<td>' + data[i].TransportName + '</td>'
                    + '<td>' + data[i].TransportAmt + '</td>'
                    + '<td>' + data[i].CentralTaxPercent + '</td>'
                    + '<td>' + data[i].StateTaxPercent + '</td>'
                    + '<td>' + data[i].CessPercent + '</td>'
                    + '<td>' + data[i].NetAmt + '</td></tr>';
            }
            $('#tbody_Data_List').html(html);
            $('#tblDataList').DataTable();
            //createKanbanViewTable(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function AddData() {
    var OTD = new Date($('#txtEntryDate').val());
    var OTmonth = OTD.toLocaleString('default', { month: 'short' });
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#txtEntryDate').val() == '') {
        alertify.error("Please select Entry Date");
        isValid = false;
    }
    else if ($('#ddlTransport').val() == '') {
        alertify.error("Please select Transport Name");
        isValid = false;
    }
    else if ($('#ddlTransportCategory').val() == '') {
        alertify.error("Please select Transport Category");
        isValid = false;
    }
    else if ($('#ddlFromLocation').val() == '') {
        alertify.error("Please select From Location");
        isValid = false;
    }
    else if ($('#ddlToLocation').val() == '') {
        alertify.error("Please enter To Location");
        isValid = false;
    }
    
    else if ($('#ddlBranch').val() == '') {
        alertify.error("Please select Branch");
        isValid = false;
    }
    else if ($('#ddlDepartment').val() == '') {
        alertify.error("Please select Department");
        isValid = false;
    }
    else if ($('#txtTransportAmt').val() == '') {
        alertify.error("Please enter Transport Amount");
        isValid = false;
    }

    if (isValid) {
        var imgDataURL = '';
        if ($('#fuImg').attr("src") != "Images/fileupload.png") {
            imgDataURL = $('#fuImg').attr("src").toString();
        }
        $.ajax({
            type: "POST",
            url: 'wfInventTransportDetail.aspx/AddData',
            data: JSON.stringify({
                "EntryDate": $('#txtEntryDate').val().trim(),
                "ID": $('#txtId').val(),
                "TransportMasterId": $('#ddlTransport').val(),
                "TransportCategory": $('#ddlTransportCategory').val(),
                "TransportCategoryTransectionId": $('#ddlTransportCategoryTransection').val(),
                "TransectionId": $('#ddlTransection').val(),
                "FromLocation": $('#ddlFromLocation').val(),
                "ToLocation": $('#ddlToLocation').val(),
                "BranchCode": $('#ddlBranch').val(),
                "DepartmentID": $('#ddlDepartment').val(),
                "TransportAmt": $('#txtTransportAmt').val(),
                "NetAmt": $('#txtNetAmt').val(),
                "CentralTaxPercent": $('#txtCentralTaxPercent').val(),
                "StateTaxPercent": $('#txtStateTaxPercent').val(),
                "CessPercent": $('#txtCessPercent').val(),
                "SubmitGST": $('#ddlSubmitGst').val(),
                "VehicleNo": $('#txtVehicleNo').val(),
                "VehicleType": $('#txtVehicleType').val(),
                "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                "Description": $('#txtDescription').val(),
                "TransportImage": imgDataURL
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var r = JSON.parse(response.d);
                if (r.status == "success") {
                    if ($('#btnSave').html() == 'Update') { alertify.success('Transport Details updated successfully'); }
                    else { alertify.success('Transport Details added successfully'); }
                    ClearAll();
                }
                else {
                    console.log("error log:", r.msg);
                    alertify.error('Something went wrong, please try again later');
                }
            },
            failure: function (response) {
                var r = JSON.parse(response.d);
                alertify.error('failure. Something went wrong, please try again later');

            },
            error: function (response) {
                var r = JSON.parse(response.d);
                alertify.error('Error. Something went wrong, please try again later');

            }
        });
    }
}
function FetchTransportDetails(ID) {

    $.ajax({
        type: "POST",
        url: 'wfInventTransportDetail.aspx/FetchTransportDetails',
        data: JSON.stringify({
            "ID": ID
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },

        success: function (response) {
            $('#divDataList').hide();
            $('#divDataEntry').show();
            var data = JSON.parse(response.d);

            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#btnUploadFile').show();
            $('#btnDisplayData').show();
            $('#txtId').attr("readonly", "readonly");
            $('#txtNetAmt').attr("readonly", "readonly");
            $('#txtEntryDate').attr("readonly", "readonly");
            $("#ddlBranch").val(data[0].BranchCode).trigger('change');
            //$('#ddlBranch').val(data[0].BranchCode);
            $('#txtEntryDate').val(data[0].EntryDate);
            $('#txtId').val(data[0].ID);
            $("#ddlTransport").val(data[0].TransportMasterId).trigger('change');
            //$('#ddlTransport').val(data[0].TransportMasterId);
            $("#ddlTransportCategory").val(data[0].TransportCategory).trigger('change');
            //$('#ddlTransportCategory').val(data[0].TransportCategory);
            
            $('#ddlFromLocation').val(data[0].FromLocation);
            $('#ddlToLocation').val(data[0].ToLocation);
            $("#ddlDepartment").val(data[0].DepartmentID).trigger('change');
            //$('#ddlDepartment').val(data[0].DepartmentID);
            $('#txtTransportAmt').val(data[0].TransportAmt);
            $('#txtNetAmt').val(data[0].NetAmt);
            $('#txtCentralTaxPercent').val(data[0].CentralTaxPercent);
            $('#txtStateTaxPercent').val(data[0].StateTaxPercent);
            $('#txtCessPercent').val(data[0].CessPercent);
            $('#ddlSubmitGst').val(data[0].SubmitGST);
            $('#txtVehicleNo').val(data[0].VehicleNo);
            $('#txtVehicleType').val(data[0].VehicleType);
            $('#txtDescription').val(data[0].Description);    
            $('#hfBase64').val(data[0].TransportImage);
            $("#imgFU").attr('src', data[0].TransportImage);
            $("#fuImg").attr('src', data[0].TransportImage);
            $("#ContentPlaceHolder1_hfId").val(data[0].ID);  
            TransportCategoryTransectionId = data[0].TransportCategoryTransectionId;
            TransectionId = data[0].TransectionId;
            if (data[0].TransportCategory == 'Purchase') {
                BindMaterialPurchaseGrnMasterDropdown();
                BindMaterialPOEntryMasterDropdown();
            }
            else if (data[0].TransportCategory == 'Sales') {
                BindSdSODeliveryMasterListDropdown();
                BindSDSalesOrderDropdown();
            }
            else if (data[0].TransportCategory == 'Others') {
                var html = "";
                html = html + "<option value='Others'>Others</option>";
                $('#ddlTransportCategoryTransection').html(html);
                $('#ddlTransection').html(html);
            }
            else {
                
                $('#ddlTransportCategoryTransection').html("<option value=''>-Select Transport Category Transection-</option>");
                $('#ddlTransection').html("<option value=''>-Select Transection-</option>");
                $('#ddlTransportCategoryTransection').select2();
                $('#ddlTransection').select2();
            }
            
            //$('#ddlTransportCategoryTransection').val(data[0].TransportCategoryTransectionId);
            //$('#ddlTransection').val(data[0].TransectionId);
            TransportImage = data[0].TransportImage;
            ParentId = data[0].ID;
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function readURL(input) {
    console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#fuImg')
                .attr('src', e.target.result);
            $("#ContentPlaceHolder1_hfBase64").val(e.target.result);

        };

        reader.readAsDataURL(input.files[0]);
    }
}
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;

}
function createKanbanViewTable(data) {
    var finalHTML = "";
    var tempHTML = "";
    var tdCount = 0;

    for (let i = 0; i < data.length; i++) {
        tempHTML += createKanbanViewItem(data[i]);
        tdCount++;
        if (tdCount == 5 || i + 1 == data.length) {
            tempHTML = "<tr>" + tempHTML + "</tr>";
            finalHTML += tempHTML;
            tempHTML = "";
            tdCount = 0;
        }

    }

    $('#tbody_kanbanViewList').html(finalHTML);
    //  $('#tblKanbanView').DataTable();
    showAllImages();
}
function createKanbanViewItem(item) {
    var innerItemHTML = '<td><table style="border: solid thin grey;margin: 2px;width:200px;height:100px;">' +
        '<tbody>' +
        '<tr>' +
        '<td style="vertical-align:top;">' +
        '<img class="kanban-img"  src="' + item.TransportImage + '" style="width: 80px;height:96px; text-align: top;"></td>' +
        '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.TransportName +
        '</td > ' +
        '</tr>' +
        '</tbody>' +
        '</table ></td>'
        ;

    return innerItemHTML;
}
function showListView() {
    $("#dvKanbanView").hide();
    $("#dvListView").show();
}
function showKanbanView() {
    $("#dvKanbanView").show();
    $("#dvListView").hide();
}
function keepDatalistOptions(selector = '') {
    // select all input fields by datalist attribute or by class/id
    selector = !selector ? "input[list]" : selector;
    let datalistInputs = document.querySelectorAll(selector);
    if (datalistInputs.length) {
        for (let i = 0; i < datalistInputs.length; i++) {
            let input = datalistInputs[i];
            input.addEventListener("input", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                //  e.target.blur();
            });
            input.addEventListener("focus", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                e.target.value = "";
            });
            input.addEventListener("blur", function (e) {
                e.target.value = e.target.getAttribute("placeholder");
            });
        }
    }
}
function showAllImages() {

    $(".kanban-img").each(function (item) {
        $.ajax({
            type: "POST",
            url: 'wfInventTransportDetail.aspx/GetTransportImageById',
            data: JSON.stringify({
                "Id": item.Id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d);
                $(this).attr('src', data[0].TransportImage);
            }
        });

    });
}
function decodeBase64Image(dataUrl) {
    // Split the data URL into two parts: metadata and base64 encoded data
    var parts = dataUrl.split(',');
    var mimeType = parts[0].split(':')[1].split(';')[0];
    var base64Data = parts[1];

    // Convert base64 encoded data to a binary string
    var binaryString = window.atob(base64Data);

    // Create a Uint8Array to hold the binary data
    var bytes = new Uint8Array(binaryString.length);

    // Populate the Uint8Array with binary data
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Return an object containing the decoded image data and its MIME type
    return {
        data: bytes,
        mimeType: mimeType
    };
}