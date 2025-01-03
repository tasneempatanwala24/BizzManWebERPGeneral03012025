var ParentId = 0;
var PhotoImg = "";
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    ViewDataList();
    BindYearDropdown();
    BindMonthDropdown();
    BindBranchDropdown();
    BindLeaveStatusDropdown();
    $("#ddlBranch").on("change", function () {
        BindEmployeeDropdown();
        
        $("#ddlMonth").val('');
    }).trigger("change");
    $("#ddlEmployee").on("change", function () {
        ShowEmployeeName();
        
        $("#ddlMonth").val('');
    }).trigger("change");
    $('#txtLeaveDay').datepicker({
        format: "dd-M-yyyy",
        viewMode: "days",
        minViewMode: "days",
        autoclose: true,
        enableOnReadonly: false,
        changeMonth: true,
        changeYear: true
    });
    $("#ddlMonth").on("change", function () {
        $("#txtLeaveApplicationDate").val('');

        if ($("#ddlMonth").val() != '') {
            var year = $('#ddlYear').val(); //get year
            var month = $('#ddlMonth').val(); //get month
            $('#txtLeaveApplicationDate').datepicker('destroy').datepicker({
                format: "dd-M-yyyy",
                viewMode: "days",
                minViewMode: "days",
                autoclose: true,
                //todayHighlight: true,
                enableOnReadonly: false,
                changeMonth: true,
                changeYear: true,
                //defaultDate: new Date(year, new Date(month + " 1," + year).getMonth(), '01'),
                startDate: new Date(year, new Date(month + " 1," + year).getMonth(), '01'), //set it here
                endDate: new Date(year, new Date(month + " 1," + year).getMonth(), new Date(year, new Date(month + " 1," + year).getMonth() + 1, 0).getDate())
            });
        }

        if ($("#ddlBranch").val() == '') {
            alertify.error("Please select Branch");
            $("#ddlMonth").val('');
            return false;
        }

        else if ($("#ddlEmployee").val() == '') {
            alertify.error("Please select Employee");
            $("#ddlMonth").val('');
            return false;
        }
        else if ($("#ddlYear").val() == '' && $("#ddlMonth").val() != '') {

            alertify.error("Please select Year");
            $("#ddlMonth").val('');
            return false;
        }
    }).trigger("change");
    keepDatalistOptions('.keepDatalist');
    if ($("#ddlBranch").val() != '') {
        const fileInput = document.getElementById('fuImg');

        // Add event listener to handle file selection
        fileInput.addEventListener('change', handleFileSelect);

        // Function to handle file selection
        function handleFileSelect(event) {
            const selectedFile = event.target.files[0];

            // Display selected file information (e.g., name, type, size)
            console.log('Selected file:', selectedFile);
        }
    }
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
function BindBranchDropdown() {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/BranchMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var branch = "<option value=''>-Select Branch-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                branch = branch + "<option value='" + JSON.parse(response.d)[i].BranchCode + "'>" + JSON.parse(response.d)[i].BranchName + "</option>";
            }
            $('#ddlBranch').append(branch);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function BindEmployeeDropdown() {
    $('#txtEmpName').val('');
    if ($('#ddlBranch').val() == '') {
        $('#ddlEmployee').html("<option value>-Select Employee-</option>");
        $('#ddlEmployee').select2();
        $('#txtEmpName').val('');
        $("#ddlYear").val('');
    }

    else {

        $.ajax({
            type: "POST",
            url: 'wfHrEmpLeaveApplication.aspx/EmployeeMasterList',
            data: JSON.stringify({
                "branchid": $('#ddlBranch').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                $('#ddlEmployee').html('');
                var data = JSON.parse(response.d);
                var emp = "<option value=''>-Select Employee-</option>";
                for (var i = 0; i < JSON.parse(response.d).length; i++) {
                    emp = emp + "<option value='" + JSON.parse(response.d)[i].EmpId + "'>" + JSON.parse(response.d)[i].EmpName + "</option>";

                }
                $('#ddlEmployee').append(emp);

            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function BindLeaveStatusDropdown() {
    $('#ddlLeaveStatus').html('');
    var html = "<option value=''>-Select Leave Status-</option>";
    html = html + "<option value='Process'>Process</option><option value='Approved'>Approved</option><option value='Cancel'>Cancel</option><option value='Hold'>Hold</option>";
    $('#ddlLeaveStatus').html(html);
    $('#ddlLeaveStatus').val("Process");
}
function ShowEmployeeName() {
    if ($('#ddlEmployee').val() == null || $('#ddlEmployee').val() == '') {
        $('#txtEmpName').val('');
        $("#ddlYear").val('');
    }
    else {
        FetchEmployeeDetails($('#ddlEmployee').val());
        $("#ddlYear").val((new Date).getFullYear());
    }
}
function FetchEmployeeDetails(empid) {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/FetchEmployeeDetails',
        data: JSON.stringify({
            "EmpId": empid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {

            var data = JSON.parse(response.d);
            $('#txtEmpName').val(data[0].EmpName);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindYearDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/YearList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].Year + "'>" + JSON.parse(response.d)[i].Year + "</option>";
            }
            $('#ddlYear').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BindMonthDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/MonthList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var abranch = "";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                abranch = abranch + "<option value='" + JSON.parse(response.d)[i].MonthName + "'>" + JSON.parse(response.d)[i].MonthName + "</option>";
            }
            $('#ddlMonth').append(abranch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ClearAll() {
    $('#ddlBranch').val('');
    $('#ddlEmployee').val('');
    $('#txtEmpName').val('');
    $('#txtLeaveApplicationId').val('');
    $('#ddlYear').val('');
    $('#ddlMonth').val('');
    $('#txtTotalDay').val('');
    $('#txtLeaveApplicationDate').val('');
    $('#txtDescription').val('');
    $('#ddlLeaveStatus').val('Process');
    $('#tbody_LeaveDetail').children('tr:not(:first)').remove();
    $('#imgFU,#ContentPlaceHolder1_hfBase64').val('');
    $("#imgFU").attr('src', 'Images/fileupload.png');
    $("#ContentPlaceHolder1_hfId").val("0");
    $('#fuImg').attr("src", "Images/fileupload.png");
    $("#btnSave").html('Save');
    $("#btnSave").show();
    $('#btnUploadFile').show();
    $('#btnDisplayData').show();
    $('#ddlBranch').attr("disabled", false);
    $('#ddlEmployee').attr("disabled", false);
    $('#ddlYear').attr("disabled", false);
    $('#ddlMonth').attr("disabled", false);
    $('#txtEmpName').attr("readonly", "readonly");
    $('#txtLeaveApplicationId').attr("readonly", "readonly");
    $('#txtTotalDay').attr("readonly", "readonly");
    $('#ddlLeaveStatus').attr("disabled", true);
    $('#txtLeaveApplicationDate').attr("disabled", false);
    $('#btnDisplayData').hide();
}
function CreateData() {
    $('#divDataList').hide();
    $('#divDetailDataList').hide();
    $('#divDataEntry').show();

    $("#btnSave").html('Save');
    $('#btnSave').show();
    $('#btnUploadFile').show();
    //$('#btnDisplayData').show();

    $('#ddlBranch').attr("disabled", false);
    $('#ddlLeaveStatus').attr("disabled", true);
    $('#ddlEmployee').attr("disabled", false);
    $('#txtEmpName').attr("readonly", "readonly");
    $('#txtLeaveApplicationId').attr("readonly", "readonly");
    $('#ddlYear').attr("disabled", false);
    $('#ddlMonth').attr("disabled", false);
    $('#txtTotalDay').attr("readonly", "readonly");
    $('#txtLeaveApplicationDate').removeAttr("readonly");
    ClearAll();

}
function ViewDataList() {
    $('#divDataList').show();
    $('#btnSave').hide();
    $('#divDataEntry').hide();
    $('#btnUploadFile').hide();
    $('#btnDisplayData').hide();
    $('#tbody_LeaveDetail').children('tr:not(:first)').remove();
    BindEmpLeaveList();
}

function BindEmpLeaveList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/FetchEmpLeaveList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmpLeaveList').DataTable().clear();
            $('#tblEmpLeaveList').DataTable().destroy();
            $('#tbody_EmpLeave_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmpLeaveDetails(\'' + data[i].LeaveApplicationId + '\')"><td>' + data[i].LeaveApplicationId + '</td>'
                    //html = html + '<tr><td>' + data[i].Id + '</td>'
                    + '<td>' + data[i].BranchName + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + data[i].Year + '</td>'
                    + '<td>' + data[i].Month + '</td>'
                    + '<td>' + data[i].TotalDay + '</td></tr > ';
            }
            $('#tbody_EmpLeave_List').html(html);
            $('#tblEmpLeaveList').DataTable();
            //createKanbanViewTable(data);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function FetchLeaveDetailList(LeaveApplicationId) {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/FetchEmpLeaveDataDetails',
        data: JSON.stringify({
            "LeaveApplicationId": LeaveApplicationId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);

            var html = '';
            for (var i = 0; i < data.length; i++) {
                $('#tbody_LeaveDetail').append('<tr>'
                    + '<td>' + data[i].LeaveDay + '</td>'
                    + '<td>' + data[i].DetailDescription + '</td>'
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
function DeleteLeaveDetailData(Id, LeaveApplicationId) {

    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/DeleteLeaveDetailData',
        data: JSON.stringify({
            "Id": Id,
            "LeaveApplicationId": LeaveApplicationId
        }),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {

        },
        success: function (response) {
            var r = JSON.parse(response.d);

            if (r.status == "success") {
                alertify.success('Employee Leaves detail deleted successfully');
                BindEmpOTDetailList();
            }
            else {
                console.log("error log:", r.msg);
                alertify.error('Something went wrong, please try again later');
            }


        },
        failure: function (response) {
            var r = JSON.parse(response.d);
            console.log("error log:", r.msg);
            alertify.error('failure. Something went wrong, please try again later');

        },
        error: function (response) {
            var r = JSON.parse(response.d);
            console.log("error log:", r.msg);
            alertify.error('Error. Something went wrong, please try again later');

        }

    });
}
function DeleteRow(ele) {
    $(ele.parentElement.parentElement).remove();
}
function AddData() {
    var OTD = new Date($('#txtLeaveApplicationDate').val());
    var OTmonth = OTD.toLocaleString('default', { month: 'short' });
    var isUpdate = 0;
    var isValid = true;
    var emp_leave_details = '';
    $('#tbody_LeaveDetail tr').each(function (index1, tr) {
        if (index1 > 0) {
            $(tr).find('td').each(function (index, td) {
                if (index1 == 1) {
                    if (emp_leave_details == '') {
                        if (index == 0) {
                            emp_leave_details = td.outerText;
                        }

                    }
                    else {
                        if (index == 1) {
                            emp_leave_details = emp_leave_details + '|' + td.outerText;
                        }
                        else if (index == 3) {
                            emp_leave_details = emp_leave_details + '$' + td.outerText;
                        }
                    }
                }
                else {
                    if (index == 0) {
                        emp_leave_details = emp_leave_details + '@' + td.outerText;
                    }
                    else if (index == 1) {
                        emp_leave_details = emp_leave_details + '|' + td.outerText;
                    }
                    else if (index == 3) {
                        emp_leave_details = emp_leave_details + '$' + td.outerText;
                    }
                }
            });
        }
    });
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }
    if ($('#ddlBranch').val() == '') {
        alertify.error("Please select Branch");
        isValid = false;
    }
    else if ($('#ddlEmployee').val() == '') {
        alertify.error("Please select Employee");
        isValid = false;
    }
    else if ($('#Year').val() == '') {
        alertify.error("Please select Year");
        isValid = false;
    }
    else if ($('#ddlMonth').val() == '') {
        alertify.error("Please select Month");
        isValid = false;
    }
    else if ($('#txtDescription').val() == '') {
        alertify.error("Please enter reason");
        isValid = false;
    }
    else if ($('#txtLeaveApplicationDate').val() == '') {
        alertify.error("Please select Leave Application Date");
        isValid = false;
    }
    else if (OTmonth != $('#ddlMonth').val()) {
        alertify.error("Leave Application Date Month doesnot match with Month selected");
        isValid = false;
    }
    else if (emp_leave_details == '') {
        alertify.error("Please enter leave details");
        isValid = false;
    }
    
    if (isValid) {
        var imgDataURL = '';
        if ($('#fuImg').attr("src") != "Images/fileupload.png") {
            imgDataURL = $('#fuImg').attr("src").toString();
        }
        $.ajax({
            type: "POST",
            url: 'wfHrEmpLeaveApplication.aspx/CheckDataAvailability',
            data: JSON.stringify({ "EmpId": $('#ddlEmployee').val(), "LeaveStatus": $('#ddlLeaveStatus').val(), "isUpdate": isUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpLeaveApplication.aspx/AddData',
                        data: JSON.stringify({
                            "BranchCode": $('#ddlBranch').val(),
                            "EmpId": $('#ddlEmployee').val(),
                            "Year": $('#ddlYear').val(),
                            "Month": $('#ddlMonth').val(),
                            "LeaveApplicationDate": $('#txtLeaveApplicationDate').val().trim(),
                            "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                            "Description": $('#txtDescription').val(),
                            "LeaveStatus": $('#ddlLeaveStatus').val(),
                            "emp_leave_details": emp_leave_details,
                            "PhotoImage":imgDataURL
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            var r = JSON.parse(response.d);
                            if (r.status == "success") {
                                if ($('#btnSave').html() == 'Update') { alertify.success('Emp Leave updated successfully'); }
                                else { alertify.success('Emp Leave added successfully'); }
                                ClearAll();
                            }
                            else {
                                console.log("error log:", r.msg);
                                alertify.error('Something went wrong, please try again later');
                            }
                        },
                        failure: function (response) {
                            var r = JSON.parse(response.d);
                            alertify.error('failure. Something went wrong, please try again later');

                        },
                        error: function (response) {
                            var r = JSON.parse(response.d);
                            alertify.error('Error. Something went wrong, please try again later');

                        }
                    });
                }
                else {
                    alertify.error('Cannot process leave application, your leave is already approved.');
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}
function AddEmpLeaveDetail() {
    if ($('#txtLeaveDay').val() != '') {
        if ($('#txtDetailDescription').val() != '') {
            $('#tbody_LeaveDetail').append('<tr>'
                    + '<td>' + $("#txtLeaveDay").val() + '</td>'
                    + '<td>' + $("#txtDetailDescription").val() + '</td>'
                    + '<td><a onclick="DeleteRow(this);" style="cursor:pointer;"><i class="fa fa-trash" aria-hidden="true"></i></a></td>'
                    + '</tr>');
                $('#txtLeaveDay').val('');
                $("#txtDetailDescription").val('');
            }
            else {
                alertify.error('Please enter detail reason');
            }
    }
    else {
            alertify.error('Please enter leave day');
    }
    

}
function FetchEmpLeaveDetails(LeaveApplicationId) {
    
    $.ajax({
        type: "POST",
        url: 'wfHrEmpLeaveApplication.aspx/FetchEmpLeaveDetails',
        data: JSON.stringify({
            "LeaveApplicationId": LeaveApplicationId
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },

        success: function (response) {
            $('#divDataList').hide();
            $('#divDataEntry').show();
            var data = JSON.parse(response.d);
            
            $("#btnSave").html('Update');
            $("#btnSave").show();
            $('#btnUploadFile').show();
            $('#btnDisplayData').show();
            $('#ddlBranch').attr("disabled", true);
            $('#ddlEmployee').attr("disabled", true);
            $('#ddlYear').attr("disabled", true);
            $('#ddlMonth').attr("disabled", true);
            $('#txtEmpName').attr("readonly", "readonly");
            $('#txtLeaveApplicationId').attr("readonly", "readonly");
            $('#txtTotalDay').attr("readonly", "readonly");
            
            if (data[0].LeaveStatus == 'Approved' || data[0].LeaveStatus == 'Cancel') {
                $('#ddlLeaveStatus').attr("disabled", true);
                $("#btnSave").hide();
            }
            else {
                $('#ddlLeaveStatus').attr("disabled", false);
                
            }
            $('#txtLeaveApplicationDate').attr("readonly", "readonly");
            $('#ddlBranch').val(data[0].BranchCode);
            $('#ddlEmployee').html("<option value = ''> -Select Employee -</option><option value='" + data[0].EmpId + "' selected>" + data[0].EmpName + "</option>");
            $('#ddlEmployee').val(data[0].EmpId).attr("selected", true);
            $('#txtEmpName').val(data[0].EmpName);
            $('#ddlYear').val(data[0].Year);
            $('#ddlMonth').val(data[0].Month);
            $('#txtLeaveApplicationId').val(data[0].LeaveApplicationId);
            $('#txtTotalDay').val(data[0].TotalDay);
            $('#txtLeaveApplicationDate').val(data[0].LeaveApplicationDate);
            $('#txtDescription').val(data[0].Description);
            $('#ddlLeaveStatus').val(data[0].LeaveStatus);
            $('#hfBase64').val(data[0].PhotoImage);
            $("#imgFU").attr('src', data[0].PhotoImage);
            $("#ContentPlaceHolder1_hfId").val(data[0].LeaveApplicationId);
            FetchLeaveDetailList(data[0].LeaveApplicationId);
            PhotoImg = data[0].PhotoImage;
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function readURL(input) {
    console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#fuImg')
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
        '<td style="width:70%; vertical-align: top; padding-top: 10px;font-size:small"><span style="font-size:small">' + item.EmpName +
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
function showAllImages() {

    $(".kanban-img").each(function (item) {
        $.ajax({
            type: "POST",
            url: 'wfHrEmpLeaveApplication.aspx/GetEmpImageById',
            data: JSON.stringify({
                "Id": item.LeaveApplicationId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d);
                $(this).attr('src', data[0].PhotoImage);
            }
        });

    });
}
function decodeBase64Image(dataUrl) {
    // Split the data URL into two parts: metadata and base64 encoded data
    var parts = dataUrl.split(',');
    var mimeType = parts[0].split(':')[1].split(';')[0];
    var base64Data = parts[1];

    // Convert base64 encoded data to a binary string
    var binaryString = window.atob(base64Data);

    // Create a Uint8Array to hold the binary data
    var bytes = new Uint8Array(binaryString.length);

    // Populate the Uint8Array with binary data
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Return an object containing the decoded image data and its MIME type
    return {
        data: bytes,
        mimeType: mimeType
    };
}