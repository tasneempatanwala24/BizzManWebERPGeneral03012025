<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfCrmBkrmLeadCollect.aspx.cs" Inherits="BizzManWebErp.wfCrmBkrmLeadCollect" MasterPageFile="~/CrmMainMenu.Master"%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmBkrmLeadCollect.js?002"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Leads Collect</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateCrmLeadsEntryList();" id="btnCreate">Create</button>
    <button onclick="ViewLeadsEntry();">View</button>
    <button onclick="AddCrmLeadsEntryDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divLeadsEntryList" style="margin-top: 10px; overflow: auto;">
        <table id="tblLeadEntrylist" class="display">
            <thead>
                <tr>
                    <th style="white-space: nowrap;">Lead ID</th>
                   
                    <th style="white-space: nowrap;">Customer Name</th>
                    <th style="white-space: nowrap;">Date</th>
                    
                    <th style="white-space: nowrap;">Designation</th>
                    
                    <th style="white-space: nowrap;">Contact No</th>
                    <th style="white-space: nowrap;">Requirements</th>
                    <th style="white-space: nowrap;">Company Name</th>
            
                </tr>
            </thead>
            <tbody id="tbody_leadsentry_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divLeadsEntry" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Leads Collect Form</b>
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
                                    <td class="td_label">Lead ID</td>
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


                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Date</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtDate" name="txtDate" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Contact No</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtContactNo" name="txtContactNo" maxlength="10" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Designation</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtDesignation" name="txtDesignation" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Requirements</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtRequirements" name="txtRequirements" maxlength="200" />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Company Name</td>
                                    <td style="width: 100%">
                                         <input type="text" class="form-control rounded border-dark" id="txtCompanyName" name="txtCompanyName" maxlength="200" />
                            
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