using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sabio.Web.Domain
{
    public class EditorialContent
    {
        public int Id { get; set; }

        public int SortOrder { get; set; }

        public string PageContent { get; set; }

        public int ContentTypeId { get; set; }

        public int EditorialId { get; set; }

        public Dictionary<string, string> ContentOptions { get; set; }

        public string Title { get; set; }

        public int? ParentId { get; set; }

        public int? RowOrder { get; set; }

        public List<EditorialMedia> ContentData { get; set; }

        public EditorialContentLinking ContentLinking { get; set; }
        
    }
}