export class LoginModalController {
    constructor($state, $uibModalInstance, FirebaseService, $firebaseAuth) {
        this.$state = $state;
        this.$uibModalInstance = $uibModalInstance;
        this.form = {};
		this.authObj = FirebaseService.authObj;
		this.wrongCredentials = false;

    }

    login(){
    	// set error message display to false in case of previous login failure
    	this.wrongCredentials = false;

    	this.authObj.$authWithPassword({
		  email: this.form.Email,
		  password: this.form.Password
		}).then(angular.bind(this, (authData)=> {
		  
		  this.$state.go('admin');
		  this.$uibModalInstance.close();
		})).catch(angular.bind(this, (error)=> {
		  this.wrongCredentials = true;
		}));
    }
}

LoginModalController.$inject = ['$state', '$uibModalInstance', 'FirebaseService', '$firebaseAuth'];