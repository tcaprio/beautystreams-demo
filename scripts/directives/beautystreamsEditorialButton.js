(function () {
    "use strict";

    angular.module("beautystreamsEditorialButton", [])
        .directive("beautystreamsEditorialButton", EditorialButton);

    function EditorialButton() {
        var directive = {
            restrict: 'EA',
            scope: { buttonOptions: '=buttonOptions' },
            templateUrl: '/Scripts/sabio/editorial/templates/content/button.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {
            var item = scope.buttonOptions;
            scope._opts = item.contentOptions;
            var button = el.find('a');
            var buttonText = item.pageContent;

            setButtonText();
            setCss();

            function setButtonText() {
                button.html(buttonText);
            }

            function setCss() {
                button.css({
                    borderStyle: scope._opts.border,
                    borderColor: scope._opts.borderColor,
                    borderWidth: scope._opts.borderWidth + 'px',
                    borderRadius: scope._opts.borderRadius + 'px',
                    backgroundColor: scope._opts.bgcolor,
                    fontSize: scope._opts.fontSize + 'px',
                    fontFamily: scope._opts.fontFamily,
                    textDecoration: 'none',
                    color: scope._opts.fontColor,
                    textStrokeWidth: scope._opts.fontStrokeWeight + 'px',
                    textStrokeColor: scope._opts.fontStrokeColor,
                    paddingTop: scope._opts.paddingTop + 'px',
                    paddingBottom: scope._opts.paddingBottom + 'px',
                    paddingLeft: scope._opts.paddingLeft + 'px',
                    paddingRight: scope._opts.paddingRight + 'px'
                });

                el.css({ textAlign: scope._opts.buttonAlignment });

                el.addClass(scope._opts.bgShape);
            }

            scope.$watch('buttonOptions.contentOptions', function (newVal) {
                scope._opts = newVal;
                setCss();
            }, true);

            scope.$watch('buttonOptions.pageContent', function (newVal) {
                buttonText = newVal;
                setButtonText();
            }, true);
        }
    }
    
})();