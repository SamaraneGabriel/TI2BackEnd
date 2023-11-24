package dao;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Usuario;
import app.Criptografia;


public class UsuarioDAO extends DAO{
	public static final String cId = "id"; //uk
	public static final String cNome = "nome"; 
	public static final String cUsername = "username"; //uk
	public static final String cEmail = "email"; //uk
	public static final String cSenha = "senha";
	public static final String cQtdAcertos = "qtd_acertos";
	public static final String cQtdFeitas = "qtd_feitas";
    
    
	
    
    public static Usuario getUsuarioById(int id) {
    	Usuario usuario = null;
    	String sql = "SELECT * FROM bancoti2.usuario WHERE id = ?";
    	
    	try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
	         pstmt.setInt(1, id);
	      
	         try (ResultSet resultSet = pstmt.executeQuery()) {
	             if (resultSet.next()) {
	                 String nome = resultSet.getString(cNome);
	                 String username = resultSet.getString(cUsername);
	                 String email = resultSet.getString(cEmail);
	                 String senha = resultSet.getString(cSenha);
	                 int qtdAcertos = resultSet.getInt(cQtdAcertos);
	                 int qtdFeitas = resultSet.getInt(cQtdFeitas);
	                 
	                 usuario = new Usuario(id, nome,username,email,senha, qtdAcertos, qtdFeitas);
	             } else {
	            	 System.out.println("Usuário id " + id + " não está cadastrado");
	             }
	         }
	         
	     } catch (SQLException e) { e.printStackTrace(); }
    	
