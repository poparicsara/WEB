const Restaurants = { template: '<restaurants></restaurants>' }
const logIn = { template: '<logIn></logIn>' }
const registration = { template: '<registration></registration>' }
const admin = {template: '<admin></admin>'}
const restaurant = {template: '<restaurant></restaurant>'}
const restaurantOrders = {template: '<restaurantOrders></restaurantOrders>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Restaurants},
		{ path: '/logIn', component: logIn},
		{ path: '/registration', component: registration},
		{ path: '/admin', component: admin},
		{ path: '/restaurant', component: restaurant},
		{ path: '/orders', component: restaurantOrders}
	  ]
});

var app = new Vue({
	router,
	el: '#restaurants'
});