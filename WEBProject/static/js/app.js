const Restaurants = { template: '<restaurants></restaurants>' }
const logIn = { template: '<logIn></logIn>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Restaurants},
		{ path: '/restaurants/:id', component: logIn}
	  ]
});

var app = new Vue({
	router,
	el: '#restaurants'
});