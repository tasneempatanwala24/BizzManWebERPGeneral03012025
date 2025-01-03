<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/CrmMainMenu.Master" CodeBehind="wfCrmSunScheduleActivity.aspx.cs" Inherits="BizzManWebErp.wfCrmSunScheduleActivity" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmSunAssignActivity.js?003"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hdnLeadId" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Schedule Activity</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreatePmAssignActivityList();" id="btnCreate">Create</button>
    <button onclick="ViewAssignActivity();">View</button>
    <button onclick="AddCrmAssignActivityDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divAssignActivityList" style="margin-top: 10px; overflow: auto;">
        <table id="tblAssignActivitylist" class="display">
            <thead>
                <tr>
                    <%-- <th style="white-space: nowrap;">--%>
                    <%--   <input type="checkbox" id="selectAll" name="selectAll"></th>
                    --%>
                    <th style="white-space: nowrap;">ActivityID</th>
                    <th style="white-space: nowrap;">CustomerName</th>
                    <th style="white-space: nowrap;">FollowUpType</th>
                    <th style="white-space: nowrap;">DueDate</th>
                    <th style="white-space: nowrap;">Priority</th>
                    <th style="white-space: nowrap;">AssignedPerson</th>
                    <th style="white-space: nowrap;">Note</th>
                </tr>
            </thead>
            <tbody id="tbody_AssignActivity_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divAssignActivityEntry" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Assign Activity Form</b>
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
                                    <td class="td_label">ActivityID</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtActivityID" name="txtActivityID" maxlength="200" disabled />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">FollowUp Type</td>
                                    <td style="width: 100%">
                                        <select style="width: 70%;" class="form-control rounded border-dark" id="ddlFollowType" name="ddlFollowType">
                                            <option value="0">-Select FollowUpType-</option>
                                            <option value="Meeting">Meeting</option>
                                            <option value="Call">Call</option>
                                            <option value="Onsite">Onsite</option>
                                            <option value="Email">Email</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Assigned Person</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlAssign" name="ddlAssign">
                                            <option value="0">-Select Employee-</option>
                                        </select>
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Priority</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlPriority" name="ddlPriority">
                                            <option value="0">-Select Priority-</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="HIGH">HIGH</option>
                                        </select>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Customer Name</td>
                                    <td style="width: 100%">
                                        <select id="ddlCustomer" name="ddlCustomer" class="form-control rounded border-dark" style="width: 300px;">
                                            <option value="">-Select Customer-</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">DueDate</td>
                                    <td>
                                        <input type="date" style="width: 100%;" class="form-control rounded border-dark" id="txtDueDate" name="txtDueDate" maxlength="20" />
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Note</td>
                                    <td style="width: 100%">
                                        <textarea id="txtNote" class="form-control rounded border-dark" name="txtNote" rows="4" cols="80">
                                         </textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
            </div>
</asp:Content>
