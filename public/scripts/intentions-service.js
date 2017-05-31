myApp.service('IntentionsService', function($http){

this.addIntention = function(thing, thing2){
  console.log("in add intention function!");
  console.log(thing);

  var intentionToSend = {
    name : thing,
    hours: thing2,
    dateadded : new Date(),
    starred: false
  };

  return $http({
    method: 'POST',
    url : '/addIntention',
    data: intentionToSend
  }).then(function(response){
    return response.data;
  });
};

this.removeIntention = function(thing){
  console.log("in remove Intention function!");
  console.log(thing);
};

this.starIntention = function(thing){
  console.log("in star intention function!");
  console.log(thing);
};

this.updateIntentions = function(){
  console.log("in update intentions");
  return $http({
    method: 'GET',
    url: '/allIntentions'
  }).then(function(response){
    return response.data;
  });
};

});
