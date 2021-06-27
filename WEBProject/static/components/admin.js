Vue.component("admin", { 
	data: function () {
	    return {
	      restaurants: null
	    }
	},
	    template: ` 
        <div>
          <h1 class="header"> 
            <img id="logo" src="images/logo.jpg">
            <img id="admin" src="images/admin.png">
            <div class="dropdown">
                <button class="dropbtn">🠗</button>
                <div class="dropdown-content">
                  <a href="#">Profil</a>
                  <a href="#">Odjava</a>
                </div>
              </div>
        </h1>
        <hr>
        <h2 >
            <label id = "new"> <a href="#">+</a> </label>
            <button class="buttons"> Restorani </button>
            <button class="buttons"> Korisnici </button>
            <button class="buttons"> Komentari </button>
        </h2>
         </div>
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data))
    }
});