(function() {
  function EventService($location, $http) {
    var choiceArray= [];

    return{
      routeFunc:routeFunc,
      makeRequest: makeRequest
    };

    function makeRequest() {
      return $http({
        method: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fofko8RmpmL96QGJQhwbo7tDY0ToAKuz&city=detroit"
      }).then(function(response) {
        console.log(response);
        return response;
      });
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
