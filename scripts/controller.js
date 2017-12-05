(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.rmessage;
    vm.routeFunc= function(choice){
      EventService.routeFunc(choice);
    }

    vm.object = EventService.returnObj();

    EventService.makeRequest().then(function(response) {
      // console.log(response);
      vm.events = response.data._embedded.events
    })
  }/*End of Controller*/

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
