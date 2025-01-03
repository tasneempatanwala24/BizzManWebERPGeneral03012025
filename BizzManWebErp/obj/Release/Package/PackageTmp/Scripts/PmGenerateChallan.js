$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    //$('#ddlCustomer').select2();
    GenerateChallanNo();
    $('#createDiv').hide();
    $('#btnsave').click(function () {

        // Store the value in sessionStorage

        var hdnChallanNo = $('#txtChallanNo').val();
        sessionStorage.setItem('hdnChallanNo', hdnChallanNo);

        var hdnCustomerName = sessionStorage.getItem('hdnCustomerName');
        $('#hdnCustomerName').val(hdnCustomerName);

        // Redirect to Dispatch status form

        window.location.href = 'wfPmDispatchStatus.aspx';
    });

});

function ClearAll() {
    // $('#txtCompanyName').removeAttr("readonly", "readonly");
    $("#txtChallanNo").val('');
    $("#txtDate").val('');
    $("#txtContactPerson").val('');
    $("#ddlDeliveryStatus").val('');
    // $("#ContentPlaceHolder1_hfId").val("0");
    //    $('#btnSave').html('Save');
}

function GenerateChallanNo() {
    //debugger;
    if ($('#txtChallanNo').val() =='') {

        // Generate a random 4-digit number
        var randomFourDigits = ('00000000' + Math.floor(Math.random() * 10000000)).slice(-8);

        // Create the orderId
        var challanNo = 'CH' + randomFourDigits;

        // Display the orderId
        $('#txtChallanNo').val(challanNo);
    }
    else {
        $('#txtChallanNo').val('');
    }
}
function CreateCustomer() {
    
    $('#createDiv').show();
    $('#btnsave').show();
  

    //ClearAll();
}

function AddChallanDetails() {
    var IsUpdate = 0;
    if ($('#btnsave').html() == 'Update') {
        IsUpdate = 1;
    }

    $.ajax({

        type: "POST",
        url: 'wfPmGenerateChallan.aspx/AddChallanDetails',
        data: JSON.stringify({
            "challanNo": $('#txtChallanNo').val().trim(),
            "date": $('#txtDate').val().trim(),
            "contactPerson": $('#txtContactPerson').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            if ($('#btnsave').html() == 'Update') {
                alertify.success("Challan details updated successfully");
            }
            else {
                alertify.success("Challan Details  added successfully");
                ClearAll();
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }

    });


    //}
    //                    else {
    //                        alertify.error("Please enter Email.");
    //                    }
    //                }
    //                else {
    //                    alertify.error("Please Enter Post Code");
    //                }
    //            }
    //            else {
    //                alertify.error("Please Enter summary");
    //            }
    //        }
    //        else {
    //            alertify.error("Please Enter Phone Number");
    //        }
    //    }
    //    else {
    //        alertify.error("Customer Name already available");
    //    }
    //},
    // complete: function () {

    //},
    //failure: function (jqXHR, textStatus, errorThrown) {

}