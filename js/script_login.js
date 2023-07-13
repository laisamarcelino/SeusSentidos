const btnLogin = document.getElementById('fazerlogin')
// const inputNome = document.getElementById('inputNome')
const inputEmail = document.getElementById('inputEmail')
const inputSenha = document.getElementById('inputSenha')
btnLogin.addEventListener('click', (event) => {
    event.preventDefault()
    const campos = [inputEmail.value, inputSenha.value]
    const inputsFiltrados = campos.filter((campo) => campo.length == 0)

if (inputsFiltrados.length > 0) {
    alert('Por favor, preencha todos os campos.')
} else if (inputSenha.length < 8) {
    alert('A senha precisa ter pelo menos 8 caracteres')
} else {
    window.location.href = './home.html'
}
})