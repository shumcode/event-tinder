(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.goOut= function(out){
      EventService.goOut(out);
    }


  }

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
