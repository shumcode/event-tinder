(function(){
    var stayInTinderComponent = {
        templateUrl: "partials/stayintinder.html",
        controller: function (EventService){
            var vm = this;
            
           
            EventService.stayInIdeas().then(function(response){
                vm.ideas = response.data;
                console.log(vm.ideas);
            });
            
            vm.removeCard = function(index){
                EventService.cardRemover(index);
            }
            vm.saveCard = function(index){
                EventService.cardSaver(index);
            }
            
        }
    }
    angular
        .module("app")
        .component("stayInTinderComponent", stayInTinderComponent);
})();