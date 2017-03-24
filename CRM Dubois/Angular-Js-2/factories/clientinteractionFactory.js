app.factory('clientinteractionFactory', function($http){

  return {

    gettclientinteraction:function(id){
      return $http.get('http://localhost:8888/client-int/'+ id);
    },

    addclientinteraction:function(action,id){
      return $http.post('http://localhost:8888/addint/',{ 'action' : action , 'id':id});
    },

    deleteint:function(id) {
      $http.delete('http://localhost:8888/deleteint/'+ id).then(function (response) {
      }, function (response) {
      });
    }

  }

});
