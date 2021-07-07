package services;

import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Comment;
import dto.CommentDTO;

public class CommentService {

	private Gson gson = new Gson();
	private List<Comment> comments = new ArrayList<Comment>();
	private String commentsPath = "./static/comments.json";
	
	public List<CommentDTO> getRestaurantComments(int restaurant) throws Exception{
		List<CommentDTO> comms = new ArrayList<CommentDTO>();
		for (Comment c : getComments()) {
			if(c.getRestaurant() == restaurant) {
				comms.add(setCommentToDTO(c));
			}
		}
		return comms;
	}
	
	private CommentDTO setCommentToDTO(Comment c) {
		CommentDTO com = new CommentDTO();
		com.setCustomer(c.getCustomer());
		com.setRestaurant(String.valueOf(c.getRestaurant()));
		com.setGrade(String.valueOf(c.getGrade()));
		com.setText(c.getText());
		return com;
	}
	
	private List<Comment> getComments() throws Exception{
		Type listType = new TypeToken<ArrayList<Comment>>() {}.getType();
	    String json = readFileAsString(commentsPath);
		comments = gson.fromJson(json, listType);
		return comments;
	}
	
	private static String readFileAsString(String file)throws Exception
    {
        return new String(Files.readAllBytes(Paths.get(file)));
    }
	
}
