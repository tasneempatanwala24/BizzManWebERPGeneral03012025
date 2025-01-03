$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindCompanyDropdown();
    $("#btntitle").html('Locations');
    BindInventLocation();
});

function Title() {
    window.location = "wfInventLocationMaster.aspx";
}

function CreateInventLocation() {
    $('#divInventLocationList').hide();
    $('#divInventLocationEntry').show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#txtLocationName').removeAttr("readonly");
    $('#ddlParentLocation').removeAttr("enabled");
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    BindParentInventLocation("0");
    ClearAll();
}

function AddInventLocation() {
    var isUpdate = 0;
    if ($('#txtLocationName').val() != '') {
        if ($('#ddLocationType').val() != '') {

            if ($("#btnSave").html() != 'Update') {
                $.ajax({
                    type: "POST",
                    url: 'wfInventLocationMaster.aspx/CheckLocationAvailability',
                    data: JSON.stringify({ "Location": $('#txtLocationName').val(), "isUpdate": isUpdate }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        var data = JSON.parse(response.d);
                        if (data == 'False') {

                            AddLocation()
                        }
                        else {
                            alertify.error("Current Location Details already exists");
                        }
                    }
                })
            }
            else {
                AddLocation();
            }
        }
        else {
            alertify.error('Please select any Location Type');
        }
    }
    else {
        alertify.error('Please Enter Location Name');
    }
}

function AddLocation() {
    $.ajax({
        type: "POST",
        url: 'wfInventLocationMaster.aspx/AddInventLocation',
        data: JSON.stringify({
            "LocationName": $('#txtLocationName').val(),
            "ParentLocation": $('#ddlParentLocation').val(),
            "LocationType": $('#ddLocationType').val(),
            "BranchCode": $('#ddCompany').val(),
            "IsScrap": $('#scrapLocation').is(":checked"),
            "IsReturn": $('#returnLocation').is(":checked"),
            "Description": $('#externalNote').val(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var message = ($("#btnSave").html() == 'Save') ? 'Location added successfully' : 'Location updated successfully';
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
    $('#txtLocationName').val('');
    $('#ddlParentLocation').val('');
    $('#ddLocationType').val('');
    $('#ddCompany').val('');
    $('#externalNote').val('');
    $('#scrapLocation').prop("checked", false);
    $('#returnLocation').prop("checked", false);
}

function ViewInventLocation() {
    $('#divInventLocationList').show();
    $('#divInventLocationEntry').hide();
    Discard();
    BindInventLocation();
}

function Discard() {
    $('#divInventLocationList').show();
    $('#divInventLocationEntry').hide();
    /* $("#btnSave").html('Save');*/
    $("#btntitle").html('Locations');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    ClearAll();
    BindInventLocation();
}

function BindCompanyDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfInventLocationMaster.aspx/BindCompany',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>- Select Branch Name -</option>";
            $('#ddCompany').find("option").remove();

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddCompany').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchInventDetails(locationName) {
    $.ajax({
        type: "POST",
        url: 'wfInventLocationMaster.aspx/FetchInventDetails',
        data: JSON.stringify({
            "Location": locationName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divInventLocationList').hide();
            $('#divInventLocationEntry').show();
            $("#btnSave").html('Update');
            $("#btnCreate").hide();
            $("#btnDiscard").show();
            $('#txtLocationName').attr("readonly", "readonly");
            $("#btnSave").show();

            //BindCompanyDropdown();
            var data = JSON.parse(response.d);
            BindParentInventLocation(data[0].Id)
            $("#btntitle").html("Locations / " + data[0].LocationName);
            $('#txtLocationName').val(data[0].LocationName);
            $('#ddLocationType').val(data[0].LocationType);
            $('#scrapLocation').prop("checked", data[0].IsScrapLocation == 'Y');
            $('#returnLocation').prop("checked", data[0].IsReturnLocation == 'Y');
            $('#ddCompany').val(data[0].BranchCode);
            $('#externalNote').val(data[0].Description);
            setTimeout(function () {
                $('#ddlParentLocation').val(data[0].ParentLocationId);
                $('#ddlParentLocation').attr("disabled", "true");
            }, 1000);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindInventLocation() {
    $.ajax({
        type: "POST",
        url: 'wfInventLocationMaster.aspx/FetchInventLocation',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblInventLocationList').DataTable().clear();
            $('#tblInventLocationList').DataTable().destroy();
            $('#tbody_InventLocation_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr onclick="FetchInventDetails(\'' + data[i].LocationName + '\')"><td style="white-space: nowrap;"><input type="checkbox" id=' + data[i].Id + ' name="selectAll"></td>'
                    + '<td style="white-space: nowrap;">' + data[i].Path + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].LocationType + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].BranchName == undefined ? '' : data[i].BranchName) + '</td>'
            }
            $('#tbody_InventLocation_List').html(html);
            $('#tblInventLocationList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindParentInventLocation(id) {
    $.ajax({
        type: "POST",
        url: 'wfInventLocationMaster.aspx/BindParentInventList',
        data: JSON.stringify({
            "locationId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlParentLocation').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Parent Location-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LocationName + "</option>";
            }
            $('#ddlParentLocation').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}