(function () {
  function tinderDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var hide = document.getElementsByClassName("hide")[0];
          hide.className = "show";
        });
      }
    };
  }

angular
  .module("app")
  .directive("tinderDirective", tinderDirective);
})();
