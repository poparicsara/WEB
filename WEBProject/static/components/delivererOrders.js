Vue.component("delivererOrders", { 
	data: function () {
	    return {
			user: '',
			myOrders: null,
			allOrders: true,
			notDeliveredOrders: false,
			notDelivereds: null
	    }
	},
	template: `
		<div>
	    	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	    	<div v-if="allOrders">
	    		<button v-on:click="notDelivered">Nedostavljene porudzbine</button>
	        	<h1>Moje porudzbine</h1>
	        	<table border="1">
	                <tr>
	                	<th>Status</th>
	                    <th>Broj porudžbine</th>
	                    <th>Datum</th>
	                    <th>Kupac</th>
	                    <th>Restoran</th>
	                    <th>Ukupan iznos</th>
	                </tr>
		            <tr v-for="(o, index) in myOrders">
		            	<td>{{o.status}}</td>
		                <td>{{o.id}}</td>
		                <td>{{o.date}}</td>
		                <td>{{o.customerFullName}}</td>
		                <td>{{o.restaurantName}}</td>
		                <td>{{o.price}}</td>
		            </tr>
	            </table>
	        </div>
	        <div v-if="notDeliveredOrders">
	        	<button v-on:click="orders">Sve porudzbine</button>
	        	<h1>Nedostavljene porudzbine</h1>
	        	<table border="1">
	                <tr>
	                	<th>Status</th>
	                    <th>Broj porudžbine</th>
	                    <th>Datum</th>
	                    <th>Kupac</th>
	                    <th>Restoran</th>
	                    <th>Ukupan iznos</th>
	                    <th></th>
	                </tr>
		            <tr v-for="(o, index) in notDelivereds">
		            	<td>{{o.status}}</td>
		                <td>{{o.id}}</td>
		                <td>{{o.date}}</td>
		                <td>{{o.customerFullName}}</td>
		                <td>{{o.restaurantName}}</td>
		                <td>{{o.price}}</td> 
		                <td>
		                	<button v-on:click="delivered(o)">Dostavljena</button>
		                </td>
		            </tr>
	            </table>
	        </div>        
	  	</div>
    	`
    	,
	mounted () {
        axios
        .get('rest/delivererOrders/')
        .then(response => (this.myOrders = response.data));
   		axios
        .get('rest/delivererNotDeliveredOrders/')
        .then(response => (this.notDelivereds = response.data));
   },
    
    methods: {
    
    	notDelivered : function() {
    		this.allOrders = false;
    		this.notDeliveredOrders = true;
    	},
    	
    	orders : function() {
    		this.allOrders = true;
    		this.notDeliveredOrders = false;
    	},
    	
    	delivered : function(order) {
    		axios
		    .post(`/rest/setOrderToDelivered/`, order)
		    .then(response => (this.$router.go()))
    	}
    
    }
});