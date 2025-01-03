<%@ Page Title="Employees KPI Sub Group" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMnfManufactureWorkCentersMaster.aspx.cs" Inherits="BizzManWebErp.wfMnfManufactureWorkCentersMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    
    <script src="Scripts/MnfManufactureWorkCentersMaster.js"></script>

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
                    <th>Branch Code</th>
                    <th>Branch Name</th>
                    <th>Work Centers Name</th>
                    <th>Address</th>
                    <th>Contact No</th>
                    <th>Work Centers Email</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List">
            </tbody>
        </table>
    </div>
     

     <div class="container" id="divDataEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Manufacture Work Centers </b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">   
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Branch Name *</label>
                                </td>
                                <td>
                                    <select style="width: 100%;" id="ddlBranchName" name="ddlBranchName" class="form-control rounded border-dark">
                                        <option value="">-Select Branch-</option>
                                    </select>
                                </td>
                                <td style="width: 10%;">ID</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtId" name="txtId" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 15%;">Work CentersName *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtSubGroupName" name="txtWorkCenterspName" />
                                </td>  
                                 <td style="width: 15%;">Address *</td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtAddress" name="txtAddress" />
                                </td>                                  
                            </tr>         
                             <tr>
                                <td style="width: 15%;">Contact No. </td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtContackNo" name="txtContackNo" />
                                </td>  
                                 <td style="width: 15%;">Email </td>
                                <td>
                                   <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" />
                                </td>                                  
                            </tr>                      
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
