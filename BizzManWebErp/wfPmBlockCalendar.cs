using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace BizzManWebErp
{
    public partial class wfPmBlockCalendar : System.Web.UI.Page
    {

        // static clsMain objMain;
        
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (!IsPostBack)
            //{
                ScheduledActivity();
            //}
        }

        public string ScheduledActivity()
        {
            //SqlConnection con = new SqlConnection("Data Source=DESKTOP-N6EBE2V\\SQLEXPRESS;Initial Catalog=BizzzManERP_New;Integrated Security=True;Persist Security Info=True");
            //con.Open();
            //SqlDataAdapter sda = new SqlDataAdapter("select DueDate,Note,AssignPerson,AssignClient FROM tblPmAssignActivity", con);
            //DataSet ds = new DataSet();
            //sda.Fill(ds);

            calendarActivityScheduled.VisibleDate = DateTime.Today;
            calendarActivityScheduled.DataBind();
            clsMain objMain = new clsMain();


            try
            {
                dtActivityDates = objMain.dtFetchData("select DueDate,Note,AssignPerson,AssignClient FROM tblPmAssignActivity");
            }
            catch (Exception ex)
            {
                return "";
            }

            return JsonConvert.SerializeObject(dtActivityDates);
           // dtActivityDates = ds.Tables[0];
        }

        public void calendarActivityScheduled_DayRender(object sender, DayRenderEventArgs e)
        {
            if (e.Day.IsOtherMonth)
            {
                e.Cell.Controls.Clear();
                e.Cell.Text = string.Empty;
            }
            else
            {
                DataRow[] rows = dtActivityDates.Select(
                      String.Format(
                         "DueDate >= #{0}# AND DueDate < #{1}#",
                         e.Day.Date.ToLongDateString(),
                         e.Day.Date.AddDays(1).ToLongDateString()
                      )
                   );

                foreach (DataRow row in rows)
                {
                    System.Web.UI.WebControls.Image image;
                    image = new System.Web.UI.WebControls.Image();
                    image.ImageUrl = this.ResolveUrl("Dot.jpg");
                    image.ToolTip = row["Note"].ToString();
                    // e.Cell.Controls.Add(image);  
                    e.Cell.BackColor = Color.Wheat;
                }
            }
        }
        public void calendarActivityScheduled_SelectionChanged(object sender, System.EventArgs e)
        {
            Console.WriteLine(dtActivityDates);
            System.Data.DataView view = dtActivityDates.DefaultView;
            view.RowFilter = String.Format(
                              "DueDate >= #{0}# AND DueDate < #{1}#",
                              calendarActivityScheduled.SelectedDate.ToLongDateString(),
                              calendarActivityScheduled.SelectedDate.AddDays(1).ToLongDateString()
                           );

            if (view.Count > 0)
            {
                grdActivitiesScheduled.Visible = true;
                grdActivitiesScheduled.DataSource = view;
                grdActivitiesScheduled.DataBind();
            }
            else
            {
                grdActivitiesScheduled.Visible = false;
            }
        }
        public DataTable dtActivityDates;
    }
}
