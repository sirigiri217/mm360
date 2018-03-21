using Newtonsoft.Json;
using PartAnalysis.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PartAnalysis.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        //public void Post([FromBody]string value)
        //{
        //}
        public string Post(OPAmodel model)
        {
            try
            {

                var plant = model.PlantCd;
                var partnumber = model.partNum;
                var fields = model.fieldselect;
                //partnumber = partnumber.Replace(",", "','");

                // var query = "SELECT  [materialnum],  [materialdesc],[plantcd], [uomcd],[crtclpart], [materialstatus], [prcrmnttype],[prchsggrpcd],[prchsggrpname], [prchsggrpdesc], [planneddlvrydays],[stdcost] FROM dev.partanalysis ";
                var query = "select  " + fields + "  FROM dev.partanalysis";
                var where = " where 1=1";
                if (plant.Length > 0) { where += " and plantcd in (" + plant + ")"; }
                if (partnumber.Length > 0) { where += " and rtrim(ltrim(materialnum)) in ('" + partnumber + "')"; }
                string strcon = ConfigurationManager.ConnectionStrings["gsca_appsEntities"].ConnectionString;
                SqlConnection con = new SqlConnection(strcon);
                SqlCommand cmd = new SqlCommand(query + where, con);
                cmd.CommandTimeout = 300;
                SqlDataAdapter customerDA = new SqlDataAdapter();
                customerDA.SelectCommand = cmd;
                con.Open();
                DataTable dt = new DataTable();

                customerDA.Fill(dt);
                con.Close();
                var rowcounts = dt.Rows.Count;
                string JsonString = string.Empty;
                JsonString = JsonConvert.SerializeObject(dt);
                return JsonString;
                //return "[{'numfound':" + rowcounts.ToString() + ", 'results' :"+JsonString +"}]";
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject("{ error: " + ex.Message + "}");
            }


        }
        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
