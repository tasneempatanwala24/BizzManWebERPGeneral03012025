<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMain.Master" AutoEventWireup="true" CodeBehind="wfAdminUserMaster.aspx.cs" Inherits="BizzManWebErp.wfAdminUserMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/AdminUserMaster.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">User Master</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateUser();">Create</button>
    <button onclick="ViewUserList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divUserList" style="margin-top: 10px; overflow: auto;">
        <div id="dataTable_wrapper"></div>

        <table id="tblUserList" class="display">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Role Name</th>
                    <th>Employee Id</th>
                    <th>Access Status</th>
                    <th>Person Name</th>
                    <th>Address</th>
                    <th>Mobile No</th>
                    <th>Email</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody id="tbody_User_List">
            </tbody>
        </table>
    </div>


    <div class="container" id="divUserMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add User Master New</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 15%;">User Name *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtUserName" name="txtUserName" />
                                </td>
                            </tr>
                              <tr>
                                <td style="width: 15%;">Password *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtPassword" name="txtPassword" maxlength="100" />
                                </td>
                            </tr>
                             <tr>
                                <td>
                                    <label class="control-label">Employee Id</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlEmpId" name="ddlEmpId" class="form-control rounded border-dark">
                                        <option value="">-Select Employee Id-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Role Name *</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlRoleName" name="ddlRoleName" class="form-control rounded border-dark">
                                        <option value="">-Select Role Name-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Person Name</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtPersonName" name="txtPersonName" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Address</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtAddress" name="txtAddress" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Mobile No</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtMobileNo" name="txtMobileNo" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Email</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" />
                                </td>
                            </tr>
                            <tr>
                                 <td style="width: 15%;">Description *</td>
                                     <td>
                                     <select style="width: 31%;" id="txtDescription" name="txtDescription" class="form-control rounded border-dark">
                                             <option value="">-Select Description -</option>
                                             <option value="Internal Link">Internal Link</option>
                                             <option value="External Link">External Link</option>
                                     </select>                             
                                     </td>
                                
                            </tr>
                              <tr>
                                <td style="width: 11%;">Access Status</td>
                                <td colspan="3">
                                    <input type="checkbox" id="chkActive" name="chkActive" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
