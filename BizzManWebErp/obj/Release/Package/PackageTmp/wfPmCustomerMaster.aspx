<%@ Page Title="" Language="C#" MasterPageFile="~/PM.Master" AutoEventWireup="true" CodeBehind="wfPmCustomerMaster.aspx.cs" Inherits="BizzManWebErp.wfPmCustomerMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
     <link href="css/POS.css" rel="stylesheet" />
    <script src="Scripts/PmCustomerMaster.js"></script>
     
    <script src="Scripts/moment.min.js"></script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreatePMCustomerMasterList();">Create</button>
    <button onclick="ViewPMCustomerMasterList();">View</button>
    <button onclick="AddPMCustomerMasterDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divPmCustomerMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblPmCustomerMasterList" class="display">
            <thead>
                <tr>
                    <th style="width: 7%;">User Id</th>
                    <th style="width: 30%;">Full Name</th>
                    <th style="width: 10%;">Phone Number</th>
                   
                    <th style="width: 30%;">Address</th>
                    <th style="width: 15%;">State</th>
                    <th style="width: 15%;">City</th>
                    <th style="width: 15%;">Pin Code</th>
               
                    <%--<th style="width: 5%;">Active</th>--%>
                </tr>
            </thead>
            <tbody id="tbody_PmCustomerMaster_List">
            </tbody>
        </table>
    </div>
    <div class="container" id="divPmCustomerMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Customer Registration Form</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 15%;">User ID *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtUserId" name="txtUserId" maxlength="5" />
                                </td>
                            </tr>
                              <tr>
                                <td style="width: 15%;">Full Name *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtFullName" name="txtFullName" maxlength="100" />
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="width: 15%;">Phone Number *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtPhoneNo" name="txtPhoneNo" maxlength="10" />
                                </td>
                            </tr>
                             <tr>
                                <td style="width: 15%;">Password *</td>
                                <td>
                                   <input type="password" style="width: 31%;" class="form-control rounded border-dark" id="txtPassword" name="txtPassword" maxlength="20" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Address </td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtAddress" name="txtAddress" maxlength="200" />
                                </td>
                            </tr>
                            
                             <tr>
                                <td>
                                    <label class="control-label">State</label>
                                </td>
                                <td>
                                     
                                    <select style="width: 31%;" id="ddlState" name="ddlState" class="form-control rounded border-dark">
                                        <option value="">-Select State-</option>
                                    </select>
                                </td>
                            </tr>
                             <tr>
                                <td style="width: 15%;">City </td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtCity" name="txtCity" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Pin Code </td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtPincode" name="txtPincode" maxlength="6" />
                                </td>
                            </tr>
                              <tr>
                                <%--<td style="width: 11%;">Please Click Terms and Conditions Box</td>
                                <td colspan="3">
                                    <input type="checkbox" placeholder="Enter Terms Conditions" id="chkActive" name="chkActive" />
                                </td>--%>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
