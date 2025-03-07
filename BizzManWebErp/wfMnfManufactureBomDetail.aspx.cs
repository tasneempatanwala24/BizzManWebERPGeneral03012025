using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using BizzManWebErp.Model;
using ClosedXML.Excel;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Newtonsoft.Json;
using System.Security;

namespace BizzManWebErp
{
    public partial class wfMnfManufactureBomDetail : System.Web.UI.Page
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
        public static string MaterialMasterList()
        {
            clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                //  dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where Id not in(select MaterialMasterId from tblMmBomMaster) and BOM='Y'");
                dtMaterialMasterList = objMain.dtFetchData(@"select Id,MaterialName from tblMmMaterialMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }

        [WebMethod]
        public static string UnitMesureList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtUnitList = new DataTable();

            try
            {

                dtUnitList = objMain.dtFetchData("select Id,UnitMesureName FROM tblFaUnitMesureMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtUnitList);
        }

        [WebMethod]
        public static string WorkCenterList()
        {
            DataTable dtWorkCenterList = new DataTable();

            try
            {

                dtWorkCenterList = objMain.dtFetchData("select * FROM tblMnfWorkCentersDetail");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtWorkCenterList);
        }


        [WebMethod]
        public static string GenerateOrderID()
        {
            DataTable dtD = new DataTable();

            try
            {
                dtD = objMain.dtFetchData(@"SELECT CONCAT('BM', RIGHT('000' + CAST(ISNULL(MAX(CAST(SUBSTRING(ID, 3, LEN(ID) - 2) AS INT)), 0) + 1 AS VARCHAR), 3)) AS ID
                        FROM tblMnfManufactureBomMaster
                        WHERE ID LIKE 'BM%'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtD);
        }


        [WebMethod]
        public static string FetchBOMMasterList()
        {
            DataTable dtBOMList = new DataTable();

            try
            {

                dtBOMList = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,u.UnitMesureName as UnitMeasure
from tblMnfManufactureBomMaster a inner join tblMmMaterialMaster m on a.materialId=m.Id
inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id order by a.id ");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMList);
        }

        [WebMethod]
        public static string FetchBOMMasterListById(string ID)
        {
            DataTable dtBOMList = new DataTable();

            try
            {

                dtBOMList = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,u.UnitMesureName as UnitMeasure
from tblMnfManufactureBomMaster a inner join tblMmMaterialMaster m on a.materialId=m.Id
inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id where a.id='"+ID+"'");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMList);
        }

        [WebMethod]
        public static string FetchBOMDetails(string Id)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderasterDetails = new DataTable();

            try
            {

                    dtSalesOrderasterDetails = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,u.UnitMesureName as UnitMeasure
                    from tblMnfManufactureBomDetail
                    a inner join tblMmMaterialMaster m on a.materialId=m.Id
                    inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id  where BOMID='" + Id + "' order by a.id");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderasterDetails);
        }


        [WebMethod]
        public static string AddBOMDetails(List<MnfManufactureBomDetail> data,string Id = "", string ProductName = "",
       float Quantity = 0, string UOM = "", string BOMType = "",
       string WorkCenter = "", string Operation = "", int Duration = 0,
       string loginUser = "", int IsUpdate = 0)
        {
            try
            {
                SqlParameter[] objParam = new SqlParameter[12];

                objParam[0] = new SqlParameter("@MaterialId", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = ProductName;

                objParam[1] = new SqlParameter("@Quantity", SqlDbType.Float);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = Quantity;

                objParam[2] = new SqlParameter("@UOM", SqlDbType.NVarChar);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = UOM;

                objParam[3] = new SqlParameter("@BOMType", SqlDbType.NVarChar);
                objParam[3].Direction = ParameterDirection.Input;
                objParam[3].Value = BOMType;

                objParam[4] = new SqlParameter("@WorkCenter", SqlDbType.NVarChar);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = WorkCenter;

                objParam[5] = new SqlParameter("@Operation", SqlDbType.NVarChar);
                objParam[5].Direction = ParameterDirection.Input;
                objParam[5].Value = Operation;

                objParam[6] = new SqlParameter("@Duration", SqlDbType.NVarChar);
                objParam[6].Direction = ParameterDirection.Input;
                objParam[6].Value = Duration;

                objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
                objParam[7].Direction = ParameterDirection.Input;
                objParam[7].Value = loginUser;

                objParam[8] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
                objParam[8].Direction = ParameterDirection.Input;
                objParam[8].Value = loginUser;

                objParam[9] = new SqlParameter("@Id", SqlDbType.NVarChar);
                objParam[9].Direction = ParameterDirection.Input;
                objParam[9].Value = Id;

                objParam[10] = new SqlParameter("@IsUpdate", SqlDbType.Bit);
                objParam[10].Direction = ParameterDirection.Input;
                objParam[10].Value = (IsUpdate == 1) ? true : false;

                StringBuilder strBuild = new StringBuilder();
                strBuild.Append("<BOMList>");
                if (data.Count > 0)
                {
                    foreach (var item in data)
                    {
                        strBuild.Append("<BOMListDetail>");
                        strBuild.Append("<MaterialId>" + item.ProductName + "</MaterialId>");
                        strBuild.Append("<Qty>" + item.Quantity + "</Qty>");
                        strBuild.Append("<UOM>" + item.UOM + "</UOM>");
                        strBuild.Append("</BOMListDetail>");
                    }
                }
                strBuild.Append("</BOMList>");
                objParam[11] = new SqlParameter("@XMLData", SqlDbType.Xml);
                objParam[11].Direction = ParameterDirection.Input;
                objParam[11].Value = strBuild.ToString();

                var result = objMain.ExecuteProcedure("procMnfManufactureBomDetail", objParam);


                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [WebMethod]
        [SecurityCritical]
        public static string FetchManufactureBomDetailListDownload(string id = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialBOMList = new DataTable();

            try
             {

                dtMaterialBOMList = objMain.dtFetchData(@"select a.Id,m.MaterialName as ProductName,Cast(a.Quantity as varchar(10))+' '+u.UnitMesureName as Quantity,a.BOMType,a.WorkCenterID,a.Operation,a.Duration as 'Duration(in min)'
from tblMnfManufactureBomMaster a inner join tblMmMaterialMaster m on a.materialId=m.Id
inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id  where 1=1" + (id != "" ? " and a.Id in(SELECT Item FROM [dbo].[SplitString] ('" + id + "',','))" : "") + " order by Id desc");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialBOMList.TableName = "ManufactureBomDetail";
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