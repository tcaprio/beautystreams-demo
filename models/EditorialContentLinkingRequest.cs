using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace Sabio.Web.Models.Requests
{
    public class EditorialContentLinkingRequest
    {
        [Required]
        public int EditorialContentId { get; set; }

        public string Type { get; set; }

        public string Link { get; set; }

        public List<string> LinkData { get; set; }

    }
}