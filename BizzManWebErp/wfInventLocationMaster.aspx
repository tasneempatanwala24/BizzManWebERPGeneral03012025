<%@ Page Title="" Language="C#" MasterPageFile="~/InventMainMenu.Master" AutoEventWireup="true" CodeBehind="wfInventLocationMaster.aspx.cs" Inherits="BizzManWebErp.wfInventLocationMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/InventLocationMaster.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Locations</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreateInventLocation();"  id="btnCreate">Create</button>    
    <button onclick="ViewInventLocation();">View</button>
    <button onclick="AddInventLocation();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>

    <div class="container" id="divInventLocationList" style="margin-top: 10px; overflow: auto;">
        <table id="tblInventLocationList" class="display">
            <thead>
                <tr>
                    <th style="white-space: nowrap;"><input type="checkbox" id="selectAll" name="selectAll"></th>
                    <th style="white-space: nowrap;">Location</th>
                    <th style="white-space: nowrap;">Location Type</th>
                    <th style="white-space: nowrap;">Branch Name</th>
                </tr>
            </thead>
            <tbody id="tbody_InventLocation_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divInventLocationEntry" style="display: none; margin-top: 10px;">
        
        <div class="card" style="display:flow-root">
           
             <div class="my-2 " style="text-align:right; margin-top:1%">
                 
                 <button>Putaway Rules</button>
                  <button>Current Stock</button>
      <%--<a class="mr-sm-2" style="text-decoration:unset" >Putaway Rules</a>
      <a class=" mr-sm-2" style="text-decoration:unset" >Current Stock</a>--%>
    </div>


            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <strong>Location Name *</strong>
                        <input type="text"  class="form-control rounded border-dark" id="txtLocationName" name="txtLocationName" maxlength="200" />

                        <strong>Parent Name</strong>
                        <select style="width: 30%" class="form-control rounded border-dark" id="ddlParentLocation" name="ddlParentLocation">
                            
                        </select><br />
                        <h4>Additional Information</h4>
                        <table class="tbl">
                            <tr>
                                <td style="width: 17%;">Location Type *</td>
                                <td>
                                    <select style="width: 30%" class="form-control rounded border-dark" id="ddLocationType" name="ddLocationType">
                                        <option value="">- Select Location Type -</option>
                                        <option value="Internal Location">Internal Location</option>
                                        <option value="Vendor Location">Vendor Location</option>
                                        <option value="View">View</option>
                                        <option value="Customer Location">Customer Location</option>
                                        <option value="Inventory Loss">Inventory Loss</option>
                                        <option value="Production">Production</option>
                                        <option value="Transit Location">Transit Location</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 17%;">Branch Name </td>
                                <td>
                                    <select style="width: 30%" class="form-control rounded border-dark" id="ddCompany" name="ddCompany">
                                       
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 17%;">Is a Scrap Location?</td>
                                <td>
                                    <input type="checkbox" id="scrapLocation" name="scrapLocation" value="scrap">
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 17%;">Is a Return Location?</td>
                                <td>
                                    <input type="checkbox" id="returnLocation" name="returnLocation" value="return">
                                </td>
                            </tr>
                        </table>
                        <div class="form-group">
                            <textarea class="form-control" id="externalNote" placeholder="External note..." rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
</asp:Content>

