	package model;


public class Usuario {
    private int id; //id is only ever used as string
    private String nome;
    private String email;
    private String username;
	private String senha;
	private int qtdAcertos;
	private int qtdFeitos;


	// Used to create the model yourself
    public Usuario(String nome, String email, String username, String senha) {
    	this.id = -1;
    	this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.username = username;
    }
    
    // Used to extract the model -> id cannot be set and can only be get from db
    public Usuario(int id, String nome, String email, String username, String senha, int qtdAcertos, int qtdFeitos ) {
        this.id = id;
    	this.nome = nome;
        this.username = username;
        this.email = email;
    	this.senha = senha;
    	this.qtdAcertos = qtdAcertos;
    	this.qtdFeitos = qtdFeitos;
    }

    public int getId() {return id;}
    public String getNome() {return nome;}
    public String getEmail() {return email;}
    public String getUsername() {return username;}
    public String getSenha() {return senha;}
	public int getQtdAcertos() {return qtdAcertos;}
	public int getQtdFeitos() {return qtdFeitos;}
    
    public void setNome(String nome) {this.nome = nome;}
    public void setEmail(String email) {this.email = email;}
    public void setUsername(String username) {this.username = username;}
    public void setSenha(String senha) {this.senha = senha;}
	public void setQtdAcertos(int qtdAcertos) {this.qtdAcertos = qtdAcertos;}
	public void setQtdFeitos(int qtdFeitos) {this.qtdFeitos = qtdFeitos;}
    @Override
    public String toString(){
        return "usuario [email=" + email + ", senha=" + senha + ", idUsuario=" + id + ", username=" + username + 
        		"qtd acertos=" + qtdAcertos + "qtd feitos=" + qtdFeitos + "]";
    }

    public void quickPrint() {
    	System.out.println(toString());
    }
	
    
    
}
