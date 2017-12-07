(function() {
  function EventService($location, $http) {
    var choiceArray= [];
    var obj = {};
    var location = "";
    var tinderEvents = [];
    var minArr = null;
    var maxArr = null;
    var p1Events = [];

    return{
      startGame: startGame,
      routeFunc:routeFunc,
      returnObj:returnObj,
      makeRequest:makeRequest,
      cityFunc:cityFunc,
      tinderRoute: tinderRoute,
      returnTinderEvents: returnTinderEvents,
      startOverRoute: startOverRoute,
      cardRemover: cardRemover,
      cardSaver: cardSaver
    }

    function startGame () {
      $location.path('/round1');
    }

    //grabbing the API city.
    function cityFunc(location){
      makeRequest(location);
      console.log(location);
    }

    function returnTinderEvents() {
//returns minArr if userchoice is <= 35, returns maxArr if userchoice is > 35
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
      console.log(minArr, maxArr);
    }


// removes cards from min and max array when you press X
    function cardRemover(index) {
      minArr.splice(index, 1);
      maxArr.splice(index, 1);
    }

    function cardSaver(index) {
      var card = minArr[index];
      p1Events.push(card);
      minArr.splice(index, 1);
      maxArr.splice(index, 1);
      console.log(card, p1Events);
    }

    function tinderRoute() {
      $location.path('/tindertime');
// this array shows all events under $35
      minArr = tinderEvents.filter(function(item, index){
        if (item.priceRanges['0'].min <= 35) {
          if (obj.choice3checked === true) {
            if (item.classifications['0'].segment.name === "Music") {
              return item;
            }
          }
          if (obj.choice4checked === true) {
            if (item.classifications['0'].segment.name === "Sports") {
              return item;
            }
          }
          if (obj.choice5checked === true) {
            if (item.classifications['0'].segment.name === "Family") {
              return item;
            }
          }
          if (obj.choice6checked === true) {
            if (item.classifications['0'].segment.name === "Arts & Theatre") {
              return item;
            }
          }
        }
      })
// this array shows all events above $35
      maxArr = tinderEvents.filter(function(item, index){
        if (item.priceRanges['0'].min > 35) {
          if (obj.choice3checked === true) {
            if (item.classifications['0'].segment.name === "Music") {
              return item;
            }
          }
          if (obj.choice4checked === true) {
            if (item.classifications['0'].segment.name === "Sports") {
              return item;
            }
          }
          if (obj.choice5checked === true) {
            if (item.classifications['0'].segment.name === "Family") {
              return item;
            }
          }
          if (obj.choice6checked === true) {
            if (item.classifications['0'].segment.name === "Arts & Theatre") {
              return item;
            }
          }
        }
      })
    }

//This function will handle how each route is populated
    function routeFunc(choice){
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
        $location.path('/round3');
        obj.choice3 = "Music";
        obj.choice4 = "Sports";
        obj.choice5 = "Family";
        obj.choice6 = "Arts & Theatre";
      }
      //Round 4 - staying in
      if(choice === "Go buy something to do at home"){
        choiceArray.push(choice);
        $location.path('/round4');
        obj.choice3 = "Buy things to cook from the store";
        obj.choice4 = "Buy things for other activities";
      }else if(choice === "Find something to do at home"){
        choiceArray.push(choice);
        $location.path('/round4');
        obj.choice3 = "Do something active";
        obj.choice4 = "Do something relaxing";
      }
      //Round 4 - going out
      if(choice === "Music"){
        choiceArray.push(choice);
        // obj.choice3 = "Concert";
        // obj.choice4 = "Festival";
      }else if(choice === "Family"){
        choiceArray.push(choice);
        // obj.choice3 = "Sports Event";
        // obj.choice4 = "Indoor Concert";
      }else if(choice === "Sports"){
        choiceArray.push(choice);
        // obj.choice3 = "Sports Event";
        // obj.choice4 = "Indoor Concert";
      }else if(choice === "Arts & Theatre"){
        choiceArray.push(choice);
        // obj.choice3 = "Sports Event";
        // obj.choice4 = "Indoor Concert";
      }

      // Round 5 - staying in
      if(choice === "Buy things to cook from the store"){
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Buy ingredients for dinner";
        obj.choice6 = "Buy ingredients for another meal";
      }else if(choice === "Buy things for other activities"){
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Buy arts and crafts supplies";
        obj.choice6 = "Buy something active";
      }else if(choice === "Do something active"){
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Do arts and crafts";
        //decision tree ends. Returns list of things to make from database
        obj.choice6 = "Other active activities";
        //decision tree ends. Returns list of things more active from database
      }else if(choice === "Do something relaxing"){
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Watch a movie";
        obj.choice6 = "Watch other type of entertainment";
      }

      //Round 6- Only for staying in
      if(choice === "Buy ingredients for dinner"){
        choiceArray.push(choice);
        $location.path('/round6');
        obj.choice7 = "Easy Recipe";
        //decision tree ends. Returns easy recipes for dinner
        obj.choice8 = "Hard Recipe";
        //decision tree ends. Returns hard recipes for dinner
      }else if(choice === "Buy ingredients for another meal"){
        choiceArray.push(choice);
        // $location.path('/round6');
        //decision tree ends. Returns recipes for something other than dinner
      }else if(choice === "Watch a movie"){
        choiceArray.push(choice);
        $location.path('/round7');
        obj.choice9 = "Horror";
        obj.choice10 = "Sci-Fi";
        obj.choice11 = "Action/Adventure";
        obj.choice12 = "Comedy";
        obj.choice13 = "Drama";
      }else if(choice === "Watch other type of entertainment"){
        choiceArray.push(choice);
        $location.path('/round6');
        obj.choice7 = "Watch a tv show";
        obj.choice8 = "Watch online video clips";
      }
      //round7
      if(choice === "Watch a tv show"){
        choiceArray.push(choice);
        $location.path('/round7');
        obj.choice9 = "Horror";
        obj.choice10 = "Sci-Fi";
        obj.choice11 = "Action/Adventure";
        obj.choice12 = "Comedy";
        obj.choice13 = "Drama";
      }else if(choice === "Watch online video clips"){
        choiceArray.push(choice);
        $location.path('/round7');
        obj.choice9 = "Educational";
        obj.choice10 = "Documentary";
        obj.choice11 = "Original Content";
        obj.choice12 = "Foreign";
        obj.choice13 = "Comedy";
      }

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
