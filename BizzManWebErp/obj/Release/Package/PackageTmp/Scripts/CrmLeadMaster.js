$(document).ready(function () {
    GetLeadList();

    $("button").click(function (event) {
        event.preventDefault();
    });

    var type = $("#hdPageViewType").val();
    if (type == "ImportFile") {
        ImportLead();
    }
});

var IsFormVilid = true;

function changePriority(id) {
    var label1 = $("#star" + 1);
    var label2 = $("#star" + 2);
    var label3 = $("#star" + 3);    
    if ($("#star" + id).attr("class").toString().includes("checked")) {
        $("#star" + id).removeClass('fa fa-star checked');
        $("#star" + id).addClass('fa fa-star');
        if (id == 2) {
            label3.removeClass('fa fa-star checked');
            label3.addClass('fa fa-star');
        }
        else if (id == 1) {
            label3.removeClass('fa fa-star checked');
            label2.removeClass('fa fa-star checked');
            label3.addClass('fa fa-star');
            label2.addClass('fa fa-star');
        } 

    }
    else {
        $("#star" + id).removeClass('fa fa-star');
        $("#star" + id).addClass('fa fa-star checked');
        if (id == 2) {
            label1.addClass('fa fa-star checked');
        }
        else if (id == 3) {
            label1.addClass('fa fa-star checked');
            label2.addClass('fa fa-star checked');
        }       

    }
}

