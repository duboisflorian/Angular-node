app.factory('clientFactory', function($http){
  var factory = {
    getAllClient: function(){
      return $http.get('http://localhost:8888/clients');
    },
    getAllInteraction: function(id){
      return $http.get('http://localhost:8888/interactions/' + id);
    },
    supressionClient: function(id){
      return $http.delete('http://localhost:8888/supprimerclient/' + id);
    },
    ajoutClient: function(nom, prenom, mail){
      return $http.post('http://localhost:8888/ajouterclient/' + nom + '/' + prenom +'/' + mail);
    },
    creationInteraction: function(client_details, interaction_created){
      return $http.post('http://localhost:8888/creationinteraction/' + client_details.id + '/' + interaction_created);
    },
    supressionInteraction: function(id){
      return $http.delete('http://localhost:8888/suppressioninteraction/' + id);
    }
  }
  return factory;
});
