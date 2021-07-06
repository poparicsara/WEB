
Vue.component("admin", { 
	data: function () {
	    return {
	      username: null,
	      restaurants: null,
	      object: null,
	      showManager: false,
	      showDeliverer: false,
	      showRestaurant: false,
	      showRestaurants: true,
	      showUsers: false,
	      users : null,
	      managers : null,
	      managerID: '',
	      managerDTO: {username: null, restaurant: null},
	      user: {username: null, password: null, name: null, lastname: null, gender: '', date: ''},
	      restaurant: {name: null, type: null, status:true, items:null, location: { address: {street : '', number : '', city: '', }, longitude:0, latitude:0 }, image: ''},
	      searchText: '',
	      searchOK: false,
	      currentSort: 'name',
	      currentSortDir:'asc',
	      sortName: false,
	      sortLastName: false,
	      sortUsername: false,
	      filterType: null,
	      filterOK: false,
	      map: false,
	      marker: null,
	      flag : false
	    }
	},
	    template: ` 
        <div v-if="username != ''">
          <h1 class="admin"> 
            <img id="adminLogo" src="images/logo.jpg">
            <div class="dropdown">
	           <button> <img id="adminImage" src="images/admin.png"> </button>
		               <div class="dropdown-content">
		                  <button>Profil</button>
		                  <button v-on:click = "logOut"> Odjava</button>
		                </div>
	       </div>
        </h1>
        <hr class="admin">
        <h2>
            <label id = "new"> <a href="#" v-on:click = "addUser">+</a> </label>
             <select name="object" id="object" v-model = "object">
                    <option value="MENADZER">Menadžer</option>
                    <option value="DOSTAVLJAC">Dostavljač</option>
                     <option value="RESTORAN">Restoran</option>
                     
                </select>
            <button class="buttons" v-on:click = "showRestaurantList" > Restorani </button>
            <button class="buttons" v-on:click = "showUserList"> Korisnici </button>
            <button class="buttons"> Komentari </button>
        </h2>
        <div v-if="this.showRestaurants"> 
	         <div class="restaurants" v-for="(r, index) in restaurants">
	            <img class="restaurants" :src = r.image > <br>
	           	<label class="title">{{r.name}} </label> <br>
	           	<label>{{r.type}}</label> 
	           	<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> 
	         </div>
         </div> 
         <div v-if="this.showUsers" >
         	  <h3 >
         	       <input id="searchUsers" type="text" placeholder="Pretraži..." v-model="searchText" v-on:change = "searchUsers">  
         	       <br> <br>
         	       <div class= "sortUsers" >        	       
		           		<label> Sortiraj: </label>
		      			<button class="sort" v-on:click = "sort('name')"> Ime </button>
		      			<button class="sort" v-on:click = "sort('lastName')"> Prezime </button>
		      			<button class="sort" v-on:click = "sort('username')"> Username </button>
		      			<button class="sort"> Poeni </button>
	      			</div>
	      			<br> <br>
	      			<div class = "filterUsers">
      				<label> Filtriraj: </label>
      				<select class="filter" name="type" v-model = "filterType">
      					<option value="all"> Svi </option>
	                    <option value="ADMIN">Admin</option>
	                    <option value="MANAGER">Menadžer</option>
	                    <option value="CUSTOMER">Kupac</option>
	                    <option value="DELIVERER">Dostavljač</option>
	                </select>
	                <button v-on:click = "filter"> <img id="filter" src="images/filter.png"> </button>
      				</div>
      			
         	  </h3>
         	  <div v-if="searchOK">
		          <div  v-for="(u, index) in users">
		          	<div class="restaurants" v-if="rLower(u.name).includes(searchInLowerCase) || rLower(u.lastname).includes(searchInLowerCase) || rLower(u.username).includes(searchInLowerCase)">
			            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
			            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
			            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
			            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
			            <br>
			           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
			           	<label>Username: {{u.username}}</label> 
		           	</div>
		         </div> 
	         </div>
	          <div v-else-if="sortName">
	          	 <div class="restaurants" v-for="u in sortedNames">       	
			            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
			            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
			            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
			            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
			            <br>
			           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
			           	<label>Username: {{u.username}}</label> 
		         </div> 
	          </div>
	          <div v-else-if="sortLastName">
	          	 <div class="restaurants" v-for="u in sortedLastNames">       	
			            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
			            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
			            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
			            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
			            <br>
			           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
			           	<label>Username: {{u.username}}</label> 
		         </div> 
	          </div>
	          <div v-else-if="sortUsername">
	          	 <div class="restaurants" v-for="u in sortedUsernames">       	
			            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
			            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
			            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
			            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
			            <br>
			           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
			           	<label>Username: {{u.username}}</label> 
		         </div> 
	          </div>
	          <div v-else-if="filterOK">
		         <div v-for="(u, index) in users">   
		         	<div v-if = "u.userType == filterType">    	
			            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
			            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
			            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
			            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
			            <br>
			           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
			           	<label>Username: {{u.username}}</label>
			        </div> 
		         </div> 
	         </div>
	          <div v-else>
		         <div class="restaurants" v-for="(u, index) in users">       	
			            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
			            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
			            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
			            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
			            <br>
			           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
			           	<label>Username: {{u.username}}</label> 
		         </div> 
	         </div>
         </div>   
              
           
         <div v-if="this.showManager" class="addRestaurantItem">
          <div class="addRestaurantItemComponents">
         	<span class="addRestaurantItemClose" v-on:click="closeAddingManager">&times;</span>
            <h1 class="addRestaurantHeader">Novi menadžer</h1>
            <form>
                <br/>
                <label class="restaurantItemLabels">Korisničko ime:</label><br/>
                <input class="restaurantItemInput" type="text" name="username" v-model = "user.username"><br/><br/>
                <label class="restaurantItemLabels">Lozinka:</label><br/>
                <input class="restaurantItemInput" type="text" name="password" v-model = "user.password"><br/><br/>
                <label class="restaurantItemLabels">Ime:</label><br/>
                <input class="restaurantItemInput" type="text" name="name" v-model = "user.name"><br/><br/>
                <label class="restaurantItemLabels">Prezime:</label><br/>
                <input class="restaurantItemInput" type="text" name="lastname" v-model = "user.lastname"><br/><br/>
                <label class="restaurantItemLabels">Pol:</label><br/>
                <select name="gender" class="restaurantItemInput"  v-model = "user.gender">
                    <option value="MALE">muški</option>
                    <option value="FEMALE">ženski</option>
                </select>
                <br/><br/>
                <label class="restaurantItemLabels">Datum rođenja:</label><br/>
                <input class="restaurantItemInput" type="date" name="dateOfBirth" value=" " v-model = "user.date"><br/><br/><br/>
                <input class="restaurantItemButtons" type="submit" value="Dodaj" v-on:click = "addManager">
            </form>
         </div>
        </div>       
         <div v-if="this.showDeliverer" class="addRestaurantItem">
          <div class="addRestaurantItemComponents">
         	<span class="addRestaurantItemClose" v-on:click="closeAddingDeliverer">&times;</span>
            <h1 class="addRestaurantHeader">Novi dostavljač</h1>
            <form>
                <br/>
                <label class="restaurantItemLabels">Korisničko ime:</label><br/>
                <input class="restaurantItemInput" type="text" name="username" v-model = "user.username"><br/><br/>
                <label class="restaurantItemLabels">Lozinka:</label><br/>
                <input class="restaurantItemInput" type="text" name="password" v-model = "user.password"><br/><br/>
                <label class="restaurantItemLabels">Ime:</label><br/>
                <input class="restaurantItemInput" type="text" name="name" v-model = "user.name"><br/><br/>
                <label class="restaurantItemLabels">Prezime:</label><br/>
                <input class="restaurantItemInput" type="text" name="lastname" v-model = "user.lastname"><br/><br/>
                <label class="restaurantItemLabels">Pol:</label><br/>
                <select name="gender" class="restaurantItemInput"  v-model = "user.gender">
                    <option value="MALE">muški</option>
                    <option value="FEMALE">ženski</option>
                </select>
                <br/><br/>
                <label class="restaurantItemLabels"> Datum rođenja:</label><br/>
                <input class="restaurantItemInput" type="date" name="dateOfBirth" value=" " v-model = "user.date"><br/><br/><br/>
                <input class="restaurantItemButtons" type="submit" value="Dodaj" v-on:click = "addDeliverer">
            </form>
          </div>
        </div>   
         <div v-if="this.showRestaurant"  class="addRestaurantItem">
         <div class="addRestaurantItemComponents">
         	<span class="addRestaurantItemClose" v-on:click="closeAddingRestaurant">&times;</span>
            <h1 class="addRestaurantHeader">Novi restoran</h1>
            <form>
                <label class="restaurantItemLabels" >Naziv restorana:</label><br/>
                <input class="restaurantItemInput" type="text" name="name" v-model = "restaurant.name"><br/><br/>
                <label class="restaurantItemLabels">Tip:</label><br/>
                <select class="restaurantItemInput" name="type" v-model = "restaurant.type">
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
                <br/><br/> 
                <label class="restaurantItemLabels">Logo restorana:</label><br/>
                <form action="/action_page.php" >
				  <input v-model = "restaurant.image" class="addRestaurantItemImage" type="file" id="image" name="image" accept="image/*">
				</form>
				<button v-on:click = "showMap"> Lokacija </button>
				<div id="mapid">
				</div>  
				  <label class="restaurantItemLabels" >Manager:</label><br/>
                <select name="manager" class="restaurantItemInput"  v-model = "managerID" >
   					<option v-for="m in managers" v-if="m.restaurant == null" v-bind:value="m.username"> {{m.name}} {{m.lastname}}, username:{{m.username}} </option>
                </select>
                <br/><br/> 	
                <input class="restaurantItemButtons" type="submit" value="Dodaj" v-on:click = "addRestaurant">
            </form>
        </div>
        </div> 
        
        </div>
        
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data)), 
       axios
          .get('rest/users/')
          .then(response => (this.users = response.data)),
       axios
          .get('rest/managers/')
          .then(response => (this.managers = response.data)),
       axios
          .get('rest/loggedInUser/', this.username)
          .then(response => (this.username = response.data));
       
    },
    
    destroyed () {
    			axios.post(`/rest/logOut`)
    			.then(response => (''));
    			router.push(`/`);   	
    },
    computed: {
    	searchInLowerCase() {
    		return this.searchText.toLowerCase().trim();
  		},
  		sortedNames: function() {
		    return this.users.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.name < b.name){
		      	return -1 * modifier;
		      } 
		      else if(a.name > b.name){
		      	return 1 * modifier;
		      }
		      else
		       return 0;
    		});
  		},
  		sortedLastNames: function() {
		    return this.users.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.lastname < b.lastname){
		      	return -1 * modifier;
		      } 
		      else if(a.lastname > b.lastname){
		      	return 1 * modifier;
		      }
		      else{
		      	if(a.name < b.name){
		      		return -1 * modifier;
		      	}
		      	else if(a.name > b.name){
		      		return 1 * modifier;
		      	}
		      	else{
		      		return 0;
		      	}	
		      }
		       
    		});
  		},
  		sortedUsernames: function() {
		    return this.users.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.username < b.username){
		      	return -1 * modifier;
		      } 
		      else if(a.username > b.username){
		      	return 1 * modifier;
		      }
		      else
		       return 0;
    		});
  		}
    }
    ,
    methods: {
    	logOut: function() {
    		if(confirm('Da li ste sigurni?')){
    			axios.post(`/rest/logOut`)
    			.then(response => (''));
    			router.push(`/`);
    		}	
    	},
    	showRestaurantList: function(){
    		this.showRestaurants = true
    		this.showUsers = false    		
    	},
    	showUserList: function(){
    		this.showUsers = true
    		this.showRestaurants = false	
    	},
    	addUser: function(){
    		if(this.object == 'MENADZER'){
				this.showManager = true
				this.showDeliverer = false
				this.showRestaurant = false	
			}
			else if(this.object == 'DOSTAVLJAC'){
				this.showDeliverer = true
				this.showManager = false
				this.showRestaurant = false
			}	
			else if(this.object == 'RESTORAN'){
				let availableManagers = 0
	    		for(m of this.managers){
	    			if(m.restaurant == null){
	    				availableManagers++
	    			}
	    		}
	    		if(availableManagers == 0){
	    			alert('Ne postoji menadžer bez restorana! Dodajte novog!')
	    			this.showRestaurant = false
					this.showManager = true
					this.showDeliverer = false
	    		}
	    		else{
	    			this.showRestaurant = true
					this.showManager = false
					this.showDeliverer = false
	    		}
			
			}
		},
		closeAddingManager : function() {
	   		this.showManager = false
	    },
		closeAddingRestaurant : function() {
	   		this.showRestaurant = false
	    },
	    closeAddingDeliverer : function(){
	    	this.showDeliverer = false
	    },
    	addManager: function(){
    		var exists = false
    		for(oldUser of this.users){
    			if(this.user.username == oldUser.username){
    				exists = true
    				break
    			}
    		}
    		if(exists){
    		    event.preventDefault()
    			alert('Korisničko ime je zauzeto!')
    			this.showManager = false
    		}
    		else{
    			event.preventDefault()
    			axios.post('/rest/restaurants/addManager', this.user).
    			then(response => alert('Menadžer uspešno registrovan!'));
    			this.showManager = false
    		}
    	},
    	addDeliverer: function(){
    		var exists = false
    		for(oldUser of this.users){
    			if(this.user.username == oldUser.username){
    				exists = true
    				break
    			}
    		}
    		if(exists){
    		    event.preventDefault()
    			alert('Korisničko ime je zauzeto!')
    			this.showDeliverer = false
    		}
    		else{
    			event.preventDefault()
    			axios.post('/rest/restaurants/addDeliverer', this.user).
    			then(response => alert('Dostavljač uspešno registrovan!'));
    			this.showDeliverer = false
    		}
    	},
    	addRestaurant: function(){
    		let array = this.restaurant.image.split("\\")
    		this.restaurant.image = "images/" + array[2]
    		this.managerDTO.restaurant = this.restaurant
    		this.managerDTO.username = this.managerID
    		let exists = false
    		if(exists){
    			event.preventDefault()
    			alert('Korisničko ime je zauzeto!')
    			this.showRestaurant = false
    		}
    		else{
    			event.preventDefault()
    			axios.post('/rest/restaurants/addRestaurant', this.managerDTO).
    			then(response => alert('Restoran uspešno kreiran!'));
    			this.showRestaurant = false
    		}
    	},
    	sort: function(s) {
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		    if(s == 'name'){
		    	 this.sortName = true;
		    	 this.sortLastName = false;
		    	 this.sortUsername = false;
		    	 
		    }
		    else if(s== 'lastName'){
		    	 this.sortName = false;
		    	 this.sortLastName = true;
		    	 this.sortUsername = false;
		    }
		    else if(s=='username'){
		    	this.sortUsername = true;
		    	this.sortName = false;
		    	this.sortLastName = false;
		    	
		    }
		   
		},
		filter : function() {
			this.sortName = false;
		    this.sortLastName = false;
		    this.sortUsername = false;
			if(this.filterType == "all"){
				this.filterOK = false
			}
			else{
				this.filterOK = true
			}
			
		},
    	searchUsers : function(){
    		if(this.searchText === ""){
    			this.searchOK = false
    		}
   			else{
   				this.searchOK = true
   			}   		
    	},
    	rLower : function(item) {
  			return item.toLowerCase()
  		},
  		showMap : function() {
  			event.preventDefault()
  		    this.map = true
  			var mymap = L.map('mapid').setView([45.2635752, 19.8434573], 13);
  			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			    maxZoom: 18,
			    id: 'mapbox/streets-v11',
			    tileSize: 512,
			    zoomOffset: -1,
			    accessToken: 'pk.eyJ1Ijoib2dpamFoIiwiYSI6ImNrcXMzbjR0ZDE3N24zMXFhOXM5MDlmeWwifQ.V05sowv93LiOgv4O-0bIgw'
			}).addTo(mymap);
		
  			function onMapClick(e) {
  				
        		L.esri.Geocoding.reverseGeocode()
				  .latlng(e.latlng)
				  .run(function (error, result, response) {
				    // callback is called with error, result, and raw response
				    // result.latlng contains the coordinates of the located address
				    // result.address contains information about the match
				    if(this.flag){
	  					mymap.removeLayer(this.marker)
  					}
				    this.marker = new L.marker(e.latlng).addTo(mymap);					    			    
				    this.flag = true
				    let elems = result.address.LongLabel.split(',')
				    alert(elems)
					alert(elems[0])	    
					let street = elems[0].split(/[ ,]+/);
					alert(street[street.length - 1])
					
            		
				  });
			}
			
			mymap.on('click', onMapClick);
  		}
    },
});