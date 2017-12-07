(function(){
  var homeComponent = {
    templateUrl:"partials/homepage.html",
    controller: function (EventService) {
      var vm = this;
      vm.startGame = function() {
         EventService.startGame();
      }
    }

  };
  angular
  .module("app")
  .component("homeComponent", homeComponent)
})();
