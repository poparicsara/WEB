Vue.component("deliverer", { 
	data: function () {
	    return {
			orders: null,
			request: {orderID: '', delivererUsername: ''},
			user: '',
			newPage: false 
	    }
	},
	template: `
		<div>
	        <h1>Porudžbine koje čekaju</h1>
	            <table border="1">
	                <tr>
	                	<th>Status</th>
	                    <th>Broj porudžbine</th>
	                    <th>Datum</th>
	                    <th>Kupac</th>
	                    <th>Ukupan iznos</th>
	                    <th></th>
	                </tr>
		            <tr v-for="(o, index) in orders">
		            	<td>{{o.status}}</td>
		                <td>{{o.id}}</td>
		                <td>{{o.date}}</td>
		                <td>{{o.customerFullName}}</td>
		                <td>{{o.price}}</td>
		                <td><button v-on:click="sendRequest(o)">Pošalji zahtev</button></td>
		            </tr>
	            </table>
	  	</div>
    	`
    	,
	mounted () {
          axios
          .get('rest/deliverersOrders/')
          .then(response => (this.orders = response.data));
          axios
          .get('rest/loggedInUser/')
          .then(response => (this.user = response.data));
    },
    
    destroyed() {
        	if(!this.newPage){
        		axios.post(`/rest/logOut`)
    			.then(response => ('success'));
    			  router.push(`/`);
    		}
    },
    
    methods: {
    	sendRequest: function(order) {
    		this.request.orderID = order.id;
    		this.request.delivererUsername = this.user;
    		axios
	    	.post(`/rest/sendOrderRequest/`, this.request)
	    	.then(response => ('success'))
    	}
    }
});