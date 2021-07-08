package beans;

import enums.ItemType;

public class Item {

	private String name;
	private double price;
	private ItemType type;
	private int restaurantID;
	private int amount;
	private String description;
	private String image;
	private boolean deleted = false;
	
	public Item() {
		super();
	}

	public Item(String name, double price, ItemType type, int restaurantID, int amount, 
			String description, String image, boolean deleted) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantID = restaurantID;
		this.amount = amount;
		this.description = description;
		this.image = image;
		this.deleted = deleted;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public ItemType getType() {
		return type;
	}
	
	public void setType(ItemType type) {
		this.type = type;
	}
	
	public int getRestaurantID() {
		return restaurantID;
	}
	
	public void setRestaurantID(int restaurantID) {
		this.restaurantID = restaurantID;
	}
	
	public int getAmount() {
		return amount;
	}
	
	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
}
