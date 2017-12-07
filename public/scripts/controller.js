(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.rmessage;
    vm.events = [];
    vm.classifcation = [];
    vm.routeFunc = function(choice){
      EventService.routeFunc(choice);
    }

    vm.tinder = function() {
      EventService.tinderRoute();
    }

    vm.object = EventService.returnObj();

    vm.getCity = function(location){
      EventService.makeRequest(location).then(function(response) {
        vm.events = response.data._embedded.events;
      });
    }


  }/*End of Controller*/

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
