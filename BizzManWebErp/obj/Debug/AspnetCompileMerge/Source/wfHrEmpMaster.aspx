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
                           

        <div class="panel panel-default">
            <div class="panel-body">
                <table class="tbl">
                    <tr>
                        <td style="width: 11%;">
                            <label class="control-label">Id</label>
                        </td>
                        <td>
                            <input type="text" class="form-control" id="txtEmpId" placeholder="Enter Employee Id" name="txtEmpId" maxlength="10" />
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
                                <option value="Religion1">Religion1</option>
                                <option value="Religion2">Religion2</option>
                            </select></td>
                        <td>
                            <label class="control-label">Caste</label></td>
                        <td>
                            <select id="ddlCaste" name="ddlCaste" class="form-control">
                                <option value="">-Select Caste-</option>
                                <option value="Caste1">Caste1</option>
                                <option value="Caste2">Caste2</option>
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
                                            <label class="control-label">Department</label></td>
                                        <td style="width: 30%;">
                                            <select id="ddlDepartment" name="ddlDepartment" class="form-control"></select></td>
                                        <td style="width: 20%;">
                                            <label class="control-label">Division</label></td>
                                        <td style="width: 30%;">
                                            <select id="ddlDivision" name="ddlDivision" class="form-control"></select></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Designation</label></td>
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
                                        </td>
                                        <td>
                                            <input type="file" id="Adharupload" style="display: none" accept=".jpg, .jpeg" />
                                            <button id="btnAdharUpload" onclick="OpenAdharUploader();">Upload</button>
                                            <button id="btnAdharDisplay" onclick="DisplayAdharImage();">Display</button>
                                            <img id="imgAdhar" style="display:none;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">Voter No</label>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="txtVoterNo" maxlength="50" placeholder="Enter Voter No" name="txtVoterNo" />
                                        </td>
                                        <td>
                                            <input type="file" id="Voterupload" style="display: none" accept=".jpg, .jpeg" />
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
                                        </td>
                                        <td>
                                            <input type="file" id="Panupload" style="display: none" accept=".jpg, .jpeg" />
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
                                        </td>
                                        <td>
                                            <input type="file" id="Passportupload" style="display: none" accept=".jpg, .jpeg" />
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
                                        </td>
                                        <td>
                                            <input type="file" id="DrivingLicenseupload" style="display: none" accept=".jpg, .jpeg" />
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
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="control-label">A/c Number</label></td>
                                        <td>
                                            <input type="text" class="form-control numberonly" id="txAcNumber" name="txAcNumber" maxlength="100" placeholder="Enter A/c Number" /></td>
                                        <td colspan="2"><button id="btnBankUpload" onclick="OpenBankUploader();">Upload</button>
                                            <button id="btnBankDisplay">Display</button>
                                            <input type="file" id="Bankupload" style="display: none" accept=".jpg, .jpeg" />
                                            <img id="imgBank" style="display:none;" />
                                            
                                        </td>
                                        </tr>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                </table>

            </div>
        </div>

                          </div>
            </div>
    </div>

    <div class="container" id="divEmployeeList" style="margin-top:10px;overflow:auto;">
        <table id="tblEmployeeList" class="display">
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
            <th>Caste</th>
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
