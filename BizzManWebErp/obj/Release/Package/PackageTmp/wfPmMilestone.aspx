<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PM.Master" CodeBehind="wfPmMilestone.aspx.cs" Inherits="BizzManWebErp.wfPmMilestone" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/PmMilestone.js?001"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Milestone</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreatePmMilestoneList();" id="btnCreate">Create</button>
    <button onclick="ViewMilestone();">View</button>
    <button onclick="AddPmMilestoneDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divmilestoneList" style="margin-top: 10px; overflow: auto;">
        <table id="tblmilestonelist" class="display">
            <thead>
                <tr>
                   <%-- <th style="white-space: nowrap;">--%>
                        <%--   <input type="checkbox" id="selectAll" name="selectAll"></th>
                        --%>
                    <th style="white-space: nowrap;">Name</th>
                    <th style="white-space: nowrap;">Project</th>
                    <th style="white-space: nowrap;">Assign</th>
                    <th style="white-space: nowrap;">Sales Order No</th>
                    <th style="white-space: nowrap;">DeadLineFrom</th>
                    <th style="white-space: nowrap;">DeadLineTo</th>
                    <th style="white-space: nowrap;">Job Type</th>
                </tr>
            </thead>
            <tbody id="tbody_milestone_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divmilestoneEntry" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Milestone Form</b>
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
                                    <td class="td_label">Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtName" name="txtName" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Project</td>
                                    <td style="width: 100%">
                                        <select style="width: 70%;" class="form-control rounded border-dark" id="ddlProject" name="ddlProject" onchange="FetchSalesOrder(this.value);">
                                            <option value="">-Select Project-</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Assign</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlAssign" name="ddlAssign">
                                        </select>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Sales Order No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtSalesOrderNo" name="txtSalesOrderNo" disabled maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Job Type</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtJobType" name="txtJobType" maxlength="200" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>

                                <tr>
                                    <td class="td_label">DeadLineFrom</td>
                                    <td>
                                        <input type="date" style="width: 100%;" class="form-control rounded border-dark" id="txtDatelineFrom" name="txtDatelineFrom" maxlength="20" />
                                    </td>
                                    <td class="td_label">DeadLineTo</td>
                                    <td>
                                        <input type="date" style="width: 100%;" class="form-control rounded border-dark" id="txtDatelineTo" name="txtDatelineTo" maxlength="20" />
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
