
$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    BindSalaryGradeDropdown();
    BindDepartmentDropdown();
    BindDivisionDropdown();
    BindDesignationDropdown();
    BindGradeDropdown();

    BindBranchDropdown();
    BindAreaDropdown();
    BindBankBranchAutocomplete();
    BindAddressStateAutocomplete();
    BindAddressPinAutocomplete();
    BindAddressPostAutocomplete();
    BindAddressDistrictAutocomplete();
    BindBankNameAutocomplete();
    BindEmployeeList();
    

    $("#txtDOB").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        );
    }).trigger("change");

    $('.numberonly').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode

        if (String.fromCharCode(charCode).match(/[^0-9]/g))

            return false;

    });

    $("#imgupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgPhoto")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });


    $("#Adharupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgAdhar")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#Voterupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgVoter")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });


    $("#Panupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgPan")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#Passportupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgPassport")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#DrivingLicenseupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgDrivingLicence")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });


    $("#Bankupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgBank")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#fatherAdharupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgFatherAdhar")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#motherAdharupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgMotherAdhar")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    $("#spouseAdharupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgSpouseAdhar")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });



    $("#NomineeAdharupload").change(function () {
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $("#imgNomineeAdhar")
                    .attr("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    var btnAdharDisplay = document.getElementById("btnAdharDisplay");
    var btnVoterDisplay = document.getElementById("btnVoterDisplay");
    var btnPANDisplay = document.getElementById("btnPANDisplay");
    var btnPassportDisplay = document.getElementById("btnPassportDisplay");
    var btnDrivingLicenceDisplay = document.getElementById("btnDrivingLicenceDisplay");
    var btnBankDisplay = document.getElementById("btnBankDisplay");
    var btnFatherAdharDisplay = document.getElementById("btnFatherAdharDisplay");
    var btnMotherAdharDisplay = document.getElementById("btnMotherAdharDisplay");
    var btnSpouseAdharDisplay = document.getElementById("btnSpouseAdharDisplay");
    var btnNomineeAdharDisplay = document.getElementById("btnNomineeAdharDisplay");
    var modal = document.getElementById("myModal");

    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    btnAdharDisplay.onclick = function () {

        modal.style.display = "block";
        modalImg.src = $('#imgAdhar')[0].src;



        //captionText.innerHTML = this.alt;
    }

    btnVoterDisplay.onclick = function () {
        modal.style.display = "block";
        modalImg.src = $('#imgVoter')[0].src;
        //captionText.innerHTML = this.alt;
    }


    btnPANDisplay.onclick = function () {
        modal.style.display = "block";
        modalImg.src = $('#imgPan')[0].src;
        //captionText.innerHTML = this.alt;
    }

    btnPassportDisplay.onclick = function () {
        modal.style.display = "block";
        modalImg.src = $('#imgPassport')[0].src;
        //captionText.innerHTML = this.alt;
    }

    btnDrivingLicenceDisplay.onclick = function () {
        modal.style.display = "block";
        modalImg.src = $('#imgDrivingLicence')[0].src;
        //captionText.innerHTML = this.alt;
    }

    btnBankDisplay.onclick = function () {
        modal.style.display = "block";
        modalImg.src = $('#imgBank')[0].src;
        //captionText.innerHTML = this.alt;
    }

    btnFatherAdharDisplay.onclick = function () {

        modal.style.display = "block";
        modalImg.src = $('#imgFatherAdhar')[0].src;



        //captionText.innerHTML = this.alt;
    }


    btnMotherAdharDisplay.onclick = function () {

        modal.style.display = "block";
        modalImg.src = $('#imgMotherAdhar')[0].src;
    }

    btnSpouseAdharDisplay.onclick = function () {

        modal.style.display = "block";
        modalImg.src = $('#imgSpouseAdhar')[0].src;

    }

    btnNomineeAdharDisplay.onclick = function () {

        modal.style.display = "block";
        modalImg.src = $('#imgNomineeAdhar')[0].src;

    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }



    let certificateCount = 1;

    $('#addPostGraduate').click(function () {
        const postGraduateFields =
            `<fieldset> <legend>Post Graduate</legend><div class="form-group"><label>Exam Name</label> <input type="text" class="form-control" name="postGraduateExamName"> </div> <div class="row">
            <div class="form-group col-md-6">
                        <label>Exam Board</label>
                        <input type="text" class="form-control" name="postGraduationExamBoard">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Subject</label>
                        <input type="text" class="form-control" name="postGraduationSubject">
                    </div>
                    </div >
            <div class="row">
                <div class="form-group col-md-6">
                    <label>Percentage</label>
                    <input type="text" class="form-control" name="postGraduationPercentage">
                </div>
                <div class="form-group col-md-6">
                    <label>Year of Passing</label>
                    <input type="text" class="form-control" name="postGraduationYearPass">
                </div>
            </div></fieldset>`

        $('#postGraduateFields').html(postGraduateFields);
        $(this).hide();
    });

    $('#addCertificate').click(function () {
        if (certificateCount < 3) {
            certificateCount++;
            var certificateField =
                '<fieldset> <legend>Certificate ' + certificateCount + '</legend><div class="row Certificate"><div class="form-group col-md-8"><label>Name</label> <input type="text" class="form-control" id="certificate' + certificateCount + 'Name"></input></div>';
            certificateField += '<div class="form-group col-md-4"><label>Year of Passing</label> <input type="text" class="form-control" id="certificate' + certificateCount + 'YearPass"></input></div></div></fieldset>';
            $('#certificateFields').append(certificateField);
        } else {
            $(this).hide();

        }
    });



    //===================================New code==============================

    $('#btnFamilyAdharUpload').click(function () {
        $('#familyAdharupload').click();
    });

    $('#familyAdharupload').change(function () {
        var file = $(this)[0].files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgFamilyAdhar').attr('src', e.target.result);
            $('#btnFamilyAdharDisplay').show();
            //$('#imgFamilyAdhar').show();
        };
        reader.readAsDataURL(file);
        $('#familyadharUploadMessage').text('Uploaded');
    });

    $('#btnFamilyAdharDisplay').click(function () {
        // Display larger image or perform any other action
        // event.preventDefault();
        var modal = document.getElementById("myModal");

        var modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = $('#imgFamilyAdhar')[0].src;
    });
      //===========================================================================
    $('#btnSaveFamilyDetails').click(function () {
        if ($('#tbody_SalesOrderDetails tr').length == 6) {
            alertify.error('Max 5 Family members can be added..');
            return;
        }
        var name = $('#txtFamilyName').val();
        var dob = $('#txtFamilyDOB').val();
        var relation = $('#ddlRelation').val();
        var adhaar = $('#txtFamilyAdhaar').val();
        var imgData = $('#imgFamilyAdhar').attr('src');

        var newRow = '<tr>' +
            '<td>' + name + '</td>' +
            '<td>' + dob + '</td>' +
            '<td>' + relation + '</td>' +
            '<td>' + adhaar + '</td>' +
            '<td><img src="' + imgData + '" style="width: 50px; height: 50px;" /></td>' +
            '<td><button type="button" class="btn btn-primary btnRemoveRow">Remove</button></td>' +
            '</tr>';

        $('#tbody_SalesOrderDetails').append(newRow);
        clearForm();
    });

    $(document).on('click', '.btnRemoveRow', function () {
        $(this).closest('tr').remove();
    });
    function clearForm() {
        $('#txtFamilyName').val('');
        $('#txtFamilyDOB').val('');
        $('#txtFamilyAdhaar').val('');
        $('#ddlRelation').val('son');
        $('#imgFamilyAdhar').attr('src', '').hide();
        $('#btnFamilyAdharDisplay').hide();
        $('#familyadharUploadMessage').text('');
    }
    //===========================================================================


    //===========================================================================
    $('#btnSaveCertificate').click(function () {
        if ($('#tbody_CertificateDetails tr').length == 4) {
            alertify.error('Max 3 Certificates can be added..');
            return;
        }
        var name = $('#txtCertificateName').val();
        var year = $('#txtCertificateYear').val();
       

        var newRow = '<tr>' +
            '<td>' + name + '</td>' +
            '<td>' + year + '</td>' +
            '<td><button type="button" class="btn btn-primary btnRemoveRow">Remove</button></td>' +
            '</tr>';

        $('#tbody_CertificateDetails').append(newRow);
        clearCertificateForm();
    });

   
    function clearCertificateForm() {
        $('#txtCertificateName').val('');
        $('#txtCertificateYear').val('');
       
    }
    //===========================================================================

    //==================================================================
    $('#btnSaveCompanyDetails').click(function () {
        
        var companyName = $('#txtCompanyName').val();
        var companyAddress = $('#txtCompanyAddress').val();
        var companyWebSiteUrl = $('#txtCompanyWebSiteUrl').val();
        var companyEmail = $('#txtCompanyEmail').val();
        var companyPhNo = $('#txtCompanyPhNo').val();
        var designation = $('#txtDesignation').val();
        var role = $('#txtRole').val();
        var lastCTC = $('#txtLastCTC').val();
        var fromDate = $('#txtFromDate').val();
        var toDate = $('#txtToDate').val();
        var reportPersonName = $('#txtReportPersonName').val();
        var reportPersonContactNo = $('#txtReportPersonContactNo').val();
        var description = $('#txtDescription').val();

        var newRow = '<tr>' +
            '<td>' + companyName + '</td>' +
            '<td>' + companyAddress + '</td>' +
            '<td>' + companyWebSiteUrl + '</td>' +
            '<td>' + companyEmail + '</td>' +
            '<td>' + companyPhNo + '</td>' +
            '<td>' + designation + '</td>' +
            '<td>' + role + '</td>' +
            '<td>' + lastCTC + '</td>' +
            '<td>' + fromDate + '</td>' +
            '<td>' + toDate + '</td>' +
            '<td>' + reportPersonName + '</td>' +
            '<td>' + reportPersonContactNo + '</td>' +
            '<td>' + description + '</td>' +
            '<td><button type="button" class="btn btn-primary btnRemoveRow">Remove</button></td>' +
            '</tr>';

        $('#tbody_CompanyDetails').append(newRow);
        clearCompanyForm();
    });

   

    function clearCompanyForm() {
        $('#txtCompanyName').val('');
        $('#txtCompanyAddress').val('');
        $('#txtCompanyWebSiteUrl').val('');
        $('#txtCompanyEmail').val('');
        $('#txtCompanyPhNo').val('');
        $('#txtDesignation').val('');
        $('#txtRole').val('');
        $('#txtLastCTC').val('0');
         $('#txtFromDate').val('');
        $('#txtToDate').val('');
        $('#txtReportPersonName').val('');
        $('#txtReportPersonContactNo').val('');
        $('#txtDescription').val('');
    }
    //==============================================================

});

