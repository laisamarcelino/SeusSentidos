//Inputs e tratamentos necessários
// nome -> ok, não precisa de verificação
// email -> ok, verificação automática pelo type do input
// senha -> verificar minimo de caracteres
// confirmação de senha -> verificar se senha1 = senha2
// RG -> verificação de RG
// CEP -> completar automaticamente pelo API e trata erros 
//        campos: estado, cidade, bairro, rua, num, complemento

// ------------------ DECLARAÇÃO DE VARIAVEIS ----------------------------------------
const senha = document.getElementById('inputSenha')
const confirmaSenha = document.getElementById('inputConfirmaSenha')
const formulario = document.getElementById('formulario')
//const email = document.getElementById('inputEmail')
const cep = document.getElementById('inputCEP')
const estado = document.getElementById('inputEstado')
const cidade = document.getElementById('inputCidade')
const bairro = document.getElementById('inputBairro')
const rua = document.getElementById('inputRua')
//const numero = document.getElementById('inputNum')
//const complemento = document.getElementById('inputComplemento')
//const formInputs = document.querySelectorAll('.form-control')
const valorBotao = document.getElementById('envioFormulario')
const valorSenha1 = 0
const valorSenha2 = 0

// ----------------- FUNÇÕES / OBJETOS / CLASSES -----------------------------------

const trataCEP = {
    limpaFormulario: function(){
        formulario.reset()
    },
    msgErro: function(){
        alert("CEP inválido, tente novamente!")
    }

}

const trataSenha = {
    estiloMinCaracteres: function (senhaDigitada, senha){
        for (let i = 1; i < senhaDigitada.length; i++) {
            senha.style.backgroundColor = "red"
            if (senhaDigitada.length === 8) {
                senha.blur()
                senha.style.backgroundColor = "white"
                valorSenha1 = senha.value
            }
        }
    },

    estiloComparaSenhas: function(senha2Digitada, confirmaSenha, senha){
        if(senha2Digitada != senha.value){
            confirmaSenha.style.backgroundColor = 'red'
        }
        else{
            confirmaSenha.style.backgroundColor = 'white'
        }
    },
    validaEnvio: function(senha, confirmaSenha){
        if(senha.value === confirmaSenha.value){
            return alert('cadastro realizado')
        }
        else{
            return alert('tente novamente')
        }
    }
    

}

//---------------------- Tratamento de Senha -----------------------------

senha.addEventListener("keyup", function (event) {
    const senhaDigitada = event.target.value //indica o elemento que disparou o evento
    trataSenha.estiloMinCaracteres(senhaDigitada, senha)
} 
)

 
confirmaSenha.addEventListener("keyup", function(event){
    const senha2Digitada = event.target.value
    trataSenha.estiloComparaSenhas(senha2Digitada, confirmaSenha, senha)
})

valorBotao.addEventListener("submit", function (evento) {
    evento.preventDefault() //retira o envio padrão do formulario
    //------------ falta tratar o caso de senhas serem diferentes ou com menos de 8 caracteres
})


// -------------------- REQUISIÇÃO API: Endereço ---------------------------------------------------------------------

//pega o valor difigitado pelo usuario simultaneamente 
cep.addEventListener("keyup", function (event) {
    const valorDigitado = event.target.value //indica o elemento que disparou o evento

    if (valorDigitado.length === 8) { //valida a quantidade de caracteres do cep
        buscaEndereco(valorDigitado)
        cep.blur() //tira o cursor do mouse da caixa de seleção para que o usuario nao digite mais de 8 algarismos
    }

})

const buscaEndereco = async (cep) => {
    
    const urlAPI = `https://viacep.com.br/ws/${cep}/json` //template string uma vez que a API buscará o valor do cep armazenado em uma variável
    const resposta = await fetch(urlAPI) // o fetch envia uma requisição GET para a URL especificada. O await foi utilizado uma vez que trata-se de uma função assincrona, ele aguarda a conclusão de uma promesa antes de prosseguir a execução do código. 
    const dados = await resposta.json() //recebe os dados do endereço
    //console.log(dados)

    //---------- falta tratar o erro para caso cep não exista



    // Autocompleta os inputs 
    estado.value = dados.uf
    cidade.value = dados.localidade
    bairro.value = dados.bairro
    rua.value = dados.logradouro
}


