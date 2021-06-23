package beans;

import enums.ItemType;

public class Item {

	private String name;
	private double price;
	private ItemType type;
	private Restaurant rastaurant;
	private int amount;
	private String description;
	
	
	public Item() {
		super();
	}

	public Item(String name, double price, ItemType type, Restaurant rastaurant, int amount, String description) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.rastaurant = rastaurant;
		this.amount = amount;
		this.description = description;
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
	
	public Restaurant getRastaurant() {
		return rastaurant;
	}
	
	public void setRastaurant(Restaurant rastaurant) {
		this.rastaurant = rastaurant;
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
