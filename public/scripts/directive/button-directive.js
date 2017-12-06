(function () {
    function buttonDirective() {
      return {
        restrict: "A",
        link: function($scope,$element,$attrs){
          $element.on("mouseenter", function () {
            $element.css("background-color", "rgb(196, 166, 178)").css("transition","0.5s");
          });
          $element.on("mouseleave", function() {
          $element.css("background-color", "#65293a").css("transition","0.5s");
        });
        }
      };
    }

  angular
    .module("app")
    .directive("buttonDirective", buttonDirective);
})();
