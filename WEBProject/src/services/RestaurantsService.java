package services;


import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import beans.OrderDTO;
import beans.Restaurant;
import enums.OrderStatus;


public class RestaurantsService {
	
	Gson gson = new Gson();
	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	private List<Order> orders = new ArrayList<Order>();
	private List<OrderDTO> restaurantOrders = new ArrayList<OrderDTO>();
	private UserService userService = new UserService();
	private String ordersPath = "./static/orders.json";
	
	public List<Restaurant> getRestaurants() throws Exception{
	    Type listType = new TypeToken<ArrayList<Restaurant>>() {}.getType();
	    String json = readFileAsString("./static/restaurants.json");
		restaurants = gson.fromJson(json, listType);
		return restaurants;
	}
	
	public List<OrderDTO> getRestaurantOrders(String restaurantName) throws Exception {
		restaurantOrders = new ArrayList<OrderDTO>();
		for (Order order : getOrders()) {
			if(order.getRestaurant().getName().equals(restaurantName)) {
				restaurantOrders.add(setOrder(order));
			}
		}
		return restaurantOrders;
	}
	
	private OrderDTO setOrder(Order o) throws Exception {
		OrderDTO order = new OrderDTO();
		order.setDate(o.getDate());
		order.setId(o.getId());
		order.setItems(o.getItems());
		order.setPrice(Double.toString(o.getPrice()) + " RSD");
		order.setRestaurant(o.getRestaurant());
		order.setStatus(setOrderStatus(o.getStatus()));
		order.setCustomerFullName(userService.getUserFullName(o.getCustomerUsername()));
		return order;
	}
	
	private String setOrderStatus(OrderStatus s) {
		String status = "";
		if(s == OrderStatus.PROCESSING) {
			return "OBRADA";
		} else if (s == OrderStatus.PREPARATION) {
			return "U PRIPREMI";
		} else if (s == OrderStatus.WAITING) {
			return "ČEKA DOSTAVLJAČA";
		} else if (s == OrderStatus.TRANSPORT) {
			return "U TRANSPORTU";
		} else if(s == OrderStatus.DELIVERED) {
			return "DOSTAVLJENA";
		} else {
			return "OTKAZANA";
		}
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
}
