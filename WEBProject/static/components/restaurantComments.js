Vue.component("restaurantComments", { 
	data: function () {
	    return {
			comments: null
	    }
	},
	template: `
		<div>
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
    	`
    	,
	mounted () {
		axios
        .get('rest/restaurantComments/')
        .then(response => (this.comments = response.data));
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