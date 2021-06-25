const Restaurants = { template: '<restaurants></restaurants>' }
const logIn = { template: '<logIn></logIn>' }
const registration = { template: '<registration></registration>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Restaurants},
		{ path: '/logIn/:logInId', component: logIn},
		{ path: '/:registrationId', component: registration}
	  ]
});

var app = new Vue({
	router,
	el: '#restaurants'
});