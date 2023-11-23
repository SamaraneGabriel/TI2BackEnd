package model;

public class Alternativa {

	private int id;
	private String conteudo;
	private boolean correta;
	private int questao_id;
	
	public Alternativa() {
		
	}
	
	public Alternativa(int id, String conteudo, boolean correta, int questao_id) {
		this.id = id;
		this.conteudo = conteudo;
		this.correta = correta;
		this.questao_id = questao_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getConteudo() {
		return conteudo;
	}
	public void setConteudo(String conteudo) {
		this.conteudo = conteudo;
	}
	public boolean isCorreta() {
		return correta;
	}
	public void setCorreta(boolean correta) {
		this.correta = correta;
	}
	public int getQuestao_id() {
		return questao_id;
	}
	public void setQuestao_id(int questao_id) {
		this.questao_id = questao_id;
	}
	
	
	
}
