package beans;

public class Comment {

	private Customer customer;
	private Restaurant restaurant;
	private String text;
	private int grade;
	
	
	public Comment() {
		super();
	}

	public Comment(Customer customer, Restaurant restaurant, String text, int grade) {
		super();
		this.customer = customer;
		this.restaurant = restaurant;
		this.text = text;
		this.grade = grade;
	}

	public Customer getCustomer() {
		return customer;
	}
	
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	public Restaurant getRestaurant() {
		return restaurant;
	}
	
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public int getGrade() {
		return grade;
	}
	
	public void setGrade(int grade) {
		this.grade = grade;
	}
	
	
	
}
