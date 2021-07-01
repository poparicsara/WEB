package services;


import java.io.FileWriter;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import beans.Restaurant;
import dto.UserDTO;
import enums.UserType;


public class RestaurantsService {
	
	Gson gson = new Gson();
	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	private List<Order> orders = new ArrayList<Order>();
	private List<Order> restaurantOrders = new ArrayList<Order>();
	private String ordersPath = "./static/orders.json";
	
	public List<Restaurant> getRestaurants() throws Exception{
	    Type listType = new TypeToken<ArrayList<Restaurant>>() {}.getType();
	    String json = readFileAsString("./static/restaurants.json");
		restaurants = gson.fromJson(json, listType);
		return restaurants;
	}
	
	public List<Order> getRestaurantOrders(String restaurantName) throws Exception {
		restaurantOrders = new ArrayList<Order>();
		for (Order order : getOrders()) {
			if(order.getRestaurant().getName().equals(restaurantName)) {
				restaurantOrders.add(order);
			}
		}
		return restaurantOrders;
	}
	
	private List<Order> getOrders() throws Exception {
		Type listType = new TypeToken<ArrayList<Order>>() {}.getType();
	    String json = readFileAsString(ordersPath);
		orders = gson.fromJson(json, listType);
		return orders;
	}
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
	public void addRestaurant(Restaurant restaurant) throws Exception {
		restaurants = getRestaurants();
		restaurants.add(restaurant);
		Writer writer = new FileWriter("./static/restaurants.json");
		gson.toJson(restaurants, writer);
		writer.close();
	}
	
	
	
	
	
}
