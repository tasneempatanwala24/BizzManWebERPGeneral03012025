<%@ Page Title="Employees Job Master" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpKpiReport.aspx.cs" Inherits="BizzManWebErp.wfHrEmpJobMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    
    <script src="Scripts/HrEmpKpiReport.js"></script>

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
                    <th>Job Category</th>
                    <th>Job Name</th>
                    <th>Unit Mesure</th>
                    <th>Job Rate</th>
                    <th>CTC Item Name</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List">
            </tbody>
        </table>
    </div>


     <div class="container" id="divEmpJobEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Employees KPI Report</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Job Category</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlJobCategory" name="ddlJobCategory" class="form-control rounded border-dark">
                                        <option value="">-Select Job Category-</option>
                                    </select>
                                </td>
                                <td style="width: 10%;">ID</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">CTC Item Name</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlCtcItemName" name="ddlCtcItemName" class="form-control rounded border-dark">
                                        <option value="">-Select CTC Item Name-</option>
                                    </select>
                                </td>
                                <td style="width: 15%;">Job Name *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtJobName" name="txtJobName" />
                                </td>
                                
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Unit Mesure *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlUnitMesure" name="ddlUnitMesure" class="form-control rounded border-dark">
                                        <option value="">-Select Unit Mesure-</option>
                                    </select>
                                </td>

                                <td style="width: 15%;">Job Rate</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark dcmlNo" id="txtJobRate" name="txtJobRate" />
                                </td>
                            </tr>
                          
                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
