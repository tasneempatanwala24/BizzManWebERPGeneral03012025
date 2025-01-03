<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMain.Master" AutoEventWireup="true" CodeBehind="wfAdminRoleMaster.aspx.cs" Inherits="BizzManWebErp.wfAdminRoleMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/AdminRoleMaster.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Role Master</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateUser();">Create</button>
    <button onclick="ViewUserList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divUserList" style="margin-top: 10px; overflow: auto;">
        <div id="dataTable_wrapper"></div>

        <table id="tblUserList" class="display">
            <thead>
                <tr>
                    <th>Role Id</th>
                    <th>Role Name</th>
                    <th>Dashboard Name</th>
                    <th>Active</th>
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
                <b>Add Role Master New</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 15%;">Role Name *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtRoleName" name="txtRoleName" />
                                </td>
                            </tr>
                              
                            <tr>
                                <td>
                                    <label class="control-label">Dashboard Name *</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlDashboardName" name="ddlDashboardName" class="form-control rounded border-dark">
                                        <option value="">-Select Dashboard Name-</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td style="width: 15%;">Description</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" />
                                </td>
                            </tr>
                              <tr>
                                <td style="width: 11%;">Active</td>
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
