package rest;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import javax.print.attribute.standard.JobOriginatingUserName;

import com.google.gson.Gson;

import beans.OrderRequest;
import dto.EditItemDTO;
import dto.EditUserDTO;
import dto.ItemDTO;
import dto.ManagerDTO;
import dto.OrderDTO;
import dto.UserDTO;
import services.ManagerService;
import services.OrderService;
import services.RestaurantsService;
import services.UserService;




public class Main {
	
	private static Gson g = new Gson();
	private static RestaurantsService restaurantsService = new RestaurantsService();
	private static UserService userService = new UserService();
	private static ManagerService managerService = new ManagerService();
	private static OrderService orderService = new OrderService();
	private static String loggedInUser = "";
	private static int ID = -1;

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
			managerService.addManager(user);
			return "SUCCESS";
		});
		
		post("rest/restaurants/addDeliverer", (req, res) -> {
			res.type("application/json");
			UserDTO user = g.fromJson(req.body(), UserDTO.class);
			userService.addDeliverer(user);
			return "SUCCESS";
		});
		
		post("rest/restaurants/addRestaurant", (req, res) -> {
			res.type("application/json");
			ManagerDTO managerDTO = g.fromJson(req.body(), ManagerDTO.class);
			restaurantsService.addRestaurant(managerDTO.getRestaurant());
			managerService.updateManager(managerDTO);
			return "SUCCESS";
		});
		
		post("rest/users/admin", (req, res) -> {
			res.type("application/json");
			return "SUCCESS";
		});
		
		post("rest/logingIn", (req, res) -> {
			res.type("application/json");
			loggedInUser = g.fromJson(req.body(), String.class);
			return "SUCCESS";
		});
		
		post("rest/logOut", (req, res) -> {
			res.type("application/json");
			loggedInUser = "";
			ID = -1;
			return "SUCCESS";
		});
		
		get("rest/restorauntItems/", (req, res) -> {
			res.type("application/json");
			if(!loggedInUser.isEmpty()) {
				ID = managerService.getRestaurantID(loggedInUser);
			}
			return g.toJson(restaurantsService.getRestaurantItems(ID));
		});
		
		get("rest/loggedInUser/", (req, res) -> {
			res.type("application/json");
			return g.toJson(loggedInUser);
		});
		
		post("rest/showRestaurant/", (req, res) -> {
			res.type("application/json");
			ID = g.fromJson(req.body(), int.class);
			return "SUCCESS";
					
		});
		
		get("rest/managerRestaurant/", (req, res) -> {
			res.type("application/json");
			return g.toJson(managerService.getManagerRestaurant(loggedInUser));
		});
		
		get("rest/restaurantOrders/", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantsService.getRestaurantOrders(ID));
		});
		
		get("rest/userFullName/", (req, res) -> {
			res.type("application/json");
			String username = g.fromJson(req.body(), String.class);
			return g.toJson(userService.getUserFullName(username));
		});
		
		post("/rest/addItemToRestaurant/", (req, res) -> {
			res.type("application/json");
			ItemDTO item = g.fromJson(req.body(), ItemDTO.class);
			restaurantsService.addItemToRestaurant(item, ID);
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

		get("rest/managers/",(req, res) ->{
			res.type("application/json");
			return g.toJson(managerService.getManagers());
		});
		
		post("/rest/changeOrderStatus/", (req, res) -> {
			res.type("application/json");
			OrderDTO order = g.fromJson(req.body(), OrderDTO.class);
			restaurantsService.changeOrderStatus(order);
			return "SUCCESS";
		});
		
		get("rest/loggedUser/",(req, res) ->{
			res.type("application/json");
			UserDTO user = userService.getLoggedUser(loggedInUser);
			return g.toJson(user);
		});
		
		post("/rest/editProfile/", (req, res) -> {
			res.type("application/json");
			EditUserDTO user = g.fromJson(req.body(), EditUserDTO.class);
			userService.editUser(user);
			loggedInUser = user.getUsername();
			return "SUCCESS";
		});
		
		get("rest/deliverersOrders/",(req, res) ->{
			res.type("application/json");
			return g.toJson(orderService.getOrdersForDeliverers());
		});
		
		post("/rest/sendOrderRequest/", (req, res) -> {
			res.type("application/json");
			OrderRequest request = g.fromJson(req.body(), OrderRequest.class);
			orderService.addOrderRequest(request);
			return "SUCCESS";
		});
		
		post("/rest/orderRequests/",(req, res) ->{
			res.type("application/json");
			OrderDTO order = g.fromJson(req.body(), OrderDTO.class);
			return g.toJson(orderService.getOrderRequests(order));
		});
		
		post("/rest/acceptOrderRequest/",(req, res) ->{
			res.type("application/json");
			OrderRequest request = g.fromJson(req.body(), OrderRequest.class);
			orderService.acceptOrderRequest(request);
			return "SUCCESS";
		});
		
		post("/rest/rejectOrderRequest/",(req, res) ->{
			res.type("application/json");
			OrderRequest request = g.fromJson(req.body(), OrderRequest.class);
			orderService.rejectOrderRequest(request);
			return "SUCCESS";
		});
		
		get("/rest/requests/",(req, res) ->{
			res.type("application/json");
			return g.toJson(orderService.getRequests());
		});
		
		get("rest/delivererOrders/",(req, res) ->{
			res.type("application/json");
			return g.toJson(orderService.getDelivererOrders(loggedInUser));
		});
		
		get("rest/delivererNotDeliveredOrders/",(req, res) ->{
			res.type("application/json");
			return g.toJson(orderService.getDelivererNotDeliveredOrders(loggedInUser));
		});
		
		post("/rest/setOrderToDelivered/",(req, res) ->{
			res.type("application/json");
			OrderDTO order = g.fromJson(req.body(), OrderDTO.class);
			orderService.setOrderToDelivered(order);
			return "SUCCESS";
		});
		
	}

}
