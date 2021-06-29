const Restaurants = { template: '<restaurants></restaurants>' }
const logIn = { template: '<logIn></logIn>' }
const registration = { template: '<registration></registration>' }
const admin = {template: '<admin></admin>'}
const restaurant = {template: '<restaurant></restaurant>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Restaurants},
		{ path: '/logIn/:logInId', component: logIn},
		{ path: '/:registrationId', component: registration},
		{ path: '/admin/:adminId', component: admin},
		{ path: '/restaurant/:restaurantID', component: restaurant}
	  ]
});

var app = new Vue({
	router,
	el: '#restaurants'
});