$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindCrmCompanyMasterDetails();
    keepDatalistOptions('.keepDatalist');
});


function BindCrmCompanyMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfAdminCompanyMasterNew.aspx/GetCompanyList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblCrmCompanyMasterList').DataTable().clear();
            $('#tblCrmCompanyMasterList').DataTable().destroy();
            $('#tbody_CompanyMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchCRMCompanyMaster(\'' + data[i].Id + '\')" style="cursor:pointer">'
                    + '<td> ' + data[i].CompanyName + '</td > '
                    + '<td> ' + data[i].PhoneNo + '</td > '
                    + '<td> ' + data[i].EmailAddress + '</td > '
                    + '<td> ' + data[i].WebSiteAddress + '</td > '
                    + '<td> ' + data[i].PanNo + '</td > '
                    + '<td> ' + data[i].GstNo + '</td > '
            }
            $('#tbody_CompanyMaster_List').html(html);
            $('#tblCrmCompanyMasterList').DataTable();
            createKanbanViewTable(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchCRMCompanyMaster(Id) {
    $.ajax({
        type: "POST",
        url: 'wfAdminCompanyMasterNew.aspx/GetCompanyById',
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d)[0];
            ClearAll();
            $("#ContentPlaceHolder1_hfId").val(Id);
            $('#divCRMCompanyMasterList').hide();
            $('#divCrmCompanyMasterEntry').show();
            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#txtCompanyName').attr("readonly", "readonly");
            $('#txtCompanyName').val(data.CompanyName);
            $('#hfBase64').val("Images/logo.png");
            $("#imgFU").attr('src', "Images/logo.png");
            $('#txtAddress1').val(data.Address1);
            $('#txtAddress2').val(data.Address2);
            $('#txtWebsite').val(data.WebSiteAddress);
            $('#txtEmail').val(data.Email);
            $('#txtPhone').val(data.Phone);
            $('#txtGST').val(data.GstNo);
            $('#txtPAN').val(data.PAN);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function ViewCRMCompanyMasterList() {
    $('#divCRMCompanyMasterList').show();
    $('#divCrmCompanyMasterEntry').hide();
    $('#btnSave').hide();
    BindCrmCompanyMasterDetails();

}


function ClearAll() {
    $('#txtCompanyName').removeAttr("readonly", "readonly");
    $("#txtCompanyName").val('');
    $("#txtAddress1").val('');
    $("#txtAddress2").val('');
    $("#txtPhone").val('');
    $("#txtEmail").val('');
    $("#txtWebsite").val('');
    $("#txtPAN").val('');
    $("#txtGST").val('');
    $('#imgFU,#ContentPlaceHolder1_hfBase64').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
    //$('#chkActive').prop('checked', false);
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#btnSave').html('Save');
}

function CreateCRMCompanyhMasterList() {
    $('#divCRMCompanyMasterList').hide();
    $('#divCrmCompanyMasterEntry').show();
    $("#btnSave").html('Save');
    $('#btnSave').show();
    ClearAll();
}

function AddDetails() {

    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtCompanyName').val() == '') {
        alertify.error("Please Enter Company Name");
        isValid = false;
    }
    if (isValid) {
        var imgDataURL = '';
        if ($('#imgFU').attr("src") != "Images/fileupload.png") {
            imgDataURL = $('#imgFU').attr("src").toString();

        }

        $.ajax({
            type: "POST",
            url: 'wfAdminCompanyMasterNew.aspx/CheckJobAvailability',
            data: JSON.stringify({ "CompanyName": $('#txtCompanyName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {

                    var fd = {};

                    fd.CompanyName = $('#txtCompanyName').val().trim();
                    fd.Address1 = $('#txtAddress1').val();
                    fd.Address2 = $('#txtAddress2').val();
                    fd.Phone = $('#txtPhone').val();
                    fd.Email = $('#txtEmail').val();
                    fd.Website = $('#txtWebsite').val().trim();
                    fd.PhotoImage = imgDataURL;
                    fd.User = $('#ContentPlaceHolder1_loginuser').val();
                    fd.Id = $("#ContentPlaceHolder1_hfId").val();
                    fd.PAN = $("#txtPAN").val();
                    fd.Gst = $("#txtGST").val() == '0' ? '' : $("#txtGST").val();
                    console.log(fd);
                    $.ajax({
                        processData: false,
                        type: "POST",
                        processData: false,
                        url: 'wfAdminCompanyMasterNew.aspx/AddCompany',
                        data: JSON.stringify(fd),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            if ($('#btnSave').html() == 'Update') { alertify.success("Company updated successfully"); ClearAll(); }
                            else {
                                alertify.success("Company added successfully");
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
                    alertify.error("Company Name already available");
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
        var file = input.files[0];
        var reader = new FileReader();

        // Check if the file is a PNG
        if (file.type === 'image/png') {
            reader.onload = function (e) {
                $('#imgFU').attr('src', e.target.result);
                $("#ContentPlaceHolder1_hfBase64").val(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            alertify.error("Please select a PNG file.");
            // Optionally clear the input value
            input.value = '';
        }
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

function enableAutoComplete(cntrl, apiURL, defaultData, dlSelector) {
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
    var innerItemHTML = '<td><table style="border: solid thin grey;margin: 2px;width:200px;height:100px;">' +
        '<tbody>' +
        '<tr>' +
        '<td style="vertical-align:top;">' +
        '<img class="kanban-img"  src="Images/logo.png" style="width: 80px;height:96px; text-align: top;"></td>' +
        '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.CompanyName +
        '</td > ' +
        '</tr>' +
        '</tbody>' +
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
            url: 'wfAdminCompanyMasterNew.aspx/GetCompanyImageById',
            data: JSON.stringify({
                "Id": $("#txtCompanyName").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d)[0];
                $(this).attr('src', "Images/logo.png");
            }
        });

    });
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