package services;

import java.io.FileWriter;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Customer;
import beans.Order;

public class CustomerService {
	
	private List<Customer> customers = new ArrayList<Customer>();
	private String customerPath = "./static/customers.json";
	private Gson gson = new Gson();

	public List<Customer> getCustomers() throws Exception {
		Type listType = new TypeToken<ArrayList<Customer>>() {}.getType();
	    String json = readFileAsString(customerPath);
		customers = gson.fromJson(json, listType);
		return customers;
	}
	
	public void saveCustomerOrder(Order order) throws Exception {
		customers = getCustomers();
		for (Customer customer : customers) {
			if(customer.getUsername().equals(order.getCustomerUsername())) {
				customer.getOrders().add(order.getId());
				double points = customer.getTotalPoints();
				points += order.getPrice()/1000*133;
				customer.setTotalPoints(points);
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
			}
		}
		saveCustomersChange(customers);
	}
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readString(Paths.get(file)));
    }
	
	private void saveCustomersChange(List<Customer> customers) throws Exception {
		Writer writer = new FileWriter(customerPath, StandardCharsets.UTF_8);
		gson.toJson(customers, writer);
		writer.close();
	}
}
