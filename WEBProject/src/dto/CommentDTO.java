package dto;


public class CommentDTO {

	private String id;
	private String customer;
	private String restaurant;
	private String text;
	private String grade;
	private String status;
	
	
	public CommentDTO() {
		super();
	}

	public CommentDTO(String id, String customer, String restaurant, String text, String grade, String status) {
		super();
		this.id = id;
		this.customer = customer;
		this.restaurant = restaurant;
		this.text = text;
		this.grade = grade;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
