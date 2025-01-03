
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
   // $('#ddlRequisitionId').select2();
    BindRequisitionIdDropdown();
    BindMaterialNameDropdown();
    BindMaterialIndentMasterList();
    $("#ddlMaterialName").select2({
        placeholder: "-Select Material Name-",
        allowClear: true,
        width : "100%"
    });
    $('#txtQty').keypress(function (event) {
        var value = $(this).val();
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
        if (value.indexOf('.') != -1) {
            var decimalPosition = value.indexOf('.');
            if (value.substring(decimalPosition + 1).length >= 1) {
                $(this).val(value.substring(0, decimalPosition + 2));
            }
        }
    });
    $("#txtEntryDate").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");
    //$('input').keydown(function (e) {
    //    if (e.keyCode == 13) { // Check if the Enter key was pressed
    //        e.preventDefault(); // Prevent form submission
    //        $(this).next('input').focus(); // Move focus to the next input
    //    }
    //});
    $(function () {
        $('input:text:first').focus();
        var $inp = $('.cls');
        $inp.bind('keydown', function (e) {
            //var key = (e.keyCode ? e.keyCode : e.charCode);
            var key = e.which;
            if (key == 13) {
                e.preventDefault();
                var nxtIdx = $inp.index(this) + 1;
                $(".cls:eq(" + nxtIdx + ")").focus();
                if (nxtIdx == $inp.length - 1) {
                    SaveMaterialIndentDetails();
                    $('#ddlMaterialName').focus();
                }
            }
        });
    });
    
   
});

var loanAppId = "";
function ViewFile() {
    if (loanAppId) {
        window.open("wfMmMaterialIndentMaster_display.aspx?id=" + loanAppId);
    }
} 

function BindRequisitionIdDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialIndentMaster.aspx/RequisitionIdList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            //$('#ddlRequisitionId').select2('destroy');
            $('#ddlRequisitionId').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Requisition Id-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].RequisitionId + "'>" + JSON.parse(response.d)[i].RequisitionId + "</option>";
            }
            $('#ddlRequisitionId').append(req);
            // $('#ddlRequisitionId').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}


function BindMaterialNameDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialIndentMaster.aspx/MaterialNameList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlMaterialName').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Material Name-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlMaterialName').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}


function BindMaterialIndentMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialIndentMaster.aspx/FetchMaterialIndentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMaterialIndentMasterList').DataTable().clear();
            $('#tblMaterialIndentMasterList').DataTable().destroy();
            $('#tbody_MaterialIndentMaster_List').html('');
            
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td onclick="FetchMaterialIndentMasterDetails(\'' + data[i].Id + '\');">' + data[i].MaterialRequisitionNoteId + '</td>'
                    + '<td onclick="FetchMaterialIndentMasterDetails(\'' + data[i].Id + '\');">' + (data[i].DeptName != undefined ? data[i].DeptName : '') + '</td>'
                    + '<td onclick="FetchMaterialIndentMasterDetails(\'' + data[i].Id + '\');">' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td onclick="FetchMaterialIndentMasterDetails(\'' + data[i].Id + '\');">' + data[i].RequisitionNote + '</td>'
                    + '<td onclick="FetchMaterialIndentMasterDetails(\'' + data[i].Id + '\');">' + (data[i].Description != undefined ? data[i].Description : '') + '</td>'
                    + '<td onclick="FetchMaterialIndentMasterDetails(\'' + data[i].Id + '\');">' + (data[i].CreateDate != undefined ? data[i].CreateDate : '') + '</td>'
                    + '<td><a onclick="DeleteMaterialIndentMasterEntry(\'' + data[i].Id + '\');" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
            }
            $('#tbody_MaterialIndentMaster_List').html(html);
            $('#tblMaterialIndentMasterList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function CreateMaterialIndentMaster() {
    $('#divMaterialIndentMasterList').hide();
    $('#divMaterialIndentMasterEntry').show();
    $('#divMaterialIndentDetails').show();
    $('#btnSave').show();
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
}

function ViewMaterialIndentMasterList() {
    $('#btnViewFile').hide();
    $('#divMaterialIndentMasterList').show();
    $('#divMaterialIndentMasterEntry').hide();
    $('#divMaterialIndentDetails').hide();
    $('#btnSave').hide();
    BindMaterialIndentMasterList();
}



function ClearAll() {
   // $('#tblMaterialIndentDetails').DataTable().clear();
   // $('#tblMaterialIndentDetails').DataTable().destroy();
    // $('#tbody_MaterialIndentDetails').html('');
    $('#btnViewFile').hide();
    $('#tbody_MaterialIndentDetails').children('tr:not(:first)').remove();
   // $('#tblMaterialIndentDetails').DataTable();
    $('#ddlRequisitionId').removeAttr('disabled');
    BindRequisitionIdDropdown();
    $('#txtRequisitionNote').val('');
    $('#txtEntryDate').val('');
    $('#txtDescription').val('');
    $('#ddlMaterialName').val('');
    $('#txtQty').val('');
    $('#txtMaterialDescription').val('');
    $('#txtDepartment').val('');
    $('#txtBranch').val('');
    $('#txtMaterialStock').val('');
    $('#txtMaterialUnitMeasure').val('');
}


