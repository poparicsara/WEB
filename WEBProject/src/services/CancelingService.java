package services;

import java.io.FileWriter;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Canceling;
import beans.Order;
import beans.User;
import dto.UserDTO;

public class CancelingService {

	private Gson gson = new Gson();
	private List<Canceling> cancelings = new ArrayList<Canceling>();
	private String filePath = "./static/cancelings.json";
	private UserService userService = new UserService();
	
	public void addCanceling(Order order) throws Exception {
		Canceling cancel = new Canceling();
		cancel.setCustomer(order.getCustomerUsername());
		cancel.setDate(new Date());
		cancelings = getCancelings();
		cancelings.add(cancel);
		saveChange(cancelings);
	}
	
	public List<UserDTO> getSuspiciousUsers() throws Exception{
		List<String> moreThanFive = new ArrayList<String>();
		List<String> suspicious = new ArrayList<String>();
		List<UserDTO> users = new ArrayList<UserDTO>();
		cancelings = getCancelings();
		for (User user : userService.getUsers()) {
			int counter = 0;
			for (Canceling c : cancelings) {
				if(user.getUsername().equals(c.getCustomer())) {
					counter++;
				}
			}
			if(counter > 5) {
				moreThanFive.add(user.getUsername());
			}
		}
		for (String u : moreThanFive) {
			List<Canceling> cans = getUserCancelings(u);
			Canceling min = getMinCanceling(cans);
			Canceling max = getMaxCanceling(cans);
			long diffInMillies = Math.abs(min.getDate().getTime() - max.getDate().getTime());
		    long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    if(diff <= 30) {
		    	suspicious.add(u);
		    }
		}
		
		for(String u : suspicious) {
			UserDTO user = userService.getUserByUsername(u);
			users.add(user);
		}
		
		return users;
	}
	
	public void editCustomer(String oldUsername, String newUsername) throws Exception {
		cancelings = getCancelings();
		for (Canceling canceling : cancelings) {
			if(canceling.getCustomer().equals(oldUsername)) {
				canceling.setCustomer(newUsername);
			}
		}
		saveChange(cancelings);
	}
	
	private List<Canceling> getUserCancelings(String user) throws Exception{
		List<Canceling> cancs = new ArrayList<Canceling>();
		for (Canceling canceling : getCancelings()) {
			if(canceling.getCustomer().equals(user)) {
				cancs.add(canceling);
			}
		}
		return cancs;
	}
	
	private Canceling getMinCanceling(List<Canceling> cancelings) {
		Canceling min = cancelings.get(0);
		for (Canceling canceling : cancelings) {
			if((canceling.getDate().compareTo(min.getDate())) < 0) {
				min = canceling;
			}
		}
		return min;
	}
	
	private Canceling getMaxCanceling(List<Canceling> cancelings) {
		Canceling max = cancelings.get(0);
		for (Canceling canceling : cancelings) {
			if((canceling.getDate().compareTo(max.getDate())) > 0) {
				max = canceling;
			}
		}
		return max;
	}
	
	private List<Canceling> getCancelings() throws Exception{
		Type listType = new TypeToken<ArrayList<Canceling>>() {}.getType();
	    String json = readFileAsString(filePath);
		cancelings = gson.fromJson(json, listType);
		return cancelings;
	}
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readString(Paths.get(file)));
    }
	
	private void saveChange(List<Canceling> cancelings) throws Exception {
		Writer writer = new FileWriter(filePath, StandardCharsets.UTF_8);
		gson.toJson(cancelings, writer);
		writer.close();
	}
	
}
