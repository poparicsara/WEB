Vue.component("delivererOrders", { 
	data: function () {
	    return {
			user: '',
			myOrders: null,
			allOrders: true,
			notDeliveredOrders: false,
			notDelivereds: null,
			searchTextOrders: '',
			searchOKOrders: false,
			searchPrice: false,
			searchDate: false,
			priceDomain: [],
			dateDomain: [],
			currentSort:'name',
  		  	currentSortDir:'asc',
  		  	sortName : false,
		   	sortDate : false,
		    sortPrice : false,
		    filterOK: false,
		    status: null,
		    filterType: null,
		    filterRestaurantType: 'all',
		    filterStatus: 'all',
		    restaurants: null
	    }
	},
	template: `
		<div>
	    	<br/><br/><br/>
	    	<div v-if="allOrders">
	    		<h1>Moje porudžbine</h1><br/>
	    		<button class="restaurantButtons" v-on:click="notDelivered">Nedostavljene porudzbine</button>
	    		<br> <br>
		        <input id="input" type="text" placeholder="Pretraži..." v-model="searchTextOrders" v-on:change = "searchOrders" >
	           	<br/><br/>
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
	           	<br> <br>	
	           	<div>
		           		<label> Sortiraj: </label>
	      			<button class="sort" v-on:click = "sort('name')"> Ime </button>
	      			<button class="sort" v-on:click = "sort('price')"> Cena </button>
	      			<button class="sort" v-on:click = "sort('date')"> Datum </button>
	      			</div>
	      		<div v-if="searchOKOrders">
	      			<div v-if="searchPrice">
		            	<table border="1" class="restaurantOrders">
		                <tr>
		                	<th>Status</th>
		                    <th>Broj porudžbine</th>
		                    <th>Datum</th>
		                    <th>Kupac</th>
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in myOrders" v-if="priceDomain[0] <= o.price && o.price <= priceDomain[1] ">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
			            </tr>
		           	 	</table>
	            	</div>
	            	<div v-else-if="searchDate">
	            		<table border="1" class="restaurantOrders">
		                <tr>
		                	<th>Status</th>
		                    <th>Broj porudžbine</th>
		                    <th>Datum</th>
		                    <th>Kupac</th>
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in myOrders" v-if="compareDates(o) ">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
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
			                    <th>Restoran</th>
			                    <th>Ukupan iznos</th>
			                </tr>
				            <tr v-for="(o, index) in myOrders" v-if="rLower(o.restaurantName).includes(searchInLowerCaseOrders)">
				            	<td>{{o.status}}</td>
				                <td>{{o.id}}</td>
				                <td>{{o.date}}</td>
				                <td>{{o.customerFullName}}</td>
				                <td>{{o.restaurantName}}</td>
				                <td>{{o.price}}</td>
				            </tr>
			            </table>
		            </div>
	            </div>
	            <div v-else-if="sortName">
		            <table border="1" class="restaurantOrders">
		                <tr>
		                	<th>Status</th>
		                    <th>Broj porudžbine</th>
		                    <th>Datum</th>
		                    <th>Kupac</th>
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in sortedNames">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
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
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in sortedPrices">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
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
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in sortedDates">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
			            </tr>
		            </table>
	            </div>
	            <div v-else-if="filterOK">
	            	<div v-if="filterRestaurantType == 'all'">
	            		<table border="1" class="restaurantOrders">
		                <tr>
		                	<th>Status</th>
		                    <th>Broj porudžbine</th>
		                    <th>Datum</th>
		                    <th>Kupac</th>
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in myOrders" v-if="o.status === filterStatus">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
			            </tr>
		            	</table>
	            	</div>
	            	<div v-else-if="filterStatus == 'all'">
	            		<table border="1" class="restaurantOrders">
		                <tr>
		                	<th>Status</th>
		                    <th>Broj porudžbine</th>
		                    <th>Datum</th>
		                    <th>Kupac</th>
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in myOrders" v-if="checkRestaurantType(o)">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
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
		                    <th>Restoran</th>
		                    <th>Ukupan iznos</th>
		                </tr>
			            <tr v-for="(o, index) in myOrders" v-if="checkRestaurantType(o) && o.status === filterStatus">
			            	<td>{{o.status}}</td>
			                <td>{{o.id}}</td>
			                <td>{{o.date}}</td>
			                <td>{{o.customerFullName}}</td>
			                <td>{{o.restaurantName}}</td>
			                <td>{{o.price}}</td>
			            </tr>
		            	</table>
	            	</div>
	            </div>
	            <div v-else>
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
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data))  ;
   		axios
        .get('rest/delivererNotDeliveredOrders/')
        .then(response => (this.notDelivereds = response.data));
        axios
        .get('rest/delivererOrders/')
        .then(response => (this.myOrders = response.data));
       
   },
    computed: {
    	searchInLowerCaseOrders() {
    		return this.searchTextOrders.toLowerCase().trim();
  		},
  		
  		sortedNames: function() {
		    return this.myOrders.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.restaurantName < b.restaurantName){
		      	return -1 * modifier;
		      } 
		      else if(a.restaurantName > b.restaurantName){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
  		sortedPrices: function() {
		    return this.myOrders.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.price < b.price){
		      	return -1 * modifier;
		      } 
		      else if(a.price > b.price){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
  		sortedDates: function() {
		    return this.myOrders.sort((a,b) => {
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
    	rLower : function(item) {
  			return item.toLowerCase()
  		},
  		compareDates: function(o){
  			var date1 = new Date(o.date)
  			var bottomDate = new Date(this.dateDomain[0])
  			var topDate = new Date(this.dateDomain[1])
  			if((date1.getTime() >= bottomDate.getTime()) && (date1.getTime() <= topDate.getTime())){
  				return true;
  			}
  			else{
  				return false;
  			}
  		},
  		checkRestaurantType: function(order){
  			var exists = false
  			for(r of this.restaurants){
  				if(r.name == order.restaurantName){
  					if(r.type == this.filterType){
  						exists = true
  					}
  				}
  			}
  			return exists
  		},
  		sort: function(s) {
  		 this.filterOK = false
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		   
		    if(s == 'name'){
		    	 this.sortName = true;
		    	 this.sortDate = false;
		    	 this.sortPrice = false;
		    	 
		    }
		    else if(s == 'price'){
		    	 this.sortName = false;
		    	 this.sortDate = false;
		    	 this.sortPrice = true;
		    	 
		    }
		    else {
		    	 this.sortName = false;
		    	 this.sortDate = true;
		    	 this.sortPrice = false;
		    }
		   
		},
    	searchOrders: function(){
    		this.filterOK = false
    		if(this.searchTextOrders === ""){
    			this.searchOKOrders = false
    		}
   			else{
   				this.searchOKOrders = true
   				this.searchDate = false
   				this.searchPrice = false
   				let regexPrice = new RegExp('[0-9]+-[0-9]+');
   				let regexDate = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2},[0-9]{4}-[0-9]{2}-[0-9]{2}');
   				var dateTrue = regexDate.test(this.searchTextOrders)
   				this.dateDomain = this.searchTextOrders.split(',')
   				if(regexPrice.test(this.searchTextOrders)){   				
   					this.priceDomain = this.searchTextOrders.split('-')
   					this.searchPrice = true
   					this.searchDate = false
   				}
   			    if(dateTrue){
   				   	this.searchDate = true
   					this.searchPrice = false
   				}
   				
   				
   			}  
    	},
    	filter : function() {
			this.sortName = false;
		   	this.sortDate = false;
	    	this.sortPrice = false;
	    	this.filterRestaurantType = this.filterType
			this.filterStatus = this.status
			if(this.filterRestaurantType == 'all' && this.filterStatus == 'all'){
				this.filterOK = false
			}
			else{
				this.filterOK = true
			}
			
		},
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