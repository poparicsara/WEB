Vue.component("logIn", { 
	data: function () {
	    return {
	      logInId : logIn,
	      users: null
	    }
	},
	    template: ` 
        <div id="logInForm">
            <h1>Prijava</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" name="username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="password" name="password"><br/><br/><br/>
                <input id="submitLogIn" type="submit" v-on:click = "logIn" value="Prijavi se">
            </form>
            <a id="registrationLink" href="">Nemate nalog?</a>
        </div>	  
    	`
    	,
     mounted () {
        axios
          .get('rest/users/')
          .then(response => (this.restaurants = response.data))
     },
     methods: {
    	logIn : function() {
    		
    		router.push(`/logIn/logIn`)
    	}
    },
});