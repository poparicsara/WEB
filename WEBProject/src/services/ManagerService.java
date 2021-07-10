package services;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Manager;
import dto.ManagerDTO;
import dto.UserDTO;
import enums.Gender;
import enums.UserType;

public class ManagerService {
	
	private String filePath = "./static/managers.json";
	private List<Manager> managers = new ArrayList<Manager>();
	private Gson gson = new Gson();
	private Manager manager = new Manager();

	public String getManagerRestaurant(String username) throws Exception {
		for (Manager manager : getManagers()) {
			if(manager.getUsername().equals(username)) {
				return manager.getRestaurant().getName();
			}
		}
		return null;
	}
	
	public int getRestaurantID(String username) throws Exception {
		for (Manager manager : getManagers()) {
			if(manager.getUsername().equals(username)) {
				return manager.getRestaurant().getId();
			}
		}
		return -1;
	}
	
	public List<Manager> getManagers() throws Exception{
		Type listType = new TypeToken<ArrayList<Manager>>() {}.getType();
	    String json = readFileAsString(filePath);
		managers = gson.fromJson(json, listType);
		return managers;
	}
	
	public Manager getManagerByUsername(String username) throws Exception {
		for (Manager manager : getManagers()) {
			if(manager.getUsername().equals(username)) {
				return manager;
			}
		}
		return null;
	}
	
	public boolean isManagerRestaurantDeleted(String username) {
		for (Manager manager : managers) {
			if(manager.getUsername().equals(username)) {
				if(manager.getRestaurant().isDeleted()) {
					return true;
				}
			}
		}
		return false;
	}
	
	public List<String> getManagersOfDeletedRestaurants() throws Exception{
		List<String> ret = new ArrayList<String>();
		for (Manager m : getManagers()) {
			if(m.getRestaurant().isDeleted()) {
				ret.add(m.getUsername());
			}
		}
		return ret;
	}
	
	public void deleteManagerRestaurant(int restaurant) throws Exception {
		managers = getManagers();
		for (Manager manager : managers) {
			if(manager.getRestaurant().getId() == restaurant) {
				manager.getRestaurant().setDeleted(true);
			}
		}
		saveChange(managers);
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
	
	public void editManagerUsername(String oldUsername, String newUsername) throws Exception {
		managers = getManagers();
		for (Manager manager : managers) {
			if(manager.getUsername().equals(oldUsername)) {
				manager.setUsername(newUsername);
			}
		}
		saveChange(managers);
	}
	
	public void addManager(UserDTO user) throws Exception {
		managers = getManagers();
		setManager(user);
		manager.setUserType(UserType.MANAGER);
		managers.add(manager);
		Writer writer = new FileWriter(filePath);
		gson.toJson(managers, writer);
		writer.close();
	}
	
	private void setManager(UserDTO user) throws ParseException {
		manager.setUsername(user.getUsername());
		manager.setPassword(user.getPassword());
		manager.setName(user.getName());
		manager.setLastname(user.getLastname());
		manager.setRestaurant(null);
		setDate(user.getDate());
		setGender(user.getGender());
	}
	
	private void setDate(String date) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		manager.setDateOfBirth(format.parse(date));
	}
	
	private void setGender(String gender) {
		if(gender.equals("FEMALE")) {
			manager.setGender(Gender.FEMALE);
		} else {
			manager.setGender(Gender.MALE);
		}
	}
	
	private void saveChange(List<Manager> managers) throws IOException {
		Writer writer = new FileWriter(filePath);
		gson.toJson(managers, writer);
		writer.close();
	}
	
}
