<%@ Page Title="" Language="C#" MasterPageFile="~/ManufactMainMenu.Master" AutoEventWireup="true" CodeBehind="wfMnfJlrJobCardMaster.aspx.cs" Inherits="BizzManWebErp.wfMnfJlrJobCardMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="Scripts/jquery-ui.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>--%>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/MnfJlrJobCardMaster.js"></script>
    <style>
        #divpanelbody {
            overflow-x: auto; /* Enables horizontal scrolling */
            max-width: 100%; /* Prevents overflowing */
        }
        #tblDetails {
        display: block; /* Make the table block-level for scrolling */
        overflow-x: auto; /* Enables horizontal scrolling */
        width: 100%; /* Make table responsive */
        table-layout: auto; 
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateMaster();">Create</button>
    <button onclick="ViewMasterList();">View</button>
    <button onclick="AddJobCardMaster();" style="display: none;" id="btnSave">Save</button>
    <button style="display: none;" id="btnViewFile" class="button" onclick="ViewFile(1)">View PDF</button>
    <button style="display: none;" id="btnXLXFile" class="button" onclick="ViewFile(2)">View Excel</button>
    <div class="container" id="divMasterList" style="margin-top: 10px; overflow: auto;">
        <table id="tblMasterList" class="display">
            <thead>
                <tr>
                    <th>Order Date</th>
                    <th>Order No</th>
                    <th>Order ref No</th>
                    <th>Customer Name</th>
                    <th>Order Received Date</th>
                    <th>Cad Issue Date</th>
                    <th>Cad Approve Date</th>
                    <th>Diamond Received Date</th>
                    <th>Delivery Date</th>
                    <th>Diamond Quality</th>
                    <th>Party Diamond</th>
                    <th>Party Diamond Reference No</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody id="tbody_Master_List">
            </tbody>
        </table>
    </div>

    <div class="container" id="divMasterEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Job Card Master
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl">
                            <tr>
                                <td>Job Id </td>
                                <td>
                                    <input type="text" class="form-control" id="txtId" name="txtId" readonly="readonly"/>
                                </td>
                                <td>Customer *</td>
                                    <td>
                                        <select id="ddlCustomer" name="ddlCustomer" class="form-control" style="width:100%;">
                                            <option value="">-Select Customer-</option>
                                        </select>
                                    </td>
                                                              
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Order Date *</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtOrderDate" name="txtOrderDate" />
                                </td>  
                                <td>
                                    <label class="control-label">Order No</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtOrderNo" name="txtOrderNo" readonly="readonly"/>
                                </td>
                               
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Reference Order No *</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtRefOrderNo" name="txtRefOrderNo"/>
                                </td>
                                <td>
                                    <label class="control-label">Order Received Date </label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtOrderRecvDate" name="txtOrderRecvDate" />
                                </td>  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Cad Issue Date</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtCadIssueDate" name="txtCadIssueDate"/>
                                </td>
                                <td>
                                    <label class="control-label">Cad Approve Date </label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtCadApproveDate" name="txtCadApproveDate" />
                                </td>  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Diamond Received Date</label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtDiamondReceivedDate" name="txtDiamondReceivedDate"/>
                                </td>
                                <td>
                                    <label class="control-label">Delivery Date </label>
                                </td>
                                <td>
                                    <input type="date" class="form-control" id="txtDeliveryDate" name="txtDeliveryDate" />
                                </td>  
                            </tr>
                            <tr>                                
                                <%--<td>
                                    <label class="control-label">Diamond Quality</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondQuality" name="txtDiamondQuality"/>
                                </td>--%>
                                <td>
                                    <label class="control-label">Party Diamond </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPartyDiamond" name="txtPartyDiamond" />
                                </td>  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Party Diamond Reference No</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtPartyDiamondReferenceNo" name="txtPartyDiamondReferenceNo"/>
                                </td>
                                <td>
                                    <label class="control-label">Type </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtType" name="txtType" />
                                </td>  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Diamond Weight 1</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondWeight1" name="txtDiamondWeight1" placeholder="please enter diamond weight 1"/>
                                </td>
                                <td>
                                    <label class="control-label">Diamond Pics 1 </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondPics1" name="txtDiamondPics1" placeholder="please enter diamond pics 1"/>
                                </td>  
                            </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Diamond Quality 1</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtDiamondQuality1" name="txtDiamondQuality1" placeholder="please enter diamond quality 1"/>
                                 </td>
                                 <td>
                                     <label class="control-label">Diamond Certificate 1 </label>
                                 </td>
                                 <td>
                                      <select id="ddlDiamondCertificate1" name="ddlDiamondCertificate1" class="form-control" onchange="FetchCertificate(this,'#txtURL1');" style="width:100%;">
                                             <option value="">-Select Diamond Certificate 1-</option>
                                      </select>
                                 </td>  
                             </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Certificate No 1</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtCertificateNo1" name="txtCertificateNo1" placeholder="please enter certificate 1"/>
                                 </td>
                                 <td>
                                     <label class="control-label">URL 1 </label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtURL1" name="txtURL1" placeholder="please enter url 1" readonly="readonly"/>
                                 </td>  
                             </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Final Url 1</label>
                                </td>
                                <td colspan="3">
                                    <a href="javascript:void(0);" id="txtFinalUrl1" name="txtFinalUrl1">Click Link</a>
                                    <%--<input type="text" class="form-control" id="txtFinalUrl1" name="txtFinalUrl1" placeholder="please enter final url 1"/>--%>
                                </td>                                  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Diamond Weight 2</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondWeight2" name="txtDiamondWeight2" placeholder="please enter diamond weight 2"/>
                                </td>
                                <td>
                                    <label class="control-label">Diamond Pics 2 </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondPics2" name="txtDiamondPics2" placeholder="please enter diamond pics 2"/>
                                </td>  
                            </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Diamond Quality 2</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtDiamondQuality2" name="txtDiamondQuality2" placeholder="please enter diamond quality 2"/>
                                 </td>
                                 <td>
                                     <label class="control-label">Diamond Certificate 2 </label>
                                 </td>
                                 <td>
                                     <select id="ddlDiamondCertificate2" name="ddlDiamondCertificate2" class="form-control" onchange="FetchCertificate(this,'#txtURL2');" style="width:100%;">
                                               <option value="">-Select Diamond Certificate 2-</option>
                                        </select>
                                 </td>  
                             </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Certificate No 2</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtCertificateNo2" name="txtCertificateNo2" placeholder="please enter certificate 2"/>
                                 </td>
                                 <td>
                                     <label class="control-label">URL 2 </label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtURL2" name="txtURL2" placeholder="please enter url 2" readonly="readonly"/>
                                 </td>  
                             </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Final Url 2</label>
                                </td>
                                <td colspan="3">
                                    <a href="" id="txtFinalUrl2" name="txtFinalUrl2">Click Link</a>
                                    <%--<input type="text" class="form-control" id="txtFinalUrl2" name="txtFinalUrl2" placeholder="please enter final url 2"/>--%>
                                </td>                                  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Diamond Weight 3</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondWeight3" name="txtDiamondWeight3" placeholder="please enter diamond weight 3"/>
                                </td>
                                <td>
                                    <label class="control-label">Diamond Pics 3 </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondPics3" name="txtDiamondPics3" placeholder="please enter diamond pics 3"/>
                                </td>  
                            </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Diamond Quality 3</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtDiamondQuality3" name="txtDiamondQuality3" placeholder="please enter diamond quality 3"/>
                                 </td>
                                 <td>
                                     <label class="control-label">Diamond Certificate 3 </label>
                                 </td>
                                 <td>
                                     <select id="ddlDiamondCertificate3" name="ddlDiamondCertificate3" class="form-control" onchange="FetchCertificate(this,'#txtURL3');" style="width:100%;">
                                           <option value="">-Select Diamond Certificate 3-</option>
                                    </select>
                                 </td>  
                             </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Certificate No 3</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtCertificateNo3" name="txtCertificateNo3" placeholder="please enter certificate 3"/>
                                 </td>
                                 <td>
                                     <label class="control-label">URL 3 </label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtURL3" name="txtURL1" placeholder="please enter url 3" readonly="readonly"/>
                                 </td>  
                             </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Final Url 3</label>
                                </td>
                                <td colspan="3">
                                    <a href="" id="txtFinalUrl3" name="txtFinalUrl3">Click Link</a>
                                    <%--<input type="text" class="form-control" id="txtFinalUrl3" name="txtFinalUrl3" placeholder="please enter final url 3"/>--%>
                                </td>                                  
                            </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Diamond Weight 4</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondWeight4" name="txtDiamondWeight4" placeholder="please enter diamond weight 4"/>
                                </td>
                                <td>
                                    <label class="control-label">Diamond Pics 4 </label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtDiamondPics4" name="txtDiamondPics4" placeholder="please enter diamond pics 4"/>
                                </td>  
                            </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Diamond Quality 4</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtDiamondQuality4" name="txtDiamondQuality4" placeholder="please enter diamond quality 4"/>
                                 </td>
                                 <td>
                                     <label class="control-label">Diamond Certificate 4 </label>
                                 </td>
                                 <td>
                                     <select id="ddlDiamondCertificate4" name="ddlDiamondCertificate4" class="form-control" onchange="FetchCertificate(this,'#txtURL4');" style="width:100%;">
                                           <option value="">-Select Diamond Certificate 4-</option>
                                    </select>
                                 </td>  
                             </tr>
                            <tr>                                
                                 <td>
                                     <label class="control-label">Certificate No 4</label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtCertificateNo4" name="txtCertificateNo4" placeholder="please enter certificate 4"/>
                                 </td>
                                 <td>
                                     <label class="control-label">URL 4 </label>
                                 </td>
                                 <td>
                                     <input type="text" class="form-control" id="txtURL4" name="txtURL4" placeholder="please enter url 4" readonly="readonly"/>
                                 </td>  
                             </tr>
                            <tr>                                
                                <td>
                                    <label class="control-label">Final Url 4</label>
                                </td>
                                <td colspan="3">
                                    <a href="" id="txtFinalUrl4" name="txtFinalUrl4">Click Link</a>
                                    <%--<input type="text" class="form-control" id="txtFinalUrl4" name="txtFinalUrl4" placeholder="please enter final url 4"/>--%>
                                </td>                                  
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td colspan="3">
                                    <textarea class="form-control" id="txtDescription" name="txtDescription" rows="5" cols="7"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="divDetails" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Job Card Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body" id="divpanelbody">
                        <table id="tblDetails" class="display no-footer dataTable" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th style="display: none;">Job Card Detail Id</th>
                                    <th style="display: none;">Job Card Id</th>
                                    <th>SI No</th>
                                    <th>Product</th>
                                    <th>Design No</th>
                                    <th>Customer Image</th>
                                    <th>Cad Image</th>
                                    <th>Finished Final Image</th>
                                    <th>Additional Image</th>                                    
                                    <th>Approx Weight</th>
                                    <th>Polish</th>
                                    <th>Pcs</th>
                                    <th>Size</th>
                                    <th>Length</th>
                                    <th>Diamond Weight</th>
                                    <th>Diamond Pices</th>
                                    <th>Remark</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tbody_JobDetails">
                                <tr>
                                    <td style="display: none;"></td>
                                    <td style="display: none;"></td>
                                    <td>
                                        <input type="text" class="form-control cls" id="txtSINo" name="txtSINo" readonly="readonly"/>
                                    </td>
                                    <td>
                                        <select id="ddlMaterialName" name="ddlMaterialName" class="form-control cls">
                                            <option value="">-Select Product-</option>
                                        </select>
                                    </td>                                    
                                    <td>
                                        <input type="text" class="form-control cls" id="txtDesignNo" name="txtDesignNo"/>
                                    </td>
                                    <td>
                                        <span id="customerUploadMessage" class="UploadMessage" style="color: green;"></span>
                                        <%--<input type="text" class="form-control cls" id="txtCustomerImage" name="txtCustomerImage"/>--%>
                                        <input type="file" id="txtCustomerImage" style="display: none" onchange="HandleCustomerUpload();" />
                                        <button id="btnCustomerImageUpload" onclick="OpenCustomerImageUploader();" class="cls">Upload</button>
                                        <img id="imgCustomer" style="display:none;" class="upload-message"/>
                                    </td>
                                    <td>
                                        <%--<input type="text" class="form-control cls" id="txtCadImage" name="txtCadImage"/>--%>
                                        <span id="cadUploadMessage" class="UploadMessage" style="color: green;"></span>
                                        <input type="file" id="txtCadImage" style="display: none" onchange="HandleCadUpload();" />
                                        <button id="btnCadImageUpload" onclick="OpenCadImageUploader();" class="cls">Upload</button>
                                        <img id="imgCad" style="display:none;" class="upload-message"/>
                                    </td>
                                    <td>
                                        <%--<input type="text" class="form-control cls" id="txtFinishedFinalImage" name="txtFinishedFinalImage"/>--%>
                                        <span id="finishedfinalUploadMessage" class="UploadMessage" style="color: green;"></span>
                                        <input type="file" id="txtFinishedFinalImage" style="display: none" onchange="HandleFinishedFinalUpload();" />
                                        <button id="btnFinishedFinalImageUpload" onclick="OpenFinishedFinalImageUploader();" class="cls">Upload</button>
                                        <img id="imgFinishedFinal" style="display:none;" class="upload-message"/>
                                    </td>
                                    <td>
                                        <%--<input type="text" class="form-control cls" id="txtAdditionalImage" name="txtAdditionalImage"/>--%>
                                        <span id="additionalUploadMessage" class="UploadMessage" style="color: green;"></span>
                                        <input type="file" id="txtAdditionalImage" style="display: none" onchange="HandleAdditionalUpload();" />
                                        <button id="btnAdditionalImageUpload" onclick="OpenAdditionalImageUploader();" class="cls">Upload</button>
                                        <img id="imgAdditional" style="display:none;" class="upload-message"/>
                                    </td>
                                     
                                    <td>
                                        <input type="text" class="form-control dcmlNo cls" id="txtApproxWeight" name="txtApproxWeight" />
                                    </td>
                                       <td>
                                        <input type="text" class="form-control cls" id="txtPolish" name="txtPolish"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control dcmlNo cls" id="txtPcs" name="txtPcs"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control dcmlNo cls" id="txtSize" name="txtSize"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control dcmlNo cls" id="txtLength" name="txtLength"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control dcmlNo cls" id="txtDiamondWeight" name="txtDiamondWeight"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control dcmlNo cls" id="txtDiamondPices" name="txtDiamondPices"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control cls" id="txtRemark" name="txtRemark"/>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary cls" id="btnadd" onclick="AddJobDetails();">Add</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
