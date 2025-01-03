$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindSalesOrderList();
    BindEmployeeNames();    
    $('#createDiv').hide();
    $("tblPmCustomerMasterList").hide();
    $('#btnsave').click(function () {

        // Store the value in sessionStorage
        var clientName = $('#txtClientName').val();
        sessionStorage.setItem('hdnCustomerName', clientName);

        // Redirect to Generate Challan Page
        window.location.href = 'wfPmGenerateChallan.aspx';
    });
});

function ClearAll() {
    $('#ddlSalesOrderID').val('');
    $('#txtAssignmentDate').val('');
    $('#txtDeliveryDate').val('');
    $('#txtClientName').val('');
    $('#ddlAssign').val('');

}

function ViewCustomerList() {
    
    $('#DivCustomerList').show();
    $('#createDiv').hide();
    $("#btnsave").hide();
    BindProductDetailsList();
    $("#tblPmCustomerMasterList").hide();
    

    $("#divPmCustomerMasterList").hide();

}

function BindEmployeeNames() {
    $.ajax({
        type: "POST",
        url: 'wfPmProductDispatch.aspx/EmployeeList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].EmpName + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";
            }
            $('#ddlAssign').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function GetSalesOrderDetailsById(salesorderid) {
    var salesorderid = $("#ddlSalesOrderID").val();
    $.ajax({
        type: "POST",
        url: 'wfPmProductDispatch.aspx/GetSalesOrderDetailsById',
        data: JSON.stringify({ salesorderid: salesorderid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblCustomerList').DataTable().clear();
            $('#tblCustomerList').DataTable().destroy();
            $('#tbodycustomerList').html('');
             var gridViewHtml = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                gridViewHtml += '<tr>';
                gridViewHtml += '<td>' + data[i].SalesOrderId + '</td>';
                gridViewHtml += '<td>' + data[i].GSTTreatment + '</td>';
                gridViewHtml += '<td>' + data[i].DeliveryDateTime + '</td>';
                gridViewHtml += '<td>' + data[i].Currency + '</td>';
                gridViewHtml += '<td>' + data[i].OrderDate + '</td>';
                gridViewHtml += '<td>' + data[i].Department + '</td>';
                gridViewHtml += '<td>' + data[i].ExpirationDate + '</td>';
                gridViewHtml += '<td>' + data[i].PaymentTerms + '</td>';
                gridViewHtml += '<td>' + data[i].DeliveryCharges + '</td>';
                gridViewHtml += '<td>' + data[i].Advance + '</td>';
                gridViewHtml += '<td>' + data[i].ServiceCharge + '</td>';
                gridViewHtml += '<td>' + data[i].TotalAmount + '</td>';
                gridViewHtml += '<td>' + data[i].OutstandingAmount + '</td>';
                gridViewHtml += '<td>' + data[i].MaterialName + '</td>';
                gridViewHtml += '<td>' + data[i].QTY + '</td>';
                gridViewHtml += '<td>' + data[i].UnitMeasure + '</td>';
                gridViewHtml += '<td>' + data[i].Stock + '</td>';
                gridViewHtml += '<td>' + data[i].MRP + '</td>';
                gridViewHtml += '<td>' + data[i].DiscountPercent + '</td>';
                gridViewHtml += '<td>' + data[i].IntegratedTaxPercent + '</td>';
                gridViewHtml += '<td>' + data[i].Amount + '</td>';
                gridViewHtml += '<td>' + data[i].Package + '</td>';
                
                gridViewHtml += '</tr>';
                //$.each(data, function (index, item) {
                //    gridViewHtml += '<tr>';
                //    gridViewHtml += '<td>' + data[item].GST + '</td>';
                //    gridViewHtml += '<td>' + data[item].Advance + '</td>';
                //    gridViewHtml += '</tr>';
                //});
            }
            gridViewHtml += "</table>";
            $("#gridViewContainer").html(gridViewHtml);
            $('#txtClientName').attr("readonly", "readonly");
            var data = JSON.parse(response.d);
            $('#txtClientName').val(data[0].CustomerName);
            $('#tblCustomerList').DataTable();

        },
        error: function (xhr, status, error) {
            console.error("An error occurred: " + status + " " + error);
        }
    });

}

function FetchSalesOrderDetails(SalesOrderId) {
    //debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmProductDispatch.aspx/SalesOrderDetailsById',
        data: JSON.stringify({
            "SalesOrderId": SalesOrderId,
            
           
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            ClearAll();
            //$('#DivCustomerList').hide();
            //$('#createDiv').show();
            //$("#btnsave").show();
            //$("#btnsave").html('Update');

            $('#txtClientName').attr("readonly", "readonly");
            //$('#lblEmployee').text('Update');
            var data = JSON.parse(response.d);
            $('#ddlSalesOrderID').val(data[0].SalesOrderId);
            $('#txtClientName').val(data[0].ClientName);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindSalesOrderList() {
    $.ajax({
        type: "POST",
        url: 'wfPmProductDispatch.aspx/SalesOrderList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].SalesOrderId + "'>" + JSON.parse(response.d)[i].SalesOrderId + "</option>";
            }
            $('#ddlSalesOrderID').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindProductDetailsList() {
   // debugger;
    $.ajax({
        type: "POST",
        url: 'wfPmProductDispatch.aspx/FetchProductDetailsList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#tblCustomerList').DataTable().clear();
            $('#tblCustomerList').DataTable().destroy();
            $('#tbodycustomerList').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    html = html 
                        + '<tr><td>' + data[i].SalesOrderId + '</td>'
                        + '<td>' + data[i].DateOfAssignment + '</td>'
                        + '<td>' + data[i].DateOfDelivery + '</td>'
                        + '<td>' + data[i].ClientName + '</td>'
                        + '<td>' + data[i].AssignTeam + '</td>'
                        + '<td>' + data[i].CustomerName + '</td>'
                        + '<td>' + data[i].OrderDate + '</td>'
                        + '<td>' + data[i].GSTTreatment + '</td>'
                        + '<td>' + data[i].DeliveryDateTime + '</td>'
                        + '<td>' + data[i].Currency + '</td>'
                        + '<td>' + data[i].QuotationId + '</td>'
                        + '<td>' + data[i].Department + '</td>'
                        + '<td>' + data[i].BranchCode + '</td>'
                        + '<td>' + data[i].ExpirationDate + '</td>'
                        + '<td>' + data[i].TermsConditions + '</td>'
                        + '<td>' + data[i].MaterialName + '</td>'
                        + '<td>' + data[i].PaymentTerms + '</td>'
                        + '<td>' + data[i].DeliveryCharges + '</td>'
                        + '<td>' + data[i].Advance + '</td>'
                        + '<td>' + data[i].TotalAmount + '</td>'
                        + '<td>' + data[i].OutstandingAmount + '</td>'
                        + '<td>' + data[i].QTY + '</td>'
                        + '<td>' + data[i].UnitMeasure + '</td>'
                        + '<td>' + data[i].Stock + '</td>'
                        + '<td>' + data[i].MRP + '</td>'
                        + '<td>' + data[i].DiscountPercent + '</td>'
                        + '<td>' + data[i].IntegratedTaxPercent + '</td>'
                        + '<td>' + data[i].Amount + '</td>'
                        + '<td>' + data[i].ServiceCharge + '</td>'
                        + '<td>' + data[i].Package + '</td></tr>'
            }
            $('#tbodycustomerList').html(html);
            $('#tblCustomerList').DataTable();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
function AddProductDetails() {
    var IsUpdate = 0;
    if ($('#btnsave').html() == 'Update') {
        IsUpdate = 1;
    }
    
    $.ajax({

        type: "POST",
        url: 'wfPmProductDispatch.aspx/AddProductDetails',
        data: JSON.stringify({
            //"ActivityId": $('txtSummary.text').val().trim(),
            "SalesOrderId": $('#ddlSalesOrderID').val().trim(),
            "ClientName": $('#txtClientName').val().trim(),
            "AssignmentDate": $('#txtAssignmentDate').val().trim(),
            "DeliveryDate": $('#txtDeliveryDate').val().trim(),
            "AssignTeam": $('#ddlAssign').val().trim(),
            "CreateUser": $('#ContentPlaceHolder1_loginuser').val()

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            if ($('#btnsave').html() == 'Update') {
                alertify.success("Product Dispatch details updated successfully");
            }
            else {
                alertify.success("Product Dispatch Details added successfully");
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
//function BindCustomerList() {
   
//    $.ajax({
//        type: "POST",
//        url: 'wfPmProductDispatch.aspx/FetchActivityList',
//        data: {},
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        beforeSend: function () {

//        },
//        success: function (response) {

//            var data = JSON.parse(response.d);
//            $('#tblCustomerList').DataTable().clear();
//            $('#tblCustomerList').DataTable().destroy();
//            $('#tbodycustomerList').html('');
//            var html = '';
//            for (var i = 0; i < JSON.parse(response.d).length; i++) {
//                html = html + '<tr onclick="FetchActivityDetails(\'' + data[i].FollowUpType + '\')"><td>' + data[i].FollowUpType + '</td>'
//                    + '<td>' + (data[i].Summary != undefined ? data[i].Summary : '') + '</td>'
//                    + '<td>' + (data[i].DueDate != undefined ? data[i].DueDate : '') + '</td>'
//                    + '<td>' + (data[i].AssignClient != undefined ? data[i].AssignClient : '') + '</td>'
//                    + '<td>' + (data[i].AssignPerson != undefined ? data[i].AssignPerson : '') + '</td></tr>';
//            }
//            $('#tbodycustomerList').html(html);
//            $('#tblCustomerList').DataTable();
//        },
//        complete: function () {

//        },
//        failure: function (jqXHR, textStatus, errorThrown) {
//        }
//    });

//}


function CreateCustomer() {
    ClearAll();
    $('#createDiv').show();
    $('#DivCustomerList').hide();
    $("#btnsave").html('Save');
    $("#btnsave").show();
   // $('#txtActivityId').removeAttr("readonly");

}


function ValidateNumber(event) {
    var regex = new RegExp("^[0-9]*$");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}


