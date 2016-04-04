using System.Collections.Generic;
using Sabio.Web.Domain;
using Sabio.Web.Models.Requests;
using Sabio.Web.Models;

namespace Sabio.Web.Services
{
    public interface IEditorialContentService
    {
        bool DeleteEditorialContent(int Id);
        int InsertEditorialContent(EditorialContentRequest request);
        bool UpdateEditorialContent(EditorialContentRequest request, int Id);
        bool UpdateEditorialContentSortOrderLoop(List<int> Ids, int Type);
        void UpdateEditorialContentRowOrder(int id, int rowOrder);
        void UpdateEditorialContentSortOrder(int id, int sortOrder);
        bool InsertEditorialContentMedia(EditorialContentAndMediaRequest request);
        bool DeleteEditorialContentMediaByMediaId(int MediaId);
        bool DeleteEditorialContentMediaByContentId(int EditorialContentId);
        Media SelectMediaByEditorialContentId(int EditorialContentId, int EditorialContentIdIndex);
        List<EditorialContent> GetByEditorialId2(int EditorialId);
        bool DuplicateEditorialContentMedia(int NewEditorialContentId, int EditorialContentId);
        bool DuplicateEditorialContentLinking(int NewEditorialContentId, int EditorialContentId);
        bool UpdateEditorialContentMedia(int EditorialContentId, EditorialContentAndMediaRequest request);
        bool InsertEditorialContentLinking(EditorialContentLinkingRequest request);
        bool UpdateEditorialContentLinking(EditorialContentLinkingRequest request);
        bool DeleteEditorialContentLinking(int EditorialContentId);
        bool DeleteEditorialContentLoop(List<int> Ids);
    }
}