package service;

import javax.servlet.MultipartConfigElement;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;

//to display warning messages on log
import java.util.logging.Logger;
import java.util.logging.Level;


public class AuthService extends ServiceParent{
	
	
	@SuppressWarnings("unchecked")
	public static Object cadastraUsuario(Request req, Response res) throws Exception{
		final String reqJsonBody = req.body(); 	  									  
		JSONObject reqJson = parseBody(reqJsonBody);
		
		String email = (String) reqJson.get("email");
		String senha = (String) reqJson.get("password");
		String nome = (String) reqJson.get("name");
	
		//!Currently missing name field to receive: name is being set to username value!
		Usuario usuario = new Usuario(nome, email, nome, senha);
		System.out.println("got usuario -> " + usuario);
		
		
		//Is a json response really needed, when the status would work just fine?
		JSONObject responseJson = new JSONObject();
		if(UsuarioDAO.postUsuario(usuario)) {
			res.status(200);
			responseJson.put("payload", "sucess");
		} else {
			res.status(401);
			responseJson.put("payload", "failure");
		}
		
    	return responseJson;
	}
	
	
	
	@SuppressWarnings("unchecked")
	/* Sends response a very specific JWT model
	 * See model example on auth-user module at front-end server
	 */
	public static Object auth(Request req, Response res) throws Exception{
		final String reqJsonBody = req.body();
		JSONObject reqJson = parseBody(reqJsonBody);

    	String email = (String) reqJson.get("email");
    	String password = (String) reqJson.get("password");
    	System.out.println("Got [email=(" +email+ "), password=(" +password+ ")] from request body");
    	
    	
    	
    	res.type("application/json");
    	JSONObject json;
    	if (UsuarioDAO.autenticaUsuario(email, password)) {
    		res.status(200);
    		Usuario usuario = UsuarioDAO.getUsuarioByEmail(email);
    		json = buildAuthResponse(usuario);
    		
    	} else {
    		res.status(401); //Unauthorized

    		//Add error message
    		json = new JSONObject();
			json.put("error", "Authentication failed");
		}
    	
    	return json;
	}
	
	
	@SuppressWarnings("unchecked")
	private static JSONObject buildAuthResponse(Usuario usuario) {
		JSONObject responseJson = new JSONObject();
		
		JSONObject header = new JSONObject();
	        header.put("alg", "HS256");
	        header.put("typ", "JWT");
        JSONObject payload = new JSONObject();
	        payload.put("sub", usuario.getId()); 
	        payload.put("name", usuario.getNome());
	        payload.put("iat", null);//iat not implemented
	    //signature not implemented
	        
	        
	    responseJson.put("header", header);
	    responseJson.put("payload", payload);
	    responseJson.put("signature", null); // Signature (set to null for now)
	    
	    return responseJson;
	}
	
	@SuppressWarnings("unused")
	public static Object buscaUsuarioPorId(Request req, Response res) throws Exception {
	    String id = req.queryParams("id");
	    int idNum = Integer.parseInt(id);

	    Usuario usuario = UsuarioDAO.getUsuarioById(idNum);

	    if (usuario != null) {
	        JSONObject json = new JSONObject();
	        
	        json.put("username", usuario.getUsername());
	        json.put("email", usuario.getEmail());
	        
	        res.type("application/json");
	        return json.toJSONString();
	    } else {
	        res.status(404); // Not Found
	        return "Usuário não encontrado";
	    }
	}

}