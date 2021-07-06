Vue.component("profile", { 
	data: function () {
	    return {
			username: '',
			user: {username: '', password: '', name: '', lastname: '', gender: '', date: '', userType: ''},
			editUser: {oldUsername: '', username: '', password: '', name: '', lastname: '', gender: '', date: '', userType: ''},
	    	newPage: false
	    }
	},
	    template: `
	   	<div class="profileModal">
	        <div class="profileModalComponents">
	        		<h1 class="profileModalHeader">Profil</h1>
	        		<label class="profileModalLabel">Korisničko ime:</label><br/>
	        		<input class="profileModalInput" v-model="user.username" type="text"><br/><br/>
	        		<label class="profileModalLabel">Lozinka:</label><br/>
	        		<input class="profileModalInput" v-model="user.password" type="text"><br/><br/>
	        		<label class="profileModalLabel">Ime:</label><br/>
	        		<input class="profileModalInput" v-model="user.name" type="text"><br/><br/>
	        		<label class="profileModalLabel">Prezime:</label><br/>
	        		<input class="profileModalInput" v-model="user.lastname" type="text"><br/><br/>
	        		<label class="profileModalLabel">Pol:</label><br/>
	        		<select class="profileModalInput" v-model="user.gender" selected="user.gender">
	        			<option value="FEMALE">zenski</option>
	        			<option value="MALE">muski</option>		
	        		</select><br/><br/>
	        		<label class="profileModalLabel">Datum rodjenja:</label><br/>
	        		<input class="profileModalInput" v-model="user.date" type="date"><br/><br/>
	        		<button class="profileModalButton" v-on:click="saveProfileEdit">Sačuvaj</button>
			        <button class="profileModalButton" v-on:click="cancelProfileEdit">Odustani</button>
	        </div>
	    </div>
    	`
    	,
		mounted () {
          axios
          .get('rest/loggedInUser/')
          .then(response => (this.username = response.data));
         axios
         .get('rest/loggedUser/')
         .then(response => (this.user = response.data));
          
        },

        methods: {
    		saveProfileEdit : function() {
    			this.editUser.oldUsername = this.username;
    			this.editUser.username = this.user.username;
    			this.editUser.password = this.user.password;
    			this.editUser.name = this.user.name;
    			this.editUser.lastname = this.user.lastname;
    			this.editUser.gender = this.user.gender;
    			this.editUser.date = this.user.date;
    			this.editUser.userType = this.user.userType;
    			this.newPage = true;	
    			event.preventDefault();
    			axios
    			.post('/rest/editProfile/', this.editUser)
    			.then(response => (router.push(`/restaurant`)));
    		},
    		cancelProfileEdit : function() {
    			this.newPage = true		
	    		router.push(`/restaurant`);
    		}
        }
});