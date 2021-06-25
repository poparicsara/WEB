package services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.StringTokenizer;

import beans.User;
import enums.Gender;
import enums.UserType;

public class UserService {

	private ArrayList<User> users = new ArrayList<User>();
	
	public UserService() {
		BufferedReader in = null;
		String path = "./static/users.txt";
		try {
			File file = new File(path);
			//System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readUsers(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	private void readUsers(BufferedReader in) {
		String line, username = "", password = "", name = "", lastname = "";
		StringTokenizer st;
		try {
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					username = st.nextToken().trim();
					name = st.nextToken().trim();
					lastname = st.nextToken().trim();
				}
				Date date = new Date();
				User user = new User(username, password, name, lastname, Gender.FEMALE, date, UserType.CUSTOMER);
				users.add(user);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addUser(User user) {
		this.users.add(user);
		System.out.println(user.getUsername() + " " + user.getName() + " " + user.getLastname());
	}
	
}
