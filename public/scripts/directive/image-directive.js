(function () {
  function imageDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {

          this.classList.toggle('clicked');
        });
      }
    };
  }

angular
  .module("app")
  .directive("imageDirective", imageDirective);
})();
