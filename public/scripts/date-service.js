(function() {
  function EventService($location, $http) {
    var choiceArray= [];
    var obj = {};
    var location = "";
    var tinderEvents = [];
    var minArr = null;
    var maxArr = null;
    
    return{
      routeFunc:routeFunc,
      returnObj:returnObj,
      makeRequest:makeRequest,
      cityFunc:cityFunc,
      tinderRoute: tinderRoute,
      returnTinderEvents: returnTinderEvents,
      startOverRoute: startOverRoute
    }

    function cityFunc(location){
      makeRequest(location);
      console.log(location);
    }

    function returnTinderEvents() {
      if (obj.userChoice <= 35) {
        console.log(minArr);
        return minArr;
      } else {
        return maxArr;
      }
    }

      //This function is requesting API
    function makeRequest(location) {
      return $http({
        method: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fofko8RmpmL96QGJQhwbo7tDY0ToAKuz&city=" + location + ""
      }).then(function(response) {
        tinderEvents = response.data._embedded.events;
        return response;
      });
    }

    function startOverRoute() {
      $location.path('/round2');
    }

    function tinderRoute() {
      $location.path('/tindertime');
      minArr = tinderEvents.filter(function(item, index){
        if (item.priceRanges['0'].min <= 35) {
          return item;
        }
      })
      maxArr = tinderEvents.filter(function(item, index){
        if (item.priceRanges['0'].min > 35) {
          return item;
        }
      })
      console.log(maxArr);
      console.log(minArr);
    }

    //This function will handle how each route is populated
    function routeFunc(choice){
      console.log(choice);
      //Route 2
      if(choice === "goout"){
        obj.hide = false;
        obj.choice0 = "goout";
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Less than $35";
        obj.choice2 = "More than $35";
        return {
          choice1:"Less than $35",
          choice2:"More than $35"
        }
      }else if(choice === "stayin"){
        obj.hide = true;
        obj.choice0 = "stayin";
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Go buy something to do at home";
        obj.choice2 = "Find something to do at home";
        return {
          choice1: "Do something relaxed",
          choice2:"Do something active"
        }
      }
      //Round 3 - going out
      if(choice === "Less than $35"){
        obj.userChoice = 30;
        choiceArray.push(choice);
        $location.path('/round3');
        obj.choice3 = "Music";
        obj.choice4 = "Sports";
        obj.choice5 = "Family";
        obj.choice6 = "Arts & Theatre";
      }else if(choice === "More than $35"){
        obj.userChoice = 36;
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round3');
        obj.choice3 = "Music";
        obj.choice4 = "Sports";
        obj.choice5 = "Family";
        obj.choice6 = "Arts & Theatre";
      }
      //Route 3 - staying in
      if(choice === "Go buy something to do at home"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round4');
        obj.choice3 = "Buy things to make dinner.";
        obj.choice4 = "Buy things for other activities";
      }else if(choice === "Find something to do at home"){
        choiceArray.push(choice);
        console.log(choiceArray);
        $location.path('/round4');
        obj.choice3 = "Do a puzzle";
        obj.choice4 = "Play wrestle";
      }
      //Round 4 - going out
      if(choice === "Music"){
        choiceArray.push(choice);
        console.log(choiceArray);
        // obj.choice3 = "Concert";
        // obj.choice4 = "Festival";
      }else if(choice === "Family"){
        choiceArray.push(choice);
        console.log(choiceArray);
        // obj.choice3 = "Sports Event";
        // obj.choice4 = "Indoor Concert";
      }else if(choice === "Sports"){
        choiceArray.push(choice);
        console.log(choiceArray);
        // obj.choice3 = "Sports Event";
        // obj.choice4 = "Indoor Concert";
      }else if(choice === "Arts & Theatre"){
        choiceArray.push(choice);
        console.log(choiceArray);
        // obj.choice3 = "Sports Event";
        // obj.choice4 = "Indoor Concert";
      }
      //Route 4 - staying in
      // if(choice === "Watch a movie"){
      //   choiceArray.push(choice);
      //   console.log(choiceArray);
      //   $location.path('/round4');
      //   obj.choice5 = "Scary";
      //   obj.choice6 = "Romantic";
      // }else if(choice === "Cuddle"){
      //   choiceArray.push(choice);
      //   console.log(choiceArray);
      //   $location.path('/round4');
      //   obj.choice5 = "On the couch";
      //   obj.choice6 = "Elsewhere";
      // }else if(choice === "Do a puzzle"){
      //   choiceArray.push(choice);
      //   console.log(choiceArray);
      //   $location.path('/round4');
      //   obj.choice5 = "Small Puzzle";
      //   obj.choice6 = "Large Puzzle";
      // }else if(choice === "Play wrestle"){
      //   choiceArray.push(choice);
      //   console.log(choiceArray);
      //   $location.path('/round4');
      //   obj.choice5 = "WWE style";
      //   obj.choice6 = "Elsewhere";
      // }

      //Route 5- Only for staying in
    }//end of route function

    //This function will return an object full of the choices the player made. Use choices in array to filter out API.
    function returnObj(){
      // console.log(obj);
      return obj;
    }

  }//end of service
  angular
  .module("app")
  .factory("EventService", EventService);
})();