    	return usuario;
    }
    
    
    public static Usuario getUsuarioByEmail(String email) {
    	Usuario usuario = null;
    	String sql = "SELECT * FROM bancoti2.usuario WHERE email = ?";
    	
    	try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
	         pstmt.setString(1, email);
	      
	         try (ResultSet resultSet = pstmt.executeQuery()) {
	             if (resultSet.next()) {
	            	 int id = resultSet.getInt(cId);
	                 String nome = resultSet.getString(cNome);
	                 String username = resultSet.getString(cUsername);
	                 String senha = resultSet.getString(cSenha);
	                 int qtdAcertos = resultSet.getInt(cQtdAcertos);
	                 int qtdFeitas = resultSet.getInt(cQtdFeitas);
	                 
	                 usuario = new Usuario(id, nome,username,email ,senha, qtdAcertos, qtdFeitas);
	             } else {
	            	 System.out.println("Usuário email " + email + " não está cadastrado");
	             }
	         }
	         
	     } catch (SQLException e) { e.printStackTrace(); }
    	
    	return usuario;
    }
    
    public static Usuario getUsuarioByUsername(String username) {
    	Usuario usuario = null;
    	String sql = "SELECT * FROM bancoti2.usuario WHERE username = ?";
    	
    	try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
	         pstmt.setString(1, username);
	      
	         try (ResultSet resultSet = pstmt.executeQuery()) {
	             if (resultSet.next()) {
	            	 int id = resultSet.getInt(cId);
	                 String nome = resultSet.getString(cNome);
	                 String email = resultSet.getString(cEmail);
	                 String senha = resultSet.getString(cSenha);
	                 int qtdAcertos = resultSet.getInt(cQtdAcertos);
	                 int qtdFeitas = resultSet.getInt(cQtdFeitas);
	                 
	                 usuario = new Usuario(id, nome,username,email,senha, qtdAcertos, qtdFeitas);
	             } else {
	            	 System.out.println("Usuário username " + username + " não está cadastrado");
	             }
	         }
	         
	     } catch (SQLException e) { e.printStackTrace(); }
    	
    	return usuario;
    }
    
    public static boolean updateCol(String sql, String value, int id) {
    	try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
    		pstmt.setString(1, value);
    		pstmt.setInt(2, id);
    		pstmt.executeUpdate();
    		
    	} catch (SQLException e) {
    		e.printStackTrace();
    		return false;
    	}
    	
    	return true;
    }
    
    public static boolean updateNome(String nome, int id) {
    	return updateCol("UPDATE bancoti2.usuario SET nome = ? WHERE id = ?", nome, id);
    }
    
    public static boolean updateUsername(String username, int id) {
    	return updateCol("UPDATE bancoti2.usuario SET username = ? WHERE id = ?", username, id);
    }
    
    public static boolean updateEmail(String email, int id) {
    	return updateCol("UPDATE bancoti2.usuario SET email = ? WHERE id = ?", email, id);
    }
    
    public static boolean updateSenha(String senha, int id) {
    	return updateCol("UPDATE bancoti2.usuario SET senha = ? WHERE id = ?", Criptografia.hashMD5(senha), id);
    }
    

    
    /* Usuario post. Used to insert new Usuario value to table
     * Returns false if failed. getSQLState may be used to notify of duplicate key violation
     */
    public static boolean postUsuario(Usuario usuario) {
    	String sql = "INSERT INTO bancoti2.usuario (nome, username, email, senha, qtd_acertos, qtd_feitas) VALUES (?, ?, ?, ?, ?, ?)";
    	
    	try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
    	     pstmt.setString(1, usuario.getNome());
             pstmt.setString(2, usuario.getUsername());
             pstmt.setString(3, usuario.getEmail());
             pstmt.setString(4, Criptografia.hashMD5(usuario.getSenha()));
             pstmt.setInt(5, 0);
             pstmt.setInt(6, 0);
             pstmt.executeUpdate();

         } catch (SQLException u) {
             u.printStackTrace();
             return false;
         }
    	
         return true;
    }
    
    
    
    /* Delete user from database
     * Return false if failed
     */
    static public boolean delete(int id) {
        String sql = "DELETE FROM bancoti2.usuario WHERE id = ?";

        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    
    
    //------------------------------------------------------------------------
    ///Other methods
    
    
    /* Authenticates via email and password
     * Returns true if authentication is a success
     */
	    public static boolean autenticaUsuario(String email, String senha) {    
	        boolean status = false;
	        // Use o nome completo da tabela, incluindo o esquema
	        String sql = "SELECT username FROM bancoti2.usuario WHERE email = ? AND senha = ?";
	        logPStatement(sql);
	        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
	            pstmt.setString(1, email);
	            pstmt.setString(2, senha);
	            
	            System.out.println("USUARIO TENTOU LOGAR COM EMAIL: " + email + "E SENHA: " + senha);
	            
	            ResultSet resultSet = pstmt.executeQuery();
	            // Se resultSet tem pelo menos uma linha, o usuário foi autenticado
	            if (resultSet.next()) {
	                log("Usuario esta cadastrado");    
	                status = true;
	            }
	        } catch (SQLException e) {
	            throw new RuntimeException(e);
	        }
	        System.out.println(status);
	        return status;
	    }
	 
    
    
    /* Get list of Usuario amidst two id values
     * List comes out empty if operation ailed
     */
    public static List<Usuario> getUsuarioList(int idMin, int idMax) {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        String sql = String.format("SELECT * FROM bancoti2.usuario WHERE id BETWEEN ? AND ?");
        logPStatement(sql);
        
        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setInt(1, idMin);
            pstmt.setInt(2, idMax);

            ResultSet resultSet = pstmt.executeQuery();
            
            while(resultSet.next()) {
            	int id = resultSet.getInt(cId);
                String nome = resultSet.getString(cNome);
                String username = resultSet.getString(cUsername);
                String email = resultSet.getString(cEmail);
                String senha = resultSet.getString(cSenha);
                int qtdAcertos = resultSet.getInt(cQtdAcertos);
                int qtdFeitas = resultSet.getInt(cQtdFeitas);

                usuarios.add(new Usuario(id, nome, username, email, senha, qtdAcertos, qtdFeitas));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }
 


    public static boolean atualizaInfoQuestoesUser(boolean isCorreta, int idUser) {
    	boolean status = false;
    	 String sql = "UPDATE bancoti2.usuario SET qtd_acertos = ?, qtd_feitas = ? WHERE id = ?";
    	 
    	 int qtdAcertos = 0;
    	 int qtdFeitas = 0;
    	 
    	 Usuario usuario = getUsuarioById(idUser);
    	 
    	 if(isCorreta) {
    		qtdAcertos = usuario.getQtdAcertos() + 1;
    	 }
    	 else {
    		 qtdAcertos = usuario.getQtdAcertos();
    	 }
    	 
    	 qtdFeitas = usuario.getQtdFeitos() + 1;
         
         try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
             pstmt.setInt(1, qtdAcertos);
             pstmt.setInt(2, qtdFeitas);
             pstmt.setInt(3, idUser);

             pstmt.executeUpdate();
             status = true;
         } catch (SQLException e) {
             e.printStackTrace();
         }
         
         return status;
    	
    }

    static public void logPStatement(String s){logPS_DAO("(UsuarioDAO) -> ", s);  }
    static public void log(String s) {System.out.println("(UsuarioDAO) -> " + s); }
    
}