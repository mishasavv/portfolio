var myApp = angular.module('myApp', ['ui.router'])
// Config route provider
.config(function($stateProvider) {
    $stateProvider
	  .state('home', {
		url:'',
		templateUrl: 'templates/home.html',
		controller: 'HomeController',
	  })
	  .state('resume', {
		url:'/resume',
		templateUrl: 'templates/resume.html',
		controller: 'ResumeController',
	  })
	  .state('projects', {
		url:'/projects',
		templateUrl: 'templates/projects.html',
		controller: 'ProjectController',
	  })
})

// Landing page controller: define $scope.number as a number
.controller('HomeController', function($scope){
  clearActive();
  $('#navbar-home').addClass('active');
  $scope.number = 20
})

// Content controller: define $scope.url as an image
.controller('ResumeController', function($scope){
	clearActive();
	$('#navbar-resume').addClass('active');
	var resUrl = "students.washington.edu/mikhail3/res/docs/RESUME.pdf";
  $scope.url = resUrl;
})
.controller('ProjectController', function($scope){
	clearActive();
	$('#navbar-projects').addClass('active');
	var file = "res/cvs/web-projects.csv";
	var file2 = "res/cvs/android_projects.csv";
	Papa.parse(file, {
		download: true,
		complete: function(results) {
			var webdata = results.data;
			webdata.splice(-1, 1); //splice removes hash info from data
			$scope.webdata = webdata;
		}
	});
	Papa.parse(file2, {
		download: true,
		complete: function(results) {
			var androiddata = results.data;
			androiddata.splice(-1, 1); //splice removes hash info from data
			$scope.androiddata = androiddata;
		}
	});
})

var clearActive = function(){
	$('#navbar-home').removeClass('active');
	$('#navbar-resume').removeClass('active');
	$('#navbar-projects').removeClass('active');
}








