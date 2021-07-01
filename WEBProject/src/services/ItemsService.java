package services;

import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Item;

public class ItemsService {
	
	private Gson gson = new Gson();
	private String filePath = "./static/items.json";
	private List<Item> items = new ArrayList<Item>();

	public List<Item> getRestaurantItems(String restaurantName) throws Exception {
		List<Item> restaurantItems = new ArrayList<Item>();
	    for (Item item : getItems()) {
			if(item.getRestaurant().getName().equals(restaurantName)) {
				restaurantItems.add(item);
			}
		}
		return restaurantItems;
	}
	
	private List<Item> getItems() throws Exception {
	    Type listType = new TypeToken<ArrayList<Item>>() {}.getType();
	    String json = readFileAsString(filePath);
		items = gson.fromJson(json, listType);
		return items;
	}
	
	private static String readFileAsString(String file)throws Exception{
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
}
