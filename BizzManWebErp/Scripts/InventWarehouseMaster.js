$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindBranchDropdown();
    BindJournalDropdown();
    BindLocationDropdown();
    $("#btntitle").html('Warehouses');
    BindWarehouseMaster();
});

function Title() {
    window.location = "wfInventWarehouseMaster.aspx";
}

function CreateWarehouse() {
    
    $('#divwarehouseList').hide();
    $('#divwarehouseEntry').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#txtWarehouseName').removeAttr("readonly");
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();    
    ClearAll();
}

function AddWareHouseEntry() {
  
    var isUpdate = 0;
    if ($('#txtWarehouseName').val() != '') {       

            if ($("#btnSave").html() != 'Update') {
                $.ajax({
                    type: "POST",
                    url: 'wfInventWarehouseMaster.aspx/CheckWarehouseAvailability',
                    data: JSON.stringify({ "warehouse": $('#txtWarehouseName').val(), "isUpdate": isUpdate }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        var data = JSON.parse(response.d);
                        if (data == 'False') {

                            AddWarehouse()
                        }
                        else {
                            alertify.error("Current Warehouse Details already exists");
                        }
                    }
                })
            }
            else {
                AddWarehouse();
            }     
    }
    else {
        alertify.error('Please Enter Warehouse Name');
    }
}

function AddWarehouse() {
    $.ajax({
        type: "POST",
        url: 'wfInventWarehouseMaster.aspx/AddWarehouse',
        data: JSON.stringify({
            "warehHouseName": $('#txtWarehouseName').val(),
            "shortName": $('#txtShortName').val(),
            "address": $('#txtAddress').val(),
            "branch": $('#ddBranch').val(),
            "location": $('#ddLocation').val(),
            "saleJournal": $('#ddSaleJournal').val(),
            "purchaseJournal": $('#ddPurchaseJournal').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Warehouse added successfully' : 'Warehouse updated successfully';
            alertify.success(message);
            ClearAll();
            Discard();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function ClearAll() {
    $('#txtWarehouseName').val('');
    $('#txtShortName').val('');
    $('#txtAddress').val('');
    $('#ddBranch').val('');
    $('#ddLocation').val('0');
    $('#ddSaleJournal').val('0');
    $('#ddPurchaseJournal').val('0');
    
}

function ViewWarehouse() {
    $('#divwarehouseList').show();
    $('#divwarehouseEntry').hide();
    Discard();
    BindWarehouseMaster();
}

function Discard() {
    $('#divwarehouseList').show();
    $('#divwarehouseEntry').hide();
    $("#btntitle").html('Warehouses');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    BindWarehouseMaster();
}

function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventWarehouseMaster.aspx/BindBranch',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>- Select Branch Name -</option>";
            $('#ddBranch').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindLocationDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventWarehouseMaster.aspx/BindLocation',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var location = "<option value='0'>- Select Location -</option>";
            $('#ddLocation').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                location = location + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LocationName + "</option>";
            }
            $('#ddLocation').append(location);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindJournalDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventWarehouseMaster.aspx/BindJournal',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddSaleJournal').find("option").remove();
            $('#ddPurchaseJournal').find("option").remove();
            $('#ddSaleJournal').append("<option value='0'>- Select Sale Journal -</option>");
            $('#ddPurchaseJournal').append("<option value='0'>- Select Purchase Journal -</option>");
            var journal = "";           

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                journal = journal + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
            }
            $('#ddSaleJournal').append(journal);
            $('#ddPurchaseJournal').append(journal);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function FetchWarehouseEntry(id) {
    $.ajax({
        type: "POST",
        url: 'wfInventWarehouseMaster.aspx/FetchWarehouseEntry',
        data: JSON.stringify({
            "id":id
            /*"name": name*/
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divwarehouseList').hide();
            $('#divwarehouseEntry').show();
            $("#btnSave").html('Update');
            $("#btnCreate").hide();
            $("#btnDiscard").show();
            $('#txtWarehouseName').attr("readonly", "readonly");           
            $("#btnSave").show();
            var data = JSON.parse(response.d);
            
            $("#btntitle").html("Warehouses / " + data[0].Name);
            $('#txtWarehouseName').val(data[0].Name);
            $('#txtShortName').val(data[0].ShortName);
            $('#txtAddress').val(data[0].Address);
            $('#ddBranch').val(data[0].BranchCode);
            $('#ddLocation').val(data[0].LocationId);
            $('#ddSaleJournal').val(data[0].SaleJournalId);
            $('#ddPurchaseJournal').val(data[0].PurchaseJournalId);
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindWarehouseMaster() {
    $.ajax({
        type: "POST",
        url: 'wfInventWarehouseMaster.aspx/BindWarehouseMaster',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblwarehouselist').DataTable().clear();
            $('#tblwarehouselist').DataTable().destroy();
            $('#tbody_warehouse_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr onclick="FetchWarehouseEntry(\'' + data[i].Id + '\')"><td style="white-space: nowrap;"><input type="checkbox" id=' + data[i].Id + ' name="selectAll"></td>'
                    + '<td style="white-space: nowrap;">' + data[i].Name + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].LocationName == undefined ? '' : data[i].LocationName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Address == undefined ? '' : data[i].Address) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].BranchName == undefined ? '' : data[i].BranchName) + '</td>'
            }
            $('#tbody_warehouse_list').html(html);
            $('#tblwarehouselist').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
