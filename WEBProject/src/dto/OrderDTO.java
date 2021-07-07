package dto;

import java.util.ArrayList;
import java.util.Date;

import beans.Item;
import beans.Restaurant;
import enums.OrderStatus;

public class OrderDTO {

	private String id;
	private ArrayList<Item> items;
	private String restaurant;
	private Date date;
	private String price;
	private String customerFullName;
	private String customerUsername;
	private String status;
	private String delivererUsername = "";
	
	
	public OrderDTO() {
		super();
	}


	public OrderDTO(String id, ArrayList<Item> items, String restaurant, Date date, String price,
			String customerFullName, String customerUsername, String status, String delivererUsername) {
		super();
		this.id = id;
		this.items = items;
		this.restaurant = restaurant;
		this.date = date;
		this.price = price;
		this.customerFullName = customerFullName;
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


	public String getCustomerUsername() {
		return customerUsername;
	}


	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
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


	public String getRestaurant() {
		return restaurant;
	}


	public void setRestaurant(String restaurant) {
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
