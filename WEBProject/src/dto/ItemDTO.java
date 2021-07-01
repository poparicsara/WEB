package dto;


public class ItemDTO {

	private String name;
	private String price;
	private String type;
	private String restaurant;
	private String amount;
	private String description;
	
	
	public ItemDTO() {
		super();
	}

	public ItemDTO(String name, String price, String type, String restaurant, String amount, String description) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurant = restaurant;
		this.amount = amount;
		this.description = description;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getPrice() {
		return price;
	}
	
	public void setPrice(String price) {
		this.price = price;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getRestaurant() {
		return restaurant;
	}
	
	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	
	public String getAmount() {
		return amount;
	}
	
	public void setAmount(String amount) {
		this.amount = amount;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	
}
