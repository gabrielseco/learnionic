var api = "http://vlab.es/web/";

angular.module('starter.services',[])

.factory('Films', function($http) {
  // Might use a resource here that returns a JSON array

  return {
            all: function() {

              //return $http.get(api+"peliculas");

            },

            get: function(filmId) {
              for (var i = 0; i < chats.length; i++) {
                if (films[i].id === parseInt(filmId)) {
                  return films[i];
                }
              }
              return null;
            },
            getDiccionarios:function(id){
              return $http.get(api + "palabras_pelicula?ID="+id);
            }
          };


})


.factory('Series', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data


  return {
    all: function() {

      return $http.get(api+"series");



    },
    reduce:function(series){
      only = new Array();


      only.push(series[0]);

      for(var i = 1;i<series.length;i++){

        if(series[i]['Nombre'] !== series[i-1]['Nombre'] ){
          only.push(series[i])
        }

      }


      return only;
    },
    getEpisodios:function(id){
      return $http.get(api+"episodios?ID="+id);
    },
    getName:function(name,series){
      series  = JSON.parse(series);
      var only = new Array();
      for(var i=0;i<series.length;i++){
        if(name === series[i]['Nombre']){
          only.push(series[i]);
        }
      }
      return only;
    },

  };
})
