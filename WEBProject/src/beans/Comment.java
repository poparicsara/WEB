package beans;

public class Comment {

	private String customer;
	private int restaurant;
	private String text;
	private int grade;
	
	
	public Comment() {
		super();
	}

	public Comment(String customer, int restaurant, String text, int grade) {
		super();
		this.customer = customer;
		this.restaurant = restaurant;
		this.text = text;
		this.grade = grade;
	}

	public String getCustomer() {
		return customer;
	}
	
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	
	public int getRestaurant() {
		return restaurant;
	}
	
	public void setRestaurant(int restaurant) {
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
