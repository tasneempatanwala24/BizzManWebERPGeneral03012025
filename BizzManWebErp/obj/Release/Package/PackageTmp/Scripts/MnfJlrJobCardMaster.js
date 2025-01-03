var currentDate = moment().format("YYYY-MM-DD");
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindMaterialMasterList();
    BindCustomerMasterList();
    BindMasterList();
    BindDiamondCertificateList();

    $("#ddlMaterialName").select2({
        placeholder: "-Select Product-",
        allowClear: true,
        width: "100%"
    });
    $('#ddlCustomer').select2();
    // Set the current date in the desired format (e.g., YYYY-MM-DD)
    $('#ddlDiamondCertificate1').select2();
    $('#ddlDiamondCertificate2').select2();
    $('#ddlDiamondCertificate3').select2();
    $('#ddlDiamondCertificate4').select2();
    $("#txtOrderDate").val(currentDate);

    // Trigger change event to format the date display
    $("#txtOrderDate").trigger("change");

    // Change event handler to set the data-date attribute
    $("#txtOrderDate").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD").format(this.getAttribute("data-date-format"))
        );
    });
    $('.dcmlNo').keypress(function (event) {
        var value = $(this).val();
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
        if (value.indexOf('.') != -1) {
            var decimalPosition = value.indexOf('.');
            if (value.substring(decimalPosition + 1).length >= 1) {
                $(this).val(value.substring(0, decimalPosition + 4));
            }
        }
    });
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
                    AddJobDetails();
                    $('#ddlMaterialName').focus();
                }
            }
        });
    });
    $("#imgupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgPhoto")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    $("#txtCustomerImage").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgCustomer")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    $("#txtFinishedFinalImage").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgFinishedFinal")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    $("#txtAdditionalImage").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgAdditional")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    $("#txtCadImage").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgCad")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

