<%@ Page Title="" Language="C#" MasterPageFile="~/FaMainMenu.Master" AutoEventWireup="true" CodeBehind="wfFaVoucherEntry.aspx.cs" Inherits="BizzManWebErp.wfFaVoucherEntry" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/alertify.css" rel="stylesheet" />
    <script src="Scripts/jquery.min.js"></script>
    <script src="Scripts/alertify.js"></script>
    <link href="css/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="Scripts/jquery.dataTables.min.js"></script>
    <link href="Scripts/buttons.dataTables.min.css" rel="stylesheet" />
    <script src="Scripts/dataTables.buttons.min.js"></script>
    <script src="Scripts/jszip.min.js"></script>
    <script src="Scripts/buttons.html5.min.js"></script>
    <link href="css/select2.min.css" rel="stylesheet" />
    <script src="Scripts/select2.min.js"></script>
    <script src="Scripts/tableHTMLExport.js"></script>

    <link href="css/style.css" rel="stylesheet" />
    <link href="css/VoucherEntry.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/FaVoucherEntry.js"></script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <input type="hidden" id="loginuser" runat="server" />
    <button id="btnAddNew" onclick="CreateFaVoucherEntry();">Create</button>
    <button onclick="ViewFaVoucherEntryList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

     <div class="container" id="divFaVoucherEntryList" style="margin-top: 10px; overflow: auto;">
        <table id="tblFaVoucherEntryList" class="display">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="width: 4%;">Voucher Id</th>
                    <th style="width: 4%;">Voucher Entry Date</th>
                    <th style="width: 4%;">Voucher Type</th>
                    <th style="width: 4%;">Narration</th>
                    <th style="width: 4%;">Transaction Type</th>
                    <th style="width: 4%;">Transaction Id</th>
                    <th style="width: 4%;">Financial Year Id</th>
                    <th style="width: 4%;">Approve</th>
                    <th style="width: 4%;">Active</th>
                    <th style="width: 4%;">Create User</th>
                    <th style="width: 4%;">Create Date</th>
                </tr>
            </thead>
            <tbody id="tbody_FaVoucherEntry_List">              
            </tbody>
        </table>
    </div>
        
    <div class="container" id="divFaVoucherEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
               <label id="lblAddVoucherEntry" name="lblAddVoucherEntry"> <b>Add Voucher Entry</b></label>
            </div>
            <div style="width: 100%;">
                <div class="card-body">
                   <table class="tbl" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                      <tr>
                           <td style="width: 50%;">
                               <table>
                                    <tr>
                                         <td style="width: 42%;">Voucher Entry Date *</td>
                                         <td> <%--class="form-control rounded border-dark"--%>
                                             <input type="date" class="form-control rounded border-dark" style="width: 90%;" id="txtVoucherEntryDate" name="txtVoucherEntryDate" />
                                             <input type="text" class="form-control rounded border-dark" style="width: 90%; display: none" id="txtVoucherId" name="txtVoucherId" />
                                         </td>
                                    </tr> 
                                    <tr>
                                         <td style="width: 42%;">Voucher Type *</td> 
                                         <td>
                                               <select class="form-control rounded border-dark" style="width: 90%;" id="ddlVoucherType" name="ddlVoucherType">
                                                 <option value="">-Select-</option>
                                             </select>
                                            <input type="text" class="form-control rounded border-dark" style="width: 90%;display:none" id="txtVoucherType" name="txtVoucherId" readonly/>
                                         </td>
                                    </tr>
                                    <tr id="trLedgerAccount">
                                        <td style="width: 42%;">Ledger Account *</td>
                                        <td>
                                              <select class="form-control rounded border-dark" style="width: 90%;" id="ddlLedgerAccount" name="ddlLedgerAccount">
                                                <option value="">-Select-</option>
                                            </select>
                                           <input type="text" class="form-control rounded border-dark" style="display:none; width: 90%;" id="txtLedgerName" name="txtLedgerName" maxlength="100" />
                                        </td>
                                    </tr>
                               </table>
                           </td>
                           <td style="width: 50%;">
                               <table>
                                   <tr id="trOpeningBalance">
                                       <td style="width: 42%;">Opening Balance </td>
                                       <td>
                                          <input type="text" class="form-control rounded border-dark" style="width: 90%;" id="txtOpeningBalance" name="txtOpeningBalance" value="0" maxlength="18" ReadOnly="readonly"/>
                                       </td>
                                   </tr>
                                   <tr id="trClosingBalance">
                                       <td style="width: 42%;">Closing Balance </td>
                                       <td>
                                          <input type="text" class="form-control rounded border-dark" style="width: 90%;" id="txtClosingBalance" name="txtClosingBalance" value="0" maxlength="18" ReadOnly="readonly"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <td style="width: 42%;">Approve</td> 
                                       <td >
                                           <input type="checkbox" placeholder="Enter Description" id="chkApprove" name="chkApprove" />
                                       </td>
                                   </tr>
                               </table>
                           </td>
                      </tr>
                   </table>
                   <table class="tbl" id="tblNarration" name="tblNarration" style="width: 100%; margin-top: 5px; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                         <tr>
                              <td style="width: 15%; padding-left: 10px;">Narration</td>
                              <td>
                                 <textarea style="width: 80%;" id="txtNarration" name="txtNarration" ></textarea>
                              </td>
                         </tr>
                    </table>
                </div>
            </div>  
            <div class="container" id="divPanel2" style="display:none"; float: left; > <%-- class="display" style=" overflow: auto;"--%>
                  <table class="tbl" id="tblPanel2" name="tblPanel2" style="width: 60%;margin:6px; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                       <thead>
                            <tr>
                                 <th style="width: 40%;padding-left:8px;">Particular *</th>
                                 <th style="width: 30%;">Amount *</th>
                                 <th style="width: 30%;">Dr/Cr *<input type="hidden" id="hdnPnl2RowCounter" name="hdnPnl2RowCounter" value ="0"/>
                                    <input style="float:right" type="image" id="imgBtnPnl2NewRow" name="imgBtnPnl2NewRow" onclick="AddNewGridLedgerEntryInPanel2();return false;"  title="faVoucherAddRow" width="50" height="44" src="Images/FaVoucherEntryAddNew.png" alt="Add new entry"/> 
                                 </th>
                            </tr>
                       </thead>
                        <tbody id="tbody_Panel2">
                        </tbody>
                   </table>
              </div>
            <div class="container" id="divPanel3"  style="width: 100%;display:none;" >
                  <table class="tbl" id="tblPanel3" name="tblPanel3" style="width: 100%;margin-left:5px;margin-top:5px; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                       <thead>
                            <tr>
                                 <th style="width: 20%;">Particular *</th>
                                 <th style="width: 15%;">Amount *</th>
                                 <th style="width: 10%;">Dr/Cr *</th>
                                 <th style="width: 15%">Transaction Type *</th>
                                 <th style="width: 20%;">Cheque Number</th>
                                 <th style="width: 20%;"">Date<input type="hidden" id="hdnPnl3RowCounter" name="hdnPnl3RowCounter" value ="0"/>
                                     <input style="float:right" type="image" id="imgBtnPnl3NewRow" name="imgBtnPnl3NewRow" onclick="AddNewGridLedgerEntryInPanel3();return false;"  title="faVoucherAddRow" width="50" height="44" src="Images/FaVoucherEntryAddNew.png" alt="Add new entry"/> 
                                 </th>
                            </tr> 
                       </thead>
                       <tbody id="tbody_Panel3">
                       </tbody>
                 </table>
            </div>  





            <div class="container" id="divPanel4"  style="width: 100%;display:none;" >
                  <table class="tbl" id="tblPanel4" name="tblPanel4" style="width: 100%;margin-left:5px;margin-top:5px; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                       <thead>                          
                            <tr id="trLedgerAccountSales">
                                      
                                        <td>
                                              <select class="form-control rounded border-dark" style="width: 90%;" id="ddlLedgerAccountSales" name="ddlLedgerAccountSales">
                                                <option value="">-Select Ledger-</option>
                                            </select>
                                           <input type="text" class="form-control rounded border-dark" style="display:none; width: 90%;" id="txtLedgerNameSales" name="txtLedgerNameSales" maxlength="100" />
                                        </td>

                                        
                                        <td>
                                              <select class="form-control rounded border-dark"  id="ddlSalesOrderId" name="ddlSalesOrderId" onchange="SalesOrderIdDropDownOnChange1();" >
                                                <option value="">-Select Order Id--------</option>
                                            </select>
                                           <input type="text" class="form-control rounded border-dark" style="display:none;" id="txtSalesOrderId" name="txtSalesOrderId" maxlength="100" />
                                        </td>                               
                                       <td style="width: 5%;">Total </td>
                                       <td>
                                          <input type="text" class="form-control rounded border-dark"  id="txtTotalAmt" name="txtTotalAmt" value="0" maxlength="18" ReadOnly="readonly"/>
                                       </td>
                                                                      
                                       <td style="width: 10%;">Outstanding Amount </td>
                                       <td>
                                          <input type="text" class="form-control rounded border-dark" style="width: 90%;" id="txtoutstandingAmt" name="txtoutstandingAmt" value="0" maxlength="18" ReadOnly="readonly"/>
                                       </td>
                                     <td style="width: 10%;">Amount </td>
                                       <td>
                                          <input type="text" class="form-control rounded border-dark" style="width: 90%;" id="txtAmount" name="txtAmount" value="0" maxlength="18" />
                                     </td>
                            </tr>
                            <tr>
                                 <th style="width: 20%;">Product Name </th>
                                 <th style="width: 15%;">QTY </th>
                                 <th style="width: 10%;">Rate </th>
                                 <th style="width: 15%">Amount </th>                                 
                            </tr> 
                       </thead>
                       <tbody id="tbody_Panel4">

                            <tr id="tr_SalesOrderDetailEntry">
                                   

                            </tr>


                       </tbody>




                     
                 </table>




                
                               












            </div>  





        </div>
    </div>

    <div class="container"> 
         <button id="btnExport" class="dt-button buttons-excel buttons-html5" type="button" onclick="ExportToExcel();" style="display: none;">
            <span>Export To Excel</span>                                       
        </button>
    </div>
    <div class="container" style="display:none;"> 
        
         <table id="tblExportToExcelVoucherEntry" class="display" >
            <thead>
                <tr>
                     <th style="width: 4%;">Voucher Id</th>
                    <th style="width: 4%;">Voucher Entry Date</th>
                    <th style="width: 4%;">Voucher Type</th>
                    <th style="width: 4%;">Narration</th>
                    <th style="width: 4%;">Transaction Type</th>
                    <th style="width: 4%;">Transaction Id</th>
                    <th style="width: 4%;">Financial Year Id</th>
                    <th style="width: 4%;">Approve</th>
                    <th style="width: 4%;">Active</th>
                    <th style="width: 4%;">Create User</th>
                    <th style="width: 4%;">Create Date</th>
                </tr>
            </thead>
            <tbody id="tbody_ExportToExcelVoucherEntry">
            </tbody>
        </table>
   </div>
</asp:Content>
 
                        