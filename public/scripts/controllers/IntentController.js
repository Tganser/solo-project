myApp.controller('IntentController', function(IntentionsService) {
  console.log('IntentController loaded');
  var vm = this;
  vm.intentions = ["goal1", "goal2", "goal3", "goal4"];
  var newInput = vm.newInput;
  var hours = vm.hours;
  vm.myIntentions = [];

    vm.addIntention = function(newInput, hours){
      IntentionsService.addIntention(newInput);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data;});
    };

    vm.removeIntention = function(thing){
      IntentionsService.removeIntention(thing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data; });
    };

    vm.starIntention = function(thing){
      IntentionsService.starIntention(thing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data; });
    };

    vm.updateIntention = function(){
      IntentionsService.updateIntentions().then(function(data){
        // console.log("data: ",data);
        vm.myIntentions = data;
      });
    };
});
