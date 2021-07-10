package dto;

public class RestaurantCustomer {

	private String username;
	private String fullName;
	private int count;
	
	public RestaurantCustomer() {
		super();
	}

	public RestaurantCustomer(String username, String fullName, int count) {
		super();
		this.username = username;
		this.fullName = fullName;
		this.count = count;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
	
	
}
