var app = angular.module('app', ['ngCookies', 'ngRoute', 'LocalStorageModule','todoApp']);

app.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.when('/home',
			{templateUrl:'todo.html',
			controller:'todoInputController'})
			.when('/view',
			{templateUrl:'todo-view.html',
			controller:'todoViewController'})
			.when('/login',
			{templateUrl:'login.html',
			controller:'todoLoginController'});
	}]);

app.controller('appController', function($scope, $cookies, $location){
	//alert('IN App controller');
	$scope.isLoggedIn = function(){
		return ($cookies.get('user'));
	}

	if(!$cookies.get('user')){
		$location.path('/login');
	}

	$scope.logout = function(){
		$cookies.remove('user');
		$location.path('/login');
	}
});