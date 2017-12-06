(function(){
    var questiononeComponent = {
    templateUrl:"partials/homepage.html",
    controller: "QuestionController"
  };
  angular
    .module("app")
    .component("questiononeComponent", questiononeComponent)
})();
