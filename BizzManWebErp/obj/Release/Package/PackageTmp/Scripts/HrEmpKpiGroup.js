$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

   // BindUnitMesureDropdown()
  //  BindCtcItemNameDropdown()
  //  BindJobCategoryDropdown();
  // BindEmpJobList();
    BindMasterList();


    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});

/*
function BindJobCategoryDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/JobCategoryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].JobCategoryName + "</option>";
            }
            $('#ddlJobCategory').append(abranch);
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function BindEmpJobList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/FetchEmpJoblList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpJobList').DataTable().clear();
            $('#tblEmpJobList').DataTable().destroy();
            $('#tbody_EmpJob_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmpJobDetails(\'' + data[i].EmpJobName + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].JobCategoryName + '</td>'
                    + '<td>' + data[i].EmpJobName + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td>' + data[i].JobRate + '</td>'
                    + '<td>' + data[i].CtcItemName + '</td></tr>';
            }
            $('#tbody_EmpJob_List').html(html);
            $('#tblEmpJobList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
*/

//  BindEmpJobList  -> BindMasterList
function BindMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpiGroup.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpJobList').DataTable().clear();
            $('#tblEmpJobList').DataTable().destroy();
            $('#tbody_EmpJob_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchMasterDetails(\'' + data[i].Id + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].KpiGroupName + '</td>'
                 //   + '<td>' + data[i].EmpJobName + '</td>'
                //    + '<td>' + data[i].UnitMesure + '</td>'
                //    + '<td>' + data[i].JobRate + '</td>'
                   // + '<td>' + data[i].CtcItemName + '</td></tr>';
                  + '</tr>';
            }
            $('#tbody_EmpJob_List').html(html);
            $('#tblEmpJobList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function FetchMasterDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpKpiGroup.aspx/FetchMasterDetails',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divEmpJobList').hide();
            $('#divEmpJobEntry').show();
            $("#btnSave").html('Update');
            $('#txtGroupName').attr("readonly", "readonly");
            $('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();




            var data = JSON.parse(response.d);

            $('#txtGroupName').val(data[0].KpiGroupName);
            $('#txtId').val(data[0].Id);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

/*
function FetchEmpJobDetails(name) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpJobMaster.aspx/FetchEmpJobDetails',
        data: JSON.stringify({
            "EmpJobName": name
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divEmpJobList').hide();
            $('#divEmpJobEntry').show();
            $("#btnSave").html('Update');
            $('#txtJobName').attr("readonly", "readonly");
            $('#ddlCtcItemName').attr("disabled", true);
            $('#ddlJobCategory').attr("disabled", true);
            $('#txtId').attr("readonly", "readonly");
            $('#ddlUnitMesure').attr("disabled", true);
            $("#btnSave").show();




            var data = JSON.parse(response.d);

            $('#txtJobName').val(data[0].EmpJobName);
            $('#ddlCtcItemName').val(data[0].CtcItemName);
            $('#txtId').val(data[0].Id);
            $('#txtJobRate').val(data[0].JobRate);
            $('#ddlJobCategory').val(data[0].JobCategoryId);
            $('#ddlUnitMesure').val(data[0].UnitMesure);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
*/


function CreateEmpJob() {
    $('#divEmpJobList').hide();
    $('#divEmpJobEntry').show();
    $('#txtGroupName').removeAttr("readonly");
    $('#txtId').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
  //  $('#ddlCtcItemName').attr("disabled", false);
  //  $('#ddlJobCategory').attr("disabled", false);
  //  $('#ddlUnitMesure').attr("disabled", false);


    ClearAll();
}

function ViewEmpJobList() {
    $('#divEmpJobList').show();
    $('#divEmpJobEntry').hide();
    $('#btnSave').hide();
   // BindEmpJobList();
    BindMasterList();
    //  mk


}

function ClearAll() {
    $('.dcmlNo').val('0.00');
    $('#txtGroupName').val('');
 //   $('#ddlCtcItemName').val('');
    $('#txtId').val('');
 //   $('#ddlJobCategory').val('');
  //  $('#ddlUnitMesure').val('');
}

function AddEmpJob() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtGroupName').val() == '') {
        alertify.error("Please enter KPI Group Name");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpKpiGroup.aspx/CheckDataAvailability',
            data: JSON.stringify({ "KpiGroupName": $('#txtGroupName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpKpiGroup.aspx/AddData',
                        data: JSON.stringify({
                            "KpiGroupName": $('#txtGroupName').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            UploadFiles();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error("Current KPI Group Name already available");
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
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
                alertify.success("KPI Group Master updated successfully");
            }
            else {
                alertify.success("KPI Group Master added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}