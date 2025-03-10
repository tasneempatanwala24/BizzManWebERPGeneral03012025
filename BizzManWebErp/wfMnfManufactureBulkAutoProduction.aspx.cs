using BizzManWebErp.Model;
using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using DocumentFormat.OpenXml.Office2010.Excel;

namespace BizzManWebErp
{
    public partial class wfMnfManufactureBulkAutoProduction : System.Web.UI.Page
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
                dtMaterialMasterList = objMain.dtFetchData(@"select Id,MaterialName from tblMmMaterialMaster ");
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
        public static string CustomerMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {

                dtCustomerList = objMain.dtFetchData(@"SELECT tblCrmCustomers.CustomerId,CustomerName, Street1, Phone, Email from tblCrmCustomerContacts inner join 
tblCrmCustomers on tblCrmCustomers.ContactId=tblCrmCustomerContacts.ContactId");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCustomerList);
        }


        [WebMethod]
        public static string GenerateOrderID()
        {
            DataTable dtD = new DataTable();

            try
            {
                dtD = objMain.dtFetchData(@"SELECT CONCAT('MO', RIGHT('000' + CAST(ISNULL(MAX(CAST(SUBSTRING(ID, 3, LEN(ID) - 2) AS INT)), 0) + 1 AS VARCHAR), 3)) AS ID
                        FROM tblMnfManufactureOrderMaster
                        WHERE ID LIKE 'MO%'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtD);
        }


        [WebMethod]
        public static string FetchManufactureOrderMasterList()
        {
            DataTable dtBOMList = new DataTable();

            try
            {

                dtBOMList = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,u.UnitMesureName as UnitMeasure,C.CustomerName,CONVERT(nvarchar,a.MODate,104) as FormattedMODate,CONVERT(nvarchar,a.DeadlineDate,104) as FormattedDeadlineDate
from tblMnfManufactureOrderMaster a inner join tblMmMaterialMaster m on a.materialId=m.Id
inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id inner join tblCrmCustomers C on C.CustomerId=a.AssignPersonID where isAutoProduce=0 order by a.id");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMList);
        }

        [WebMethod]
        public static string FetchManufactureOrderMasterListById(string ID)
        {
            DataTable dtBOMList = new DataTable();

            try
            {

                dtBOMList = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,u.UnitMesureName as UnitMeasure,C.CustomerName
                            from tblMnfManufactureOrderMaster a 
                            inner join tblMmMaterialMaster m on a.materialId=m.Id
                             inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id
							 inner join tblCrmCustomers C on C.CustomerId=a.AssignPersonID where a.id='" + ID + "'");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMList);
        }

        [WebMethod]
        public static string FetchManufactureOrderDetails(string Id)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtSalesOrderasterDetails = new DataTable();

            try
            {

                dtSalesOrderasterDetails = objMain.dtFetchData(@"select bm.*,m.MaterialName as ProductName
,(select isnull(Sum(QtyBalance),0) from tblMmMaterialStockMaster 
inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId 
inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode
where  MaterialMasterId=bm.materialId)as Stock
                            from  tblMnfManufactureOrderDetail bm 
                            inner join tblMmMaterialMaster m on bm.materialId=m.Id  where bm.OrderId='" + Id + "' order by bm.ID");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderasterDetails);
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
        public static string AddOrderDetails(List<MnfManufactureOrder> dtList, string Id = "", string BOMID = "",
        int ProductId = 0, string MOdate = "",
        float Quantity = 0, string UOM = "", string Assignperson = "", string DeadlineDate = "",
        string ManufacturingType = "",
        string loginUser = "", int IsUpdate = 0)
        {
            try
            {
                SqlParameter[] objParam = new SqlParameter[13];

                objParam[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = Id;

                objParam[1] = new SqlParameter("@BOMID", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = BOMID;

                objParam[2] = new SqlParameter("@ProductId", SqlDbType.Int);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = ProductId;

                objParam[3] = new SqlParameter("@MOdate", SqlDbType.NVarChar);
                objParam[3].Direction = ParameterDirection.Input;
                objParam[3].Value = MOdate;

                objParam[4] = new SqlParameter("@Quantity", SqlDbType.Float);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = Quantity;

                objParam[5] = new SqlParameter("@UOM", SqlDbType.NVarChar);
                objParam[5].Direction = ParameterDirection.Input;
                objParam[5].Value = UOM;

                objParam[6] = new SqlParameter("@Assignperson", SqlDbType.NVarChar);
                objParam[6].Direction = ParameterDirection.Input;
                objParam[6].Value = Assignperson;

                objParam[7] = new SqlParameter("@DeadlineDate", SqlDbType.NVarChar);
                objParam[7].Direction = ParameterDirection.Input;
                objParam[7].Value = DeadlineDate;

                objParam[8] = new SqlParameter("@ManufacturingType", SqlDbType.NVarChar);
                objParam[8].Direction = ParameterDirection.Input;
                objParam[8].Value = ManufacturingType;


                objParam[9] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
                objParam[9].Direction = ParameterDirection.Input;
                objParam[9].Value = loginUser;

                objParam[10] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
                objParam[10].Direction = ParameterDirection.Input;
                objParam[10].Value = loginUser;


                objParam[11] = new SqlParameter("@IsUpdate", SqlDbType.Bit);
                objParam[11].Direction = ParameterDirection.Input;
                objParam[11].Value = (IsUpdate == 1) ? true : false;

                StringBuilder strBuild = new StringBuilder();
                strBuild.Append("<OrderList>");
                if (dtList.Count > 0)
                {
                    foreach (var item in dtList)
                    {
                        strBuild.Append("<OrderListDetail>");
                        strBuild.Append("<MaterialId>" + item.MaterialId + "</MaterialId>");
                        strBuild.Append("<Quantity>" + item.Quantity + "</Quantity>");
                        strBuild.Append("<WCID>" + item.WCID + "</WCID>");
                        strBuild.Append("<Operation>" + item.Operation + "</Operation>");
                        strBuild.Append("<UOM>" + item.UOM + "</UOM>");
                        strBuild.Append("<QtyConsumed>" + item.QtyConsumed + "</QtyConsumed>");
                        strBuild.Append("</OrderListDetail>");
                    }
                }
                strBuild.Append("</OrderList>");
                objParam[12] = new SqlParameter("@XMLData", SqlDbType.Xml);
                objParam[12].Direction = ParameterDirection.Input;
                objParam[12].Value = strBuild.ToString();

                var result = objMain.ExecuteProcedure("procMnfManufactureOrderDetail", objParam);


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

                dtMaterialBOMList = objMain.dtFetchData(@"select a.Id,a.BOMID,a.MODate,m.MaterialName as Product,Cast(a.Quantity as varchar(10))+' '+u.UnitMesureName as Quantity,C.CustomerName as Assignee
,a.DeadLineDate,a.ManufacturingType,a.CreateUser as [User]
from tblMnfManufactureOrderMaster a inner join tblMmMaterialMaster m on a.materialId=m.Id
inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id     
inner join tblCrmCustomers C on C.CustomerId=a.AssignPersonID  where 1=1" + (id != "" ? " and a.Id in(SELECT Item FROM [dbo].[SplitString] ('" + id + "',','))" : "") + " order by Id desc");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialBOMList.TableName = "ManufactureOrder";
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

        
            [WebMethod]
        public static string AutoProduceMO(string id = "",string loginUser="")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialBOMList = new DataTable();

            try
            {
                SqlParameter[] objParam = new SqlParameter[2];

                objParam[0] = new SqlParameter("@Id", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = id;

                objParam[1] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = loginUser;

                var result = objMain.ExecuteProcedure("procMnfManufactureBulkAutoProduction", objParam);

            }
            catch (Exception ex)
            {
                // return "";
            }

            return "";
        }

        [WebMethod]
        public static string FetchBOMMasterListById(string ID)
        {
            DataTable dtBOMList = new DataTable();

            try
            {

                dtBOMList = objMain.dtFetchData(@"select a.*,m.MaterialName as ProductName,u.UnitMesureName as UnitMeasure
                            ,bm.MaterialId as BomDetailMaterial,m1.MaterialName as BomDetailMaterialName
                            ,bm.Quantity as BomDetailQuantity
                            from tblMnfManufactureBomMaster a 
                            inner join tblMmMaterialMaster m on a.materialId=m.Id
                            Left join tblMnfManufactureBomDetail bm on a.Id=bm.BOMID
                            Left join tblMmMaterialMaster m1 on bm.MaterialId=m1.Id
                            inner join tblFaUnitMesureMaster u  on a.UOMID=u.Id where a.id='" + ID + "'");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMList);
        }
    }
}