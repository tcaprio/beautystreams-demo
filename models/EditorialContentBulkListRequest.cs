using Sabio.Web.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sabio.Web.Models.Requests
{
    public class EditorialContentBulkListRequest
    {
        public List<int> Ids {get; set;}
    }
}