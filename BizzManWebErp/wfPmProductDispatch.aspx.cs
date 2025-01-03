using DocumentFormat.OpenXml.Wordprocessing;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ListItem = System.Web.UI.WebControls.ListItem;

namespace BizzManWebErp
{
    public partial class wfPmProductDispatch : System.Web.UI.Page
    {
        static clsMain objMain;
        //
        protected void Page_Load(object sender, EventArgs e)
        {
            //Session["assignedEmployee"] = 

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

        [WebMethod]
        public static string ClientList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtClientList = new DataTable();

            try
            {

                dtClientList = objMain.dtFetchData("select CustomerName from [tblCrmCustomers]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtClientList);
        }
      
        [WebMethod]
        public static string EmployeeList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtEmployeeList = new DataTable();

            try
            {

                dtEmployeeList = objMain.dtFetchData("select EmpName from [tblHrEmpMaster]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtEmployeeList);
        }


        [WebMethod]
        public static string GetSalesOrderDetailsById(string salesorderid)
        {
            clsMain objMain = new clsMain();

            DataTable dtSalesOrderDetails = new DataTable();
            try
            {
                dtSalesOrderDetails = objMain.dtFetchData(@"select SalesOrderId,GSTTreatment,DeliveryDateTime,Currency,
                    OrderDate,Department,ExpirationDate,PaymentTerms,DeliveryCharges,Advance,ServiceCharge,TotalAmount,OutstandingAmount,Amount,
                    MaterialName,QTY,UnitMeasure,Stock,MRP,DiscountPercent,IntegratedTaxPercent,Package,CustomerName
                    FROM tblPmAddSalesOrderDetails where SalesOrderId='" + salesorderid + "'");

                //System.Data.DataView view = dtSalesOrderDetails.DefaultView;
                //if (view.Count > 0)
                //{
                //    grdSalesOrderDetails.Visible = true;
                //    grdSalesOrderDetails.DataSource = view;
                //    grdSalesOrderDetails.DataBind();
                //}
                //else
                //{
                //    grdSalesOrderDetails.Visible = false;
                //}

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderDetails);

        }
        [WebMethod]
        public static string FetchProductDetailsList()
        {
            //  clsMain objMain = new clsMain();
            DataTable dtProductList = new DataTable();

            try
            {
                dtProductList = objMain.dtFetchData(@" SELECT pd.SalesOrderId,CAST(pd.DeliveryDate AS Date) AS DateOfDelivery,
                                                CAST(pd.AssignmentDate AS date)AS DateOfAssignment,pd.ClientName,pd.AssignTeam,sd.SalesOrderId,sd.CustomerName
							                    ,sd.[OrderDate],sd.[GSTTreatment],sd.[DeliveryDateTime],sd.[Currency] ,sd.[QuotationId],sd.[Department],sd.[BranchCode],sd.[ExpirationDate],sd.[TermsConditions],sd.[MaterialName]
                                                  ,sd.[PaymentTerms],sd.[DeliveryCharges],sd.[Advance],sd.[TotalAmount],sd.[OutstandingAmount],sd.[QTY],sd.[UnitMeasure],sd.[Stock],sd.[MRP],sd.[DiscountPercent],sd.[IntegratedTaxPercent],sd.[Amount]
                                               ,sd.[Package],sd.[ServiceCharge] FROM tblPmProductDispatch pd,tblPmAddSalesOrderDetails sd where pd.SalesOrderId=sd.SalesOrderId


		
");
            }
            catch (Exception ex)
            {
                // return "";
            }

            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Arrays
            };
            return JsonConvert.SerializeObject(dtProductList, settings);
        }
        [WebMethod]
        public static string SalesOrderDetailsById(GridView grdSalesOrderDetails,string SalesOrderId="")
        {
            clsMain objMain = new clsMain();

            DataTable dtSalesOrderDetails = new DataTable();
            try
            {
                dtSalesOrderDetails = objMain.dtFetchData("select CustomerName FROM tblPmAddSalesOrderDetails where SalesOrderId='" + SalesOrderId + "'");

                System.Data.DataView view = dtSalesOrderDetails.DefaultView;
                if (view.Count > 0)
                {
                    grdSalesOrderDetails.Visible = true;
                    grdSalesOrderDetails.DataSource = view;
                    grdSalesOrderDetails.DataBind();
                }
                else
                {
                    grdSalesOrderDetails.Visible = false;
                }

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderDetails);
           
        }


        [WebMethod]
        public static string SalesOrderList()
        {
            // clsMain objMain = new clsMain();
            DataTable dtSalesOrderList = new DataTable();

            try
            {

                dtSalesOrderList = objMain.dtFetchData("select SalesOrderId from [tblPmAddSalesOrderDetails]");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtSalesOrderList);
        }

        [WebMethod]
        public static string AddProductDetails(string SalesOrderId, string ClientName, string AssignmentDate,string DeliveryDate,
           string AssignTeam, string CreateUser)

        {

            //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[7];

            objParam[0] = new SqlParameter("@SalesOrderId", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = SalesOrderId;

            objParam[1] = new SqlParameter("@ClientName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = ClientName;

            objParam[2] = new SqlParameter("@AssignmentDate", SqlDbType.DateTime);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = AssignmentDate;

            objParam[3] = new SqlParameter("@DeliveryDate", SqlDbType.DateTime);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = DeliveryDate;

            objParam[4] = new SqlParameter("@AssignTeam", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = AssignTeam;

            objParam[5] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = CreateUser;

            objParam[6] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = CreateUser;

            var result = objMain.ExecuteProcedure("procPmProductDispatch", objParam);

            return "";
        }
    }
}