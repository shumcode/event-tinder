(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.routeFunc= function(choice){
      EventService.routeFunc(choice);
    }

  }

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
