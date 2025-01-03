$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });

    BindPackageMasterDetails();
    BindUnitMesureDropdown();
    keepDatalistOptions('.keepDatalist');
});
function BindUnitMesureDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemPackagingMaster.aspx/UnitMesureList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var uom = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                uom = uom + "<option value='" + JSON.parse(response.d)[i].UnitMesureName + "'>" + JSON.parse(response.d)[i].UnitMesureName + "</option>";
            }
            $('#ddlUOM').append(uom);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindPackageMasterDetails() {
    $.ajax({
        type: "POST",
        url: 'wfMmItemPackagingMaster.aspx/GetPackageList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPackageMasterList').DataTable().clear();
            $('#tblPackageMasterList').DataTable().destroy();
            $('#tbody_PackageMaster_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchPackageMaster(\'' + data[i].Id + '\')" style="cursor:pointer">'
                    + '<td> ' + data[i].PackagingName + '</td > '
                    + '<td> ' + data[i].UnitMesure + '</td > '
            }
            $('#tbody_PackageMaster_List').html(html);
            $('#tblPackageMasterList').DataTable();
            createKanbanViewTable(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function FetchPackageMaster(Id) {
    $.ajax({
        type: "POST",
        url: 'wfMmItemPackagingMaster.aspx/GetPackageById',
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
            $('#divPackageMasterList').hide();
            $('#divPackageMasterEntry').show();
            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#txtPackageName').attr("readonly", "readonly");
            $('#txtPackageName').val(data.PackagingName);

            $('#hfBase64').val(data.PhotoImage);
            $("#imgFU").attr('src', data.PhotoImage);

            $('#txtDescription').val(data.Description);
            $('#ddlUOM').val(data.UnitMesure); 

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function ViewPackageMasterList() {
    $('#divPackageMasterList').show();
    $('#divPackageMasterEntry').hide();
    $('#btnSave').hide();
    BindPackageMasterDetails();

}


function ClearAll() {
   
    $('#txtPackageName').removeAttr("readonly", "readonly");
    $("#txtPackageName").val('');
    $("#txtDescription").val('');
    $("#ddlUOM").val('');
    $('#imgFU,#ContentPlaceHolder1_hfBase64').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
    //$('#chkActive').prop('checked', false);
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#btnSave').html('Save');
}

function CreatePackageMasterList() {
    $('#divPackageMasterList').hide();
    $('#divPackageMasterEntry').show();
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

    if ($('#txtPackageName').val() == '') {
        alertify.error("Please Enter Packaging Name");
        isValid = false;
    }

    if (isValid) {
        var imgDataURL = '';
        if ($('#imgFU').attr("src") != "Images/fileupload.png") {
            imgDataURL = $('#imgFU').attr("src").toString();
        }

        $.ajax({
            type: "POST",
            url: 'wfMmItemPackagingMaster.aspx/CheckJobAvailability',
            data: JSON.stringify({ "PackageName": $('#txtPackageName').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    var fd = {};

                    fd.PackageName = $('#txtPackageName').val().trim();
                    fd.Description = $('#txtDescription').val();
                    fd.UOM = $('#ddlUOM').val();
                    fd.PhotoImage = imgDataURL;
                    fd.User = $('#ContentPlaceHolder1_loginuser').val();
                    fd.Id = $("#ContentPlaceHolder1_hfId").val();
                    $.ajax({
                        processData: false,
                        type: "POST",
                        processData: false,
                        url: 'wfMmItemPackagingMaster.aspx/AddPackage',
                        data: JSON.stringify(fd),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            if ($('#btnSave').html() == 'Update') { alertify.success("Item Package updated successfully"); ClearAll(); }
                            else {
                                alertify.success("Item Package added successfully");
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
                    alertify.error("Packaging Name already available");
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
        '<img class="kanban-img"  src="' + item.PhotoImage + '" style="width: 80px;height:96px; text-align: top;"></td>' +
        '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.PackagingName + 
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
            url: 'wfMmItemPackagingMaster.aspx/GetPackageImageById',
            data: JSON.stringify({
                "Id": $("#txtPackageName").val()
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