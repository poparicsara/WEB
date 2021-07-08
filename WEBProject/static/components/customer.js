Vue.component("customer", { 
	data: function () {
	    return {
	      restaurants: null,
	      searchText: "",
	      searchOK: false,
	      sortName: false,
	      sortAddress: false,
	      currentSort:'name',
  		  currentSortDir:'asc',
  		  filterType: null,
  		  status: true,
  		  filterOK: false,
  		  username: null,
  		  newPage: false,
  		  showRestaurants: true,
  		  showOrders: false,
  		  orders: null
	    }
	 
	},
	    template: ` 
        <div id="restaurantHeader">
                <img id="logo" src="images/logo.jpg"> 
                 
                <div class="dropdown">
	           <button> <img id="adminImage" src="images/customer.jpg"> </button>
		               <div class="dropdown-content">
		                  <button>Profil</button>
		                  <button> Odjava</button>
		                </div>
	       		</div>               
            <hr>
           <h2>
                <label class="r"> <b> Restorani </b></label>
                <button class="buttonsCustomer" v-on:click="showAllRestaurants"> Restorani </button>
            	<button class="buttonsCustomer" v-on:click="showAllOrders"> Porudžbine </button>
           </h2>
           <div v-if="showRestaurants">
           <h3 class = "restaurantSort"> 
           		<input id="input" type="text" placeholder="Pretraži..." v-model="searchText" v-on:change = "searchRestaurants"> 
           		<br> <br> <br>
           		<div>
	           		<label> Sortiraj: </label>
	      			<button class="sort" v-on:click = "sort('name')"> Ime </button>
	      			<button class="sort" v-on:click = "sort('street')"> Lokacija </button>
	      			<button class="sort"> Ocena </button>
      			</div>
      			<br>
      			<div >
      				<label> Filtriraj: </label>
      				<select class="filter" name="type" v-model = "filterType">
      					<option value="all"> Svi </option>
	                    <option value="BURGERI">Burgeri</option>
	                    <option value="GYROS">Giros</option>
	                    <option value="ITALIJANSKA">Italijanska</option>
	                    <option value="KINESKA">Kineska</option>
	                    <option value="KOBASICE">Kobasice</option>
	                    <option value="KUVANA_JELA">Kuvana jela</option>
	                    <option value="MEKSICKA">Meksička</option>
	                    <option value="PALAČINKE">Palačinke</option>
	                    <option value="MORSKI_PLODOVI">Morski plodovi</option>
	                    <option value="ROŠTILJ">Roštilj</option>
	                    <option value="SENDVIČI">Sendviči</option>
	                    <option value="VEGE">Vege</option>
	                    <option value="TORTE_KOLAČI">Torte i kolači</option>
	                    <option value="FASTFOOD">Brza hrana</option>
	                </select>
	                <select class="filter" name="active" v-model = "status">
	                	<option value = "true"> Radi </option>
	                	<option value = "false"> Ne radi </option>
	                </select>
	                <button v-on:click = "filter"> <img id="filter" src="images/filter.png"> </button>
      			</div>
           </h3> 
           		<div v-if="searchOK">
           			  <div v-if="sortName">
           				<div v-for="r in sortedRestaurants"  v-on:click = "openRestaurant(r)"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else-if="sortAddress">
           			  	<div  v-for="r in sortedAddresses"  v-on:click = "openRestaurant(r)"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else>
	           			  <div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">
		           		    <div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
					      	</div> 	
				      	 </div>
			       	</div>
			    </div>
           		<div v-else>
           			<div v-if="sortName">
           				<div class="restaurants" v-for="r in sortedRestaurants"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label>
					    </div>  
           			</div>
           			<div v-else-if="sortAddress">
	           			<div class="restaurants" v-for="r in sortedAddresses"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label>
					    </div>  
           			</div>
           			<div v-else-if="filterOK">
           				 <div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">
	           		     <div class="restaurants" v-if="r.type == filterType">
	           		    	<img class="restaurants" :src = r.image > <br>
				      		<label class="title">{{r.name}} </label> <br>
				      		<label>{{r.type}}</label> <br>
				      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
				      	 </div> 	
			      		</div>
           			</div>
           			<div v-else>
	           			<div class="restaurants" v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label>
					    </div>  
           			</div>
			    </div>		
           </div>           
           <div v-else="showOrders">
         	<div v-for="(o, index) in orders" v-if = "o.customerUsername == username"> 
         		<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id ">
					    <img class="restaurants" :src = r.image > <br>
						<label class="title">{{r.name}} </label> <br>
						<label>{{r.type}}</label> <br>
						<label>Artikli:</label>
						<div v-for="i in o.items">
							<label>{{i.name}} </label>
						</div>
						<label>Datum: {{o.date}} </label> <br>
						<label>Cena: {{o.price}} RSD</label> <br>
						<label>Status: {{o.status}} </label> <br> <br>
						<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
				</div>
			</div>  
		  </div>
         </div>
         </div>
        
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data));
         axios
          .get('rest/loggedInUser/', this.username)
          .then(response => (this.username = response.data)); 
         axios
          .get('rest/orders/')
          .then(response => (this.orders = response.data));
    },
     destroyed() {
     			if(!this.newPage){
	        		axios.post(`/rest/logOut`)
	    			.then(response => ('success'));
	    			  router.push(`/`);
    			 }    		
    },
    computed: {
  		searchInLowerCase() {
    		return this.searchText.toLowerCase().trim();
  		},
  		sortedRestaurants: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
		      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
		      return 0;
    		});
  		},
  		sortedAddresses: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.location.address.street < b.location.address.street){
		      	return -1 * modifier;
		      } 
		      else if(a.location.address.street > b.location.address.street){
		      	return 1 * modifier;
		      }
		      else if(a.location.address.street == b.location.address.street){
		      	return (a.location.address.number - b.location.address.number) * modifier;
		      }
		      return 0;
    		});
  		}
	},
    methods: {
    	cancelOrder : function(order){
    		if(confirm('Da li ste sigurni da otkazujete porudžbinu?')){
    			axios
		          .post('rest/cancelOrder/', order)
		          .then(response => (alert('Uspešno otkazana narudžbina')));
    		}	
    	},
    	showAllRestaurants : function(){
    		this.showRestaurants = true
    		this.showOrders = false
    	},
    	showAllOrders : function(){
    		this.showOrders = true
    		this.showRestaurants = false
    	},
    	rLower : function(item) {
  			return item.toLowerCase()
  		},
  		sort: function(s) {
  		 this.filterOK = false
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		    if(s == 'street'){
		    	 this.sortAddress = true;
		    	 this.sortName = false;
		    	 
		    }
		    else{
		    	 this.sortName = true;
		    	 this.sortAddress = false;
		    }
		   
		},
		openRestaurant : function(restaurant) {
			this.newPage = true
			event.preventDefault();
			axios.post('rest/showRestaurant/', restaurant.id)
			.then(response => (router.push(`/customerOrder`)));
		},
		filter : function() {
			this.sortAddress = false;
			this.sortName = false;
			if(this.filterType == "all"){
				this.filterOK = false
			}
			else{
				this.filterOK = true
			}
			
		},
    	searchRestaurants : function(){
    		if(this.searchText === ""){
    			this.searchOK = false
    		}
   			else{
   				this.searchOK = true
   			}   		
    	}
    },
});