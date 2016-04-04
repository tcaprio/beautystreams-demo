using Sabio.Web.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Sabio.Data;
using Sabio.Web.Domain;
using Sabio.Web.Models;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Data;

namespace Sabio.Web.Services
{
    public class EditorialContentService : BaseService, IEditorialContentService
    {
        public int InsertEditorialContent(EditorialContentRequest request)
        {
            int newEditorialContentId = 0;

            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContent_Insert"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {

                //output parameter
                SqlParameter p = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                p.Direction = System.Data.ParameterDirection.Output;

                paramCollection.Add(p);

                paramCollection.AddWithValue("@SortOrder", request.SortOrder);
                paramCollection.AddWithValue("@PageContent", request.PageContent);
                paramCollection.AddWithValue("@ContentTypeId", request.ContentTypeId);
                paramCollection.AddWithValue("@EditorialId", request.EditorialId);
                paramCollection.AddWithValue("@ContentOptions", (request.ContentOptions == null) ? null : JsonConvert.SerializeObject(request.ContentOptions, new KeyValuePairConverter()));
                paramCollection.AddWithValue("@Title", request.Title);
                paramCollection.AddWithValue("@ParentId", request.ParentId);
                paramCollection.AddWithValue("@RowOrder", request.RowOrder);

                }, returnParameters: delegate (SqlParameterCollection param)
                {
                    newEditorialContentId = (int)param["@Id"].Value;
                });

