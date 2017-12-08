(function () {
  function playerOneDirective() {
    return {
      restrict: "A",
      link: function($scope,$element,$attrs){
        $element.on("click", function () {
          var el = document.getElementById("header");
          var div = document.createElement("div");
          div.className="playerdiv";
          div.innerText = "Player 1"
          el.after(div);
        });
      }
    };
  }

angular
  .module("app")
  .directive("playerOneDirective", playerOneDirective);
})();
