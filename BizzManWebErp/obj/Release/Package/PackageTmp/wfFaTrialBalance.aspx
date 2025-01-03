<%@ Page Title="Employees KPI Sub Group" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfFaTrialBalance.aspx.cs" Inherits="BizzManWebErp.wfFaTrialBalance" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    
    <script src="Scripts/FaTrialBalance.js"></script>

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
                    <th>Leder Name</th>
                    <th>Total Dr Amount</th>
                    <th>Total Cr Amount</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List">
            </tbody>
        </table>
    </div>

   <div class="container" id="divDataList2" style="margin-top: 10px; overflow: auto;">
            <div id="dataTable_wrapper2"></div>  
        <table id="tblEmpJobList2" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Leder Name</th>
                    <th>Total Dr Amount</th>
                    <th>Total Cr Amount</th>
                </tr>
            </thead>
            <tbody id="tbody_EmpJob_List2">
            </tbody>
        </table>
    </div>


</asp:Content>
