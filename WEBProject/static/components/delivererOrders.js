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
	    	<br/><br/><br/>
	    	<div v-if="allOrders">
	    		<h1>Moje porudžbine</h1><br/>
	    		<button class="restaurantButtons" v-on:click="notDelivered">Nedostavljene porudzbine</button>
	        	
	        	<table border="1" class="restaurantOrders">
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
	        	<h1>Nedostavljene porudžbine</h1>
	        	<button class="restaurantButtons" v-on:click="orders">Sve porudzbine</button>
	        	
	        	<table border="1" class="restaurantOrders">
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