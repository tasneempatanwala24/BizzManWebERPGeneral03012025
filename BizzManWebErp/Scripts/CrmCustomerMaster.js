$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    ViewCRMCustomerMasterList();
    fillCountry();
    fillBranch();
    var tagsources = ["Consulting Services", "Vendor/Desk Manufacturers", "Employees", "Vendor/Office Supplies", "Prospects", "Registered", "Reseller"];
    enableAutoComplete("#txtTag", "wfCrmCustomerMaster.aspx/TagList", tagsources,"#dlTags");
    
    enableAutoComplete("#txtTitle", "wfCrmCustomerMaster.aspx/TitleList", ["Consulting Services", "Madam", "Miss", "Mister", "Professor"],"#dlTitle");
    //enableAutoComplete("#txtGST", "wfCrmCustomerMaster.aspx/GSTTreatmentList");

    $("[id*=rblCustomer] input[value=1]").on('click', function () {
        showhideFields(1)
    });

    $("[id*=rblCustomer] input[value=2]").on('click', function () {
        showhideFields(2)
    });

    keepDatalistOptions('.keepDatalist');
});

function showhideFields(CustomerType) {

    if (CustomerType == 1) {
        $("#txtTitle").show();
        $("#ddlBranch").show()
        $("#txtJobPosition").show();
        $("#spnJobPosition").show();
        $("#spnTitle").show();
    }
    if (CustomerType == 2) {
        $("#txtTitle").hide();
        $("#ddlBranch").hide()
        $("#txtJobPosition").hide();
        $("#spnJobPosition").hide();
        $("#spnTitle").hide();
    }
}

function BindCrmCustomerMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/GetCustomerList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblCrmCustomerMasterList').DataTable().clear();
            $('#tblCrmCustomerMasterList').DataTable().destroy();
            $('#tbody_CustomerMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchCRMCustomerMaster(\'' + data[i].CustomerId +'\')" style="cursor:pointer">'
                    + '<td> ' + data[i].CustomerName + '</td > '
                    + '<td> ' + data[i].Phone + '</td > '
                    + '<td> ' + data[i].Email + '</td > '
                    + '<td> ' + data[i].City + '</td > '                                      
                    + '<td> ' + data[i].JobPosition + '</td > '
                    + '<td> ' + data[i].BranchName + '</td > '
            }
            $('#tbody_CustomerMaster_List').html(html);
            $('#tblCrmCustomerMasterList').DataTable();
            createKanbanViewTable(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindStateDetails() {
    $.ajax({
        type: "POST",
        url: 'wfHrBranchMasterNew.aspx/StateList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].StateId + "'>" + JSON.parse(response.d)[i].StateName + "</option>";
            }
            $('#ddlState').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function FetchCRMCustomerMaster(CustomerId) {
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/GetCustomerById',
        data: JSON.stringify({
            "Id": CustomerId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d)[0];
            ClearAll();
            $("#ContentPlaceHolder1_hfCustomerId").val(CustomerId);
            $('#divCRMCustomerMasterList').hide();
            $('#divCrmCustomerMasterEntry').show();
            $("#btnSave").html('Update');
            $("#btnSave").show();

            var radio = $("[id*=rblCustomer] input[value=" + data.CustomerType + "]");
            if (radio != undefined) {
                radio.prop('checked', true);
            }
            showhideFields(data.CustomerType);
          $('#txtCstName').val(data.CustomerName);
           $('#ddlBranch').val(data.CompanyName);
           $('#txtVAT').val(data.TaxId);
             $('#txtJobPosition').val(data.JobPosition);
            $('#txtWebsite').val(data.Website);
            $('#txtTitle').val(data.Title);
          //  fd.PhotoImage = imgDataURL;
            $('#hfBase64').val(data.PhotoImage);
            $("#imgFU").attr('src', data.PhotoImage);

            $('#txtStreet1').val(data.Street1);
            $('#txtStreet2').val(data.Street2);           
            $('#ddlCountry').val(data.Country);
            fillStateByCountry(data.Country, data.State);
            fillCityAutoComplete(data.State);
            $('#txtCity').val(data.City);
            $('#txtZip').val(data.Zip);
            $('#txtEmail').val(data.Email);
            $('#txtPhone').val(data.Phone);            
            $('#txtTag').val(data.Tag);            
            $('#txtGST').val(data.GSTTreatment);
            $('#txtPAN').val(data.PAN);

            $("#btntitle").html("Customers / " + data.CustomerName);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function ViewCRMCustomerMasterList() {
    $('#divCRMCustomerMasterList').show();
    $('#divCrmCustomerMasterEntry').hide();
    $('#btnSave').hide();
    BindCrmCustomerMasterDetails();

    $("#btntitle").html('Customers');
}


function ClearAll() {
    $('#imgFU,#ContentPlaceHolder1_hfBase64,#txtCstName,#txtStreet1,#txtJobPosition,#txtStreet2,#txtPhone,#txtCity,#txtZip,#txtEmail,#txtWebsite,#txtVAT,#txtTitle,#txtTag,#txtPAN').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
    $('#chkActive').prop('checked', false);
    $("#ContentPlaceHolder1_hfCustomerId").val("0");
    $("#ddlState,#txtGST,#ddlBranch,#ddlCountry").val(0);
    $("#txtCity").prop("placeholder", "City...");
    $("#txtTitle").prop("placeholder", "e.g. Master");
    $("#txtTag").prop("placeholder", "");

}

function CreateCRMCustomerhMasterList() {
    $('#divCRMCustomerMasterList').hide();
    $('#divCrmCustomerMasterEntry').show();    
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
    $("#btntitle").html('Create / New');
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtCstName').val() == '') {
        alertify.error("Please Enter Customer Name");
        isValid = false;
    }

    if ($('#ddlCountry').val() == '' || $('#ddlCountry').val() == '0') {
        alertify.error("Please Enter Country");
        isValid = false;
    }

    if ($('#ddlState').val() == ''||$('#ddlState').val()=='0') {
        alertify.error("Please Enter State");
        isValid = false;
    }

    if ($('#txtCity').val() == '') {
        alertify.error("Please Enter City");
        isValid = false;
    }
    
    if (isValid) {
        var imgDataURL = '';
        if ($('#imgFU').attr("src") !="Images/fileupload.png") {
            imgDataURL = $('#imgFU').attr("src").toString();
        }

        var fd = {};

        fd.CustomerType = $('input[type=radio]:checked').val().trim();
        fd.CustomerName=$('#txtCstName').val().trim();
        fd.CompanyName = $('#ddlBranch').val();
        fd.TaxId = $('#txtVAT').val().trim();
        fd.JobPosition = $('#txtJobPosition').val().trim();
        fd.Website=$('#txtWebsite').val().trim();
        fd.Title= $('#txtTitle').val().trim();
        fd.PhotoImage= imgDataURL;
        fd.Street1= $('#txtStreet1').val();
        fd.Street2=$('#txtStreet2').val();
        fd.City = $('#txtCity').val();
        fd.State=$('#ddlState').val();
        fd.ZIP=$('#txtZip').val();
        fd.Email= $('#txtEmail').val();
        fd.Phone= $('#txtPhone').val();
        fd.Country = $('#ddlCountry').val();;
        fd.User = $('#ContentPlaceHolder1_loginuser').val();
        fd.CustomerId = $("#ContentPlaceHolder1_hfCustomerId").val();
        fd.Tag = $("#txtTag").val();
        fd.Gst = $("#txtGST").val() == '0' ? '' : $("#txtGST").val();
        fd.PAN = $("#txtPAN").val();
            

        $.ajax({
            processData:false,
            type: "POST",
            processData: false,
            url: 'wfCrmCustomerMaster.aspx/AddCustomer',
            data: JSON.stringify(fd),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                if ($('#btnSave').html() == 'Update') { alertify.success("Customer updated successfully"); }
                else {
                    alertify.success("Customer added successfully");
                    ClearAll();
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgFU')
                .attr('src', e.target.result);
            $("#ContentPlaceHolder1_hfBase64").val(e.target.result);
                
        };

        reader.readAsDataURL(input.files[0]);
    }
}


function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;

}

function fillCountry() {
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/CountryList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CountryName + "</option>";
            }
            $('#ddlCountry').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function fillState() {
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/StateList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].StateId + "'>" + JSON.parse(response.d)[i].StateName + "</option>";
            }
            $('#ddlState').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function fillStateByCountry(country, state) {

    $('#ddlState').html("<option value='0'>Choose State</option>");
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/StateListByCountry',
        data: JSON.stringify({ "country": country }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                if (state == JSON.parse(response.d)[i].StateId) {
                    department = department + "<option value='" + JSON.parse(response.d)[i].StateId + "' selected='selected'>" + JSON.parse(response.d)[i].StateName + "</option>";
                }
                else {
                    department = department + "<option value='" + JSON.parse(response.d)[i].StateId + "' >" + JSON.parse(response.d)[i].StateName + "</option>";
                }
            }
            $('#ddlState').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function fillBranch() {
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/BranchList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function fillCityAutoComplete(state) {
    $("#citys").html("");
    $.ajax({
        type: "POST",
        url: "wfCrmCustomerMaster.aspx/CityListByState",
        data: JSON.stringify({ "stateId": state }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            var data = JSON.parse(res.d);
            for (var i = 0; i < data.length; i++) {
                $("#citys").append("<option>" + data[i].Item + "</option>");
            }
                  
        }
    });
}
function fillCity(state,city) {
    
        $('#ddlCity').html("<option value='0'>Choose City</option>");
     
    $.ajax({
        type: "POST",
        url: 'wfCrmCustomerMaster.aspx/CityList',
        data: JSON.stringify({ "stateId": state}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                if (city == JSON.parse(response.d)[i].Id) {
                    department = department + "<option value='" + JSON.parse(response.d)[i].Id + "' selected='selected'>" + JSON.parse(response.d)[i].CityName + "</option>";
                }
                else { department = department + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].CityName + "</option>";}
            }
            $('#ddlCity').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function enableAutoComplete(cntrl,apiURL,defaultData,dlSelector) {
    $(dlSelector).html("");
    $.ajax({
        type: "POST",
        url: apiURL,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            var data = JSON.parse(res.d);

            var autoCompleteDatasource = data.map(function (item) {
                if (!defaultData.includes(item['Item'])) {
                    defaultData.push(item['Item']);
                }
                return item['Item'];
            });
            for (var i = 0; i < defaultData.length; i++) {
                $(dlSelector).append("<option>" + defaultData[i] + "</option>");
            }            
        }
    });
}

function createKanbanViewTable(data) {
    var finalHTML = "";
    var tempHTML = "";
    var tdCount = 0;

    for (let i = 0; i < data.length; i++) {
        tempHTML += createKanbanViewItem(data[i]);
        tdCount++;
        if (tdCount == 5 || i + 1 == data.length) {
            tempHTML = "<tr>" + tempHTML + "</tr>";
            finalHTML += tempHTML;
            tempHTML = "";
            tdCount = 0;
        }
       
    }

    $('#tbody_kanbanViewList').html(finalHTML);
  //  $('#tblKanbanView').DataTable();
    showAllImages();
}
function createKanbanViewItem(item) {
  var innerItemHTML=  '<td><table style="border: solid thin grey;margin: 2px;width:200px;height:100px;">'+
        '<tbody>'+
            '<tr>'+
                '<td style="vertical-align:top;">'+
      '<img class="kanban-img"  src="' + item.PhotoImage + '" style="width: 80px;height:96px; text-align: top;"></td>' +
      '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.CompanyName + ', ' + item.CustomerName + '<span><br/>' +
      '<span style="font-size:smaller">' + item.JobPosition + ' at ' + item.BranchName + '</span><br/>' +
      '<span style="font-size:smaller">' + item.City + ', India</span>' +
    '</td > ' +
                                    '</tr>'+
                                '</tbody>'+
      '</table ></td>'
      ;

    return innerItemHTML;
}

function showListView() {
    $("#dvKanbanView").hide();
    $("#dvListView").show();
}
function showKanbanView() {
    $("#dvKanbanView").show();
    $("#dvListView").hide();
}

function showAllImages() {

    $(".kanban-img").each(function (item) {

        $.ajax({
            type: "POST",
            url: 'wfCrmCustomerMaster.aspx/GetCustomerImageById',
            data: JSON.stringify({
                "Id": $(this).attr('title')
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d)[0];
                $(this).attr('src', data.PhotoImage);
            }            
        });

    });
}

function Title() {
    window.location = "wfCrmCustomerMaster.aspx";
}




function keepDatalistOptions(selector = '') {
    // select all input fields by datalist attribute or by class/id
    selector = !selector ? "input[list]" : selector;
    let datalistInputs = document.querySelectorAll(selector);
    if (datalistInputs.length) {
        for (let i = 0; i < datalistInputs.length; i++) {
            let input = datalistInputs[i];
            input.addEventListener("input", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
              //  e.target.blur();
            });
            input.addEventListener("focus", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                e.target.value = "";
            });
            input.addEventListener("blur", function (e) {
                e.target.value = e.target.getAttribute("placeholder");
            });
        }
    }
}