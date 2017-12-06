(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.rmessage;
    vm.events = [];
    vm.routeFunc = function(choice){
      EventService.routeFunc(choice);
    }

    vm.tinder = function() {
      console.log("heyy");
      EventService.tinderRoute();
    }

    vm.object = EventService.returnObj();

    vm.getCity = function(location){
      EventService.makeRequest(location).then(function(response) {
        vm.events = response.data._embedded.events;
        console.log(vm.events);
      })
    }
  }/*End of Controller*/

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
