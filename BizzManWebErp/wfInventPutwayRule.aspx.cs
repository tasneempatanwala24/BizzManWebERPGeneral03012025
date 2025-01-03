using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfInventPutwayRule : System.Web.UI.Page
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
        public static string BindPutwayRule()
        {
           // clsMain objMain = new clsMain();
            DataTable dtputway = new DataTable();

            try
            {

                dtputway = objMain.dtFetchData(@"
select M.Id, M.ProductId,MM.MaterialName ProductName, M.FromWarehouseId,
W.Name FromWareHouse,M.ToWarehouseId,K.Name ToWareHouse,M.BranchCode,
B.BranchName from tblInventPutawayRule M  join
tblMmMaterialMaster MM on M.ProductId = MM.Id join
tblFaWarehouseMaster W on M.FromWarehouseId = W.Id join
tblFaWarehouseMaster K on M.ToWarehouseId = K.Id join
tblHrBranchMaster B on M.BranchCode = B.BranchCode join tblMmCategoryMaster MC on MM.MaterialCategoryId=MC.Id");

                //  dtputway = objMain.dtFetchData(@"select Id,ProductId,FromWarehouseId,ToWarehouseId,BranchCode from tblInventPutawayRule");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtputway);
        }


        [WebMethod]
        public static string BindBranch()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtCompany = new DataTable();

            try
            {

                dtCompany = objMain.dtFetchData("SELECT BranchCode,BranchName FROM tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCompany);
        }

        [WebMethod]
        public static string BindWarehouse()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtwarehouse = new DataTable();

            try
            {

                dtwarehouse = objMain.dtFetchData("SELECT Id,Name FROM tblFaWarehouseMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtwarehouse);
        }


        [WebMethod]
        public static string BindProductCategory()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtproductCat = new DataTable();

            try
            {

                dtproductCat = objMain.dtFetchData("SELECT Id,Name FROM tblMmCategoryMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtproductCat);
        }


        [WebMethod]
        public static string BindProduct()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtproduct = new DataTable();

            try
            {
               
                    dtproduct = objMain.dtFetchData("SELECT Id,MaterialName FROM tblMmMaterialMaster");
                
             
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtproduct);
        }

        [WebMethod]
        public static string AddPutway(string putwayId,string productId = "", string productcatid = "", string fromWareHouse = "", string toWareHouse = "", string branchCode = "", string loginUser = "")
        {
            try
            {
              //  clsMain objMain = new clsMain();
                if (string.IsNullOrEmpty(productId) && string.IsNullOrEmpty(productcatid)) { new DataException("Invalid Product"); }

                SqlParameter[] objParam = new SqlParameter[7];


                objParam[0] = new SqlParameter("@putwayId", SqlDbType.BigInt);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = (string.IsNullOrEmpty(putwayId) ? 0 : Convert.ToInt32(putwayId));


                objParam[1] = new SqlParameter("@productid", SqlDbType.BigInt);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = Int64.TryParse(productId,out long mproductId)? mproductId :0;

                objParam[2] = new SqlParameter("@productcat", SqlDbType.BigInt);
                objParam[2].Direction = ParameterDirection.Input;
                objParam[2].Value = Int64.TryParse(productcatid, out long mproductcat) ? mproductcat : 0;

                objParam[3] = new SqlParameter("@fromwarehouse", SqlDbType.BigInt);
                objParam[3].Direction = ParameterDirection.Input;
                objParam[3].Value = (string.IsNullOrEmpty(fromWareHouse.Trim()) ? 0 : Convert.ToInt32(fromWareHouse));

                objParam[4] = new SqlParameter("@towarehouse", SqlDbType.BigInt);
                objParam[4].Direction = ParameterDirection.Input;
                objParam[4].Value = (string.IsNullOrEmpty(toWareHouse.Trim()) ? 0 : Convert.ToInt32(toWareHouse));

                objParam[5] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
                objParam[5].Direction = ParameterDirection.Input;
                objParam[5].Value = branchCode;


                objParam[6] = new SqlParameter("@user", SqlDbType.NVarChar);
                objParam[6].Direction = ParameterDirection.Input;
                objParam[6].Value = loginUser;

                var result = objMain.ExecuteProcedure("procInventPutwayRule", objParam);

                return "";
            }
            catch (Exception)
            {

                throw;
            }          


            return "";
        }


    }
}