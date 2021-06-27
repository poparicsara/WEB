Vue.component("logIn", { 
	data: function () {
	    return {
	      logInId : logIn,
	      users: null,
	      username: null,
	      password: null
	    }
	},
	    template: ` 
        <div id="logInForm">
            <h1>Prijava</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" v-model = "username" name="username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="password"  v-model = "password" name="password"><br/><br/><br/>
                <input id="submitLogIn" type="submit" v-on:click = "logIn" value="Prijavi se">
            </form>
            <a id="registrationLink" href="">Nemate nalog?</a>
        </div>	  
    	`
    	,
     mounted () {
        axios
          .get('rest/users/')
          .then(response => (this.users = response.data))
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
					alert('Welcome!')
					router.push(`/admin/admin`)
				}
				else{
					alert('Vas deo je jos uvek u doradi, pricekajte..')
				}
    		}
    		else{
    			alert('Uneseni su pogrešni kredencijali!')
    		}
    	}
    },
});