function HandleAdharUpload() {

    // Show upload success message using jQuery
    $('#adharUploadMessage').text('Adhar Card uploaded successfully.');
}
function HandleVoterUpload() {

    // Show upload success message using jQuery
    $('#voterUploadMessage').text('Voter Card uploaded successfully.');
}
function HandlePanUpload() {

    // Show upload success message using jQuery
    $('#panUploadMessage').text('Pan Card uploaded successfully.');
}
function HandlePassportUpload() {

    // Show upload success message using jQuery
    $('#passportUploadMessage').text('Passport uploaded successfully.');
}
function HandleDrivingUpload() {

    // Show upload success message using jQuery
    $('#drivingUploadMessage').text('Driving License uploaded successfully.');
}
function HandleBankUpload() {

    // Show upload success message using jQuery
    $('#bankUploadMessage').text('Document uploaded successfully.');
}

function HandleFatherAdharUpload() {

    // Show upload success message using jQuery
    $('#fatheradharUploadMessage').text('Adhar Card uploaded successfully.');
}

function HandleMotherAdharUpload() {

    // Show upload success message using jQuery
    $('#motheradharUploadMessage').text('Adhar Card uploaded successfully.');
}


function HandleSpouseAdharUpload() {

    // Show upload success message using jQuery
    $('#spouseadharUploadMessage').text('Adhar Card uploaded successfully.');
}

function HandleNomineeAdharUpload() {

    // Show upload success message using jQuery
    $('#NomineeadharUploadMessage').text('Adhar Card uploaded successfully.');
}


function OpenFileUploader() {
    $('#imgupload').click();
}


function OpenAdharUploader() {
    $('#Adharupload').click();
}
//function HandleAdharUpload() {
//    var fileInput = document.getElementById('Adharupload');
//    var file = fileInput.files[0];
//    var img = document.getElementById('imgAdhar');
//    img.src = URL.createObjectURL(file);
//    img.style.display = 'block';
//}
function OpenVoterUploader() {
    $('#Voterupload').click();
}

function OpenPANUploader() {
    $('#Panupload').click();
}

function OpenPassportUploader() {
    $('#Passportupload').click();
}

function OpenDrivingLicenceUploader() {
    $('#DrivingLicenseupload').click();
}

function OpenBankUploader() {
    $('#Bankupload').click();
}
function OpenFatherAdharUploader() {
    $('#fatherAdharupload').click();
}
function OpenMotherAdharUploader() {
    $('#motherAdharupload').click();
}
function OpenSpouseAdharUploader() {
    $('#spouseAdharupload').click();
}

function OpenNomineeAdharUploader() {
    $('#NomineeAdharupload').click();
}

function BindSalaryGradeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/SalaryGradeMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var salaryGrade = "<option value=''>-Select Salary Grade-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                salaryGrade = salaryGrade + "<option value='" + JSON.parse(response.d)[i].ID + "'>" + JSON.parse(response.d)[i].SalaryGradeName + "</option>";
            }
            $('#ddlSalaryGrade').append(salaryGrade);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function BindDepartmentDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/DepartmentMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var department = "<option value=''>-Select Department-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                department = department + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].DeptName + "</option>";
            }
            $('#ddlDepartment').append(department);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function BindDivisionDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/DivisionMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var division = "<option value=''>-Select Division-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                division = division + "<option value='" + JSON.parse(response.d)[i].ID + "'>" + JSON.parse(response.d)[i].DivisionName + "</option>";
            }
            $('#ddlDivision').append(division);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindDesignationDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/DesignationMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var designation = "<option value=''>-Select Designation-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                designation = designation + "<option value='" + JSON.parse(response.d)[i].ID + "'>" + JSON.parse(response.d)[i].DesignationName + "</option>";
            }
            $('#ddlDesignation').append(designation);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindGradeDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/GradeMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var grade = "<option value=''>-Select Grade-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                grade = grade + "<option value='" + JSON.parse(response.d)[i].ID + "'>" + JSON.parse(response.d)[i].GradeName + "</option>";
            }
            $('#ddlGrade').append(grade);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}




function BindBranchDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/BranchMasterList',
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
            // $('#ddlBankBranch').append(branch);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function BindAreaDropdown() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/AreaMasterList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            var area = "<option value=''>-Select Area-</option>";
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                area = area + "<option value='" + JSON.parse(response.d)[i].Id + "'>" + JSON.parse(response.d)[i].AreaName + "</option>";
            }
            $('#ddlArea').append(area);
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function checkInputGiven(event) {
    var value = event.target.value;
    if (/^\d\.$/.test(value)) { // Checks if input is a single digit followed by a dot
        event.target.value = value.charAt(0); // Sets the value to the single digit
    }
}
function handleNumericInput(event) {
    // Get the input element
    var inputElement = event.target;

    // Remove non-numeric characters (except decimal point)
    var numericValue = inputElement.value.replace(/[^\d.]/g, '');

    // Handle multiple decimal points
    numericValue = numericValue.replace(/(\..*)\./g, '$1');

    // Limit to two decimal places
    numericValue = numericValue.replace(/(\.\d{2})\d+$/g, '$1');

    // If the input starts with a decimal point, add a leading zero
    if (numericValue.charAt(0) === '.') {
        numericValue = '0' + numericValue;
    }

    // Set the default value to 0 if the input is empty
    if (numericValue === '') {
        numericValue = '0';
    }

    // Handle leading zeros
    if (numericValue.length > 1 && numericValue.charAt(0) === '0' && numericValue.charAt(1) !== '.') {
        numericValue = numericValue.slice(1); // Remove leading zero
    }

    // Update the input value
    inputElement.value = numericValue;
}

