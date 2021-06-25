const Restaurants = { template: '<restaurants></restaurants>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Restaurants}
	  ]
});

var app = new Vue({
	router,
	el: '#restaurants'
});