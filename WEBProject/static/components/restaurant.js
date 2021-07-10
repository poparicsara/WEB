Vue.component("restaurant", { 
	data: function () {
	    return {
			items: null,
			addItem: false,
			item : {name: '', price: '', type: 'FOOD', amount: '', description: '', image: ''},
			selectedItem: false,
			edit : {oldName: '', name: '', price: '', type: '', amount: '', description: ''},
			restaurantName : '',
			username: null,
			id: null,
			profile: false,
			user : null,
			editUser: null,
			newPage: false,
			restaurant: null,
			details: false,
			showMap: false,
			names: null,
			nameExist: false
	    }
	},
	    template: ` 
	    <div v-if = "username != ''">
	        <h1 class="restaurantHeader">
	        	<label>{{this.restaurantName}}</label>
	        	<div class = "restaurantHeaderProfil">	            	
	            	<div class="dropdown">
	                <button> <img id="adminImage" src="images/manager.png"> </button>
		                <div class="dropdown-content">
		                  <button class="dropdown-button" v-on:click="managerProfile">Profil</button>
		                  <button class="dropdown-button" v-on:click = "logOut"> Odjava</button>
		                </div>
	            	</div>
            	</div>
        	</h1>
        	<div class="restaurantContent">
        	<h2>   
               <button class="detailsButton" v-on:click="showDetails"> Detaljniji prikaz restorana </button>                     
           	</h2>

	        <div class="restaurantButtonsGroup">
	        <button class="restaurantButtons" v-on:click = "orders">
	        	<img class="restaurantOrdersIMG" src="images/restaurantOrders.png"/>
	        	Porudzbine
	        </button>
	        <button class="restaurantButtons" v-on:click = "customers">
	        	<img class="restaurantCustomersIMG" src="images/restaurantCustomers.png"/>
	        	Kupci
	        </button>
	        <button class="restaurantButtons" v-on:click = "comments">
	        	
	        	Komentari
	        </button><br/>
	        <button class="addButton" v-on:click = "addRestaurantItem">
	        	<img class="restaurantAddItemIMG" src="images/addItem.png"/>
	        	
	        </button>
	        </div>
	        <br/><br/>
	        <div class="restaurantItemGroup" v-for="(i, index) in items">
                <div class="restaurantItem" v-if="i.deleted===false">
                	<a class="restaurantItemImage" v-on:click="itemClicked(i)">
                		<img :src = i.image><br/><br/>
                	</a>
                	<hr class="restaurantItemHR">
                    <label class="foodName"><b>{{i.name}}</b></label><br/><br/>
                    <label class="price">Cena: {{i.price}} RSD</label><br/>
                    <label v-if="i.type=='FOOD'">Kolicina: {{i.amount}} g</label>
                    <label v-if="i.type=='DRINK'">Kolicina: {{i.amount}} ml</label>
                    <button class="deleteButton" v-on:click="deleteItem(i)">
                    	<img class="deleteImg" src="images/delete.png"/>
                    </button>
                </div>
            	
	        </div>
	        </div>
	        <div class="addRestaurantItem" v-if="addItem">
	        	<div class="addRestaurantItemComponents">
		        	<span class="addRestaurantItemClose" v-on:click="closeAdding">&times;</span>
		        	<h1 class="addRestaurantHeader">Dodavanje novog artikla</h1>
		            <form>  
		                <label class="restaurantItemLabels">Naziv artikla:</label><br/>
		                <input class="restaurantItemInput" type="text" name="name" v-model = "item.name" required ><br/><br/>
		                <label class="restaurantItemLabels">Cena:</label><br/>
		                <input class="restaurantItemInput" type="number" name="price" v-model = "item.price" required ><br/><br/>
		                <label class="restaurantItemLabels">Tip:</label><br/>
		                <select name="itemType" v-model = "item.type" class="restaurantItemInput" selected="FOOD">
		                    <option value="FOOD">hrana</option>
		                    <option value="DRINK">piće</option>
		                </select><br/><br/>
		                <label class="restaurantItemLabels">Kolicina:</label><br/>
		                <input class="restaurantItemInput" type="number" name="amount" v-model="item.amount"><br/><br/>
		                <label class="restaurantItemLabels">Opis:</label><br/>
		                <input class="restaurantItemInput" type="text" name="description" v-model = "item.description"><br/><br/>
		                <form action="/action_page.php" >
                  			<input v-model = "item.image" type="file" class="addRestaurantItemImage" name="image" accept="image/*">
                		</form>
		                <br/>
		                <input class="restaurantItemButtons" type="submit" value="Sačuvaj" v-on:click="saveItem"><br/>
		                <input class="restaurantItemButtons" type="submit" value="Odustani" v-on:click="cancelAdding">
		            </form>
	            </div>
	        </div>
	        <div class="editRestaurantItem" v-if="selectedItem">
	        	<div class="editRestaurantItemComponents">
		        	<span class="editRestaurantItemClose" v-on:click="closeItem">&times;</span>
		        	<h1 class="editRestaurantItemHeader">Izmena artikla</h1>
		        	<label class="editRestaurantItemLabel">Naziv:</label><br/>
		        	<input class="editRestaurantItemInput" type="text" v-model="edit.name"></input><br/></br>
		        	<label class="editRestaurantItemLabel">Cena:</label><br/>
		        	<input class="editRestaurantItemInput" type="number" v-model="edit.price" pattern="[0-9]*"></input><br/></br>
		        	<label class="editRestaurantItemLabel">Tip:</label><br/>
		        	<select class="editRestaurantItemInput" v-model="edit.type" selected="edit.type">
		        		<option value="FOOD">hrana</option>
		        		<option value="DRINK">pice</option>
		        	</select><br/><br/>
		        	<label class="editRestaurantItemLabel">Kolicina:</label><br/>
		        	<input class="editRestaurantItemInput" type="number" v-model="edit.amount" pattern="[0-9]"><br/><br/>
		        	<label class="editRestaurantItemLabel">Opis:</label><br/>
		        	<input class="editRestaurantItemInput" type="text" v-model="edit.description"></input><br/><br/>
		        	<div class="editRestaurantItemButtons">
			        	<button class="editRestaurantItemButton" v-on:click="saveEditing">Sačuvaj</button>
			        	<button class="editRestaurantItemButton" v-on:click="cancelEditing">Odustani</button>
		        	</div>
	        	</div>
	        </div>
	        <div class="profileModal" v-if="profile">
	        	<div class="profileModalComponents">
	        		<span class="profileModalClose" v-on:click="closeProfile">&times;</span>
	        		<h1 class="profileModalHeader">Profil</h1>
	        		<label class="profileModalLabel">Korisničko ime:</label><br/>
	        		<input class="profileModalInput" v-model="user.username" type="text"><br/><br/>
	        		<label class="profileModalLabel">Lozinka:</label><br/>
	        		<input class="profileModalInput" v-model="user.password" type="text"><br/><br/>
	        		<label class="profileModalLabel">Ime:</label><br/>
	        		<input class="profileModalInput" v-model="user.name" type="text"><br/><br/>
	        		<label class="profileModalLabel">Prezime:</label><br/>
	        		<input class="profileModalInput" v-model="user.lastname" type="text"><br/><br/>
	        		<label class="profileModalLabel">Pol:</label><br/>
	        		<select class="profileModalInput" v-model="user.gender" selected="user.gender">
	        			<option value="FEMALE">zenski</option>
	        			<option value="MALE">muski</option>		
	        		</select><br/><br/>
	        		<label class="profileModalLabel">Datum rodjenja:</label><br/>
	        		<input class="profileModalInput" v-model="user.date" type="date"><br/><br/>
	        		<button class="profileModalButton" v-on:click="saveProfileEdit">Sačuvaj</button>
			        <button class="profileModalButton" v-on:click="cancelProfileEdit">Odustani</button>
	        	</div>
	        </div>
	        <div v-if="details" class="addRestaurantItem">
	        	<div class="addRestaurantItemComponents">
	        		<span class="addRestaurantItemClose" v-on:click="closeDetails">&times;</span>
	        		<h1 class="addRestaurantHeader">Informacije o restoranu</h1>
	        		<label class="restaurantItemLabels" >Naziv restorana:</label><br/>
                	<input class="restaurantItemInput" type="text" name="name" v-model = "restaurant.name"><br/><br/>
                	<label class="restaurantItemLabels" >Tip restorana:</label><br/>
                	<input class="restaurantItemInput" type="text" name="name" v-model = "restaurant.type"><br/><br/>
                	<div v-if="restaurant.averageGrade > 0 ">
                	<label class="restaurantItemLabels">Prosečna ocena</label><br/>
                	<input class="restaurantItemInput" type="text" v-model="restaurant.averageGrade"><br/><br/>					
					<label class="restaurantItemLabels">Radno vreme:</label><br/>
                	<label class="restaurantItemLabels">{{restaurant.startTime}} : {{restaurant.endTime}}</label><br/><br/>
					</div>  
					<label class="restaurantItemLabels" >Adresa:</label><br/>
					<label class="restaurantItemInput" >{{restaurant.location.address.street}}  {{restaurant.location.address.number}}, {{restaurant.location.address.city}}</label>
					<br/><br/>
					<button class="editRestaurantItemButton" v-on:click="showLocation">Mapa:</button><br/>
					<div v-if="showMap" id="mapid">
					</div>
					
				</div>
       	   </div>
        </div>
         <div v-else>
        	<div id="restaurantHeader">
                <img id="logo" src="images/logo.jpg"> 
                <label class="r"> <b> {{restaurant.name}} </b></label>                                
                <button class="b" > Prijava </button>
                <button class = "b" > Registracija</button>
            	<hr>
            </div>
            <h2>   
               <a href="#" v-on:click="showDetails"> Detaljniji prikaz restorana </a>                     
           	</h2>
           	<button v-on:click="comments">Komentari</button>
        	<div class="restaurantItemGroup" v-for="(i, index) in items">
                <div class="restaurantItem">
                	<img :src = i.image><br/><br/>
                	<hr class="restaurantItemHR">
                    <label class="foodName"><b>{{i.name}}</b></label><br/><br/>
                    <label class="price">Cena: {{i.price}} RSD</label><br/>
                    <label v-if="i.type=='FOOD'">Kolicina: {{i.amount}} g</label>
                    <label v-if="i.type=='DRINK'">Kolicina: {{i.amount}} ml</label>
                </div>
	        </div>
	        <div v-if="details" class="addRestaurantItem">
	        	<div class="addRestaurantItemComponents">
	        		<span class="addRestaurantItemClose" v-on:click="closeDetails">&times;</span>
	        		<h1 class="addRestaurantHeader">Informacije o restoranu</h1>
	        		<label class="restaurantItemLabels" >Naziv restorana:</label><br/>
                	<input class="restaurantItemInput" type="text" name="name" v-model = "restaurant.name"><br/><br/>
                	<label class="restaurantItemLabels" >Tip restorana:</label><br/>
                	<input class="restaurantItemInput" type="text" name="name" v-model = "restaurant.type"><br/><br/>
                	<div v-if="restaurant.averageGrade > 0 ">
                	<label class="restaurantItemLabels">Prosečna ocena</label><br/>
                	<input class="restaurantItemInput" type="text" v-model="restaurant.averageGrade"><br/><br/>
                	<label class="restaurantItemLabels">Radno vreme:</label><br/>
                	<label class="restaurantItemLabels">{{restaurant.startTime}} : {{restaurant.endTime}}</label><br/><br/>				
					</div>  
					<label class="restaurantItemLabels" >Adresa:</label><br/>
					<label class="restaurantItemInput" >{{restaurant.location.address.street}}  {{restaurant.location.address.number}}, {{restaurant.location.address.city}}</label>
					<br/><br/>
					<button class="restaurantItemInput" v-on:click="showLocation">Mapa:</button><br/>
					<div v-if="showMap" id="mapid">
					</div>
					
				</div>
       	   </div>
        </div>
    	`
    	,
		mounted () {
          axios
          .get('rest/restorauntItems/')
          .then(response => (this.items = response.data));
          axios
          .get('rest/managerRestaurant/')
          .then(response => (this.restaurantName = response.data));
          axios
          .get('rest/loggedInUser/', this.username)
          .then(response => (this.username = response.data));
         axios
         .get('rest/loggedUser/')
         .then(response => (this.user = response.data));
          axios
         .get('rest/selectedRestaurant/')
         .then(response => (this.restaurant = response.data));
         axios
         .get('rest/itemNames/')
         .then(response => (this.names = response.data));
          
        },
        
        destroyed() {
        	if(!this.newPage){
        		axios.post(`/rest/logOut`)
    			.then(response => ('success'));
    			  router.push(`/`);
    		}
        },
        
    	methods: {   
    		
    		closeDetails: function(){
    			this.details = false
    		},
    		showDetails: function(){
    			this.details = true	
    		}, 	
    		showLocation: function(){
    			event.preventDefault()
  		   		this.showMap = true
	  			var mymap = L.map('mapid').setView([this.restaurant.location.latitude, this.restaurant.location.longitude], 13);
	  			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
				    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				    maxZoom: 18,
				    id: 'mapbox/streets-v11',
				    tileSize: 512,
				    zoomOffset: -1,
				    accessToken: 'pk.eyJ1Ijoib2dpamFoIiwiYSI6ImNrcXMzbjR0ZDE3N24zMXFhOXM5MDlmeWwifQ.V05sowv93LiOgv4O-0bIgw'
				}).addTo(mymap);
				
				var marker = new L.marker([this.restaurant.location.latitude, this.restaurant.location.longitude]).addTo(mymap);
    		},
	    	orders : function() {	    
	    		this.newPage = true		
	    		router.push(`/restaurantOrders`);
	    	},
	    	customers : function() {
	    		this.newPage = true	    	
	    		router.push(`/restaurantCustomers`)
	    	},
	    	addRestaurantItem : function() {
	    		this.addItem = true;
	    	},
	    	closeAdding : function() {
	    		this.addItem = false
	    	},
	    	saveItem : function() {
	    		this.nameExist = false;
	    		for(n of this.names){
	    			if(n === this.item.name){
	    				this.nameExist = true;
	    			}
	    		}
	    		this.addItem = true;
	    		if(this.item.name == ''){
	    			alert("Polje za unos imena je obavezno popuniti!");
	    		} else if(this.item.price == ''){
	    			alert("Polje za unos cene je obavezno popuniti!");
	    		} else if(this.item.image == ''){
	    			event.preventDefault()
	    			alert("Obavezno je odabrati sliku!");
	    		} else if(this.nameExist === true){ 
	    			event.preventDefault()
	    			alert("Uneto ime artikla vec postoji!");
	    		} else if((this.item.price.includes('-'))) {
	    			event.preventDefault()
	    			alert("Cena mora biti pozitivna vrednost");
	    		} else if((this.item.amount.includes('-'))) {
	    			event.preventDefault()
	    			alert("Kolicina mora biti pozitivna vrednost");
	    		}else {
	    			if(this.item.amount == ''){
	    				this.item.amount = 0;
	    			}
	    			let array = this.item.image.split("\\")
	            	this.item.image = "images/items/" + array[2]
		    		event.preventDefault()
	    			axios
	    			.post(`/rest/addItemToRestaurant/`, this.item)
	    			.then(response => (this.$router.go()))
	    		}
	    	},
	    	cancelAdding : function() {
	    		this.addItem = false
	    		event.preventDefault();
				axios.post('/rest/restaurant/cancelAdding/')
	    	},
	    	itemClicked : function(i) {
	    		this.edit.oldName = i.name;
	    		this.edit.name = i.name;
	    		this.edit.price = i.price;
	    		if(i.type == 'FOOD'){
	    			this.edit.type = "FOOD";
	    		} else {
	    			this.edit.type = "DRINK";
	    		}
	    		this.edit.amount = i.amount;
	    		this.edit.description = i.description;
	    		this.edit.image = i.image;
	    		this.selectedItem = true;
	    	},
	    	closeItem : function() {
	    		this.selectedItem = false;
	    	},
	    	cancelEditing : function() {
	    		this.selectedItem = false;
	    	}, 
	    	saveEditing : function() {
				if(this.edit.name == ''){
	    			alert("Polje za unos imena je obavezno popuniti!");
	    		} else if(this.edit.price == ''){
	    			alert("Polje za unos cene je obavezno popuniti!");
	    		} else if(this.edit.price <= 0) {
	    			event.preventDefault()
	    			alert("Cena mora biti pozitivna vrednost");
	    		} else if(this.edit.amount <= 0) {
	    			event.preventDefault()
	    			alert("Kolicina mora biti pozitivna vrednost");
	    		} else {
	    			this.nameExist = false;
	    			for(n of this.names){
	    				if(n === this.edit.oldName){
	    					continue;
	    				}
	    				if(n === this.edit.name){
	    					this.nameExist = true;
	    				}
	    			} 
	    			if(this.nameExist){
	    				alert('Uneto ime artikla vec postoji!')
	    			} else {
	    				this.selectedItem = false;
		    			event.preventDefault();
		    			axios.post(`/rest/editRestaurantItem/`, this.edit)
	    				.then(response => (this.$router.go()))
	    			}
	    		}	    	

	    	},
	    	logOut: function() {
	    		if(confirm('Da li ste sigurni?')){
	    			axios.post(`/rest/logOut`)
	    			.then(response => ('success'));
	    			  router.push(`/`);
	    		}
    		},
    		managerProfile : function() {
    			this.newPage = true		
	    		router.push(`/profile`);
    		},
    		closeProfile: function() {
    			this.profile = false;
    		},
    		saveProfileEdit : function() {
    			this.editUser.oldUsername = this.user.username;
    			this.editUser.username = this.user.username;
    			this.editUser.password = this.user.password;
    			this.editUser.name = this.user.name;
    			this.editUser.lastname = this.user.lastname;
    			this.editUser.gender = this.user.gender;
    			this.editUser.date = this.user.date;
    			this.editUser.userType = this.user.userType;
    			event.preventDefault()
    			axios
    			.post('/rest/editProfile/', this.editUser)
    			.then(response => (this.profile = false));
    		},
    		cancelProfileEdit : function() {
    			this.profile = false;
    		},
    		comments : function() {
    			this.newPage = true		
	    		router.push(`/restaurantComments`);
    		},
    		deleteItem : function(item){
    			alert(item.name);
    			axios
    			.post('/rest/deleteRestaurantItem/', item)
    			.then(response => (this.$router.go()))
    		}
    	},
});