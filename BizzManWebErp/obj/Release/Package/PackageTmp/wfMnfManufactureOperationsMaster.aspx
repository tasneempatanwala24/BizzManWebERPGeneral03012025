<%@ Page Title="Employees KPI Sub Group" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMnfManufactureOperationsMaster.aspx.cs" Inherits="BizzManWebErp.wfMnfManufactureOperationsMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    
    <script src="Scripts/MnfManufactureOperationsMaster.js"></script>

    <style>
        .dcmlNo{
            font-size:18px;
        }
 
    </style>

    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>  
</asp:Content>

 

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateData();">Create</button>
    <button onclick="ViewDataList();">View</button>
    <button onclick="AddData();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divDataList" style="margin-top: 10px; overflow: auto;">
            <div id="dataTable_wrapper"></div>  
        <table id="tblEmpJobList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Operation Category</th>
                    <th>Operation Name </th>
                    <th>Unit Mesure </th>
                    <th>Operation QTY </th>
                    <th>Operation Time Require </th>
                    <th>Time Unit </th>
                    <th>Operation Cost </th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List">
            </tbody>
        </table>
    </div>


     <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Operation Master </b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Operation Category *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlOperationCategory" name="ddlOperationCategory" class="form-control rounded border-dark">
                                        <option value="">-Select Category -</option>
                                    </select>
                                </td>
                                <td style="width: 10%;">ID</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Operation Name *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtOperationName" name="txtOperationName" />
                                </td>  
                                <td style="width: 15%;">Operation Cost *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtOperationCost" name="txtOperationCost" />
                                </td>                         
                            </tr>   
                            
                              <tr>
                                <td style="width: 15%;">Operation QTY *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtQTY" name="txtQTY" />
                                </td>  
                                     <td style="width: 15%;">Unit Mesure *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtUnitMesure" name="txtUnitMesure" />
                                </td>                           
                            </tr>   

                             <tr>
                                <td style="width: 15%;">Operation Time Require *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtTimeRequire" name="txtTimeRequire" />
                                </td>       
                                <td style="width: 15%;">Time Require Unit *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtTimeRequireUnit" name="txtTimeRequireUnit" />
                                </td>                               
                            </tr>   


                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
