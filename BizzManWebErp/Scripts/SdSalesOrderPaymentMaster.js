$(document).ready(function () {
    GetSalesOrderPaymentDetailsAll();
    $("#ddlSalesOrders").select2({ width: '100%', height: '80px', theme: "classic" });
    //$("#ddlPaymentMode").select2();
    $("#divPaymentView").hide();
    $("#divPaymentList").show();
    $("#addPaymentContainer").hide();
    $("#btnView").hide();
    $('#tblPayDetailsInner').DataTable({
        paging: true,
        layout: {
            topStart: {
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
            }
        }
    });
    $('#tblPayDetailsInner').DataTable().clear();
    $('#tblPayDetailsInner').DataTable().destroy();
    $("#tblPayDetailsInner  > tbody > tr").remove();
    $('#tblPayDetailsInner').DataTable();

    $('#tblPayDetails').DataTable({
        paging: true,
    });

    GetSalesOrder();
    GetPaymentMode();
    $("#ddlSalesOrders").change(function () {
        ClearPaymentForm();
        if ($(this).val() !== '-1') {
            GetSalesOrderDetails($(this).val());
        }
        else {
            $(".paymentRow").hide();
            $('#tblPayDetailsInner').DataTable().clear();
            $('#tblPayDetailsInner').DataTable().destroy();
            $("#tblPayDetailsInner  > tbody > tr").remove();
            $('#tblPayDetailsInner').DataTable();
        }
    });
    $("#btnPay").click(function () {



    });
    $(".btnPayCancel").click(function () {
        ClearPaymentForm();
    });

    
});
$(document).on("click", "#tblPayDetailsInner tr td", function () {

    var thisObj = $(this);
    if ($(this).attr("class") === "clsDelete") {

        if ($(thisObj).attr("data-vc") === 'y') {

            alertify.error("Voucher already created, could not delete record.");
        }
        else {

            alertify.confirm('Delete Payment Entry', 'Are you sure to delete ?',
                function () {
                    DeletePaymentEntry($(thisObj).parent().attr("data-id"));

                }
                , function () {

                });
        }
    }
    else {
    }

}); 
$(document).on("click", "#tblPayDetails tr td", function () {

    var thisObj = $(this);
    if ($(this).attr("class") === "clsDelete") {

        if ($(thisObj).attr("data-vc") === 'y') {

            alertify.error("Voucher already created, could not delete record.");
        }
        else {

            alertify.confirm('Delete Payment Entry', 'Are you sure to delete ?',
                function () {
                    DeletePaymentEntry($(thisObj).parent().attr("data-id"));

                }
                , function () {

                });
        }
    }
    else {
        GetSalesOrderPaymentDetailsById($(thisObj).parent().attr("data-id"));
    }
    
});
function DeletePaymentEntry(paymentId) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/DeletePaymentEntry',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ paymentId: paymentId }),
        beforeSend: function () { },
        success: function (response) {
            $("#ddlSalesOrders").val($("#ddlSalesOrders").val()).change();
            alertify.success("Payment entry has been deleted");
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
        url: 'wfSdSalesOrderPaymentMaster.aspx/DownloadFile',
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
function GetSalesOrderDetails(salesOrderId) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/GetSalesOrderDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ salesOrderNo: salesOrderId }),
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPayDetailsInner').DataTable().clear();
            $('#tblPayDetailsInner').DataTable().destroy();
            $("#tblPayDetailsInner  > tbody > tr").remove();
            if (data !== null && data.length > 0) {
                if (parseFloat(data[0]?.PaymentAmount).toFixed(2) > 0) {
                    for (i = 0; i < data.length; i++) {
                        $('#tblPayDetailsInner > tbody').append('<tr data-id="' + data[i].Id +'">'
                            + '<td style="display:none">' + data[i]?.Id + '</td>'
                            + '<td>' + data[i]?.SalesOrderId + '</td>'
                            + '<td>' + data[i]?.Id + '</td>'
                            + '<td>' + data[i].PaymentMode + '</td>'
                            + '<td>' + data[i].PaymentType + '</td>'
                            + '<td>' + parseFloat(data[i]?.PaymentAmount).toFixed(2) + '</td>'
                            + '<td>' + data[i].PaymentDate + '</td>'
                            + '<td>' + data[i]?.CreateUser + '</td>'
                            + '<td class="clsDelete" data-vc="' + data[i]?.VoucherCreate + '"> <i class="fa fa-trash-o" style="font-size:25px;color:coral"></i></td>'
                            + '</tr>');

                    }
                }
                $("#txtTotalPayment").val(parseFloat(data[0].TotalAmount).toFixed(2));
                $("#txtOutstanding").val(Math.round(parseFloat(data[0].OutstandingAmount).toFixed(2)));
                $("#txtTotalPaid").val(parseFloat(data[0].TotalPaid).toFixed(2));
                $('#tblPayDetailsInner').DataTable();
            }
            else {
                $("#tblPayDetailsInner  > tbody > tr").remove();
                $('#tblPayDetailsInner').DataTable();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetSalesOrderDetailsList(salesOrderId) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/GetSalesOrderDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ salesOrderNo: salesOrderId }),
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPayDetailsInnerList').DataTable().clear();
            $('#tblPayDetailsInnerList').DataTable().destroy();
            $("#tblPayDetailsInnerList  > tbody > tr").remove();
            if (data !== null && data.length > 0) {
                if (parseFloat(data[0]?.PaymentAmount).toFixed(2) > 0) {
                    for (i = 0; i < data.length; i++) {
                        $('#tblPayDetailsInnerList > tbody').append('<tr>'
                            + '<td style="display:none">' + data[i]?.Id + '</td>'
                            + '<td>' + data[i]?.SalesOrderId + '</td>'
                            + '<td>' + data[i]?.Id + '</td>'
                            + '<td>' + data[i].PaymentMode + '</td>'
                            + '<td>' + data[i].PaymentType + '</td>'
                            + '<td>' + parseFloat(data[i]?.PaymentAmount).toFixed(2) + '</td>'
                            + '<td>' + data[i].PaymentDate + '</td>'
                            + '<td>' + data[i]?.CreateUser + '</td>'
                            + '</tr>');

                    }
                }
                //$("#txtTotalPayment").val(parseFloat(data[0].TotalAmount).toFixed(2));
                //$("#txtOutstanding").val(parseFloat(data[0].OutstandingAmount).toFixed(2));
                //$("#txtTotalPaid").val(parseFloat(data[0].TotalPaid).toFixed(2));
                $('#tblPayDetailsInnerList').DataTable();
            }
            else {
                $("#tblPayDetailsInnerList  > tbody > tr").remove();
                $('#tblPayDetailsInnerList').DataTable();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetSalesOrder() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/GetSalesOrder',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            BindSalesOrderDdl(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function GetPaymentMode() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/GetPaymentMode',
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
function GetSalesOrderPaymentDetailsAll() {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/GetSalesOrderPaymentDetailsAll',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            
            var data = JSON.parse(response.d);
            $('#tblPayDetails').DataTable().clear();
            $('#tblPayDetails').DataTable().destroy();
            $("#tblPayDetails  > tbody > tr").remove();
            if (data !== null && data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    ///$('#tblPayDetails > tbody').append('<tr onclick="GetSalesOrderPaymentDetailsById(\'' + data[i].Id + '\')" style="cursor:pointer">'
                    $('#tblPayDetails > tbody').append('<tr data-id="' + data[i].Id +'" style="cursor:pointer !important">'
                        + '<td style="display:none">' + data[i]?.Id + '</td>'
                        + '<td>' + data[i]?.SalesOrderId + '</td>'
                        + '<td>' + data[i]?.Id + '</td>'
                        + '<td>' + data[i]?.CustomerName + '</td>'
                        + '<td>' + data[i]?.Mobile + '</td>'
                        + '<td>' + data[i].PaymentMode + '</td>'
                        + '<td>' + data[i].PaymentType + '</td>'
                        + '<td>' + parseFloat(data[i]?.PaymentAmount).toFixed(2) + '</td>'
                        + '<td>' + data[i].PaymentDate + '</td>'
                        + '<td>' + data[i]?.CreateUser + '</td>'
                        
                        + '</tr>');

                }
                $('#tblPayDetails').DataTable({
                    order: [[0, 'desc']]
                });
            }

            else {
                $('#tblPayDetails').DataTable().clear();
                $('#tblPayDetails').DataTable().destroy();
                $("#tblPayDetails  > tbody > tr").remove();
                $('#tblPayDetails').DataTable({
                    layout: {
                        topStart: {
                            buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
                        }
                    }
                });
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function CallbackFunction(funcGetPaymentBySales,salesId) {

    funcGetPaymentBySales(salesId)  ;
}
function GetSalesOrderPaymentDetailsById(paymentId) {
    $(".hdBtn").hide();
    debugger;
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/GetSalesOrderPaymentDetailsById',
        data: JSON.stringify({
            Id: paymentId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {

            var data = JSON.parse(response.d);

            if (data !== null && data.length > 0) {
                $("#txtSalesOrderRead").val(data[0]?.SalesOrderId);
                $("#txtPaymentModeRead").val(data[0]?.PaymentMode);
                $("#txtAccountNumberRead").val(data[0]?.AcNo);
                $("#txtPaymentAmntRead").val(parseFloat(data[0]?.PaymentAmount).toFixed(2));
                $("#txtPaymentDateRead").val(data[0]?.PaymentDate);
                $("#txtCreatedUserRead").val(data[0]?.CreateUser);
                $("#txtCreatedOnRead").val(data[0]?.CreateDate);
                $("#txtPaymentIdRead").val(data[0]?.Id);
                $("#txtCustomerContactRead").val( data[0]?.CustomerName + '-' + data[0]?.Mobile);
                $("#txtDescRead").html(data[0]?.Description);

                $("#txtTotalPaymentRead").val(parseFloat(data[0]?.TotalAmount).toFixed(2));
                $("#txtTotalPaidRead").val(parseFloat(data[0]?.TotalPaid).toFixed(2));
                $("#txtOutstandingRead").val(Math.round(parseFloat(data[0]?.OutstandingAmount).toFixed(2)));
                $("#divPaymentList").hide();
                $("#divPaymentView").show();
                $("#btnView").show();
                $("#divPaymentEntryDetail").show();
                $("#dvListViewHist").show();
                CallbackFunction(GetSalesOrderDetailsList, data[0]?.SalesOrderId)
            }
            else {
                HideShowView();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function UpdateSalerOrderPayment(objPayment) {
    $.ajax({
        type: "POST",
        url: 'wfSdSalesOrderPaymentMaster.aspx/UpdateSalerOrderPayment',
        data: JSON.stringify({ payment: objPayment }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            GetSalesOrderPaymentDetailsAll();
            alertify.success('Payment succeeded');
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
function BindSalesOrderDdl(data) {
    $('#ddlSalesOrders').empty().append('<option selected value="-1">--Select Sales Order--</option>');

    $.each(data, function (i, item) {

        $("#ddlSalesOrders").append(
            $('<option></option>').val(item.SalesOrderId).html(item.SalesOrderName)
        );
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
function ClearPaymentForm() {
    $('#ddlPaymentMode').val("-1").change();
    $("#txtTotalPayment").val('00.00');
    $("#txtTotalPaid").val('00.00');
    $("#txtOutstanding").val('00.00');
    $("#txtPaymentAmnt").val('');
    $("#txtPaymentDate").val('');
    $("#txtDesc").val('');
    $("#txtAccountNumber").val('');
    $("#txtPaymentId").val('');
}
function ViewPaymentList() {
    HideShowView();
    $("#exTab2").hide();
    $("#divPaymentEntryDetail").hide();
    $("#ddlSalesOrders").val("-1").change();
    GetSalesOrderPaymentDetailsAll();
}
function HideShowView() {

    $("#divPaymentList").show();
    $("#divPaymentView").hide();
    $("#btnView").hide();
    $("#addPaymentContainer").hide();
    $("#exTab2").hide();
    $("#divPaymentEntryDetail").hide();
    $("#btnCreate").text("Create"); 

}
function CreatePaymentEntry(thisObj) {
    if ($(thisObj).text() === "Create") {
        GetSalesOrder();
        $("#ddlSalesOrders").val("-1").change();
        $("#divPaymentList").hide();
        $("#addPaymentContainer").show();
        $("#btnView").show();
        $("#exTab2").show();
        $("#divPaymentEntryDetail").hide();
        $(".hdBtn").show();
    }
    else if ($(thisObj).text() === "Save") {

        var errorMessage = "";      
        if ($('#ddlSalesOrders').val() === '-1') {
            errorMessage += "Please Select Sales Order<br/>";
        }

        if ($("#ddlPaymentMode").val() === "-1") {
            errorMessage += "Please Select Payment Mode<br/>";
        }

        if ($.trim($("#txtPaymentDate").val()) === "") {
            errorMessage += "Please Enter Date<br/>";
        }

        if ($.trim($("#txtPaymentAmnt").val()) === "") {
            errorMessage += "Please Enter Amount<br/>";
        }

        if ($.trim(errorMessage) !== "") {
            alertify.error(errorMessage)
            return false;
        }
       
        if ($("#ddlSalesOrders").val() !== "-1") {
            var objPayment = {
                SalersOrderId:  $.trim($("#ddlSalesOrders").val()),
                PaymentMode: $.trim($("#ddlPaymentMode").val()),
                PaymentDate: $.trim($("#txtPaymentDate").val()),
                PaymentAmount: $.trim($("#txtPaymentAmnt").val()),
                AcNo: $.trim($("#txtAccountNumber").val()),
                Description: $.trim($("#txtDesc").val()),
                Id: $.trim($("#txtPaymentId").val())
            };
            UpdateSalerOrderPayment(objPayment);
            ClearPaymentForm();
            $("#ddlSalesOrders").val("-1").change();
            $("#divPaymentView").hide();
            $("#divPaymentList").show();
            $("#addPaymentContainer").hide();
            $("#btnView").show();
            $("#exTab2").hide();
        }
    }
    if ($(thisObj).text() === "Create") {
        $(thisObj).text("Save");
    }
    else {
        $(thisObj).text("Create");
    }
}
function GetUrl() {
    if ($("#ddlSalesOrders").val() === '-1') {
        alertify.error('Please Select Sales Order To View');
        $("#iframeSalerOrder").attr("src", '#');
        $("#iframeSalerOrder").hide();
        return false;
    }

    else { 
        var sss = window.location.protocol +'//' + $(window.location).attr('host') + '/wfSdSalesOrder_display.aspx?id=' + $("#ddlSalesOrders").val();
        $("#iframeSalerOrder").attr("src", sss);
        $("#iframeSalerOrder").show();
    }
}
function GeneratePaymentID() {
    if ($('#txtPaymentDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfSdSalesOrderPaymentMaster.aspx/GeneratePaymentID',
            data: JSON.stringify({
                "paymentDate": $('#txtPaymentDate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtPaymentId').val(data[0].Id);


            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtPaymentId').val('');
    }
}
function PrintPreview() {
    window.open('wfSdSalesOrderPayment_display.aspx?id=' + $("#txtPaymentIdRead").val(), "_blank");
   
}

