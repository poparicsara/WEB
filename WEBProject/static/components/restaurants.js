Vue.component("restaurants", { 
	data: function () {
	    return {
	      restaurants: null
	    }
	},
	    template: ` 
        <div id="header">
                <img id="logo" src="images/logo.jpg">
                <input id="input" type="text" placeholder="Pretraži..." ari> 
                <button class="b" v-on:click = "logIn"> Prijava </button>
                <button class = "b" v-on:click = "registration"> Registracija</button>
            <hr>
           <h2>
               <label class="r"> <b> Restorani </b></label>
           </h2>
           <div class="restaurants" v-for="(r, index) in restaurants">
            <img class="restaurants" src =" "images/" + "{{r.image}}"" > <br>
           	<label class="title">{{r.name}} </label> <br>
           	<label>{{r.type}}</label> 
           </div>           
         </div>
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data))
    },
    methods: {
    	logIn : function() {
    		router.push(`/logIn/logIn`)
    	},
    	registration : function() {
    		router.push(`/registration`)
    	}
    },
});