function FetchRequisitionNote() {
    $('#txtRequisitionNote').val('');
    if ($('#ddlRequisitionId').val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialIndentMaster.aspx/FetchRequisitionNote',
            data: JSON.stringify({
                "ReqId": $('#ddlRequisitionId').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtRequisitionNote').val(data[0].RequisitionNote);
                $('#txtDepartment').val(data[0].DeptName);
                $('#txtBranch').val(data[0].BranchName);
                $('#hdnBranchCode').val(data[0].BranchCode);
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

}


function OpenAddMaterialIndentDetailsModal() {
    $('#ddlMaterialName').val('');
    $('#txtQty').val('');
    $('#txtMaterialDescription').val('');
    $('#MaterialIndentDetailsModal').modal('show');
    $('.modal-backdrop').remove();
}

function SaveMaterialIndentDetails() {
    if ($('#ddlMaterialName').val() != '') {
        if ($('#txtQty').val() != '0.00' && $('#txtQty').val() != '0.000' && $('#txtQty').val() != '0.0' && $('#txtQty').val() != '0' && $('#txtQty').val() != '') {
           
        $('#tbody_MaterialIndentDetails').append('<tr><td style="display: none;">' + $('#ddlMaterialName').val() + '</td>'
            + '<td>' + $("#ddlMaterialName option:selected").text() + '</td>'
            + '<td>' + $("#txtMaterialStock").val() + '</td>'
            + '<td>' + $("#txtQty").val() + '</td>'
            + '<td>' + $("#txtMaterialUnitMeasure").val() + '</td>'
            + '<td>' + $("#txtMaterialDescription").val() + '</td>'
            + '<td><a onclick="DeleteMaterialIndentDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
            + '</tr>');
            //$('#ddlMaterialName').html('');
            BindMaterialNameDropdown();
            $('#txtQty').val('');
            $('#txtMaterialDescription').val('');
            $('#txtMaterialStock').val('');
            $('#txtMaterialUnitMeasure').val('');
           
        }
        else {
            
            alertify.error('Please enter proper material quantity');
        }
    }
    else {
        alertify.error('Please select any material name');
    }
}

function DeleteMaterialIndentDetailEntry(ele) {
   // $('#tblMaterialIndentDetails').DataTable().clear();
   // $('#tblMaterialIndentDetails').DataTable().destroy();
    $(ele.parentElement.parentElement).remove();
   // $('#tblMaterialIndentDetails').DataTable();
}


function AddMaterialIndentMaster() {
    if ($('#ddlRequisitionId').val() != '') {
        if ($('#txtEntryDate').val() != '') {
            var indent_details = '';
            $('#tbody_MaterialIndentDetails tr').each(function (index1, tr) {
                if (index1 > 0) {
                    $(tr).find('td').each(function (index, td) {
                        if (index1 == 1) {
                            if (indent_details == '') {
                                if (index == 0) {
                                    indent_details = td.outerText;
                                }

                            }
                            else {
                                if (index == 1) {
                                    indent_details = indent_details + '|' + td.outerText;
                                }
                                else if (index == 3) {
                                    indent_details = indent_details + '$' + td.outerText;
                                }
                                //else if (index == 3) {
                                //    indent_details = indent_details + '|' + td.outerText;
                                //}
                                //else if (index == 4) {
                                //    indent_details = indent_details + '|' + td.outerText;
                                //}
                                else if (index == 5) {
                                    indent_details = indent_details + '|' + td.outerText;
                                }
                            }
                        }
                        else {
                            if (index == 0) {
                                indent_details = indent_details + '@' + td.outerText;
                            }
                            else if (index == 1) {
                                indent_details = indent_details + '|' + td.outerText;
                            }
                            else if (index == 3) {
                                indent_details = indent_details + '$' + td.outerText;
                            }
                            //else if (index == 3) {
                            //    indent_details = indent_details + '|' + td.outerText;
                            //}
                            //else if (index == 4) {
                            //    indent_details = indent_details + '|' + td.outerText;
                            //}
                            else if (index == 5) {
                                indent_details = indent_details + '|' + td.outerText;
                            }
                        }
                    });
                }
            });

            if (indent_details != '') {
                
                            $.ajax({
                                type: "POST",
                                url: 'wfMmMaterialIndentMaster.aspx/AddMaterialIndentMaster',
                                data: JSON.stringify({
                                    "ReqId": $('#ddlRequisitionId').val(),
                                    "EntryDate": $('#txtEntryDate').val(),
                                    "Description": $('#txtDescription').val(),
                                    "Indent_details": indent_details,
                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val()
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function () {

                                },
                                success: function (response) {
                                    alertify.success('Material indent master details added successfully');
                                    ClearAll();

                                },
                                complete: function () {

                                },
                                failure: function (jqXHR, textStatus, errorThrown) {

                                }
                            });
                        
            }
            else {
                alertify.error('Please add material indent details');
            }
        }
        else {
            alertify.error('Please enter date');
        }
    }
    else {
        alertify.error('Please select any requisition id');
    }
}

function DeleteMaterialIndentMasterEntry(id) {
    alertify.confirm('Confirm Material Indent Entry Delete', 'Are you sure, you want to delete material indent master entry ?', function () {
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialIndentMaster.aspx/DeleteMaterialIndentMasterEntry',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                alertify.success('Material indent master details deleted successfully');
                BindMaterialIndentMasterList();

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
        , function () { });
}


function FetchMaterialIndentMasterDetails(id) {
    loanAppId = id;
    ClearAll();
    $('#btnViewFile').show();
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialIndentMaster.aspx/FetchMaterialIndentMasterDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

           // $('#ddlRequisitionId').select2('destroy');
            
            $('#ddlRequisitionId').append("<option value='" + JSON.parse(response.d)[0].MaterialRequisitionNoteId + "'>" + JSON.parse(response.d)[0].MaterialRequisitionNoteId + "</option>");
           // $('#ddlRequisitionId').select2();

            $('#ddlRequisitionId').attr('disabled', 'disabled');
            $('#ddlRequisitionId').val(JSON.parse(response.d)[0].MaterialRequisitionNoteId);
            $('#txtRequisitionNote').val(JSON.parse(response.d)[0].RequisitionNote);
            $('#txtCreatedBy').val(JSON.parse(response.d)[0].CreateUser);
            $('#txtDepartment').val(JSON.parse(response.d)[0].DeptName);
            $('#txtBranch').val(JSON.parse(response.d)[0].BranchName);
            $('#hdnBranchCode').val(JSON.parse(response.d)[0].BranchCode);
            var dt = new Date(JSON.parse(response.d)[0].CreateDate);
            document.getElementById("txtEntryDate").valueAsDate = dt;
            // $('#txtEntryDate').val(dt);
            $('#txtDescription').val(JSON.parse(response.d)[0].Description);
            FetchMaterialIndentDetails(id);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function FetchMaterialIndentDetails(id) {
    $.ajax({
        type: "POST",
        url: 'wfMmMaterialIndentMaster.aspx/FetchMaterialIndentDetails',
        data: JSON.stringify({
            "id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response1) {
            var data1 = JSON.parse(response1.d);
           // $('#tblMaterialIndentDetails').DataTable().clear();
           // $('#tblMaterialIndentDetails').DataTable().destroy();
           // $('#tbody_MaterialIndentDetails').html('');
            $('#tbody_MaterialIndentDetails').children('tr:not(:first)').remove();

            var html = '';
            for (var i = 0; i < data1.length; i++) {
                html = html + '<tr><td style="display: none;">' + data1[i].MaterialMasterId + '</td>'
                    + '<td>' + data1[i].MaterialName + '</td>'
                    + '<td>' + ((data1[i].Stock !== undefined && data1[i].Stock !== 0) ? data1[i].Stock : '') + '</td>'
                    + '<td>' + (data1[i].Qty !== undefined ? data1[i].Qty : '') + '</td>'
                    + '<td>' + (data1[i].UnitMesure != undefined ? data1[i].UnitMesure : '') + '</td>'
                    + '<td>' + (data1[i].Description != undefined ? data1[i].Description : '') + '</td>'
                    + '<td><a onclick="DeleteMaterialIndentDetailEntry(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
            }
            $('#tbody_MaterialIndentDetails').append(html);
           // $('#tblMaterialIndentDetails').DataTable();

            $('#divMaterialIndentMasterList').hide();
            $('#divMaterialIndentMasterEntry').show();
            $('#divMaterialIndentDetails').show();
            $('#btnSave').show();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function CloseModal() {
    $('#MaterialIndentDetailsModal').modal('hide');
}

function FetchMaterialDetails() {
    if ($('#hdnBranchCode').val() == '') {
        alertify.error('Please Select Requisition Id');
        $('#ddlMaterialName').val('');
        return;
    }

    if ($('#ddlMaterialName').val() != '' && $('#hdnBranchCode').val() != '') {
        var found = false;
        $('#tbody_MaterialIndentDetails tr').each(function (i) {
            if (i > 0) {
                var materialid = parseFloat($(this)[0].cells[0].innerText)
                if (materialid == $('#ddlMaterialName').val()) {
                    found = true;

                }
            }

        });
        if (found) {
            alertify.error('Material already added');
            $('#ddlMaterialName').val('');
            return;
        }
        showLoader();
        $.ajax({
            type: "POST",
            url: 'wfMmMaterialIndentMaster.aspx/FetchMaterialDetails',
            data: JSON.stringify({
                "MaterialId": $('#ddlMaterialName').val(),
                "BranchCode": $('#hdnBranchCode').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);



                setTimeout(function () {

                    $('#txtMaterialUnitMeasure').val(data[0].UnitMesure);
                    $('#txtMaterialStock').val(data[0].Stock);
                    hideLoader();
                }, 1000); // Hide loader after 3 seconds
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}