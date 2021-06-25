package services;

import java.net.URLDecoder;
import java.util.ArrayList;

import beans.Restaurant;

public class RestaurantsService {

	private ArrayList<Restaurant> restaurants = new ArrayList<>();
	
	public ArrayList<Restaurant> getRestaurants(){
		Restaurant r1 = new Restaurant();
		r1.setName("KFC");
		r1.setStatus(true);
		r1.setType("Brza hrana");
		@SuppressWarnings("deprecation")
		String image = URLDecoder.decode("KFC.jpg");
		r1.setImage(image);
		Restaurant r2 = new Restaurant();
		r2.setName("Tortilla Casa");
		r2.setStatus(true);
		r2.setType("Meksicka hrana");
		r2.setImage("images/tortillaCasa.jpg");
		restaurants.add(r1);
		restaurants.add(r2);
		return restaurants;
	}
}
