package beans;

public class Manager extends User {

	private Restaurant restaurant;

	
	public Manager() {
		super();
	}

	public Manager(Restaurant restaurant) {
		super();
		this.restaurant = restaurant;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	
	
}
