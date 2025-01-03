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
    public partial class wfSdProductMaster_Display : System.Web.UI.Page
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
        public static string FetchDetails(string Id)
        {
            DataSet objDs = new DataSet();
            DataTable objdt = new DataTable();
            DataTable objdtList = new DataTable();
            DataTable dtcompany = new DataTable();
            objdt = objMain.dtFetchData(@"select mm.Id,MaterialCategoryId,MaterialName,UnitMesure,mm.Description,MeterialGroup,UnitMesure,
                               isnull(cast([IntegratedTaxPercent] as varchar),'') as IntegratedTaxPercent
                               ,isnull(cast([CentralTaxPercent] as varchar),'') as CentralTaxPercent
                               ,isnull(cast([StateTaxPercent] as varchar),'') as StateTaxPercent
                               ,isnull(cast([CessPercent] as varchar),'') as CessPercent,
                               isnull(MinimumStockLevel,0) as MinimumStockLevel,isnull(MaximumStockLevel,0) as MaximumStockLevel,
                               isnull([GstApplicable],'') as GstApplicable,isnull(CanPurchase,0) as CanPurchase,isnull(CanSale,0) as CanSale,  
                               isnull(MaterialType,'') as MaterialType,isnull(ControlPolicy,'') as ControlPolicy,
                               NatureOfItem,HsnNo,BarCode,CostingMethod,BOM,MaintainInBatch,MRP,
	                           mm.MainCategoryId as MainCategoryId,mm.BranchCode as BranchCode,
                               mm.Discount,CAST(MaterialImage as varchar(max))[MaterialImage],
                               mm.Alias,ISNULL(mm.Active,'n') AS Active,mm.CanManufacture,mm.ProjectMasterId,
                                ISNULL(p.ProjectName,'') AS ProjectName,c.Name as CategoryName
                               from tblMmMaterialMaster mm inner join tblMmCategoryMaster c on mm.MaterialCategoryId = c.Id
	                           left join tblMmMaterialInventoryDetails mi on mi.MaterialMasterId=mm.Id	   
	                           Left join tblSdProjectMaster p on mm.ProjectMasterId = p.Id
							 where mm.Id=" + Id);


            objdtList = objMain.dtFetchData(@"select p.Id AS Id, p.Packaging AS PackagingName,p.Qty,pm.UnitMesure
                                                                  from tblMmMaterialPackagingDetails p join tblMmItemPackagingMaster pm
                                                                    on p.Packaging = pm.PackagingName
                                                                  where p.MaterialMasterId=" + Id);
            dtcompany = objMain.dtFetchData("select CompanyName,Address1,Address2,PhoneNo,EmailAddress,WebSiteAddress," +
                "Logo from tblAdminCompanyMaster");
            
            objDs.Tables.AddRange(new DataTable[] { objdt, objdtList, dtcompany });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}