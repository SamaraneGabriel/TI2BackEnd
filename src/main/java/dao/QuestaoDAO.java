package dao;
import java.sql.*;
import model.Alternativa;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Questao;
import model.Usuario;


public class QuestaoDAO extends DAO{
	
	public static final String TABLE = "alternativas";
	public static final String cId = "id";
	public static final String cQuestaoId = "questao_id";
	
    static void logPStatement(String s){logPS_DAO("(QuestaoDAO) -> ", s);  }
    static void log(String s) {System.out.println("(QuestaoDAO) -> " + s); }
    
   
    static public Questao getQuestao(int idQuestao) {
        String sql = String.format("SELECT * FROM \"%s\".\"%s\" WHERE \"%s\" = ?",
                SCHEMA, "Questao", "id"); // Substitua "Questao" e "id" pelos nomes reais da tabela e coluna
        logPStatement(sql);

        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setInt(1, idQuestao);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                Questao questao = new Questao();
                questao.setId(rs.getInt("id"));
                questao.setNeuro_div(rs.getInt("neuro"));
                questao.setEnunciado(rs.getString("enunciado"));
                questao.setHabilidade(rs.getString("habilidade"));
                questao.setDificuldade(rs.getInt("dificuldade"));
                // Adicione aqui outros campos conforme necessário
                return questao;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null; // Ou lance uma exceção se a questão não for encontrada
    }
                                    
    static public List<Alternativa> getAlternativas(int idQuestao) {
        List<Alternativa> alternativas = new ArrayList<>();
        // Substitua 'SCHEMA' e 'TABLE' pelos seus nomes reais se eles forem diferentes
        String sql = "SELECT * FROM bancoti2.alternativas WHERE questao_id = ? ORDER BY id ASC";
        logPStatement(sql);

        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setInt(1, idQuestao);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Alternativa alternativa = new Alternativa();
                alternativa.setId(rs.getInt("id"));
                alternativa.setConteudo(rs.getString("conteudo"));
                alternativa.setCorreta(rs.getBoolean("correta"));
                alternativa.setQuestao_id(rs.getInt("questao_id"));
                // Adicione aqui outros campos conforme necessário 
                alternativas.add(alternativa);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return alternativas;
    }

    static public List<Questao> getQuestoesPorNeurodivergencia(int idNeurodivergencia) {    
    	System.out.println(idNeurodivergencia);
        List<Questao> questoes = new ArrayList<>();
        String sql = "SELECT * FROM bancoti2.questao WHERE neuro = ? ORDER BY id ASC";
        logPStatement(sql);

        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setInt(1, idNeurodivergencia);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Questao questao = new Questao();
                questao.setId(rs.getInt("id"));
                questao.setNeuro_div(idNeurodivergencia);
                questao.setEnunciado(rs.getString("enunciado"));
                questao.setHabilidade(rs.getString("habilidade"));
                questao.setDificuldade(rs.getInt("dificuldade"));
                // Adicione aqui outros campos conforme necessário
                questoes.add(questao);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return questoes;
    }

    static public int getAlternativaCorreta(List<Alternativa> alternativas) {
    	int indiceAlternativaCorreta = -1;
    	for(int i = 0; i < alternativas.size(); i++) {
    		if(alternativas.get(i).isCorreta()) {
    			indiceAlternativaCorreta = i;
    		}
    	}
    	return indiceAlternativaCorreta;
    }
    
}
