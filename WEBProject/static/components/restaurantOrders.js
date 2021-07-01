Vue.component("restaurantOrders", { 
	data: function () {
	    return {
	    	orders : null
	    }
	},
	    template: ` 
        <div>
            <h1>Naše porudžbine</h1>
            <table border="1">
                <tr>
                    <th>Broj porudžbine</th>
                    <th>Datum</th>
                    <th>Kupac</th>
                    <th>Ukupan iznos</th>
                </tr>
	                <tr v-for="(o, index) in orders">
	                    <td>{{o.id}}</td>
	                    <td>{{o.date}}</td>
	                    <td>{{o.customerUsername}}</td>
	                    <td>{{o.price}}</td>
	                </tr>
            </table>
        </div>
    	`
    	,
		mounted () {
        axios
          .get('rest/restaurantOrders/')
          .then(response => (this.orders = response.data))
     },
});