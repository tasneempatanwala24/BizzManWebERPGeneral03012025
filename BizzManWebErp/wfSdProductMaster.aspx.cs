using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfSdProductMaster : System.Web.UI.Page
    {
        //added on 22 Feb 2024
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

                    //added on 22 Feb 2024
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
        public static string MainCategoryMasterList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("SELECT Id,Name FROM tblMmCategoryMaster WHERE CategoryType ='Main category'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        [WebMethod]
        public static string CategoryMasterList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("SELECT Id,Name FROM tblMmCategoryMaster WHERE CategoryType ='Category'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }
        [WebMethod]
        public static string ProjectList()
        {
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("select Id,ProjectName FROM tblSdProjectMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }

        [WebMethod]
        public static string BindPackageList()
        {
            DataTable dtPackageList = new DataTable();

            try
            {

                dtPackageList = objMain.dtFetchData("select PackagingName as Id,PackagingName FROM tblMmItemPackagingMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtPackageList);
        }

        [WebMethod]
        public static string SubCategoryMasterList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("SELECT Id,Name FROM tblMmCategoryMaster WHERE CategoryType ='Sub Category'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        [WebMethod]
        public static string BranchMasterList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select BranchCode, BranchName FROM tblHrBranchMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            // return JsonConvert.SerializeObject(dtBranchList);

            string json = JsonConvert.SerializeObject(dtBranchList, Formatting.None);
            dtBranchList.Clear();
            return json;

        }

        [WebMethod]
        public static string DepartmentMasterList()
        {
            DataTable dtDepartmentList = new DataTable();

            try
            {

                dtDepartmentList = objMain.dtFetchData("select Id, DeptName FROM tblHrDeptMaster");
            }
            catch (Exception ex)
            {
                return "";
            }
            string json = JsonConvert.SerializeObject(dtDepartmentList, Formatting.None);
            dtDepartmentList.Clear();
            return json;

        }

        [WebMethod]
        public static string MaterialGroupList()
        {
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select GroupName FROM tblMmGroupMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        [WebMethod]
        public static string UnitMesureList()
        {
            DataTable dtUnitList = new DataTable();

            try
            {

                dtUnitList = objMain.dtFetchData("select UnitMesureName FROM tblFaUnitMesureMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtUnitList);
        }
        //BindCurrencyList

        //================================
        //=================================
        [WebMethod]
        public static string BindCurrencyList()
        {
            DataTable dtCurrencyList = new DataTable();

            try
            {

                dtCurrencyList = objMain.dtFetchData("select Id,Currency FROM tblMmCurrencyMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtCurrencyList);
        }
        //============================
        //===========================

        [WebMethod]
        public static string BindVendorList()
        {
            DataTable dtVendorList = new DataTable();

            try
            {

                dtVendorList = objMain.dtFetchData("select Id,VendorName FROM tblMmVendorMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtVendorList);
        }
        [WebMethod]
        public static string LinkItemList()
        {
            DataTable dtList = new DataTable();

            try
            {

                dtList = objMain.dtFetchData("SELECT Id,MaterialName FROM tblMmMaterialMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtList);
        }
        [WebMethod]
        public static string FetchLinkItemUOM(string LinkItemName = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtUOM = new DataTable();

            try
            {

                dtUOM = objMain.dtFetchData(@"select UnitMesure  from tblMmMaterialMaster where Id=" + "'" + LinkItemName + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtUOM, Formatting.None);
            return json;
        }
        [WebMethod]
        public static string FetchMaterialDetails(string MaterialId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialList = new DataTable();

            try
            {

                dtMaterialList = objMain.dtFetchData(@"select mm.Id,MaterialCategoryId,MaterialName,UnitMesure,Description,MeterialGroup,UnitMesure,AltUnitMesure,RelationUnitMesure,
                                                       isnull(cast([IntegratedTaxPercent] as varchar),'') as IntegratedTaxPercent
                                                          ,isnull(cast([CentralTaxPercent] as varchar),'') as CentralTaxPercent
                                                          ,isnull(cast([StateTaxPercent] as varchar),'') as StateTaxPercent
                                                          ,isnull(cast([CessPercent] as varchar),'') as CessPercent,
                                                    isnull(MinimumStockLevel,0) as MinimumStockLevel,isnull(MaximumStockLevel,0) as MaximumStockLevel,
                                                    isnull([GstApplicable],'') as GstApplicable,isnull(CanPurchase,0) as CanPurchase,isnull(CanSale,0) as CanSale,  
                                                    isnull(MaterialType,'') as MaterialType,isnull(PurchaseDescription,'') as PurchaseDescription,isnull(ControlPolicy,'') as ControlPolicy,
                                                    isnull(SaleDescription,'') as SaleDescription,isnull(InvoicingPolicy,'') as InvoicingPolicy,
                                                       RelationSalesUnitMesure,RateOfDuty,NatureOfItem,HsnNo,BarCode,CostingMethod,BOM,MaintainInBatch,MRP,
													   isnull(mi.DoorShipment,0) as DoorShipment,isnull(mi.Replenish,0) as Replenish,isnull(mi.ResupplySubcontractoronOrder,0) as ResupplySubcontractoronOrder,
													   isnull(mi.Buy,0) as Buy,isnull(mi.Manufacture,0) as Manufacture,isnull(mi.Weight,0) as Weight,isnull(mi.Volume,0) as Volume,
													   isnull(mi.ManufactureLeadTime,0) as ManufactureLeadTime,isnull(mi.CustomerLeadTime,0) as CustomerLeadTime,isnull(mi.Tracking,'') as Tracking,
													   isnull(mi.ExpirationTime,0) as ExpirationTime,isnull(mi.BestBeforeTime,0) as BestBeforeTime,isnull(mi.RemovalTime,0) as RemovalTime,isnull(mi.AlertTime,0) as AlertTime,
													   isnull(mi.DeliveryOrderDescription,'') as DeliveryOrderDescription,
													   isnull(mi.ReceiptsDescription,'') as ReceiptsDescription,isnull(mi.InternalTransferDescription,'') as InternalTransferDescription
													   ,mm.MainCategoryId as MainCategoryId,mm.SubCategoryId as SubCategoryId,mm.BranchCode as BranchCode,mm.DepartmentId as DepartmentId,
                                                        mm.LinkItem,mm.LinkItemId as LinkItemId,mm.LinkItemQTY,mm.LinkItemUnitMeasure,mm.Discount,CAST(MaterialImage as varchar(max))[MaterialImage],
                                                        mm.Alias,mm.Active,mm.CanManufacture,ISNULL(mm.ProjectMasterId,0) AS ProjectMasterId
                                                       from tblMmMaterialMaster mm left join tblMmMaterialInventoryDetails mi on mi.MaterialMasterId=mm.Id where mm.Id=" + MaterialId);
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtMaterialList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchPackagingDetailList(string MaterialId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtPackagingDetailList = new DataTable();

            try
            {

                dtPackagingDetailList = objMain.dtFetchData(@"select p.Id AS Id, p.Packaging AS PackagingName,p.Qty,pm.UnitMesure
                                                                  from tblMmMaterialPackagingDetails p join tblMmItemPackagingMaster pm
                                                                    on p.Packaging = pm.PackagingName
                                                                  where p.MaterialMasterId=" + MaterialId);
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtPackagingDetailList, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string FetchUOM(string PackageName = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtUOM = new DataTable();

            try
            {

                dtUOM = objMain.dtFetchData(@"select UnitMesure from tblMmItemPackagingMaster where PackagingName=" + "'" + PackageName + "'");
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtUOM, Formatting.None);
            return json;
        }

        [WebMethod]
        public static string CheckMaterialAvailability(string MaterialName, string isUpdate)
        {
            //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
                    if (objMain == null)
                        objMain = new clsMain();

                    checkId = objMain.blSearchDataHO(string.Format("select 1 from tblMmMaterialMaster where MaterialName='{0}'", MaterialName));
                }
                else
                {
                    checkId = false;
                }
            }
            catch (Exception ex)
            {
                return "False";
            }

            return JsonConvert.SerializeObject(checkId.ToString());
        }

        [WebMethod]
        public static string FetchMaterialList()
        {
            DataTable dtEmpList = new DataTable();

            try
            {

                dtEmpList = objMain.dtFetchData(@"select e.*, 
	br.Name,
	linkitem.MaterialName as LinkItemName
	from tblMmMaterialMaster e
	inner join tblMmCategoryMaster br on e.MaterialCategoryId=br.Id
	left join tblMmMaterialMaster linkitem on  linkitem.Id = e.LinkItemId");
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
            return JsonConvert.SerializeObject(dtEmpList, settings);
        }

        [WebMethod]
        public static string GetMaterialImageById(string Id = "")
        {

            // clsMain objMain = new clsMain();
            DataTable dtImages = new DataTable();

            try
            {
                string sqlQuery = $"SELECT CAST(MaterialImage as varchar(max)) AS MaterialImage FROM tblMmMaterialMaster WHERE Id = " + "'" + Id + "'";

                dtImages = objMain.dtFetchData(sqlQuery);
            }
            catch (Exception ex)
            {
            }

            return JsonConvert.SerializeObject(dtImages, Formatting.None);

        }

        [WebMethod]
        public static string AddDetails(string chkCanPurchased, string chkCanSold, string MaterialType, string MainCategoryId, string MaterialCategoryId,
                                        string SubCategoryId, string BranchCode, string MaterialGroup, int? DepartmentId, string MaterialMasterId
                                        , string MaterialName, string UnitMesure, string MRP, string BarCode, string HsnNo,
                                        string Description, string loginUser, string inventory_packaging_details, string MaterialImage,
                                        string MinimumStockLevel = "", string MaximumStockLevel = "", string NatureOfItem = "Goods", string MaintainInBatch = "n",
                                        string BOM = "n", string LinkItem = "n", string LinkItemId = "", string LinkItemQty = "", string LinkItemUM = "",
                                        string CentralTax = "0", string StateTax = "0", string Cess = "0", string IntegratedTax = "0",
                                        string GstApplicable = "n", string CostingMethod = "FIFO", string Discount = "0", string Alias = "",
                                        string manufacture = "0", string Active = "y",string ProjectId=""
                                        )
        {

            SqlParameter[] objParam = new SqlParameter[40];

            objParam[0] = new SqlParameter("@chkCanPurchased", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(chkCanPurchased);

            objParam[1] = new SqlParameter("@chkCanSold", SqlDbType.Int);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToInt32(chkCanSold);

            objParam[2] = new SqlParameter("@MaterialType", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = MaterialType;

            objParam[3] = new SqlParameter("@MainCategoryId", SqlDbType.Int);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Convert.ToInt32(MainCategoryId);

            objParam[4] = new SqlParameter("@MaterialCategoryId", SqlDbType.Int);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = Convert.ToInt32(MaterialCategoryId);

            objParam[5] = new SqlParameter("@SubCategoryId", SqlDbType.Int);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Convert.ToInt32(SubCategoryId);

            objParam[6] = new SqlParameter("@BranchCode", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = BranchCode;

            objParam[7] = new SqlParameter("@MaterialGroup", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = MaterialGroup;

            objParam[8] = new SqlParameter("@DepartmentId", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = DepartmentId;

            objParam[9] = new SqlParameter("@MaterialMaster_Id", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = MaterialMasterId;

            objParam[10] = new SqlParameter("@MaterialName", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = MaterialName;

            objParam[11] = new SqlParameter("@CostingMethod", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = CostingMethod;


            objParam[12] = new SqlParameter("@UnitMesure", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = UnitMesure;

            objParam[13] = new SqlParameter("@NatureOfItem", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = !string.IsNullOrEmpty(NatureOfItem) ? NatureOfItem : "Goods";

            objParam[14] = new SqlParameter("@MaintainInBatch", SqlDbType.NVarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = !string.IsNullOrEmpty(MaintainInBatch) ? MaintainInBatch : "n";

            objParam[15] = new SqlParameter("@MRP", SqlDbType.Decimal);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = Convert.ToDecimal(MRP);

            objParam[16] = new SqlParameter("@MinimumStockLevel", SqlDbType.Decimal);
            objParam[16].Direction = ParameterDirection.Input;
            objParam[16].Value = !string.IsNullOrEmpty(MinimumStockLevel) ? Convert.ToDecimal(MinimumStockLevel) : 0;

            objParam[17] = new SqlParameter("@BOM", SqlDbType.NVarChar);
            objParam[17].Direction = ParameterDirection.Input;
            objParam[17].Value = !string.IsNullOrEmpty(BOM) ? BOM : "Y";

            objParam[18] = new SqlParameter("@GstApplicable", SqlDbType.NVarChar);
            objParam[18].Direction = ParameterDirection.Input;
            objParam[18].Value = GstApplicable;

            objParam[19] = new SqlParameter("@BarCode", SqlDbType.NVarChar);
            objParam[19].Direction = ParameterDirection.Input;
            objParam[19].Value = BarCode;

            objParam[20] = new SqlParameter("@HsnNo", SqlDbType.NVarChar);
            objParam[20].Direction = ParameterDirection.Input;
            objParam[20].Value = HsnNo;

            objParam[21] = new SqlParameter("@CentralTax", SqlDbType.Decimal);
            objParam[21].Direction = ParameterDirection.Input;
            objParam[21].Value = Convert.ToDecimal(!string.IsNullOrEmpty(CentralTax) ? CentralTax : "0");

            objParam[22] = new SqlParameter("@StateTax", SqlDbType.Decimal);
            objParam[22].Direction = ParameterDirection.Input;
            objParam[22].Value = Convert.ToDecimal(!string.IsNullOrEmpty(StateTax) ? StateTax : "0");

            objParam[23] = new SqlParameter("@Cess", SqlDbType.Decimal);
            objParam[23].Direction = ParameterDirection.Input;
            objParam[23].Value = Convert.ToDecimal(!string.IsNullOrEmpty(Cess) ? Cess : "0");

            objParam[24] = new SqlParameter("@IntegratedTax", SqlDbType.Decimal);
            objParam[24].Direction = ParameterDirection.Input;
            objParam[24].Value = Convert.ToDecimal(!string.IsNullOrEmpty(IntegratedTax) ? IntegratedTax : "0");

            objParam[25] = new SqlParameter("@MaximumStockLevel", SqlDbType.Decimal);
            objParam[25].Direction = ParameterDirection.Input;
            objParam[25].Value = !string.IsNullOrEmpty(MaximumStockLevel) ? Convert.ToDecimal(MaximumStockLevel) : 0;

            objParam[26] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[26].Direction = ParameterDirection.Input;
            objParam[26].Value = Description;

            objParam[27] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[27].Direction = ParameterDirection.Input;
            objParam[27].Value = loginUser;

            objParam[28] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[28].Direction = ParameterDirection.Input;
            objParam[28].Value = loginUser;

            objParam[29] = new SqlParameter("@inventory_packaging_details", SqlDbType.NVarChar);
            objParam[29].Direction = ParameterDirection.Input;
            objParam[29].Value = inventory_packaging_details;

            objParam[30] = new SqlParameter("@LinkItem", SqlDbType.NVarChar);
            objParam[30].Direction = ParameterDirection.Input;
            objParam[30].Value = LinkItem;

            objParam[31] = new SqlParameter("@LinkItemId", SqlDbType.Int);
            objParam[31].Direction = ParameterDirection.Input;
            objParam[31].Value = (!string.IsNullOrEmpty(LinkItemId) ? Convert.ToInt32(LinkItemId) : 0);

            objParam[32] = new SqlParameter("@LinkItemQty", SqlDbType.Decimal);
            objParam[32].Direction = ParameterDirection.Input;
            objParam[32].Value = (!string.IsNullOrEmpty(LinkItemQty) ? Convert.ToDecimal(LinkItemQty) : 0);

            objParam[33] = new SqlParameter("@LinkItemUM", SqlDbType.NVarChar);
            objParam[33].Direction = ParameterDirection.Input;
            objParam[33].Value = LinkItemUM;

            objParam[34] = new SqlParameter("@Discount", SqlDbType.Decimal);
            objParam[34].Direction = ParameterDirection.Input;
            objParam[34].Value = (!string.IsNullOrEmpty(Discount) ? Convert.ToDecimal(Discount) : 0);

            objParam[35] = new SqlParameter("@MaterialImage", SqlDbType.VarBinary);
            objParam[35].Direction = ParameterDirection.Input;
            objParam[35].Value = Encoding.UTF8.GetBytes(MaterialImage);

            objParam[36] = new SqlParameter("@manufacture", SqlDbType.Int);
            objParam[36].Direction = ParameterDirection.Input;
            objParam[36].Value = Convert.ToInt32(manufacture);

            objParam[37] = new SqlParameter("@Alias", SqlDbType.NVarChar);
            objParam[37].Direction = ParameterDirection.Input;
            objParam[37].Value = Alias;

            objParam[38] = new SqlParameter("@Active", SqlDbType.NVarChar);
            objParam[38].Direction = ParameterDirection.Input;
            objParam[38].Value = Active;

            objParam[39] = new SqlParameter("@ProjectId", SqlDbType.NVarChar);
            objParam[39].Direction = ParameterDirection.Input;
            objParam[39].Value = ProjectId;

            var result = objMain.ExecuteProcedure("procSdProductMaster", objParam);
            string json = JsonConvert.SerializeObject(result, Formatting.None);
            return json;
        }


    }
}