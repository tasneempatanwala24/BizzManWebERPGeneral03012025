
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlVendor').select2();
    BindVendorDropdown();
    BindBranchDropdown();
    BindDepartmentDropdown();
    BindMaterialPurchaseOrderList();
    

    $(".dat").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
});
var loanAppId = "";
function ViewFile() {
    if (loanAppId) {
        window.open("wfMmMaterialPurchaseOrderEntry_display.aspx?id=" + loanAppId);
    }
}
//=======================================
//=======================================
function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "<option value=''>-Select Department-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }
            $('#ddlDepartment').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
//===========================
//============================


//===========================
//=============================
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}




//================================
//==================================


function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/VendorList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlVendor').select2('destroy');
            $('#ddlVendor').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Vendor-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].VendorName + "</option>";
            }
            $('#ddlVendor').append(req);
            $('#ddlVendor').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}




function CreateMaterialPurchaseOrder() {
    $('#divMaterialPurchaseOrderList').hide();
    $('#divMaterialPurchaseOrderEntry').show();
    $('#divMaterialPurchaseOrderMasterList').show();
    $('#divMaterialPurchaseOrderMasterDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();
    $('#btnViewFile').hide();
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
}

function ViewMaterialPurchaseOrderList() {
    $('#divMaterialPurchaseOrderList').show();
    $('#divMaterialPurchaseOrderEntry').hide();
    $('#divMaterialPurchaseOrderMasterList').hide();
    $('#divMaterialPurchaseOrderMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindMaterialPurchaseOrderList();
    $('#btnViewFile').hide();
}



function ClearAll() {
    $('#tbody_MaterialPurchaseOrderMasterList').html('');
    $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
    $('#ddlVendor').select2('destroy');
    $('#ddlVendor').val('');
    $('#ddlVendor').select2();
    $('#txtEntryDate').val('');
    $('#txtID').val('');
    $('#txtDeadlineDate').val('');
    $('#txtReceiptDate').val('');
    $('#txtPaymentTerm').val('');
    $('#txtPurchaseAgreement').val('');
    $('#txtQuotationNo').val('');
    $('#ddlBranch').val('');
    $('#ddlDepartment').val('');
    $('#chkAskConfirm').prop('checked', false);
    $('#btnViewFile').hide();
}


function BindMaterialPurchaseOrderList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/FetchMaterialPurchaseOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseOrderList').DataTable().clear();
            $('#tblMaterialPurchaseOrderList').DataTable().destroy();
            $('#tbody_MaterialPurchaseOrder_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + data[i].Id + '</td><td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + data[i].VendorName + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].OrderEntryDate != undefined ? data[i].OrderEntryDate : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].OrderDeadlineDate != undefined ? data[i].OrderDeadlineDate : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + data[i].ReceiptDate + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].DeptName != undefined ? data[i].DeptName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].PaymentTerm != undefined ? data[i].PaymentTerm : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].PurchaseAgreement != undefined ? data[i].PurchaseAgreement : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseOrderDetails(\'' + data[i].Id + '\');">' + (data[i].QuotationNo != undefined ? data[i].QuotationNo : '') + '</td>'
                    + '<td><a onclick="DeleteMaterialPurchaseOrder(\'' + data[i].Id + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
            }
            $('#tbody_MaterialPurchaseOrder_List').html(html);
           // $('#tblMaterialPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblMaterialPurchaseOrderList').DataTable({
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

            $('#tblMaterialPurchaseOrderList tbody').on('change', 'input[type="checkbox"]', function () {
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

function FetchPurchaseQuotationMasterList(master_val,detail_val) {
    $('#tbody_MaterialPurchaseOrderMasterList').html('');
    $('#tbody_MaterialPurchaseOrderMasterDetails').html('');
    $('#btnViewFile').show();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/FetchPurchaseQuotationMasterList',
        data: JSON.stringify({
            "VendorId": $('#ddlVendor').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tbody_MaterialPurchaseOrderMasterList').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input id="chk_master_' + data[i].Id+'" type="checkbox" class="editor-active" onchange="FetchMaterialPurchaseQuotationMasterDetails(\'' + data[i].Id + '\',this);"></td>'
                    + '<td>' + (data[i].Id != undefined ? data[i].Id : '') + '</td>'
                    + '<td>' + (data[i].QuotationEntryDate != undefined ? data[i].QuotationEntryDate : '') + '</td>'
                    + '<td>' + (data[i].QuotationDate != undefined ? data[i].QuotationDate : '') + '</td>'
                    + '<td>' + (data[i].QuotationValidDate != undefined ? data[i].QuotationValidDate : '') + '</td>'
                    + '<td>' + (data[i].RequisitionNote != undefined ? data[i].RequisitionNote : '') + '</td>'
                    + '<td>' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                    + '<td>' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td>' + (data[i].DeptName != undefined ? data[i].DeptName : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseOrderMasterList').html(html);

            if (master_val != "") {
                for (var i = 0; i < master_val.split(',').length; i++) {
                    $('#chk_master_' + master_val.split(',')[i].toString()).prop('checked', true);
                    FetchPurchaseQuotationMasterDetailList(master_val.split(',')[i].toString(),detail_val);
                }
            }

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function FetchMaterialPurchaseQuotationMasterDetails(id,ele) {
    if ($(ele).is(":checked")) {
        FetchPurchaseQuotationMasterDetailList(id,'');
    }
    else {
        $('.tr_' + id).remove();
    }
}


function FetchPurchaseQuotationMasterDetailList(id, detail_val) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/FetchPurchaseQuotationMasterDetailList',
        data: JSON.stringify({
            "QuotationMasterId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr class="tr_' + id + '"><td><input id="chk_detail_' + id + '_' + data[i].MaterialMasterId +'" type="checkbox" class="editor-active"></td>'
                    + '<td style="display:none;">' + (data[i].Id != undefined ? data[i].Id : '') + '</td>'
                    + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td>' + (data[i].Qty != undefined ? data[i].Qty : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td>' + (data[i].TotalAmt != undefined ? data[i].TotalAmt : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseOrderMasterDetails').append(html);

            if (detail_val != "") {
                for (var i = 0; i < detail_val.split(',').length; i++) {
                    $('#chk_detail_' + detail_val.split(',')[i].toString()).prop('checked', true);
                }
            }

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function AddMaterialPurchaseOrder() {
    var purchaseOrderDetails = '';
    var chk = 0;
    var AskConfirm = 'N';
    $('#tbody_MaterialPurchaseOrderMasterDetails tr').each(function (index1, tr) {
        chk = 0;
        $(tr).find('td').each(function (index, td) {
            if (index == 0) {
                if ($($(td).find('input:checkbox')[0]).is(":checked")) {
                    chk = 1;
                }
            }

                if (index == 1) {
                    if (chk == 1) {
                        if (purchaseOrderDetails == '') {
                            purchaseOrderDetails = td.outerText;
                        }
                        else {
                            purchaseOrderDetails = purchaseOrderDetails+',' +td.outerText;
                        }
                    }
                }
            
        });
    });

    if ($('#chkAskConfirm').is(":checked")) {
        AskConfirm = 'Y';
    }

    if ($('#txtEntryDate').val() != '') {
        if ($('#ddlVendor').val() != '') {
            if ($('#txtDeadlineDate').val() != '') {
                if ($('#txtReceiptDate').val() != '') {
                    if ($('#ddlBranch').val() != '') {
                        if ($('#ddlDepartment').val() != '') {
                            if (purchaseOrderDetails != '') {
                                $.ajax({
                                    type: "POST",
                                    url: 'wfMmMaterialPurchaseOrderEntry.aspx/AddMaterialPurchaseOrder',
                                    data: JSON.stringify({
                                        "OrderID": $('#txtID').val(),
                                        "EntryDate": $('#txtEntryDate').val(),
                                        "Vendor": $('#ddlVendor').val(),
                                        "DeadlineDate": $('#txtDeadlineDate').val(),
                                        "ReceiptDate": $('#txtReceiptDate').val(),
                                        "PurchaseOrderDetails": purchaseOrderDetails,
                                        "AskConfirm": AskConfirm,
                                        "PaymentTerm": $('#txtPaymentTerm').val(),
                                        "PurchaseAgreement": $('#txtPurchaseAgreement').val(),
                                        "QuotationNo": $('#txtQuotationNo').val(),
                                        "BranchCode": $('#ddlBranch').val(),
                                        "DepartmentId": $('#ddlDepartment').val(),
                                        "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                    }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    beforeSend: function () {

                                    },
                                    success: function (response) {
                                        if ($('#txtID').val() == '') {
                                            alertify.success('Material purchase order details added successfully');
                                            ClearAll();
                                        }
                                        else {
                                            alertify.success('Material purchase order details updated successfully');
                                        }
                                    },
                                    complete: function () {

                                    },
                                    failure: function (jqXHR, textStatus, errorThrown) {

                                    }
                                });
                            }
                            else {
                                alertify.error('Please select purchase quotation master data and detail data');
                            }
                        }
                        else {
                            alertify.error('Please select any department');
                        }
                    }
                    else {
                        alertify.error('Please select any branch');
                    }
                }
                else {
                    alertify.error('Please enter receipt date');
                }
            }
            else {
                alertify.error('Please enter deadline date');
            }
        }
        else {
            alertify.error('Please select any vendor');
        }
    }
    else {
        alertify.error('Please enter entry date');
    }
}

function DeleteMaterialPurchaseOrder(id) {
    alertify.confirm('Confirm Material Purchase Order Delete', 'Are you sure, you want to delete material purchase order entry ?', function () {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderEntry.aspx/DeleteMaterialPurchaseOrder',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                alertify.success('Material purchase order details deleted successfully');
                BindMaterialPurchaseOrderList();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
        , function () { });
}




function FetchMaterialPurchaseOrderDetails(id) {
    ClearAll();
    $('#btnExport').hide();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseOrderEntry.aspx/FetchMaterialPurchaseOrderDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#txtID').val(JSON.parse(response.d)[0].Id);
            loanAppId = JSON.parse(response.d)[0].Id; 
            $('#ddlVendor').select2('destroy');
            $('#ddlVendor').val(JSON.parse(response.d)[0].VendoreId);
            $('#ddlVendor').select2();
            $('#txtPaymentTerm').val(JSON.parse(response.d)[0].PaymentTerm);
            $('#txtPurchaseAgreement').val(JSON.parse(response.d)[0].PurchaseAgreement);
            $('#txtQuotationNo').val(JSON.parse(response.d)[0].QuotationNo);
            $('#ddlBranch').val(JSON.parse(response.d)[0].BranchCode);
            $('#ddlDepartment').val(JSON.parse(response.d)[0].DepartmentId);

            if (JSON.parse(response.d)[0].AskConfirmation == 'Y') {
                $('#chkAskConfirm').prop('checked', true);
            }
            var dt = new Date(JSON.parse(response.d)[0].OrderEntryDate);
            document.getElementById("txtEntryDate").valueAsDate = dt;

            var dt1 = new Date(JSON.parse(response.d)[0].OrderDeadlineDate);
            document.getElementById("txtDeadlineDate").valueAsDate = dt1;

            var dt2 = new Date(JSON.parse(response.d)[0].ReceiptDate);
            document.getElementById("txtReceiptDate").valueAsDate = dt2;
            
            FetchPurchaseQuotationMasterList(JSON.parse(response.d)[0].PurchaseQuotation, JSON.parse(response.d)[0].PurchaseQuotationDetails);
            $('#divMaterialPurchaseOrderList').hide();
            $('#divMaterialPurchaseOrderEntry').show();
            $('#divMaterialPurchaseOrderMasterList').show();
            $('#divMaterialPurchaseOrderMasterDetails').show();
            $('#btnSave').show();
            $('#btnViewFile').show();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function DownloadFile() {
    var chk = 0;
    var orderid = '';
    $('#tbody_MaterialPurchaseOrder_List tr').each(function (index1, tr) {
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
                                if (orderid == '') {
                                    orderid = td.outerText;
                                }
                                else {
                                    orderid = orderid + ',' + td.outerText;
                                }
                            }
                        }
                    });
    });

    if (orderid != '') {
        $.ajax({
            type: "POST",
            url: "wfMmMaterialPurchaseOrderEntry.aspx/FetchMaterialPurchaseOrderListDownload",
            data: JSON.stringify({
                "orderid": orderid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaPurchaseOrder_' + d.toDateString() + '.xlsx';
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


function GenerateOrderID() {
    if ($('#txtEntryDate').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseOrderEntry.aspx/GenerateOrderID',
            data: JSON.stringify({
                "OrderDate": $('#txtEntryDate').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtID').val(data[0].Id);


            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $('#txtID').val('');
    }
}
