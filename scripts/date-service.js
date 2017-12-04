(function() {
  function EventService($location) {
    return{
      goOut:goOut
    }

    function goOut(){
      $location.path('/goOut');
    }
  }
  angular
  .module("app")
  .factory("EventService", EventService);
})();
