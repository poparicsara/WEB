Vue.component("restaurant", { 
	data: function () {
	    return {
			items: null
	    }
	},
	    template: ` 
	    <div>
	        <h1>Ime restorana</h1>
	        <input type="text" name="search" id="search" placeholder="Pretraži...">
	        <br/><br/>
	        <button v-on:click = "orders">Porudzbine</button>
	        <br/><br/>
	        <div id="restaurantFood" v-for="(i, index) in items">
	            <a href="">
                <div class="food">
                    <label class="foodName">{{i.name}}</label><br/><br/>
                    <label class="price">{{i.price}}</label>
                </div>
            </a>
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
    		router.push(`/orders`);
    	}
    },
});