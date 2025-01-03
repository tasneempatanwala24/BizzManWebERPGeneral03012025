<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpJobCategoryMaster.aspx.cs" Inherits="BizzManWebErp.wfHrEmpJobCategoryMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/HrEmpJobCategoryMaster.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmpCategory();">Create</button>
    <button onclick="ViewEmpCategoryList();">View</button>
    <button onclick="AddEmpCategoryMaster();" id="btnsave" style="display: none;">Save</button>
    <div class="container" id="DivEmpCategoryList">
        <table id="tblEmpCategoryList" class="display table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Category Name</th>
                </tr>
            </thead>
            <tbody id="tbodyEmpCategoryList"></tbody>
        </table>
    </div>
    <div class="container" id="DivEmpCategoryEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Add Emp job Category
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td style="width: 11%;">Id</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" class="form-control rounded border-dark" id="txtId" name="txtId" maxlength="200" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 11%;">Category Name *</td>
                                <td colspan="3">
                                    <input type="text" style="width: 31%;" placeholder="Enter Category Name." class="form-control rounded border-dark" id="txtcategoryname" name="txtcategoryname" maxlength="200" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
