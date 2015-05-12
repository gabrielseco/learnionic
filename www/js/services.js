var api = "http://vlab.es/web/";

angular.module('starter.services',['ionic'])

.factory('Films', function($http,$ionicPlatform) {


  console.log('db open in services');
  var createFilms = "CREATE TABLE IF NOT EXISTS  peliculas (ID integer,IDMovie integer,Nombre text(100),Year integer,Foto text(200),Borrado integer,alta timestamp)";
  var insertFilms = "INSERT into peliculas (ID,IDMovie,Nombre,Year,Foto,Borrado,Alta) VALUES (?,?,?,?,?,?,?)";
  return {
            makeFilms:function(callback){
              $ionicPlatform.ready(function() {
                if(!window.cordova){
                  var db = openDatabase('learnseries', '1.0', 'my first database', 2 * 1024 * 1024);

                }
                else{
                  var db = window.sqlitePlugin.openDatabase({name: "learnseries.db", location: 1});
                }

              var contador = 0;
              console.log('creating tables');
              db.transaction(function(tx) {
                tx.executeSql('DROP TABLE IF EXISTS peliculas');
                tx.executeSql(createFilms);
              });

              console.log('before we make the request');

              $http.get(api + "peliculas_app").then(function(result){
                var result = result.data;
                result = result.map(function(data){
                  db.transaction(function(tx){
                    tx.executeSql(insertFilms, [data.ID, data.IDMovieDB,data.Nombre,data.Year,data.Foto,data.Borrado,data.Alta],
                             function () {
                               contador++;

                                 console.log('Insertadas las peliculas');
                                 if(result.length === contador){
                                   callback(true);
                                 }

                             },
                             function (tx, error) {
                                 console.log('Error al insertar las peliculas: ' + error.message);
                             });
                  });
                });
              });
            });






            },
            all: function(callback) {
              $ionicPlatform.ready(function() {
                if(!window.cordova){
                  var db = openDatabase('learnseries', '1.0', 'my first database', 2 * 1024 * 1024);

                }
                else{
                  var db = window.sqlitePlugin.openDatabase({name: "learnseries.db", location: 1});
                }
              db.transaction(function(tx){
                tx.executeSql("select * from peliculas where Borrado=? ", [0], function(tx, res) {
                  callback(res);
                },function(err){
                  alert('error'+error)
                });
              });
            });




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
