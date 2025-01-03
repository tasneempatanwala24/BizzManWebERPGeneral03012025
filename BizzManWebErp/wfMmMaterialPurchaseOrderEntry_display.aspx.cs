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
    public partial class wfMmMaterialPurchaseOrderEntry_display : System.Web.UI.Page
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
            DataTable objdt = objMain.dtFetchData(@"Select po.Id,CONVERT(nvarchar,PO.OrderEntryDate,106) as OrderEntryDate,VendorName,CONVERT(nvarchar,PO.OrderDeadlineDate,106) as OrderDeadlineDate,CONVERT(nvarchar,PO.ReceiptDate,106) as ReceiptDate,PaymentTerm,PurchaseAgreement,QuotationNo,BranchName,DeptName
											  FROM [tblMmMaterialPurchaseOrderEntryMaster] PO INNER JOIN tblMmVendorMaster v on PO.VendoreId=v.Id join tblHrBranchMaster b on b.BranchCode=PO.BranchCode  join tblHrDeptMaster d on d.Id=PO.DepartmentId Where PO.Id = '" + Id + "'");

            DataTable dtDetailList = objMain.dtFetchData(@"Select pod.Id,PurchaseOrderMasterId,QuotationId,MaterialMasterId,MaterialName,CONVERT(nvarchar,QuotationEntryDate,106) as QuotationEntryDate,CONVERT(nvarchar,QuotationDate,106) as QuotationDate,CONVERT(nvarchar,QuotationValidDate,106) as QuotationValidDate,RequisitionNote,VendorName,BranchName,DeptName
            From [tblMmMaterialPurchaseOrderEntryDetail] pod join tblMmMaterialMaster m on pod.MaterialMasterId=m.Id LEFT OUTER JOIN tblMmMaterialPurchaseQuotationEntryMaster q on pod.QuotationId = q.Id
            inner join tblMmMaterialRequisitionNote r on q.RequisitionId = r.RequisitionId inner join tblMmVendorMaster v on q.VendoreId = v.Id inner join tblHrBranchMaster b on q.BranchCode = b.BranchCode
            inner join tblHrDeptMaster d on q.DepartmentId = d.Id where pod.PurchaseOrderMasterId = '" + Id + "'");

            DataTable dtList = objMain.dtFetchData("Select pod.Id,PurchaseOrderMasterId,MaterialMasterId,MaterialName,QtyOrder,UnitPrice,TotalAmt From [tblMmMaterialPurchaseOrderEntryDetail] pod join tblMmMaterialMaster m on pod.MaterialMasterId=m.Id where pod.PurchaseOrderMasterId = '" + Id + "'");

            objDs.Tables.AddRange(new DataTable[] { objdt, dtDetailList, dtList });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}