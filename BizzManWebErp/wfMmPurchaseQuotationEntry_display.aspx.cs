using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfMmPurchaseQuotationEntry_display : System.Web.UI.Page
    {
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    //loginuser.Value = Session["Id"].ToString();
                    string id = Request.QueryString["id"];

                    //added on 12 Dec 2023
                    //############START###############
                    if (Session["objMain_Session"] != null)
                    {
                        objMain = (clsMain)Session["objMain_Session"];
                        //AddPaySlipContent(id);
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
        public static string FectchPurchaseDetails(string Id)
        {
            DataSet objDs = new DataSet();
            DataTable objdt = objMain.dtFetchData(@"select pqe.Id as Id,CONVERT(nvarchar,QuotationEntryDate,106) as QuotationEntryDate,trn.RequisitionId,trn.RequisitionNote,pqe.VendoreId,v.VendorName, pqe.BranchCode,b.BranchName, pqe.DepartmentId,DeptName, CONVERT(nvarchar,QuotationDate,106) as QuotationDate, CONVERT(nvarchar,QuotationValidDate,106) as QuotationValidDate,pqe.CreateUser,CONVERT(nvarchar,pqe.CreateDate,106) as CreateDate
                                                        from tblMmMaterialPurchaseQuotationEntryMaster pqe inner join tblMmMaterialRequisitionNote trn on trn.RequisitionId=pqe.RequisitionId INNER JOIN tblMmVendorMaster v ON pqe.VendoreId = v.Id Inner Join tblHrBranchMaster b on pqe.BranchCode = b.BranchCode inner join tblHrDeptMaster d on pqe.DepartmentId = d.Id
														where pqe.id='" + Id + "'");

            DataTable dtDetailList = objMain.dtFetchData(@"select MaterialMasterId,mm.Id,CONVERT(VARCHAR(20),mm.Id) + ': ' + mm.MaterialName AS MaterialName,Qty,UnitPrice,TotalAmt, q.[Description] from tblMmMaterialPurchaseQuotationEntryDetail q inner join tblMmMaterialMaster mm on mm.Id = MaterialMasterId where QuotationEntryMasterId='" + Id + "'");

            //DataTable dtcompany = objMain.dtFetchData("select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");

            objDs.Tables.AddRange(new DataTable[] { objdt, dtDetailList });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}