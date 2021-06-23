package beans;

import enums.CustomerTypeName;

public class CustomerType {

	private CustomerTypeName typeName;
	private double discount;
	private double neededPoints;
	
	public CustomerType() {
		super();
	}

	public CustomerType(CustomerTypeName typeName, double discount, double neededPoints) {
		super();
		this.typeName = typeName;
		this.discount = discount;
		this.neededPoints = neededPoints;
	}

	public CustomerTypeName getTypeName() {
		return typeName;
	}
	
	public void setTypeName(CustomerTypeName typeName) {
		this.typeName = typeName;
	}
	
	public double getDiscount() {
		return discount;
	}
	
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	
	public double getNeededPoints() {
		return neededPoints;
	}
	
	public void setNeededPoints(double neededPoints) {
		this.neededPoints = neededPoints;
	}
	
	
	
}
