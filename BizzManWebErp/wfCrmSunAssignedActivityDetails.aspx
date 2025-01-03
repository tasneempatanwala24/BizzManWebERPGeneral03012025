<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/ExternalPage.Master" CodeBehind="wfCrmSunAssignedActivityDetails.aspx.cs" Inherits="BizzManWebErp.wfCrmSunAssignedActivityDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmSunAssignedActivityDetails.js?003"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Employee Login</button><br />
    <%--dynamic breadcrumbs--%>
     <button onclick="UpdateFollowStatus();" style="display: none;" id="btnSave">Save Status</button>
   
    <div class="container" id="divLeadsEntry" style="display: none; margin-top: 10px;">
        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Leads Entry Form</b>
            </div>
            <div class="my-2" style="text-align: right; margin-top: 1%">
                <%--<button>Routes</button>--%>
            </div>
            <div class="card-body">
                <div class="panel panel-default">

                    <div class="div_group">
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Emp ID</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEmpID" name="txtEmpID" maxlength="200" disabled />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Employee Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtName" name="txtName" maxlength="200" disabled />
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>

                                <tr>
                                    <td class="td_label">Department</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtDepartment" name="txtDepartment" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Designation</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtDesignation" name="txtDesignation" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Branch</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtBranch" name="txtBranch" maxlength="200" disabled />
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <div class="container" id="divLeadsEntryList" style="margin-top: 10px; overflow: auto;">
        <div class="card-header">
            <b>Assign Work</b>
        </div>
        <table id="tblLeadEntrylist" class="display">
            <thead>
                <tr>
                    <%-- <th style="white-space: nowrap;">--%>
                    <%--   <input type="checkbox" id="selectAll" name="selectAll"></th>
                    --%>
                    <th style="white-space: nowrap;">Customer Name</th>
                    <th style="white-space: nowrap;">Due Date</th>
                    <th style="white-space: nowrap;">AssignDate</th>
                    <th style="white-space: nowrap;">Work Details</th>

                </tr>
            </thead>
            <tbody id="tbody_leadsentry_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divLeadsEntry2" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Assigned Work Details Form</b>
            </div>
            <div class="my-2" style="text-align: right; margin-top: 1%">
                <%--<button>Routes</button>--%>
            </div>
            <div class="card-body">
                <div class="panel panel-default">

                    <div class="div_group">
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Lead ID No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtLeadID" name="txtLeadID" maxlength="200" disabled />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">FollowUp Type</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtFollowUpType" name="txtFollowUpType" maxlength="200" disabled />

                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">DueDate</td>
                                    <td>
                                        <input type="date" style="width: 100%;" class="form-control rounded border-dark" id="txtDueDate" name="txtDueDate" maxlength="20" disabled />
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Customer Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtCustName" name="txtCustName" maxlength="200" disabled />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Category</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtCategory" name="txtCategory" maxlength="200" disabled />

                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Location</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtLocation" name="txtLocation" maxlength="200" disabled />

                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Status</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlStatus" name="ddlStatus">
                                            <option value="">Select Status</option>
                                            <option value="InProgress">In Progress</option>
                                            <option value="Cold">Cold</option>

                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>


                                <tr>
                                    <td class="td_label">Contact No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtContactNo" name="txtContactNo" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Email</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Lead Source</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtSource" name="txtSource" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <br />
                                <tr>
                                    <td class="td_label">Note</td>
                                    <td style="width: 100%">
                                        <textarea id="txtNote" class="form-control rounded border-dark" name="txtNote" rows="4" cols="80" disabled>
                                              </textarea>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
