import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");
  const mensajeCarrito = document.getElementById("mensaje-carrito");
  const tituloProductosSeleccionados = document.getElementById(
    "productos-seleccionados-titulo"
  );
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";
  mensajeCarrito.classList.remove("mensaje-carrito-lleno");
  mensajeCarrito.classList.add("mensaje-carrito-vacio");

  if (!carrito.length) {
    tituloProductosSeleccionados.style.display = "none";
    mensajeCarrito.innerHTML =
      'El carrito está vacío. Podes seleccionar los productos que desees comprar desde la <a href="../">página de productos</a>.';
    return;
  }
  tituloProductosSeleccionados.style.display = "block";
  const total = calcularTotal(carrito);
  mensajeCarrito.textContent = `Total a pagar: $${total.toFixed(2)}`;
  mensajeCarrito.classList.remove("mensaje-carrito-vacio");
  mensajeCarrito.classList.add("mensaje-carrito-lleno");

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("card-products");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;
    item.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = producto.nombre;
    item.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = `Precio: $${producto.precio}`;
    item.appendChild(p);

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar del carrito";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });
    item.appendChild(btnEliminar);
    contenedor.appendChild(item);
  });

  const btnPagar = document.createElement("button");
  btnPagar.classList.add("btn", "btn-pagar");
  btnPagar.textContent = "Pagar";
  btnPagar.addEventListener("click", () => {
    console.log("Iniciando proceso de pago...");
    alert("¡Gracias por tu compra! (Lógica de pago aún no implementada)");
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });
  divAcciones.appendChild(btnPagar);
  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Carrito DOMContentLoaded");
  renderizarCarrito();
});

const calcularTotal = (carrito) => {
  return carrito.reduce((acc, producto) => acc + producto.precio, 0);
};
