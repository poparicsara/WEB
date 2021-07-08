package beans;

import java.util.Date;

public class Canceling {

	private String customer;
	private Date date;
	
	
	public Canceling() {
		super();
	}

	public Canceling(String customer, Date date) {
		super();
		this.customer = customer;
		this.date = date;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	
	
}
