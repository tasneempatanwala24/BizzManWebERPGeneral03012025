<%@ Page Title="Employees KPI Master" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpKpiMaster.aspx.cs" Inherits="BizzManWebErp.wfHrEmpKpiMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    
    <script src="Scripts/HrEmpKpiMaster.js"></script>

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
    <button onclick="CreateEmpJob();">Create</button>
    <button onclick="ViewEmpJobList();">View</button>
    <button onclick="AddEmpJob();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divEmpJobList" style="margin-top: 10px; overflow: auto;">
            <div id="dataTable_wrapper"></div>  
        <table id="tblEmpJobList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>KPI Group Name</th>
                    <th>KPI Sub Group Name</th>
                    <th>Goal/Objective</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List">
            </tbody>
        </table>
    </div>


     <div class="container" id="divEmpJobEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Employees KPI Master</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">KPI Group</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlKpiGroup" name="ddlKpiGroup" class="form-control rounded border-dark">
                                        <option value="">-Select KPI Group-</option>
                                    </select>
                                </td>
                                <td style="width: 10%;">ID</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">KPI Sub Group Name</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlKpiSubGroupName" name="ddlKpiSubGroupName" class="form-control rounded border-dark">
                                        <option value="">-Select KPI Sub Group-</option>
                                    </select>
                                </td>
                                <td style="width: 15%;">KPI Goal Objective *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtKpiGoalObjective" name="txtKpiGoalObjective" />
                                </td>
                                
                            </tr>                          
                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
