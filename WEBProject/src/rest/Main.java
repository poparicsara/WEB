package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;

import dto.EditItemDTO;
import dto.ItemDTO;
import dto.UserDTO;
import services.ItemsService;
import services.ManagerService;
import services.RestaurantsService;
import services.UserService;

public class Main {
	
	private static Gson g = new Gson();
	private static RestaurantsService restaurantsService = new RestaurantsService();
	private static UserService userService = new UserService();
	private static ItemsService itemsService = new ItemsService();
	private static ManagerService managerService = new ManagerService();

	public static void main(String[] args) throws Exception{
		port(80);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		//bio je GET OVDE
		get("rest/restaurants/", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantsService.getRestaurants());
		});
		
		get("rest/users/", (req, res) ->{
			res.type("application/json");
			return g.toJson(userService.getUsers());	
		});
		
		post("rest/restaurants/addCustomer", (req, res) -> {
			res.type("application/json");
			UserDTO user = g.fromJson(req.body(), UserDTO.class);
			userService.addUser(user);
			return "SUCCESS";
		});
		
		post("rest/restaurants/addManager", (req, res) -> {
			res.type("application/json");
			UserDTO user = g.fromJson(req.body(), UserDTO.class);
			userService.addManager(user);
			return "SUCCESS";
		});
		
		post("rest/restaurants/addDeliverer", (req, res) -> {
			res.type("application/json");
			UserDTO user = g.fromJson(req.body(), UserDTO.class);
			userService.addDeliverer(user);
			return "SUCCESS";
		});
		
		post("rest/users/admin", (req, res) -> {
			res.type("application/json");
			return "SUCCESS";
		});
		
		post("rest/logingIn", (req, res) -> {
			res.type("application/json");
			return "SUCCESS";
		});
		
		get("rest/restorauntItems/", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantsService.getRestaurantItems(101));
		});
		
		get("rest/managerRestaurant/", (req, res) -> {
			res.type("application/json");
			String username = g.fromJson(req.body(), String.class);
			return g.toJson(managerService.getManegerRestaurant(username));
		});
		
		get("rest/restaurantOrders/", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantsService.getRestaurantOrders("KFC"));
		});
		
		get("rest/userFullName/", (req, res) -> {
			res.type("application/json");
			String username = g.fromJson(req.body(), String.class);
			return g.toJson(userService.getUserFullName(username));
		});
		
		
		post("/rest/addItemToRestaurant/", (req, res) -> {
			res.type("application/json");
			ItemDTO item = g.fromJson(req.body(), ItemDTO.class);
			restaurantsService.addItemToRestaurant(item);
			return "SUCCESS";
		});
		
		post("/rest/restaurant/cancelAdding/", (req, res) -> {
			res.type("application/json");
			return "SUCCESS";
		});
		
		post("/rest/editRestaurantItem/", (req, res) -> {
			res.type("application/json");
			EditItemDTO item = g.fromJson(req.body(), EditItemDTO.class);
			restaurantsService.editRestaurantItem(item);
			return "SUCCESS";
		});

	}

}
