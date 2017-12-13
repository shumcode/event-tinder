(function(){
  var tinderComponent = {
  templateUrl:"partials/tindertime.html",
  controller: function (EventService) {
    var vm=this;
    vm.removeCard = function(index) {
      // console.log(index);
      EventService.cardRemover(index);
    }
    vm.saveCard = function(index) {
      EventService.cardSaver(index);
    }
    vm.playerTwo = function() {
      vm.try = EventService.returnObj();
      vm.try.choice3checked = false;
      vm.try.choice4checked = false;
      vm.try.choice5checked = false;
      vm.try.choice6checked = false;
      vm.try.choice9checked = false;
      vm.try.choice10checked = false;
      vm.try.choice11checked = false;
      vm.try.choice12checked = false;
      vm.try.choice13checked = false;
      EventService.twoRoute();
    }
    vm.object = EventService.returnObj();
    
    vm.randomEvent = function() {
      vm.winningEvent = EventService.randomEvent();
    }
    
//    vm.finalEventType = function(){
//        vm.finalEventType = EventService.finalEventType();
//    }
    
    vm.startOver = function() {
      vm.try = EventService.returnObj();
      vm.try.location = "";
      vm.try.choice3checked = false;
      vm.try.choice4checked = false;
      vm.try.choice5checked = false;
      vm.try.choice6checked = false;
      vm.try.choice9checked = false;
      vm.try.choice10checked = false;
      vm.try.choice11checked = false;
      vm.try.choice12checked = false;
      vm.try.choice13checked = false;
      EventService.startOverRoute();
    }
    vm.events = EventService.returnTinderEvents();
      
    vm.movies = EventService.filteredMovieTV();
    
    EventService.stayInIdeas().then(function(response){
        vm.ideas = response.data;
    });
      
    vm.addSICard = function(index){
        EventService.addSICard(index);
    }
            
    vm.removeSICard = function(index){
        EventService.removeSICard(index);
    }
  }
};
angular
  .module("app")
  .component("tinderComponent", tinderComponent);
})();
