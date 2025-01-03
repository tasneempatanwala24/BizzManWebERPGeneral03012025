<%@ Page Title="" Language="C#" MasterPageFile="~/PM.Master" AutoEventWireup="true" CodeBehind="wfPmBlockCalendar.aspx.cs" Inherits="BizzManWebErp.wfPmBlockCalendar" %>

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
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="POS-Content">
        <div class="window">
            <div class="screen">
                <div class="screen-content">
                    <div class="top-content">
                       
                        </div>
                    <div  id="DivCustomerList" style="width:60%;margin: 0 auto;">
                        <asp:Calendar style= "line-height:40px;width:100%;height:60%;" class="fa-calendar-check" ID="calendarActivityScheduled" runat="server" OnDayRender="calendarActivityScheduled_DayRender" OnSelectionChanged="calendarActivityScheduled_SelectionChanged"></asp:Calendar>
                                            
                    </div>
                    <div class="client-details edit" id="createDiv">
                        <asp:GridView style="width:100%;" ID="grdActivitiesScheduled" runat="server"></asp:GridView>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
