<%@ Page MasterPageFile="~/CrmMainMenu.Master" Language="C#" AutoEventWireup="true" CodeBehind="wfCrmCustomerMaster.aspx.cs" Inherits="BizzManWebErp.wfCrmCustomerMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmCustomerMaster.js"></script>
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
    <%--<ul class="breadcrumb">
        <li><a href="wfErpMain.aspx">Home</a></li>
        <li><a href="wfCrmMain.aspx">CRM</a></li>
        <li>Customers</li>
    </ul>--%>

    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Customers</button><br />
    <%--dynamic breadcrumbs--%>

    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hfBase64" runat="server" />
    <input type="hidden" id="hfCustomerId" value="0" runat="server" />
    <button onclick="CreateCRMCustomerhMasterList();">Create</button>
    <button onclick="ViewCRMCustomerMasterList();">View</button>
    <button onclick="AddDetails();" style="display: none;" id="btnSave">Save</button>

    <div class="container" id="divCRMCustomerMasterList" style="margin-top: 10px; overflow: auto;">
        <div id="dvShow" style="margin-bottom: 5px; float: right">
            <img src="Images/list-view.png" title="List View" style="width: 10%; float: right; margin: 2px; cursor: pointer" onclick="showListView()" />
            <img src="Images/kanban-view.png" title="Kanban View" style="width: 10%; float: right; margin: 2px; cursor: pointer" />
        </div>
        <div id="dvListView">
            <table id="tblCrmCustomerMasterList" class="display">
                <thead>
                    <tr>
                        <th style="width: 5%;">Name</th>
                        <th style="width: 10%;">Phone</th>
                        <th style="width: 30%;">Email</th>
                        <th style="width: 15%;">City</th>
                        <th style="width: 20%;">Job Position</th>
                        <th style="width: 15%;">Branch</th>
                    </tr>
                </thead>
                <tbody id="tbody_CustomerMaster_List">
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

    <div class="container" id="divCrmCustomerMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                <b>Add Customer Master</b>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <asp:RadioButtonList ID="rblCustomer" runat="server" DataTextField="CustomerType" DataValueField="Id" RepeatColumns="5">
                        </asp:RadioButtonList>
                        <div style="float: left; width: 60%">
                            <span style="float: right; color: red;">*</span><input type="text" class="form-control rounded border-dark" id="txtCstName" name="txtCstName" maxlength="250" placeholder="Customer Name" style="width: 98%" />
                            <%--<input type="text" style="margin-top: 5px; width: 98%" class="form-control rounded border-dark" id="txtCompanyName" name="txtCompanyName" maxlength="250" placeholder="Company Name" />--%>
                            <select style="margin-top: 5px; width: 98%" class="form-control rounded border-dark" id="ddlBranch">
                                <option value="0">Select Branch</option>
                            </select>
                        </div>
                        <div style="float: right; padding-right: 200px;">
                            <div class="image-upload">
                                <label for="fuImg">
                                    <img id="imgFU" src="Images/fileupload.png" style="float: right!important; cursor: pointer;" width="100px" height="100px" />
                                </label>

                                <input id="fuImg" type="file" onchange="readURL(this)" />
                            </div>
                        </div>

                        <table class="tbl">
                            <tr>
                                <td style="width: 12%">Address</td>
                                <td style="width: 35%">
                                    <input type="text" class="form-control rounded border-dark" id="txtStreet1" name="txtStreet1" maxlength="250" placeholder="Street" />
                                </td>
                                <td style="width: 12%;"><span id="spnJobPosition">Job Position</span></td>
                                <td style="width: 35%">
                                    <input type="text" class="form-control rounded border-dark" id="txtJobPosition" name="txtJobPosition" maxlength="250" placeholder="eg. Sales Director" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" class="form-control rounded border-dark" id="txtStreet2" name="txtStreet2" maxlength="250" placeholder="Street2" />
                                </td>
                                <td>Phone</td>
                                <td>
                                    <input type="text" class="form-control rounded border-dark" id="txtPhone" name="txtPhone" maxlength="250" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <select id="ddlCountry" class="form-control rounded border-dark" onchange="fillStateByCountry(this.value)">
                                        <option value="0">Choose Country</option>
                                    </select></td>
                                <td>EMail</td>
                                <td>
                                    <input type="text" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="250" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>

                                    <select id="ddlState" style="width: 30%; float: left;" class="form-control rounded border-dark" onchange="fillCityAutoComplete(this.value)">
                                        <option value="0">Choose State</option>
                                    </select>
                                    <%--<select id="ddlCity" style="width: 30%; float: left; margin-left: 10px;" class="form-control rounded border-dark">
                                        <option value="0">Choose City</option>
                                    </select>--%>
                                    <input id="txtCity" list="citys" style="width: 30%; float: left; margin-left: 10px;" class="keepDatalist form-control rounded border-dark" placeholder="City..." />
                                    <datalist id="citys">
                                        
                                    </datalist>
                                    <input type="text" style="width: 30%; float: left; margin-left: 10px;" class="form-control rounded border-dark " id="txtZip" name="txtZip" maxlength="150" placeholder="ZIP" />
                                </td>
                                <td>Website Link</td>
                                <td>
                                    <input type="text" class="form-control rounded border-dark" id="txtWebsite" name="txtWebsite" maxlength="250" placeholder="eg. https://www.exmaple.com" /></td>

                            </tr>
                            <tr>
                                <td>GST Treatment</td>
                                <td>
                                    <%--<input type="text" class="form-control rounded border-dark" id="txtGST" name="tstGst" maxlength="250" />--%>
                                    <select id="txtGST" class="form-control rounded border-dark">
                                        <option value="0" selected="selected">--Choose--</option>
                                        <option value="Registered Business - Regular">Registered Business - Regular</option>
                                        <option value="Registered Business - Compostion">Registered Business - Compostion</option>
                                        <option value="Unregistered Business">Unregistered Business</option>
                                        <option value="Consumer">Consumer</option>
                                        <option value="Overseas">Overseas</option>
                                        <option value="Special Economic Zone">Special Economic Zone</option>
                                        <option value="Deemed Export">Deemed Export</option>
                                    </select>
                                </td>
                                <td><span id="spnTitle">Title</span></td>
                                <td>
                                    <input type="text" list="dlTitle" class="keepDatalist form-control rounded border-dark" id="txtTitle" autocomplete="off" name="txtTitle" maxlength="250" placeholder="e.g. Master"/></td>
                                 <datalist id="dlTitle">

                                 </datalist>
                            </tr>
                            <tr>
                                <td>VAT</td>
                                <td>
                                    <input type="text" class="form-control rounded border-dark" id="txtVAT" name="txtVAT" maxlength="250" placeholder="eg. BE0477472701" />
                                </td>
                                <td>Tags</td>
                                <td>
                                    <input type="text" list="dlTags" class="keepDatalist form-control rounded border-dark" id="txtTag" autocomplete="off" name="txtTag" maxlength="250" /></td>
                                <datalist id="dlTags">

                                </datalist>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>PAN Number</td>
                                <td>
                                    <input type="text" class="form-control rounded border-dark" id="txtPAN" name="txtPAN" maxlength="250" /></td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
