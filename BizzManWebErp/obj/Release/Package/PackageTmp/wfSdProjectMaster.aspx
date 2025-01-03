<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdProjectMaster.aspx.cs" MasterPageFile="~/SdMainMenu.Master" Inherits="BizzManWebErp.wfSdProjectMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!DOCTYPE html>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <%--<link href="css/SdProjectMaster.css" rel="stylesheet" />--%>
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script src="Scripts/SdProjectMaster.js"></script>

    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/alertify.min.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/default.min.css" />

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

   <%-- <button type="button" onclick="HideShowView();" id="btnTitle" class="LabelTitle">Project Master </button>
    <br />--%>
    <button type="button" id="btnCreate" onclick="SaveProject(this);">Create</button>
    <button type="button" onclick="ViewProjectList();" id="btnView">View</button>
    <%--<button type="button" onclick="DownloadExcel();">Export To Excel</button>--%>
    <button id="btnExport">Export To Excel</button>
    <button id="previewBtn" style="display:none" onclick="PrintPreview();" class="preventDefault">View PDF </button>
    <input type="file" class="form-control" id="txtProjDoc" style="display: none" onchange="readURL(this)" required accept="image/png, image/jpeg" />
    <button type="button" class="preventDefault btnUploadDoc" style="display: none">Upload Document</button>
    <button type="button" id="btnShowDoc" style="display: none" onclick="ViewDocument();" class="preventDefault btnShowDoc">View Document</button>
    <div class="container" id="divProjectList" style="margin-top: 10px; overflow: auto;">
        <div id="dvListView">
            <div class="card">
                <%-- <div class="card-header">
                    <b style="vertical-align: sub">Project List</b>
                    <button type="button" onclick="DownloadExcel();" style="float: right" class="fa fa-file-excel-o"><span style="padding-left: 10px;">Export</span></button>
                </div>--%>
                <div class="card-body">
                    <div class="panel panel-default">
                        <div class="panel-body" style="overflow: auto">
                            <table id="tblProjectList" class="display">
                                <thead>
                                    <tr>
                                        <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                                        <th scope="col" style="display: none" class="projectListCol">Project Id</th>
                                        <th scope="col" class="projectListCol">Project Name</th>
                                        <th scope="col" class="projectListCol">Branch</th>
                                        <th scope="col" class="projectListCol">Category</th>
                                        <th scope="col" class="projectListCol">Location</th>
                                        <th scope="col" class="projectListCol">Expct. Start Date</th>
                                        <th scope="col" class="projectListCol">Actual Start Date</th>
                                        <th scope="col" class="projectListCol">Expct. Finish Date</th>
                                        <th scope="col" class="projectListCol">Actl. Finish Date</th>
                                        <th scope="col" class="projectListCol">Expct. Cost</th>
                                        <th scope="col" class="projectListCol">Actl. Cost</th>
                                        <th scope="col" class="projectListCol">Created By</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="exTab2" class="container" style="display: none; margin-top: 10px;">
        <div class="tab-content row">
            <div class="tab-pane active" id="1">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div id="dvListViews">
                                <div class="card">
                                    <div class="card-header">
                                        Project Master
                                    </div>
                                    <%--<div class="card-header">
                                        <b>Project Details</b>
                                        <button type="button" id="previewBtn" onclick="PrintPreview();" style="float: right" class="preventDefault fa fa-eye"><span style="padding-left: 10px;">Preview PDF</span></button>
                                    </div>--%>
                                    <div class="card-body">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="tblProjectDetails" id="tblProjectDetails" style="width:100%;">
                                                    <tr>
                                                        <td colspan="8">
                                                            <table style="width:100%;">
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <input type="text" class="form-control rounded border-dark" id="txtProjectName" data-id="0" required placeholder="Project Name" value="" maxlength="50" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="12">
                                                                        <div style="height: 15px;"></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="width: 30%" >Project Category</td>
                                                                    <td style="width: 70%">
                                                                        <select class="form-control rounded border-dark" id="ddlProjectCategory" required aria-label="ddlProjectCategory">
                                                                            
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="12">
                                                                        <div style="height: 15px;"></div>
                                                                    </td>
                                                                </tr>
                                                                <tr><td style="width: 30%" >Branch</td>
                                                                  <td style="width: 70%" >
                                                                   <select class="form-control rounded border-dark" id="ddlBranch" required aria-label="ddlBranch"></select>
                                                                  </td>
                                                                    </tr>
                                                                <tr>
                                                                    <td colspan="12">
                                                                        <div style="height: 15px;"></div>
                                                                    </td>
                                                                </tr>
                                                                  <tr>
                                                                        <td style="width: 30%" >Project Location</td>
                                                                        <td style="width: 70%" >
                                                                            <select class="form-control rounded border-dark" id="ddlLocation" required aria-label="ddlLocation"></select>
                                                                        </td>
                                                                    </tr>
                                                            </table>
                                                            
                                                             </td>
                                                        <td colspan="4">
                                                            <div style="float: right; padding-right: 200px;">
                                                                <%--<input type="file" class="form-control" id="txtProjLogo" style="display: none" onchange="readURL(this)" required accept="image/png, image/jpeg" />
                                                                <img id="imgLogo" src="" alt="Uploaded logo displays here" />
                                                                <br />
                                                                <button type="button" id="btnUploadLogo" class="preventDefault fa fa-image btnUploadLogo"><span class="spnLbl">Upload logo</span></button>--%>

                                                                <div class="image-upload">
                                                                    <label for="fuImg">
                                                                        <img id="imgLogo" src="Images/fileupload.png" style="float: right!important; cursor: pointer;width:100px;height:100px;"/>
                                                                    </label>
                                                                    <input type="file" class="form-control" id="txtProjLogo" style="display: none" onchange="readURL(this)" required accept="image/png, image/jpeg" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3">Expected Start Date</td>
                                                        <td colspan="3">
                                                            <input type="date" id="txtExpStartDate" class="form-control rounded border-dark" />
                                                        </td>
                                                        <td colspan="3">Actual Start Date</td>
                                                        <td colspan="3">
                                                            <input type="date" id="txtActStartDate" class="form-control rounded border-dark" />
                                                        </td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                         <td colspan="3">Expected Finish Date</td>
                                                         <td colspan="3">
                                                             <input type="date" id="txtExpFinishDate" class="form-control rounded border-dark" />
                                                         </td>
                                                        <td colspan="3">Actual Finish Date</td>
                                                        <td colspan="3">
                                                            <input type="date" id="txtActFinishDate" class="form-control rounded border-dark" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>                                                        
                                                        <td colspan="3">Expected Cost</td>
                                                        <td colspan="3">
                                                            <input type="number" id="txtExpCost" placeholder="Expected Cost" class="form-control rounded border-dark" value="0" />
                                                        </td>
                                                        <td colspan="3">Actual Cost</td>
                                                        <td colspan="3">
                                                            <input type="number" id="txtActCost" placeholder="Actual Cost" class="form-control rounded border-dark" value="0"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3">Address 1</td>
                                                        <td colspan="9">
                                                            <input type="text" maxlength="100" placeholder="Address 1" id="txtAddress1" class="form-control rounded border-dark" />
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3">Address 2</td>
                                                        <td colspan="9">
                                                            <input type="text" maxlength="100" id="txtAddress2" placeholder="Address 2" class="form-control rounded border-dark" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3">Description</td>
                                                        <td colspan="9">
                                                            <input type="text" maxlength="100" id="txtDescription" placeholder="Description" class="form-control rounded border-dark" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="12">
                                                            <div style="height: 15px;"></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3">Active</td>
                                                        <td colspan="9">
                                                            <input type="checkbox" id="chkIsActive" checked="checked" name="chkIsActive" value="true"></td>

                                                    </tr>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
