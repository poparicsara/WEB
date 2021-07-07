Vue.component("logIn", { 
	data: function () {
	    return {
	      users: null,
	      username: null,
	      password: null,
	      restaurant: ''
	    }
	},
	    template: ` 
        <div id="logInForm">
            <h1 class="login">Prijava</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" v-model = "username" name="username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="password"  v-model = "password" name="password"><br/><br/><br/>
                <input id="submitLogIn" type="submit" v-on:click = "logIn" value="Prijavi se">
            </form>
            <a id="registrationLink" href="" v-on:click = "registration">Nemate nalog?</a>
        </div>	  
    	`
    	,
     mounted () {
        axios
          .get('rest/users/')
          .then(response => (this.users = response.data))
         ,
         axios
         	.get('rest/managerRestaurant/', this.username)
         	.then(response => (this.restaurant = response.data))
     },
    
     methods: {
    	logIn : function() {
    	    var exists = false
    		for(user of this.users){
    			if(user.username == this.username && user.password == this.password){
    				exists = true
    				break	
    			}
    		}    		
    		if(exists){
				if(user.userType.toString() == 'ADMIN'){
					event.preventDefault();
					axios.post('/rest/logingIn', this.username)
					.then(response => (router.push(`/admin`)));
				}
				else if(user.userType.toString() == 'MANAGER'){
					event.preventDefault();
					axios.post('/rest/logingIn', this.username)
					.then(response => (router.push(`/restaurant`)));
				}
				else if(user.userType.toString() == 'DELIVERER'){
					event.preventDefault();
					axios.post('/rest/logingIn', this.username)
					.then(response => (router.push(`/deliverer`)));
				}
				else{
					alert('Vas deo je jos uvek u doradi, pricekajte...')
				}
    		}
    		else{
    			alert('Uneseni su pogrešni kredencijali!')
    		}
    	},
    	registration : function() {
    		event.preventDefault();
			axios.post('/rest/logingIn', this.username, this.password)
			.then(response => (router.push(`/registration`)));
    	}
    },
});