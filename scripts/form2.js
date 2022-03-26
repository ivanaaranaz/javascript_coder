
// formulario contacto

const namef = document.querySelector('#name')
const surnamef = document.querySelector('#surname')
const emailf = document.querySelector('#email')
const postBtn = document.querySelector('#post-btn')

let arrayCliente = []

class Cliente {
    constructor(name, surname, email) {
        this.nombre = name;
        this.apellido = surname;
        this.email = email;
    }
}
//Función agregar cliente a array

function agregarCliente() {
    const nombreItem = namef.value;
    const apellidoItem = surnamef.value;
    const emailItem = emailf.value;

    let cliente = new Cliente(nombreItem, apellidoItem, emailItem)
    arrayCliente.push(cliente)
}

postBtn.addEventListener('click', agregarCliente);

sessionStorage.setItem("Cliente", JSON.stringify(arrayCliente));


//ajax

const publicar = () => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      nombre: namef.value,
      apellido: surnamef.value,
      email: emailf.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch( (error) => {
      console.log(error)
    });
}

postBtn.addEventListener('click', publicar)

const pedirPost = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await resp.json()
    for (let i = 0; i < 5; i++) {
      renderPost(data[i])
    }
    console.log(data)
  }

 