package dto;

import beans.Restaurant;

public class ManagerDTO {
	private String username;
	private Restaurant restaurant;
	
	public ManagerDTO(String username, Restaurant restaurant) {
		super();
		this.username = username;
		this.restaurant = restaurant;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public Restaurant getRestaurant() {
		return restaurant;
	}
	
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
}
