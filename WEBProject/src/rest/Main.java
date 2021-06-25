package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;

import services.RestaurantsService;

public class Main {
	
	private static Gson g = new Gson();
	private static RestaurantsService restaurantsService = new RestaurantsService();

	public static void main(String[] args) throws Exception{
		port(80);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("rest/restaurants/", (req, res) -> {
			res.type("application/json");
			return g.toJson(restaurantsService.getRestaurants());
		});
		
		/*get("rest/restaurants/logIn/", (req, res) -> {
			res.type("application/json");
			return "uspeli";
		});*/
	}

}
