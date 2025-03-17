using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Net.Sockets;
using BizzManWebErp.Model;
using System.Text;
using System.Drawing;
using DocumentFormat.OpenXml.Office2010.Excel;

namespace BizzManWebErp
{
   
    public partial class wfAdminLogin : System.Web.UI.Page
    {
        clsMain objMain;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            objMain = new clsMain();
        }
        protected void btn_login_Click(object sender, EventArgs e)
        {
            string strSql1, strTemp;
            messagelbl.Text = "";
            string strSql;
            strSql = "SELECT * FROM tblUserMaster WHERE UserName='" + txtuser.Text + "' AND Password ='" + txtpassword.Text + "'";
            if(objMain.blSearchDataHO(strSql))
            {
                messagelbl.Visible = true;
                Session["Id"] = txtuser.Text;
                //======new by MK ===================
                Session["objMain_Session"] = objMain;
                //========================
                messagelbl.Text = "Login Successfully !";
                messagelbl.ForeColor = System.Drawing.Color.Green;
                //added by tasneem to log entry of logged in user
                // Insert login details into tblAdminLoginDetail
                InsertAdminLoginDetail(txtuser.Text, GetLocalIPAddress());

                //===================

                //  Response.Redirect("wfErpMain.aspx");

                //======================================
                // check login id is internal link or external external
                //"Internal Link"  or "External Link"
                strSql1 = "SELECT Description FROM tblUserMaster WHERE UserName='" + txtuser.Text + "' ";
                strTemp = objMain.strFetchDate(strSql1);
                if (strTemp == "External Link")
                    Response.Redirect("wfHrEmpExternal.aspx");
                else
                    Response.Redirect("wfErpMain.aspx");






            }
            else
            {
                messagelbl.Visible = true;
                messagelbl.Text = "Wrong Email or Password!";

            }

        }
        private void InsertAdminLoginDetail(string userId, string ipDetail)
        {
            SqlParameter[] objParam = new SqlParameter[2];

           
            objParam[0] = new SqlParameter("@UserId", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = userId;

                objParam[1] = new SqlParameter("@IpDetail", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = ipDetail;

          

            var result = objMain.ExecuteProcedure("procAdminLoginDetail", objParam);

            
        }
        public static string GetLocalIPAddress()
        {
            try
            {
                string localIP = "";
                var host = Dns.GetHostEntry(Dns.GetHostName());
                foreach (var ip in host.AddressList)
                {
                    if (ip.AddressFamily == AddressFamily.InterNetwork)
                    {
                        localIP = ip.ToString();
                        break; // Get the first IPv4 address
                    }
                }
                return localIP;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting local IP address: {ex.Message}");
                return ""; // Or throw the exception, or return a default value.
            }
        }

      

    }
}