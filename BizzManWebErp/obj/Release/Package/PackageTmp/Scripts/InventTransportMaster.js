var PhotoImg = "";
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindStateList();
    BindCrmTransportMasterDetails();
    keepDatalistOptions('.keepDatalist');
    $('#btnDisplayData').on('click', function () {
        // Image data URL
        var imageDataUrl = PhotoImg;
        // Create HTML content with the image
        var htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Image Viewer</title></head><body><img src="' + imageDataUrl + '"></body></html>';

        // Open the HTML content in a new tab
        var newTab = window.open();
        newTab.document.open();
        newTab.document.write(htmlContent);
        newTab.document.close();
    });
});
function BindStateList() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportMaster.aspx/StateList',
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
function BindCrmTransportMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportMaster.aspx/GetTransportList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblCrmTransportMasterList').DataTable().clear();
            $('#tblCrmTransportMasterList').DataTable().destroy();
            $('#tbody_TransportMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchCRMTransportMaster(\'' + data[i].Id + '\')" style="cursor:pointer">'
                    + '<td> ' + data[i].TransportName + '</td>'
                    + '<td> ' + data[i].PhoneNo + '</td>'
                    + '<td> ' + data[i].EmailAddress + '</td>'
                    + '<td> ' + data[i].GST_No + '</td></tr> '
            }
            $('#tbody_TransportMaster_List').html(html);
            $('#tblCrmTransportMasterList').DataTable();
            createKanbanViewTable(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchCRMTransportMaster(Id) {
    $.ajax({
        type: "POST",
        url: 'wfInventTransportMaster.aspx/GetTransportById',
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
            $('#divCRMTransportMasterList').hide();
            $('#divCrmTransportMasterEntry').show();
            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#txtTransportName').attr("readonly", "readonly");
            $('#txtTransportName').val(data.TransportName);
            if (data.TransportImage == '' || data.TransportImage == null) {
                $("#imgFU").attr('src', "Images/fileupload.png");
                PhotoImg = "Images/fileupload.png";
            }
            else {
                $("#imgFU").attr('src', data.TransportImage);
                PhotoImg = data.TransportImage;
            }
            $('#hfBase64').val(data.TransportImage);
            $('#txtAddress1').val(data.TransportAddress);
            $('#ddlState').val(data.StateId);
            $('#txtEmail').val(data.EmailAddress);
            $('#txtPhone').val(data.PhoneNo);
            $('#txtGST').attr("readonly", "readonly");
            $('#txtGST').val(data.GST_No);
            $('#txtDescription').val(data.Description);
            $('#btnDisplayData').show();
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function ViewCRMTransportMasterList() {
    $('#divCRMTransportMasterList').show();
    $('#divCrmTransportMasterEntry').hide();
    $('#btnSave').hide();
    $('#btnDisplayData').hide();
    BindCrmTransportMasterDetails();
}
function ClearAll() {
    $('#txtTransportName').removeAttr("readonly", "readonly");
    $('#txtGST').removeAttr("readonly", "readonly");
    $("#txtTransportName").val('');
    $("#txtAddress1").val('');
    $("#txtPhone").val('');
    $("#txtEmail").val('');
    $("#ddlState").val('');
    $("#txtDescription").val('');
    $("#txtGST").val('');
    $('#imgFU,#ContentPlaceHolder1_hfBase64').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#btnSave').html('Save');
    $('#btnDisplayData').hide();
}

function CreateCRMTransporthMasterList() {
    $('#divCRMTransportMasterList').hide();
    $('#divCrmTransportMasterEntry').show();
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

    if ($('#txtTransportName').val() == '') {
        alertify.error("Please Enter Transport Name");
        isValid = false;
    }
    else if ($('#txtAddress1').val() == '') {
        alertify.error("Please Enter Transport Address");
        isValid = false;
    }
    else if ($('#ddlState').val() == '') {
        alertify.error("Please Select State");
        isValid = false;
    }
    else if ($('#txtPhone').val() == '') {
        alertify.error("Please Enter Phone No.");
        isValid = false;
    }
    if (isValid) {
        var imgDataURL = '';
        if ($('#imgFU').attr("src") != "Images/fileupload.png") {
            imgDataURL = $('#imgFU').attr("src").toString();
            
        }

        $.ajax({
            type: "POST",
            url: 'wfInventTransportMaster.aspx/CheckAvailability',
            data: JSON.stringify({ "GstNo": $('#txtGST').val() ,"isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {

                    var fd = {};
                    fd.TransportName = $('#txtTransportName').val().trim();
                    fd.Address1 = $('#txtAddress1').val();
                    fd.StateId = $('#ddlState').val();
                    fd.Phone = $('#txtPhone').val();
                    fd.Email = $('#txtEmail').val();
                    fd.Description = $('#txtDescription').val();
                    fd.PhotoImage = imgDataURL;
                    fd.User = $('#ContentPlaceHolder1_loginuser').val();
                    fd.Id = $("#ContentPlaceHolder1_hfId").val();
                    fd.Gst = $("#txtGST").val() == '0' ? '' : $("#txtGST").val();
                    console.log(fd);
                    $.ajax({
                        processData: false,
                        type: "POST",
                        processData: false,
                        url: 'wfInventTransportMaster.aspx/AddTransport',
                        data: JSON.stringify(fd),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            if ($('#btnSave').html() == 'Update') { alertify.success("Transport updated successfully"); ClearAll(); }
                            else {
                                alertify.success("Transport added successfully");
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
                    alertify.error("Gst No. already available");
                    //ClearAll();
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
        '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.TransportName +
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
            url: 'wfInventTransportMaster.aspx/GetTransportImageById',
            data: JSON.stringify({
                "Id": $("#txtTransportName").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d)[0];
                if (data != "" || data !=null) {
                    $(this).attr('src', data.TransportImage);
                }
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