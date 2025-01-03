$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindHeadList();
});

function BindHeadList() {
    $.ajax({
        type: "POST",
        url: 'wfFaAccountsHeadMaster.aspx/FetchHeadList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblHeadList').DataTable().clear();
            $('#tblHeadList').DataTable().destroy();
            $('#tbody_Head_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchHeadDetails(\'' + data[i].AccountHead + '\')"><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].AccountHead + '</td>'
            }
            $('#tbody_Head_List').html(html);
            $('#tblHeadList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ViewHeadList() {
    $('#divHeadList').show();
    $('#divHeadEntry').hide();
    $('#btnSave').hide();
    BindHeadList();
}



function FetchHeadDetails(AccountHead) {
    $.ajax({
        type: "POST",
        url: 'wfFaAccountsHeadMaster.aspx/FetchHeadDetails',
        data: JSON.stringify({
            "AccountHead": AccountHead
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            $('#divHeadList').hide();
            $('#divHeadEntry').show();
            $("#btnSave").html('Update');
            $('#txtId').attr("readonly", "readonly");
            $('#txtAccountHeads').attr("readonly", "readonly");
            $("#btnSave").show();




            var data = JSON.parse(response.d);
            $('#txtId').val(data[0].Id);
            $('#txtAccountHeads').val(data[0].AccountHead);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function ClearAll() {
    $('#txtId').val('');
    $('#txtAccountHeads').val('');
}

