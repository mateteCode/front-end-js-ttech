import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado al carrito.");
};

export const eliminarProducto = (productoId) => {
  let carrito = obtenerCarrito();
  //carrito = carrito.filter((producto) => producto.id !== productoId);
  carrito.splice(productoId, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado del carrito.");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("El carrito ha sido vaciado.");
};