function AddEmployee() {
    var IsValidMobileNo = 1;

    if ($('#txtMobileNo').val().trim() != '') {
        if ($('#txtMobileNo').val().length != 10) {
            IsValidMobileNo = 0;
        }
    }
    var IsUpdate = 0;
    if ($('#btnSave').html() == 'Update') {
        IsUpdate = 1;
    }
    if ($('#txtEmpId').val().trim() != '') {

        $.ajax({
            type: "POST",
            url: 'wfHrEmpMaster.aspx/CheckEmployeeIdAvailability',
            data: JSON.stringify({ "EmpId": $('#txtEmpId').val(), "IsUpdate": IsUpdate }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {
                var data = JSON.parse(response.d);
                if (data == 'False') {
                    $.ajax({
                        type: "POST",
                        url: 'wfHrEmpMaster.aspx/CheckEmployeeCardNoAvailability',
                        data: JSON.stringify({ "EmpId": $('#txtEmpId').val(), "CardNo": $('#txtCardNo').val() }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {

                        },
                        success: function (response1) {
                            var data1 = JSON.parse(response1.d);
                            if (data1 == 'False') {
                                if ($("input:radio[name='optradioGender']:checked").val() != undefined) {
                                    if ($('#txtName').val().trim() != '') {
                                        if ($('#txtFatherName').val().trim() != '') {
                                            if ($('#txDOB').val().trim() != '') {
                                                if ($("input:radio[name='optradioMaritalStatus']:checked").val() != undefined) {
                                                    if ($('#ddlBranch').val().trim() != '') {
                                                        if ($('#txtPresentAddrPin').val().trim() != '') {
                                                            if ($('#txtPresentAddrPost').val().trim() != '') {
                                                                if ($('#txtPresentAddrState').val().trim() != '') {
                                                                    if ($('#txtPresentAddrDistrict').val().trim() != '') {
                                                                        if ($('#txtPinPermAddr').val().trim() != '') {
                                                                            if ($('#txtPermanentAddrPost').val().trim() != '') {
                                                                                if ($('#txtPermanentAddrState').val().trim() != '') {
                                                                                    if ($('#txtPermanentAddrDistrict').val().trim() != '') {
                                                                                        if ($('#ddlDepartment').val().trim() != '') {
                                                                                            if ($('#ddlDesignation').val().trim() != '') {
                                                                                                if (IsValidMobileNo == 1) {

                                                                                                    showLoader();
                                                                                                    var companyDetails = [];
                                                                                                    $("#tbody_CompanyDetails tr").each(function (i) {
                                                                                                        if (i > 0) {
                                                                                                            var companyName = $(this)[0].cells[0].innerText;
                                                                                                            var companyAddress = $(this)[0].cells[1].innerText;
                                                                                                            var companyWebSiteUrl = $(this)[0].cells[2].innerText;
                                                                                                            var companyEmail = $(this)[0].cells[3].innerText;
                                                                                                            var companyPhNo = $(this)[0].cells[4].innerText;
                                                                                                            var designation = $(this)[0].cells[5].innerText;
                                                                                                            var role = $(this)[0].cells[6].innerText;
                                                                                                            var lastCTC = $(this)[0].cells[7].innerText;
                                                                                                            var fromDate = $(this)[0].cells[8].innerText;
                                                                                                            var toDate = $(this)[0].cells[9].innerText;
                                                                                                            var reportPersonName = $(this)[0].cells[10].innerText;
                                                                                                            var reportPersonContactNo = $(this)[0].cells[11].innerText;
                                                                                                            var description = $(this)[0].cells[12].innerText;

                                                                                                            companyDetails.push({
                                                                                                                CompanyName: companyName,
                                                                                                                CompanyAddress: companyAddress,
                                                                                                                CompanyWebSiteUrl: companyWebSiteUrl,
                                                                                                                CompanyEmail: companyEmail,
                                                                                                                CompanyPhNo: companyPhNo,
                                                                                                                Designation: designation,
                                                                                                                Role: role,
                                                                                                                LastCTC: lastCTC,
                                                                                                                FromDate: fromDate,
                                                                                                                ToDate: toDate,
                                                                                                                ReportPersonName: reportPersonName,
                                                                                                                ReportPersonContactNo: reportPersonContactNo,
                                                                                                                Description: description
                                                                                                            });
                                                                                                        }
                                                                                                    });

                                                                                                    var data = {
                                                                                                        CompanyDetails: companyDetails,
                                                                                                        "EmpId": $('#txtEmpId').val().trim(),
                                                                                                        "Sex": $("input:radio[name='optradioGender']:checked").val(),
                                                                                                        "Name": $('#txtName').val().trim(),
                                                                                                        "FatherName": $('#txtFatherName').val().trim(),
                                                                                                        "MotherName": $('#txtMotherName').val().trim(),
                                                                                                        "SpouseName": $('#txtSpouseName').val().trim(),
                                                                                                        "MobileNo": $('#txtMobileNo').val().trim(),
                                                                                                        "Email": $('#txtEmail').val().trim(),
                                                                                                        "DOB": $('#txDOB').val().trim(),
                                                                                                        "DOJ": $('#txtDOJ').val().trim(),
                                                                                                        "SalaryGrade": $('#ddlSalaryGrade').val().trim(),
                                                                                                        "Religion": $('#ddlReligion').val().trim(),
                                                                                                        "Caste": $('#ddlCaste').val().trim(),
                                                                                                        "Department": $('#ddlDepartment').val().trim(),
                                                                                                        "Division": $('#ddlDivision').val().trim(),
                                                                                                        "Designation": $('#ddlDesignation').val().trim(),
                                                                                                        "Grade": $('#ddlGrade').val().trim(),
                                                                                                        "Area": $('#ddlArea').val().trim(),
                                                                                                        "Branch": $('#ddlBranch').val().trim(),
                                                                                                        "MaritalStatus": $("input:radio[name='optradioMaritalStatus']:checked").val(),
                                                                                                        "PresentAddrResNo": $('#txtResNo').val().trim(),
                                                                                                        "PresentAddrResName": $('#txtResName').val().trim(),
                                                                                                        "PresentAddrRoad": $('#txtRoad').val().trim(),
                                                                                                        "PresentAddrPin": $('#txtPresentAddrPin').val().trim(),
                                                                                                        "PresentAddrPost": $('#txtPresentAddrPost').val().trim(),
                                                                                                        "PresentAddrState": $('#txtPresentAddrState').val().trim(),
                                                                                                        "PresentAddrDistrict": $('#txtPresentAddrDistrict').val().trim(),
                                                                                                        "PermAddrResNo": $('#txtResNoPermAddr').val().trim(),
                                                                                                        "PermAddrResName": $('#txtResNamePermAddr').val().trim(),
                                                                                                        "PermAddrRoad": $('#txtRoadPermAddr').val().trim(),
                                                                                                        "PermAddrPin": $('#txtPinPermAddr').val().trim(),
                                                                                                        "PermAddrPost": $('#txtPermanentAddrPost').val().trim(),
                                                                                                        "PermAddrState": $('#txtPermanentAddrState').val().trim(),
                                                                                                        "PermAddrDistrict": $('#txtPermanentAddrDistrict').val().trim(),
                                                                                                        "ProfileImage": $('#imgPhoto').attr("src") ? $('#imgPhoto').attr("src") : "",//$('#imgPhoto')[0].src.split(',')[1],
                                                                                                        "AdharNo": $('#txtAdharNo').val().trim(),
                                                                                                        "AdharImage": $('#imgAdhar').attr("src") ? $('#imgAdhar').attr("src") : "",//$('#imgAdhar')[0].src.split(',')[1],
                                                                                                        "VoterNo": $('#txtVoterNo').val().trim(),
                                                                                                        "VoterImage": $('#imgVoter').attr("src") ? $('#imgVoter').attr("src") : "",//$('#imgVoter')[0].src.split(',')[1],
                                                                                                        "PANNo": $('#txtPANNo').val().trim(),
                                                                                                        "PANImage": $('#imgPan').attr("src") ? $('#imgPan').attr("src") : "",//$('#imgPan')[0].src.split(',')[1],
                                                                                                        "PassportNo": $('#txtPassport').val().trim(),
                                                                                                        "PassportImage": $('#imgPassport').attr("src") ? $('#imgPassport').attr("src") : "",//$('#imgPassport')[0].src.split(',')[1],
                                                                                                        "DrivingLicense": $('#txtDrivingLicence').val().trim(),
                                                                                                        "DrivingLicenseImage": $('#imgDrivingLicence').attr("src") ? $('#imgDrivingLicence').attr("src") : "",//$('#imgDrivingLicence')[0].src.split(',')[1],
                                                                                                        "IFSC": $('#txIFSC').val().trim(),
                                                                                                        "BankBranch": $('#txBankBranch').val().trim(),
                                                                                                        "BankName": $('#txtBank').val().trim(),
                                                                                                        "AcNumber": $('#txAcNumber').val().trim(),
                                                                                                        "AccountImage": $('#imgBank').attr("src") ? $('#imgBank').attr("src") : "",//$('#imgBank')[0].src.split(',')[1],
                                                                                                        "PFNo": $('#txtPFNo').val(),
                                                                                                        "ESINo": $('#txtESINo').val(),
                                                                                                        "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                                                                                                        "CardNo": $('#txtCardNo').val(),
                                                                                                        //added by tasneem
                                                                                                        "FatherDOB": $('#fatherDOB').val(),
                                                                                                        "FatherAdharNo": $('#fatherAdharNo').val(),
                                                                                                        "FatherAdharNoImage": $('#imgFatherAdhar').attr("src") ? $('#imgFatherAdhar').attr("src") : "",
                                                                                                        "MotherDOB": $('#motherDOB').val(),
                                                                                                        "MotherAdharNo": $('#motherAdharNo').val(),
                                                                                                        "MotherAdharNoImage": $('#imgMotherAdhar').attr("src") ? $('#imgMotherAdhar').attr("src") : "",
                                                                                                        "SpouseDOB": $('#spouseDOB').val(),
                                                                                                        "SpouseAdharNo": $('#spouseAdharNo').val(),
                                                                                                        "SpouseAdharNoImage": $('#imgSpouseAdhar').attr("src") ? $('#imgSpouseAdhar').attr("src") : "",
                                                                                                        "NomineeName": $('#NomineeName').val(),
                                                                                                        "NomineeRelation": $('#NomineeRelation').val(),
                                                                                                        "NomineeDOB": $('#NomineeDOB').val(),
                                                                                                        "NomineeAdharNo": $('#NomineeAdharNo').val(),
                                                                                                        "NomineeAdharNoImage": $('#imgNomineeAdhar').attr("src") ? $('#imgNomineeAdhar').attr("src") : "",
                                                                                                        "Education10ExamName": $("#education10ExamName").val(),
                                                                                                        "Education10ExamBoard": $("#education10ExamBoard").val(),
                                                                                                        "Education10Subject": $("#education10Subject").val(),
                                                                                                        "Education10Percentage": $("#education10Percentage").val(),
                                                                                                        "Education10YearPass": $("#education10YearPass").val(),
                                                                                                        "Education12ExamName": $("#education12ExamName").val(),
                                                                                                        "Education12ExamBoard": $("#education12ExamBoard").val(),
                                                                                                        "Education12Subject": $("#education12Subject").val(),
                                                                                                        "Education12Percentage": $("#education12Percentage").val(),
                                                                                                        "Education12YearPass": $("#education12YearPass").val(),
                                                                                                        "GraduateExamName": $("#graduateExamName").val(),
                                                                                                        "GraduateExamBoard": $("#graduateExamBoard").val(),
                                                                                                        "GraduateSubject": $("#graduateSubject").val(),
                                                                                                        "GraduatePercentage": $("#graduatePercentage").val(),
                                                                                                        "GraduateYearPass": $("#graduateYearPass").val(),
                                                                                                        "PostGraduateExamName": $("#postGraduateExamName").val(),
                                                                                                        "PostGraduationExamBoard": $("#postGraduationExamBoard").val(),
                                                                                                        "PostGraduationSubject": $("#postGraduationSubject").val(),
                                                                                                        "PostGraduationPercentage": $("#postGraduationPercentage").val(),
                                                                                                        "PostGraduationYearPass": $("#postGraduationYearPass").val(),
                                                                                                        "Skill": $("#skill").val() != undefined ? $("#skill").val() : ''
                                                                                                    };


                                                                                                    for (var index = 1; index <= 5; index++) {
                                                                                                        var row = $('#tblSalesOrderBOMDetails tbody tr').eq(index);

                                                                                                        var familyNameKey = 'Family' + index + 'Name';
                                                                                                        var familyDOBKey = 'Family' + index + 'DOB';
                                                                                                        var familyRelationKey = 'Family' + index + 'Relation';
                                                                                                        var familyAdharNoKey = 'Family' + index + 'AdharNo';
                                                                                                        var familyAdharNoImageKey = 'Family' + index + 'AdharNoImage';

                                                                                                        if (row.length > 0) {
                                                                                                            var familyNameValue = row.find('td:eq(0)').text();
                                                                                                            var familyDOBValue = row.find('td:eq(1)').text();
                                                                                                            var familyRelationValue = row.find('td:eq(2)').text();
                                                                                                            var familyAdharNoValue = row.find('td:eq(3)').text();
                                                                                                            var familyAdharNoImageValue = row.find('td:eq(4) img').attr('src') ? row.find('td:eq(4) img').attr('src') : "";//$('#imgSpouseAdhar').attr("src") ? $('#imgSpouseAdhar').attr("src") : ""
                                                                                                        } else {
                                                                                                            var familyNameValue = '';
                                                                                                            var familyDOBValue = '';
                                                                                                            var familyRelationValue = '';
                                                                                                            var familyAdharNoValue = '';
                                                                                                            var familyAdharNoImageValue = '';
                                                                                                        }

                                                                                                        data[familyNameKey] = familyNameValue;
                                                                                                        data[familyDOBKey] = familyDOBValue;
                                                                                                        data[familyRelationKey] = familyRelationValue;
                                                                                                        data[familyAdharNoKey] = familyAdharNoValue;
                                                                                                        data[familyAdharNoImageKey] = familyAdharNoImageValue;
                                                                                                    }


                                                                                                    for (var index = 1; index <= 3; index++) {
                                                                                                        var row = $('#tbCertificateBOMDetails tbody tr').eq(index);

                                                                                                        var certificateNameKey = 'Certificate' + index + 'Name';
                                                                                                        var certificateYearPassKey = 'Certificate' + index + 'YearPass';

                                                                                                        var certificateNameValue = ''
                                                                                                        var certificateYearPassValue = ''
                                                                                                        if (row.length > 0) {
                                                                                                            certificateNameValue = row.find('td:eq(0)').text();
                                                                                                            certificateYearPassValue = row.find('td:eq(1)').text();
                                                                                                        }

                                                                                                        data[certificateNameKey] = certificateNameValue;
                                                                                                        data[certificateYearPassKey] = certificateYearPassValue;
                                                                                                    }

                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        url: 'wfHrEmpMaster.aspx/SaveUpdateEmployeeDetails',
                                                                                                        data: JSON.stringify(data),
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        dataType: "json",
                                                                                                        beforeSend: function () {

                                                                                                        },
                                                                                                        success: function (response) {
                                                                                                            // UploadFiles();
                                                                                                            hideLoader();
                                                                                                            alertify.success('Updated successfully...')
                                                                                                            ViewEmployeeList();
                                                                                                        },
                                                                                                        complete: function () {

                                                                                                        },
                                                                                                        failure: function (jqXHR, textStatus, errorThrown) {
                                                                                                            hideLoader();
                                                                                                        }
                                                                                                    });
                                                                                                }

                                                                                                else {
                                                                                                    alertify.error("Mobile number should be 10 digit");
                                                                                                }
                                                                                            }
                                                                                            else {
                                                                                                alertify.error("Please select Designation");
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            alertify.error("Please select Department");
                                                                                        }


                                                                                    }
                                                                                    else {
                                                                                        alertify.error("Please select permanent address district");
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    alertify.error("Please select permanent address state");
                                                                                }
                                                                            }
                                                                            else {
                                                                                alertify.error("Please select permanent address post");
                                                                            }
                                                                        }
                                                                        else {
                                                                            alertify.error("Please enter permanent address pin");
                                                                        }
                                                                    }
                                                                    else {
                                                                        alertify.error("Please select present address district");
                                                                    }
                                                                }
                                                                else {
                                                                    alertify.error("Please select present address state");
                                                                }
                                                            }
                                                            else {
                                                                alertify.error("Please select present address post");
                                                            }
                                                        }
                                                        else {
                                                            alertify.error("Please enter present address pin");
                                                        }
                                                    }
                                                    else {
                                                        alertify.error("Please select any branch");
                                                    }
                                                }
                                                else {
                                                    alertify.error("Please select any marital status");
                                                }
                                            }
                                            else {
                                                alertify.error("Please enter DOB");
                                            }
                                        }
                                        else {
                                            alertify.error("Please enter father name");
                                        }
                                    }
                                    else {
                                        alertify.error("Please enter name");
                                    }
                                }
                                else {
                                    alertify.error("Please select any sex");
                                }
                            }
                            else {
                                alertify.error("Current employee card number already available");
                            }
                        },
                        complete: function () {

                        },
                        failure: function (jqXHR, textStatus, errorThrown) {

                        }
                    });
                }
                else {
                    alertify.error("Current employee id already available");
                }
            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });


    }
    else {
        alertify.error("Please enter employee id");
    }
}

function CheckEmployeeIdAvailable() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/CheckEmployeeIdAvailability',
        data: JSON.stringify({ "EmpId": $('#txtEmpId').val().trim() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            return data;
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            return 'False';
        }
    });
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}


function BindBankBranchAutocomplete() {
    $("#txBankBranch").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchBankBranchAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txBankBranch').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });
}


function BindAddressStateAutocomplete() {
    $("#txtPresentAddrState").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressStateAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPresentAddrState').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });

    $("#txtPermanentAddrState").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressStateAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPermanentAddrState').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });
}



function BindAddressPinAutocomplete() {
    $("#txtPresentAddrPin").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressPinAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPresentAddrPin').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });

    $("#txtPinPermAddr").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressPinAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPinPermAddr').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });
}

function BindAddressPostAutocomplete() {
    $("#txtPresentAddrPost").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressPostAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPresentAddrPost').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });

    $("#txtPermanentAddrPost").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressPostAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPermanentAddrPost').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });
}

function BindAddressDistrictAutocomplete() {
    $("#txtPresentAddrDistrict").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressDistrictAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPresentAddrDistrict').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });

    $("#txtPermanentAddrDistrict").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchAddressDistrictAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtPermanentAddrDistrict').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });
}


function BindBankNameAutocomplete() {
    $("#txtBank").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wfHrEmpMaster.aspx/FetchBankNameAutocomplete",
                data: "{'prefixText':'" + document.getElementById('txtBank').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("Error");
                }
            });
        }
    });

}


