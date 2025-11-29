import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("container-products");
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/products.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          "Error al cargar los productos. Error HTTP status: ${res.status}  "
        );
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((producto) => {
        const card = document.createElement("article");
        card.classList.add("card-products");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;
        card.appendChild(img);

        const h3 = document.createElement("h3");
        h3.textContent = producto.nombre;
        card.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = `Precio: $${producto.precio}`;
        card.appendChild(p);

        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = "Agregar al carrito";
        button.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });
        card.appendChild(button);

        contenedor.appendChild(card);
      });
    })
    .catch((error) => console.log(error));
});
