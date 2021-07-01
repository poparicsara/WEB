package beans;

import java.util.ArrayList;
import java.util.Date;

import enums.OrderStatus;

public class OrderDTO {

	private String id;
	private ArrayList<Item> items;
	private Restaurant restaurant;
	private Date date;
	private String price;
	private String customerFullName;
	private String status;
	
	
	public OrderDTO() {
		super();
	}


	public OrderDTO(String id, ArrayList<Item> items, Restaurant restaurant, Date date, String price,
			String customerFullName, String status) {
		super();
		this.id = id;
		this.items = items;
		this.restaurant = restaurant;
		this.date = date;
		this.price = price;
		this.customerFullName = customerFullName;
		this.status = status;
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


	public Restaurant getRestaurant() {
		return restaurant;
	}


	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public String getPrice() {
		return price;
	}


	public void setPrice(String price) {
		this.price = price;
	}


	public String getCustomerFullName() {
		return customerFullName;
	}


	public void setCustomerFullName(String customerFullName) {
		this.customerFullName = customerFullName;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
