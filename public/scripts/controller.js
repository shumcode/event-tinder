(function(){
  function QuestionController(EventService){
    var vm = this;
    vm.rmessage;
    vm.events = [];
    vm.classifcation = [];
    vm.routeFunc = function(choice){
      EventService.routeFunc(choice);
    }

    vm.tinder = function() {
      EventService.tinderRoute();
    }

    vm.todaydate = EventService.getDate();

    vm.object = EventService.returnObj();
      
    vm.awesome = function() {
      var todaydate = null;
      var currentdatedd = vm.object.currentDate.getDate();
      var currentdatemm = vm.object.currentDate.getMonth()+1;
      var currentdateyyyy = vm.object.currentDate.getFullYear();
  
      if (currentdatedd<10) {
        currentdatedd = '0'+currentdatedd
      }
      if(currentdatemm<10) {
        currentdatemm = '0'+currentdatemm
      }
   
      todaydate = yyyy + '-' + currentdatemm + '-' + currendatedd;
      console.log(todaydate);
    }

//This is called via ng-click of "Stay-In" on Round1.html.  Sets the movieTVFullArray equal to everything pulled from the database
    vm.makeMovieTVRequest = function() {
        EventService.movieTVRequest()
    }
    
//This executes the filtering of the TV/Movie list    
    vm.filteredMovieTV = function(object){
        EventService.filteredMovieTV(object)
    }
    
    vm.getCity = function(location){
      EventService.makeRequest(location).then(function(response) {
        vm.events = response.data._embedded.events;
      });
    }

  }/*End of Controller*/

  angular
    .module("app")
    .controller("QuestionController", QuestionController)
})();
