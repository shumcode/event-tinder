(function () {
  function cityDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var show = document.getElementsByClassName("cityinput")[0];
          console.log(show);
          show.className = "hide";
        });
      }
    };
  }

angular
  .module("app")
  .directive("cityDirective", cityDirective);
})();