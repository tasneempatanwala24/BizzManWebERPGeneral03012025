<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/ExternalPage.Master" CodeBehind="wfCrmBkrmMeetingRegister.aspx.cs" Inherits="BizzManWebErp.wfCrmBkrmMeetingRegister" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmBkrmMeetingRegister.js?002"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Leads</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateCrmBkrmMeetingList();" id="btnCreate">Create</button>
    <button onclick="ViewMeetingDetails();">View</button>
    <button onclick="AddCrmBkrmMeetingDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    

      <div class="container" id="divLeadsEntry" style="display: none; margin-top: 10px;">
      <div class="card" style="display: flow-root">
          <div class="card-header">
              <b>Employee Details</b>
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
                  </div>
              </div>
          </div>

      </div>
  </div>

        <div class="container" id="divLeadsEntryList" style="margin-top: 10px; overflow: auto;">
    <div class="card-header">
        <b>Register Meeting</b>
    </div>
    <table id="tblLeadEntrylist" class="display">
        <thead>
            <tr>
                <th style="white-space: nowrap;">Enquiry ID</th>
                <th style="white-space: nowrap;">Client Name</th>
                <th style="white-space: nowrap;">Date</th>
                <th style="white-space: nowrap;">Check Details</th>

            </tr>
        </thead>
        <tbody id="tbody_leadsentry_list">
        </tbody>
    </table>
</div>

    <div class="container" id="divMeetingRegisterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMeetingRegisterlist" class="display">
            <thead>
                <tr>
                    <th style="white-space: nowrap;">MeetingId</th>
                    
                    <th style="white-space: nowrap;">EnquiryId</th>
                    <th style="white-space: nowrap;">ClientName</th>
                    <th style="white-space: nowrap;">ContactNo</th>
                    <th style="white-space: nowrap;">Requirements</th>
                    <th style="white-space: nowrap;">Sample Details</th>
                    <th style="white-space: nowrap;">Date</th>
                    <th style="white-space: nowrap;">Feedback</th>
                    <th style="white-space: nowrap;">Catalogue</th>
                    <th style="white-space: nowrap;">Designation</th>
                    <th style="white-space: nowrap;">MeetingDate</th>
                    <th style="white-space: nowrap;">Sales PersonName</th>
                    <th style="white-space: nowrap;">VisitingId</th>
                    <th style="white-space: nowrap;">Note</th>
                </tr>
            </thead>
            <tbody id="tbody_Meetingregister_list">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMeetingregister" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">
            <div class="card-header">
                <b>Meeting Register Form</b>
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
                                    <td class="td_label">MeetingID</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtMeetingId" name="txtMeetingId" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">EnquiryId</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtEnquiryId" name="txtEnquiryId" maxlength="200" disabled />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Client Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtClientName" name="txtClientName" maxlength="200" disabled/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Contact Number</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtContactNo" name="txtContactNo" maxlength="10" disabled/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Requirements</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtRequirements" name="txtRequirements" maxlength="200" disabled/>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Sample Details</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlSample" name="ddlSample">
                                            <option value="0">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="td_label">Feedback</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtFeedback" name="txtFeedback" maxlength="200" />
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
                                        <input type="text" class="form-control rounded border-dark" id="txtDesignation" name="txtDesignation" maxlength="200" disabled/>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Meeting Date</td>
                                    <td style="width: 100%">
                                        <input type="date" class="form-control rounded border-dark" id="txtMeetingDate" name="txtMeetingDate" />
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
                                    <td class="td_label">Sales PersonName</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtSalesPersonName" name="txtSalesPersonName" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Visiting ID</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" id="ddlVisitingID" name="ddlVisitingID">
                                            <option value="0">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>

                                </tr>

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
            <div>
            </div>
</asp:Content>
