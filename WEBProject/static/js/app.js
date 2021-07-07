const Restaurants = { template: '<restaurants></restaurants>' }
const logIn = { template: '<logIn></logIn>' }
const registration = { template: '<registration></registration>' }
const admin = {template: '<admin></admin>'}
const restaurant = {template: '<restaurant></restaurant>'}
const restaurantOrders = {template: '<restaurantOrders></restaurantOrders>'}
const restaurantCustomers = {template: '<restaurantCustomers></restaurantCustomers>'}
const profile = {template: '<profile></profile>'}
const deliverer = {template: '<deliverer></deliverer>'}
const customer = {template: '<customer></customer>'}
const customerOrder = {template: '<customerOrder></customerOrder>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Restaurants},
		{ path: '/logIn', component: logIn},
		{ path: '/registration', component: registration},
		{ path: '/admin', component: admin},
		{ path: '/restaurant', component: restaurant},
		{ path: '/restaurantOrders', component: restaurantOrders},
		{ path: '/restaurantCustomers', component: restaurantCustomers},
		{ path: '/profile', component: profile},
		{ path: '/deliverer', component: deliverer},
		{ path: '/customer', component: customer},
		{ path: '/customerOrder', component: customerOrder}
	  ]
});

var app = new Vue({
	router,
	el: '#restaurants'
});