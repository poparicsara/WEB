Vue.component("restaurant", { 
	data: function () {
	    return {
			items: null,
			addItem: false,
			item : {name: '', price: '', type: '', amount: '', description: ''}
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
	            <a href="">
                <div class="food">
                    <label class="foodName">{{i.name}}</label><br/><br/>
                    <label class="price">{{i.price}}</label>
                </div>
            </a>
	        </div>
	        <div class="addRestaurantItem" v-if="addItem">
	        	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	        	<span class="addItemClose" v-on:click="closeModal">&times;</span>
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
	                <br/><br/><br/>
	                <input id="submitAdding" type="submit" value="Sačuvaj" v-on:click="saveItem">
	                <input id="cancelAdding" type="submit" value="Odustani" v-on:click="cancelAdding">
	            </form>
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
	    	closeModal : function() {
	    		this.addItem = false
	    	},
	    	saveItem : function() {
	    		event.preventDefault();
    			axios
    			.post('/rest/restaurant/addItem', this.item)
	    	},
	    	cancelAdding : function() {
	    		this.addItem = false
	    		event.preventDefault();
				axios.post('/rest/restaurant/cancelAdding')
	    	}
    	},
});