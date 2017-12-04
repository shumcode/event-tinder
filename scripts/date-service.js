(function() {
  function EventService($location) {
    var choiceArray= [];

    return{
      routeFunc:routeFunc
    }



    function routeFunc(choice){

      if(choice === "goout"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/inout');

      }else if(choice === "stayin"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/inout');
      }

    }
  }
  angular
  .module("app")
  .factory("EventService", EventService);
})();
