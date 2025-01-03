<%@ Page Title="" Language="C#" MasterPageFile="~/FaMainMenu.Master" AutoEventWireup="true" CodeBehind="wfFaAccountsGroupMaster.aspx.cs" Inherits="BizzManWebErp.wfFaAccountsGroupMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="css/alertify.css" rel="stylesheet" />
    <script src="Scripts/jquery.min.js"></script>
    <script src="Scripts/alertify.js"></script>
    <link href="css/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="Scripts/jquery.dataTables.min.js"></script>
    <link href="Scripts/buttons.dataTables.min.css" rel="stylesheet" />
    <script src="Scripts/dataTables.buttons.min.js"></script>
    <script src="Scripts/jszip.min.js"></script>
    <script src="Scripts/buttons.html5.min.js"></script>
    <link href="css/select2.min.css" rel="stylesheet" />
    <script src="Scripts/select2.min.js"></script>
    
    
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/FaAccountsGroupMaster.js"></script>
     
   

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateAccountGroup();">Create</button>
    <button onclick="ViewAccountGroupList();">View</button>
    <button onclick="AddNewAccountGroup();" style="display: none;" id="btnSave">Save</button>

        <div class="container" id="divAccountGroupList" style="margin-top: 10px; overflow: auto;">
        <table id="tblAccountGroupList" class="display">
            <thead>
                <tr>
                    <th style="width: 5%;">Id</th>
                    <th style="width: 20%;">Prime Group Name</th>
                    <th style="width: 20%;">Group Name</th>
                    <th style="width: 15%;">Group Category</th>
                    <th style="width: 20%;">Created By</th>
                </tr>
            </thead>
            <tbody id="tbody_AccountGroup_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divAccountGroupEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add Account Group</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                             
                            <tr>
                                <td style="width: 15%;">Group Name *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtAccountGroupName" name="txtAccountGroupName" />
                                   <input type="text" style="display:none;" class="form-control rounded border-dark" id="txtAccountGroupId" name="txtAccountGroupId" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Prime Group Name *</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlPrimaryGroupName" name="ddlPrimaryGroupName" class="form-control rounded border-dark">
                                        <option value="">-Select Prime Group Name-</option>
                                    </select>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <label class="control-label">Group Category</label>
                                </td>
                                <td>
                                     <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtGroupCategory" name="txtGroupCategory" value="Secondary" readonly />
                                </td>
                            </tr>
                             
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
