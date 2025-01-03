<%@ Page Title="" Language="C#" MasterPageFile="~/SdMainMenu.Master" AutoEventWireup="true" CodeBehind="wfSdBomMaster.aspx.cs" Inherits="BizzManWebErp.wfSdBomMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>
    <script src="Scripts/SdBomMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hfId" value="0" runat="server" />
    <button onclick="CreateList();">Create</button>
    <button onclick="ViewMaterialList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" onclick="ViewFile();" id="btnView">View File</button>
    <div class="container" id="divList" style="margin-top: 10px; overflow: auto;">
        <table id="tblList" class="display">
            <thead>
                <tr>
                   
                    <th style="white-space: nowrap;display:none;">Master Id</th>
                    <th style="white-space: nowrap;">Branch</th>
                    <th style="white-space: nowrap;">Item Name</th>
                    <th style="white-space: nowrap;">Qty</th>
                    <th style="white-space: nowrap;">Unit Measure</th>
                    <th style="white-space: nowrap;">Delivery Charges</th>
                    <th style="white-space: nowrap;">Total Central Tax</th>
                    <th style="white-space: nowrap;">Total State Tax</th>
                    <th style="white-space: nowrap;">Total Cess Tax</th>
                    <th style="white-space: nowrap;">Total Integrated Tax</th>
                    <th style="white-space: nowrap;">Total Sub Amount</th>
                    <th style="white-space: nowrap;">Total Amount</th>
                </tr>
            </thead>
            <tbody id="tbody_List">
            </tbody>
        </table>
    </div>



    <div class="container" id="divEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Sales BOM Master
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr> 
                                <td>Item Name *</td>
                                 <td>
                                     <input id="txtId" name="txtId" style="display:none;" />
                                     <input class="form-control" id="txtItemName" name="txtItemName" placeholder="please enter Item name" />
                                 </td>
                                
                                <td>Branch</td>
                                     <td>
                                         <select id="ddlBranch" name="ddlBranch" class="form-control"></select>
                                     </td>
                            </tr>
                            <tr>
                                <td>Alias</td>
                                 <td>
                                     <input class="form-control" id="txtAlias" name="txtAlias" placeholder="please enter alias" />
                                 </td>
                                <td>Qty *</td>
                                <td>
                                    <input type="number" class="form-control dcmlNo" id="txtQty" name="txtQty" placeholder="please enter Qty" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>Unit Measure</td>
                                <td>
                                    <select id="ddlUnitMeasure" name="ddlUnitMeasure" class="form-control">
                                        <option value="">-Select Unit Measure-</option>
                                    </select>
                                </td>
                                
                            </tr>
                            <tr>
                                
                                <td>Total Central Tax</td>
                                    <td>
                                        <input type="number" class="form-control" id="txtTotalCentralTax" name="txtTotalCentralTax" readonly="readonly"/>
                                    </td>
                               <td>Total State Tax</td>
                                 <td>
                                     <input type="number" class="form-control" id="txtTotalStateTax" name="txtTotalStateTax" readonly="readonly" />
                                 </td>
                            </tr>
                            <tr>
                               
                                <td>Total Tax</td>
                                    <td>
                                        <input type="number" class="form-control" id="txtTotalTax" name="txtTotalTax" readonly="readonly"/>
                                    </td>
                                <td>Delivery Charges</td>
                                 <td>
                                     <input type="number" class="form-control dcmlNo" id="txtDeliveryCharges" name="txtDeliveryCharges" placeholder="please enter delivery charges"/>
                                 </td>
                            </tr>
                            <tr>
    
                                <td style="display:none;"></td>
                                    <td style="display:none;">
                                        <input type="number" class="form-control" id="txtTotalCessTax" name="txtTotalCessTax" readonly="readonly"/>
                                    </td>
                               <td style="display:none;"></td>
                                 <td style="display:none;">
                                     <input type="number" class="form-control" id="txtTotalIntegratedTax" name="txtTotalIntegratedTax" readonly="readonly" />
                                 </td>
                            </tr>
                            <tr>
                                <td>Total Amount</td>
                                <td>
                                    <input type="number" class="form-control" id="txtTotalAmount" name="txtTotalAmount" readonly="readonly" />
                                </td>
                                <td>Active</td>
                                <td>
                                    <select id="ddlActive" name="ddlActive" class="form-control"></select>
                                </td>
                            </tr>
                            <tr>
                               <td colspan="4">
                                    <table class="tbl">
                                        <tr>
                                            <td colspan="4">
                                                <fieldset>
                                                    <legend>Sales BOM Master Details </legend>
                                                    <table id="tblDetail" class="display no-footer dataTable" style="width: 100%;">
                                                        <thead>
                                                            <tr>
                                                            <th style="display: none;">Master Id</th>
                                                            <th>Material Name</th>
                                                            <th>Qty</th>
                                                            <th>Unit Measure</th>
                                                            <th>Rate Incl Tax</th>
                                                            <th>Discount Percent</th>
                                                            <th style="display:none;"></th>
                                                            <th style="display:none;"></th>
                                                            <th style="display:none;"></th>
                                                            <th style="display:none;"></th>
                                                            <th>Total</th>
                                                                <th>Fix Item</th>
                                                            <th style="display:none;"></th>
                                                            
                                                            <th></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody id="tbody_Detail">
                                                            <tr id="tr_Detail">
                                                                <td style="display: none;"></td>
                                                                <td>
                                                                    <select id="ddlMaterialName" name="ddlMaterialName" class="form-control cls" onchange="FetchTaxDetailsByMaterialId(this.value);">
                                                                        <option value="">-Select Material Name-</option>
                                                                    </select>
                                                                    
                                                                </td>
                                                                <td>
                                                                    <input type="number" class="form-control dcmlNo cls" id="txtBOMQty" name="txtBOMQty" placeholder="please enter Qty"/>
                                                                </td>
                                                                <td>
                                                                    <select id="ddlUnitMesure" name="ddlUnitMesure" class="form-control cls" readonly="readonly">                                                                       
                                                                    </select>
    
                                                                </td>
                                                                <td>
                                                                    <input type="number" class="form-control dcmlNo cls" id="txtRateInclTax" name="txtRateInclTax" placeholder="please enter Rate Incl Tax"/>
                                                                </td>
                                                                <td>
                                                                    <input type="number" class="form-control dcmlNo cls" id="txtDiscountPercent" name="txtDiscountPercent" placeholder="please enter Discount"/>
                                                                </td>
                                                                <td  style="display: none;">
                                                                    <input type="number" id="txtCentralTaxPercent" name="txtCentralTaxPercent" />
                                                                 </td>
                                                                <td  style="display: none;">
                                                                    <input type="number" id="txtStateTaxPercent" name="txtStateTaxPercent" />
                                                                     
                                                                </td>
                                                                <td  style="display: none;">
                                                                    <input type="number" id="txtCessPercent" name="txtCessPercent"/>
                                                                     
                                                                </td>
                                                                <td  style="display: none;">
                                                                    <input type="number" id="txtIntegratedTaxPercent" name="txtIntegratedTaxPercent"/>
                                                                    
                                                                </td>
                                                                <td>
                                                                    <input type="number" id="txtSubTotal" name="txtSubTotal" class="form-control dcmlNo cls" readonly="readonly"/>
                                                                </td>
                                                                 <td>
                                                                     <input type="checkbox" id="chkFixItem" name="chkFixItem" value=""/>
                                                                 </td>
                                                                <td  style="display: none;">
                                                                    <input type="number" id="txtMRP" name="txtMRP"/>
                                                                </td>
                                                               
                                                                <td>
                                                                    <button type="button" class="btn btn-primary" onclick="AddSDBOMDetails();">Add</button>
                                                                </td>
                                                                
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </fieldset>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                           <%-- <tr id="tr_Formula" style="display:none;">
                                <td>Formula *</td>
                                <td colspan="3"><input type="text" class="form-control" id="txtFormula" name="txtFormula" onchange="ShowHideMaterialRows();" />
                                    <select id="ddlFormula" name="ddlFormula" class="form-control" onchange="FetchBOMDetailsList(2,'');" style="width: 300px;display:none;">
                                        <option value="">-Select Formula-</option>
                                    </select>
                                    <a id="a_formulaAdd" style="display:none;
                                        text-decoration: underline;
                                        color: blue;
                                        cursor: pointer;
                                    " onclick="UpdateFormula(0);">Add</a>&nbsp;&nbsp;<a id="a_formulaEdit" style="display:none;
                                        text-decoration: underline;
                                        color: blue;
                                        cursor: pointer;
                                    " href="#" onclick="UpdateFormula(1);">Edit</a>
                                </td>
                            </tr>--%>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
       

</asp:Content>

