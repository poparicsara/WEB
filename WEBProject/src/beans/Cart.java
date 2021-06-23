package beans;

import java.util.ArrayList;

public class Cart {

	private ArrayList<Item> items;
	private Customer customer;
	private double price;
	
	
	public Cart() {
		super();
	}

	public Cart(ArrayList<Item> items, Customer customer, double price) {
		super();
		this.items = items;
		this.customer = customer;
		this.price = price;
	}

	public ArrayList<Item> getItems() {
		return items;
	}
	
	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}
	
	public Customer getCustomer() {
		return customer;
	}
	
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
}
