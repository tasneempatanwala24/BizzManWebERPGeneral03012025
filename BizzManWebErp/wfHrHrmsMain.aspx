<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrHrmsMain.aspx.cs" Inherits="BizzManWebErp.WebForm2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/HrHrmsMain.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <div class="container">
        <div class="row  mb-3 pt-3">
            <div class="col-sm-12">
                <h4 class="text-center">HRMS DASHBOARD</h4> 
                 <div style="float:right;padding: 5px;background-color:aquamarine;">
                 <span id="strmonth"><b></b></span> &nbsp;&nbsp;|&nbsp;&nbsp;
                 <span id="stryear"><b></b></span>
                 </div>
            </div>
           
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-responsive table-bordered">
                    <thead>
                        <tr style="background-color: #FAE8E9; border-color: #FAE8E9;">
                            <th class="text-center">PRESENT</th>
                            <th class="text-center">ABSENT</th>
                            <th class="text-center">LEAVE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="tableContainer1">
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-responsive table-bordered">
                    <thead>
                        <tr style="background-color: #FAE8E9; border-color: #FAE8E9;">
                            <th class="text-center">MONTH WISE PRESENT AND ABSENT</th>
                            <th class="text-center">O.T DETAILS MONTH WISE</th>
                            <th class="text-center">LOAN REQUEST</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="tableContainer">
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
