package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Customer;
import beans.User;
import dto.UserDTO;
import enums.Gender;
import enums.UserType;
import services.CustomerService;
import services.RestaurantsService;
import services.UserService;

public class Main {
	
	private static Gson g = new Gson();
	private static ArrayList<User> users = new ArrayList<User>();
	private static RestaurantsService restaurantsService = new RestaurantsService();
	private static UserService userService = new UserService();
	private static CustomerService customerService = new CustomerService();

	public static void main(String[] args) throws Exception{
		port(8080);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("rest/restaurants/", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantsService.getRestaurants());
		});
		
		get("rest/users/", (req, res) ->{
			res.type("application/json");
			User admin = new User();
			admin.setName("Ognjen");
			admin.setLastname("Bogdanovic");
			admin.setPassword("bbogi1219");
			admin.setUsername("ogijah");
			admin.setGender(Gender.MALE);
			admin.setUserType(UserType.ADMIN);
			users.add(admin);
			return g.toJson(users);
		
		});
		
		post("rest/restaurants/addCustomer", (req, res) -> {
			res.type("application/json");
			UserDTO user = g.fromJson(req.body(), UserDTO.class);
			userService.addUser(user);
			return "SUCCESS";
		});

	}

}
