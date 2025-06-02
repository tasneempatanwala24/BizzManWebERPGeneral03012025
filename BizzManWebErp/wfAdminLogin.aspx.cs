using Org.BouncyCastle.Utilities.Net;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Web;


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
                
                //added by tasneem for Admin Login Details Logging---START
                // Insert login details into tblAdminLoginDetail
                //string ipAddress = hfIpAddress.Value; // Now should contain IP address
                string ipAddress = GetLocalIPAddress();
                string clientTimeStr = hfClientTime.Value;
               
                DateTime clientTime;
                if (!DateTime.TryParseExact(clientTimeStr, "yyyy-MM-dd HH:mm:ss",
                                            CultureInfo.InvariantCulture,
                                            DateTimeStyles.None, out clientTime))
                {
                    clientTime = DateTime.UtcNow; // Fallback
                }

               


                //string ipAddress = Request.UserHostAddress;
               // DateTime clientTime = DateTime.Now;

                InsertAdminLoginDetail(txtuser.Text, ipAddress, clientTime);
				//added by tasneem for Admin Login Details Logging---END
              
                
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
		  //added by tasneem for Admin Login Details Logging---START
        private void InsertAdminLoginDetail(string userId, string ipDetail,DateTime ClientDateTime)
        {
            SqlParameter[] objParam = new SqlParameter[3];

           
            objParam[0] = new SqlParameter("@UserId", SqlDbType.NVarChar);
                objParam[0].Direction = ParameterDirection.Input;
                objParam[0].Value = userId;

                objParam[1] = new SqlParameter("@IpDetail", SqlDbType.NVarChar);
                objParam[1].Direction = ParameterDirection.Input;
                objParam[1].Value = ipDetail;

            objParam[2] = new SqlParameter("@ClientTime", SqlDbType.DateTime);
            objParam[2].Direction = ParameterDirection.Input;
            objParam[2].Value = ClientDateTime;


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
        //added by tasneem for Admin Login Details Logging---END




    }
}