(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialContentController', EditorialContentController);

    EditorialContentController.$inject = ['$scope'
                                            , '$routeParams'
                                            , '$baseController'
                                            , '$editorialContentService'
                                            , '$mediaService'
                                            , 'editorialContentConfig'
                                            , '$location'
                                            , '$anchorScroll'
                                            , '$editorialService'
                                            , '$folderService'
                                            , '$uibModal'];

    function EditorialContentController(
        $scope
        , $routeParams
        , $baseController
        , $editorialContentService
        , $mediaService
        , editorialContentConfig
        , $location
        , $anchorScroll
        , $editorialService
        , $folderService
        , $uibModal) {

        var vm = this;
        vm.$scope = $scope;
        vm.$routeParams = $routeParams;
        vm.$editorialContentService = $editorialContentService;
        vm.$editorialService = $editorialService;
        vm.$folderService = $folderService;
        vm.$mediaService = $mediaService;
        vm.editorialId = vm.$routeParams.editorialId;
        vm.constants = editorialContentConfig;
        vm.$location = $location;
        vm.$anchorScroll = $anchorScroll;
        vm.$uibModal = $uibModal;
        $baseController.merge(vm, $baseController);

        vm.activeDefaultMenuTab = 1;
        vm.activeEditTab = 1;
        vm.activeLayoutTab = 1;
        vm.activeLinkTagTab = 1;
        vm.addRowCollapsed = true;
        vm.contentIds = [];
        vm.contentTemplatesCollapsed = true;
        vm.currentItemHasImage = false;
        vm.currentId = null;
        vm.currentItemContentDataIndex = null;
        vm.currentItemImgCount = null;
        vm.currentItem = null;
        vm.currentItemLinking = [];
        vm.currentItemType = null;
        vm.currentItemTypeId = null;
        vm.currentPid = 0;
        vm.designOpt = false;
        vm.designOptSelected = false;
        vm.designOptSelection = null;
        vm.dndListCols = [];
        vm.dndListImageBank = [];
        vm.editElement = false;
        vm.editing = false;
        vm.editLink = false;
        vm.editorialLinking = [];
        vm.elTemplates = vm.constants.templates;
        vm.item;
        vm.itemContentTypeId = null;
        vm.itemIndex = null;
        vm.itemImageSelected = false;
        vm.hideWysiwyg = false;
        vm.linkedMedia = [];
        vm.linkTagSelected = false;
        vm.linkTagSelection = null;
        vm.myDropzone;
        vm.newRow = { columns: 0, columnData: [] }
        vm.newRowRef = 0;
        vm.newCopyRow = null;
        vm.overlay = false;
        vm.overlayType = null;
        vm.rowAddType = null;
        vm.rowEdit = false;
        vm.rowToDelete = null;
        vm.rowOptSelected = false;
        vm.rowOptSelection = null;
        vm.showDefaultMenu = true;
        vm.$scope.editorConfig = vm.constants.wysiwygConfig;
        vm.selectedRow = null;
        vm.shapeOptions = vm.constants.shapes;
        vm.showDeleteWarning = false;
        vm.tagLink = false;

        //editor options                                                  
        vm.alignmentOptions = vm.constants.alignmentOptions;
        vm.borderOptions = vm.constants.borderOptions;
        vm.borderWidthOptions = [];
        vm.columnOptions = vm.constants.numberColumns;
        vm.columnWidthOptions = vm.constants.columnWidth;
        vm.dividerOptions = vm.constants.dividerOptions;
        vm.fontOptions = vm.constants.fontFamily;
        vm.linkingRoles = vm.constants.linkingRoles;
        vm.buttonAlignmentOpts = vm.constants.buttonAlignmentOpts;
        vm.marginTopOptions = [];
        vm.marginBottomOptions = [];
        vm.paddingTopOptions = [];
        vm.paddingBottomOptions = [];
        vm.paddingLeftOptions = [];
        vm.paddingRightOptions = [];
        vm.paddingOptions = [];
        vm.positionOptions = vm.constants.positionOptions;
        vm.videoAutoPlayOptions = vm.constants.videoAutoPlay;

        vm.addNewColumns = _addNewColumns;
        vm.addCopiedRow = _addCopiedRow;
        vm.addOverlay = _addOverlay;
        vm.addRow = _addRow;
        vm.cancelEdit = _cancelEdit;
        vm.delete = _delete;
        vm.deleteRow = _deleteRow;
        vm.dropCallback = _dropCallback;
        vm.editRow = _editRow;
        vm.findParentCol = _findParentCol;
        vm.getContentList = _getContentList;
        vm.getLinkedMedia = _getLinkedMedia;
        vm.getTotalColWidth = _getTotalColWidth;
        vm.goBack = _goBack;
        vm.insert = _insert;
        vm.showEdit = _showEdit;
        vm.hideEdit = _hideEdit;
        vm.launchEditor = _launchEditor;
        vm.launchTagLink = _launchTagLink;
        vm.openEditorialLinkingImageBankModal = _openEditorialLinkingImageBankModal;
        vm.openImageBankModal = _openImageBankModal;
        vm.setMedia = _setMedia;
        vm.setMediaOverlay = _setMediaOverlay;
        vm.setRoleLinkOptions = _setRoleLinkOptions;
        vm.selectRow = _selectRow;
        vm.setSelectedRow = _setSelectedRow;
        vm.submitContentLinking = _submitContentLinking;
        vm.updateRowOrder = _updateRowOrder;
        vm.updateSortOrder = _updateSortOrder;
        vm.updateContent = _updateContent;

        //on load get current content list for editorial & linked media
        vm.getContentList();

        //set up notifier so updates go to vm
        vm.notify = vm.$editorialContentService.getNotifier($scope);

        //helper function for dndList
        vm.$scope.$watch('vm.dndListCols', function (newVal) {
            console.log("newVal: " + JSON.stringify(newVal));
        }, true);

        function _addCopiedRow() {
            vm.newCopyRow = vm.selectedRow;
            vm.rowAddType = 'copy'
            console.log("newCopyRow..." + JSON.stringify(vm.dndListCols[vm.newCopyRow]));
            var rowIndex = vm.dndListCols.map(function (e) { return e.rowId }).indexOf(vm.newCopyRow.rowId);
            vm.newRow.columns = vm.dndListCols[rowIndex].row.length;
            for (var i = 0; i < vm.newRow.columns; i++) {
                var myData = {
                    sortOrder: 0,
                    pageContent: null,
                    contentTypeId: 11,
                    editorialId: vm.editorialId,
                    contentOptions: {
                        rowRef: vm.newRowRef,
                        columnId: i,
                        columnRef: i,
                        columnWidth: vm.dndListCols[rowIndex].row[i].colWidth
                    },
                    title: null
                }
                vm.newRow.columnData.push(myData);
            }
            vm.addRow();
        }

        function _addNewColumns() {
            vm.newRow.columnData = [];
            vm.rowAddType = 'new'
            console.log("vm.newRowRef..." + vm.newRowRef)
            var colPresets = [];
            switch (vm.newRow.columns) {
                case 1:
                    colPresets.push(12);
                    break;
                case 2:
                    colPresets.push(6, 6);
                    break;
                case 3:
                    colPresets.push(4, 4, 4);
                    break;
                case 4:
                    colPresets.push(3, 3, 3, 3);
                    break;
                case 5:
                    colPresets.push(3, 3, 2, 2, 2);
                    break;
                case 6:
                    colPresets.push(2, 2, 2, 2, 2, 2);
                    break;
                case 7:
                    colPresets.push(2, 2, 2, 2, 2, 1, 1);
                    break;
                case 8:
                    colPresets.push(2, 2, 2, 2, 1, 1, 1, 1);
                    break;
            }
            for (var i = 0; i < vm.newRow.columns; i++) {
                var myData = {
                    sortOrder: i,
                    pageContent: null,
                    contentTypeId: 11,
                    editorialId: vm.editorialId,
                    contentOptions: {
                        rowRef: vm.newRowRef,
                        columnId: i,
                        columnRef: i,
                        columnWidth: colPresets[i]
                    },
                    title: null
                }
                vm.newRow.columnData.push(myData);
            }
        }

        function _addOverlay(type) {
            vm.overlayType = type;
            vm.overlay = true;
            vm.currentItem.contentOptions.overlayType = type;
            if (type === 'image') {
                vm.currentItem.pageContent = null;
                vm.hideWysiwyg = true;
                vm.currentItem.contentOptions.overlayLinkTo = null;
            } else {
                vm.hideWysiwyg = false;
                vm.currentItem.contentOptions.overlayImgSrc = null;
                vm.currentItem.contentOptions.overlayImageCover = null;
                vm.currentItem.contentOptions.overlayImageRepeat = null;
            }
        }

        function _addRow() {
            var myData = {
                sortOrder: 0,
                pageContent: null,
                contentTypeId: 99,
                editorialId: vm.editorialId,
                contentOptions: null,
                title: null,
                parentId: 0,
                rowOrder: vm.dndListCols.length
            }
            console.log("here's myData: " + JSON.stringify(myData));
            vm.$editorialContentService.insert(myData, insertRowSuccess, insertError);
        }

        function insertRowSuccess(data) {
            var parentId = data.item;
            vm.newRow.columnData.forEach(function (arrayItem) {
                var myData = {
                    sortOrder: arrayItem.sortOrder,
                    pageContent: arrayItem.pageContent,
                    contentTypeId: 11,
                    editorialId: arrayItem.editorialId,
                    contentOptions: arrayItem.contentOptions,
                    title: arrayItem.title,
                    parentId: parentId,
                    rowOrder: null
                }
                vm.designOptSelected = false;
                vm.designOptSelection = null;
                vm.$editorialContentService.insert(myData, insertSuccess, insertError);
            });
        }

        function _cancelEdit() {
            vm.editing = false;
            vm.editElement = false;
            vm.itemImageSelected = false;
            vm.getContentList();
            vm.linkTagIsCollapsed = true;
            vm.currentItem = null;
            vm.currentId = null;
            vm.currentItemTypeId = null;
            vm.activeDefaultMenuTab = 1;
            vm.showDefaultMenu = true;
            vm.rowEdit = false;
            vm.selectedRow = null;
            vm.rowOptSelected = false
            vm.rowOptSelection = null;
        }

        function _delete(id) {
            vm.$editorialContentService.delete(id, deleteSuccess, deleteError);
        }

        function deleteError(response) {
            console.log(response);
        }

        function _deleteRow() {
            vm.rowToDelete = vm.selectedRow;
            var itemsToDelete = new Object;
            var tempArray = [];
            tempArray.push(vm.rowToDelete.id); //add row object itself
            var rowIndex = vm.dndListCols.map(function (e) { return e.id }).indexOf(vm.rowToDelete.id);
            vm.dndListCols[rowIndex].Children.forEach(function (column) {
                tempArray.push(column.id);
                column.Children.forEach(function (contentItem) {
                    tempArray.push(contentItem.id);
                });
            });
            itemsToDelete.ids = tempArray;
            vm.$editorialContentService.deleteList(itemsToDelete, deleteRowSuccess, deleteRowError)
        }

        function deleteRowError(response) {
            console.log("something went wrong deleting the row")
        }

        function deleteRowSuccess(data) {
            vm.getContentList();
            vm.cancelEdit();
        }

        function deleteSuccess(data) {
            console.log("delete success...")
            vm.updateSortOrder();
        }

        //cb function for dnd to get proper index of moved or inserted elements for updateSortOrder func
        function _dropCallback(event, index, item, type) {
            vm.itemIndex = index;
            vm.itemContentTypeId = item.contentTypeId;
            console.log("vm.itemIndex: " + vm.itemIndex);
            console.log("item: " + JSON.stringify(item));
            return item;
        }

        function _editRow() {
            vm.addRow();
            vm.deleteRow();
        }

        //find parent row and column of item & update/insert based on operation value provided
        function _findParentCol(item, operation) {
            item.contentOptions.columnRef = item.contentOptions.columnRef;
            item.contentOptions.rowRef = item.contentOptions.rowRef;
            var rowInd = null;
            //find row reference
            for (var rowIndex = 0; rowIndex < vm.dndListCols.length; rowIndex++) {
                vm.dndListCols[rowIndex].Children.forEach(function (arrayItem) {
                    arrayItem.Children.forEach(function (arrayItem) {
                        if (arrayItem.id === item.id) {
                            rowInd = rowIndex;
                        }
                    });
                });
            }
            console.log("new row ref: " + item.contentOptions.rowRef);
            //find column reference
            for (var colIndex = 0; colIndex < vm.dndListCols[rowInd].Children.length; colIndex++) {
                vm.dndListCols[rowInd].Children[colIndex].Children.forEach(function (arrayItem) {
                    if (arrayItem.id === item.id) {
                        //console.log("colIndex: " + colIndex);
                        item.contentOptions.columnRef = colIndex;
                        item.parentId = vm.dndListCols[rowInd].Children[colIndex].id;
                        console.log("parentId: " + item.parentId);

                    }
                });
            }
            var myData = {
                sortOrder: vm.itemIndex,
                pageContent: item.pageContent,
                contentTypeId: item.contentTypeId,
                editorialId: vm.editorialId,
                contentOptions: item.contentOptions,
                title: null,
                parentId: item.parentId
            }
            //for moving items
            if (operation === 1) {
                //console.log("updating column ref...here's my new columnRef: " + myData.contentOptions.columnRef + "...and my new rowRef: " + myData.contentOptions.rowRef);
                vm.$editorialContentService.update(myData, item.id, updateRefSuccess, updateError);
                //for inserting items
            } else if (operation === 2) {
                if (vm.itemIndex === 0 || item.contentOptions.rowRef === 0 && item.contentOptions.columnRef === 0) {
                    myData.sortOrder = vm.itemIndex > 0 ? vm.itemIndex * 10 + 1 : 0;
                } else {
                    var prevItemSortOrder = vm.dndListCols[rowInd].Children[item.contentOptions.columnRef].Children[(vm.itemIndex - 1)].sortOrder;
                    myData.sortOrder = prevItemSortOrder + 1
                }
                console.log("inserting data...here's what i'm sending..." + JSON.stringify(myData));
                vm.insert(myData, myData.sortOrder);
            } else {
                var rowCol = {
                    columnRef: item.contentOptions.colRef,
                    rowRef: item.contentOptions.rowRef
                }
                return rowCol;
            }
        }

        //generate px options in bulk                                                                         
        function generateOptions(custClassPrefix, init, max, increment, targetArray, measure) {
            for (var i = init; i < max + increment; i += increment) {
                var measure = measure === undefined ? '' : measure;
                var opt = new Object;
                opt.label = i + " px";
                opt.custClass = custClassPrefix + i + measure;
                targetArray.push(opt);
            }
        };

        //generate editor width, padding, margin options                                   
        generateOptions('', 1, 10, 1, vm.borderWidthOptions);
        generateOptions('', 10, 40, 5, vm.marginTopOptions);
        generateOptions('', 10, 40, 5, vm.marginBottomOptions);
        generateOptions('', 0, 40, 5, vm.paddingTopOptions);
        generateOptions('', 0, 40, 5, vm.paddingBottomOptions);
        generateOptions('', 0, 40, 5, vm.paddingLeftOptions);
        generateOptions('', 0, 40, 5, vm.paddingRightOptions);
        generateOptions('', 0, 40, 5, vm.paddingOptions);

        function _getContentList() {
            vm.$editorialContentService.get(vm.editorialId, getSuccess, getError);
        }

        function getError(response) {
            console.log(response);
        }

        function _getFolders() {
            vm.$folderService.selectAll(getFoldersSuccess, getFoldersError)
        }

        function getFoldersError(response) {
            console.log("error getting folders..." + JSON.stringify(response));
        }

        function getFoldersSuccess(data) {
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].parentFolderId === 0) {
                    vm.dndListImageBank.push(data.items[i]);
                }
            }
        }

        function setItemType(item) {
            switch (item.contentTypeId) {
                case 1:
                    vm.currentItemType = "Text";
                    break;
                case 3:
                    vm.currentItemType = "Divider";
                    break;
                case 4:
                    vm.currentItemType = "Image";
                    break;
                case 7:
                    vm.currentItemType = "Image + Caption";
                    break;
                case 8:
                    vm.currentItemType = "Button";
                    break;
                case 9:
                    vm.currentItemType = "Video";
                    break;
                case 10:
                    vm.currentItemType = "Custom Html";
                    break;
                default:
                    vm.currentItemType = undefined;
            }
        }

        //get linked media
        function _getLinkedMedia(ids) {
            var mediaIds = new Object;
            var tempArray = [];
            ids.forEach(function (arrayItem) {
                tempArray.push(arrayItem);
            });
            mediaIds.mediaIdList = tempArray;
            vm.$mediaService.getMultipleByIds(mediaIds, getLinkedMediaSuccess, getLinkedMediaError);
        }

        function getLinkedMediaError(response) {
            console.log("something went wrong getting media...")
        }

        function getLinkedMediaIdsSuccess(data) {
            var ids = [];
            console.log('getlinkedmediaidsuccess' + JSON.stringify(data));
            if (data.items != null) {
                data.items.forEach(function (arrayItem) {
                    ids.push(arrayItem.mediaId);
                });
                vm.getLinkedMedia(data.items);
            }
        }

        function getLinkedMediaSuccess(data) {
            vm.notify(function () {
                vm.linkedMedia = data.items;
            });
        }

        //loop through editorial content elemenents and make nested object to structure editorial view
        function getSuccess(data) {
            //get linked media ids...
            vm.$editorialService.getLinkingByEid(vm.editorialId, getLinkedMediaIdsSuccess, getLinkedMediaError)
            if (data.items != null) {
                var dndTempList = [];
                var tempData = data.items;
                //console.log("tempData: " + JSON.stringify(data.items));
                for (var i = 0; i < tempData.length; i++) {
                    //add placeholder image if type has image and content data null
                    if (tempData[i].contentTypeId < 8 && 4 <= tempData[i].contentTypeId && tempData[i].contentData.length < 1) {
                        tempData[i].contentData.push({ mediaFullUrl: "http://placehold.it/250x200" })
                    }
                    //concat full video url with autoplay options if content type is video
                    if (tempData[i].contentTypeId === 9) {
                        tempData[i].contentOptions.videoFullUrl = tempData[i].contentOptions.videoUrl + tempData[i].contentOptions.videoAutoPlay;
                    }
                }

                //make tree
                var all = {};
                tempData.forEach(function (item) {
                    all[item.id] = item;
                });

                //console.log('all...' + JSON.stringify(all));

                Object.keys(all).forEach(function (id) {
                    var item = all[id];
                    if (item.parentId == 0) {
                        dndTempList.push(item);
                    } else if (item.parentId in all) {
                        var p = all[item.parentId];
                        if (!('Children' in p)) {
                            p.Children = [];
                        }
                        p.Children.push(item);
                    }
                });
                //add empty 'Children' array to any empty column elements
                dndTempList.forEach(function (item) {
                    if (item.Children) {
                        item.Children.forEach(function (column) {
                            if (!column.Children) {
                                column.Children = [];
                            }
                        });
                    }
                });
                //sort rows in array
                dndTempList.sort(function (a, b) {
                    if (a.rowOrder > b.rowOrder) {
                        return 1;
                    }
                    if (a.rowOrder < b.rowOrder) {
                        return -1;
                    }
                });
                //sort column items 
                dndTempList.forEach(function (row) {
                    row.Children.forEach(function (column) {
                        if (column.Children.length > 1) {
                            column.Children.sort(function (a, b) {
                                if (a.sortOrder > b.sortOrder) {
                                    return 1;
                                }
                                if (a.sortOrder < b.sortOrder) {
                                    return -1;
                                }
                            });
                        }
                    });
                })

                vm.dndListCols = dndTempList;
            }
        }

        function _getTotalColWidth() {
            var total = 0;
            for (var i = 0; i < vm.newRow.columnData.length; i++) {
                var width = vm.newRow.columnData[i].contentOptions.columnWidth;
                total += width;
            }
            return total;
        }

        function _goBack() {
            if (vm.rowOptSelected) {
                vm.rowOptSelected = false;
                vm.rowOptSelection = null;
            } else {
                vm.cancelEdit();
            }
        }

        function _insert(item, sort) {
            var myData = {
                sortOrder: sort === null ? vm.itemIndex : sort,
                pageContent: item.pageContent,
                contentTypeId: item.contentTypeId,
                editorialId: vm.editorialId,
                contentOptions: item.contentOptions,
                title: null,
                parentId: item.parentId ? item.parentId : null
            }
            console.log("firing old insert function...");
            vm.$editorialContentService.insert(myData, insertSuccess, insertError);
        }

        function insertError(response) {
            console.log(response);
        }

        function insertMediaError(response) {
            console.log("there was an error inserting media");
        }
        function insertMediaSuccess(data) {
            console.log("media insert successful");
            vm.itemImageSelected = true;
            vm.getContentList();
        }

        function insertSuccess(data) {
            console.log("insert success..." + JSON.stringify(data.item));
            vm.updateSortOrder(data.item);
            vm.newRow = { columns: 0, columnData: [] }
            vm.newCopyRow = null;
            vm.selectedRow = null;
            vm.cancelEdit();
        }

        function _hideEdit() {
            vm.editElement = false;
        }

        function _launchEditor(item) {
            console.log('currentItem: ' + JSON.stringify(item));
            vm.showDefaultMenu = false;
            vm.launchTagLink(item);
            vm.currentItem = item;
            setItemType(vm.currentItem);
            console.log(vm.currentItemType);
            vm.linkTagIsCollapsed = true;
            vm.editing = true;
            vm.activeEditTab = 1;
            vm.currentItemHasImage = false;
            vm.hideWysiwyg = false;
            switch (item.contentTypeId) {
                case 1:
                    vm.activeEditTab = 1;
                    break;
                case 3:
                    vm.activeEditTab = 2;
                    vm.hideWysiwyg = true;
                    break;
                case 4:
                    vm.currentItemHasImage = true;
                    if (vm.currentItem.contentOptions.overlayType != undefined) {
                        vm.overlay = true;
                        vm.overlayType = vm.currentItem.contentOptions.overlayType;
                        if (vm.currentItem.contentOptions.overlayType === 'image') {
                            vm.hideWysiwyg = true;
                        }
                    }
                    break;
                case 7:
                    vm.currentItemHasImage = true;
                    break;
                case 8:
                    vm.activeEditTab = 1;
                    break;
                case 9:
                    vm.activeEditTab = 1;
                    break;
                case 10:
                    vm.hideWysiwyg = true;
                    break;
                default:
                    vm.currentItemType = undefined;
            }
        }

        function linkingPresent(item) {
            var exists = null;
            if (item.contentLinking.editorialContentId === 0) {
                exists = false;
            } else {
                exists = true;
            }
            return exists;
        }

        function _launchTagLink(item) {
            vm.currentItem = item;
            setItemType(item);
            vm.tagLink = true;
            vm.editing = false;
            vm.currentItem.linkingPresent = linkingPresent(item);
            console.log("i already have link info:" + vm.currentItem.linkingPresent);
        }

        function _openEditorialLinkingImageBankModal() {
            var mediaIds = [];
            vm.linkedMedia.forEach(function (arrayItem) {
                mediaIds.push(arrayItem.mediaId);
            });
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: '/Scripts/sabio/editorial/templates/modal/mediaBucket.html',
                windowClass: 'modal modal-message fade in modalNg',
                controller: 'editorialMediaBucketController',
                controllerAs: 'bucket',
                size: 'lg',
                resolve: {
                    mediaIds: function () {
                        return mediaIds;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                console.log("modal closed", selectedItem)
                vm.$editorialService.updateAllLinking(vm.editorialId, JSON.stringify(selectedItem.selectedMediaIds), updateEditorialLinkingSuccess, updateEditorialLinkingError);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        function _openImageBankModal(currentItem) {
            var mediaIds = []
            if (currentItem.contentLinking.linkData != null && currentItem.contentLinking.linkData.length > 0) {
                currentItem.contentLinking.linkData.forEach(function (arrayItem) {
                    mediaIds.push(parseInt(arrayItem));
                });
            }
            console.log("currentItemId: " + currentItem.id + "mediaIds: " + JSON.stringify(mediaIds));
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: '/Scripts/sabio/editorial/templates/modal/mediaBucket.html',
                windowClass: 'modal modal-message fade in modalNg',
                controller: 'editorialMediaBucketController',
                controllerAs: 'bucket',
                size: 'lg',
                resolve: {
                    mediaIds: function () {
                        return mediaIds;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                console.log("modal closed", selectedItem)
                console.log("mediaIds..." + JSON.stringify(selectedItem.selectedMediaIds));
                vm.currentItem.contentLinking.linkData = selectedItem.selectedMediaIds;
                vm.submitContentLinking();
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function _setMedia(mediaId, item) {
            //console.log("mediaId: " + mediaId + "itemId: " + item.id);
            console.log("item.contentData: " + item.contentData[0].mediaFullUrl);
            var myData = {
                mediaId: mediaId,
                editorialContentId: item.id,
                editorialContentIndex: 0
            }
            if (item.contentData[0].mediaFullUrl === 'http://placehold.it/250x200' && vm.itemImageSelected === false) {
                //insert if contentData.mediaFullUrl set to placeholder url
                vm.$editorialContentService.insertMedia(myData, insertMediaSuccess, insertMediaError);
            } else {
                //update media id for editorialcontentId
                vm.$editorialContentService.updateMedia(item.id, myData, updateMediaSuccess, updateMediaError);
            }
        }

        function _setMediaOverlay(img) {
            var url = img.mediaFullUrl;
            vm.currentItem.contentOptions.overlayImgSrc = url;
            vm.currentItem.contentOptions.overlayImageCover = 'cover';
            vm.currentItem.contentOptions.overlayImageRepeat = 'no-repeat';
            console.log("setting image...");
        }

        function _setRoleLinkOptions() {
            console.log("role: " + vm.currentItem.contentLinking.type);
            if (vm.currentItem.contentLinking.type === 'clipping') {
                vm.currentItem.contentLinking.link = vm.currentItem.contentData[0].mediaId;
            }
        }

        function _setSelectedRow(operation) {
            operation === 'delete' ? vm.selectedRow = vm.rowToDelete : vm.selectedRow = vm.newCopyRow;
        }

        function _selectRow(row) {
            vm.selectedRow = row;
            console.log("row.." + JSON.stringify(row));
            vm.rowEdit = true;
            vm.showDefaultMenu = false;
        }

        function _showEdit(item) {
            if (vm.editing == false) {
                vm.editElement = true;
                vm.currentId = item.id;
                vm.currentItemTypeId = item.contentTypeId;
            } else {
                vm.editElement = false;
            }
        }

        function _submitContentLinking() {
            var myData = {
                editorialContentId: vm.currentItem.id,
                type: vm.currentItem.contentLinking.type,
                link: vm.currentItem.contentLinking.link,
                linkData: []
            }
            if (vm.currentItem.contentLinking.linkData !== null) {
                vm.currentItem.contentLinking.linkData.forEach(function (arrayItem) {
                    myData.linkData.push(arrayItem);
                });
            }
            if (!vm.currentItem.linkingPresent) {
                console.log("no linking yet, doing insert..." + JSON.stringify(myData));
                vm.$editorialContentService.insertLinking(myData, submitContentLinkingSuccess, submitContentLinkingError)
            } else {
                console.log("linking already exists, doing update..." + JSON.stringify(myData));
                vm.$editorialContentService.updateLinking(myData, submitContentLinkingSuccess, submitContentLinkingError)
            }
        }

        function submitContentLinkingError(response) {
            console.log("something went wrong submitting content linking..." + JSON.stringify(response));
        }

        function submitContentLinkingSuccess(data) {
            console.log("content linking submitted successfully");
            vm.getContentList();
            vm.cancelEdit();
        }

        function _updateContent(item) {
            console.log(item);
            var myData = {
                sortOrder: item.sortOrder,
                pageContent: item.pageContent,
                contentTypeId: item.contentTypeId,
                editorialId: item.editorialId,
                contentOptions: item.contentOptions,
                title: item.title,
                parentId: item.parentId ? item.parentId : null,
                rowOrder: item.rowOrder ? item.rowOrder : null
            }
            console.log("here's the updated data: " + JSON.stringify(myData));
            vm.$editorialContentService.update(myData, item.id, updateSuccess, updateError);
        }

        function updateEditorialLinkingError(response) {
            console.log("error updating editorial linking: " + JSON.stringify(response))
        }

        function updateEditorialLinkingSuccess() {
            vm.getContentList();
        }

        function updateError(response) {
            console.log(response);
        }

        function updateMediaSuccess(data) {
            console.log("media updated successfully");
            vm.getContentList();
        }

        function updateMediaError(response) {
            console.log("something went wrong updating media")
        }

        function updateRefSuccess(data) {
            vm.updateSortOrder();
        }

        function updateSuccess(data) {
            vm.editing = false;
            vm.itemImageSelected = false;
            vm.currentItem = null;
            vm.currentItemType = null;
            vm.getContentList();
            vm.editElement = false;
            vm.currentId = null;
            vm.currentItemTypeId = null;
            vm.activeDefaultMenuTab = 1;
            vm.showDefaultMenu = true;
        }

        function _updateRowOrder() {
            console.log("vm.dndListCols after row reorder: " + JSON.stringify(vm.dndListCols));
            var newRowOrder = new Object;
            var tempArray = [];
            vm.dndListCols.forEach(function (arrayItem) {
                tempArray.push(arrayItem.id)
            });
            newRowOrder.ids = tempArray;
            console.log("here are the ids being sent..." + JSON.stringify(tempArray));
            tempArray.length > 1 ? vm.$editorialContentService.updateSortOrder(newRowOrder, 2, updateSortOrderSuccess, updateSortOrderError) : vm.getContentList();
        }


        //updates content item sort order on item move
        function _updateSortOrder() {
            var newSortOrder = new Object;
            var tempArray = []
            vm.dndListCols.forEach(function (arrayItem) {
                arrayItem.Children.forEach(function (arrayItem) {
                    arrayItem.Children.forEach(function (arrayItem) {
                        tempArray.push(arrayItem.id);
                    });
                });
            });
            newSortOrder.ids = tempArray;
            console.log("here's the array I'm sending..." + newSortOrder.ids);
            tempArray.length > 1 ? vm.$editorialContentService.updateSortOrder(newSortOrder, 1, updateSortOrderSuccess, updateSortOrderError) : vm.getContentList();
        }

        function updateSortOrderError(response) {
            console.log(response);
        }

        function updateSortOrderSuccess(data) {
            console.log("update success, getting refreshed data")
            vm.getContentList();
        }
    }
})();
//--end editorial content controller
