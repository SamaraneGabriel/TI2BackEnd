package service;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dao.QuestaoDAO;
import dao.UsuarioDAO;
import model.Alternativa;
import model.Questao;
import spark.Request;
import spark.Response;

public class ExerciciosService extends ServiceParent{
	
	@SuppressWarnings("unchecked")
	/* Returns a very specific json array used for exercicio.js to load the exercices
	 * 
	 * A json array is used to allow for queueing of exercices instead of having to a fetch for each one
	 * Refer to exercicio.js to see the jsonArray structure
	 */
	public static Object getExercicio(Request req, Response res) throws Exception {
		String neuro = req.queryParams("neuro");
		//Look-up table for values
		int neuroNum = Integer.parseInt(neuro);
        
        res.type("application/json");
        
        //Get todas as questoes de certa neurodiv

        List<Questao> questoes = QuestaoDAO.getQuestoesPorNeurodivergencia(neuroNum);
        JSONArray jsonArray = new JSONArray();

    	for (int i = 0; i < questoes.size(); i++) {
    	    JSONObject json = new JSONObject();
    	    
    	    List<Alternativa> alternativas = QuestaoDAO.getAlternativas(questoes.get(i).getId());
            System.out.println("size = "+alternativas.size() + " id =" + questoes.get(i).getId());
            
    	    int indiceCorreto = QuestaoDAO.getAlternativaCorreta(alternativas);
    	    if (indiceCorreto < 0) System.err.println("Couldnt find correct alternative");
    	    
    	    json.put("text", questoes.get(i).getEnunciado());
    	    json.put("type", questoes.get(i).getNeuro_div()); 
    	    json.put("correct", indiceCorreto); 
    	    
    	    JSONArray jsonAlternatives = new JSONArray();
    	    for (Alternativa alt : alternativas) {
    	        JSONObject jsonAlt = new JSONObject();
    	        jsonAlt.put("conteudo", alt.getConteudo());
    	        jsonAlternatives.add(jsonAlt);
    	    }
    	    json.put("alternatives", jsonAlternatives);
    	    
    	    jsonArray.add(json);
    	}  

        System.out.println(jsonArray.toJSONString());
        return jsonArray.toJSONString(); //response must go as string
	}
	
	public static Object postComment(Request req, Response res) throws Exception{
		return res;
	}
	
	public static Object atualizaQuestoesUsuario(Request req, Response res) throws Exception {
		final String reqJsonBody = req.body(); 	  									  
		JSONObject reqJson = parseBody(reqJsonBody);
		
		String isCorreta = (String) reqJson.get("isCorrect");
		String id = (String) reqJson.get("id");
		
		System.out.println("ISCORRETA: " + isCorreta);
		System.out.println("Id: " + id);
		
		boolean bool = (isCorreta.compareTo("TRUE") == 0) ? true : false;
		
		int idNum = Integer.parseInt(id);
		
		JSONObject responseJson = new JSONObject();

		if(UsuarioDAO.atualizaInfoQuestoesUser(bool, idNum)) {
			res.status(200);
			responseJson.put("payload", "sucess");
			System.out.println("TABELA DE QUESTOES USUARIO ATUALIZADA");
		}
		
		return responseJson;
	}

}
