package model;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Pergunta {
	private int id;
	private String titulo;
	private String conteudo;
	private Date dataPostagem;
	private int usuarioId;
	//private String usuarioNome; //not from the table. Where does it come from?
	
	
	// When creating a obj -> id cant be created outside of sql
	public Pergunta(Date data_postagem, String titulo, String conteudo, int id_usuario) {
		this.titulo = titulo;
		this.conteudo = conteudo;
		this.dataPostagem = data_postagem;
		this.usuarioId = id_usuario;
	}
	
	
	// When getting from sql
	public Pergunta(int id, Date data_postagem, String titulo, String conteudo, int id_usuario){
		this.titulo = titulo;
		this.conteudo = conteudo;
		this.dataPostagem = data_postagem;
		this.usuarioId = id_usuario;
		this.id = id;
	}
	

	
	

	//GETTERS
	public int getId_pergunta() {return id;}
	public String getTitulo() {return titulo;}
	public Date getData_postagem() {return dataPostagem;}
	public String getConteudo() {return conteudo;}
	public int getUsuarioId() {return usuarioId;}

	
	//SETTERS
	public void setId_pergunta(int id_pergunta) {this.id = id_pergunta;}
	public void setTitulo(String titulo) {this.titulo = titulo;}
	public void setData_postagem(Date data_postagem) {this.dataPostagem = data_postagem;}
	public void setConteudo(String conteudo) {this.conteudo = conteudo;}
	public void setId_usuario(int id_usuario) {this.usuarioId = id_usuario;}

	
	@Override
	public String toString() {
		return String.format("Pergunta [id=%d, titulo=%s, conteudo=%s, data=%s, usuario_id=%d]", 
				id, titulo, conteudo, dataPostagem, usuarioId);
	}
	
	

	
	public void printAll() {
		System.out.println(this.toString());
	}
	
}
