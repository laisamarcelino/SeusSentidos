const btLogin = document.getElementById('fazerlogin')
const btRecupera = document.getElementById('recSenha')
const inputEmail = document.getElementById('inputEmail')
const inputSenha = document.getElementById('inputSenha')


btLogin.addEventListener('click', (event) => {
    event.preventDefault() //retira o envio automatico do formulario
    const campos = [inputEmail.value, inputSenha.value]
    const inputsFiltrados = campos.filter((campo) => campo.length == 0)
    
    var caso1 = true
    var caso2 = true
    var caso3 = true
    var caso4 = true

    if (inputsFiltrados.length > 0) {
        alert('Por favor, preencha todos os campos.')
        caso1 = false
    }
    else if (inputSenha.value.length < 8) {
        alert('A senha precisa ter pelo menos 8 caracteres')
        caso2 = false
    }
    else if (inputEmail.value.length < 8) {
        alert('O email precisa ter pelo menos 8 caracteres')
        caso3 = false
    }
    else if((inputEmail.value.indexOf('@') <= -1) && inputEmail.value.indexOf('.') <= -1 ){ //verifica se o email tem o @
        alert('O email deve contar um @ e um ponto')
        caso4 = false
    } 

    if ((caso1 === true) && (caso2 === true) && (caso3 === true) && (caso4 === true)){
        window.location.href = './home.html'
    }

})




