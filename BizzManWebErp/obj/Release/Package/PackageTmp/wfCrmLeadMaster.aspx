<%@ Page Title="" Language="C#" MasterPageFile="~/CrmMainMenu.Master" AutoEventWireup="true" CodeBehind="wfCrmLeadMaster.aspx.cs" Inherits="BizzManWebErp.wfCrmLeadMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/CrmLeadStyle.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <script src="Scripts/CrmLeadMaster.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/CrmTableHTMLExport.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button id="btntitle" class="LabelTitle" onclick="Title();">Leads</button><br />
    <button onclick="EditLead();" style="display: none;" id="btnEdit">Edit</button>
    <button onclick="CreateNewLead();" id="btnCreate">Create</button>
    <button id="btnView" onclick="#">View</button>
    <button onclick="SaveLeadDetails();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>
    <button id="btnExport"   onclick="ExportToExcel();">Export To Excel</button>
    <button id="btnImport"  onclick="ImportLead()">Import To Excel</button>
    <button id="btnConverToOppMulti"  onclick="ConvertToOpportunityMulti()">Convert Checked to Opportunity</button>



    <div class="col-lg-12 card" id="ListViewContainer" style="padding: 10px 21px 10px;">

        <div class="table-responsive table-card ">
            <table class="table align-middle table-nowrap" id="tblCrmLeadList">
                <thead class="table-light">
                    <tr>
                        <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                        <th>Lead</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Sales Person</th>
                        <th>Sales Team</th>
                    </tr>
                </thead>
                <tbody class="list form-check-all" id="tbody_LeadListView">
                </tbody>
            </table>
        </div>
        <div style="display: none">
            <table class="table align-middle table-nowrap" id="tblCrmLeadExport" style="display: none">
                <thead class="table-light">
                    <tr>
                        <th>Lead</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Sales Person</th>
                        <th>Sales Team</th>                        
                    </tr>
                </thead>
                <tbody class="list form-check-all" id="tbody_LeadListExport">
                </tbody>
            </table>
        </div>
    </div>

    <div class="col-lg-12 card" id="LeadDetaisView" style="display: none; width: 90%; margin: auto">
        <div class="card" style="display: flow-root">
            <div class="my-2 " style="margin-top: 1%">
                <button id="btnCVOpportunity" onclick="btnConvertTOOppClick();">Convert to Opportunity</button>
                <button id="btnEnrich">Enrich</button>
                <button id="btnLost">Make as Lost</button>
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">

                        <h1>
                            <label id="lblLeadName"></label>
                        </h1>
                        <br />
                        <h2>
                            <strong>
                                <label id="lblProbability"></label>
                            </strong>
                        </h2>
                    </div>
                    <div class="div_group">
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Company Name</td>
                                    <td style="width: 100%">
                                        <label id="lblCompanyName"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Address</td>
                                    <td style="width: 100%">
                                        <label id="lblAddress"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">
                                        <label id="lblCountry"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">
                                        <%-- <label class="form-control rounded border-dark" style="width: 33%; float: left;"  id="lblCity"></label>
                                        <label class="form-control rounded border-dark" style="width: 33%; float: left;"  id="lblState"></label>
                                        <label class="form-control rounded border-dark" style="width: 33%; float: left;"  id="lblCountry"></label>--%>                                     
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Website</td>
                                    <td style="width: 100%">
                                        <label id="lblWebsite"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Language</td>
                                    <td style="width: 100%">
                                        <label id="lblLanguage"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label">Sales Person</td>
                                    <td style="width: 100%">
                                        <label id="lblSalesPerson"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Sales Team</td>
                                    <td style="width: 100%">
                                        <label id="lblSalesTeam"></label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Contact Name</td>
                                    <td style="width: 100%">
                                        <label id="lblContactName"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Email</td>
                                    <td style="width: 100%">
                                        <label id="lblEmail"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Job Position</td>
                                    <td style="width: 100%">y
                                        <label id="lblJobPosition"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Phone</td>
                                    <td style="width: 100%">
                                        <label id="lblPhone"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Mobile</td>
                                    <td style="width: 100%">
                                        <label id="lblMobile"></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">
                                        <br />
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Priority</td>
                                    <td style="width: 100%">
                                       <div class="priority">                                            
                                             <span class="fa fa-star" style="font-size:30px" id="priority1" ></span>
                                             <span class="fa fa-star" style="font-size:30px" id="priority2" ></span>
                                             <span class="fa fa-star" style="font-size:30px" id="priority3" ></span>
                                        </div>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Tags</td>
                                    <td style="width: 100%; ">
                                        <label id="lblTag" style="border-radius: 5px;color: white;background-color: red;"></label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="panel-body">
                        <strong>Internal Notes</strong>
                        <label id="lblNotes"></label>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="container" id="divLeadEntry" style="display: none; margin-top: 10px;">

        <div class="card" style="display: flow-root">
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <strong>Lead Name *</strong>
                        <span id="invalidLeadName" class="invalid-feedback"></span>
                        <h1>
                            <input type="text" class="rounded border-dark" placeholder="e.g. Product Pricing" style="width: 100%" id="txtLeadName" name="txtLeadName" maxlength="200" />
                        </h1>
                        <br />
                        <strong>Probability *</strong>
                        <input type="number" class="rounded border-dark" placeholder="0.67" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" style="width: 100%" id="txtProbability" name="txtProbability" maxlength="5" />

                    </div>
                    <div class="div_group">
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Company Name</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtCompanyName" name="txtCompanyName" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Address</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtStreet1" placeholder="Street 1" name="txtStreet1" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtStreet2" placeholder="Street 2" name="txtStreet2" maxlength="200" />
                                    </td>
                                </tr>
                                 <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddCountry" onchange="BindStateDropDownList();" name="ddCountry">
                                        </select>
                                        <span id="invalidCountry" class="invalid-feedback">Please select a valid Country.</span>
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddState" onchange="BindCityDropDownList();" name="ddState">
                                        </select>
                                        <span id="invalidState" class="invalid-feedback">Please select a valid State.</span>
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddCity" name="ddCity">
                                        </select>
                                        <span id="invalidCity" class="invalid-feedback">Please select a valid City.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">                                                                                
                                        <input type="text" class="form-control rounded border-dark"  id="txtZip" name="txtZip" />
                                        <span id="invalidZip" class="invalid-feedback">Please select a valid ZIP.</span>
                                    </td>
                                </tr>
                               
                                <tr>
                                    <td class="td_label">Website</td>
                                    <td style="width: 100%">
                                        <input type="url" class="form-control rounded border-dark" id="txtWebsite" placeholder="e.g. htttp://www.odoo.com" name="txtWebsite" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Language</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddLanguage" name="ddLanguage">
                                            <option value="">Choose</option>
                                            <option value="Language 1">Language 1</option>
                                            <option value="Language 2">Language 2</option>
                                            <option value="Language 3">Language 3</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label">Sales Person</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddSalesPerson" name="ddSalesPerson">
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Sales Team</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddSalesTeam" name="ddSalesTeam">
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="tbl half_table">
                            <tbody>
                                <tr>
                                    <td class="td_label">Contact Name</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" style="width: 50%; float: left;" id="ddtitle" name="ddtitle">
                                            <option>Mr.</option>
                                            <option>Mrs.</option>
                                            <option>Dr.</option>
                                        </select>
                                        <input type="text" style="width: 50%;" class="form-control rounded border-dark" id="txtContactName" name="txtContactName" maxlength="200" />
                                     </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Email</td>
                                    <td style="width: 100%">
                                        <span id="invalidEmail" class="invalid-feedback"></span>
                                        <input type="text" class="form-control rounded border-dark" id="txtEmail" name="txtEmail" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Job Position</td>
                                    <td style="width: 100%">
                                        <input type="text" class="form-control rounded border-dark" id="txtJobPosition" name="txtJobPosition" maxlength="100" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Phone</td>
                                    <td style="width: 100%">
                                        <span id="invalidPhone" class="invalid-feedback"></span>
                                        <input type="text" class="form-control rounded border-dark" id="txtPhone" name="txtPhone" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Mobile</td>
                                    <td style="width: 100%">
                                        <span id="invalidMobile" class="invalid-feedback"></span>
                                        <input type="text" class="form-control rounded border-dark" id="txtMobile" name="txtMobile" maxlength="200" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%"></td>
                                </tr>
                                <tr>
                                    <td class="td_label"></td>
                                    <td style="width: 100%">
                                        <br />
                                    </td>

                                </tr>
                                <tr>
                                    <td class="td_label">Priority</td>
                                    <td style="width: 100%">
                                       <div class="priority">                                            
                                             <span class="fa fa-star" style="font-size:30px" id="star1" onclick="changePriority(1);"></span>
                                             <span class="fa fa-star" style="font-size:30px" id="star2" onclick="changePriority(2);"></span>
                                             <span class="fa fa-star" style="font-size:30px" id="star3" onclick="changePriority(3);"></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="td_label">Tags</td>
                                    <td style="width: 100%">
                                        <select class="form-control rounded border-dark" style="width: 33%; float: left;" id="ddTags" name="ddTags">
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="panel-body">
                        <strong>Internal Notes</strong>
                        <input type="text" class="rounded border-dark" placeholder="Add a discription..." style="width: 100%" id="txtNotes" name="txtNotes" maxlength="200" />


                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="col-lg-12 card" id="importContainer" style="padding: 10px 21px 10px; display: none; margin-top: 10px;">

                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title mb-0">
                                <!-- Col Form Label Small -->
                                <div class="row">
                                    <div class="col-sm-4">
                                        <asp:FileUpload ID="FileUpLoad1" CssClass="form-control form-control-md" runat="server" ClientIDMode="Static" />
                                    </div>
                                    <div class="col-sm-4">
                                        <asp:Button ID="UploadBtn" CssClass="btn btn-success add-btn" Text="Upload" OnClick="UploadBtn_Click" runat="server" Width="105px" />
                                         <asp:Button ID="btnImportCancel" CssClass="btn btn-default" Text="Cancel" OnClick="btnImportCancel_Click" runat="server" Width="105px" />
                                    </div>
                                </div>
                            </h4>
                        </div>
                        <!-- end card header -->

                        <div class="card-body">
                            <asp:Label runat="server" ID="lblImportError" class="alert-danger fs-14" ClientIDMode="Static"></asp:Label>
                            <div class="dropzone dz-clickable" style="text-align: center">
                                <div class="dz-message needsclick">
                                    <div class="mb-3">
                                       <i class="fa fa-file-excel-o display-4 text-muted" aria-hidden="true"></i>
                                    </div>
                                    <h4>Upload an Excel or CSV file to import</h4>
                                    <p class="text-muted  fs-5" style="padding-bottom: 0px; margin: 0;">Excel files are recommended as formatting is automatic.</p>
                                    <a href="CrmLeadImportTemplte.xlsx" download class="btn btn-success"><i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Download Template</a>
                                </div>
                            </div>

                            <ul class="list-unstyled mb-0" id="dropzone-preview">
                            </ul>
                            <!-- end dropzon-preview -->
                        </div>
                        <!-- end card body -->
                    </div>
                    <!-- end card -->
                </div>




    <input type="hidden" id="hdViewType" />
    <input type="hidden" id="hdLeadId" />
    <input type="hidden" id="hdDeleteLeadId" />
    <asp:HiddenField ID="hdUserId" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdPageViewType" runat="server" ClientIDMode="Static" />

</asp:Content>


