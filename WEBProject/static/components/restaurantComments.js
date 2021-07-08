Vue.component("restaurantComments", { 
	data: function () {
	    return {
			comments: null,
			user: null,
			acceptedComments: null,
			allComments : null,
			username: ''
	    }
	},
	template: `
		<div>
			<div v-if="user.userType=='MANAGER'">
				<br/><br/><br/><br/>
	            <h1>Nasi komentari</h1>
	            <table border="1">
		                <tr>
		                	<th>Status</th>
		                	<th>Kupac</th>
		                    <th>Text</th>
		                    <th>Ocena</th>
		                    <th></th>
		                    <th></th>
		                </tr>
			            <tr v-for="(c, index) in comments">
			            	<td>{{c.status}}</td>
			            	<td>{{c.customer}}</td>
			                <td>{{c.text}}</td>
			                <td>{{c.grade}}</td>
			                <td>
			                	<button v-if="c.status == 'NONE'" v-on:click="accept(c)">Prihvati</button>
			                </td>
			                <td>
			                	<button v-if="c.status == 'NONE'" v-on:click="reject(c)">Odbij</button>
			                </td>
			            </tr>
		            </table>  
	    		</div>
	    	<div v-if="user.userType=='ADMIN'">
				<br/><br/><br/><br/>
	            <h1>Komentari</h1>
	            <table border="1">
		                <tr>
		                	<th>Status</th>
		                	<th>Kupac</th>
		                	<th>Restoran</th>
		                    <th>Text</th>
		                    <th>Ocena</th>
		                </tr>
			            <tr v-for="(c, index) in allComments">
			            	<td>{{c.status}}</td>
			            	<td>{{c.customer}}</td>
			            	<td>{{c.restaurant}}</td>
			                <td>{{c.text}}</td>
			                <td>{{c.grade}}</td>
			            </tr>
		            </table>  
	    		</div>
	    	<div v-if="username==''">
	    		<br/><br/><br/><br/>
	            <h1>Komentari</h1>
	            <table border="1">
		                <tr>
		                	<th>Kupac</th>
		                    <th>Text</th>
		                    <th>Ocena</th>
		                </tr>
			            <tr v-for="(c, index) in acceptedComments">
			            	<td>{{c.customer}}</td>
			                <td>{{c.text}}</td>
			                <td>{{c.grade}}</td>
			            </tr>
		            </table>  
	    	</div> 
	  	</div>
    	`
    	,
	mounted () {
		axios
        .get('rest/restaurantComments/')
        .then(response => (this.comments = response.data));
        axios
        .get('rest/loggedUser/')
        .then(response => (this.user = response.data));
        axios
        .get('rest/acceptedRestaurantComments/')
        .then(response => (this.acceptedComments = response.data));
        axios
        .get('rest/comments/')
        .then(response => (this.allComments = response.data));
        axios
        .get('rest/loggedInUser/')
        .then(response => (this.username = response.data));
    },
    
    methods: {
    
    	accept : function(comment){
    		axios
        	.post('rest/acceptComment/', comment)
        	.then(response => (this.$router.go()));
    	},
    	
    	reject : function(comment){
    		axios
        	.post('rest/rejectComment/', comment)
        	.then(response => (this.$router.go()));
    	}
    
    }

});