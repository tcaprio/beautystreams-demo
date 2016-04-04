(function () {
    "use strict";

    angular.module(APPNAME)
    .constant("editorialContentConfig", {
        "templates": [
            { contentTypeId: "1", name: "Text", pageContent: "Your text content will go here.", icon: "fa-align-right", contentOptions: { border: 'none', fontSize: '18', rowRef: 0 } },
            { contentTypeId: "3", name: "Divider", icon: "fa-chain-broken", contentOptions: { dividerColor: '#3c454d', dividerStyle: 'solid', href: '#', rowRef: 0 } },
            { contentTypeId: "4", name: "Image", contentData: [{ value: "http://placehold.it/150x150" }], icon: "fa-file-image-o", contentOptions: { imgAlignment: 'centerImg', border: 'none', rowRef: 0, imgWidth: '400', imgHeight: '400', imgMinHeight: '400', imgPosX: 0, imgPosY: 0 } },
            { contentTypeId: "7", name: "Image + Caption", pageContent: "Your text content will go here.", contentData: [{ value: "http://placehold.it/150x150" }], icon: "fa-newspaper-o", contentOptions: { bgcolor: '#FFFFFF', captionPos: 'bottomCapt', imgAlignment: 'centerImg', border: 'none', rowRef: 0, imgWidth: '400', imgHeight: '400', imgMinHeight: '400', imgPosX: 0, imgPosY: 0 } },
            { contentTypeId: "8", name: "Button", pageContent: "Your Button Text", icon: "fa-youtube-play", contentOptions: { bgcolor: '#7eed65', border: 'none', buttonAlignment:'btnCenter', rowRef: 0 } },
            {
                contentTypeId: "9", name: "Video", pageContent: "Your text content will go here.", contentData: [{ value: "http://HTML5Sample.mov" }], icon: "fa-youtube-square", contentOptions: { bgcolor: '#FFFFFF', border: 'none', videoUrl: "http://HTML5Sample.mov", videoAutoPlay: '?autoplay=0', vidWidth: "100%", vidHeight: "500", rowRef: 0 }
            },
            { contentTypeId: "10", name: "Custom Code", pageContent: "Your custom HTML", icon: "fa-code", contentOptions: { rowRef: 0 } }
        ],
        "wysiwygConfig": {
            sanitize: false,
            toolbar: [
            { name: 'basicStyling', items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-'] },
            { name: 'paragraph', items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-'] },
            { name: 'doers', items: ['removeFormatting', 'undo', 'redo', '-'] },
            { name: 'links', items: ['hr', 'symbols', 'link', 'unlink', '-'] },
            { name: 'tools', items: ['print', '-'] }
            ]
        },
        "positionOptions": [{ id: 1, label: 'left', custClass: 'leftCapt' },
                                { id: 2, label: 'top', custClass: 'topCapt' },
                                { id: 3, label: 'right', custClass: 'rightCapt' },
                                { id: 4, label: 'bottom', custClass: 'bottomCapt' }],
        "alignmentOptions": [{ id: 1, label: 'left', custClass: 'leftImg' },
                                { id: 2, label: 'center', custClass: 'centerImg' },
                                { id: 3, label: 'right', custClass: 'rightImg' }],
        "buttonAlignmentOpts": [{ id: 1, label: 'center', custClass: 'center' },
                                { id: 2, label: 'left', custClass: 'left' },
                                 { id: 3, label: 'right', custClass: 'right'}],
        "borderOptions": [{ id: 1, label: 'none', custClass: 'none' },
                            { id: 2, label: 'solid', custClass: 'solid' },
                            { id: 3, label: 'dashed', custClass: 'dashed' },
                            { id: 4, label: 'dotted', custClass: 'dotted' }],
        "dividerOptions": [
                            { id: 1, label: 'solid', custClass: 'solid' },
                            { id: 2, label: 'dashed', custClass: 'dashed' },
                            { id: 3, label: 'dotted', custClass: 'dotted' }],
        "videoAutoPlay": [{ id: 1, label: 'yes', value: '?autoplay=1' },
                          { id: 2, label: 'no', value: '?autoplay=0' }],
        "placeholderImg": "http://placehold.it/250x200",
        "numberColumns": [{ id: 1, label: 1 },
                            { id: 2, label: 2 },
                            { id: 3, label: 3 },
                            { id: 4, label: 4 },
                            { id: 5, label: 5 },
                            { id: 6, label: 6 },
                            { id: 7, label: 7 },
                            { id: 8, label: 8}],
        "columnWidth": [{ id: 1, label: 1, width: 1 },
                        { id: 2, label: 2, width: 2 },
                        { id: 3, label: 3, width: 3 },
                        { id: 4, label: 4, width: 4 },
                        { id: 5, label: 5, width: 5 },
                        { id: 6, label: 6, width: 6 },
                        { id: 7, label: 7, width: 7 },
                        { id: 8, label: 8, width: 8 },
                        { id: 9, label: 9, width: 9 },
                        { id: 10, label: 10, width: 10 },
                        { id: 11, label: 11, width: 11 },
                        { id: 12, label: 12, width: 12 }],
        "linkingRoles": [{ id: 1, label: 'clipping', role: 'clipping' },
                         { id: 2, label: 'link to editorial anchor', role: 'editorialAnchor' },
                         { id: 3, label: 'link to image bank search', role: 'imageBankSearch' },
                         { id: 4, label: 'link to URL', role: 'url' }],
        "fontFamily": [{ fontFamily: 'Arial', label: 'Arial' },
            { fontFamily: 'Arial Black', label: 'Arial Black' },
            { fontFamily: 'Calibri', label: 'Calibri' },
            { fontFamily: 'Candara', label: 'Candara' },
            { fontFamily: 'Cambria', label: 'Cambria' },
            { fontFamily: 'Comic Sans MS', label: 'Comic Sans MS' },
            { fontFamily: 'Courier', label: 'Courier' },
            { fontFamily: 'Courier New', label: 'Courier New' },
            { fontFamily: 'Didot', label: 'Didot' },
            { fontFamily: 'Garamond', label: 'Garamond' },
            { fontFamily: 'Georgia', label: 'Georgia' },
            { fontFamily: 'Impact', label: 'Impact' },
            { fontFamily: 'Lucida Console', label: 'Lucida Console' },
            { fontFamily: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
            { fontFamily: 'Palatino Linotype', label: 'Palatino Linotype' },
            { fontFamily: 'Tahoma', label: 'Tahoma' },
            { fontFamily: 'Times New Roman', label: 'Times New Roman' },                                                          
            { fontFamily: 'Trebuchet MS', label: 'Trebuchet MS' },
            { fontFamily: 'Verdana', label: 'Verdana' },
            { fontFamily: 'PaisleyCaps', label: 'PaisleyCaps'}],
        "shapes": [{ shape: 'default', label: 'default', custClass: '' },
            { shape: 'square', label: 'square', custClass: 'bg-square' },
            { shape: 'circle', label: 'circle', custClass: 'bg-circle'}]

    })

})();