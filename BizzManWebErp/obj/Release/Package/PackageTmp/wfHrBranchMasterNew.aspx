<%@ Page Title="Branch Mater" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrBranchMasterNew.aspx.cs"  Inherits="BizzManWebErp.wfHrBranchMasterNew" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/HrBranchMasterNew.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateHRBranchMasterList();">Create</button>
    <button onclick="ViewHRBranchMasterList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divHrBranchMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblHrBranchMasterList" class="display">
            <thead>
                <tr>
                    <th style="width: 5%;">Branch Code</th>
                    <th style="width: 10%;">Branch Name</th>
                    <th style="width: 30%;">Branch Address</th>
                    <th style="width: 15%;">Contact Number</th>
                    <th style="width: 20%;">Email</th>
                    <th style="width: 15%;">State</th>
                    <th style="width: 5%;">Active</th>
                </tr>
            </thead>
            <tbody id="tbody_HrBranchMaster_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divHrBranchMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add Branch Master New</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 15%;">Branch Code *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtBranchCode" name="txtBranchCode" maxlength="3" />
                                </td>
                            </tr>
                              <tr>
                                <td style="width: 15%;">Branch Name *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtBranchName" name="txtBranchName" maxlength="100" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Branch Address *</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtBranchAddress" name="txtBranchAddress" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Contact Number </td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtContactNo" name="txtContactNo" maxlength="20" />
                                </td>
                            </tr>
                             <tr>
                                <td style="width: 15%;">Email</td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="100" />
                                </td>
                            </tr>
                             <tr>
                                <td>
                                    <label class="control-label">State Name</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlState" name="ddlState" class="form-control rounded border-dark">
                                        <option value="">-Select State-</option>
                                    </select>
                                </td>
                            </tr>
                              <tr>
                                <td style="width: 11%;">Active</td>
                                <td colspan="3">
                                    <input type="checkbox" placeholder="Enter Description" id="chkActive" name="chkActive" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
