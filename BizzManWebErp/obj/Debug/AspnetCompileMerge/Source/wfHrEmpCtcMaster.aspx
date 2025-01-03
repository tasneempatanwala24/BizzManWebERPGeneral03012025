<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="wfHrEmpCtcMaster.aspx.cs" Inherits="BizzManWebErp.wfHrEmpCtcMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/EmployeeCTCMaster.js"></script>
    <style>
        .dcmlNo{
            font-size:10px;
        }

        .tbl td{
            font-size: 12px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
    <button onclick="CreateEmployeeCTC();">Create</button>
    <button onclick="ViewEmployeeCTCList();">View</button>
    <button onclick="AddEmployeeCTC();" style="display: none;" id="btnSave">Save</button>


    <div class="container" id="divEmployeeCTCList" style="margin-top: 10px; overflow: auto;">

        <table id="tblEmployeeCTCList" class="display">
            <thead>
                <tr>
                    <th>Emp ID</th>
                    <th>Emp Name</th>
                    <th>Salary Grade</th>
                    <th>Salary Type</th>
                    <th>Basic Monthly</th>
                    <th>Basic Yearly</th>
                    <th>DA (%)</th>
                    <th>DA Monthly</th>
                    <th>DA Yearly</th>
                    <th>HRA (%)</th>
                    <th>HRA Monthly</th>
                    <th>HRA Yearly</th>
                    <th>Transport Allowance Daily</th>
                    <th>Transport Allowance Monthly</th>
                    <th>Transport Allowance Yearly</th>
                    <th>Medical Allowance Daily</th>
                    <th>Medical Allowance Monthly</th>
                    <th>Medical Allowance Yearly</th>
                    <th>Uniform Allowance Monthly</th>
                    <th>Uniform Allowance Yearly</th>
                    <th>Other Allowance Monthly</th>
                    <th>Other Allowance Yearly</th>
                    <th>SPLAL (%)</th>
                    <th>SPLAL Monthly</th>
                    <th>SPLAL Yearly</th>
                    <th>EDUAL (%)</th>
                    <th>EDUAL Monthly</th>
                    <th>EDUAL Yearly</th>
                    <th>LTA (%)</th>
                    <th>LTA Monthly</th>
                    <th>LTA Yearly</th>
                    <th>STIP (%)</th>
                    <th>STIP Monthly</th>
                    <th>STIP Yearly</th>
                    <th>MobileAllowance (%)</th>
                    <th>MobileAllowance Monthly</th>
                    <th>MobileAllowance Yearly</th>
                    <th>Bonus (%)</th>
                    <th>Bonus Monthly</th>
                    <th>Bonus Yearly</th>
                    <th>Total Monthly</th>
                    <th>Total Yearly</th>
                    <th>Gratuity (%)</th>
                    <th>Gratuity Monthly</th>
                    <th>Gratuity Yearly</th>
                    <th>PF Employer (%)</th>
                    <th>PF Employer Monthly</th>
                    <th>PF Employer Yearly</th>
                    <th>ESI Employer (%)</th>
                    <th>ESI Employer Monthly</th>
                    <th>ESI Employer Yearly</th>
                    <th>CTC Monthly</th>
                    <th>CTC Yearly</th>
                    <th>PF Employees (%)</th>
                    <th>PF Employees Monthly</th>
                    <th>PF Employees Yearly</th>
                    <th>PF Employer (%)</th>
                    <th>PF Employer Monthly</th>
                    <th>PF Employer Yearly</th>
                    <th>ESI Employees (%)</th>
                    <th>ESI Employees Monthly</th>
                    <th>ESI Employees Yearly</th>
                    <th>ESI Employer (%)</th>
                    <th>ESI Employer Monthly</th>
                    <th>ESI Employer Yearly</th>
                    <th>Gratuity (%)</th>
                    <th>Gratuity Monthly</th>
                    <th>Gratuity Yearly</th>
                    <th>TDS (%)</th>
                    <th>TDS Monthly</th>
                    <th>TDS Yearly</th>
                    <th>PT Monthly</th>
                    <th>PT Yearly</th>
                    <th>Total Deduction Monthly</th>
                    <th>Total Deduction Yearly</th>
                    <th>Net Pay Monthly</th>
                    <th>Net Pay Yearly</th>
                </tr>
            </thead>
            <tbody id="tbody_Employee_CTCList">
            </tbody>
        </table>
    </div>

    <div class="container" id="divEmployeeCTCEntry" style="margin-top: 10px;display:none;max-width:80%;">
        <div class="card">
            <div class="card-header">
                Add Employee CTC
            </div>
            <div class="card-body">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="tbl" id="tbl_entry">

                            <tr>
                                <td>
                                    <label class="control-label">Employee ID *</label>
                                </td>
                                <td style="width:25%;">
                                    <select id="ddlEmployee" name="ddlEmployee" class="form-control" onchange="FetchEmployeeDetails();">
                                        <option value="">-Select Employee-</option>
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Employee Name</label>
                                </td>
                                <td>
                                    <input type="text" class="form-control" id="txtEmpName" name="txtEmpName" readonly="readonly" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="control-label">Salary Grade *</label>
                                </td>
                                <td>
                                    <select id="ddlSalaryGrade" name="ddlSalaryGrade" class="form-control" onchange="FetchSaalaryGradeDetails();">
                                        
                                    </select>
                                </td>
                                <td>
                                    <label class="control-label">Salary Type *</label>
                                </td>
                                <td>
                                    <select id="ddlSalaryType" name="ddlSalaryType" class="form-control">
                                        <option value="">-Select Salary Type-</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Wages">Wages</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="4">
                                    <table class="tbl">
                                        <tr>
                                            <td style="width: 50%">
                                                <fieldset>
                                                    <legend>Earning</legend>
                                                    <table class="tbl">
                                                        <tr>
                                                            <td style="width:33%;"></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td style="text-align:center;">Monthly</td>
                                                            <td></td>
                                                            <td style="text-align:center;">Yearly</td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>Basic</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtBasicMonthly" name="txtBasicMonthly" onchange="CalculateAmnt();" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtBasicYearly" name="txtBasicYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>DA %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtDAPercent" name="txtDAPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtDAMonthly" name="txtDAMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtDAYearly" name="txtDAYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>HRA %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtHRAPercent" name="txtHRAPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtHRAMonthly" name="txtHRAMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtHRAYearly" name="txtHRAYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Transport Allowance Daily</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTransportAllowanceDaily" name="txtTransportAllowanceDaily" onchange="CalculateAmnt();" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTransportAllowanceMonthly" name="txtTransportAllowanceMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTransportAllowanceYearly" name="txtTransportAllowanceYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Medical Allowance Daily</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtMedicalAllowanceDaily" name="txtMedicalAllowanceDaily" onchange="CalculateAmnt();" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtMedicalAllowanceMonthly" name="txtMedicalAllowanceMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtMedicalAllowanceYearly" name="txtMedicalAllowanceYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Uniform Allowance</td>
                                                            <td></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtUniformAllowanceMonthly" name="txtUniformAllowanceMonthly"  onchange="CalculateAmnt();" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtUniformAllowanceYearly" name="txtUniformAllowanceYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Other Allowance</td>
                                                            <td></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtOtherAllowanceMonthly" name="txtOtherAllowanceMonthly"  onchange="CalculateAmnt();" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtOtherAllowanceYearly" name="txtOtherAllowanceYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>SPLAL %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtSPLALPercent" name="txtSPLALPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtSPLALMonthly" name="txtSPLALMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtSPLALYearly" name="txtSPLALYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>EDUAL %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtEDUALPercent" name="txtEDUALPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtEDUALMonthly" name="txtEDUALMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtEDUALYearly" name="txtEDUALYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>LTA %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtLTAPercent" name="txtLTAPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtLTAMonthly" name="txtLTAMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtLTAYearly" name="txtLTAYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>STIP %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtSTIPPercent" name="txtSTIPPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtSTIPMonthly" name="txtSTIPMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtSTIPYearly" name="txtSTIPYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mobile Allowance %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtMobileAllowancePercent" name="txtMobileAllowancePercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtMobileAllowanceMonthly" name="txtMobileAllowanceMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtMobileAllowanceYearly" name="txtMobileAllowanceYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bonus %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtBonusPercent" name="txtSTIPPercent" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtBonusMonthly" name="txtBonusMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtBonusYearly" name="txtBonusYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>Gross</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTotalMonthly" name="txtTotalMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTotalYearly" name="txtTotalYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gratuity %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtGratuityPercentEarn" name="txtGratuityPercentEarn" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtGratuityMonthlyEarn" name="txtGratuityMonthlyEarn" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtGratuityYearlyEarn" name="txtGratuityYearlyEarn" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>PF Employer %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtPFEmployerPercentEarn" name="txtPFEmployerPercentEarn" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPFEmployerMonthlyEarn" name="txtPFEmployerMonthlyEarn" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPFEmployerYearlyEarn" name="txtPFEmployerYearlyEarn" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>ESI Employer %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtESIEmployerPercentEarn" name="txtESIEmployerPercentEarn" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtESIEmployerMonthlyEarn" name="txtESIEmployerMonthlyEarn" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtESIEmployerYearlyEarn" name="txtESIEmployerYearlyEarn" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>CTC</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtCTCMonthly" name="txtCTCMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtCTCYearly" name="txtCTCYearly" readonly="readonly" /></td>
                                                        </tr>
                                                    </table>
                                                </fieldset>
                                            </td>
                                            <td style="vertical-align:top;">
                                                <fieldset>
                                                    <legend>Deduction</legend>
                                                    <table class="tbl">
                                                        <tr>
                                                            <td style="width:30%;"></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td style="text-align:center;">Monthly</td>
                                                            <td></td>
                                                            <td style="text-align:center;">Yearly</td>
                                                        </tr>
                                                        <tr>
                                                            <td>PF Employees %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtPFEmployeesPercentDeduct" name="txtPFEmployeesPercentDeduct" readonly="readonly" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPFEmployeesMonthlyDeduct" name="txtPFEmployeesMonthlyDeduct" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPFEmployeesYearlyDeduct" name="txtPFEmployeesYearlyDeduct" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>PF Employer %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtPFEmployerPercentDeduct" name="txtPFEmployerPercentDeduct" readonly="readonly" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPFEmployerMonthlyDeduct" name="txtPFEmployerMonthlyDeduct" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPFEmployerYearlyDeduct" name="txtPFEmployerYearlyDeduct" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>ESI Employees %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtESIEmployeesPercentDeduct" name="txtESIEmployeesPercentDeduct" readonly="readonly" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtESIEmployeesMonthlyDeduct" name="txtESIEmployeesMonthlyDeduct" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtESIEmployeesYearlyDeduct" name="txtESIEmployeesYearlyDeduct" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>ESI Employer %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtESIEmployerPercentDeduct" name="txtESIEmployerPercentDeduct" readonly="readonly" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtESIEmployerMonthlyDeduct" name="txtESIEmployerMonthlyDeduct" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtESIEmployerYearlyDeduct" name="txtESIEmployerYearlyDeduct" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gratuity %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtGratuityPercentDeduct" name="txtGratuityPercentDeduct" readonly="readonly" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtGratuityMonthlyDeduct" name="txtGratuityMonthlyDeduct" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtGratuityYearlyDeduct" name="txtGratuityYearlyDeduct" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>TDS %</td>
                                                            <td><input type="text" class="form-control dcmlNo prcnt" id="txtTDSPercent" name="txtTDSPercent" readonly="readonly" /></td>
                                                            <td>Value</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTDSMonthly" name="txtTDSMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTDSYearly" name="txtTDSYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>PT</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPTMonthly" name="txtPTMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtPTYearly" name="txtPTYearly" readonly="readonly" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="3" style="text-align:right;">Total Deduction</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTotalDeductMonthly" name="txtTotalDeductMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtTotalDeductYearly" name="txtTotalDeductYearly" readonly="readonly" /></td>
                                                        </tr>
                                                    </table>
                                                </fieldset>
                                                <table class="tbl">
                                                    <tr>
                                                            <td colspan="3" style="text-align:right;width:54%;">Net Pay</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtNetPayMonthly" name="txtNetPayMonthly" readonly="readonly" /></td>
                                                            <td> *12</td>
                                                            <td><input type="text" class="form-control dcmlNo" id="txtNetPayYearly" name="txtNetPayYearly" readonly="readonly" /></td>
                                                        </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
