
document.addEventListener('DOMContentLoaded', () => {


  // Variables 

  const baseDeDatos = [
    {
      id: 1,
      nombre: 'Diseño Web',
      precio: 500,
      imagen: '../images/iconoventas.jpeg'
    },
    {
      id: 2,
      nombre: 'Campañas ADS',
      precio: 300,
      imagen: '../images/iconoventas.jpeg'
    },
    {
      id: 3,
      nombre: 'Gestión Redes Sociales',
      precio: 180,
      imagen: '../images/iconoventas.jpeg'
    },
    {
      id: 4,
      nombre: 'Mejora SEO',
      precio: 150,
      imagen: '../images/iconoventas.jpeg'
    }

  ];

  
  const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
  guardarLocal("listaProductos", JSON.stringify(baseDeDatos));

  let carrito = [];
  const divisa = '$AR';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  const miLocalStorage = window.localStorage;

  // Funciones

/**
 * Maqueta todos los productos a partir de la base de datos.
 */

  function renderizarProductos() {
    baseDeDatos.forEach((info) => {

      const miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-9', 'm-2');

      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');

      const miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info.nombre;

      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid', 'p-4');
      miNodoImagen.setAttribute('src', info.imagen);

      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text');
      miNodoPrecio.textContent = `${info.precio}${divisa}`;

      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-primary');
      miNodoBoton.textContent = '+';
      miNodoBoton.setAttribute('marcador', info.id);
      miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }

/**
 * Evento para añadir un producto al carrito de la compra
 */

  function anyadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

    guardarCarritoEnLocalStorage();
// Mensaje pop up agregar item
    Swal.fire(
      'Gracias!',
      'Servicio Añadido',
      'success'
    )
  }

/**
 * Maqueta todos los productos guardados en el carrito
 */

  function renderizarCarrito() {
 // Vaciamos todo el html
    DOMcarrito.textContent = '';
 // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
 // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
// Obtenemos el item que necesitamos de la variable base de datos
      const miItem = baseDeDatos.filter((itemBaseDatos) => {

        return itemBaseDatos.id === parseInt(item);
      });
// Cuenta el número de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {

        return itemId === item ? total += 1 : total;
      }, 0);
// Creamos el nodo del item del carrito
      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
 // Boton de borrar
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
      miBoton.addEventListener('click', borrarItemCarrito);
// Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });
// Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
  }
/**
 * Evento para borrar un elemento del carrito
 */
  function borrarItemCarrito(evento) {
// Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
 // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
// volvemos a renderizar
    renderizarCarrito();

    guardarCarritoEnLocalStorage();

  }
/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
  function calcularTotal() {
// Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
 // De cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
// Los sumamos al total
      return total + miItem[0].precio;
    }, 0).toFixed(2);
  }
/**
 * Varia el carrito y vuelve a maquetarlo
 */
  function vaciarCarrito() {

    carrito = [];

    renderizarCarrito();

    localStorage.clear();
// Mensaje pop up vaciar carrito
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si vaciarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Se vacio el carrito!',
          'Ya no tienes servicios agregados',
          'success'
        )
      }
    })
  }

  function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }
  function cargarCarritoDeLocalStorage() {

    if (miLocalStorage.getItem('carrito') !== null) {

      carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
  }
// Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);


  cargarCarritoDeLocalStorage();
  renderizarProductos();
  renderizarCarrito();
});



