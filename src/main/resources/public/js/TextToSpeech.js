	class TextToSpeech {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.speechUtterance = new SpeechSynthesisUtterance();
    }

    setVelocidade(speed){
        try{

           this.speechUtterance.rate = speed;
        }catch(error){
            console.error('Erro ao tentar aumentar velocidade de reprodução:', error.message);
        }
    }

    setLang(lang){
        try {
            this.speechUtterance.lang = lang
        } catch (error) {
            console.error("Error when detecting langauge, " + error.message);
        }
    }
    //Recebe uma string como entrada, faz a fala
    falar(text) {
        try{
            //Trata problemas caso o texto não seja do tipo String, pois desta forma, não seria aceito pela API
            if(!text || typeof text !== 'string'){
                throw new Error('O texto fornecido para leitura é inválido !');
            }

            //"Montando" a fala, e falando:
            this.speechUtterance.text = text;
            this.synthesis.speak(this.speechUtterance);
        } catch (error){
            console.error('Erro ao tentar iniciar a leitura:', error.message);
        }
    }

    //Faz uma breve apresentação de si
    apresentar(){
        let apresentacao = "Olá, me chamo Carlota, a sua ajudante durante esta jornada NeuroNerd, eu sou capaz de ler para você os textos que não puder. Conte comigo.";
        this.falar(apresentacao);
    
    }
    
    //Dá pause na fala, mas pode ser retomada
    pause() {
      try{
        this.synthesis.pause();
      }catch(error){
        console.error('Erro ao tentar pause a leitura:', error.message);
      }
    }
    
    //Continua a fala de onde parou
    continuar() {
      try{
        this.synthesis.resume();
      }catch(error){
        console.error('Erro ao tentar continuar a leitura:', error.message);
      }
    }
    
    //Para a fala para voltar do começo
    parar() {
        try{
            this.synthesis.cancel();
        }catch(error){
            console.error('Erro ao tentar parar a leitura:', error.message);
        }
    }



    //Aumenta a velocidade de reprodução de fala
    aumentarVelocidade() {
        try{

            //Limita a velocidade de reprodução da fala para não ser tão alta:
            if(this.speechUtterance.rate < 5){
                this.speechUtterance.rate += 0.1;
            }
        }catch(error){
            console.error('Erro ao tentar aumentar velocidade de reprodução:', error.message);
        }
    }
  
    //Diminui a velocidade de reprodução de fala
    diminuirVelocidade() {
        try{

            //Limita a velocidade de reprodução de fala para não ser menor que zero
            if(this.speechUtterance.rate > 0){
                this.speechUtterance.rate -= 0.1;
            }
        }catch(error){
            console.error('Erro ao tentar diminuir velocidade de reprodução:', error.message);
        }
    }

    falarUtterance(utterance) {
        try {
            this.synthesis.speak(utterance);
        } catch (error) {
            console.error('Erro ao tentar iniciar a leitura:', error.message);
        }
    }
}

export default TextToSpeech;