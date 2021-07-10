package services;

import java.io.FileWriter;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Customer;
import beans.CustomerType;
import beans.Order;
import beans.User;
import enums.CustomerTypeName;

public class CustomerService {
	
	private List<Customer> customers = new ArrayList<Customer>();
	private List<CustomerType> customerTypes = new ArrayList<CustomerType>();
	private String customerPath = "./static/customers.json";
	private String customerTypePath = "./static/customerType.json";
	private Gson gson = new Gson();
	public static CancelingService cancelingService = new CancelingService();
	public static OrderService orderService = new OrderService();
	private CommentService commentService = new CommentService();
	
	public List<Customer> getCustomers() throws Exception {
		Type listType = new TypeToken<ArrayList<Customer>>() {}.getType();
	    String json = readFileAsString(customerPath);
		customers = gson.fromJson(json, listType);
		return customers;
	}
	
	public void addCustomer(User user) throws Exception {
		customers = getCustomers();
		Customer customer = new Customer();
		customer.setUsername(user.getUsername());
		customer.setOrders(null);
		customer.setTotalPoints(0.0);
		customer.setType("GVOZDENI");
		customers.add(customer);
		saveCustomersChange(customers);
	}
	
	public String getCustomerType(String username) throws Exception {
		Customer c = getCustomerByUsername(username);
		if(c.getTotalPoints() <= 500) {
			return "GVOZDENI";
		} else if(c.getTotalPoints() > 500 && c.getTotalPoints() <= 1000) {
			return "BRONZANI";
		} else if(c.getTotalPoints() > 1000 && c.getTotalPoints() <= 1500) {
			return "SREBRNI";
		} else {
			return "ZLATNI";
		}
	}
	
	private Customer getCustomerByUsername(String username) throws Exception {
		for (Customer c : getCustomers()) {
			if(c.getUsername().equals(username)) {
				return c;
			}
		}
		return null;
	}
	
	public List<CustomerType> getCustomerTypes() throws Exception{
		Type listType = new TypeToken<ArrayList<CustomerType>>() {}.getType();
	    String json = readFileAsString(customerTypePath);
	    customerTypes = gson.fromJson(json, listType);
		return customerTypes;
	}
	
	public double getDiscountByUsername(String username) throws Exception {
		String type = "";
		double discount = 0;
		customers = getCustomers();
		customerTypes = getCustomerTypes();
		for (Customer customer : customers) {
			if(customer.getUsername().equals(username)) {
				type = customer.getType();
				break;
			}
		}
		if(!type.equals("GVOZDENI")) {
			for (CustomerType customerType : customerTypes) {
				if(customerType.getTypeName().toString().equals(type)) {
					discount = customerType.getDiscount();
					break;
				}
			}
		}
		return discount;
	}
	
	public void setCustomerTypes() throws Exception {
		customers = getCustomers();
		customerTypes = getCustomerTypes();
		for (Customer customer : customers) {
			int index = -1;
			for (CustomerType customerType : customerTypes) {
				if(customer.getTotalPoints() > customerType.getNeededPoints()) {
					index++;
				}
			}
			if(index == -1) {
				customer.setType("GVOZDENI");
			}
			else {
				customer.setType(customerTypes.get(index).getTypeName().toString());
			}
		}
		saveCustomersChange(customers);
		
	}
	
	
	public void saveCustomerOrder(Order order) throws Exception {
		customers = getCustomers();
		for (Customer customer : customers) {
			if(customer.getUsername().equals(order.getCustomerUsername())) {
				customer.getOrders().add(order.getId());
				double points = customer.getTotalPoints();
				points += order.getPrice()/1000*133;
				customer.setTotalPoints(points);
				int index = -1;
				for (CustomerType customerType : customerTypes) {
					if(customerType.getNeededPoints() < points) {
						index++;
					}
				}
				if(index == -1) {
					customer.setType("GVOZDENI");
				}
				else {
					customer.setType(customerTypes.get(index).getTypeName().toString());
				}
			}
		}
		saveCustomersChange(customers);
	}
	
	public void cancelCustomerOrder(Order order) throws Exception {
		customers = getCustomers();
		for (Customer customer : customers) {
			for (String id : customer.getOrders()) {
				if(id.equals(order.getId())) {
					double points = customer.getTotalPoints();
					points -= order.getPrice()/1000*133*4;
					customer.setTotalPoints(points);
				}
				int index = -1;
				for (CustomerType customerType : customerTypes) {
					if(customerType.getNeededPoints() < customer.getTotalPoints()) {
						index++;
					}
				}
				if(index == -1) {
					customer.setType("GVOZDENI");
				}
				else {
					customer.setType(customerTypes.get(index).getTypeName().toString());
				}
			}
			
		}
		saveCustomersChange(customers);
	}
	
	public void editCustomer(String oldUsername, String newUsername) throws Exception {
		customers = getCustomers();
		for (Customer c : customers) {
			if(c.getUsername().equals(oldUsername)) {
				c.setUsername(newUsername);
			}
		}
		cancelingService.editCustomer(oldUsername, newUsername);
		orderService.editCustomer(oldUsername, newUsername);
		commentService.editCustomer(oldUsername, newUsername);
		saveCustomersChange(customers);
	}
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readString(Paths.get(file)));
    }
	
	private void saveCustomerTypeChange(List<CustomerType> customerType) throws Exception {
		Writer writer = new FileWriter(customerTypePath, StandardCharsets.UTF_8);
		gson.toJson(customerType, writer);
		writer.close();
	}
	
	private void saveCustomersChange(List<Customer> customers) throws Exception {
		Writer writer = new FileWriter(customerPath, StandardCharsets.UTF_8);
		gson.toJson(customers, writer);
		writer.close();
	}
}
