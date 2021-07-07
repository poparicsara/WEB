package services;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Comment;
import dto.CommentDTO;
import enums.CommentStatus;

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
	
	public void acceptComment(CommentDTO comment) throws Exception {
		List<Comment> comms = getComments();
		for (Comment c : comms) {
			if(c.getId() == Integer.parseInt(comment.getId())) {
				c.setStatus(CommentStatus.ACCEPTED);
			}
		}
		saveChange(comms);
	}
	
	public void rejectComment(CommentDTO comment) throws Exception {
		List<Comment> comms = getComments();
		for (Comment c : comms) {
			if(c.getId() == Integer.parseInt(comment.getId())) {
				c.setStatus(CommentStatus.REJECTED);
			}
		}
		saveChange(comms);
	}
	
	private CommentDTO setCommentToDTO(Comment c) {
		CommentDTO com = new CommentDTO();
		com.setId(String.valueOf(c.getId()));
		com.setCustomer(c.getCustomer());
		com.setRestaurant(String.valueOf(c.getRestaurant()));
		com.setGrade(String.valueOf(c.getGrade()));
		com.setText(c.getText());
		com.setStatus(c.getStatus().toString());
		com.setStatus(getCommentStatus(c.getStatus()));
		return com;
	}
	
	private String getCommentStatus(CommentStatus status) {
		if(status == CommentStatus.NONE) {
			return "NONE";
		} else if(status == CommentStatus.ACCEPTED) {
			return "PRIHVAĆEN";
		} else {
			return "ODBIJEN";
		}
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
	
	private void saveChange(List<Comment> comments) throws IOException {
		Writer writer = new FileWriter(commentsPath);
		gson.toJson(comments, writer);
		writer.close();
	}
	
}
