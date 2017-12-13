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
      EventService.tinderTime();
    }

    vm.object = EventService.returnObj();
      
    vm.filterArray = function () {
      var stuff = EventService.makeArrays();
    }

    vm.awesome = function() {
      var todaydate = null;
      var enddate = null;
      var currentdatedd = vm.object.currentdate.getDate();
      var currentdatemm = vm.object.currentdate.getMonth()+1;
      var currentdateyyyy = vm.object.currentdate.getFullYear();
      var maxdatedd = vm.object.maxdate.getDate();
      var maxdatemm = vm.object.maxdate.getMonth()+1;
      var maxdateyyyy = vm.object.maxdate.getFullYear();
      if (currentdatedd<10) {
        currentdatedd = '0'+currentdatedd
      }
      if(currentdatemm<10) {
        currentdatemm = '0'+currentdatemm
      }
      todaydate = currentdateyyyy + '-' + currentdatemm + '-' + currentdatedd;
      if (maxdatedd<10) {
        maxdatedd = '0'+maxdatedd
      }
      if(maxdatemm<10) {
        maxdatemm = '0'+maxdatemm
      }
      enddate = maxdateyyyy + '-' + maxdatemm + '-' + maxdatedd;
      var enddatehyphens = Number(enddate.replace(/-/g, ""));
      var todaydatehyphens = Number(todaydate.replace(/-/g, ""));
      EventService.tinderRoute(todaydatehyphens, enddatehyphens);
    }

    vm.makeMovieTVRequest = function() {
        EventService.movieTVRequest();
    }
        
    vm.filteredMovieTV = function(object){
        EventService.filteredMovieTV(object);
    }
    
    vm.getCity = function(location){
        EventService.makeRequest(location).then(function(response) {
        vm.events = response.data._embedded.events;
      });
    }

  }/*End of Controller*/

  angular
    .module("app")
    .controller("QuestionController", QuestionController);
})();
