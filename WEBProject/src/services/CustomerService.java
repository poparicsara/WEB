package services;

import java.util.ArrayList;

import beans.Customer;

public class CustomerService {
	
	private ArrayList<Customer> customers = new ArrayList<Customer>();

	public void addCustomer(Customer customer) {
		System.out.println(customer.getUsername() + " " + customer.getName() + " " + customer.getLastname());
		customers.add(customer);
	}
	
}
