(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.goOut= function(){
      EventService.goOut();
    }

  }

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
