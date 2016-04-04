(function () {
    "use strict";

    angular.module("beautystreamsEditorialCustomCode", [])
        .directive("beautystreamsEditorialCustomCode", EditorialCustomCode);

    function EditorialCustomCode() {
        var directive = {
            restrict: 'EA',
            scope: { customCodeOptions: '=customCodeOptions' },
            templateUrl: '/Scripts/sabio/editorial/templates/content/customCode.html',
            link: linkFunction
        }

        return directive;

        function linkFunction(scope, el, attrs) {

        }




    }
})();