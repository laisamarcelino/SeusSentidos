document.getElementById("recoveryForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var emailInput = document.getElementById("email");
  var email = emailInput.value;

  // Expressão regular para validar o formato do e-mail
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    alert("Por favor, insira seu endereço de e-mail.");
  } else if (!emailPattern.test(email)) {
    alert("Por favor, insira um endereço de e-mail válido.");
  } else {
    
    // Exibe a mensagem de sucesso
    document.getElementById("successMessage").classList.remove("hidden");
    document.getElementById("loginButton").classList.remove("hidden");

    document.getElementById("recoveryForm").reset();
  }
});

document.getElementById("loginButton").addEventListener("click", function() {
  window.location.href = "login.html";
});
