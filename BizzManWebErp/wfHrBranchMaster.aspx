<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrBranchMaster.aspx.cs" EnableViewState="false"  Inherits="BizzManWebErp.wfHrBranchMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    


    <asp:Label ID="lblBranchMaster" runat="server" class = "badge rounded-pill bg-light text-dark" style="margin-left:13px;font-size:15px;" Text="Branch Master"></asp:Label>
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
        <ContentTemplate>
            <div style="margin-left: 10px;margin-top: 5px;">
            <asp:LinkButton ID="btnCreate" runat="server"  Text="Create" class="btn ml-18 " style="background-color: #7952B3; color: white" OnClick="Button_Create" />
            <asp:LinkButton ID="btnView" runat="server" Text="View" class="btn ml-15 " style="background-color: #7952B3; color: white" OnClick="Button_View" />
            <asp:LinkButton ID="btnSave" runat="server" Text="Save" class="btn ml-15 " style="background-color: #7952B3; color: white"  OnClick="Button_Save" ValidationGroup="group1" Visible="False" />
            <asp:LinkButton ID="btnEdit" runat="server" Text="Edit" class="btn ml-15 " style="background-color: #7952B3; color: white" />
            </div>
         
        <asp:MultiView ID="MultiView1" runat="server" ActiveViewIndex="0">
            
           
            <asp:View ID="View1" runat="server">
               
                
                <style>
                    .pagination-ys {
                        /*display: inline-block;*/
                        padding-left: 0;
                        margin: 20px 0;
                        border-radius: 4px;
                        background-color: #CFE2FF;
                    }

                    .pagination-ys table > tbody > tr > td {
                        display: inline;
                    }

                    .pagination-ys table > tbody > tr > td > a,
                    .pagination-ys table > tbody > tr > td > span {
                        position: relative;
                        float: left;
                        padding: 8px 12px;
                        line-height: 1.42857143;
                        text-decoration: none;
                        color: black;
                        background-color: #ffffff;
                        border: 1px solid #dddddd;
                        margin-left: -1px;
                    }

                    .pagination-ys table > tbody > tr > td > span {
                        position: relative;
                        float: left;
                        padding: 8px 12px;
                        line-height: 1.42857143;
                        text-decoration: none;    
                        margin-left: -1px;
                        z-index: 2;
                        color: black;
                        background-color: #CFE2FF;
                        border-color: #dddddd;
                        cursor: default;
                    }

                    .pagination-ys table > tbody > tr > td:first-child > a,
                    .pagination-ys table > tbody > tr > td:first-child > span {
                        margin-left: 0;
                        border-bottom-left-radius: 4px;
                        border-top-left-radius: 4px;
                    }

                    .pagination-ys table > tbody > tr > td:last-child > a,
                    .pagination-ys table > tbody > tr > td:last-child > span {
                        border-bottom-right-radius: 4px;
                        border-top-right-radius: 4px;
                    }

                    .pagination-ys table > tbody > tr > td > a:hover,
                    .pagination-ys table > tbody > tr > td > span:hover,
                    .pagination-ys table > tbody > tr > td > a:focus,
                    .pagination-ys table > tbody > tr > td > span:focus {
                        color: #97310e;
                        background-color: #CFE2FF;
                        border-color: #dddddd;
                    }
                   
                </style>
                    <nav class="navbar navbar-light bg-light">
                      <div class="container-fluid">
                        <a class="navbar-brand"></a>
                        <div class="d-flex" style="margin-right: 105px;">
                          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                          <button class="btn btn-outline-success" type="submit">Search</button>
                        </div>
                      </div>
                    </nav>
                <br />
                
                    <div class="container">

                            <asp:GridView ID="GridView1" class="table table-bordered table-condensed table-responsive table-hover " runat="server" AutoGenerateColumns="False" AllowPaging="True" OnPageIndexChanging="grdData_PageIndexChanging">
                                <Columns>
                                    <asp:boundfield DataField="BranchCode" HeaderText="Branch Code"></asp:boundfield>
                                    <asp:boundfield DataField="BranchName" HeaderText="Branch Name"></asp:boundfield>
                                </Columns>
                                <HeaderStyle CssClass="table-primary"/>
                               <PagerStyle CssClass="pagination-ys" />
                            </asp:GridView>
                        </div>
            </asp:View>
            
            
            <asp:View ID="View2" runat="server">
                 <br />
                <br />
                <div class="container">
                    <div class="card">
                      <div class="card-header">
                        Create
                      </div>
                      <div class="card-body">
                          
                          <asp:Label ID="lblBranchName" runat="server" Text="Branch Name: " class="form-label"></asp:Label>
							<div class=" mb-3">
                                
								<asp:TextBox ID="txtBranchName" placeholder="Branch Name" class="form-control rounded border-dark" runat="server" Font-Size="Medium" Width="271px" EnableViewState="False" ViewStateMode="Disabled"></asp:TextBox>
                              
							    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtBranchName" Display="Dynamic" ErrorMessage="*Branch Name Mandatory" ForeColor="Red" SetFocusOnError="True" ValidationGroup="group1"></asp:RequiredFieldValidator>
                               
							   
                               
							</div>

                            <asp:Label ID="lblBranchCode" runat="server" Text="Branch Code: " class="form-label"></asp:Label>
							<div class=" mb-3">
                                
								<asp:TextBox ID="txtBranchCode" placeholder="Branch Code" class="form-control rounded border-dark" runat="server" Font-Size="Medium" Width="271px" EnableViewState="False" ViewStateMode="Disabled"> </asp:TextBox> 
								
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtBranchCode" Display="Dynamic" ErrorMessage="*Branch Code Mandatory" ForeColor="Red" SetFocusOnError="True" ValidationGroup="group1"></asp:RequiredFieldValidator>

							</div>

                           
                      </div>
                    </div>
                </div>
            </asp:View>
        </asp:MultiView>
            

    </ContentTemplate>
    </asp:UpdatePanel>



       


</asp:Content>

