(function(){
  var tinderComponent = {
  templateUrl:"partials/tindertime.html",
  controller: function (EventService) {
    var vm=this;
    vm.removeCard = function(index) {
      // console.log(index);
      EventService.cardRemover(index);
    }
    vm.saveCard = function(index) {
      EventService.cardSaver(index);
    }
    vm.playerTwo = function() {
      EventService.twoRoute();
    }
    vm.startOver = function() {
      vm.try = EventService.returnObj();
      vm.try.location = "";
      vm.try.choice3checked = false;
      vm.try.choice4checked = false;
      vm.try.choice5checked = false;
      vm.try.choice6checked = false;
      EventService.startOverRoute();
    }
    vm.events = EventService.returnTinderEvents();
  }
};
angular
  .module("app")
  .component("tinderComponent", tinderComponent);
})();
