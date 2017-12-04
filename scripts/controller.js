(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.events = [];
    vm.routeFunc= function(choice){
      EventService.routeFunc(choice);
    }
    EventService.makeRequest().then(function(response) {
      console.log(response);
      vm.events = response.data._embedded.events
    })


  }

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
