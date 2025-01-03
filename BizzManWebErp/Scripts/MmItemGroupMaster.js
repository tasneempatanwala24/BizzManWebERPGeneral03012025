$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindItemGroupMasterDetails();
});
function BindItemGroupMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemGroupMaster.aspx/GetItemGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblItemGroupList').DataTable().clear();
            $('#tblItemGroupList').DataTable().destroy();
            $('#tbody_ItemGroup_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchItemGroup(\'' + data[i].Id + '\')" style="cursor:pointer">'
                    + '<td> ' + data[i].GroupName + '</td > '
            }
            $('#tbody_ItemGroup_List').html(html);
            $('#tblItemGroupList').DataTable();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchItemGroup(Id) {
    $.ajax({
        type: "POST",
        url: 'wfMmItemGroupMaster.aspx/GetItemGroupById',
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d)[0];
            ClearAll();
            $("#ContentPlaceHolder1_hfId").val(Id);
            $('#divItemGroupList').hide();
            $('#divItemGroupEntry').show();
            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#txtGroupName').attr("readonly", "readonly");
            $('#txtGroupName').val(data.GroupName);
            $('#txtDescription').val(data.Description);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ViewItemGroupList() {
    $('#divItemGroupList').show();
    $('#divItemGroupEntry').hide();
    $('#btnSave').hide();
    BindItemGroupMasterDetails();
}

function ClearAll() {
    $('#txtGroupName').removeAttr("readonly", "readonly");
    $("#txtGroupName").val('');
    $("#txtDescription").val('');
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#btnSave').html('Save');
}

function CreateItemGroupList() {
    $('#divItemGroupList').hide();
    $('#divItemGroupEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtGroupName').val() == '') {
        alertify.error("Please Enter Item Group Name");
        isValid = false;
    }

    if (isValid) {
       
        $.ajax({
            type: "POST",
            url: 'wfMmItemGroupMaster.aspx/CheckJobAvailability',
            data: JSON.stringify({ "GroupName": $('#txtGroupName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    var fd = {};

                    fd.GroupName = $('#txtGroupName').val().trim();
                    fd.Description = $('#txtDescription').val();
                    fd.User = $('#ContentPlaceHolder1_loginuser').val();
                    fd.Id = $("#ContentPlaceHolder1_hfId").val();
                    $.ajax({
                        processData: false,
                        type: "POST",
                        processData: false,
                        url: 'wfMmItemGroupMaster.aspx/AddItemGroup',
                        data: JSON.stringify(fd),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            if ($('#btnSave').html() == 'Update') { alertify.success("Item Package Group updated successfully"); ClearAll(); }
                            else {
                                alertify.success("Item Package Group added successfully");
                                ClearAll();
                            }
                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error("Item Package Group Name already available");
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

}

function enableAutoComplete(cntrl, apiURL, defaultData, dlSelector) {
    $(dlSelector).html("");
    $.ajax({
        type: "POST",
        url: apiURL,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            var data = JSON.parse(res.d);

            var autoCompleteDatasource = data.map(function (item) {
                if (!defaultData.includes(item['Item'])) {
                    defaultData.push(item['Item']);
                }
                return item['Item'];
            });
            for (var i = 0; i < defaultData.length; i++) {
                $(dlSelector).append("<option>" + defaultData[i] + "</option>");
            }
        }
    });
}