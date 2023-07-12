// ------------------ DECLARAÇÃO DE VARIAVEIS ----------------------------------------
const senha = document.getElementById('inputSenha')
const confirmaSenha = document.getElementById('inputConfirmaSenha')
const formulario = document.getElementById('formulario')
const email = document.getElementById('inputEmail')
const cep = document.getElementById('inputCEP')
const estado = document.getElementById('inputEstado')
const cidade = document.getElementById('inputCidade')
const bairro = document.getElementById('inputBairro')
const rua = document.getElementById('inputRua')
const numero = document.getElementById('inputNum')
const complemento = document.getElementById('inputComplemento')
//const formInputs = document.querySelectorAll('.form-control')
const valorBotao = document.getElementById('envioFormulario')
const nome = document.getElementById('inputNome')
let valorSenha1 = 0
let valorSenha2 = 0

// ----------------- FUNÇÕES / OBJETOS / CLASSES -----------------------------------

const trataCEP = {
    limpaFormulario: function () {
        formulario.reset()
    },
    msgErro: function () {
        alert("CEP inválido, tente novamente!")
    }

}

const trataSenha = {
    estiloMinCaracteres: function (senhaDigitada, senha) {
        for (let i = 1; i < senhaDigitada.length; i++) {
            senha.style.backgroundColor = "red"
            if (senhaDigitada.length === 8) {
                senha.blur()
                senha.style.backgroundColor = "white"
                valorSenha1 = senha.value
            }
        }
    },

    estiloComparaSenhas: function (senha2Digitada, confirmaSenha, senha) {
        if (senha2Digitada != senha.value) {
            confirmaSenha.style.backgroundColor = 'red'
        }
        else {
            confirmaSenha.style.backgroundColor = 'white'
        }
    },
    validaEnvio: function (senha, confirmaSenha) {
        if (senha.value === confirmaSenha.value) {
            return alert('cadastro realizado')
        }
        else {
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


confirmaSenha.addEventListener("keyup", function (event) {
    const senha2Digitada = event.target.value
    trataSenha.estiloComparaSenhas(senha2Digitada, confirmaSenha, senha)
})

valorBotao.addEventListener("click", function (evento) {
    evento.preventDefault()
    const campos = [senha.value, cep.value, confirmaSenha, estado.value, cidade.value, bairro.value, rua.value, email.value, numero.value, complemento.value, nome.value]
    console.log(campos)
    const itensFiltrados = campos.filter((campo) => campo.length == 0)

    console.log(itensFiltrados)
    if (senha.length < 8) {
        alert("A senha precisa ter pelo menos 8 caracteres.")
    } else if (senha.value != confirmaSenha.value) {
        alert("As senhas digitadas são diferentes, tente novamente.")
    }else if(itensFiltrados.length > 0){
    alert("Por favor, preencha todos os campos.")
    }else {
        senha.value = ''
        confirmaSenha.value = ''
        cep.value = ''
        estado.value = ''
        cidade.value = ''
        bairro.value = ''
        rua.value = ''
        email.value = ''
        numero.value = ''
        complemento.value = ''
        nome.value = ''
        alert("Cadastro realizado com sucesso!")

    }

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

const buscaEndereco = async (cepValor) => {

    const urlAPI = `https://viacep.com.br/ws/${cepValor}/json` //template string uma vez que a API buscará o valor do cep armazenado em uma variável
    const resposta = await fetch(urlAPI) // o fetch envia uma requisição GET para a URL especificada. O await foi utilizado uma vez que trata-se de uma função assincrona, ele aguarda a conclusão de uma promesa antes de prosseguir a execução do código. 
    const dados = await resposta.json() //recebe os dados do endereço
    console.log(dados)

    //---------- falta tratar o erro para caso cep não exista
    if (dados && dados.erro) {
        alert("Cep inválido, digite novamente.")
        cep.value = ''
    } else {
        estado.value = dados.uf
        cidade.value = dados.localidade
        bairro.value = dados.bairro
        rua.value = dados.logradouro
    }
}






