<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PM.Master" CodeBehind="wfPmProjectPlanning.aspx.cs" Inherits="BizzManWebErp.wfPmProjectPlanning" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <link href="css/POS.css" rel="stylesheet" />
    <script src="Scripts/PmProjectPlanningDetails.js?002"></script>

    <script src="Scripts/moment.min.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreatePmProjectMasterList();">Create</button>
    <button onclick="ViewPmProjectMasterList();">View</button>
    <button onclick="AddPmProjectMasterDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divPmProjectPlanningMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblPmProjectPlanningList" class="display">
            <thead>
                <tr>
                    
                    <th style="width: 30%;">Project Id</th>
                    <th style="width: 30%;">Site Name</th>
                    <th style="width: 30%;">Site Details</th>
                    <th style="width: 30%;">Assigned Employee</th>
                    <th style="width: 30%;">Sales Order No</th>
                    <th style="width: 30%;">Duration From</th>
                    <th style="width: 30%;">Duration To</th>
                    <th style="width: 15%;">Note</th>


                    <%--<th style="width: 5%;">Active</th>--%>
                </tr>
            </thead>
            <tbody id="tbody_PmProjectPlanningMaster_List">
            </tbody>
        </table>
    </div>
    <div class="container" id="divPmProjectPlanningMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Project Planning Form</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl half_table">
                            <tr>

                                <td style="width: 15%;">Site Name</td>
                                <td>
                                    <input type="text" style="width: 70%;" class="form-control rounded border-dark" id="txtSiteName" name="txtSiteName" maxlength="50" />
                                </td>
                                <td style="width: 15%;">Project Number</td>
                                <td>
                                    <input type="text" style="width: 70%;" class="form-control rounded border-dark" id="txtProjectNo" name="txtProjectNo" maxlength="50" disabled />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Site Details</td>
                                <td>
                                    <input type="text" style="width: 70%;" class="form-control rounded border-dark" id="txtSiteDetails" name="txtSiteDetails" maxlength="200" />
                                </td>

                            </tr>

                            <tr>
                                <td style="width: 15%;">Assign</td>
                                <td>
                                    <select style="width: 70%;" class="form-control rounded border-dark" id="ddAssign" name="ddAssign">
                                         <option value="">-Select Employee-</option>
                                    </select>
                                </td>
                                <td style="width: 10%;">SalesOrder No</td>

                                <td>
                                    <select style="width: 70%;" class="form-control rounded border-dark" id="ddlSalesOrderNo" name="ddlSalesOrderNo">
                                    <option value="">-Select SalesOrder No-</option>
                                        </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Duration From</td>
                                <td>
                                    <input type="datetime-local" style="width: 70%;" class="form-control rounded border-dark" id="txtDurationFrom" name="txtDurationFrom" />
                                </td>
                                <td style="width: 10%;">To</td>
                                <td>
                                    <input type="datetime-local" style="width: 70%;" class="form-control rounded border-dark" id="txtDurationTo" name="txtDurationTo" />
                                </td>
                            </tr>


                            <%-- <tr>
                                <td>
                                    <label class="control-label">State</label>
                                </td>
                                <td>
                                     
                                    <select style="width: 31%;" id="ddlState" name="ddlState" class="form-control rounded border-dark">
                                        <option value="">-Select State-</option>
                                    </select>
                                </td>
                            </tr>--%>
                            <tr>
                                <td style="width: 15%;">Note</td>
                                <td>
                                    <textarea id="txtNote" name="txtNote" rows="4" cols="80" class="leftside">
                                </td>
                            </tr>
                            <%--<tr>
                                <td style="width: 15%;">Pin Code </td>
                                <td>
                                   <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtPincode" name="txtPincode" maxlength="6" />
                                </td>
                            </tr>--%>
                            <tr>
                                <%--<td style="width: 11%;">Please Click Terms and Conditions Box</td>
                                <td colspan="3">
                                    <input type="checkbox" placeholder="Enter Terms Conditions" id="chkActive" name="chkActive" />
                                </td>--%>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
