Vue.component("profile", { 
	data: function () {
	    return {
			username: '',
			user: {username: '', password: '', name: '', lastname: '', gender: '', date: '', userType: ''},
			editUser: {oldUsername: '', username: '', password: '', name: '', lastname: '', gender: '', date: '', userType: ''},
	    	newPage: false,
	    	users: null,
	    	customerType: ''
	    }
	},
	    template: `
	    <div>
	    	<div class="profileModalComponents" v-if="user.userType=='CUSTOMER'">
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
	        	<label class="profileModalLabel">Tip korisnika:</label><br/>
	        	<label class="profileModalLabel">{{customerType}}</label><br/>
	        	<br/><br/>
	        	<button class="editRestaurantItemButton" v-on:click="saveProfileEdit">Sačuvaj</button>
			    <button class="editRestaurantItemButton" v-on:click="cancelProfileEdit">Odustani</button>
			        
	    	</div>
	        <div class="profileModalComponents" v-else>
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
	        		<input class="profileModalInput" v-model="user.date" type="date"><br/><br/><br/><br/>
	        		<button class="editRestaurantItemButton" v-on:click="saveProfileEdit">Sačuvaj</button>
			        <button class="editRestaurantItemButton" v-on:click="cancelProfileEdit">Odustani</button>
			        
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
         axios
          .get('rest/users/')
          .then(response => (this.users = response.data))  
          axios
          .get('rest/customerType/')
          .then(response => (this.customerType = response.data))         
        },

        methods: {
    		saveProfileEdit : function() {
    			var exists = false
    			if(this.user.username != this.username){
	    			for(u of this.users){
	    				if(this.user.username == u.username){
	    					exists = true
	    					break
	    				}
	    			}
    			}
    			if(exists){
    				event.preventDefault();
    				alert('Korisničko ime je zauzeto!')
    			}
    			else{
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
	    			if(this.user.userType == 'MANAGER'){
	    				axios
	    				.post('/rest/editProfile/', this.editUser)
	    				.then(response => (router.push(`/restaurant`)));
	    			}
	    			else if(this.user.userType == 'ADMIN'){
	    				axios
	    				.post('/rest/editProfile/', this.editUser)
	    				.then(response => (router.push(`/admin`)));
	    			}
	    			else if(this.user.userType == 'CUSTOMER'){
	    				axios
	    				.post('/rest/editProfile/', this.editUser)
	    				.then(response => (router.push(`/customer`)));
	    			}
	    			else if(this.user.userType == 'DELIVERER'){
	    				axios
	    				.post('/rest/editProfile/', this.editUser)
	    				.then(response => (router.push(`/deliverer`)));
	    			} 			
       			}
    			
    		},
    		cancelProfileEdit : function() {
    			this.newPage = true		
    			if(this.user.userType == 'MANAGER'){
    				router.push(`/restaurant`);
    			}
    			else if(this.user.userType == 'ADMIN'){
    				router.push(`/admin`);
    			}
	    		else if(this.user.userType == 'CUSTOMER'){
	    			router.push('/customer');
	    		}
	    		else if(this.user.userType == 'DELIVERER'){
	    			router.push('/deliverer');
	    		}
    		}
        }
});