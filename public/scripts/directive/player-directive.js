(function () {
  function playerDirective(EventService) {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var el = document.getElementsById("playernumber");
          el.innerText("Player 2");
          EventService.twoRoute();
          console.log(playerMinCounter);
        });
      }
    };
  }

angular
  .module("app")
  .directive("playerDirective", playerDirective);
})();