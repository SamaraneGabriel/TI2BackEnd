package model;

public class Questao {

	private int id;
	private int neuro;
	private String enunciado;
	private int dificuldade;
	private String habilidade;

	
	//GETTERS
	public int getId() {return id;}
	public int getNeuro_div() {return neuro;}
	public String getEnunciado() {return enunciado;}
	public int getDificuldade() {return dificuldade;}
	public String getHabilidade() {return habilidade;}

	
	@Override
	public String toString() {
		return "Questao [id=" + id + ", neuro_div=" + neuro + ", enunciado=" + enunciado + ", dificuldade="
				+ dificuldade + ", habilidade=" + habilidade + "]";
	}
	
	//SETTERS
	public void setId(int id) {this.id = id;}
	public void setNeuro_div(int neuro_div) {this.neuro = neuro_div;}
	public void setEnunciado(String enunciado) {this.enunciado = enunciado;}
	public void setDificuldade(int dificuldade) {this.dificuldade = dificuldade;}
	public void setHabilidade(String string) {this.habilidade = string;}

}
