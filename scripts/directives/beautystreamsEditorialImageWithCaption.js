(function () {
    "use strict";

    angular.module("beautystreamsEditorialImageWithCaption", [])
        .directive("beautystreamsEditorialImageWithCaption", EditorialImageWithCaption);

    function EditorialImageWithCaption() {
        var directive = {
            restrict: 'EA',
            scope: { imgWithCaptionOptions: '=imgWithCaptionOptions' },
            templateUrl: '/Scripts/sabio/editorial/templates/content/imageWithCaption.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {
            var item = scope.imgWithCaptionOptions;
            scope._opts = item.contentOptions;
            var outer = el;
            var imgOuter = el.find('figure');
            var img = el.find('.imgDiv');
            var caption = el.find('figcaption');
            var captionText = item.pageContent;

            setCaptionText();
            setCss();

            function setCaptionText() {
                caption.html(captionText);
            }

            function setCss() {
                console.log("item.contentData: " + item.contentData[0].mediaFullUrl);
                outer.css({
                    backgroundColor: scope._opts.bgcolor,
                    borderStyle: scope._opts.border,
                    borderColor: scope._opts.borderColor,
                    borderWidth: scope._opts.borderWidth + 'px'
                });

                imgOuter.addClass(scope._opts.captionPos);

                imgOuter.css({
                    paddingTop: scope._opts.imgPaddingTop +'px',
                    paddingBottom: scope._opts.imgPaddingBottom + 'px',
                    paddingLeft: scope._opts.imgPaddingLeft + 'px',
                    paddingRight: scope._opts.imgPaddingRight + 'px'
                });

                img.addClass(scope._opts.imgAlignment);

                img.css({
                    minHeight: scope._opts.imgMinHeight + 'px',
                    minWidth: scope._opts.imgMinWidth + 'px',
                    width: scope._opts.imgWidth + 'px',
                    height: scope._opts.imgHeight + 'px',
                    backgroundPositionX: scope._opts.imgPosX + 'px',
                    backgroundPositionY: scope._opts.imgPosY + 'px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: 'url(' + item.contentData[0].mediaFullUrl + ')'
                });

                caption.css({
                    fontSize: scope._opts.fontSize + 'px',
                    fontFamily: scope._opts.fontFamily,
                    textStrokeWidth: scope._opts.fontStrokeWeight + 'px',
                    textStrokeColor: scope._opts.fontStrokeColor,
                    color: scope._opts.fontColor,
                    paddingTop: scope._opts.paddingTop + 'px',
                    paddingBottom: scope._opts.paddingBottom + 'px',
                    paddingLeft: scope._opts.paddingLeft + 'px',
                    paddingRight: scope._opts.paddingRight + 'px'
                });
            }
            
            scope.$watch('imgWithCaptionOptions.contentOptions', function (newVal) {
                scope._opts = newVal;
                setCss();
            }, true);

            scope.$watch('imgWithCaptionOptions.pageContent', function (newVal) {
                captionText = newVal;
                setCaptionText();
            }, true);
        }



    }
})();
