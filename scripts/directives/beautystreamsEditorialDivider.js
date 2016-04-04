(function () {
    "use strict";

    angular.module("beautystreamsEditorialDivider", [])
        .directive("beautystreamsEditorialDivider", EditorialDivider);

    function EditorialDivider() {
        var directive = {
            restrict: 'EA',
            scope: { dividerOptions: '=dividerOptions' },
            templateUrl: '/Scripts/sabio/editorial/templates/content/divider.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {
            var item = scope.dividerOptions;
            scope._opts = item.contentOptions;

            setCss()

            function setCss() {
                el.css({
                    borderBottomStyle: scope._opts.dividerStyle,
                    borderWidth: scope._opts.borderWidth + 'px',
                    borderColor: scope._opts.dividerColor,
                    marginTop: scope._opts.spcAbove + 'px',
                    marginBottom: scope._opts.spcBelow + 'px'
                });
            }

            scope.$watch('dividerOptions.contentOptions', function (newVal) {
                scope._opts = newVal;
                setCss();
            }, true);
        }
    }
})();
