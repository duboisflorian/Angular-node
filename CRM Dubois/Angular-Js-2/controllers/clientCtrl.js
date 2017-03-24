app.controller('clientCrl', function($scope,clientinteractionFactory,clientFactory,$q) {

  $scope.afficherIntatt=false;
  $scope.afficherformatt=false;
  $scope.afficherformclientatt=false;
  $scope.id;

  $scope.closeint  = function (){
    $scope.afficherIntatt=false;
  }

  $scope.closeform  = function (){
    $scope.afficherformatt=false;
  }

  $scope.test  = function (){
    console.log('test');
  }

  $scope.closeformclient  = function (){
    $scope.afficherformclientatt=false;
  }

  $scope.afficherform = function (id){

    $scope.afficherformatt=true;
    $scope.id=id;
  }

  $scope.afficherformclient = function (){
    $scope.afficherformclientatt=true;
  }

  $scope.afficherint = function (id){
    $scope.id=id;
    var promise = asyncGreet2(id);
    promise.then(function(greeting) {
      $scope.interaction = greeting.data;
      $scope.afficherIntatt=true;
    }, function(reason) {
      alert('Failed: ' + reason);
    });
  }

  $scope.addclient = function (name,phone,mail) {

    clientFactory.addclientpost(name,phone,mail);
    promise = asyncGreet();
    promise.then(function(greeting) {
      $scope.client = greeting;
    }, function(reason) {
      alert('Failed: ' + reason);
    });

  };

  $scope.addint = function (action) {

    clientinteractionFactory.addclientinteraction(action,$scope.id);
    $scope.action="";
  };

  $scope.deleteclient = function (id) {
    clientFactory.deleteclient(id);
    promise = asyncGreet();
    promise.then(function(greeting) {
      $scope.client = greeting;
    }, function(reason) {
      alert('Failed: ' + reason);
    });
  };

  $scope.deleteint = function (id) {
    clientinteractionFactory.deleteint(id);
    var promise = asyncGreet2($scope.id);
    promise.then(function(greeting) {
      $scope.interaction = greeting.data;
    }, function(reason) {
      alert('Failed: ' + reason);
    });
  };


  function asyncGreet() {
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        if (okToGreet()) {
          resolve(clientFactory.gettAllclient());
        } else {
          reject();
        }
      }, 1000);
    });
  }

  function asyncGreet2(id) {
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        if (okToGreet()) {
          resolve(clientinteractionFactory.gettclientinteraction(id));
        } else {
          reject();
        }
      }, 1000);
    });
  }

  var promise = asyncGreet();
  promise.then(function(greeting) {
    $scope.client = greeting;
  }, function(reason) {
    alert('Failed: ' + reason);
  });

  function okToGreet(){
    return true;
  }



});

app.directive('formInteraction',function(){
  return{
    restrict:'E',
    templateUrl:'form-interaction.html',
    controller:function($scope){
      $scope.closeform = function closeint(){
        $scope.$parent.closeform();
      };
      $scope.addint = function addint(action){
        $scope.$parent.addint(action);
        $scope.$parent.closeform();
      };

    }
  };
});

app.directive('afficherInteraction',function(){
  return{
    restrict:'E',
    scope:{
      interactioninfo:'=info',
    },
    templateUrl:'afficher-interaction.html',
    controller:function($scope){
      $scope.closeint = function closeint(){
        $scope.$parent.closeint();
      };
      $scope.deleteint = function deleteint(id){
        $scope.$parent.deleteint(id);
      };
    }

  }

});

app.directive('formClient',function(){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'form-client.html',
    controller:function($scope){
      $scope.closeformclient = function closeformclient(){
        $scope.$parent.closeformclient();
      };
      $scope.addclient = function addclient(name,phone,mail){
        $scope.$parent.addclient(name,phone,mail);
                $scope.$parent.closeformclient();
        $scope.name="";
        $scope.phone="";
        $scope.mail="";
      };
    }

  }

});
