$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    List();
});

function Customer() {
    window.location = "wfPosCustomer.aspx";
}

function Payment() {
    window.location = "wfPosPayment.aspx";
}

function ImageClick() {

    $('#imagecard').hide();
    $('#headerempty').hide();
    //Reference the Label.
    var lblMRP = document.getElementById("lblMRP");
    //Reference the Label.
    var lblprice = document.getElementById("lblprice");

    //Copy the Label value to Label.
    // lblMRP.innerHTML = lblprice.value;
    lblprice.innerText = lblMRP;

}

//function OnImageClick(Id) {
//    debugger;
//    $.ajax({
//        type: "POST",
//        url: 'wfPosProductCalculation.aspx/OnImageClick',
//        data: JSON.stringify({
//            "Id": Id
//        }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        beforeSend: function () {
//        },
//        success: function (response) {
//            debugger;
//            var lblprice = document.getElementById("lblprice");
//            var data = JSON.parse(response.d);
//            $('#hidden').val(data[0].Id);
//            $('#lblprice').val(data[0].MRP);
//            //for (var i = 0; i < JSON.parse(response.d).length; i++) {
//            //    var MRP = JSON.parse(response.d)[i].MRP;
//            //    var Name = JSON.parse(response.d)[i].MaterialName;
//            //    var ID = JSON.parse(response.d)[i].Id;
//            //    if (("#img").OnImageClick != ID) {
//            //        lblprice.innerText = MRP;
//            //    }
//            //    else {

//            //    }

//        }
//    },
//        complete: function () {

//        },
//        failure: function (jqXHR, textStatus, errorThrown) {

//        }
//    });
//} 

function List() {
    
    $.ajax({
        type: "POST",
        url: 'wfPosProductCalculation.aspx/List',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (response) {
            
            var data = JSON.parse(response.d);
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<img onclick="FetchMaterialDetails(\'' + data[i].Id + '\')">' + data[i].Id + $('#img').val(data[i].MaterialImage) +
                    + $('#lblMRP').val(data[i].MRP) + $('#lblName').val(data[i].MaterialName);
            }
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function FetchMaterialDetails(Id) {
    
    $.ajax({
        type: "POST",
        url: 'wfPosProductCalculation.aspx/FetchMaterialDetails',
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            // ClearAll();
            //$('#DivMaterialList').hide();
            //$('#DivMaterialEntry').show();
            //$("#btnsave").html('Update');
            //$("#btnsave").show();
            //$('#txtmaterialId').attr("readonly", "readonly");
            //$('#lblmaterial').text('Update');
            var data = JSON.parse(response.d);
            // $('#txtmaterialId').val(data[0].Id);
            //$('#ddlMaterialCategory').val(data[0].MaterialCategoryId);
            //$('#ddlMaterialGroup').val(data[0].MeterialGroup);
            //$('#txtname').val(data[0].MaterialName);
            //$('#ddlUnitMeasure').val(data[0].UnitMesure);
            //$('#ddlSalesUnitMeasure').val(data[0].SalesUnitMesure);
            //$('#ddlAltUnitMeasure').val(data[0].AltUnitMesure);
            //$('#ddlNatureOfItem').val(data[0].NatureOfItem);
            //$('#txtrelationunitmeasure').val(data[0].RelationUnitMesure);
            //$('#txtrelationSalesunitmeasure').val(data[0].RelationSalesUnitMesure);
            //$('#txtrateofduty').val(data[0].RateOfDuty);
            //$('#txthsnno').val(data[0].HsnNo);
            //$('#txtbarcode').val(data[0].BarCode);
            //$('#txtcostingMethod').val(data[0].CostingMethod);
            //$('#txtbom').val(data[0].BOM);
            //$('#txtmaintainbatch').val(data[0].MaintainInBatch);
            $('#lblprice').val(data[0].MRP);
            // $('#txtdescription').val(data[0].Description);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

