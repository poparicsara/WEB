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
	        
	        <div class="ordersGroup">
	            <h1>Naše porudžbine</h1><br/>
	            <table border="1" class="restaurantOrders">
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
		                <td><button class="orderTableButton" v-on:click="openModal(o)">
		                	<img src="images/details.png" class="orderTableImage"/>
		                </button></td>
		                <td><button class="orderTableButton" v-on:click="orderRequests(o)" v-if="o.status=='ČEKA DOSTAVLJAČA'">
		                	<img src="images/delivery.png" class="orderTableImage"/>
		                </button></td>
		            </tr>
	            </table>
	        </div>
			
			<div class="addRestaurantItem" v-if="display">
				<div  class="addRestaurantItemComponents">
					<span class="addRestaurantItemClose" v-on:click="closeModal">&times;</span>  <!--Close button-->
					<h1 class="orderHeaderModal">Detalji porudžbine</h1><br/><br/>
					<label class="orderLabel">Broj porudžbine:</label><br/>
					<label class="orderDetail">{{order.id}}</label><br/><br/><br/>
					<label class="orderLabel">Status porudžbine:</label><br/>
					<label class="orderDetail">{{order.status}}</label>
					<button class="orderButton" v-on:click="changeOrderStatus" v-if="order.status=='U PRIPREMI'">
						<img class="orderImage" src="images/delivery.png"/>
					</button>
					<button class="orderButton" v-on:click="processToPreparation" v-if="order.status=='OBRADA'">
						<img class="orderImage" src="images/cook.png"/>
					</button>
					<br/><br/><br/>
					<label class="orderLabel">Kupac:</label><br/>
					<label class="orderDetail">{{order.customerFullName}}</label><br/><br/><br/>
					<label class="orderLabel">Datum:</label><br/>
					<label class="orderDetail">{{order.date}}</label><br/><br/><br/>
					<label class="orderLabel">Ukupan iznos:</label><br/>
					<label class="orderDetail">{{order.price}}</label><br/><br/><br/>
				</div>
	
			</div>
			
			<div class="addRestaurantItem" v-if="requestsModal">
				<div class="addRestaurantItemComponents"  >		                
		                	<span class="addRestaurantItemClose" v-on:click="closeRequestModal">&times;</span>
		                	<h1 class="orderHeaderModal">Zahtevi dostavljača</h1>
		                	<div class="requestLabels" v-for="(r, index) in requests"  v-if="r.status!='REJECTED'">
			                    <label class="orderLabel">Redni broj porudžbine:</label><br/>
			                    <label class="orderDetail">{{r.orderID}}</label><br/><br/>
			                    <label class="orderLabel">Username dostavljaca:</label><br/>
			                    <label class="orderDetail">{{r.delivererUsername}}</label><br/><br/>
			                    <div class="requestButtonGroup">
				                	<button class="requestButton" v-on:click="acceptRequest(r)">
				                		<img class="requestImage" src="images/accept.png"/>
				                	</button>
				                	<button class="requestButton" v-on:click="rejectRequest(r)">
				                		<img class="requestImage" src="images/reject.png"/>
				                	</button>
			                	</div>
			                	<br/>
			                	<hr>
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
			},
			closeRequestModal : function() {
				this.requestsModal = false;
			}
		}
});