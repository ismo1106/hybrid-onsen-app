(function(){
  'use strict';

  var api = 'http://yoursite.com/api/';
  var module = angular.module('app', ['onsen']);

  Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
      p.push(key + '=' + encodeURIComponent(obj[key]));
      console.log(obj[key]);
    }
    return p.join('&');
  };

  module.controller('LoginController', function($scope, $http) {

    $scope.isLogged = true;
    $scope.isFetching = false;

    $scope.email = '';
    $scope.password = '';

    $scope.init = function(){

      $scope.isFetching = true;
      
      if (window.localStorage.getItem("token") !== null ) {
        $http.get(api+'validate_token?token='+window.localStorage.getItem("token")).success(
          function(response) {
            console.log(response);
            if( typeof(response.status) !== "undefined"){
              $scope.isLogged = true;
              $scope.isFetching = false;
              $scope.navi.pushPage('home.html');
            } else {
              $scope.isLogged = false;
              $scope.isFetching = false;
            }
          }
        ).error(function(response){
          $scope.isFetching = false;
        });

      } else {
        
        $scope.isLogged = false;
        $scope.isFetching = false;

      }
    
    };

    $scope.login = function(){

      if($scope.email==='' || $scope.password===''){
        
        ons.notification.alert({message: "You can't leave any fields empty"});

      } else {
        
        loginModal.show();

        var data = {
          email: $scope.email,
          password: $scope.password
        };

        $http({
          url: api+'login',
          method: 'POST',
          data: Object.toparams(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response) {
          console.log(response);
          if( typeof(response.token) !== "undefined"){
            window.localStorage.setItem("token", response.token);
            loginModal.hide();
            $scope.navi.pushPage('home.html');
          } else {
            loginModal.hide();
            ons.notification.alert({message: 'Your username/password was incorrect, please try again.'});
          }
        }).error(function(response){
          loginModal.hide();
          $scope.isFetching = false;
        });

      }

    };

  });

  module.controller('HomeController', function($scope, $http, $rootScope) {
    $scope.isFetching = true;
    $scope.items = [];

    $scope.init = function(){

      $http.get(api+'todo?token='+window.localStorage.getItem("token")).success(
        function(response) {
          console.log(response);
          if( typeof(response.status) !== "undefined"){
            
            $scope.isFetching = false;
            $scope.items = response.todos;

          } else {
            ons.notification.alert({message: 'There was an error connecting to the API.'});
            $scope.isFetching = false;
          }
        }
      ).error(function(response){
        ons.notification.alert({message: 'There was an error connecting to the API.'});
        $scope.isFetching = false;
      });

    };

    $scope.showAddTodo = function(index) {
      $scope.navi.pushPage('add.html');
    };

    $scope.deleteTodo = function(id){
      deleteModal.show();

      $http({
        url: api+'todo/'+id+'?token='+window.localStorage.getItem("token"),
        method: 'DELETE',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (response) {
        console.log(response);
        if( typeof(response.status) !== "undefined"){
          deleteModal.hide();
          $scope.init();
        } else {
          deleteModal.hide();
          ons.notification.alert({message: 'There was an error connecting to the API, please try again.'});
        }
      });
    };

    $rootScope.$on('rootScope:refreshtodos', function (event, data) {
      $scope.init();
    });

  });

  module.controller('addTodoController', function($scope, $http, $rootScope) {
    
    $scope.isFetching = false;
    $scope.todo = '';

    $scope.submitTodo = function(){

      if($scope.todo===''){
        
        ons.notification.alert({message: "You can't leave the field empty"});

      } else {
        
        todoModal.show();

        var data = {
          title: $scope.todo
        };

        $http({
          url: api+'todo?token='+window.localStorage.getItem("token"),
          method: 'POST',
          data: Object.toparams(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response) {
          console.log(response);
          if( typeof(response.status) !== "undefined"){
            todoModal.hide();
            $rootScope.$broadcast('rootScope:refreshtodos', 'RefreshTodos');
            $scope.navi.popPage();
          } else {
            todoModal.hide();
            ons.notification.alert({message: 'There was an error connecting to the API, please try again.'});
          }
        });

      }

    };

  });


})();

