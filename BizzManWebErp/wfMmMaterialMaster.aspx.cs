using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfMmMaterialMaster : System.Web.UI.Page
    {
        //added on 12 Dec 2023
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

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
           // clsMain objMain = new clsMain();
            DataTable dtBranchList = new DataTable();

            try
            {

                dtBranchList = objMain.dtFetchData("select Id,Name FROM tblMmCategoryMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBranchList);
        }

        [WebMethod]
        public static string MaterialGroupList()
        {
          //  clsMain objMain = new clsMain();
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
          //  clsMain objMain = new clsMain();
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
           // clsMain objMain = new clsMain();
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
          //  clsMain objMain = new clsMain();
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

                dtPackagingDetailList = objMain.dtFetchData(@"select p.*,mm.UnitMesure,b.BranchName
                                                                  from tblMmMaterialPackagingDetails p
                                                                  join tblMmMaterialMaster mm on mm.Id=p.MaterialMasterId
                                                                  left join tblHrBranchMaster b on b.BranchCode=p.BranchCode
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
        public static string CheckMaterialAvailability(string MaterialName, string isUpdate)
        {
          //  clsMain objMain = new clsMain();
            bool checkId = new bool();

            try
            {

                if (isUpdate == "0")
                {
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
          //  clsMain objMain = new clsMain();
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
        public static string AddDetails(string MaterialCategoryId, string MaterialName, string UnitMesure, 
                                        string Description, string RateOfDuty, string NatureOfItem, string HsnNo, 
                                        string BarCode, string CostingMethod, string BOM, string MaintainInBatch,
                                        string MRP, string RelationUnitMesure, string RelationSalesUnitMesure,
                                        string SalesUnitMesure, string AltUnitMesure, string MeterialGroup,
                                        string GstApplicable, string CentralTax, string StateTax,
                                        string Cess, string IntegratedTax, string loginUser, string MinimumStockLevel, 
                                        string MaximumStockLevel, string MaterialType, string chkCanPurchased,
                                        string chkCanSold, string InvoicingPolicy, string SaleDescription,
                                        string purchase_vendor_details, string ControlPolicy,string PurchaseDescription,
                                        string DoorShipment, string Replenish, string ResupplySubcontractoronOrder,
                                        string Buy, string Manufacture, string Weight, string Volume,
                                        string ManufactureLeadTime, string CustomerLeadTime, string Tracking,
                                        string ExpirationTime, string BestBeforeTime, string RemovalTime,
                                        string AlertTime, string inventory_packaging_details, string DeliveryOrderDescription,
                                        string ReceiptsDescription, string InternalTransferDescription, string MaterialMasterId)
        {

           // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[53];

            objParam[0] = new SqlParameter("@MaterialCategoryId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(MaterialCategoryId);

            objParam[1] = new SqlParameter("@MaterialName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = MaterialName;

            objParam[2] = new SqlParameter("@UnitMesure", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = UnitMesure;


            objParam[3] = new SqlParameter("@Description", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Description;

            objParam[4] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = loginUser;

            objParam[5] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = loginUser;

            objParam[6] = new SqlParameter("@MeterialGroup", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = MeterialGroup;

            objParam[7] = new SqlParameter("@SalesUnitMesure", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = SalesUnitMesure;

            objParam[8] = new SqlParameter("@AltUnitMesure", SqlDbType.NVarChar);
            objParam[8].Direction = ParameterDirection.Input;
            objParam[8].Value = AltUnitMesure;

            objParam[9] = new SqlParameter("@RelationUnitMesure", SqlDbType.NVarChar);
            objParam[9].Direction = ParameterDirection.Input;
            objParam[9].Value = RelationUnitMesure;

            objParam[10] = new SqlParameter("@RateOfDuty", SqlDbType.Decimal);
            objParam[10].Direction = ParameterDirection.Input;
            objParam[10].Value = Convert.ToDecimal(RateOfDuty);

            objParam[11] = new SqlParameter("@NatureOfItem", SqlDbType.NVarChar);
            objParam[11].Direction = ParameterDirection.Input;
            objParam[11].Value = NatureOfItem;

            objParam[12] = new SqlParameter("@RelationSalesUnitMesure", SqlDbType.NVarChar);
            objParam[12].Direction = ParameterDirection.Input;
            objParam[12].Value = RelationSalesUnitMesure;

            objParam[13] = new SqlParameter("@HsnNo", SqlDbType.NVarChar);
            objParam[13].Direction = ParameterDirection.Input;
            objParam[13].Value = HsnNo;

            objParam[14] = new SqlParameter("@BarCode", SqlDbType.NVarChar);
            objParam[14].Direction = ParameterDirection.Input;
            objParam[14].Value = BarCode;

            objParam[15] = new SqlParameter("@CostingMethod", SqlDbType.NVarChar);
            objParam[15].Direction = ParameterDirection.Input;
            objParam[15].Value = CostingMethod;

            objParam[16] = new SqlParameter("@BOM", SqlDbType.NVarChar);
            objParam[16].Direction = ParameterDirection.Input;
            objParam[16].Value = BOM;

            objParam[17] = new SqlParameter("@MaintainInBatch", SqlDbType.NVarChar);
            objParam[17].Direction = ParameterDirection.Input;
            objParam[17].Value = MaintainInBatch;

            objParam[18] = new SqlParameter("@MRP", SqlDbType.Decimal);
            objParam[18].Direction = ParameterDirection.Input;
            objParam[18].Value = Convert.ToDecimal(MRP);

            objParam[19] = new SqlParameter("@GstApplicable", SqlDbType.NVarChar);
            objParam[19].Direction = ParameterDirection.Input;
            objParam[19].Value = GstApplicable;

            objParam[20] = new SqlParameter("@CentralTax", SqlDbType.Decimal);
            objParam[20].Direction = ParameterDirection.Input;
            objParam[20].Value = Convert.ToDecimal(!string.IsNullOrEmpty(CentralTax)? CentralTax:"0");

            objParam[21] = new SqlParameter("@StateTax", SqlDbType.Decimal);
            objParam[21].Direction = ParameterDirection.Input;
            objParam[21].Value = Convert.ToDecimal(!string.IsNullOrEmpty(StateTax) ? StateTax : "0");

            objParam[22] = new SqlParameter("@Cess", SqlDbType.Decimal);
            objParam[22].Direction = ParameterDirection.Input;
            objParam[22].Value = Convert.ToDecimal(!string.IsNullOrEmpty(Cess) ? Cess : "0");

            objParam[23] = new SqlParameter("@IntegratedTax", SqlDbType.Decimal);
            objParam[23].Direction = ParameterDirection.Input;
            objParam[23].Value = Convert.ToDecimal(!string.IsNullOrEmpty(IntegratedTax) ? IntegratedTax : "0");

            objParam[24] = new SqlParameter("@MinimumStockLevel", SqlDbType.Decimal);
            objParam[24].Direction = ParameterDirection.Input;
            objParam[24].Value = Convert.ToDecimal(MinimumStockLevel);

            objParam[25] = new SqlParameter("@MaximumStockLevel", SqlDbType.Decimal);
            objParam[25].Direction = ParameterDirection.Input;
            objParam[25].Value = Convert.ToDecimal(MaximumStockLevel);

            objParam[26] = new SqlParameter("@MaterialType", SqlDbType.NVarChar);
            objParam[26].Direction = ParameterDirection.Input;
            objParam[26].Value = MaterialType;

            objParam[27] = new SqlParameter("@chkCanPurchased", SqlDbType.Int);
            objParam[27].Direction = ParameterDirection.Input;
            objParam[27].Value = Convert.ToInt32(chkCanPurchased);

            objParam[28] = new SqlParameter("@chkCanSold", SqlDbType.Int);
            objParam[28].Direction = ParameterDirection.Input;
            objParam[28].Value = Convert.ToInt32(chkCanSold);

            objParam[29] = new SqlParameter("@InvoicingPolicy", SqlDbType.NVarChar);
            objParam[29].Direction = ParameterDirection.Input;
            objParam[29].Value = InvoicingPolicy;

            objParam[30] = new SqlParameter("@SaleDescription", SqlDbType.NVarChar);
            objParam[30].Direction = ParameterDirection.Input;
            objParam[30].Value = SaleDescription;

            objParam[31] = new SqlParameter("@purchase_vendor_details", SqlDbType.NVarChar);
            objParam[31].Direction = ParameterDirection.Input;
            objParam[31].Value = purchase_vendor_details;

            objParam[32] = new SqlParameter("@ControlPolicy", SqlDbType.NVarChar);
            objParam[32].Direction = ParameterDirection.Input;
            objParam[32].Value = ControlPolicy;

            objParam[33] = new SqlParameter("@PurchaseDescription", SqlDbType.NVarChar);
            objParam[33].Direction = ParameterDirection.Input;
            objParam[33].Value = PurchaseDescription;

            objParam[34] = new SqlParameter("@DoorShipment", SqlDbType.Int);
            objParam[34].Direction = ParameterDirection.Input;
            objParam[34].Value = Convert.ToInt32(DoorShipment);

            objParam[35] = new SqlParameter("@Replenish", SqlDbType.Int);
            objParam[35].Direction = ParameterDirection.Input;
            objParam[35].Value = Convert.ToInt32(Replenish);

            objParam[36] = new SqlParameter("@ResupplySubcontractoronOrder", SqlDbType.Int);
            objParam[36].Direction = ParameterDirection.Input;
            objParam[36].Value = Convert.ToInt32(ResupplySubcontractoronOrder);

            objParam[37] = new SqlParameter("@Buy", SqlDbType.Int);
            objParam[37].Direction = ParameterDirection.Input;
            objParam[37].Value = Convert.ToInt32(Buy);

            objParam[38] = new SqlParameter("@Manufacture", SqlDbType.Int);
            objParam[38].Direction = ParameterDirection.Input;
            objParam[38].Value = Convert.ToInt32(Manufacture);

            objParam[39] = new SqlParameter("@Weight", SqlDbType.Decimal);
            objParam[39].Direction = ParameterDirection.Input;
            objParam[39].Value = (!string.IsNullOrEmpty(Weight)? Convert.ToDecimal(Weight):0);

            objParam[40] = new SqlParameter("@Volume", SqlDbType.Decimal);
            objParam[40].Direction = ParameterDirection.Input;
            objParam[40].Value = (!string.IsNullOrEmpty(Volume) ? Convert.ToDecimal(Volume) : 0);

            objParam[41] = new SqlParameter("@ManufactureLeadTime", SqlDbType.Int);
            objParam[41].Direction = ParameterDirection.Input;
            objParam[41].Value = (!string.IsNullOrEmpty(ManufactureLeadTime) ? Convert.ToInt32(ManufactureLeadTime) : 0);

            objParam[42] = new SqlParameter("@CustomerLeadTime", SqlDbType.Int);
            objParam[42].Direction = ParameterDirection.Input;
            objParam[42].Value = (!string.IsNullOrEmpty(CustomerLeadTime) ? Convert.ToInt32(CustomerLeadTime) : 0);

            objParam[43] = new SqlParameter("@Tracking", SqlDbType.NVarChar);
            objParam[43].Direction = ParameterDirection.Input;
            objParam[43].Value = Tracking;

            objParam[44] = new SqlParameter("@ExpirationTime", SqlDbType.Int);
            objParam[44].Direction = ParameterDirection.Input;
            objParam[44].Value = (!string.IsNullOrEmpty(ExpirationTime) ? Convert.ToInt32(ExpirationTime) : 0);

            objParam[45] = new SqlParameter("@BestBeforeTime", SqlDbType.Int);
            objParam[45].Direction = ParameterDirection.Input;
            objParam[45].Value = (!string.IsNullOrEmpty(BestBeforeTime) ? Convert.ToInt32(BestBeforeTime) : 0);

            objParam[46] = new SqlParameter("@RemovalTime", SqlDbType.Int);
            objParam[46].Direction = ParameterDirection.Input;
            objParam[46].Value = (!string.IsNullOrEmpty(RemovalTime) ? Convert.ToInt32(RemovalTime) : 0);

            objParam[47] = new SqlParameter("@AlertTime", SqlDbType.Int);
            objParam[47].Direction = ParameterDirection.Input;
            objParam[47].Value = (!string.IsNullOrEmpty(AlertTime) ? Convert.ToInt32(AlertTime) : 0);

            objParam[48] = new SqlParameter("@inventory_packaging_details", SqlDbType.NVarChar);
            objParam[48].Direction = ParameterDirection.Input;
            objParam[48].Value = inventory_packaging_details;

            objParam[49] = new SqlParameter("@DeliveryOrderDescription", SqlDbType.NVarChar);
            objParam[49].Direction = ParameterDirection.Input;
            objParam[49].Value = DeliveryOrderDescription;

            objParam[50] = new SqlParameter("@ReceiptsDescription", SqlDbType.NVarChar);
            objParam[50].Direction = ParameterDirection.Input;
            objParam[50].Value = ReceiptsDescription;

            objParam[51] = new SqlParameter("@InternalTransferDescription", SqlDbType.NVarChar);
            objParam[51].Direction = ParameterDirection.Input;
            objParam[51].Value = InternalTransferDescription;

            objParam[52] = new SqlParameter("@MaterialMaster_Id", SqlDbType.NVarChar);
            objParam[52].Direction = ParameterDirection.Input;
            objParam[52].Value = MaterialMasterId;

            var result = objMain.ExecuteProcedure("procMmMaterialMaster", objParam);

            return "";
        }
        

    }
}