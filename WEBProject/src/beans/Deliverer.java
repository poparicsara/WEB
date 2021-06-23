package beans;

import java.util.ArrayList;

public class Deliverer extends User {

	private ArrayList<Order> orders;

	
	public Deliverer() {
		super();
	}

	public Deliverer(ArrayList<Order> orders) {
		super();
		this.orders = orders;
	}

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}
	
	
	
}
