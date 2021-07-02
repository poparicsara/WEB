Vue.component("restaurants", { 
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
  		  filterOK: false
	    }
	 
	},
	    template: ` 
        <div id="restaurantHeader">
                <img id="logo" src="images/logo.jpg">                 
                <input id="input" type="text" placeholder="Pretraži..." v-model="searchText" v-on:change = "searchRestaurants"> 
                <button class="b" v-on:click = "logIn"> Prijava </button>
                <button class = "b" v-on:click = "registration"> Registracija</button>
            <hr>
           <h2>
               <label class="r"> <b> Restorani </b></label>
           </h2>
           <h3 class = "restaurantSort"> 
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
           				<div v-for="r in sortedRestaurants"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else-if="sortAddress">
           			  	<div  v-for="r in sortedAddresses"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else>
	           			  <div v-for="(r, index) in restaurants">
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
           				<div class="restaurants" v-for="r in sortedRestaurants">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label>
					    </div>  
           			</div>
           			<div v-else-if="sortAddress">
	           			<div class="restaurants" v-for="r in sortedAddresses">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label>
					    </div>  
           			</div>
           			<div v-else-if="filterOK">
           				 <div v-for="(r, index) in restaurants">
	           		    <div class="restaurants" v-if="r.type == filterType">
	           		    	<img class="restaurants" :src = r.image > <br>
				      		<label class="title">{{r.name}} </label> <br>
				      		<label>{{r.type}}</label> <br>
				      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
				      	</div> 	
			      		</div>
           			</div>
           			<div v-else>
	           			<div class="restaurants" v-for="(r, index) in restaurants">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label>
					    </div>  
           			</div>
			    </div>		
           </div>           
         </div>
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data))
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
		filter : function() {
			if(this.filterType == "all"){
				this.filterOK = false
			}
			else{
				this.filterOK = true
			}
			
		},
    	logIn : function() {
    		router.push(`/logIn`);
    	},
    	registration : function() {
    		router.push(`/registration`)
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