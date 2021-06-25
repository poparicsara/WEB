package beans;

import java.util.ArrayList;

public class Restaurant {

	private String name;
	private String type;
	private ArrayList<Item> items;
	private boolean status;
	private Location location;
	private String image;
	
	public Restaurant() {
		super();
	}

	public Restaurant(String name, String type, ArrayList<Item> items, boolean status, Location location, String image) {
		super();
		this.name = name;
		this.type = type;
		this.items = items;
		this.status = status;
		this.location = location;
		this.image = image;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public ArrayList<Item> getItems() {
		return items;
	}
	
	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}
	
	public boolean isStatus() {
		return status;
	}
	
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	public Location getLocation() {
		return location;
	}
	
	public void setLocation(Location location) {
		this.location = location;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	
}
