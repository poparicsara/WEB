package services;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.User;
import dto.EditUserDTO;
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
	
	private List<UserDTO> getUsersAsDTO() throws Exception{
		List<UserDTO> dtos = new ArrayList<UserDTO>();
		Type listType = new TypeToken<ArrayList<UserDTO>>() {}.getType();
	    String json = readFileAsString(filePath);
		users = gson.fromJson(json, listType);
		return dtos;
	}
	
	private static String readFileAsString(String file)throws Exception{
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
	public void addUser(UserDTO user) throws Exception {
		users = getUsers();
		setNewUser(user);
		newUser.setUserType(UserType.CUSTOMER);
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
		setDate(user.getDate(), newUser);
		setGender(user.getGender(), newUser);
	}
	
	private User getEditedUser(EditUserDTO dto) throws ParseException {
		User user = new User();
		user.setUsername(user.getUsername());
		user.setPassword(user.getPassword());
		user.setName(user.getName());
		user.setLastname(user.getLastname());
		setDate(dto.getDate(), user);
		setGender(dto.getGender(), user);
		return user;
	}
	
	public void addManager(UserDTO user) throws Exception {
		users = getUsers();
		setNewUser(user);
		newUser.setUserType(UserType.MANAGER);
		users.add(newUser);
		Writer writer = new FileWriter(filePath);
		gson.toJson(users, writer);
		writer.close();
	}
	
	public void addDeliverer(UserDTO user) throws Exception {
		users = getUsers();
		setNewUser(user);
		newUser.setUserType(UserType.DELIVERER);
		users.add(newUser);
		Writer writer = new FileWriter(filePath);
		gson.toJson(users, writer);
		writer.close();
	}
	
	public UserDTO getLoggedUser(String username) throws Exception {
		UserDTO user = new UserDTO();
		for (User u : getUsers()) {
			if(u.getUsername().equals(username)) {
				user = getUserDTO(u);
			}
		}
		return user;
	}
	
	public void editUser(EditUserDTO dto) throws Exception {
		User user = getEditedUser(dto);
		int index = getUserIndex(dto.getOldUsername());
		users = getUsers();
		users.remove(index);
		users.add(index, user);
		saveChange(users);
	}
	
	private int getUserIndex(String username) throws Exception {
		int index = 0;
		for (User u : getUsers()) {
			if(u.getUsername().equals(username)) {
				break;
			}
			index++;
		}
		return index;
	}
	
	private UserDTO getUserDTO(User user) {
		UserDTO dto = new UserDTO();
		dto.setUsername(user.getUsername());
		dto.setPassword(user.getPassword());
		dto.setName(user.getName());
		dto.setLastname(user.getLastname());
		dto.setGender(user.getGender().toString());
		dto.setDate(getDate(user.getDateOfBirth()));
		return dto;
	}
	
	private String getDate(Date date) {
		System.out.println(date);
		DateFormat dateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy");  
		String fullDate = dateFormat.format(date);  
		String[] dateParts = fullDate.split(" ");
		String year = dateParts[5];
		String month = getMonth(dateParts[1]);	//treba prebaciti u broj
		String day = dateParts[2];
		String d = year + "-" + month + "-" + day;
		return d;
	}
	
	private String getMonth(String month) {
		if(month.equals("Jan")) {
			month = "01";
		} else if(month.equals("Feb")){
			month = "02";
		} else if(month.equals("Mar")) {
			month = "03";
		} else if(month.equals("Apr")) {
			month = "04";
		} else if(month.equals("May")) {
			month = "05";
		} else if(month.equals("Jun")) {
			month = "06";
		} else if(month.equals("Jul")) {
			month = "07";
		} else if(month.equals("Avg")) {
			month = "08";
		} else if(month.equals("Sep")) {
			month = "09";
		} else if(month.equals("Oct")) {
			month = "10";
		} else if(month.equals("Nov")) {
			month = "11";
		} else if(month.equals("Dec")) {
			month = "12";
		}
		return month;
	}
	
	public String getUserFullName(String username) throws Exception {
		String fullName = "";
		for (User user : getUsers()) {
			if(user.getUsername().equals(username)) {
				fullName = user.getName() + " " + user.getLastname();
			}
		}
		return fullName;
	}
	
	private void setDate(String date, User user) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		user.setDateOfBirth(format.parse(date));
	}
	
	private void setGender(String gender, User user) {
		if(gender.equals("FEMALE")) {
			user.setGender(Gender.FEMALE);
		} else {
			user.setGender(Gender.MALE);
		}
	}
	
	private void saveChange(List<User> users) throws IOException {
		Writer writer = new FileWriter(filePath);
		gson.toJson(users, writer);
		writer.close();
	}

}
