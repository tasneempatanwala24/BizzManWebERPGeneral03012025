using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
    public class MnfManufactureOrder
    {
        public string MaterialId { get; set; }
        public decimal Quantity { get; set; }
        public string WCID { get; set; }

        public string Operation { get; set; }
        public string UOM { get; set; }
        public decimal QtyConsumed { get; set; }
    }
}