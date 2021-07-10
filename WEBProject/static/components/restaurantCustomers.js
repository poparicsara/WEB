Vue.component("restaurantCustomers", { 
	data: function () {
	    return {
			customers: null
	    }
	},
	    template: `
	   	<div class="ordersGroup"> 
	   		<div>
           		<h1>Naši kupci</h1>
           	</div>
           	<table border="1" class="restaurantOrders">
               <tr>
                   <th>Korisničko ime</th>
                   <th>Ime i prezime</th>
                   <th>Broj porudžbina</th>
               </tr>
               <tr v-for="c in customers">
                   <td>{{c.username}}</td>
                   <td>{{c.fullName}}</td>
                   <td>{{c.count}}</td>
               </tr>
           	</table>
		</div>
    	`
    	,
		mounted () {
		
			axios
			.get(`/rest/restaurantCustomers/`)
			.then(response => (this.customers = response.data))
		
		},
});