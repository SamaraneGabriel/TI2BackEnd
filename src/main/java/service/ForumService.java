package service;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dao.PerguntaDAO;
import model.Pergunta;
import spark.Request;
import spark.Response;

public class ForumService extends ServiceParent{
	@SuppressWarnings("unchecked")
	/* Returns a very specific JSONArray containing multiple post preview from
	 * the forum explore section
	 * 
	 * Contains a limiter on the amount of posts sent.
	 * Refer to forum-explore.js to see the JSONArray structure
	 * 
	 * Tags has not been implemented on the database yet, and as such default values are used
	 */
	public static Object getForumHomepage(Request req, Response res) throws Exception{
    	final int postsMaxLen = 5;
    	
    	List<Pergunta> perguntas = PerguntaDAO.getMostRecent(5);
		int postsLen = (perguntas.size() > postsMaxLen) ? postsMaxLen : perguntas.size();
		
		if (postsLen == 0) {
			res.status(400);
			System.err.println("Couldnt find any values. Exiting");
			return "failure";
		}
		
		res.type("application/json");
		String[] defaultTags = {"adhd"};
		
		
		//Build response
		JSONArray jsonArray = new JSONArray();
		
        for (int i = 0; i < postsLen; i++) {
        	JSONArray tagsArray = new JSONArray();
        	for (String s : defaultTags) {
        		tagsArray.add(s);
        	}
   
        	JSONObject json = new JSONObject(); //Contains user and content JSONObject
        		JSONObject userJson = new JSONObject();
        			//userJson.put("name", perguntas.get(i).getNome_usuario());  -> create method list user from list questao          
        			userJson.put("date", (perguntas.get(i).getData_postagem()).toString()); 
	        	JSONObject contentJson = new JSONObject();
		        	contentJson.put("title", perguntas.get(i).getTitulo());
		        	contentJson.put("text", perguntas.get(i).getConteudo());
		        	contentJson.put("likes", random.nextInt(30)); //nao possui
		        	contentJson.put("comments", random.nextInt(30));
		        	contentJson.put("tags", tagsArray);
		        	contentJson.put("id", perguntas.get(i).getId_pergunta());
        	//finish the json
        	json.put("user", userJson);
        	json.put("content", contentJson);
        	jsonArray.add(json);
        }

		res.status(200);
        return jsonArray.toJSONString();
	}
	
}
