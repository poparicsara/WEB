package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;

import beans.Customer;
import dto.UserDTO;
import services.CustomerService;
import services.RestaurantsService;
import services.UserService;

public class Main {
	
	private static Gson g = new Gson();
	private static RestaurantsService restaurantsService = new RestaurantsService();
	private static UserService userService = new UserService();
	private static CustomerService customerService = new CustomerService();

	public static void main(String[] args) throws Exception{
		port(8080);

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
		
	}

}
