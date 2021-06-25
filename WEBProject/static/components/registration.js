Vue.component("registration", { 
	data: function () {
	    return {
	      registrationId : registration,
	      customer: {username: null, password: null, name: null, lastname: null, gender: null}
	    }
	},
	    template: ` 
        <div id="registrationForm">
            <h1>Registracija</h1>
            <form>
                <br/>
                <label>Korisničko ime:</label><br/>
                <input class="input" type="text" name="username" v-model = "customer.username"><br/><br/>
                <label>Lozinka:</label><br/>
                <input class="input" type="text" name="password" v-model = "customer.password"><br/><br/>
                <label>Ime:</label><br/>
                <input class="input" type="text" name="name" v-model = "customer.name"><br/><br/>
                <label>Prezime:</label><br/>
                <input class="input" type="text" name="lastname" v-model = "customer.lastname"><br/><br/>
                <label>Pol:</label><br/>
                <select name="gender" id="gender"  v-model = "customer.gender">
                    <option value="male">muški</option>
                    <option value="female">ženski</option>
                </select><br/><br/>
                <label>Datum rođenja:</label><br/>
                
                <input id="submitRegistration" type="submit" value="Registruj se" v-on:click = "addCustomer">
            </form>
        </div> 
    	`
    	,
    	methods: {
    	addCustomer : function() {
    		event.preventDefault();
    		axios.post('/rest/restaurants/addCustomer', this.customer).
    		then(response => (router.push(`/`)));
    	}
    },
});