function ClearAll() {
    $('#divEmployeeEntry').find('input:text, input[type=date], select')
        .each(function () {
            $(this).val('');
        });

    $('.UploadMessage').text('');
    $('input[name=optradioGender]').removeAttr('checked');
    $('input[name=optradioMaritalStatus]').removeAttr('checked');
    $('#txDOB').val('');
    $('#txtDOJ').val('');
    $('#imgAdhar').removeAttr('src');
    $('#imgPhoto').removeAttr('src');
    $('#imgVoter').removeAttr('src');
    $('#imgPan').removeAttr('src');
    $('#imgPassport').removeAttr('src');
    $('#imgDrivingLicence').removeAttr('src');
    $('#imgBank').removeAttr('src');
    $('#imgFatherAdhar').removeAttr('src');
    $('#imgMotherAdhar').removeAttr('src');
    $('#imgSpouseAdhar').removeAttr('src');
    $('#imgNomineeAdhar').removeAttr('src');
    $('#tbody_SalesOrderDetails').children('tr:not(:first)').remove();
    $('#tbody_CertificateDetails').children('tr:not(:first)').remove();
    $('#tbody_CompanyDetails').children('tr:not(:first)').remove();
    $('#txtLastCTC').val('0');
    $('#imgupload').val('');
    $('#Adharupload').val('');
    $('#Voterupload').val('');
    $('#Panupload').val('');
    $('#Passportupload').val('');
    $('#DrivingLicenseupload').val('');
    $('#Bankupload').val('');
    $('#txtCardNo').val('');


}

