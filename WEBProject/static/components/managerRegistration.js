Vue.component("managerRegistration", { 
	data: function () {
	    return {
	      managerRegistrationId : managerRegistration,
	      users : null,
	      user: {username: null, password: null, name: null, lastname: null, gender: '', date: ''}
	    }
	},
	    template: ` 
        <div id="registrationForm">
            <h1>Novi menadžer</h1>
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
    	`
    	,
    	mounted () {
        axios
          .get('rest/users/')
          .then(response => (this.users = response.data))
     	},
    	methods: {
    	addManager : function() {
    		var exists = false
    		for(oldUser of this.users){
    			if(this.user.username == oldUser.username){
    				exists = true
    				break
    			}
    		}
    		if(exists){
    			alert('Korisničko ime je zauzeto!')
    		}
    		else{
    			event.preventDefault();
    			axios.post('/rest/restaurants/addManager', this.user).
    			then(response => (router.push(`/managerRegistration/managerRegistration`)));
    		}
    	}
    },
});