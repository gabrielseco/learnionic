// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    db = window.sqlitePlugin.openDatabase({name: "learnseries.db", location: 1});
    db.transaction(function(tx) {
      tx.executeSql('DROP TABLE IF EXISTS test_table');
      tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
    });
    console.log('init');
    db.transaction(function(tx) {

      tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
        console.log("insertId: " + res.insertId + " -- probably 1");
        console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

      });


    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.films', {
    url: '/films',
    views: {
      'tab-films': {
        templateUrl: 'templates/tab-films.html',
        controller: 'FilmsCtrl'
      }
    }
  })

  .state('tab.films-diccionario', {
    url: '/films-diccionario/:id',
    views: {
      'tab-films': {
        templateUrl: 'templates/films-diccionario.html',
        controller: 'FilmsDiccionarioCtrl'
      }
    }
  })

  .state('tab.series', {
      url: '/series',
      views: {
        'tab-series': {
          templateUrl: 'templates/tab-series.html',
          controller: 'SeriesCtrl'
        }
      }
    })

    .state('tab.series-detail', {
      url: '/series-detail/:name',
      views: {
        'tab-series': {
          templateUrl: 'templates/series-detail.html',
          controller: 'SeriesDetailCtrl'
        }
      }
    })


    .state('tab.series-episodio', {
      url: '/series-episodio/:id',
      views: {
        'tab-series': {
          templateUrl: 'templates/series-episodio.html',
          controller: 'SeriesEpisodioCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/films');

});
