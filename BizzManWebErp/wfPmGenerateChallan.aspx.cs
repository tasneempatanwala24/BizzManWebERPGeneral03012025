using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace BizzManWebErp
{
    public partial class wfPmGenerateChallan : System.Web.UI.Page
    {
        static clsMain objMain;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["Id"] != null)
                {
                    loginuser.Value = Convert.ToString(Session["Id"]);

                    //added on 18-09-2024
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
        public static string AddChallanDetails(string challanNo, string date, string contactPerson,string loginUser)
        {

            // clsMain objMain = new clsMain();
            SqlParameter[] objParam = new SqlParameter[5];

            objParam[0] = new SqlParameter("@ChallanNo", SqlDbType.NVarChar);
            objParam[0].Direction = ParameterDirection.Input;
            objParam[0].Value = challanNo;

            objParam[1] = new SqlParameter("@Date", SqlDbType.NVarChar);
            objParam[1].Direction = ParameterDirection.Input;
            objParam[1].Value = date;

            objParam[2] = new SqlParameter("@ContactPerson", SqlDbType.NVarChar);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = contactPerson;

            objParam[3] = new SqlParameter("@CreateUser", SqlDbType.NVarChar);
            objParam[3].Direction = ParameterDirection.Input;
            objParam[3].Value = loginUser;

            objParam[4] = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
            objParam[4].Direction = ParameterDirection.Input;
            objParam[4].Value = loginUser;

            var result = objMain.ExecuteProcedure("procPmAddChallanDetails", objParam);

            return "";
        }


    }
}