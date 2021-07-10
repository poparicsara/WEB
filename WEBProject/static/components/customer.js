Vue.component("customer", { 
	data: function () {
	    return {
	      restaurants: null,
	      searchText: "",
	      searchOK: false,
	      sortName: false,
	      sortAddress: false,
	      sortDate: false,
	      sortPrice: false,
	      sortGrades: false,
	      currentSort:'name',
  		  currentSortDir:'asc',
  		  username: null,
  		  newPage: false,
  		  showRestaurants: true,
  		  showOrders: false,
  		  orders: null,
  		  comments: null,
  		  comment : {id : '', customer : '', restaurant : ' ', text : '', grade : 0, status: null},
  		  showComment: false,
  		  searchTextOrders: '',
  		  searchOKOrders: false,
  		  restaurantFilter: '',
  		  showFilteredRestaurants: false,
  		  searchPrice: false,
  		  searchDate: false,
  		  priceDomain: [],
  		  dateDomain: [],
  		  filterType: null,
  		  status: 'radi',
  		  filterOK: false,
  		  filterOrderOK: false,
  		  filterRestaurantType: null,
  		  filterStatus: null,
  		  notDeliveredOrders: false	
	    }
	 
	},
	    template: ` 
        <div id="restaurantHeader">
                <img id="logo" src="images/logo.jpg"> 
                 
                <div class="dropdown">
	           <button> <img id="adminImage" src="images/customer.jpg"> </button>
		               <div class="dropdown-content">
		                  <button v-on:click="customerProfile">Profil</button>
		                  <button v-on:click = "logOut">  Odjava</button>
		                </div>
	       		</div>               
            <hr>
           <h2>
                <label class="r"> <b> Restorani </b></label>
                <button class="buttonsCustomer" v-on:click="showAllRestaurants"> Restorani </button>
            	<button class="buttonsCustomer" v-on:click="showAllOrders"> Porudžbine </button>
           </h2>
           <div v-if="showRestaurants">
           <h3 class = "restaurantSort"> 
           		<input id="input" type="text" placeholder="Pretraži..." v-model="searchText" v-on:change = "searchRestaurants"> 
           		<br> <br> <br>
           		<div>
	           		<label> Sortiraj: </label>
	      			<button class="sort" v-on:click = "sort('name')"> Ime </button>
	      			<button class="sort" v-on:click = "sort('street')"> Lokacija </button>
	      			<button class="sort" v-on:click = "sort('grade')"> Ocena </button>
      			</div>
      			<br>
      			<div >
      				<label> Filtriraj: </label>
      				<select class="filter" name="type" v-model = "filterType">
      					<option value="all"> Svi </option>
	                    <option value="BURGERI">Burgeri</option>
	                    <option value="GYROS">Giros</option>
	                    <option value="ITALIJANSKA">Italijanska</option>
	                    <option value="KINESKA">Kineska</option>
	                    <option value="KOBASICE">Kobasice</option>
	                    <option value="KUVANA_JELA">Kuvana jela</option>
	                    <option value="MEKSICKA">Meksička</option>
	                    <option value="PALAČINKE">Palačinke</option>
	                    <option value="MORSKI_PLODOVI">Morski plodovi</option>
	                    <option value="ROŠTILJ">Roštilj</option>
	                    <option value="SENDVIČI">Sendviči</option>
	                    <option value="VEGE">Vege</option>
	                    <option value="TORTE_KOLAČI">Torte i kolači</option>
	                    <option value="FASTFOOD">Brza hrana</option>
	                </select>
	                <select class="filter" name="active" v-model = "status">
	                	<option value = 'radi'> Radi </option>
	                	<option value = 'neRadi'> Ne radi </option>
	                </select>
	                <button v-on:click = "filter"> <img id="filter" src="images/filter.png"> </button>
      			</div>
           </h3> 
           		<div v-if="searchOK">
           			  <div v-if="sortName">
           				<div v-for="r in sortedRestaurants"  v-on:click = "openRestaurant(r)"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
				    			<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    	<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else-if="sortAddress">
           			  	<div  v-for="r in sortedAddresses"  v-on:click = "openRestaurant(r)"> 
           					<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
				    		</div> 	   
           				</div>
           			  </div>
           			  <div v-else-if="sortGrades">
           			    <div v-for="r in sortedGrades"  v-on:click = "openRestaurant(r)">
		           			<div class="restaurants"  v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase) || rLower(r.location.address.city).includes(searchInLowerCase) || r.averageGrade == searchText">		           		               				
				       		    <img class="restaurants" :src = r.image > <br>
							    <label class="title">{{r.name}} </label> <br>
							    <label>{{r.type}}</label> <br>
							    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label><br>
						    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    	<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
						    </div>  
					     </div>
           			  </div>
           			  <div v-else>
	           			  <div v-for="(r, index) in restaurants" v-if="!r.deleted"  v-on:click = "openRestaurant(r)">
		           		    <div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCase) || rLower(r.type).includes(searchInLowerCase)">		           		    
		           		    	<img class="restaurants" :src = r.image > <br>
					      		<label class="title">{{r.name}} </label> <br>
					      		<label>{{r.type}}</label> <br>
					      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					      		<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    	<label v-if="r.status">Radi</label>
					  	 		<label v-if="!r.status">Ne radi</label>
					      	</div> 	
				      	 </div>
			       	</div>
			    </div>
           		<div v-else>
           			<div v-if="sortName">
           				<div class="restaurants" v-for="r in sortedRestaurants"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    <label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
           			<div v-else-if="sortAddress">
	           			<div class="restaurants" v-for="r in sortedAddresses"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    <label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
           			<div v-else-if="sortGrades">
	           			<div class="restaurants" v-for="r in sortedGrades"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label><br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
					    	<label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
           			<div v-else-if="filterOK">
           				 <div v-if="filterRestaurantType == 'all'">
	           				 <div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">
			           		     <div class="restaurants" v-if="r.status === filterStatus">
			           		    	<img class="restaurants" :src = r.image > <br>
						      		<label class="title">{{r.name}} </label> <br>
						      		<label>{{r.type}}</label> <br>
						      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
						      	 	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						      	 	<label v-if="r.status">Radi</label>
					  	 			<label v-if="!r.status">Ne radi</label>
						      	 </div> 	
					      	 </div>
					     </div>
				      	 <div v-else>
				      	 	<div v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">
					      	 	<div class="restaurants" v-if="r.type == filterRestaurantType && r.status === filterStatus">
			           		    	<img class="restaurants" :src = r.image > <br>
						      		<label class="title">{{r.name}} </label> <br>
						      		<label>{{r.type}}</label> <br>
						      		<label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
						      	 	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						      	 	<label v-if="r.status">Radi</label>
						      	 	<label v-if="!r.status">Ne radi</label>
						      	 </div> 
						     </div>
				      	 </div>
           			</div>
           			<div v-else>
	           			<div class="restaurants" v-for="(r, index) in restaurants"  v-on:click = "openRestaurant(r)">           				
			       		    <img class="restaurants" :src = r.image > <br>
						    <label class="title">{{r.name}} </label> <br>
						    <label>{{r.type}}</label> <br>
						    <label>Adresa: {{r.location.address.street}} {{r.location.address.number}}, {{r.location.address.city}} </label> <br>
					    	<label>Prosečna ocena: {{r.averageGrade}}</label> <br>
						    <label v-if="r.status">Radi</label>
					  	 	<label v-if="!r.status">Ne radi</label>
					    </div>  
           			</div>
			    </div>		
           </div>           
           <div v-else="showOrders">
           	
           	<input id="input" type="text" placeholder="Pretraži..." v-model="searchTextOrders" v-on:change = "searchOrders">
           	<br/><br/>
           		<select class="filter" name="type" v-model = "filterType">
      					<option value="all"> Svi </option>
	                    <option value="BURGERI">Burgeri</option>
	                    <option value="GYROS">Giros</option>
	                    <option value="ITALIJANSKA">Italijanska</option>
	                    <option value="KINESKA">Kineska</option>
	                    <option value="KOBASICE">Kobasice</option>
	                    <option value="KUVANA_JELA">Kuvana jela</option>
	                    <option value="MEKSICKA">Meksička</option>
	                    <option value="PALAČINKE">Palačinke</option>
	                    <option value="MORSKI_PLODOVI">Morski plodovi</option>
	                    <option value="ROŠTILJ">Roštilj</option>
	                    <option value="SENDVIČI">Sendviči</option>
	                    <option value="VEGE">Vege</option>
	                    <option value="TORTE_KOLAČI">Torte i kolači</option>
	                    <option value="FASTFOOD">Brza hrana</option>
	            </select>
	           	<select class="filter" name="type" v-model = "status">
      					<option value="all"> Svi </option>
	                    <option value="PROCESSING">OBRADA</option>
	                    <option value="PREPARATION">U PRIPREMI</option>
	                    <option value="WAITING">ČEKA DOSTAVLJAČA</option>
	                    <option value="TRANSPORT">TRANSPORT</option>
	                    <option value="DELIVERED">DOSTAVLJENA</option>
	                    <option value="CANCELED">OTKAZANA</option>
	            </select>

           	<button v-on:click="filterOrders">Filtriraj</button>
           	<br> <br>	
           	<div>
	           		<label> Sortiraj: </label>
	      			<button class="sort" v-on:click = "sort('name')"> Ime </button>
	      			<button class="sort" v-on:click = "sort('price')"> Cena </button>
	      			<button class="sort" v-on:click = "sort('date')"> Datum </button>
      			</div>	<br/><br/>
      		<button v-on:click="notDelivered">Nedostavljene porudžbine</button>
      		<button v-on:click="allCustomerOrders">Sve porudžbine</button>
         	<div v-if="searchOKOrders">
         		<div v-if="searchPrice">
					<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
		         		<div v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id">
		         			<div class="restaurants" v-if="priceDomain[0] <= o.price && o.price <= priceDomain[1] " >
								    <img class="restaurants" :src = r.image > <br>
									<label class="title">{{r.name}} </label> <br>
									<label>{{r.type}}</label> <br>
									<label>Artikli:</label>
									<div v-for="i in o.items">
										<label>{{i.name}} </label>
									</div>
									<label>Datum: {{o.date}} </label> <br>
									<label>Cena: {{o.price}} RSD</label> <br>
									<label>Status: {{o.status}} </label> <br> <br>
									<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
									<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
							</div>
						</div>
					</div>         		
         		</div>
         		<div v-else-if="searchDate">
					<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
		         		<div   v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id">
		         			<div class="restaurants" v-if="dateDomain[0] <= o.date && o.date <= dateDomain[1]" >
								    <img class="restaurants" :src = r.image > <br>
									<label class="title">{{r.name}} </label> <br>
									<label>{{r.type}}</label> <br>
									<label>Artikli:</label>
									<div v-for="i in o.items">
										<label>{{i.name}} </label>
									</div>
									<label>Datum: {{o.date}} </label> <br>
									<label>Cena: {{o.price}} RSD</label> <br>
									<label>Status: {{o.status}} </label> <br> <br>
									<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
									<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
							</div>
						</div>
					</div>
				</div>
				<div v-else>
					<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
		         		<div   v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id">
		         			<div class="restaurants" v-if="rLower(r.name).includes(searchInLowerCaseOrders)" >
								    <img class="restaurants" :src = r.image > <br>
									<label class="title">{{r.name}} </label> <br>
									<label>{{r.type}}</label> <br>
									<label>Artikli:</label>
									<div v-for="i in o.items">
										<label>{{i.name}} </label>
									</div>
									<label>Datum: {{o.date}} </label> <br>
									<label>Cena: {{o.price}} RSD</label> <br>
									<label>Status: {{o.status}} </label> <br> <br>
									<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
									<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div v-else-if="sortName">
				<div v-for="(r, index) in sortedRestaurants" >  
         		<div  class="restaurants" v-for="(o, index) in orders" v-if = "o.restaurantID == r.id && o.customerUsername == username">
					    <img class="restaurants" :src = r.image > <br>
						<label class="title">{{r.name}} </label> <br>
						<label>{{r.type}}</label> <br>
						<label>Artikli:</label>
						<div v-for="i in o.items">
							<label>{{i.name}} </label>
						</div>
						<label>Datum: {{o.date}} </label> <br>
						<label>Cena: {{o.price}} RSD</label> <br>
						<label>Status: {{o.status}} </label> <br> <br>
						<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
						<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
				</div>
				</div>
			</div>
			<div v-else-if="sortPrice">
				<div v-for="(o, index) in sortedPrices">  
         			<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.customerUsername == username && o.restaurantID == r.id">
					    <img class="restaurants" :src = r.image > <br>
						<label class="title">{{r.name}} </label> <br>
						<label>{{r.type}}</label> <br>
						<label>Artikli:</label>
						<div v-for="i in o.items">
							<label>{{i.name}} </label>
						</div>
						<label>Datum: {{o.date}} </label> <br>
						<label>Cena: {{o.price}} RSD</label> <br>
						<label>Status: {{o.status}} </label> <br> <br>
						<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
						<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
					</div>
				</div>
			</div>
			<div v-else-if="sortDate">
				<div v-for="(o, index) in sortedDates">  
         			<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.customerUsername == username && o.restaurantID == r.id">
					    <img class="restaurants" :src = r.image > <br>
						<label class="title">{{r.name}} </label> <br>
						<label>{{r.type}}</label> <br>
						<label>Artikli:</label>
						<div v-for="i in o.items">
							<label>{{i.name}} </label>
						</div>
						<label>Datum: {{o.date}} </label> <br>
						<label>Cena: {{o.price}} RSD</label> <br>
						<label>Status: {{o.status}} </label> <br> <br>
						<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
						<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
					</div>
				</div>
			</div>
			<div v-else-if="notDeliveredOrders">
				<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
         		<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id && o.status!='DELIVERED'">
					    <img class="restaurants" :src = r.image > <br>
						<label class="title">{{r.name}} </label> <br>
						<label>{{r.type}}</label> <br>
						<label>Artikli:</label>
						<div v-for="i in o.items">
							<label>{{i.name}} </label>
						</div>
						<label>Datum: {{o.date}} </label> <br>
						<label>Cena: {{o.price}} RSD</label> <br>
						<label>Status: {{o.status}} </label> <br> <br>
						<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
						<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
				</div>
			</div>
			</div>

			<div v-else-if="filterOrderOK">
				<div v-if="filterRestaurantType == 'all'">
					<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
	         			<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id && filterStatus == o.status">
						    <img class="restaurants" :src = r.image > <br>
							<label class="title">{{r.name}} </label> <br>
							<label>{{r.type}}</label> <br>
							<label>Artikli:</label>
							<div v-for="i in o.items">
								<label>{{i.name}} </label>
							</div>
							<label>Datum: {{o.date}} </label> <br>
							<label>Cena: {{o.price}} RSD</label> <br>
							<label>Status: {{o.status}} </label> <br> <br>
							<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
							<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
						</div>
					</div>
				</div>
				<div v-else-if="filterStatus == 'all'">
					<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
	         			<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id && r.type == filterRestaurantType">
						    <img class="restaurants" :src = r.image > <br>
							<label class="title">{{r.name}} </label> <br>
							<label>{{r.type}}</label> <br>
							<label>Artikli:</label>
							<div v-for="i in o.items">
								<label>{{i.name}} </label>
							</div>
							<label>Datum: {{o.date}} </label> <br>
							<label>Cena: {{o.price}} RSD</label> <br>
							<label>Status: {{o.status}} </label> <br> <br>
							<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
							<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
						</div>
					</div>
				</div>
				<div v-else>
					<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
	         			<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id && r.type == filterRestaurantType && filterStatus == o.status">
						    <img class="restaurants" :src = r.image > <br>
							<label class="title">{{r.name}} </label> <br>
							<label>{{r.type}}</label> <br>
							<label>Artikli:</label>
							<div v-for="i in o.items">
								<label>{{i.name}} </label>
							</div>
							<label>Datum: {{o.date}} </label> <br>
							<label>Cena: {{o.price}} RSD</label> <br>
							<label>Status: {{o.status}} </label> <br> <br>
							<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
							<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
						</div>
					</div>
				</div>
			<div v-else>
				<div v-for="(o, index) in orders" v-if = "o.customerUsername == username">  
         			<div  class="restaurants" v-for="(r, index) in restaurants" v-if="o.restaurantID == r.id">
					    <img class="restaurants" :src = r.image > <br>
						<label class="title">{{r.name}} </label> <br>
						<label>{{r.type}}</label> <br>
						<label>Artikli:</label>
						<div v-for="i in o.items">
							<label>{{i.name}} </label>
						</div>
						<label>Datum: {{o.date}} </label> <br>
						<label>Cena: {{o.price}} RSD</label> <br>
						<label>Status: {{o.status}} </label> <br> <br>
						<button class="cancelButton" v-on:click="cancelOrder(o)" v-if="o.status == 'PROCESSING'"> <img class="cancelButton" src="images/cancel.png"> </button>
						<button class="cancelButton" v-on:click="showCommentPage(o)"  v-if="o.status == 'DELIVERED'"> <img class="cancelButton" src="images/comment.png"> </button>
					</div>
				</div>
			</div>
			<div class="addRestaurantItem" v-if="showComment">
	        	<div class="addRestaurantItemComponents">
		        	<span class="addRestaurantItemClose" v-on:click="closeComment">&times;</span>
		        	<h1 class="addRestaurantHeader">Dodavanje komentara</h1>
		            <form>  
		                <label class="restaurantItemLabels">Komentar:</label><br/>
		                <input class="restaurantItemInput" type="text" name="name" v-model = "comment.text" required ><br/><br/>
		                <label class="restaurantItemLabels">Ocena:</label><br/>
		                <select name="itemType" v-model = "comment.grade" class="restaurantItemInput" selected="1">
		                    <option value="1">1</option>
		                    <option value="2">2</option>
		                    <option value="3">3</option>
		                    <option value="4">4</option>
		                    <option value="5">5</option>
		                </select><br/><br/>
		                <input class="restaurantItemButtons" type="submit" value="Pošalji" v-on:click="sendComment"><br/>
		            </form>
	            </div>
			</div>
		  </div>
         
    	`,
    mounted () {
        axios
          .get('rest/restaurants/')
          .then(response => (this.restaurants = response.data));
         axios
          .get('rest/loggedInUser/', this.username)
          .then(response => (this.username = response.data)); 
         axios
          .get('rest/orders/')
          .then(response => (this.orders = response.data));
         axios
          .get('rest/comments/')
          .then(response => (this.comments = response.data));
        
    },
     destroyed() {
     			if(!this.newPage){
	        		axios.post(`/rest/logOut`)
	    			.then(response => ('success'));
	    			  router.push(`/`);
    			 }    		
    },
    computed: {
    	
  		searchInLowerCase() {
    		return this.searchText.toLowerCase().trim();
  		},
  		searchInLowerCaseOrders() {
    		return this.searchTextOrders.toLowerCase().trim();
  		},
  		
  		sortedRestaurants: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
		      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
		      return 0;
    		});
  		},
  		sortedAddresses: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.location.address.street < b.location.address.street){
		      	return -1 * modifier;
		      } 
		      else if(a.location.address.street > b.location.address.street){
		      	return 1 * modifier;
		      }
		      else if(a.location.address.street == b.location.address.street){
		      	return (a.location.address.number - b.location.address.number) * modifier;
		      }
		      return 0;
    		});
  		},
  		sortedPrices: function() {
		    return this.orders.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.price < b.price){
		      	return -1 * modifier;
		      } 
		      else if(a.price > b.price){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
  		sortedDates: function() {
		    return this.orders.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.date < b.date){
		      	return -1 * modifier;
		      } 
		      else if(a.date > b.date){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
  		sortedGrades: function() {
		    return this.restaurants.sort((a,b) => {
		      let modifier = 1;
		      if(this.currentSortDir === 'desc') modifier = -1;
		      if(a.averageGrade < b.averageGrade){
		      	return -1 * modifier;
		      } 
		      else if(a.averageGrade > b.averageGrade){
		      	return 1 * modifier;
		      }
		      else {
		      	return 0;
		      }
		      
    		});
  		},
	},
    methods: {
    	logOut: function() {
    		if(confirm('Da li ste sigurni?')){
    			axios.post(`/rest/logOut`)
    			.then(response => (''));
    			router.push(`/`);
    		}	
    	},
    	cancelOrder : function(order){
    		if(confirm('Da li ste sigurni da otkazujete porudžbinu?')){
    			axios
		          .post('rest/cancelOrder/', order)
		          .then(response => (alert('Uspešno otkazana narudžbina')));
    		}	
    	},
    	showAllRestaurants : function(){
    		this.showRestaurants = true
    		this.showOrders = false
    	},
    	showAllOrders : function(){
    		this.showOrders = true
    		this.showRestaurants = false
    	},
    	rLower : function(item) {
  			return item.toLowerCase()
  		},
  		sort: function(s) {
  		 this.filterOK = false
		    if(s === this.currentSort) {
		      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
		    }
		    this.currentSort = s;
		   
		    if(s == 'street'){
		    	 this.sortAddress = true;
		    	 this.sortName = false;
		    	 this.sortDate = false;
		    	 this.sortPrice = false;
		         this.sortGrades = false;
		    	 
		    }
		    else if(s == 'name'){
		    	 this.sortName = true;
		    	 this.sortAddress = false;
		    	 this.sortDate = false;
		    	 this.sortPrice = false;
		    	 this.sortGrades = false;
		    	 
		    }
		    else if(s == 'date'){
		    	 this.sortName = false;
		    	 this.sortAddress = false;
		    	 this.sortDate = true;
		    	 this.sortPrice = false;
		    	 this.sortGrades = false;
		    	 
		    }
		    else if(s == 'price'){
		    	this.sortName = false;
		    	 this.sortAddress = false;
		    	 this.sortDate = false;
		    	 this.sortPrice = true;
		    	 this.sortGrades = false;
		    }
		    else {
		    	 this.sortGrades = true;
		    	 this.sortAddress = false;
		    	 this.sortName = false;
		    	 this.sortDate = false;
		    	 this.sortPrice = false;
		    }
		   
		},
		openRestaurant : function(restaurant) {
			this.newPage = true
			event.preventDefault();
			axios.post('rest/showRestaurant/', restaurant.id)
			.then(response => (router.push(`/customerOrder`)));
		},
		filter : function() {
			this.sortAddress = false;
			this.sortName = false;
			this.sortGrades = false;
			this.filterOK = true
			this.filterRestaurantType = this.filterType
			if(this.status == 'radi'){
				this.filterStatus = true
			}
			else{
				this.filterStatus = false	
			}
			
		},
		filterOrders : function() {
			this.sortName = false;
			this.sortGrades = false;
			this.filterRestaurantType = this.filterType
			this.filterStatus = this.status
			if(this.filterRestaurantType == 'all' && this.filterStatus == 'all'){
				this.filterOrderOK = false
			}
			else{
				this.filterOrderOK = true
			}
			
		},
		
    	searchRestaurants : function(){
    		this.filterOK = false
    		if(this.searchText === ""){
    			this.searchOK = false
    		}
   			else{
   				this.searchOK = true
   			}   		
    	},
  
    	searchOrders : function() {
    		this.filterOrderOK = false
    		if(this.searchTextOrders === ""){
    			this.searchOKOrders = false
    		}
   			else{
   				this.searchOKOrders = true
   				let regexPrice = new RegExp('[0-9]+-[0-9]+');
   				let regexDate = new RegExp('[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}-[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}');
   				if(regexPrice.test(this.searchTextOrders)){   				
   					this.priceDomain = this.searchTextOrders.split("-")
   					this.searchPrice = true
   					this.searchDate = false
   				}
   				else{
   				
   					this.searchDate = false
   					this.searchPrice = false
   				}
   				
   			}  
    	},
    	
    	sendComment:function(){
    		event.preventDefault();
    		axios.post('rest/addComment/', this.comment)
			.then(response => (alert('Komentar poslat na recenziju!')));
			this.showComment = false
    	},
    	closeComment: function(){
    		this.showComment = false
    	},
    	customerProfile : function() {
    		this.newPage = true	
	    	router.push(`/profile`);
    	},
    	checkRestaurantType: function(order){
  			var exists = false
  			for(r of this.restaurants){
  				if(r.name == order.restaurantName){
  					if(r.type == this.filterType){
  						exists = true
  					}
  				}
  			}
  			return exists
  		},
    	showCommentPage : function(order){
    		var exists = false
    		for(c of this.comments){
    			if(c.id == order.id){
    				exists = true;
    				break;
    			}
    		}
    		if(exists){
    			alert('Već ste dali komentar za ovu narudžbinu!' + this.username)
    			
    		}
    		else{
    			this.comment.id = order.id
    			this.comment.restaurant = order.restaurantID
    			this.comment.customer = this.username
    			alert(this.comment.customer)
    			this.showComment = true
    		}
    	},
    	filterRestaurants : function() {
    		this.showFilteredRestaurants = true;
    	},
    	notDelivered : function(){
    		this.notDeliveredOrders = true;
    	},
    	allCustomerOrders : function() {
    		this.notDeliveredOrders = false;
    	}
    },
});