function CreateEmployee() {
    ClearAll();
    $('#divEmployeeEntry').show();
    $('#divEmployeeList').hide();
    $("#btnSave").html('Save');

    $("#btnSave").show();
  
    $('#basic-info-tab').addClass('active');
    // Remove 'active' class from any other tabs
    $('#myTab .nav-link').not('#basic-info-tab').removeClass('active');
    // Show the Basic Info tab content and hide others
    $('#basic-info').addClass('show active');
    $('#basic-info').siblings('.tab-pane').removeClass('show active');
    //hide the tabs
    $("#family-details-tab").hide();
    $("#education-tab").hide();
    $("#experience-tab").hide();

  
    $('#lblEmployee').text('Add New');
    GenerateEmployeeID();

}

function UploadFiles() {
    var data = new FormData();
    var fileUpload = $("#imgupload").get(0);
    var files = fileUpload.files;


    if (files.length > 0) {
        data.append("profile_" + $('#txtEmpId').val().trim(), files[0]);
    }

    var fileUpload1 = $("#Adharupload").get(0);
    var files1 = fileUpload1.files;


    if (files1.length > 0) {
        data.append("adhar_" + $('#txtEmpId').val().trim(), files1[0]);
    }


    var fileUpload2 = $("#Voterupload").get(0);
    var files2 = fileUpload2.files;


    if (files2.length > 0) {
        data.append("voter_" + $('#txtEmpId').val().trim(), files2[0]);
    }


    var fileUpload3 = $("#Panupload").get(0);
    var files3 = fileUpload3.files;


    if (files3.length > 0) {
        data.append("pan_" + $('#txtEmpId').val().trim(), files3[0]);
    }

    var fileUpload4 = $("#Passportupload").get(0);
    var files4 = fileUpload4.files;


    if (files4.length > 0) {
        data.append("passport_" + $('#txtEmpId').val().trim(), files4[0]);
    }

    var fileUpload5 = $("#DrivingLicenseupload").get(0);
    var files5 = fileUpload5.files;


    if (files5.length > 0) {
        data.append("driving_" + $('#txtEmpId').val().trim(), files5[0]);
    }

    var fileUpload6 = $("#Bankupload").get(0);
    var files6 = fileUpload6.files;


    if (files6.length > 0) {
        data.append("bank_" + $('#txtEmpId').val().trim(), files6[0]);
    }

    $.ajax({
        url: "FileUploadHandler.ashx",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            if ($('#btnSave').html() == 'Update') {
                alertify.success("Employee details updated successfully");
            }
            else {
                alertify.success("Employee added successfully");
                ClearAll();
            }

        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}


function BindEmployeeList() {
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/FetchEmployeList',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblEmployeeList').DataTable().clear();
            $('#tblEmployeeList').DataTable().destroy();
            $('#tbody_Employee').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                html = html + '<tr onclick="FetchEmployeeDetails(\'' + data[i].EmpId + '\')"><td>' + data[i].EmpId + '</td>'
                    + '<td>' + data[i].EmpName + '</td>'
                    + '<td>' + (data[i].FatherName != undefined ? data[i].FatherName : '') + '</td>'
                    + '<td>' + (data[i].MotherName != undefined ? data[i].MotherName : '') + '</td>'
                    + '<td>' + (data[i].SpouseName != undefined ? data[i].SpouseName : '') + '</td>'
                    + '<td>' + (data[i].MobileNo != undefined ? data[i].MobileNo : '') + '</td>'
                    + '<td>' + (data[i].EmailAddress != undefined ? data[i].EmailAddress : '') + '</td>'
                    + '<td>' + (data[i].DOB != undefined ? data[i].DOB : '') + '</td>'
                    + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ : '') + '</td>'
                    //  + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ.toLocaleString('en-US', { timeZoneName: 'short' }) : '') + '</td>'
                    // + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "numeric", day: "numeric" }) : '') + '</td>'
                    //  + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ.toISOString('mm/dd/yyyy') : '') + '</td>'
                    //toLocaleDateString() 
                    //new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
                    //   + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ.getDate() : '' ) + '</td>'

                    + '<td>' + (data[i].Sex != undefined ? data[i].Sex : '') + '</td>'
                    + '<td>' + (data[i].MaritalStatus != undefined ? data[i].MaritalStatus : '') + '</td>'
                    + '<td>' + (data[i].Religion != undefined ? data[i].Religion : '') + '</td>'
                    + '<td>' + (data[i].Caste != undefined ? data[i].Caste : '') + '</td>'
                    + '<td>' + (data[i].DeptName != undefined ? data[i].DeptName : '') + '</td>'
                    + '<td>' + (data[i].DivisionName != undefined ? data[i].DivisionName : '') + '</td>'
                    + '<td>' + (data[i].DesignationName != undefined ? data[i].DesignationName : '') + '</td>'
                    + '<td>' + (data[i].GradeName != undefined ? data[i].GradeName : '') + '</td>'
                    + '<td>' + (data[i].AreaName != undefined ? data[i].AreaName : '') + '</td>'
                    + '<td>' + (data[i].BranchName != undefined ? data[i].BranchName : '') + '</td></tr>';
            }
            $('#tbody_Employee').html(html);
            $('#tblEmployeeList').DataTable();

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}



function ViewEmployeeList() {
    $('#divEmployeeList').show();
    $('#divEmployeeEntry').hide();
    $('#btnSave').hide();
    BindEmployeeList();
}



