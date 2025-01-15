using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
    public class BOMDetail
    {
        public string ProductName { get; set; }
        public decimal Quantity { get; set; }
        public string UOM { get; set; }
    }
}