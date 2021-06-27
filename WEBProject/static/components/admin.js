Vue.component("admin", { 
	data: function () {
	    return {
	      restaurants: null,
	      adminID: admin
	    }
	},
	    template: ` 
        <div>
          <h1 class="admin"> 
            <img id="adminLogo" src="images/logo.jpg">
            <img id="admin" src="images/admin.png">
            <div class="dropdown">
                <button class="dropbtn">🠗</button>
                <div class="dropdown-content">
                  <button>Profil</button>
                  <button v-on:click = "logOut">Odjava</button>
                </div>
              </div>
        </h1>
        <hr class="admin">
        <h2 >
            <label id = "new"> <a href="#">+</a> </label>
            <button class="buttons"> Restorani </button>
            <button class="buttons"> Korisnici </button>
            <button class="buttons"> Komentari </button>
        </h2>
         <div class="restaurants" v-for="(r, index) in restaurants">
            <img class="restaurants" :src = r.image > <br>
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
    	logOut: function() {
    		if(confirm('Da li ste sigurni?')){
    			router.push(`/`);
    		}
    		
    	}
    },
});