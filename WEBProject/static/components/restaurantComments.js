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
	                	<th>Kupac</th>
	                    <th>Text</th>
	                    <th>Ocena</th>
	                </tr>
		            <tr v-for="(c, index) in comments">
		            	<td>{{c.customer}}</td>
		                <td>{{c.text}}</td>
		                <td>{{c.grade}}</td>
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

});