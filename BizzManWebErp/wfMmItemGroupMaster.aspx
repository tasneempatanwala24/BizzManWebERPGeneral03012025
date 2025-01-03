<%@ Page MasterPageFile="~/MmMainMenu.Master" Language="C#" AutoEventWireup="true" CodeBehind="wfMmItemGroupMaster.aspx.cs" Inherits="BizzManWebErp.wfMmItemGroupMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MmItemGroupMaster.js"></script>
    <style>
        .ui-autocomplete {
            z-index: 99999999;
        }

        .LabelTitle {
            background-color: transparent;
            color: black;
            font-size: larger;
            color: #7952b3;
            padding-bottom: 20px;
        }

        #ContentPlaceHolder1_rblCustomer {
            width: 82%;
            font-size: small;
            font-weight: 600;
        }

        ul.breadcrumb {
            padding: 10px 16px;
            list-style: none;
        }

            ul.breadcrumb li {
                display: inline;
                font-size: 18px;
            }

                ul.breadcrumb li + li:before {
                    padding: 8px;
                    color: black;
                    content: "/\00a0";
                }

                ul.breadcrumb li a {
                    color: #0275d8;
                    text-decoration: none;
                }

                    ul.breadcrumb li a:hover {
                        color: #01447e;
                        text-decoration: underline;
                    }

        .image-upload > input {
            display: none;
        }

        .kanban-item {
            width: 25%;
            float: left;
            margin-left: 5px;
            margin-top: 10px;
            border: 1px thin black;
        }

        .kanban-img {
            width: 15%;
            float: right;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hfId" value="0" runat="server" />
    <button onclick="CreateItemGroupList();">Create</button>
    <button onclick="ViewItemGroupList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divItemGroupList" style="margin-top: 10px; overflow: auto;">
      
        <div id="dvListView">
            <table id="tblItemGroupList" class="display">
                <thead>
                    <tr>
                        <th>Item Group Name</th>
                    </tr>
                </thead>
                <tbody id="tbody_ItemGroup_List">
                </tbody>
            </table>
        </div>
        
    </div>

    <div class="container" id="divItemGroupEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Item Group Master</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width:15%;">Item Group Name <span style="color: red;">*</span></td><td>
                                    <input type="text" class="form-control rounded border-dark" id="txtGroupName" name="txtGroupName" maxlength="250" placeholder="Group Name" style="width: 98%" /> 
                                    </td>
                                    <td style="width:10%;">Description</td><td>
                                    <input type="text" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" maxlength="250" placeholder="Description" />
                                </td>
                                
                            </tr>
                                                       
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

