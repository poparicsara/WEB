package dto;

public class UserDTO {

	private String username;
	private String password;
	private String name;
	private String lastname;
	private String gender;
	private String date;
	private String userType;
	private String blocked;
	
	public UserDTO() {
		super();
	}

	public UserDTO(String username, String password, String name, String lastname, String gender, 
			String date, String type, String blocked) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.lastname = lastname;
		this.gender = gender;
		this.date = date;
		this.userType = type;
		this.blocked = blocked;
	}

	public String getBlocked() {
		return blocked;
	}

	public void setBlocked(String blocked) {
		this.blocked = blocked;
	}

	public String getType() {
		return userType;
	}

	public void setType(String type) {
		this.userType = type;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	
	
}
