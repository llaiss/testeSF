PennController.ResetPrefix(null); // Comando essencial para o funcionamento dos demais comandos. Ele inativa os prefixos que acompanham as declarações de elemento do PennController.
PennController.DebugOff();

//Definindo a ordem de aparecimento das telas do experimento:
Sequence("Participante", "Termo", "Instrucoes", randomize ("Experimento"), Sendresults(), "Final");
//os comandos são os nomes das telas do experimento. obs- pcibex nao aceita caracteres especiais nem diacriticos
//o Sequence serve também randomizar os itens de uma tela e enviar os resultados de uma das telas.
// Sendresults - envia os resultados antecipadamente. 


//Cria um cabeçalho. Todos os comandos dentro do cabeçalho serão rodados automaticamente antes de cada "trial"
Header(
//Define que todo texto será impresso na tela e que o tamanho da fonte será "1.2em"
         defaultText
            .css("font-size","1.2em")
            .print() //indica que esse elemento deve aparecer na tela para o participante.
         ,

//Define que toda caixa de texto será impressa na tela e que o tamanho da fonte será "1.2em"
         defaultTextInput
            .css("font-size","1.2em")
            .print()
         ,

//Define que todo botão será impresso na tela, que o tamanho da fonte será "1.2em" e que o participante será obrigado a interagir com ele para prosseguir com o experimento
         defaultButton
            .css("font-size","1.2em")
            .center()
            .print()
            .wait()       //importante mandar esperar para que a pessoa possa clicar no botão.  
				,
)


//Cria uma nova tela - Tela de coleta de dados do participante. Abaixo define-se como ela funcionará.
newTrial("Participante",

//Texto inicial - aqui escreve o texto, colocando-o entre parágrafos. 
			newText("<p><b>QUESTIONÁRIO DE AVALIAÇÃO DE SIMILARIDADE</b></p>") 
			, 
			newText("<p>Bem-Vind@s!</p>") 
			, 
			newText("<p>Neste teste, você vai ouvir uma palavra em português e, em seguida, a repetição da primeira sílaba feita por outra pessoa. </p>") 
			, 
			newText("<p>Não há certo ou errado; o intuito do teste é identificar o que é mais semelhante de acordo com a <i>sua</i> percepção. </p>") 
			, 
			newText("<p>Considerando 1 como <u>nada similar</u> e 5 como <u>muito similar</u>, avalie a semelhança entre as pronúncias. </p>") 
			, 
			newText("<p>Por favor, escreva seu NOME COMPLETO, sem abreviações, na caixa abaixo.</p>") 
			,

//Cria uma caixa de texto nomedada "Nome" para receber o nome do participante  
         newTextInput("Nome")
         ,
         newText("<p>Por favor, escreva o seu E-MAIL na caixa abaixo.</p>")
         ,
         newTextInput("Email")
         ,
         newText("<p>Escreva sua IDADE na caixa a abaixo. (Exemplo: 25)</p>")
         ,
         newTextInput("Idade")
         ,
         newText("<p>Agora selecione sua ESCOLARIDADE na caixa abaixo e aperte o botão 'Iniciar' para avançar.</p>")
         , 

//Cria uma caixa com seletores nomeada "Escolaridade" para que o participante selecione sua escolaridade
         newDropDown("Escolaridade", "Selecione sua escolaridade")
                  .add("Médio completo", "Superior em curso", "Superior completo", "Pós-graduação")
                  .css("font-size","1.2em")
                  .print()
                  .log() //Envia para o arquivo "results" a opção selecionada pelo participante 
         ,

//Cria um botão nomeado "Iniciar"
         newButton("Iniciar")
         ,

//Cria uma nova variável chamada "NOME" que recebe o conteúdo da caixa de texto "Nome"
         newVar("NOME")
                  .global()
                  .set( getTextInput("Nome") )
         ,
         newVar("EMAIL")
                  .global()
                  .set( getTextInput("Email") )
          ,
         newVar("IDADE")
                  .global()
                  .set( getTextInput("Idade") )
         
)

//Envia para o arquivo "results" o conteúdo da variável "NOME"
.log( "NOME" , getVar("NOME") )






//Nova tela - Tela do termo de consentimento
newTrial("Termo",
         
    newText("<p><b>TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO</b></p>")
    ,
		newText("Termo de Consentimento Livre e Esclarecido </p>"),
		newText("Esta pesquisa est&aacute sendo desenvolvida pela aluna do curso de mestrado em Lingu&iacutestica da UFRJ Aline Saguie, sob a orienta&ccedil&atildeo do professor Marcus Maia.</p> A finalidade deste trabalho &eacute contribuir com a ci&ecircncia.</p> Solicitamos sua autoriza&ccedil&atildeo para utilizar seus dados em eventos da &aacuterea e publica&ccedil&otildees posteriores.</p> Basta voc&ecirc escrever EU CONCORDO na caixa de texto abaixo. "),
		newTextInput("tcle")
		.css("font-size","1.2em")
    .print()
    .log()
,
		 newButton("Start")
    .css("font-size","1.2em")
        .print()
        .wait()
        )







newTrial("Instrucoes",

			newText("<p><b>INSTRUÇÕES:</b></p>") 
			, 
			newText("<p>Avalie o grau de semelhança entre as pronúncias. Marque 1 para <u>nada similar</u> e 5 para <u>muito similar</u>.</p>") 
			, 
			newText("<p>Lembre-se: não há certo ou errado; o intuito do questionário é registrar a sua percepção.</p>") 
			,

			newButton("Iniciar")
         .log()



//Indica o uso da tabela "tabela_script_auditivo.csv"
Template("tabela_script_auditivo.csv",
// "variable" vai automaticamente apontar para cada linha da tabela "tabela_script_auditivo.csv"
         row => newTrial( "Experimento",
//"variable" aponta para todas as linhas da coluna "AudioExperimento" da tabela "tabela_script_auditivo.csv" e toca o audio referente a elas
                  newAudio("AudioExperimento", row.AudioExperimento)
                           .play()
                  ,
//Exibe na tela a imagem "alto_falante_icone.png"
                  newImage("alto_falante_icone.png")
                           .size( 90 , 90 )
                           .print()
       
			      
newScale("respostaTarget" , 5)
.before(newText("labelEscalaTarget0" , "<b>  Nada aceit&aacutevel  <b>"))
.after (newText ("labelEscalaTarget5" , " <b> Plenamente aceit&aacutevel <b>"))
.center()
.print()
.log ()
.wait ()
 ,



//Envia para o arquivo "results" o conteúdo da coluna "Group" 
         .log("Group", row.Group)
         .log("Item", row.item)
);		



//Nova Tela - Tela final    
newTrial( "Final" ,
    newText("<p> O experimento foi concluído. Obrigada pela participação!</p>")
    .center()
    ,
    newText("<p> Você receberá um e-mail com a sua declaração de participação.</p>")
    .center()
    .wait()
 ,

    newImage("LAPEX_logo_cor.png") //Exibe na tela o logo do Lapex:
	    .print()
			.log()
,
		newButton("validation", "Finalizar")
    .print()
    .wait()

)

//Ajeita a barra de pogresso para que ela fique completa
.setOption("countsForProgressBar",false);
//Fim do Script
