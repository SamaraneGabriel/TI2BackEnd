	package app;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Scanner;


public class Teste extends dao.DAO{
	
	Scanner sc = new Scanner(System.in);
	
    public Teste() {
        super();
        conectar();
    }

    public void finalize() {
        close();
    }

	
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	
	public void chamaCadastroPergunta() {
		int usuario_id;
		String conteudo, titulo;
		Date data_postagem;
		System.out.println("id: ");
		usuario_id = sc.nextInt();
		sc.nextLine();  // Adiciona esta linha para consumir o caractere de nova linha
		System.out.print("Titulo: ");
		titulo = sc.nextLine();
		System.out.print("Conteudo: ");
		conteudo = sc.nextLine();		
		System.out.print("Data: ");
		String String_data_postagem = sc.nextLine();
		//sc.nextLine();  // E esta, se você for usar nextLine() depois
		
		data_postagem = java.sql.Date.valueOf(String_data_postagem);
		
		cadastraPergunta(titulo, conteudo, data_postagem, usuario_id);
	}
	
	
	//FUNCAO TEMPORARIA ENQUANTO FRONT NAO FOI IMPLEMENTADO
	public void cadastraPergunta(String titulo, String conteudo, Date data, int idUsuario) {
		
        String sql = "INSERT INTO \"BancoTI2\".\"Pergunta\" (\"titulo\", \"conteudo\", \"data_postagem\", \"usuario_id\") VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setString(1, titulo);
            pstmt.setString(2, conteudo);
            pstmt.setDate(3, data);
            pstmt.setInt(4, idUsuario);

            pstmt.executeUpdate();

        } catch (SQLException u) {
            System.out.println(u);
        }
	}
	
	
	//FUNCAO TEMPORARIA ENQUANTO FRONT NAO FOI IMPLEMENTADO
	
	public void chamaCadastroQuestao() {
		int neuro, habilidade, dificuldade;
		String enunciado;
		System.out.println("Neuro: ");
		neuro = sc.nextInt();
		sc.nextLine();  // Adiciona esta linha para consumir o caractere de nova linha
		System.out.print("Enunciado: ");
		enunciado = sc.nextLine();
		System.out.print("Habilidade: ");
		habilidade = sc.nextInt();		
		sc.nextLine();  // E esta também
		System.out.print("Dificuldade: ");
		dificuldade = sc.nextInt();
		sc.nextLine();  // E esta, se você for usar nextLine() depois
		
		cadastraQuestao(neuro, enunciado, habilidade, dificuldade);
	}
	
	public void cadastraQuestao(int neuro, String enunciado, int habilidade, int dificuldade) {
		
        String sql = "INSERT INTO \"BancoTI2\".\"Questao\" (\"neuro\", \"enunciado\", \"habilidade\", \"dificuldade\") VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setInt(1, neuro);
            pstmt.setString(2, enunciado);
            pstmt.setInt(3, habilidade);
            pstmt.setInt(4, dificuldade);

            pstmt.executeUpdate();

        } catch (SQLException u) {
            System.out.println(u);
        }
	
	}
	
	public void chamaCadastroAlternativa() {
		int id_questao;
		String conteudo;
		int resposta;
		boolean is_correta;
		System.out.println("id: ");
		id_questao = sc.nextInt();
		sc.nextLine();  // Adiciona esta linha para consumir o caractere de nova linha
		System.out.print("Conteudo: ");
		conteudo = sc.nextLine();
		System.out.print("Correta: ");
		resposta = sc.nextInt();		
		
		is_correta = (resposta == 1) ? true : false;
		
		cadastraAlternativa(conteudo, id_questao, is_correta);
	}
	
	public void cadastraAlternativa(String conteudo, int idQuestao, boolean isCorreta) {
        String sql = "INSERT INTO \"BancoTI2\".\"alternativas\" (\"conteudo\", \"questao_id\", \"correta\") VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conexao.prepareStatement(sql)) {
            pstmt.setString(1, conteudo);
            pstmt.setInt(2, idQuestao);
            pstmt.setBoolean(3, isCorreta);

            pstmt.executeUpdate();

        } catch (SQLException u) {
            System.out.println(u);
        }
	
	}
	
	
	
}
