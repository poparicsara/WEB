package services;


import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Item;
import beans.Order;
import beans.Restaurant;
import dto.EditItemDTO;
import dto.ItemDTO;
import dto.OrderDTO;
import enums.ItemType;
import enums.OrderStatus;
import dto.UserDTO;
import enums.UserType;


public class RestaurantsService {
	
	Gson gson = new Gson();
	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	private List<Order> orders = new ArrayList<Order>();
	private List<OrderDTO> restaurantOrders = new ArrayList<OrderDTO>();
	private UserService userService = new UserService();
	private String ordersPath = "./static/orders.json";
	private String restaurantsPath = "./static/restaurants.json";
	
	public List<Restaurant> getRestaurants() throws Exception{
	    Type listType = new TypeToken<ArrayList<Restaurant>>() {}.getType();
	    String json = readFileAsString("./static/restaurants.json");
		restaurants = gson.fromJson(json, listType);
		return restaurants;
	}
	
	public List<OrderDTO> getRestaurantOrders(int restaurantID) throws Exception {
		restaurantOrders = new ArrayList<OrderDTO>();
		for (Order order : getOrders()) {
			if(order.getRestaurant() == restaurantID) {
				restaurantOrders.add(setOrderToDTO(order));
			}
		}
		return restaurantOrders;
	}
	
	public void addItemToRestaurant(ItemDTO newItem, int ID) throws Exception {
		Item item = setItem(newItem);
		restaurants = getRestaurants();
		for (Restaurant r : restaurants) {
			if(r.getId() == ID){
				if(r.getItems() == null) {
					r.setItems(new ArrayList<Item>());
				}
				r.getItems().add(item);
			}
		}
		saveChange(restaurants);
	}
	
	public List<String> getRestaurantItemNames(int restaurant) throws Exception{
		List<String> names = new ArrayList<String>();
		for (Restaurant r : getRestaurants()) {
			if(r.getId() == restaurant) {
				for (Item i : r.getItems()) {
					names.add(i.getName());
				}
			}
		}
		return names;
	}
	
	public List<Item> getRestaurantItems(int restaurantID) throws Exception {
		for (Restaurant r : getRestaurants()) {
			if(r.getId() == restaurantID) {
				return r.getItems();
			}
		}
		return null;
	}
	
	public void changeOrderStatus(OrderDTO order) throws Exception {
		Order newOrder = setDTOToOrder(order);
		orders = getOrders();
		int index = getOrderIndex(order.getId());
		orders.remove(index);
		orders.add(index, newOrder);
		saveOrderChange(orders);
	}
	
	public Item getRestaurantItemByIndex(int index) throws Exception {
		restaurants = getRestaurants();
		return null;
		
	}
	
	public void editRestaurantItem(EditItemDTO item) throws Exception {
		Item newItem = setDTOToItem(item);
		restaurants = getRestaurants();
		for (Restaurant r : restaurants) {
			if(r.getName().equals("KFC")) {
				int index = getItemIndex(r, item.getOldName());	
				r.getItems().remove(index);
				r.getItems().add(index, newItem);
			}
		}
		saveChange(restaurants);
	}
	
	public String getRestaurantNameById(int id) throws Exception {
		for (Restaurant r : getRestaurants()) {
			if(r.getId() == id) {
				return r.getName();
			}
		}
		return null;
	}
	
	private int getOrderIndex(String id) throws Exception {
		int index = 0;
		for (Order order : getOrders()) {
			if(order.getId().equals(id)) {
				break;
			}
			index++;
		}
		return index;
	}
	
	@SuppressWarnings("deprecation")
	private Order setDTOToOrder(OrderDTO o) {
		Order order = new Order();
		order.setId(o.getId());
		order.setItems(o.getItems());
		order.setRestaurant(Integer.parseInt(o.getRestaurant()));
		order.setDate(o.getDate());
		order.setPrice(new Double(o.getPrice()));
		order.setCustomerUsername(o.getCustomerUsername());
		setStatus(order, o.getStatus());
		return order;
	}
	
	private void setStatus(Order order, String status) {
		if(status.equals("ČEKA DOSTAVLJAČA")) {
			order.setStatus(OrderStatus.WAITING);			
		} else {
			order.setStatus(OrderStatus.PREPARATION);
		}
	}
	
	
	private ItemDTO setItemToDTO(Item item) {
		ItemDTO i = new ItemDTO();
		i.setName(item.getName());
		i.setPrice(getItemPrice(item.getPrice()));
		i.setType(getItemType(item.getType()));
		i.setRestaurant(item.getRestaurantID());
		i.setAmount(getItemAmount(item));
		i.setDescription(item.getDescription());
		i.setImage(item.getImage());
		return i;
	}
	
