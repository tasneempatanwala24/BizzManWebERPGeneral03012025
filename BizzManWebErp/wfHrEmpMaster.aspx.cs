using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using BizzManWebErp.Model;
using DocumentFormat.OpenXml.Office.Word;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfHrEmpMaster : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Session["Id"].ToString();

                    //added on 12 Dec 2023
                    //############START###############
                    if (Session["objMain_Session"] != null)
                    {
                        objMain = (clsMain)Session["objMain_Session"];
                    }
                    else
                    {
                        Response.Redirect("wfAdminLogin.aspx");
                    }
                    //############END###############

                }
                else
                {
                    Response.Redirect("wfAdminLogin.aspx");
                }
            }
        }

        [WebMethod]
        public static string SalaryGradeMasterList()
        {


          //  clsMain objMain = new clsMain();
            DataTable dtSalaryGradeList = new DataTable();

            try
            {
                
                dtSalaryGradeList = objMain.dtFetchData("select [ID],[SalaryGradeName] FROM [tblHrSalaryGradeMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

           // return JsonConvert.SerializeObject(dtSalaryGradeList);

            string json = JsonConvert.SerializeObject(dtSalaryGradeList, Formatting.None);
            dtSalaryGradeList = null;
            return json;
        }
        //=====================================
 

        [WebMethod]
        public static string BranchMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select [BranchCode],[BranchName] FROM [tblHrBranchMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            //  return JsonConvert.SerializeObject(dtBranchList);

            string json = JsonConvert.SerializeObject(dtBranchList, Formatting.None);
            dtBranchList = null;
            return json;
        }

        //====================================
 
        [WebMethod]
        public static string DepartmentMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData("select [Id],[DeptName] FROM [tblHrDeptMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            //  return JsonConvert.SerializeObject(dtDepartmentList);

            string json = JsonConvert.SerializeObject(dtDepartmentList, Formatting.None);
            dtDepartmentList = null;
            return json;

        }

   
        [WebMethod]
        public static string DivisionMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtDivisionList = new DataTable();

            try
            {

                dtDivisionList = objMain.dtFetchData("select [ID],[DivisionName] FROM [tblHrDivisionMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            // return JsonConvert.SerializeObject(dtDivisionList);

            string json = JsonConvert.SerializeObject(dtDivisionList, Formatting.None);
            dtDivisionList = null;
            return json;

        }

        [WebMethod]
        public static string DesignationMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtDesignationList = new DataTable();

            try
            {

                dtDesignationList = objMain.dtFetchData("select [ID],[DesignationName] FROM [tblHrDesignationMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            //  return JsonConvert.SerializeObject(dtDesignationList);

            string json = JsonConvert.SerializeObject(dtDesignationList, Formatting.None);
            dtDesignationList = null;
            return json;

        }

        [WebMethod]
        public static string GradeMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtGradeList = new DataTable();

            try
            {

                dtGradeList = objMain.dtFetchData("select [ID],[GradeName] FROM [tblHrGradeMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            //  return JsonConvert.SerializeObject(dtGradeList);

            string json = JsonConvert.SerializeObject(dtGradeList, Formatting.None);
            dtGradeList = null;
            return json;

        }

        /*
                [WebMethod]
                public static string BranchMasterList()
                {
                   // clsMain objMain = new clsMain();
                    DataTable dtBranchList = new DataTable();

                    try
                    {

                        dtBranchList = objMain.dtFetchData("select [BranchCode],[BranchName] FROM [tblHrBranchMaster]");
                    }
                    catch (Exception ex)
                    {
                        return "";
                    }

                    return JsonConvert.SerializeObject(dtBranchList);
                }
        */
        [WebMethod]
        public static string AreaMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtAreaList = new DataTable();

            try
            {

                dtAreaList = objMain.dtFetchData("select [Id],[AreaName] FROM [tblHrAreaMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            //  return JsonConvert.SerializeObject(dtAreaList);

            string json = JsonConvert.SerializeObject(dtAreaList, Formatting.None);
            dtAreaList = null;
            return json; 

        }

        [WebMethod]
        public static string CheckEmployeeIdAvailability(string EmpId, string IsUpdate)
        {
           // clsMain objMain = new clsMain();
            bool CheckEmpId = new bool();

            try
            {

                if (IsUpdate == "0")
                {
                    CheckEmpId = objMain.blSearchDataHO("select EmpId FROM [tblHrEmpMaster] where EmpId='" + EmpId + "'");
                }
                else
                {
                    CheckEmpId = false;
                }
            }
            catch (Exception ex)
            {
                return "False";
            }

            return JsonConvert.SerializeObject(CheckEmpId.ToString());


        }


        [WebMethod]
        public static List<string> FetchBankBranchAutocomplete(string prefixText)
        {
           // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();
            List<string> branch = new List<string>();

            try
            {

                dtBranchList = objMain.dtFetchData("select [BranchName] as Name FROM [tblHrBranchMaster] where BranchName like '"+prefixText+"' + '%'");
                if(dtBranchList != null)
                {
                    if (dtBranchList.Rows.Count > 0)
                    {
                        for(int i=0;i< dtBranchList.Rows.Count; i++)
                        {
                            branch.Add(dtBranchList.Rows[i][0].ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return branch;
            }

            return branch;
        }


        [WebMethod]
        public static List<string> FetchAddressStateAutocomplete(string prefixText)
        {
           // clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();
            List<string> state = new List<string>();

            try
            {

                dtStateList = objMain.dtFetchData("select [StateName] as Name FROM [tblHrStateMaster] where StateName like '" + prefixText + "' + '%'");
                if (dtStateList != null)
                {
                    if (dtStateList.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtStateList.Rows.Count; i++)
                        {
                            state.Add(dtStateList.Rows[i][0].ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return state;
            }

            return state;
        }

        [WebMethod]
        public static List<string> FetchAddressPinAutocomplete(string prefixText)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtPinList = new DataTable();
            List<string> pin = new List<string>();

            try
            {

            }
            catch (Exception ex)
            {
                return pin;
            }

            return pin;
        }

        [WebMethod]
        public static List<string> FetchAddressPostAutocomplete(string prefixText)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtPostList = new DataTable();
            List<string> post = new List<string>();

            try
            {

            }
            catch (Exception ex)
            {
                return post;
            }

            return post;
        }

        [WebMethod]
        public static List<string> FetchAddressDistrictAutocomplete(string prefixText)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDistrictList = new DataTable();
            List<string> district = new List<string>();

            try
            {

            }
            catch (Exception ex)
            {
                return district;
            }

            return district;
        }

        [WebMethod]
        public static List<string> FetchBankNameAutocomplete(string prefixText)
        {
           // clsMain objMain = new clsMain();
            DataTable dtBankList = new DataTable();
            List<string> bank = new List<string>();

            try
            {

            }
            catch (Exception ex)
            {
                return bank;
            }

            return bank;
        }

        [WebMethod]
        public static string SaveUpdateEmployeeDetails(string EmpId = "", string Sex = "", string Name = "", string FatherName = "",
                                    string MotherName = "", string SpouseName = "", string MobileNo = "", string Email = "", string DOB = "",
                                    string DOJ = "", string SalaryGrade = "", string Religion = "", string Caste = "", string Department = "",
                                    string Division = "", string Designation = "", string Grade = "", string Area = "", string Branch = "",
                                    string MaritalStatus = "", string PresentAddrResNo = "", string PresentAddrResName = "",
                                    string PresentAddrRoad = "", string PresentAddrPin = "", string PresentAddrPost = "", string PresentAddrState = "",
                                    string PresentAddrDistrict = "", string PermAddrResNo = "", string PermAddrResName = "", string PermAddrRoad = "",
                                    string PermAddrPin = "", string PermAddrPost = "", string PermAddrState = "", string PermAddrDistrict = "",
                                    string ProfileImage = "", string AdharNo = "", string AdharImage = "", string VoterNo = "", string VoterImage = "",
                                    string PANNo = "", string PANImage = "", string PassportNo = "", string PassportImage = "", string DrivingLicense = "",
                                    string DrivingLicenseImage = "", string IFSC = "", string BankBranch = "", string BankName = "", string AcNumber = "",
                                    string AccountImage = "", string PFNo="", string ESINo="", string LoginUser="", string CardNo = "",
                                     string FatherDOB = "", string FatherAdharNo = "", string FatherAdharNoImage = "", string MotherDOB = "", string MotherAdharNo = "",
                                      string MotherAdharNoImage = "", string SpouseDOB = "", string SpouseAdharNo = "", string SpouseAdharNoImage = "", string Family1Name = "",
                                       string Family1Relation = "", string Family1DOB = "", string Family1AdharNo = "", string Family1AdharNoImage = "", string Family2Name = "",
                                       string Family2Relation = "", string Family2DOB = "", string Family2AdharNo = "", string Family2AdharNoImage = "", string Family3Name = "",
                                       string Family3Relation = "", string Family3DOB = "", string Family3AdharNo = "", string Family3AdharNoImage = "", string Family4Name = "",
                                       string Family4Relation = "", string Family4DOB = "", string Family4AdharNo = "", string Family4AdharNoImage = "", string Family5Name = "",
                                       string Family5Relation = "", string Family5DOB = "", string Family5AdharNo = "", string Family5AdharNoImage = "",
                                        string NomineeName = "",
                                       string NomineeRelation = "", string NomineeDOB = "", string NomineeAdharNo = "", string NomineeAdharNoImage = "", string Education10ExamName = "", string Education10ExamBoard = "", string Education10Subject = "",
                                       string Education10Percentage = "", string Education10YearPass = "", string Education12ExamName = "",
                                       string Education12ExamBoard = "", string Education12Subject = "", string Education12Percentage = "",
                                       string Education12YearPass = "", string GraduateExamName = "", string GraduateExamBoard = "",
                                       string GraduateSubject = "", string GraduatePercentage = "", string GraduateYearPass = "",
                                       string PostGraduateExamName = "", string PostGraduationExamBoard = "", string PostGraduationSubject = "",
                                       string PostGraduationPercentage = "", string PostGraduationYearPass = "",
                                       string Certificate1Name = "", string Certificate1YearPass = "",
                                       string Certificate2Name = "", string Certificate2YearPass = "",
                                       string Certificate3Name = "", string Certificate3YearPass = "",
                                       string Skill = "",List<CompanyDetails> CompanyDetails=null)
        {
            
          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[119];


            objParam[0] = new SqlParameter("@EmpId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = EmpId;


            objParam[1] = new SqlParameter("@EmpName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Name;


            objParam[2] = new SqlParameter("@Branchcode", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Branch;

            DateTime dt_DOB = new DateTime();
            if (!string.IsNullOrEmpty(DOB))
            {
                dt_DOB = Convert.ToDateTime(DOB);
            }

            objParam[3] = new SqlParameter("@DOB", SqlDbType.DateTime);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = dt_DOB;


            if (!string.IsNullOrEmpty(DOJ))
            {
                objParam[4] = new SqlParameter("@DOJ", SqlDbType.DateTime);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = Convert.ToDateTime(DOJ);
            }
            else
            {
                objParam[4] = new SqlParameter("@DOJ", SqlDbType.DateTime);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = DBNull.Value;
            }

            objParam[5] = new SqlParameter("@PresentDesignation", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Designation;

            objParam[6] = new SqlParameter("@PresentDepartId", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Department;

            objParam[7] = new SqlParameter("@EmpPhotoImage", SqlDbType.VarBinary);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = Encoding.UTF8.GetBytes(ProfileImage);

            objParam[8] = new SqlParameter("@Area", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Area;

            objParam[9] = new SqlParameter("@FatherName", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = FatherName;

            objParam[10] = new SqlParameter("@MotherName", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = MotherName;

            objParam[11] = new SqlParameter("@SpouseName", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = SpouseName;

            objParam[12] = new SqlParameter("@Division", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = Division;

            objParam[13] = new SqlParameter("@Grade", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = Grade;

            objParam[14] = new SqlParameter("@PresentResNo", SqlDbType.NVarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = PresentAddrResNo;

            objParam[15] = new SqlParameter("@PresentResName", SqlDbType.NVarChar);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = PresentAddrResName;

            objParam[16] = new SqlParameter("@PresentRoadStreet", SqlDbType.NVarChar);
            objParam[16].Direction = ParameterDirection.Input;
            objParam[16].Value = PresentAddrRoad;

            objParam[17] = new SqlParameter("@PresentPinNo", SqlDbType.NVarChar);
            objParam[17].Direction = ParameterDirection.Input;
            objParam[17].Value = PresentAddrPin;

            objParam[18] = new SqlParameter("@PresentPost", SqlDbType.NVarChar);
            objParam[18].Direction = ParameterDirection.Input;
            objParam[18].Value = PresentAddrPost;

            objParam[19] = new SqlParameter("@PresentState", SqlDbType.NVarChar);
            objParam[19].Direction = ParameterDirection.Input;
            objParam[19].Value = PresentAddrState;

            objParam[20] = new SqlParameter("@PresentDistrict", SqlDbType.NVarChar);
            objParam[20].Direction = ParameterDirection.Input;
            objParam[20].Value = PresentAddrDistrict;

            objParam[21] = new SqlParameter("@PermanentResNo", SqlDbType.NVarChar);
            objParam[21].Direction = ParameterDirection.Input;
            objParam[21].Value = PermAddrResNo;

            objParam[22] = new SqlParameter("@PermanentResName", SqlDbType.NVarChar);
            objParam[22].Direction = ParameterDirection.Input;
            objParam[22].Value = PermAddrResName;

            objParam[23] = new SqlParameter("@PermanentRoadStreet", SqlDbType.NVarChar);
            objParam[23].Direction = ParameterDirection.Input;
            objParam[23].Value = PermAddrRoad;

            objParam[24] = new SqlParameter("@PermanentPinNo", SqlDbType.NVarChar);
            objParam[24].Direction = ParameterDirection.Input;
            objParam[24].Value = PermAddrPin;

            objParam[25] = new SqlParameter("@PermanentPost", SqlDbType.NVarChar);
            objParam[25].Direction = ParameterDirection.Input;
            objParam[25].Value = PermAddrPost;

            objParam[26] = new SqlParameter("@PermanentState", SqlDbType.NVarChar);
            objParam[26].Direction = ParameterDirection.Input;
            objParam[26].Value = PermAddrState;

            objParam[27] = new SqlParameter("@PermanentDistrict", SqlDbType.NVarChar);
            objParam[27].Direction = ParameterDirection.Input;
            objParam[27].Value = PermAddrDistrict;

            objParam[28] = new SqlParameter("@AdharNo", SqlDbType.NVarChar);
            objParam[28].Direction = ParameterDirection.Input;
            objParam[28].Value = AdharNo;

            objParam[29] = new SqlParameter("@AdharNoImage", SqlDbType.VarBinary);
            objParam[29].Direction = ParameterDirection.Input;
            objParam[29].Value = string.IsNullOrEmpty(AdharImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(AdharImage);//DBNull.Value;

            objParam[30] = new SqlParameter("@VoterNo", SqlDbType.NVarChar);
            objParam[30].Direction = ParameterDirection.Input;
            objParam[30].Value = VoterNo;

            objParam[31] = new SqlParameter("@VoterImage", SqlDbType.VarBinary);
            objParam[31].Direction = ParameterDirection.Input;
            objParam[31].Value = string.IsNullOrEmpty(VoterImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(VoterImage);//DBNull.Value;

            objParam[32] = new SqlParameter("@PanNo", SqlDbType.NVarChar);
            objParam[32].Direction = ParameterDirection.Input;
            objParam[32].Value = PANNo;

            objParam[33] = new SqlParameter("@PanNoImage", SqlDbType.VarBinary);
            objParam[33].Direction = ParameterDirection.Input;
            objParam[33].Value = string.IsNullOrEmpty(PANImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(PANImage);//DBNull.Value;

            objParam[34] = new SqlParameter("@Passport", SqlDbType.NVarChar);
            objParam[34].Direction = ParameterDirection.Input;
            objParam[34].Value = PassportNo;

            objParam[35] = new SqlParameter("@PassportImage", SqlDbType.VarBinary);
            objParam[35].Direction = ParameterDirection.Input;
            objParam[35].Value = string.IsNullOrEmpty(PassportImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(PassportImage);// DBNull.Value;

            objParam[36] = new SqlParameter("@DrivingNo", SqlDbType.NVarChar);
            objParam[36].Direction = ParameterDirection.Input;
            objParam[36].Value = DrivingLicense;

            objParam[37] = new SqlParameter("@DrivingNoImage", SqlDbType.VarBinary);
            objParam[37].Direction = ParameterDirection.Input;
            objParam[37].Value = string.IsNullOrEmpty(DrivingLicenseImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(DrivingLicenseImage);//DBNull.Value;

            objParam[38] = new SqlParameter("@IfscCode", SqlDbType.NVarChar);
            objParam[38].Direction = ParameterDirection.Input;
            objParam[38].Value = IFSC;

            objParam[39] = new SqlParameter("@BankBranchName", SqlDbType.NVarChar);
            objParam[39].Direction = ParameterDirection.Input;
            objParam[39].Value = BankBranch;

            objParam[40] = new SqlParameter("@BankName", SqlDbType.NVarChar);
            objParam[40].Direction = ParameterDirection.Input;
            objParam[40].Value = BankName;

            objParam[41] = new SqlParameter("@AcNumber", SqlDbType.NVarChar);
            objParam[41].Direction = ParameterDirection.Input;
            objParam[41].Value = AcNumber;

            objParam[42] = new SqlParameter("@BankImage", SqlDbType.VarBinary);
            objParam[42].Direction = ParameterDirection.Input;
            objParam[42].Value = Encoding.UTF8.GetBytes(AccountImage);//DBNull.Value;

            objParam[43] = new SqlParameter("@PfNo", SqlDbType.NVarChar);
            objParam[43].Direction = ParameterDirection.Input;
            objParam[43].Value = PFNo;

            objParam[44] = new SqlParameter("@EsiNo", SqlDbType.NVarChar);
            objParam[44].Direction = ParameterDirection.Input;
            objParam[44].Value = ESINo;

            objParam[45] = new SqlParameter("@Sex", SqlDbType.NVarChar);
            objParam[45].Direction = ParameterDirection.Input;
            objParam[45].Value = Sex;

            objParam[46] = new SqlParameter("@MaritalStatus", SqlDbType.NVarChar);
            objParam[46].Direction = ParameterDirection.Input;
            objParam[46].Value = MaritalStatus;

            objParam[47] = new SqlParameter("@MobileNo", SqlDbType.NVarChar);
            objParam[47].Direction = ParameterDirection.Input;
            objParam[47].Value = MobileNo;

            objParam[48] = new SqlParameter("@EmailAddress", SqlDbType.NVarChar);
            objParam[48].Direction = ParameterDirection.Input;
            objParam[48].Value = Email;

            objParam[49] = new SqlParameter("@Religion", SqlDbType.NVarChar);
            objParam[49].Direction = ParameterDirection.Input;
            objParam[49].Value = Religion;

            objParam[50] = new SqlParameter("@Caste", SqlDbType.NVarChar);
            objParam[50].Direction = ParameterDirection.Input;
            objParam[50].Value = Caste;

            objParam[51] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[51].Direction = ParameterDirection.Input;
            objParam[51].Value = LoginUser;

            objParam[52] = new SqlParameter("@CardNo", SqlDbType.NVarChar);
            objParam[52].Direction = ParameterDirection.Input;
            objParam[52].Value = CardNo;
            //===================================================
            
            if (!string.IsNullOrEmpty(FatherDOB))
            {
                dt_DOB = Convert.ToDateTime(FatherDOB);
                objParam[53] = new SqlParameter("@FatherDOB", SqlDbType.NVarChar);
                objParam[53].Direction = ParameterDirection.Input;
                objParam[53].Value = dt_DOB;
            }
            else
            {
                objParam[53] = new SqlParameter("@FatherDOB", SqlDbType.NVarChar);
                objParam[53].Direction = ParameterDirection.Input;
                objParam[53].Value = DBNull.Value;
            }

            objParam[54] = new SqlParameter("@FatherAdharNo", SqlDbType.NVarChar);
            objParam[54].Direction = ParameterDirection.Input;
            objParam[54].Value = FatherAdharNo;


            objParam[55] = new SqlParameter("@FatherAdharNoImage", SqlDbType.VarBinary);
            objParam[55].Direction = ParameterDirection.Input;
            objParam[55].Value = string.IsNullOrEmpty(FatherAdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(FatherAdharNoImage);// DBNull.Value;

          
            if (!string.IsNullOrEmpty(MotherDOB))
            {
                dt_DOB = Convert.ToDateTime(MotherDOB);
                objParam[56] = new SqlParameter("@MotherDOB", SqlDbType.NVarChar);
                objParam[56].Direction = ParameterDirection.Input;
                objParam[56].Value = dt_DOB;
            }
            else
            {
                objParam[56] = new SqlParameter("@MotherDOB", SqlDbType.NVarChar);
                objParam[56].Direction = ParameterDirection.Input;
                objParam[56].Value = DBNull.Value;
            }

            objParam[57] = new SqlParameter("@MotherAdharNo", SqlDbType.NVarChar);
            objParam[57].Direction = ParameterDirection.Input;
            objParam[57].Value = MotherAdharNo;

            objParam[58] = new SqlParameter("@MotherAdharNoImage", SqlDbType.VarBinary);
            objParam[58].Direction = ParameterDirection.Input;
            objParam[58].Value = string.IsNullOrEmpty(MotherAdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(MotherAdharNoImage);// DBNull.Value; ;

            if (!string.IsNullOrEmpty(SpouseDOB))
            {
                dt_DOB = Convert.ToDateTime(SpouseDOB);
                objParam[59] = new SqlParameter("@SpouseDOB", SqlDbType.NVarChar);
                objParam[59].Direction = ParameterDirection.Input;
                objParam[59].Value = dt_DOB;
            }
           else
            {
                objParam[59] = new SqlParameter("@SpouseDOB", SqlDbType.NVarChar);
                objParam[59].Direction = ParameterDirection.Input;
                objParam[59].Value = DBNull.Value;
            }

            objParam[60] = new SqlParameter("@SpouseAdharNo", SqlDbType.NVarChar);
            objParam[60].Direction = ParameterDirection.Input;
            objParam[60].Value = SpouseAdharNo;


            objParam[61] = new SqlParameter("@SpouseAdharNoImage", SqlDbType.VarBinary);
            objParam[61].Direction = ParameterDirection.Input;
            objParam[61].Value = string.IsNullOrEmpty(SpouseAdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(SpouseAdharNoImage); 

            objParam[62] = new SqlParameter("@Family1Name", SqlDbType.NVarChar);
            objParam[62].Direction = ParameterDirection.Input;
            objParam[62].Value = Family1Name;

            objParam[63] = new SqlParameter("@Family1Relation", SqlDbType.NVarChar);
            objParam[63].Direction = ParameterDirection.Input;
            objParam[63].Value = Family1Relation;

            if (!string.IsNullOrEmpty(Family1DOB))
            {
                dt_DOB = Convert.ToDateTime(Family1DOB);
                objParam[64] = new SqlParameter("@Family1DOB", SqlDbType.NVarChar);
                objParam[64].Direction = ParameterDirection.Input;
                objParam[64].Value = dt_DOB;
            }
            else
            {
                objParam[64] = new SqlParameter("@Family1DOB", SqlDbType.NVarChar);
                objParam[64].Direction = ParameterDirection.Input;
                objParam[64].Value = DBNull.Value;
            }
            objParam[65] = new SqlParameter("@Family1AdharNo", SqlDbType.NVarChar);
            objParam[65].Direction = ParameterDirection.Input;
            objParam[65].Value = Family1AdharNo;

            objParam[66] = new SqlParameter("@Family1AdharNoImage", SqlDbType.VarBinary);
            objParam[66].Direction = ParameterDirection.Input;
            objParam[66].Value = string.IsNullOrEmpty(Family1AdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(Family1AdharNoImage);

            objParam[67] = new SqlParameter("@Family2Name", SqlDbType.NVarChar);
            objParam[67].Direction = ParameterDirection.Input;
            objParam[67].Value = Family2Name;

            objParam[68] = new SqlParameter("@Family2Relation", SqlDbType.NVarChar);
            objParam[68].Direction = ParameterDirection.Input;
            objParam[68].Value = Family2Relation;

            if (!string.IsNullOrEmpty(Family2DOB))
            {
                dt_DOB = Convert.ToDateTime(Family2DOB);
                objParam[69] = new SqlParameter("@Family2DOB", SqlDbType.NVarChar);
                objParam[69].Direction = ParameterDirection.Input;
                objParam[69].Value = dt_DOB;
            }
            else
            {
                objParam[69] = new SqlParameter("@Family2DOB", SqlDbType.NVarChar);
                objParam[69].Direction = ParameterDirection.Input;
                objParam[69].Value = DBNull.Value;
            }
            objParam[70] = new SqlParameter("@Family2AdharNo", SqlDbType.NVarChar);
            objParam[70].Direction = ParameterDirection.Input;
            objParam[70].Value = Family2AdharNo;

            objParam[71] = new SqlParameter("@Family2AdharNoImage", SqlDbType.VarBinary);
            objParam[71].Direction = ParameterDirection.Input;
            objParam[71].Value = string.IsNullOrEmpty(Family2AdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(Family2AdharNoImage);

            objParam[72] = new SqlParameter("@Family3Name", SqlDbType.NVarChar);
            objParam[72].Direction = ParameterDirection.Input;
            objParam[72].Value = Family3Name;

            objParam[73] = new SqlParameter("@Family3Relation", SqlDbType.NVarChar);
            objParam[73].Direction = ParameterDirection.Input;
            objParam[73].Value = Family3Relation;

            if (!string.IsNullOrEmpty(Family3DOB))
            {
                dt_DOB = Convert.ToDateTime(Family3DOB);
                objParam[74] = new SqlParameter("@Family3DOB", SqlDbType.NVarChar);
                objParam[74].Direction = ParameterDirection.Input;
                objParam[74].Value = dt_DOB;
            }
            else
            {
                objParam[74] = new SqlParameter("@Family3DOB", SqlDbType.NVarChar);
                objParam[74].Direction = ParameterDirection.Input;
                objParam[74].Value = DBNull.Value;
            }
            objParam[75] = new SqlParameter("@Family3AdharNo", SqlDbType.NVarChar);
            objParam[75].Direction = ParameterDirection.Input;
            objParam[75].Value = Family3AdharNo;

            objParam[76] = new SqlParameter("@Family3AdharNoImage", SqlDbType.VarBinary);
            objParam[76].Direction = ParameterDirection.Input;
            objParam[76].Value = string.IsNullOrEmpty(Family3AdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(Family3AdharNoImage);

            objParam[77] = new SqlParameter("@Family4Name", SqlDbType.NVarChar);
            objParam[77].Direction = ParameterDirection.Input;
            objParam[77].Value = Family4Name;

            objParam[78] = new SqlParameter("@Family4Relation", SqlDbType.NVarChar);
            objParam[78].Direction = ParameterDirection.Input;
            objParam[78].Value = Family4Relation;

            if (!string.IsNullOrEmpty(Family4DOB))
            {
                dt_DOB = Convert.ToDateTime(Family4DOB);
                objParam[79] = new SqlParameter("@Family4DOB", SqlDbType.NVarChar);
                objParam[79].Direction = ParameterDirection.Input;
                objParam[79].Value = dt_DOB;
            }
            else
            {
                objParam[79] = new SqlParameter("@Family4DOB", SqlDbType.NVarChar);
                objParam[79].Direction = ParameterDirection.Input;
                objParam[79].Value = DBNull.Value;
            }
            objParam[80] = new SqlParameter("@Family4AdharNo", SqlDbType.NVarChar);
            objParam[80].Direction = ParameterDirection.Input;
            objParam[80].Value = Family4AdharNo;

            objParam[81] = new SqlParameter("@Family4AdharNoImage", SqlDbType.VarBinary);
            objParam[81].Direction = ParameterDirection.Input;
            objParam[81].Value = string.IsNullOrEmpty(Family4AdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(Family4AdharNoImage);

            objParam[82] = new SqlParameter("@Family5Name", SqlDbType.NVarChar);
            objParam[82].Direction = ParameterDirection.Input;
            objParam[82].Value = Family5Name;

            objParam[83] = new SqlParameter("@Family5Relation", SqlDbType.NVarChar);
            objParam[83].Direction = ParameterDirection.Input;
            objParam[83].Value = Family5Relation;

            if (!string.IsNullOrEmpty(Family5DOB))
            {
                dt_DOB = Convert.ToDateTime(Family5DOB);
                objParam[84] = new SqlParameter("@Family5DOB", SqlDbType.NVarChar);
                objParam[84].Direction = ParameterDirection.Input;
                objParam[84].Value = dt_DOB;
            }
            else
            {
                objParam[84] = new SqlParameter("@Family5DOB", SqlDbType.NVarChar);
                objParam[84].Direction = ParameterDirection.Input;
                objParam[84].Value = DBNull.Value;
            }
            objParam[85] = new SqlParameter("@Family5AdharNo", SqlDbType.NVarChar);
            objParam[85].Direction = ParameterDirection.Input;
            objParam[85].Value = Family5AdharNo;

            objParam[86] = new SqlParameter("@Family5AdharNoImage", SqlDbType.VarBinary);
            objParam[86].Direction = ParameterDirection.Input;
            objParam[86].Value = string.IsNullOrEmpty(Family5AdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(Family5AdharNoImage);


            objParam[87] = new SqlParameter("@NomineeName", SqlDbType.NVarChar);
            objParam[87].Direction = ParameterDirection.Input;
            objParam[87].Value = NomineeName;

            objParam[88] = new SqlParameter("@NomineeRelation", SqlDbType.NVarChar);
            objParam[88].Direction = ParameterDirection.Input;
            objParam[88].Value = NomineeRelation;

            if (!string.IsNullOrEmpty(NomineeDOB))
            {
                dt_DOB = Convert.ToDateTime(NomineeDOB);
                objParam[89] = new SqlParameter("@NomineeDOB", SqlDbType.NVarChar);
                objParam[89].Direction = ParameterDirection.Input;
                objParam[89].Value = dt_DOB;
            }
            else
            {
                objParam[89] = new SqlParameter("@NomineeDOB", SqlDbType.NVarChar);
                objParam[89].Direction = ParameterDirection.Input;
                objParam[89].Value = DBNull.Value;
            }
            objParam[90] = new SqlParameter("@NomineeAdharNo", SqlDbType.NVarChar);
            objParam[90].Direction = ParameterDirection.Input;
            objParam[90].Value = NomineeAdharNo;

            objParam[91] = new SqlParameter("@NomineeAdharNoImage", SqlDbType.VarBinary);
            objParam[91].Direction = ParameterDirection.Input;
            objParam[91].Value = string.IsNullOrEmpty(NomineeAdharNoImage) ? DBNull.Value : (object)Encoding.UTF8.GetBytes(NomineeAdharNoImage);

            ///------------------------------------------
            objParam[92] = new SqlParameter("@Education10ExamName", SqlDbType.NVarChar);
            objParam[92].Direction = ParameterDirection.Input;
            objParam[92].Value = Education10ExamName;

            objParam[93] = new SqlParameter("@Education10ExamBoard", SqlDbType.NVarChar);
            objParam[93].Direction = ParameterDirection.Input;
            objParam[93].Value = Education10ExamBoard;

            objParam[94] = new SqlParameter("@Education10Subject", SqlDbType.NVarChar);
            objParam[94].Direction = ParameterDirection.Input;
            objParam[94].Value = Education10Subject;

            objParam[95] = new SqlParameter("@Education10Percentage", SqlDbType.NVarChar);
            objParam[95].Direction = ParameterDirection.Input;
            objParam[95].Value = Education10Percentage;

            objParam[96] = new SqlParameter("@Education10YearPass", SqlDbType.NVarChar);
            objParam[96].Direction = ParameterDirection.Input;
            objParam[96].Value = Education10YearPass;

            objParam[97] = new SqlParameter("@Education12ExamName", SqlDbType.NVarChar);
            objParam[97].Direction = ParameterDirection.Input;
            objParam[97].Value = Education12ExamName;

            objParam[98] = new SqlParameter("@Education12ExamBoard", SqlDbType.NVarChar);
            objParam[98].Direction = ParameterDirection.Input;
            objParam[98].Value = Education12ExamBoard;

            objParam[99] = new SqlParameter("@Education12Subject", SqlDbType.NVarChar);
            objParam[99].Direction = ParameterDirection.Input;
            objParam[99].Value = Education12Subject;

            objParam[100] = new SqlParameter("@Education12Percentage", SqlDbType.NVarChar);
            objParam[100].Direction = ParameterDirection.Input;
            objParam[100].Value = Education12Percentage;

            objParam[101] = new SqlParameter("@Education12YearPass", SqlDbType.NVarChar);
            objParam[101].Direction = ParameterDirection.Input;
            objParam[101].Value = Education12YearPass;

            objParam[102] = new SqlParameter("@GraduateExamName", SqlDbType.NVarChar);
            objParam[102].Direction = ParameterDirection.Input;
            objParam[102].Value = GraduateExamName;

            objParam[103] = new SqlParameter("@GraduateExamBoard", SqlDbType.NVarChar);
            objParam[103].Direction = ParameterDirection.Input;
            objParam[103].Value = GraduateExamBoard;

            objParam[104] = new SqlParameter("@GraduateSubject", SqlDbType.NVarChar);
            objParam[104].Direction = ParameterDirection.Input;
            objParam[104].Value = GraduateSubject;

            objParam[105] = new SqlParameter("@GraduatePercentage", SqlDbType.NVarChar);
            objParam[105].Direction = ParameterDirection.Input;
            objParam[105].Value = GraduatePercentage;

            objParam[106] = new SqlParameter("@GraduateYearPass", SqlDbType.NVarChar);
            objParam[106].Direction = ParameterDirection.Input;
            objParam[106].Value = GraduateYearPass;

            objParam[107] = new SqlParameter("@PostGraduateExamName", SqlDbType.NVarChar);
            objParam[107].Direction = ParameterDirection.Input;
            objParam[107].Value = PostGraduateExamName;

            objParam[108] = new SqlParameter("@PostGraduationExamBoard", SqlDbType.NVarChar);
            objParam[108].Direction = ParameterDirection.Input;
            objParam[108].Value = PostGraduationExamBoard;

            objParam[109] = new SqlParameter("@PostGraduationSubject", SqlDbType.NVarChar);
            objParam[109].Direction = ParameterDirection.Input;
            objParam[109].Value = PostGraduationSubject;

            objParam[110] = new SqlParameter("@PostGraduationPercentage", SqlDbType.NVarChar);
            objParam[110].Direction = ParameterDirection.Input;
            objParam[110].Value = PostGraduationPercentage;

            objParam[111] = new SqlParameter("@PostGraduationYearPass", SqlDbType.NVarChar);
            objParam[111].Direction = ParameterDirection.Input;
            objParam[111].Value = PostGraduationYearPass;

            objParam[112] = new SqlParameter("@Certificate1Name", SqlDbType.NVarChar);
            objParam[112].Direction = ParameterDirection.Input;
            objParam[112].Value = Certificate1Name;

            objParam[113] = new SqlParameter("@Certificate1YearPass", SqlDbType.NVarChar);
            objParam[113].Direction = ParameterDirection.Input;
            objParam[113].Value = Certificate1YearPass;

            objParam[114] = new SqlParameter("@Certificate2Name", SqlDbType.NVarChar);
            objParam[114].Direction = ParameterDirection.Input;
            objParam[114].Value = Certificate2Name;

            objParam[115] = new SqlParameter("@Certificate2YearPass", SqlDbType.NVarChar);
            objParam[115].Direction = ParameterDirection.Input;
            objParam[115].Value = Certificate2YearPass;

            objParam[116]= new SqlParameter("@Certificate3Name", SqlDbType.NVarChar);
            objParam[116].Direction = ParameterDirection.Input;
            objParam[116].Value = Certificate3Name;

            objParam[117] = new SqlParameter("@Certificate3YearPass", SqlDbType.NVarChar);
            objParam[117].Direction = ParameterDirection.Input;
            objParam[117].Value = Certificate3YearPass;

            objParam[118] = new SqlParameter("@Skill", SqlDbType.NVarChar);
            objParam[118].Direction = ParameterDirection.Input;
            objParam[118].Value = Skill;

            // Rest of the method...

            var result = objMain.ExecuteProcedure("procHrEmpCreateUpdateEmploye", objParam);

           
            if (!string.IsNullOrEmpty(EmpId) && CompanyDetails!=null && CompanyDetails.Count > 0)
            {
                StringBuilder strBuild = new StringBuilder();
                strBuild.Append("<XMLData>");
                strBuild.Append("<CreateUser>" + LoginUser + "</CreateUser>");
                strBuild.Append("<EmpId>" + EmpId + "</EmpId>");
                strBuild.Append("<CompanyDetails>");

                foreach (var item in CompanyDetails)
                {
                    strBuild.Append("<CompanyDetail>");

                    strBuild.Append("<CompanyName>" + item.CompanyName + "</CompanyName>");
                    strBuild.Append("<CompanyAddress>" + item.CompanyAddress + "</CompanyAddress>");
                    strBuild.Append("<CompanyWebSiteUrl>" + item.CompanyWebSiteUrl + "</CompanyWebSiteUrl>");
                    strBuild.Append("<CompanyEmail>" + item.CompanyEmail + "</CompanyEmail>");
                    strBuild.Append("<CompanyPhNo>" + item.CompanyPhNo + "</CompanyPhNo>");
                    strBuild.Append("<Designation>" + item.Designation + "</Designation>");
                    strBuild.Append("<Role>" + item.Role + "</Role>");
                    strBuild.Append("<LastCTC>" + item.LastCTC + "</LastCTC>");
                    strBuild.Append("<FromDate>" + item.FromDate?.ToString("yyyy-MM-dd") + "</FromDate>");
                    strBuild.Append("<ToDate>" + item.ToDate?.ToString("yyyy-MM-dd") + "</ToDate>");
                    strBuild.Append("<ReportPersonName>" + item.ReportPersonName + "</ReportPersonName>");
                    strBuild.Append("<ReportPersonContactNo>" + item.ReportPersonContactNo + "</ReportPersonContactNo>");
                    strBuild.Append("<Description>" + item.Description + "</Description>");

                    strBuild.Append("</CompanyDetail>");
                }
                strBuild.Append("</CompanyDetails>");
                strBuild.Append("</XMLData>");
                objParam = new SqlParameter[1];


                objParam[0] = new SqlParameter("@XMLData", SqlDbType.Xml);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = strBuild.ToString();

                 result = objMain.ExecuteProcedure("procHrEmpMasterExperienceDetail", objParam);
            }

          

            return "";
        }

        [WebMethod]
        public static string FetchEmployeList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select e.EmpId,e.EmpName,e.Sex,e.FatherName,e.MotherName,e.SpouseName,e.MobileNo,
                                                e.EmailAddress,CONVERT(nvarchar,e.DOB,106) as DOB,CONVERT(nvarchar,e.DOJ,106) as DOJ,e.Religion,e.Caste,e.MaritalStatus,d.DeptName,dv.DivisionName,
                                                dm.DesignationName,g.GradeName,a.AreaName,br.BranchName
                                                from tblHrEmpMaster e left join tblHrDeptMaster d on e.PresentDepartId=d.Id
                                                left join tblHrDivisionMaster dv on e.Division=dv.ID
                                                left join tblHrDesignationMaster dm on e.PresentDesignation=dm.ID
                                                left join tblHrGradeMaster g on e.Grade=g.ID
                                                left join tblHrAreaMaster a on e.Area=a.Id
                                                join tblHrBranchMaster br on e.Branchcode=br.BranchCode");
            }
            catch (Exception ex)
            {
               // return "";
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            //  return JsonConvert.SerializeObject(dtEmpList,settings);


            string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            dtEmpList = null;
            return json;

        }




        [WebMethod]
        public static string FetchEmployeeDetails(string EmpId="")
        {
           // clsMain objMain = new clsMain();
            DataTable dtEmpList = new DataTable();
            DataTable dtEmpExpList = new DataTable();
            try
            {

                dtEmpList = objMain.dtFetchData(@"select *,Cast(AdharNoImage as varchar(max)) formattedAdharNoImage,
Cast(VoterImage as varchar(max)) formattedVoterImage,Cast(PanNoImage as varchar(max)) formattedPanNoImage,
Cast(BankImage as varchar(max)) formattedBankImage,Cast(PassportImage as varchar(max)) formattedPassportImage,
Cast(EmpPhotoImage as varchar(max)) formattedEmpPhotoImage,Cast(DrivingNoImage as varchar(max)) formattedDrivingNoImage,
Cast(FatherAdharNoImage as varchar(max)) formattedFatherAdharNoImage,Cast(MotherAdharNoImage as varchar(max)) formattedMotherAdharNoImage,
Cast(SpouseAdharNoImage as varchar(max)) formattedSpouseAdharNoImage,Cast(Family1AdharNoImage as varchar(max)) formattedFamily1AdharNoImage,
Cast(Family2AdharNoImage as varchar(max)) formattedFamily2AdharNoImage,
Cast(Family3AdharNoImage as varchar(max)) formattedFamily3AdharNoImage,
Cast(Family4AdharNoImage as varchar(max)) formattedFamily4AdharNoImage,
Cast(Family5AdharNoImage as varchar(max)) formattedFamily5AdharNoImage from tblHrEmpMaster where EmpId='" + EmpId+"'");

                dtEmpExpList = objMain.dtFetchData(@"select * from tblHrEmpMasterEexperienceDetail
where EmpId='" + EmpId + "'");

            }
            catch (Exception ex)
            {
                // return "";
            }

            var combinedResult = new
            {
                EmployeeDetails = dtEmpList,
                EmployeeExperienceDetails = dtEmpExpList
            };

            string json = JsonConvert.SerializeObject(combinedResult, Formatting.None);
            //string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            return json;


            // string json = JsonConvert.SerializeObject(dtEmpList, Formatting.None);
            //  dtEmpList = null;
            //  return json;


        }

        [WebMethod]
        public static string CheckEmployeeCardNoAvailability(string EmpId, string CardNo)
        {
          //  clsMain objMain = new clsMain();
            bool CheckEmpCardNo = new bool();

            try
            {

                if (CardNo.Trim() != "")
                {
                    CheckEmpCardNo = objMain.blSearchDataHO("select EmpId FROM [tblHrEmpMaster] where EmpId !='" + EmpId + "' and CardNo='"+CardNo+"'");
                }
                else
                {
                    CheckEmpCardNo = false;
                }
            }
            catch (Exception ex)
            {
                return "False";
            }

            return JsonConvert.SerializeObject(CheckEmpCardNo.ToString());
        }

        [WebMethod]
        public static string GenerateEmployeeID()
        {
            DataTable dtNewEmpID = new DataTable();

            try
            {


                dtNewEmpID = objMain.dtFetchData(@"DECLARE @EmpIdPrefix NVARCHAR(10);
DECLARE @EmpIdMaxDigit INT;
DECLARE @NewEmpId NVARCHAR(20);
DECLARE @MaxEmpId NVARCHAR(20);

-- Step 1: Get EmpIdPrefix and EmpIdMaxDigit from tblHrSetup
SELECT 
    @EmpIdPrefix = EmpIdPrefix, 
    @EmpIdMaxDigit = EmpIdMaxDigit 
FROM 
    tblHrSetup;

-- Step 2: Find the maximum existing EmpId that starts with the prefix
SELECT 
    @MaxEmpId = MAX(EmpId) 
FROM 
    tblHrEmpMaster 
WHERE 
    EmpId LIKE @EmpIdPrefix + '%';

-- Step 3: Extract numeric part from @MaxEmpId and increment it
IF @MaxEmpId IS NULL
BEGIN
    -- If no existing EmpId, start with 1
    SET @NewEmpId = @EmpIdPrefix + RIGHT(REPLICATE('0', @EmpIdMaxDigit) + '1', @EmpIdMaxDigit);
END
ELSE
BEGIN
    -- Extract numeric part from the existing max EmpId
    DECLARE @MaxNumericPart INT;
    SET @MaxNumericPart = CAST(SUBSTRING(@MaxEmpId, LEN(@EmpIdPrefix) + 1, @EmpIdMaxDigit) AS INT);

    -- Increment the numeric part
    SET @MaxNumericPart = @MaxNumericPart + 1;

    -- Generate the new EmpId
    SET @NewEmpId = @EmpIdPrefix + RIGHT(REPLICATE('0', @EmpIdMaxDigit) + CAST(@MaxNumericPart AS NVARCHAR), @EmpIdMaxDigit);
END

-- Step 4: Insert the new EmpId into tblHrEmpMaster (for demonstration purposes, replace with actual insert logic)
-- INSERT INTO tblHrEmpMaster (EmpId, ...) VALUES (@NewEmpId, ...);

-- Output the new EmpId
SELECT @NewEmpId AS NewEmpId;");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtNewEmpID);
        }
    }
}