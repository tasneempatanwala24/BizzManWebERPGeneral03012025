<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpMaster.aspx.cs" Inherits="BizzManWebErp.wfHrEmpMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="css/bootstrap.min.css" rel="stylesheet" />--%>
    <%--<link rel="stylesheet/less" type="text/css" href="css/bootstrap.less" />--%>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/EmpMaster.js"></script>
    <style>
            .ExpTable th, .ExpTable td {
            width: 10%;
            box-sizing: border-box;
        }

        .ExpTable th:nth-child(8), .ExpTable td:nth-child(8),
        .ExpTable th:nth-child(9), .ExpTable td:nth-child(9),
        .ExpTable th:nth-child(14), .ExpTable td:nth-child(14) {
            width: 5%;
        }

        .ExpTable th, .ExpTable td {
            min-width: 100px; /* Adjust this value as necessary */
        }



     .upload-message {
        display: inline-block;
        padding: 5px 10px;
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        border-radius: 4px;
        margin-left: 10px;
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmployee();">Create</button>
    <button onclick="ViewEmployeeList();">View</button>
    <button onclick="AddEmployee();" style="display:none;" id="btnSave">Save</button>
    <div class="container" id="divEmployeeEntry" style="display:none;margin-top:10px;">
        

        <div class="card">
                      <div class="card-header">
                        <label id="lblEmployee"></label> Employee
                      </div>
                      <div class="card-body">
                           

       
            <div class="panel-body">
            
                 <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="basic-info-tab" data-bs-toggle="tab" data-bs-target="#basic-info" type="button" role="tab" aria-controls="basic-info" aria-selected="true">Basic Info</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="family-details-tab" data-bs-toggle="tab" data-bs-target="#family-details" type="button" role="tab" aria-controls="family-details" aria-selected="false">Family Details</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="education-tab" style="display:none" data-bs-toggle="tab" data-bs-target="#education" type="button" role="tab" aria-controls="education" aria-selected="false">Educational Background</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="experience-tab" style="display:none" data-bs-toggle="tab" data-bs-target="#experience" type="button" role="tab" aria-controls="experience" aria-selected="false">Work Experience</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <!-- Basic Info Tab -->
      <div class="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="basic-info-tab" >

              <table class="tbl">
                    <tr>
                        <td style="width: 11%;">
                            <label class="control-label">Emp Id *</label>
                        </td>
                        <td>
                            <input type="text" class="form-control" id="txtEmpId" placeholder="Enter Employee Id" name="txtEmpId" maxlength="10" readonly />
                        </td>
                        <td>
                            <label class="control-label">Card No.</label>
                        </td>
                        <td>
                            <input type="text" class="form-control" id="txtCardNo" placeholder="Enter Employee Card No." name="txtCardNo" maxlength="30" />
                        </td>

                        <td colspan="2">
                            <fieldset>
                                <legend>Sex *</legend>
                                <label class="radio-inline">
                                    <input type="radio" name="optradioGender" value="Female" />Female
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="optradioGender" value="Male" />Male
                                </label>
                            </fieldset>

                        </td>
                        <td rowspan="7">
                            <img id="imgPhoto" />
                            <p>
                                <input type="file" id="imgupload" style="display: none" accept=".jpg, .jpeg" />
                                <button id="OpenImgUpload" onclick="OpenFileUploader();">Upload Photo</button>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">Name *</label></td>
                        <td colspan="5">
                            <input type="text" class="form-control" id="txtName" maxlength="200" placeholder="Enter Name" name="txtName" /></td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">Father's Name *</label></td>
                        <td colspan="5">
                            <input type="text" class="form-control" id="txtFatherName" maxlength="200" placeholder="Enter Father's Name" name="txtFatherName" /></td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">Mother's Name</label></td>
                        <td colspan="5">
                            <input type="text" class="form-control" id="txtMotherName" maxlength="200" placeholder="Enter Mother's Name" name="txtMotherName" /></td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">Spouse Name</label></td>
                        <td colspan="5">
                            <input type="text" class="form-control" id="txtSpouseName" maxlength="200" placeholder="Enter Spouse Name" name="txtSpouseName" /></td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">Mobile No</label></td>
                        <td>
                            <input type="text" class="form-control numberonly" id="txtMobileNo"  maxlength="10" placeholder="Enter Mobile No." name="txtMobileNo" /></td>
                        <td>
                            <label class="control-label">Email</label></td>
                        <td colspan="3">
                            <input type="text" class="form-control" id="txtEmail" placeholder="Enter Email" name="txtEmail"  maxlength="100" /></td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">DOB *</label></td>
                        <td>
                            <input type="date" class="form-control" id="txDOB" name="txDOB" /></td>
                        <td>
                            <label class="control-label">DOJ</label></td>
                        <td>
                            <input type="date" class="form-control" id="txtDOJ" name="txtDOJ" /></td>
                        <td>
                            <label class="control-label">Salary Grade</label></td>
                        <td>
                            <select id="ddlSalaryGrade" name="ddlSalaryGrade" class="form-control">
                                
                            </select></td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">Religion</label></td>
                        <td>
                            <select id="ddlReligion" name="ddlReligion" class="form-control">
    <option value="">-Select Religion-</option>
    <option value="Christianity">Christianity</option>
    <option value="Islam">Islam</option>
    <option value="Hinduism">Hinduism</option>
    <option value="Buddhism">Buddhism</option>
    <option value="Sikhism">Sikhism</option>
    <option value="Judaism">Judaism</option>
    <option value="Baha'i Faith">Baha'i Faith</option>
    <option value="Jainism">Jainism</option>
    <option value="Shinto">Shinto</option>
    <option value="Taoism">Taoism</option>
    <option value="Zoroastrianism">Zoroastrianism</option>
    <option value="Confucianism">Confucianism</option>
</select>
</td>
                        <td>
                            <label class="control-label">Status</label></td>
                        <td>
                            <select id="ddlCaste" name="ddlCaste" class="form-control">
                                <option value="">-Select Status-</option>
                                <option value="Resident">Resident</option>
                                <option value="Non Resident">Non Resident</option>
                            </select></td>

                        <td colspan="3" rowspan="2">
                            <fieldset>
                                <legend>Marital Status *</legend>
                                <label class="radio-inline">
                                    <input type="radio" name="optradioMaritalStatus" value="Married" />Married
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="optradioMaritalStatus" value="Un Married" />Un Married
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="optradioMaritalStatus" value="Widowed" />Widowed
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="optradioMaritalStatus" value="Divorced" />Divorced
                                </label>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="control-label">ESI No.</label></td>
                        <td>
                             <input type="text" class="form-control" id="txtESINo" name="txtESINo" maxlength="100" /></td>
                        <td>
                            <label class="control-label">PF No.</label></td>
                        <td>
                            <input type="text" class="form-control" id="txtPFNo" name="txtPFNo" maxlength="100" /></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="vertical-align: top;">
                            <fieldset>
                                <table class="tbl">
                                    <tr>
                                        <td style="width: 20%;">
                                            <label class="control-label">Department*</label></td>
                                        <td style="width: 30%;">
                                            <select id="ddlDepartment" name="ddlDepartment" class="form-control"></select></td>
                                        <td style="width: 20%;">
                                            <label class="control-label">Division</label></td>
                                        <td style="width: 30%;">
                                            <select id="ddlDivision" name="ddlDivision" class="form-control"></select></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Designation*</label></td>
                                        <td>
                                            <select id="ddlDesignation" name="ddlDesignation" class="form-control"></select></td>
                                        <td>
                                            <label class="control-label">Grade</label></td>
                                        <td>
                                            <select id="ddlGrade" name="ddlGrade" class="form-control"></select></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Area</label></td>
                                        <td>
                                            <select id="ddlArea" name="ddlArea" class="form-control"></select></td>
                                        <td>
                                            <label class="control-label">Branch *</label></td>
                                        <td>
                                            <select id="ddlBranch" name="ddlBranch" class="form-control"></select></td>
                                    </tr>
                                </table>
                            </fieldset>
                        </td>

                        <td colspan="3" rowspan="2" style="vertical-align: top;">
                            <div class="panel with-nav-tabs panel-default">
                                <div class="panel-heading">
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a href="#tab1default" data-toggle="tab">Present Address</a></li>
                                        <li class=""><a href="#tab2default" data-toggle="tab">Permanent Address</a></li>
                                    </ul>
                                </div>
                                <div class="panel-body">
                                    <div class="tab-content">
                                        <div class="tab-pane fade active in" id="tab1default">
                                            <table class="tbl">
                                                <tr>
                                                    <td>
                                                        <label class="control-label">Res. No.</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtResNo" maxlength="20" placeholder="Enter Res. No." name="txtResNo" /></td>
                                                    <td>
                                                        <label class="control-label">Res. Name</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtResName" maxlength="100" placeholder="Enter Res. Name" name="txtResName" /></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label class="control-label">Road/Street</label></td>
                                                    <td colspan="3">
                                                        <input type="text" class="form-control" id="txtRoad" maxlength="100" placeholder="Enter Road/Street" name="txtRoad" /></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label class="control-label">Pin *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control numberonly" maxlength="20" id="txtPresentAddrPin" placeholder="Enter Pin" name="txtPresentAddrPin" /></td>
                                                    <td>
                                                        <label class="control-label">Post *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" maxlength="50" id="txtPresentAddrPost" placeholder="Enter Post" name="txtPresentAddrPost" /></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label class="control-label">State *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPresentAddrState" maxlength="100" placeholder="Enter State" name="txtPresentAddrState" /></td>
                                                    <td>
                                                        <label class="control-label">District *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPresentAddrDistrict" maxlength="100" placeholder="Enter District" name="txtPresentAddrDistrict" /></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="tab-pane fade" id="tab2default">
                                            <table class="tbl">
                                                <tr>
                                                    <td>
                                                        <label class="control-label">Res. No.</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtResNoPermAddr" maxlength="20" placeholder="Enter Res. No." name="txtResNoPermAddr" /></td>
                                                    <td>
                                                        <label class="control-label">Res. Name</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtResNamePermAddr" maxlength="100" placeholder="Enter Res. Name" name="txtResNamePermAddr" /></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label class="control-label">Road/Street</label></td>
                                                    <td colspan="3">
                                                        <input type="text" class="form-control" id="txtRoadPermAddr" maxlength="100" placeholder="Enter Road/Street" name="txtRoadPermAddr" /></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label class="control-label">Pin *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control numberonly" id="txtPinPermAddr" maxlength="20" placeholder="Enter Pin" name="txtPinPermAddr" /></td>
                                                    <td>
                                                        <label class="control-label">Post *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPermanentAddrPost" maxlength="50" placeholder="Enter Post" name="txtPermanentAddrPost" /></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label class="control-label">State *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPermanentAddrState" maxlength="100" placeholder="Enter State" name="txtPermanentAddrState" /></td>
                                                    <td>
                                                        <label class="control-label">District *</label></td>
                                                    <td>
                                                        <input type="text" class="form-control" id="txtPermanentAddrDistrict" maxlength="100" placeholder="Enter District" name="txtPermanentAddrDistrict" /></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" rowspan="2">
                            <fieldset>
                                <legend>KYC</legend>
                                <table class="tbl">
                                    <tr>
                                        <td>
                                            <label class="control-label">Adhar No</label>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="txtAdharNo" maxlength="12" placeholder="Enter Adhar No" name="txtAdharNo" />
                                         <span id="adharUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
              
                                            </td>
                                        <td>
                                            <input type="file" id="Adharupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleAdharUpload();" />
                                            <button id="btnAdharUpload" onclick="OpenAdharUploader();">Upload</button>
                                             
                                            <button id="btnAdharDisplay" >Display</button>
                                            <img id="imgAdhar" style="display:none;" class="upload-message"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Voter No</label>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="txtVoterNo" maxlength="50" placeholder="Enter Voter No" name="txtVoterNo" />
                                              <span id="voterUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
                                        </td>
                                        <td>
                                            <input type="file" id="Voterupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleVoterUpload();" />
                                            <button id="btnVoterUpload" onclick="OpenVoterUploader();">Upload</button>
                                            <button id="btnVoterDisplay">Display</button>
                                            <img id="imgVoter" style="display:none;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">PAN No</label>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="txtPANNo" maxlength="12" placeholder="Enter PAN No" name="txtPANNo" />
                                              <span id="panUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
                                        </td>
                                        <td>
                                            <input type="file" id="Panupload" style="display: none" accept=".jpg, .jpeg" onchange="HandlePanUpload();" />
                                            <button id="btnPANUpload" onclick="OpenPANUploader();">Upload</button>
                                            <button id="btnPANDisplay">Display</button>
                                            <img id="imgPan" style="display:none;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Passport</label>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="txtPassport" maxlength="50" placeholder="Enter Passport" name="txtPassport" />
                                              <span id="passportUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
                                        </td>
                                        <td>
                                            <input type="file" id="Passportupload" style="display: none" accept=".jpg, .jpeg" onchange="HandlePassportUpload();" />
                                            <button id="btnPassportUpload" onclick="OpenPassportUploader();">Upload</button>
                                            <button id="btnPassportDisplay">Display</button>
                                            <img id="imgPassport" style="display:none;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Driving Licence</label>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="txtDrivingLicence" maxlength="50" placeholder="Enter Driving Licence" name="txtDrivingLicence" />
                                              <span id="drivingUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
                                        </td>
                                        <td>
                                            <input type="file" id="DrivingLicenseupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleDrivingUpload();" />
                                            <button id="btnDrivingLicenceUpload" onclick="OpenDrivingLicenceUploader();">Upload</button>
                                            <button id="btnDrivingLicenceDisplay">Display</button>
                                            <img id="imgDrivingLicence" style="display:none;" />
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" style="vertical-align:top;">
                            <fieldset>
                                <legend>Bank Information</legend>
                                <table class="tbl">
                                    <tr>
                                        <td  style="width:20%;">
                                            <label class="control-label">IFSC Code</label></td>
                                        <td style="width:30%;">
                                            <input type="text" class="form-control" id="txIFSC" name="txIFSC" maxlength="50" placeholder="Enter IFSC Code" /></td>
                                        <td style="width:10%;">
                                            <label class="control-label">Branch</label></td>
                                        <td>
                                            <input type="text" class="form-control" id="txBankBranch" name="txBankBranch" maxlength="100" placeholder="Enter Bank Branch" /></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Bank Name</label></td>
                                        <td colspan="3">
                                            <input type="text" class="form-control" id="txtBank" name="txtBank" maxlength="100" placeholder="Enter Bank" /></td>
                                        <span id="bankUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">A/c Number</label></td>
                                        <td>
                                            <input type="text" class="form-control numberonly" id="txAcNumber" name="txAcNumber" maxlength="100" placeholder="Enter A/c Number" /></td>
                                        <td colspan="2"><button id="btnBankUpload" onclick="OpenBankUploader();">Upload</button>
                                            <button id="btnBankDisplay">Display</button>
                                            <input type="file" id="Bankupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleBankUpload();" />
                                            <img id="imgBank" style="display:none;" />
                                            
                                        </td>
                                        </tr>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                </table>
      </div>
      <!-- Family Details Tab -->
      <div class="tab-pane fade" id="family-details" role="tabpanel" aria-labelledby="family-details-tab">
        <!-- Family Details Form Fields -->
     <%--  START--%>
           <!-- Fixed Fields for Father -->
 <div class="row">
    <div class="col-md-6">
      <!-- Fixed Fields for Father -->
      <fieldset>
        <legend>Father</legend>
         <div class="form-group">
          <label for="fatherDOB">DOB</label>
          <input type="date" class="form-control" id="fatherDOB" name="fatherDOB">
        </div>
          <div class="row">
           
 <div class="form-group col-md-6">
          <label for="fatherAdharNo">Aadhar No</label>
          <input type="text" class="form-control" id="fatherAdharNo" name="fatherAdharNo">
                                            
              
        </div>
       <div class="form-group  col-md-6">
         <input type="file" id="fatherAdharupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleFatherAdharUpload();" />
                                            <button id="btnFatherAdharUpload" onclick="OpenFatherAdharUploader();" style="margin-top:20px">Upload</button>
                                             
                                            <button id="btnFatherAdharDisplay" >Display</button>
                                            <img id="imgFatherAdhar" style="display:none;" class="upload-message"/>
        </div>
          </div>
          <span id="fatheradharUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
      </fieldset>
    </div>
        <div class="col-md-6">
      <!-- Fixed Fields for Mother -->
       <fieldset>
        <legend>Mother</legend>
         <div class="form-group">
          <label for="motherDOB">DOB</label>
          <input type="date" class="form-control" id="motherDOB" name="motherDOB">
        </div>
          <div class="row">
           
 <div class="form-group col-md-6">
          <label for="motherAdharNo">Aadhar No</label>
          <input type="text" class="form-control" id="motherAdharNo" name="motherAdharNo">
                                            
              
        </div>
       <div class="form-group  col-md-6">
         <input type="file" id="motherAdharupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleMotherAdharUpload();" />
                                            <button id="btnMotherAdharUpload" onclick="OpenMotherAdharUploader();" style="margin-top:20px">Upload</button>
                                             
                                            <button id="btnMotherAdharDisplay" >Display</button>
                                            <img id="imgMotherAdhar" style="display:none;" class="upload-message"/>
        </div>
          </div>
          <span id="motheradharUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
      </fieldset>
    </div>
  </div>
          <div class="row">
             
    <div class="col-md-6">
       <fieldset>
        <legend>Spouse</legend>
         <div class="form-group">
          <label for="spouseDOB">DOB</label>
          <input type="date" class="form-control" id="spouseDOB" name="spouseDOB">
        </div>
          <div class="row">
           
 <div class="form-group col-md-6">
          <label for="spouseAdharNo">Aadhar No</label>
          <input type="text" class="form-control" id="spouseAdharNo" name="spouseAdharNo">
                                            
              
        </div>
       <div class="form-group  col-md-6">
         <input type="file" id="spouseAdharupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleSpouseAdharUpload();" />
                                            <button id="btnSpouseAdharUpload" onclick="OpenSpouseAdharUploader();" style="margin-top:20px">Upload</button>
                                             
                                            <button id="btnSpouseAdharDisplay" >Display</button>
                                            <img id="imgSpouseAdhar" style="display:none;" class="upload-message"/>
        </div>
          </div>
          <span id="spouseadharUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
      </fieldset>
  </div>
               <div class="col-md-6">
       <fieldset>
        <legend>Nominee</legend>
           <div class="row">
                <div class="col-md-5">
          <label for="NomineeName">Name</label>
          <input type="text" class="form-control" id="NomineeName" name="NomineeName">
                                            
              
        </div>

            <div class="col-md-3">
          <label for="NomineeRelation">Relation</label>
          <input type="text" class="form-control" id="NomineeRelation" name="NomineeRelation">
                                            
              
        </div>



         <div class="col-md-4">
          <label for="NomineeDOB">DOB</label>
          <input type="date" class="form-control" id="NomineeDOB" name="NomineeDOB">
        </div>
           </div>
           
          <div class="row">
           
 <div class="form-group col-md-6">
          <label for="NomineeAdharNo">Aadhar No</label>
          <input type="text" class="form-control" id="NomineeAdharNo" name="NomineeAdharNo">
                                            
              
        </div>
       <div class="form-group  col-md-6">
         <input type="file" id="NomineeAdharupload" style="display: none" accept=".jpg, .jpeg" onchange="HandleNomineeAdharUpload();" />
                                            <button id="btnNomineeAdharUpload" onclick="OpenNomineeAdharUploader();" style="margin-top:20px">Upload</button>
                                             
                                            <button id="btnNomineeAdharDisplay" >Display</button>
                                            <img id="imgNomineeAdhar" style="display:none;" class="upload-message"/>
        </div>
          </div>
          <span id="NomineeadharUploadMessage" class="UploadMessage" style="color: green;"></span> <!-- Message container -->
      </fieldset>
  </div>
             
          </div>
      
<%--table for adding family--%>
            <div class="container" id="divSalesOrderDetails" style="margin-top: 10px; overflow: auto;">
        <div class="card">
            <div class="card-header">
               Add Son/Daughter
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblSalesOrderBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                       <th>DOB</th>
                                    <th>Relation</th>
                                    <th>Aadhar Number</th>
                               
                                    <th>Upload</th>
                                    
                                    <th></th>
                                </tr>
                            </thead>



                            <tbody id="tbody_SalesOrderDetails">
                                <tr id="tr_SalesOrderDetailEntry">
                                    <td>
                                        <input type="text" class="form-control" id="txtFamilyName" name="txtFamilyName" />
                                    </td>
                                    <td>
                                        <input type="date" class="form-control" id="txtFamilyDOB" name="txtFamilyDOB"  />
                                    </td>
                                    <td>
                                       <select id="ddlRelation" name="ddlRelation" class="form-control" >
                                           <option value="son">Son</option>
                                           <option value="daughter">Daughter</option>
                                       </select>
                                    </td>
                    <td>
                                        <input type="text" class="form-control" id="txtFamilyAdhaar" name="txtFamilyAdhaar"  />
                                    </td>
                                    <td>
                                <input type="file" id="familyAdharupload" style="display: none" accept=".jpg, .jpeg"  />
                                <button id="btnFamilyAdharUpload"  style="margin-top:20px">Upload</button>
                                      <button id="btnFamilyAdharDisplay" style="display: none" >Display</button>
                                            <img id="imgFamilyAdhar" style="display:none;" class="upload-message"/><br />
                                         <span id="familyadharUploadMessage" class="UploadMessage" style="color: green;word-break:break-all;word-wrap:break-word"></span>        
                                    
                                   
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary" id="btnSaveFamilyDetails">Add</button>
                                    </td>
                                </tr>
                            </tbody>



                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
<%--table for adding family--%>
   

<%--    <!-- Additional Family Fields -->
    <div id="familyFields"></div>

    <!-- Add Family Member Button -->
    <button type="button" class="btn btn-primary mb-3" id="addFamilyMember">Add Family Member</button>--%>

       <%--   END--%>
      </div>
      <!-- Educational Background Tab -->
<div class="tab-pane fade" id="education" role="tabpanel" aria-labelledby="education-tab">
    <!-- Educational Background Form Fields -->
    <div>
        <div class="row">
            <div class="col-md-6">

                <fieldset>
                    <legend>10th Standard</legend>
                    <div class="form-group">
                        <label for="education10ExamName">Exam Name</label>
                        <input type="text" class="form-control" id="education10ExamName">
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="education10ExamBoard">Exam Board</label>
                            <input type="text" class="form-control" id="education10ExamBoard">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="education10Subject">Subject</label>
                            <input type="text" class="form-control" id="education10Subject">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="education10Percentage">Percentage</label>
                            <input type="number" min="0" class="form-control" id="education10Percentage">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="education10YearPass">Year of Passing</label>
                            <input type="number" min="0" class="form-control" id="education10YearPass">
                        </div>
                    </div>
                </fieldset>

            </div>
            <div class="col-md-6">

                <fieldset>
                    <legend>12th Standard</legend>
                    <div class="form-group">
                        <label for="education12ExamName">Exam Name</label>
                        <input type="text" class="form-control" id="education12ExamName">
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="education12ExamBoard">Exam Board</label>
                            <input type="text" class="form-control" id="education12ExamBoard">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="education12Subject">Subject</label>
                            <input type="text" class="form-control" id="education12Subject">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="education12Percentage">Percentage</label>
                            <input type="number" min="0" class="form-control" id="education12Percentage">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="education12YearPass">Year of Passing</label>
                            <input type="number" min="0" class="form-control" id="education12YearPass">
                        </div>
                    </div>
                </fieldset>

            </div>
        </div>
        <div class="row">
            <div class="col-md-6">

                <fieldset>
                    <legend>Graduate</legend>
                    <div class="form-group">
                        <label for="graduateExamName">Exam Name</label>
                        <input type="text" class="form-control" id="graduateExamName">
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="graduateExamBoard">Exam Board</label>
                            <input type="text" class="form-control" id="graduateExamBoard">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="graduateSubject">Subject</label>
                            <input type="text" class="form-control" id="graduateSubject">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="graduatePercentage">Percentage</label>
                            <input type="number" min="0"  class="form-control" id="graduatePercentage">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="graduateYearPass">Year of Passing</label>
                            <input type="number" min="0" class="form-control" id="graduateYearPass">
                        </div>
                    </div>
                </fieldset>

            </div>
            <div class="col-md-6">

                <div id="postGraduateFields">
                    <!-- Post Graduate fields will be appended here dynamically -->
                    <fieldset>
                        <legend>Post Graduate</legend>
                        <div class="form-group">
                            <label for="postGraduateExamName">Exam Name</label>
                            <input type="text" class="form-control" id="postGraduateExamName">
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="postGraduationExamBoard">Exam Board</label>
                                <input type="text" class="form-control" id="postGraduationExamBoard">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="postGraduationSubject">Subject</label>
                                <input type="text" class="form-control" id="postGraduationSubject">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="postGraduationPercentage">Percentage</label>
                                <input type="number" min="0" class="form-control" id="postGraduationPercentage">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="postGraduationYearPass">Year of Passing</label>
                                <input type="number" min="0" class="form-control" id="postGraduationYearPass">
                            </div>
                        </div>
                    </fieldset>
                </div>

            </div>

        </div>
        <div class="row">
            <div class="col-md-8">
               <%-- <div id="certificateFields">
                    <fieldset>
                        <legend>Certificate 1</legend>
                        <div class="row Certificate">
                            <div class="form-group col-md-8">
                                <label for="certificate1Name">Name</label>
                                <input type="text" class="form-control" id="certificate1Name">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="certificate1YearPass">Year of Passing</label>
                                <input type="number" min="0" class="form-control" id="certificate1YearPass">
                            </div>
                        </div>
                    </fieldset>
                </div>
                <button type="button" class="btn btn-info btn-sm mt-2" id="addCertificate">Add Certificate</button>--%>

                <%--table for adding Certificate--%>
         <fieldset>
             <legend>Add Certificates</legend>
              <table id="tbCertificateBOMDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                       <th>Year Of Passing</th>
                                    <th></th>
                                </tr>
                            </thead>



                            <tbody id="tbody_CertificateDetails">
                                <tr id="tr_CertificateDetailEntry">
                                    <td>
                                        <input type="text" class="form-control" id="txtCertificateName" name="txtCertificateName" />
                                    </td>
                                    <td>
                                        <input type="number" min="0" class="form-control" id="txtCertificateYear" name="txtCertificateYear"  />
                                    </td>
                                   
                                    <td>
                                        <button type="button" class="btn btn-primary" id="btnSaveCertificate">Add</button>
                                    </td>
                                </tr>
                            </tbody>



                        </table>
         </fieldset>
       
                       
                    
   
<%--table for adding family--%>

            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="skill">Skill</label>
                    <input type="text" class="form-control" id="skill">
                </div>
            </div>
        </div>

    </div>
    <!-- Add your educational background form fields here -->

      <!-- Work Experience Tab -->
    

  </div>

          <div class="tab-pane fade" id="experience" role="tabpanel" aria-labelledby="experience-tab">
        <!-- Work Experience Form Fields -->
        <!-- Add your work experience form fields here -->
<fieldset>
    <legend>Add Your Experience</legend>
    <div class="table-responsive">
    <table id="tblCompanyDetails" class="display no-footer dataTable table ExpTable" style="width: 100%;">
        <thead>
            <tr>
                <th style="width: 10%;">Company Name</th>
                <th style="width: 10%;">Address</th>
                <th style="width: 10%;">Website URL</th>
                <th style="width: 10%;">Email</th>
                <th style="width: 10%;">Phone Number</th>
                <th style="width: 10%;">Designation</th>
                <th style="width: 10%;">Role</th>
                <th style="width: 5%;">Last CTC</th>
                <th style="width: 5%;">From Date</th>
                <th style="width: 5%;">To Date</th>
                <th style="width: 10%;">Report Person Name</th>
                <th style="width: 10%;">Report Person Contact No</th>
                <th style="width: 10%;">Description</th>
                <th style="width: 5%;"></th>
            </tr>
        </thead>
        <tbody id="tbody_CompanyDetails">
            <tr id="tr_CompanyDetailEntry">
                <td>
                    <input type="text" class="form-control" id="txtCompanyName" name="txtCompanyName" />
                </td>
                <td>
                    <input type="text" class="form-control" id="txtCompanyAddress" name="txtCompanyAddress" />
                </td>
                <td>
                    <input type="url" class="form-control" id="txtCompanyWebSiteUrl" name="txtCompanyWebSiteUrl" />
                </td>
                <td>
                    <input type="email" class="form-control" id="txtCompanyEmail" name="txtCompanyEmail" />
                </td>
                <td>
                    <input type="text" class="form-control" id="txtCompanyPhNo" name="txtCompanyPhNo" />
                </td>
                <td>
                    <input type="text" class="form-control" id="txtDesignation" name="txtDesignation" />
                </td>
                <td>
                    <input type="text" class="form-control" id="txtRole" name="txtRole" />
                </td>
                <td>
                    <input type="text"  class="form-control" id="txtLastCTC" name="txtLastCTC" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="0" />
                </td>
                <td>
                    <input type="date" class="form-control" id="txtFromDate" name="txtFromDate" />
                </td>
                <td>
                    <input type="date" class="form-control" id="txtToDate" name="txtToDate" />
                </td>
                <td>
                    <input type="text" class="form-control" id="txtReportPersonName" name="txtReportPersonName" />
                </td>
                <td>
                    <input type="text" class="form-control" id="txtReportPersonContactNo" name="txtReportPersonContactNo" />
                </td>
                <td>
                    <textarea class="form-control" id="txtDescription" name="txtDescription"></textarea>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" id="btnSaveCompanyDetails">Add</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</fieldset>
                  
                

      </div>
            </div>
        

                          </div>
            </div>
        
   
   
    </div>
        </div>
    <div class="container" id="divEmployeeList" style="margin-top:10px;overflow:auto;">
        <table id="tblEmployeeList" class="display" >
    <thead>
        <tr>
            <th>Emp Id</th>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Mother's Name</th>
            <th>Spouse Name</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>DOB</th>
            <th>DOJ</th>
            <th>Sex</th>
            <th>Marital Status</th>
            <th>Religion</th>
            <th>Status</th>
            <th>Department</th>
            <th>Division</th>
            <th>Designation</th>
            <th>Grade</th>
            <th>Area</th>
            <th>Branch</th>
        </tr>
    </thead>
    <tbody id="tbody_Employee">
      
    </tbody>
</table>
        </div>
    <!-- The Modal -->
<div id="myModal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="img01">
  <div id="caption"></div>
</div>
</asp:Content>
