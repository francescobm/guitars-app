export let FirebaseService = ['$firebaseAuth', '$firebaseArray', function FirebaseService($firebaseAuth, $firebaseArray) {
	
	// initialize firebase for authentication and data retrieval
	let authUrl = 'https://crud-app-faceit.firebaseio.com/';
	let ref = new Firebase(authUrl);
	let authObj = $firebaseAuth(ref);
	let productList = $firebaseArray(ref);

    return {
    	authObj: authObj,
    	ref: ref,
    	productList: productList
    }

}];