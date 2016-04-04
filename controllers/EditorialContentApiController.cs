using Sabio.Web.Domain;
using Sabio.Web.Models;
using Sabio.Web.Models.Requests;
using Sabio.Web.Models.Responses;
using Sabio.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("Api/EditorialContent")]
    public class EditorialContentApiController : BaseApiController
    {
        private IEditorialContentService _editorialContentService { get; set; }

        public EditorialContentApiController(IEditorialContentService editorialContentService)
        {
            _editorialContentService = editorialContentService;
        }
       
        //insert
       
        [Route("Insert"), HttpPost]
        public HttpResponseMessage InsertEditorialContent(EditorialContentRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            else
            {
                int Id = _editorialContentService.InsertEditorialContent(model);
                ItemResponse<int> output = new ItemResponse<int>();
                output.Item = Id;

                return Request.CreateResponse(HttpStatusCode.OK, output);
            }
        }

        [Route("InsertMedia"), HttpPost]
        public HttpResponseMessage InsertEditorialContentMedia(EditorialContentAndMediaRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            } 
            else
            {
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.InsertEditorialContentMedia(model);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }

        [Route("InsertLinking"), HttpPost]
        public HttpResponseMessage InsertEditorialContentLinking(EditorialContentLinkingRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            else
            {
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.InsertEditorialContentLinking(model);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }

        [Route("UpdateLinking"), HttpPut]
        public HttpResponseMessage UpdateEditorialContentLinking(EditorialContentLinkingRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            else
            {
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.UpdateEditorialContentLinking(model);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }

        [Route("UpdateMedia/{EditorialContentId:int}"), HttpPost]
        public HttpResponseMessage UpdateEditorialContentMedia(int EditorialContentId, EditorialContentAndMediaRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            else
            {
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.UpdateEditorialContentMedia(EditorialContentId, model);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }

        [Route("Get/{EditorialId:int}"), HttpGet]
        public HttpResponseMessage GetEditorialContent(int EditorialId)
        {
            List<EditorialContent> editorialContent = _editorialContentService.GetByEditorialId2(EditorialId);
            ItemsResponse<EditorialContent> response = new ItemsResponse<EditorialContent>();
            response.Items = editorialContent;

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("Update/{Id:int}"), HttpPut]
        public HttpResponseMessage UpdateEditorialContent(EditorialContentRequest model, int Id)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            else
            {
                
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.UpdateEditorialContent(model, Id);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }

        [Route("UpdateSortOrder/{Type:int}"), HttpPut]
        public HttpResponseMessage UpdateSortOrder(EditorialContentBulkListRequest model, int Type)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            else
            {
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.UpdateEditorialContentSortOrderLoop(model.Ids, Type);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }

        [Route("Delete/{Id:int}"), HttpDelete]
        public HttpResponseMessage DeleteEditorialContent(int Id)
        {            
            ItemResponse<bool> response = new ItemResponse<bool>();
            _editorialContentService.DeleteEditorialContentLinking(Id);
            response.Item = _editorialContentService.DeleteEditorialContent(Id);

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("DeleteList"), HttpDelete]
        public HttpResponseMessage DeleteList(EditorialContentBulkListRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            } else
            {
                ItemResponse<bool> response = new ItemResponse<bool>();
                response.Item = _editorialContentService.DeleteEditorialContentLoop(model.Ids);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
        }


        [Route("DeleteMedia/{Id:int}"), HttpDelete]
        public HttpResponseMessage DeleteEditorialContentMedia(int Id)
        {
            ItemResponse<bool> response = new ItemResponse<bool>();
            response.Item = _editorialContentService.DeleteEditorialContentMediaByMediaId(Id);

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("DeleteContentLinking/{EditorialContentId:int}"), HttpDelete]
        public HttpResponseMessage DeleteEditorialContentLinking(int EditorialContentId)
        {
            ItemResponse<bool> response = new ItemResponse<bool>();
            response.Item = _editorialContentService.DeleteEditorialContentLinking(EditorialContentId);

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

    }
}