package beans;

import java.io.Serializable;
import java.util.ArrayList;

import enums.RestaurantType;

public class Restaurant implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6988085224503300665L;
	private int id;
	private String name;
	private RestaurantType type;
	private ArrayList<Item> items;
	private boolean status;
	private Location location;
	private String image;
	private double averageGrade;
	
	
	public Restaurant() {
		super();
	}

	public Restaurant(int id, String name, RestaurantType type, ArrayList<Item> items, boolean status, Location location, String image, double averageGrade) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.items = items;
		this.status = status;
		this.location = location;
		this.image = image;
		this.averageGrade = averageGrade;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public RestaurantType getType() {
		return type;
	}
	
	public void setType(RestaurantType type) {
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

	public double getAverageGrade() {
		return averageGrade;
	}

	public void setAverageGrade(double averageGrade) {
		this.averageGrade = averageGrade;
	}
	
	
	
}
