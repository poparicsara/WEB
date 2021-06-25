package services;


import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Restaurant;


public class RestaurantsService {

	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	
	Gson gson = new Gson();
	public List<Restaurant> getRestaurants() throws Exception{
	
	    Type listType = new TypeToken<ArrayList<Restaurant>>() {}.getType();
	    String json = readFileAsString("./static/restaurants.json");
		restaurants = gson.fromJson(json, listType);
		return restaurants;
	}
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readAllBytes(Paths.get(file)));
    }
}
