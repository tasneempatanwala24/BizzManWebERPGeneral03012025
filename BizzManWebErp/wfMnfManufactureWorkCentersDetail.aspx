<%@ Page Title="" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" AutoEventWireup="true" 
    CodeBehind="wfMnfManufactureWorkCentersDetail.aspx.cs" 
    Inherits="BizzManWebErp.wfMnfManufactureWorkCentersDetail" %>

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
    <script src="Scripts/MnfMaterialManufactureOperationsDetail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hdnPreviousFormula"  />
    <input type="hidden" id="hdnMaterialId" runat="server" />
    <input type="hidden" id="hdnBOMId" runat="server" />
    <input type="hidden" id="hdnIsEdit" />
    <button onclick="CreateMaterialBOM();" id="btnCreate">Create</button>
    <button onclick="ViewMaterialBOMList();" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddMaterialBOM();" style="display: none;" id="btnSave">Save</button>
     
<%--    <div class="container" id="divMaterialBOMList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMaterialBOMList" class="display">
            <thead>
                <tr>
                    <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th style="white-space: nowrap;display:none;">Id</th>
                    <th style="white-space: nowrap;">Material Name</th>
                    <th style="white-space: nowrap;">Qty</th>
                    <th style="white-space: nowrap;">Unit Measure</th>
                    <th style="white-space: nowrap;">Total Operation Cost</th>
                </tr>
            </thead>
            <tbody id="tbody_MaterialBOM_List">
            </tbody>
        </table>
    </div>--%>



    <div class="container" id="divMaterialBOMEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Work Center Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>

                                <td>Machine Type *</td>
                                <td>
                                    <select id="ddlMachineType" name="ddlMachineType" class="form-control" 
                                         style="width: 250px;">
                                         <option value="1">-Select Machine Type-</option>
                                        <option value="2">-MachineType1-</option>
                                         <option value="3">-MachineType2-</option>
                                        <option value="4">-MachineType3-</option>
                                    </select>

                                </td>
                                <td>Capacity *</td>
                                <td colspan="2">
                                    <input type="number" class="form-control" id="txtCapacity" name="txtCapacity" />
                                </td>

                            </tr>
                            <tr>
                                <td>Product Name *</td>
                                  <td>
                                    <select id="ddlMaterial" name="ddlMaterial" class="form-control" style="width: 300px;">
                                        <option value="">-Select Product Name-</option>
                                    </select>
                                </td>
                                    <td>Cost Per Hour *</td>
                                 <td colspan="2">
                                    <input type="number" class="form-control"  value="0" oninput="handleNumericInput(event)" id="txtCost" name="txtCost" />
                                </td>
                            </tr>
                             <tr>
                             <td>Setup Time *</td>
                                  <td>
                                <input id="txtSetupTime" name="txtSetupTime" type="text" oninput="handleNumericInput(event)"  class="form-control" min="0" max="60">
                                  </td>
                                      <td>Location *</td>
                                 <td colspan="2">
                                     <select id="ddlLocation" name="ddlLocation" class="form-control" style="width: 300px;">
                                         <option value="">-Select LocationName-</option>
                                     </select>
                                 </td>
                            </tr>
                                <tr>
                               <td class="td_label">Remark</td>
                             <td style="width: 100%">
                                 <textarea id="txtRemark" class="form-control rounded border-dark" name="txtRemark" rows="4" cols="80" disabled>
                                       </textarea>
                             </td>
                                    </tr>
                        <%--    <tr id="tr_Formula" style="display:none;">
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

