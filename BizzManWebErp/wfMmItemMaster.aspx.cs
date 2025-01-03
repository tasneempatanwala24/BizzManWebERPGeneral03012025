using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfMmItemMaster : System.Web.UI.Page
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
        public static string FetchMaterialDetails(string MaterialId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtMaterialList = new DataTable();

            try
            {

                dtMaterialList = objMain.dtFetchData(@"select mm.Id,MaterialCategoryId,MaterialName,UnitMesure,Description,MeterialGroup,SalesUnitMesure,AltUnitMesure,RelationUnitMesure,
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
													   ,mm.MainCategoryId as MainCategoryId,mm.SubCategoryId as SubCategoryId,mm.BranchCode as BranchCode,mm.DepartmentId as DepartmentId
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
        public static string FetchPurchaseVendorDetailList(string MaterialId = "")
        {
            //  clsMain objMain = new clsMain();
            DataTable dtPurchaseVendorDetailList = new DataTable();

            try
            {

                dtPurchaseVendorDetailList = objMain.dtFetchData(@"select v.*,c.Currency,mm.UnitMesure,vm.VendorName
                                                                  from tblMmMaterialPurchaseVendorDetails v 
                                                                  left join tblMmCurrencyMaster c on v.CurrencyId=c.Id
                                                                  join tblMmMaterialMaster mm on mm.Id=v.MaterialMasterId
                                                                  join tblMmVendorMaster vm on vm.Id=v.VendorId
                                                                  where v.MaterialMasterId=" + MaterialId);
            }
            catch (Exception ex)
            {
                // return "";
            }


            string json = JsonConvert.SerializeObject(dtPurchaseVendorDetailList, Formatting.None);
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
                /*
                dtEmpList = objMain.dtFetchData(@"select e.Id,e.MaterialCategoryId,d.GroupName,e.MaterialName,e.Description,a.UnitMesureName,br.Name,e.RelationUnitMesure,e.RelationSalesUnitMesure,
                                                e.RateOfDuty,e.NatureOfItem,e.HsnNo,e.BarCode,e.CostingMethod,e.BOM,e.MaintainInBatch,e.MRP,q.UnitMesureName as SUM,pr.UnitMesureName as AUM,e.SalesUnitMesure,e.AltUnitMesure
                                                from tblMmMaterialMaster e
                                                inner join tblFaUnitMesureMaster a on e.UnitMesure=a.Id
                                                inner join tblFaUnitMesureMaster q on e.SalesUnitMesure=q.Id
                                                inner join tblFaUnitMesureMaster pr on e.AltUnitMesure=pr.Id
                                                inner join tblMmGroupMaster d on e.MeterialGroup=d.Id
                                                inner join tblMmCategoryMaster br on e.MaterialCategoryId=br.Id");
                   -*/

                // dtEmpList = objMain.dtFetchData(@"select Id,MaterialCategoryId,MaterialName,UnitMesure,Description from tblMmMaterialMaster");

                dtEmpList = objMain.dtFetchData(@"select e.*,
                                                br.Name
                                                from tblMmMaterialMaster e
                                                inner join tblMmCategoryMaster br on e.MaterialCategoryId=br.Id");
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
        public static string AddDetails(string chkCanPurchased, string chkCanSold, string MaterialType, string MainCategoryId, string MaterialCategoryId,
                                        string SubCategoryId, string BranchCode, string MaterialGroup,int? DepartmentId, string UnitMesure, string MaterialMasterId
                                        , string RelationUnitMesure, string MaterialName, string CostingMethod, string SalesUnitMesure, string NatureOfItem,
                                        string RelationSalesUnitMesure, string MaintainInBatch, string MRP, string MinimumStockLevel, string BOM, string GstApplicable,
                                        string BarCode, string HsnNo, string CentralTax, string StateTax, string Cess, string IntegratedTax, string MaximumStockLevel,
                                        string Description, string loginUser, string InvoicingPolicy, string SaleDescription, string ExpirationTime, string BestBeforeTime,
                                        string RemovalTime, string AlertTime, string purchase_vendor_details, string ControlPolicy, string PurchaseDescription,
                                        string inventory_packaging_details, string DeliveryOrderDescription, string ReceiptsDescription, string InternalTransferDescription
                                        
                                        )
        {

            SqlParameter[] objParam = new SqlParameter[45];

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

            objParam[9] = new SqlParameter("@UnitMesure", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = UnitMesure;

            objParam[10] = new SqlParameter("@MaterialMaster_Id", SqlDbType.NVarChar);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = MaterialMasterId;

            objParam[11] = new SqlParameter("@RelationUnitMesure", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = RelationUnitMesure;

            objParam[12] = new SqlParameter("@MaterialName", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = MaterialName;

            objParam[13] = new SqlParameter("@CostingMethod", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = CostingMethod;


            objParam[14] = new SqlParameter("@SalesUnitMesure", SqlDbType.NVarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = SalesUnitMesure;

            objParam[15] = new SqlParameter("@NatureOfItem", SqlDbType.NVarChar);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = !string.IsNullOrEmpty(NatureOfItem) ? NatureOfItem : "Good";

            objParam[16] = new SqlParameter("@RelationSalesUnitMesure", SqlDbType.NVarChar);
            objParam[16].Direction = ParameterDirection.Input;
            objParam[16].Value = RelationSalesUnitMesure;

            objParam[17] = new SqlParameter("@MaintainInBatch", SqlDbType.NVarChar);
            objParam[17].Direction = ParameterDirection.Input;
            objParam[17].Value = !string.IsNullOrEmpty(MaintainInBatch) ? MaintainInBatch : "n" ;

            objParam[18] = new SqlParameter("@MRP", SqlDbType.Decimal);
            objParam[18].Direction = ParameterDirection.Input;
            objParam[18].Value = Convert.ToDecimal(MRP);

            objParam[19] = new SqlParameter("@MinimumStockLevel", SqlDbType.Decimal);
            objParam[19].Direction = ParameterDirection.Input;
            objParam[19].Value = Convert.ToDecimal(MinimumStockLevel);

            objParam[20] = new SqlParameter("@BOM", SqlDbType.NVarChar);
            objParam[20].Direction = ParameterDirection.Input;
            objParam[20].Value = !string.IsNullOrEmpty(BOM) ? BOM : "Y";

            objParam[21] = new SqlParameter("@GstApplicable", SqlDbType.NVarChar);
            objParam[21].Direction = ParameterDirection.Input;
            objParam[21].Value = GstApplicable;

            objParam[22] = new SqlParameter("@BarCode", SqlDbType.NVarChar);
            objParam[22].Direction = ParameterDirection.Input;
            objParam[22].Value = BarCode;

            objParam[23] = new SqlParameter("@HsnNo", SqlDbType.NVarChar);
            objParam[23].Direction = ParameterDirection.Input;
            objParam[23].Value = HsnNo;

            objParam[24] = new SqlParameter("@CentralTax", SqlDbType.Decimal);
            objParam[24].Direction = ParameterDirection.Input;
            objParam[24].Value = Convert.ToDecimal(!string.IsNullOrEmpty(CentralTax) ? CentralTax : "0");

            objParam[25] = new SqlParameter("@StateTax", SqlDbType.Decimal);
            objParam[25].Direction = ParameterDirection.Input;
            objParam[25].Value = Convert.ToDecimal(!string.IsNullOrEmpty(StateTax) ? StateTax : "0");

            objParam[26] = new SqlParameter("@Cess", SqlDbType.Decimal);
            objParam[26].Direction = ParameterDirection.Input;
            objParam[26].Value = Convert.ToDecimal(!string.IsNullOrEmpty(Cess) ? Cess : "0");

            objParam[27] = new SqlParameter("@IntegratedTax", SqlDbType.Decimal);
            objParam[27].Direction = ParameterDirection.Input;
            objParam[27].Value = Convert.ToDecimal(!string.IsNullOrEmpty(IntegratedTax) ? IntegratedTax : "0");

            objParam[28] = new SqlParameter("@MaximumStockLevel", SqlDbType.Decimal);
            objParam[28].Direction = ParameterDirection.Input;
            objParam[28].Value = Convert.ToDecimal(MaximumStockLevel);

            objParam[29] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[29].Direction = ParameterDirection.Input;
            objParam[29].Value = Description;

            objParam[30] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[30].Direction = ParameterDirection.Input;
            objParam[30].Value = loginUser;

            objParam[31] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[31].Direction = ParameterDirection.Input;
            objParam[31].Value = loginUser;

            objParam[32] = new SqlParameter("@InvoicingPolicy", SqlDbType.NVarChar);
            objParam[32].Direction = ParameterDirection.Input;
            objParam[32].Value = InvoicingPolicy;

            objParam[33] = new SqlParameter("@SaleDescription", SqlDbType.NVarChar);
            objParam[33].Direction = ParameterDirection.Input;
            objParam[33].Value = SaleDescription;

            objParam[34] = new SqlParameter("@ExpirationTime", SqlDbType.Int);
            objParam[34].Direction = ParameterDirection.Input;
            objParam[34].Value = (!string.IsNullOrEmpty(ExpirationTime) ? Convert.ToInt32(ExpirationTime) : 0);

            objParam[35] = new SqlParameter("@BestBeforeTime", SqlDbType.Int);
            objParam[35].Direction = ParameterDirection.Input;
            objParam[35].Value = (!string.IsNullOrEmpty(BestBeforeTime) ? Convert.ToInt32(BestBeforeTime) : 0);

            objParam[36] = new SqlParameter("@RemovalTime", SqlDbType.Int);
            objParam[36].Direction = ParameterDirection.Input;
            objParam[36].Value = (!string.IsNullOrEmpty(RemovalTime) ? Convert.ToInt32(RemovalTime) : 0);

            objParam[37] = new SqlParameter("@AlertTime", SqlDbType.Int);
            objParam[37].Direction = ParameterDirection.Input;
            objParam[37].Value = (!string.IsNullOrEmpty(AlertTime) ? Convert.ToInt32(AlertTime) : 0);

            objParam[38] = new SqlParameter("@purchase_vendor_details", SqlDbType.NVarChar);
            objParam[38].Direction = ParameterDirection.Input;
            objParam[38].Value = purchase_vendor_details;

            objParam[39] = new SqlParameter("@ControlPolicy", SqlDbType.NVarChar);
            objParam[39].Direction = ParameterDirection.Input;
            objParam[39].Value = ControlPolicy;

            objParam[40] = new SqlParameter("@PurchaseDescription", SqlDbType.NVarChar);
            objParam[40].Direction = ParameterDirection.Input;
            objParam[40].Value = PurchaseDescription;

            objParam[41] = new SqlParameter("@inventory_packaging_details", SqlDbType.NVarChar);
            objParam[41].Direction = ParameterDirection.Input;
            objParam[41].Value = inventory_packaging_details;

            objParam[42] = new SqlParameter("@DeliveryOrderDescription", SqlDbType.NVarChar);
            objParam[42].Direction = ParameterDirection.Input;
            objParam[42].Value = DeliveryOrderDescription;

            objParam[43] = new SqlParameter("@ReceiptsDescription", SqlDbType.NVarChar);
            objParam[43].Direction = ParameterDirection.Input;
            objParam[43].Value = ReceiptsDescription;

            objParam[44] = new SqlParameter("@InternalTransferDescription", SqlDbType.NVarChar);
            objParam[44].Direction = ParameterDirection.Input;
            objParam[44].Value = InternalTransferDescription;

            var result = objMain.ExecuteProcedure("procMmItemMaster", objParam);
            string json = JsonConvert.SerializeObject(result, Formatting.None);
            return json;
        }


    }
}