(function(){
  var tinderComponent = {
  templateUrl:"partials/tindertime.html",
  controller: function (EventService) {
    var vm=this;
    vm.startOver = function() {
      vm.try = EventService.returnObj();
      vm.try.location = "";
      EventService.startOverRoute();
    }
    vm.events = EventService.returnTinderEvents();
  }
};
angular
  .module("app")
  .component("tinderComponent", tinderComponent);
})();
