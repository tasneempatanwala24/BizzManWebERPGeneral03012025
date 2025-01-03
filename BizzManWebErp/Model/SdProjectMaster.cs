using DocumentFormat.OpenXml.Bibliography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace BizzManWebErp.Model
{

    public class ProjectMaster
    {
        public string Id { get; set; } ="0";
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public string Location { get; set; } = String.Empty;
        public DateTime ExpStartDate { get; set; } = new DateTime();
        public DateTime ActStartDate { get; set; } = new DateTime();
        public DateTime ExpFinishDate { get; set; } = new DateTime();
        public DateTime ActFinishDate { get; set; }= new DateTime();
        public decimal ExpCost { get; set; }= decimal.Zero;
        public decimal ActCost { get; set; }=decimal.Zero;
        public string IsActive { get; set; } = string.Empty;
        public string Logo { get; set; } = string.Empty;
        public string Doc { get; set; } = string.Empty;
        public string Description { get; set; } =string.Empty;
        public string Address1 { get; set; } = string.Empty;
        public string Address2 { get; set; }=string.Empty;
        public string FileString { get; set; }=string.Empty;
        public string FileName { get; set; }=string.Empty;

    }
}