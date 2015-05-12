angular.module('starter.controllers', ['ionic'])

.controller('FilmsCtrl', function($scope,$ionicLoading,Films) {
  $scope.loadingIndicator = $ionicLoading.show({
	    content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500
	});


  var films = new Array();

  console.log('make films function');

  Films.makeFilms(function(res){
    if(res === true){
      console.log('get all the items and writed');
      Films.all(function(result){
        for(var i = 0;i<result.rows.length;i++){
          films.push(result.rows.item(i));
        }
        console.log('passing the items to the scope');
        $scope.films = films;
        $scope.loadingIndicator.hide()


      });
    }
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