	private String getItemPrice(double price) {
		return price + " RSD";
	}
	
	private String getItemAmount(Item item) {
		if(item.getType() == ItemType.FOOD) {
			return item.getAmount() + " g";
		} else {
			return item.getAmount() + " ml";
		}
	}
	
	private String getItemType(ItemType type) {
		if(type == ItemType.FOOD) {
			return "FOOD";
		} else {
			return "DRINK";
		}
	}
	
	private int getItemIndex(Restaurant restaurant, String itemName) {
		int index = 0;
		for (Item i : restaurant.getItems()) {
			if(i.getName().equals(itemName)) {
				break;
			}
			index++;
		}
		return index;
	}
	
	@SuppressWarnings("deprecation")
	private Item setItem(ItemDTO newItem) throws Exception {
		Item item = new Item();
		item.setName(newItem.getName());
		item.setAmount(Integer.parseInt(newItem.getAmount()));
		item.setDescription(newItem.getDescription());
		item.setPrice(new Double(newItem.getPrice()));
		item.setType(setItemType(newItem.getType()));
		//item.setRestaurantID(101);
		item.setImage(newItem.getImage());
		return item;
	}
	
	@SuppressWarnings("deprecation")
	private Item setDTOToItem(EditItemDTO newItem) throws Exception {
		Item item = new Item();
		item.setName(newItem.getName());
		item.setAmount(Integer.parseInt(newItem.getAmount()));
		item.setDescription(newItem.getDescription());
		item.setPrice(new Double(newItem.getPrice()));
		item.setType(setItemType(newItem.getType()));
		item.setRestaurantID(101);
		item.setImage(newItem.getImage());
		return item;
	}
	
	private int getItemAmount(EditItemDTO item) {
		int lenght = item.getAmount().length();
		String amount = "";
		if(item.getType().equals("FOOD")) {
			amount = item.getAmount().substring(0, lenght-2);
		} else {
			amount = item.getAmount().substring(0, lenght-3);
		}
		return Integer.parseInt(amount);
	}
	
	@SuppressWarnings("deprecation")
	private double getItemPrice(String price) {
		int lenght = price.length();
		String p = price.substring(0, lenght-4);
		return new Double(p);
	}
	
	private void saveChange(List<Restaurant> restaurants) throws IOException {
		Writer writer = new FileWriter(restaurantsPath);
		gson.toJson(restaurants, writer);
		writer.close();
	}
	
	private void saveOrderChange(List<Order> orders) throws IOException {
		Writer writer = new FileWriter(ordersPath);
		gson.toJson(orders, writer);
		writer.close();
	}
	
	private ItemType setItemType(String type) {
		if(type.equals("FOOD")) {
			return ItemType.FOOD;
		} else {
			return ItemType.DRINK;
		}
	}
	
	public Restaurant getRestaurantByID(int id) throws Exception {
		for (Restaurant r : getRestaurants()) {
			if(r.getId() == id) {
				return r;
			}
		}
		return null;
	}
	
	private OrderDTO setOrderToDTO(Order o) throws Exception {
		OrderDTO order = new OrderDTO();
		order.setDate(o.getDate());
		order.setId(String.valueOf(o.getId()));
		order.setItems(o.getItems());
		order.setPrice(Double.toString(o.getPrice()));
		order.setRestaurant(String.valueOf(o.getRestaurant()));
		order.setStatus(setOrderStatus(o.getStatus()));
		order.setCustomerUsername(o.getCustomerUsername());
		order.setCustomerFullName(userService.getUserFullName(o.getCustomerUsername()));
		return order;
	}
	
	private String setOrderStatus(OrderStatus s) {
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
	
	private OrderStatus setStringToOrderStatus(String status) {
		if(status.equals("U PRIPREMI")) {
			return OrderStatus.PREPARATION;
		} else if(status.equals("ČEKA DOSTAVLJAČA")) {
			return OrderStatus.WAITING;
		} else if(status.equals("U TRANSPORTU")) {
			return OrderStatus.TRANSPORT;
		} else if(status.equals("DOSTAVLJENA")) {
			return OrderStatus.DELIVERED;
		} else {
			return OrderStatus.CANCELED;
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
		return new String(Files.readString(Paths.get(file)));
        //return new String(Files.readAllBytes(Paths.get(file)));

    }
	
	public void addRestaurant(Restaurant restaurant) throws Exception {
		restaurants = getRestaurants();
		restaurants.add(restaurant);
		
		Writer writer = new FileWriter("./static/restaurants.json",StandardCharsets.UTF_8);
		gson.toJson(restaurants, writer);
		writer.close();
	}
	
	
	
	
	
}
