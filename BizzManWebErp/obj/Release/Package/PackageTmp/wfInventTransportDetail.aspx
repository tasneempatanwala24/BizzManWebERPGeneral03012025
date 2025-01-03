<%@ Page Title="Transport Detail" Language="C#" MasterPageFile="~/InventMainMenu.Master" AutoEventWireup="true" CodeBehind="wfInventTransportDetail.aspx.cs" Inherits="BizzManWebErp.wfInventTransportDetail" %>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-datepicker3.css" rel="stylesheet" />
    <script src="Scripts/bootstrap-datepicker.min.js"></script>
    <script src="Scripts/InventTransportDetail.js"></script>
    <style>
    .dropdown-container {
    position: relative;
}

.dropdown-link {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px; /* Adjust margin as needed */
    z-index: 1; /* Ensure link appears above select */
}

#ddlTransport {
    width: 100%;
    padding-right: 60px; /* Adjust according to link width */
}
    </style>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hfBase64" runat="server" />
    <input type="hidden" id="hfId" value="0" runat="server" />
    <button onclick="CreateData();">Create</button>
    <button onclick="ViewDataList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>
    <input id="fuImg" type="file" onchange="readURL(this)" src="Images/fileupload.png" style="display: none;" accept="image/x-png,image/jpeg,image/jpg" />
    <button onclick="document.getElementById('fuImg').click()" style="display: none;" id="btnUploadFile">Upload File</button>
    <button style="display: none;" id="btnDisplayData">Display File</button>

    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">
        <div id="dvListView">
            <table id="tblDataList" class="display table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Entry Date</th>
                        <th>Transport Name</th>
                        <th>Amount</th>
                        <th>Central Tax Percent</th>
                        <th>State Tax Percent</th>
                        <th>Cess Percent</th>
                        <th>Net Amount</th>
                    </tr>
                </thead>
                <tbody id="tbody_Data_List">
                </tbody>
            </table>
        </div>
        
    </div>


   <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Transport Detail </b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                          <tr>
                               <td style="width:15%">Entry Date *</td>
                                 <td style="width:35%">
                                    <div class="input-group date">
                                         <input type="text" class="form-control rounded border-dark" id="txtEntryDate" name="txtEntryDate">
                                         <div class="input-group-addon">
                                             <span class="fa fa-calendar datepicker"></span>
                                         </div>
                                     </div>
                                 </td>  
                                  <td style="width:15%">ID</td>
                                    <td style="width:35%">
                                       <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                    </td>
                               </tr>
                            <tr>
                                     <td style="width:15%">
                                      <label class="control-label">Transport Name *</label>
                                     </td>
                                     <td style="width:35%">
                                      <div class="dropdown-container">
                                        <select style="width: 350px;" id="ddlTransport" name="ddlTransport" class="form-control rounded border-dark">
                                            
                                        </select>
                                        <a href="wfInventTransportMaster.aspx" id="link" class="dropdown-link">Add</a>
                                    </div>
                                         
                                     </td>
                                     <td style="width:15%">
                                      <label class="control-label">Category *</label>
                                     </td>
                                     <td style="width:35%">
                                      <select style="width: 100%;" id="ddlTransportCategory" name="ddlTransportCategory" class="form-control rounded border-dark"></select>
                                    </td>
                            </tr>
                            <tr>
                                <td style="width:15%">
                                     <label class="control-label">Category Transaction Id</label>
                                    </td>
                                    <td style="width:35%">
                                     <select style="width: 100%;" id="ddlTransportCategoryTransection" name="ddlTransportCategoryTransection" class="form-control rounded border-dark">
                                         <%--<option value=''>-Select Transport Category Transection-</option>--%>
                                     </select>
     
                                    </td>
                                    <td style="width:15%">
                                     <label class="control-label">Transaction Id</label>
                                    </td>
                                    <td style="width:35%">
                                     <select style="width: 100%;" id="ddlTransection" name="ddlTransection" class="form-control rounded border-dark">
                                         <%--<option value=''>-Select Transection-</option>--%>
                                     </select>
     
                                    </td>
                            </tr>
                            <tr>
                                <td style="width:15%">
                                 <label class="control-label">From Location *</label>
                                </td>
                                <td style="width:35%">
                                 <%--<select style="width: 100%;" id="ddlFromLocation" name="ddlFromLocation" class="form-control rounded border-dark">
                                 </select>--%>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="ddlFromLocation" name="ddlFromLocation" />
                                </td>
                               <td style="width:15%">
                                 <label class="control-label">To Location *</label>
                                </td>
                                <td style="width:35%">
                                <%-- <select style="width: 100%;" id="ddlToLocation" name="ddlToLocation" class="form-control rounded border-dark">
                                 </select>--%>
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="ddlToLocation" name="ddlToLocation" />
                                </td>
                            </tr>
                            <tr>
                             <td style="width:15%">
                              <label class="control-label">Branch *</label>
                             </td>
                             <td style="width:35%">
                              <select style="width: 100%;" id="ddlBranch" name="ddlBranch" class="form-control rounded border-dark"></select>
                             </td>
                            <td style="width:15%">
                              <label class="control-label">Department *</label>
                             </td>
                             <td style="width:35%">
                              <select style="width: 100%;" id="ddlDepartment" name="ddlDepartment" class="form-control rounded border-dark"></select>
                             </td>
                            </tr>
                            <tr>
                               <td style="width:15%">Amount *</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtTransportAmt" name="txtTransportAmt" />
                                </td>
                                 <td style="width:15%">Central Tax Percent </td>
                                 <td style="width:35%">
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtCentralTaxPercent" name="txtCentralTaxPercent" />
                                 </td>
                            </tr>
                            <tr>
                               <td style="width:15%">State Tax Percent</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtStateTaxPercent" name="txtStateTaxPercent" />
                                </td>
                                 <td style="width:15%">Cess Percent </td>
                                 <td style="width:35%">
                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtCessPercent" name="txtCessPercent" />
                                 </td>
                            </tr>
                            <tr>
                               <td style="width:15%">Net Amount</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtNetAmt" name="txtNetAmt" />
                                </td>
                                 <td style="width:15%">
                                  <label class="control-label">Submit Gst</label>
                                 </td>
                                 <td style="width:35%">
                                  <select style="width: 100%;" id="ddlSubmitGst" name="ddlSubmitGst" class="form-control rounded border-dark"></select>
                                </td>
                            </tr>
                            <tr>
                               <td style="width:15%">Vehicle No.</td>
                                <td style="width:35%">
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtVehicleNo" name="txtVehicleNo" />
                                </td>
                                 <td style="width:15%">
                                  <label class="control-label">Vehicle Type</label>
                                 </td>
                                 <td style="width:35%">
                                  <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtVehicleType" name="txtVehicleType" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width:15%">Description</td>
                                 <td style="width:35%" colspan="3">
                                     <textarea rows="5" cols="5" class="form-control rounded border-dark" id="txtDescription" name="txtDescription"></textarea>
                                    
                                 </td>
                            </tr>
                        </table>

                       
                        </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>

