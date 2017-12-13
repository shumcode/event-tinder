(function () {
  function buttonDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("mouseenter", function () {
          $element.css("background", "rgb(196, 166, 178)").css("transition","0.5s");
        });
        $element.on("mouseleave", function() {
        $element.css("background", "linear-gradient(#7d3247, #32151d)").css("transition","3s");
      });
      }
    };
  }

angular
  .module("app")
  .directive("buttonDirective", buttonDirective);
})();