function GetLeadList() {
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetLeadList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            BindLeadGrid(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindLeadGrid(data) {
    $('#tblCrmLeadList').DataTable().clear();
    $('#tblCrmLeadList').DataTable().destroy();
    $('#tbody_LeadListView').html('');

    var ListView = '';
    
    for (var i = 0; i < data.length; i++) {


        ListView = ListView + '<tr><td><input type="checkbox" class="editor-active" value="' + data[i].LeadId + '">' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="LeadName">' + data[i].LeadName + '</td>' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="Email">' + data[i].Email +
            '</td><td class="Phone">' + data[i].Phone + '</td>' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="CompanyName" > ' + data[i].CompanyName + '</td > ' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="city" > ' + data[i].City + '</td> ' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="State">' + data[i].Country + '</td>' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="SalesPerson" > ' + data[i].SalesPersonName + '</td>' +
            '<td onclick="LoadLeadDetaisView(' + data[i].LeadId + ');" style="cursor: pointer;" class="SalesTeam">' + data[i].SalesTeamName + '</td>'
    }


    //$('#tblCrmLeadList').DataTable();
    $('#tbody_LeadListView').html(ListView);
    var d = new Date();
    var table = $('#tblCrmLeadList').DataTable({
        'columnDefs': [{
            'targets': 0,
            'checkboxes': {
                'selectRow': true
            }
        }],
        'select': {
            'style': 'multi'
        },
        fixedHeader: {
            header: true
        }

    });
    $('#example-select-all').on('click', function () {
        var rows = table.rows({
            'search': 'applied'
        }).nodes();
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });

    $('#tblCrmLeadList tbody').on('change', 'input[type="checkbox"]', function () {
        // If checkbox is not checked
        if (!this.checked) {
            var el = $('#example-select-all').get(0);
            // If "Select all" control is checked and has 'indeterminate' property
            if (el && el.checked && ('indeterminate' in el)) {
                // Set visual state of "Select all" control 
                // as 'indeterminate'
                el.indeterminate = true;
            }
        }
    });
}

function ClearLeadDetails() {
    $("#hdLeadId").val("")
    $("#txtLeadName").val("");
    $("#txtProbability").val("");
    $("#txtCompanyName").val("");
    $("#txtContactName").val("");
    $("#txtStreet1").val("");
    $("#txtStreet2").val("");
    $("#ddState").val("");
    $("#ddCity").val("");
    $("#ddCountry").val("");
    $("#txtZip").val('');
    $("#txtWebsite").val("");
    $("#txtJobPosition").val("");
    $("#txtPhone").val("");
    $("#txtMobile").val("");
    $("#txtEmail").val("");
    $("#ddTags").val("");
    $("#txtSalesperson").val("");
    $("#txtSalesTeam").val("");
    $("#txtNotes").val("");
    $(".invalid-feedback").css("display", "none");
}

function CreateNewLead() {
    $('#ListViewContainer').hide();
    $('#LeadDetaisView').hide();
    $("#divLeadEntry").show();
    $("#btnSave").html('Save');
    $("#btntitle").html('Create / New');
    $('#btnCreate').hide();
    $('#btnSave').show();
    $('#btnDiscard').show();
    $('#btnExport').hide();
    $('#btnImport').hide();
    $('#btnConverToOppMulti').hide();
    ClearLeadDetails();
    BindCountryDropDownList();
    BindStateDropDownList();
    BindCityDropDownList();
    BindTagList();
    BindSalePersonDropDownList();
    BindtSaleTeamDropDownList();
}

function EditLead() {
    var leadId = $("#hdLeadId").val();

    ClearLeadDetails();
    BindCountryDropDownList();
    BindTagList();
    BindSalePersonDropDownList();
    BindtSaleTeamDropDownList();

    $("#btnSave").html('Update');
    $("#btnCreate").hide();
    $("#btnEdit").hide();
    $("#btnDiscard").show();
     $('#txtLeadName').attr("readonly", "readonly");
    $("#btnSave").show();
    $('#btnExport').hide();
    $('#btnImport').hide();
    $('#btnConverToOppMulti').hide();


    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetLeadDetails',
        data: JSON.stringify({
            "LeadId": leadId,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $("#hdLeadId").val(data[0].LeadId);
            $('#txtLeadName').val(data[0].LeadName);
            $('#txtProbability').val(data[0].Probability);
            $('#txtCompanyName').val(data[0].CompanyName);
            $('#txtContactName').val(data[0].ContactName);
            $('#txtStreet1').val(data[0].Street1);
            $('#txtStreet2').val(data[0].Street2);
            $('#ddCountry').val(data[0].CountryId);
            $("#txtZip").val(data[0].Zip)
            $('#txtWebsite').val(data[0].Website);
            $('#txtJobPosition').val(data[0].JobPosition);
            $('#txtPhone').val(data[0].Phone);
            $('#txtMobile').val(data[0].Mobile);
            $('#txtEmail').val(data[0].Email);            
            $('#ddTags').val(data[0].TagId);
            $('#ddSalesPerson').val(data[0].SalesPersonId);
            $('#ddSalesTeam').val(data[0].SalesTeamId);
            $('#txtNotes').val(data[0].Note);
            $("#btntitle").html('Leads / ' + data[0].LeadName);

            var priority = data[0].Priority;
            if (priority == "Low") { $("#star1").addClass('fa fa-star checked'); }
            if (priority == "Medium") { $("#star1").addClass('fa fa-star checked'); $("#star2").addClass('fa fa-star checked'); }
            if (priority == "High") { $("#star1").addClass('fa fa-star checked'); $("#star2").addClass('fa fa-star checked'); $("#star3").addClass('fa fa-star checked'); }
             
            BindStateDropDownList(data[0].CountryId);
            BindCityDropDownList(data[0].StateId);
            setTimeout(function () {
                $('#ddCity').val(data[0].CityId);
                $('#ddState').val(data[0].StateId);
            }, 1000);
        },
        complete: function () {
            $('#ListViewContainer').hide();
            $('#LeadDetaisView').hide();
            $("#divLeadEntry").show();

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function SaveLeadDetails() {
    var priority = "";
    priority = ($("#star1").attr("class").toString().includes("checked")) ? "Low" : priority;
    priority = ($("#star2").attr("class").toString().includes("checked")) ? "Medium" : priority;
    priority = ($("#star3").attr("class").toString().includes("checked")) ? "High" : priority;
    
    if (ValidateLeadDetails()) {
        var leadObj = {
            "LeadId": $("#hdLeadId").val(),
            "LeadName": $("#txtLeadName").val(),
            "Probability": $('#txtProbability').val(),
            "CompanyName": $('#txtCompanyName').val(),
            "ContactName": $('#txtContactName').val(),
            "Street1": $('#txtStreet1').val(),
            "Street2": $('#txtStreet2').val(),
            "City": $('#ddCity').find(":selected").val(),
            "State": $('#ddState').find(":selected").val(),
            "Country": $('#ddCountry').val(),
            "Zip": $('#txtZip').val(),
            "Website": $('#txtWebsite').val(),
            "JobPosition": $('#txtJobPosition').val(),
            "Phone": $('#txtPhone').val(),
            "Mobile": $('#txtMobile').val(),
            "Email": $('#txtEmail').val(),
            "Priority": priority,
            "Tag": $('#ddTags').find(":selected").val(),
            "Salesperson": $('#ddSalesPerson').find(":selected").val(),
            "SalesTeam": $('#ddSalesTeam').find(":selected").val(),            
            "Notes": $('#txtNotes').val(),
            "UserId": $('#loginuser').val(),
        };
        $.ajax({
            type: "POST",
            url: 'wfCrmLeadMaster.aspx/SaveLeadDetails',
            data: "{leadObj:" + JSON.stringify(leadObj) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                if (data != null && data != undefined) {
                    var msg = "";
                    if ($("#hdLeadId").val() > 0) {
                        msg = "Lead details updated successfully!";
                    } else {
                        msg = "Lead details saved successfully!";
                    }
                    alertify.success(msg);
                    ClearLeadDetails();
                    Discard();
                }
            },
            compvare: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function ValidateLeadDetails() {
    
    $(".invalid-feedback").css("display", "none");
    var validationFlag = true;

    var leadName = $("#txtLeadName").val();
    if (leadName == null || leadName == "") {
        $("#invalidLeadName").css("display", "block");
        $("#invalidLeadName").html("Please enter Lead Title.");
        validationFlag = false;
    }


    /*var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
    var PhonePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/


    if (!emailPattern.test($("#txtEmail").val())) {
        $("#invalidEmail").css("display", "block");
        $("#invalidEmail").html("Please enter valid Email Id.");
        validationFlag = false;
    }
    if (!PhonePattern.test($("#txtPhone").val())) {
        $("#invalidPhone").css("display", "block");
        $("#invalidPhone").html("Please enter valid Phone Number.");
        validationFlag = false;
    }
    if (!PhonePattern.test($("#txtMobile").val())) {
        $("#invalidMobile").css("display", "block");
        $("#invalidMobile").html("Please enter valid Mobile Number.");
        validationFlag = false;
    }*/
    return validationFlag;
}

function BindCountryDropDownList() {
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetCountryList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddCountry').find("option").remove();
            var html = '<option selected="" disabled="" value="">Choose Country</option>';
            for (var i = 0; i < data.length; i++) {
                html = html + '<option  value="' + data[i].Id + '">' + data[i].CountryName + '</option>'
            }
            $('#ddCountry').append(html);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindStateDropDownList(country) {
    var countryid = country == undefined ? $('#ddCountry').val() : country;
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetStatesList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            "countryId": countryid
        }),
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddState').find("option").remove();
            var html = '<option selected="" disabled="" value="">Choose State</option>';
            for (var i = 0; i < data.length; i++) {
                html = html + '<option  value="' + data[i].StateId + '">' + data[i].StateName + '</option>'
            }
            $('#ddState').append(html);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindCityDropDownList(state) {
    var stateId = state == undefined ? $('#ddState').val() : state;
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetCityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        data: JSON.stringify({
            "StateId": stateId
        }),
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddCity').find("option").remove();
            var html = '<option selected="" disabled="" value="">Choose City</option>';
            for (var i = 0; i < data.length; i++) {
                html = html + '<option  value="' + data[i].Id + '">' + data[i].CityName + '</option>'
            }

            $('#ddCity').append(html);
            //var selectedCity = $('#hdCity').val();
            //if (selectedCity != "") {
            //    $('#ddCity').val(selectedCity);
            //}
        }
    });
}

function LoadLeadDetaisView(leadId) {
    $("#hdLeadId").val(leadId);
   
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetLeadDetails',
        data: JSON.stringify({
            "LeadId": leadId,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#lblLeadName').html(data[0].LeadName);
            $('#lblProbability').html(data[0].Probability + '%');
            $('#lblCompanyName').html(data[0].CompanyName);
            $('#lblContactName').html(data[0].ContactName);
            $('#lblAddress').html(data[0].Street1 + ', ' + data[0].Street2 + ', ' + data[0].City + ', ' + data[0].State + ', ' + data[0].Zip);
            $('#lblCountry').html(data[0].Country);
            $('#lblWebsite').html(data[0].Website);
            $('#lblJobPosition').html(data[0].JobPosition);
            $('#lblPhone').html(data[0].Phone);
            $('#lblMobile').html(data[0].Mobile);
            $('#lblEmail').html(data[0].Email);
            
            $('#lblTag').html(data[0].TagsName);
            $('#lblSalesPerson').html(data[0].SalesPersonName);
            $('#lblSalesTeam').html(data[0].SalesTeamName);
            $('#lblNotes').html(data[0].Note);
            $("#btntitle").html('Leads / ' + data[0].LeadName);


            var priority = data[0].Priority;
            if (priority == "Low") { $("#priority1").addClass('fa fa-star checked'); }
            if (priority == "Medium") { $("#priority1").addClass('fa fa-star checked'); $("#priority2").addClass('fa fa-star checked'); }
            if (priority == "High") { $("#priority1").addClass('fa fa-star checked'); $("#priority2").addClass('fa fa-star checked'); $("#priority3").addClass('fa fa-star checked'); }

        },
        complete: function () {
            //BindCityDropDownList();
        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

    $("#ListViewContainer").css("display", "none");
    $("#divLeadEntry").css("display", "none");
    $("#LeadDetaisView").css("display", "block");

    $('#btnEdit').show();
    $('#btnSave').hide();
    $('#btnView').hide();
    $('#btnDiscard').hide();
    $('#btnExport').hide();
    $('#btnImport').hide();
    $('#btnConverToOppMulti').hide();
}

function BindSalePersonDropDownList() {
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetSalePersonList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddSalesPerson').find("option").remove();
            var html = '<option selected="" disabled="" value="">Choose...</option>';
            for (var i = 0; i < data.length; i++) {
                html = html + '<option  value="' + data[i].EmpId + '">' + data[i].EmpName + '</option>'
            }
            $('#ddSalesPerson').append(html);
        }
    });
}

function BindtSaleTeamDropDownList() {
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetSaleTeamList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddSalesTeam').find("option").remove();;
            var html = '<option selected="" disabled="" value="">Choose...</option>';
            for (var i = 0; i < data.length; i++) {
                html = html + '<option  value="' + data[i].Id + '">' + data[i].SalesTeamName + '</option>'
            }

            $('#ddSalesTeam').append(html);

        }
    });
}

function BindTagList() {
    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/GetLeadTagList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () { },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#ddTags').find("option").remove();
            var Tags = "<option value=''>- Select Tags Name -</option>";
            for (var i = 0; i < data.length; i++) {
                Tags = Tags + "<option value='" + data[i].Id + "'>" + data[i].TagsName + "</option>"
            }
            $('#ddTags').append(Tags);

        }
    });
}

