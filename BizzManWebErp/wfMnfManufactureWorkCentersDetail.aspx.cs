using ClosedXML.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfMnfManufactureWorkCentersDetail : System.Web.UI.Page
        {
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
        public static string LocationDetails()
        {
            // clsMain objMain = new clsMain();
            DataTable dtLocationList = new DataTable();

            try
            {

                dtLocationList = objMain.dtFetchData("select Id,LocationName from tblInventLocationMaster");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtLocationList);
        }

        [WebMethod]
        public static string AddWorkCenterDetails(string MachineType = "", 
        string Capacity = "", string Productname = "", int Cost = 0,
        int SetupTime = 0, string Location = "", string Remark = "",
        string loginUser = "")
        {
            SqlParameter[] objParam = new SqlParameter[8];

            objParam[0] = new SqlParameter("@MachineType", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = MachineType;

            objParam[1] = new SqlParameter("@Capacity", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = Capacity;

            objParam[2] = new SqlParameter("@Productname", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = Productname;

            objParam[3] = new SqlParameter("@Cost", SqlDbType.Int);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = Cost;

            objParam[4] = new SqlParameter("@SetupTime", SqlDbType.Int);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = SetupTime;

            objParam[5] = new SqlParameter("@Location", SqlDbType.NVarChar);
            objParam[5].Direction = ParameterDirection.Input;
            objParam[5].Value = Location;

            objParam[6] = new SqlParameter("@Remark", SqlDbType.NVarChar);
            objParam[6].Direction = ParameterDirection.Input;
            objParam[6].Value = Remark;

            objParam[7] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[7].Direction = ParameterDirection.Input;
            objParam[7].Value = loginUser;

            var result = objMain.ExecuteProcedure("procMnfManufactureWorkCentersDetail", objParam);


            return "";
        }
    }
}