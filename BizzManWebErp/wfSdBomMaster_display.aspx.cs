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
   public partial class wfSdBomMaster_display : System.Web.UI.Page
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
        public static string FetchSDBOMDetails(string Id)
        {
            DataSet objDs = new DataSet();
            DataTable objdt = new DataTable();
            DataTable objdtList = new DataTable();
            DataTable dtcompany = new DataTable();
            objdt = objMain.dtFetchData(@"select MasterId as Id,ItemName,ISNULL(Alias,'') AS Alias,ISNULL(s.BranchCode,'') AS BranchCode,ISNULL(BranchName,'') AS BranchName,Qty,UnitMeasure,ISNULL(UnitMesureName,'') AS UnitMesureName,
                                            SubTotalAmout,TotalAmount,TotalCentralTax,TotalStateTax,(TotalCentralTax+TotalStateTax) AS TotalTax,DeliveryCharges,
                                            TotalCess as TotalCessTax,TotalIntegratedTax,CASE WHEN s.Active='y' THEN 'Y' ELSE 'N' END AS [Active] from tblSdBomMaster s LEFT JOIN tblHrBranchMaster b 
                                            on s.BranchCode=b.BranchCode Left Join tblFaUnitMesureMaster u on s.UnitMeasure = u.Id Where MasterId=" + Id);


            objdtList = objMain.dtFetchData(@"select DetailId,MasterId,ItemMasterId,(Convert(VARCHAR(20),ItemMasterId) + ': ' + MaterialName) AS MaterialName,
                                            Qty,RateInclTax,DiscountPercent,SubTotal,UnitMesure from tblSdBomDetail s inner join tblMmMaterialMaster m 
                                            on ItemMasterId = m.Id WHERE MasterId=" + Id);
            dtcompany = objMain.dtFetchData("select CompanyName,Address1,Address2,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");
            objDs.Tables.AddRange(new DataTable[] { objdt, objdtList, dtcompany });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}