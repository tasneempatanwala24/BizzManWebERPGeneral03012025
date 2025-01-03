<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/CrmMainMenu.Master" CodeBehind="wfCrmBkrmEnquiryRegister.aspx.cs" Inherits="BizzManWebErp.wfCrmBkrmEnquiryRegister" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmBkrmEnquiryRegister.js?002"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Leads</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateCrmBkrmEnquiryList();" id="btnCreate">Create</button>
    <button onclick="ViewEnquiryDetails();">View</button>
    <button onclick="AddCrmBkrmEnquiryDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divEnquiryRegisterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblEnquiryRegisterlist" class="display">
            <thead>
                <tr>
                    <th style="white-space: nowrap;">EnquiryId</th>
                    <th style="white-space: nowrap;">Events Name</th>
                    <th style="white-space: nowrap;">Requirements</th>
                    <th style="white-space: nowrap;">Employee Count</th>
                    <th style="white-space: nowrap;">Contact PersonName</th>
                    <th style="white-space: nowrap;">Contact No</th>
                    <th style="white-space: nowrap;">AssignPerson</th>
                    <th style="white-space: nowrap;">CustomerName</th>
                    <th style="white-space: nowrap;">Catalogue</th>
                    <th style="white-space: nowrap;">Date</th>
                    <th style="white-space: nowrap;">Designation</th>
                    <th style="white-space: nowrap;">Company Name</th>
                    <th style="white-space: nowrap;">Note</th>
                </tr>
            </thead>
            <tbody id="tbody_enquiryregister_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divenquiryregister" style="display: none; margin-top: 10px;">
        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Enquiry Register Form</b>
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
                                    <td class="td_label">EnquiryID</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEnquiryID" name="txtEnquiryID" maxlength="200" disabled />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Requirements</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtRequirements" name="txtRequirements" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">No of Employees</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEmployeeCount" name="txtEmployeeCount" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Events Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEventsName" name="txtEventsName" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Contact Person Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtContactName" name="txtContactName" maxlength="200" />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Assign Person</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlAssign" name="ddlAssign">
                                            <option value="0">-Select Employee-</option>
                                        </select>
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Customer Name</td>
                                    <td style="width: 100%">
                                        <select id="ddlCustomer" name="ddlCustomer" class="form-control rounded border-dark" style="width: 300px;">
                                            <option value="">-Select Customer-</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Catalogue</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlCatalogue" name="ddlCatalogue">
                                            <option value="0">Select Catalogue</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Designation</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtDesignation" name="txtDesignation" maxlength="200" />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>

                                <tr>
                                    <td class="td_label">Date</td>
                                    <td style="width: 100%">
                                        <input type="date" class="form-control rounded border-dark" id="txtDate" name="txtDate" />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Phone No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtContactNo" name="txtContactNo" maxlength="10" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Company Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtCompanyName" name="txtCompanyName" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Send to Customer</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtSend" name="txtSend" maxlength="200" />
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
