
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlVendor').select2();
    $('#tblMaterialPurchaseGrnDetails').DataTable();
    BindVendorDropdown();
    BindWarehouseDropdown();
    BindMaterialPurchaseGrnList();


    $(".dat").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
});

  

function BindWarehouseDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnEntry.aspx/WarehouseList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            // $('#ddlWarehouse').select2('destroy');
            $('#ddlWarehouse').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Warehouse-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlWarehouse').append(req);
            // $('#ddlWarehouse').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}

function BindVendorDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnEntry.aspx/VendorList',
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




function CreateMaterialPurchaseGrn() {
    $('#divMaterialPurchaseGrnList').hide();
    $('#divMaterialPurchaseGrnDetailsList').hide();
    $('#divMaterialPurchaseGrnEntry').show();
    $('#divMaterialPurchaseGateInwordMasterList').show();
    $('#divMaterialPurchaseGateInwordMasterDetails').show();
    $('#btnSave').show();
    $('#btnExport').hide();

    ClearAll();
}

function ViewMaterialPurchaseGrnList() {
    $('#divMaterialPurchaseGrnList').show();
    $('#divMaterialPurchaseGrnDetailsList').show();
    $('#divMaterialPurchaseGrnEntry').hide();
    $('#divMaterialPurchaseGateInwordMasterList').hide();
    $('#divMaterialPurchaseGateInwordMasterDetails').hide();
    $('#btnSave').hide();
    $('#btnExport').show();
    BindMaterialPurchaseGrnList();
}



function ClearAll() {
    $('#tbody_MaterialPurchaseGateInwordMasterList').html('');
    $('#tbody_MaterialPurchaseGateInwordMasterDetails').html('');
    $('#ddlVendor').select2('destroy');
    $('#ddlVendor').val('');
    $('#ddlVendor').select2();
    $('#txtEntryDate').val('');
    $('#txtGateInwordId').val('');
    
}

