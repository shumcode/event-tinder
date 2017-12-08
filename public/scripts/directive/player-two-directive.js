(function () {
  function playerTwoDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var div = document.getElementsByClassName("playerdiv")[0];
          div.innerText = "Player 2";
        });
      }
    };
  }

angular
  .module("app")
  .directive("playerTwoDirective", playerTwoDirective);
})();
