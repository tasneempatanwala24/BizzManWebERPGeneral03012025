using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
   public class InventStockTransfer
    {
        public int ItemID { get; set; }
        public int TransferMasterId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public string SourceBranchCode { get; set; }        
        public int SourceWarehouseId { get; set; }
        public string DestinationBranchCode { get; set; }
        public int DestinationWarehouseId { get; set; }
        public string Description { get; set; }
    }
}