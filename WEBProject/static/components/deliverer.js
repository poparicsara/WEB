Vue.component("deliverer", { 
	data: function () {
	    return {
			orders: null,
			request: {orderID: '', delivererUsername: ''},
			user: '',
			newPage: false ,
			requests: null,
			alreadySend: false,
			username:null
	    }
	},
	template: `
		<div>
		<h1 class="admin"> 
            <img id="adminLogo" src="images/logo.jpg">
            <div class="dropdown">
	           <button> <img id="adminImage" src="images/deliverer.png"> </button>
		               <div class="dropdown-content">
		                  <button v-on:click="delivererProfile">Profil</button>
		                  <button v-on:click = "logOut"> Odjava</button>
		                </div>
	       </div>
        </h1>
        <hr class="admin">
	        <h1>Porudžbine na čekaju</h1><br/>
	        	<button class="restaurantButtons" v-on:click="myOrders">Moje porudžbine</button>
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
		            <tr v-for="(o, index) in orders">
		            	<td>{{o.status}}</td>
		                <td>{{o.id}}</td>
		                <td>{{o.date}}</td>
		                <td>{{o.customerFullName}}</td>
		                <td>{{o.restaurantName}}</td>
		                <td>{{o.price}}</td>
		                <td><button class="orderTableButton" id="index" v-on:click="sendRequest(o, index)">
		                	<img class="orderTableImage" src="/images/sendRequest.png"/>
		                </button></td>
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
          axios
          .get('/rest/requests/')
          .then(response => (this.requests = response.data));
          axios
          .get('rest/loggedInUser/', this.username)
          .then(response => (this.username = response.data)); 
    },
    
    destroyed() {
        	if(!this.newPage){
        		axios.post(`/rest/logOut`)
    			.then(response => ('success'));
    			  router.push(`/`);
    		}
    },

    
    methods: {
    	logOut: function() {
    		if(confirm('Da li ste sigurni?')){
    			axios.post(`/rest/logOut`)
    			.then(response => (''));
    			router.push(`/`);
    		}	
    	},
    	delivererProfile : function() {
    		this.newPage = true	
	    	router.push(`/profile`);
    	},
    	sendRequest: function(order, index) {
    		for(r of this.requests){
    			if(r.orderID == order.id && r.delivererUsername == this.user){
    				this.alreadySend = true;
    			}
    		}
    		if(this.alreadySend === true){
    			alert('Vec ste poslali zahtev za ovu posiljku');
    		} else {
    			this.request.orderID = order.id;
	    		this.request.delivererUsername = this.user;
	    		var button = document.getElementById('index');
	    		button.disabled = true;
	    		axios
		    	.post(`/rest/sendOrderRequest/`, this.request)
		    	.then(response => ('success'))
    		}
    		
    	},
    	myOrders : function(){
    		this.newPage = true;
    		router.push(`/delivererOrders`);
    	}
    }
});