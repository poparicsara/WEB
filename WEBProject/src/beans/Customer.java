package beans;

import java.util.ArrayList;

public class Customer extends User {

	private ArrayList<String> orders;
	private Cart cart;
	private double totalPoints;
	private String type;
	
	public Customer() {
		super();
	}

	public Customer(ArrayList<String> orders, Cart cart, double totalPoints, String type) {
		super();
		this.orders = orders;
		this.cart = cart;
		this.totalPoints = totalPoints;
		this.type = type;
	}

	public ArrayList<String> getOrders() {
		return orders;
	}
	
	public void setOrders(ArrayList<String> orders) {
		this.orders = orders;
	}
	
	public Cart getCart() {
		return cart;
	}
	
	public void setCart(Cart cart) {
		this.cart = cart;
	}
	
	public double getTotalPoints() {
		return totalPoints;
	}
	
	public void setTotalPoints(double totalPoints) {
		this.totalPoints = totalPoints;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	
	
}
