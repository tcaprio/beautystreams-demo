using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sabio.Web.Domain
{
    public class EditorialContentLinking
    {
        public int EditorialContentId { get; set; }

        public string Type { get; set; }

        public string Link { get; set; }

        public List<string> LinkData { get; set; }

    }
}