function Discard() {
    $('#ListViewContainer').show();
    $('#LeadDetaisView').hide();
    $("#divLeadEntry").hide();
    $("#btntitle").html('Leads');
    $('#btnCreate').show();
    $('#btnSave').hide();
    $('#btnDiscard').hide();
    $('#btnExport').show();
    $('#btnImport').show();
    $('#btnConverToOppMulti').show();
    ClearLeadDetails();
    GetLeadList();
}

function ExportToExcel() {
    $('#tblCrmLeadExport').DataTable().clear();
    $('#tblCrmLeadExport').DataTable().destroy();
    $('#tbody_LeadListExport').html('');
    var html = '';
    //Loop through all checked CheckBoxes in table.

    var rows = $('[id*=tblCrmLeadList] tr:not(:has(th))');
    for (j = 0; j < rows.length; j++) {
        if ($(rows[j]).find('input').is(':checked')) {

            var $tds = $(rows[j]).find('td'),
                Lead = $tds.eq(1).text(),
                Email = $tds.eq(2).text(),
                Phone = $tds.eq(3).text(),
                CompanyName = $tds.eq(4).text(),
                City = $tds.eq(5).text(),
                Country = $tds.eq(6).text(),
                SalesPerson = $tds.eq(7).text(),
                SalesTeam = $tds.eq(8).text(),
                //SalesTeam = $tds.eq(9).text(),
                //Tag = $tds.eq(10).text(),
                //Priority = $tds.eq(11).text(),
                //CreatedOn = $tds.eq(12).text(),

                html = html + '<tr>' +
                    '<td >' + Lead + '</td > ' +
                   /* '<td >' + ContactName + '</td > ' +*/
                    '<td >' + CompanyName + '</td > ' +
                    '<td >' + Email + '</td > ' +
                    '<td >' + Phone + '</td > ' +
                    '<td >' + City + '</td > ' +
                    '<td >' + Country + '</td>' +
                    '<td >' + SalesPerson + '</td > ' +
                    '<td >' + SalesTeam + '</td > ' +
                    //'<td >' + Tag + '</td > ' +
                    //'<td >' + Priority + '</td > ' +
                    //'<td >' + CreatedOn + '</td > ' +
                    '</tr > ';

        }
    }
    $('#tbody_LeadListExport').html(html);
    var d = new Date();
    $('#tblCrmLeadExport').DataTable();
    if (html != '') {
        $("#tblCrmLeadExport").tableHTMLExport({
            type: 'xlsx',
            filename: "Leads_" + d.toDateString()+".xlsx",
        });
    } else {
        alertify.alert("Warring", "Please Select Leads from the list to export.");
    }
}

