package beans;

import enums.CommentStatus;

public class Comment {

	private int id;
	private String customer;
	private int restaurant;
	private String text;
	private int grade;
	private CommentStatus status;
	
	
	public Comment() {
		super();
	}

	public Comment(int id, String customer, int restaurant, String text, int grade, CommentStatus status) {
		super();
		this.id = id;
		this.customer = customer;
		this.restaurant = restaurant;
		this.text = text;
		this.grade = grade;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
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
