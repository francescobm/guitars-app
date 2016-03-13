export class AdminController {
	constructor($state, $uibModal, FirebaseService) {
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.FirebaseService = FirebaseService;
		this.productList =  this.FirebaseService.productList;

		this.added = false;
		this.removed = false;


		this.FirebaseService.authObj.$onAuth(angular.bind(this,(authData)=>{
		  if (authData) {
		    this.loggedin = true;
		    this.userName = authData.password.email;
		  } else {
		    this.loggedin = false;
		  }
		}));
	}

	launchProductModal(product){
		let productMod = product;
		let modalInstance = this.$uibModal.open({
			templateUrl: 'app/admin/product-modal.tmpl.html',
			controller: 'ProductModalController',
			controllerAs: 'productModalCtrl',
			resolve: {
                productMod: productMod
            }
		});
	}

	deleteProduct(product){
		let item = product;
		this.productList.$remove(product).then((ref)=> {
		  
		});
	}

	logout(){
		this.FirebaseService.authObj.$unauth();
		this.$state.reload();
	}

}

AdminController.$inject = ['$state', '$uibModal', 'FirebaseService'];