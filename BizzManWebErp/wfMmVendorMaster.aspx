<%@ Page Title="" Language="C#" MasterPageFile="~/MmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMmVendorMaster.aspx.cs" Inherits="BizzManWebErp.wfMmVendorMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <link href="css/bootstrap-timepicker.css" rel="stylesheet">
    <script type="text/javascript" src="Scripts/bootstrap-timepicker.js"></script>    
    <link href="~/Content/dataTables.bootstrap4.min.css" rel="stylesheet" />     
    <script src="~/scripts/jquery.dataTables.min.js"></script>  
    <script src="~/scripts/dataTables.bootstrap4.min.js"></script>  
    <script src="Scripts/MmVendorMaster.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateVendor();">Create</button>
    <button onclick="ViewVendorList();">View</button>
    <button onclick="AddVendor();" style="display: none;" id="btnSave">Save</button>



        <div class="container" id="divVendorList" style="margin-top: 10px; overflow: auto;">
           <div id="dataTable_wrapper"></div>  
           <table id="tblVendorList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th><input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Id</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>GST No</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody id="tbody_Vendor_List">
            </tbody>
        </table>
    </div>


      <div class="container" id="divVendorEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Vendor
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>
                                    <label class="control-label">Category *</label>
                                </td>
                                <td>
                                    <select style="width: 31%;" id="ddlCategory" name="ddlCategory" class="form-control rounded border-dark">
                                        <option value="">-Select Category-</option>
                                        <option value="All">All</option>
                                        <option value="Material">Material</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Name *</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Name" class="form-control rounded border-dark" id="txtName" name="txtName" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Address *</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Address" class="form-control rounded border-dark" id="txtAddress" name="txtAddress" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">GST No</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter GST Number" class="form-control rounded border-dark" id="txtGst" name="txtGst" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Email Address</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Email Address" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Phone No</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Phone Number" class="form-control rounded border-dark" id="txtPhone" name="txtPhone" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Description</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Description" class="form-control rounded border-dark" id="txtDescription" name="txtDescription" maxlength="200" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>



</asp:Content>
