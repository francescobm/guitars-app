// controllers
import { HomeController } from './home/home.controller.es6';
import { LoginModalController } from './home/login-modal.controller.es6';
import { AdminController } from './admin/admin.controller.es6';
import { ProductModalController } from './admin/product-modal.controller.es6';

// services
import { FirebaseService } from './_core/services/firebase.service.es6';

let routeErrorHandler = ["$rootScope", "$state", function($rootScope, $state) {

	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
	
	if (error === "AUTH_REQUIRED") {$state.go("home"); }
	
	});

}]


let app = angular.module('crudApp', ['firebase', 'ui.router','ui.bootstrap', 'ngMessages'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		 
		  $urlRouterProvider.otherwise("/");

		  $stateProvider
		    .state('home', {
				url: '/',
				views: {
					'': {
						templateUrl: 'app/home/home.tmpl.html',
						controller: 'HomeController',
						controllerAs: 'homeCtrl'
					}
				}
			})
			.state('admin', {
				url: '/admin',
				 resolve: {
			      "isAuth": ["FirebaseService", function(FirebaseService) {
			        return FirebaseService.authObj.$requireAuth();
			      }]
			    },
				views: {
					'': {
						templateUrl: 'app/admin/admin.tmpl.html',
						controller: 'AdminController',
						controllerAs: 'adminCtrl'
					}
				}
			}) 
	}])
    .controller('HomeController', HomeController)
    .controller('LoginModalController', LoginModalController)
    .controller('AdminController', AdminController)
    .controller('ProductModalController', ProductModalController)
    .factory('FirebaseService', FirebaseService)
    .run(routeErrorHandler);

// initialize app
angular.bootstrap(document, ['crudApp']);
