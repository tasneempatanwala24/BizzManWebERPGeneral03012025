
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

    var modal = document.getElementById("myModal");
    var btnAdharDisplay = document.getElementById("btnAdharDisplay");
    var btnVoterDisplay = document.getElementById("btnVoterDisplay");
    var btnPANDisplay = document.getElementById("btnPANDisplay");
    var btnPassportDisplay = document.getElementById("btnPassportDisplay");
    var btnDrivingLicenceDisplay = document.getElementById("btnDrivingLicenceDisplay");
    var btnBankDisplay = document.getElementById("btnBankDisplay");
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

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

});


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


function OpenFileUploader() {
    $('#imgupload').click();
}


function OpenAdharUploader() {
    $('#Adharupload').click();
}

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
                                                                                        if (IsValidMobileNo == 1) {
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                url: 'wfHrEmpMaster.aspx/SaveUpdateEmployeeDetails',
                                                                                                data: JSON.stringify({
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
                                                                                                    "ProfileImage": '',//$('#imgPhoto')[0].src.split(',')[1],
                                                                                                    "AdharNo": $('#txtAdharNo').val().trim(),
                                                                                                    "AdharImage": '',//$('#imgAdhar')[0].src.split(',')[1],
                                                                                                    "VoterNo": $('#txtVoterNo').val().trim(),
                                                                                                    "VoterImage": '',//$('#imgVoter')[0].src.split(',')[1],
                                                                                                    "PANNo": $('#txtPANNo').val().trim(),
                                                                                                    "PANImage": '',//$('#imgPan')[0].src.split(',')[1],
                                                                                                    "PassportNo": $('#txtPassport').val().trim(),
                                                                                                    "PassportImage": '',//$('#imgPassport')[0].src.split(',')[1],
                                                                                                    "DrivingLicense": $('#txtDrivingLicence').val().trim(),
                                                                                                    "DrivingLicenseImage": '',//$('#imgDrivingLicence')[0].src.split(',')[1],
                                                                                                    "IFSC": $('#txIFSC').val().trim(),
                                                                                                    "BankBranch": $('#txBankBranch').val().trim(),
                                                                                                    "BankName": $('#txtBank').val().trim(),
                                                                                                    "AcNumber": $('#txAcNumber').val().trim(),
                                                                                                    "AccountImage": '',//$('#imgBank')[0].src.split(',')[1],
                                                                                                    "PFNo": $('#txtPFNo').val(),
                                                                                                    "ESINo": $('#txtESINo').val(),
                                                                                                    "LoginUser": $('#ContentPlaceHolder1_loginuser').val(),
                                                                                                    "CardNo": $('#txtCardNo').val()
                                                                                                }),
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                dataType: "json",
                                                                                                beforeSend: function () {

                                                                                                },
                                                                                                success: function (response) {
                                                                                                    UploadFiles();
                                                                                                },
                                                                                                complete: function () {

                                                                                                },
                                                                                                failure: function (jqXHR, textStatus, errorThrown) {
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            alertify.error("Mobile number should be 10 digit");
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
    $('#divEmployeeEntry').find('input:text, select')
        .each(function () {
            $(this).val('');
        });

   
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
    $('#txtEmpId').removeAttr("readonly");
    $('#lblEmployee').text('Add New');
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
                    + '<td>' + (data[i].FatherName !=undefined? data[i].FatherName:'') + '</td>'
                    + '<td>' + (data[i].MotherName != undefined ? data[i].MotherName : '') + '</td>'
                    + '<td>' + (data[i].SpouseName != undefined ? data[i].SpouseName : '') + '</td>'
                    + '<td>' + (data[i].MobileNo != undefined ? data[i].MobileNo : '') + '</td>'
                    + '<td>' + (data[i].EmailAddress != undefined ? data[i].EmailAddress : '') + '</td>'
                    + '<td>' + (data[i].DOB != undefined ? data[i].DOB : '') + '</td>'
                    + '<td>' + (data[i].DOJ != undefined ? data[i].DOJ : '') + '</td>'
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
            $("#btnSave").show();
            $('#txtEmpId').attr("readonly", "readonly");
            $('#lblEmployee').text('Update');

            

            var data = JSON.parse(response.d);
            $('#txtEmpId').val(data[0].EmpId);
            $('input:radio[name="optradioGender"][value="' + data[0].Sex + '"]').prop('checked', true);
            $('#txtName').val(data[0].EmpName);
            //$('#txtFatherName').val(data[0].FatherName);
            $('#txtMotherName').val(data[0].MotherName);
            $('#txtSpouseName').val(data[0].SpouseName);
            $('#txtMobileNo').val(data[0].MobileNo);
            $('#txtEmail').val(data[0].EmailAddress);
            
           // $('#txDOB').val(data[0].DOB);
           // $('#txtDOJ').val(data[0].DOJ);
            // $('#ddlSalaryGrade').val(data[0].);
            
            $('input:radio[name="optradioMaritalStatus"][value="' + data[0].MaritalStatus + '"]').prop('checked', true);
            $('#txtResNo').val(data[0].PresentResNo);
            $('#txtResName').val(data[0].PresentResName);
            $('#txtRoad').val(data[0].PresentRoadStreet);
            $('#txtPresentAddrPin').val(data[0].PresentPinNo);
            $('#txtPresentAddrPost').val(data[0].PresentPost);
            $('#txtPresentAddrState').val(data[0].PresentState);
            $('#txtPresentAddrDistrict').val(data[0].PresentDistrict);
            $('#txtResNoPermAddr').val(data[0].PermanentResNo);
            $('#txtResNamePermAddr').val(data[0].PermanentResName);
            $('#txtRoadPermAddr').val(data[0].PermanentRoadStreet);
            $('#txtPinPermAddr').val(data[0].PermanentPinNo);
            $('#txtPermanentAddrPost').val(data[0].PermanentPost);
            $('#txtPermanentAddrState').val(data[0].PermanentState);
            $('#txtPermanentAddrDistrict').val(data[0].PermanentDistrict);
            $('#txtVoterNo').val(data[0].VoterNo);
            $('#txtPANNo').val(data[0].PanNo);
            $('#txtPassport').val(data[0].Passport);
            $('#txtDrivingLicence').val(data[0].DrivingNo);
            $('#txIFSC').val(data[0].IfscCode);
            $('#txBankBranch').val(data[0].BankBranchName);
            $('#txtBank').val(data[0].BankName);
            $('#txAcNumber').val(data[0].AcNumber);
            $('#txtPFNo').val(data[0].PfNo);
            $('#txtESINo').val(data[0].EsiNo);
            $('#txtAdharNo').val(data[0].AdharNo);
            $('#txtCardNo').val(data[0].CardNo);

            var dtDOB = new Date(data[0].DOB);
            document.getElementById("txDOB").valueAsDate = dtDOB;
            if (data[0].DOJ != null) {
                var dtDOJ = new Date(data[0].DOJ);
                document.getElementById("txtDOJ").valueAsDate = dtDOJ;
            }
            setTimeout(function () {
                $('#ddlReligion').val(data[0].Religion);
                $('#ddlCaste').val(data[0].Caste);
                var deptid = '';
                if (data[0].PresentDepartId != '0') {
                    deptid = data[0].PresentDepartId;
                }
                $('#ddlDepartment').val(deptid);
                $('#ddlDivision').val(data[0].Division);
                $('#ddlDesignation').val(data[0].PresentDesignation);
                $('#ddlGrade').val(data[0].Grade);
                $('#ddlArea').val(data[0].Area);
                $('#ddlBranch').val(data[0].Branchcode);

                $("#imgPhoto").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'EmpPhotoImage');
                $("#imgAdhar").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'AdharNoImage');
                $("#imgVoter").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'VoterImage');
                $("#imgPan").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'PanNoImage');
                $("#imgPassport").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'PassportImage');
                $("#imgDrivingLicence").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'DrivingNoImage');
                $("#imgBank").attr("src", "FileUploadHandler.ashx?emp_id=" + empid + '&img_type=' + 'BankImage');
            }, 1000);
            
        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}
