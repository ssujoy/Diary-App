var todoApp = angular.module('todoApp',[]);

todoApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('todoApp')
	.setStorageType('sessionStorage');
});
	
todoApp.factory('todoFactory',['$http','$cookies', '$location', function ($http, $cookies, $location){
	return {
		'getDeveloper' : function(){
			return $http.get("data/developer.json");//['Sujoy Saha', 'Payel Das'];
		},
		'isLoggedIn' : function(){
			if(!$cookies.get('user')){
				$location.path('/login');
			}
		},
		'setSelectedMenuItem' : function(){
			$('.selectedMenuItem').removeClass('selectedMenuItem').addClass('menuItem');
			switch($location.path()){
				case '/home' : 
					$('#home').attr('class','selectedMenuItem');
					break;
				case '/view' :
					$('#view').attr('class','selectedMenuItem');
					break;
				case '/profile' :
					$('#profile').attr('class','selectedMenuItem');
					break;
				case '/set-todo' :
					$('#set-todo').attr('class','selectedMenuItem');
			}
		}
	}
}]);
	
todoApp.controller('todoInputController', function($scope,todoFactory,localStorageService){
	todoFactory.isLoggedIn();
	todoFactory.setSelectedMenuItem();

	$scope.onDateChange = function(){
		var date = new Date($scope.date);
		var key = date.toLocaleDateString();
		$scope.note = localStorageService.get(key);
	}
	
	$scope.setToDo = function(){
		var date = new Date($scope.date);
		var key = date.toLocaleDateString();
		localStorageService.set(key,$scope.note);
		alert("Saved");
	}
});

todoApp.controller('todoViewController', function($scope,todoFactory,localStorageService){
	todoFactory.isLoggedIn();
	todoFactory.setSelectedMenuItem();

	$scope.viewNote = function(){
		var date = new Date($scope.date);
		var key = date.toLocaleDateString();
		$scope.todoList = localStorageService.get(key);
	}
});

todoApp.controller('todoLoginController', function($scope, $cookies, $location,todoFactory,localStorageService){
	//alert('IN Todo View Controller');
	
	if(!$cookies.get('user')){
		$location.path('/login');
	}else{
		$location.path('/home');
	}
	
	$scope.authentication = function(){
		if($scope.user=='admin' && $scope.password == 'admin'){
			$cookies.put('user',$scope.user);
			$location.path("/home");
		}else{
			bootbox.alert({ 
    		size: 'small',
    		message: "<b style='color:red;width:100%;text-align:center;display:inline-block;'>Wrong User or Password</b>"});
		}
	}
});