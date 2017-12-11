(function() {
  function EventService($location, $http) {
    var choiceArray= [];
    var obj = {};
    var location = "";
    var tinderEvents = [];
    var minArr = null;
    var maxArr = null;
    var p1Events = [];
    var p2Events = [];
    var playerCounter = 0;
    var p2RandomEvent = {};
    var p1RandomEvent = {};
    var finalEvent = [];
    var finalRandomEvent = {};
    var DS = null;

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
      cardSaver: cardSaver,
      twoRoute: twoRoute,
      stayInIdeas: stayInIdeas,
      randomEvent: randomEvent
    }

    function startGame () {
      $location.path('/round1');
    }

    //grabbing the API city.
    function cityFunc(location){
      makeRequest(location);
    }

    function returnTinderEvents() {
//returns minArr if userchoice is <= 35, returns maxArr if userchoice is > 35
      if (obj.userChoice <= 35) {
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

      //THIS FOR ROUND 5 GOING OUT
    function twoRoute() {
      $location.path('/round1');
  }


// removes cards from min and max array when you press X
    function cardRemover(index) {
      if (obj.userChoice < 35) {
        minArr.splice(index, 1);
      } else {
        maxArr.splice(index, 1);
      }
    }

    function cardSaver(index) {
      if (playerCounter === 1) {
        if (obj.userChoice < 35) {
        var minCard = minArr[index];
        p1Events.push(minCard);
        minArr.splice(index, 1);
      } else {
        var maxCard = maxArr[index];
        p1Events.push(maxCard);
        maxArr.splice(index, 1);
      }
    } else {
      if (obj.userChoice < 35) {
        var minCard = minArr[index];
        p2Events.push(minCard);
        minArr.splice(index, 1);
      } else {
        var maxCard = maxArr[index];
        p2Events.push(maxCard);
        maxArr.splice(index, 1);
      }
    }
      // console.log(minCard);
      // console.log(maxCard);
    } 

    function randomEvent() {
      p2RandomEvent = p2Events[Math.floor(Math.random() * p2Events.length)];
      p1RandomEvent = p1Events[Math.floor(Math.random() * p1Events.length)];
      finalEvent.push(p2RandomEvent);
      finalEvent.push(p1RandomEvent);
      finalRandomEvent = finalEvent[Math.floor(Math.random() * finalEvent.length)];
      return finalRandomEvent;
    }

    function tinderRoute() {
      $location.path('/tindertime');
// this array shows all events under $35
      minArr = tinderEvents.filter(function(item, index){
        if (item.priceRanges === undefined) {

        } else {

        
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
      }
      })
      console.log(minArr);
// this array shows all events above $35
      maxArr = tinderEvents.filter(function(item, index){
        if (item.priceRanges === undefined) {

        } else {

        
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
      }
      })
      console.log(maxArr);
    }

//This function will handle how each route is populated
    function routeFunc(choice){
//Route 2
      if(choice === "goout"){
        playerCounter++;
        if (playerCounter === 2) {
          obj.player2 = true;
          obj.player1 = false;
          console.log(obj.player);
        }
        if (playerCounter === 1) {
          obj.player1 = true;
        }
        console.log(playerCounter);
        obj.hide = false;
        obj.choice0 = "goout";
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Less than $35";
        obj.choice2 = "More than $35";
      
      }else if(choice === "stayin"){
        playerCounter++;
        if (playerCounter === 2) {
          obj.player2 = true;
          obj.player1 = false;
          console.log(obj.player);
        }
        if (playerCounter === 1) {
          obj.player1 = true;
        }
        console.log(playerCounter);
        obj.hide = true;
        obj.choice0 = "stayin";
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Go buy something to do at home";
        obj.choice2 = "Find something to do at home";
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
        // obj.userChoice = 36;
        choiceArray.push(choice);
        $location.path('/round3');
        obj.choice3 = "Music";
        obj.choice4 = "Sports";
        obj.choice5 = "Family";
        obj.choice6 = "Arts & Theatre";
      }
      //Round 4 - staying in
      if(choice === "Go buy something to do at home"){
          obj.choice2= null;
          choiceArray.push(choice);
          $location.path('/round4');
        obj.choice3 = "Buy things to cook from the store";
        obj.choice4 = "Buy things for other activities";
      }else if(choice === "Find something to do at home"){
          obj.choice1= null;
        choiceArray.push(choice);
        $location.path('/round4');
        obj.choice3 = "Do something active";
        obj.choice4 = "Do something relaxing";
      }
      //Round 4 - going out
      if(choice === "Music"){
        choiceArray.push(choice);

      }else if(choice === "Family"){
        choiceArray.push(choice);

      }else if(choice === "Sports"){
        choiceArray.push(choice);

      }else if(choice === "Arts & Theatre"){
        choiceArray.push(choice);

      }

      // Round 5 - staying in
      if(choice === "Buy things to cook from the store"){
        obj.choice4 = null;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Buy ingredients for dinner";
        obj.choice6 = "Buy ingredients for another meal";
      }else if(choice === "Buy things for other activities"){
        obj.choice3 = null;
        choiceArray.push(choice);
        $location.path('/round8');
        obj.choice5 = "Buy arts and crafts supplies";
        obj.choice6 = "Buy something active";
      }else if(choice === "Do something active"){
        obj.choice4 = null;
        choiceArray.push(choice);
        $location.path('/round5');
        
          //**NEED TO CREATE FINAL ROUND 6 FUNCTION/ PAGE**//
          
        obj.choice5 = "Do arts and crafts";
        //decision tree ends. Returns list of things to make from database
        obj.choice6 = "Other active activities";
        //decision tree ends. Returns list of things more active from database
      }else if(choice === "Do something relaxing"){
        obj.choice3 = null;
        choiceArray.push(choice);
        $location.path('/round5');
      }
        
//        if(choice === "Do arts and crafts"){
//            $location.path('/stayintinder')
//        }

      //Round 6- Only for staying in
      if(choice === "Buy ingredients for dinner"){
        obj.choice6 = null;
        choiceArray.push(choice);
        $location.path('/round6');
        obj.choice7 = "Easy Recipe";
        //decision tree ends. Returns easy recipes for dinner
        obj.choice8 = "Hard Recipe";
        //decision tree ends. Returns hard recipes for dinner
      }
        
        if(choice === "Easy Recipe"){
            $location.path("/stayintinder");
            DS = 1;
        }
        
        if(choice === "Hard Recipe"){
            $location.path("/stayintinder");
        }
        
        if(choice === "Do something relaxing"){
            $location.path("/stayintinder");
        }
        
        if(choice === "Other active activities"){
            $location.path("/stayintinder");
        }
        
        if(choice === "Do arts and crafts"){
            $location.path("/stayintinder");
        }
        
        
        else if(choice === "Buy ingredients for another meal"){
        obj.choice5 = null;
        choiceArray.push(choice);
        // $location.path('/round6');
        //decision tree ends. Returns recipes for something other than dinner
//      }else if(choice === "Watch a movie"){
//        choiceArray.push(choice);
//        $location.path('/round7');
//        obj.choice9 = "Horror";
//        obj.choice10 = "Sci-Fi";
//        obj.choice11 = "Action/Adventure";
//        obj.choice12 = "Comedy";
//        obj.choice13 = "Drama";
//      }else if(choice === "Watch other type of entertainment"){
//        choiceArray.push(choice);
//        $location.path('/round6');
//        obj.choice7 = "Watch a tv show";
//        obj.choice8 = "Watch online video clips";
      }
        
        
        
        
//      //round7
//      if(choice === "Watch a tv show"){
//        choiceArray.push(choice);
//        $location.path('/round7');
//        obj.choice9 = "Horror";
//        obj.choice10 = "Sci-Fi";
//        obj.choice11 = "Action/Adventure";
//        obj.choice12 = "Comedy";
//        obj.choice13 = "Drama";
//      }else if(choice === "Watch online video clips"){
//        choiceArray.push(choice);
//        $location.path('/round7');
//        obj.choice9 = "Educational";
//        obj.choice10 = "Documentary";
//        obj.choice11 = "Original Content";
//        obj.choice12 = "Foreign";
//        obj.choice13 = "Comedy";
//      }

    }//end of route function

    //This function will return an object full of the choices the player made. Use choices in array to filter out API.
    function returnObj(){
      // console.log(obj);
      return obj;
    }

      
      
     
      
    function stayInIdeas() {
      return $http({
        method: "GET",
        url: "/stayInIdeas"
      }).then(function(response) {
//        stayInIdeastest = response.data;
//        console.log(response);
        return response;
      });
    }
      
  }//end of service
  angular
  .module("app")
  .factory("EventService", EventService);
})();