            return newEditorialContentId;
        }

        public List<EditorialContent> GetByEditorialId2(int EditorialId)
        {
            List<EditorialContent> editorialContent = new List<EditorialContent>();
            List<EditorialMedia> editorialMedia = new List<EditorialMedia>();
            List<EditorialContentLinking> editorialContentLinking = new List<EditorialContentLinking>();
            {
                DataProvider.ExecuteCmd(GetConnection, "dbo.EditorialContent_SelectByEditorialId2"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@EditorialId", EditorialId);
                },
                map: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    {
                        if (set == 0)
                        {
                            EditorialContent c = new EditorialContent();

                            c.Id = reader.GetSafeInt32(startingIndex++);
                            c.SortOrder = reader.GetSafeInt32(startingIndex++);
                            c.PageContent = reader.GetSafeString(startingIndex++);
                            c.ContentTypeId = reader.GetSafeInt32(startingIndex++);
                            c.EditorialId = reader.GetSafeInt32(startingIndex++);
                            string tempOptions = reader.GetSafeString(startingIndex++);
                            if (tempOptions != null)
                            {
                                c.ContentOptions = JsonConvert.DeserializeObject<Dictionary<string, string>>(tempOptions);
                            }
                            c.Title = reader.GetSafeString(startingIndex++);
                            c.ParentId = reader.GetSafeInt32Nullable(startingIndex++);
                            c.RowOrder = reader.GetSafeInt32Nullable(startingIndex++);
                            c.ContentData = new List<EditorialMedia>();
                            c.ContentLinking = new EditorialContentLinking();

                            if (editorialContent == null)
                            {
                                editorialContent = new List<EditorialContent>();
                            }
                            editorialContent.Add(c);
                        }

                        

                        if (set == 1)
                        {
                            EditorialMedia m = new EditorialMedia();

                            m.MediaId = reader.GetSafeInt32(startingIndex++);
                            m.MediaParentId = reader.GetSafeInt32(startingIndex++);
                            m.MediaTitle = reader.GetSafeString(startingIndex++);
                            m.MediaFileName = reader.GetSafeString(startingIndex++);
                            m.MediaFileType = reader.GetSafeString(startingIndex++);
                            m.MediaFileSize = reader.GetSafeInt32(startingIndex++);
                            m.MediaType = reader.GetSafeInt32(startingIndex++);
                            m.MediaCreated = reader.GetSafeDateTime(startingIndex++);
                            m.MediaUserId = reader.GetSafeGuid(startingIndex++);
                            m.MediaStatus = reader.GetSafeBool(startingIndex++);
                            m.MediaDescription = reader.GetSafeString(startingIndex++);
                            m.MediaFullUrl = m.MediaFullUrl + m.MediaFileName;
                            m.SourceId = reader.GetSafeInt32(startingIndex++);
                            //m.ExternalMediaId = reader.GetSafeInt32(startingIndex++);
                            m.ExternalCreatedDate = reader.GetSafeDateTime(startingIndex++);
                            m.MediaInfo = reader.GetSafeString(startingIndex++);
                            m.FreeTag = reader.GetSafeString(startingIndex++);
                            m.EditorialContentId = reader.GetSafeInt32(startingIndex++);

                            //determining the db base address:
                            if (m.SourceId == 1)
                            {
                                m.MediaFullUrl = "http://sabio-training.s3.amazonaws.com/" + m.MediaFileName;
                            }
                            else if (m.SourceId == 2)
                            {
                                m.MediaFullUrl = "http://d3vowg41zh9efg.cloudfront.net/" + m.MediaFileName;
                            }


                            if (editorialMedia == null)
                            {
                                editorialMedia = new List<EditorialMedia>();
                            }
                            editorialMedia.Add(m);

                        }

                        if(set == 2)
                        {
                            EditorialContentLinking l = new EditorialContentLinking();

                            l.EditorialContentId = reader.GetSafeInt32(startingIndex++);
                            l.Type = reader.GetSafeString(startingIndex++);
                            l.Link = reader.GetSafeString(startingIndex++);
                            string tempLinkData = reader.GetSafeString(startingIndex++);
                            if(tempLinkData != null)
                            {
                                l.LinkData = JsonConvert.DeserializeObject<List<string>>(tempLinkData);
                    }


                            if(editorialContentLinking == null)
                            {
                                editorialContentLinking = new List<EditorialContentLinking>();
                }
                            editorialContentLinking.Add(l);
                        }

                    }

                }
                );

                foreach (EditorialContent item in editorialContent)
                {
                    foreach (EditorialMedia media in editorialMedia)
                    {
                        if (item.Id == media.EditorialContentId)
                        {
                            item.ContentData.Add(media);
                        }

                    }
                    foreach (EditorialContentLinking linkInfo in editorialContentLinking)
                    {
                        if(linkInfo.EditorialContentId == item.Id)
                        {
                            item.ContentLinking = linkInfo;
                }
                    }
                }
                return editorialContent;
            }
        }
            
        public bool UpdateEditorialContent(EditorialContentRequest request, int Id)
        {
            bool updateStatus = true;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContent_Update"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                    paramCollection.AddWithValue("@SortOrder", request.SortOrder);
                    paramCollection.AddWithValue("@PageContent", request.PageContent);
                    paramCollection.AddWithValue("@ContentTypeId", request.ContentTypeId);
                    paramCollection.AddWithValue("@EditorialId", request.EditorialId);
                    paramCollection.AddWithValue("@ContentOptions", (request.ContentOptions == null) ? null : JsonConvert.SerializeObject(request.ContentOptions, new KeyValuePairConverter()));
                    paramCollection.AddWithValue("@Title", request.Title);
                    paramCollection.AddWithValue("@ParentId", request.ParentId);
                    paramCollection.AddWithValue("@RowOrder", request.RowOrder);
                }, returnParameters: delegate (SqlParameterCollection param)
                {

                }
                );
            return updateStatus;
        }

        public bool DeleteEditorialContent(int Id)
        {
            bool deleteStatus = true;
            //delete any references in editorialContentAndMedia mapping table
            DeleteEditorialContentMediaByContentId(Id);
            //delete element from editorialContent table
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContent_Delete"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                }, returnParameters: delegate (SqlParameterCollection param)
                {
                }
                );
            return deleteStatus;
        }


        public bool DeleteEditorialContentLoop(List<int> Ids)
        {
            bool deleteStatus = false;
            List<int> idsList = new List<int>();
            idsList = Ids;

            idsList.ForEach(p => { DeleteEditorialContent(p); });

            deleteStatus = true;
            return deleteStatus;
        }

        public void UpdateEditorialContentRowOrder(int id, int rowOrder)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContent_UpdateRowOrder"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                    paramCollection.AddWithValue("@RowOrder", rowOrder);
                }
                );
        }

        public void UpdateEditorialContentSortOrder(int id, int sortOrder)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContent_UpdateSortOrder"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                    paramCollection.AddWithValue("@SortOrder", sortOrder);
                }
                );
        }

        public bool UpdateEditorialContentSortOrderLoop(List<int> Ids, int Type)
        {
            bool updateStatus = false;
            int i = 0;
            List<int> myList = new List<int>();
            myList = Ids;

            if(Type == 2) {
                i = 1;
                myList.ForEach(p =>
                {
                    UpdateEditorialContentRowOrder(p, i);
                    i += 1;
                });
            } else if(Type == 1)
            {
                myList.ForEach(p =>
                {
                    UpdateEditorialContentSortOrder(p, i);
                    i += 10;
                });
            }
           

            updateStatus = true;

            return updateStatus;
        }

        public bool InsertEditorialContentMedia(EditorialContentAndMediaRequest request)
        {
            bool insertStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentAndMedia_Insert"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@MediaId", request.MediaId);
                    paramCollection.AddWithValue("@EditorialContentId", request.EditorialContentId);
                    paramCollection.AddWithValue("@EditorialContentIdIndex", request.EditorialContentIdIndex);
                });
            insertStatus = true;
            return insertStatus;
        }

        public bool DuplicateEditorialContentMedia(int NewEditorialContentId, int EditorialContentId)
        {
            bool insertStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentAndMedia_DuplicateByEditorialContentId"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@NewEditorialContentId", NewEditorialContentId);
                    paramCollection.AddWithValue("@EditorialContentId", EditorialContentId);
                });
            insertStatus = true;
            return insertStatus;
        }

        public bool DuplicateEditorialContentLinking(int NewEditorialContentId, int EditorialContentId)
        {
            bool insertStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentLinking_Duplicate"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@NewEditorialContentId", NewEditorialContentId);
                    paramCollection.AddWithValue("@EditorialContentId", EditorialContentId);
                });
            insertStatus = true;
            return insertStatus;
        }

        public bool UpdateEditorialContentMedia(int EditorialContentId, EditorialContentAndMediaRequest request)
        {
            bool updateMediaStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentAndMedia_Update"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@MediaId", request.MediaId);
                    paramCollection.AddWithValue("@EditorialContentId", EditorialContentId);
                    paramCollection.AddWithValue("@EditorialContentIdIndex", request.EditorialContentIdIndex);
                });
            updateMediaStatus = true;
            return updateMediaStatus;
        }

        public Media SelectMediaByEditorialContentId(int EditorialContentId, int EditorialContentIdIndex)
        {
            Media d = new Domain.Media();

            DataProvider.ExecuteCmd(GetConnection, "dbo.EditorialContentAndMedia_SelectByMediaId"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@EditorialContentId", EditorialContentId);
                    paramCollection.AddWithValue("@EditorialContentIdIndex", EditorialContentIdIndex);
                }
                , map: delegate (IDataReader reader, short set)
                {
                    d = new Media();
                    int startingIndex = 0;

                    d.MediaId = reader.GetSafeInt32(startingIndex++);
                    d.MediaParentId = reader.GetSafeInt32(startingIndex++);
                    d.MediaTitle = reader.GetSafeString(startingIndex++);
                    d.MediaFileName = reader.GetSafeString(startingIndex++);
                    d.MediaFileType = reader.GetSafeString(startingIndex++);
                    d.MediaFileSize = reader.GetSafeInt32(startingIndex++);
                    d.MediaType = reader.GetSafeInt32(startingIndex++);
                    d.MediaCreated = reader.GetSafeDateTime(startingIndex++);
                    d.MediaUserId = reader.GetSafeGuid(startingIndex++);
                    d.MediaStatus = reader.GetSafeBool(startingIndex++);
                    d.MediaDescription = reader.GetSafeString(startingIndex++);
                    d.MediaFullUrl = d.MediaFullUrl + d.MediaFileName;

                }
                );
            return d;
        }

        public bool DeleteEditorialContentMediaByContentId(int EditorialContentId)
        {
            bool deleteStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentAndMedia_DeleteByEditorialContentId"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@EditorialContentId", EditorialContentId);
                });
            deleteStatus = true;
            return deleteStatus;
        }

        public bool DeleteEditorialContentMediaByMediaId(int MediaId)
        {
            bool deleteStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentAndMedia_DeleteByMediaId"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@MediaId", MediaId);
                });
            deleteStatus = true;
            return deleteStatus;
        }

        public bool InsertEditorialContentLinking(EditorialContentLinkingRequest request)
        {
            bool insertStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentLinking_Insert"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@EditorialContentId", request.EditorialContentId);
                    paramCollection.AddWithValue("@Type", request.Type);
                    paramCollection.AddWithValue("@Link", request.Link);
                    paramCollection.AddWithValue("@LinkData", (request.LinkData == null) ? null : JsonConvert.SerializeObject(request.LinkData, new KeyValuePairConverter())) ;
                });
            insertStatus = true;
            return insertStatus;
        }

        public bool UpdateEditorialContentLinking(EditorialContentLinkingRequest request)
        {
            bool updateStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialcontentLinking_Update"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@EditorialContentId", request.EditorialContentId);
                    paramCollection.AddWithValue("@Type", request.Type);
                    paramCollection.AddWithValue("@Link", request.Link);
                    paramCollection.AddWithValue("@LinkData", (request.Link == null) ? null : JsonConvert.SerializeObject(request.LinkData, new KeyValuePairConverter()));
                });

            updateStatus = true;
            return updateStatus;
        }

        public bool DeleteEditorialContentLinking(int EditorialContentId)
        {
            bool deleteStatus = false;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.EditorialContentLinking_Delete"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection) 
                {
                    paramCollection.AddWithValue("@EditorialContentId", EditorialContentId);
                });
            deleteStatus = true;
            return deleteStatus;
                    }

    }
}