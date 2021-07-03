package services;

import java.io.FileWriter;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Manager;
import dto.ManagerDTO;

public class ManagerService {
	
	private String filePath = "./static/managers.json";
	private List<Manager> managers = new ArrayList<Manager>();
	private Gson gson = new Gson();

	public String getManegerRestaurant(String username) throws Exception {
		for (Manager manager : getManagers()) {
			if(manager.getUsername().equals(username)) {
				return manager.getRestaurant().getName();
			}
		}
		return null;
	}
	
	public List<Manager> getManagers() throws Exception{
		Type listType = new TypeToken<ArrayList<Manager>>() {}.getType();
	    String json = readFileAsString(filePath);
		managers = gson.fromJson(json, listType);
		return managers;
	}
	
	private static String readFileAsString(String file)throws Exception{
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
	public void updateManager(ManagerDTO manager) throws Exception {
		for (Manager m : getManagers()) {
			if(m.getUsername().equals(manager.getUsername())) {
				m.setRestaurant(manager.getRestaurant());
				break;
			}
		}
		Writer writer = new FileWriter(filePath);
		gson.toJson(managers, writer);
		writer.close();
	}
	
}
