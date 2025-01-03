$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $('#DivSurveyList').hide();
    $('#divPmSurveyEntry').show();
    $('#txtEmployeeName,#txtEmpId').removeAttr("readonly");
    $("#btnSave").html('Save');
    $("#btnSave").show();
    $("#btnBack").hide();
    FetchPmSurveyMasterDetails($('#ContentPlaceHolder1_loginuser').val());
   // BindStateDetails();
    BindPmSurveyMasterDetails($('#ContentPlaceHolder1_loginuser').val());
   // FetchPmSurveyMasterDetails(userId);
});

function BindPmSurveyMasterDetails(userName) {

    $.ajax({
        type: "POST",
        url: 'wfPmSurveyForm.aspx/FetchSurveyList',
        data: JSON.stringify({
            "userName": userName
            // 'fullName': fullName
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPmSurveyList').DataTable().clear();
            $('#tblPmSurveyList').DataTable().destroy();
            $('#tbody_PmSurvey_List').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchPmSurveyDetails(\'' + data[i].UserId + '\' ,\'' + data[i].FullName + '\')">'
                    + '<td> ' + data[i].EmpName + '</td > '
                    + '<td> ' + data[i].Designation + '</td > '
                    + '<td> ' + data[i].Date + '</td > '
                    + '<td> ' + data[i].Branch + '</td > '
                    + '<td> ' + data[i].Year + '</td > '
                    + '<td> ' + data[i].Month + '</td > '
                    + '<td> ' + data[i].SiteName + '</td > '
                    + '<td> ' + data[i].SiteIncharge + '</td > '
                    + '<td>' + data[i].SiteAddress + '</td>'
            }
            $('#tbody_PmSurvey_List').html(html);
            $('#tblPmSurveyList').DataTable();

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
        url: 'wfPmSurveyForm.aspx/StateList',
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

function FetchPmSurveyMasterDetails(userId) {
   
    $.ajax({
        type: "POST",
        url: 'wfPmSurveyForm.aspx/FetchPmSurveyMasterDetails',
        data: JSON.stringify({
            "userId": userId
           // 'fullName': fullName
        }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {


        },
        success: function (response) {

            var data = JSON.parse(response.d);
            //ClearAll();
            //$('#divPmSurveyList').hide();
            //$('#divPmSurveyEntry').show();
            $("#btnSave").html('Save');
            $('#txtUserId,#txtFullName').attr("readonly", "readonly");
            $("#btnSave").show();


            $('#txtUserId').val(data[0].UserName);
            $('#txtFullName').val(data[0].EmpId);
           // $('#txtAddress').val(data[0].Address);
            //$('#txtPhoneNo').val(data[0].PhoneNo);
            //$('#txtPincode').val(data[0].Pincode);
            //$('#ddlState').val(data[0].StateId);
            //$('#txtPassword').val(data[0].Password);
            //$('#txtCity').val(data[0].City);

            // $('#chkActive').prop('checked', data[0].Active === "Y");

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function GoBack() {
    $('#DivSurveyList').hide();
    $('#divPmSurveyEntry').show();
    $('#btnBack').hide();
    $('#txtEmployeeName,#txtEmpId').removeAttr("readonly");
    $("#btnSave").html('Save');
    $("#btnSave").show();
    FetchPmSurveyMasterDetails($('#ContentPlaceHolder1_loginuser').val());
}
function ViewSurveyList() {
    $('#DivSurveyList').show();
    $('#divPmSurveyEntry').hide();
    $('#btnSave').hide();
    $('#btnBack').show();

    BindPmSurveyMasterDetails($('#ContentPlaceHolder1_loginuser').val());
}


function ClearAll() {
    $('#txtDesignation,#txtDate,#txtBranch,lblUploadResult').val('');

}


function AddPMSurveyDetails() {
   
    var isUpdate = 0;
    var isValid = true;
    if ($('#btnSave').html() == 'Update') {
        isUpdate = 1;
    }

    if ($('#txtUserId').val() == '') {
        alertify.error("Please check Emp Id is blank");
        isValid = false;
    }
    else if ($('#txtFullName').val() == '') {
        alertify.error("Employee Name not present");
        isValid = false;
    }
    
    else if ($('#txtDesignation').val() == '') {
        alertify.error("Please Enter Designation");
        isValid = false;
    }
    if (isValid) {

        //$.ajax({
        //    type: "POST",
        //    url: 'wfPmSurveyForm.aspx/CheckUserAvailability',
        //    //url: 'wfHrBranchMasterNew.aspx/CheckBranchAvailability',

        //    data: JSON.stringify({ "userId": $('#txtUserId').val(), 'fullName': $('#txtFullName').val(), "isUpdate": isUpdate }),
        //    //data: JSON.stringify({ "branchCode": $('#txtBranchCode').val(), 'branchName': $('#txtBranchName').val(), "isUpdate": isUpdate }),

        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    beforeSend: function () {

        //    },
        //    success: function (response) {
        //        var data = JSON.parse(response.d);

        //        if (data == 'False') {

                    $.ajax({
                        type: "POST",
                        url: 'wfPmSurveyForm.aspx/AddPMSurveyDetails',
                        data: JSON.stringify({
                            "userId": $('#txtFullName').val().trim(),
                            "userName": $('#txtUserId').val().trim(),
                            "designation": $('#txtDesignation').val().trim(),
                            "date": $('#txtDate').val().trim(),
                            "branch": $('#txtBranch').val().trim(),
                            "loginUser": $('#ContentPlaceHolder1_loginuser').val()

                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            UploadFiles();
                            //alertify.success("Survey Master added successfully");
                            ClearAll();

                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                //}
                //else {
                //    alertify.error("Current User Details already available");
                //}
        //    },
        //    complete: function () {

        //    },
        //    failure: function (jqXHR, textStatus, errorThrown) {

        //    }
        //});
    }
}
//function uploadFile() {
//    var formData = new FormData();
//   // var fileInput = $('#excelFile')[0].files[0];

//    //formData.append('file', fileInput);

//    $.ajax({
//        url: "FileSurveyUploadHandler.ashx",  // Your server-side C# method URL
//        type: 'POST',
//        data: formData,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            alert('File uploaded successfully');
//        },
//        error: function (xhr, status, error) {
//            alert('Error: ' + error);
//        }
//    });
//}
function UploadFiles() {
    var data = new FormData();
    var fileInput = $('#excelFile')[0].files[0];

    data.append('file', fileInput);
    $.ajax({
        url: "FileSurveyUploadHandler.ashx",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
                            console.log(result.d);
                            if ($('#btnSave').html() == 'Update') {
                                alertify.success("Survey Master updated successfully");
                            }
                            else {
                                alertify.success("Survey Master added successfully");
                                ClearAll();
                            }

         },
        //error: function (err) {
        //    alert(err.statusText)
        //}
        error: function (xhr, status, error) {
            // This will handle the error response
            if (xhr.status === 400) { // Check if the error is a "Bad Request"
                alert(xhr.responseText);
            }// Display the server's error message
                else if (xhr.status === 500) { // Check if the error is a "Bad Request"
                    alert(xhr.responseText); 
            } else {
                alert("An error occurred: " + error); // Generic error handling
            }
        }
    });
}
//function UploadFiles() {
//    debugger;
//    //$(document).ready(function () {
//      //  $('#uploadBtn').click(function () {

//           // var fileUpload = $('#fileUpload').get(0);
//            //var files = fileUpload.files;

//            var data = new FormData();
//           // data.append('file', files[0]);

//            $.ajax({
//                url: "FileSurveyUploadHandler.ashx",
//                type: "POST",
//                data: data,
//                contentType: false,
//                processData: false,
//                success: function (result) {
//                    console.log(result.d);
//                    if ($('#btnSave').html() == 'Update') {
//                        alertify.success("Survey Master updated successfully");
//                    }
//                    else {
//                        alertify.success("Survey Master added successfully");
//                        ClearAll();
//                    }

//                },
//                error: function (err) {
//                    alert(err.d);
//                    alert(err.statusText)
//                }
//            });
//       // });
    
//}
/*function UploadFiles() {
    debugger;
    $(document).ready(function () {
        $('#Button_Upload').click(function () {
            var fileUpload = $('#FileUpload1').get(0);
            var files = fileUpload.files;

            if (files.length === 0) {
                alert('Please select a file.');
                return;
            }

            var data = new FormData();
            data.append('file', files[0]);

            $.ajax({
                url: "FileSurveyUploadHandler.ashx",
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {
                    if ($('#btnSave').html() == 'Update') {
                        alertify.success("Survey Master updated successfully");
                    }
                    else {
                        alertify.success("Survey Master added successfully");
                        //ClearAll();
                    }

                },
                error: function (err) {
                    alert(err.statusText)
                }
            });
        });
    });
}*/