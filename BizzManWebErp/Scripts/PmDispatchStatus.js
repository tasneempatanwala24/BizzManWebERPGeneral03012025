$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    // Retrieve the value from sessionStorage
    var hdnCustomerName = sessionStorage.getItem('hdnCustomerName');
    $('#txtCustomerName').val(hdnCustomerName);
    var hdnChallanNo = sessionStorage.getItem('hdnChallanNo');
    $('#txtChallanNo').val(hdnChallanNo);
    
});
function ClearAll() {
   // $('#txtCompanyName').removeAttr("readonly", "readonly");
    $("#txtChallanNo").val('');
    $("#txtCustomerName").val('');
    $("#txtDueDate").val('');
    $("#ddlDeliveryStatus").val('');
   // $("#ContentPlaceHolder1_hfId").val("0");
//    $('#btnSave').html('Save');
}
function AddDispatchStatusDetails() {
    var IsUpdate = 0;
    if ($('#btnsave').html() == 'Update') {
        IsUpdate = 1;
    }

    $.ajax({

        type: "POST",
        url: 'wfPmDispatchStatus.aspx/AddDispatchStatusDetails',
        data: JSON.stringify({
            //"ActivityId": $('txtSummary.text').val().trim(),
            "challanNo": $('#txtChallanNo').val().trim(),
            "clientname": $('#txtCustomerName').val().trim(),
            "duedate": $('#txtDueDate').val().trim(),
            "deliverystatus": $('#ddlDeliveryStatus').val().trim(),
            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            if ($('#btnsave').html() == 'Update') {
                alertify.success("Dispatch Delivery details updated successfully");
            }
            else {
                alertify.success("Dispatch Delivery Details added successfully");
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