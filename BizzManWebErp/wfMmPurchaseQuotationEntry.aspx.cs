using BizzManWebErp.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using System.Xml;
using System.Linq;
using System.Xml.Linq;

namespace BizzManWebErp
{
    public partial class wfMmPurchaseQuotationEntry : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

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

        //===================error on 12/04/2024  ============
        /*
        [WebMethod]
        public static string GetDeptDetails()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select DeptName, Id from tblHrDeptMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }
        //=============================
        */


         

        [WebMethod]
        public static string GetRequsitionNotes()
        {
           // clsMain objMain = new clsMain();
            DataTable dtRequisitionNotesList = new DataTable();

            try
            {
                dtRequisitionNotesList = objMain.dtFetchData("select trn.RequisitionId, trn.RequisitionNote, " +
                    "bm.BranchCode, hm.Id as DeptId from " +
                    "tblMmMaterialRequisitionNote trn " +
                    "inner join tblHrBranchMaster bm on bm.BranchCode = trn.BranchCode " +
                    "inner join tblHrDeptMaster hm on hm.Id = trn.DepartmentId" +
                    " where trn.Active = 'N'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtRequisitionNotesList);
        }
        [WebMethod]
        public static string GetVendorDetails()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtVendorList = new DataTable();

            try
            {

                dtVendorList = objMain.dtFetchData("select Id, VendorName as [Name] from tblMmVendorMaster");
            }
            catch (Exception)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtVendorList);
        }

