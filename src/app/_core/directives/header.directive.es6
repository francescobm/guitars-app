export let HeaderDirective = function HeaderDirective( ) {

	return {
		restrict: 'E',	
		controller: ['$state', '$uibModal', 'FirebaseService', function($state, $uibModal, FirebaseService){
				this.$state = $state;
				this.active = this.$state.current.name;
				this.$uibModal = $uibModal;
				this.FirebaseService = FirebaseService;

				this.FirebaseService.authObj.$onAuth(angular.bind(this,function(authData) {
				  if (authData) {
				    this.loggedin = true;
				  } else {
				    this.loggedin = false;
				  }
				}));	
			

			this.launchLoginModal = function() {
				let modalInstance = this.$uibModal.open({
					templateUrl: 'app/home/login-modal.tmpl.html',
					controller: 'LoginModalController',
					controllerAs: 'loginModalCtrl'
				});
			}

			this.logout = function(){
				this.FirebaseService.authObj.$unauth();
				this.$state.reload();
			}
			

		}],
		controllerAs: 'headerCtrl',
		templateUrl: 'app/_core/directives/header.tmpl.html'
	}
}