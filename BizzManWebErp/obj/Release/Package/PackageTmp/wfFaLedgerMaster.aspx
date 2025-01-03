<%@ Page Title="" Language="C#" MasterPageFile="~/FaMainMenu.Master" AutoEventWireup="true" CodeBehind="wfFaLedgerMaster.aspx.cs" Inherits="BizzManWebErp.wfFaLedgerMaster" %>

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
    <link href="css/LedgerMaster.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/FaLedgerMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateFaLedgerMaster();">Create</button>
    <button onclick="ViewFaLedgerMasterList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divFaLedgerMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblFaLedgerMasterList" class="display">
            <thead>
                <tr>
                    <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                        <th style="width: 5%;">Ledger Id</th>
                        <th style="width: 10%;">Ledger Name</th>
                        <th style="width: 30%;">Group Name</th>
                        <th style="width: 15%;">Opening Balance</th>
                        <th style="width: 15%;">Closing Balance</th>
                        <th style="width: 20%;">Financial Year</th>
                        <th style="width: 15%;">Created By</th>
                        <th style="width: 5%;">Active</th>
                </tr>
            </thead>
            <tbody id="tbody_FaLedgerMaster_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divFaLedgerMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add Ledger Master New</b>
            </div>
            <div class="card-body">
                <table style="width: 100%; margin: 5px;">
                    <tr>
                        <td style="width: 50%;">
                            <table style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                               
                                <tr>
                                    <td style="width: 54%;">
                                        <label>Ledger Name *</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtLedgerName" name="txtLedgerName" maxlength="100" />
                                        <input type="text" style="display: none;" id="txtLedgerId" name="txtLedgerId" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 54%;">
                                        <label>Group Name *</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlAccountGroup" name="ddlAccountGroup">
                                            <option value="-1">-Select Group-</option>
                                        </select>

                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 54%;">
                                        <label>Opening Balance *</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtOpeningBalance" name="txtOpeningBalance" value="0" maxlength="18" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 11%;">
                                        <label>Active</label></td>
                                    <td colspan="3">
                                        <input type="checkbox" placeholder="Enter Description" id="chkActive" name="chkActive" checked />
                                    </td>
                                </tr>
                            </table>
                            
                            <table id="tblSetODLimit" name="tblSetODLimit" style="margin-top: 5px; width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px; display:none;">
                                <tr>
                                    <td style="width: 56%;">
                                        <label>Set OD Limit</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtSetODLimit" name="txtSetODLimit"  maxlength="100" />
                                    </td>
                                </tr>
                            </table>
                            
                            <table id="tblPanel3" name="tblPanel3" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;margin-top: 5px;">
                               
                                <tr>
                                    <td style="width: 54%;">
                                        <label>Is TDS Deductable</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3IsTDSDeductable" name="ddlP3IsTDSDeductable">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr id="trTreatAsTDSExpenses" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Treat as TDS Expenses</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3TreatAsTDSExpenses" name="ddlP3TreatAsTDSExpenses">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                 <tr id="trDeducteeType" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Deductee Type :</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3DeducteeType" name="ddlP3DeducteeType">
                                            <option value="-1">- Select -</option>                                            
                                        </select>
                                        <input type="hidden" id="hdP3SelectedDeducteeTypeId" name="hdP3SelectedDeducteeTypeId"/>
                                    </td>
                                </tr>
                                <tr id="trDeductTDSInSameVoucher" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Deduct TDS in Same Voucher</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3DeductTDSInSameVoucher" name="ddlP3DeductTDSInSameVoucher">
                                            <option value="">-Select Y/N-</option>
                                            <option value="N"> N</option>
                                            <option value="Y"> Y</option>
                                        </select>
                                    </td>
                                </tr>
                                 <tr id="trNatureOfPayment" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Nature of Payment</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3NatureOfPayment" name="ddlP3NatureOfPayment">
                                            <option value="">- Select -</option>
                                            <option value="Any"> Any </option>
                                            <option value="Undefined"> Undefined </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr id="trAssesableVCFor" style="display:none;">
                                    <td style="width: 60%;">
                                        <label>Include in Assesable Value Calculation for</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3AssesableVCFor" name="ddlP3AssesableVCFor">
                                             <option value="">- Select -</option>
                                            <option value="Not Applicable">Not Applicable</option>
                                            <option value="GST">GST</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr id="trAppropriateTo" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Appropriate to</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3AppropriateTo" name="ddlP3AppropriateTo">
                                             <option value="">- Select -</option>
                                            <option value="Goods">Goods</option>
                                            <option value="Service">Service</option>
                                            <option value="Both">Both</option>
                                        </select>
                                    </td>
                                </tr>
                                 <tr id="trMethodOfCalculation" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Method of Calculation</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP3MethodOfCalculation" name="ddlP3MethodOfCalculation">
                                             <option value="">- Select -</option>
                                            <option value="Based on Quantity">Based on Quantity</option>
                                            <option value="Based on Value">Based on Value</option>
                                       </select>
                                    </td>
                                </tr>

                            </table>
                        </td>
                        <td style="width: 50%">
                            <table id="tblProvideBankDetail" name="tblProvideBankDetail" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                <tr>
                                    <td style="width: 56%;">
                                        <label>Provide Bank Detail(Y/N)</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlProvideBankDetail" name="ddlProvideBankDetail">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <table id="tblAccountDetails" name="tblAccountDetails" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                               <tr>
                                    <td style="width: 40%;">
                                        <label>A/C Holder's Name</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtAccountHolderName" name="txtAccountHolderName" maxlength="100" />
                                    </td>
                                </tr>
                                 <tr>
                                    <td style="width: 40%;">
                                        <label>Bank Account Number </label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtBankAcNum" name="txtBankAcNum" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>IfCS Code </label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtIfcsCode" name="txtIfcsCode" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>SWIFT Code </label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtSwiftCode" name="txtSwiftCode" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>Bank Name </label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtBankName" name="txtBankName" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>Bank Branch Name </label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtBankBranchName" name="txtBankBranchName" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>BSR Code </label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtBSRCode" name="txtBSRCode" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>Set/Alter Range for Cheque Books</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlSetAlterRangeChequeBook" name="ddlSetAlterRangeChequeBook">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 56%;">
                                        <label>Set/Alter Cheque Printing Configuration</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlSetAlterChequePrintingConfig" name="ddlSetAlterChequePrintingConfig">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 40%;">
                                        <label>Transaction Type</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlTransactionType" name="ddlTransactionType">
                                            <option value="">- Select -</option>
                                            <option value="Cheque">Cheque</option>
                                            <option value="e-Fund Transfer">e-Fund Transfer</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%; margin: 5px;">
                    <tr>
                        <td style="width: 50%;">
                             <table  id="tblPanel4A" name="tblPanel4" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                <tr>
                                    <td>
                                         <label>Tax Registration Details</label>
                                         <table style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                                <tr>
                                                      <td style="width: 15%;">
                                                         <label>PAN/IT No.</label></td>
                                                     <td>
                                                         <input type="text" style="width: 85%;" id="txtPANITNumber" name="txtPANITNumber" maxlength="100" />
                                                     </td>
                                                      <td style="width: 15%;">
                                                         <label>Registration Type</label></td>
                                                     <td>
                                                          <select style="width: 95%; margin-top: 8px;" id="ddlP4RegistrationType" name="ddlP4RegistrationType">
                                                               <option value="">- Select -</option> 
                                                              <option value="Unknown">Unknown</option>
                                                               <option value="Composition">Composition</option>
                                                               <option value="Consumer">Consumer</option>
                                                               <option value="Regular">Regular</option>
                                                               <option value="Unregistered">Unregistered</option>
                                                          </select>
                                                     </td>
                                                 </tr>
                                                 <tr>
                                                     <td style="width: 15%;">
                                                         <label>GSTIN/UIN</label></td>
                                                     <td>
                                                         <input type="text" style="width: 85%;" id="txtP4GSTINUIN" name="txtP4GSTINUIN" maxlength="100" />
                                                     </td>
                                                      <td style="width: 29%;">
                                                         <label>Set/Alter GST Details</label></td>
                                                     <td>
                                                          <select style="width: 95%; margin-top: 8px;" id="ddlP4SetAlterGSTDetails" name="ddlP4SetAlterGSTDetails">
                                                             <option value="">-Select Y/N-</option>
                                                              <option value="Y">Y</option>
                                                              <option value="N">N</option>
                                                          </select>
                                                     </td>
                                                 </tr>
                                                             </table>
                                        
                                     </td>
                                </tr>
                              </table>
                               <table  id="tblPanel4" name="tblPanel4" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                    <tr>
                                        <td>
                                              <label>Mailing Address</label>
                                              <table style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                                  <tr>
                                                      <td style="width: 15%;">
                                                         <label>Name</label></td>
                                                     <td>
                                                         <input type="text" style="width: 85%;" id="txtP4Name" name="txtP4Name" maxlength="100" />
                                                     </td>
                                                      <td style="width: 15%;">
                                                         <label>Country</label></td>
                                                     <td>
                                                         <select style="width: 85%; margin-top: 8px;" id="ddlP4Country" name="ddlP4Country">
                                                             <option value="-1">-Select Country-</option>
                                                         </select>
                                                     </td>
                                              </tr>
                                                  <tr>
                                                      <td style="width: 15%;">
                                                         <label>Address</label></td>
                                                     <td>
                                                         <input type="text" style="width: 85%;" id="txtP4Address" name="txtP4Address" maxlength="100" />
                                                     </td>
                                                      <td style="width: 15%;">
                                                         <label>State</label></td>
                                                     <td>
                                                         
                                                          <select style="width: 85%; margin-top: 8px;" id="ddlP4State" name="ddlP4State">
                                                             <option value="-1">-Select State-</option>
                                                         </select>
                                                         <input type="hidden" id="hdP4SelectedStateId" name="hdP4SelectedStateId"/>
                                                     </td>
                                                 </tr>
                                                  <tr>
                                                      <td style="width: 15%;" colspan="2">
                                                         
                                                      </td>
                                                    
                                                      <td style="width: 15%;">
                                                         <label>Pin Code</label></td>
                                                     <td>
                                                          <input type="text" style="width: 85%;" id="txtP4PinCode" name="txtP4PinCode" maxlength="100" />
                                                     </td>
                                                 </tr>
                                             </table>
                                 		</td>
                                    </tr>
                               </table>
                        </td>
                        <td style="width: 30%;">
                            <table id="tblPanel5" name="tblPanel5" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                <tr>
                                    <td style="width: 40%;">
                                        <label>Registration Type</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP5RegistrationType" name="ddlP5RegistrationType" disabled="disabled">
                                              <option value="">- Select -</option> 
                                              <option value="Unknown">Unknown</option>
                                              <option value="Composition">Composition</option>
                                              <option value="Consumer">Consumer</option>
                                              <option value="Regular">Regular</option>
                                              <option value="Unregistered">Unregistered</option>
                                        </select>
                                    </td>
                                </tr>
                                 <tr>
                                    <td style="width: 50%;">
                                        <label>Assessee of Other Teritory</label></td>
                                    <td>
                                         <select style="width: 84%; margin-top: 8px;" id="ddl5IsAssesseeOfOtherTeritory" name="ddl5IsAssesseeOfOtherTeritory">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                 <tr>
                                    <td style="width: 40%;">
                                        <label>Is e-commerce operator</label></td>
                                    <td>                                        
                                        <select style="width: 84%; margin-top: 8px;" id="ddl5IsEcommerceOperator" name="ddl5IsEcommerceOperator">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                 <tr>
                                    <td style="width: 40%;">
                                        <label>GSTIN/UIN</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtP5GSTINUIN" name="txtP5GSTINUIN" maxlength="100" readonly="readonly"/>
                                    </td>
                                </tr>
                                 <tr>
                                    <td style="width: 40%;">
                                        <label>Is a Transporter</label></td>
                                    <td>
                                         <select style="width: 84%; margin-top: 8px;" id="ddl5IsATransporter" name="ddl5IsATransporter">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                 <table style="width: 100%; margin: 5px;">
                    <tr>
                        <td style="width: 50%;">
                            <table id="tblPanel6" name="tblPanel6" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                <tr>
                                    <td style="width: 40%;">
                                        <label>Type of Ledger</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP6TypeOfLedger" name="ddlP6TypeOfLedger">
                                            <option value="">- Select -</option> 
                                            <option value="Not Applicable">Not Applicable</option> 
                                            <option value="Discount">Discount</option> 
                                            <option value="Invoice Rounding">Invoice Rounding</option> 
                                        </select>
                                    </td>
                                </tr>
                                 <tr id="trP6RoundingMethod" style="display:none;">
                                    <td style="width: 50%;">
                                        <label>Rounding Method</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP6RoundingMethod" name="ddlP6RoundingMethod">
                                              <option value="">- Select -</option> 
                                              <option value="Downward Rounding">Downward Rounding</option>
                                              <option value="Normal Rounding">Normal Rounding</option>
                                              <option value="Upward Rounding">Upward Rounding</option>
                                        </select>
                                    </td>
                                </tr>
                                  <tr id="trP6RoundingLimit" style="display:none;">
                                    <td style="width: 40%;">
                                        <label>Rounding Limit</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtP6RoundingLimit" name="txtP6RoundingLimit" maxlength="100" />
                                    </td>
                                </tr>
                                 
                            </table>

                            <table  id="tblPanel7" name="tblPanel7" style="margin-top: 5px;width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                <tr>
                                    <td>
                                         <label>Statutory Details</label>
                                         <table style="width: 100%;">
                                               <tr id ="trP7IsGSTApplicable" style="display:none;">
                                                  <td style="width: 64%;">
                                                      <label>Is GST Applicable</label></td>
                                                  <td>
                                                       <select style="width: 84%; margin-top: 8px;" id="ddlP7IsGSTApplicable" name="ddlP7IsGSTApplicable">
                                                              <option value="">-Select Y/N-</option>
                                                              <option value="Y">Y</option>
                                                              <option value="N">N</option>
                                                        </select>
                                                  </td>
                                             </tr>
                                             <tr id ="trP7SetAlterGSTDetails" style="display:none;">
                                                     <td style="width: 64%;">
                                                        <label>Set/Alter GST Details</label>

                                                     </td>
                                                     <td>
                                                          <select style="width: 84%; margin-top: 8px;" id="ddlP7SetAlterGSTDetails" name="ddlP7SetAlterGSTDetails">
                                                             <option value="">-Select Y/N-</option>
                                                              <option value="Y">Y</option>
                                                              <option value="N">N</option>
                                                          </select>
                                                      </td>
                                                </tr>
                                             <tr id ="trP7TypeOfSupply" style="display:none;">
                                                     <td style="width: 64%;">
                                                        <label>Type of Supply</label>
                                                     </td>
                                                     <td>
                                                          <select style="width: 84%; margin-top: 8px;" id="ddlP7TypeOfSupply" name="ddlP7TypeOfSupply">
                                                             <option value="">- Select -</option>
                                                              <option value="Goods">Goods</option>
                                                              <option value="Services">Services</option>
                                                          </select>
                                                      </td>
                                                </tr>
                                              <tr id ="trP7IsTDSApplicable" style="display:none;">
                                                  <td style="width: 64%;">
                                                      <label>Is TDS Applicable</label></td>
                                                  <td>
                                                       <select style="width: 84%; margin-top: 8px;" id="ddlP7IsTDSApplicable" name="ddlP7IsTDSApplicable">
                                                              <option value="">-Select Y/N-</option>
                                                              <option value="Y">Y</option>
                                                              <option value="N">N</option>
                                                       </select>
                                                  </td>
                                             </tr>
                                             <tr id ="trP7NatureOfPayment" style="display:none;">
                                                     <td style="width: 64%;">
                                                        <label>Nature Of Payment</label>

                                                     </td>
                                                     <td>
                                                          <select style="width: 84%; margin-top: 8px;" id="ddlP7NatureOfPayment" name="ddlP7NatureOfPayment">
                                                             <option value="">-Select -</option>
                                                              <option value="Any">Any</option>
                                                              <option value="Undefined">Undefined</option>
                                                          </select>
                                                      </td>
                                             </tr>
                                              <tr id ="trP7IncludeInAssessableVCFor" style="display:none;">
                                                     <td style="width: 64%;">
                                                        <label>Include in Assessable Value Calculation For</label>

                                                     </td>
                                                     <td>
                                                          <select style="width: 84%; margin-top: 8px;" id="ddlP7IncludeInAssessableVCFor" name="ddlP7IncludeInAssessableVCFor">
                                                             <option value="">- Select -</option>
                                                              <option value="Not Applicable">Not Applicable</option>
                                                              <option value="GST">GST</option>
                                                          </select>
                                                      </td>
                                                </tr>
                                         </table>
                                     </td>
                                </tr>
                             </table>
                        </td>
                        <td style="width: 50%;">
                             <table  id="tblPanel8" name="tblPanel8" style="width: 100%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                                <tr>
                                    <td>
                                         <center>GST Details for Ledger:</center>
                                         <table style="width: 100%;">
                                             <tr>
                                                  <td style="width: 54%;"> <p>Classification <br><i>From 1-Apr-2022</i></p></td>
                                                  <td>
                                                       <select style="width: 84%; margin-top: 8px;" id="ddlP8Classification" name="ddlP8Classification">
                                                          <option value="">- Select -</option>
                                                       </select>
                                                  </td>
                                             </tr>
                                         </table>
                                         
                                        <p><i>(Note: when the tax details are set using classification, it ignores the direct tax information below)</i></p>
                                        <hr />
                                        <table style="width: 100%;">
                                             <tr>
                                                  <td style="width: 54%;"> Nature of transaction</td>
                                                  <td>
                                                       <select style="width: 84%; margin-top: 8px;" id="ddlP8NatureOfTransaction" name="ddlP8NatureOfTransaction">
                                                          <option value="-1">- Select -</option>
                                                       </select>
                                                  </td>
                                             </tr>
                                         </table>
                                        <Label>Tax Details</Label>
                                        <table style="width: 100%;">
                                             <tr>
                                                  <td style="width: 54%;"> Taxibility</td>
                                                  <td>
                                                       <input type="text" style="width: 84%;" id="txtP8Taxibility" name="txtP8Taxibility" maxlength="100" readOnly/>
                                                  </td>
                                             </tr>
                                            <tr>
                                                  <td style="width: 50%;"><label> Tax Type</label></td>
                                                  <td style="width: 50%;">
                                                       <label>Rate</label>
                                                  </td>
                                             </tr>
                                            <tr>
                                                  <td style="width: 54%;"> <label>Integrated Tax</label></td>
                                                  <td>
                                                       <input type="text" style="width: 84%;" id="txtP8IntegratedTax" name="txtP8IntegratedTax" maxlength="100" readOnly/><label>%</label>
                                                  </td>
                                             </tr>
                                            <tr>
                                                  <td style="width: 54%;"> <label>Cess</label></td>
                                                  <td>
                                                       <input type="text" style="width: 84%;" id="txtP8Cess" name="txtP8Cess" maxlength="100" readOnly/> <label>%</label>
                                                  </td>
                                             </tr>
                                         </table>
                                     </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                 <table id="tblPanel9" style="width: 50%; margin: 5px; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                    <tr>
                        <td style="width: 54%;">
                            <label>Type of Duty/Tax</label></td>
                        <td>
                            <select style="width: 84%; margin-top: 8px;" id="ddlP9TypeOfDutyTax" name="ddlP9TypeOfDutyTax">
                                <option value="">- Select -</option>
                                <option value="GST">GST</option>
                                <option value="TDS">TDS</option>
                                <option value="Others">Others</option>
                            </select>
                        </td>
                   </tr>
                   <tr id ="trP9TaxType" style="display:none;">
                        <td style="width: 54%;">
                            <label>Tax Type</label></td>
                        <td>
                            <select style="width: 84%; margin-top: 8px;" id="ddlP9TaxType" name="ddlP9TaxType">
                                <option value="">- Select -</option>
                                <option value="Central Tax">Central Tax</option>
                                <option value="Cess">Cess</option>
                                <option value="Integrated Tax">Integrated Tax</option>
                                <option value=" State Tax"> State Tax</option>
                             
                            </select>
                        </td>
                   </tr>
                   <tr id ="trP9ValuationType" style="display:none;">
                        <td style="width: 54%;">
                            <label>Valuation Type</label></td>
                        <td>
                            <select style="width: 84%; margin-top: 8px;" id="ddlP9ValuationType" name="ddlP9ValuationType">
                                <option value="">- Select -</option>
                                <option value="Any">Any</option>
                                <option value="Based on Quantity">Based on Quantity</option>
                                <option value="Based on Value">Based on Value</option>
                            </select>
                        </td>
                   </tr>
                   <tr id ="trP9PercentageOfCalculation" style="display:none;">
                        <td style="width: 54%;">
                            <label>Percentage Of Calculation</label></td>
                        <td>
                             <input type="text" style="width: 85%;" id="txtP9PercentageOfCalculation" name="txtP9PercentageOfCalculation" maxlength="100" />
                        </td>
                   </tr>
                   <tr id ="trP9RoundingMethod" style="display:none;">
                        <td style="width: 54%;">
                            <label>Rounding Method</label></td>
                        <td>
                            <select style="width: 84%; margin-top: 8px;" id="ddlP9RoundingMethod" name="ddlP9RoundingMethod">
                                <option value="">- Select -</option>
                                <option value="Not Applicable">Not Applicable</option>
                                <option value="Downward Rounding">Downward Rounding</option>
                                <option value="Normal Rounding">Normal Rounding</option>
                                <option value="Upward Rounding">Upward Rounding</option>
                             </select>
                        </td>
                   </tr>
                   <tr id ="trP9IsTDSApplicable" style="display:none;">
                        <td style="width: 54%;">
                            <label>Is TDS Applicable</label></td>
                        <td>
                            <select style="width: 84%; margin-top: 8px;" id="ddlP9IsTDSApplicable" name="ddlP9IsTDSApplicable">
                                <option value="">- Select -</option>
                                <option value="Applicable">Applicable</option>
                                <option value="Not Applicable">Not Applicable</option>
                                <option value="Undefined">Undefined</option>
                           </select>
                        </td>
                   </tr>
                      <tr id ="trP9NatureOfPayment" style="display:none;">
                        <td style="width: 54%;">
                            <label>Nature of Payment</label></td>
                        <td>
                            <select style="width: 84%; margin-top: 8px;" id="ddlP9NatureOfPayment" name="ddlP9NatureOfPayment">
                                <option value="">- Select -</option>
                                <option value="Any">Any</option>
                              <%--  <option value="Undefined">Undefined</option>--%>
                            </select>
                        </td>
                   </tr>
                </table>
                
                  <table id="tblPanel10" name="tblPanel10" style="display:none;width: 50%; border: 1px solid transparent; border-color: #ddd; border-radius: 4px;">
                               
                                <tr>
                                    <td style="width: 64%;">
                                        <label>Maintain Balances Bill-by-Bill</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP10MaintainBalancesBillByBill" name="ddlMaintainBalancesBillByBill">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr id="trP10DefaultCreditPeriod" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Default Credit Period(Day)</label></td>
                                    <td>
                                        <input type="text" style="width: 84%;" id="txtP10DefaultCreditPeriodDay" name="txtP10DefaultCreditPeriodDay" maxlength="100" />
                                    </td>
                                </tr>
                                 <tr id="trP10CheckforCreditDays" style="display:none;">
                                    <td style="width: 54%;">
                                        <label>Check for Credit Days During Voucher Entry</label></td>
                                    <td>
                                        <select style="width: 84%; margin-top: 8px;" id="ddlP10CheckforCreditDayDuringVoucher" name="ddlP10CheckforCreditDayDuringVoucher">
                                            <option value="">-Select Y/N-</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>                                            
                                        </select>
                                    </td>
                                </tr>
                      </table>
                               
                                
            </div>
        </div>
    </div>
    <div class="container">
        <button id="btnExport" class="dt-button buttons-excel buttons-html5" type="button" onclick="ExportToExcel();" style="display: none;">
            <span>Export To Excel</span>
        </button>
    </div>
    <div class="container" style="display: none;">

        <table id="tblExportToExcelLedgerMaster" class="display">
            <thead>
                <tr>
                    <th style="width: 5%;">Ledger Id</th>
                    <th style="width: 10%;">Ledger Name</th>
                    <th style="width: 30%;">Group Name</th>
                    <th style="width: 15%;">Opening Balance</th>
                    <th style="width: 20%;">Financial Year</th>
                    <th style="width: 15%;">Created By</th>
                    <th style="width: 5%;">Active</th>
                </tr>
            </thead>
            <tbody id="tbody_ExportToExcelLedgerMaster">
            </tbody>
        </table>
    </div>
</asp:Content>
