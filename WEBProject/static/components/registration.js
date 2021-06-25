Vue.component("registration", { 
	data: function () {
	    return {
	      registrationId : registration
	    }
	},
	    template: ` 
        <div id="registrationForm">
            <h1>Registracija</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" name="username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="text" name="password"><br/><br/>
                <label>Ime:</label><br/>
                <input class="input" type="text" name="name"><br/><br/>
                <label>Prezime:</label><br/>
                <input class="input" type="text" name="lastname"><br/><br/>
                <label>Pol:</label><br/>
                <select name="gender" id="gender">
                    <option value="male">muški</option>
                    <option value="female">ženski</option>
                </select><br/><br/>
                <label>Datum rođenja:</label><br/>
                <input class="input" type="date" name="dateOfBirth" value=" "><br/><br/><br/>
                <input id="submitRegistration" type="submit" value="Registruj se">
            </form>
        </div> 
    	`
    	,
});