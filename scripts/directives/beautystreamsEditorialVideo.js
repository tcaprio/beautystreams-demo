(function () {
    "use strict";

    angular.module("beautystreamsEditorialVideo", [])
        .directive("beautystreamsEditorialVideo", EditorialVideo);

    function EditorialVideo() {
        var directive = {
            restrict: 'EA',
            scope: { vidOptions: '=vidOptions' },
            templateUrl: '/Scripts/sabio/editorial/templates/content/video.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {
            var item = scope.vidOptions;
            scope._opts = item.contentOptions;
            var outer = el;
            var caption = el.find('.vidCaption');
            var captionText = item.pageContent;

            setCss();
            setCaptionText();


            function setCaptionText() {
                caption.html(captionText);
                console.log("i'm firing...captionText: " + captionText)
            }

            function setCss() {
                outer.css({
                    backgroundColor: scope._opts.bgcolor,
                    borderColor: scope._opts.borderColor,
                    borderStyle: scope._opts.border,
                    borderWidth: scope._opts.borderWidth + 'px',                  
                });

                caption.css({                    
                    paddingTop: scope._opts.paddingTop + 'px',
                    paddingBottom: scope._opts.paddingBottom + 'px',
                    paddingLeft: scope._opts.paddingLeft + 'px',
                    paddingRight: scope._opts.paddingRight + 'px',
                    fontFamily: scope._opts.fontFamily,
                    color: scope._opts.fontColor,
                    fontSize: scope._opts.fontSize + 'px',
                    textStrokeWidth: scope._opts.fontStrokeWeight + 'px',
                    textStrokeColor: scope._opts.fontStrokeColor
                });

            }

            scope.$watch('vidOptions.contentOptions', function (newVal) {
                scope._opts = newVal;
                setCss();
            }, true);

            scope.$watch('vidOptions.pageContent', function (newVal) {
                console.log('newVal:' + newVal);
                captionText = newVal;
                setCaptionText();
            }, true);
        }



    }
})();