using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PartAnalysis.Models
{
    
        public class OPAmodel
        {
            public string PlantCd { get; set; }
            public string partNum { get; set; }
            public string fieldselect { get; set; }

            //public string query { get; set; }
            // public int Id { get; set; }
            //public string FirstName { get; set; }
        }

        public class modelwrap
        {
            public List<OPAmodel> listdata { get; set; }
        }
    
}