app.controller('clientCtrl', function($scope, clientFactory){
  var promise = clientFactory.getAllClient();
  $scope.client_checked = false;
  $scope.loading = true;
  $scope.clients = [];
  $scope.interactions = [];
  $scope.error = false;
  $scope.client_added = false;
  $scope.interaction_added = false;

  $scope.afficherDetails = function(client){
    console.log("Afficher details client" + client.id);
    $scope.client_checked = true;
    var promise2 = clientFactory.getAllInteraction(client.id);
    promise2.then(function(response){
      console.log('depuis mon ctrl', response)
      $scope.interactions = response.data;
      $scope.client_details = client;

    }, function(reason){
      console.log(reason);
    });
  };

  $scope.supprimerInteraction = function(interaction){
    console.log("supprimer l'interaction'" + interaction.id);
    var promise6 = clientFactory.supressionInteraction(interaction.id);
    promise6.then(function(response){
      var indexOf = $scope.interactions.indexOf(interaction);
      $scope.interactions.splice(indexOf, 1);
      console.log('depuis mon ctrl', response);
    }, function(reason){
      $scope.error = true;
      console.log(reason);
    });
  };

  $scope.creerInteraction = function(client_details, interaction_created){
    $scope.interaction_added = true;
    $scope.interaction_created = interaction_created;
    var promise5 = clientFactory.creationInteraction(client_details, interaction_created);
    promise5.then(function(response){
      if (typeof image_array !== 'undefined' && image_array.length > 0) {
        var id_added = $scope.interactions[$scope.interactions.length - 1].id + 1;
      }else{
        var id_added = 1;
      }
      $scope.interactions.push({id: id_added, contenu: interaction_created, idclient: client_details.id});
      console.log("ajout de l'interaction" + client_details.nom, response);
    }, function(reason){
      $scope.error = true;
      console.log(reason);
    });
  }

  $scope.supprimerClient = function(client){
    console.log("supprimer le client" + client.id);
    var promise3 = clientFactory.supressionClient(client.id);
    promise3.then(function(response){
      var indexOf = $scope.clients.indexOf(client);
      $scope.clients.splice(indexOf, 1);
      console.log('depuis mon ctrl', response);
    }, function(reason){
      $scope.error = true;
      console.log(reason);
    });
  };

  $scope.ajouterClient = function(nom, prenom, mail){
    console.log("ajout d'un client");
    var promise4 = clientFactory.ajoutClient(nom, prenom, mail);
    promise4.then(function(response){
      console.log('depuis mon ctrl', response);
      var id_added = $scope.clients[$scope.clients.length - 1].id + 1;
      $scope.clients.push({id: id_added, nom: nom, prenom: prenom, mail: mail});
      $scope.client_added = true;
    }, function(reason){
      $scope.error = true;
      console.log(reason);
    });
  };

  $scope.closeTab = function(){
    $scope.client_added = false;
  }

  promise.then(function(response){
    console.log('depuis mon ctrl', response)
    $scope.clients = response.data;
    $scope.loading = false;

  }, function(reason){
    console.log(reason);
  });

});
