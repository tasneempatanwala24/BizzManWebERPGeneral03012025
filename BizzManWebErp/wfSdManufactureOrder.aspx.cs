using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ClosedXML.Excel;
using Newtonsoft.Json;

namespace BizzManWebErp
{
    public partial class wfSdManufactureOrder : System.Web.UI.Page
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

        //===========================   
        //=============================
        [WebMethod]
        public static string WarehouseList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtWarehouseList = new DataTable();

            try
            {

                dtWarehouseList = objMain.dtFetchData("select Id,Name FROM tblFaWarehouseMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtWarehouseList);
        }

        //============================
        //===============================

        //=====================================
        //========Totally unknow, why this function was===========================
        //========temporary off, but don't know and effect====================
        // when call Item Master page, this page erro

        [WebMethod]
        public static string BranchMasterList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select [BranchCode],[BranchName] FROM [tblHrBranchMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        //====================================
        //====================================
        //===================================

        //===================================
        //===============================
        [WebMethod]
        public static string CustomerMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {

                dtCustomerList = objMain.dtFetchData("select CustomerId,CustomerName FROM tblCrmCustomers");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCustomerList);
        }
        //==============================
        //================================

        //==============================
        //===========================
        [WebMethod]
        public static string FetchStateList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtStateList = new DataTable();

            try
            {

                dtStateList = objMain.dtFetchData("select StateId,StateName from tblHrStateMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtStateList);
        }
        //=============================
        //==============================

        //===============================
        //==================================
        [WebMethod]
        public static string CustomerTypeMasterList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtCustomerList = new DataTable();

            try
            {

                dtCustomerList = objMain.dtFetchData("select id,CustomerType FROM tblCrmCustomerType");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCustomerList);
        }

        //===============================
        //=================================

        //============================
        //===============================
        [WebMethod]
        public static string FormulaList(string BOMId)
        {
            //  clsMain objMain = new clsMain();
            DataTable dtFormulaList = new DataTable();

            try
            {

                dtFormulaList = objMain.dtFetchData("select FormulaName,BomMasterId from tblMmBomFormulaMaster where BomMasterId=" + BOMId);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtFormulaList);
        }
        //============================
        //============================

        [WebMethod]
        public static string FetchManufactureOrderListDownload(string ManufactureOrderId = "")
        {
           // clsMain objMain = new clsMain();
            DataTable dtManufactureOrderList = new DataTable();

            try
            {

                dtManufactureOrderList = objMain.dtFetchData(@"select mn.ManufactureId,isnull(mn.SalesOrderId,'') as SalesOrderId,m.MaterialName,mn.Qty,m.UnitMesure,
                                                              CONVERT(nvarchar,mn.ScheduleDate,104) as ScheduleDate,f.FormulaName,b.BranchName,c.CustomerName
                                                              from tblSdManufacturingOrder mn
                                                              left join tblMmMaterialMaster m on m.Id=mn.MaterialMasterId
                                                              left join tblMmBomFormulaMaster f on f.BomMasterId=mn.BOMFormulaId
                                                              left join tblHrBranchMaster b on b.BranchCode=mn.BranchCode
                                                              left join tblCrmCustomers c on c.CustomerId=mn.CustomerId
                                                              where 1=1" + (ManufactureOrderId != "" ? " and mn.ManufactureId in(SELECT Item FROM [dbo].[SplitString] ('" + ManufactureOrderId + "',','))" : "") + " order by mn.id desc");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtManufactureOrderList.TableName = "ManufactureOrderList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtManufactureOrderList);
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
        public static string FetchManufactureOrderMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtManufactureMasterList = new DataTable();

            try
            {

                dtManufactureMasterList = objMain.dtFetchData(@"select mn.ManufactureId,isnull(mn.SalesOrderId,'') as SalesOrderId,m.MaterialName,mn.Qty,m.UnitMesure,
                                                              CONVERT(nvarchar,mn.ScheduleDate,104) as ScheduleDate,f.FormulaName,b.BranchName,c.CustomerName
                                                              from tblSdManufacturingOrder mn
                                                              left join tblMmMaterialMaster m on m.Id=mn.MaterialMasterId
                                                              left join tblMmBomFormulaMaster f on f.BomMasterId=mn.BOMFormulaId
                                                              left join tblHrBranchMaster b on b.BranchCode=mn.BranchCode
                                                              left join tblCrmCustomers c on c.CustomerId=mn.CustomerId
                                                              order by mn.id desc");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtManufactureMasterList);
        }


        [WebMethod]
        public static string FetchMaterialDetails(string MaterialId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialDetails = new DataTable();

            try
            {

                dtMaterialDetails = objMain.dtFetchData("select mm.Id,mm.MaterialName,mm.UnitMesure,mm.MRP,isnull(mm.IntegratedTaxPercent,0) as IntegratedTaxPercent,b.Id as BomId,isnull(b.ManufacturingType,'') as ManufacturingType from tblMmMaterialMaster mm left join tblMmBomMaster b on b.MaterialMasterId=mm.Id where mm.Id=" + MaterialId + " and mm.BOM='Y'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialDetails);
        }



        [WebMethod]
        public static string FetchBOMDetailsList(string BOMId = "", string Formula = "", string type = "", string MaterialMasterId="")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtBOMDetailsList = new DataTable();

            try
            {

                dtBOMDetailsList = objMain.dtFetchData(@"select bd.MaterialMasterId,MM.MaterialName,bd.Qty,mm.UnitMesure,BD.FormulaName,
                                      bd.Rate,bd.Amount,(Select isnull(sum(sm.QtyIn)-sum(sm.QtyOut),0) from tblMmMaterialStockMaster sm where 
                                        sm.MaterialMasterId=bd.MaterialMasterId) as AvailableQty from tblMmBomDetail BD 
                                      join tblMmMaterialMaster mm on mm.Id=BD.MaterialMasterId "+(type == "1"? " join tblMmBomMaster bm on bm.Id=BD.BomMasterId " : "")
                                      +"where "+ (type == "2" ? "BD.BomMasterId=" + BOMId + "and BD.FormulaName='" + Formula + "'" : "bm.MaterialMasterId=" + MaterialMasterId) + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMDetailsList);
        }



        [WebMethod]
        public static string FetchManufactureOrderMasterDetails(string ManufactureId = "")
        {
         //   clsMain objMain = new clsMain();
            DataTable dtManufactureOrderMasterDetails = new DataTable();

            try
            {

                dtManufactureOrderMasterDetails = objMain.dtFetchData(@"select mo.id,mo.ManufactureId,mo.SalesOrderId,mo.MaterialMasterId,mo.ScheduleDate,
                                                          mo.Qty,isnull(mo.BOMFormulaId,0) as BOMFormulaId,isnull(mo.CustomerId,0) as CustomerId, 
                                                          isnull(mo.BranchCode,0) as BranchCode,mo.IsDone,BD.Id as BOMId,m.UnitMesure,
                                                          isnull(mo.WareHouseId,0) as WareHouseId from tblSdManufacturingOrder mo
                                                          left join tblMmBomMaster BD on mo.MaterialMasterId=BD.MaterialMasterId
                                                          left join tblMmMaterialMaster m on m.Id=mo.MaterialMasterId
                                                          where mo.ManufactureId='" + ManufactureId +"'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtManufactureOrderMasterDetails);
        }



        [WebMethod]
        public static string AddManufactureOrder(string ManufactureOrderId = "", string MaterialId = "", string ScheduleDate = "", string Qty = "",
                                           string ManufactureOrder_details = "", string BOMMasterId = "", string CustomerId = "",
                                           string BranchCode = "", string Warehouse="", string LoginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[10];


            objParam[0] = new SqlParameter("@ManufactureOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = ManufactureOrderId;


            objParam[1] = new SqlParameter("@MaterialId", SqlDbType.Int);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToInt32(MaterialId);


            objParam[2] = new SqlParameter("@ScheduleDate", SqlDbType.DateTime);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Convert.ToDateTime(ScheduleDate);


            objParam[3] = new SqlParameter("@Qty", SqlDbType.Decimal);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Convert.ToDecimal(Qty);

            objParam[4] = new SqlParameter("@ManufactureOrder_details", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = ManufactureOrder_details;

            objParam[5] = new SqlParameter("@BOMMasterId", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = BOMMasterId;

            objParam[6] = new SqlParameter("@CustomerId", SqlDbType.Int);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Convert.ToInt32(CustomerId);

            objParam[7] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = BranchCode;

            objParam[8] = new SqlParameter("@Warehouse", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = Warehouse;

            objParam[9] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = LoginUser;


            var result = objMain.ExecuteStoreProcedure("procSdManufactureOrderInsert", objParam);

            string json = "";
            if (result != null)
            {
                if (result.Rows.Count > 0)
                {
                    json = result.Rows[0][0].ToString();
                }
            }


            return json;
        }


        [WebMethod]
        public static string UpdateManufactureStatusAndStock(string ManufactureOrderId = "", string LoginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[2];


            objParam[0] = new SqlParameter("@ManufactureOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = ManufactureOrderId;


            objParam[1] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = LoginUser;


            var result = objMain.ExecuteStoreProcedure("procSdManufactureStatusAndStockUpdate", objParam);

            string json = "";
            if (result != null)
            {
                if (result.Rows.Count > 0)
                {
                    json = result.Rows[0][0].ToString();
                }
            }


            return json;
        }



        [WebMethod]
        public static string MaterialMasterList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where BOM='Y'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }

    }
}