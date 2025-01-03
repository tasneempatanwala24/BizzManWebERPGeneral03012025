<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpSalaryReport.aspx.cs" Inherits="BizzManWebErp.wfHrEmpSalaryReport" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="Scripts/pdfmake.min.js"></script>
    <script type="text/javascript" src="Scripts/html2canvas.min.js"></script>
    <script src="Scripts/HrEmpSalaryReport.js"></script>
  
    <style>
        .tbl_pdf {
            width: 100%;
            border: 2px solid #000;
        }

            .tbl_pdf td {
                border: 2px solid #000;
                padding: 5px;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <%--<button onclick="CreateEmployeeSaleryApprove();">Create</button>--%>
    <button onclick="ViewEmployeeSaleryApproveList();">View</button>
    <%--<button style="display: none;" id="btnSave">Approve</button>--%>
    <button onclick="SearchEmployeeSaleryApprove();" id="btnSearch">Search</button>
    <%--<button id="btnDelete">Reject</button>
    <button id="btnExportPDF">Export to PDF</button>--%>

    <div class="container" id="divEmployeeSaleryApproveList" style="margin-top: 10px; overflow: auto;">
        <table class="tbl">
            <tr>
                <td>
                    <label class="control-label">Branch</label>
                </td>
                <td>
                    <select id="ddl_Branch" name="ddl_Branch" class="form-control" onchange="BindEmployeeDropdown(0);">
                        <option value="">-Select Branch-</option>
                    </select>
                </td>
                <td>

                    <label class="control-label">Month</label>
                </td>
                <td>
                    <select id="ddlMonth" name="ddlMonth" class="form-control">
                        <option value="">-Select Month-</option>
                        <option value="Jan">January</option>
                        <option value="Feb">February</option>
                        <option value="Mar">March</option>
                        <option value="Apr">April</option>
                        <option value="May">May</option>
                        <option value="Jun">June</option>
                        <option value="Jul">July</option>
                        <option value="Aug">August</option>
                        <option value="Sep">September</option>
                        <option value="Oct">October</option>
                        <option value="Nov">November</option>
                        <option value="Dec">December</option>
                    </select>
                </td>
                <td>
                    <label class="control-label">Year</label>
                </td>
                <td>
                    <input type="number" class="form-control" id="txtYear" name="txtYear" />
                </td>
                <td>
                    <label class="control-label">Employee</label>
                </td>
                <td>
                    <select id="ddl_Employee" name="ddl_Employee" class="form-control">
                        <option value="">-Select Employee-</option>
                    </select>
                </td>
                <td>
                                    <label class="control-label">Salary Tpe</label></td>
                                <td>
                                    <select id="ddl_SalaryType" name="ddl_SalaryType" class="form-control">
                                        <option value="">-Select Salary Type-</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Wages">Wages</option>
                                    </select>
                                </td>
            </tr>
        </table>
        <table id="tblEmployeeSalaryApproveList" class="display">
            <thead>
                <tr><th>Pay Slip</th>
                    <th>
                        <input name="select_all" value="1" id="example-select-all" type="checkbox" /></th>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total Day</th>
                    <th>Earn Day</th>
                    <th>Day Present</th>
                    <th>CL</th>
                    <th>EL</th>
                    <th>LOP</th>
                    <th>Sunday</th>
                    <th>Holiday</th>
                    <th>Total 2nd Saturday</th>
                    <th>Total 4th Saturday</th>
                    <th>Gross Rate</th>
                    <th>Basic Rate</th>
                    <th>Basic Pay</th>
                    <th>Da %</th>
                    <th>Da Amt</th>
                    <th>Hra %</th>
                    <th>Hra Amt</th>
                    <th>TA Perday</th>
                    <th>TA Total</th>
                    <th>MedicalAllow PerDay</th>
                    <th>MedicalAllow Total</th>
                    <th>UniformAllow PerMonth</th>
                    <th>Other Allownce</th>
                    <th>SPLAL %</th>
                    <th>SPLAL Amt</th>
                    <th>EDUAL %</th>
                    <th>EDUAL Amt</th>
                    <th>Mobile Allowance %</th>
                    <th>Mobile Allowance Amt</th>
                    <th>LTA %</th>
                    <th>LTA Amt</th>
                    <th>STIP %</th>
                    <th>STIP Amt</th>
                    <th>Bonus %</th>
                    <th>Bonus Amt</th>
                    <th>GROSS TOTAL</th>
                    <th>Gratuity %</th>
                    <th>Gratuity Amt</th>
                    <th>PF Employer %</th>
                    <th>PF Employer Value</th>
                    <th>PF Employees %</th>
                    <th>PF Employees Value</th>
                    <th>Admin Charges %</th>
                    <th>Admin Charges Amount</th>
                    <th>ESI Employer %</th>
                    <th>ESI Employer Value</th>
                    <th>ESI Employees %</th>
                    <th>ESI Employees Value</th>
                    <th>PT</th>
                    <th>Net Pay</th>
                    <th>Salary Approve</th>
                    <th>Salary Payment</th>

                </tr>
            </thead>
            <tbody id="tbody_Employee_SalaryApproveList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeSaleryApproveEntry" style="display: none; margin-top: 10px;">
        <div class="card">
            <div class="card-header">
                Employee Salary Approve
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl" id="tbl_entry">
                            
                            <tr>
                                <td>
                                    <label class="control-label">Branch *</label>
                                </td>
                                <td>
                                    <select id="ddlBranch" name="ddlBranch" class="form-control" onchange="BindEmployeeDropdown(1);">
                                    </select>
                                </td>
                                <td class="Individual">
                                    <label class="control-label">Emp Id</label>
                                </td>
                                <td class="Individual">
                                    <select id="ddlEmployee" name="ddlEmployee" class="form-control" style="width: 100%!important;" onchange="ShowEmployeeName();">
                                        <option value="">-Select Employee-</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label class="control-label">Emp Name</label></td>
                                <td>
                                    <input type="text" class="form-control" id="txtEmpName" name="txtEmpName" readonly="readonly" />
                                </td>
                                <td>
                                    <label class="control-label">Salary Tpe</label></td>
                                <td>
                                    <select id="ddlSalaryType" name="ddlSalaryType" class="form-control">
                                        <option value="">-Select Salary Type-</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Wages">Wages</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Month *</label>
                                </td>
                                <td>
                                    <select id="ddl_Month" name="ddl_Month" class="form-control">
                                        <option value="">-Select Month-</option>
                                        <option value="Jan">January</option>
                                        <option value="Feb">February</option>
                                        <option value="Mar">March</option>
                                        <option value="Apr">April</option>
                                        <option value="May">May</option>
                                        <option value="Jun">June</option>
                                        <option value="Jul">July</option>
                                        <option value="Aug">August</option>
                                        <option value="Sep">September</option>
                                        <option value="Oct">October</option>
                                        <option value="Nov">November</option>
                                        <option value="Dec">December</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Year *</label>
                                </td>
                                <td>
                                    <input type="number" class="form-control" id="txt_Year" name="txt_Year" />
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container" id="divSalaryApproveListEmployeeWise" style="margin-top: 10px; overflow: auto; display: none;">
        <div class="card">
            <div class="card-header">
                Employee Salary Details
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="tblSalaryApproveEmployeeWise" class="display">
                            <thead>
                                <tr>
                                    <th>
                                        <input name="select_all" value="1" id="SalaryApprove-select-all" type="checkbox" /></th>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Total Day</th>
                                    <th>Earn Day</th>
                                    <th>Day Present</th>
                                    <th>CL</th>
                                    <th>EL</th>
                                    <th>LOP</th>
                                    <th>Sunday</th>
                                    <th>Holiday</th>
                                    <th>Total 2nd Saturday</th>
                                    <th>Total 4th Saturday</th>
                                    <th>Gross Rate</th>
                                    <th>Basic Rate</th>
                                    <th>Basic Pay</th>
                                    <th>Da %</th>
                                    <th>Da Amt</th>
                                    <th>Hra %</th>
                                    <th>Hra Amt</th>
                                    <th>TA Perday</th>
                                    <th>TA Total</th>
                                    <th>MedicalAllow PerDay</th>
                                    <th>MedicalAllow Total</th>
                                    <th>UniformAllow PerMonth</th>
                                    <th>Other Allownce</th>
                                    <th>SPLAL %</th>
                                    <th>SPLAL Amt</th>
                                    <th>EDUAL %</th>
                                    <th>EDUAL Amt</th>
                                    <th>Mobile Allowance %</th>
                                    <th>Mobile Allowance Amt</th>
                                    <th>LTA %</th>
                                    <th>LTA Amt</th>
                                    <th>STIP %</th>
                                    <th>STIP Amt</th>
                                    <th>Bonus %</th>
                                    <th>Bonus Amt</th>
                                    <th>GROSS TOTAL</th>
                                    <th>Gratuity %</th>
                                    <th>Gratuity Amt</th>
                                    <th>PF Employer %</th>
                                    <th>PF Employer Value</th>
                                    <th>PF Employees %</th>
                                    <th>PF Employees Value</th>
                                    <th>Admin Charges %</th>
                                    <th>Admin Charges Amount</th>
                                    <th>ESI Employer %</th>
                                    <th>ESI Employer Value</th>
                                    <th>ESI Employees %</th>
                                    <th>ESI Employees Value</th>
                                    <th>PT</th>
                                    <th>Net Pay</th>
                                    <th>Salary Approve</th>
                                    <th>Salary Payment</th>

                                </tr>
                            </thead>
                            <tbody id="tbody_SalaryApproveListEmployeeWise">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div style="padding-top:250px">
    
    <table class="tbl_pdf" cellspacing="0" cellpadding="0" id="tblExportPDF" style="display:none;">
        <tr><td colspan="4" style="text-align: center;"><img src="Images/CompanyLogo.png" style="width:100px;" /></td></tr>
        <tr><td colspan="4" style="text-align: center;font-size: 25px;font-weight: bold;text-decoration: underline;">Salary Slip</td></tr>
        <tr><td colspan="4" style="text-align: center;font-size: 22px;font-weight: bold;text-decoration: underline;"><span id="lblMonthYear"></span></td></tr>
        <tr><td colspan="4" style="text-align: center;font-size: 18px;font-weight: bold;">Employee Details</td></tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Name :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblName"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Designation :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblDesignation"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Department :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblDepartment"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Employee Number :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblEmpNo"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Total days :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblTotalDays"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Total Paid days :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblTotalPaidDays"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                LWP :
            </td>
            <td colspan="3" style="font-size: 18px;">
                <span id="lblLWP"></span>
            </td>
        </tr>
        <tr><td colspan="4" style="text-align: center;font-size: 18px;font-weight: bold;">Salary Details</td></tr>
        <tr>
            <td style="text-align: center; width: 50%; font-size: 18px; font-weight: bold;background-color: lightgray;" colspan="2">
                Earnings
            </td>
            <td style="text-align: center; width: 50%; font-size: 18px; font-weight: bold;background-color: lightgray;" colspan="2">
                Deductions
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Salary Heads
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;">
                Amount
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Salary Heads
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;">
                Amount
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Basic :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblBasic"></span>
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
            </td>
        </tr>
        <tr>
            <td colspan="2" style="background-color: lightgray;font-size: 18px; font-weight: bold;">
                Allowances :
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                PF Employee :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblPFEmployee"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                HRA :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblHRA"></span>
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                ESI Employee :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblESIEmployee"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Spl. Allowances :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblSPLAllownce"></span>
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                LWP :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblLWP1"></span>
            </td>
        </tr>
        <tr>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Others :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblOther"></span>
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                PT :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblPT"></span>
            </td>
        </tr>
        <tr>
            <td style="background-color: lightgray; width: 30%; font-size: 18px; font-weight: bold;">
                Total Allowances :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblTotalAlownc"></span>
            </td>
            <td style="width:30%;font-size: 18px;font-weight: bold;">
                Advance :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblAdvance"></span>
            </td>
        </tr>
        <tr>
            <td style="background-color: lightgray; width: 30%; font-size: 18px; font-weight: bold;">
                Gross Salary (A) :
            </td>
            <td style="background-color: lightgray; width: 20%; font-size: 18px; font-weight: bold; text-align: right">
                ₹ <span id="lblGrossSalary"></span>
            </td>
            <td style="background-color: lightgray; width: 30%; font-size: 18px; font-weight: bold;">
                Deductions (B) :
            </td>
            <td style="background-color: lightgray; width: 20%; font-size: 18px; font-weight: bold; text-align: right">
                ₹ <span id="lblDeduction"></span>
            </td>
        </tr>
        <tr>
            <td style="width: 30%; font-size: 18px; font-weight: bold;">
                Leave :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblLeave"></span>
            </td>
            <td style="font-size: 18px;font-weight: bold;text-align:center;" rowspan="2" colspan="2">
                Summary
            </td>
        </tr>
        <tr>
            <td style="width: 30%; font-size: 18px; font-weight: bold;">
                Bonus :
            </td>
            <td style="width:20%; font-size: 18px; font-weight: bold;text-align:right">
                ₹ <span id="lblBonus"></span>
            </td>
        </tr>
        <tr>
            <td style="background-color: lightgray; width: 30%; font-size: 18px; font-weight: bold;">
                Annual Benefit (C) :
            </td>
            <td style="background-color: lightgray; width: 20%; font-size: 18px; font-weight: bold; text-align: right">
                ₹ <span id="lblAnualBenefit"></span>
            </td>
            <td style="background-color: lightgray; width: 30%; font-size: 18px; font-weight: bold;text-align:center;" rowspan="3">
                Net Salary Transfer Amount
                (A+C-B) :
            </td>
            <td style="background-color: lightgray; width: 20%; font-size: 18px; font-weight: bold; text-align:right;" rowspan="3">
                ₹ <span id="lblNetSalary"></span>
            </td>
        </tr>
        <tr>
            <td style="width: 30%; font-size: 18px; font-weight: bold;">
                Salary (GROSS)/PM :
            </td>
            <td style="width: 20%; font-size: 18px; font-weight: bold; text-align: right">
                ₹ <span id="lblGrossSalaryPM"></span>
            </td>
        </tr>
        <tr>
            <td style="width: 30%; font-size: 18px; font-weight: bold;">
                Salary (GROSS)/PA :
            </td>
            <td style="width: 20%; font-size: 18px; font-weight: bold; text-align: right">
                ₹ <span id="lblGrossSalaryPA"></span>
            </td>
        </tr>
        <tr><td colspan="4" style="text-align: center;font-size: 18px;font-weight: bold;">&nbsp;</td></tr>
        <tr>
            <td colspan="4" style="text-align: center;font-size: 14px;font-weight: bold;border-bottom:none;">
                *** This is a system generated statement, no signature is required ***
            </td>
        </tr>
        <tr><td colspan="4" style="text-align: center;font-size: 12px;font-weight: bold;border-bottom:none;border-top:none;">&nbsp;</td></tr>
        <tr>
            <td colspan="4" style="text-align: center;font-size: 14px;font-weight: bold;border-top:none;">
                You are required to report discrepancies or errors within 7 days, failing which the contents of this mail are deemed correct. In case
                of clarifications, please contact the HR department.
            </td>
        </tr>
    </table>
        </div>
              <div class="modal fade" id="pdfModal" tabindex="-1" role="dialog" aria-labelledby="pdfModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pdfModalLabel">PDF Preview</h5>
                <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>--%>
            </div>
            <div class="modal-body">
                <iframe id="pdfPreview" style="width: 100%; height: 900px;" frameborder="0"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"  onclick="ClosePDFModal();">Close</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
