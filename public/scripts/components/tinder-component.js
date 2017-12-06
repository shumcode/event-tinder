(function(){
  var tinderComponent = {
  templateUrl:"partials/tindertime.html",
  controller: function (EventService) {
    var vm=this;
    vm.events = EventService.returnTinderEvents();
  }
};
angular
  .module("app")
  .component("tinderComponent", tinderComponent);
})();
