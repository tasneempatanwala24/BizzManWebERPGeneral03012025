using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
    public class SalesQuotationDetail
    {
        public int ItemID { get; set; }
        public int SalesQuotationDetailId { get; set; }
        public int SalesOrderProductDetailId { get; set; }
        public string PackageId { get; set; }
        public decimal Rate { get; set; }
        public decimal Quantity { get; set; }
        public string PackageQuantity { get; set; }
        public decimal Discount { get; set; }
        public decimal GST { get; set; }
        public decimal CentralTaxPercent { get; set; }
        public decimal StateTaxPercent { get; set; }
        public decimal CessPercent { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }


        public string QtyRecieve { get; set; }
        public string QtyReturn { get; set; }
        public string WareHouseId { get; set; }
    }
}