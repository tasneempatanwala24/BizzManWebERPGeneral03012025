<%@ Page MasterPageFile="~/InventMainMenu.Master" Language="C#" AutoEventWireup="true" CodeBehind="wfInventTransportMaster.aspx.cs" Inherits="BizzManWebErp.wfInventTransportMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/InventTransportMaster.js"></script>
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

        #ContentPlaceHolder1_rblTransport {
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
    <input type="hidden" id="hfBase64" runat="server" />
    <input type="hidden" id="hfId" value="0" runat="server" />
    <button onclick="CreateCRMTransporthMasterList();">Create</button>
    <button onclick="ViewCRMTransportMasterList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnDisplayData">Display File</button>
    <div class="container" id="divCRMTransportMasterList" style="margin-top: 10px; overflow: auto;">
        <div id="dvShow" style="margin-bottom: 5px; float: right">
            <img src="Images/list-view.png" title="List View" style="width: 10%; float: right; margin: 2px; cursor: pointer" onclick="showListView()" />
            <img src="Images/kanban-view.png" title="Kanban View" style="width: 10%; float: right; margin: 2px; cursor: pointer" />
        </div>
        <div id="dvListView">
            <table id="tblCrmTransportMasterList" class="display">
                <thead>
                    <tr>
                        <th>Transport Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>GST</th>
                    </tr>
                </thead>
                <tbody id="tbody_TransportMaster_List">
                </tbody>
            </table>
        </div>
        <div id="dvKanbanView" style="margin-top: 10px; display: none;">
            <table style="margin-top: 30px; width: 100%" id="tblKanbanView">
                <tbody id="tbody_kanbanViewList">
                    <tr>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>

                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table style="border: solid thin black; margin-right: 5px;">
                                <tbody>
                                    <tr>
                                        <td style="width: 42%; vertical-align: baseline; padding-top: 10px;">.....</td>
                                        <td style="padding: 0px;">
                                            <img class="kanban-img" src="Images/list-view.png" style="width: 100%;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="container" id="divCrmTransportMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Transport Master</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 50%" colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:30%;">Transport Name <span style="float: right; color: red;">*</span></td>
                                            <td><input type="text" class="form-control rounded border-dark" id="txtTransportName" name="txtTransportName" maxlength="250" placeholder="Transport Name" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width:30%;">Address <span style="float: right; color: red;">*</span></td>
                                            <td><input type="text" class="form-control rounded border-dark" id="txtAddress1" name="txtAddress1" maxlength="250" placeholder="Transport Address" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width:30%;">State <span style="float: right; color: red;">*</span></td>
                                            <td><select id="ddlState" name="ddlState" class="form-control">
                                                <option value="">-Select State-</option>
                                            </select></td>
                                        </tr>
                                    </table>
                                   
                                </td>
                                <td style="width: 50%" colspan="2">
                                    <div style="float: right; padding-right: 200px;">
                                     <div class="image-upload">
                                         <label for="fuImg">
                                             <img id="imgFU" src="Images/fileupload.png" style="float: right!important; cursor: pointer;" width="100px" height="100px" />
                                         </label>

                                         <input id="fuImg" type="file" onchange="readURL(this)" />
                                     </div>
                                 </div>
                                </td>
                            </tr>
                           
                            <tr>
                                <td style="width:15%;">Email Address</td>
                                 <td>
                                     <input type="text" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="250" />
                                 </td>
                                <td style="width:15%;">Phone No<span style="float: right; color: red;">*</span></td>
                                <td>
                                <input type="text" class="form-control rounded border-dark" id="txtPhone" name="txtPhone" maxlength="250" />
                                </td>
                                
                            </tr>
                            <tr>
                                
                                <td style="width:15%;">GST No</td>
                                    <td>
                                        <input type="text" class="form-control rounded border-dark" id="txtGST" name="txtGST" maxlength="250" />
                                    </td>
                                <td style="width:15%;">Description</td>
                                    <td>
                                        <input type="text" class="form-control rounded border-dark" id="txtDescription" name="txtDescription"/>
                                    </td>
                            </tr>
                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
