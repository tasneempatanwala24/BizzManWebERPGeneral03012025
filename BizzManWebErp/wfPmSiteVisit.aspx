<%@ Page Title="" Language="C#" MasterPageFile="~/PM.Master" AutoEventWireup="true" CodeBehind="wfPmSiteVisit.aspx.cs" Inherits="BizzManWebErp.wfPmSiteVisit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <link href="css/POS.css" rel="stylesheet" />
    <script src="Scripts/PmSiteVisit.js?002"></script>
    <script src="Scripts/moment.min.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreatePMSiteVisitList();">Create</button>
    <button onclick="ViewPMSiteVisitList();">View</button>
    <button onclick="AddPMSiteVisitDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divPmSiteVisitList" style="margin-top: 10px; overflow: auto;">
        <table id="tblPmSiteVisitList" class="display">
            <thead>
                <tr>
                    <th style="width: 7%;">Visit Number</th>
                    <th style="width: 30%;">Date Of Visit</th>
                    <th style="width: 10%;">Project</th>
                    <th style="width: 30%;">Site Visit</th>
                    <th style="width: 15%;">Conducted By</th>
                    <th style="width: 15%;">Site Address</th>
                    <th style="width: 15%;">Site Condition</th>

                    <%--<th style="width: 5%;">Active</th>--%>
                </tr>
            </thead>
            <tbody id="tbody_PmSiteVisit_List">
            </tbody>
        </table>
    </div>
    <div class="container" id="divPmSiteVisitEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Site Visit Form</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr >
                                <td >Client ID</td>
                                <td>
                                <select name="ddlClient" class="form-control" style="width:275px;" id="ddlClient">
                                     <option value="">-Select Client Details-</option>
                                </select>
                                </td>
                                </tr>
                            <tr>
                                <td >Created Date</td>
                                <td>
                                    <input type="Date" style="width: 31%;" class="form-control rounded border-dark" id="txtCreatedDate" name="txtCreatedDate" maxlength="5" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Visit Id *</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtSiteVisitId" name="txtSiteVisitId" placeholder="Enter only number" maxlength="5" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Date Of Visit</td>
                                <td>
                                    <input type="datetime-local" style="width: 31%;" class="form-control rounded border-dark" id="txtDateOfVisit" name="txtDateOfVisit" maxlength="100" />
                                </td>
                            </tr>

                            <tr>
                                <td style="width: 15%;">Project</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtProject" name="txtProject" maxlength="10" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Site Visit</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtSiteVisit" name="txtSiteVisit" maxlength="20" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Conducted By</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtConducted" name="txtConducted" maxlength="200" />
                                </td>
                            </tr>

                            <tr>
                                <td style="width: 15%;">Site Address</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtSiteAddress" name="txtSiteAddress" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Site Condition</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtCondition" name="txtCondition" maxlength="200" />
                                </td>
                            </tr>


                            <tr>
                                <td style="width: 15%;align-content:center">Incharge Signature</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtIncharge" name="txtAddr" maxlength="200" />
                                </td>
                                <%--<td style="width: 11%;">Please Click Terms and Conditions Box</td>
                                <td colspan="3">
                                    <input type="checkbox" placeholder="Enter Terms Conditions" id="chkActive" name="chkActive" />
                                </td>--%>
                            </tr>
                            
                            <tr>
                                <td style="width: 15%;">Engineer Signature</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtSign" name="txtAddres" maxlength="200" />
                                </td>
                            </tr>
                            
                            <%--<tr>
                                <td style="width: 15%;">Visitor Signature</td>
                                <td>
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="" name="txtAddressf" maxlength="200" />
                                </td>
                            </tr>--%>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
