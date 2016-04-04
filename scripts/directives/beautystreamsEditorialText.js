(function () {
    "use strict";

    angular.module("beautystreamsEditorialText", [])
        .directive("beautystreamsEditorialText", EditorialText);

    function EditorialText() {
        var directive = {
            restrict: 'EA',
            scope: { textOptions: '=textOptions' },
            templateUrl: '/Scripts/sabio/editorial/templates/content/text.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {
            var item = scope.textOptions;
            scope._opts = item.contentOptions;

            setCss();

            function setCss() {
                el.css({
                    fontFamily: scope._opts.fontFamily,
                    fontSize: scope._opts.fontSize + 'px',
                    textStrokeWidth: scope._opts.fontStrokeWeight + 'px',
                    textStrokeColor: scope._opts.fontStrokeColor,
                    color: scope._opts.fontColor,
                    backgroundColor: scope._opts.bgcolor,
                    borderStyle: scope._opts.border,
                    borderWidth: scope._opts.borderWidth + 'px',
                    borderColor: scope._opts.borderColor,
                    margin: '10px',
                    paddingTop: scope._opts.paddingTop + 'px',
                    paddingRight: scope._opts.paddingRight + 'px',
                    paddingBottom: scope._opts.paddingBottom + 'px',
                    paddingLeft: scope._opts.paddingLeft + 'px'
                });
            }

            scope.$watch('textOptions.contentOptions', function (newVal) {
                scope._opts = newVal;
                setCss();
            }, true);
        }




    }
})();