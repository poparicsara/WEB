package beans;

public class OrderRequest {

	private String orderID;
	private String delivererUsername;
	
	
	public OrderRequest() {
		super();
	}

	public OrderRequest(String orderID, String delivererUsername) {
		super();
		this.orderID = orderID;
		this.delivererUsername = delivererUsername;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getDelivererUsername() {
		return delivererUsername;
	}

	public void setDelivererUsername(String delivererUsername) {
		this.delivererUsername = delivererUsername;
	}
	
	
	
}
