package services;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import beans.OrderRequest;
import dto.OrderDTO;
import enums.OrderStatus;
import enums.RequestStatus;

public class OrderService {
	
	private Gson gson = new Gson();
	private List<Order> orders = new ArrayList<Order>();
	private List<OrderRequest> requests = new ArrayList<OrderRequest>();
	private String ordersPath = "./static/orders.json";
	private String requestsPath = "./static/requests.json";
	private UserService userService = new UserService();
	private RestaurantsService restaurantService = new RestaurantsService();
	
	public List<OrderDTO> getOrdersForDeliverers() throws Exception{
		List<OrderDTO> dtos = new ArrayList<OrderDTO>();
		for (Order o : getOrders()) {
			if(o.getStatus() == OrderStatus.WAITING) {
				dtos.add(setOrderToDTO(o));
			}
		}
		return dtos;
	}
	
	public void addOrderRequest(OrderRequest request) throws Exception {
		requests = getRequests();
		request.setStatus(RequestStatus.SENT);
		requests.add(request);
		saveRequestChange(requests);
	}
	
	public List<OrderRequest> getOrderRequests(OrderDTO order) throws Exception{
		ArrayList<OrderRequest> ret = new ArrayList<OrderRequest>();
		for (OrderRequest r : getRequests()) {
			if(r.getOrderID().equals(order.getId())) {
				ret.add(r);
			}
		}
		return ret;
	}
	
	public void acceptOrderRequest(OrderRequest request) throws NumberFormatException, Exception {
		orders = getOrders();
		for (Order o : orders) {
			if(o.getId().equals(request.getOrderID())) {
				o.setStatus(OrderStatus.TRANSPORT);
				o.setDelivererUsername(request.getDelivererUsername());
			}
		}
		requests = getRequests();
		for (OrderRequest r : requests) {
			if(r.getOrderID().equals(request.getOrderID())){
				if(r.getDelivererUsername().equals(request.getDelivererUsername())) {
					r.setStatus(RequestStatus.ACCEPTED);
				} else {
					r.setStatus(RequestStatus.REJECTED);
				}	
			}
		}
		saveRequestChange(requests);
		saveOrderChange(orders);
	}
	
	public void rejectOrderRequest(OrderRequest request) throws Exception {
		requests = getRequests();
		for (OrderRequest r : requests) {
			if(r.getOrderID().equals(request.getOrderID()) && r.getDelivererUsername().equals(request.getDelivererUsername())){
				r.setStatus(RequestStatus.REJECTED);
			}
		}
		saveRequestChange(requests);
	}
	
	private OrderDTO setOrderToDTO(Order o) throws Exception {
		OrderDTO order = new OrderDTO();
		order.setDate(o.getDate());
		order.setId(String.valueOf(o.getId()));
		order.setItems(o.getItems());
		order.setPrice(Double.toString(o.getPrice()));
		order.setRestaurant(String.valueOf(o.getRestaurant()));
		order.setRestaurantName(restaurantService.getRestaurantNameById(o.getRestaurant()));
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

	public List<Order> getOrders() throws Exception {
		Type listType = new TypeToken<ArrayList<Order>>() {}.getType();
	    String json = readFileAsString(ordersPath);
		orders = gson.fromJson(json, listType);
		return orders;
	}
	
	public List<OrderRequest> getRequests() throws Exception{
		Type listType = new TypeToken<ArrayList<OrderRequest>>() {}.getType();
	    String json = readFileAsString(requestsPath);
		requests = gson.fromJson(json, listType);
		return requests;
	}
	
	public List<OrderDTO> getDelivererOrders(String username) throws Exception{
		List<OrderDTO> dtos = new ArrayList<OrderDTO>();
		for (Order o : getOrders()) {
			if(o.getDelivererUsername().equals(username)) {
				dtos.add(setOrderToDTO(o));
			}
		}
		return dtos;
	}
	
	public List<OrderDTO> getDelivererNotDeliveredOrders(String username) throws Exception{
		List<OrderDTO> dtos = new ArrayList<OrderDTO>();
		for (Order o : getOrders()) {
			if(o.getDelivererUsername().equals(username) && o.getStatus() == OrderStatus.TRANSPORT) {
				dtos.add(setOrderToDTO(o));
			}
		}
		return dtos;
	}
	
	public void setOrderToDelivered(OrderDTO order) throws Exception {
		orders = getOrders();
		for (Order o : orders) {
			if(o.getId().equals(order.getId())) {
				o.setStatus(OrderStatus.DELIVERED);
			}
		}
		saveOrderChange(orders);
	}	
	
	public void cancelOrder(Order oldOrder) throws Exception {
		orders = getOrders();
		for (Order order : orders) {
			if(order.getId().equals(oldOrder.getId())) {
				order.setStatus(OrderStatus.CANCELED);
				break;
			}
		}
		saveOrderChange(orders);
		
	}
	
	public void addNewOrder(Order order) throws Exception {
		orders = getOrders();
		boolean exists = true;
		while(exists) {
			boolean sameIDs = false;
			String ID = getAlphaNumericString();
			for (Order oldOrders : orders) {
				if(oldOrders.getId().equals(ID)) {
					sameIDs = true;
					break;
				}
			}
			if(!sameIDs) {
				exists = false;
			}
		}
		order.setId(getAlphaNumericString());
		order.setStatus(OrderStatus.PROCESSING);
		Date date = new Date();
		order.setDate(date);
		orders.add(order);
		saveOrderChange(orders);
	}
	
	private String getAlphaNumericString()
    {
  
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                    + "0123456789"
                                    + "abcdefghijklmnopqrstuvxyz";
  
        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(10);
  
        for (int i = 0; i < 10; i++) {
  
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                = (int)(AlphaNumericString.length()
                        * Math.random());
  
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                          .charAt(index));
        }
  
        return sb.toString();
    }
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readString(Paths.get(file)));
    }
	
	private void saveOrderChange(List<Order> orders) throws Exception {
		Writer writer = new FileWriter(ordersPath, StandardCharsets.UTF_8);
		gson.toJson(orders, writer);
		writer.close();
	}
	
	private void saveRequestChange(List<OrderRequest> requests) throws Exception {
		Writer writer = new FileWriter(requestsPath, StandardCharsets.UTF_8);
		gson.toJson(requests, writer);
		writer.close();
	}
	
}
