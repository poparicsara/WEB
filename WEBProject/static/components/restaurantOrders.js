Vue.component("restaurantOrders", { 
	data: function () {
	    return {
	    	orders : null,
	    	display : false,
	    	order: {id: '', items: null, restaurant: '', date: null, price: '', customerFullName: '', customerUsername: '', status: ''}
	    }
	},
	    template: `
	   	<div> 
	        <div>
	            <h1>Naše porudžbine</h1>
	            <table border="1">
	                <tr>
	                	<th>Status</th>
	                    <th>Broj porudžbine</th>
	                    <th>Datum</th>
	                    <th>Kupac</th>
	                    <th>Ukupan iznos</th>
	                    <th>Detalji</th>
	                </tr>
		            <tr v-for="(o, index) in orders">
		            	<td>{{o.status}}</td>
		                <td>{{o.id}}</td>
		                <td>{{o.date}}</td>
		                <td>{{o.customerFullName}}</td>
		                <td>{{o.price}}</td>
		                <td><button v-on:click="openModal(o)">Detalji</button></td>
		            </tr>
	            </table>
	        </div>
	
			<div class="restaurantOrderModal" v-if="display">
			
				<br/><br/>
				<span class="restaurantOrderClose" v-on:click="closeModal">&times;</span>  <!--Close button-->
	
				<label>Broj porudžbine</label>
				{{order.id}}<br/>
				<label>Status porudžbine</label>
				{{order.status}}
				<button v-on:click="changeOrderStatus" v-if="order.status=='U PRIPREMI'">Promeni status</button>
				<br/>
				<label>Kupac</label>
				{{order.customer}}<br/>
				<label>Datum</label>
				{{order.date}}<br/>
				<label>Ukupan iznos</label>
				{{order.price}}<br/>
				
	
			</div>
		</div>
    	`
    	,
		mounted () {
        axios
          .get('rest/restaurantOrders/')
          .then(response => (this.orders = response.data))
        },
		methods: {
			openModal : function(o) {
				this.display = true;
				this.order.id = o.id;
				this.order.status = o.status;
				this.order.customerFullName = o.customerFullName;
				this.order.customerUsername = o.customerUsername;
				this.order.date = o.date;
				this.order.price = o.price;
				this.order.restaurant = o.restaurant;
			},
			closeModal : function() {
				this.display = false
			},
			changeOrderStatus : function() {
				this.order.status = 'ČEKA DOSTAVLJAČA';
				event.preventDefault()
	    		axios.post(`/rest/changeOrderStatus/`, this.order)
    			.then(response => (this.$router.go()))
			}
		}
});