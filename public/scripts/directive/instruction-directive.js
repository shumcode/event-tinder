(function () {
  function instructionDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var inst = document.getElementById("instructions");
          inst.slideDown().css("transition","0.5s");
          $element.css("color", "black").css("transition","0.5s");
        });
      }
    };
  }

angular
  .module("app")
  .directive("instructionDirective", instructionDirective);
})();
