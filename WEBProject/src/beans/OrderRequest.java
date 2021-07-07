package beans;

import enums.RequestStatus;

public class OrderRequest {

	private String orderID;
	private String delivererUsername;
	private RequestStatus status = RequestStatus.NONE; 
	
	
	public OrderRequest() {
		super();
	}

	public OrderRequest(String orderID, String delivererUsername, RequestStatus status) {
		super();
		this.orderID = orderID;
		this.delivererUsername = delivererUsername;
		this.status = status;
	}

	public RequestStatus getStatus() {
		return status;
	}

	public void setStatus(RequestStatus status) {
		this.status = status;
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
