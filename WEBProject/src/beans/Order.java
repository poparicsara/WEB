package beans;

import java.util.ArrayList;
import java.util.Date;

import enums.OrderStatus;

public class Order {

	private String id;
	private ArrayList<Item> items;
	private int restaurantID;
	private Date date;
	private double price;
	private String customerUsername;
	private OrderStatus status;
	private String delivererUsername = "";

	
	public Order() {
		super();
	}

	public Order(String id, ArrayList<Item> items, int restaurantID, Date date, double price, String customerUsername,
			OrderStatus status) {
		super();
		this.id = id;
		this.items = items;
		this.restaurantID = restaurantID;
		this.date = date;
		this.price = price;
		this.customerUsername = customerUsername;
		this.status = status;
		this.delivererUsername = delivererUsername;
	}

	public String getDelivererUsername() {
		return delivererUsername;
	}

	public void setDelivererUsername(String delivererUsername) {
		this.delivererUsername = delivererUsername;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public ArrayList<Item> getItems() {
		return items;
	}
	
	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}
	
	public int getRestaurant() {
		return restaurantID;
	}
	
	public void setRestaurant(int restaurant) {
		this.restaurantID = restaurant;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public String getCustomerUsername() {
		return customerUsername;
	}
	
	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}
	
	public OrderStatus getStatus() {
		return status;
	}
	
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	
	
	
}
