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
    <script src="Scripts/MnfManufactureWorkCentersDetail.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
     <input type="hidden" id="hdnIsEdit" />
    <button onclick="CreateWorkCenterDetails();" id="btnCreate">Create</button>
    <button onclick="ViewMaterialBOMList();" id="btnView">View</button>
    <button onclick="DownloadFile();" id="btnExport">Export To Excel</button>
    <button onclick="AddWorkCenterDetails();" style="display: none;" id="btnSave">Save</button>
     
    <div class="container" id="divWorkCenterDetailsList" style="margin-top: 10px; overflow: auto;">
    <table id="tblWorkCenterDetailsList" class="display">
        <thead>
            <tr>
                <th>
                    <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                <th style="white-space: nowrap;display:none;">Id</th>
                <th style="white-space: nowrap;">Machine Type</th>
                <th style="white-space: nowrap;">Capacity</th>
                <th style="white-space: nowrap;">Product Name</th>
                <th style="white-space: nowrap;">Cost Rate/hour</th>
                <th style="white-space: nowrap;">Setup Time (in min)</th>
                 <th style="white-space: nowrap;">Location</th>
                
            </tr>
        </thead>
        <tbody id="tbody_WorkCenterDetailsList">
        </tbody>
    </table>
</div>
    <div class="container" id="divWorkCenterDetails" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Work Center Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                 <td>Work Center Id</td>
 <td >
     <input type="text" class="form-control" id="txtId" placeholder="Work Center Id" name="txtId" readonly="readonly" />
 </td>
                                <td>Machine Type *</td>
<td>
    <select id="ddlMachineType" name="ddlMachineType" class="form-control" 
         style="width: 250px;">
         <option value="">-Select Machine Type-</option>
        <option value="Cooking">Cooking</option>
         <option value="Cutting">Cutting</option>
        <option value="Packing">Packing</option>
    </select>

</td>
                            </tr>
                            <tr>

                                
                                <td>Capacity *</td>
                                <td>
                                    <input class="form-control" id="txtCapacity" name="txtCapacity" />
                                </td>
                                <td>Product Name *</td>
  <td>
    <select id="ddlProductName" name="ddlProductName" class="form-control" style="width: 300px;">
        <option value="">-Select Product Name-</option>
    </select>
</td>

                            </tr>
                            <tr>
                                
                                    <td>Cost Rate/Hour *</td>
                                 <td>
                                    <input type="number" class="form-control"  value="0" oninput="handleNumericInput(event)" id="txtCost" name="txtCost" />
                                </td>
                                <td>Setup Time (Minutes) *</td>
     <td>
   <input id="txtSetupTime" name="txtSetupTime" type="number" oninput="handleNumericInput(event)"  class="form-control" min=0 max=60 onkeyup=imposeMinMax(this)>
     </td>
                            </tr>
                             <tr>
                             
                                      <td>Location *</td>
                                 <td>
                                     <select id="ddlLocation" name="ddlLocation" class="form-control" style="width: 300px;">
                                         <option value="">-Select LocationName-</option>
                                     </select>
                                 </td>
                                 <td>

                                 </td>
                                  <td>

 </td>
                            </tr>
                                <tr>
                               <td class="td_label">Remark</td>
                             <td style="width: 100%">
                                 <textarea id="txtRemark" class="form-control rounded border-dark" name="txtRemark" rows="4" cols="80">
                                       </textarea>
                             </td>
                                    </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

