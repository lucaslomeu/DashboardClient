const login = document.querySelector('#login');
const container = document.querySelector('#container');

function clearFields() {
  username.value = '';
  password.value = '';
}

function remember() {
  const check = document.querySelector('input#remember');

  if (!check.checked) {
    clearFields();
  }
}

function Login() {
  let username = document.querySelector('input#username').value;
  let password = document.querySelector('input#password').value;
  if (username === 'admin' && password === '123') {
    login.style.display = 'none';
    container.style.display = 'flex';
  } else if (username === '' || password === '') {
    alert('Favor preencher todos os campos');
  } else {
    alert('Usuário e/ou senha inválidos');
  }
  remember();
}

function Logout() {
  login.style.display = 'flex';
  container.style.display = 'none';
}

// COLOCAR ATIVO O BOTAO DO MENU QUE TIVER CLICADO NO MOMENTO, NO CASO CLIENTE
