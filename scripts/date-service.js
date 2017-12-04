(function() {
  function EventService($location) {
    var choiceArray= [];
    var obj = {};
    return{
      routeFunc:routeFunc,
      returnObj:returnObj
    }



    function routeFunc(choice){
      //Route 2
      if(choice === "goout"){
        choiceArray.push(choice);
        $location.path('/inout');
        obj.choice1 = "Indoor";
        obj.choice2 = "Outdoor";
        return {
          choice1:"Indoor",
          choice2: "Outdoor"
        }
      }else if(choice === "stayin"){
        choiceArray.push(choice);
        $location.path('/inout');
        obj.choice1 = "Movie";
        obj.choice2 = "Dinner at home";
        return {
          choice1: "Movie",
          choice2:"Dinner at home"
        }
      }
    }

    function returnObj(){
      console.log(obj);
      return obj;
    }
  }
  angular
  .module("app")
  .factory("EventService", EventService);
})();
