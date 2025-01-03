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
    public partial class wfMnfJlrJobCardMaster_display : System.Web.UI.Page
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
        public static string FectchJobCardDetails(string Id)
        {
            DataSet objDs = new DataSet();
            DataTable objdt = objMain.dtFetchData(@"SELECT MasterId,m.CustomerId,CustomerName, CONVERT(nvarchar,OrderDate,101) as OrderDate,OrderNo,ReferenceOrderNo
                ,CONVERT(nvarchar,OrderReceivedDate,101) as OrderReceivedDate,CONVERT(nvarchar,CadIssueDate,101) as CadIssueDate,
                CONVERT(nvarchar,CadApproveDate,101) as CadApproveDate,CONVERT(nvarchar,DiamondReceivedDate,101) as DiamondReceivedDate,
                CONVERT(nvarchar,DeliveryDate,101) as DeliveryDate,DiamondQuality,PartyDiamond,PartyDiamondReferenceNo,
                [Type],[Description]  FROM tblMnfJlrJobCardMaster m INNER JOIN tblCrmCustomers c on m.CustomerId=c.CustomerId
                WHERE MasterId=" + Id + "");

            DataTable dtDetailList = objMain.dtFetchData(@"SELECT DetailId,MasterId,SlNo,DesignNo,
                CONVERT(VARBINARY(MAX),CustomerImage) as CustomerImage,CONVERT(VARBINARY(MAX),CadImage) as CadImage
                ,CONVERT(VARBINARY(MAX),FinishedFinalImage) as FinishedFinalImage,CONVERT(VARBINARY(MAX),AdditionalImage) as AdditionalImage,
                jd.ProductId,m.MaterialName,ApproxWeight,Polish,Pcs,Size,[Length],DiamondWeight,DiamondPices,Remark
                FROM tblMnfJlrJobCardDetail jd INNER JOIN tblMmMaterialMaster m on jd.ProductId=m.Id Where jd.MasterId=" + Id + "");

            DataTable dtcompany = objMain.dtFetchData("select CompanyName,Address1,PhoneNo,EmailAddress,WebSiteAddress,Logo from tblAdminCompanyMaster");

            objDs.Tables.AddRange(new DataTable[] { objdt, dtDetailList, dtcompany });
            string json = JsonConvert.SerializeObject(objDs, Formatting.None);
            return json;
        }
    }
}