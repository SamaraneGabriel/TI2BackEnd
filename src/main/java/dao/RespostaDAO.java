package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;
import java.time.LocalDate;
import java.security.Timestamp;
import java.sql.Date;
import java.util.Calendar;
import model.Resposta;
import model.Usuario;
import model.Pergunta;

public class RespostaDAO extends DAO{

 
	/* Deals with commenting interaction of the Forum
	 * Attempts to insert data with limited information obtained
	 * !(Doesnt the webpage give the id now?)!
	 */
    public static void inserirResposta(String conteudo, String email, int perguntaId, Date data) {
        Usuario usuario = UsuarioDAO.getUsuarioByEmail(email);
        
        if (usuario != null){
        	int usuarioId = usuario.getId();
            String sql = "INSERT INTO bancoti2.resposta "
            		+ "(conteudo, usuario_id, pergunta_id, data_postagem) VALUES (?, ?, ?, ?)";
        
            try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            	System.out.println("entrou");

                pstmt.setString(1, conteudo);
                pstmt.setInt(2, usuarioId);
                pstmt.setInt(3, perguntaId);
                pstmt.setDate(4, data);
                int affectedRows = pstmt.executeUpdate();
                
                if (affectedRows > 0) System.out.println("Resposta inserida com sucesso!");
                else System.out.println("Falha ao inserir resposta.");
                
            } catch (SQLException e) {
                throw new RuntimeException(e);
                
            }
            
        } else {
            System.out.println("Usuário não encontrado!");
            
        }
    }
    
  
    

    
    
    private static void logPStatement(String s){logPS_DAO("(RespostaDAO) -> ", s);  }
    private static void log(String s) {System.out.println("(RespostaDAO) -> " + s); }


}
