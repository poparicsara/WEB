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

import beans.Comment;
import beans.Item;
import beans.Order;
import beans.Restaurant;
import dto.EditItemDTO;
import dto.ItemDTO;
import dto.OrderDTO;
import dto.RestaurantCustomer;
import enums.ItemType;
import enums.OrderStatus;
import dto.UserDTO;
import enums.UserType;


public class RestaurantsService {
	
	Gson gson = new Gson();
	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	private List<Order> orders = new ArrayList<Order>();
	private List<OrderDTO> restaurantOrders = new ArrayList<OrderDTO>();
	private List<Comment> comments = new ArrayList<Comment>();
	private UserService userService = new UserService();
	public static CommentService commentService = new CommentService();
	public static ManagerService managerService = new ManagerService();
	private String ordersPath = "./static/orders.json";
	private String restaurantsPath = "./static/restaurants.json";
	
	public List<Restaurant> getRestaurants() throws Exception{
	    Type listType = new TypeToken<ArrayList<Restaurant>>() {}.getType();
	    String json = readFileAsString("./static/restaurants.json");
		restaurants = gson.fromJson(json, listType);
		List<Restaurant> filteredRestaurants = new ArrayList<Restaurant>();
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
	
	public void updateRestaurantGrades() throws Exception {
		restaurants = getRestaurants();
		comments = commentService.getComments();
		
		for (Restaurant restaurant : restaurants) {
			double commentNumber = 0;
			double gradeSum = 0;
			for (Comment comment : comments) {
				if(restaurant.getId() == comment.getRestaurant()) {
					commentNumber ++;
					gradeSum += comment.getGrade();
				}
			}
			if(commentNumber > 0) {
				double averageGrade = gradeSum/commentNumber;
				restaurant.setAverageGrade(averageGrade);
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
	
	public void deleteRestaurant(int restaurant) throws Exception {
		restaurants = getRestaurants();
		for (Restaurant r : restaurants) {
			if(r.getId() == restaurant) {
				r.setDeleted(true);
			}
		}
		managerService.deleteManagerRestaurant(restaurant);
		saveChange(restaurants);
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
		Writer writer = new FileWriter(restaurantsPath, StandardCharsets.UTF_8);
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
		String city = convertCyrilic(restaurant.getLocation().getAddress().getCity());
		restaurant.getLocation().getAddress().setCity(city);
		String street = convertCyrilic(restaurant.getLocation().getAddress().getStreet());
		restaurant.getLocation().getAddress().setStreet(street);
		restaurants.add(restaurant);
		
		Writer writer = new FileWriter("./static/restaurants.json",StandardCharsets.UTF_8);
		gson.toJson(restaurants, writer);
		writer.close();
	}
	
	public static String convertCyrilic(String message){
	    char[] abcCyr =   {' ','а','б','в','г','д','ђ','е', 'ж','з','ѕ','и','ј','к','л','љ','м','н','њ','о','п','р','с','т', 'ћ','у', 'ф','х','ц','ч','џ','ш', 'А','Б','В','Г','Д','Ђ','Е', 'Ж','З','Ѕ','И','Ј','К','Л','Љ','М','Н','Њ','О','П','Р','С','Т', 'Ћ', 'У','Ф', 'Х','Ц','Ч','Џ','Ш','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','/','-'};
	    String[] abcLat = {" ","a","b","v","g","d","dj","e","ž","z","y","i","j","k","l","lj","m","n","nj","o","p","r","s","t","ć","u","f","h", "c","č", "dž","š","A","B","V","G","D","Dj","E","Ž","Z","Y","I","J","K","L","LJ","M","N","NJ","O","P","R","S","T","Ć","U","F","H", "C","Č", "DŽ","Š", "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","/","-"};
	    StringBuilder builder = new StringBuilder();
	    for (int i = 0; i < message.length(); i++) {
	        for (int x = 0; x < abcCyr.length; x++ ) {
	            if (message.charAt(i) == abcCyr[x]) {
	                builder.append(abcLat[x]);
	            }
	        }
	    }
	    return builder.toString();
	}
	
	@SuppressWarnings("deprecation")
	public void setRestaurantsStatus() throws Exception {
		Date date = new Date();
		int hour = date.getHours();
		restaurants = getRestaurants();
		for (Restaurant r : restaurants) {
			if(r.getStartTime() <= hour && r.getEndTime() > hour) {
				r.setStatus(true);
			} else {
				r.setStatus(false);
			}
		}
		saveChange(restaurants);
	}
	
	public void deleteRestaurantItem(ItemDTO item, int restaurant) throws Exception {
		restaurants = getRestaurants();
		for (Restaurant r : restaurants) {
			if(r.getId() == restaurant) {
				for (Item i : r.getItems()) {
					if(i.getName().equals(item.getName())) {
						i.setDeleted(true);
					}
				}
			}
		}
		saveChange(restaurants);
	}
	
	public List<String> getRestaurantNames() throws Exception{
		List<String> names = new ArrayList<String>();
		for (Restaurant r : getRestaurants()) {
			names.add(r.getName());
		}
		return names;
	}
	
	public List<RestaurantCustomer> getRestaurantCustomers(int restaurant) throws Exception{
		List<RestaurantCustomer> customers = new ArrayList<RestaurantCustomer>();
		OrderService orderService = new OrderService();		
		List<Order> orders = orderService.getOrders();
		for (Order order : orders) {
			if(order.getRestaurant() == restaurant) {
				OrderDTO o = orderService.setOrderToDTO(order);
				RestaurantCustomer c = new RestaurantCustomer();
				c.setUsername(o.getCustomerUsername());
				c.setFullName(o.getCustomerFullName());
				int count = 0;
				for (Order order2 : orders) {
					if(order2.getCustomerUsername().equals(c.getUsername()) && order2.getRestaurant() == restaurant) {
						count++;
					}
				}
				c.setCount(count);
				boolean exist = false;
				for (RestaurantCustomer rc : customers) {
					if(rc.getUsername().equals(c.getUsername())) {
						exist = true;
						break;
					}
				}
				if(!exist) {
					customers.add(c);
				}
			}
		}
		return customers;
	}
	
}
