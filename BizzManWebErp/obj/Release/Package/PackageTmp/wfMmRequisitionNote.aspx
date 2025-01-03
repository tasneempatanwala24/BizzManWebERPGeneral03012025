<%@ Page Title="Material Requisition Note" MasterPageFile="~/MmMainMenu.Master" Language="C#" AutoEventWireup="true" CodeBehind="wfMmRequisitionNote.aspx.cs" Inherits="BizzManWebErp.wfMmRequisitionNote" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmRequisitionNote.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card-header" style="height:20%;font-size:30px;margin-bottom:1%;">
        <b>Purchase Requisition</b>
    </div>
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateRequisitionNote();">Create</button>
    <button onclick="ViewRequisitionNoteList();">View</button>
    <button onclick="AddRequisitionNote();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divRequisitionNoteList" style="margin-top: 10px; overflow: auto;">
        <table id="tblRequisitionNoteList" class="display">
            <thead>
                <tr>
                    <th style="width: 10%;">Requisition Id</th>
                    <th style="width: 20%;">Requisition Date</th>
                    <th style="width: 30%;">Requisition Note</th>
                    <th style="width: 10%;">Branch</th>
                    <th style="width: 10%;">Department</th>
                    <th style="width: 5%;">Active</th>
                    <th style="width: 15%;">Created by</th>
                </tr>
            </thead>
            <tbody id="tbody_RequisitionNote_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divRequisitionNoteEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add Requisition Note</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td class="trTxtId">
                                    <label class="control-label">Id</label>
                                </td>
                                <td class="trTxtId">
                                    <input type="text" style="width: 65%;" class="form-control rounded border-dark" id="txtId" name="txtId" maxlength="200" />
                                </td>
                                <td>
                                    <label class="control-label">Department</label>
                                </td>
                                <td>
                                    <select id="ddlDept" name="ddlDept" class="form-control rounded border-dark">
                                        <option class="txt-center" value="">-Select Department-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Requisition Date *</td>
                                <td>
                                    <input type="date" style="width: 65%;" class="form-control" id="txtReqDate" name="txtReqDate" />
                                </td>
                                <td style="width: 15%;">Branch</td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control rounded border-dark">
                                        <option class="txt-center" value="">-Select Branch-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr id="trCreatedBy">
                                <td></td>
                                <td></td>
                                <td style="width: 11%;">Created by</td>
                                <td colspan="3">
                                    <input type="text"  class="form-control rounded border-dark" id="txtCreatedBy" readonly="readonly" name="txtCreatedBy" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Requisition Note *</td>
                                <td colspan="3">
                                    <textarea rows="3" cols="25" placeholder="Enter Note" class="form-control rounded border-dark" id="txtNote" name="txtNote"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Active</td>
                                <td colspan="3">
                                    <input type="checkbox" placeholder="Enter Description" id="chkActive" name="chkActive" checked /> 
                                    <b>On checking box requisition number will track in indent screen else no record in indent screen</b>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
