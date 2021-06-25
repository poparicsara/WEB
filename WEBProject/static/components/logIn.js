Vue.component("logIn", { 
	data: function () {
	    return {
	      id : -1
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
                <input id="submitLogIn" type="submit" value="Prijavi se">
            </form>
            <a id="registrationLink" href="">Nemate nalog?</a>
        </div>	  
    	`
    	,
});