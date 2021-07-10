Vue.component("customerOrder", { 
	data: function () {
	    return {
			items: null,
			addItem: false,
			item : {name: '', price: '', type: '', amount: '0', description: '', image: ''},
			selectedItem: false,
			edit : {oldName: '', name: '', price: '', type: '', amount: '', description: '', image: ''},
			order: {id: '', items : [], restaurantID : 0, date : null, price: 0, status: null, customerUsername: ''},
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
			itemsOrderedNumber: 0,
			itemNumber: [],
			itemsSet: false,
			showBasket: false,
			customers: null
	    }
	},
	    template: ` 
         <div>
        	<div id="restaurantHeader">
                <img id="logo" src="images/logo.jpg"> 
                <label class="r"> <b> {{restaurant.name}} </b></label>
               
            	<hr>
            </div>
            <h2>   
               <a href="#" v-on:click="showDetails"> Detaljniji prikaz restorana </a>  <br/>
               <button v-on:click="comments">Komentari</button>
                <div class="basket">   
                <label id = "new"> {{this.itemsOrderedNumber}} </label>                   
                <button class ="basket" v-on:click ="openBasket" > <img class="basket" src = "images/basket.jpg"> </button>  
                </div>
           	</h2>
        	<div class="restaurantItemGroup" v-for="(i, index) in items">
                <div class="restaurantItem">
                	<img :src = i.image><br/><br/>
                	<hr class="restaurantItemHR">
                    <label class="foodName"><b>{{i.name}}</b></label><br/><br/>
                    <label class="price">Cena: {{i.price}} RSD</label><br/>
                    <label v-if="i.type=='FOOD'">Kolicina: {{i.amount}} g</label>
                    <label v-if="i.type=='DRINK'">Kolicina: {{i.amount}} ml</label>
                    <br>
               		 <label id = "new"> <button v-on:click= "addItemToBasket(i, index)">+</button> </label>
               		 <label id = "new"> <button v-on:click= "removeItemFromBasket(i, index)">-</button> </label>
               		 <label id = "new"> Artikala: {{itemNumber[index]}} </label>
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
					<label class="restaurantItemLabels" >Adresa:</label><br/>
					<label class="restaurantItemInput" >{{restaurant.location.address.street}}  {{restaurant.location.address.number}}, {{restaurant.location.address.city}}</label>
					<br/><br/>
					<button class="restaurantItemInput" v-on:click="showLocation">Mapa:</button><br/>
					<div v-if="showMap" id="mapid">
					</div>
				</div>
       	   </div>
       	   <div v-if="showBasket" class="addRestaurantItem">
       	   		<div class="orderItemComponents">
       	   			<span class="addRestaurantItemClose" v-on:click="showBasket = false">&times;</span>
       	   			<div class="restaurantItemGroup" v-for="(i, index) in items">
		                <div class="restaurantItem" v-if="itemNumber[index] > 0">
		                	<img :src = i.image><br/><br/>
		                	<hr class="restaurantItemHR">
		                    <label class="foodName"><b>{{i.name}}</b></label><br/><br/>
		                    <label class="price">Cena: {{i.price}} RSD</label><br/>
		                    <label v-if="i.type=='FOOD'">Kolicina: {{i.amount}} g</label>
		                    <label v-if="i.type=='DRINK'">Kolicina: {{i.amount}} ml</label>
		                    <br>
		               		 <label id = "new"> <button v-on:click= "addItemToBasket(i, index)">+</button> </label>
		               		 <label id = "new"> <button v-on:click= "removeItemFromBasket(i, index)">-</button> </label>
		               		 <label id = "new"> Artikala: {{itemNumber[index]}} </label>
		                </div>
			        </div>
			        </br> </br>
			        <label id = "new"> Cena: {{order.price}}RSD </label>
			        </br> </br>	
			        <button class="restaurantItemButtons" v-on:click="createOrder"> Poruči </button>        
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
         .get('rest/customers/')
         .then(response => (this.customers = response.data));
          
        },
    	methods: {  
    		createOrder: function() {
    			this.order.restaurantID = this.restaurant.id
				this.order.customerUsername = this.username;
				for(c of this.customers){
					if(c.username == this.username){
						if(c.type != 'GVOZDENI'){
							alert('U vašu cenu biće uračunat i popust!')
						}
					}
				}
				axios
				.post('rest/sendOrder/', this.order)
				.then(response => (this.cleanBasket()));
				
    		},
    		cleanBasket: function(){
    			this.itemsOrderedNumber =  0;
				this.setItemNumber();
				this.showBasket = false;
				this.$router.go()
    		},
    		openBasket: function(){
    			this.showBasket = true
    		}, 
    		setItemNumber: function(){
    			for(let i = 0; i < this.items.length; i++){
    				this.itemNumber[i] = 0
    			}
    		},
    		removeItemFromBasket : function(item, index){
    			if(this.itemsOrderedNumber > 0){
    				if(this.itemNumber[index] > 0) {
		    			for(o in this.order.items){
		    				if(this.order.items[o].name == item.name){
		    					this.order.price -= item.price	
		    					this.order.items.splice(o, 1)
		    					break
		    				}
		    			}
		    			this.itemsOrderedNumber --
		    			this.itemNumber[index] --
		    			
	    			}
	    			else{
	    				alert('Nemate nijedan ovaj proizvod u korpi!')
	    			}
    			}
    			else{
    				alert('Nemate nijednu stavku u korpi!')
    			}
    			
    		},
    		addItemToBasket : function(item, index){
    			this.order.items.push(item)
    			this.itemsOrderedNumber ++
    			if(!this.itemsSet){
    				this.setItemNumber()
    				this.itemsSet = true
    			}
    			this.itemNumber[index] ++ 
    			this.order.price += item.price
    			
    		},
    		
    		closeDetails: function(){
    			this.details = false
    			alert(this.items.length)
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