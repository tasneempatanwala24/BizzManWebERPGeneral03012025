using BizzManWebErp.Model;
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
   public partial class wfMmMaterialPurchaseOrderDirectEntry_display : System.Web.UI.Page
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
        public static string FetchPODirectDetails(string Id)
        {
            DataSet objDs = new DataSet();
            DataTable objdt = objMain.dtFetchData(@"select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,Convert(varchar(max),Logo) as Logo from tblAdminCompanyMaster");

            DataTable dtclientList = objMain.dtFetchData(@"SELECT VendorName as ContactName, VendorAddress Street1, PhoneNo as Phone,EmailAddress Email from tblMmVendorMaster  WHERE Id =
                                    (SELECT VendoreId FROM tblMmMaterialPurchaseOrderEntryMaster WHERE Id = '" + Id + "')");

            DataTable dtQList = objMain.dtFetchData(@"select SM.Id,FORMAT(OrderEntryDate, 'dd/MM/yyyy') as OrderDate,PaymentTerm as TermsAndConditions ,isnull(PurchaseAgreement,'') as Notes
	                            ,(Select cast (Sum(isnull(QtyOrder*SP.UnitPrice*(MM.IntegratedTaxPercent/100),0))as decimal(16,2)) from tblMmMaterialPurchaseOrderEntryDetail SP 
                                inner join tblMmMaterialPurchaseOrderEntryMaster on tblMmMaterialPurchaseOrderEntryMaster.Id=SP.PurchaseOrderMasterId
                                inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialMasterId
                                where SP.PurchaseOrderMasterId=SM.Id
                                )NetGST,(Select cast (Sum(isnull(QtyOrder*SP.UnitPrice,0))as decimal(16,2)) from tblMmMaterialPurchaseOrderEntryDetail SP 
                                inner join tblMmMaterialPurchaseOrderEntryMaster on tblMmMaterialPurchaseOrderEntryMaster.Id=SP.PurchaseOrderMasterId
                                inner join tblMmMaterialMaster MM on MM.Id=SP.MaterialMasterId
                                where SP.PurchaseOrderMasterId=SM.Id
                                )NetTotal
                                from tblMmMaterialPurchaseOrderEntryMaster SM   
                                 where SM.Id='" + Id + "'");
            DataTable dtSalesQDetail = objMain.dtFetchData(@"Select SM.Id,MaterialMasterId as ItemId,materialName,QtyOrder as Qty,UnitPrice as Rate,SD.TaxbleAmt,SD.CgstPercent,
                    SD.SgstPercent,SD.IgstPercent,SD.FreightCharge,SD.LoadingUnLoading,SD.RoundOff,SD.TotalAmt,m.UnitMesure
                    from   tblMmMaterialPurchaseOrderEntryMaster SM  inner join tblMmMaterialPurchaseOrderEntryDetail SD on SM.id=SD.PurchaseOrderMasterId 
                    inner join tblMmMaterialMaster m on m.Id=SD.MaterialMasterId where SM.id='" + Id + "'");
            DataTable dtSalesTotalDetail = objMain.dtFetchData(@"Select SUM(SD.TotalAmt) AS Gross_Amt from   tblMmMaterialPurchaseOrderEntryMaster SM  inner join tblMmMaterialPurchaseOrderEntryDetail SD on SM.id=SD.PurchaseOrderMasterId 
        where SM.id='" + Id + "'");
            if (dtSalesTotalDetail.Rows.Count > 0)
            {
                decimal gross_Amt = Convert.ToDecimal(dtSalesTotalDetail.Rows[0]["Gross_Amt"]);
                string amountinwords = NumberToWords.GetAmountInWords(gross_Amt.ToString());
                dtSalesTotalDetail.Columns.Add("AmountInWords", typeof(string));
                dtSalesTotalDetail.Rows[0]["AmountInWords"] = amountinwords;
            }

            objDs.Tables.AddRange(new DataTable[] { objdt, dtclientList, dtQList, dtSalesQDetail, dtSalesTotalDetail });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}