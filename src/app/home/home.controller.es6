export class HomeController {
	constructor($state, $uibModal, FirebaseService) {
		this.$state = $state;
		this.FirebaseService = FirebaseService;
		this.productList =  this.FirebaseService.productList;
	}

	
}

HomeController.$inject = ['$state', '$uibModal', 'FirebaseService'];