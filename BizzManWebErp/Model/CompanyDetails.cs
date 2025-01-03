using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
    public class CompanyDetails
    {
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyWebSiteUrl { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyPhNo { get; set; }
        public string Designation { get; set; }
        public string Role { get; set; }
        public decimal LastCTC { get; set; }
         public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string ReportPersonName { get; set; }
        public string ReportPersonContactNo { get; set; }
        public string Description { get; set; }
    }
}