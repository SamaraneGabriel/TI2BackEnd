package service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dao.PerguntaDAO;
import dao.RespostaDAO;
import dao.UsuarioDAO;
import model.Pergunta;
import model.Resposta;
import model.Usuario;
import spark.Request;
import spark.Response;

public class PostService extends ServiceParent{
	
	
	
	@SuppressWarnings("unchecked")
	/* Returns a very specific JSON, containg the main post data and a JSONArray of comments
	 * 
	 * Contains a limiter on the amount of comments sent
	 * Refer to forum-post.js to see the JSON structure
	 * 
	 * Tags has not been implemented on the database yet, and as such default values are used
	 */
	public static Object getForumPagePost(Request req, Response res) throws Exception{
    	final int maxCommentsNum = 5;
    	
		//Get id from url sent -> need to review the formats later
    	int id = 0; 
    	try {
    		id = Integer.parseInt(req.params("id"));
    	} catch (NumberFormatException e) {
    		throw new Exception ("Failure to parse to int from url id");
    	}
    	
    	Pergunta pergunta = PerguntaDAO.getPerguntaById(id);
    	Usuario usuario = UsuarioDAO.getUsuarioById(pergunta.getUsuarioId());
    	
    	List<Resposta> respostas = PerguntaDAO.getRespostasFromId(id);
    	int cLen = (respostas.size() > maxCommentsNum) ? maxCommentsNum : respostas.size();
    	System.out.println("respostas len = " + respostas.size());
    	
    	//Build response
    	res.type("application/json");
    	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		
    	List<String> tags = Arrays.asList("adhd");
    	JSONArray postContentTags = new JSONArray(); 
    	for (String tag : tags) {
    		JSONObject tagJson = new JSONObject();
    		tagJson.put("name", tag);
    		tagJson.put("color", "red");
    		postContentTags.add(tagJson);
    	}

		

		JSONObject responseJson = new JSONObject();
		JSONObject jsonPostUser = new JSONObject();
		jsonPostUser.put("username", usuario.getNome()); 
			
		JSONObject jsonPostContent = new JSONObject(); 
		jsonPostContent.put("title", pergunta.getTitulo());
		jsonPostContent.put("text", pergunta.getConteudo());
		jsonPostContent.put("likes", random.nextInt(30));
		jsonPostContent.put("comments", random.nextInt(30));
		jsonPostContent.put("tags", postContentTags);
		jsonPostContent.put("date", (pergunta.getData_postagem()).toString());
		jsonPostContent.put("id", pergunta.getId_pergunta());
			
		responseJson.put("user", jsonPostUser);	
		responseJson.put("content", jsonPostContent);
		
		JSONArray jsonArrayComments = new JSONArray();
			
		
		
			
		for (Resposta resposta : respostas) {
			Usuario usuarioComment = UsuarioDAO.getUsuarioById(resposta.getId_usuario());
			System.out.println(usuarioComment.getNome());
			
        	JSONObject jsonComment = new JSONObject();
        	JSONObject jsonCommentUser = new JSONObject();
        	jsonCommentUser.put("username", usuarioComment.getNome());
	        	
        	JSONObject jsonCommentContent = new JSONObject(); 
        	jsonCommentContent.put("text", resposta.getConteudo());
        	jsonCommentContent.put("likes", random.nextInt(30));
        	jsonCommentContent.put("date", dateFormatter.format(resposta.getData_postagem().toLocalDate()));
        	jsonCommentContent.put("id", resposta.getId_resposta());
        	
        	
        	jsonComment.put("user", jsonCommentUser);
        	jsonComment.put("content", jsonCommentContent);
        	jsonArrayComments.add(jsonComment);
		}

        
        ///FINISH responseJson
        responseJson.put("comment", jsonArrayComments); 
        
        System.out.println(responseJson.toJSONString());
        return responseJson.toJSONString();
	}
	
	
	@SuppressWarnings("unchecked")
	public static Object getProfileDetails(Request req, Response res) throws Exception{
		final String path = "/forum/page/load-post";	
    	
    	//GET USUARIO ID
    	int id;
    	try {
    		id = Integer.parseInt(req.queryParams("id"));
    	}catch(NumberFormatException e) {
    		throw new Exception ("Failure to parse to int from url id");
    	}
    	
    	//GET USUARIO THROUGH ID ON DATABASE
    	
    	//RETURN JSON
    	res.type("application/json");
    	JSONObject returnJson = new JSONObject();
    		returnJson.put("username", null);
    		returnJson.put("name", null);
    		returnJson.put("email" , null);
    		
    	res.status(200);
    	return returnJson;
	}
	
	
	
	
	public static Object putForumPageComment(Request req, Response res) throws Exception{
    	//GET REQ BODY
		final String reqJsonBody = req.body();
		JSONObject reqJson = parseBody(reqJsonBody);



        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = currentDateTime.format(formatter);
        
        java.sql.Date sqlDate = java.sql.Date.valueOf(formattedDate);
        java.util.Date date = java.util.Date.from(currentDateTime.atZone(ZoneId.systemDefault()).toInstant());
        
		
		String content = (String) reqJson.get("content");
		String strUserId = (String) reqJson.get("userId");
		String strQuestionId = (String) reqJson.get("questionId");
		int userId = Integer.parseInt(strUserId);
		int questionId = Integer.parseInt(strQuestionId);

		
		
		System.out.println(String.format("Got values [content=(%s), user_id=(%s), question_id=(%d), date=(%s)]",
				content, userId, questionId, sqlDate.toString()));
	
		

		RespostaDAO.inserirResposta(content, userId, questionId, sqlDate);
		
		
		boolean sucess = false;
		if (sucess) {
			System.out.println("Sucessfully put " + questionId + " on database");
			res.status(200);
		} else {
			System.out.println("Sucessfully put on database");
			res.status(200);
		}
		
		return "sucess";
	}
	
	
}
