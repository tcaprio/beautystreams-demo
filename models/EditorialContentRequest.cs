using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sabio.Web.Models.Requests
{
    public class EditorialContentRequest
    {

        [Required]
        public int SortOrder { get; set; }

        public string PageContent { get; set; }

        [Required]
        public int ContentTypeId { get; set; }

        [Required]
        public int EditorialId { get; set; }

        public Dictionary<string, string> ContentOptions { get; set; }

        public string Title { get; set; }

        public int? ParentId { get; set; }

        public int? RowOrder { get; set; }
    }
}