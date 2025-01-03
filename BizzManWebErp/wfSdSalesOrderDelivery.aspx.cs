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
    public partial class wfSdSalesOrderDelivery : System.Web.UI.Page
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
        public static string FetchDeliveryOrderMasterList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtDeliveryMasterList = new DataTable();

            try
            {

                dtDeliveryMasterList = objMain.dtFetchData(@"select so.SalesOrderId,c.CustomerName,CONVERT(nvarchar,so.QuotationDate,103) as QuotationDate
                                                              ,CONVERT(nvarchar,so.ExpirationDate,103) as ExpirationDate,so.PaymentTerms,so.TotalAmount,isnull(so.DeliveryStatus,'') as DeliveryStatus
                                                              from tblSdSalesOrder so
                                                              join tblCrmCustomers c on so.CustomerId=c.CustomerId
                                                              where so.OrderStatusId not in(1,4)");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDeliveryMasterList);
        }

        [WebMethod]
        public static string FetchDeliveryOrderListDownload(string SalesOrderId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDeliveryOrderList = new DataTable();

            try
            {

                dtDeliveryOrderList = objMain.dtFetchData(@"select so.SalesOrderId,c.CustomerName,CONVERT(nvarchar,so.QuotationDate,103) as QuotationDate
                                                              ,CONVERT(nvarchar,so.ExpirationDate,103) as ExpirationDate,so.PaymentTerms,so.TotalAmount,isnull(so.DeliveryStatus,'') as DeliveryStatus
                                                              from tblSdSalesOrder so
                                                              join tblCrmCustomers c on so.CustomerId=c.CustomerId
                                                              where so.OrderStatusId not in(1,4)" + (SalesOrderId != "" ? " and so.SalesOrderId in(SELECT Item FROM [dbo].[SplitString] ('" + SalesOrderId + "',','))" : "") + " ");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtDeliveryOrderList.TableName = "DeliveryOrderList";
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dtDeliveryOrderList);
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
        public static string FetchDeliveryOrderMasterDetails(string SalesOrderId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDeliveryOrderMasterDetails = new DataTable();

            try
            {

                dtDeliveryOrderMasterDetails = objMain.dtFetchData(@"select so.SalesOrderId,c.CustomerName,CONVERT(nvarchar,so.QuotationDate,103) as QuotationDate,so.OrderStatusId
                                                              ,CONVERT(nvarchar,so.ExpirationDate,103) as ExpirationDate,so.PaymentTerms,so.TotalAmount,isnull(so.DeliveryStatus,'') as DeliveryStatus
                                                              from tblSdSalesOrder so
                                                              join tblCrmCustomers c on so.CustomerId=c.CustomerId
                                                          where so.OrderStatusId not in(1,3,4) and so.SalesOrderId='" + SalesOrderId + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDeliveryOrderMasterDetails);
        }


        [WebMethod]
        public static string FetchDeliveryProductDetailsList(string SalesOrderId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDeliveryProductDetailsList = new DataTable();

            try
            {

                dtDeliveryProductDetailsList = objMain.dtFetchData(@"select sp.MaterialId,mo.ManufactureId,b.BranchName,m.MaterialName,sp.Qty,m.UnitMesure,
                                                                    (Select isnull(sum(sm.QtyIn)-sum(sm.QtyOut),0) from tblMmMaterialStockMaster sm where 
                                                                    sm.MaterialMasterId=sp.MaterialId) as AvailableQty,isnull(sp.DeliveredQty,0) as DeliveredQty
                                                                    from tblSdSalesOrderProductDetails sp
                                                                    join tblMmMaterialMaster m on m.id=sp.MaterialId
                                                                    join tblSdSalesOrder so on so.SalesOrderId=sp.SalesOrderId
                                                                    left join tblSdManufacturingOrder mo on mo.SalesOrderId=sp.SalesOrderId and mo.MaterialMasterId=sp.MaterialId
                                                                    left join tblHrBranchMaster b on b.BranchCode=mo.BranchCode
                                                                    where so.OrderStatusId not in(1,3,4) and sp.SalesOrderId='" + SalesOrderId + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDeliveryProductDetailsList);
        }


        [WebMethod]
        public static string UpdateDeliveryAndStockStatus(string SalesOrderId = "", string LoginUser = "", string order_details="",string TransportNo="",string DeliveryDate="",string DeliveryTime="")
        {

           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[6];


            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = SalesOrderId;

            objParam[1] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = LoginUser;

            objParam[2] = new SqlParameter("@SalesOrderDelivery_details", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = order_details;

            objParam[3] = new SqlParameter("@DeliveryDate", SqlDbType.DateTime);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Convert.ToDateTime(DeliveryDate);

            objParam[4] = new SqlParameter("@DeliveryTime", SqlDbType.Time);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = DateTime.Parse(DeliveryTime).TimeOfDay;

            objParam[5] = new SqlParameter("@TransportNo", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = TransportNo;


            var result = objMain.ExecuteStoreProcedure("procSdSalesOrderDeliveryStatusAndStockUpdate", objParam);

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
        public static string CancelDelivery(string SalesOrderId = "", string LoginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[9];


            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = SalesOrderId;


            var result = objMain.ExecuteStoreProcedure("procSdSalesOrderDeliveryCancel", objParam);

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
        public static string SalesOrderList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDeliveryMasterList = new DataTable();

            try
            {

                dtDeliveryMasterList = objMain.dtFetchData(@"select SalesOrderId from tblSdSalesOrder where OrderStatusId not in(1,3,4)");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDeliveryMasterList);
        }

        [WebMethod]
        public static string FetchDeliveryOrderDetails(string SalesOrderId="")
        {
           // clsMain objMain = new clsMain();
            DataTable dtDeliveryMasterList = new DataTable();

            try
            {

                dtDeliveryMasterList = objMain.dtFetchData(@"select SalesOrderDeliveryId,CONVERT(nvarchar,DeliveryDate,103) as DeliveryDate,CONVERT(varchar(15),DeliveryTime,100) as DeliveryTime,TransportNo from tblSdSalesOrderDeliveryMaster where SalesOrderId='"+ SalesOrderId + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDeliveryMasterList);
        }


        [WebMethod]
        public static string FetchDeliveryOrderDetailsList(string SalesOrderDeliveryId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtDeliveryMasterList = new DataTable();

            try
            {

                dtDeliveryMasterList = objMain.dtFetchData(@"select m.MaterialName,sod.MaterialQty,m.UnitMesure,m.MRP
                                      from tblSdSalesOrderDeliveryDetail sod 
                                      join tblMmMaterialMaster m on m.Id=sod.MaterialId where sod.SalesOrderDeliveryId='" + SalesOrderDeliveryId + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtDeliveryMasterList);
        }



    }
}