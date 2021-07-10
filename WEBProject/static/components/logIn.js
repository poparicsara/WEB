Vue.component("logIn", { 
	data: function () {
	    return {
	      users: null,
	      username: null,
	      password: null,
	      restaurant: '',
	      manager: null
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
         	.then(response => (this.restaurant = response.data));
         			
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
    			
				
    			if(user.blocked === true){
    				event.preventDefault();
    				alert('Blokirani ste, nemate pristup svom profilu!');
    			}
    			else if(user.deleted === true){
    				event.preventDefault();
    				alert('Žao nam je, vaš profil je obrisan, nemate pristup njemu!');
    			}
				else if(user.userType.toString() == 'ADMIN'){
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
				else if(user.userType.toString() == 'CUSTOMER'){
					event.preventDefault();
					axios.post('/rest/logingIn', this.username)
					.then(response => (router.push(`/customer`)));
				}
    		}
    		else{
    			event.preventDefault();
    			alert('Uneseni su pogrešni kredencijali!')
    		}
    	},
    	isDeleted : function(){
    		var is;
    		event.preventDefault();
    		axios
			.post('/rest/manager/', this.username)
			.then(response => (is = response.data));
			return is;
    	},
    	registration : function() {
    		event.preventDefault();
			axios.post('/rest/logingIn', this.username, this.password)
			.then(response => (router.push(`/registration`)));
    	}
    },
});