package app;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dao.DAO;
import dao.UsuarioDAO;
import model.RelacaoQuestUser;

public class RelacaoQuestUserDAO extends DAO{
	
	private int id_questao;
	private int id_usuario;
	private boolean acerto;
	
	public RelacaoQuestUserDAO() {
		this.id_questao = -1;
		this.id_usuario = -1;
		this.acerto = false;
	}
	
	public RelacaoQuestUserDAO(int id_questao, int id_usuario, boolean acerto) {
		this.id_questao = id_questao;
		this.id_usuario = id_usuario;
		this.acerto = acerto;
	}
	
	static public boolean atualizaAcertosUsuario(RelacaoQuestUser relation) {
		boolean status = false;
        String sql = "INSERT INTO bancoti2.usuario (questao_id, usuario_id, correta) VALUES (?, ?, ?)";
        UsuarioDAO.logPStatement(sql);
        
        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setLong   (1, relation.getId_questao());
            pstmt.setLong   (2, relation.getId_usuario());
            pstmt.setBoolean(3,     relation.isAcerto ());

            pstmt.executeUpdate();
            status = true;

            System.out.println(relation.toString());

        } catch (SQLException u) {
            System.out.println(u);
        }
	
		return status;
	}
	
		
}
