Vue.component("restaurantCustomers", { 
	data: function () {
	    return {

	    }
	},
	    template: `
	   	<div class="ordersGroup"> 
	   		<div>
           		<h1>Naši kupci</h1>
           	</div>
           	<table border="1" class="restaurantOrders">
               <tr>
                   <th>Korisničko ime</th>
                   <th>Ime i prezime</th>
                   <th>Broj porudžbina</th>
               </tr>
               <tr>
                   <td>sara</td>
                   <td>Sara Poparic</td>
                   <td>5</td>
               </tr>
           	</table>
		</div>
    	`
    	,

});