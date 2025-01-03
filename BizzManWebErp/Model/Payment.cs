using DocumentFormat.OpenXml.Bibliography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{

    public class Payment
    {
        public string SalersOrderId { get; set; }
        public string PaymentMode { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentAmount { get; set; }
        public string AcNo { get; set; }
        public string Description { get; set; }
        public string Id { get; set; }
        public string FileName { get; set; }
        public string FileString { get; set; }
    }
}