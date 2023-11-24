package app;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Criptografia {

	public static String hashMD5(String senha) {
	    try {
	        MessageDigest md = MessageDigest.getInstance("MD5");
	        md.update(senha.getBytes());
	        byte[] bytes = md.digest();
	        StringBuilder sb = new StringBuilder();
	        for (byte aByte : bytes) {
	            sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
	        }
	        return sb.toString();
	    } catch (NoSuchAlgorithmException e) {
	        e.printStackTrace();
	        return null;
	    }
	}
}
	
