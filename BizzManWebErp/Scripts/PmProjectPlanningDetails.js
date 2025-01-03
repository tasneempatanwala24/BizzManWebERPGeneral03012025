$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindEmployeeDropdown();
    BindSalesOrderDropdown();
    $("#btntitle").html('Projects');
    BindProjectPlanningMaster();
    GenerateProjectID();
});

function Title() {
    window.location = "wfPmProjectPlanning.aspx";
}

function CreatePmProjectMasterList() {

    $('#divPmProjectPlanningMasterList').hide();
    $('#divPmProjectPlanningMasterEntry').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#txtSiteName').removeAttr("readonly");
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    ClearAll();
}

function GenerateProjectID() {
    

        // Generate a random 4-digit number
        var randomFourDigits = ('00000' + Math.floor(Math.random() * 10000)).slice(-5);

        // Create the orderId
        var projectId = 'PROJ' + '-' + randomFourDigits;

        // Display the orderId
        $('#txtProjectNo').val(projectId);
    }


function AddWareHouseEntry() {

    var isUpdate = 0;
    if ($('#txtWarehouseName').val() != '') {

        if ($("#btnSave").html() != 'Update') {
            $.ajax({
                type: "POST",
                url: 'wfPmProjectPlanning.aspx/CheckWarehouseAvailability',
                data: JSON.stringify({ "name": $('#txtWarehouseName').val(), "isUpdate": isUpdate }),
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

function AddPmProjectMasterDetails() {
    debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmProjectPlanning.aspx/AddProjectPlanningDetails',
        data: JSON.stringify({
            "projectId":  $('#txtProjectNo').val().trim(),
            "siteName": $('#txtSiteName').val().trim(),
            "siteDetails": $('#txtSiteDetails').val().trim(),
            "assignEmployees": $('#ddAssign').val().trim(),
            "salesOrderNo": $('#ddlSalesOrderNo').val().trim(),
            "durationFrom": $('#txtDurationFrom').val().trim(),
            "durationTo": $('#txtDurationTo').val().trim(),
            "note": $('#txtNote').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Project Planning Details added successfully' : 'Project Planning Details updated successfully';
            alertify.success(message);
            ClearAll();
            // Discard();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function ClearAll() {
    //$('#txtProjectNo').val('');
    $('#txtSiteName').val('');
    $('#txtSiteDetails').val('');
    $('#ddlAssign').val('0');
    //$('#ddlSalesOrderNo').val('1');
    $('#txtDurationFrom').val('');
    $('#txtDurationTo').val('');
    $('#txtNote').val('');
  }

function ViewPmProjectMasterList() {
    $('#divPmProjectPlanningMasterList').show();
    $('#divPmProjectPlanningMasterEntry').hide();
    Discard();
    BindProjectPlanningMaster();
}

function Discard() {
    $('#divPmProjectPlanningMasterList').show();
    $('#divPmProjectPlanningMasterEntry').hide();
    $("#btntitle").html('Warehouses');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    BindProjectPlanningMaster();
}

function BindEmployeeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmProjectPlanning.aspx/BindEmployeesList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var employee = "<option value=''>- Select Employee -</option>";
            $('#ddAssign').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                employee = employee + "<option value='" + JSON.parse(response.d)[i].EmpName + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
            }
            $('#ddAssign').append(employee);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function BindSalesOrderDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfPmProjectPlanning.aspx/BindSalesOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var SalesOrderNo = "<option value=''>- Select SalesOrder No -</option>";
            $('#ddlSalesOrderNo').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                SalesOrderNo = SalesOrderNo + "<option value='" + JSON.parse(response.d)[i].SalesOrderId + "'>" + JSON.parse(response.d)[i].SalesOrderId + "</option>";
            }
            $('#ddlSalesOrderNo').append(SalesOrderNo);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function FetchWarehouseEntry(name) {
    $.ajax({
        type: "POST",
        url: 'wfPmProjectPlanning.aspx/FetchWarehouseDetails',
        data: JSON.stringify({
            "name": name
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

            $("#btntitle").html("Warehouses / " + data[0].name);
            $('#txtWarehouseName').val(data[0].name);
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

function BindProjectPlanningMaster() {
    $.ajax({
        type: "POST",
        url: 'wfPmProjectPlanning.aspx/BindProjectPlanningMasterDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPmProjectPlanningList').DataTable().clear();
            $('#tblPmProjectPlanningList').DataTable().destroy();
            $('#tbody_PmProjectPlanningMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].ProjectId + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].SiteName + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].SiteDetails == undefined ? '' : data[i].SiteDetails) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Employee == undefined ? '' : data[i].Employee) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].SalesOrderNo == undefined ? '' : data[i].SalesOrderNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].DurationFrom == undefined ? '' : data[i].DurationFrom) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].DurationTo == undefined ? '' : data[i].DurationTo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Note == undefined ? '' : data[i].Note) + '</td></tr>'

            }
            $('#tbody_PmProjectPlanningMaster_List').html(html);
            $('#tblPmProjectPlanningList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
