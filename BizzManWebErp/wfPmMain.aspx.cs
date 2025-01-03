using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BizzManWebErp
{
    public partial class wfPmMain : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Btn_CreateCustomer_Click(object sender, EventArgs e)
        {
            Response.Redirect("wfPmCustomerMaster.aspx");
        }
        //protected void Btn_LogIn_Click(object sender, EventArgs e)
        //{
            
        //}
    }
}