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
    public partial class wfMnfMaterialManufactureOperationsDetail : System.Web.UI.Page
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




                    string materialid = "";
                    string BOMId = "";
                    if (Request.QueryString["MaterialId"] != null)
                    {
                        materialid = Request.QueryString["MaterialId"].ToString();
                        BOMId = FetchBOMIdBasedOnMaterialId(materialid);
                    }
                    hdnMaterialId.Value = materialid;
                    hdnBOMId.Value = BOMId;
                }
                else
                {
                    Response.Redirect("wfAdminLogin.aspx");
                }
            }
        }

        public string FetchBOMIdBasedOnMaterialId(string MaterialId)
        {
            string BOMId = "";
          //  clsMain objMain = new clsMain();
            DataTable dtBOMDetails = new DataTable();

            try
            {

                dtBOMDetails = objMain.dtFetchData("select Id from tblMmBomMaster where MaterialMasterId=" + MaterialId);
            }
            catch (Exception ex)
            {

            }

            if (dtBOMDetails != null)
            {
                if (dtBOMDetails.Rows.Count > 0)
                {
                    BOMId = dtBOMDetails.Rows[0][0].ToString();
                }
            }
            return BOMId;
        }

        [WebMethod]
        public static string MaterialMasterList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                //  dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where Id not in(select MaterialMasterId from tblMmBomMaster) and BOM='Y'");
                dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }


        [WebMethod]
        public static string UnitMeasureList()
        {
           // clsMain objMain = new clsMain();
            DataTable dtUnitMeasureList = new DataTable();

            try
            {

                dtUnitMeasureList = objMain.dtFetchData("select Id,UnitMesureName from tblFaUnitMesureMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtUnitMeasureList);
        }


        [WebMethod]
        public static string ShopFlowerList()
        {
          //  clsMain objMain = new clsMain();
            DataTable dtShopFlowerList = new DataTable();

            try
            {

                dtShopFlowerList = objMain.dtFetchData("select Id,ShopFlowerName from tblMmShopFlowerMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtShopFlowerList);
        }
        //================ by MK ===instade of FetchMaterialBOMMasterList==========  
        [WebMethod]
        public static string FetchMasterList()
        {
         //   clsMain objMain = new clsMain();
            DataTable dtMaterialBOMMasterList = new DataTable();

            try
            {
/*
                dtMaterialBOMMasterList = objMain.dtFetchData(@"select BM.Id,M.MaterialName,BM.Qty,UM.UnitMesureName,BM.ManufacturingType,BM.BomType,SF.ShopFlowerName 
                                                              from tblMmBomMaster  BM
                                                              join tblMmMaterialMaster M on M.Id = BM.MaterialMasterId
                                                              join tblFaUnitMesureMaster UM on UM.Id = BM.UnitMeasure
                                                              join tblMmShopFlowerMaster SF on SF.Id = BM.ShopFlower
                                                              order by BM.id desc");
*/
                dtMaterialBOMMasterList = objMain.dtFetchData(@"select a.Id,b.MaterialName,Qty,UnitMeasure,TotalOperationCost 
                                                              from tblMnfMaterialManufactureOperationsMaster a, tblMmMaterialMaster b
                                                              where a.MaterialMasterId = b.Id
                                                              order by id ");

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialBOMMasterList);
        }

        //============================
/*
        [WebMethod]
        public static string FetchMaterialBOMMasterList()
        {
            clsMain objMain = new clsMain();
            DataTable dtMaterialBOMMasterList = new DataTable();

            try
            {

                dtMaterialBOMMasterList = objMain.dtFetchData(@"select BM.Id,M.MaterialName,BM.Qty,UM.UnitMesureName,BM.ManufacturingType,BM.BomType,SF.ShopFlowerName 
                                                              from tblMmBomMaster  BM
                                                              join tblMmMaterialMaster M on M.Id = BM.MaterialMasterId
                                                              join tblFaUnitMesureMaster UM on UM.Id = BM.UnitMeasure
                                                              join tblMmShopFlowerMaster SF on SF.Id = BM.ShopFlower
                                                              order by BM.id desc");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialBOMMasterList);
        }
*/


        [WebMethod]
        public static string FetchMaterialBOMMasterListDownload(string BOMid = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialBOMList = new DataTable();

            try
            {

                dtMaterialBOMList = objMain.dtFetchData(@"select BM.Id,M.MaterialName,BM.Qty,UM.UnitMesureName,BM.ManufacturingType,BM.BomType,SF.ShopFlowerName 
                                                              from tblMmBomMaster  BM
                                                              join tblMmMaterialMaster M on M.Id = BM.MaterialMasterId
                                                              join tblFaUnitMesureMaster UM on UM.Id = BM.UnitMeasure
                                                              join tblMmShopFlowerMaster SF on SF.Id = BM.ShopFlower
                                                              where 1=1" + (BOMid != "" ? " and BM.Id in(SELECT Item FROM [dbo].[SplitString] ('" + BOMid + "',','))" : "") + " order by BM.id desc");
            }
            catch (Exception ex)
            {
                // return "";
            }
            dtMaterialBOMList.TableName = "MaterialBOMList";
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

        //========= instade of FetchBOMDetailsList====== by MK ===FetchOperationDetailsList====
        [WebMethod]
        public static string FetchOperationDetailsList(string BOMId = "")
        {
          //  clsMain objMain = new clsMain();
            DataTable dtBOMDetailsList = new DataTable();

            try
            {
                /*
                dtBOMDetailsList = objMain.dtFetchData(@"select bd.MaterialMasterId,MM.MaterialName,bd.Qty,mm.UnitMesure,BD.FormulaName,
                                      bd.Rate,bd.Amount from tblMmBomDetail BD 
                                      join tblMmMaterialMaster mm on mm.Id=BD.MaterialMasterId
                                      where BD.BomMasterId=" + BOMId + (type == "2" ? " and BD.FormulaName='" + Formula + "'" : "") + "");
                */

                dtBOMDetailsList = objMain.dtFetchData(@"select b.ManufactureOperationsMasterId, c.OperationsName, b.QTY, b.UnitMeasure
                             from tblMnfMaterialManufactureOperationsMaster a, tblMnfMaterialManufactureOperationsDetail b,tblMnfManufactureOperationsMaster c
                             where a.Id = b.ManufactureOperationsMasterId and b.OperationId = c.Id and a.MaterialMasterId=" + BOMId +" ");
             

            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMDetailsList);
        }

        /*
        [WebMethod]
        public static string FetchBOMDetailsList(string BOMId = "", string Formula = "", string type = "")
        {
            clsMain objMain = new clsMain();
            DataTable dtBOMDetailsList = new DataTable();

            try
            {

                dtBOMDetailsList = objMain.dtFetchData(@"select bd.MaterialMasterId,MM.MaterialName,bd.Qty,mm.UnitMesure,BD.FormulaName,
                                      bd.Rate,bd.Amount from tblMmBomDetail BD 
                                      join tblMmMaterialMaster mm on mm.Id=BD.MaterialMasterId
                                      where BD.BomMasterId=" + BOMId + (type == "2" ? " and BD.FormulaName='" + Formula + "'" : "") + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMDetailsList);
        }

        */



        [WebMethod]
        public static string DetailMaterialMasterList(string MaterialId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where Id!=" + MaterialId + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }


        [WebMethod]
        public static string FetchMaterialDetails(string MaterialId)
        {
          //  clsMain objMain = new clsMain();
            DataTable dtMaterialDetails = new DataTable();

            try
            {

                dtMaterialDetails = objMain.dtFetchData("select Id,MaterialName,UnitMesure,MRP,isnull(IntegratedTaxPercent,0) as IntegratedTaxPercent from tblMmMaterialMaster where Id=" + MaterialId + "");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialDetails);
        }

        //========instade of FetchMaterialBOMMasterDetails ==by mk====================
        [WebMethod]
        public static string FetchMaterialOperationDetails(string BOMId)
        {
         //   clsMain objMain = new clsMain();
            DataTable dtBOMMasterDetails = new DataTable();
             
            try
            {

               // dtBOMMasterDetails = objMain.dtFetchData("select BM.*,m.MaterialName from tblMmBomMaster BM join tblMmMaterialMaster m on m.Id=BM.MaterialMasterId where BM.Id=" + BOMId);
                dtBOMMasterDetails = objMain.dtFetchData("select d.MaterialName, c.OperationsName,b.QTY, b.UnitMeasure  " +
         "  from tblMnfMaterialManufactureOperationsMaster a, tblMnfMaterialManufactureOperationsDetail b, tblMnfManufactureOperationsMaster c, tblMmMaterialMaster d " +
                    "   where a.Id = b.ManufactureOperationsMasterId and b.OperationId= c.id and a.MaterialMasterId = d.Id and a.Id=" + BOMId);

  
                
                
                /*
                select c.OperationsName,b.QTY, b.UnitMeasure 
  from tblMnfMaterialManufactureOperationsMaster a, tblMnfMaterialManufactureOperationsDetail b, tblMnfManufactureOperationsMaster c
  where a.Id = b.ManufactureOperationsMasterId and b.OperationId= c.id
                */
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMMasterDetails);
        }


        //======================================
        /*
        [WebMethod]
        public static string FetchMaterialBOMMasterDetails(string BOMId)
        {
            clsMain objMain = new clsMain();
            DataTable dtBOMMasterDetails = new DataTable();

            try
            {

                dtBOMMasterDetails = objMain.dtFetchData("select BM.*,m.MaterialName from tblMmBomMaster BM join tblMmMaterialMaster m on m.Id=BM.MaterialMasterId where BM.Id=" + BOMId);
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtBOMMasterDetails);
        }
        */

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


        [WebMethod]
        public static string AddMaterialBOMMaster(string MaterialId = "", string Qty = "", string UnitMeasure = "", string BOM_details = "",
                                                  string ManufacturingType = "", string BomType = "", string ShopFlower = "", string LoginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[8];


            objParam[0] = new SqlParameter("@MaterialId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(MaterialId);


            objParam[1] = new SqlParameter("@Qty", SqlDbType.Int);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Convert.ToInt32(Qty);


            objParam[2] = new SqlParameter("@UnitMeasure", SqlDbType.Int);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Convert.ToInt32(UnitMeasure);


            objParam[3] = new SqlParameter("@BOM_details", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = BOM_details;

            objParam[4] = new SqlParameter("@ManufacturingType", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = ManufacturingType;

            objParam[5] = new SqlParameter("@BomType", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = BomType;

            objParam[6] = new SqlParameter("@ShopFlower", SqlDbType.Int);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Convert.ToInt32(ShopFlower);

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = LoginUser;


            var result = objMain.ExecuteProcedure("procMmBomEntryInsert", objParam);


            return "";
        }


        [WebMethod]
        public static string CheckFormulaAlreadyExist(string Formula)
        {
         //   clsMain objMain = new clsMain();
            DataTable dtFormulaDetails = new DataTable();

            try
            {

                dtFormulaDetails = objMain.dtFetchData("select count(*) as cnt from tblMmBomFormulaMaster where FormulaName='" + Formula + "'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtFormulaDetails);
        }

        [WebMethod]
        public static string DetailMaterialMasterListModal(string BOMId)
        {
         //   clsMain objMain = new clsMain();
            DataTable dtMaterialMasterList = new DataTable();

            try
            {

                dtMaterialMasterList = objMain.dtFetchData("select Id,MaterialName from tblMmMaterialMaster where Id not in (select MaterialMasterId from tblMmBomMaster where Id=" + BOMId + ") and BOM='Y'");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtMaterialMasterList);
        }

        [WebMethod]
        public static string BOMFormulaDelete(string BOMId = "", string Formula = "")
        {

         //   clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[2];


            objParam[0] = new SqlParameter("@BomMasterId", SqlDbType.Int);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Convert.ToInt32(BOMId);


            objParam[1] = new SqlParameter("@FormulaName", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Formula;


            var result = objMain.ExecuteProcedure("procMmBomEntryFormulaDelete", objParam);


            return "";
        }

        [WebMethod]
        public static string UpdateMaterialBOMFormulaDetails(string BOMId = "", string Formula = "", string PreviousFormula = "", string BOM_details = "", string LoginUser = "")
        {

          //  clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[5];


            objParam[0] = new SqlParameter("@Formula", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = Formula;


            objParam[1] = new SqlParameter("@PreviousFormula", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = PreviousFormula;

            objParam[2] = new SqlParameter("@BOM_details", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = BOM_details;

            objParam[3] = new SqlParameter("@BOMId", SqlDbType.Int);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Convert.ToInt32(BOMId);

            objParam[4] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = LoginUser;

            var result = objMain.ExecuteStoreProcedure("procMmBomEntryFormulaInsertUpdate", objParam);
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


    }
}