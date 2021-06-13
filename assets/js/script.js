function Modal() {
  document.querySelector('.modal-overlay').classList.toggle('active');
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('EvoBoard:clients')) || [];
  },

  set(client) {
    localStorage.setItem('EvoBoard', JSON.stringify(client));
  },
};

const Client = {
  all: Storage.get(),

  add(client) {
    Client.all.push(client);
    App.reload();
  },

  remove(index) {
    Client.all.splice(index, 1);
    App.reload();
  },
};

const DOM = {
  clientsContainer: document.querySelector('.data-table tbody'),

  addClients(client, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(client, index);
    tr.dataset.index = index;
    DOM.clientsContainer.appendChild(tr);
  },

  innerHTMLTransaction(client, index) {
    const html = `
    <td class="name">${client.name}</td>
    <td class="email">${client.email}</td>
    <td class="enterprise">${client.enterprise}</td>
    <td class="phone">${client.phone}</td>
    <td class="date">${client.date}</td>
    <td class="removeBtn">
      <img onClick="Client.remove(${index})" src="./assets/img/remove.svg" alt="Remover transação" />
    </td>
`;
    return html;
  },

  clearClients() {
    DOM.clientsContainer.innerHTML = '';
  },
};

const Form = {
  name: document.querySelector('input#name'),
  email: document.querySelector('input#email'),
  enterprise: document.querySelector('input#enterprise'),
  phone: document.querySelector('input#phone'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      name: this.name.value,
      email: this.email.value,
      enterprise: this.enterprise.value,
      phone: this.phone.value,
      date: this.date.value,
    };
  },

  validateField() {
    const { name, email, enterprise, phone, date } = Form.getValues();

    if (
      name.trim() === '' ||
      email.trim() === '' ||
      enterprise.trim() === '' ||
      phone.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos');
    }
    console.log('Validar');
  },

  formatFields() {
    let { name, email, enterprise, phone, date } = Form.getValues();
    return {
      name,
      email,
      enterprise,
      phone,
      date,
    };
  },

  saveClient(client) {
    Client.add(client);
  },

  clearFields() {
    Form.name.value = '';
    Form.email.value = '';
    Form.enterprise.value = '';
    Form.phone.value = '';
    Form.date.value = '';
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateField();
      const client = Form.formatFields();
      Form.saveClient(client);
      Form.clearFields();
      Modal();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Client.all.forEach(DOM.addClients);
    Storage.set(Client.all);
  },
  reload() {
    DOM.clearClients();
    App.init();
  },
};

App.init();
