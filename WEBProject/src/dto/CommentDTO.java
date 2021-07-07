package dto;


public class CommentDTO {

	private String customer;
	private String restaurant;
	private String text;
	private String grade;
	
	
	public CommentDTO() {
		super();
	}

	public CommentDTO(String customer, String restaurant, String text, String grade) {
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

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	
	
}
