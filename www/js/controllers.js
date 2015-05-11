angular.module('starter.controllers', ['ionic'])

.controller('FilmsCtrl', function($scope,$ionicLoading,Films,$ionicPlatform) {
  /*$scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});
  Films.all().then(function(films){
    var films = films.data;
    $scope.films = films;
    $scope.loadingIndicator.hide()
  })*/
  $ionicPlatform.ready(function() {
      alert('controller films')
      var db = window.sqlitePlugin.openDatabase({name: "learnseries.db"});

    db.transaction(function(tx) {
      tx.executeSql('DROP TABLE IF EXISTS test_table');
      tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
    });

      db.transaction(function(tx) {

        console.log('controller');
        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

        });


      });

  });






})

.controller('FilmsDiccionarioCtrl', function($scope,$stateParams,$ionicLoading,Films) {
  $scope.$on("$ionicView.afterEnter", function() {
    $scope.loadingIndicator = $ionicLoading.show({
  	    content: 'Loading Data',
  	    animation: 'fade-in',
  	    showBackdrop: true,
  	    maxWidth: 200,
  	    showDelay: 500
  	});
    Films.getDiccionarios($stateParams.id).then(function(films){
      var films = films.data;
      $scope.films = films;
      $scope.loadingIndicator.hide()
    })
});

})


.controller('SeriesCtrl', function($scope,$ionicLoading,Series) {
  $scope.loadingIndicator = $ionicLoading.show({
      content: 'Loading Data',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 500
  });
  Series.all().then(function(series){
    var series = series.data;

    localStorage.setItem('series',JSON.stringify(series));

    var series = Series.reduce(series);
    $scope.series = series;
    $scope.loadingIndicator.hide();
  })

})

.controller('SeriesDetailCtrl', function($scope, $stateParams, Series) {
  var series = localStorage.getItem('series');
  $scope.series = Series.getName($stateParams.name,series);
})

.controller('SeriesEpisodioCtrl', function($scope, $stateParams,$ionicLoading, Series) {
  $scope.$on("$ionicView.afterEnter", function() {
    $scope.loadingIndicator = $ionicLoading.show({
        content: 'Loading Data',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 500
    });
    Series.getEpisodios($stateParams.id).then(function(episodios){
      var episodios = episodios.data;
      $scope.episodios = episodios;
      $scope.loadingIndicator.hide();
    })
  });
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
