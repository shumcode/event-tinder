(function() {
  function EventService($location, $http) {
    var choiceArray= [];
    var obj = {};
    return{
      routeFunc:routeFunc,
      returnObj:returnObj,
      makeRequest:makeRequest
    }


    function makeRequest() {
      return $http({
        method: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fofko8RmpmL96QGJQhwbo7tDY0ToAKuz&city=detroit"
      }).then(function(response) {
        // console.log(response);
        return response;
      });
    }
    //This function will handle how each route is populated
    function routeFunc(choice){
      //Route 2
      if(choice === "goout"){
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Outdoor";
        obj.choice2 = "Indoor";
        return {
          choice1:"Indoor",
          choice2: "Outdoor"
        }
      }else if(choice === "stayin"){
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Do something relaxed";
        obj.choice2 = "Do something active";
        return {
          choice1: "Do something relaxed",
          choice2:"Do something active"
        }
      }
      //Round 3 - going out
      if(choice === "Outdoor"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Concert";
        obj.choice4 = "Festival";
      }else if(choice === "Indoor"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Sports Event";
        obj.choice4 = "Indoor Concert";
      }
      //Route 3 - staying in
      if(choice === "Do something relaxed"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Watch a movie";
        obj.choice4 = "Cuddle";
      }else if(choice === "Do something active"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Do a puzzle";
        obj.choice4 = "Play wrestle";
      }
      //Round 4 - going out
      if(choice === "Outdoor"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Concert";
        obj.choice4 = "Festival";
      }else if(choice === "Indoor"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Sports Event";
        obj.choice4 = "Indoor Concert";
      }
      //Route 4 - staying in
      if(choice === "Watch a movie"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round4');
        obj.choice5 = "Scary";
        obj.choice6 = "Romantic";
      }else if(choice === "Cuddle"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round4');
        obj.choice5 = "On the couch";
        obj.choice6 = "Elsewhere";
      }else if(choice === "Do a puzzle"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round4');
        obj.choice5 = "Small Puzzle";
        obj.choice6 = "Large Puzzle";
      }else if(choice === "Play wrestle"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round4');
        obj.choice5 = "WWE style";
        obj.choice6 = "Elsewhere";
      }
    }//end of route function

    //This function will return an object full of the choices the player made. Use choices in array to filter out API.
    function returnObj(){
      return obj;
    }

  }//end of service
  angular
  .module("app")
  .factory("EventService", EventService);
})();
