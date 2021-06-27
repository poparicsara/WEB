package services;

import java.io.FileWriter;
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
import beans.User;
import dto.UserDTO;
import enums.Gender;
import enums.UserType;

public class UserService {

	private List<User> users = new ArrayList<User>();
	private User newUser = new User();
	private String filePath = "./static/users.json";
	private Gson gson = new Gson();
	
	public List<User> getUsers() throws Exception {
	    Type listType = new TypeToken<ArrayList<User>>() {}.getType();
	    String json = readFileAsString(filePath);
		users = gson.fromJson(json, listType);
		return users;
	}
	
	private static String readFileAsString(String file)throws Exception{
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
	public void addUser(UserDTO user) throws Exception {
		users = getUsers();
		setNewUser(user);
		users.add(newUser);
		Writer writer = new FileWriter(filePath);
		gson.toJson(users, writer);
		writer.close();
	}
	
	private void setNewUser(UserDTO user) throws ParseException {
		newUser.setUsername(user.getUsername());
		newUser.setPassword(user.getPassword());
		newUser.setName(user.getName());
		newUser.setLastname(user.getLastname());
		newUser.setUserType(UserType.CUSTOMER);
		setDate(user.getDate());
		setGender(user.getGender());
	}
	
	private void setDate(String date) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		newUser.setDateOfBirth(format.parse(date));
	}
	
	private void setGender(String gender) {
		if(gender.equals("FEMALE")) {
			newUser.setGender(Gender.FEMALE);
		} else {
			newUser.setGender(Gender.MALE);
		}
	}
	
	private boolean isUsernameUnique(String username) {
		for (User user : users) {
			if(user.getUsername().equals(username)) {
				return false;
			}
		}
		return true;
	}

}
