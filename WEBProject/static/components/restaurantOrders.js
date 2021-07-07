Vue.component("restaurantOrders", { 
	data: function () {
	    return {
	    	orders : null,
	    	display : false,
	    	order: {id: '', items: null, restaurant: '', date: null, price: '', customerFullName: '', customerUsername: '', status: '', deliverer: ''},
	    	requests: null,
	    	requestsModal: false
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
	                    <th></th>
	                    <th></th>
	                </tr>
		            <tr v-for="(o, index) in orders">
		            	<td>{{o.status}}</td>
		                <td>{{o.id}}</td>
		                <td>{{o.date}}</td>
		                <td>{{o.customerFullName}}</td>
		                <td>{{o.price}}</td>
		                <td><button v-on:click="openModal(o)">Detalji</button></td>
		                <td><button v-on:click="orderRequests(o)" v-if="o.status=='ČEKA DOSTAVLJAČA'">Zahtevi</button></td>
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
				<button v-on:click="changeOrderStatus" v-if="order.status=='U PRIPREMI'">Spremno za dostavu</button>
				<button v-on:click="processToPreparation" v-if="order.status=='OBRADA'">Prihvati porudzbinu</button>
				<br/>
				<label>Kupac</label>
				{{order.customerFullName}}<br/>
				<label>Datum</label>
				{{order.date}}<br/>
				<label>Ukupan iznos</label>
				{{order.price}}<br/>
				
	
			</div>
			
			<div v-if="requestsModal">
				<div  v-for="(r, index) in requests">
		                <div v-if="r.status!='REJECTED'">
		                    <label>Redni broj porudžbine:{{r.orderID}}</label><br/>
		                    <label>Username dostavljaca: {{r.delivererUsername}}</label><br/><br/>
		                	<button v-on:click="acceptRequest(r)">Prihvati zahtev</button>
		                	<button v-on:click="rejectRequest(r)">Odbij zahtev</button><br/><br>
		                </div>
	        	</div>
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
			},
			processToPreparation : function() {
				this.order.status = 'U PRIPREMI';
				event.preventDefault()
	    		axios.post(`/rest/changeOrderStatus/`, this.order)
    			.then(response => (this.$router.go()))
			},
			orderRequests : function(order){						
				axios
				.post(`/rest/orderRequests/`, order)
    			.then(response => (this.requests = response.data))
    			this.requestsModal = true;
			},
			acceptRequest : function(request) {
				event.preventDefault()
				axios
				.post(`/rest/acceptOrderRequest/`, request)
				.then(response => (this.$router.go()))
			},
			rejectRequest(request){
				event.preventDefault()
				axios
				.post(`/rest/rejectOrderRequest/`, request)
				.then(response => (this.$router.go()))
			}
		}
});