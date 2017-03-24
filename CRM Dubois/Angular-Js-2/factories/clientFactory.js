app.factory('clientFactory', function($http){
return { gettAllclient:function(){
  return $http.get('http://localhost:8888/clients');
},addclientpost:function(name,phone,mail) {
    $http.post('http://localhost:8888/addclient/',{ 'name' : name , 'phone':phone,'mail':mail});
  },deleteclient:function(id) {


$http.delete('http://localhost:8888/deleteclient/'+ id).then(function (response) {

}, function (response) {

});

    }
}


});
