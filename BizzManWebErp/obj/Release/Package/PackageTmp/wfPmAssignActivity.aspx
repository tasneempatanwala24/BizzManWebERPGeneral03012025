<%@ Page Title="" Language="C#" MasterPageFile="~/PM.Master" AutoEventWireup="true" CodeBehind="wfPmAssignActivity.aspx.cs" Inherits="BizzManWebErp.wfPmAssignActivity" %>
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
    <script src="Scripts/PmScheduleActivity.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <div class="POS-Content">
        <div class="window">
            <div class="screen">
                <div class="screen-content">
                    <div class="top-content">
                        <input type="hidden" id="loginuser" runat="server" />
                       <asp:LinkButton runat="server" class="buttonCreatCustomer" id="btnOpenCalendar" Text="Öpen Calendar" OnClick="btnOpenCalendar_Click"/>
                        <button onclick="CreateCustomer();" class="buttonCreatCustomer" id="btncreate">Schedule Activity</button>
                        <button class="buttonCreatCustomer" id="btnView" onclick="ViewCustomerList();">View Activity</button>
                       
                        <button onclick="ClearAll();" class="buttonCreatCustomer">Cancel Activity</button>
                        <button onclick="AddActivity();" id="btnsave" style="display: none;" class="buttonCreatCustomer">Save</button>
                        <input class="form-control py-2 rounded-pill mr-1 pr-5 SearchCustomer" type="search" value="Search Customer" id="example-search-input" hidden="hidden">
                    </div>
                    <div class="subwindow-container-fix scrollable-y" id="DivCustomerList">
                        <table class="display" id="tblCustomerList" >
                            <thead>
                                <tr>
                                    <th style="width: 10%;">FollowUp Type</th>
                                    <th style="width: 20%;">Summary</th>
                                    <th style="width: 30%;">Due Date</th>
                                    <th style="width: 25%;">Client Name</th>
                                    <th style="width: 25%;">Assigned Person</th>
                                </tr>
                            </thead>
                            <tbody class="client-list-contents" id="tbodycustomerList"></tbody>
                        </table>
                    </div>
                    <div class="client-details edit" id="createDiv">
                 <div class="card-header">
                <b>Assign Activity Form</b>

            </div>
                        <br>
                        <div class="client-details-box clearfix">
                            <div class="client-details-left">
                                <div class="client-detail">
                                    <span class="label">FollowUpType</span>
                                    <select name="lang" class="rightside" id="ddlFollowUp">
                                        <option value="">-Select Follow Up Type-</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Call">Call</option>
                                        <option value="Email">Email</option>
                                        <option value="Virtual">Virtual</option>
                                    </select>
                                </div>
                                <div class="client-detail">
                                    <span class="label">Summary</span>
                                    <input name="summary" value="" placeholder="Summary" class="leftside" id="txtSummary">
                                </div>
                                <div class="client-detail">
                                    <span class="label">Note</span>
                                   <textarea id="txtNote" name="txtNote" rows="4" cols="50" class="leftside">

                                    </textarea>
                                </div>
                         </div>
                            <div class="client-details-right">
                                <div class="client-detail">
                                    <span class="label">Client</span>
                                     
                                    <select name="ddlAssignClient" class="rightside" id="ddlAssignClient">
                                        <option value="">-Select Client-</option>
                                    </select>
                                    <div class="client-detail">

                                    <span class="label">Due Date</span>
                                    <input name="txtDueDate" type="datetime-local" value="" class="rightside" id="txtDueDate">
                                </div>
                                    <span class="label">Assign Person</span>
                                     
                                    <select name="ddlAssign" class="rightside" id="ddlAssign">
                                        <option value="">-Select Person-</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
       
</asp:Content>
