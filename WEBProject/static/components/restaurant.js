Vue.component("restaurant", { 
	data: function () {
	    return {
			items: null,
			addItem: false,
			item : {name: '', price: '', type: '', amount: '0', description: '', image: ''},
			selectedItem: false,
			edit : {oldName: '', name: '', price: '', type: '', amount: '', description: '', image: ''},
			restaurantName : '',
			username: null,
			id: null,
			profile: false,
			user : null,
			editUser: null,
			newPage: false
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
		                  <button v-on:click="managerProfile">Profil</button>
		                  <button v-on:click = "logOut"> Odjava</button>
		                </div>
	            	</div>
            	</div>
        	</h1>
	        </h1>
	        <input class="restaurantSearchBox" type="text" name="search" placeholder="Pretraži...">
	        <img class="restaurantItemsSearchIMG" src="images/search.png"/>
	        <br/><br/>
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
	        </button>
	        <button class="restaurantButtons" v-on:click = "addRestaurantItem">
	        	<img class="restaurantAddItemIMG" src="images/addItem.png"/>
	        	Novi artikal
	        </button>
	        </div>
	        <br/><br/>
	        <div class="restaurantItemGroup" v-for="(i, index) in items">
	            <a v-on:click="itemClicked(i)">
                <div class="restaurantItem">
                	<img :src = i.image><br/><br/>
                	<hr class="restaurantItemHR">
                    <label class="foodName"><b>{{i.name}}</b></label><br/><br/>
                    <label class="price">Cena: {{i.price}} RSD</label><br/>
                    <label v-if="i.type=='FOOD'">Kolicina: {{i.amount}} g</label>
                    <label v-if="i.type=='DRINK'">Kolicina: {{i.amount}} ml</label>
                </div>
            </a>
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
		        	<input class="editRestaurantItemInput" type="text" v-model="edit.price" pattern="[0-9]*"></input><br/></br>
		        	<label class="editRestaurantItemLabel">Tip:</label><br/>
		        	<select class="editRestaurantItemInput" v-model="edit.type" selected="edit.type">
		        		<option value="FOOD">hrana</option>
		        		<option value="DRINK">pice</option>
		        	</select><br/><br/>
		        	<label class="editRestaurantItemLabel">Kolicina:</label><br/>
		        	<input class="editRestaurantItemInput" type="text" v-model="edit.amount" pattern="[0-9]"><br/><br/>
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
        </div>
        <div v-else-if = "id != -1">
        	<div id="restaurantHeader">
                <img id="logo" src="images/logo.jpg">                 
                <button class="b" > Prijava </button>
                <button class = "b" > Registracija</button>
            	<hr>
            </div>
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
          
        },
        
        destroyed() {
        	if(!this.newPage){
        		axios.post(`/rest/logOut`)
    			.then(response => ('success'));
    			  router.push(`/`);
    		}
        },
        
    	methods: {    	
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
	    		this.addItem = true
	    		if(this.item.price == ''){
	    			alert("Polje za unos cene je obavezno popuniti!");
	    		} else if(this.item.image == ''){
	    			event.preventDefault()
	    			alert("Obavezno je odabrati sliku!");
	    		} else {
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
	    		this.selectedItem = false;
	    		event.preventDefault()
	    		axios.post(`/rest/editRestaurantItem/`, this.edit)
    			.then(response => (this.$router.go()))
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
    		}
    	},
});