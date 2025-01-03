using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class CrmMainMenu : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Id"] == null)
            {
                Response.Redirect("wfAdminLogin.aspx");
            }
            else
            {
                profile_detail.Text = Session["Id"].ToString();
                profile_detail.Visible = true;
            }

        }
        protected void Button_logout_Click(object sender, EventArgs e)
        {
            Session.RemoveAll();
            Response.Redirect("wfAdminLogin.aspx");
        }
    }
}