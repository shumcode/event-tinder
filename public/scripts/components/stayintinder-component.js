(function(){
    var stayInTinderComponent = {
        templateUrl: "partials/stayintinder.html",
        controller: function (EventService){
            var vm = this;
            
            EventService.stayInIdeas().then(function(response){
                vm.ideas = response.data;
                console.log(vm.ideas);
            });
            
            vm.addSICard = function(index){
                EventService.addSICard(index);
            }
            
            vm.removeSICard = function(index){
                EventService.removeSICard(index);
            }
        }
    }
    angular
        .module("app")
        .component("stayInTinderComponent", stayInTinderComponent);
})();