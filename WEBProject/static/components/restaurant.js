Vue.component("restaurant", { 
	data: function () {
	    return {
			items: null,
			addItem: false,
			item : {name: '', price: '', type: '', amount: '', description: '', image: null},
			selectedItem: false,
			edit : {oldName: '', name: '', price: '', type: '', amount: '', description: '', image: null},
	    }
	},
	    template: ` 
	    <div>
	        <h1>Ime restorana</h1>
	        <input type="text" name="search" id="search" placeholder="Pretraži...">
	        <br/><br/>
	        <button v-on:click = "orders">Porudzbine</button>
	        <br/><br/>
	        <button v-on:click = "customers">Kupci</button>
	        <br/><br/>
	        <button v-on:click = "addRestaurantItem">Dodaj artikal</button>
	        <br/><br/>
	        <div id="restaurantFood" v-for="(i, index) in items">
	            <a v-on:click="itemClicked(i)">
                <div class="food">
                	<img :src = i.image><br/><br/>
                    <label class="foodName"><b>{{i.name}}</b></label><br/>
                    <label class="price">Cena: {{i.price}} RSD</label><br/>
                    <label v-if="i.type=='FOOD'">Kolicina: {{i.amount}} g</label>
                    <label v-if="i.type=='DRINK'">Kolicina: {{i.amount}} ml</label>
                </div>
            </a>
	        </div>
	        <div class="addRestaurantItem" v-if="addItem">
	        	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	        	<span class="addItemClose" v-on:click="closeAdding">&times;</span>
	        	<h1>Dodavanje novog artikla</h1>
	            <form>
	                <br/>
	                <label>Naziv artikla:</label><br/>
	                <input class="input" type="text" name="name" v-model = "item.name"><br/><br/>
	                <label>Cena:</label><br/>
	                <input class="input" type="text" name="price" v-model = "item.price"><br/><br/>
	                <label>Tip:</label><br/>
	                <select name="itemType" id="itemType" v-model = "item.type">
	                    <option value="FOOD">hrana</option>
	                    <option value="DRINK">piće</option>
	                </select><br/><br/>
	                <label>Kolicina:</label><br/>
	                <input class="input" type="text" name="amount" v-model = "item.amount"><br/><br/>
	                <label>Opis:</label><br/>
	                <input class="input" type="text" name="description" v-model = "item.description"><br/><br/>
	                <form action="/action_page.php" >
                  		<input v-model = "item.image" type="file" id="image" name="image" accept="image/*">
                	</form>
	                <br/><br/><br/>
	                <input id="submitAdding" type="submit" value="Sačuvaj" v-on:click="saveItem">
	                <input id="cancelAdding" type="submit" value="Odustani" v-on:click="cancelAdding">
	            </form>
	        </div>
	        <div class="selectedRestaurantItem" v-if="selectedItem">
	        	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	        	<span class="selectedRestaurantItemClose" v-on:click="closeItem">&times;</span>
	        	<label>Naziv:</label><br/>
	        	<input type="text" v-model="edit.name"></input><br/>
	        	<label>Cena:</label><br/>
	        	<input type="text" v-model="edit.price"></input><br/>
	        	<label>Tip:</label><br/>
	        	<select v-model="edit.type" selected="edit.type">
	        		<option value="FOOD">hrana</option>
	        		<option value="DRINK">pice</option>
	        	</select><br/>
	        	<label>Kolicina:</label><br/>
	        	<input type="text" v-model="edit.amount"></input><br/>
	        	<label>Opis:</label><br/>
	        	<input type="text" v-model="edit.description"></input><br/>
	        	<button v-on:click="saveEditing">Sacuvaj</button>
	        	<button v-on:click="cancelEditing">Odustani</button>
	        </div>
        </div>
    	`
    	,
		mounted () {
        axios
          .get('rest/restorauntItems/')
          .then(response => (this.items = response.data))
     	}
    	,
    	methods: {
	    	orders : function() {
	    		router.push(`/restaurantOrders`);
	    	},
	    	customers : function() {
	    		router.push(`/restaurantCustomers`)
	    	},
	    	addRestaurantItem : function() {
	    		this.addItem = true
	    	},
	    	closeAdding : function() {
	    		this.addItem = false
	    	},
	    	saveItem : function() {
	    		let array = this.item.image.split("\\")
            	this.item.image = "images/items/" + array[2]
	    		event.preventDefault()
    			axios
    			.post(`/rest/addItemToRestaurant/`, this.item)
    			.then(response => (this.$router.go()))
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
	    		this.selectedItem = false
	    		event.preventDefault()
	    		axios.post(`/rest/editRestaurantItem/`, this.edit)
    			.then(response => (this.$router.go()))
	    	}
    	},
});