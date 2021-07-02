package dto;

public class EditItemDTO {

	private String oldName;
	private String name;
	private String price;
	private String type;
	private int restaurant;
	private String amount;
	private String description;
	private String image;
	
	public EditItemDTO() {
		super();
	}

	public EditItemDTO(String oldName, String name, String price, String type, int restaurant, String amount, String description, String image) {
		super();
		this.oldName = oldName;
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurant = restaurant;
		this.amount = amount;
		this.description = description;
		this.image = image;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getOldName() {
		return oldName;
	}

	public void setOldName(String oldName) {
		this.oldName = oldName;
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
	
	public int getRestaurant() {
		return restaurant;
	}
	
	public void setRestaurant(int restaurant) {
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
