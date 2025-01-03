<%@ Page Language="C#" MasterPageFile="~/ExternalPage.Master" AutoEventWireup="true" CodeBehind="wfPmSurveyForm.aspx.cs" Inherits="BizzManWebErp.wfPmSurveyForm" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript"
        src="https://code.jquery.com/jquery-3.5.1.js">
    </script>
    <!-- DataTables CSS -->
    <link rel="stylesheet"
        href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js">
    </script>
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/POS.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/PmSurvey.js?0006"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="POS-Content">
        <div class="window">
            <div class="screen">
                <div class="screen-content">
                    <div>&nbsp;</div>
                    <div class="top-content">
                        <input type="hidden" id="assignedEmployee" runat="server" />
                        <input type="hidden" id="loginuser" runat="server" />
                        <button onclick="GoBack();" class="buttonCreatSurvey" id="btnBack">Back</button>
                        <button onclick="ViewSurveyList();" class="buttonCreatSurvey" id="btnView">View</button>
                        <button onclick="ClearAll();" class="buttonCreatSurvey">Discard</button>
                        <button onclick="AddPMSurveyDetails();" id="btnSave" style="display: none;" class="buttonCreatSurvey">Save</button>
                        <input class="form-control py-2 rounded-pill mr-1 pr-5 SearchSurvey" type="search" value="Search Survey" id="example-search-input" hidden="hidden">
                    </div>
                    <div class="subwindow-container-fix scrollable-y" id="DivSurveyList">
                        <table class="client-list" id="tblPmSurveyList">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Designation</th>
                                    <th>Date</th>
                                    <th>Branch</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Site Name</th>
                                    <th>Site Incharge</th>
                                    <th>Site Address</th>
                                </tr>
                            </thead>
                            <tbody class="client-list-contents" id="tbody_PmSurvey_List"></tbody>
                        </table>
                    </div>
                    <div class="container" id="divPmSurveyEntry" style="display: none; margin-top: 10px;">
                        <div class="card">
                            <div class="card-header">
                                <b>Survey Form</b>
                            </div>
                            <div class="card-body">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <table class="tbl">
                                                                                       <tr>
                                          
<%--<td>
                                            <input id="upldFile" type="file" runat="server" NAME="upldFile">
         <button id="btnUpload" text="Upload" OnClick="UploadFiles();"></button>
         <asp:Panel ID="frmConfirmation" Visible="False" Runat="server">
            <asp:Label id="lblUploadResult" Runat="server"></asp:Label>
         </asp:Panel></td>--%>
                                                </tr>
                                            <tr>
                                                <td style="width: 35%;">Name Of Employee</td>


                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtUserId" name="txtUserId" maxlength="20" disabled />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 35%;">Employee Id</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtFullName" name="txtFullName" maxlength="100" disabled />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td style="width: 15%;">Designation</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtDesignation" name="txtDesignation" maxlength="20" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 15%;">Date</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="date" style="width: 100%;" class="form-control rounded border-dark" id="txtDate" name="txtDate" maxlength="20" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 15%;">Branch</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="text" style="width: 100%;" class="form-control rounded border-dark" id="txtBranch" name="txtBranch" maxlength="200" />
                                                </td>
                                            </tr>

                                            <%--<tr>
                                                <td>Survey Form Upload in Excel Only *</td>
                                                <td>
                                                   <input type="file" id="fileUpload" accept=".xls, .xlsx" runat="server"/>
                                                             <button id="uploadBtn" runat="server" onclick="UploadFiles();">Upload</button>
                                                </td>
                                            </tr>--%>
                                            
                                            <tr>
                                                                                            <td>Survey Form Upload in Excel Only *</td>
                                                </tr>
                                            <tr><td>
                                          <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" id="excelFile" name="file" accept=".xlsx, .xls" />
    <%--<button type="button" onclick="UploadFiles()">Upload</button>--%>
</form></td>
                                                <td>&nbsp;</td>
                                                <td>
                                                    <%-- <button ID="Button_Upload" runat="server" class="LabelTitle" onclick="UploadFiles();">Upload</button>
   --%>
                                                  <%-- <asp:LinkButton ID="Button_Upload" runat="server" Style="background-color:ButtonFace;color:black;border-radius:3px;border-color:black;padding-left:5px;border-image-outset:revert;" Text="Upload Excel" OnClick="UploadFiles()" />
                                           --%>    </td>
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
</asp:Content>