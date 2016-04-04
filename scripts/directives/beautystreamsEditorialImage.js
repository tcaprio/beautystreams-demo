(function () {
    "use strict";

    angular.module("beautystreamsEditorialImage", [])
        .directive("beautystreamsEditorialImage", EditorialImage);

    function EditorialImage() {
        var directive = {
            restrict: 'EA',
            scope: { imgOptions : '=imgOptions'},
            templateUrl: '/Scripts/sabio/editorial/templates/content/image.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {
            var item = scope.imgOptions;
            scope._opts = item.contentOptions;
            var overlay = el.find('p');

            setCss();

            function setCss() {
                el.css({
                    backgroundImage: 'url(' + item.contentData[0].mediaFullUrl + ')',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: scope._opts.imgPosX + 'px',
                    backgroundPositionY: scope._opts.imgPosY + 'px',
                    minHeight: scope._opts.imgMinHeight + 'px',
                    minWidth: scope._opts.imgMinWidth + 'px',
                    width: scope._opts.imgWidth + 'px',
                    height: scope._opts.imgHeight + 'px',
                    marginTop: scope._opts.imgPaddingTop + 'px',
                    marginRight: scope._opts.imgPaddingRight + 'px',
                    marginBottom: scope._opts.imgPaddingBottom + 'px',
                    marginLeft: scope._opts.imgPaddingLeft + 'px',
                    borderStyle: scope._opts.border,
                    borderWidth: scope._opts.borderWidth + 'px',
                    borderColor: scope._opts.borderColor
                });

                overlay.css({
                    backgroundImage: 'url(' + scope._opts.overlayImgSrc + ')',
                    backgroundSize: scope._opts.overlayImgSrc === null ? '' : 'cover',
                    backgroundRepeat: scope._opts.overlayImgSrc === null ? '' : 'no-repeat',
                    left: scope._opts.overlayLeft + 'px',
                    top: scope._opts.overlayTop + 'px',
                    minHeight: scope._opts.overlayMinHeight + 'px',
                    maxHeight: scope._opts.overlayMaxHeight + 'px',
                    minWidth: scope._opts.overlayMinWidth + 'px',
                    maxWidth: scope._opts.overlayMaxWidth + 'px',
                    fontFamily: scope._opts.fontFamily,
                    fontSize: scope._opts.fontSize + 'px',
                    textStrokeWidth: scope._opts.fontStrokeWeight + 'px',
                    textStrokeColor: scope._opts.fontStrokeColor,
                    color: scope._opts.fontColor,
                    background: scope._opts.overlayBg,
                    textDecoration: 'none',
                    borderStyle: scope._opts.overlayBorder,
                    borderWidth: scope._opts.overlayBorderWidth + 'px',
                    borderColor: scope._opts.overlayBorderColor,
                    position: 'absolute',
                    paddingTop: scope._opts.overlayPaddingTop + 'px',
                    paddingRight: scope._opts.overlayPaddingRight + 'px',
                    paddingBottom: scope._opts.overlayPaddingBottom + 'px',
                    paddingLeft: scope._opts.overlayPaddingLeft + 'px'
                });
            }            

            scope.$watch('imgOptions.contentOptions', function (newVal) {
                //console.log("newVal: " + JSON.stringify(newVal));
                scope._opts = newVal;
                setCss();
            }, true);
        }

    };

})();