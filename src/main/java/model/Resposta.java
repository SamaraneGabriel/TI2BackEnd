package model;

import java.sql.Date;
import java.time.LocalDate;

public class Resposta {

	private int id_resposta;
	private int id_pergunta;
	private String conteudo;
	private Date data_postagem;
	private int id_usuario;
	private String nome_usuario;
	
	//GETTERS
	public String getNome_usuario() {return nome_usuario;}
	public int getId_resposta() {return id_resposta;}
	public int getId_pergunta() {return id_pergunta;}
	public String getConteudo() {return conteudo;}
	public Date getData_postagem() {return data_postagem;}
	public int getId_usuario() {return id_usuario;}
	
	//SETTERS
	public void setNome_usuario(String nome_usuario) {this.nome_usuario = nome_usuario;}
	public void setId_resposta(int id_resposta) {this.id_resposta = id_resposta;}
	public void setId_pergunta(int id_pergunta) {this.id_pergunta = id_pergunta;}
	public void setConteudo(String conteudo) {this.conteudo = conteudo;}
	public void setData_postagem(Date date) {this.data_postagem = date;}
	public void setId_usuario(int id_usuario) {this.id_usuario = id_usuario;}
	
	
}
