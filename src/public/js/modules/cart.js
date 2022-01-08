if (/\/(productos).*/.test(urlPath)) {
  // Add to cart event handler------------------------------------------//
  const productListContainer = document.getElementById("listaDeProductos");

  const addToCart = async (event) => {
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

    if (event.target.innerText === "Agregar al carrito") {
      const data = {
        _id: event.target.attributes.productid.value,
      };
      if (carritoStorage === null || carritoStorage.length === 0) {
        console.log("POST");
        await fetch("/api/carrito/agregar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("carrito", JSON.stringify(data));
            Swal.fire("Genial", "Producto añadido correctamente", "success");
          });
      } else {
        console.log("PUT");
        carritoStorage.products.push(data);
        localStorage.setItem("carrito", JSON.stringify(carritoStorage));
        await fetch("/api/carrito/actualizar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        Swal.fire("Genial", "Producto añadido correctamente", "success");
      }
    }
  };

  productListContainer.addEventListener("click", addToCart);
}
// Cart methods
const cartContainer = document.getElementById("cartContainer");

const eventHandler = async (event) => {
  if (event.target.id === "removeAll") {
    await fetch("/api/carrito/borrar", {
      method: "DELETE",
    }).then((res) => (window.location.href = "/carrito"));
    localStorage.removeItem("carrito");
  }

  if (event.target.id === "checkOut") {
    const productosSorage = JSON.parse(localStorage.getItem("carrito"));
    await fetch("/api/carrito/checkout", {
      method: "POST",
      body: JSON.stringify(productosSorage),
    }).then((res) => (window.location.href = "/carrito"));
    localStorage.removeItem("carrito");
  }
};

cartContainer.addEventListener("click", eventHandler);