function ImportLead() {
    $('#ListViewContainer').hide();
    $('#LeadDetaisView').hide();
    $("#divLeadEntry").hide();
    $("#divLeadEntry").hide();
    $("#importContainer").show();
}

function ConvertToOpportunity(LeadId,showalert) {

    $.ajax({
        type: "POST",
        url: 'wfCrmLeadMaster.aspx/ConvertToOpportunity',
        data: JSON.stringify({
            "LeadId": LeadId,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            if (showalert) { alertify.success("Successfully converted to opportunity"); }
            ClearLeadDetails();
            Discard();
        },
        complete: function () {
            //BindCityDropDownList();
        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function btnConvertTOOppClick() {

    var leadid = $("#hdLeadId").val();
    ConvertToOpportunity(leadid,true);
}

function ConvertToOpportunityMulti() {
    var rows = $('[id*=tblCrmLeadList] tr:not(:has(th))');
    var leadIds = [];
    for (j = 0; j < rows.length; j++) {
        var rowCheckbox = $(rows[j]).find('input')
        if (rowCheckbox.is(':checked')) {
           // alert(rowCheckbox.val());
            leadIds.push(rowCheckbox.val());
        }
    }

    if (leadIds.length <= 0) { alertify.alert("Warring", "Please Select Leads from the list for Convert to opportunity!!"); }
    else {

        for (let i = 0; i < leadIds.length; i++) {

            let showAlert = (i == leadIds.length - 1);
            let leadId = leadIds[i];
            ConvertToOpportunity(leadId, showAlert);

        }

    }

}

