$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindPrimaryGroupDropdown();
    BindAccountsGroupList();
});

function BindPrimaryGroupDropdown() {
      
    $.ajax({
        type: "POST",
        url: 'wfFaAccountsGroupMaster.aspx/GetPrimeGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var primeGroup = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                primeGroup = primeGroup + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].PrimeGroupName + "</option>";
            }
            $('#ddlPrimaryGroupName').append(primeGroup);
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function CreateAccountGroup() {
    $('#divAccountGroupList').hide();
    $('#divAccountGroupEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
    $('#txtGroupCategory').val('Secondary');
    $('#txtAccountGroupName').attr("readonly", false);
    $('#ddlPrimaryGroupName').attr("disabled", false);

}

function ViewAccountGroupList() {
    $('#divAccountGroupList').show();
    $('#divAccountGroupEntry').hide();
    $('#btnSave').hide();
    BindAccountsGroupList();
}

function ClearAll() {
    $('#ddlPrimaryGroupName,#txtAccountGroupName, #txtGroupCategory').val('');

}

function BindAccountsGroupList() {
    $.ajax({
        type: "POST",
        url: 'wfFaAccountsGroupMaster.aspx/FetchAccountsGroupList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
           
            $('#tblAccountGroupList').DataTable().clear();
            $('#tblAccountGroupList').DataTable().destroy();
            $('#tbody_AccountGroup_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchFaAccountsGroupDetails(\'' + (data[i].GroupName) + '\')">'
                                    + '<td>' + data[i].Id + '</td>'
                                    + '<td>' + data[i].PrimeGroupName + '</td>'
                                    + '<td>' + data[i].GroupName + '</td>'
                                    + '<td>' + data[i].GroupCategory + '</td>'
                                    + '<td>' + data[i].CreatedBy + '</td></tr>';  
            }
            $('#tbody_AccountGroup_List').html(html);
            $('#tblAccountGroupList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function AddNewAccountGroup() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
   
    if ($('#ddlPrimaryGroupName').val() == '') {
        alertify.error("Please Select Primary Group");
        isValid = false;
    }
    else if ($('#txtAccountGroupName').val() == '') {
        alertify.error("Please Enter Account Group Name");
        isValid = false;
    }
   
    if (isValid) {
         $.ajax({
            type: "POST",
            url: 'wfFaAccountsGroupMaster.aspx/AddNewAccountGroup',
            data: JSON.stringify({
                "PrimeGroupId": $('#ddlPrimaryGroupName').val().trim(),
                "GroupName": $('#txtAccountGroupName').val().trim(),
                "GroupCategory": $('#txtGroupCategory').val().trim(),
                "loginUser": $('#ContentPlaceHolder1_loginuser').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
              if ($('#btnSave').html() == 'Update') {
                    alertify.success("Account Group updated successfully");
                }
                else {
                    alertify.success("Account Group added successfully");
                    ClearAll();
                }

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function FetchFaAccountsGroupDetails(groupName) {
    $.ajax({
        type: "POST",
        url: 'wfFaAccountsGroupMaster.aspx/FetchFaAccountsGroupDetails',
        data: JSON.stringify({
            'groupName': groupName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            ClearAll();
            $('#divAccountGroupList').hide();
            $('#divAccountGroupEntry').show();
            //$("#btnSave").html('Update');
            $('#txtAccountGroupName').attr("readonly", "readonly");
            //$("#btnSave").show();

            $('#txtAccountGroupId').val(data[0].Id);
            $('#txtAccountGroupName').val(data[0].GroupName);
            $('#txtGroupCategory').val(data[0].GroupCategory);
            $('#ddlPrimaryGroupName').val(data[0].PrimeGroupId);
            $('#ddlPrimaryGroupName').attr("disabled", true);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

