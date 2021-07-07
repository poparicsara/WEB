package services;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import beans.OrderRequest;
import dto.OrderDTO;
import enums.OrderStatus;

public class OrderService {
	
	private Gson gson = new Gson();
	private List<Order> orders = new ArrayList<Order>();
	private List<OrderRequest> requests = new ArrayList<OrderRequest>();
	private String ordersPath = "./static/orders.json";
	private String requestsPath = "./static/requests.json";
	private UserService userService = new UserService();
	
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
		requests.add(request);
		saveRequestChange(requests);
	}
	
	public List<OrderRequest> getOrderRequests(OrderDTO order) throws Exception{
		requests = new ArrayList<OrderRequest>();
		for (OrderRequest r : getRequests()) {
			if(r.getOrderID().equals(order.getId())) {
				requests.add(r);
			}
		}
		return requests;
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

	private List<Order> getOrders() throws Exception {
		Type listType = new TypeToken<ArrayList<Order>>() {}.getType();
	    String json = readFileAsString(ordersPath);
		orders = gson.fromJson(json, listType);
		return orders;
	}
	
	private List<OrderRequest> getRequests() throws Exception{
		Type listType = new TypeToken<ArrayList<OrderRequest>>() {}.getType();
	    String json = readFileAsString(requestsPath);
		requests = gson.fromJson(json, listType);
		return requests;
	}
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
	private void saveRequestChange(List<OrderRequest> requests) throws Exception {
		Writer writer = new FileWriter(requestsPath);
		gson.toJson(requests, writer);
		writer.close();
	}
	
}
