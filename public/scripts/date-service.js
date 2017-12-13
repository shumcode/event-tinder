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
    var stayInArray = [];
    var DS = null;
    var todaysDate = null;
    var maxDate = null;
    // gets date for if statement
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
      dd = '0'+dd
    } 
    
    if(mm<10) {
      mm = '0'+mm
    } 
    today = yyyy + '-' + mm + '-' + dd; 
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
      randomEvent: randomEvent,
      getDate: getDate,
      removeSICard: removeSICard,
      addSICard: addSICard,
      tinderTime: tinderTime,
      makeArrays: makeArrays
    }

    function getDate () {
      return today;
    }

    function startGame () {
      $location.path('/round1');
    }

    //grabbing the API city.
    function cityFunc(location){
      makeRequest(location);
    }

    function returnTinderEvents() {
//returns minArr if userchoice is <= 50, returns maxArr if userchoice is > 50
      if (obj.userChoice <= 50) {
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


//Adds the Stay In ideas in Tinder mode to a user's array
    function addSICard(index) {
        if (playerCounter === 1) {
            var minCard = stayInArray[index];
            p1Events.push(minCard);
            stayInArray.splice(index, 1);
        } else {
            var minCard = stayInArray[index];
            p2Events.push(minCard);
            stayInArray.splice(index, 1);
        }
    }

//Removes Stay In ideas in Tinder mode from the screen
    function removeSICard(index){
          stayInArray.splice(index, 1);
    }




// removes cards from min and max array when you press X
    function cardRemover(index) {
      if (obj.userChoice < 50) {
        minArr.splice(index, 1);
      } else {
        maxArr.splice(index, 1);
      }
    }

    function cardSaver(index) {
      if (playerCounter === 1) {
        if (obj.userChoice < 50) {
        var minCard = minArr[index];
        p1Events.push(minCard);
        minArr.splice(index, 1);
      } else {
        var maxCard = maxArr[index];
        p1Events.push(maxCard);
        maxArr.splice(index, 1);
      }
    } else {
      if (obj.userChoice < 50) {
        var minCard = minArr[index];
        p2Events.push(minCard);
        minArr.splice(index, 1);
      } else {
        var maxCard = maxArr[index];
        p2Events.push(maxCard);
        maxArr.splice(index, 1);
      }
    }
    }

    function randomEvent() {
      p2RandomEvent = p2Events[Math.floor(Math.random() * p2Events.length)];
      p1RandomEvent = p1Events[Math.floor(Math.random() * p1Events.length)];
      finalEvent.push(p2RandomEvent);
      finalEvent.push(p1RandomEvent);
      finalRandomEvent = finalEvent[Math.floor(Math.random() * finalEvent.length)];
      return finalRandomEvent;
    }

    function tinderTime() {
      $location.path('/tindertime');
    }
    
    function tinderRoute(todaydate, maxdate) {
      todaysDate = todaydate;
      maxDate = maxdate;
    }
    function makeArrays() {
      console.log(tinderEvents);
      minArr = tinderEvents.filter(function(item, index) { 
        var eventdatenumber = Number(item.dates.start.localDate.replace(/-/g, ""));
        if (item.priceRanges === undefined) {

        } else {

        if (eventdatenumber >= todaysDate && eventdatenumber <= maxDate) {
        if (item.priceRanges['0'].min <= 50) {
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
    }
      })
      if (minArr.length === 0 && obj.userChoice === 30) {
        obj.minchoice = true;
      } else {
        obj.minchoice = false;
      }
// this array shows all events above $50
      maxArr = tinderEvents.filter(function(item, index){
        var eventdatenumber = Number(item.dates.start.localDate.replace(/-/g, ""));
        if (item.priceRanges === undefined) {

        } else {

        if (eventdatenumber >= todaysDate && eventdatenumber <= maxDate) {
        if (item.priceRanges['0'].min > 50) {
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
    }
      })
      console.log(minArr);
      console.log(maxArr);
      if (maxArr.length === 0 && obj.userChoice === 55) {
        obj.maxchoice = true;
      } else {
        obj.maxchoice = false;
      }
      if (minArr.length === 0) {
          obj.minarr = true;
        } else {
          obj.minarr = false;
        }
      if (maxArr.length === 0) {
          obj.maxarr = true;
        } else {
          obj.maxarr = false;
        }
    }

//This function will handle how each route is populated
    function routeFunc(choice){
//Route 2
      if(choice === "goout"){
        obj.stayin = false;
        obj.goout = true;
        playerCounter++;
        if (playerCounter === 2) {
          obj.player2 = true;
          obj.player1 = false;
 
        }
        if (playerCounter === 1) {
          obj.player1 = true;
        }
        if (obj.minarr === true && playerCounter === 2) {
          obj.lesschoice = true;
        } else {
          obj.lesschoice = false;
        }
        if (obj.maxarr === true && playerCounter === 2) {
          obj.morechoice = true;
        } else {
          obj.morechoice = false;
        }
        obj.hide = false;
        obj.choice0 = "goout";
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Less than $50";
        obj.choice2 = "More than $50";
      }else if(choice === "stayin"){
        obj.goout = false;
        obj.stayin = true;
        playerCounter++;
        if (playerCounter === 2) {
          obj.player2 = true;
          obj.player1 = false;
        }
        if (playerCounter === 1) {
          obj.player1 = true;
        }
        obj.hide = true;
        obj.choice0 = "stayin";
        choiceArray.push(choice);
        $location.path('/round2');
        obj.choice1 = "Go buy something to do at home";
        obj.choice2 = "Find something to do at home";
     }

//Round 3 - going out
      if(choice === "Less than $50"){
        obj.userChoice = 30;
        choiceArray.push(choice);
        $location.path('/round3');
        obj.choice3 = "Music";
        obj.choice4 = "Sports";
        obj.choice5 = "Family";
        obj.choice6 = "Arts & Theatre";
      }else if(choice === "More than $50"){
        obj.userChoice = 55;
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
        obj.choice6 = "Buy ingredients for a dessert";
        //decision tree ends. Returns list of desserts to make from database
      }else if(choice === "Buy things for other activities"){
        obj.choice3 = null;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Buy arts and crafts supplies";
        //decision tree ends. Returns list of things to buy to make arts and crafts from database
        obj.choice6 = "Buy something active";
        //decision tree ends. Returns list of things to buy to do that are active from database
      }else if(choice === "Do something active"){
        obj.choice4 = null;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Do arts and crafts";
        //decision tree ends. Returns list of things to make from database
        obj.choice6 = "Other active activities";
        //decision tree ends. Returns list of things more active from database
      }else if(choice === "Do something relaxing"){
        obj.choice3 = null;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Watch a movie";
        obj.choice6 = "Watch a tv show";
      }



//Round 6- Only for staying in
      if(choice === "Buy ingredients for dinner"){
        obj.choice6 = null;
        choiceArray.push(choice);
        $location.path('/round6');
        obj.choice7 = "Easy Recipe";
        //decision tree ends. Returns easy recipes for dinner
        obj.choice8 = "Hard Recipe";
        //decision tree ends. Returns hard recipes for dinner
      } else if(choice === "Watch a movie"){
        obj.choice6 = null;
        choiceArray.push(choice);
        $location.path('/round7');
        obj.choice9 = "Horror";
        obj.choice10 = "Sci-Fi";
        obj.choice11 = "Action/Adventure";
        obj.choice12 = "Comedy";
        obj.choice13 = "Drama";
      } else if(choice === "Watch a tv show"){
        obj.choice5 = null;
        choiceArray.push(choice);
        $location.path('/round7');
        obj.choice9 = "Horror";
        obj.choice10 = "Sci-Fi";
        obj.choice11 = "Action/Adventure";
        obj.choice12 = "Comedy";
        obj.choice13 = "Drama";
      }


    //These are the final endpoints that will transfer to the stayintinder component with the appropriate data set//
        if(choice === "Easy Recipe"){
            DS = 1;
            $location.path("/tindertime");
        }

        if(choice === "Hard Recipe"){
            DS = 2;
            $location.path("/tindertime");
        }

        if(choice === "Buy arts and crafts supplies"){
            DS = 3;
            $location.path("/tindertime");
        }

        if(choice === "Buy something active"){
            DS = 4;
            $location.path("/tindertime");
        }

        if(choice === "Do arts and crafts"){
            DS = 5;
            $location.path("/tindertime");
        }

        if(choice === "Other active activities"){
            DS = 6;
            $location.path("/tindertime");
        }

        if(choice === "Buy ingredients for a dessert"){
            DS = 7;
            $location.path("/tindertime");
        }

//        if(choice === "Horror" && obj.choice5 === "Watch a movie"){
//            console.log("Horror Movie is happy");
//        }
//
//        if(choice === "Sci-Fi" && obj.choice5 === "Watch a movie"){
//            console.log("Sci-Fi Movie is happy");
//        }




    }//end of route function

    //This function will return an object full of the choices the player made. Use choices in array to filter out API.
    function returnObj(){
      // console.log(obj);
      return obj;
    }



    function stayInIdeas() {
        return $http({
        method: "GET",
        url: "/stayInIdeas/" + DS
      }).then(function(response) {
            stayInArray = response.data;
            console.log(stayInArray);
            return response;
      });
    }

  }//end of service
  angular
  .module("app")
  .factory("EventService", EventService);
})();
