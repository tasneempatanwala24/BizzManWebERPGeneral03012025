<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfMnfManufactureDemandslip.aspx.cs" Inherits="BizzManWebErp.wfMnfManufactureDemandslip" MasterPageFile="~/ManufactMainMenu.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <link href="css/bootstrap-datepicker.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"> </script>
    <script src="Scripts/MnfManufactureDemandslip.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />

     <input type="hidden" id="hdnIsEdit" />
    <button onclick="CreateDemandSlip();" id="btnCreate">Create</button>
    <button onclick="ShowDemandSlipDetails()" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddDemandSlip()" style="display: none;" id="btnSave" title=" Press Ctrl + S to save record">Save</button>
    


    <div class="container" id="divList" style="margin-top: 10px; overflow: auto;">
      
         <table id="tblDemandSlipList" class="display">
             <thead>
                <tr>
                    <th class="noSort">
    <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    
                    <th style="white-space: nowrap;">Demand Issue No</th>
                    <th style="white-space: nowrap;">Date & Time</th>
                    <th style="white-space: nowrap;">Reference</th>
                    <th style="white-space: nowrap;">Counter No</th>
                    <th style="white-space: nowrap;">Receipt Date</th>
                    
                </tr>
                 </thead>
                <tbody id="tbody_DemandSlipList"></tbody>
            </table>
    </div>



  
     <div class="container" id="divEntry" style="display: none; margin-top: 10px;">
            <div class="card">
                <div class="card-header">Add Demand Slip</div>
                <div class="card-body">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <table class="tbl">
                                <tr>
                                    <td>Demand Issue No</td>
                                    <td><input type="text" class="form-control" id="txtDemandIssueNo" readonly /></td>
                                    <td>Date & Time</td>
                                    <td><input type="datetime-local" class="form-control" id="txtDateTime" /></td>
                                </tr>
                                <tr>
                                    <td>Reference</td>
                                    <td><select id="ddlReference" class="form-control"></select></td>
                                    <td>Counter No</td>
                                    <td><select id="ddlCounterNo" class="form-control"></select></td>
                                </tr>
                                <tr>
                                    <td>Receipt Date</td>
                                    <td><input type="date" class="form-control" id="txtReceiptDate" /></td>
                                </tr>
                            </table>
                             </div>
                    </div>
                </div>
            </div>
        </div>

   

      <div class="container" id="divDetails" style="margin-top: 10px; overflow: auto; display: none;">
            <div class="card">
                <div class="card-header">Add Demand Slip Details</div>
                <div class="card-body">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <table id="tblDemandDetails" class="display no-footer dataTable" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th style="display: none;">Id</th>
                                        <th>Item</th>
                                        <th style="display: none;">ItemId</th>
                                        <th>Qty</th>
                                        <th>UOM</th>
                                        <th style="display: none;">UOMId</th>
                                        <th>Available Stock</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_DemandListDetails">
                                    <tr id="tr_DemandListEntry">
                                        <td style="display: none;"></td>
                                        <td style="width: 250px;">
                                            <select id="ddlItemDetails" name="ddlItemDetails" class="form-control" style="width:100% !important" onchange="FetchMaterialDetails();">
                                                <option value="">-Select Item-</option>
                                            </select>
                                        </td>
                                        <td style="width: 100px;">
                                            <input type="text" class="form-control" id="txtItemQty" name="txtItemQty" placeholder="Qty" oninput="handleNumericInput(event)" onblur="checkInputGiven(event)" value="0" />
                                        </td>
                                        <td style="width: 250px;">
                                            <select id="ddlUOMDetails" name="ddlUOMDetails" class="form-control">
                                                <option value="">-Select UOM-</option>
                                            </select>
                                        </td>
                                        <td style="display: none;"></td>
                                        <td style="width: 100px;">
     <input type="text" class="form-control" id="txtMaterialStock" placeholder="Stock" name="txtMaterialStock" readonly="readonly" />
 </td>
                                        <td>
                                            <button type="button" class="btn btn-primary" onclick="SaveDemandListDetails();">Add</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

   
</asp:Content>
