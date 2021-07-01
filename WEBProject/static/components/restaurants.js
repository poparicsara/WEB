Vue.component("restaurants", { 
	data: function () {
	    return {
	      restaurants: null,
	      searchText: "",
	      searchOK: false,
	      sortName: false,
	      currentSort:'name',
  		  currentSortDir:'asc'
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
	      			<button class="sort"> Lokacija </button>
	      			<button class="sort"> Ocena </button>
      			</div>
           </h3>
           		<div v-if="searchOK"> 
           			  <div v-for="(r, index) in restaurants">
	           		    <div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">
	           		    	<img class="restaurants" :src = r.image > <br>
				      		<label class="title">{{r.name}} </label> <br>
				      		<label>{{r.type}}</label>  
				      	</div> 	
			      	</div>
			    </div>
           		<div v-else>
           			<div v-if="sortName">
           				<div class="restaurants" v-for="r in sortedRestaurants">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> 
					    </div>  
           			</div>
           			<div v-else>
	           			<div class="restaurants" v-for="(r, index) in restaurants">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> 
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
    		return this.searchText.toLowerCase();
  		},
  		sortedRestaurants: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
		      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
		      return 0;
    	});
  }
	},
    methods: {
    	rLower : function(item) {
  			return item.toLowerCase()
  		},
  		sort: function(s) {
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		    this.sortName = true;
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