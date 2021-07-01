Vue.component("restaurantOrders", { 
	data: function () {
	    return {
	    	orders : null,
	    	display : false,
	    	id: '',
	    	status: '',
	    	customer: '',
	    	date: '',
	    	price: ''
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
				{{this.id}}<br/>
				<label>Status porudžbine</label>
				{{this.status}}<br/>
				<label>Kupac</label>
				{{this.customer}}<br/>
				<label>Datum</label>
				{{this.date}}<br/>
				<label>Ukupan iznos</label>
				{{this.price}}<br/>
	
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
			openModal : function(order) {
				this.display = true;
				this.id = order.id;
				this.status = order.status;
				this.customer = order.customerFullName;
				this.date = order.date;
				this.price = order.price;
			},
			closeModal : function() {
				this.display = false
			}
		}
});