using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizzManWebErp.Model
{
    public class CrmLeadModel
    {
        public string LeadId { get; set;}
        [JsonProperty("Lead Name")]
        public string LeadName { get; set;}
        public string Probability { get; set;}
        [JsonProperty("Company Name")]
        public string CompanyName { get; set;}
        [JsonProperty("Contact Name")]
        public string ContactName { get; set;}
        public string Street1 { get; set;}
        public string Street2 { get; set;}
        public string City { get; set;}
        public string State { get; set;}       
        
       
        public string Country { get; set;}
        public string Website { get; set; }
        [JsonProperty("Job Position")]
        public string JobPosition { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set;}

        public string Zip { get; set; }
        public string Email { get; set;}
        public string Priority { get; set;}
        public string Tag { get; set;}
        public string Salesperson { get; set;}
        
        
        public string SalesTeam { get; set; }
        public string Source { get; set;}
        public string Status { get; set; }
        public string Notes { get; set;}
        public string UserId { get; set;}
    }
}