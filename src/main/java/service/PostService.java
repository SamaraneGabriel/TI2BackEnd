package service;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dao.PerguntaDAO;
import dao.RespostaDAO;
import model.Pergunta;
import model.Resposta;
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
    		id = Integer.parseInt(req.queryParams("id"));
    	} catch (NumberFormatException e) {
    		throw new Exception ("Failure to parse to int from url id");
    	}
    	
    	Pergunta pergunta = PerguntaDAO.getPerguntaById(id);
    	List<Resposta> respostas = PerguntaDAO.getRespostasFromId(id);
    	int cLen = (respostas.size() > maxCommentsNum) ? maxCommentsNum : respostas.size();
    	
    	
    	//Build response
    	res.type("application/json");
    	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		
    	List<String> tags = Arrays.asList("adhd");
    	JSONArray postContentTags = new JSONArray(); 
    	for (String tag : tags) {
    	    postContentTags.add(tag);
    	}

		
		//-----JSON Overall Structure-----------------
		
		JSONObject responseJson = new JSONObject();
			JSONObject jsonPost = new JSONObject();
				JSONObject jsonPostUser = new JSONObject();
					//jsonPostUser.put("name", pergunta.getNome_usuario()); -> find another way to get name from pergunta
					jsonPostUser.put("date", (pergunta.getData_postagem()).toString());
				JSONObject jsonPostContent = new JSONObject(); 
					jsonPostContent.put("title", pergunta.getTitulo());
					jsonPostContent.put("text", pergunta.getConteudo());
					jsonPostContent.put("likes", random.nextInt(30));
					jsonPostContent.put("comments", random.nextInt(30));
					jsonPostContent.put("tags", postContentTags);
					//jsonPostContent.put("id", pergunta.getId_pergunta());
				
				jsonPost.put("user", jsonPostUser);	
				jsonPost.put("content", jsonPostContent);
			
			JSONArray jsonArrayComments = new JSONArray();
			
			
		//----------------------------------------
			
		for (Resposta resposta : respostas) {
	        	JSONObject jsonComment = new JSONObject();
	        	JSONObject jsonCommentUser = new JSONObject();
		        	jsonCommentUser.put("name", resposta.getNome_usuario());
		        	jsonCommentUser.put("date", dateFormatter.format(resposta.getData_postagem().toLocalDate()));
	        	JSONObject jsonCommentContent = new JSONObject(); 
		        	jsonCommentContent.put("text", resposta.getConteudo());
		        	jsonCommentContent.put("likes", random.nextInt(30));
		        	//jsonCommentContent.put("id", respostas[i].getId_resposta());
        	
        	jsonComment.put("user", jsonCommentUser);
        	jsonComment.put("content", jsonCommentContent);
        	jsonArrayComments.add(jsonComment);
		}

        
        ///FINISH responseJson
        responseJson.put("post", jsonPost);
        responseJson.put("comment", jsonArrayComments); 
        
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

		String dateString = (String) reqJson.get("time");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date parsedDate = dateFormat.parse(dateString);
        java.sql.Date date = new java.sql.Date(parsedDate.getTime());
		
		String content = (String) reqJson.get("content");
		String email = (String) reqJson.get("sub");
		String questionId = (String) reqJson.get("id");
		
		int id = Integer.parseInt(questionId);
		
		System.out.println(String.format("Got values [content=(%s), email=(%s), question_id=(%s)]",
				content, email, questionId));
	
		
		RespostaDAO.inserirResposta(content, email, id, date);
		
		
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
