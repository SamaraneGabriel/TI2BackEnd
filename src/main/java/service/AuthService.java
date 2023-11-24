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
import app.Criptografia;

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
	public static Object auth(Request req, Response res) throws Exception {
	    String reqJsonBody = req.body();
	    JSONObject reqJson = parseBody(reqJsonBody);

	    String email = (String) reqJson.get("email");
	    System.out.println(email);
	    String password = (String) reqJson.get("password");

	    res.type("application/json");
	    JSONObject json = new JSONObject();
	    
	    if (UsuarioDAO.autenticaUsuario(email, Criptografia.hashMD5(password))) {
	        res.status(200);
	        Usuario usuario = UsuarioDAO.getUsuarioByEmail(email);
	        json.put("message", "Autenticação bem-sucedida");
	        json.put("userId", usuario.getId());
	        json.put("userName", usuario.getNome());
	        System.out.println("ID: " + usuario.getId());
	        System.out.println("USERNAME: " + usuario.getUsername());
	    } else {
	        res.status(401); // Unauthorized
	        json.put("error", "Falha na autenticação");
	    }
	    
	    return json;
	}

	
	@SuppressWarnings("unchecked")
	public static Object buscaUsuarioPorId(Request req, Response res) throws Exception {
	    String id = req.queryParams("id");
	    int idNum = Integer.parseInt(id);

	    Usuario usuario = UsuarioDAO.getUsuarioById(idNum);

	    if (usuario != null) {
	        JSONObject json = new JSONObject();
	        
	        json.put("username", usuario.getUsername());
	        json.put("nome", usuario.getNome());
	        json.put("email", usuario.getEmail());
	        json.put("acertos", usuario.getQtdAcertos());
	        json.put("feitos", usuario.getQtdFeitos());
	        res.type("application/json");
	        return json.toJSONString();
	    } else {
	        res.status(404); // Not Found
	        return "Usuário não encontrado";
	    }
	}

	public static boolean updateNome(Request req, Response res){
		final String reqJsonBody = req.body();
		JSONObject reqJson;
		boolean status = false;
		try {
			reqJson = parseBody(reqJsonBody);
			String id = (String) reqJson.get("id");
	        String username = (String) reqJson.get("username");
	        
	        System.out.println("id: " + id);
	        System.out.println("Nome: " + username);
	        if(UsuarioDAO.updateUsername(username, Integer.parseInt(id))) {
	        	status = true;
	        }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
		
       
	}
	
	public static boolean updateEmail(Request req, Response res){
		final String reqJsonBody = req.body();
		JSONObject reqJson;
		boolean status = false;
		try {
			reqJson = parseBody(reqJsonBody);
			String id = (String) reqJson.get("id");
	        String email = (String) reqJson.get("email");
	        
	        if(UsuarioDAO.updateEmail(email, Integer.parseInt(id))) {
	        	status = true;
	        }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
		
       
	}
	
	public static boolean updateSenha(Request req, Response res){
		final String reqJsonBody = req.body();
		JSONObject reqJson;
		boolean status = false;
		try {
			reqJson = parseBody(reqJsonBody);
			String id = (String) reqJson.get("id");
	        String senha = (String) reqJson.get("senha");
	        
	        if(UsuarioDAO.updateSenha(senha, Integer.parseInt(id))) {
	        	status = true;
	        }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
		
       
	}
	
}