using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
    public class Quotation
    {
        public int MaterialMasterId { get; set; }
        public decimal QuotationBalanceQty { get; set; }

        public int IndentDetailId { get; set; }
    }

    public class MaterialMaster
    {
        public int MaterialMasterId { get; set; }
        public decimal Quantity { get; set; }
    }
}