Vue.component("restaurants", { 
	data: function () {
	    return {
	      restaurants: null,
	      searchText: "",
	      searchOK: false,
	      sortName: false,
	      sortAddress: false,
	      sortGrades: false,
	      currentSort:'name',
  		  currentSortDir:'asc',
  		  filterType: null,
  		  status: 'radi',
  		  filterOK: false,
  		  filterRestaurantType: null,
  		  filterStatus: null,
  		  combinedSearch: false,
  		  combinedType: 'all',
  		  combinedGrade: 'all',
  		  combinedName: '',
  		  combinedTypeBind: 'all',
  		  combinedGradeBind: 'all',
  		  combinedNameBind: ''
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
	      			<button class="sort" v-on:click = "sort('grade')"> Ocena </button>
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
	                	<option value = 'radi'> Radi </option>
	                	<option value = 'neRadi'> Ne radi </option>
	                </select>
	                <button class="filterButton" v-on:click = "filter"> <img id="filter" src="images/filter.png"> </button>
      			</div> <br>
      			<div>
      				<label>Kombinovana:</label>
      				<input type="text" v-model = "combinedNameBind"> 
      				<select class="filter" name="type" v-model = "combinedTypeBind">
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
	                <select class="filter" name="type" v-model = "combinedGradeBind">
      					<option value="all"> Svi </option>
	                    <option value=1>1</option>
	                    <option value=2>2</option>
	                    <option value=3>3</option>
	                    <option value=4>4</option>
	                    <option value=5>5</option>
	                </select>
	                <button v-on:click="startCombinedSearch">Pretraga</button> 
      			</div>
           </h3>
           		<div v-if="searchOK">
           			  <div v-if="sortName">
           				<div v-for="r in sortedRestaurants"  v-on:click = "openRestaurant(r)" v-if="!r.deleted"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase) || rLower(r.location.address.city).includes(searchInLowerCase) || r.averageGrade == searchText">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
				    			<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
				    			<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else-if="sortAddress">
           			  	<div  v-for="r in sortedAddresses"  v-on:click = "openRestaurant(r)" v-if="!r.deleted"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase) || rLower(r.location.address.city).includes(searchInLowerCase) || r.averageGrade == searchText">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
				    			<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
				    			<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else-if="sortGrades">
           			  <div v-for="r in sortedGrades"  v-on:click = "openRestaurant(r)" v-if="!r.deleted">
		           			<div class="restaurants"  v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase) || rLower(r.location.address.city).includes(searchInLowerCase) || r.averageGrade == searchText">		           		               				
				       		    <img class="restaurants" :src = r.image > <br>
							    <label class="title">{{r.name}} </label> <br>
							    <label>{{r.type}}</label> <br>
							    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label><br>
						    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    	<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
						    </div>  
					   </div>
           			</div>
           			  <div v-else>
	           			  <div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)" v-if="!r.deleted">
		           		    <div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase) || rLower(r.location.address.city).includes(searchInLowerCase) || r.averageGrade == searchText">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					      		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
					      		<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
					      	</div> 	
				      	 </div>
			       	</div>
			    </div>
           		<div v-else>
           			<div v-if="sortName">
           				<div class="restaurants" v-for="r in sortedRestaurants" v-if="!r.deleted" v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label><br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
					    	<label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
           			<div v-else-if="sortAddress">
	           			<div class="restaurants" v-for="r in sortedAddresses" v-if="!r.deleted" v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label><br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label><br>
					    	<label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
           			<div v-else-if="sortGrades">
	           			<div class="restaurants" v-for="r in sortedGrades"  v-if="!r.deleted" v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label><br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
					    	<label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
           			<div v-else-if="filterOK">
           				 <div v-if="filterRestaurantType == 'all'">
	           				 <div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">
			           		     <div class="restaurants" v-if="!r.deleted && r.status === filterStatus">
			           		    	<img class="restaurants" :src = r.image > <br>
						      		<label class="title">{{r.name}} </label> <br>
						      		<label>{{r.type}}</label> <br>
						      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
						      	 	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						      	 	<label v-if="r.status">Radi</label>
					  	 			<label v-if="!r.status">Ne radi</label>
						      	 </div> 	
					      	 </div>
					     </div>
				      	 <div v-else>
				      	 	<div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">
					      	 	<div class="restaurants" v-if="!r.deleted && r.type == filterRestaurantType && r.status === filterStatus">
			           		    	<img class="restaurants" :src = r.image > <br>
						      		<label class="title">{{r.name}} </label> <br>
						      		<label>{{r.type}}</label> <br>
						      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
						      	 	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						      	 	<label v-if="r.status">Radi</label>
						      	 	<label v-if="!r.status">Ne radi</label>
						      	 </div> 
						     </div>
				      	 </div>
           			</div>
           			<div v-else-if="combinedSearch">
           				<div v-if="combinedType == 'all' && combinedGrade != 'all'">
           					<div class="restaurants" v-for="(r, index) in restaurants" v-if="!r.deleted && r.averageGrade >= combinedGrade && rLower(r.name).includes(searchInLowerCaseCombined)"  v-on:click = "openRestaurant(r)">           				
				       		    <img class="restaurants" :src = r.image > <br>
							    <label class="title">{{r.name}} </label> <br>
							    <label>{{r.type}}</label> <br>
							    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
							    <label v-if="r.status">Radi</label>
						  	 	<label v-if="!r.status">Ne radi</label>
						    </div>  
           				</div>
           				<div v-else-if="combinedType != 'all' && combinedGrade == 'all' ">
           					<div class="restaurants" v-for="(r, index) in restaurants" v-if="!r.deleted && r.type == combinedType && rLower(r.name).includes(searchInLowerCaseCombined)"  v-on:click = "openRestaurant(r)">           				
				       		    <img class="restaurants" :src = r.image > <br>
							    <label class="title">{{r.name}} </label> <br>
							    <label>{{r.type}}</label> <br>
							    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
							    <label v-if="r.status">Radi</label>
						  	 	<label v-if="!r.status">Ne radi</label>
						    </div>  
           				</div>
           				<div v-else-if="combinedType != 'all' && combinedGrade != 'all' ">
           					<div class="restaurants" v-for="(r, index) in restaurants" v-if="!r.deleted && r.averageGrade >= combinedGrade && r.type == combinedType && rLower(r.name).includes(searchInLowerCaseCombined)"  v-on:click = "openRestaurant(r)">           				
				       		    <img class="restaurants" :src = r.image > <br>
							    <label class="title">{{r.name}} </label> <br>
							    <label>{{r.type}}</label> <br>
							    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
							    <label v-if="r.status">Radi</label>
						  	 	<label v-if="!r.status">Ne radi</label>
						    </div>  
           				</div>
           				<div v-else>
	           				<div class="restaurants" v-for="(r, index) in restaurants" v-if="!r.deleted && rLower(r.name).includes(searchInLowerCaseCombined)"  v-on:click = "openRestaurant(r)">           				
				       		    <img class="restaurants" :src = r.image > <br>
							    <label class="title">{{r.name}} </label> <br>
							    <label>{{r.type}}</label> <br>
							    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
							    <label v-if="r.status">Radi</label>
						  	 	<label v-if="!r.status">Ne radi</label>
						    </div>  
					    </div>
           			</div>
           			<div v-else>
	           			<div class="restaurants" v-for="(r, index) in restaurants" v-if="!r.deleted"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
				    		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    <label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
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
  		searchInLowerCaseCombined() {
    		return this.combinedName.toLowerCase().trim();
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
  		},
  		sortedGrades: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.averageGrade < b.averageGrade){
		      	return -1 * modifier;
		      } 
		      else if(a.averageGrade > b.averageGrade){
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
  		startCombinedSearch: function(){
    		this.combinedType = this.combinedTypeBind
  		  	this.combinedGrade = this.combinedGradeBind
  		  	this.combinedName = this.combinedNameBind
  		  	if(this.combinedName == '' && this.combinedGrade == 'all' && this.combinedType == 'all'){
  		  		this.combinedSearch = false
  		  	}
  		  	else{
  		  		this.combinedSearch = true
  		  	}
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
		    	 this.sortGrades = false;
		    }
		    else if(s == 'name'){
		    	 this.sortName = true;
		    	 this.sortAddress = false;
		    	 this.sortGrades = false
		    }
		    else {
		    	 this.sortGrades = true;
		    	 this.sortAddress = false;
		    	 this.sortName = false
		    }
		   
		},
		openRestaurant : function(restaurant) {
			event.preventDefault();
			axios.post('rest/showRestaurant/', restaurant.id)
			.then(response => (router.push(`/restaurant`)));
		},
		filter : function() {
			this.sortAddress = false;
			this.sortName = false;
			this.sortGrades = false;
			this.filterOK = true
			this.filterRestaurantType = this.filterType
			if(this.status == 'radi'){
				this.filterStatus = true
			}
			else{
				this.filterStatus = false	
			}
				
		},
    	logIn : function() {
    		router.push(`/logIn`);
    	},
    	registration : function() {
    		router.push(`/registration`)
    	},
    	searchRestaurants : function(){
			this.filterOK = false
    		if(this.searchText === ""){
    			this.searchOK = false
    		}
   			else{
   				this.searchOK = true
   			}   		
    	}
    },
});