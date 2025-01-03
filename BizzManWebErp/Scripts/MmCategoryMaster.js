$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindCategoryTypeDropdown();
    BindAccountDropdown();
    BindParentCategoryDropdown();
    BindCategoryList();
    
});





function BindParentCategoryDropdown(categoryid) {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/BindParentCategoryList',
        data: JSON.stringify({
            "categoryid": categoryid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlParentCaategory').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Parent Category-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].Name + "</option>";
            }
            $('#ddlParentCaategory').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}
function BindCategoryTypeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/BindCategoryTypeDropdown',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            
            var data = JSON.parse(response.d);
            var catType = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                catType = catType + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CategoryTypeName + "</option>";
            }
            $('#ddlCategoryType').append(catType);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindAccountDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/BindAccountDropdown',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
           // $('#ddlIncomeAccount').html('');
           // $('#ddlExpenseAccount').html('');
            var data = JSON.parse(response.d);
            var branch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].LedgerName + "</option>";
            }
            $('#ddlIncomeAccount').append(branch);
            $('#ddlExpenseAccount').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}




function BindCategoryList() {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/FetchCategoryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblCategoryList').DataTable().clear();
            $('#tblCategoryList').DataTable().destroy();
            $('#tbody_Category_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmployeeDetails(\'' + data[i].Name + '\')"><td style="white-space: nowrap;">' + data[i].Id + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].Name + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ParentCategory != undefined ? data[i].ParentCategory : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].Description + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].InventoryValuation != undefined ? data[i].InventoryValuation : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].IncomeAccount != undefined ? data[i].IncomeAccount : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ExpenseAccount != undefined ? data[i].ExpenseAccount : '') + '</td>'
                    + '<td style="white-space: nowrap;">' + data[i].CategoryType + '</td>'
            }
            $('#tbody_Category_List').html(html);
            $('#tblCategoryList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ViewCategoryList() {
    $('#divCategoryList').show();
    $('#divCategoryEntry').hide();
    $('#btnSave').hide();
    BindCategoryList();
}


function ClearAll() {
    $('#txtCategoryName').val('');
    $('#txtDescription').val('');
    $('#ddlInventoryValuation').val('');
    $('#ddlIncomeAccount').val('');
    $('#ddlExpenseAccount').val('');
    $('#ddlCategoryType').val('');
}

function CreateCategory() {
    $('#divCategoryList').hide();
    $('#divCategoryEntry').show();
    $("#btnSave").html('Save');
    $('#txtCategoryName').removeAttr("readonly");
    $('#btnSave').show();
    BindParentCategoryDropdown('0');
    ClearAll();
}

function CheckCategoryNameAvailability() {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/CheckCategoryNameAvailability',
        data: JSON.stringify({ "Name": $('#txtCategoryName').val().trim() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            return data;
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            return 'False';
        }
    });
}

function AddCategory() {


    if ($('#txtCategoryName').val() != '') {
        if ($('#ddlInventoryValuation').val() != '') {
            if ($('#ddlIncomeAccount').val() != '') {
                if ($('#ddlExpenseAccount').val() != '') {
                    $.ajax({
                        type: "POST",
                        url: 'wfMmCategoryMaster.aspx/AddCategory',
                        data: JSON.stringify({
                            "Name": $('#txtCategoryName').val(),
                            "Description": $('#txtDescription').val(),
                            "InventoryValuation": $('#ddlInventoryValuation').val(),
                            "IncomeAccount": $('#ddlIncomeAccount').val(),
                            "ExpenseAccount": $('#ddlExpenseAccount').val(),
                            "ParentCategory": $('#ddlParentCaategory').val(),
                            "CategoryType": $('#ddlCategoryType').val()

                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            UploadFiles();
                            // alertify.success('Category added successfully');
                            //ClearAll();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error('Please select any Expense Account');
                }
            }
            else {
                alertify.error('Please select any Income Account');
            }
        }
        else {
            alertify.error('Please select any Inventory Valuation');
        }
    }
    else {
        alertify.error('Please Enter Category Name');
    }
}


function FetchEmployeeDetails(name) {
    $.ajax({
        type: "POST",
        url: 'wfMmCategoryMaster.aspx/FetchEmployeeDetails',
        data: JSON.stringify({
            "Name": name
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divCategoryList').hide();
            $('#divCategoryEntry').show();
            $("#btnSave").html('Update');
            $('#txtCategoryName').attr("readonly", "readonly");
            $("#btnSave").show();
            



            var data = JSON.parse(response.d);
            BindParentCategoryDropdown(data[0].Id);
            $('#txtCategoryName').val(data[0].Name);
            $('#txtDescription').val(data[0].Description);
            $('#ddlInventoryValuation').val(data[0].InventoryValuation);
            $('#ddlIncomeAccount').val(data[0].IncomeAccountId);
            $('#ddlExpenseAccount').val(data[0].ExpenseAccountId);
            $('#ddlCategoryType').val(data[0].CategoryType);
            setTimeout(function () {
                $('#ddlParentCaategory').val(data[0].ParentCategoryId);
            }, 1000);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function UploadFiles() {
    var data = new FormData();
    


    $.ajax({
        url: "FileUploadHandler.ashx",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            if ($('#btnSave').html() == 'Update') {
                alertify.success("Category updated successfully");
            }
            else {
                alertify.success("Category added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}