function FetchEmployeeDetails(empid) {
    showLoader();
    $.ajax({
        type: "POST",
        url: 'wfHrEmpMaster.aspx/FetchEmployeeDetails',
        data: JSON.stringify({
            "EmpId": empid
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
           
            ClearAll();
            $('#divEmployeeList').hide();
            $('#divEmployeeEntry').show();
            $("#btnSave").html('Update');
            //show the tabs
            $("#family-details-tab").show();
            $("#education-tab").show();
            $("#experience-tab").show();
            // Trigger a click event on the first tab's link

            $('#basic-info-tab').addClass('active');
            // Remove 'active' class from any other tabs
            $('#myTab .nav-link').not('#basic-info-tab').removeClass('active');
            // Show the Basic Info tab content and hide others
            $('#basic-info').addClass('show active');
            $('#basic-info').siblings('.tab-pane').removeClass('show active');
            $("#btnSave").show();
            $('#txtEmpId').attr("readonly", "readonly");
            $('#lblEmployee').text('Update');




            var data = JSON.parse(response.d);
            var employee = data.EmployeeDetails[0];
            $('#txtEmpId').val(employee.EmpId);
            $('input:radio[name="optradioGender"][value="' + employee.Sex + '"]').prop('checked', true);
            $('#txtName').val(employee.EmpName);
            $('#txtFatherName').val(employee.FatherName);
            $('#txtMotherName').val(employee.MotherName);
            $('#txtSpouseName').val(employee.SpouseName);
            $('#NomineeName').val(employee.NomineeName);
            $('#NomineeRelation').val(employee.NomineeRelation);
            $('#txtMobileNo').val(employee.MobileNo);
            $('#txtEmail').val(employee.EmailAddress);

            // $('#txDOB').val(employee.DOB);
            // $('#txtDOJ').val(employee.DOJ);
            // $('#ddlSalaryGrade').val(employee.);

            $('input:radio[name="optradioMaritalStatus"][value="' + employee.MaritalStatus + '"]').prop('checked', true);
            $('#txtResNo').val(employee.PresentResNo);
            $('#txtResName').val(employee.PresentResName);
            $('#txtRoad').val(employee.PresentRoadStreet);
            $('#txtPresentAddrPin').val(employee.PresentPinNo);
            $('#txtPresentAddrPost').val(employee.PresentPost);
            $('#txtPresentAddrState').val(employee.PresentState);
            $('#txtPresentAddrDistrict').val(employee.PresentDistrict);
            $('#txtResNoPermAddr').val(employee.PermanentResNo);
            $('#txtResNamePermAddr').val(employee.PermanentResName);
            $('#txtRoadPermAddr').val(employee.PermanentRoadStreet);
            $('#txtPinPermAddr').val(employee.PermanentPinNo);
            $('#txtPermanentAddrPost').val(employee.PermanentPost);
            $('#txtPermanentAddrState').val(employee.PermanentState);
            $('#txtPermanentAddrDistrict').val(employee.PermanentDistrict);
            $('#txtVoterNo').val(employee.VoterNo);
            $('#txtPANNo').val(employee.PanNo);
            $('#txtPassport').val(employee.Passport);
            $('#txtDrivingLicence').val(employee.DrivingNo);
            $('#txIFSC').val(employee.IfscCode);
            $('#txBankBranch').val(employee.BankBranchName);
            $('#txtBank').val(employee.BankName);
            $('#txAcNumber').val(employee.AcNumber);
            $('#txtPFNo').val(employee.PfNo);
            $('#txtESINo').val(employee.EsiNo);
            $('#txtAdharNo').val(employee.AdharNo);
            $('#txtCardNo').val(employee.CardNo);

          
            $('#txDOB').val(employee.DOB.split('T')[0]);
            if (employee.DOJ != null) {
               
                $('#txtDOJ').val(employee.DOJ.split('T')[0]);
            }
            //Family DOB
            if (employee.FatherDOB != null) {
                 $('#fatherDOB').val(employee.FatherDOB.split('T')[0]);
            } if (employee.MotherDOB != null) {
              
                $('#motherDOB').val(employee.MotherDOB.split('T')[0]);
            } if (employee.SpouseDOB != null) {
               
                $('#spouseDOB').val(employee.SpouseDOB.split('T')[0]);
            } if (employee.NomineeDOB != null) {
               
                $('#NomineeDOB').val(employee.NomineeDOB.split('T')[0]);
            }

            //Family table
            for (var j = 1; j <= 5; j++) {
                var familyName = employee['Family' + j + 'Nmae'];
                var familyDOB = employee['Family' + j + 'DOB'];
                var familyRelation = employee['Family' + j + 'Relation'];
                var familyAdharNo = employee['Family' + j + 'AdharNo'];
                var familyAdharNoImage = employee['formattedFamily' + j + 'AdharNoImage'];//formattedFamily2AdharNoImage

                if ((familyName === '' || familyName === null) &&
                    (familyDOB === '' || familyDOB === null) &&
                    (familyRelation === '' || familyRelation === null) &&
                    (familyAdharNo === '' || familyAdharNo === null) &&
                    (familyAdharNoImage === '' || familyAdharNoImage === null)) {
                    continue;
                }



                var rowHtml = '<tr>';
                rowHtml += '<td>' + (familyName !== undefined ? familyName : "") + '</td>'
                    + '<td>' + (familyDOB !== undefined ? familyDOB.split('T')[0] : "") + '</td>'
                    + '<td>' + (familyRelation !== undefined ? familyRelation : "") + '</td>'
                    + '<td>' + (familyAdharNo !== undefined ? familyAdharNo : "") + '</td>'
                    + '<td><img src="' + (familyAdharNoImage !== null ? familyAdharNoImage : "") + '" style="width: 50px; height: 50px;" /></td>'
                    + '<td><button type="button" class="btn btn-primary btnRemoveRow">Remove</button></td>'
                    + '</tr>'
                $('#tbody_SalesOrderDetails').append(rowHtml);
                // $("#imgAdhar").attr("src", employee.formattedAdharNoImage);
            }


            //Certificate table
            for (var j = 1; j <= 3; j++) {
                var cetificateName = employee['Certificate' + j + 'Name'];
                var yearpass = employee['Certificate' + j + 'YearPass'];


                if ((cetificateName === '' || cetificateName === null) &&
                    (yearpass === '' || yearpass === null)) {
                    continue;
                }



                var rowHtml = '<tr>';
                rowHtml += '<td>' + (cetificateName !== undefined ? cetificateName : "") + '</td>'
                    + '<td>' + (yearpass !== undefined ? yearpass : "") + '</td>'
                    + '<td><button type="button" class="btn btn-primary btnRemoveRow">Remove</button></td>'
                    + '</tr>'
                $('#tbody_CertificateDetails').append(rowHtml);
                // $("#imgAdhar").attr("src", employee.formattedAdharNoImage);
            }


            //Experience Table
            // Loop through each company detail and append it to the table
            var empExp = data.EmployeeExperienceDetails;
            for (var i = 0; i < empExp.length; i++) {
                var companyName = empExp[i]['CompanyName'];
                var companyAddress = empExp[i]['CompanyAddress'];
                var companyWebSiteUrl = empExp[i]['CompanyWebSiteUrl'];
                var companyEmail = empExp[i]['CompanyEmail'];
                var companyPhNo = empExp[i]['CompanyPhNo'];
                var designation = empExp[i]['Designation'];
                var role = empExp[i]['Role'];
                var lastCTC = empExp[i]['LastCTC'];
                var isCurrentCompany = empExp[i]['IsCurrentCompany'];
                var fromDate = empExp[i]['FromDate'];
                var toDate = empExp[i]['ToDate'];
                var reportPersonName = empExp[i]['ReportPersonName'];
                var reportPersonContactNo = empExp[i]['ReportPersonContactNo'];
                var description = empExp[i]['Description'];

                // Check if all fields are empty, if so, skip this iteration
                if ((companyName === '' || companyName === null) &&
                    (companyAddress === '' || companyAddress === null) &&
                    (companyWebSiteUrl === '' || companyWebSiteUrl === null) &&
                    (companyEmail === '' || companyEmail === null) &&
                    (companyPhNo === '' || companyPhNo === null) &&
                    (designation === '' || designation === null) &&
                    (role === '' || role === null) &&
                    (lastCTC === '' || lastCTC === null) &&
                    (isCurrentCompany === '' || isCurrentCompany === null) &&
                    (fromDate === '' || fromDate === null) &&
                    (toDate === '' || toDate === null) &&
                    (reportPersonName === '' || reportPersonName === null) &&
                    (reportPersonContactNo === '' || reportPersonContactNo === null) &&
                    (description === '' || description === null)) {
                    continue;
                }

                // Build the row HTML
                var rowHtml = '<tr>';
                rowHtml += '<td>' + (companyName !== undefined ? companyName : "") + '</td>'
                    + '<td>' + (companyAddress !== undefined ? companyAddress : "") + '</td>'
                    + '<td>' + (companyWebSiteUrl !== undefined ? companyWebSiteUrl : "") + '</td>'
                    + '<td>' + (companyEmail !== undefined ? companyEmail : "") + '</td>'
                    + '<td>' + (companyPhNo !== undefined ? companyPhNo : "") + '</td>'
                    + '<td>' + (designation !== undefined ? designation : "") + '</td>'
                    + '<td>' + (role !== undefined ? role : "") + '</td>'
                    + '<td>' + (lastCTC !== undefined ? lastCTC : "") + '</td>'
                    + '<td>' + (fromDate !== undefined ? fromDate.split('T')[0] : "") + '</td>'
                    + '<td>' + (toDate !== undefined ? toDate.split('T')[0] : "") + '</td>'
                    + '<td>' + (reportPersonName !== undefined ? reportPersonName : "") + '</td>'
                    + '<td>' + (reportPersonContactNo !== undefined ? reportPersonContactNo : "") + '</td>'
                    + '<td>' + (description !== undefined ? description : "") + '</td>'
                    + '<td><button type="button" class="btn btn-primary btnRemoveRow">Remove</button></td>'
                    + '</tr>';

                // Append the row to the table body
                $('#tbody_CompanyDetails').append(rowHtml);
            }



          
            $('#ddlReligion').val(employee.Religion);
            $('#ddlCaste').val(employee.Caste);
            var deptid = '';
            if (employee.PresentDepartId != '0') {
                deptid = employee.PresentDepartId;
            }
            $('#ddlDepartment').val(deptid);
            $('#ddlDivision').val(employee.Division);
            $('#ddlDesignation').val(employee.PresentDesignation);
            $('#ddlGrade').val(employee.Grade);
            $('#ddlArea').val(employee.Area);
            $('#ddlBranch').val(employee.Branchcode);

            //$("#imgPhoto").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'EmpPhotoImage');
            //$("#imgAdhar").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'AdharNoImage');

            //$("#imgVoter").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'VoterImage');
            //$("#imgPan").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'PanNoImage');
            //$("#imgPassport").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'PassportImage');
            //$("#imgDrivingLicence").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'DrivingNoImage');
            //$(="#imgBank").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'BankImage');
             setTimeout(function () {

            $("#imgAdhar").attr("src", employee.formattedAdharNoImage);
            $("#imgPhoto").attr("src", employee.formattedEmpPhotoImage);
            $("#imgVoter").attr("src", employee.formattedVoterImage);
            $("#imgPan").attr("src", employee.formattedPanNoImage);
            $("#imgPassport").attr("src", employee.formattedPassportImage);
            $("#imgDrivingLicence").attr("src", employee.formattedDrivingNoImage);
            $("#imgBank").attr("src", employee.formattedBankImage);

            $("#imgFatherAdhar").attr("src", employee.formattedFatherAdharNoImage);
            $("#imgMotherAdhar").attr("src", employee.formattedMotherAdharNoImage);
            $("#imgSpouseAdhar").attr("src", employee.formattedSpouseAdharNoImage);
            $("#imgNomineeAdhar").attr("src", employee.formattedNomineeAdharNoImage);


            //Family
            $('#fatherAdharNo').val(employee.FatherAdharNo);
            $('#motherAdharNo').val(employee.MotherAdharNo);
            $('#spouseAdharNo').val(employee.SpouseAdharNo);
            $('#NomineeAdharNo').val(employee.NomineeAdharNo);

            //education
            $('#education10ExamName').val(employee.Education10ExamName);
            $('#education10ExamBoard').val(employee.Education10ExamBoard);
            $('#education10Subject').val(employee.Education10Subject);
            $('#education10Percentage').val(employee.Education10Percentage);
            $('#education10YearPass').val(employee.Education10YearPass);
            $('#education12ExamName').val(employee.Education12ExamName);
            $('#education12ExamBoard').val(employee.Education12ExamBoard);
                 $('#education12Subject').val(employee.Education12Subject);
            $('#education12Percentage').val(employee.Education12Percentage);
            $('#education12YearPass').val(employee.Education12YearPass);
            $('#graduateExamName').val(employee.GraduateExamName);
            $('#graduateExamBoard').val(employee.GraduateExamBoard);
            $('#graduateSubject').val(employee.GraduateSubject);
            $('#graduatePercentage').val(employee.GraduatePercentage);
            $('#graduateYearPass').val(employee.GraduateYearPass);
            $('#postGraduateExamName').val(employee.PostGraduateExamName);
            $('#postGraduationExamBoard').val(employee.PostGraduateExamBoard);
            $('#postGraduationSubject').val(employee.PostGraduateSubject);
            $('#postGraduationPercentage').val(employee.PostGraduatePercentage);
            $('#postGraduationYearPass').val(employee.PostGraduateYearPass);
            //$('#certificate1Name').val(employee.Certificate1Name);
            //$('#certificate1YearPass').val(employee.Certificate1YearPass);
            //$('#certificate2Name').val(employee.Certificate2Name);
            //$('#certificate2YearPass').val(employee.Certificate2YearPass);
            //$('#certificate3Name').val(employee.Certificate3Name);
            //$('#certificate3YearPass').val(employee.Certificate3YearPass);
            $('#skill').val(employee.Skill);
            hideLoader();

           }, 1000);

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });
    function setBase64ImageFromHex(hexString) {
        // Remove the "0x" prefix
        var hexData = hexString.substring(2);

        // Convert hexadecimal string to ASCII string
        var asciiString = "";
        for (var i = 0; i < hexData.length; i += 2) {
            asciiString += String.fromCharCode(parseInt(hexData.substr(i, 2), 16));
        }

        // Remove the "data:image/jpeg" prefix
        var base64String = asciiString.substring(15);

        // Create an img element
        return base64String;
    }
}

function GenerateEmployeeID() {
    
        $.ajax({
            type: "POST",
            url: 'wfHrEmpMaster.aspx/GenerateEmployeeID',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {

            },
            success: function (response) {

                var data = JSON.parse(response.d);
                $('#txtEmpId').val(data[0].NewEmpId);


            },
            complete: function () {

            },
            failure: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
   
}