function BindMaterialPurchaseGrnList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnEntry.aspx/FetchMaterialPurchaseGrnList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGrnList').DataTable().clear();
            $('#tblMaterialPurchaseGrnList').DataTable().destroy();
            $('#tbody_MaterialPurchaseGrn_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td><input type="checkbox" class="editor-active chk_purchase_order_list"></td><td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + data[i].Id + '</td><td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + data[i].GrnEntryDate + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].OrderId != undefined ? data[i].OrderId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].GateInwardMasterId != undefined ? data[i].GateInwardMasterId : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                    + '<td onclick="FetchMaterialPurchaseGrnDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseGrn_List').html(html);
            // $('#tblMaterialPurchaseOrderList').DataTable();

            var d = new Date();
            var table = $('#tblMaterialPurchaseGrnList').DataTable({
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

            $('#tbody_MaterialPurchaseGrn_List tbody').on('change', 'input[type="checkbox"]', function () {
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


function FetchMaterialPurchaseGrnDetails(id) {
    
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnEntry.aspx/FetchMaterialPurchaseGrnDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialPurchaseGrnDetails').DataTable().clear();
            $('#tblMaterialPurchaseGrnDetails').DataTable().destroy();
            $('#tbody_MaterialPurchaseGrnDetails').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td>' + data[i].MaterialName + '</td>'
                    + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].GateInwordQtyReceive != undefined ? data[i].GateInwordQtyReceive : '') + '</td>'
                    + '<td>' + (data[i].QtyStockEntry != undefined ? data[i].QtyStockEntry : '') + '</td>'
                    + '<td>' + (data[i].QtyReturn != undefined ? data[i].QtyReturn : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td>' + (data[i].TotalAmt != undefined ? data[i].TotalAmt : '') + '</td>'
                    + '<td>' + (data[i].WareHouse != undefined ? data[i].WareHouse : '') + '</td></tr>';
            }
            $('#tbody_MaterialPurchaseGrnDetails').html(html);
            $('#tblMaterialPurchaseGrnDetails').DataTable();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function DownloadFile() {
    var chk = 0;
    var Grnid = '';
    $('#tbody_MaterialPurchaseGrn_List tr').each(function (index1, tr) {
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
                    if (Grnid == '') {
                        Grnid = td.outerText;
                    }
                    else {
                        Grnid = Grnid + ',' + td.outerText;
                    }
                }
            }
        });
    });

    if (Grnid != '') {
        $.ajax({
            type: "POST",
            url: "wfMmMaterialPurchaseGrnEntry.aspx/FetchMaterialPurchaseGrnListDownload",
            data: JSON.stringify({
                "Grnid": Grnid
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var d = new Date();
                var fileName = 'MaterilaPurchaseGrn_' + d.toDateString() + '.xlsx';
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


function FetchPurchaseGateInwordDetails() {
    if ($('#ddlVendor').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialPurchaseGrnEntry.aspx/FetchMaterialPurchaseGateInwordList',
            data: JSON.stringify({
                "vendorid": $('#ddlVendor').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                $('#tbody_MaterialPurchaseGateInwordMasterList').html('');
                $('#tbody_MaterialPurchaseGateInwordMasterDetails').html('');

                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html = html + '<tr>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].Id != undefined ? data[i].Id : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].InwardEntryDate != undefined ? data[i].InwardEntryDate : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].OrderId != undefined ? data[i].OrderId : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].VendorName != undefined ? data[i].VendorName : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].VehicleNo != undefined ? data[i].VehicleNo : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].DeadlineDate != undefined ? data[i].DeadlineDate : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].ChallanNo != undefined ? data[i].ChallanNo : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].GateInTime != undefined ? data[i].GateInTime : '') + '</td>'
                        + '<td onclick="FetchMaterialPurchaseGateInwordMasterDetails(\'' + data[i].Id + '\',this);">' + (data[i].GaeOutTime != undefined ? data[i].GaeOutTime : '') + '</td></tr>';
                }
                $('#tbody_MaterialPurchaseGateInwordMasterList').html(html);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        alertify.error('Please select any vendor')
    }
}



function FetchMaterialPurchaseGateInwordMasterDetails(id, ele) {
    $('#txtGateInwordId').val(id);
        FetchPurchaseGateInwordMasterDetailList(id);
    
}


function FetchPurchaseGateInwordMasterDetailList(id) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialPurchaseGrnEntry.aspx/FetchPurchaseGateInwordMasterDetailList',
        data: JSON.stringify({
            "GateInwordMasterId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var warehouseHtml = $('#td_warehouse').html();
            $('#tbody_MaterialPurchaseGateInwordMasterDetails').html('');
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr class="tr_' + id + '">'
                    + '<td style="display:none;">' + (data[i].Id != undefined ? data[i].Id : '') + '</td>'
                    + '<td>' + (data[i].MaterialName != undefined ? data[i].MaterialName : '') + '</td>'
                    + '<td>' + (data[i].QtyOrder != undefined ? data[i].QtyOrder : '') + '</td>'
                    + '<td>' + (data[i].UnitMesure != undefined ? data[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data[i].QtyReceive != undefined ? data[i].QtyReceive : '') + '</td>'
                    + '<td>' + (data[i].UnitPrice != undefined ? data[i].UnitPrice : '') + '</td>'
                    + '<td><input type="number" class="form-control RcvQty" onchange="UpdateReturnQty(this)" /></td>'
                    + '<td><input type="number" class="form-control RtrnQty" onchange="UpdateReceiveQty(this)" /></td>'
                    + '<td>' + warehouseHtml + '</td><td><input type="text" class="form-control descptn" /></td><td><input type="checkbox" class="editor-active"></td></tr>';
            }
            $('#tbody_MaterialPurchaseGateInwordMasterDetails').html(html);


        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function UpdateReturnQty(ele) {
    if ($(ele).val() != '') {
        if (parseInt($(ele).val()) < 0) {
            $(ele.parentElement.parentElement.children[6].children[0]).val('');
            $(ele.parentElement.parentElement.children[7].children[0]).val('');
        }
        else {
            var GrnRcvQty = parseInt($(ele.parentElement.parentElement.children[4])[0].innerText);
            var RcvQty = parseInt($(ele).val());
            if (RcvQty <= GrnRcvQty) {
                $(ele.parentElement.parentElement.children[7].children[0]).val(GrnRcvQty - RcvQty);
            }
            else {
                $(ele.parentElement.parentElement.children[6].children[0]).val('');
                $(ele.parentElement.parentElement.children[7].children[0]).val('');
            }
        }
    }
    else {
        $(ele.parentElement.parentElement.children[7].children[0]).val('');
    }
}

function UpdateReceiveQty(ele) {
    if ($(ele).val() != '') {
        if (parseInt($(ele).val()) < 0) {
            $(ele.parentElement.parentElement.children[6].children[0]).val('');
            $(ele.parentElement.parentElement.children[7].children[0]).val('');
        }
        else {
            var GrnRcvQty = parseInt($(ele.parentElement.parentElement.children[4])[0].innerText);
            var RtrnQty = parseInt($(ele).val());
            if (RtrnQty <= GrnRcvQty) {
                $(ele.parentElement.parentElement.children[6].children[0]).val(GrnRcvQty - RtrnQty);
            }
            else {
                $(ele.parentElement.parentElement.children[6].children[0]).val('');
                $(ele.parentElement.parentElement.children[7].children[0]).val('');
            }
        }
    }
    else {
        $(ele.parentElement.parentElement.children[6].children[0]).val('');
    }
}


function AddMaterialPurchaseGrn() {

    var order_detail_id = '';
    var order_details = '';
    var order_detail = '';
    var chk = 0;
    var orderQty = '';
    var chk1 = 0;
    var chk2 = 0;

    $('#tbody_MaterialPurchaseGateInwordMasterDetails tr').each(function (index1, tr) {
        order_detail_id = '';
        chk = 0;
        orderQty = '';
        order_detail=''
        $(tr).find('td').each(function (index, td) {
            if (index == 0) {
                order_detail_id = td.outerText;

            }

            if (index == 6) {
                if ($(td.children[0]).val() != '') {
                        chk = 1;
                        orderQty = order_detail_id + '_' + $(td.children[0]).val();

                    
                }

            }
            if (index == 8) {
                if (chk == 1) {
                    if ($(td.children[0]).val() != '') {
                            order_detail = orderQty + '|' + $(td.children[0]).val();

                    }
                    else {
                        chk = 0;
                    }
                }
            }
            if (index == 9) {
                if (chk == 1) {
                    // if ($(td.children[0]).val() != '') {

                    order_detail = order_detail + '!' + $(td.children[0]).val();
                    // }

                }
                    
            }

            if (index == 10) {
                if ($(td.children[0]).is(":checked")) {
                    chk1 = chk1 + 1;
                    if (chk == 1) {
                        chk2 = chk2 + 1;

                        if (order_details == '') {
                            order_details = order_detail;
                        }
                        else {
                            order_details = order_details + ',' + order_detail;
                        }
                    }
                }
            }
            
        });
    });



    if ($('#txtEntryDate').val() != '') {
        if ($('#ddlVendor').val() != '') {
            //if ($('#ddlWarehouse').val() != '') {
            if (chk1 == chk2) {
                if (order_details != '') {

                    $.ajax({
                        type: "POST",
                        url: 'wfMmMaterialPurchaseGrnEntry.aspx/AddMaterialPurchaseGrn',
                        data: JSON.stringify({
                            "VendorId": $('#ddlVendor').val(),
                            "EntryDate": $('#txtEntryDate').val(),
                            "order_details": order_details,
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "GateInwordId": $('#txtGateInwordId').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var str = "success";
                            if (response.d.indexOf(str) != -1) {
                                alertify.success(response.d);
                                ClearAll();
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
                    alertify.error('Please enter receive quantity,return quantity and warehouse on purchase gate inword details list');
                }
            }
            else {
                alertify.error('Please enter receive quantity,return quantity and warehouse on purchase gate inword details list');
            }
            //}
            //else {
            //    alertify.error('Please select any warehouse');
            //}
        }
        else {
            alertify.error('Please select any vendor');
        }
    }
    else {
        alertify.error('Please enter entry date');
    }
}