//const alertify = require("./alertify");

$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    //BindBranchDropdown();
    // BindProduct(0);
    //BindProductCategory();
    $("#btntitle").html('Putaways Rules');
    // setTimeout(LoadData, 1000);
    LoadData();
});


var branchdata;
var warehouselist;
var productcat;
var product;

function LoadData() {

    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindBranch',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=' '></option>";
            //$('#ddbranch').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            branchdata = branch;
            PreBindProduct();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });




}

function PreBindProduct() {
    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindProduct',
        data: JSON.stringify({ "categoryId": "" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = "<option value=' '></option>";

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                data = data + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            product = data;
            PreMainLoad();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function PreMainLoad() {
    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindProductCategory',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = "<option value=' '></option>";


            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                data = data + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            productcat = data;
            MainLoad();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function MainLoad() {
    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindWarehouse',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var warehousedata = JSON.parse(response.d);
            var warehouse = "<option value=' '></option>";
            for (var i = 0; i < warehousedata.length; i++) {
                warehouse = warehouse + "<option value='" + warehousedata[i].Id + "'>" + warehousedata[i].Name + "</option>";
            }
            warehouselist = warehouse;
            LoadPutawayData(warehouse, branchdata, product, productcat);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function LoadPutawayData(warehouse, branchdata, product, productcat) {
    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindPutwayRule',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblputawaylist').DataTable().clear();
            $('#tblputawaylist').DataTable().destroy();
            $('#tbody_putaway_list').html('');
            var totalrow = $("#tblputawaylist tr").length;
            var htmlResponse = '';
            var rowno = totalrow;
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                htmlResponse = htmlResponse + '<tr onClick="edit(' + rowno + ');"><td style="white-space: nowrap;"><input type="checkbox" id="putwayid' + rowno + '" name="putwayid' + rowno + '" value="' + data[i].Id + '"></td>'
                    + '<td  style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled onblur="ProductReferesh(this,' + rowno + ')"  id="ddproduct' + rowno + '" name="ddproduct' + rowno + '" value=""> ' + product + '</select ></td>'
                    + '<td  style="white-space: nowrap; "><select class="form-control rounded border-dark" disabled onblur="ProductReferesh(this,' + rowno + ')"  id="ddproductcat' + rowno + '" name="ddproductcat' + rowno + '" value=""> ' + productcat + '</select ></td>'
                    + '<td  style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled id="ddfromwarehouse' + rowno + '" name="ddfromwarehouse' + rowno + '" value=""> ' + warehouse + '</select ></td>'
                    + '<td  style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled id="ddtowarehouse' + rowno + '" name="ddtowarehouse' + rowno + '" value=""> ' + warehouse + '</select ></td>'
                    + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled  id="ddbranch' + rowno + '" name="ddbranch' + rowno + '" value=""> ' + branchdata + '</select ></td>'


                //htmlResponse = htmlResponse + '<tr onClick="edit(' + rowno+');"><td style="white-space: nowrap;"><input type="checkbox" id="putwayid' + rowno + '" name="putwayid' + rowno + '" value="' + data[i].Id + '"></td>'
                //    + '<td  style="white-space: nowrap; "><select class="form-control rounded border-dark" disabled onchange="FillProduct(' + rowno + ');" id="ddproductcat' + rowno + '" name="ddproductcat' + rowno + '" value=""> ' + productcat + '</select ></td>'
                //    + '<td  style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled onblur="disable(this,' + rowno + ')" id="ddproduct' + rowno + '" name="ddproduct' + rowno + '" value=""> ' + product + '</select ></td>'
                //    + '<td  style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled onblur="disable(this,' + rowno + ')" id="ddfromwarehouse' + rowno + '" name="ddfromwarehouse' + rowno + '" value=""> ' + warehouse + '</select ></td>'
                //    + '<td  style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled onblur="disable(this,' + rowno + ')" id="ddtowarehouse' + rowno + '" name="ddtowarehouse' + rowno + '" value=""> ' + warehouse + '</select ></td>'
                //    + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark" disabled onblur="disable(this,' + rowno + ')" id="ddbranch' + rowno + '" name="ddbranch' + rowno + '" value=""> ' + branchdata + '</select ></td>'

                rowno += 1;
            }

            $('#tbody_putaway_list').html(htmlResponse);
            $('#tblputawaylist').DataTable();
            rowno = totalrow;
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                // $("#ddproductcat" + rowno).val(data[i].MaterialCategoryId)
                $("#ddproduct" + rowno).val(data[i].ProductId);
                $("#ddfromwarehouse" + rowno).val(data[i].FromWarehouseId);
                $("#ddtowarehouse" + rowno).val(data[i].ToWarehouseId);
                $("#ddbranch" + rowno).val(data[i].BranchCode);
                rowno += 1;
            }

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ProductReferesh(el, row) {
     
    if ($(el).attr("id") == 'ddproductcat' + row && $("#ddproductcat" + row).val() != ' ') {
        $("#ddproduct" + row).attr("disabled", "true");
    }
    else if ($(el).attr("id") == 'ddproductcat' + row && $("#ddproductcat" + row).val() == ' ') {
        $("#ddproduct" + row).removeAttr("disabled");
    }
    if ($(el).attr("id") == 'ddproduct' + row && $("#ddproduct" + row).val() != ' ') {
        $("#ddproductcat" + row).attr("disabled", "true");
    }
    else if ($(el).attr("id") == 'ddproduct' + row && $("#ddproduct" + row).val() == ' ') {
        $("#ddproductcat" + row).removeAttr("disabled");
    }
}

function showCreate() {
    $("#btnCreate").show();
    $("#btnSave").hide();
    $("#btnDiscard").hide();

}
function hideCreate() {
    $("#btnCreate").hide();
    $("#btnSave").show();
    $("#btnDiscard").show();
}

function Title() {
    window.location = "wfInventWarehouseMaster.aspx";
}

function edit(rowno) {

    var lastrow = $("#tblputawaylist tr").length - 1;
    if ($('#ddfromwarehouse' + lastrow).attr('disabled') && $('#ddtowarehouse' + lastrow).attr("disabled")) {

        $('#ddproductcat' + rowno).removeAttr("disabled");
        $('#ddproduct' + rowno).removeAttr("disabled");
        $('#ddfromwarehouse' + rowno).removeAttr("disabled");
        $('#ddtowarehouse' + rowno).removeAttr("disabled");
        $('#ddbranch' + rowno).removeAttr("disabled");
        hideCreate();
        $("#btnSave").html("Update");
        

    }
    //  el.childNodes[0].removeAttribute("disabled");

    // el.childNodes[0].focus();
    //window.getSelection().removeAllRanges();

}

function disable(el, rowno) {

    //SavePutaway(rowno);
    showCreate();

    /*el.setAttribute("disabled", "");*/

}

function CreatePutaway() {
    $("#btnSave").html("Save");
    hideCreate();
    $("#btntitle").html('Create / New');
    //console.log($('#tblputawaylist').DataTable().count() == 0)
    if ($('#tblputawaylist').DataTable().rows().count() == 0) {
        $('#tblputawaylist').DataTable().clear();
        $('#tblputawaylist').DataTable().destroy();
        $('#tbody_putaway_list').html('');
    }

    var rowno = $("#tblputawaylist tr").length;
    var newrow = "";
    newrow = '<tr><td onClick="edit(' + rowno + '); style="white-space: nowrap;"><input type="checkbox" "> <input type="hidden" id="putwayid' + rowno + '"  name="putwayid' + rowno + '"  /></td>'
        + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark" onblur="ProductReferesh(this,' + rowno + ')"   id="ddproduct' + rowno + '" name="ddproduct' + rowno + '" value=" "> ' + product + '</select ></td>'
        + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark"  onblur="ProductReferesh(this,' + rowno + ')"  id="ddproductcat' + rowno + '" name="ddproductcat' + rowno + '"  value=" "> ' + productcat + '</select ></td>'

        + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark"  id="ddfromwarehouse' + rowno + '"  name="ddfromwarehouse' + rowno + '" value=" "> ' + warehouselist + '</select ></td>'
        + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark"  id="ddtowarehouse' + rowno + '"  name="ddtowarehouse' + rowno + '" value=" "> ' + warehouselist + '</select ></td>'
        + '<td style="white-space: nowrap;"><select class="form-control rounded border-dark"  id="ddbranch' + rowno + '"  name="ddbranch' + rowno + '" value=" "> ' + branchdata + '</select ></td></tr>'
    $('#tbody_putaway_list').append(newrow);
    $('#tblputawaylist').DataTable();
    console.log($("#tblputawaylist tr").length - 1);
}

function BindBranchDropdown() {

    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindBranch',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=' '></option>";
            //$('#ddbranch').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            branchdata = branch;

            //$('#ddbranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindWarehouse() {

    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindWarehouse',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var warehousedata = JSON.parse(response.d);
            var warehouse = "<option value=' '></option>";
            for (var i = 0; i < warehousedata.length; i++) {
                warehouse = warehouse + "<option value='" + warehousedata[i].Id + "'>" + warehousedata[i].Name + "</option>";
            }


            //var branch = "<option value=''>- Select Branch Name -</option>";
            //$('#ddfromwarehouse').find("option").remove();
            //$('#ddtowarehouse').find("option").remove();

            //for (var i = 0; i < JSON.parse(response.d).length; i++) {
            //    branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            //}
            //$('#ddfromwarehouse').append(branch);
            //$('#ddtowarehouse').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindProduct() {
    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindProduct',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = "<option value=' '></option>";

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                data = data + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            product = data;

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindProductCategory() {

    $.ajax({
        type: "POST",
        url: 'wfInventPutwayRule.aspx/BindProductCategory',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = "<option value=' '></option>";


            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                data = data + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            productcat = data;

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function Discard() {

    if ($("#btnSave").html() != 'Update') {
        $('#tblputawaylist tr:last').remove();
        $('#tblputawaylist').DataTable();
    }
    $('select').attr("disabled", "true");
    $("#btnSave").html("Save");
    $("#btntitle").html('Putaways Rules');
    //$('#ddproductcat' + rowno).attr("disabled", "true");
    //$('#ddproduct' + rowno).attr("disabled", "true");
    //$('#ddfromwarehouse' + rowno).attr("disabled", "true");
    //$('#ddtowarehouse' + rowno).attr("disabled", "true");
    //$('#ddbranch' + rowno).attr("disabled", "true");
    showCreate();
}

function SavePutaway() {
    var rowno = $("#tblputawaylist tr").length - 1;
    console.log($("#ddproduct" + rowno));
    if ($("#ddproduct" + rowno).val() != '' || $("#ddproductcat" + rowno).val() != '') {
        if ($("#ddfromwarehouse" + rowno).val() != '') {
            if ($("#ddtowarehouse" + rowno).val() != '') {
                if ($("#ddbranch" + rowno).val() != '') {
                    $.ajax({
                        type: "POST",
                        url: 'wfInventPutwayRule.aspx/AddPutway',
                        data: JSON.stringify({
                            "putwayId": $('#putwayid' + rowno).val(),
                            "productcatid": $('#ddproductcat' + rowno).val(),
                            "productId": $('#ddproduct' + rowno).val(),
                            "fromWareHouse": $('#ddfromwarehouse' + rowno).val(),
                            "toWareHouse": $('#ddtowarehouse' + rowno).val(),
                            "branchCode": $('#ddbranch' + rowno).val(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var message = ($("#btnSave").html() == 'Save') ? 'Putway added successfully' : 'Putway updated successfully';
                            alertify.success(message);
                            showCreate();
                            $('#ddproductcat' + rowno).attr("disabled", "true");
                            $('#ddproduct' + rowno).attr("disabled", "true");
                            $('#ddfromwarehouse' + rowno).attr("disabled", "true");
                            $('#ddtowarehouse' + rowno).attr("disabled", "true");
                            $('#ddbranch' + rowno).attr("disabled", "true");

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error('Please Select Branch');
                }
            }
            else {
                alertify.error('Please Select To Warehouse Name');
            }
        }
        else {
            alertify.error('Please Select From Warehouse Name');
        }
    }
    else {
        alertify.error('Please Select Product');
    }
}