var loanAppId = "";
function ViewFile(Id) {
    if (loanAppId) {
        window.open("wfMnfJlrJobCardMaster_display.aspx?id=" + loanAppId + "&vId=" + Id);
    }
}
function BindDiamondCertificateList() {
    $.ajax({
        type: "POST",
        url: 'wfMnfJlrJobCardMaster.aspx/DiamondCertificateList',
        data: JSON.stringify({
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlDiamondCertificate1').select2('destroy');
            $('#ddlDiamondCertificate1').html('');
            $('#ddlDiamondCertificate2').select2('destroy');
            $('#ddlDiamondCertificate2').html('');
            $('#ddlDiamondCertificate3').select2('destroy');
            $('#ddlDiamondCertificate3').html('');
            $('#ddlDiamondCertificate4').select2('destroy');
            $('#ddlDiamondCertificate4').html('');
            var data = JSON.parse(response.d);
            var aList = "<option value=''>-Select Diamond Certificate-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                aList = aList + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DiamondCertificateName + "</option>";
            }
            $('#ddlDiamondCertificate1').html(aList);
            $('#ddlDiamondCertificate1').select2();
            $('#ddlDiamondCertificate2').html(aList);
            $('#ddlDiamondCertificate2').select2();
            $('#ddlDiamondCertificate3').html(aList);
            $('#ddlDiamondCertificate3').select2();
            $('#ddlDiamondCertificate4').html(aList);
            $('#ddlDiamondCertificate4').select2();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            var a = '';
        }
    });

}
function FetchCertificate(id, elementid) {
    var e = elementid;
    var Id = id.id;
    if ($(Id).val() != '') {
        $.ajax({
            type: "POST",
            url: 'wfMnfJlrJobCardMaster.aspx/FetchCertificateUrlById',
            data: JSON.stringify({
                "id": $('#' + Id).val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $(e).val('');
                var data = JSON.parse(response.d);
                // Check if data is not null and has elements
                if (data && data.length > 0) {
                    $(e).val(data[0].CertificateUrlLink); // Set value if valid
                } else {
                    $(e).val(''); // Clear value if data is null or empty
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        $(e).val('');
    }
}
function BindMaterialMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMnfJlrJobCardMaster.aspx/MaterialMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].MaterialName + "</option>";
            }
            $('#ddlMaterialName').append(abranch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindCustomerMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMnfJlrJobCardMaster.aspx/CustomerMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CustomerName + "</option>";
            }
            $('#ddlCustomer').append(abranch);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfMnfJlrJobCardMaster.aspx/FetchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblMasterList').DataTable().clear();
            $('#tblMasterList').DataTable().destroy();
            $('#tbody_Master_List').html('');

            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr><td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + data[i].OrderDate + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].OrderNo != undefined ? data[i].OrderNo : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].ReferenceOrderNo != undefined ? data[i].ReferenceOrderNo : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].CustomerName != undefined ? data[i].CustomerName : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].OrderReceivedDate != undefined ? data[i].OrderReceivedDate : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].CadIssueDate != undefined ? data[i].CadIssueDate : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].CadApproveDate != undefined ? data[i].CadApproveDate : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].DiamondReceivedDate != undefined ? data[i].DiamondReceivedDate : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].DeliveryDate != undefined ? data[i].DeliveryDate : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].DiamondQuality != undefined ? data[i].DiamondQuality : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].PartyDiamond != undefined ? data[i].PartyDiamond : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].PartyDiamondReferenceNo != undefined ? data[i].PartyDiamondReferenceNo : '') + '</td>'
                    + '<td onclick="FetchJobCardById(\'' + data[i].MasterId + '\');">' + (data[i].Type != undefined ? data[i].Type : '') + '</td>'
                    + '</tr>';
            }
            $('#tbody_Master_List').html(html);
            $('#tblMasterList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
function CreateMaster() {
    $('#divMasterList').hide();
    $('#divMasterEntry').show();
    $('#divDetails').show();
    $('#btnSave').show();
    $('#txtCreatedBy').val($('#ContentPlaceHolder1_loginuser').val());
    ClearAll();
}
function ViewMasterList() {
    $('#btnViewFile').hide();
    $('#btnXLXFile').hide();
    $('#divMasterList').show();
    $('#divMasterEntry').hide();
    $('#divDetails').hide();
    $('#btnSave').hide();
    BindMasterList();
    
}
function ClearAll() {
    $('#tbody_JobDetails tr:first').show();
    $('#tbody_JobDetails').children('tr:not(:first)').remove();
    //$('#tbody_JobDetails').empty();
    $('#btnViewFile').hide();
    $('#btnXLXFile').hide();
    //$('#tbody_JobDetails tr:first').show();
    $('#ddlCustomer').prop('disabled', false);
    $('#txtOrderDate').removeAttr("readonly");
    $('#txtRefOrderNo').removeAttr("readonly");
    $('#txtOrderRecvDate').removeAttr("readonly");
    $('#txtCadIssueDate').removeAttr("readonly");
    $('#txtCadApproveDate').removeAttr("readonly");
    $('#txtDiamondReceivedDate').removeAttr("readonly");
    $('#txtDeliveryDate').removeAttr("readonly");
    $('#txtDiamondQuality').removeAttr("readonly");
    $('#txtPartyDiamond').removeAttr("readonly");
    $('#txtPartyDiamondReferenceNo').removeAttr("readonly");
    $('#txtType').removeAttr("readonly");
    $('#txtDescription').removeAttr("readonly");
    $('#txtDiamondWeight1').removeAttr("readonly");
    $('#txtDiamondPics1').removeAttr("readonly");
    $('#txtDiamondQuality1').removeAttr("readonly");
    $('#ddlDiamondCertificate1').prop('disabled', false);
    $('#txtCertificateNo1').removeAttr("readonly");
    //$('#txtURL1').removeAttr("readonly");
    $('#txtDiamondWeight2').removeAttr("readonly");
    $('#txtDiamondPics2').removeAttr("readonly");
    $('#txtDiamondQuality2').removeAttr("readonly");
    $('#ddlDiamondCertificate2').prop('disabled', false);
    $('#txtCertificateNo2').removeAttr("readonly");
    //$('#txtURL2').removeAttr("readonly");
    $('#txtDiamondWeight3').removeAttr("readonly");
    $('#txtDiamondPics3').removeAttr("readonly");
    $('#txtDiamondQuality3').removeAttr("readonly");
    $('#ddlDiamondCertificate3').prop('disabled', false);
    $('#txtCertificateNo3').removeAttr("readonly");
   // $('#txtURL3').removeAttr("readonly");
    $('#txtDiamondWeight4').removeAttr("readonly");
    $('#txtDiamondPics4').removeAttr("readonly");
    $('#txtDiamondQuality4').removeAttr("readonly");
    $('#ddlDiamondCertificate4').prop('disabled', false);
    $('#txtCertificateNo4').removeAttr("readonly");
    //$('#txtURL4').removeAttr("readonly");
    $('#txtId').val('');
    $('#ddlCustomer').val(null).trigger('change');
    //$('#ddlCustomer').val('');
    //$('#txtOrderDate').val('');
    $("#txtOrderDate").val(currentDate);
    $('#txtOrderNo').val('');
    $('#txtRefOrderNo').val('');
    $('#txtOrderRecvDate').val('');
    $('#txtCadIssueDate').val('');
    $('#txtCadApproveDate').val('');
    $('#txtDiamondReceivedDate').val('');
    $('#txtDeliveryDate').val('');
    $('#txtDiamondQuality').val('');
    $('#txtPartyDiamond').val('');
    $('#txtPartyDiamondReferenceNo').val('');
    $('#txtType').val('');
    $('#txtDescription').val('');
    $('#txtDiamondWeight1').val('');
    $('#txtDiamondPics1').val('');
    $('#txtDiamondQuality1').val('');
    $('#ddlDiamondCertificate1').val(null).trigger('change');
    $('#txtCertificateNo1').val('');
    $('#txtURL1').val('');
    $('#txtDiamondWeight2').val('');
    $('#txtDiamondPics2').val('');
    $('#txtDiamondQuality2').val('');
    $('#ddlDiamondCertificate2').val(null).trigger('change');
    $('#txtCertificateNo2').val('');
    $('#txtURL2').val('');
    $('#txtDiamondWeight3').val('');
    $('#txtDiamondPics3').val('');
    $('#txtDiamondQuality3').val('');
    $('#ddlDiamondCertificate3').val(null).trigger('change');
    $('#txtCertificateNo3').val('');
    $('#txtURL3').val('');
    $('#txtDiamondWeight4').val('');
    $('#txtDiamondPics4').val('');
    $('#txtDiamondQuality4').val('');
    $('#ddlDiamondCertificate4').val(null).trigger('change');
    $('#txtCertificateNo4').val('');
    $('#txtURL4').val('');
    $('#txtFinalUrl1').attr('href', 'javascript:void(0);');
    $('#txtFinalUrl1').removeAttr('target', '_blank');
    $('#txtFinalUrl2').attr('href', 'javascript:void(0);');
    $('#txtFinalUrl2').removeAttr('target', '_blank');
    $('#txtFinalUrl3').attr('href', 'javascript:void(0);');
    $('#txtFinalUrl3').removeAttr('target', '_blank');
    $('#txtFinalUrl4').attr('href', 'javascript:void(0);');
    $('#txtFinalUrl4').removeAttr('target', '_blank');
}
function DeleteRow(ele) {
    $(ele.parentElement.parentElement).remove();    
}
function AddJobDetails() {
    if ($('#ddlMaterialName').val() != '') {
                var selectedText = $('#ddlMaterialName option:selected').text(); // Get the selected option's visible text
                var selectedValue = $('#ddlMaterialName').val();
                                
                var imgcustomerSrc = $('#imgCustomer').attr('src');
                var imgcadSrc = $('#imgCad').attr('src');
                var imgfinalSrc = $('#imgFinishedFinal').attr('src');
                var imgadditionalSrc = $('#imgAdditional').attr('src');
                // Check if all image sources are empty
                if (!imgcustomerSrc && !imgcadSrc && !imgfinalSrc && !imgadditionalSrc) {
                    alertify.error('Please select at least one image.');
                    return; // Stop execution if no images are selected
                }
                
                $('#tbody_JobDetails').append('<tr>'
                    + '<td style="display: none;"></td><td style="display: none;"></td>'
                    + '<td>' + $("#txtSINo").val()  + '</td>'
                    + '<td>' + selectedText + '</td>'
                    + '<td>' + $("#txtDesignNo").val() + '</td>'
                    + '<td>' + '<img src="' + imgcustomerSrc + '" style="width:50px;height:50px;" />' + '</td>'
                    + '<td>' + '<img src="' + imgcadSrc + '" style="width:50px;height:50px;" />' + '</td>'
                    + '<td>' + '<img src="' + imgfinalSrc + '" style="width:50px;height:50px;" />' + '</td>'
                    + '<td>' + '<img src="' + imgadditionalSrc + '" style="width:50px;height:50px;" />' + '</td>'
                    + '<td>' + $("#txtApproxWeight").val() + '</td>'
                    + '<td>' + $("#txtPolish").val() + '</td>'
                    + '<td>' + $("#txtPcs").val() + '</td>'
                    + '<td>' + $("#txtSize").val() + '</td>'
                    + '<td>' + $("#txtLength").val() + '</td>'
                    + '<td>' + $("#txtDiamondWeight").val() + '</td>'
                    + '<td>' + $("#txtDiamondPices").val() + '</td>'
                    + '<td>' + $("#txtRemark").val() + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');

                // Clear input fields after adding row
                $('#ddlMaterialName').val(null).trigger('change');
                $('#txtSINo').val('');
                $("#txtDesignNo").val('');
                $("#txtCustomerImage").val('');
                $('#imgCustomer').attr('src', '');
                $('#customerUploadMessage').text('');
                $("#txtCadImage").val('');
                $('#imgCad').attr('src', '');
                $('#cadUploadMessage').text('');
                $('#txtFinishedFinalImage').val('');
                $('#imgFinishedFinal').attr('src', '');
                $('#finishedfinalUploadMessage').text('');
                $('#txtAdditionalImage').val('');
                $('#imgAdditional').attr('src', '');
                $('#additionalUploadMessage').text('');
                $("#txtApproxWeight").val('');
                $("#txtPolish").val('');
                $("#txtPcs").val('');
                $('#txtSize').val('');
                $("#txtLength").val('');
                $("#txtDiamondWeight").val('');
                $('#txtDiamondPices').val('');
                $('#txtRemark').val('');
             
    }
    else {
        alertify.error('Please select product');
    }
}
function AddJobCardMaster() {
    if ($('#ddlCustomer').val() != '') {
        if ($('#txtOrderDate').val() != '') {
            if ($('#txtRefOrderNo').val() != '') {
                var job_details = [];
                                   
                $('#tbody_JobDetails tr').each(function (index, tr) {
                    if (index > 0) {
                        var jobDetail = {};
                        $(tr).find('td').each(function (index, td) {
                            switch (index) {
                                case 2: // SINo
                                    jobDetail.SINo = $(td).text().trim();
                                    break;
                                case 3: // MaterialName
                                    var textContent = td.outerText;
                                        // Find the position of ':'
                                    var indexOfColon = textContent.indexOf(':');
                                    // Extract characters before ':'
                                    var extractedString;
                                    if (indexOfColon !== -1)
                                    {
                                       extractedString = textContent.substring(0, indexOfColon).trim();
                                    }
                                    else
                                    {
                                      extractedString = textContent.trim(); // If ':' is not found, return the whole text content trimmed
                                    }
                                    jobDetail.MaterialName = extractedString;
                                    
                                    //jobDetail.MaterialName = $(td).text().trim();
                                    break;
                                case 4: // DesignNo
                                    jobDetail.DesignNo = $(td).text().trim();
                                    break;
                                case 5: // CustomerImage
                                    jobDetail.CustomerImage = $(td).find('img').attr('src');
                                    break;
                                case 6: // CadImage
                                    jobDetail.CadImage = $(td).find('img').attr('src');
                                    break;
                                case 7: // FinishedFinalImage
                                    jobDetail.FinishedFinalImage = $(td).find('img').attr('src');
                                    break;
                                case 8: // AdditionalImage
                                    jobDetail.AdditionalImage = $(td).find('img').attr('src');
                                    break;
                                case 9: // ApproxWeight
                                    jobDetail.ApproxWeight = $(td).text().trim();
                                    break;
                                case 10: // Polish
                                    jobDetail.Polish = $(td).text().trim();
                                    break;
                                case 11: // Pcs
                                    jobDetail.Pcs = $(td).text().trim();
                                    break;
                                case 12: // Size
                                    jobDetail.Size = $(td).text().trim();
                                    break;
                                case 13: // Length
                                    jobDetail.Length = $(td).text().trim();
                                    break;
                                case 14: // DiamondWeight
                                    jobDetail.DiamondWeight = $(td).text().trim();
                                    break;
                                case 15: // DiamondPices
                                    jobDetail.DiamondPices = $(td).text().trim();
                                    break;
                                case 16: // Remark
                                    jobDetail.Remark = $(td).text().trim();
                                    break;
                            }
                        });
                        job_details.push(jobDetail); // Add each job detail to the array
                    }
                    });
                
                if (job_details.length > 0) {
                    $.ajax({
                        type: "POST",
                        url: 'wfMnfJlrJobCardMaster.aspx/AddJobMaster',
                        data: JSON.stringify({
                            "CustomerId": $('#ddlCustomer').val(),
                            "OrderDate": $('#txtOrderDate').val(),
                            "OrderNo": $('#txtOrderNo').val(),
                            "RefOrderNo": $('#txtRefOrderNo').val(),
                            "OrderRecvDate": $('#txtOrderRecvDate').val(),
                            "CadIssueDate": $('#txtCadIssueDate').val(),
                            "CadApproveDate": $('#txtCadApproveDate').val(),
                            "DiamondReceivedDate": $('#txtDiamondReceivedDate').val(),
                            "DeliveryDate": $('#txtDeliveryDate').val(),
                            //"DiamondQuality": $('#txtDiamondQuality').val(),
                            "DiamondQuality": '',
                            "PartyDiamond": $('#txtPartyDiamond').val(),
                            "PartyDiamondReferenceNo": $('#txtPartyDiamondReferenceNo').val(),
                            "Type": $('#txtType').val(),
                            "Description": $('#txtDescription').val(),
                            "Job_details": job_details,
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "DiamondWeight1": $('#txtDiamondWeight1').val(),
                            "DiamondPics1": $('#txtDiamondPics1').val(),
                            "DiamondQuality1": $('#txtDiamondQuality1').val(),
                            "DiamondCertificate1": $('#ddlDiamondCertificate1').val(),
                            "CertificateNo1": $('#txtCertificateNo1').val(),
                            "URL1": $('#txtURL1').val(),
                            "DiamondWeight2": $('#txtDiamondWeight2').val(),
                            "DiamondPics2": $('#txtDiamondPics2').val(),
                            "DiamondQuality2": $('#txtDiamondQuality2').val(),
                            "DiamondCertificate2": $('#ddlDiamondCertificate2').val(),
                            "CertificateNo2": $('#txtCertificateNo2').val(),
                            "URL2": $('#txtURL2').val(),
                            "DiamondWeight3": $('#txtDiamondWeight3').val(),
                            "DiamondPics3": $('#txtDiamondPics3').val(),
                            "DiamondQuality3": $('#txtDiamondQuality3').val(),
                            "DiamondCertificate3": $('#ddlDiamondCertificate3').val(),
                            "CertificateNo3": $('#txtCertificateNo3').val(),
                            "URL3": $('#txtURL3').val(),
                            "DiamondWeight4": $('#txtDiamondWeight4').val(),
                            "DiamondPics4": $('#txtDiamondPics4').val(),
                            "DiamondQuality4": $('#txtDiamondQuality4').val(),
                            "DiamondCertificate4": $('#ddlDiamondCertificate4').val(),
                            "CertificateNo4": $('#txtCertificateNo4').val(),
                            "URL4": $('#txtURL4').val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                alertify.success('Job Card added successfully');
                                ClearAll();
                            }
                            else {
                                console.log("response:", r);
                                console.log("error log:", r.msg);
                                alertify.error('Something went wrong, please try again later');
                            }

                        },
                        failure: function (response) {
                            var r = JSON.parse(response.d);
                            console.log("error log:", r.msg);
                            alertify.error('failure. Something went wrong, please try again later');
                        },
                        error: function (response) {
                            console.log(response);
                            var r = JSON.parse(response.statusText);
                            console.log("error log:", r);
                            alertify.error('Error. Something went wrong, please try again later');
                        }
                    });

                }
                else {
                    alertify.error('Please add Job details');
                }
            }
            else {
                alertify.error('Please enter refeerence order no');
            }
        }
        else {
            alertify.error('Please enter order date');
        }
    }
    else {
        alertify.error('Please select customer');
    }
}
function OpenFileUploader() {
    $('#imgupload').click();
}
function HandleCustomerUpload() {

    // Show upload success message using jQuery
    $('#customerUploadMessage').text('Customer Image uploaded successfully.');
}
function OpenCustomerImageUploader() {
    $('#txtCustomerImage').click();
}
function HandleCadUpload() {

    // Show upload success message using jQuery
    $('#cadUploadMessage').text('Cad Image uploaded successfully.');
}
function OpenCadImageUploader() {
    $('#txtCadImage').click();
}
function HandleFinishedFinalUpload() {

    // Show upload success message using jQuery
    $('#finishedfinalUploadMessage').text('Finished Final Image uploaded successfully.');
}
function OpenFinishedFinalImageUploader() {
    $('#txtFinishedFinalImage').click();
}
function HandleAdditionalUpload() {

    // Show upload success message using jQuery
    $('#additionalUploadMessage').text('Additional Image uploaded successfully.');
}
function OpenAdditionalImageUploader() {
    $('#txtAdditionalImage').click();
}
function FetchJobCardById(id) {
    $.ajax({
        type: "POST",
        url: 'wfMnfJlrJobCardMaster.aspx/FetchJobCardById',
        data: JSON.stringify({
            "MasterId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            //ClearAll();
            $('#divMasterList').hide();
            $('#divMasterEntry').show();
            $('#btnSave').hide();
            $('#btnViewFile').show();
            $('#btnXLXFile').show();
            //$('#ddlCustomer').attr("readonly", "readonly");
            $('#ddlCustomer').prop('disabled', true);
            $('#txtOrderDate').attr("readonly", "readonly");
            $('#txtRefOrderNo').attr("readonly", "readonly");
            $('#txtOrderRecvDate').attr("readonly", "readonly");
            $('#txtCadIssueDate').attr("readonly", "readonly");
            $('#txtCadApproveDate').attr("readonly", "readonly");
            $('#txtDiamondReceivedDate').attr("readonly", "readonly");
            $('#txtDeliveryDate').attr("readonly", "readonly");
            $('#txtDiamondQuality').attr("readonly", "readonly");
            $('#txtPartyDiamond').attr("readonly", "readonly");
            $('#txtPartyDiamondReferenceNo').attr("readonly", "readonly");
            $('#txtType').attr("readonly", "readonly");
            $('#txtDescription').attr("readonly", "readonly");
            $('#txtDiamondWeight1').attr("readonly", "readonly");
            $('#txtDiamondPics1').attr("readonly", "readonly");
            $('#txtDiamondQuality1').attr("readonly", "readonly");
            $('#ddlDiamondCertificate1').prop('disabled', true);
            $('#txtCertificateNo1').attr("readonly", "readonly");
            $('#txtURL1').attr("readonly", "readonly");
            $('#txtDiamondWeight2').attr("readonly", "readonly");
            $('#txtDiamondPics2').attr("readonly", "readonly");
            $('#txtDiamondQuality2').attr("readonly", "readonly");
            $('#ddlDiamondCertificate2').prop('disabled', true);
            $('#ddlDiamondCertificate1').prop('disabled', true);
            $('#txtCertificateNo2').attr("readonly", "readonly");
            $('#txtURL2').attr("readonly", "readonly");
            $('#txtDiamondWeight3').attr("readonly", "readonly");
            $('#txtDiamondPics3').attr("readonly", "readonly");
            $('#txtDiamondQuality3').attr("readonly", "readonly");
            $('#ddlDiamondCertificate3').prop('disabled', true);
            $('#txtCertificateNo3').attr("readonly", "readonly");
            $('#txtURL3').attr("readonly", "readonly");
            $('#txtDiamondWeight4').attr("readonly", "readonly");
            $('#txtDiamondPics4').attr("readonly", "readonly");
            $('#txtDiamondQuality4').attr("readonly", "readonly");
            $('#ddlDiamondCertificate4').prop('disabled', true);
            $('#txtCertificateNo4').attr("readonly", "readonly");
            $('#txtURL4').attr("readonly", "readonly");
            var data = JSON.parse(response.d);
            if (data && data.length > 0) {
            loanAppId = data[0].MasterId;
            $('#txtId').val(data[0].MasterId);
            $('#ddlCustomer').val(data[0].CustomerId).trigger('change');
            $('#txtOrderNo').val(data[0].OrderNo);
            $('#txtOrderDate').val(data[0].OrderDate);
            $('#txtRefOrderNo').val(data[0].ReferenceOrderNo);
            $('#txtOrderRecvDate').val(data[0].OrderReceivedDate);
            $('#txtCadIssueDate').val(data[0].CadIssueDate);
            $('#txtCadApproveDate').val(data[0].CadApproveDate);
            $('#txtDiamondReceivedDate').val(data[0].DiamondReceivedDate);
            $('#txtDeliveryDate').val(data[0].DeliveryDate);
            $('#txtDiamondQuality').val(data[0].DiamondQuality);
            $('#txtPartyDiamond').val(data[0].PartyDiamond);
            $('#txtPartyDiamondReferenceNo').val(data[0].PartyDiamondReferenceNo);
            $('#txtType').val(data[0].Type);
            $('#txtDiamondWeight1').val(data[0].DiamondWeight1);
            $('#txtDiamondPics1').val(data[0].DiamondPics1);
            $('#txtDiamondQuality1').val(data[0].DiamondQuality1);
            //$('#ddlDiamondCertificate1').val(data[0].DiamondCertificate1);
            $('#ddlDiamondCertificate1').val(data[0].DiamondCertificate1).trigger('change');
            $('#txtCertificateNo1').val(data[0].CertificateNo1);
            $('#txtURL1').val(data[0].URL1); 
            $('#txtFinalUrl1').attr('href', data[0].FinalUrl1 ? data[0].FinalUrl1 : 'javascript:void(0);');
            if (data[0].FinalUrl1) {
            $('#txtFinalUrl1').attr('target', '_blank');
            }
            $('#txtFinalUrl2').attr('href', data[0].FinalUrl2 ? data[0].FinalUrl2 : 'javascript:void(0);');
            if (data[0].FinalUrl2) {
              $('#txtFinalUrl2').attr('target', '_blank');
            }
            $('#txtFinalUrl3').attr('href', data[0].FinalUrl3 ? data[0].FinalUrl3 : 'javascript:void(0);');
             if (data[0].FinalUrl3) {
                 $('#txtFinalUrl3').attr('target', '_blank');
            }
            $('#txtFinalUrl4').attr('href', data[0].FinalUrl4 ? data[0].FinalUrl4 : 'javascript:void(0);');
            if (data[0].FinalUrl4) {
              $('#txtFinalUrl4').attr('target', '_blank');
            }
            $('#txtDiamondWeight2').val(data[0].DiamondWeight2);
            $('#txtDiamondPics2').val(data[0].DiamondPics2);
            $('#txtDiamondQuality2').val(data[0].DiamondQuality2);
            $('#ddlDiamondCertificate2').val(data[0].DiamondCertificate2).trigger('change');
            $('#txtCertificateNo2').val(data[0].CertificateNo2);
            $('#txtURL2').val(data[0].URL2);
            $('#txtDiamondWeight3').val(data[0].DiamondWeight3);
            $('#txtDiamondPics3').val(data[0].DiamondPics3);
            $('#txtDiamondQuality3').val(data[0].DiamondQuality3);
            $('#ddlDiamondCertificate3').val(data[0].DiamondCertificate3).trigger('change');
            $('#txtCertificateNo3').val(data[0].CertificateNo3);
            $('#txtURL3').val(data[0].URL3);
            $('#txtDiamondWeight4').val(data[0].DiamondWeight4);
            $('#txtDiamondPics4').val(data[0].DiamondPics4);
            $('#txtDiamondQuality4').val(data[0].DiamondQuality4);
            $('#ddlDiamondCertificate4').val(data[0].DiamondCertificate4).trigger('change');
            $('#txtCertificateNo4').val(data[0].CertificateNo4);
            $('#txtURL4').val(data[0].URL4);
                FetchJobCardDetailsById(id);
            } else {
                $('#txtFinalUrl1').attr('href', 'javascript:void(0);');
                $('#txtFinalUrl1').removeAttr('target', '_blank');
                $('#txtFinalUrl2').attr('href', 'javascript:void(0);');
                $('#txtFinalUrl2').removeAttr('target', '_blank');
                $('#txtFinalUrl3').attr('href', 'javascript:void(0);');
                $('#txtFinalUrl3').removeAttr('target', '_blank');
                $('#txtFinalUrl4').attr('href', 'javascript:void(0);');
                $('#txtFinalUrl4').removeAttr('target', '_blank');
            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function FetchJobCardDetailsById(MasterId) {
    $('#divDetails').show();
    $.ajax({
        type: "POST",
        url: 'wfMnfJlrJobCardMaster.aspx/FetchJobCardDetailsById',
        data: JSON.stringify({
            "MasterId": MasterId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var html = '';
            //$('#tbody_JobDetails').empty();
            $('#tbody_JobDetails tr:first').hide();
            $('#tbody_JobDetails').children('tr:not(:first)').remove();
            for (var i = 0; i < data.length; i++) {
                $('#tbody_JobDetails').append('<tr><td style="display: none;"></td><td style = "display: none;" ></td>'
                    + '<td>' + data[i].SlNo + '</td>'
                    + '<td>' + data[i].ProductId + ': ' + data[i].MaterialName + '</td>'
                    + '<td>' + data[i].DesignNo + '</td>'
                    + '<td><img src="data:image/png;base64,' + data[i].CustomerImage + '" style="width:100px;height:100px;"/></td>'
                    + '<td><img src="data:image/png;base64,' + data[i].CadImage + '" style="width:100px;height:100px;"/></td>'
                    + '<td><img src="data:image/png;base64,' + data[i].FinishedFinalImage + '" style="width:100px;height:100px;"/></td>'
                    + '<td><img src="data:image/png;base64,' + data[i].AdditionalImage + '" style="width:100px;height:100px;"/></td>'
                    + '<td>' + data[i].ApproxWeight + '</td>'
                    + '<td>' + data[i].Polish + '</td>'
                    + '<td>' + data[i].Pcs + '</td>'
                    + '<td>' + data[i].Size + '</td>'
                    + '<td>' + data[i].Length + '</td>'
                    + '<td>' + data[i].DiamondWeight + '</td>'
                    + '<td>' + data[i].DiamondPices + '</td>'
                    + '<td>' + data[i].Remark + '</td>'
                    + '</tr>');
            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}