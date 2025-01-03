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
    public partial class wfMmMaterialPurchaseOrderDirectGrnEntry_display : System.Web.UI.Page
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
            DataTable objdt = objMain.dtFetchData(@"select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,
            Convert(varchar(max),Logo) as Logo from tblAdminCompanyMaster");

            DataTable dtclientList = objMain.dtFetchData(@"SELECT VendorName as ContactName, VendorAddress Street1, PhoneNo as Phone,EmailAddress Email from tblMmVendorMaster  WHERE Id =
                                    (SELECT VendorId FROM tblMmMaterialPurchaseGrnMaster WHERE Id = '" + Id + "')");

            DataTable dtList = objMain.dtFetchData(@" select g.Id,FORMAT(GrnEntryDate, 'dd/MM/yyyy') as OrderDate,b.BranchName,g.Active 
            from tblMmMaterialPurchaseGrnMaster g inner join tblHrBranchMaster b on g.BranchCode = b.BranchCode
            where g.Id='" + Id + "'");
            DataTable dtSalesQDetail = objMain.dtFetchData(@"Select GM.Id,GD.MaterialMasterId as ItemId,materialName,QtyOrder as Qty,
                    UnitPrice as Rate,GD.TotalAmt as TaxbleAmt,GD.CgstPercent,
                    GD.SgstPercent,GD.IgstPercent,GD.FreightCharge,GD.LoadingUnLoading,GD.RoundOff,GD.GrossAmt,m.UnitMesure
                    from   tblMmMaterialPurchaseGrnMaster GM  
					inner join tblMmMaterialPurchaseGrnDetail GD 
					on GM.id=GD.GrnMasterId
                    inner join tblMmMaterialMaster m on m.Id=GD.MaterialMasterId where GM.id='" + Id + "'");
            DataTable dtSalesTotalDetail = objMain.dtFetchData(@"Select SUM(GD.GrossAmt) AS Gross_Amt from tblMmMaterialPurchaseGrnMaster GM  inner join tblMmMaterialPurchaseGrnDetail GD on GM.id=GD.GrnMasterId
            where GM.id='" + Id + "'");
            if (dtSalesTotalDetail.Rows.Count > 0)
            {
                decimal gross_Amt = Convert.ToDecimal(dtSalesTotalDetail.Rows[0]["Gross_Amt"]);
                string amountinwords = NumberToWords.GetAmountInWords(gross_Amt.ToString());
                dtSalesTotalDetail.Columns.Add("AmountInWords", typeof(string));
                dtSalesTotalDetail.Rows[0]["AmountInWords"] = amountinwords;
            }

            objDs.Tables.AddRange(new DataTable[] { objdt, dtclientList, dtList, dtSalesQDetail, dtSalesTotalDetail });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}