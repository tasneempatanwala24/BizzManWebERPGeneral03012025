<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/CrmMainMenu.Master" CodeBehind="wfCrmSunLeadsEntry.aspx.cs" Inherits="BizzManWebErp.wfCrmSunLeadsEntry" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmSunLeadsEntry.js?001"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Leads</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateCrmLeadsEntryList();" id="btnCreate">Create</button>
    <button onclick="ViewLeadsEntry();">View</button>
    <button onclick="AddCrmLeadsEntryDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divLeadsEntryList" style="margin-top: 10px; overflow: auto;">
        <table id="tblLeadEntrylist" class="display">
            <thead>
                <tr>
                    <%-- <th style="white-space: nowrap;">--%>
                    <%--   <input type="checkbox" id="selectAll" name="selectAll"></th>
                    --%>
                    <th style="white-space: nowrap;">Lead ID</th>
                    <th style="white-space: nowrap;">Name</th>
                    <th style="white-space: nowrap;">Date</th>
                    <th style="white-space: nowrap;">Category</th>
                     <th style="white-space: nowrap;">Contact No</th>
                   
                    <th style="white-space: nowrap;">Location</th>
                    <th style="white-space: nowrap;">Email</th>
                    
                    <th style="white-space: nowrap;">Lead Source</th>
                    <th style="white-space: nowrap;">Note</th>

                </tr>
            </thead>
            <tbody id="tbody_leadsentry_list">
            </tbody>
        </table>
    </div>

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
                                    <td class="td_label">Lead ID No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtLeadID" name="txtLeadID" maxlength="200" disabled/>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Customer Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtName" name="txtName" maxlength="200" />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Category</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlCategory" name="ddlCategory">
                                            <option value="0">Select Category</option>
                                            <option value="LIG">LIG</option>
                                            <option value="MIG">MIG</option>
                                            <option value="HIG">HIG</option>
                                        </select>
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Location</td>
                                    <td style="width: 100%">
                                        <select style="width: 70%;" class="form-control rounded border-dark" id="ddlLocation" name="ddlLocation">
                                            <option value="">-Select Location-</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>

                                <tr>
                                    <td class="td_label">Date</td>
                                    <td style="width: 100%">
                                      <input type="text" class="form-control rounded border-dark" id="txtDate" name="txtDate" />        </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Contact No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtContactNo" name="txtContactNo" maxlength="10" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Email</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Lead Source</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtSource" name="txtSource" maxlength="200" />
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
