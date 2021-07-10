Vue.component("restaurantOrders", { 
	data: function () {
	    return {
	    	orders : null,
	    	display : false,
	    	order: {id: '', items: null, restaurant: '', date: null, price: '', customerFullName: '', customerUsername: '', status: '', deliverer: ''},
	    	requests: null,
	    	requestsModal: false,
	    	searchTextOrders: '',
	    	priceDomain: [],
	    	searchOKOrders : false,
	    	currentSort:'price',
  		  	currentSortDir:'asc',
		   	sortDate : false,
		    sortPrice : false,
		    status : 'all',
		    filterOK : false,
		    filterStatus: ''
	    }
	},
	    template: `
	   	<div> 
	        
	        <div class="ordersGroup">
	            <h1>Naše porudžbine</h1><br/>
	            <input id="input" type="text" placeholder="Pretraži..." v-model="searchTextOrders" v-on:change = "searchOrders" >
	           	<br/><br/>
	           		<label> Sortiraj: </label>
	      			<button class="sort" v-on:click = "sort('price')"> Cena </button>
	      			<button class="sort" v-on:click = "sort('date')"> Datum </button> <br>
	      			
	      		<select class="filter" name="type" v-model = "status">
      					<option value="all"> Svi </option>
	                    <option value="OBRADA">OBRADA</option>
	                    <option value="U PRIPREMI">U PRIPREMI</option>
	                    <option value="ČEKA DOSTAVLJAČA">ČEKA DOSTAVLJAČA</option>
	                    <option value="TRANSPORT">TRANSPORT</option>
	                    <option value="DOSTAVLJENA">DOSTAVLJENA</option>
	                    <option value="OTKAZANA">OTKAZANA</option>
	            </select>
	           	<button v-on:click = "filter">Filtriraj</button>
	           	<div v-if="searchOKOrders">
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
			            <tr v-for="(o, index) in orders" v-if="priceDomain[0] <= priceInDouble(o.price) && priceInDouble(o.price) <= priceDomain[1]">
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
	           	<div v-else-if="sortPrice">
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
			            <tr v-for="(o, index) in sortedPrices">
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
	           	<div v-else-if="sortDate">
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
			            <tr v-for="(o, index) in sortedDates">
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
	           	<div v-else-if="filterOK">
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
			            <tr v-for="(o, index) in orders" v-if="o.status === filterStatus">
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
	           	<div v-else>
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
        
        computed: {
        sortedPrices: function() {
		    return this.orders.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(this.priceInDouble(a.price) < this.priceInDouble(b.price)){
		      	return -1 * modifier;
		      } 
		      else if(this.priceInDouble(a.price) > this.priceInDouble(b.price)){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
  		sortedDates: function() {
		    return this.orders.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      var date1 = new Date(a.date)
		      var date2 = new Date(b.date)
		      if(date1.getTime() > date2.getTime()){
		      	return -1 * modifier;
		      } 
		      else if(date1.getTime() < date2.getTime()){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
     },
      
		methods: {
			priceInDouble : function(price){
				return parseFloat(price)
				
			},
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
			sort: function(s) {
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		   
		     if(s == 'price'){
		    	 this.sortDate = false;
		    	 this.sortPrice = true;
		    	 
		    }
		    else {
		    	 this.sortDate = true;
		    	 this.sortPrice = false;
		    	}
		   
			},
			filter : function() {
			   	this.sortDate = false;
		    	this.sortPrice = false;
				this.filterStatus = this.status
				if(this.filterStatus == 'all'){
					this.filterOK = false
				}
				else{
					this.filterOK = true
				}
			
			},
			searchOrders: function(){
	    		if(this.searchTextOrders === ""){
	    			this.searchOKOrders = false
	    		}
	   			else{
	   				let regexPrice = new RegExp('[0-9]+-[0-9]+');
	   				
	   				if(regexPrice.test(this.searchTextOrders)){  
	   					this.priceDomain = this.searchTextOrders.split("-")
	   					this.searchOKOrders = true	  
	   					alert(this.priceDomain[0] + this.priceDomain[1])
	  	   			}
	   				else{
	   					this.searchOKOrders = false	
	   				}
	   				
	   			}
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