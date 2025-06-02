using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;
using System.Security;
namespace BizzManWebErp
{
    public partial class wfAdminUserLoginDetail : System.Web.UI.Page
    {
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
        public static string FetchAdminLoginList()
        {
            DataTable dtWorkCenterDetailList = new DataTable();

            try
            {

                dtWorkCenterDetailList = objMain.dtFetchData(@"select *, FORMAT(LoginDate, 'dd-MM-yyyy') AS FormattedLoginDate from tblAdminLoginDetail order by id desc");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtWorkCenterDetailList);
        }

        [WebMethod]
        [SecurityCritical]
        public static string FetchAdminLoginDetailListDownload(string id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialBOMList = new DataTable();

            try
            {

                dtMaterialBOMList = objMain.dtFetchData(@"select * from tblAdminLoginDetail   where 1=1" + (id != "" ? " and Id in(SELECT Item FROM [dbo].[SplitString] ('" + id + "',','))" : "") + " order by Id desc");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialBOMList.TableName = "AdminLoginDetails";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtMaterialBOMList);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    //Return xlsx Excel File  
                    byte[] bytes = stream.ToArray();

                    //Convert File to Base64 string and send to Client.
                    return Convert.ToBase64String(bytes, 0, bytes.Length);
                }
            }

        }
    }
}