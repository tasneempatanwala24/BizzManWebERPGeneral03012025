<%@ Page Title="Material Purchase Quotation Entry" MasterPageFile="~/MmMainMenu.Master" Language="C#" AutoEventWireup="true" CodeBehind="wfMmPurchaseQuotationEntry.aspx.cs" Inherits="BizzManWebErp.wfMmPurchaseQuotationEntry" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmPurchaseQuotationEntry.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateQuotationEntry();">Create</button>
    <button onclick="ViewPriceQuotationList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnViewFile" class="button" onclick="ViewFile()">View File</button>
    <div class="container" id="divQuotationDetails" style="margin-top: 10px; overflow: auto;">
        <table id="tblQuotationDetails" class="display">
            <thead>
                <tr>
                    <th style="width: 10%;">Quotation Id</th>
                    <th style="width: 20%;">Quotation Entry Date</th>
                    <th style="width: 20%;">Quotation Date</th>
                    <th style="width: 20%;">Quotation Valid Date</th>
                    <th style="width: 40%;">Requistion Note</th>
                    <th style="width: 10%;">Vendor Name</th>
                    <th style="width: 10%;">Branch</th>
                    <th style="width: 10%;">Department</th>
                </tr>
            </thead>
            <tbody id="tbody_PriceQuotation_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divQuotationEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Purchase Quotation</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr id="trTxtId">
                                <td>
                                    <label class="control-label">Id</label>
                                </td>
                                <td>
                                    <input type="text" style="width: 70%;" class="form-control rounded border-dark" id="txtId" name="txtId" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Quotation Entry Date *</td>
                                <td>
                                    <input type="date" style="width: 70%;" class="form-control" id="txtQuotationEntryDate" name="txtQuotationEntryDate" />
                                </td>
                                <td style="width: 15%;">Requistion Id *</td>
                                <td>
                                    <select style="width: 70%;" id="ddlRequistionNotes" name="ddlRequistionNotes" class="form-control rounded border-dark" onchange="FetchRequsitionNotes()">
                                        <option class="txt-center" value="">-Select Requisition-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Quotation Date *</td>
                                <td>
                                    <input type="date" style="width: 70%;" class="form-control" id="txtQuotationDate" name="txtQuotationDate" />
                                </td>
                                <td style="width: 15%;">Branch</td>
                                <td>
                                    <select style="width: 70%;" id="ddlBranch" name="ddlBranch" class="form-control rounded border-dark">
                                        <option class="txt-center" value="">-Select Branch-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Quotation Valid Date *</td>
                                <td>
                                    <input type="date" style="width: 70%;" class="form-control" id="txtQuotationValidDate" name="txtQuotationValidDate" />
                                </td>
                                <td>
                                    <label class="control-label">Department</label>
                                </td>
                                <td>
                                    <select style="width: 70%;" id="ddlDept" name="ddlDept" class="form-control rounded border-dark">
                                        <option class="txt-center" value="">-Select Department-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    <label class="control-label">Created By</label>
                                </td>
                                 <td>
                                    <input type="text" style="width: 70%;" class="form-control rounded border-dark" id="txtCreatedBy" name="txtId" maxlength="200" />
                                </td>
                                <td style="width: 15%;">Vendor Id *</td>
                                <td>
                                    <select style="width: 70%;" id="ddlVendor" name="ddlVendor" class="form-control rounded border-dark">
                                        <option class="txt-center" value="">-Select Vendor-</option>
                                    </select>
                                </td>
                            </tr>
                            <tr id="trRequisitionNote">
                                <td style="width: 11%;">Requisition Note </td>
                                <td colspan="3">
                                    <input type="text" class="form-control rounded border-dark" id="txtRequisitionNote" name="txtRequisitionNote" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-header">
                <b>Details</b>
            </div>
            <div class="card-body">
                <div class="panel-body" id="divDetails">
                    <table class="tbl" id="tblDetails" width="50%" cellpadding="0" cellspacing="0" border="#729111 1px solid">
                        <tr>
                            <th class="txt-center">Material Master Id *</th>
                            <th class="txt-center">Quantity *</th>
                            <th class="txt-center">Unit Price *</th>
                            <th class="txt-center">Total Amount</th>
                            <th class="txt-center">Description</th>
                            <th></th>
                        </tr>
                        <tr class="trInputs">
                            <td>
                                <select  name="ddlMaterialMaster" id="ddlMaterialMaster" class="ddlMaterialMaster form-control rounded border-dark cls">
                                    <option class="txt-center" value="">-Select Material Master-</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" step="0.01" class="form-control rounded border-dark txtfld quotation cls" id="txtQuantity" name="txtQuantity" maxlength="100" />
                            </td>
                            <td>
                                <input type="number" step="0.01" class="form-control rounded border-dark txtfld ItemPrice quotation itemPrice cls" id="txtItemPrice" name="txtItemPrice" maxlength="200" />
                            </td>
                            <td>
                                <input type="number" class="form-control rounded border-dark txtTotalAmt quotation cls" name="txtTotalAmt" readonly="readonly" maxlength="200" />
                            </td>
                            <td class="tdDesc">
                                <input type="text" class="form-control rounded border-dark txtDescription quotation cls" name="txtDescription" maxlength="200" />
                            </td>
                            <td>
                                <input type="button" class="btnDeleteRow" value="Remove"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
