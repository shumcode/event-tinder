(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.rmessage;
    vm.routeFunc= function(choice){
      vm.rmessage = EventService.routeFunc(choice);
    }
    vm.object = EventService.returnObj();
    console.log(vm.object);

  }

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
