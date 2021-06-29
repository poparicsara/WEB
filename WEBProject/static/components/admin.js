Vue.component("admin", { 
	data: function () {
	    return {
	      restaurants: null,
	      adminID: admin,
	      object: null,
	      showManager: false,
	      showDeliverer: false,
	      showRestaurants: true,
	      showUsers: false,
	      users : null,
	      user: {username: null, password: null, name: null, lastname: null, gender: '', date: ''}
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
	         </div>
         </div> 
         <div v-if="this.showUsers" >
	          <div  class="restaurants" v-for="(u, index) in users">
	            <img class="restaurants" v-if="u.userType == 'MANAGER' " src = "images/manager.png" >
	            <img class="restaurants" v-else-if="u.userType == 'DELIVERER' " src = "images/deliverer.png" >
	            <img class="restaurants" v-else-if="u.userType == 'ADMIN' " src = "images/admin.png" >
	            <img class="restaurants" v-else="u.userType == 'CUSTOMER' " src = "images/customer.jpg" > 
	            <br>
	           	<label class="title">{{u.name}} {{u.lastname}} </label> <br>
	           	<label>Username: {{u.username}}</label> 
	         </div> 
         </div>   
              
           
         <div v-if="this.showManager" id="managerRegistration">
            <h1 class="manager">Novi menadžer</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" name="username" v-model = "user.username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="text" name="password" v-model = "user.password"><br/><br/>
                <label>Ime:</label><br/>
                <input class="input" type="text" name="name" v-model = "user.name"><br/><br/>
                <label>Prezime:</label><br/>
                <input class="input" type="text" name="lastname" v-model = "user.lastname"><br/><br/>
                <label>Pol:</label><br/>
                <select name="gender" id="gender"  v-model = "user.gender">
                    <option value="MALE">muški</option>
                    <option value="FEMALE">ženski</option>
                </select>
                <br/><br/>
                <label>Datum rođenja:</label><br/>
                <input class="input" type="date" name="dateOfBirth" value=" " v-model = "user.date"><br/><br/><br/>
                <input id="submitRegistration" type="submit" value="Dodaj" v-on:click = "addManager">
            </form>
        </div>       
         <div v-if="this.showDeliverer" id="managerRegistration">
            <h1 class="manager">Novi dostavljač</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" name="username" v-model = "user.username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="text" name="password" v-model = "user.password"><br/><br/>
                <label>Ime:</label><br/>
                <input class="input" type="text" name="name" v-model = "user.name"><br/><br/>
                <label>Prezime:</label><br/>
                <input class="input" type="text" name="lastname" v-model = "user.lastname"><br/><br/>
                <label>Pol:</label><br/>
                <select name="gender" id="gender"  v-model = "user.gender">
                    <option value="MALE">muški</option>
                    <option value="FEMALE">ženski</option>
                </select>
                <br/><br/>
                <label>Datum rođenja:</label><br/>
                <input class="input" type="date" name="dateOfBirth" value=" " v-model = "user.date"><br/><br/><br/>
                <input id="submitRegistration" type="submit" value="Dodaj" v-on:click = "addDeliverer">
            </form>
        </div>   
         </div>
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data)), 
       axios
          .get('rest/users/')
          .then(response => (this.users = response.data))
    },
    methods: {
    	logOut: function() {
    		if(confirm('Da li ste sigurni?')){
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
				document.getElementById("managerRegistration").focus()		
			}
			else if(this.object == 'DOSTAVLJAC'){
				this.showDeliverer = true
			}	
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
    	}
    },
});