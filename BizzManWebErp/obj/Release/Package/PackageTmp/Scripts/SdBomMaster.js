$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#ddlMaterialName').select2({
        allowClear: true,
        width: "100%"
    });
    //$('#ddlBranch').select2({
    //    allowClear: true,
    //    width:"100%"
    //});
    //BindMaterialList();
    BindActiveDropdown();
    BindUnitMeasureDropdown();
    BindBranchDropdown();
    BindMaterialMasterList();
    BindSDBOMMasterList();
    $('.dcmlNo').keypress(function (event) {
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
    //$('#txtDeliveryCharges').keydown(function () {
    //    var deliveryCharge = parseFloat($('#txtDeliveryCharges').val()) || 0; // Get the value from delivery charges textbox and parse as float, defaulting to 0 if empty
    //    var total = parseFloat($('#txtTotalAmount').val()) || 0; // Parse total amount as float, defaulting to 0 if empty

    //    var newTotal = total + deliveryCharge; // Calculate new total amount

    //    // Update total amount textbox
    //    $('#txtTotalAmount').val(newTotal.toFixed(2)); // Ensure toFixed(2) for two decimal places
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
                if (nxtIdx == $inp.length) {
                    AddSDBOMDetails();
                    $('#ddlMaterialName').focus();
                }
            }
        });
    });
    //$('#txtDiscountPercent').keydown(function (event) {
    //    // Check if the key pressed is Enter (keyCode 13)
    //    if (event.keyCode === 13) {
    //        // Prevent the default action (form submission)
    //        event.preventDefault();
    //        var st1 = 0, dv = 0, st = 0, rate = 0, q = 0, dp = 0;
    //        rate = $('#txtRateInclTax').val();
    //        q = $('#txtBOMQty').val();
    //        dp = $('#txtDiscountPercent').val();
    //        st1 = (rate * q);
    //        dv = (st1 * (dp / 100));
    //        st = st1 - dv;
    //        $('#txtSubTotal').val(st);
    //    }
    //});
    $('#txtBOMQty').on('keydown keyup', function (event) {
        // Check if the key pressed is Enter (keyCode 13) or if it's a mouse click release
        if (event.type === 'keydown' && event.keyCode !== 13) {
            return; // If key pressed is not Enter, exit the function
        }

        // Prevent the default action (form submission)
        event.preventDefault();
        var st1 = 0, dv = 0, st = 0, rate = 0, q = 0, dp = 0;
        rate = isEmpty($('#txtRateInclTax').val()) ? "0" : $('#txtRateInclTax').val().trim();
        q = isEmpty($('#txtBOMQty').val()) ? "0" : $('#txtBOMQty').val().trim();;
        dp = isEmpty($('#txtDiscountPercent').val()) ? "0" : $('#txtDiscountPercent').val().trim();

        // Check if any of the values are NaN (Not-a-Number)
        if (isNaN(rate) || isNaN(q)) {
            // Handle the case where inputs are not valid numbers
            console.log("Invalid input detected.");
            return; // Exit function
        }

        st1 = rate * q;
        dv = st1 * (dp / 100);
        st = st1 - dv;

        $('#txtSubTotal').val(st.toFixed(2)); // Limiting to 2 decimal places
    });
    $('#txtRateInclTax').on('keydown keyup', function (event) {
        // Check if the key pressed is Enter (keyCode 13) or if it's a mouse click release
        if (event.type === 'keydown' && event.keyCode !== 13) {
            return; // If key pressed is not Enter, exit the function
        }

        // Prevent the default action (form submission)
        event.preventDefault();

        var st1 = 0, dv = 0, st = 0, rate = 0, q = 0, dp = 0;
        rate = isEmpty($('#txtRateInclTax').val()) ? "0" : $('#txtRateInclTax').val().trim();
        q = isEmpty($('#txtBOMQty').val()) ? "0" : $('#txtBOMQty').val().trim();;
        dp = isEmpty($('#txtDiscountPercent').val()) ? "0" : $('#txtDiscountPercent').val().trim();

        // Check if any of the values are NaN (Not-a-Number)
        if (isNaN(rate) || isNaN(q)) {
            // Handle the case where inputs are not valid numbers
            console.log("Invalid input detected.");
            return; // Exit function
        }

        st1 = rate * q;
        dv = st1 * (dp / 100);
        st = st1 - dv;

        $('#txtSubTotal').val(st.toFixed(2)); // Limiting to 2 decimal places
    });
    $('#txtDiscountPercent').on('keydown keyup', function (event) {
        // Check if the key pressed is Enter (keyCode 13) or if it's a mouse click release
        if (event.type === 'keydown' && event.keyCode !== 13) {
            return; // If key pressed is not Enter, exit the function
        }

        // Prevent the default action (form submission)
        event.preventDefault();

        var st1 = 0, dv = 0, st = 0, rate = 0, q = 0, dp = 0;
        rate = isEmpty($('#txtRateInclTax').val()) ? "0" : $('#txtRateInclTax').val().trim();
        q = isEmpty($('#txtBOMQty').val()) ? "0" : $('#txtBOMQty').val().trim();;
        dp = isEmpty($('#txtDiscountPercent').val()) ? "0" : $('#txtDiscountPercent').val().trim();

        // Check if any of the values are NaN (Not-a-Number)
        if (isNaN(rate) || isNaN(q)) {
            // Handle the case where inputs are not valid numbers
            console.log("Invalid input detected.");
            return; // Exit function
        }

        st1 = rate * q;
        dv = st1 * (dp / 100);
        st = st1 - dv;

        $('#txtSubTotal').val(st.toFixed(2)); // Limiting to 2 decimal places
    });

});
var loanAppId = "";
function ViewFile() {
    if (loanAppId) {
        window.open("wfSdBomMaster_display.aspx?id=" + loanAppId);
    }
}
function BindMaterialMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/MaterialMasterList',
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
function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#ddlBranch').html('');
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);
            //$('#ddlBranch').val("HO");
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function BindUnitMeasureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/UnitMeasureList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            $('#ddlUnitMeasure').html('');
            var data = JSON.parse(response.d);
            var req = "<option value=''>-Select Unit Measure-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                req = req + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].UnitMesureName + "</option>";
            }
            $('#ddlUnitMeasure').append(req);
            //$('#ddlUnitMesure').append(req);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });


}
function BindActiveDropdown() {
    $('#ddlActive').html('');
    var html = "<option value=''>-Select Active-</option>";
    html = html + "<option value='y'>Y</option><option value='n'>N</option>";
    $('#ddlActive').html(html);
    $('#ddlActive').val("y");
}
function BindSDBOMMasterList() {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/FetchSDBOMMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblList').DataTable().clear();
            $('#tblList').DataTable().destroy();
            $('#tbody_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchSDBOMById(\'' + data[i].Id + '\')"><td style="display:none;">' + data[i].Id + '</td>'
                    + '<td>' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td>'
                    + '<td>' + (data[i].ItemName != undefined ? data[i].ItemName : '') + '</td>'
                    + '<td>' + (data[i].Qty != undefined ? data[i].Qty : '') + '</td>'
                    + '<td>' + (data[i].UnitMesureName != undefined ? data[i].UnitMesureName : '') + '</td>'
                    + '<td>' + (data[i].DeliveryCharges != undefined ? data[i].DeliveryCharges : '') + '</td>'
                    + '<td>' + (data[i].TotalCentralTax != undefined ? data[i].TotalCentralTax : '') + '</td>'
                    + '<td>' + (data[i].TotalStateTax != undefined ? data[i].TotalStateTax : '') + '</td>'
                    + '<td>' + (data[i].TotalCessTax != undefined ? data[i].TotalCessTax : '') + '</td>'
                    + '<td>' + (data[i].TotalIntegratedTax != undefined ? data[i].TotalIntegratedTax : '') + '</td>'
                    + '<td>' + (data[i].SubTotalAmout != undefined ? data[i].SubTotalAmout : '') + '</td>'
                    + '<td>' + (data[i].TotalAmount != undefined ? data[i].TotalAmount : '') + '</td>'
                    
                    + '</tr>';
            }
            $('#tbody_List').html(html);
            $('#tblList').DataTable();
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
//edit
function FetchSDBOMById(id) {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/FetchSDBOMListById',
        data: JSON.stringify({
            "MasterId": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            $('#divList').hide();
            $('#divEntry').show();
            $('#btnView').show();
            $("#btnSave").html('Update');
            $('#txtItemName').attr("readonly", "readonly");
            $('#txtAlias').attr("readonly", "readonly");
            $('#ddlUnitMeasure, #ddlBranch').prop('disabled', true);
            $('#txtQty').attr("readonly", "readonly");
            $('#txtDeliveryCharges').attr("readonly", "readonly");
            //$('#txtId').attr("readonly", "readonly");
            $("#btnSave").show();
            var data = JSON.parse(response.d);
            $('#txtId').val(data[0].Id);
            loanAppId = data[0].Id;
            $('#ddlBranch').val(data[0].BranchCode);
            $('#txtItemName').val(data[0].ItemName);
            $('#txtAlias').val(data[0].Alias);
            $('#txtQty').val(data[0].Qty);
            $('#ddlUnitMeasure').val(data[0].UnitMeasure);
            $('#txtTotalCentralTax').val(data[0].TotalCentralTax);
            $('#txtTotalStateTax').val(data[0].TotalStateTax);
            $('#txtTotalCessTax').val(data[0].TotalCess);
            $('#txtTotalIntegratedTax').val(data[0].TotalIntegratedTax);
            $('#txtTotalTax').val(data[0].TotalTax);
            $('#txtDeliveryCharges').val(data[0].DeliveryCharges);
            $('#txtTotalAmount').val(data[0].TotalAmount);
            $('#ddlActive').val(data[0].Active);
            FetchSDBOMDetailsList(id);
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function FetchTaxDetailsByMaterialId(id) {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/FetchTaxDetailsByMaterialId',
        data: JSON.stringify({
            "Id": id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            
            var data = JSON.parse(response.d);
            if (data != null && data != '') {
                $('#txtCentralTaxPercent').val(data[0].CentralTaxPercent);
                $('#txtStateTaxPercent').val(data[0].StateTaxPercent);
                $('#txtCessPercent').val(data[0].CessPercent);
                $('#txtIntegratedTaxPercent').val(data[0].IntegratedTaxPercent);
                $('#txtMRP').val(data[0].MRP);
                $('#txtRateInclTax').val(data[0].RateInclTax);
                $('#ddlUnitMesure').html("<option value='" + data[0].UnitMesure + "'>" + data[0].UnitMesure + "</option>");
                
            }
            else {
                $('#txtCentralTaxPercent').val('0');
                $('#txtStateTaxPercent').val('0');
                $('#txtCessPercent').val('0');
                $('#txtIntegratedTaxPercent').val('0');
                $('#txtMRP').val('0');
                $('#txtRateInclTax').val('0');
                $('#ddlUnitMesure').html("<option value=''>Select Unit Measure</option>");
            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function FetchSDBOMDetailsList(MasterId) {
    $.ajax({
        type: "POST",
        url: 'wfSdBomMaster.aspx/FetchSDBOMDetails',
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
            for (var i = 0; i < data.length; i++) {
                $('#tbody_Detail').append('<tr>'
                    + '<td>' + data[i].MaterialName + '</td>'
                    + '<td>' + data[i].Qty + '</td>'
                    + '<td>' + data[i].UnitMesure + '</td>'
                    + '<td>' + data[i].RateInclTax + '</td>'
                    + '<td>' + data[i].DiscountPercent + '</td>'
                    + '<td style="display:none;" class="central-tax">' + data[i].CentralTaxPercent + '</td>'
                    + '<td style="display:none;" class="state-tax">' + data[i].StateTaxPercent + '</td>'
                    + '<td style="display:none;" class="cess-tax">' + data[i].CessPercent + '</td>'
                    + '<td style="display:none;" class="int-tax">' + data[i].IntegratedTaxPercent + '</td>'
                    + '<td class="total-amt">' + data[i].SubTotal + '</td>'                    
                    + '<td>' + data[i].FixItem + '</td>'
                    + '<td style="display:none;">' + data[i].MRP + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');

            }
        },
        complete: function () {
        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function CreateList() {
    $('#divList').hide();
    $('#divEntry').show();
    $('#txtItemName').removeAttr("readonly");
    //$('#txtId').attr("readonly", "readonly");
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnView').hide();
    ClearAll();
}
function ViewMaterialList() {
    $('#divList').show();
    $('#divEntry').hide();
    $('#btnSave').hide();
    $('#btnView').hide();
    ClearAll();
    //$('#btnDisplayData').hide();
    BindSDBOMMasterList();
}
function ClearAll() {
    $('#txtItemName').removeAttr('readonly');
    $('#txtItemName').val('');
    $('#txtAlias').removeAttr('readonly');
    $('#txtAlias').val('');
    $('#txtQty').removeAttr('readonly');
    $('#txtQty').val('');
    $('#ddlUnitMeasure, #ddlBranch').prop('disabled', false);
    $('#ddlBranch').val('');
    $('#ddlActive').val('y');
    $('#ddlUnitMeasure').val('');
    $('#txtTotalCentralTax').val('');
    $('#txtTotalStateTax').val('');
    $('#txtTotalTax').val('');
    $('#txtDeliveryCharges').removeAttr('readonly');
    $('#txtDeliveryCharges').val('0');
    $('#txtTotalAmount').val('');
    $('#tbody_Detail').children('tr:not(:first)').remove();
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#txtId').val('');
    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnView').hide();
    $('#ddlMaterialName').val(null).trigger('change');
    $('#txtBOMQty').val('');
    $('#ddlUnitMesure').html("<option value=''>Select Unit Measure</option>");
    $('#txtRateInclTax').val('');
    $('#txtDiscountPercent').val('');
    $('#txtCentralTaxPercent').val('');
    $('#txtStateTaxPercent').val('');
    $('#txtCessPercent').val('');
    $('#txtIntegratedTaxPercent').val('');
    $('#txtSubTotal').val('');
    $('#txtMRP').val('');
}
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}
function DeleteRow(ele) {
    $(ele.parentElement.parentElement).remove();

    var totalCentralTax = 0;
    // Calculate and display total central tax
    $('.central-tax').each(function () {
        var centralTaxPercent = parseFloat($(this).text());
        totalCentralTax += centralTaxPercent;
    });
    $('#txtTotalCentralTax').val(totalCentralTax.toFixed(2));

    // Calculate and display total state tax
    var totalStateTax = 0;
    $('.state-tax').each(function () {
        var stateTaxPercent = parseFloat($(this).text());
        totalStateTax += stateTaxPercent;
    });
    $('#txtTotalStateTax').val(totalStateTax.toFixed(2));

    // Calculate and display total cess tax
    var totalCessTax = 0;
    $('.cess-tax').each(function () {
        var cessTaxPercent = parseFloat($(this).text());
        totalCessTax += cessTaxPercent;
    });
    $('#txtTotalCessTax').val(totalCessTax.toFixed(2));

    var totalIntegratedTax = 0;
    $('.int-tax').each(function () {
        var integratedTaxPercent = parseFloat($(this).text());
        totalIntegratedTax += integratedTaxPercent;
    });
    $('#txtTotalIntegratedTax').val(totalIntegratedTax.toFixed(2));

    // Update total tax textbox with sum of central and state tax
    var totalTax = totalCentralTax + totalStateTax + totalCessTax;
    $('#txtTotalTax').val(totalTax.toFixed(2));

    // Calculate and display total state tax
    var TotalAmount = 0;
    $('.total-amt').each(function () {
        var totalAmount = parseFloat($(this).text());
        TotalAmount += totalAmount;
    });
    $('#txtTotalAmount').val(TotalAmount.toFixed(2));
}
function AddDetails() {
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    var sd_bom_details = '';
    $('#tbody_Detail tr').each(function (index1, tr) {
        if (index1 > 0) {
            $(tr).find('td').each(function (index, td) {
                if (index1 == 1) {
                    if (sd_bom_details == '') {
                        if (index == 0) {
                            var textContent = td.outerText;

                            // Find the position of ':'
                            var indexOfColon = textContent.indexOf(':');

                            // Extract characters before ':'
                            var extractedString;

                            if (indexOfColon !== -1) {
                                extractedString = textContent.substring(0, indexOfColon).trim();
                            } else {
                                extractedString = textContent.trim(); // If ':' is not found, return the whole text content trimmed
                            }
                            //sd_bom_details = td.outerText;
                            sd_bom_details = extractedString;
                        }
                    }
                    else {
                        if (index == 0) {
                            
                            var textContent = td.outerText;

                            // Find the position of ':'
                            var indexOfColon = textContent.indexOf(':');

                            // Extract characters before ':'
                            var extractedString;

                            if (indexOfColon !== -1) {
                                extractedString = textContent.substring(0, indexOfColon).trim();
                            } else {
                                extractedString = textContent.trim(); // If ':' is not found, return the whole text content trimmed
                            }

                            sd_bom_details = sd_bom_details + '@' + extractedString;
                            //sd_bom_details = sd_bom_details + '@' + td.outerText;
                        }
                        else if (index == 1) {
                            sd_bom_details = sd_bom_details + '|' + td.outerText;
                        }
                        else if (index == 3) {
                            sd_bom_details = sd_bom_details + '$' + td.outerText;
                        }
                        else if (index == 4) {
                            sd_bom_details = sd_bom_details + '!' + td.outerText;
                        }
                        else if (index == 5) {
                            sd_bom_details = sd_bom_details + '_' + td.outerText;
                        }
                        else if (index == 6) {
                            sd_bom_details = sd_bom_details + '~' + td.outerText;
                        }
                        else if (index == 7) {
                            sd_bom_details = sd_bom_details + '#' + td.outerText;
                        }
                        else if (index == 8) {
                            sd_bom_details = sd_bom_details + '%' + td.outerText;
                        }
                        else if (index == 9) {
                            sd_bom_details = sd_bom_details + '/' + td.outerText;
                        }
                        else if (index == 10) {
                            sd_bom_details = sd_bom_details + '-' + td.outerText;
                        }
                        else if (index == 11) {
                            sd_bom_details = sd_bom_details + '`' + td.outerText;
                        }
                    }
                }
                else {
                    if (index == 0) {

                        var textContent = td.outerText;

                        // Find the position of ':'
                        var indexOfColon = textContent.indexOf(':');

                        // Extract characters before ':'
                        var extractedString;

                        if (indexOfColon !== -1) {
                            extractedString = textContent.substring(0, indexOfColon).trim();
                        } else {
                            extractedString = textContent.trim(); // If ':' is not found, return the whole text content trimmed
                        }

                        sd_bom_details = sd_bom_details + '@' + extractedString;
                        //sd_bom_details = sd_bom_details + '@' + td.outerText;
                    }
                    
                    else if (index == 1) {
                        sd_bom_details = sd_bom_details + '|' + td.outerText;
                    }
                    else if (index == 3) {
                        sd_bom_details = sd_bom_details + '$' + td.outerText;
                    }
                    else if (index == 4) {
                        sd_bom_details = sd_bom_details + '!' + td.outerText;
                    }
                    else if (index == 5) {
                        sd_bom_details = sd_bom_details + '_' + td.outerText;
                    }
                    else if (index == 6) {
                        sd_bom_details = sd_bom_details + '~' + td.outerText;
                    }
                    else if (index == 7) {
                        sd_bom_details = sd_bom_details + '#' + td.outerText;
                    }
                    else if (index == 8) {
                        sd_bom_details = sd_bom_details + '%' + td.outerText;
                    }
                    else if (index == 9) {
                        sd_bom_details = sd_bom_details + '/' + td.outerText;
                    }
                    else if (index == 10) {
                        sd_bom_details = sd_bom_details + '-' + td.outerText;
                    }
                    else if (index == 11) {
                        sd_bom_details = sd_bom_details + '`' + td.outerText;
                    }
                }
            });
        }
    });
    if ($('#txtItemName').val() == '') {
        alertify.error("Please enter Item Name");
        isValid = false;
    }
    else if ($('#txtQty').val() == '' || $('#txtQty').val() <=0) {
        alertify.error("Please enter Qty Correctly");
        isValid = false;
    }
    
    if (isValid) {
        
        $.ajax({
            type: "POST",
            url: 'wfSdBomMaster.aspx/CheckItemAvailability',
            data: JSON.stringify({ "ItemName": $('#txtItemName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
            },
            success: function (result) {
                var data = JSON.parse(result.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfSdBomMaster.aspx/AddDetails',
                        data: JSON.stringify({
                            "ItemName": $('#txtItemName').val().trim(),
                            //"BranchCode": isEmpty($('#ddlBranch').val()) ? "HO" : $('#ddlBranch').val().trim(),
                            "BranchCode": $('#ddlBranch').val(),
                            "UnitMeasure": $('#ddlUnitMeasure').val().trim(),
                            "Qty": isEmpty($('#txtQty').val()) ? "0" : $('#txtQty').val().trim(),
                            "TotalCentralTax": isEmpty($('#txtTotalCentralTax').val()) ? "0" : $('#txtTotalCentralTax').val().trim(),
                            "TotalStateTax": isEmpty($('#txtTotalStateTax').val()) ? "0" : $('#txtTotalStateTax').val().trim(),
                            "TotalAmount": isEmpty($('#txtTotalAmount').val()) ? "0" : $('#txtTotalAmount').val().trim(),
                            "TotalCess": isEmpty($('#txtTotalCessTax').val()) ? "0" : $('#txtTotalCessTax').val().trim(),
                            "TotalIntegrated": isEmpty($('#txtTotalIntegratedTax').val()) ? "0" : $('#txtTotalIntegratedTax').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "sd_bom_details": sd_bom_details,
                            "Active": isEmpty($('#ddlActive').val()) ? "y" : $('#ddlActive').val().trim(),
                            "DeliveryCharges": isEmpty($('#txtDeliveryCharges').val()) ? "0" : $('#txtDeliveryCharges').val().trim(),
                            "Master_Id": isEmpty($('#txtId').val()) ? "0" : $('#txtId').val().trim(),
                            "Alias": $('#txtAlias').val()
                            //"CentralTaxPercent": isEmpty($('#txtCentralTaxPercent').val()) ? "0" : $('#txtCentralTaxPercent').val().trim(),
                            //"StateTaxPercent": isEmpty($('#txtStateTaxPercent').val()) ? "0" : $('#txtStateTaxPercent').val().trim(),
                            //"CessPercent": isEmpty($('#txtCessPercent').val()) ? "0" : $('#txtCessPercent').val().trim(),
                            //"IntegratedTaxPercent": isEmpty($('#txtIntegratedTaxPercent').val()) ? "0" : $('#txtIntegratedTaxPercent').val().trim()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {
                        },
                        success: function (result) {
                            var r = JSON.parse(result.d);
                            if (r.status == "success") {
                                if ($('#btnSave').html() == 'Update') { alertify.success('Item updated successfully'); }
                                else { alertify.success('Item added successfully'); }
                                ClearAll();
                            }
                            else {
                                console.log("response:", r);
                                console.log("error log:", r.msg);
                                alertify.error('Something went wrong, please try again later');
                            }
                        },
                        failure: function (result) {
                            var r = JSON.parse(result.d);
                            console.log("error log:", r.msg);
                            alertify.error('failure. Something went wrong, please try again later');
                        },
                        error: function (result) {
                            console.log(result);
                            var r = JSON.parse(result.statusText);
                            console.log("error log:", r);
                            alertify.error('Error. Something went wrong, please try again later');
                        }
                    });
                }
                else {
                    alertify.error("Current Item Name already available");
                }
            },
            complete: function () {
            },
            failure: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}
function AddSDBOMDetails() {
    if ($('#ddlMaterialName').val() != '') {
        if ($('#txtBOMQty').val() != '' && $('#txtBOMQty').val() != '0') {
            if ($('#txtRateInclTax').val() != '' && $('#txtRateInclTax').val() != '0') {
                var selectedText = $('#ddlMaterialName option:selected').text(); // Get the selected option's visible text
                var selectedValue = $('#ddlMaterialName').val();
                var chkFixItemValue = $('#chkFixItem').is(':checked') ? 'Y' : 'N';
                var totalCentralTax = 0, SubTotal_1 = 0, SubTotal = 0, RateIncVal = 0, Qty = 0, DiscountPercent = 0;
                var CentralTaxValue = 0, StateTaxValue = 0, CessTaxValue = 0, DiscountValue = 0,IntegratedTax=0,MRP=0;
                var totalcentral = 0, totalstate = 0, totalcess = 0,totalIntegratedTax=0;
                RateIncTax = isEmpty($('#txtRateInclTax').val()) ? "0" : $('#txtRateInclTax').val().trim();
                Qty = isEmpty($('#txtBOMQty').val()) ? "0" : $('#txtBOMQty').val().trim();;
                DiscountPercent = isEmpty($('#txtDiscountPercent').val()) ? "0" : $('#txtDiscountPercent').val().trim();
                CentralTaxValue = $("#txtCentralTaxPercent").val();
                StateTaxValue = $("#txtStateTaxPercent").val();
                CessTaxValue = $("#txtCessPercent").val();
                IntegratedTax = $("#txtIntegratedTaxPercent").val();
                MRP = $("#txtMRP").val();
                SubTotal_1 = (RateIncTax * Qty);
                DiscountValue = (SubTotal_1 * (DiscountPercent / 100));
                SubTotal = SubTotal_1 - DiscountValue;
                totalcentral = (SubTotal * (CentralTaxValue / 100));
                totalstate = (SubTotal * (StateTaxValue / 100));
                totalcess = (SubTotal * (CessTaxValue / 100));
                totalIntegratedTax = (MRP*(IntegratedTax/100));
                $("#txtCentralTaxPercent").val(totalcentral);
                $("#txtStateTaxPercent").val(totalstate);
                $("#txtCessPercent").val(totalcess);
                $("#txtSubTotal").val(SubTotal);
                $("#txtIntegratedTaxPercent").val(totalIntegratedTax);
                // Append row to table
                $('#tbody_Detail').append('<tr>'
                    + '<td>' + selectedText + '</td>'
                    + '<td>' + Qty + '</td>'
                    + '<td>' + $("#ddlUnitMesure").val() + '</td>'
                    + '<td>' + RateIncTax + '</td>'
                    + '<td>' + DiscountPercent + '</td>'
                    + '<td style="display:none;" class="central-tax">' + $("#txtCentralTaxPercent").val() + '</td>'
                    + '<td style="display:none;" class="state-tax">' + $("#txtStateTaxPercent").val() + '</td>'
                    + '<td style="display:none;" class="cess-tax">' + $("#txtCessPercent").val() + '</td>'
                    + '<td style="display:none;" class="int-tax">' + $("#txtIntegratedTaxPercent").val() + '</td>'
                    + '<td class="total-amt">' + $("#txtSubTotal").val() + '</td>'
                    + '<td>' + chkFixItemValue + '</td>'
                    + '<td style="display:none;">' + $("#txtMRP").val() + '</td>'
                    
                    //+ '<td class="central-tax">' + $("#txtCentralTaxPercent").val(totalcentral) + '</td>'
                    //+ '<td class="state-tax">' + $("#txtStateTaxPercent").val(totalstate) + '</td>'
                    //+ '<td>' + $("#txtCessPercent").val(totalcess) + '</td>'
                    //+ '<td>' + $("#txtIntegratedTaxPercent").val() + '</td>'
                    //+ '<td>' + $("#txtMRP").val() + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');

                // Clear input fields after adding row
                $('#ddlMaterialName').val(null).trigger('change');
                $('#txtBOMQty').val('');
                $("#txtRateInclTax").val('');
                $("#txtDiscountPercent").val('');
                $("#txtSubTotal").val('');
                $('#ddlUnitMesure').val('');
                $('#chkFixItem').prop('checked', false); 
                // Calculate and display total central tax
                $('.central-tax').each(function () {
                    var centralTaxPercent = parseFloat($(this).text());
                    totalCentralTax += centralTaxPercent;
                });
                $('#txtTotalCentralTax').val(totalCentralTax.toFixed(2));

                // Calculate and display total state tax
                var totalStateTax = 0;
                $('.state-tax').each(function () {
                    var stateTaxPercent = parseFloat($(this).text());
                    totalStateTax += stateTaxPercent;
                });
                $('#txtTotalStateTax').val(totalStateTax.toFixed(2));

                // Calculate and display total cess tax
                var totalCessTax = 0;
                $('.cess-tax').each(function () {
                    var cessTaxPercent = parseFloat($(this).text());
                    totalCessTax += cessTaxPercent;
                });
                $('#txtTotalCessTax').val(totalCessTax.toFixed(2));

                var totalIntegratedTax = 0;
                $('.int-tax').each(function () {
                    var integratedTaxPercent = parseFloat($(this).text());
                    totalIntegratedTax += integratedTaxPercent;
                });
                $('#txtTotalIntegratedTax').val(totalIntegratedTax.toFixed(2));

                // Update total tax textbox with sum of central and state tax
                var totalTax = totalCentralTax + totalStateTax + totalCessTax;
                $('#txtTotalTax').val(totalTax.toFixed(2));

                // Calculate and display total state tax
                var TotalAmount = 0;
                $('.total-amt').each(function () {
                    var totalAmount = parseFloat($(this).text());
                    TotalAmount += totalAmount;
                });
                $('#txtTotalAmount').val(TotalAmount.toFixed(2));
            }
            else {
                alertify.error('Please enter rate');
            }
        }
        else {
            alertify.error('Please enter quantity');
        }
    }
    else {
        alertify.error('Please select material');
    }
}


