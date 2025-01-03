$(document).ready(function () {

    $("button").click(function (event) {
        event.preventDefault();
    });

    $('.dcmlNo').keypress(function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    BindEmployeeSalaryGradeList();

});



function CreateEmployeeSalaryGrade() {
    $('#divEmployeeSalaryGradeList').hide();
    $('#divEmployeeSalaryGradeEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
    $('#txtGrade').removeAttr("readonly");
}


function ViewEmployeeSalaryGradeList() {
    $('#divEmployeeSalaryGradeList').show();
    $('#divEmployeeSalaryGradeEntry').hide();
    $('#btnSave').hide();
    BindEmployeeSalaryGradeList();
}

function ClearAll() {
    $('#txtID').val('');
    $('#txtGrade').val('');
    $('#txtBasic').val('');
    $('#txtDA').val('');
    $('#txtHRA').val('');
    $('#txtConveyance').val('');
    $('#txtDescription').val('');
    $('input:radio[name="optradioPF"][value="Y"]').prop('checked', true);
    $('input:radio[name="optradioESI"][value="Y"]').prop('checked', true);
    $('input:radio[name="optradioPTax"][value="Y"]').prop('checked', true);
    $('input:radio[name="optradioTDS"][value="Y"]').prop('checked', true);
    $('input:radio[name="optradioCL"][value="Y"]').prop('checked', true);
    $('input:radio[name="optradioEL"][value="Y"]').prop('checked', true);
    $('input:radio[name="optradioML"][value="Y"]').prop('checked', true);
}




function BindEmployeeSalaryGradeList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryGrade.aspx/FetchEmployeSalaryGradeList',
        data: JSON.stringify({
            
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmployeeSalaryGradeList').DataTable().clear();
            $('#tblEmployeeSalaryGradeList').DataTable().destroy();
            $('#tbody_Employee_SalaryGradeList').html('');
            
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr onclick="FetchEmployeeSalaryGradeDetails(\'' + data[i].ID + '\')"><td>' + data[i].SalaryGradeName + '</td>'
                    + '<td>' + data[i].Basic + '</td>'
                    + '<td>' + (data[i].DA != undefined ? data[i].DA : '') + '</td>'
                    + '<td>' + (data[i].HRA != undefined ? data[i].HRA : '') + '</td>'
                    + '<td>' + (data[i].Conveyance != undefined ? data[i].Conveyance : '') + '</td>'
                    + '<td>' + (data[i].MedicalAllounce != undefined ? data[i].MedicalAllounce : '') + '</td>'
                    + '<td>' + (data[i].PF != undefined ? data[i].PF : '') + '</td>'
                    + '<td>' + (data[i].ESI != undefined ? data[i].ESI : '') + '</td>'
                    + '<td>' + (data[i].PTax != undefined ? data[i].PTax : '') + '</td>'
                    + '<td>' + (data[i].TDS != undefined ? data[i].TDS : '') + '</td>'
                    + '<td>' + (data[i].CL != undefined ? data[i].CL : '') + '</td>'
                    + '<td>' + (data[i].EL != undefined ? data[i].EL : '') + '</td>'
                    + '<td>' + (data[i].ML != undefined ? data[i].ML : '') + '</td></tr>';
            }
            $('#tbody_Employee_SalaryGradeList').html(html);
            $('#tblEmployeeSalaryGradeList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function FetchEmployeeSalaryGradeDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpSalaryGrade.aspx/FetchEmployeeSalaryGradeDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();

            $('#divEmployeeSalaryGradeList').hide();
            $('#divEmployeeSalaryGradeEntry').show();
            $("#btnSave").html('Update');
            $('#btnSave').show();
            $('#txtGrade').attr("readonly", "readonly");


            var data = JSON.parse(response.d);
            $('#txtID').val(data[0].ID);
            $('#txtGrade').val(data[0].SalaryGradeName);
            $('#txtBasic').val(data[0].Basic);
            $('#txtDA').val(data[0].DA);
            $('#txtHRA').val(data[0].HRA);
            $('#txtConveyance').val(data[0].Conveyance);
            $('#txtDescription').val(data[0].MedicalAllounce);

            $('input:radio[name="optradioPF"][value="' + data[0].PF + '"]').prop('checked', true);
            $('input:radio[name="optradioESI"][value="' + data[0].ESI + '"]').prop('checked', true);
            $('input:radio[name="optradioPTax"][value="' + data[0].PTax + '"]').prop('checked', true);
            $('input:radio[name="optradioTDS"][value="' + data[0].TDS + '"]').prop('checked', true);
            $('input:radio[name="optradioCL"][value="' + data[0].CL + '"]').prop('checked', true);
            $('input:radio[name="optradioEL"][value="' + data[0].EL + '"]').prop('checked', true);
            $('input:radio[name="optradioML"][value="' + data[0].ML + '"]').prop('checked', true);



        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function AddEmployeeSalaryGrade() {
    if ($('#txtGrade').val() != '') {
        if ($('#txtBasic').val() != '') {
            $.ajax({
                type: "POST",
                url: 'wfHrEmpSalaryGrade.aspx/CheckSalaryGradeNameAvailability',
                data: JSON.stringify({
                    "id": $("#txtID").val(),
                    "gradename": $("#txtGrade").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {

                },
                success: function (response1) {
                    var data1 = JSON.parse(response1.d);
                    if (data1 == 'False') {
                        $.ajax({
                            type: "POST",
                            url: 'wfHrEmpSalaryGrade.aspx/AddEmployeeSalaryGrade',
                            data: JSON.stringify({
                                "id": $("#txtID").val(),
                                "gradename": $("#txtGrade").val(),
                                "basic": $('#txtBasic').val(),
                                "DA": $('#txtDA').val(),
                                "HRA": $('#txtHRA').val(),
                                "Conveyance": $('#txtConveyance').val(),
                                "Medical": $('#txtMedical').val(),
                                "PF": $("input:radio[name='optradioPF']:checked").val(),
                                "ESI": $("input:radio[name='optradioESI']:checked").val(),
                                "PTax": $("input:radio[name='optradioPTax']:checked").val(),
                                "TDS": $("input:radio[name='optradioTDS']:checked").val(),
                                "CL": $("input:radio[name='optradioCL']:checked").val(),
                                "EL": $("input:radio[name='optradioEL']:checked").val(),
                                "ML": $("input:radio[name='optradioML']:checked").val(),
                                "Description": $('#txtDescription').val(),
                                "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                            }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            beforeSend: function () {

                            },
                            success: function (response) {
                                alertify.success(response.d);
                                if ($("#txtID").val() == '') {
                                    
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
                        alertify.error('Current salary grade already exist');
                    }

                },
                complete: function () {

                },
                failure: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
        else {
            alertify.error('Please enter basic salary');
        }
    }
    else{
        alertify.error('Please enter grade name');
    }
}