        [WebMethod]
        public static string GetMaterialMasterDetails(string RequistionId, bool IsUpdate=false)
        {
          //  clsMain objMain = new clsMain();
            try
            {
                int lowerLimit = IsUpdate ? -1 : 0;
                DataTable dtMaterialMasterList = objMain.dtFetchData(string.Format(@"select mm.Id,CONVERT(VARCHAR(20),mm.Id) + ': ' + mm.MaterialName AS [Name],Cast(sum(mid.QuotationBalanceQty) as int) as QuotationBalanceQty 
                                                            from tblMmMaterialMaster mm
                                                            inner join tblMmMaterialIndentDetail mid on mid.MaterialMasterId=mm.Id
                                                            inner join tblMmMaterialIndentMaster mim on mim.Id=mid.MaterialIndentMasterId
                                                            where mim.MaterialRequisitionNoteId='{0}'
                                                            group by mid.MaterialMasterId,mm.Id,mm.MaterialName
                                                            having sum(mid.QuotationBalanceQty)>{1}", RequistionId, lowerLimit));
                
              return JsonConvert.SerializeObject(dtMaterialMasterList);
            }
            catch (Exception)
            {
                return "";
            }
        }
        public static string GetMaterialIndentDetails(string RequistionId)
        {
          //  clsMain objMain = new clsMain();
            try
            {
                DataTable dtMaterialIndentDetails = objMain.dtFetchData(string.Format(@"select mm.Id as materialMasterId,mid.Id as IndentDetailId,Cast(mid.QuotationBalanceQty as int) as QuotationBalanceQty
                                                            from tblMmMaterialMaster mm
                                                            inner join tblMmMaterialIndentDetail mid on mid.MaterialMasterId=mm.Id
                                                            inner join tblMmMaterialIndentMaster mim on mim.Id=mid.MaterialIndentMasterId
                                                            where mim.MaterialRequisitionNoteId='{0}'
															order by mm.Id, mid.Id", RequistionId));
                return JsonConvert.SerializeObject(dtMaterialIndentDetails);
            }
            catch (Exception)
            {
                return "";
            }
        }
        [WebMethod]
        public static string AddDetails(string quotationId, string quotationEntryDate, string requistionNote, string vendor, string quotation, string branch, int dept, string quotationDate, string quotationValidDate,string materialMaster, int isUpdate, string loginUser = "")
        {
            List<Quotation> objIndentDetailsList=null;
            List<MaterialMaster> objMaterialMasterList=null;
            string xml = "";

            if (!string.IsNullOrWhiteSpace(requistionNote))
            {
                objIndentDetailsList = JsonConvert.DeserializeObject<List<Quotation>>(GetMaterialIndentDetails(requistionNote));
            }
            if (!string.IsNullOrWhiteSpace(materialMaster))
            {
                objMaterialMasterList = JsonConvert.DeserializeObject<List<MaterialMaster>>(materialMaster);
            }
            if (objIndentDetailsList != null&& objIndentDetailsList.Count>0&& objMaterialMasterList!=null && objMaterialMasterList.Count>0)
            {
                xml = GenerateIndentDetailsXml(objIndentDetailsList, objMaterialMasterList, isUpdate);
            }
           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[12];

            objParam[0] = new SqlParameter("@QuotationId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = quotationId;

            objParam[1] = new SqlParameter("@RequisitionId", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = requistionNote;

            objParam[2] = new SqlParameter("@VendorId", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = vendor;

            objParam[3] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = loginUser;

            objParam[4] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = loginUser;

            DateTime dt_QuotationEntryDate = new DateTime();
            if (!string.IsNullOrEmpty(quotationEntryDate))
            {
                dt_QuotationEntryDate = Convert.ToDateTime(quotationEntryDate);
            }
            objParam[5] = new SqlParameter("@QuotationEntryDate", SqlDbType.DateTime);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = dt_QuotationEntryDate;

            objParam[6] = new SqlParameter("@QuotationDetails", SqlDbType.Xml);
            objParam[6].Direction = ParameterDirection.Input;
            XmlDocument doc = JsonConvert.DeserializeXmlNode(quotation,"MaterialMasterDetails");
            objParam[6].Value = doc.OuterXml;

            objParam[7] = new SqlParameter("@Branch", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = branch;

            objParam[8] = new SqlParameter("@Dept", SqlDbType.BigInt);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = dept;

            DateTime dt_QuotationDate = new DateTime();
            if (!string.IsNullOrEmpty(quotationDate))
            {
                dt_QuotationDate = Convert.ToDateTime(quotationDate);
            }
            objParam[9] = new SqlParameter("@QuotationDate", SqlDbType.DateTime);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = dt_QuotationDate;

            DateTime dt_QuotationValidDate = new DateTime();
            if (!string.IsNullOrEmpty(quotationValidDate))
            {
                dt_QuotationValidDate = Convert.ToDateTime(quotationValidDate);
            }
            objParam[10] = new SqlParameter("@QuotationValidDate", SqlDbType.DateTime);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = dt_QuotationValidDate;

            objParam[11] = new SqlParameter("@MaterialIndentDetails", SqlDbType.Xml);
            objParam[11].Direction = ParameterDirection.Input;
            XmlDocument doc1 = JsonConvert.DeserializeXmlNode(xml);
            objParam[11].Value = !string.IsNullOrWhiteSpace(xml)?doc1.OuterXml:null;

            var result = objMain.ExecuteProcedure("procMmMaterialPurchaseQuotationEntry", objParam);

            return "";
        }
        [WebMethod]
        public static string FetchQuotationMasterDetails()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtQuotationList = new DataTable();

            try
            {

                dtQuotationList = objMain.dtFetchData(@"select pqe.Id as QuotationId,CONVERT(nvarchar,QuotationEntryDate,106) as QuotationEntryDate,
                                                        trn.RequisitionNote,vm.VendorName,hm.DeptName,bm.BranchName, CONVERT(nvarchar,QuotationDate,106) as QuotationDate,
                                                        CONVERT(nvarchar,QuotationValidDate,106) as QuotationValidDate
                                                from tblMmMaterialPurchaseQuotationEntryMaster pqe
                                                inner join tblMmMaterialRequisitionNote trn on trn.RequisitionId=pqe.RequisitionId
                                                inner join tblMmVendorMaster vm on vm.Id=pqe.VendoreId
                                                inner join tblHrBranchMaster bm on bm.BranchCode=pqe.BranchCode
                                                inner join tblHrDeptMaster hm on hm.Id=pqe.DepartmentId");

            }
            catch (Exception)
            {
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Newtonsoft.Json.Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            return JsonConvert.SerializeObject(dtQuotationList, settings);
        }

        [WebMethod]
        public static List<string> FetchQuotationDetailsForId(string quoationId)
        {
         //   clsMain objMain = new clsMain();
            DataTable dtQuotationMasterList = new DataTable();
            DataTable dtQuotationDetails = new DataTable();
            try
            {

                dtQuotationMasterList = objMain.dtFetchData(string.Format(@"select pqe.Id as QuotationId,CONVERT(nvarchar,QuotationEntryDate,106) as QuotationEntryDate,trn.RequisitionId,
                                                                            trn.RequisitionNote,pqe.VendoreId, pqe.BranchCode, pqe.DepartmentId, CONVERT(nvarchar,QuotationDate,106) as QuotationDate,
                                                                            CONVERT(nvarchar,QuotationValidDate,106) as QuotationValidDate
                                                        from tblMmMaterialPurchaseQuotationEntryMaster pqe
                                                        inner join tblMmMaterialRequisitionNote trn on trn.RequisitionId=pqe.RequisitionId
                                                        where pqe.id='{0}'", quoationId));
                dtQuotationDetails = objMain.dtFetchData(string.Format(@"select MaterialMasterId,Qty,UnitPrice,TotalAmt, Description
                                                        from tblMmMaterialPurchaseQuotationEntryDetail where QuotationEntryMasterId='{0}'", quoationId));
            }
            catch (Exception)
            {
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Newtonsoft.Json.Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            List<string> str = new List<string>();
            str.Add(JsonConvert.SerializeObject(dtQuotationMasterList, settings));
            str.Add(JsonConvert.SerializeObject(dtQuotationDetails, settings));
            return str;
        }

        [WebMethod]
        public static string GetBranchDetails()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select BranchName, BranchCode from tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }

        [WebMethod]
        public static string GetDeptDetails()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select DeptName, Id from tblHrDeptMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }

        private static string GenerateIndentDetailsXml(List<Quotation> objIndentDetailsList, List<MaterialMaster> objMaterialMasterList, int isUpdate)
        {
            XElement materialIndentXml = new XElement("MaterialIndentDetails");
            if (isUpdate == 1)
            {
                return JsonConvert.SerializeObject(materialIndentXml);
            }
            var mmDict = objMaterialMasterList.Select(p => new { key = p.MaterialMasterId, value = p.Quantity }).ToDictionary(x => x.key, x => x.value);

            HashSet<int> sentIDs = new HashSet<int>(mmDict.Select(s => s.Key));

            objIndentDetailsList = objIndentDetailsList.Where(m => sentIDs.Contains(m.MaterialMasterId)).ToList();

            foreach (var item in objIndentDetailsList)
            {
                if (item.QuotationBalanceQty >= mmDict[item.MaterialMasterId])
                {
                    item.QuotationBalanceQty = item.QuotationBalanceQty - mmDict[item.MaterialMasterId];
                    mmDict[item.MaterialMasterId] = 0;
                }
                else
                {
                    mmDict[item.MaterialMasterId] = mmDict[item.MaterialMasterId] - item.QuotationBalanceQty;
                    item.QuotationBalanceQty = 0;
                }
            }

            
            foreach (var item in objIndentDetailsList)
            {
                XElement test = new XElement("MaterialIndentDetail",
                                     new XElement("MaterialIndentId", item.IndentDetailId),
                                     new XElement("QuotationBalanceQty", item.QuotationBalanceQty));
                materialIndentXml.Add(test);
            }
            
            //XmlDocument doc = JsonConvert.DeserializeXmlNode(JsonConvert.SerializeObject(objIndentDetailsList), "MaterialIndentDetails");
            return JsonConvert.SerializeObject(materialIndentXml);
        }
    }
}