<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/CrmMainMenu.Master" CodeBehind="wfCrmSunPipeline.aspx.cs" Inherits="BizzManWebErp.wfCrmSunPipeline" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventwarehouseMaster.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmSunPipeline.js?002"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <button onclick="ViewAssignActivity();">View</button>
    
    <input type="hidden" id="loginuser" runat="server" />
    <input type="hidden" id="hdnLeadId" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">CRM Pipeline</button><br />
    <%--dynamic breadcrumbs--%>
   
    <div class="container" id="divPipelineList" style="margin-top: 10px; overflow: auto;">
        <table id="tblPipelinelist" class="display">
            <thead>
                <tr>
                
                    <th style="white-space: nowrap;">LeadID</th>
                    <th style="white-space: nowrap;">LeadName</th>
                    <th style="white-space:normal;">Contact Details(Mobile)</th>
                    <th style="white-space: nowrap;">Property Interest</th>
                    <th style="white-space: nowrap;">Lead Source</th>
                    <th style="white-space: nowrap;">Assigned SalesPerson</th>
                    <th style="white-space: nowrap;">Assignment Date</th>
                    <th style="white-space: nowrap;">Priority</th>
                    <th style="white-space: nowrap;">FollowUp Date</th>
                    <th style="white-space: nowrap;">FollowUp Type</th>
                    <th style="white-space: nowrap;">FollowUp Status</th>

                    <th style="white-space: nowrap;">Remarks/Notes</th>
                </tr>
            </thead>
            <tbody id="tbody_PipeLine_list">
            </tbody>
        </table>
    </div>
    
    </asp:Content>