export class ProductModalController {
    constructor($state, $uibModalInstance, FirebaseService, productMod) {
        this.$state = $state;
        this.$uibModalInstance = $uibModalInstance;
        this.FirebaseService = FirebaseService;
        this.productList = FirebaseService.productList;
        this.productMod = productMod;
        this.form = this.productMod || {};

        this.isModifying = (this.productMod) ? true : false;
    }

    addProduct(form, modify){
		let payload = this.form;

        if (modify){
            this.productList.$save(payload).then((ref)=>{
              this.$uibModalInstance.close();
            });
        }else{
            this.productList.$add(payload).then((ref)=>{
              this.$uibModalInstance.close();
            });   
        }
		
	}
    closeWindow(){
        this.$uibModalInstance.dismiss();
    }

    
}

ProductModalController.$inject = ['$state', '$uibModalInstance', 'FirebaseService', 'productMod'];