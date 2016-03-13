export class HomeController {
	constructor($scope, $state, $uibModal, FirebaseService) {
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.FirebaseService = FirebaseService;
		this.productList =  this.FirebaseService.productList;

		this.FirebaseService.authObj.$onAuth(angular.bind(this,function(authData) {
		  if (authData) {
		    this.loggedin = true;
		  } else {
		    this.loggedin = false;
		  }
		}));

	}

	launchLoginModal() {
		let modalInstance = this.$uibModal.open({
			templateUrl: 'app/home/login-modal.tmpl.html',
			controller: 'LoginModalController',
			controllerAs: 'loginModalCtrl'
		});
	}

	logout(){
		this.FirebaseService.authObj.$unauth();
		this.$state.reload();
	}
}

HomeController.$inject = ['$scope','$state', '$uibModal', 'FirebaseService'];