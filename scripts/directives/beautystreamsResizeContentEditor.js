
(function () {
    "use strict";

    angular.module("beautystreamsResizeContentEditor", [])
        .directive("beautystreamsResizeContentEditor", ResizeContentEditor);

    function ResizeContentEditor($document) {
        var directive = {
            restrict: 'EA',
            link: linkFunction
        }

        return linkFunction;

        function linkFunction($scope, $el, $attrs) {

            var baseWidth = 470;

            $el.on('mousedown', function (event) {
                console.log("something is happening...")
                event.preventDefault();

                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            //  initialize to the width we want when page loads
            mousemove({ pageX: baseWidth })

            function mousemove(event) {
                if ($attrs.beautystreamsResizeContentEditor == 'vertical') {
                    var x = event.pageX;
                    console.log('xPos ' + x);
                    if ($attrs.beautystreamsResizeContentEditorMax && x > $attrs.beautystreamsResizeContentEditorMax) {
                        x = parseInt($attrs.beautystreamsResizeContentEditorMax);
                    } else if ($attrs.beautystreamsResizeContentEditorMin && x < $attrs.beautystreamsResizeContentEditorMin) {
                        x = parseInt($attrs.beautystreamsResizeContentEditorMin);
                    }

                    $el.css({
                        left: x + 'px'
                    });

                    $($attrs.beautystreamsResizeContentEditorLeft).css({
                        width: x + 'px'
                    });

                    $($attrs.beautystreamsResizeContentEditorRight).css({
                        overflowX: 'auto',
                        left: (x + parseInt($attrs.beautystreamsResizeContentEditorWidth)) + 'px',
                        width: (($(window).width() - 10) - x) + 'px'
                    });

                    console.log("x: " + x);
                    console.log("right- left: " + (x + parseInt($attrs.beautystreamsResizeContentEditorWidth)));
                }
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }




        }


    }




})();