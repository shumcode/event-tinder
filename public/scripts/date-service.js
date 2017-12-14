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
    var movieTVFullArray = [];
    var DS = null;
    var todaysDate = null;
    var maxDate = null;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
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
      movieTVRequest: movieTVRequest,
      filteredMovieTV: filteredMovieTV,
      tinderTime: tinderTime,
      makeArrays: makeArrays
    }

    function getDate () {
      return today;
    }

    function startGame () {
      $location.path('/round1');
    }

    function cityFunc(location){
      makeRequest(location);
    }

    function returnTinderEvents() {
      if (obj.userChoice <= 50) {
        return minArr;
      } else {
        return maxArr;
      }
    }

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

    function twoRoute() {
      $location.path('/round1');
    }

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

    function removeSICard(index){
          stayInArray.splice(index, 1);
    }


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
    console.log(p2Events, p1Events);
    }

    function randomEvent() {
      p2RandomEvent = p2Events[Math.floor(Math.random() * p2Events.length)];
      p1RandomEvent = p1Events[Math.floor(Math.random() * p1Events.length)];
      finalEvent.push(p2RandomEvent);
      finalEvent.push(p1RandomEvent);
      finalRandomEvent = finalEvent[Math.floor(Math.random() * finalEvent.length)];
      returnObj();
      if (finalRandomEvent.Details === undefined) {
        obj.goOutEvent = true;
      } else {
        obj.goOutEvent = false;
      }

      console.log(obj);
      console.log(finalRandomEvent);
      return finalRandomEvent;
    }

    function tinderTime() {
      $location.path('/tindertime');
    }

    function tinderRoute(todaydate, maxdate) {
      todaysDate = todaydate;
      maxDate = maxdate;
    }

    var todaysDate = "";
    var maxDate = "";
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


    function routeFunc(choice){
      if(choice === "goout"){
        obj.stayin = false;
        obj.goout = true;
        playerCounter++;
        if (playerCounter === 2 && obj.goout === true) {
          obj.p2go = true;
        }
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

      if(choice === "Go buy something to do at home"){
          obj.atHome = false;
          choiceArray.push(choice);
          $location.path('/round4');
          obj.choice3 = "Buy things to cook from the store";
          obj.choice4 = "Buy things for other activities";
      }else if(choice === "Find something to do at home"){
          obj.atHome = true;
          choiceArray.push(choice);
          $location.path('/round4');
          obj.choice3 = "Do something active";
          obj.choice4 = "Do something relaxing";
      }

      if(choice === "Music"){
        choiceArray.push(choice);

      }else if(choice === "Family"){
        choiceArray.push(choice);

      }else if(choice === "Sports"){
        choiceArray.push(choice);

      }else if(choice === "Arts & Theatre"){
        choiceArray.push(choice);

      }

      if(choice === "Buy things to cook from the store"){
        obj.buycook=true;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Buy ingredients for dinner";
        obj.choice6 = "Buy ingredients for a dessert";
      }else if(choice === "Buy things for other activities"){
        obj.active = true;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Arts and Crafts Supplies";
        obj.choice6 = "Something Active";
      }else if(choice === "Do something active"){
        obj.active = true;
        obj.relaxing = false;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Do arts and crafts";
        obj.choice6 = "Other active activities";
      }else if(choice === "Do something relaxing"){
        obj.active = false;
        obj.relaxing = true;
        choiceArray.push(choice);
        $location.path('/round5');
        obj.choice5 = "Watch a movie";
        obj.choice6 = "Watch a tv show";
      }



      if(choice === "Buy ingredients for dinner"){
        choiceArray.push(choice);
        $location.path('/round6');
        obj.choice7 = "Easy Recipe";
        obj.choice8 = "Hard Recipe";
      } else if(choice === "Watch a movie"){
        choiceArray.push(choice);
        $location.path('/round7');
        obj.choice9 = "Horror";
        obj.choice10 = "Sci-Fi";
        obj.choice11 = "Action/Adventure";
        obj.choice12 = "Comedy";
        obj.choice13 = "Drama";
      } else if(choice === "Watch a tv show"){
        choiceArray.push(choice);
        $location.path('/round8');
        obj.choice9 = "Documentary";
        obj.choice10 = "Sci-Fi";
        obj.choice11 = "Action/Adventure";
        obj.choice12 = "Comedy";
        obj.choice13 = "Drama";
      }

        if(choice === "Easy Recipe"){
            DS = 1;
            $location.path("/tindertime");
        }

        if(choice === "Hard Recipe"){
            DS = 2;
            $location.path("/tindertime");
        }

        if(choice === "Arts and Crafts Supplies"){
            DS = 3;
            $location.path("/tindertime");
        }

        if(choice === "Something Active"){
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


    }//end of route function

    function returnObj(){
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

      function movieTVRequest(){
          return $http({
              method: "GET",
              url:"/movieTV"
          }).then(function(response){
              movieTVFullArray = response.data;
          });
      }


      function filteredMovieTV(){
          $location.path('/tindertime');

          stayInArray = movieTVFullArray.filter(function(item, index){
              if(obj.choice5 === "Watch a movie"){
            if(obj.choice9checked === true){
                if(item.infoset == 8){
                    return item;
                }
              }
            if(obj.choice10checked === true){

                if(item.infoset == 9){
                    return item;
                }
              }
            if(obj.choice11checked === true){
                if(item.infoset == 10){
                    return item;
                }
              }
            if(obj.choice12checked === true){
                if(item.infoset == 11){
                    return item;
                }
              }
            if(obj.choice13checked === true){
                if(item.infoset == 12){
                    return item;
                }
              }
            } else {
            if(obj.choice9checked === true){
                if(item.infoset == 17){
                    return item;
                }
                }
            if(obj.choice10checked === true){
                if(item.infoset == 16){
                    return item;
                }
                }
            if(obj.choice11checked === true){
                if(item.infoset == 13){
                    return item;
                }
                }
            if(obj.choice12checked === true){
                if(item.infoset == 14){
                    return item;
                }
                }
            if(obj.choice13checked === true){
                if(item.infoset == 15){
                    return item;
                }
                }

          }})
          console.log(stayInArray);
          return stayInArray;
      }






  }//end of service
  angular
  .module("app")
  .factory("EventService", EventService);
})();
