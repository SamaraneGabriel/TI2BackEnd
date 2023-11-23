package model;

public class RelacaoQuestUser {

	private int id_questao;
	private int id_usuario;
	private boolean acerto;	
	
	public int getId_questao() {
		return id_questao;
	}

	public void setId_questao(int id_questao) {
		this.id_questao = id_questao;
	}

	public int getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(int id_usuario) {
		this.id_usuario = id_usuario;
	}

	public boolean isAcerto() {
		return acerto;
	}

	public void setAcerto(boolean acerto) {
		this.acerto = acerto;
	}
	
	public RelacaoQuestUser() {
		this.id_questao = -1;
		this.id_usuario = -1;
		this.acerto = false;
	}
	
	public RelacaoQuestUser(int id_questao, int id_usuario, boolean acerto) {
		this.id_questao = id_questao;
		this.id_usuario = id_usuario;
		this.acerto = acerto;
	}
}
