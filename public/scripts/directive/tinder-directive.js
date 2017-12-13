(function () {
  function tinderDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var hide = document.getElementsByClassName("hide")[0];
          var hide2 = document.getElementsByClassName("hide")[1];
          console.log(hide);
          // hide2.className = "show";
          hide.className = "show";
        });
      }
    };
  }

angular
  .module("app")
  .directive("tinderDirective", tinderDirective);
})();
