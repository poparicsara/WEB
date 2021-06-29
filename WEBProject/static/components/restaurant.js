Vue.component("manager", { 
	data: function () {
	    return {
			restaurantID: restaurant
	    }
	},
	    template: ` 
        <h1>Ime restorana</h1>
        <input type="text" name="search" id="search" placeholder="Pretraži...">
        <br/><br/>
        <div id="restaurantFood">
            <a href="">
                <div class="food">
                    <label class="foodName">Jelo 1</label><br/><br/>
                    <label class="price">Cena</label>
                </div>
            </a>
            <a href="">
                <div class="food">
                    <label class="foodName">Jelo 2</label><br/><br/>
                    <label class="price">Cena</label>
                </div>
            </a>
            <a href="">
                <div class="food">
                    <label class="foodName">Jelo 3</label><br/><br/>
                    <label class="price">Cena</label>
                </div>
            </a>
            <a href="">
                <div class="food">
                    <label class="foodName">Jelo 3</label><br/><br/>
                    <label class="price">Cena</label>
                </div>
            </a>
        </div>
    	`
    	,

});